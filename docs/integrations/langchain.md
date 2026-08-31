---
description: >-
  Use AI/ML API models in LangChain through the official langchain-aimlapi
  package.
---

# LangChain

## About

[LangChain](https://www.langchain.com/) is a framework for building applications and agents on top of language models — chains, tools, retrieval, and memory, with a common interface across model providers.

AI/ML API is an **official LangChain provider**: the integration ships as the `langchain-aimlapi` package on PyPI and is documented in the LangChain docs at [docs.langchain.com](https://docs.langchain.com/oss/python/integrations/providers/aimlapi). One key gives your chains access to chat, text, embedding, image, and video models.

## Quick start

{% stepper %}
{% step %}
## Install the package

```bash
pip install -U langchain-aimlapi
```
{% endstep %}

{% step %}
## Set your API key

```bash
export AIMLAPI_API_KEY=your_key_here
```
{% endstep %}

{% step %}
## Call a model

```python
from langchain_aimlapi import ChatAimlapi

llm = ChatAimlapi(model="openai/gpt-5-5")
print(llm.invoke("Sing a ballad of LangChain.").content)
```
{% endstep %}
{% endstepper %}

## When to use AI/ML API with LangChain

AI/ML API works well with LangChain when you want:

* chat, embedding, image, and video models behind one key and one package
* to swap the model in a chain by changing a string, not a dependency
* an OpenAI-compatible provider that also covers non-OpenAI vendors

## Prerequisites

Before you start, make sure you have:

* Python and LangChain installed
* an AI/ML API key from [aimlapi.com/app/keys](https://aimlapi.com/app/keys)
* a model ID from [aimlapi.com/models](https://aimlapi.com/models)

The base URL is:

```
https://api.aimlapi.com/v1
```

Authentication is read from the `AIMLAPI_API_KEY` environment variable:

```python
import os

os.environ["AIMLAPI_API_KEY"] = "your_key_here"
```

Need a key first? Use [API Key Management](/broken/pages/cdd447f8b558d5268491de41a1a02c07771cac9b).

## Available classes

| Class | Use for |
| ----- | ------- |
| `ChatAimlapi` | chat completions |
| `AimlapiLLM` | text completions |
| `AimlapiEmbeddings` | embeddings |
| `AimlapiImageModel` | image generation |
| `AimlapiVideoModel` | video generation |

All classes provide both synchronous and asynchronous APIs.

## Examples

### Chat

```python
from langchain_aimlapi import ChatAimlapi

llm = ChatAimlapi(model="openai/gpt-5-5", temperature=0.7)
llm.invoke("Explain retrieval-augmented generation in three sentences.")
```

### Embeddings

```python
from langchain_aimlapi import AimlapiEmbeddings

embeddings = AimlapiEmbeddings(model="openai/text-embedding-3-small")
embeddings.embed_query("What is the meaning of life?")
```

### Image generation

```python
from langchain_aimlapi import AimlapiImageModel

img = AimlapiImageModel(model="stable-diffusion-v3-medium", size="512x512", n=1)
img.invoke("A serene mountain lake at sunset")
```

### Video generation

```python
from langchain_aimlapi import AimlapiVideoModel

vid = AimlapiVideoModel(model="google/veo-3.0-fast")
vid.invoke("A timelapse of city lights at night")
```

## Model selection

Always pass `model=` explicitly and use the exact catalog ID, including the vendor prefix — `openai/gpt-5-5`, not `gpt-5-5`.

### Good starting models

* `openai/gpt-5-5` — strong general use
* `anthropic/claude-sonnet-5` — coding and long-form work
* `google/gemini-3.6-flash` — lower latency and lower cost
* `openai/text-embedding-3-small` — embeddings

For the full catalog, use [All Model IDs](/broken/pages/9db43b2a9ecf64fedb7fcfc447a3ace848669984).

## Config checklist

Make sure these values are set:

* package: `langchain-aimlapi`
* API key variable: `AIMLAPI_API_KEY`
* base URL: `https://api.aimlapi.com/v1` (built in; override with `AIMLAPI_API_BASE`)
* model ID: exact AI/ML API model ID, passed as `model=`

## Troubleshooting

<details>

<summary>I get a model-not-found error</summary>

Pass `model=` explicitly and copy the ID from [aimlapi.com/models](https://aimlapi.com/models). IDs are vendor-prefixed; a bare name such as `gpt-5-5` is not a catalog ID.

</details>

<details>

<summary>I get an auth error</summary>

Check that:

* `AIMLAPI_API_KEY` is set in the environment the Python process actually sees
* the key is valid at [aimlapi.com/app/keys](https://aimlapi.com/app/keys)
* your balance is sufficient at [aimlapi.com/app](https://aimlapi.com/app)

</details>

<details>

<summary>I need a different endpoint</summary>

Set `AIMLAPI_API_BASE` to override the base URL. Leave it unset to use `https://api.aimlapi.com/v1/`.

</details>

## Links

* [All Model IDs](/broken/pages/9db43b2a9ecf64fedb7fcfc447a3ace848669984)
* [AI/ML API keys](https://aimlapi.com/app/keys)
* [AI/ML API model catalog](https://aimlapi.com/models)
* [langchain-aimlapi on PyPI](https://pypi.org/project/langchain-aimlapi/)
* [AI/ML API provider page in the LangChain docs](https://docs.langchain.com/oss/python/integrations/providers/aimlapi)
* [langchain-aimlapi repository](https://github.com/aimlapi/langchain-aimlapi)
