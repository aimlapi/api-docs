#!/bin/sh
# Install the aimlapi CLI on macOS or Linux without Node.js:
#
#   curl -fsSL https://aimlapi.com/install.sh | sh
#
# The binary comes from the public npm platform package
# @ai-ml.api/cli-<os>-<cpu> (the same file `npm i -g aimlapi` installs). The
# tarball is checked against the registry's sha512 integrity before anything
# is installed. No sudo, no Node.js, no shell rc files are edited.
#
# Environment:
#   AIMLAPI_INSTALL_DIR   where to put `aimlapi` (default: $HOME/.local/bin)
#   AIMLAPI_VERSION       version to install, e.g. 0.2.0 (default: latest)
#   AIMLAPI_NPM_REGISTRY  npm registry (default: https://registry.npmjs.org)
#   AIMLAPI_INSTALL_OS    override `uname -s` (for testing)
#   AIMLAPI_INSTALL_ARCH  override `uname -m` (for testing)
#
# Source of truth: scripts/install.sh in aimlapi/cli. The whole script is
# one function (helpers included) called on the last line, so a truncated
# download (curl | sh) runs nothing.

aimlapi_install() {
	say() {
		printf '%s\n' "$*" >&2
	}

	die() {
		say "aimlapi-install: error: $*"
		exit 1
	}

	have() {
		command -v "$1" >/dev/null 2>&1
	}

	cleanup() {
		if [ -n "${AIMLAPI_STAGED-}" ]; then
			rm -f "$AIMLAPI_STAGED"
		fi
		if [ -n "${AIMLAPI_TMP-}" ]; then
			rm -rf "$AIMLAPI_TMP"
		fi
	}

	# fetch URL FILE: download URL to FILE with curl, or wget without curl.
	fetch() {
		if have curl; then
			curl -fsSL --retry 3 --connect-timeout 20 -o "$2" "$1"
		elif have wget; then
			wget -q -T 60 -O "$2" "$1"
		else
			die "neither curl nor wget is installed; install one of them and run this again"
		fi
	}

	# detect_platform: sets PLATFORM_OS (darwin|linux) and PLATFORM_ARCH
	# (x64|arm64), the names of the npm platform packages.
	detect_platform() {
		os=${AIMLAPI_INSTALL_OS:-$(uname -s)}
		arch=${AIMLAPI_INSTALL_ARCH:-$(uname -m)}

		case $os in
		Darwin | darwin) PLATFORM_OS=darwin ;;
		Linux | linux) PLATFORM_OS=linux ;;
		MINGW* | MSYS* | CYGWIN* | Windows_NT)
			die "this script is for macOS and Linux. On Windows, run in PowerShell: irm https://aimlapi.com/install.ps1 | iex"
			;;
		*) die "unsupported operating system: $os (aimlapi supports macOS and Linux; Windows through install.ps1)" ;;
		esac

		case $arch in
		x86_64 | amd64 | x64) PLATFORM_ARCH=x64 ;;
		arm64 | aarch64) PLATFORM_ARCH=arm64 ;;
		*) die "unsupported CPU architecture: $arch (aimlapi supports x86_64 and arm64)" ;;
		esac

		# A shell running under Rosetta reports x86_64 on Apple silicon: install
		# the native arm64 build instead.
		if [ -z "${AIMLAPI_INSTALL_ARCH-}" ] && [ "$PLATFORM_OS" = darwin ] && [ "$PLATFORM_ARCH" = x64 ] &&
			[ "$(sysctl -n sysctl.proc_translated 2>/dev/null)" = 1 ]; then
			PLATFORM_ARCH=arm64
		fi
	}

	# json_get JSON PATH: the string value at PATH ("version",
	# "dist.tarball") of a JSON document on one line, or nothing. A small
	# scanner that tracks strings, nesting and the key path, so only the
	# top-level "version" and the fields of the top-level "dist" object
	# count, never a same-named key anywhere else in the document.
	json_get() {
		printf '%s\n' "$1" | awk -v want="$2" '
			{ doc = doc $0 }
			END {
				n = length(doc); depth = 0; instr = 0; esc = 0
				for (i = 1; i <= n; i++) {
					c = substr(doc, i, 1)
					if (instr) {
						if (esc) { buf = buf (c == "/" ? "/" : "\\" c); esc = 0; continue }
						if (c == "\\") { esc = 1; continue }
						if (c != "\"") { buf = buf c; continue }
						instr = 0
						if (type[depth] != "o") { continue }
						if (!haskey[depth]) { key[depth] = buf; haskey[depth] = 1; continue }
						path = ""
						for (j = 1; j <= depth; j++) {
							if (type[j] != "o") { path = ""; break }
							path = path (j > 1 ? "." : "") key[j]
						}
						if (path == want) { print buf; exit }
						haskey[depth] = 0
						continue
					}
					if (c == "\"") { instr = 1; buf = ""; continue }
					if (c == "{" || c == "[") { depth++; type[depth] = (c == "{" ? "o" : "a"); haskey[depth] = 0; continue }
					if (c == "}" || c == "]") { depth--; if (depth > 0) { haskey[depth] = 0 }; continue }
					if (c == ",") { haskey[depth] = 0 }
				}
			}'
	}

	# version_lt A B: whether semver A < B (core numbers, then a prerelease
	# sorts before its release; two prereleases of one core count as equal).
	version_lt() {
		awk -v a="$1" -v b="$2" 'BEGIN {
			pa = index(a, "-"); pb = index(b, "-")
			ca = pa ? substr(a, 1, pa - 1) : a; cb = pb ? substr(b, 1, pb - 1) : b
			split(ca, x, "."); split(cb, y, ".")
			for (i = 1; i <= 3; i++) {
				if (x[i] + 0 < y[i] + 0) { exit 0 }
				if (x[i] + 0 > y[i] + 0) { exit 1 }
			}
			exit (pa && !pb) ? 0 : 1
		}'
	}

	# sha512_matches FILE BASE64: whether FILE's sha512 is BASE64 (the digest
	# part of an npm "sha512-<base64>" integrity).
	sha512_matches() {
		if have openssl; then
			actual=$(openssl dgst -sha512 -binary "$1" | openssl base64 -A) || return 1
			[ "$actual" = "$2" ]
			return
		fi

		if have sha512sum; then
			actual=$(sha512sum "$1" | cut -d ' ' -f 1)
		elif have shasum; then
			actual=$(shasum -a 512 "$1" | cut -d ' ' -f 1)
		else
			die "cannot verify the download: install openssl, sha512sum or shasum"
		fi

		expected=
		for flag in -d -D; do
			expected=$(printf '%s' "$2" | base64 "$flag" 2>/dev/null | od -A n -v -t x1 | tr -d ' \n')
			if [ -n "$expected" ]; then
				break
			fi
		done
		if [ -z "$expected" ]; then
			die "cannot verify the download: base64 cannot decode the registry's integrity"
		fi

		[ "$actual" = "$expected" ]
	}

	# path_hint DIR: tell the user how to put DIR on PATH for their shell. Rc
	# files are never edited.
	# shellcheck disable=SC2088 # "~/.zshrc" is shown to the user, not expanded
	path_hint() {
		shown=$1
		if [ -n "${HOME-}" ] && [ "$HOME" != / ]; then
			case $1 in
			"$HOME"/*) shown="\$HOME/${1#"$HOME"/}" ;;
			esac
		fi

		shell_name=$(basename "${SHELL:-sh}")
		case $shell_name in
		zsh)
			rc="~/.zshrc"
			line="export PATH=\"$shown:\$PATH\""
			;;
		bash)
			rc="~/.bashrc"
			if [ "$PLATFORM_OS" = darwin ]; then
				rc="~/.bash_profile"
			fi
			line="export PATH=\"$shown:\$PATH\""
			;;
		fish)
			rc="~/.config/fish/config.fish"
			line="fish_add_path \"$shown\""
			;;
		*)
			rc="~/.profile"
			line="export PATH=\"$shown:\$PATH\""
			;;
		esac

		say ""
		say "$1 is not on your PATH. Add this line to $rc and open a new terminal:"
		say ""
		say "  $line"
	}

	# ---- main

	set -u
	umask 022

	# The oldest release the installer puts on PATH by default: the first one
	# whose `aimlapi update` updates a script install in place (older ones run
	# `npm i -g`, leaving this copy behind forever). A pinned AIMLAPI_VERSION
	# may be older.
	MIN_SCRIPT_VERSION=0.3.0

	registry=${AIMLAPI_NPM_REGISTRY:-https://registry.npmjs.org}
	registry=${registry%/}
	version=${AIMLAPI_VERSION:-latest}
	version=${version#v}
	install_dir=${AIMLAPI_INSTALL_DIR:-}

	case $version in
	'' | *[!0-9A-Za-z.+-]*) die "invalid AIMLAPI_VERSION: ${AIMLAPI_VERSION-}" ;;
	esac

	if [ -z "$install_dir" ]; then
		if [ -z "${HOME-}" ]; then
			die "HOME is not set; set AIMLAPI_INSTALL_DIR to the directory to install aimlapi into"
		fi
		install_dir=$HOME/.local/bin
	fi
	case $install_dir in
	/*) ;;
	*) install_dir=$(pwd)/$install_dir ;;
	esac
	while [ "${install_dir%/}" != "$install_dir" ] && [ "$install_dir" != / ]; do
		install_dir=${install_dir%/}
	done

	detect_platform
	package="@ai-ml.api/cli-$PLATFORM_OS-$PLATFORM_ARCH"
	metadata_url="$registry/@ai-ml.api%2fcli-$PLATFORM_OS-$PLATFORM_ARCH/$version"

	AIMLAPI_TMP=$(mktemp -d 2>/dev/null || mktemp -d -t aimlapi-install) || die "cannot create a temporary directory"
	AIMLAPI_STAGED=
	trap cleanup EXIT
	trap 'exit 130' INT
	trap 'exit 143' TERM
	trap 'exit 129' HUP

	say "Installing aimlapi ($package@$version) from $registry"

	fetch "$metadata_url" "$AIMLAPI_TMP/metadata.json" ||
		die "cannot fetch $metadata_url (no such version, or the registry is unreachable)"
	metadata=$(tr -d '\r\n' <"$AIMLAPI_TMP/metadata.json")

	resolved=$(json_get "$metadata" version)
	tarball=$(json_get "$metadata" dist.tarball)
	integrity=$(json_get "$metadata" dist.integrity)

	if [ -z "$resolved" ] || [ -z "$tarball" ]; then
		die "unexpected registry response from $metadata_url"
	fi
	case $version in
	[0-9]*)
		if [ "$resolved" != "$version" ]; then
			die "the registry returned version $resolved for $version"
		fi
		;;
	*)
		if version_lt "$resolved" "$MIN_SCRIPT_VERSION"; then
			die "the $version aimlapi is $resolved, but this installer needs aimlapi >= $MIN_SCRIPT_VERSION (the first release that updates itself). Use npm for now: npm i -g aimlapi (or pin AIMLAPI_VERSION=$resolved to install it anyway; update it by re-running this installer)"
		fi
		;;
	esac
	case $tarball in
	https://* | http://*) ;;
	*) die "unexpected tarball URL in the registry response: $tarball" ;;
	esac

	sha512=
	for hash in $integrity; do
		case $hash in
		sha512-*)
			sha512=${hash#sha512-}
			break
			;;
		esac
	done
	if [ -z "$sha512" ]; then
		die "the registry gave no sha512 integrity for $package@$resolved; refusing to install"
	fi

	fetch "$tarball" "$AIMLAPI_TMP/package.tgz" || die "cannot download $tarball"

	if ! sha512_matches "$AIMLAPI_TMP/package.tgz" "$sha512"; then
		die "integrity check failed for $tarball: its sha512 does not match the registry's; refusing to install"
	fi

	(cd "$AIMLAPI_TMP" && tar -xzf package.tgz package/bin/aimlapi) 2>/dev/null ||
		die "cannot extract package/bin/aimlapi from $tarball"
	if [ ! -f "$AIMLAPI_TMP/package/bin/aimlapi" ]; then
		die "the package has no package/bin/aimlapi"
	fi

	mkdir -p "$install_dir" || die "cannot create $install_dir"
	target=$install_dir/aimlapi
	if [ -d "$target" ]; then
		die "$target is a directory"
	fi

	# Stage next to the target (same filesystem), check that it runs, then
	# rename it over the old one: an atomic replace.
	AIMLAPI_STAGED=$install_dir/.aimlapi.install.$$
	cp "$AIMLAPI_TMP/package/bin/aimlapi" "$AIMLAPI_STAGED" || die "cannot write to $install_dir"
	chmod 0755 "$AIMLAPI_STAGED" || die "cannot make $AIMLAPI_STAGED executable"

	reported=$("$AIMLAPI_STAGED" --version 2>&1) || die "the downloaded aimlapi does not run on this machine: $reported"
	case " $reported " in
	*" $resolved "*) ;;
	*) die "the downloaded aimlapi reports \"$reported\", expected version $resolved" ;;
	esac

	mv -f "$AIMLAPI_STAGED" "$target" || die "cannot move aimlapi into $install_dir"
	AIMLAPI_STAGED=

	say "Installed $reported"
	say "  -> $target"

	case ":${PATH-}:" in
	*":$install_dir:"* | *":$install_dir/:"*)
		found=$(command -v aimlapi 2>/dev/null || true)
		if [ -n "$found" ] && [ "$found" != "$target" ]; then
			say ""
			say "Note: $found comes first on your PATH, so \`aimlapi\` runs that one."
			say "Remove it (npm: npm uninstall -g aimlapi) or put $install_dir earlier on PATH."
		fi
		;;
	*)
		path_hint "$install_dir"
		;;
	esac

	say ""
	say "Next steps:"
	say "  aimlapi login     # sign in to AI/ML API"
	say "  aimlapi claude    # or codex, opencode, cline, ... any supported agent"
}

aimlapi_install "$@"
