---
description: >-
  Connect Claude Code, Codex, OpenCode, Cline, OpenClaude, OpenClaw, Hermes
  Agent, zero or ZCode to AI/ML API with one command using the aimlapi CLI.
icon: terminal
---

# CLI

`aimlapi` is the AI/ML API command-line tool. It signs you in through the browser, creates an API key for you, and starts your coding agent already connected to AI/ML API:

```bash
npx aimlapi claude
```

You don't copy a key or edit config files by hand. Usage is billed to your AI/ML API account like any other API request.

## Supported agents

| Agent                                                                  | Command              | Default model                                                                                   | If the agent is missing                          |
| ---------------------------------------------------------------------- | -------------------- | ----------------------------------------------------------------------------------------------- | ------------------------------------------------ |
| [Claude Code](cli.md#claude-code)                                      | `aimlapi claude`     | [`anthropic/claude-sonnet-5`](../api-references/text-models-llm/Anthropic/claude-sonnet-5.md) | offers `npm install -g @anthropic-ai/claude-code` |
| [Codex](cli.md#codex)                                                  | `aimlapi codex`      | [`openai/gpt-5.6-sol`](../api-references/text-models-llm/openai/gpt-5.6-sol.md)               | offers `npm install -g @openai/codex`            |
| [OpenCode](cli.md#opencode)                                            | `aimlapi opencode`   | [`anthropic/claude-sonnet-5`](../api-references/text-models-llm/Anthropic/claude-sonnet-5.md) | offers `npm install -g opencode-ai`              |
| [Cline](cli.md#cline)                                                  | `aimlapi cline`      | [`anthropic/claude-sonnet-5`](../api-references/text-models-llm/Anthropic/claude-sonnet-5.md) | offers `npm install -g cline`                    |
| [OpenClaude](cli.md#openclaude)                                        | `aimlapi openclaude` | [`anthropic/claude-sonnet-5`](../api-references/text-models-llm/Anthropic/claude-sonnet-5.md) | offers `npm install -g @gitlawb/openclaude`      |
| [OpenClaw](cli.md#openclaw)                                            | `aimlapi openclaw`   | [`anthropic/claude-sonnet-5`](../api-references/text-models-llm/Anthropic/claude-sonnet-5.md) | offers `npm install -g openclaw@latest`          |
| [Hermes Agent](cli.md#hermes-agent)                                    | `aimlapi hermes`     | [`anthropic/claude-sonnet-5`](../api-references/text-models-llm/Anthropic/claude-sonnet-5.md) | prints the Hermes install command                |
| [zero](cli.md#zero)                                                    | `aimlapi zero`       | [`anthropic/claude-sonnet-5`](../api-references/text-models-llm/Anthropic/claude-sonnet-5.md) | offers `npm install -g @gitlawb/zero`            |
| [ZCode](cli.md#zcode)                                                  | `aimlapi zcode`      | [`zhipu/glm-5.3`](../api-references/text-models-llm/zhipu/glm-5.3.md)                         | prints where to build it from source             |

Supported platforms: macOS, Linux and Windows, on x64 and arm64.

## Install

You need an **AI/ML API account** with a positive balance. You can top up at [https://aimlapi.com/app/billing](https://aimlapi.com/app/billing).

{% tabs %}
{% tab title="npx (no install)" %}
Needs Node.js 18+ and npm.

```bash
npx aimlapi <command>
```
{% endtab %}

{% tab title="npm (global)" %}
Needs Node.js 18+ and npm.

```bash
npm i -g aimlapi
aimlapi <command>
```
{% endtab %}

{% tab title="macOS / Linux (no Node)" %}
```bash
curl -fsSL https://aimlapi.com/install.sh | sh
```

Installs `aimlapi` into `~/.local/bin`. If that directory is not on your `PATH`, the script prints the line to add to your shell's rc file (it never edits rc files).
{% endtab %}

{% tab title="Windows (no Node)" %}
In PowerShell:

```powershell
irm https://aimlapi.com/install.ps1 | iex
```

Installs `aimlapi` into `%LOCALAPPDATA%\aimlapi\bin` and adds that directory to your user `PATH`. Open a new terminal afterwards.
{% endtab %}
{% endtabs %}

The command is called `aimlapi`, and the examples on this page use it. If you run the CLI through npx, use `npx aimlapi` in its place.

* **Install scripts.** They download the same binary that `npm i -g aimlapi` installs from the npm registry, check its sha512 and install it without `sudo`. Settings (environment variables): `AIMLAPI_INSTALL_DIR` (another directory), `AIMLAPI_VERSION` (a specific version, default `latest`), `AIMLAPI_NPM_REGISTRY`, and on Windows `AIMLAPI_INSTALL_NO_MODIFY_PATH=1` (don't touch `PATH`).
* **Alias.** The npm package `aimlapi-cli` is an alias of `aimlapi` with the same `aimlapi` command (`npx aimlapi-cli claude`, `npm i -g aimlapi-cli`). Install only one of the two globally.
* **Updates.** Once a day the CLI checks for a new release and prints a one-line notice (outside agent sessions it may also offer to update right away). `aimlapi update` updates it the way it was installed: with `npm i -g aimlapi@latest` (or `aimlapi-cli@latest`) for an npm install, or by downloading, verifying and replacing the binary for a script install. It only moves to a newer release. Through npx there is nothing to update; run `npx aimlapi@latest <command>` to get the newest version. To turn the check off, set `AIMLAPI_NO_UPDATE_CHECK=1`; it is also off when `CI=true`.

{% hint style="info" %}
For **Claude Code, Codex** and **Hermes Agent**, `--config` (see [Agent commands](cli.md#agent-commands)) saves the path of the `aimlapi` binary into the agent's config, so it needs an installed `aimlapi` (npm global or install script). A binary run through npx sits in a temporary cache that npm can delete at any time: under npx, `--config` for these agents stops with exit code `2` and asks you to run `npm i -g aimlapi` first.
{% endhint %}

## Quick start

{% stepper %}
{% step %}
### Start your agent

```bash
aimlapi claude      # or codex, opencode, cline, openclaude, openclaw, hermes, zero, zcode
```
{% endstep %}

{% step %}
### Install the agent (only if it's missing)

If the agent isn't installed, `aimlapi` shows the exact install command and asks, for example:

```
Claude Code is not installed. Install it now? npm install -g @anthropic-ai/claude-code [Y/n]
```

See [Missing agents](cli.md#missing-agents).
{% endstep %}

{% step %}
### Pick a model

In an interactive terminal, the CLI shows a model picker with the agent's default preselected. To skip it, pass `--model <id>`. Later runs reuse the model you picked last (the CLI tells you so); pass `--model` to choose another.
{% endstep %}

{% step %}
### Sign in (first run only)

If no key is stored yet, the CLI opens your browser. **Sign in to AI/ML API** and **approve the aimlapi CLI**. On that page you can also set an optional **USD limit** for the new key. The key is created and saved on your computer. The CLI also prints the link, in case the browser doesn't open.
{% endstep %}

{% step %}
### Work

The agent starts with AI/ML API as its provider. What the CLI writes, if anything, depends on the agent: see its section below.
{% endstep %}
{% endstepper %}

## Agent commands

Every agent takes the same flags:

```
aimlapi <agent> [--model <id>] [--config | --undo] [--dry-run] [--yes] [-- <agent arguments>]
```

| Flag                   | What it does                                                                                                                                                                                    |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| _(none)_               | Configures the agent for this run and starts it.                                                                                                                                                |
| `--model <id>`         | The model to use. Without it, the CLI reuses the model you picked last for this agent; the first time, you get a picker in an interactive terminal, otherwise (no terminal, or `CI=true`) the default model. An id that isn't a preset is checked against the [catalog](cli.md#models). |
| `--config`             | Saves the configuration into the agent's own config files and exits, so the agent uses AI/ML API when you start it directly.                                                                   |
| `--undo`               | Reverts what the CLI wrote into the agent's config files and puts back the values it replaced. Works even when the agent is no longer installed.                                                |
| `--force`              | With `--undo`: restore files even if they were edited after the CLI wrote them.                                                                                                                 |
| `--dry-run`            | Prints what would happen (environment variables, file diffs, the command line) with secrets masked, and changes nothing. Combine it with `--config` or `--undo` to preview them.                |
| `--yes`, `-y`          | Installs a missing agent with npm without asking.                                                                                                                                               |
| `-- <agent arguments>` | Everything after `--` is passed to the agent unchanged.                                                                                                                                         |

**What the CLI changes and keeps safe:**

* The API key never appears on a command line. The agent gets it from a credential helper (`aimlapi key print`), from an environment variable of the agent process only, or from the agent's own config or credential store (mode `0600`), or, for OpenClaw, from aimlapi's credentials file.
* Before writing any agent file, the CLI copies the original to `~/.aimlapi/backups/<agent>/<timestamp>/`. A repeated run that changes nothing writes nothing.
* The CLI only changes the settings it owns. Other settings in the file stay as they are, and a value it replaces is restored by `--undo`.

### Missing agents

When the agent isn't installed, `aimlapi` offers to install its official npm package and prints the exact command first. Press Enter (or type `y`) to install; the run then goes on with the model picker and the launch.

* It asks only in an interactive terminal (and not when `CI` is set). `--yes` installs without asking, also in CI.
* Without a terminal, with `CI` set, with `--dry-run`, or when you decline, it only prints the command and exits with code `4`.
* npm runs in your environment without the CLI's variables (no API key) and never with `sudo`. On an `EACCES` error, the CLI suggests a user-writable npm prefix. If npm's global `bin` directory is not on your `PATH`, it names that directory.
* **Hermes Agent** (installed by its own script) and **ZCode** (the `zcode` command is built from source) are not installed automatically: the CLI prints how to install them. Node.js isn't installed either.

### Model presets

The picker offers the agent's presets first:

* Anthropic: `anthropic/claude-sonnet-5`, `anthropic/claude-opus-5`, `anthropic/claude-opus-5.5`, `anthropic/claude-haiku-4.5`, for every agent except Codex and ZCode.
* OpenAI: `openai/gpt-5.6-sol`, `openai/gpt-5.6-terra`, `openai/gpt-6-astra`, for Codex, OpenCode, Cline, OpenClaw, Hermes Agent and zero.
* GLM: `zhipu/glm-5.3`, `z-ai/glm-5.3-flash`, `zhipu/glm-5.2`, `zhipu/glm-5.1`, `z-ai/glm-5-turbo`, for ZCode.

You can pass any other model from `aimlapi models --agent <agent>` with `--model`.

### Claude Code

```bash
aimlapi claude
aimlapi claude --model opus
aimlapi claude -- -p "Explain the architecture of this project"
```

**Launch.** Runs `claude --settings '<json>' --model <model>`. The inline settings contain an `env` block (base URL `https://api.aimlapi.com`, the model slots, tracking headers) and `apiKeyHelper`, which Claude Code runs to get the key from `aimlapi key print`. Settings on the command line take priority over your settings files, so no file is written. `ANTHROPIC_API_KEY` and `ANTHROPIC_AUTH_TOKEN` are set to empty, so an Anthropic key exported in your shell is never sent to AI/ML API.

**Model slots.** `--model` also accepts the Claude Code tier aliases:

| Claude Code slot / alias | AI/ML API model              |
| ------------------------ | ---------------------------- |
| `opus`                   | `anthropic/claude-opus-5.5`  |
| `sonnet`                 | `anthropic/claude-sonnet-5`  |
| `haiku`                  | `anthropic/claude-haiku-4.5` |
| subagents                | `anthropic/claude-sonnet-5`  |

**`--config`.** Merges the same `env` keys and `apiKeyHelper` into `~/.claude/settings.json` (or `$CLAUDE_CONFIG_DIR/settings.json`). Needs an installed `aimlapi`, not npx.

{% hint style="warning" %}
After `aimlapi claude --config`, **every** Claude Code session goes through AI/ML API and is billed to your AI/ML API account, including a plain `claude` started from any terminal, until you run `aimlapi claude --undo`.
{% endhint %}

### Codex

```bash
aimlapi codex
aimlapi codex --model openai/gpt-5.6-terra
aimlapi codex -- exec "explain this repo"
```

**Launch.** Runs `codex` with `-c` overrides that add the model provider `aimlapi-cli` (Responses API at `https://api.aimlapi.com/v1`, tracking headers). Codex gets the key by running `aimlapi key print`. No file is written.

**`--config`.** Writes a separate profile, `~/.codex/aimlapi.config.toml` (or `$CODEX_HOME/aimlapi.config.toml`), without the key. Your `config.toml` is never modified, and a plain `codex` works as before. Start Codex with the profile:

```bash
aimlapi codex --config
codex --profile aimlapi
```

**`--undo`** deletes the profile, or puts back a profile of yours that `--config` replaced.

{% hint style="info" %}
Codex **0.118.0** or newer gets the key from `aimlapi key print`; with an older Codex, the key is passed in `AIMLAPI_API_KEY` of the Codex process only, and the CLI prints a notice. `--config` needs Codex **0.131.0** or newer. To update Codex, run `npm install -g @openai/codex@latest`.
{% endhint %}

### OpenCode

```bash
aimlapi opencode
aimlapi opencode --model openai/gpt-5.6-sol
aimlapi opencode -- run "explain this repo"
```

**Launch.** Runs `opencode` with an inline config in `OPENCODE_CONFIG_CONTENT` (provider `aimlapi-cli`, shown as **AIMLAPI**, OpenAI-compatible at `https://api.aimlapi.com/v1`, the preset models) and the key in `AIMLAPI_API_KEY` of the OpenCode process only. No file is written. Models appear as `aimlapi-cli/<model id>`, for example `aimlapi-cli/anthropic/claude-sonnet-5`.

**`--config`.** Adds the provider (without the key) to OpenCode's global config (`~/.config/opencode/opencode.json`, or `opencode.jsonc`, or `$OPENCODE_CONFIG`) and stores the key in OpenCode's credential store `auth.json` (mode `0600`). It sets the default `model` only if you have none; otherwise pick an `aimlapi-cli/…` model with `/models`. After `--config`, a launch keeps the stored key current.

### Cline

```bash
aimlapi cline
aimlapi cline --model openai/gpt-5.6-sol
aimlapi cline -- "explain this repo"
```

**Every run** writes Cline's provider store `~/.cline/data/settings/providers.json` (mode `0600`), because Cline has no flag for a base URL: the built-in **OpenAI Compatible** provider gets `https://api.aimlapi.com/v1`, the key, the model and tracking headers, and becomes Cline's default. A launch then runs `cline -P openai-compatible -m <model>`; `--config` stops after the write.

{% hint style="warning" %}
The Cline CLI, the Cline VS Code extension and the JetBrains plugin share this provider store. After any `aimlapi cline` run, all of them use AI/ML API by default until you run `aimlapi cline --undo`. Cline keeps only **one** OpenAI Compatible provider: if you had one for another endpoint, the CLI replaces it and `--undo` puts it back. If the VS Code extension is open, reload the window (Command Palette → **Developer: Reload Window**).
{% endhint %}

`aimlapi cline` needs the `cline` command even if you only use the VS Code extension. It finds the provider store the way Cline does (`CLINE_PROVIDER_SETTINGS_PATH`, `CLINE_DATA_DIR`, `CLINE_DIR`, and `--config <dir>` / `--data-dir <dir>` after `--`); run `--undo` with the same settings.

### OpenClaude

```bash
aimlapi openclaude
aimlapi openclaude --model opus
```

**Launch.** Connects [OpenClaude](../integrations/openclaude.md) over AI/ML API's Anthropic-compatible route (`/v1/messages`): the base URL, model slots (the same as for [Claude Code](cli.md#claude-code)) and tracking headers are set in its environment, and the key in `ANTHROPIC_AUTH_TOKEN` of the OpenClaude process only. No file is written. OpenClaude's built-in `aimlapi.com` preset is not used, and `AIMLAPI_API_KEY` is removed from the session.

**`--config`.** Writes the same variables, with the key, into the `env` of `~/.openclaude/settings.json` (or `$OPENCLAUDE_CONFIG_DIR/settings.json`, mode `0600`); after `--config`, a launch keeps the stored key current. Picking another provider with `/provider` later removes only part of these settings; to remove them, run `aimlapi openclaude --undo`.

### OpenClaw

```bash
aimlapi openclaw
aimlapi openclaw --config
```

[OpenClaw](../integrations/openclaw.md) has no per-run provider switch, so **every run** writes its config (`~/.openclaw/openclaw.json`, or the file `$OPENCLAW_CONFIG_PATH`, `$OPENCLAW_STATE_DIR` or a `--profile <name>` after `--` selects): the OpenAI-compatible provider `aimlapi-cli` with the preset models, and the default model `aimlapi-cli/<model>`. A launch then starts `openclaw`; `--config` only writes. A running Gateway reloads the config by itself.

The key is not copied into `openclaw.json`: OpenClaw reads it from the CLI's credentials file. So sign in with `aimlapi login` first (`AIMLAPI_API_KEY` alone is not enough, exit code `3`), and run `openclaw secrets reload` after you log in with a new key or log out.

### Hermes Agent

```bash
aimlapi hermes
aimlapi hermes --config
```

[Hermes Agent](../integrations/hermes.md) is installed with its own script, not npm (`curl -fsSL https://hermes-agent.nousresearch.com/install.sh | bash`; the CLI prints the Windows command). Hermes has no per-run provider switch, so the CLI adds named custom providers (OpenAI-compatible, the preset models) to Hermes' `config.yaml` (`~/.hermes`, `$HERMES_HOME`, or the active Hermes profile). The key is not copied: Hermes runs `aimlapi key print` to get it.

* **Launch** writes the entry `aimlapi-cli-run` and starts `hermes --provider custom:aimlapi-cli-run -m <model>`, so a plain `hermes` keeps its default.
* **`--config`** writes the entry `aimlapi-cli` and makes it Hermes' default model. Needs an installed `aimlapi`, not npx. A running Hermes gateway needs `hermes gateway restart`.
* **`--undo`** removes both entries and puts back the `model:` keys they replaced. Only those lines of `config.yaml` change.

### zero

```bash
aimlapi zero
aimlapi zero --config
```

[zero](../integrations/zero.md) has no flag for a provider, so **every run** writes the OpenAI-compatible provider profile `aimlapi-cli` into zero's config (`~/.config/zero/config.json`, or `$XDG_CONFIG_HOME/zero/config.json`; on Windows `%AppData%\zero\config.json`). zero's built-in `aimlapi` preset is not used. The profile reads the key from `AIMLAPI_CLI_KEY`, so no key is written: a launch sets it for the zero process only. `--config` also makes the profile zero's default provider.

{% hint style="warning" %}
After `aimlapi zero --config`, `aimlapi zero` works as is, but a **plain `zero`** needs `AIMLAPI_CLI_KEY` in your shell. With an installed `aimlapi` (not npx), add this line to your shell profile:

```bash
export AIMLAPI_CLI_KEY="$(aimlapi key print)"
```

Without it, zero silently uses another provider it has a key for. Don't export `AIMLAPI_API_KEY` for this: it overrides the key saved by `aimlapi login` for every `aimlapi` command.
{% endhint %}

### ZCode

```bash
aimlapi zcode
aimlapi zcode --config
```

[ZCode](../integrations/zcode.md) is Z.ai's coding agent for GLM models. `aimlapi zcode` needs ZCode's terminal command `zcode`, which Z.ai does not publish as a package: [build it from source](https://github.com/zai-org/ZCode/blob/main/README.en.md#zcode-cli-distribution). The CLI adds the OpenAI-compatible provider `aimlapi-cli` (shown as **AI/ML API**) with the GLM presets; ZCode keeps the key in its provider config (mode `0600`).

* **Launch** gives `zcode` a provider config of the CLI's own (`$ZCODE_PERSONAL_PROVIDER_CONFIG_FILE`), so your `~/.zcode` is not changed. A provider you add inside such a session is saved into that file and is gone after `--undo` or `logout`: add your own providers in a plain `zcode` session or the desktop app. `zcode --web` can't be started this way; use `--config`.
* **`--config`** adds the provider to `~/.zcode/v2/provider_config.json` (or `$ZCODE_DATA_BASE_DIR/.zcode/v2`), shared by the ZCode desktop app, `zcode` and `zcode --web`, and makes its model the default. If the desktop app keeps its data in another folder, that copy is set up too. A running ZCode picks up the change by itself.

## Account commands

### `login`

```bash
aimlapi login
aimlapi login --device
```

`login` opens the browser, where you sign in and approve the aimlapi CLI. On the approval page you can set an optional **USD limit** for the new key and how often it resets. The key is saved to `~/.aimlapi/credentials` (file mode `0600`; on Windows `%APPDATA%\aimlapi\credentials`). You don't have to run `login` first: in an interactive terminal, agent commands start the same sign-in when no key is stored.

The **device code** flow (`--device`) prints a link that you open and approve on any device. The CLI picks it automatically over SSH, on Linux without a graphical display, and when it can't open a browser or a local port.

If you log in again, the stored key is replaced, but the previous key stays active. You can revoke it on the [API Keys page](https://aimlapi.com/app/keys).

### `logout`

```bash
aimlapi logout
```

Revokes the stored key on the server and removes it from your computer. Agent configs that hold a copy of that key (OpenCode, Cline, OpenClaude, ZCode) are reverted as `aimlapi <agent> --undo` would, and the agent config backups are deleted. If the server refuses or can't be reached, the key is still removed locally but may remain active: revoke it on the [API Keys page](https://aimlapi.com/app/keys). `logout` doesn't change `AIMLAPI_API_KEY`.

### `status`

```bash
aimlapi status
aimlapi status --json
```

Shows your account balance and the spend and limit of the API key in use. The key itself is only shown masked.

### `models`

```bash
aimlapi models
aimlapi models --agent claude
aimlapi models --agent codex --json
```

Lists AI/ML API chat models from the public catalog. No login is needed.

* Without `--agent`, you get every chat model and the agents that can use it.
* With `--agent <agent>`, you get only the models that agent can use: served on the agent's API and supporting tool calling. The agent's presets come first, with the default model and the model slots marked.
* With `--json`, the output is machine-readable.

### `update`

```bash
aimlapi update
aimlapi --version
```

Updates `aimlapi` to the latest version, through npm or, for a script install, by replacing the binary (see [Install](cli.md#install)).

## Set up from your agent

You can also let your coding agent set itself up. Paste this into any of the supported agents:

```
Read https://docs.aimlapi.com/quickstart/cli/aimlapi-setup.md and follow it to connect this agent to AI/ML API.
```

The agent signs you in through the browser (you approve; you never paste a key into the chat), shows what it will change with `--dry-run`, applies it after you confirm, and tells you how to undo it.

To install it as a Claude Code skill instead (then just ask Claude Code to "set up AI/ML API"), download the file with its frontmatter:

```bash
mkdir -p ~/.claude/skills/aimlapi-setup
curl -fsSL https://raw.githubusercontent.com/aimlapi/api-docs/main/skills/aimlapi-setup/SKILL.md -o ~/.claude/skills/aimlapi-setup/SKILL.md
```

## Troubleshooting

<details>

<summary>Headless server, SSH session or CI</summary>

Over SSH, the CLI uses the device code flow automatically. You can also force it with `aimlapi login --device`, then open the printed link on any device.

In a non-interactive session (no terminal, or `CI=true`), agent commands don't start a sign-in, don't show the model picker and don't ask to install a missing agent (pass `--yes` for that). Log in beforehand with `aimlapi login`, or provide a key through the environment:

```bash
export AIMLAPI_API_KEY=<YOUR_AIMLAPI_KEY>
```

Without a key, the command exits with code `3`. OpenClaw needs `aimlapi login`; the variable alone is not enough for it.

</details>

<details>

<summary>"… is not installed"</summary>

The agent isn't on your `PATH`. In a terminal the CLI offers to install it (see [Missing agents](cli.md#missing-agents)); otherwise it prints the install command and exits with code `4`. For Cline, the `cline` command is needed even if you use the VS Code extension; for ZCode, the `zcode` command, not only the desktop app.

</details>

<details>

<summary>"--config … runs from a temporary package-runner cache (npx)"</summary>

`--config` for Claude Code, Codex or Hermes Agent was run through npx. Install `aimlapi` (`npm i -g aimlapi` or an [install script](cli.md#install)) and run `aimlapi <agent> --config` again.

</details>

<details>

<summary>A different key than expected is used</summary>

`AIMLAPI_API_KEY` in your environment overrides the key saved by `aimlapi login` for every command. Unset it to use the saved key. Run `aimlapi status` to see which key is in use (masked).

</details>

<details>

<summary>Corporate proxy</summary>

The CLI's own requests (login, `models`, `status`, updates) respect the standard proxy variables:

```bash
export HTTPS_PROXY=http://proxy.example.com:8080
export NO_PROXY=localhost,127.0.0.1
```

Agents started by `aimlapi` inherit your environment; check your agent's documentation for its own proxy support. The browser sign-in returns to a local address (`127.0.0.1`). If your browser can't reach it, use `aimlapi login --device`.

</details>

<details>

<summary>Restoring an agent's configuration</summary>

To revert what the CLI wrote into an agent's config, run:

```bash
aimlapi claude --undo --dry-run   # preview
aimlapi claude --undo
```

Every other agent works the same way. A file in which you have since replaced the CLI's settings by hand is left as it is (`--force` restores it anyway).

The CLI also copies the original of every file before it changes it, to `~/.aimlapi/backups/<agent>/<timestamp>/` (Windows: `%APPDATA%\aimlapi\backups\<agent>\<timestamp>\`). Each backup has a `manifest.json` and the original files under `files/`. Backups can contain credentials that were in the original files, so treat them as secrets.

To remove the CLI itself, run `--undo` for every configured agent first (Claude Code, Codex and Hermes Agent configs point at the `aimlapi` binary), then `npm uninstall -g aimlapi`, or delete the binary if you used an install script.

</details>

<details>

<summary>Windows</summary>

The CLI keeps its files in `%APPDATA%\aimlapi` and runs the agent as a child process, forwarding Ctrl+C and the agent's exit code. The examples on this page use POSIX shell syntax; in PowerShell set variables with `$env:NAME = "value"`. OpenClaw refuses a credentials file whose permissions it can't verify as private, which is likely if you point `AIMLAPI_CONFIG_DIR` at a shared folder.

</details>

### Exit codes

| Code | Meaning                                                                                        |
| ---- | ---------------------------------------------------------------------------------------------- |
| `0`  | Success.                                                                                       |
| `1`  | General error (network, file, server, agent too old).                                          |
| `2`  | Invalid arguments, flags or environment values (for example, `--config` run through npx).      |
| `3`  | Authentication: not logged in, the key is invalid or rejected, or the sign-in was denied.      |
| `4`  | The coding agent is not installed, or its installation failed.                                 |

When the agent starts, its own exit code is returned when it finishes.

### Environment variables

| Variable                                  | Effect                                                                                     |
| ----------------------------------------- | ------------------------------------------------------------------------------------------ |
| `AIMLAPI_API_KEY`                         | API key to use instead of the one saved by `aimlapi login`, for every command.             |
| `AIMLAPI_CONFIG_DIR`                      | Directory for credentials and backups (default `~/.aimlapi`; Windows `%APPDATA%\aimlapi`). |
| `AIMLAPI_BASE_URL`                        | Overrides the API host (default `https://api.aimlapi.com`).                                |
| `AIMLAPI_NO_UPDATE_CHECK`                 | Set to `1` to turn off the daily new-version check.                                        |
| `AIMLAPI_CLI_KEY`                         | The key variable of zero's `aimlapi-cli` profile (see [zero](cli.md#zero)).                |
| `CI`                                      | When `true`: no model picker, no inline sign-in, no install prompt, no update check.       |
| `HTTPS_PROXY`, `NO_PROXY`                 | Proxy for the CLI's own requests.                                                          |
| `AIMLAPI_INSTALL_DIR`, `AIMLAPI_VERSION`  | Install scripts only: target directory and version (see [Install](cli.md#install)).        |
