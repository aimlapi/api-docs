---
description: >-
  Connect Claude Code, Codex, OpenCode or Cline to AI/ML API with one command
  using the aimlapi CLI.
icon: terminal
hidden: true
---

# CLI

`aimlapi` is the AI/ML API command-line tool. It signs you in through the browser, creates an API key for you, and starts your coding agent (**Claude Code, Codex, OpenCode** or **Cline**) already connected to AI/ML API:

```bash
npx @aimlapi/cli claude
```

You don't copy a key or edit config files by hand. Usage is billed to your AI/ML API account like any other API request.

## Prerequisites

* **Node.js 18+ and npm.** The CLI is distributed through npm.
* **An AI/ML API account** with a positive balance. You can top up at [https://aimlapi.com/app/billing](https://aimlapi.com/app/billing).
* **The coding agent you want to use**, installed and on your `PATH`. `aimlapi` does not install agents: if an agent is missing, it prints the install command and exits with code `4`.

Supported platforms: macOS and Linux (x64 and arm64). Windows builds (x64 and arm64) are published but **experimental**.

## Install

{% tabs %}
{% tab title="Run without installing" %}
```bash
npx @aimlapi/cli <command>
```
{% endtab %}

{% tab title="Install globally" %}
```bash
npm i -g @aimlapi/cli
aimlapi <command>
```
{% endtab %}
{% endtabs %}

The command is called `aimlapi`. The examples on this page use `aimlapi`. If you run the CLI through npx, use `npx @aimlapi/cli` in its place.

{% hint style="info" %}
`--config` (see [Agent commands](cli.md#agent-commands)) needs the global install. It saves the path of the `aimlapi` binary into the agent's config, and a binary run through npx sits in a temporary cache that npm can delete at any time. Under npx, `--config` stops with exit code `2` and asks you to run `npm i -g @aimlapi/cli` first.
{% endhint %}

**Updates.** Once a day, the CLI checks npm for a new release and prints a one-line notice when there is one. `aimlapi update` installs the latest version globally (`npm i -g @aimlapi/cli@latest`). To turn the check off, set `AIMLAPI_NO_UPDATE_CHECK=1`. The check is also off when `CI=true`.

## Quick start

{% stepper %}
{% step %}
### Start your agent

```bash
aimlapi claude      # or: aimlapi codex, aimlapi opencode, aimlapi cline
```
{% endstep %}

{% step %}
### Sign in (first run only)

If no key is stored yet, the CLI opens your browser. **Sign in to AI/ML API** and **approve the aimlapi CLI**. A new API key is created and saved on your computer. The CLI also prints the link, in case the browser doesn't open.
{% endstep %}

{% step %}
### Pick a model

In an interactive terminal, the CLI shows a model picker with the agent's default preselected. To skip it, pass `--model <id>`.
{% endstep %}

{% step %}
### Work

The agent starts with AI/ML API as its provider. Your own agent config files stay unchanged, except with Cline (see [Cline](cli.md#cline)).
{% endstep %}
{% endstepper %}

## Account commands

### `login`

```bash
aimlapi login
```

This opens the browser, where you sign in and approve the aimlapi CLI. A new API key is then saved to `~/.aimlapi/credentials` (file mode `0600`; on Windows, `%APPDATA%\aimlapi\credentials`). You don't have to run `login` before an agent command: in an interactive terminal, agent commands start the same sign-in when no key is stored.

```bash
aimlapi login --device
```

The **device code** flow prints a link that you open and approve on any device, such as your laptop when you are connected to a server over SSH. The CLI picks this flow automatically in an SSH session (`SSH_CONNECTION` / `SSH_TTY` set), on Linux without a graphical display (`DISPLAY` / `WAYLAND_DISPLAY` unset), and when it cannot open a browser or a local port.

If you log in again, the stored key is replaced, but the previous key stays active. You can revoke it on the [API Keys page](https://aimlapi.com/app/keys).

{% hint style="info" %}
If `AIMLAPI_API_KEY` is set in your environment, it overrides the stored key for **every** command.
{% endhint %}

### `logout`

```bash
aimlapi logout
```

This revokes the stored key on the server and removes it from your computer. If the server refuses or cannot be reached, the key is still removed locally but may remain active; revoke it on the [API Keys page](https://aimlapi.com/app/keys). `logout` doesn't change `AIMLAPI_API_KEY`.

### `status`

```bash
aimlapi status
aimlapi status --json
```

This shows your account balance and the spend and limit of the API key in use. The key itself is shown masked.

### `models`

```bash
aimlapi models
aimlapi models --agent claude
aimlapi models --agent codex --json
```

This lists AI/ML API chat models from the public catalog. It doesn't need a login.

* Without `--agent`, you get every chat model and the agents that can use it.
* With `--agent claude|codex|opencode|cline`, you get only the models that agent can use: models served on the agent's API that support tool calling. The agent's presets come first, with the default model and the model slots marked.
* With `--json`, the output is machine-readable.

### `--env`

`--env prod|dev` selects the backend environment. The default is `prod`, and you normally never need this flag. Keys are stored per environment.

## Agent commands

All four agents take the same flags:

```
aimlapi <agent> [--model <id>] [--config | --undo] [--dry-run] [-- <agent arguments>]
```

| Flag                  | What it does                                                                                                                                                                                                                                             |
| --------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| _(none)_              | Configures the agent for this run and starts it.                                                                                                                                                                                                        |
| `--model <id>`        | The model to use. Without it, you get a picker in an interactive terminal; otherwise (no TTY, or `CI=true`) the agent's default model is used. An id that isn't a preset is checked against the [catalog](cli.md#models).                               |
| `--config`            | Saves the configuration into the agent's own config files and exits, so the agent uses AI/ML API when you start it directly. Needs the [global install](cli.md#install).                                                                                |
| `--undo`              | Reverts what the CLI wrote into the agent's config files and puts back the values it replaced.                                                                                                                                                           |
| `--dry-run`           | Prints what would happen (environment variables, file diffs, the command line) with secrets masked, and changes nothing. You can combine it with `--config` or `--undo`.                                                                                 |
| `-- <agent arguments>` | Everything after `--` is passed to the agent unchanged.                                                                                                                                                                                                 |

**What the CLI changes and keeps safe:**

* The API key never appears on a command line. The agent gets it from a credential helper (`aimlapi key print`), from an environment variable of the agent process only, or from the agent's own credential store (0600).
* Before writing any agent file, the CLI copies the original to `~/.aimlapi/backups/<agent>/<timestamp>/`. A repeated run that changes nothing writes nothing.
* The CLI only changes the settings it owns. Other settings in the file stay as they are, and a value it replaces is shown in a warning and restored by `--undo`.

### Default models

| Agent       | Command            | Default model                                                                                   | Install the agent with                     |
| ----------- | ------------------ | ----------------------------------------------------------------------------------------------- | ------------------------------------------ |
| Claude Code | `aimlapi claude`   | [`anthropic/claude-sonnet-5`](../api-references/text-models-llm/Anthropic/claude-sonnet-5.md) | `npm install -g @anthropic-ai/claude-code` |
| Codex       | `aimlapi codex`    | [`openai/gpt-5.6-sol`](../api-references/text-models-llm/openai/gpt-5.6-sol.md)               | `npm install -g @openai/codex`             |
| OpenCode    | `aimlapi opencode` | [`anthropic/claude-sonnet-5`](../api-references/text-models-llm/Anthropic/claude-sonnet-5.md) | `npm install -g opencode-ai`               |
| Cline       | `aimlapi cline`    | [`anthropic/claude-sonnet-5`](../api-references/text-models-llm/Anthropic/claude-sonnet-5.md) | `npm install -g cline`                     |

The picker offers these presets first:

* Anthropic: `anthropic/claude-sonnet-5`, `anthropic/claude-opus-5`, `anthropic/claude-opus-5.5`, `anthropic/claude-haiku-4.5`, for Claude Code, OpenCode and Cline.
* OpenAI: `openai/gpt-5.6-sol`, `openai/gpt-5.6-terra`, `openai/gpt-6-astra`, for Codex, OpenCode and Cline.

You can pass any other model from `aimlapi models --agent <agent>` with `--model`.

### Claude Code

```bash
aimlapi claude
aimlapi claude --model opus
aimlapi claude -- -p "Explain the architecture of this project"
```

**Launch.** Runs `claude --settings '<json>' --model <model>`. The inline settings contain an `env` block (base URL `https://api.aimlapi.com`, the model slots, AI/ML API tracking headers) and `apiKeyHelper`, which Claude Code runs to get the key from `aimlapi key print`. Settings given on the command line take priority over your settings files, so no file is written. `ANTHROPIC_API_KEY` and `ANTHROPIC_AUTH_TOKEN` are set to empty for the session, so an Anthropic key exported in your shell is never sent to AI/ML API.

**Model slots.** Claude Code switches between model tiers. The CLI maps each tier to an AI/ML API model. `--model` also accepts the tier aliases:

| Claude Code slot / alias | AI/ML API model              |
| ------------------------ | ---------------------------- |
| `opus`                   | `anthropic/claude-opus-5.5`  |
| `sonnet`                 | `anthropic/claude-sonnet-5`  |
| `haiku`                  | `anthropic/claude-haiku-4.5` |
| subagents                | `anthropic/claude-sonnet-5`  |

**`--config`.** Merges `apiKeyHelper` and these `env` keys into your Claude Code user settings, `~/.claude/settings.json` (or `$CLAUDE_CONFIG_DIR/settings.json`): `ANTHROPIC_BASE_URL`, `ANTHROPIC_API_KEY`, `ANTHROPIC_AUTH_TOKEN`, `ANTHROPIC_MODEL`, `ANTHROPIC_DEFAULT_OPUS_MODEL`, `ANTHROPIC_DEFAULT_SONNET_MODEL`, `ANTHROPIC_DEFAULT_HAIKU_MODEL`, `CLAUDE_CODE_SUBAGENT_MODEL`, `CLAUDE_CODE_ATTRIBUTION_HEADER`, `CLAUDE_CODE_DISABLE_FEEDBACK_SURVEY`, `ANTHROPIC_CUSTOM_HEADERS`.

{% hint style="warning" %}
After `aimlapi claude --config`, **every** Claude Code session goes through AI/ML API and is billed to your AI/ML API account, including a plain `claude` started from any terminal. This lasts until you run `aimlapi claude --undo`.
{% endhint %}

**`--undo`.** Removes these keys from `settings.json` and puts back any values `--config` replaced. `aimlapi claude` still works afterward for single sessions.

### Codex

```bash
aimlapi codex
aimlapi codex --model openai/gpt-5.6-terra
aimlapi codex -- exec "explain this repo"
```

**Launch.** Runs `codex -c model_provider="aimlapi-cli" -c model_providers.aimlapi-cli={…} -m <model>`. This adds a model provider `aimlapi-cli` that uses the Responses API at `https://api.aimlapi.com/v1`, sends AI/ML API tracking headers, and gets its bearer token by running `aimlapi key print` (Codex `auth` command). No file is written, and your `config.toml` is not changed. Instead of `--model`, you can pass `-m` after `--`, but not both.

**`--config`.** Writes a separate Codex profile, `~/.codex/aimlapi.config.toml` (or `$CODEX_HOME/aimlapi.config.toml`). The key is not stored in it. Start Codex with the profile:

```bash
aimlapi codex --config
codex --profile aimlapi
```

Your `config.toml` is not modified, and a plain `codex` works as before. `--config` takes no Codex arguments.

**`--undo`.** Deletes `aimlapi.config.toml`.

{% hint style="info" %}
Codex **0.118.0** or newer gets the key from the `auth` command. With an older Codex, the key is passed in `AIMLAPI_API_KEY`, set in the Codex process's environment only, and the CLI prints a notice. `--config` needs Codex **0.131.0** or newer (profile files). To update Codex, run `npm install -g @openai/codex@latest`.
{% endhint %}

### OpenCode

```bash
aimlapi opencode
aimlapi opencode --model openai/gpt-5.6-sol
aimlapi opencode -- run "explain this repo"
```

**Launch.** Runs `opencode` with two environment variables and writes no file:

* `OPENCODE_CONFIG_CONTENT`: an inline config that adds the provider `aimlapi-cli` (shown as **AIMLAPI**, through `@ai-sdk/openai-compatible` at `https://api.aimlapi.com/v1`). It contains the preset models with context limits from the catalog and selects your model. OpenCode ranks the inline config above your config files.
* `AIMLAPI_API_KEY`: the key, set in the OpenCode process only.

In OpenCode, models appear as `aimlapi-cli/<model id>`, for example `aimlapi-cli/anthropic/claude-sonnet-5`.

**`--config`.**

* Merges `provider.aimlapi-cli` (without the key) into OpenCode's global config, `~/.config/opencode/opencode.json`. It uses `opencode.jsonc` instead if that file exists, and `$OPENCODE_CONFIG` if that is set. `$XDG_CONFIG_HOME` is respected.
* Stores the key in OpenCode's credential store, `~/.local/share/opencode/auth.json` (mode `0600`, `$XDG_DATA_HOME` is respected).
* Sets the default `model` only if you don't have one. If you do, the CLI keeps it and tells you to run `opencode -m aimlapi-cli/<model>` or pick an AIMLAPI model with `/models`.

**`--undo`.** Removes the provider and the stored credential. It also removes the default `model` if it still points at `aimlapi-cli`. Any values `--config` replaced are put back.

### Cline

```bash
aimlapi cline
aimlapi cline --model openai/gpt-5.6-sol
aimlapi cline -- "explain this repo"
```

**Launch.** Cline has no command-line flag for a base URL. So **every** run, not only `--config`, writes Cline's provider store `~/.cline/data/settings/providers.json` (mode `0600`). The CLI sets Cline's built-in **OpenAI Compatible** provider (`openai-compatible`) to base URL `https://api.aimlapi.com/v1`, the key, the model and the tracking headers, and makes it Cline's default provider. Then it runs `cline -P openai-compatible -m <model>`.

{% hint style="warning" %}
The Cline CLI, the Cline VS Code extension and the JetBrains plugin share this provider store. After any `aimlapi cline` run, all of them use AI/ML API by default until you run `aimlapi cline --undo`.

Cline keeps only **one** OpenAI Compatible provider. If you had one configured for another endpoint, the CLI replaces it (with a warning that shows its URL and a masked key), and `--undo` puts it back.

If the Cline VS Code extension is open, reload the window (Command Palette → **Developer: Reload Window**) so it picks up the change.
{% endhint %}

The CLI finds the provider store the way Cline does: it respects `CLINE_PROVIDER_SETTINGS_PATH`, `CLINE_DATA_DIR`, `CLINE_DIR`, and Cline's own `--config <dir>` / `--data-dir <dir>` when you pass them after `--`. In sandbox mode (`--data-dir` or `CLINE_SANDBOX=1`), only the sandbox's store is changed. Run `--undo` with the same settings. The extension's legacy `globalState.json` / `secrets.json` files are not touched.

**`--config`.** Writes the same provider entry and exits without starting Cline.

**`--undo`.** Removes the entry, puts back the OpenAI Compatible provider it replaced and restores your previous default provider. If you picked a different default provider after the CLI changed it, your choice is kept.

## Set up from your agent

You can also let your coding agent set itself up. Paste this into Claude Code, Codex, OpenCode or Cline:

```
Read https://cdn.jsdelivr.net/npm/@aimlapi/cli@latest/skills/aimlapi-setup/SKILL.md and follow it to connect this agent to AI/ML API.
```

The skill walks the agent through the `aimlapi` CLI. You only approve the sign-in in your browser.

## Troubleshooting

<details>

<summary>Headless server or SSH session</summary>

Over SSH, the CLI uses the device code flow automatically. You can also force it:

```bash
aimlapi login --device
```

Open the printed link on any device and approve it.

In a non-interactive session (no terminal, or `CI=true`), agent commands don't start a sign-in and don't show the model picker. Log in beforehand with `aimlapi login`, or provide a key through the environment:

```bash
export AIMLAPI_API_KEY=<YOUR_AIMLAPI_KEY>
```

Without a key, the command exits with code `3`.

</details>

<details>

<summary>Corporate proxy</summary>

The CLI's own requests (login, `models`, `status`, the update check) respect the standard proxy variables:

```bash
export HTTPS_PROXY=http://proxy.example.com:8080
export NO_PROXY=localhost,127.0.0.1
```

Agents started by `aimlapi` inherit your environment, so they see the same variables. Check your agent's documentation for its own proxy support. The browser sign-in returns to a local address (`127.0.0.1`). If your browser can't reach it, use `aimlapi login --device`.

</details>

<details>

<summary>Restoring an agent's configuration</summary>

To revert what the CLI wrote into an agent's config, run:

```bash
aimlapi claude --undo --dry-run   # preview
aimlapi claude --undo
```

(`codex`, `opencode` or `cline` work the same way.)

The CLI also copies the original of every file before it changes it, to:

* macOS / Linux: `~/.aimlapi/backups/<agent>/<timestamp>/`
* Windows: `%APPDATA%\aimlapi\backups\<agent>\<timestamp>\`

Each backup contains a `manifest.json` and the original files under `files/`, which mirrors their absolute paths. You can copy a file back by hand if needed. Backups can contain credentials that were in the original files, so treat them as secrets.

</details>

<details>

<summary>"… is not installed"</summary>

The agent isn't on your `PATH`. The CLI prints the install command (see [Default models](cli.md#default-models)) and exits with code `4`. Install the agent and run the command again.

</details>

<details>

<summary>A different key than expected is used</summary>

`AIMLAPI_API_KEY` in your environment overrides the key saved by `aimlapi login` for every command. Unset it to use the saved key. Run `aimlapi status` to see which key is in use (masked).

</details>

### Exit codes

| Code | Meaning                                                                                                   |
| ---- | --------------------------------------------------------------------------------------------------------- |
| `0`  | Success.                                                                                                  |
| `1`  | General error.                                                                                            |
| `2`  | Invalid arguments, flags or environment values (for example, `--config` run through npx).                 |
| `3`  | Authentication: not logged in, the key is invalid or rejected, or the sign-in was denied.                 |
| `4`  | The coding agent is not installed.                                                                        |

When the agent starts, its own exit code is returned when it finishes.

### Environment variables

| Variable                  | Effect                                                                                               |
| ------------------------- | ---------------------------------------------------------------------------------------------------- |
| `AIMLAPI_API_KEY`         | API key to use instead of the one saved by `aimlapi login`.                                          |
| `AIMLAPI_CONFIG_DIR`      | Directory for credentials and backups (default `~/.aimlapi`; Windows `%APPDATA%\aimlapi`).           |
| `AIMLAPI_NO_UPDATE_CHECK` | Set to `1` to turn off the daily new-version check.                                                  |
| `CI`                      | When `true`: no model picker, no inline sign-in, no update check.                                    |
| `HTTPS_PROXY`, `NO_PROXY` | Proxy for the CLI's own requests.                                                                    |

### Windows (experimental)

Windows builds are published but not yet tested as thoroughly as macOS and Linux. The CLI keeps its files in `%APPDATA%\aimlapi` and runs the agent as a child process, forwarding Ctrl+C and the agent's exit code. If something doesn't work, you can set an agent up by hand with the manual guides: [Claude Code](../integrations/claude-code.md), [Cline](../integrations/cline.md).
