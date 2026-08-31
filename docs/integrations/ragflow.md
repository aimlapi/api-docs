---
description: >-
  Add AI/ML API as a model provider in RAGFlow and use it for chat, embeddings,
  and vision across your knowledge bases and agents.
---

# RAGFlow

## About

[RAGFlow](https://github.com/infiniflow/ragflow) is an open-source Retrieval-Augmented Generation (RAG) engine that pairs deep document understanding with agent capabilities. You upload documents into knowledge bases, and RAGFlow chunks, embeds, retrieves, and answers over them.

AI/ML API is a **built-in model provider** in RAGFlow. It shipped upstream in [PR #17311](https://github.com/infiniflow/ragflow/pull/17311) (merged July 24, 2026) and is available to users from release **v0.27.0** onward — add it in **Model providers** with one key and use AI/ML API models across chat, embedding, and image-to-text tasks.

## Quick start

{% stepper %}
{% step %}
## Run RAGFlow v0.27.0 or newer

Earlier releases do not include the provider. Check your version in the RAGFlow UI or pull a current image.
{% endstep %}

{% step %}
## Open Model providers

Click your avatar in the top-right corner, then open **Model providers**.
{% endstep %}

{% step %}
## Add aimlapi.com

Find **aimlapi.com** under the providers to be added and click **Add the LLM**.
{% endstep %}

{% step %}
## Fill in the model and key

Choose the model type, pick a model, paste your AI/ML API key, and save.
{% endstep %}

{% step %}
## Set your system defaults

In **Set default models**, select the AI/ML API models RAGFlow should use for chat, embedding, and image-to-text.
{% endstep %}
{% endstepper %}

## When to use AI/ML API with RAGFlow

AI/ML API works well with RAGFlow when you want:

* one key covering the chat, embedding, and vision models a RAG pipeline needs
* to change the answering model without re-embedding your knowledge bases
* to compare models from different vendors inside the same RAGFlow instance

## Prerequisites

Before you start, make sure you have:

* RAGFlow **v0.27.0** or newer (see [github.com/infiniflow/ragflow](https://github.com/infiniflow/ragflow))
* an AI/ML API key from [aimlapi.com/app/keys](https://aimlapi.com/app/keys)
* a model ID from [aimlapi.com/models](https://aimlapi.com/models)

The base URL is:

```
https://api.aimlapi.com/v1
```

Need a key first? Use [API Key Management](/broken/pages/cdd447f8b558d5268491de41a1a02c07771cac9b).

## Supported model types

The provider registers three model types in RAGFlow:

| RAGFlow model type | Used for |
| ------------------ | -------- |
| Chat | answering, agents, and assistants |
| Embedding | indexing documents into knowledge bases |
| Img2txt | reading images and scanned pages |

Video, audio, and image-generation models are not exposed through this provider.

## Model selection

The provider ships a short preset list, and you can add any other AI/ML API model by its exact ID.

### Good starting models

* `openai/gpt-4o` — chat and image-to-text
* `anthropic/claude-opus-4-8` — long-context answering
* `google/gemini-2.5-flash` — lower latency and lower cost
* `openai/text-embedding-3-small` — embeddings

For the full catalog, use [All Model IDs](/broken/pages/9db43b2a9ecf64fedb7fcfc447a3ace848669984).

## Config checklist

Make sure these values are set:

* provider: **aimlapi.com** in **Model providers**
* API key: your AI/ML API key
* base URL: `https://api.aimlapi.com/v1` (built in; override with `AIMLAPI_API_URL` if you run through a proxy)
* default models: set under **Set default models**

## Troubleshooting

<details>

<summary>aimlapi.com is not in the provider list</summary>

The provider ships from RAGFlow **v0.27.0**. Upgrade your deployment — on v0.26.x and earlier the entry does not exist.

</details>

<details>

<summary>A model I want is not in the dropdown</summary>

The preset list is short by design. Add the model by its exact AI/ML API ID instead — the provider accepts any OpenAI-compatible chat or embedding model ID from the catalog.

</details>

<details>

<summary>I get an auth error</summary>

Check that:

* the key is valid at [aimlapi.com/app/keys](https://aimlapi.com/app/keys)
* your balance is sufficient at [aimlapi.com/app](https://aimlapi.com/app)
* the model ID matches the catalog exactly, including the vendor prefix

</details>

<details>

<summary>Retrieval quality dropped after switching the embedding model</summary>

Changing the embedding model changes the vector space. Re-parse the affected knowledge bases so the documents are re-embedded with the new model.

</details>

## Links

* [All Model IDs](/broken/pages/9db43b2a9ecf64fedb7fcfc447a3ace848669984)
* [AI/ML API keys](https://aimlapi.com/app/keys)
* [AI/ML API model catalog](https://aimlapi.com/models)
* [RAGFlow repository](https://github.com/infiniflow/ragflow)
* [RAGFlow documentation](https://ragflow.io/docs)
