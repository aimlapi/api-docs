---
description: >-
  Connect OmniRoute, the local OpenAI-compatible AI gateway, to AI/ML API
  through its built-in provider.
---

# OmniRoute

## About

[OmniRoute](https://github.com/cheaper-inference/OmniRoute) is a local AI gateway. It runs an OpenAI-compatible endpoint at `http://localhost:20128/v1` and routes requests across the provider accounts you connect, with fallback chains and a web dashboard. Coding tools and apps point at OmniRoute instead of at each provider.

AI/ML API is a **built-in provider** in OmniRoute, listed as **AI/ML API** (provider ID `aimlapi`, model prefix `aiml/`). Live model discovery for AI/ML API was fixed in [PR #18161](https://github.com/cheaper-inference/OmniRoute/pull/18161), which ships in OmniRoute **v3.8.53** and later.

## Quick start

{% stepper %}
{% step %}
## Install and start OmniRoute

```bash
npm install -g omniroute
omniroute
```

Or run it with Docker:

```bash
docker run -d -p 20128:20128 -v omniroute-data:/app/data cheaperinference/omniroute:latest
```
{% endstep %}

{% step %}
## Connect AI/ML API

Open the dashboard, go to **Providers**, connect **AI/ML API**, and paste your AI/ML API key.
{% endstep %}

{% step %}
## Create an OmniRoute key

In the dashboard, open **Endpoints** and create an API key for your tools.
{% endstep %}

{% step %}
## Point your tool at OmniRoute

```
Base URL: http://localhost:20128/v1
API Key:  the key from the Endpoints page
Model:    aiml/<model-id>
```
{% endstep %}
{% endstepper %}

## When to use AI/ML API with OmniRoute

AI/ML API works well with OmniRoute when you want:

* hundreds of chat models behind one provider connection
* AI/ML API as one step in an OmniRoute fallback chain
* one local endpoint for all your coding tools

## Prerequisites

Before you start, make sure you have:

* OmniRoute v3.8.53 or later
* an AI/ML API key from [aimlapi.com/app/keys](https://aimlapi.com/app/keys)
* a model ID from [aimlapi.com/models](https://aimlapi.com/models)

The AI/ML API endpoint is built into the provider:

```
https://api.aimlapi.com/v1
```

Need a key first? Use [API Key Management](../api-references/service-endpoints/api-key-management.md).

## Model selection

OmniRoute loads the AI/ML API model catalog and keeps only chat models. If the catalog cannot be loaded, it falls back to a short built-in list. Any other model ID is passed through to AI/ML API as is.

Use the `aiml/` prefix to send a request to AI/ML API, for example:

```
aiml/gpt-5
```

You can also use `auto` and let OmniRoute choose among your connected providers.

For the full catalog, use [All Model IDs](../api-references/model-database.md).

## Example request

```bash
curl http://localhost:20128/v1/chat/completions \
  -H "Authorization: Bearer $OMNIROUTE_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "aiml/gpt-5",
    "messages": [{"role": "user", "content": "Hello"}]
  }'
```

`$OMNIROUTE_KEY` is the key you created on the **Endpoints** page, not your AI/ML API key.

## Config checklist

Make sure these values are set:

* provider: **AI/ML API** connected under **Providers**
* AI/ML API key: saved in the provider connection
* tool base URL: `http://localhost:20128/v1`
* tool API key: an OmniRoute key from **Endpoints**
* model: `aiml/<model-id>` or `auto`

## Troubleshooting

<details>

<summary>The AI/ML API model list is short</summary>

OmniRoute shows the built-in fallback list when it cannot load the AI/ML API catalog. Update to v3.8.53 or later, which fixed AI/ML API model discovery.

</details>

<details>

<summary>I get an auth error</summary>

Check which key failed:

* your tool must send the OmniRoute key from **Endpoints**
* the AI/ML API connection must hold a valid key from [aimlapi.com/app/keys](https://aimlapi.com/app/keys)
* your AI/ML API balance must be sufficient at [aimlapi.com/app](https://aimlapi.com/app)

</details>

<details>

<summary>Requests go to another provider</summary>

Use the `aiml/` prefix in the model name. With `auto`, OmniRoute chooses among all connected providers.

</details>

## Links

* [OmniRoute repository](https://github.com/cheaper-inference/OmniRoute)
* [AI/ML API keys](https://aimlapi.com/app/keys)
* [AI/ML API model catalog](https://aimlapi.com/models)
