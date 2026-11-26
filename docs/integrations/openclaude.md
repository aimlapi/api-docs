---
description: >-
  Connect OpenClaude, the open-source coding-agent CLI, to AI/ML API through its
  built-in provider preset.
---

# OpenClaude

## About

[OpenClaude](https://github.com/Twigpine/openclaude) is an open-source coding-agent CLI that works with many model providers. Its homepage is [openclaude.twigpine.com](https://openclaude.twigpine.com/).

AI/ML API is a **built-in provider preset** in OpenClaude: it ships upstream, so a plain install already has it. OpenClaude can also create an AI/ML API account for you, top it up, and save the issued key, so you can start with no key at all. Since v0.34.0, a built-in plugin can also connect the [AI/ML API MCP server](../quickstart/mcp.md) for Toolbox and media generation tools.

{% hint style="info" %}
Prefer one command? `npx aimlapi openclaude` signs you in through the browser and starts OpenClaude already connected to AI/ML API (over the Anthropic-compatible route), with no key to paste. See [CLI](../quickstart/cli.md#openclaude).

`aimlapi openclaude --config` switches OpenClaude to AI/ML API's Anthropic-compatible route and sets `AIMLAPI_API_KEY` to empty in its `settings.json`, so the manual setup below no longer applies; `aimlapi openclaude --undo` restores it.
{% endhint %}

## Quick start

{% stepper %}
{% step %}
## Install OpenClaude

Requires Node.js `>=24.22.1`.

```bash
npm install -g @twigpine/openclaude@latest
```
{% endstep %}

{% step %}
## Open the provider picker

Start OpenClaude and run:

```
/provider
```
{% endstep %}

{% step %}
## Choose aimlapi.com

Pick **aimlapi.com**, then either paste an existing key or let OpenClaude create an account and issue one.
{% endstep %}

{% step %}
## Start chatting

The base URL is filled in automatically. Pick your model with `/model`.
{% endstep %}
{% endstepper %}

## When to use AI/ML API with OpenClaude

AI/ML API works well with OpenClaude when you want:

* one key for many model providers behind a single OpenAI-compatible endpoint
* a model picker populated live from the AI/ML API catalog
* to onboard from the terminal, without opening a dashboard first

## Prerequisites

Before you start, make sure you have:

* Node.js `>=24.22.1` and OpenClaude installed
* an AI/ML API key from [aimlapi.com/app/keys](https://aimlapi.com/app/keys) (optional: the guided flow can issue one)
* a model ID from [aimlapi.com/models](https://aimlapi.com/models)

The base URL is:

```
https://api.aimlapi.com/v1
```

Need a key first? Use [API Key Management](../api-references/service-endpoints/api-key-management.md).

## Set up AI/ML API in OpenClaude

### Option 1: Interactive (`/provider`)

1. Start OpenClaude and run `/provider`.
2. Choose **aimlapi.com**.
3. Choose how to get a key:
   * **I am a new user**: enter your email. OpenClaude creates a passwordless account, lets you pick a top-up amount and whether to turn on automatic top-up (pre-selected on in this flow), opens card checkout, then saves the issued key.
   * **I already have an aimlapi.com key**: paste a key from the dashboard. OpenClaude validates it, checks the balance, and offers a top-up when the balance is low.

If AI/ML API is already configured, the same menu offers **Continue with your saved API key** and **Set up a new key or switch account** instead.

### Option 2: CLI top-up

Run the guided flow non-interactively:

```bash
openclaude aimlapi topup --email you@example.com --amount 25
```

* `--email`: account email (or set `AIMLAPI_EMAIL`)
* `--amount`: top-up amount in USD (min 20, max 10000; defaults to 25)
* `--auto-top-up`: turn on automatic top-up at checkout (off by default in the CLI)
* `--model`: default model ID written into the provider profile (defaults to `gpt-4o`)
* `--no-open`: print the payment URL instead of opening a browser

An existing account also needs the 6-digit code emailed to you. Interactive terminals prompt for it; for scripts, pipe it in with `--code-stdin`.

### Option 3: Environment variables

Setting the key alone is enough. OpenClaude auto-detects the AI/ML API route:

```bash
export AIMLAPI_API_KEY="your-aimlapi-key"
```

To configure the OpenAI-compatible route explicitly:

```bash
export CLAUDE_CODE_USE_OPENAI=1
export AIMLAPI_API_KEY="your-aimlapi-key"
export OPENAI_BASE_URL="https://api.aimlapi.com/v1"
export OPENAI_MODEL="gpt-4o"
```

`OPENAI_API_KEY` also works as a fallback credential for this route.

## Model selection

`/model` lists chat-capable models discovered from the AI/ML API catalog. Image, audio, and embedding models are intentionally not offered in the coding workflow.

The preset's default model is `gpt-4o`. Pick another model from `/model` after setup, using the exact ID from the catalog.

### Good starting models

* `gpt-4o`: the preset default
* `anthropic/claude-sonnet-5`: coding and long-form work
* `google/gemini-3.6-flash`: lower latency and lower cost

For the full catalog, use [All Model IDs](../api-references/model-database.md).

## Verify

* `/status` shows AI/ML API as the active provider with the `https://api.aimlapi.com/v1` base URL.
* `/model` lists chat-capable models from the catalog.
* Send any prompt to confirm responses come back from the selected model.

## Connect AI/ML API MCP tools (optional)

OpenClaude v0.34.0 and later include a built-in `aimlapi` plugin that connects the AI/ML API MCP server (`https://mcp.aimlapi.com/mcp`). It adds Toolbox tools (`tools_search`, `tools_inspect`, `tools_run`), image, video and audio generation, chat, embeddings, model lookup, and account balance and usage. Toolbox runs, generations, chat and embeddings are billed to your AI/ML API balance.

The plugin is off by default. With AI/ML API set up as your provider, turn it on with:

```bash
openclaude plugin enable aimlapi@builtin
```

* The plugin uses the key from `AIMLAPI_API_KEY`. Settings store only `"aimlapi@builtin": true`, never the key.
* The plugin is hidden when `AIMLAPI_API_KEY` is not set, or when your AI/ML API profile points at a proxy base URL.
* The server shows up as `plugin:aimlapi:aimlapi`, and its tools as `mcp__plugin_aimlapi_aimlapi__<tool>`.

Check the connection with `openclaude mcp list`, or with `/mcp` in a session. To turn it off:

```bash
openclaude plugin disable aimlapi@builtin
```

### Without the plugin

You can add the server with the standard MCP command. Keep the single quotes, so OpenClaude stores the variable reference instead of the key:

```bash
openclaude mcp add --transport http -s user aimlapi https://mcp.aimlapi.com/mcp \
  --header 'Authorization: Bearer ${AIMLAPI_API_KEY}'
```

To sign in with your AI/ML API account (OAuth) instead, leave out `--header`, then open `/mcp` in a session, select the server and authenticate in the browser.

### Web search and WebFetch through the Toolbox

Two more opt-in features reuse the same key and are billed to your AI/ML API balance:

* `/search aimlapi` (or `WEB_SEARCH_PROVIDER=aimlapi`) makes the AI/ML API Toolbox the web search provider. `/search auto` switches back.
* `WEB_FETCH_PROVIDER=aimlapi` makes `WebFetch` scrape pages through the Toolbox. The full URL is sent to the Toolbox, so don't use it for private or token-bearing URLs.

## Config checklist

Make sure these values are set:

* API key variable: `AIMLAPI_API_KEY`
* base URL: `https://api.aimlapi.com/v1` (built in, no manual config needed)
* model ID: exact AI/ML API chat model ID
* MCP (optional): `aimlapi@builtin` plugin enabled

## Troubleshooting

<details>

<summary>aimlapi.com is not in the /provider list</summary>

Update to the latest version. The preset ships upstream:

```bash
npm install -g @twigpine/openclaude@latest
```

</details>

<details>

<summary>I get an auth error</summary>

Check that:

* `AIMLAPI_API_KEY` is correctly set and exported
* the key is valid at [aimlapi.com/app/keys](https://aimlapi.com/app/keys)
* your balance is sufficient at [aimlapi.com/app](https://aimlapi.com/app)

</details>

<details>

<summary>Checkout completed but the key was not saved</summary>

The key exchange is one-shot and cannot be retried. If the local receipt could not be written (for example a read-only config directory), OpenClaude stops and names the issued key ID. Open [aimlapi.com/app](https://aimlapi.com/app), rotate that key, and configure the new one manually.

</details>

<details>

<summary>/usage shows nothing</summary>

Usage reporting is not supported for this provider. Track spend at [aimlapi.com/app](https://aimlapi.com/app) instead.

</details>

## Links

* [All Model IDs](../api-references/model-database.md)
* [AI/ML API keys](https://aimlapi.com/app/keys)
* [AI/ML API model catalog](https://aimlapi.com/models)
* [OpenClaude repository](https://github.com/Twigpine/openclaude)
* [OpenClaude AI/ML API setup guide](https://github.com/Twigpine/openclaude/blob/main/docs/aimlapi-setup.md)
