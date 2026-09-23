---
name: aimlapi-setup
description: Install and configure the aimlapi CLI so the coding agent you are running in (Claude Code, Codex, OpenCode or Cline) uses AI/ML API models. Use when the user asks to "set up AI/ML API", "connect to aimlapi", "use AI/ML API models", or points you to this file. Signs in through the browser (the user approves, no key is pasted), previews every config change with --dry-run, applies it after the user confirms, verifies it, and explains how to roll it back.
---

# Set up AI/ML API for a coding agent

You are a coding agent. The user wants you (or another agent on this machine)
to use [AI/ML API](https://aimlapi.com) models. The `aimlapi` CLI
(npm package `aimlapi`) does the work: it signs the user in, stores an API
key on this machine, and edits the agent's own config files. Your job is to
run it in the right order, show the user what will change, and never handle
the API key yourself.

These instructions work for any agent that can run shell commands. Where a
step says "ask the user", stop and wait for an answer.

## Rules (read first)

- [ ] **Never ask the user for an API key and never accept one in the chat.**
  Sign-in is `aimlapi login`: the user approves in the browser and the CLI
  stores the key itself. If the user pastes a key anyway, do not repeat it,
  do not store it, do not pass it to any command; tell them it is now in the
  chat transcript and suggest revoking it at https://aimlapi.com/app/keys.
- [ ] **Never print, read or copy the key.** Do not run `aimlapi key print`.
  Do not open or `cat` the credentials file (`~/.aimlapi/credentials`, on
  Windows `%APPDATA%\aimlapi\credentials`) or the agent files that hold the
  key after setup (OpenCode `auth.json`, Cline `providers.json`). Do not dump
  the environment (`env`, `printenv`, `set`) — `AIMLAPI_API_KEY` may be in it.
  Use only the CLI's own output, which never shows the whole key (only a
  masked form or a short prefix).
- [ ] **Never put a key on a command line** (no `--apikey …`, no
  `AIMLAPI_API_KEY=… aimlapi …`, no `export AIMLAPI_API_KEY=…`).
- [ ] **Confirm before changing config.** Always run `--dry-run` first, show
  the user what will change, and wait for a clear yes. Never re-run
  `--config` on your own to "fix" something a later check reports — ask the
  user first.
- [ ] **Always pass `--model <id>` to every `--config` command** (dry run,
  apply and verify), with the same id each time. Without it, in a terminal the
  CLI opens an interactive model picker that you cannot answer and the command
  hangs; otherwise it takes the model remembered from an earlier run (or the
  default), which may not be the one the user confirmed.
- [ ] **Never run `aimlapi <agent>` without `--config`, `--dry-run` or
  `--undo`.** Plain `aimlapi claude` (etc.) *launches* an interactive agent
  session, which would hang your shell tool.
- [ ] Run every `aimlapi` command with `AIMLAPI_NO_UPDATE_CHECK=1` (as in
  the examples) so a new-version notice cannot interrupt setup. The examples
  use POSIX shell syntax. In PowerShell set the variable in the same command
  line (your shell tool may start a new shell per command) and replace a
  trailing `</dev/null` with a leading `$null |`, e.g.
  `$env:AIMLAPI_NO_UPDATE_CHECK=1; $null | aimlapi <agent> --config --model <id>`.
  Keep stdin closed like this: without a stored key, `--config` then exits
  `3` instead of starting an interactive login you cannot answer.
- [ ] Do not use `sudo`, change system settings, or install other software
  (Node.js, the agent itself) without asking the user.
- [ ] Do not commit or share the files this changes. If the user keeps their
  home directory or dotfiles in git, warn them before applying.
- [ ] If your sandbox blocks network access or writes outside the workspace,
  ask the user to approve the command through your normal permission
  mechanism, or to run it in their own terminal. Do not work around the
  sandbox.

## Exit codes

Every `aimlapi` command exits with one of these. Branch on the code, and show
the user the command's stderr when it is not 0.

| Code | Meaning | What to do |
| ---- | ------- | ---------- |
| `0` | success | continue |
| `1` | general error (network, file, server, agent too old) | show the error, stop, ask the user |
| `2` | usage error, or `--config` run from `npx` | fix the command; for `--config` see step 5 |
| `3` | not signed in, or the server rejected the key | run step 4 (login) |
| `4` | the agent is not installed | show the printed install command, ask the user |

## Workflow

- [ ] 1. Pick the agent
- [ ] 2. Check Node.js
- [ ] 3. Check sign-in
- [ ] 4. Sign in (only if step 3 exits 3)
- [ ] 5. Install the CLI globally
- [ ] 6. Choose the model and preview the change (`--dry-run`)
- [ ] 7. Apply it (`--config`) after the user confirms
- [ ] 8. Verify and tell the user how to restart

### 1. Pick the agent

The agent ids are `claude` (Claude Code), `codex` (Codex), `opencode`
(OpenCode) and `cline` (Cline). If the user named an agent, use it. Otherwise
configure the agent you are running in: you normally know it from your own
instructions. These environment variables confirm it (check only these names;
do not print the whole environment):

```sh
env | grep -E '^(CLAUDECODE|CODEX_THREAD_ID|CODEX_SANDBOX|OPENCODE)='
```

```powershell
Get-ChildItem Env: | Where-Object Name -in 'CLAUDECODE','CODEX_THREAD_ID','CODEX_SANDBOX','OPENCODE' | Select-Object Name, Value
```

| Variable present | Agent id |
| ---------------- | -------- |
| `CLAUDECODE=1` | `claude` |
| `CODEX_THREAD_ID` or `CODEX_SANDBOX` | `codex` |
| `OPENCODE=1` | `opencode` |
| none of these, and you are Cline | `cline` |

If you are not sure, ask the user which agent to configure. Tell the user
which one you picked before going on.

### 2. Check Node.js

```sh
node --version
npm --version
```

Node.js 18 or newer is required. If `node` or `npm` is missing or older, stop
and ask the user to install the current LTS from https://nodejs.org (do not
install it yourself without permission).

### 3. Check sign-in

First check, without printing its value, whether an API key is set in the
environment:

```sh
[ -n "$AIMLAPI_API_KEY" ] && echo set || echo unset
```

```powershell
if ($env:AIMLAPI_API_KEY) { 'set' } else { 'unset' }
```

If it is `set`, tell the user: `AIMLAPI_API_KEY` overrides the key stored by
`aimlapi login` for every `aimlapi` command, and for `opencode` and `cline`,
`--config` writes **that** key into the agent's config files. Ask whether to
continue with it or have them unset it in their own shell profile first.

Then:

```sh
AIMLAPI_NO_UPDATE_CHECK=1 npx -y aimlapi@latest status
```

- Exit `0`: the user is signed in. The output shows the environment, the
  masked key and the balance. Go to step 5.
- Exit `3`: not signed in, or the stored key was rejected (revoked). Go to
  step 4.
- Anything else: show the error and stop.

If the balance is zero or "low balance" is shown, tell the user that requests
will fail until they top up in the dashboard (https://aimlapi.com/app);
setup can still continue.

### 4. Sign in

Tell the user: "A browser window will open. Sign in to AI/ML API and approve
the aimlapi CLI. The CLI stores the API key on this computer; I never see it."
Then run:

```sh
AIMLAPI_NO_UPDATE_CHECK=1 npx -y aimlapi@latest login
```

- The command waits until the user approves (up to 10 minutes). Run it with a
  long timeout, or in the background and poll its output. It prints progress
  and any link on **stderr** — relay every link or code it prints to the user
  exactly as printed.
- Over SSH, on Linux without a display, or when no browser can be opened, the
  CLI switches to a **device code**: it prints a link the user opens on any
  device. To force this flow, add `--device`. If your shell tool shows output
  only after the command ends, run it in the background so you can show the
  user the link while it waits.
- If you cannot keep a command running that long, ask the user to run the same
  command in their own terminal (in Claude Code they can type
  `! AIMLAPI_NO_UPDATE_CHECK=1 npx -y aimlapi@latest login` in the
  prompt), then continue.
- Exit `3` here means the request was denied, expired or timed out: show the
  message and ask whether to try again.

When it succeeds it prints `Logged in to AI/ML API (prod). API key <prefix>…
saved to …` (only a short prefix of the key). Run the `status` command from
step 3 again and expect exit `0`.

### 5. Install the CLI globally

`--config` writes settings that stay after this session. For Claude Code and
Codex they include the absolute path of the `aimlapi` binary (the agent runs
`aimlapi key print` to get the key). A binary started by `npx` lives in a
temporary cache that can be deleted, so the CLI refuses `--config` for Claude
Code and Codex from `npx` with exit `2` (OpenCode and Cline store no binary
path, but a global install is still the way to keep using `aimlapi`). First
check whether it is installed already:

```sh
aimlapi --version
```

If it prints a version, the `aimlapi` command is installed already — from the
npm package `aimlapi` or from its alias `aimlapi-cli`, which installs the same
`aimlapi` command. Keep it: skip the install and go to step 6. Do not install
the other package next to it and do not uninstall anything.

Only if `aimlapi` is not found, install it:

```sh
npm install -g aimlapi
aimlapi --version
```

- If npm fails with `EEXIST` (a file `aimlapi` already exists, usually from
  `aimlapi-cli`), an `aimlapi` is installed already: keep the existing install
  and continue. Do not retry with `--force`. If `aimlapi --version` still
  cannot find it, see the `PATH` item below.
- If npm fails with `EACCES` (permission denied), do **not** retry with
  `sudo` on your own. Explain the error and ask the user whether they want to
  run `sudo npm install -g aimlapi` themselves or fix their npm prefix
  (https://docs.npmjs.com/resolving-eacces-permissions-errors-when-installing-packages-globally).
- If `aimlapi` is not found after install, the npm global `bin` directory is
  not on `PATH`: show the user `npm prefix -g` and ask them to add its `bin`
  (Windows: the prefix itself) to `PATH`, then open a new shell.

The sign-in from step 4 is shared: the global `aimlapi` uses the same stored
key. From now on use `aimlapi …`, not `npx`.

### 6. Choose the model and preview the change

List the models this agent can use (no sign-in needed):

```sh
AIMLAPI_NO_UPDATE_CHECK=1 aimlapi models --agent <agent>
```

The row whose `PRESET` column says `default` is the recommended model (with
`--json`: `"default": true`). Offer it to the user and use another id from
the list only if they ask for one. Write the chosen id down: steps 6, 7 and
8 must all pass exactly this `--model <id>`.

If no row says `default`:

- Exit `0`, and stderr has `note: preset <id> (the default) is not listed …`:
  the catalog does not list the recommended model for this agent right now.
  Tell the user, and offer that `<id>` (it may not work until the catalog
  lists it again) or a model from the list; use what they choose.
- Exit `1` (the catalog could not be loaded): show the error, then ask the
  user for the model id to use (https://aimlapi.com/models lists them) or
  whether to try again later. Do not guess an id.

```sh
AIMLAPI_NO_UPDATE_CHECK=1 aimlapi <agent> --config --dry-run --model <id> </dev/null
```

The dry run changes nothing. It prints the files it would create or edit,
with a diff (secrets masked), and notes. Summarize it for the user: which
files change, what is added, what is replaced, and the notes. Show the full
output if they ask. What each agent gets:

| Agent | Agent files changed by `--config` | Key storage |
| ----- | --------------------------------- | ----------- |
| `claude` | `~/.claude/settings.json` (or `$CLAUDE_CONFIG_DIR/settings.json`): `env` (base URL, models, headers) and `apiKeyHelper` | none in the file: Claude Code runs `aimlapi key print` |
| `codex` | new profile `~/.codex/aimlapi.config.toml` (or `$CODEX_HOME`); `config.toml` is **not** touched | none in the file: Codex runs `aimlapi key print` |
| `opencode` | provider `aimlapi-cli` in OpenCode's global `opencode.json`; sets `model` only if the user has none | OpenCode's `auth.json` (mode 0600) |
| `cline` | provider `openai-compatible` in `~/.cline/data/settings/providers.json`, made the default (shared by the Cline CLI, VS Code and JetBrains) | in `providers.json` (Cline's own store) |

For every agent the dry run also shows a `create` of
`~/.aimlapi/agents/<agent>/previous/<hash>.json`: aimlapi's own record of the
values (for Codex: the profile file) it replaces, which `--undo` uses to
restore them. Every file the CLI
changes is backed up first, under `~/.aimlapi/backups/<agent>/<timestamp>/`.

Codex older than 0.131 cannot load profile files: the dry run already fails
with exit `1` and asks to update Codex (`npm install -g @openai/codex@latest`).
Tell the user; update only if they agree.

Then ask: "Apply these changes?" Continue only on a clear yes.

### 7. Apply

Run the same command without `--dry-run`, with the same `--model <id>`:

```sh
AIMLAPI_NO_UPDATE_CHECK=1 aimlapi <agent> --config --model <id> </dev/null
```

It prints `Updated N file(s); backup: <dir>`, the files, and `Note:` lines.
Relay the notes and the backup directory to the user.

- Exit `3`: there are no stored credentials (`--config` only checks that a
  key exists; it does not contact the server). Go back to step 4.
- Exit `4`: the agent is not installed. Show the printed install command and
  ask the user.

### 8. Verify and restart

```sh
AIMLAPI_NO_UPDATE_CHECK=1 aimlapi status
AIMLAPI_NO_UPDATE_CHECK=1 aimlapi <agent> --config --dry-run --model <id> </dev/null
```

Use the same `--model <id>` as in step 7. `status` must exit `0`. The dry run
must list every file as `unchanged` — the config is in place. If it shows
changes instead, do **not** run `--config` again: show the user the output and
ask what to do (the agent or the user may have edited the file since).

Then tell the user how to pick it up:

| Agent | How to start using AI/ML API | Extra check |
| ----- | ---------------------------- | ----------- |
| `claude` | Quit Claude Code and start it again; every new session uses AI/ML API. | In the new session, `/status` shows the AI/ML API base URL. |
| `codex` | Start Codex with the profile: `codex --profile aimlapi`. Plain `codex` keeps the previous provider. | — |
| `opencode` | Restart OpenCode. If the user already had a default model, pick an `aimlapi-cli/…` model with `/models`. | `opencode models aimlapi-cli` lists AI/ML API models. |
| `cline` | The Cline CLI uses it on the next run. In VS Code: Command Palette → "Developer: Reload Window". | — |

This session keeps running on its current provider until the user restarts;
say so.

## Roll back

Preview, confirm with the user, then undo:

```sh
AIMLAPI_NO_UPDATE_CHECK=1 aimlapi <agent> --undo --dry-run </dev/null
AIMLAPI_NO_UPDATE_CHECK=1 aimlapi <agent> --undo </dev/null
```

`--undo` removes exactly what `--config` added and restores the values it
replaced; the user's other settings are kept (Codex: deletes the `aimlapi`
profile, or puts back a profile of the user's that `--config` replaced;
Cline: restores the previous OpenAI Compatible provider). A file in which the
user has since replaced aimlapi's settings by hand is left as it is; a Codex
profile edited since `--config` makes `--undo` exit `1` without changing it
(show the message to the user). Every file `--undo` changes is backed up too.

Optional, after `--undo` for every configured agent:

- Sign out: revokes the CLI's API key and removes it from this computer,
  including the copies aimlapi wrote into OpenCode and Cline configs at their
  usual locations, and the agent config backups taken for that environment or
  holding the key:

  ```sh
  AIMLAPI_NO_UPDATE_CHECK=1 aimlapi logout
  ```

  Copies written to a non-default location (Cline with `$CLINE_DIR`,
  `$CLINE_DATA_DIR` or `--data-dir`, OpenCode with another
  `$XDG_DATA_HOME`) are only reported in a warning, not removed: run
  `aimlapi <agent> --undo` with the same settings first.
- `npm uninstall -g aimlapi` removes the CLI (`npm uninstall -g aimlapi-cli`
  if it came from the alias, see step 5). Do this only after `--undo`:
  Claude Code and Codex configs point at the `aimlapi` binary.

## Troubleshooting

| Symptom | Cause | Action |
| ------- | ----- | ------ |
| `--config … runs from a temporary package-runner cache (npx)`, exit `2` | `--config` run through `npx` | step 5, then use `aimlapi` |
| `not logged in to AI/ML API`, exit `3` | no stored key | step 4 |
| `<Agent> is not installed`, exit `4` | agent binary not on `PATH` (Cline needs the `cline` CLI even for the VS Code extension) | show the printed install command; install only if the user agrees |
| `codex … cannot load profile files`, exit `1` | Codex older than 0.131 | ask the user to update Codex, then repeat step 6 |
| a `--config` command prints a menu and never ends | `--model` was left out in a terminal | stop it; re-run with `--model <id>` and `</dev/null` |
| `warning: AIMLAPI_API_KEY is set` | a key in the environment overrides the stored one | tell the user (step 3); do not print the variable |
| `could not fetch the model catalog` | network hiccup | harmless warning; setup still applies |
| `Config is up to date (0 changes)` on `--undo` | nothing of aimlapi's is left in the agent's config | nothing to do |
