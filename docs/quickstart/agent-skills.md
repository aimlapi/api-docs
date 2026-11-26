---
description: >-
  Agent skills that teach Claude Code, Cursor, Codex, Gemini CLI, OpenCode and
  other coding agents to write code against AI/ML API: install with
  `npx @ai-ml.api/skills install`, the Claude Code plugin, `gh skill` or the
  aimlapi CLI.
icon: graduation-cap
---

# Agent skills

AI/ML API skills are [Agent Skills](https://agentskills.io/specification) for coding agents. They teach an agent how to build on AI/ML API: which model to pick, which parameters a model accepts, how long jobs and webhooks work, what to retry, and what a call cost.

An agent with the skills reads model ids, parameters and prices from the live catalogue at the moment it needs them, instead of from its training data. It polls a video job instead of holding a request open, retries only errors that are safe to retry, and tests your code in [sandbox mode](../capabilities/sandbox-mode.md) before it spends credits.

The skills are open source: [github.com/aimlapi/skills](https://github.com/aimlapi/skills) (Apache-2.0), published on npm as [`@ai-ml.api/skills`](https://www.npmjs.com/package/@ai-ml.api/skills).

## Install

Pick the route for your agent. Each one installs the same skills, and running it again updates them.

### Any agent

```bash
npx skills add aimlapi/skills
```

The [skills](https://skills.sh) CLI asks which agent to install for (Claude Code, Cursor, Codex, Gemini CLI, OpenCode and others) and copies the skills into its folder. Requires Node.js 22.20 or later.

### Claude Code

```
/plugin marketplace add aimlapi/skills
/plugin install aimlapi@aimlapi
```

Claude Code updates a third-party marketplace only when you turn that on: run `/plugin`, open **Marketplaces**, select `aimlapi` and enable auto-update. Otherwise run `/plugin marketplace update aimlapi` to get a new version.

### With the aimlapi CLI

If you start your agent with the [CLI](cli.md), you already have the skills. Since `aimlapi` 0.5.0, `aimlapi claude`, `aimlapi codex`, `aimlapi opencode`, `aimlapi cline` and `aimlapi hermes` install them into the agent's skills folder and keep them up to date. See [Developer skills](cli.md#developer-skills) for how to manage or turn them off.

### npm (any agent)

Requires Node.js 18 or later.

```bash
npx @ai-ml.api/skills install
```

This installs every skill into the current repository for Claude Code. Choose another agent with `--agent cursor`, `codex`, `gemini`, `opencode`, `copilot` or `universal` (the shared `.agents/skills` folder), install for every project with `--scope user`, or name the skills you want:

```bash
npx @ai-ml.api/skills install aimlapi-models aimlapi-chat --agent cursor --scope user
```

`npx @ai-ml.api/skills list` shows the skills in the package.

### Without Node.js

macOS and Linux:

```bash
curl -fsSL https://aimlapi.com/skills/install.sh | sh
```

Windows (PowerShell):

```powershell
irm https://aimlapi.com/skills/install.ps1 | iex
```

Both download the same npm package and check its sha512 against the npm registry before writing anything. Options go after `sh -s --`:

```bash
curl -fsSL https://aimlapi.com/skills/install.sh | sh -s -- --agent cursor --scope user aimlapi-models
```

### GitHub CLI

Requires [GitHub CLI](https://cli.github.com/) 2.90 or later.

```bash
gh skill install aimlapi/skills --all --agent claude-code
```

Without `--all` or a skill name, a non-interactive shell only lists the skills.

### Codex

```bash
codex plugin marketplace add aimlapi/skills
codex plugin add aimlapi@aimlapi
```

Start a new Codex session after installing. `codex plugin marketplace upgrade` gets a new version.

### Gemini CLI

```bash
gemini extensions install https://github.com/aimlapi/skills
```

Gemini CLI asks for your AI/ML API key once and keeps it in the system keychain. `gemini extensions update aimlapi` gets a new version.

### Cursor

In **Customize**, add a plugin **From GitHub Repository** with `aimlapi/skills`, then install it for the project or for your user.

## Skills

The agent loads a skill on its own when your request matches the skill's description. You don't call them by name.

| Skill | What it teaches the agent |
| ----- | ------------------------- |
| `aimlapi-setup` | Connect a coding agent to AI/ML API with the `aimlapi` CLI, without the agent ever handling your API key |
| `aimlapi-models` | Find, compare and price models from the live catalogue, including context-length price bands and live speed; read the exact parameters a model accepts; check deprecations |
| `aimlapi-chat` | Call text models through Chat Completions, Responses or Messages with the OpenAI and Anthropic SDKs: streaming, tools, structured output, and image, PDF, audio and video input |
| `aimlapi-protocols` | Run a chat model through a protocol it doesn't speak natively, for example DeepSeek or Gemini behind the Anthropic SDK or Claude Code, and what a translated route doesn't keep |
| `aimlapi-images` | Generate and edit images with each model's own parameters |
| `aimlapi-async-jobs` | Run video and music jobs and background responses: submit, poll, download |
| `aimlapi-speech` | Text-to-speech and speech-to-text, from a URL or a local file |
| `aimlapi-decisions` | Get typed answers with calibrated probabilities from decision models, and use routers that pick a model per request |
| `aimlapi-webhooks` | Receive async results as signed webhooks: signing secret, receiver, signature check, rotation |
| `aimlapi-batch` | Run large chat-completion jobs through the Batch API at the batch price, and re-run a crashed script without paying twice |
| `aimlapi-errors` | Read error responses and retry only what is safe to retry |
| `aimlapi-costs` | Get the cost of each call, trace a request end to end, and report usage and spend |
| `aimlapi-sandbox` | Test an integration for free: live response formats, scripted errors and slow answers |

## Requirements

* The scripts in the skills, and the code the agent writes, read your key from the `AIMLAPI_API_KEY` environment variable. Create a key on the [API Keys page](https://aimlapi.com/app/keys). The model catalogue needs no key.
* The scripts use only `curl`, `python3` (3.9 or later, standard library) or `node` (18 or later). There is nothing to install with `pip` or `npm`.
