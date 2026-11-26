---
description: >-
  Connect Hermes Agent to AI/ML API through the official aimlapi.com provider
  plugin, with optional AI/ML API MCP tools.
---

# Hermes

## About

[Hermes Agent](https://github.com/NousResearch/hermes-agent) is an agent framework for CLI and messaging workflows.

AI/ML API ships as the **aimlapi.com provider plugin** in the official Hermes plugin catalog ([PR #146493](https://github.com/NousResearch/hermes-agent/pull/146493), updated to v1.1.0 in [PR #156918](https://github.com/NousResearch/hermes-agent/pull/156918)). The plugin adds `aimlapi` as a model provider and can also connect the [AI/ML API MCP server](../quickstart/mcp.md), so the agent gets model discovery, media generation and Toolbox tools. Its source is [aimlapi/hermes-provider-aimlapi](https://github.com/aimlapi/hermes-provider-aimlapi).

{% hint style="info" %}
Prefer one command? With Hermes Agent installed, `npx aimlapi hermes` signs you in through the browser, adds AI/ML API as a provider to Hermes' `config.yaml` and starts Hermes, with no key to copy. See [CLI](../quickstart/cli.md#hermes-agent).

The CLI adds its own providers (`custom:aimlapi-cli-run` for a single run, `custom:aimlapi-cli` with `--config`) rather than the plugin below. `aimlapi hermes --config` makes `custom:aimlapi-cli` the default and replaces the `model:` keys; `aimlapi hermes --undo` puts them back.
{% endhint %}

## Quick start

{% stepper %}
{% step %}
## Install Hermes

```bash
curl -fsSL https://hermes-agent.nousresearch.com/install.sh | bash
```
{% endstep %}

{% step %}
## Install the aimlapi.com plugin

```bash
hermes plugins install aimlapi
```
{% endstep %}

{% step %}
## Pick the provider

```bash
hermes model
```

Choose **aimlapi.com**, paste your key (or create an account from the terminal), and pick a model. At the end Hermes asks whether to add the AI/ML API MCP server.
{% endstep %}

{% step %}
## Start chatting

```bash
hermes
```
{% endstep %}
{% endstepper %}

## When to use AI/ML API with Hermes

AI/ML API works well with Hermes when you want:

* one key for many model providers behind an OpenAI-compatible endpoint
* a model picker with live prices
* MCP tools for image, video and audio generation, OCR and the AI/ML API Toolbox in the same agent

## Prerequisites

Before you start, make sure you have:

* Hermes Agent v0.23.3 or later (the plugin itself needs Hermes 0.22.0 or later)
* an interactive terminal for the guided `hermes model` step
* an AI/ML API key from [aimlapi.com/app/keys](https://aimlapi.com/app/keys), or an email to create an account during setup

The base URL is built into the plugin:

```
https://api.aimlapi.com/v1
```

Need a key first? Use [API Key Management](../api-references/service-endpoints/api-key-management.md).

## Install the plugin

### From the plugin catalog

```bash
hermes plugins install aimlapi
```

Hermes may ask `Enable now?`. Provider plugins work either way.

### By hand

Use this on any Hermes build that supports model-provider plugins:

```bash
git clone https://github.com/aimlapi/hermes-provider-aimlapi.git
mkdir -p ~/.hermes/plugins/model-providers
cp -r hermes-provider-aimlapi/aimlapi ~/.hermes/plugins/model-providers/aimlapi
```

## Set up the provider

Run:

```bash
hermes model
```

and choose **aimlapi.com**. The guided step then:

1. **If you already have a key**, asks you to paste it and checks it before saving.
2. **If you are a new user**, takes your email, a top-up amount and the auto top-up choice, opens checkout in the browser, and saves the issued key.
3. **If the email already has an account**, asks for the 6-digit code sent by email and creates a key named "Hermes Agent".

If a saved key is found, Hermes first asks whether to keep it. The key is saved as `AIMLAPI_API_KEY` in `~/.hermes/.env`.

### Set the key yourself

On builds without the guided step, or in scripts, set the key and pass the provider explicitly:

```bash
export AIMLAPI_API_KEY=your_key_here
hermes --provider aimlapi --model anthropic/claude-sonnet-5
```

Under cron, the messaging gateway or a redirected stdin, the guided step prints how to set `AIMLAPI_API_KEY` and stops.

## Connect AI/ML API MCP tools (optional)

At the end of the guided `hermes model` step the plugin asks:

```text
Add the aimlapi.com MCP server to Hermes? [y/N]
```

The default is no. On `y` it adds this entry to `~/.hermes/config.yaml`:

```yaml
mcp_servers:
  aimlapi:
    url: https://mcp.aimlapi.com/mcp
    headers:
      Authorization: Bearer ${AIMLAPI_API_KEY}
    trust: untrusted
```

* `${AIMLAPI_API_KEY}` is resolved from your Hermes `.env` when Hermes connects. The key itself is not written to `config.yaml`.
* `trust: untrusted` makes Hermes ask before every tool call that is not read-only, which covers every billed call. Read-only tools such as model search and account balance run without a prompt.
* If the provider points to another endpoint (through `AIMLAPI_INFERENCE_URL` or `model.base_url`), the entry gets `auth: oauth` instead of the key. Sign in with `hermes mcp login aimlapi`.
* An existing `mcp_servers.aimlapi` entry is never changed.

The tools load in your next session, or after `/reload-mcp`. To add the server on a build without the guided step, copy the same block into `config.yaml` by hand.

Check and manage the server:

```bash
hermes mcp list
hermes mcp test aimlapi
hermes mcp remove aimlapi
```

Generation, chat and Toolbox runs through MCP are billed to your AI/ML API balance. See [MCP](../quickstart/mcp.md) for the tool list.

## Model selection

The picker loads the AI/ML API catalog and shows the most popular models first, then every other chat model that supports tool calling, with live input and output prices. If the catalog cannot be loaded, it shows a built-in fallback list.

### Good starting models

* `anthropic/claude-sonnet-5`: the plugin default
* `anthropic/claude-opus-5`: for harder coding and long-form work
* `google/gemini-3.6-flash`: lower latency and lower cost

For the full catalog, use [All Model IDs](../api-references/model-database.md).

## Switch models later

To change the saved model, run `hermes model` again. For a single run, pass the provider and model:

```bash
hermes --provider aimlapi --model google/gemini-3.6-flash
```

## CLI and gateway usage

Once configured, the normal Hermes commands use AI/ML API. The Hermes gateway reuses the same default provider:

```bash
hermes gateway setup
hermes gateway start
```

## Config checklist

Make sure these values line up:

* plugin: `aimlapi` installed (`hermes plugins install aimlapi`)
* provider: `aimlapi` (shown as **aimlapi.com**)
* API key variable: `AIMLAPI_API_KEY` in `~/.hermes/.env`
* base URL: `https://api.aimlapi.com/v1` (built in)
* model ID: exact AI/ML API chat model ID
* MCP (optional): `mcp_servers.aimlapi` in `~/.hermes/config.yaml`

## Troubleshooting

<details>

<summary>aimlapi.com is not in the `hermes model` picker</summary>

Install the plugin with `hermes plugins install aimlapi`, or copy it by hand as shown above. Check that your Hermes version is 0.22.0 or later.

</details>

<details>

<summary>`hermes model` asks for a plain API key instead of the guided step</summary>

Your Hermes build does not support guided provider setup yet. Paste your key, or update Hermes to v0.23.3 or later. You can also add the MCP block to `config.yaml` by hand.

</details>

<details>

<summary>MCP tools do not show up</summary>

Tools load in a new session. Start a new session or run `/reload-mcp`, then check the server with `hermes mcp test aimlapi`.

</details>

<details>

<summary>I want to use a proxy</summary>

Set `AIMLAPI_INFERENCE_URL` or `model.base_url` in `config.yaml` to your proxy URL. In that case connect MCP with `hermes mcp login aimlapi`.

</details>

<details>

<summary>I get an auth error</summary>

Check that:

* `AIMLAPI_API_KEY` in `~/.hermes/.env` is a valid key from [aimlapi.com/app/keys](https://aimlapi.com/app/keys)
* a different `AIMLAPI_API_KEY` exported in your shell does not override it
* your balance is sufficient at [aimlapi.com/app](https://aimlapi.com/app)

Run `hermes doctor` to see what Hermes resolved.

</details>

## Links

* [All Model IDs](../api-references/model-database.md)
* [AI/ML API keys](https://aimlapi.com/app/keys)
* [AI/ML API model catalog](https://aimlapi.com/models)
* [aimlapi.com Hermes plugin](https://github.com/aimlapi/hermes-provider-aimlapi)
* [Hermes repository](https://github.com/NousResearch/hermes-agent)
