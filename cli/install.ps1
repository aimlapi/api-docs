# Install the aimlapi CLI on Windows without Node.js (PowerShell 5.1+ or pwsh):
#
#   irm https://aimlapi.com/install.ps1 | iex
#
# The binary comes from the public npm platform package
# @ai-ml.api/cli-win32-<cpu> (the same file `npm i -g aimlapi` installs). The
# tarball is checked against the registry's sha512 integrity before anything
# is installed. No administrator rights and no Node.js are needed.
#
# Environment:
#   AIMLAPI_INSTALL_DIR             where to put aimlapi.exe
#                                   (default: $env:LOCALAPPDATA\aimlapi\bin)
#   AIMLAPI_VERSION                 version to install, e.g. 0.2.0 (default: latest)
#   AIMLAPI_NPM_REGISTRY            npm registry (default: https://registry.npmjs.org)
#   AIMLAPI_INSTALL_NO_MODIFY_PATH  1: do not add the directory to the user PATH
#   AIMLAPI_INSTALL_OS              override the OS detection (for testing)
#   AIMLAPI_INSTALL_ARCH            override PROCESSOR_ARCHITECTURE (for testing)
#
# Source of truth: scripts/install.ps1 in aimlapi/cli. Everything below is
# function definitions; the only command is the call on the last line, so a
# truncated download runs nothing. Keep this file ASCII: Windows PowerShell
# 5.1 reads a BOM-less script in the ANSI code page.

function Write-AimlapiMessage([string]$Message) {
  [Console]::Error.WriteLine($Message)
}

function Get-AimlapiPlatformArch {
  $arch = $env:AIMLAPI_INSTALL_ARCH
  if (-not $arch) { $arch = $env:PROCESSOR_ARCHITEW6432 } # 32-bit PowerShell on 64-bit Windows
  if (-not $arch) { $arch = $env:PROCESSOR_ARCHITECTURE }
  switch -Regex ("$arch") {
    '^(?i)(amd64|x64|x86_64)$' { return 'x64' }
    '^(?i)(arm64|aarch64)$' { return 'arm64' }
  }
  throw "unsupported CPU architecture: '$arch' (aimlapi supports x64 and arm64 Windows)"
}

function Test-AimlapiWindows {
  $os = $env:AIMLAPI_INSTALL_OS
  if ($os) { return $os -match '^(?i)(windows|windows_nt|win32)$' }
  return [Environment]::OSVersion.Platform -eq [PlatformID]::Win32NT
}

function ConvertTo-AimlapiBase64Sha512([string]$Path) {
  $hex = (Get-FileHash -LiteralPath $Path -Algorithm SHA512).Hash
  $bytes = New-Object byte[] ($hex.Length / 2)
  for ($i = 0; $i -lt $bytes.Length; $i++) {
    $bytes[$i] = [Convert]::ToByte($hex.Substring($i * 2, 2), 16)
  }
  return [Convert]::ToBase64String($bytes)
}

function Read-AimlapiBlock([System.IO.Stream]$Stream, [byte[]]$Buffer, [int]$Count) {
  $read = 0
  while ($read -lt $Count) {
    $n = $Stream.Read($Buffer, $read, $Count - $read)
    if ($n -le 0) { throw 'the package tarball is truncated' }
    $read += $n
  }
}

function Get-AimlapiTarString([byte[]]$Header, [int]$Offset, [int]$Length) {
  $end = $Offset
  while ($end -lt $Offset + $Length -and $Header[$end] -ne 0) { $end++ }
  return [Text.Encoding]::UTF8.GetString($Header, $Offset, $end - $Offset)
}

# Extracts the regular file $Entry from the .tgz at $Tarball to $Destination
# with .NET only (GZipStream and a minimal ustar/pax reader), so it works on
# every Windows PowerShell without tar.exe.
function Expand-AimlapiTarEntry([string]$Tarball, [string]$Entry, [string]$Destination) {
  $file = [IO.File]::OpenRead($Tarball)
  try {
    $gzip = New-Object IO.Compression.GZipStream($file, [IO.Compression.CompressionMode]::Decompress)
    $header = New-Object byte[] 512
    $paxPath = $null
    while ($true) {
      Read-AimlapiBlock $gzip $header 512
      $empty = $true
      foreach ($b in $header) { if ($b -ne 0) { $empty = $false; break } }
      if ($empty) { break }

      $name = Get-AimlapiTarString $header 0 100
      $sizeText = (Get-AimlapiTarString $header 124 12).Trim()
      $size = [Convert]::ToInt64($(if ($sizeText) { $sizeText } else { '0' }), 8)
      $type = [char]$header[156]
      if ((Get-AimlapiTarString $header 257 5) -eq 'ustar') {
        $prefix = Get-AimlapiTarString $header 345 155
        if ($prefix) { $name = "$prefix/$name" }
      }
      if ($paxPath) { $name = $paxPath; $paxPath = $null }
      $padded = [long]([Math]::Ceiling($size / 512.0) * 512)

      if ($type -eq 'x') {
        # pax extended header: "<len> key=value\n" records; only path matters.
        $data = New-Object byte[] $padded
        Read-AimlapiBlock $gzip $data $padded
        $text = [Text.Encoding]::UTF8.GetString($data, 0, $size)
        foreach ($record in $text.Split("`n")) {
          if ($record -match '^\d+ path=(.*)$') { $paxPath = $Matches[1] }
        }
        continue
      }

      if ($name -eq $Entry -and ($type -eq '0' -or $type -eq [char]0)) {
        $out = [IO.File]::Create($Destination)
        try {
          $buffer = New-Object byte[] 65536
          $left = $size
          while ($left -gt 0) {
            $n = $gzip.Read($buffer, 0, [int][Math]::Min($buffer.Length, $left))
            if ($n -le 0) { throw 'the package tarball is truncated' }
            $out.Write($buffer, 0, $n)
            $left -= $n
          }
        } finally {
          $out.Dispose()
        }
        return
      }

      # Skip this entry's data blocks.
      $skip = New-Object byte[] 512
      for ($left = $padded; $left -gt 0; $left -= 512) { Read-AimlapiBlock $gzip $skip 512 }
    }
  } finally {
    $file.Dispose()
  }
  throw "the package has no $Entry"
}

# Whether semver $A < $B (core numbers, then a prerelease sorts before its
# release; two prereleases of one core count as equal).
function Test-AimlapiVersionLess([string]$A, [string]$B) {
  $ca, $pa = $A.Split('-', 2)
  $cb, $pb = $B.Split('-', 2)
  $x = $ca.Split('.'); $y = $cb.Split('.')
  for ($i = 0; $i -lt 3; $i++) {
    [int]$xi = 0; [int]$yi = 0
    if ($i -lt $x.Length) { [void][int]::TryParse($x[$i], [ref]$xi) }
    if ($i -lt $y.Length) { [void][int]::TryParse($y[$i], [ref]$yi) }
    if ($xi -lt $yi) { return $true }
    if ($xi -gt $yi) { return $false }
  }
  return [bool]($pa -and -not $pb)
}

# The user PATH exactly as stored (REG_EXPAND_SZ, %VARS% unexpanded).
# [Environment]::GetEnvironmentVariable would expand them, and writing that
# back would flatten every %USERPROFILE%-style entry for good.
function Get-AimlapiUserPathRaw {
  $key = [Microsoft.Win32.Registry]::CurrentUser.OpenSubKey('Environment')
  if (-not $key) { return '' }
  try {
    return [string]$key.GetValue('Path', '', [Microsoft.Win32.RegistryValueOptions]::DoNotExpandEnvironmentNames)
  } finally {
    $key.Dispose()
  }
}

function Add-AimlapiUserPath([string]$Dir) {
  $raw = Get-AimlapiUserPathRaw
  $new = if ($raw) { $raw.TrimEnd(';') + ';' + $Dir } else { $Dir }
  $key = [Microsoft.Win32.Registry]::CurrentUser.CreateSubKey('Environment')
  try {
    $key.SetValue('Path', $new, [Microsoft.Win32.RegistryValueKind]::ExpandString)
  } finally {
    $key.Dispose()
  }
  # Tell Explorer (and so new terminals) that the environment changed:
  # SetEnvironmentVariable broadcasts WM_SETTINGCHANGE. Set and remove a
  # throwaway variable rather than touch Path through it.
  [Environment]::SetEnvironmentVariable('AIMLAPI_INSTALL_REFRESH', '1', 'User')
  [Environment]::SetEnvironmentVariable('AIMLAPI_INSTALL_REFRESH', $null, 'User')
}

function Test-AimlapiPathContains([string]$PathValue, [string]$Dir) {
  $want = $Dir.TrimEnd('\')
  foreach ($entry in "$PathValue".Split(';')) {
    if ($entry -and $entry.TrimEnd('\') -ieq $want) { return $true }
  }
  return $false
}

function Invoke-AimlapiInstall {
  # The oldest release installed by default: the first one whose
  # `aimlapi update` updates a script install in place (older ones run
  # `npm i -g`, leaving this copy behind forever). A pinned AIMLAPI_VERSION
  # may be older.
  $MIN_SCRIPT_VERSION = '0.3.0'
  $ErrorActionPreference = 'Stop'
  $ProgressPreference = 'SilentlyContinue' # Invoke-WebRequest is very slow with a progress bar on 5.1
  try {
    # Windows PowerShell 5.1 may default to TLS 1.0; the registry needs 1.2.
    [Net.ServicePointManager]::SecurityProtocol = [Net.ServicePointManager]::SecurityProtocol -bor [Net.SecurityProtocolType]::Tls12
  } catch {
  }

  if (-not (Test-AimlapiWindows)) {
    throw 'this script is for Windows. On macOS and Linux, run: curl -fsSL https://aimlapi.com/install.sh | sh'
  }
  $arch = Get-AimlapiPlatformArch

  $registry = $env:AIMLAPI_NPM_REGISTRY
  if (-not $registry) { $registry = 'https://registry.npmjs.org' }
  $registry = $registry.TrimEnd('/')
  $version = $env:AIMLAPI_VERSION
  if (-not $version) { $version = 'latest' }
  $version = $version -replace '^v', ''
  if ($version -notmatch '^[0-9A-Za-z.+-]+$') { throw "invalid AIMLAPI_VERSION: '$env:AIMLAPI_VERSION'" }

  $installDir = $env:AIMLAPI_INSTALL_DIR
  if (-not $installDir) {
    if (-not $env:LOCALAPPDATA) { throw 'LOCALAPPDATA is not set; set AIMLAPI_INSTALL_DIR to the directory to install aimlapi into' }
    $installDir = Join-Path $env:LOCALAPPDATA 'aimlapi\bin'
  }
  $installDir = [IO.Path]::GetFullPath($installDir).TrimEnd('\')

  $package = "@ai-ml.api/cli-win32-$arch"
  $metadataUrl = "$registry/@ai-ml.api%2fcli-win32-$arch/$version"
  Write-AimlapiMessage "Installing aimlapi ($package@$version) from $registry"

  $tmp = Join-Path ([IO.Path]::GetTempPath()) ('aimlapi-install-' + [Guid]::NewGuid().ToString('N'))
  New-Item -ItemType Directory -Path $tmp | Out-Null
  $staged = $null
  try {
    # Download to a file and parse it here: Invoke-RestMethod/.Content
    # differ between PowerShell 5.1 and 7 (string, byte[], or unparsed when a
    # registry mirror sends another Content-Type).
    $metadataFile = Join-Path $tmp 'metadata.json'
    try {
      Invoke-WebRequest -Uri $metadataUrl -OutFile $metadataFile -UseBasicParsing -Headers @{ Accept = 'application/json' }
    } catch {
      throw "cannot fetch $metadataUrl (no such version, or the registry is unreachable): $($_.Exception.Message)"
    }
    try {
      $meta = [IO.File]::ReadAllText($metadataFile, [Text.Encoding]::UTF8) | ConvertFrom-Json
    } catch {
      throw "unexpected registry response from ${metadataUrl}: $($_.Exception.Message)"
    }
    $resolved = "$($meta.version)"
    $tarball = "$($meta.dist.tarball)"
    if (-not $resolved -or -not $tarball) { throw "unexpected registry response from $metadataUrl" }
    if ($version -match '^[0-9]') {
      if ($resolved -ne $version) { throw "the registry returned version $resolved for $version" }
    } elseif (Test-AimlapiVersionLess $resolved $MIN_SCRIPT_VERSION) {
      throw "the $version aimlapi is $resolved, but this installer needs aimlapi >= $MIN_SCRIPT_VERSION (the first release that updates itself). Use npm for now: npm i -g aimlapi (or pin `$env:AIMLAPI_VERSION='$resolved' to install it anyway; update it by re-running this installer)"
    }
    if ($tarball -notmatch '^https?://') { throw "unexpected tarball URL in the registry response: $tarball" }

    $sha512 = $null
    foreach ($hash in "$($meta.dist.integrity)".Split(' ')) {
      if ($hash.StartsWith('sha512-')) { $sha512 = $hash.Substring(7); break }
    }
    if (-not $sha512) { throw "the registry gave no sha512 integrity for $package@$resolved; refusing to install" }

    $tgz = Join-Path $tmp 'package.tgz'
    try {
      Invoke-WebRequest -Uri $tarball -OutFile $tgz -UseBasicParsing
    } catch {
      throw "cannot download ${tarball}: $($_.Exception.Message)"
    }
    if ((ConvertTo-AimlapiBase64Sha512 $tgz) -cne $sha512) {
      throw "integrity check failed for ${tarball}: its sha512 does not match the registry's; refusing to install"
    }

    New-Item -ItemType Directory -Force -Path $installDir | Out-Null
    $target = Join-Path $installDir 'aimlapi.exe'
    # Stage next to the target (it must end in .exe to run), check that it
    # runs, then move it into place.
    $staged = Join-Path $installDir ".aimlapi-install-$PID.exe"
    Expand-AimlapiTarEntry $tgz 'package/bin/aimlapi.exe' $staged

    $reported = $null
    $previous = $ErrorActionPreference
    $ErrorActionPreference = 'Continue' # 5.1 turns native stderr into terminating errors under Stop
    try {
      $reported = (& $staged --version 2>&1 | Out-String).Trim()
      $exit = $LASTEXITCODE
    } catch {
      $exit = -1
      $reported = $_.Exception.Message
    } finally {
      $ErrorActionPreference = $previous
    }
    if ($exit -ne 0) { throw "the downloaded aimlapi does not run on this machine: $reported" }
    if (" $reported " -notlike "* $resolved *") { throw "the downloaded aimlapi reports '$reported', expected version $resolved" }

    # A running aimlapi.exe cannot be overwritten but can be renamed: move
    # the old one aside, move the new one in, put the old one back on failure.
    $old = "$target.old"
    if (Test-Path -LiteralPath $old) { Remove-Item -LiteralPath $old -Force -ErrorAction SilentlyContinue }
    $hadOld = Test-Path -LiteralPath $target
    if ($hadOld) { Move-Item -LiteralPath $target -Destination $old -Force }
    try {
      Move-Item -LiteralPath $staged -Destination $target
    } catch {
      if ($hadOld) { Move-Item -LiteralPath $old -Destination $target -Force }
      throw "cannot move aimlapi.exe into ${installDir}: $($_.Exception.Message)"
    }
    $staged = $null
    if ($hadOld) { Remove-Item -LiteralPath $old -Force -ErrorAction SilentlyContinue }
  } finally {
    if ($staged -and (Test-Path -LiteralPath $staged)) { Remove-Item -LiteralPath $staged -Force -ErrorAction SilentlyContinue }
    Remove-Item -LiteralPath $tmp -Recurse -Force -ErrorAction SilentlyContinue
  }

  Write-AimlapiMessage "Installed $reported"
  Write-AimlapiMessage "  -> $target"

  $userPath = [Environment]::ExpandEnvironmentVariables((Get-AimlapiUserPathRaw))
  if (Test-AimlapiPathContains $userPath $installDir) {
    # Already there.
  } elseif ($env:AIMLAPI_INSTALL_NO_MODIFY_PATH -and $env:AIMLAPI_INSTALL_NO_MODIFY_PATH -ne '0') {
    Write-AimlapiMessage ''
    Write-AimlapiMessage "$installDir is not on your PATH. To add it for your user, run this in PowerShell and open a new terminal:"
    Write-AimlapiMessage ''
    Write-AimlapiMessage "  `$k = [Microsoft.Win32.Registry]::CurrentUser.CreateSubKey('Environment'); `$k.SetValue('Path', `$k.GetValue('Path', '', 'DoNotExpandEnvironmentNames').TrimEnd(';') + ';$installDir', 'ExpandString')"
  } else {
    Add-AimlapiUserPath $installDir
    Write-AimlapiMessage ''
    Write-AimlapiMessage "Added $installDir to your user PATH. Open a new terminal to use aimlapi."
  }
  if (-not (Test-AimlapiPathContains $env:Path $installDir)) {
    $env:Path = "$env:Path;$installDir" # this session (irm | iex runs in the caller's)
  }

  Write-AimlapiMessage ''
  Write-AimlapiMessage 'Next steps:'
  Write-AimlapiMessage '  aimlapi login     # sign in to AI/ML API'
  Write-AimlapiMessage '  aimlapi claude    # or codex, opencode, cline, ... any supported agent'
}

function Install-Aimlapi {
  try {
    Invoke-AimlapiInstall
  } catch {
    $message = "aimlapi-install: error: $($_.Exception.Message)"
    if ($PSCommandPath) {
      # Run as a file (powershell -File install.ps1): a clean message and exit code 1.
      Write-AimlapiMessage $message
      exit 1
    }
    # Run through `irm | iex`: exit would close the user's PowerShell window;
    # throwing keeps it open and still fails a script that runs the one-liner.
    throw $message
  }
}

Install-Aimlapi
