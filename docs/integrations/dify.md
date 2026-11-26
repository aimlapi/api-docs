---
description: >-
  Install the aimlapi.com plugin from the Dify Marketplace and use AI/ML API
  models across your Dify apps, workflows, and agents.
---

# Dify

## About

[Dify](https://dify.ai/) is an open-source platform for building LLM applications — chat apps, agents, and visual workflows — with a built-in RAG pipeline and a model-provider layer that any app in the workspace shares.

AI/ML API ships two official **Dify Marketplace plugins** that use the same key:

* **aimlapi.com**, published as [aimlapi/aimlapi](https://marketplace.dify.ai/plugin/aimlapi/aimlapi): a model provider for chat and embedding models. Install it, paste one key, and every app in the workspace can use AI/ML API models.
* **AI/ML API Media & Search**, published as [aimlapi/aimlapi\_media](https://marketplace.dify.ai/plugin/aimlapi/aimlapi_media): a tool plugin for image and video generation, text to speech, speech to text, OCR and web search. See [Media and search tools](dify.md#media-and-search-tools).

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

Need a key first? Use [API Key Management](../api-references/service-endpoints/api-key-management.md).

## Supported model types

| Dify model type | Used for |
| --------------- | -------- |
| LLM | chat apps, agents, workflow LLM nodes |
| Text Embedding | indexing knowledge into Dify's RAG pipeline |

Image, video, and audio models are not exposed through the model provider plugin. Use the [AI/ML API Media & Search](dify.md#media-and-search-tools) tool plugin for them.

## Model selection

The plugin ships a generated snapshot of the AI/ML API chat catalog — over 300 predefined models, hottest first — plus embedding models. Anything not in the list can be added as a **custom model**: choose *Add Model*, and enter the full AI/ML API model ID.

### Good starting models

* `openai/gpt-5-5` — strong general use
* `anthropic/claude-sonnet-5` — long-form and agentic work
* `google/gemini-3.6-flash` — lower latency and lower cost
* `openai/text-embedding-3-small` — embeddings

For the full catalog, use [All Model IDs](../api-references/model-database.md).

## Media and search tools

The **AI/ML API Media & Search** plugin ([aimlapi/aimlapi\_media](https://marketplace.dify.ai/plugin/aimlapi/aimlapi_media), v0.1.0, merged into the Dify plugin registry in [PR #3935](https://github.com/langgenius/dify-plugins/pull/3935)) adds AI/ML API tools that you can use in workflows, chatflows and agents. It is a regular Dify tool plugin and needs Dify 1.6.0 or later.

| Tool | What it does | Default model |
| --- | --- | --- |
| Generate image | Text to image | `minimax/image-01` |
| Generate video | Text to video: submits the job, waits, returns the file | `minimax/h3-lite` |
| Get video result | Fetches a video by generation ID | n/a |
| Text to speech | Text to audio | `openai/gpt-4o-mini-tts` |
| Speech to text | Transcribes an uploaded audio file | `deepgram/nova-3` |
| OCR | PDF or image to Markdown, page by page | `mistral/mistral-ocr-latest` |
| Web search | AI/ML API Toolbox tool `web/search` | n/a |

### Set up the tools

1. In Dify, install **AI/ML API Media & Search** from the Marketplace.
2. Open **Tools → AI/ML API Media & Search → Authorize** and paste your AI/ML API key (the same key as the model provider plugin).
3. Add the tools to a workflow, chatflow or agent.

### Notes

* Each tool's **Model** dropdown is filled live from the AI/ML API catalog and lists only models of the matching type.
* Video generation waits up to **Max wait** (default 300 seconds, maximum 540). If the video is not ready by then, the tool returns a generation ID: pass it to **Get video result** later.
* Every tool call except key validation and the model list is billed to your AI/ML API balance. Web search is capped at $0.025 per run.
* On self-hosted Dify, **Speech to text** and **OCR** need `FILES_URL` to be set, so the plugin can read uploaded files.

## Config checklist

Make sure these values are set:

* plugin: **aimlapi.com** installed from the Dify Marketplace
* API key: your AI/ML API key, saved in **Settings → Model Provider**
* model: a predefined model, or a custom model with an exact AI/ML API model ID
* tools (optional): **AI/ML API Media & Search** installed and authorized under **Tools**

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

* [All Model IDs](../api-references/model-database.md)
* [AI/ML API keys](https://aimlapi.com/app/keys)
* [AI/ML API model catalog](https://aimlapi.com/models)
* [aimlapi.com plugin on the Dify Marketplace](https://marketplace.dify.ai/plugin/aimlapi/aimlapi)
* [Dify documentation](https://docs.dify.ai/)
