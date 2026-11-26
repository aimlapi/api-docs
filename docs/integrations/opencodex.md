---
description: >-
  Route Codex, Claude Code and other coding tools through OpenCodex to AI/ML API
  models with its built-in provider preset.
---

# OpenCodex

## About

[OpenCodex](https://github.com/lidge-jun/opencodex) (`ocx`) is a local gateway for AI coding tools. It runs a proxy and a dashboard on your machine and lets Codex, Claude Code, Claude Desktop, Grok Build and other tools use models from the providers you add.

AI/ML API is a **built-in provider preset** in OpenCodex, listed as **AI/ML API** (provider ID `aimlapi`). It was added in [PR #8935](https://github.com/lidge-jun/opencodex/pull/8935) and ships in OpenCodex **v2.100.9** and later.

## Quick start

{% stepper %}
{% step %}
## Install OpenCodex

```bash
npm install -g --allow-scripts=bun @bitkyc08/opencodex
```

Desktop installers (.dmg, .msi, .AppImage, .deb) are on the [releases page](https://github.com/lidge-jun/opencodex/releases).
{% endstep %}

{% step %}
## Add AI/ML API

```bash
ocx provider add aimlapi
```

Paste your AI/ML API key when asked, or give the reference `${AIMLAPI_API_KEY}` to read it from the environment.
{% endstep %}

{% step %}
## Start the proxy

```bash
ocx start
```

The proxy and dashboard run on `localhost:10100`.
{% endstep %}

{% step %}
## Connect your tool

For example, run `ocx claude` to launch Claude Code through the proxy, or turn on the Codex switch on the dashboard's **Route** page and run `codex`.
{% endstep %}
{% endstepper %}

## When to use AI/ML API with OpenCodex

AI/ML API works well with OpenCodex when you want:

* one key for models from many providers behind your existing coding tools
* to keep Codex or Claude Code and swap the model behind them
* a live model list instead of hand-written provider config

## Prerequisites

Before you start, make sure you have:

* OpenCodex v2.100.9 or later
* an AI/ML API key from [aimlapi.com/app/keys](https://aimlapi.com/app/keys)
* a model ID from [aimlapi.com/models](https://aimlapi.com/models)

The base URL is built into the preset:

```
https://api.aimlapi.com/v1
```

Need a key first? Use [API Key Management](../api-references/service-endpoints/api-key-management.md).

## Set up AI/ML API in OpenCodex

You can add the provider in any of three places. All of them write to `~/.opencodex/config.json`.

### Option 1: CLI command

```bash
ocx provider add aimlapi
```

### Option 2: Interactive setup

```bash
ocx init
```

Pick **AI/ML API** from the provider list. `ocx init` also offers to wire Codex to the proxy.

### Option 3: Dashboard

Run `ocx start`, open the dashboard, click **Add provider**, and pick **AI/ML API**.

### API key from the environment

Instead of pasting the key, you can store the reference `${AIMLAPI_API_KEY}` and export the key in your shell:

```bash
# ~/.zshrc or ~/.bashrc
export AIMLAPI_API_KEY=your_key_here
```

## Model selection

OpenCodex loads the live model list from AI/ML API and keeps only chat models. Model IDs keep their vendor prefix and are routed as `aimlapi/<model-id>`, for example `aimlapi/openai/gpt-5.6-terra`.

### Good starting models

* `openai/gpt-5.6-terra`: the preset default
* `anthropic/claude-sonnet-5-5`: strong for coding
* `google/gemini-3.5-flash`: lower latency and lower cost

For the full catalog, use [All Model IDs](../api-references/model-database.md).

## Config checklist

Make sure these values are set:

* provider: **AI/ML API** (`aimlapi`)
* API key: pasted directly or as `${AIMLAPI_API_KEY}`
* base URL: `https://api.aimlapi.com/v1` (built in)
* model ID: `aimlapi/` plus an exact AI/ML API chat model ID

## Troubleshooting

<details>

<summary>AI/ML API is not in the provider picker</summary>

The preset ships in OpenCodex v2.100.9. Update OpenCodex:

```bash
npm install -g --allow-scripts=bun @bitkyc08/opencodex@latest
```

</details>

<details>

<summary>The provider was added, but requests fail with an auth error</summary>

OpenCodex cannot check the key when you add the provider, so a wrong key shows up only on the first request. Check that:

* the key is valid at [aimlapi.com/app/keys](https://aimlapi.com/app/keys)
* `AIMLAPI_API_KEY` is exported in the shell that runs `ocx start`, if you used the `${AIMLAPI_API_KEY}` reference
* your balance is sufficient at [aimlapi.com/app](https://aimlapi.com/app)

</details>

<details>

<summary>New models do not appear in my tool</summary>

Restart the proxy after adding providers so the tool gets the refreshed model list.

</details>

## Links

* [OpenCodex repository](https://github.com/lidge-jun/opencodex)
* [OpenCodex docs](https://opencodex.me/)
* [AI/ML API keys](https://aimlapi.com/app/keys)
* [AI/ML API model catalog](https://aimlapi.com/models)
