---
layout:
  width: wide
  title:
    visible: true
  description:
    visible: true
  tableOfContents:
    visible: true
  outline:
    visible: true
  pagination:
    visible: true
  metadata:
    visible: true
  tags:
    visible: true
  actions:
    visible: true
---

# Сlaude Fable 5

## Overview

**Claude Fable 5** (`anthropic/claude-fable-5`) is Anthropic's most capable widely-released model, built for the most demanding reasoning and long-horizon agentic work. It supports a **1M token context window** and up to **128k output tokens** per request. Adaptive thinking is always on — the model reasons before responding without requiring explicit configuration.

Claude Fable 5 includes safety classifiers. When a request is declined, the API returns `stop_reason: "refusal"` as a successful HTTP 200 response (not an error). Refused requests are not billed.

Model is available via the standard `/v1/chat/completions` endpoint as well as through the native `/messages` endpoint.

Supported capabilities:

* **Text completions:** Build advanced chat bots or text processors.
* **Function Calling:** Utilize tools for specific tasks and API calling.
* **Stream mode:** Get responses as they are generated.
* **Vision Tasks:** Process and analyze images.
* **Adaptive Thinking:** Extended reasoning is always enabled; control depth via the `thinking` parameter.

## Text Completions

Ask something and get an answer in a chat-like conversation format.

{% openapi-operation spec="claude-fable-5" path="/v1/chat/completions" method="post" %}
[OpenAPI claude-fable-5](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/text-models-llm/Anthropic/claude-fable-5.json)
{% endopenapi-operation %}

### Example: Simple Text Response

{% tabs %}
{% tab title="Python" %}
{% code overflow="wrap" %}
```python
import requests
import json

url = "https://api.aimlapi.com/v1/chat/completions"
headers = {
    # Insert your AIML API Key instead of <YOUR_AIMLAPI_KEY>:
    "Authorization": "Bearer <YOUR_AIMLAPI_KEY>",
    "Content-Type": "application/json"
}
payload = {
    "model": "anthropic/claude-fable-5",
    "max_tokens": 1024,
    "system": "You are a helpful assistant.",
    "messages": [
        {
            "role": "user",
            "content": "How are you?"
        }
    ]
}
response = requests.post(url, json=payload, headers=headers)
data = response.json()
print(json.dumps(data, indent=2, ensure_ascii=False))
```
{% endcode %}
{% endtab %}
{% endtabs %}

<details>

<summary>Response</summary>

{% code overflow="wrap" %}
```json5
{
  "id": "chatcmpl-CQ9FPg3osank0dx0k46Z53LTqtXMl",
  "object": "chat.completion",
  "created": 1762343744,
  "model": "anthropic/claude-fable-5",
  "choices": [
    {
      "index": 0,
      "message": {
        "role": "assistant",
        "content": "I'm doing well, thank you! I'm Claude Fable 5, ready to help with whatever you need. What can I assist you with today?"
      },
      "finish_reason": "stop"
    }
  ],
  "usage": {
    "prompt_tokens": 21,
    "completion_tokens": 31,
    "total_tokens": 52
  },
  "meta": {
    "usage": {
      "credits_used": 52000,
      "usd_spent": 0.00153
    }
  }
}
```
{% endcode %}

</details>

## Adaptive Thinking

Claude Fable 5 always uses adaptive thinking — the model reasons internally before responding. You can control the output of thinking blocks using the `thinking` parameter.

By default, thinking content is omitted from the response. Set `display: "summarized"` to receive a readable summary of the reasoning.

{% tabs %}
{% tab title="Python" %}
{% code overflow="wrap" %}
```python
import requests
import json

url = "https://api.aimlapi.com/v1/chat/completions"
headers = {
    "Authorization": "Bearer <YOUR_AIMLAPI_KEY>",
    "Content-Type": "application/json"
}
payload = {
    "model": "anthropic/claude-fable-5",
    "max_tokens": 4096,
    "thinking": {
        "type": "adaptive",
        "display": "summarized"
    },
    "messages": [
        {
            "role": "user",
            "content": "What is the square root of 1764, and how did you figure it out?"
        }
    ]
}
response = requests.post(url, json=payload, headers=headers)
print(json.dumps(response.json(), indent=2, ensure_ascii=False))
```
{% endcode %}
{% endtab %}
{% endtabs %}

## Function Calling

To process text and use function calling, follow the example below:

### Example: Get Weather Information

{% code overflow="wrap" %}
```python
import requests

url = "https://api.aimlapi.com/v1/chat/completions"
headers = {
    "Authorization": "Bearer <YOUR_AIMLAPI_KEY>",
    "Content-Type": "application/json"
}
payload = {
    "model": "anthropic/claude-fable-5",
    "max_tokens": 1024,
    "tools": [
        {
            "type": "function",
            "function": {
                "name": "get_weather",
                "description": "Get the current weather in a given location",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "location": {
                            "type": "string",
                            "description": "The city and state, e.g. San Francisco, CA"
                        }
                    },
                    "required": ["location"]
                }
            }
        }
    ],
    "messages": [
        {
            "role": "user",
            "content": "What is the weather like in San Francisco?"
        }
    ]
}
response = requests.post(url, json=payload, headers=headers)
print(response.json())
```
{% endcode %}

## Streaming Mode

To enable streaming of responses, set `stream: true` in your request payload.

{% code overflow="wrap" %}
```python
import requests

url = "https://api.aimlapi.com/v1/chat/completions"
headers = {
    "Authorization": "Bearer <YOUR_AIMLAPI_KEY>",
    "Content-Type": "application/json"
}
payload = {
    "model": "anthropic/claude-fable-5",
    "max_tokens": 1024,
    "stream": True,
    "messages": [
        {
            "role": "user",
            "content": "Write a short poem about the ocean."
        }
    ]
}

with requests.post(url, json=payload, headers=headers, stream=True) as response:
    for line in response.iter_lines():
        if line:
            print(line.decode("utf-8"))
```
{% endcode %}

## Vision

{% hint style="info" %}
**Note:** API supports both Base64 string and URL as image input for Claude Fable 5.
{% endhint %}

Possible media types:

* `image/jpeg`
* `image/png`
* `image/gif`
* `image/webp`

{% code overflow="wrap" %}
```python
import httpx
import base64
from openai import OpenAI

client = OpenAI(
    base_url="https://api.aimlapi.com",
    api_key="<YOUR_AIMLAPI_KEY>"
)

image_url = "https://upload.wikimedia.org/wikipedia/commons/a/a7/Camponotus_flavomarginatus_ant.jpg"
image_media_type = "image/jpeg"
image_data = base64.standard_b64encode(httpx.get(image_url).content).decode("utf-8")

response = client.chat.completions.create(
    model="anthropic/claude-fable-5",
    messages=[
        {
            "role": "user",
            "content": [
                {
                    "type": "image",
                    "source": {
                        "type": "base64",
                        "media_type": image_media_type,
                        "data": image_data,
                    },
                },
                {
                    "type": "text",
                    "text": "Describe this image."
                }
            ],
        }
    ],
)
print(response)
```
{% endcode %}

## Handling Refusals

Claude Fable 5 includes safety classifiers that may decline certain requests. Unlike HTTP errors, refusals return **HTTP 200** with `finish_reason: "refusal"`. Check for this in your integration:

{% code overflow="wrap" %}
```python
import requests

url = "https://api.aimlapi.com/v1/chat/completions"
headers = {
    "Authorization": "Bearer <YOUR_AIMLAPI_KEY>",
    "Content-Type": "application/json"
}
payload = {
    "model": "anthropic/claude-fable-5",
    "max_tokens": 1024,
    "messages": [{"role": "user", "content": "Your question here"}]
}

response = requests.post(url, json=payload, headers=headers)
data = response.json()

choice = data["choices"][0]
if choice["finish_reason"] == "refusal":
    print("Request was refused:", choice["message"].get("refusal"))
else:
    print("Response:", choice["message"]["content"])
```
{% endcode %}

## Response Format

{% code overflow="wrap" %}
```json
{
  "id": "chatcmpl-CQ9FPg3osank0dx0k46Z53LTqtXMl",
  "object": "chat.completion",
  "created": 1762343744,
  "model": "anthropic/claude-fable-5",
  "choices": [
    {
      "index": 0,
      "message": {
        "role": "assistant",
        "content": "I'm doing well, thank you! How can I assist you today?"
      },
      "finish_reason": "stop"
    }
  ],
  "usage": {
    "prompt_tokens": 21,
    "completion_tokens": 18,
    "total_tokens": 39
  },
  "meta": {
    "usage": {
      "credits_used": 39000,
      "usd_spent": 0.00117
    }
  }
}
```
{% endcode %}
