---
description: >-
  Connect OpenClaude, the open-source coding-agent CLI, to AI/ML API through its
  built-in provider preset.
---

# OpenClaude

## About

[OpenClaude](https://github.com/Gitlawb/openclaude) is an open-source coding-agent CLI that works with many model providers. Its homepage is [openclaude.gitlawb.com](https://openclaude.gitlawb.com/).

AI/ML API is a **built-in provider preset** in OpenClaude — it ships upstream, so a plain install already has it. OpenClaude can also create an AI/ML API account for you, top it up, and save the issued key, so you can start with no key at all.

## Quick start

{% stepper %}
{% step %}
## Install OpenClaude

Requires Node.js `>=22`.

```bash
npm install -g @gitlawb/openclaude@latest
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

* Node.js `>=22` and OpenClaude installed
* an AI/ML API key from [aimlapi.com/app/keys](https://aimlapi.com/app/keys) — optional, the guided flow can issue one
* a model ID from [aimlapi.com/models](https://aimlapi.com/models)

The base URL is:

```
https://api.aimlapi.com/v1
```

Need a key first? Use [API Key Management](/broken/pages/cdd447f8b558d5268491de41a1a02c07771cac9b).

## Set up AI/ML API in OpenClaude

### Option 1 — Interactive (`/provider`)

1. Start OpenClaude and run `/provider`.
2. Choose **aimlapi.com**.
3. Choose how to get a key:
   * **I am a new user** — enter your email. OpenClaude creates a passwordless account, lets you pick a top-up amount, opens card checkout, then saves the issued key.
   * **I already have aimlapi.com key** — paste a key from the dashboard. OpenClaude validates it, checks the balance, and offers a top-up when the balance is low.

If AI/ML API is already configured, the same menu offers **Continue with your saved API key** instead.

### Option 2 — CLI top-up

Run the guided flow non-interactively:

```bash
openclaude aimlapi topup --email you@example.com --amount 25
```

* `--amount` — top-up amount in USD (min 20, max 10000; defaults to 25)
* `--model` — default model ID written into the provider profile
* `--no-open` — print the payment URL instead of opening a browser

An existing account also needs the 6-digit code emailed to you. Interactive terminals prompt for it; for scripts, pipe it in with `--code-stdin`.

### Option 3 — Environment variables

Setting the key alone is enough — OpenClaude auto-detects the AI/ML API route:

```bash
export AIMLAPI_API_KEY="your-aimlapi-key"
```

To configure the OpenAI-compatible route explicitly:

```bash
export CLAUDE_CODE_USE_OPENAI=1
export AIMLAPI_API_KEY="your-aimlapi-key"
export OPENAI_BASE_URL="https://api.aimlapi.com/v1"
export OPENAI_MODEL="openai/gpt-4o"
```

## Model selection

`/model` lists chat-capable models discovered from the AI/ML API catalog. Image, audio, and embedding models are intentionally not offered in the coding workflow.

Model IDs carry a vendor prefix (`openai/gpt-4o`, not `gpt-4o`). Pick the model from `/model` after setup rather than relying on the preset's built-in default.

### Good starting models

* `openai/gpt-4o` — broadly capable, good default
* `anthropic/claude-sonnet-5` — coding and long-form work
* `google/gemini-3-7-flash` — lower latency and lower cost

For the full catalog, use [All Model IDs](/broken/pages/9db43b2a9ecf64fedb7fcfc447a3ace848669984).

## Verify

* `/status` shows AI/ML API as the active provider with the `https://api.aimlapi.com/v1` base URL.
* `/model` lists chat-capable models from the catalog.
* Send any prompt to confirm responses come back from the selected model.

## Config checklist

Make sure these values are set:

* API key variable: `AIMLAPI_API_KEY`
* base URL: `https://api.aimlapi.com/v1` (built in, no manual config needed)
* model ID: exact AI/ML API chat model ID

## Troubleshooting

<details>

<summary>aimlapi.com is not in the /provider list</summary>

Update to the latest version — the preset ships upstream:

```bash
npm install -g @gitlawb/openclaude@latest
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

* [All Model IDs](/broken/pages/9db43b2a9ecf64fedb7fcfc447a3ace848669984)
* [AI/ML API keys](https://aimlapi.com/app/keys)
* [AI/ML API model catalog](https://aimlapi.com/models)
* [OpenClaude repository](https://github.com/Gitlawb/openclaude)
* [OpenClaude AI/ML API setup guide](https://github.com/Gitlawb/openclaude/blob/main/docs/aimlapi-setup.md)
