---
description: >-
  Short description of third-party integration with AI/ML API (LiteLLM) and how
  to work with it.
---

# LiteLLM

## About

[LiteLLM](https://www.litellm.ai/) is an open-source Python library that provides a unified API for interacting with multiple large language model providers. It allows developers to switch between different models with minimal code changes, optimizing cost and performance. LiteLLM simplifies integration by offering a single interface for various LLM endpoints, enabling seamless experimentation and deployment across different AI providers.

If you use this library, you can also call models from AI/ML API through it. Below are the most common use cases:&#x20;

* [Chat completion](litellm.md#chat-completion)
* [Streaming](litellm.md#streaming)
* [Chat completion (asynchronous)](litellm.md#async-completion)
* [Streaming (asynchronous)](litellm.md#async-streaming)
* [Embedding (asynchronous)](litellm.md#async-embedding)
* [Image Generation (asynchronous)](litellm.md#async-image-generation)

## Installation <a href="#usage" id="usage"></a>

Install the library with the standard pip tool in terminal:

```sh
pip install litellm
```

## Making API Calls <a href="#usage" id="usage"></a>

You can choose from LLama, Qwen, Flux, and 200+ other models on the [AI/ML API official website](https://aimlapi.com/models).&#x20;

### Chat completion

{% code overflow="wrap" %}
```python
import litellm

response = litellm.completion(
    # The model name must include prefix "openai/" + the model id from AI/ML API:
    model="openai/meta-llama/Meta-Llama-3.1-405B-Instruct-Turbo", 
    # your AI/ML API api-key: 
    api_key="<YOUR_AIMLAPI_KEY>", 
    api_base="https://api.aimlapi.com/v2",
    messages=[
        {
            "role": "user",
            "content": "Hey, how's it going?",
        }
    ],
)
```
{% endcode %}

### Streaming <a href="#streaming" id="streaming"></a>

{% code overflow="wrap" %}
```python
import litellm

response = litellm.completion(
    # The model name must include prefix "openai/" + the model id from AI/ML API:
    model="openai/Qwen/Qwen2-72B-Instruct",  
    # your AI/ML API api-key 
    api_key="<YOUR_AIMLAPI_KEY>",  
    api_base="https://api.aimlapi.com/v2",
    messages=[
        {
            "role": "user",
            "content": "Hey, how's it going?",
        }
    ],
    stream=True,
)
for chunk in response:
    print(chunk)
```
{% endcode %}

### Async Completion <a href="#async-completion" id="async-completion"></a>

{% code overflow="wrap" %}
```python
import asyncio

import litellm


async def main():
    response = await litellm.acompletion(
        # The model name must include prefix "openai/" + the model id from AI/ML API:
        model="openai/anthropic/claude-3-5-haiku",  
        # your AI/ML API api-key 
        api_key="<YOUR_AIMLAPI_KEY>", 
        api_base="https://api.aimlapi.com/v2",
        messages=[
            {
                "role": "user",
                "content": "Hey, how's it going?",
            }
        ],
    )
    print(response)


if __name__ == "__main__":
    asyncio.run(main())
```
{% endcode %}

### Async Streaming <a href="#async-streaming" id="async-streaming"></a>

{% code overflow="wrap" %}
```python
import asyncio
import traceback

import litellm


async def main():
    try:
        print("test acompletion + streaming")
        response = await litellm.acompletion(
            # The model name must include prefix "openai/" + model id from AI/ML API:
            model="openai/nvidia/Llama-3.1-Nemotron-70B-Instruct-HF",
            # your AI/ML API api-key 
            api_key="<YOUR_AIMLAPI_KEY>",
            api_base="https://api.aimlapi.com/v2",
            messages=[{"content": "Hey, how's it going?", "role": "user"}],
            stream=True,
        )
        print(f"response: {response}")
        async for chunk in response:
            print(chunk)
    except:
        print(f"error occurred: {traceback.format_exc()}")
        pass


if __name__ == "__main__":
    asyncio.run(main())
```
{% endcode %}

### Async Embedding <a href="#async-embedding" id="async-embedding"></a>

{% code overflow="wrap" %}
```python
import asyncio

import litellm


async def main():
    response = await litellm.aembedding(
        # The model name must include prefix "openai/" + model id from AI/ML API:
        model="openai/text-embedding-3-small",
        # your AI/ML API api-key 
        api_key="<YOUR_AIMLAPI_KEY>",
        api_base="https://api.aimlapi.com/v1", # 👈 the URL has changed from v2 to v1
        input="Your text string",
    )
    print(response)


if __name__ == "__main__":
    asyncio.run(main())
```
{% endcode %}

### Async Image Generation <a href="#async-image-generation" id="async-image-generation"></a>

{% code overflow="wrap" %}
```python
import asyncio

import litellm


async def main():
    response = await litellm.aimage_generation(
        # The model name must include prefix "openai/" + model id from AI/ML API:
        model="openai/dall-e-3",
        # your AI/ML API api-key 
        api_key="",
        api_base="https://api.aimlapi.com/v1", # 👈 the URL has changed from v2 to v1
        prompt="A cute baby sea otter",
    )
    print(response)


if __name__ == "__main__":
    asyncio.run(main())
```
{% endcode %}
