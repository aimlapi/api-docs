---
description: >-
  Connect goose, the open-source agent for desktop and terminal, to AI/ML API
  through its built-in provider.
---

# Goose

## About

[goose](https://github.com/aaif-goose/goose) is an open-source, general-purpose agent for coding, research, writing, automation, and data analysis. It runs as a desktop app and as a CLI.

AI/ML API is a **built-in provider** in goose, listed as **AI/ML API** (provider ID `aimlapi`). It was added in [PR #11758](https://github.com/aaif-goose/goose/pull/11758) and ships in goose **v1.50.0** and later, so there is nothing to patch or build from source.

## Quick start

{% stepper %}
{% step %}
## Install goose

Install the CLI:

```bash
curl -fsSL https://github.com/aaif-goose/goose/releases/download/stable/download_cli.sh | bash
```

For the desktop app, use the [goose installation guide](https://goose-docs.ai/docs/getting-started/installation).
{% endstep %}

{% step %}
## Configure the provider

```bash
goose configure
```

Choose **Configure Providers**, then pick **AI/ML API**.
{% endstep %}

{% step %}
## Paste your API key

When goose asks for `AIMLAPI_API_KEY`, paste your AI/ML API key, then pick a model.
{% endstep %}

{% step %}
## Start a session

```bash
goose session
```
{% endstep %}
{% endstepper %}

## When to use AI/ML API with goose

AI/ML API works well with goose when you want:

* one key and one OpenAI-compatible endpoint for models from many providers
* to switch models without adding a new provider each time
* the same provider in the goose desktop app and the CLI

## Prerequisites

Before you start, make sure you have:

* goose v1.50.0 or later
* an AI/ML API key from [aimlapi.com/app/keys](https://aimlapi.com/app/keys)
* a model ID from [aimlapi.com/models](https://aimlapi.com/models)

The base URL is built into the provider:

```
https://api.aimlapi.com/v1
```

Need a key first? Use [API Key Management](../api-references/service-endpoints/api-key-management.md).

## Set up AI/ML API in goose

### Option 1: CLI

1. Run `goose configure`.
2. Select **Configure Providers**.
3. Select **AI/ML API**.
4. Paste your key when goose asks for `AIMLAPI_API_KEY`.
5. Pick a model from the list.

### Option 2: Desktop app

On first launch, open **Other Providers**, find **AI/ML API**, click **Configure**, paste your key, and click **Submit**.

To change the provider or model later, open **Settings → Models → Switch models**.

### Option 3: Environment variables

goose reads the key from the environment, and `GOOSE_PROVIDER` / `GOOSE_MODEL` override the provider and model from the config file:

```bash
export AIMLAPI_API_KEY=your_key_here
export GOOSE_PROVIDER=aimlapi
export GOOSE_MODEL=openai/gpt-5-5
goose session
```

## Model selection

goose asks AI/ML API for its live model list. If that request fails, it falls back to the models bundled with the provider.

### Good starting models

* `openai/gpt-5-5`: the provider default
* `anthropic/claude-sonnet-5`: strong for coding
* `google/gemini-3.6-flash`: lower latency and lower cost

For the full catalog, use [All Model IDs](../api-references/model-database.md).

## Config checklist

Make sure these values are set:

* provider: **AI/ML API** (`aimlapi`)
* API key variable: `AIMLAPI_API_KEY`
* base URL: `https://api.aimlapi.com/v1` (built in)
* model ID: exact AI/ML API chat model ID, for example `openai/gpt-5-5`

## Troubleshooting

<details>

<summary>AI/ML API is not in the provider list</summary>

The provider ships in goose v1.50.0. Update goose and run `goose configure` again.

</details>

<details>

<summary>I get an auth error</summary>

Check that:

* the key is valid at [aimlapi.com/app/keys](https://aimlapi.com/app/keys)
* `AIMLAPI_API_KEY` in your shell is not an old key that overrides the one saved by `goose configure`
* your balance is sufficient at [aimlapi.com/app](https://aimlapi.com/app)

</details>

<details>

<summary>My model is missing from the list</summary>

Type the exact model ID from [aimlapi.com/models](https://aimlapi.com/models). goose uses the bundled list only when the live list cannot be loaded.

</details>

## Links

* [goose repository](https://github.com/aaif-goose/goose)
* [goose providers guide](https://goose-docs.ai/docs/getting-started/providers)
* [AI/ML API keys](https://aimlapi.com/app/keys)
* [AI/ML API model catalog](https://aimlapi.com/models)
