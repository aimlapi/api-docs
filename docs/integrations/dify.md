---
description: >-
  Install the aimlapi.com plugin from the Dify Marketplace and use AI/ML API
  models across your Dify apps, workflows, and agents.
---

# Dify

## About

[Dify](https://dify.ai/) is an open-source platform for building LLM applications — chat apps, agents, and visual workflows — with a built-in RAG pipeline and a model-provider layer that any app in the workspace shares.

AI/ML API ships as an official **Dify Marketplace plugin**, published as [aimlapi/aimlapi](https://marketplace.dify.ai/plugin/aimlapi/aimlapi). Install it from the Marketplace, paste one key, and every app in the workspace can use AI/ML API models.

## Quick start

{% stepper %}
{% step %}
## Open the Marketplace

In Dify, open **Plugins** and switch to the **Marketplace** tab.
{% endstep %}

{% step %}
## Install aimlapi.com

Search for **aimlapi.com** and install the plugin.
{% endstep %}

{% step %}
## Add your API key

Open **Settings → Model Provider**, find **aimlapi.com**, and paste your AI/ML API key.
{% endstep %}

{% step %}
## Pick a model

Select a predefined model, or add a custom model by its exact AI/ML API model ID.
{% endstep %}
{% endstepper %}

## When to use AI/ML API with Dify

AI/ML API works well with Dify when you want:

* one key and one provider entry instead of a separate credential per vendor
* both the chat and embedding models a Dify RAG app needs from a single provider
* to swap the model behind an app without touching the app's prompt or workflow

## Prerequisites

Before you start, make sure you have:

* a Dify workspace — cloud or self-hosted (see [dify.ai](https://dify.ai/))
* an AI/ML API key from [aimlapi.com/app/keys](https://aimlapi.com/app/keys)
* a model ID from [aimlapi.com/models](https://aimlapi.com/models)

Need a key first? Use [API Key Management](/broken/pages/cdd447f8b558d5268491de41a1a02c07771cac9b).

## Supported model types

| Dify model type | Used for |
| --------------- | -------- |
| LLM | chat apps, agents, workflow LLM nodes |
| Text Embedding | indexing knowledge into Dify's RAG pipeline |

Image, video, and audio models are not exposed through this plugin.

## Model selection

The plugin ships a generated snapshot of the AI/ML API chat catalog — over 300 predefined models, hottest first — plus embedding models. Anything not in the list can be added as a **custom model**: choose *Add Model*, and enter the full AI/ML API model ID.

### Good starting models

* `openai/gpt-5-5` — strong general use
* `anthropic/claude-sonnet-5` — long-form and agentic work
* `google/gemini-3.6-flash` — lower latency and lower cost
* `openai/text-embedding-3-small` — embeddings

For the full catalog, use [All Model IDs](/broken/pages/9db43b2a9ecf64fedb7fcfc447a3ace848669984).

## Config checklist

Make sure these values are set:

* plugin: **aimlapi.com** installed from the Dify Marketplace
* API key: your AI/ML API key, saved in **Settings → Model Provider**
* model: a predefined model, or a custom model with an exact AI/ML API model ID

## Troubleshooting

<details>

<summary>I cannot find the plugin in the Marketplace</summary>

Search for **aimlapi.com**. On a self-hosted Dify, confirm that Marketplace access is enabled for the instance; otherwise install the plugin package manually from the [plugin repository](https://github.com/aimlapi/dify-aimlapi-plugin).

</details>

<details>

<summary>The key saves, but inference fails</summary>

A key with a zero balance can still be saved. If the balance is insufficient at inference time, the plugin returns a link to add credits — top up at [aimlapi.com/app](https://aimlapi.com/app).

</details>

<details>

<summary>A model I want is not in the list</summary>

The predefined list is a snapshot of the catalog. Add the model as a custom model with its exact AI/ML API model ID, including the vendor prefix.

</details>

<details>

<summary>I get an auth error</summary>

Check that:

* the key is valid at [aimlapi.com/app/keys](https://aimlapi.com/app/keys)
* the model ID matches the catalog exactly
* the workspace uses the provider entry you configured, not a leftover custom OpenAI-compatible entry

</details>

## Links

* [All Model IDs](/broken/pages/9db43b2a9ecf64fedb7fcfc447a3ace848669984)
* [AI/ML API keys](https://aimlapi.com/app/keys)
* [AI/ML API model catalog](https://aimlapi.com/models)
* [aimlapi.com plugin on the Dify Marketplace](https://marketplace.dify.ai/plugin/aimlapi/aimlapi)
* [Dify documentation](https://docs.dify.ai/)
