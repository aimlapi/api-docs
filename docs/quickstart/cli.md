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

The CLI can also give the agent the AI/ML API tools (an MCP server and four skills for images, video, speech and web search), run it on a separate key with a spending cap, show what your key spent, and take you to the top-up page.

This page describes `aimlapi` 0.4.0. Run `aimlapi --version` to see yours.

## Supported agents

| Agent                                                                  | Command              | Default model                                                                                     | MCP tools and skills | If the agent is missing                          |
| ---------------------------------------------------------------------- | -------------------- | ------------------------------------------------------------------------------------------------- | -------------------- | ------------------------------------------------ |
| [Claude Code](cli.md#claude-code)                                      | `aimlapi claude`     | [`anthropic/claude-sonnet-5.5`](../api-references/text-models-llm/anthropic/claude-sonnet-5.5.md) | yes                  | offers `npm install -g @anthropic-ai/claude-code` |
| [Codex](cli.md#codex)                                                  | `aimlapi codex`      | [`openai/gpt-6.1-sol`](../api-references/text-models-llm/openai/gpt-6.1-sol.md)                   | yes                  | offers `npm install -g @openai/codex`            |
| [OpenCode](cli.md#opencode)                                            | `aimlapi opencode`   | [`anthropic/claude-sonnet-5.5`](../api-references/text-models-llm/anthropic/claude-sonnet-5.5.md) | yes                  | offers `npm install -g opencode-ai`              |
| [Cline](cli.md#cline)                                                  | `aimlapi cline`      | [`anthropic/claude-sonnet-5.5`](../api-references/text-models-llm/anthropic/claude-sonnet-5.5.md) | yes                  | offers `npm install -g cline`                    |
| [OpenClaude](cli.md#openclaude)                                        | `aimlapi openclaude` | [`anthropic/claude-sonnet-5.5`](../api-references/text-models-llm/anthropic/claude-sonnet-5.5.md) | not yet              | offers `npm install -g @gitlawb/openclaude`      |
| [OpenClaw](cli.md#openclaw)                                            | `aimlapi openclaw`   | [`anthropic/claude-sonnet-5.5`](../api-references/text-models-llm/anthropic/claude-sonnet-5.5.md) | not yet              | offers `npm install -g openclaw@latest`          |
| [Hermes Agent](cli.md#hermes-agent)                                    | `aimlapi hermes`     | [`anthropic/claude-sonnet-5.5`](../api-references/text-models-llm/anthropic/claude-sonnet-5.5.md) | yes                  | prints the Hermes install command                |
| [zero](cli.md#zero)                                                    | `aimlapi zero`       | [`anthropic/claude-sonnet-5.5`](../api-references/text-models-llm/anthropic/claude-sonnet-5.5.md) | not yet              | offers `npm install -g @gitlawb/zero`            |
| [ZCode](cli.md#zcode)                                                  | `aimlapi zcode`      | [`zhipu/glm-5.3`](../api-references/text-models-llm/zhipu/glm-5.3.md)                             | not yet              | prints where to build it from source             |

The default models come from the AI/ML API server and can change without a CLI update (see [Model presets](cli.md#model-presets)); the table shows the defaults at the 0.4.0 release.

Supported platforms: macOS, Linux and Windows, on x64 and arm64.

## Install

You need an **AI/ML API account** with a balance of at least $1: below that, the API refuses new requests. You can top up at [https://aimlapi.com/app/billing](https://aimlapi.com/app/billing) or with [`aimlapi topup`](cli.md#topup).

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
```

Then run:

```bash
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
aimlapi claude
```

Other agents work the same way: `codex`, `opencode`, `cline`, `openclaude`, `openclaw`, `hermes`, `zero`, `zcode`.
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

In an interactive terminal, the CLI shows a model picker with the agent's default preselected. To skip it, pass `--model <id>`, or `--model auto` to let the API choose the model for each request. Later runs reuse the model you picked last (the CLI tells you so); pass `--model` to choose another.
{% endstep %}

{% step %}
### Sign in (first run only)

If no key is stored yet, the CLI opens your browser. **Sign in to AI/ML API** and **approve the aimlapi CLI**. On that page you can also set an optional **USD limit** for the new key. The key is created and saved on your computer. The CLI also prints the link, in case the browser doesn't open. It waits as long as the sign-in request lives (60 minutes), so you have time to create an account and top up first.
{% endstep %}

{% step %}
### Connect the tools (first run per agent)

For Claude Code, Codex, OpenCode, Cline and Hermes Agent, the CLI says what it would add and where, then asks once:

```
Connect the AI/ML API tools (MCP) and skills to Claude Code? [Y/n]
```

It remembers your answer for that agent. See [AI/ML API tools and skills](cli.md#ai-ml-api-tools-and-skills).
{% endstep %}

{% step %}
### Work

Before the agent starts, the CLI checks your balance. If it is below $1, the CLI offers to top up and then starts the agent without a restart. The agent starts with AI/ML API as its provider. What the CLI writes, if anything, depends on the agent: see its section below.
{% endstep %}
{% endstepper %}

## Agent commands

Every agent takes the same flags (`--profile` only for Claude Code and OpenClaude):

```bash
aimlapi <agent> [--model <id> | --model auto] [--profile cheap|balanced|max] [--budget <usd>] [--mcp | --no-mcp] [--config | --undo] [--dry-run] [--yes] [-- <agent arguments>]
```

| Flag                   | What it does                                                                                                                                                                                    |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| _(none)_               | Configures the agent for this run and starts it.                                                                                                                                                |
| `--model <id>`         | The model to use. Without it, the CLI reuses the model you picked last for this agent; the first time, you get a picker in an interactive terminal, otherwise (no terminal, or `CI=true`) the default model. An id that isn't a preset is checked against the [catalog](cli.md#models). |
| `--model auto`         | Runs the agent on `aimlapi/dynamic-router`, which chooses the model for each request. See [Automatic model choice](cli.md#automatic-model-choice).                                             |
| `--profile <name>`     | Claude Code and OpenClaude only: sets the main model and every model slot at once, `cheap`, `balanced` or `max`. See [Profiles](cli.md#profiles).                                              |
| `--budget <usd>`       | Runs the agent on a separate API key with a spending cap that never resets, for example `5` or `5.50`. See [Spending cap](cli.md#spending-cap).                                         |
| `--mcp`                | Connects the AI/ML API MCP server and installs its skills without asking.                                                                                                                       |
| `--no-mcp`             | Leaves the MCP server and skills out of this run. Your saved answer stays as it is.                                                                                                             |
| `--config`             | Saves the configuration into the agent's own config files and exits, so the agent uses AI/ML API when you start it directly.                                                                   |
| `--undo`               | Reverts what the CLI wrote into the agent's config files and puts back the values it replaced, and removes the MCP server and skills a launch added. Works even when the agent is no longer installed. |
| `--force`              | With `--undo`: restore files even if they were edited after the CLI wrote them.                                                                                                                 |
| `--dry-run`            | Prints what would happen (environment variables, file diffs, the command line, the model slots, the tools it would connect) with secrets masked, and changes nothing: it doesn't even create `~/.aimlapi`. Combine it with `--config` or `--undo` to preview them. |
| `--yes`, `-y`          | Installs a missing agent with npm without asking, and asks nothing else either. With `--yes`, the MCP server is not connected until you answer the question once (or pass `--mcp`).            |
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

The CLI reads the model presets (each agent's default model, model slots, profiles and preset list) from the AI/ML API server, so a new default model reaches you without a CLI update. It keeps them for an hour. The request carries no API key and takes at most 1.5 seconds. If the server doesn't answer, the CLI uses its last copy for up to 7 days and prints a note; after that it uses the presets built into the binary. A failed request is retried after 5 minutes. `--model` and the model you picked earlier still win over the server's default.

The picker offers the agent's presets first. At the 0.4.0 release they are:

* Anthropic: `anthropic/claude-sonnet-5.5`, `anthropic/claude-opus-5.5`, `anthropic/claude-opus-5`, `anthropic/claude-sonnet-5`, `anthropic/claude-haiku-5.5`, `anthropic/claude-haiku-4.5`, for every agent except Codex and ZCode.
* OpenAI: `openai/gpt-6.1-sol`, `openai/gpt-5.6-sol`, `openai/gpt-5.6-terra`, `openai/gpt-6-astra`, for Codex, OpenCode, Cline, OpenClaw, Hermes Agent and zero.
* GLM: `zhipu/glm-5.3`, `z-ai/glm-5.3-flash`, `zhipu/glm-5.2`, `zhipu/glm-5.1`, `z-ai/glm-5-turbo`, for ZCode.

You can pass any other model from `aimlapi models --agent <agent>` with `--model`. That list is not limited to the agent's own vendor: Claude Code can run non-Anthropic models and Codex can run non-OpenAI models, because the API translates Anthropic Messages and OpenAI Responses requests for any chat model that can call tools. See [Messages and Responses](../capabilities/messages-and-responses.md).

### Profiles

Claude Code and OpenClaude use several models at once: a main model and slots for `opus`, `sonnet`, `haiku`, `fast` and subagents. `--profile` sets all of them with one flag:

```bash
aimlapi claude --profile cheap
```

At the 0.4.0 release the profiles are:

| Profile    | Main                | `opus`              | `sonnet`            | `haiku`             | `fast`              | Subagents           |
| ---------- | ------------------- | ------------------- | ------------------- | ------------------- | ------------------- | ------------------- |
| `cheap`    | `claude-haiku-5.5`  | `claude-sonnet-5.5` | `claude-haiku-5.5`  | `claude-haiku-5.5`  | `claude-haiku-5.5`  | `claude-haiku-5.5`  |
| `balanced` | `claude-sonnet-5.5` | `claude-opus-5.5`   | `claude-sonnet-5.5` | `claude-haiku-5.5`  | `claude-haiku-5.5`  | `claude-haiku-5.5`  |
| `max`      | `claude-opus-5.5`   | `claude-opus-5.5`   | `claude-sonnet-5.5` | `claude-sonnet-5.5` | `claude-haiku-5.5`  | `claude-sonnet-5.5` |

All ids start with `anthropic/`. The profiles come from the server with the other presets, with the same fallback.

* `--dry-run` shows which model goes into which slot.
* `--model` replaces only the main model; the slots stay as the profile sets them.
* A profile is for that run only. The next launch without `--profile` goes back to the model it would have used anyway.
* With `--config`, the profile is saved into the agent's settings for the agent started on its own; `--undo` restores the file.
* In other agents, `--profile` and `-p` after `--` are the agent's own flags.

### Automatic model choice

```bash
aimlapi codex --model auto
```

`--model auto` works with every agent. It runs the agent on `aimlapi/dynamic-router`, which chooses the model for each request; `--dry-run` shows the mapping. It applies to that run only. With `--config`, the CLI saves it for later runs and says so. In Claude Code and OpenClaude it replaces the main model only, and the slots stay as they are. In Claude Code the router chooses among Claude models only for now.

### Spending cap

`--budget <usd>` runs the agent on a separate API key with a spending cap. You approve the new key in your browser:

```bash
aimlapi claude --budget 5
```

* The cap belongs to that key and never resets: not per run, not per day. Each agent gets its own capped key.
* The same value later reuses the key, without the browser, also in scripts. Another value makes a new key that you approve in the browser. A run without `--budget` goes back to your main key.
* If the approval page shows "No limit", type the amount in the USD limit field and keep "One-time cap (never resets)" before you approve. A key approved without a limit is revoked and the agent does not start. If you approve a lower amount, the CLI tells you and uses it. If you approve a higher amount, or a cap that resets (day, week, month), the CLI asks `Start <agent> on this key anyway? [y/N]`. No, or no terminal to answer in, revokes that key and the agent does not start.
* When the cap is reached, the API refuses the agent's requests and the agent shows its error. `--budget <more>` starts the agent on a new key whose spend starts at zero: `--budget 20` after spending $5 allows $20 more, not $15. A running session does not move to the new key. The old key is revoked once no run is using it, so an agent running in another terminal keeps working.
* Without a terminal or in CI, a stored key with the same value still works. If a new key is needed, the command exits with code `3` instead of waiting for a browser.
* `--dry-run` says what would happen and names the files that would hold the capped key; it creates no key. `--budget` doesn't work with `--config` or `--undo`. `aimlapi logout` revokes every capped key.
* Agents that keep their key in a file (Cline, and OpenCode, OpenClaude or ZCode after `--config`) get the capped key in that file for the run. When the agent ends, the CLI puts back what the file held. After a crash, the next `aimlapi` command does it. Changes you made to the file in the meantime stay.
* Tool calls through the [MCP server](cli.md#ai-ml-api-tools-and-skills) use the capped key too.
* OpenClaw doesn't support `--budget`: it reads your main key from the credentials file itself.

{% hint style="warning" %}
`--budget` is not a security boundary. It stops a runaway agent, not a hostile one. An agent with shell access under your user can read your main key in `~/.aimlapi/credentials`, in an agent config left by an earlier `--config`, or from `aimlapi key print`. If you don't trust the agent, run it under another OS user or in a sandbox without access to those files.
{% endhint %}

### AI/ML API tools and skills

For Claude Code, Codex, OpenCode, Cline and Hermes Agent, the CLI can connect the AI/ML API MCP server, so the agent can generate media and use AI/ML API tools, not only models. In the agent's config the server is named `aimlapi-cli`.

With the server, the CLI installs four skills: `aimlapi-images`, `aimlapi-video`, `aimlapi-speech` and `aimlapi-web-search`. They tell the agent how to use the tools for a plain request. They tell you the price before an expensive generation and end with what it cost, taken from the tool's answer; if the answer has no figure, they say so.

* The first run asks once per agent: `Connect the AI/ML API tools (MCP) and skills to <agent>? [Y/n]`, with a line that says what goes where. The CLI remembers the answer. An agent that an earlier version already connected counts as a yes.
* Without a terminal, in CI or with `--yes`, nothing is connected until you answer at a terminal once, and a note says so. `--mcp` connects without asking.
* `--no-mcp` leaves the server and skills out of one run. `--dry-run` shows what would be connected and asks nothing. `--undo` removes exactly what the CLI added.
* An MCP server of your own named `aimlapi-cli`, a skill of yours with the same name, or one of the CLI's skills that you edited is left alone.
* If the server or the skills can't be written, the CLI prints a warning and the agent still starts. The launch makes no request to the MCP server.
* Tool calls are billed to the key the run uses.

| Agent        | How the agent gets the key                                       | Skills directory            |
| ------------ | ---------------------------------------------------------------- | --------------------------- |
| Claude Code  | runs `aimlapi key print --mcp-headers` on each connection        | `~/.claude/skills`          |
| Codex        | an environment variable set for the launch                       | `~/.agents/skills`          |
| OpenCode     | an environment variable set for the launch                       | `~/.config/opencode/skills` |
| Cline        | stored in `cline_mcp_settings.json` (mode `0600`), next to `providers.json`, and a note says so | `~/.cline/skills`           |
| Hermes Agent | an environment variable set for the launch                       | `~/.hermes/skills`          |

After `--config`, Codex, OpenCode and Hermes Agent started on their own have no key for the server until you set `AIMLAPI_CLI_MCP_KEY`; `aimlapi <agent>` sets it for its own launches.

The toolbox has no text-to-speech tool yet: `aimlapi-speech` looks for one in the tool catalog and tells you if there is none. A video from a local file needs a URL, since there is no upload tool. OpenClaude, OpenClaw, zero and ZCode don't get the server or the skills yet.

### Claude Code

```bash
aimlapi claude
```

```bash
aimlapi claude --model opus
```

```bash
aimlapi claude -- -p "Explain the architecture of this project"
```

**Launch.** Runs `claude --settings '<json>' --model <model>`. The inline settings contain an `env` block (base URL `https://api.aimlapi.com`, the model slots, tracking headers) and `apiKeyHelper`, which Claude Code runs to get the key from `aimlapi key print`. Settings on the command line take priority over your settings files, so no settings file is written. If you connected the [tools](cli.md#ai-ml-api-tools-and-skills), the launch also passes the MCP server with `--mcp-config` and installs the skills into `~/.claude/skills`. `ANTHROPIC_API_KEY` and `ANTHROPIC_AUTH_TOKEN` are set to empty, so an Anthropic key exported in your shell is never sent to AI/ML API.

**Model slots.** `--model` also accepts the Claude Code tier aliases. The defaults at the 0.4.0 release:

| Claude Code slot / alias | AI/ML API model              |
| ------------------------ | ---------------------------- |
| `opus`                   | `anthropic/claude-opus-5.5`  |
| `sonnet`                 | `anthropic/claude-sonnet-5.5` |
| `haiku`                  | `anthropic/claude-haiku-5.5` |
| `fast` (only with `--model fast`) | `anthropic/claude-haiku-5.5` |
| subagents                | `anthropic/claude-sonnet-5.5` |

To change all slots at once, use a [profile](cli.md#profiles).

**`--config`.** Merges the same `env` keys and `apiKeyHelper` into `~/.claude/settings.json` (or `$CLAUDE_CONFIG_DIR/settings.json`), and the MCP server into `~/.claude.json`. Needs an installed `aimlapi`, not npx.

{% hint style="warning" %}
After `aimlapi claude --config`, **every** Claude Code session goes through AI/ML API and is billed to your AI/ML API account, including a plain `claude` started from any terminal, until you run `aimlapi claude --undo`.
{% endhint %}

### Codex

```bash
aimlapi codex
```

```bash
aimlapi codex --model openai/gpt-5.6-terra
```

```bash
aimlapi codex -- exec "explain this repo"
```

**Launch.** Runs `codex` with `-c` overrides that add the model provider `aimlapi-cli` (Responses API at `https://api.aimlapi.com/v1`, tracking headers) and, if you connected the [tools](cli.md#ai-ml-api-tools-and-skills), the MCP server. Codex gets the key by running `aimlapi key print`. No config file is written; the skills go into `~/.agents/skills`.

**`--config`.** Writes a separate profile, `~/.codex/aimlapi.config.toml` (or `$CODEX_HOME/aimlapi.config.toml`), without the key. Your `config.toml` is never modified, and a plain `codex` works as before. Save the profile:

```bash
aimlapi codex --config
```

Then start Codex with it:

```bash
codex --profile aimlapi
```

**`--undo`** deletes the profile, or puts back a profile of yours that `--config` replaced.

{% hint style="info" %}
Codex **0.118.0** or newer gets the key from `aimlapi key print`; with an older Codex, the key is passed in `AIMLAPI_API_KEY` of the Codex process only, and the CLI prints a notice. `--config` needs Codex **0.131.0** or newer. To update Codex, run `npm install -g @openai/codex@latest`.
{% endhint %}

### OpenCode

```bash
aimlapi opencode
```

```bash
aimlapi opencode --model openai/gpt-5.6-sol
```

```bash
aimlapi opencode -- run "explain this repo"
```

**Launch.** Runs `opencode` with an inline config in `OPENCODE_CONFIG_CONTENT` (provider `aimlapi-cli`, shown as **AIMLAPI**, OpenAI-compatible at `https://api.aimlapi.com/v1`, the preset models, and the MCP server if you connected the [tools](cli.md#ai-ml-api-tools-and-skills)) and the key in `AIMLAPI_API_KEY` of the OpenCode process only. No config file is written; the skills go into `~/.config/opencode/skills`. Models appear as `aimlapi-cli/<model id>`, for example `aimlapi-cli/anthropic/claude-sonnet-5.5`.

**`--config`.** Adds the provider (without the key) to OpenCode's global config (`~/.config/opencode/opencode.json`, or `opencode.jsonc`, or `$OPENCODE_CONFIG`) and stores the key in OpenCode's credential store `auth.json` (mode `0600`). It sets the default `model` only if you have none; otherwise pick an `aimlapi-cli/…` model with `/models`. After `--config`, a launch keeps the stored key current.

### Cline

```bash
aimlapi cline
```

```bash
aimlapi cline --model openai/gpt-5.6-sol
```

```bash
aimlapi cline -- "explain this repo"
```

**Every run** writes Cline's provider store `~/.cline/data/settings/providers.json` (mode `0600`), because Cline has no flag for a base URL: the built-in **OpenAI Compatible** provider gets `https://api.aimlapi.com/v1`, the key, the model and tracking headers, and becomes Cline's default. A launch then runs `cline -P openai-compatible -m <model>`; `--config` stops after the write.

If you connected the [tools](cli.md#ai-ml-api-tools-and-skills), every run also writes the MCP server, with the key, into `cline_mcp_settings.json` next to `providers.json` (mode `0600`), because Cline has no documented way to reference a variable there. A `--budget` run puts the capped key into that entry or takes the entry out, and doesn't start the agent if it can do neither.

{% hint style="warning" %}
The Cline CLI, the Cline VS Code extension and the JetBrains plugin share this provider store. After any `aimlapi cline` run, all of them use AI/ML API by default until you run `aimlapi cline --undo`. Cline keeps only **one** OpenAI Compatible provider: if you had one for another endpoint, the CLI replaces it and `--undo` puts it back. If the VS Code extension is open, reload the window (Command Palette → **Developer: Reload Window**).
{% endhint %}

`aimlapi cline` needs the `cline` command even if you only use the VS Code extension. It finds the provider store the way Cline does (`CLINE_PROVIDER_SETTINGS_PATH`, `CLINE_DATA_DIR`, `CLINE_DIR`, and `--config <dir>` / `--data-dir <dir>` after `--`); run `--undo` with the same settings.

### OpenClaude

```bash
aimlapi openclaude
```

```bash
aimlapi openclaude --model opus
```

```bash
aimlapi openclaude --profile max
```

**Launch.** Connects [OpenClaude](../integrations/openclaude.md) over AI/ML API's Anthropic-compatible route (`/v1/messages`): the base URL, model slots (the same as for [Claude Code](cli.md#claude-code), including [profiles](cli.md#profiles)) and tracking headers are set in its environment, and the key in `ANTHROPIC_AUTH_TOKEN` of the OpenClaude process only. No file is written. OpenClaude's built-in `aimlapi.com` preset is not used, and `AIMLAPI_API_KEY` is removed from the session.

**`--config`.** Writes the same variables, with the key, into the `env` of `~/.openclaude/settings.json` (or `$OPENCLAUDE_CONFIG_DIR/settings.json`, mode `0600`); after `--config`, a launch keeps the stored key current. Picking another provider with `/provider` later removes only part of these settings; to remove them, run `aimlapi openclaude --undo`.

### OpenClaw

```bash
aimlapi openclaw
```

```bash
aimlapi openclaw --config
```

[OpenClaw](../integrations/openclaw.md) has no per-run provider switch, so **every run** writes its config (`~/.openclaw/openclaw.json`, or the file `$OPENCLAW_CONFIG_PATH`, `$OPENCLAW_STATE_DIR` or a `--profile <name>` after `--` selects): the OpenAI-compatible provider `aimlapi-cli` with the preset models, and the default model `aimlapi-cli/<model>`. A launch then starts `openclaw`; `--config` only writes. A running Gateway reloads the config by itself.

The key is not copied into `openclaw.json`: OpenClaw reads it from the CLI's credentials file. So sign in with `aimlapi login` first (`AIMLAPI_API_KEY` alone is not enough, exit code `3`), and run `openclaw secrets reload` after you log in with a new key or log out. For the same reason, OpenClaw doesn't support `--budget`.

### Hermes Agent

```bash
aimlapi hermes
```

```bash
aimlapi hermes --config
```

[Hermes Agent](../integrations/hermes.md) is installed with its own script, not npm (`curl -fsSL https://hermes-agent.nousresearch.com/install.sh | bash`; the CLI prints the Windows command). Hermes has no per-run provider switch, so the CLI adds named custom providers (OpenAI-compatible, the preset models) to Hermes' `config.yaml` (`~/.hermes`, `$HERMES_HOME`, or the active Hermes profile). The key is not copied: Hermes runs `aimlapi key print` to get it.

* **Launch** writes the entry `aimlapi-cli-run` and starts `hermes --provider custom:aimlapi-cli-run -m <model>`, so a plain `hermes` keeps its default.
* **`--config`** writes the entry `aimlapi-cli` and makes it Hermes' default model. Needs an installed `aimlapi`, not npx. A running Hermes gateway needs `hermes gateway restart`.
* **`--undo`** removes both entries and puts back the `model:` keys they replaced. Only those lines of `config.yaml` change.
* If you connected the [tools](cli.md#ai-ml-api-tools-and-skills), the MCP server goes into `config.yaml` as `mcp_servers.aimlapi-cli` and stays until `--undo`; the skills go into the `skills` directory next to `config.yaml`.

### zero

```bash
aimlapi zero
```

```bash
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
```

```bash
aimlapi zcode --config
```

[ZCode](../integrations/zcode.md) is Z.ai's coding agent for GLM models. `aimlapi zcode` needs ZCode's terminal command `zcode`, which Z.ai does not publish as a package: [build it from source](https://github.com/zai-org/ZCode/blob/main/README.en.md#zcode-cli-distribution). The CLI adds the OpenAI-compatible provider `aimlapi-cli` (shown as **AI/ML API**) with the GLM presets; ZCode keeps the key in its provider config (mode `0600`).

* **Launch** gives `zcode` a provider config of the CLI's own (`$ZCODE_PERSONAL_PROVIDER_CONFIG_FILE`), so your `~/.zcode` is not changed. A provider you add inside such a session is saved into that file and is gone after `--undo` or `logout`: add your own providers in a plain `zcode` session or the desktop app. `zcode --web` can't be started this way; use `--config`.
* **`--config`** adds the provider to `~/.zcode/v2/provider_config.json` (or `$ZCODE_DATA_BASE_DIR/.zcode/v2`), shared by the ZCode desktop app, `zcode` and `zcode --web`, and makes its model the default. If the desktop app keeps its data in another folder, that copy is set up too. A running ZCode picks up the change by itself.

## Account commands

### `login`

```bash
aimlapi login
```

```bash
aimlapi login --device
```

`login` opens the browser, where you sign in and approve the aimlapi CLI. On the approval page you can set an optional **USD limit** for the new key and how often it resets. The key is saved to `~/.aimlapi/credentials` (file mode `0600`; on Windows `%APPDATA%\aimlapi\credentials`). You don't have to run `login` first: in an interactive terminal, agent commands start the same sign-in when no key is stored.

The CLI waits for your approval as long as the sign-in request lives, 60 minutes, so a new user can sign up, confirm the email and top up before approving. Ctrl+C stops the wait.

The **device code** flow (`--device`) prints a link that you open and approve on any device. The CLI picks it automatically over SSH, on Linux without a graphical display, and when it can't open a browser or a local port.

If you log in again, the stored key is replaced, but the previous key stays active. You can revoke it on the [API Keys page](https://aimlapi.com/app/keys).

### `logout`

```bash
aimlapi logout
```

Revokes the stored key on the server and removes it from your computer. Agent configs that hold a copy of that key (OpenCode, Cline, OpenClaude, ZCode) are reverted as `aimlapi <agent> --undo` would, and the agent config backups are deleted. The capped keys of `--budget` are revoked and removed the same way, even if a run is still using one. If the server refuses or can't be reached, the key is still removed locally but may remain active: revoke it on the [API Keys page](https://aimlapi.com/app/keys). `logout` doesn't change `AIMLAPI_API_KEY`.

### `status`

```bash
aimlapi status
```

```bash
aimlapi status --json
```

Shows your account balance and the spend and limit of the API key in use. The key itself is only shown masked.

### `usage`

```bash
aimlapi usage
```

```bash
aimlapi usage --json
```

Shows what the API key in use spent today and over the last 7 and 30 days, by agent and by model, without opening the dashboard.

* It covers this key only, not your account's other keys, and says so. The key is shown by its prefix only.
* The figures are analytics, not your wallet balance. Use `status` for the balance.
* "Today" is the same window as the dashboard's **Today**. The 7 and 30 days are rolling windows, so they differ from the dashboard's presets, which start at midnight.
* If the server can't split spend by agent, `usage` shows spend by model and a warning.

### `topup`

```bash
aimlapi topup
```

```bash
aimlapi topup --no-wait
```

Opens the dashboard's top-up page in your browser, where you pay as usual. The CLI then checks the balance every 5 seconds, for up to 10 minutes, and prints the new balance when the money arrives.

* `--no-wait` only prints the link. Without a browser or a terminal, the CLI prints the link too.
* Ctrl+C stops the wait (exit code `130`) and doesn't affect the payment.
* If the CLI couldn't read the balance before the wait, a wait without a rise ends as unknown: a payment that arrived before the first read wouldn't show. Check it with `aimlapi status`.
* `--json` prints one machine-readable result.

When you start an agent, the CLI also checks the balance (at most 1.5 seconds; if the check fails, the agent simply starts). If the balance is below $1, where the API refuses requests, then in a terminal it offers to top up and starts the agent afterwards without a restart, or lets you continue anyway. In a script or CI it prints one message and continues.

### `doctor`

```bash
aimlapi doctor
```

```bash
aimlapi doctor --agent claude
```

```bash
aimlapi doctor --json
```

Says what is wrong with a setup and how to fix it. It checks the config directory and credentials file, whether the API answers, the API key (and where it comes from), the balance, which agents are installed and where their configs point, and whether the MCP server answers. Each failed check prints a fix.

`doctor` changes nothing. It exits with `0` when no check failed, and otherwise with the exit code of the first failed check. Its report never holds the API key, so it is safe to paste into a support chat. With `--agent <agent>`, it checks only that agent, and a missing agent counts as a failure.

### `models`

```bash
aimlapi models
```

```bash
aimlapi models --agent claude
```

```bash
aimlapi models --agent codex --json
```

Lists AI/ML API chat models from the public catalog. No login is needed.

* Without `--agent`, you get every chat model and the agents that can use it.
* With `--agent <agent>`, you get only the models that agent can use: served on the agent's API and supporting tool calling. The agent's presets come first, with the default model and the model slots marked.
* With `--json`, the output is machine-readable.

### `update`

```bash
aimlapi update
```

```bash
aimlapi --version
```

Updates `aimlapi` to the latest version, through npm or, for a script install, by replacing the binary (see [Install](cli.md#install)). `aimlapi --version` (or `aimlapi version`) prints the version you have.

## Set up from your agent

You can also let your coding agent set itself up. Paste this into any of the supported agents:

```
Read https://docs.aimlapi.com/quickstart/cli/aimlapi-setup.md and follow it to connect this agent to AI/ML API.
```

The agent signs you in through the browser (you approve; you never paste a key into the chat), shows what it will change with `--dry-run`, applies it after you confirm, and tells you how to undo it.

To install it as a Claude Code skill instead (then just ask Claude Code to "set up AI/ML API"), download the file with its frontmatter. Create the skill directory:

```bash
mkdir -p ~/.claude/skills/aimlapi-setup
```

Then download the skill:

```bash
curl -fsSL https://raw.githubusercontent.com/aimlapi/api-docs/main/skills/aimlapi-setup/SKILL.md -o ~/.claude/skills/aimlapi-setup/SKILL.md
```

## Troubleshooting

<details>

<summary>Something doesn't work and you don't know why</summary>

Run:

```bash
aimlapi doctor
```

It checks the config, the API, the key, the balance, the agents and the MCP server, and says how to fix each failed check. The report holds no API key, so you can paste it into a support chat.

</details>

<details>

<summary>Headless server, SSH session or CI</summary>

Over SSH, the CLI uses the device code flow automatically. You can also force it with `aimlapi login --device`, then open the printed link on any device.

In a non-interactive session (no terminal, or `CI=true`), agent commands don't start a sign-in, don't show the model picker, don't ask to install a missing agent (pass `--yes` for that) and don't ask about the MCP tools (pass `--mcp` to connect them). Log in beforehand with `aimlapi login`, or provide a key through the environment:

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

<summary>Low balance, or the agent's requests are refused</summary>

Below a balance of $1, the API refuses new requests. Run `aimlapi topup`, or top up on the [billing page](https://aimlapi.com/app/billing). If you started the agent with `--budget`, the capped key may have reached its cap: start the agent with a new `--budget <usd>` (see [Spending cap](cli.md#spending-cap)).

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
```

```bash
export NO_PROXY=localhost,127.0.0.1
```

Agents started by `aimlapi` inherit your environment; check your agent's documentation for its own proxy support. The browser sign-in returns to a local address (`127.0.0.1`). If your browser can't reach it, use `aimlapi login --device`.

</details>

<details>

<summary>Restoring an agent's configuration</summary>

To revert what the CLI wrote into an agent's config, preview it first:

```bash
aimlapi claude --undo --dry-run
```

Then restore it:

```bash
aimlapi claude --undo
```

Every other agent works the same way. `--undo` also removes the MCP server and skills the CLI added. A file in which you have since replaced the CLI's settings by hand is left as it is (`--force` restores it anyway).

The CLI also copies the original of every file before it changes it, to `~/.aimlapi/backups/<agent>/<timestamp>/` (Windows: `%APPDATA%\aimlapi\backups\<agent>\<timestamp>\`). Each backup has a `manifest.json` and the original files under `files/`. Backups can contain credentials that were in the original files, so treat them as secrets.

To remove the CLI itself, run `--undo` for every configured agent first (Claude Code, Codex and Hermes Agent configs point at the `aimlapi` binary), then `npm uninstall -g aimlapi`, or delete the binary if you used an install script.

</details>

<details>

<summary>Windows</summary>

The CLI keeps its files in `%APPDATA%\aimlapi` and runs the agent as a child process, forwarding Ctrl+C and the agent's exit code. The examples on this page use POSIX shell syntax; in PowerShell set variables with `$env:NAME = "value"`. OpenClaw refuses a credentials file whose permissions it can't verify as private, which is likely if you point `AIMLAPI_CONFIG_DIR` at a shared folder.

</details>

### Exit codes

| Code  | Meaning                                                                                        |
| ----- | ---------------------------------------------------------------------------------------------- |
| `0`   | Success.                                                                                       |
| `1`   | General error (network, file, server, agent too old).                                          |
| `2`   | Invalid arguments, flags or environment values (for example, `--config` run through npx).      |
| `3`   | Authentication: not logged in, the key is invalid or rejected, the sign-in was denied, or a `--budget` key was refused. |
| `4`   | The coding agent is not installed, or its installation failed.                                 |
| `130` | You pressed Ctrl+C while the CLI waited for a top-up or for your answer about a `--budget` key. |

When the agent starts, its own exit code is returned when it finishes. `doctor` returns the code of its first failed check.

### Environment variables

| Variable                                  | Effect                                                                                     |
| ----------------------------------------- | ------------------------------------------------------------------------------------------ |
| `AIMLAPI_API_KEY`                         | API key to use instead of the one saved by `aimlapi login`, for every command.             |
| `AIMLAPI_CONFIG_DIR`                      | Directory for credentials and backups (default `~/.aimlapi`; Windows `%APPDATA%\aimlapi`). |
| `AIMLAPI_BASE_URL`                        | Overrides the API host (default `https://api.aimlapi.com`). Without `AIMLAPI_MCP_URL`, the agent then starts without the MCP server. |
| `AIMLAPI_MCP_URL`                         | Overrides the MCP host (default `https://mcp.aimlapi.com`). The API key is sent there, so it must be `https`, or `http` on a loopback address, with no user name or password; otherwise MCP stays unconnected and `doctor` says why. |
| `AIMLAPI_CLI_MCP_KEY`                     | The key the MCP server entry of Codex, OpenCode and Hermes Agent reads when you start the agent on its own after `--config`. |
| `AIMLAPI_NO_UPDATE_CHECK`                 | Set to `1` to turn off the daily new-version check.                                        |
| `AIMLAPI_CLI_KEY`                         | The key variable of zero's `aimlapi-cli` profile (see [zero](cli.md#zero)).                |
| `CI`                                      | When `true`: no model picker, no inline sign-in, no install prompt, no MCP question, no update check. |
| `HTTPS_PROXY`, `NO_PROXY`                 | Proxy for the CLI's own requests.                                                          |
| `AIMLAPI_INSTALL_DIR`, `AIMLAPI_VERSION`  | Install scripts only: target directory and version (see [Install](cli.md#install)).        |
