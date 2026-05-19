# Anthropic

## Overview

**Anthropic** is an AI research and product company founded by former OpenAI researchers. The company is best known for its strong emphasis on AI safety, interpretability, and long-term alignment. Anthropic describes its mission as building “reliable, interpretable, and steerable” AI systems that can be safely deployed at scale.

Its product lineup spans lightweight **Haiku** models for fast inference, **Sonnet** models aimed at general-purpose production workloads, and **Opus** models designed for advanced reasoning, coding, and research tasks. Beyond chat assistants, Anthropic is actively expanding into agentic tooling with products such as [Claude Code](../../../integrations/claude-code.md) and enterprise integrations focused on automation, software engineering, and organizational workflows.

***

The chat models from this provider have some unique characteristics. Models from Anthropic can be accessed not only via the standard `/v1/chat/completions` endpoint but also through dedicated endpoints — `/messages` and `/v1/batches` and `/v1/batches/cancel/{batch_id}`.\
The sections below describe their API schemas, usage specifics, and example requests.

Supported capabilities:

* **Text completions:** Build advanced chat bots or text processors.
* **Function Calling:** Utilize tools for specific tasks and API calling.
* **Stream mode:** Get the text chat model responses as they are generated, rather than waiting for the entire response to be completed.
* **Batch Processing:** Send multiple independent requests in a single API call.
* **Vision Tasks:** Process and analyze images.

## Text Completions

Ask something and get an answer in a chat-like conversation format.

{% openapi-operation spec="messages" path="/v1/messages" method="post" %}
[OpenAPI messages](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/capabilities/messages.json)
{% endopenapi-operation %}

### **Example: Simple Text Response**

{% tabs %}
{% tab title="Python" %}
{% code overflow="wrap" %}
```python
import requests
import json   # for getting a structured output with indentation

url = "https://api.aimlapi.com/messages"
headers = {
    # Insert your AIML API Key instead of <YOUR_AIMLAPI_KEY>: 
    "Authorization": "Bearer <YOUR_AIMLAPI_KEY>",
    "Content-Type": "application/json"
}
payload = {
  "model": "claude-sonnet-4-20250514",
  "max_tokens": 1024,
  "system": "You are a robot. You always optimize for clarity, structure, and accuracy.",
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
  "model": "claude-sonnet-4-20250514",
  "id": "msg_01SUmNmSRFZsoa6h96MxJEHH",
  "type": "message",
  "role": "assistant",
  "content": [
    {
      "type": "text",
      "text": "I'm functioning well, thank you for asking! I'm ready to help you with any questions or tasks you might have. How can I assist you today?"
    }
  ],
  "stop_reason": "end_turn",
  "stop_sequence": null,
  "stop_details": null,
  "usage": {
    "input_tokens": 27,
    "cache_creation_input_tokens": 0,
    "cache_read_input_tokens": 0,
    "cache_creation": {
      "ephemeral_5m_input_tokens": 0,
      "ephemeral_1h_input_tokens": 0
    },
    "output_tokens": 35,
    "service_tier": "standard",
    "inference_geo": "not_available"
  },
  "meta": {
    "usage": {
      "credits_used": 1576,
      "usd_spent": 0.000788
    }
  }
}
```
{% endcode %}

</details>

***

## **Function Calling**

To process text and use function calling, follow the examples below:

### **Example: Get Weather Information**

{% code overflow="wrap" %}
```python
import requests

url = "https://api.aimlapi.com/messages"
headers = {
    "Authorization": "Bearer YOUR_AIMLAPI_KEY",
    "Content-Type": "application/json"
}
payload = {
  "model": "anthropic/claude-sonnet-4.5",
  "max_tokens": 1024,
  "tools": [
    {
      "name": "get_weather",
      "description": "Get the current weather in a given location",
      "input_schema": {
        "type": "object",
        "properties": {
          "location": {
            "type": "string",
            "description": "The city and state, e.g. San Francisco, CA"
          }
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

***

## Streaming Mode

To enable streaming of responses, set `stream=True` in your request payload.

```python
import requests

url = "https://api.aimlapi.com/messages"
headers = {
    "Authorization": "Bearer YOUR_AIMLAPI_KEY",
    "Content-Type": "application/json"
}
payload = {
  "model": "anthropic/claude-sonnet-4.5",
  "max_tokens": 1024,
  "tools": [
    {
      "name": "get_weather",
      "description": "Get the current weather in a given location",
      "input_schema": {
        "type": "object",
        "properties": {
          "location": {
            "type": "string",
            "description": "The city and state, e.g. San Francisco, CA"
          }
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
```

***

## **Batch Processing**

Due to the complexity of its description, this capability has been placed on [a separate page](../../../capabilities/batch-processing.md).

***

## **Vision**

{% hint style="info" %}
**Note:** API only support [Base64 string](../../../glossary/concepts.md#base64) as image input.
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
    base_url='https://api.aimlapi.com',
    api_key='<YOUR_AIMLAPI_KEY>'    
)  

image_url = "https://upload.wikimedia.org/wikipedia/commons/a/a7/Camponotus_flavomarginatus_ant.jpg"
image_media_type = "image/jpeg"
image_data = base64.standard_b64encode(httpx.get(image_url).content).decode("utf-8")

response = client.chat.completions.create(
    model="anthropic/claude-sonnet-4.5",
    messages=[
    {
        "role": "user",
        "content": [
            {
                "type": "image",
                "source": {
                    "type": "base64",
                    "media_type": image_media_type,
                    "data": imag1_data,
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

***

## Response Format

The responses from the AI/ML API for Anthropic models will typically include the generated text or results from the tool called. Here is an example response for a weather query:

{% code overflow="wrap" %}
```json
{
  "model": "claude-sonnet-4-20250514",
  "id": "msg_014iMvypzB9GafRthc8CQHsR",
  "type": "message",
  "role": "assistant",
  "content": [
    {
      "type": "text",
      "text": "I'm doing well, thank you for asking! I'm here and ready to help with whatever you'd like to discuss or work on. How are you doing today?"
    }
  ],
  "stop_reason": "end_turn",
  "stop_sequence": null,
  "stop_details": null,
  "usage": {
    "input_tokens": 11,
    "cache_creation_input_tokens": 0,
    "cache_read_input_tokens": 0,
    "cache_creation": {
      "ephemeral_5m_input_tokens": 0,
      "ephemeral_1h_input_tokens": 0
    },
    "output_tokens": 37,
    "service_tier": "standard",
    "inference_geo": "not_available"
  },
  "meta": {
    "usage": {
      "credits_used": 1529,
      "usd_spent": 0.0007645
    }
  }
}
```
{% endcode %}
