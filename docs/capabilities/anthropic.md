# Features of Anthropic Models

## Overview

Models from Anthropic can be accessed not only via the standard `/v1/chat/completions` endpoint but also through dedicated endpoints — `/messages` and `/v1/batches` and `/v1/batches/cancel/{batch_id}`.\
The sections below describe their API schemas, usage specifics, and example requests.

Supported capabilities:

* **Text completions:** Build advanced chat bots or text processors.
* **Function Calling:** Utilize tools for specific tasks and API calling.
* **Stream mode:** Get the text chat model responses as they are generated, rather than waiting for the entire response to be completed.
* **Batch Processing:** Send multiple independent requests in a single API call.
* **Vision Tasks:** Process and analyze images.

## Text Completions

Ask something and get an answer in a chat-like conversation format.

{% openapi-operation spec="anthropic-messages" path="/messages" method="post" %}
[OpenAPI anthropic-messages](https://api.aimlapi.com/docs-public-yaml)
{% endopenapi-operation %}

## **Function Calling**

To process text and use function calling, follow the examples below:

### **Example #1: Get Weather Information**

{% code overflow="wrap" %}
```python
import requests

url = "https://api.aimlapi.com/messages"
headers = {
    "Authorization": "Bearer YOUR_AIMLAPI_KEY",
    "Content-Type": "application/json"
}
payload = {
  "model": "claude-3-5-sonnet-20240620",
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
  ],
  "stream": false
}
response = requests.post(url, json=payload, headers=headers)
print(response.json())
```
{% endcode %}

### **Example #2: Simple Text Response**

```python
import requests

url = "https://api.aimlapi.com/messages"
headers = {
    "Authorization": "Bearer YOUR_AIMLAPI_KEY",
    "Content-Type": "application/json"
}
payload = {
  "model": "claude-3-5-sonnet-20240620",
  "max_tokens": 1024,
  "messages": [
    {
      "role": "user",
      "content": "How are you?"
    }
  ],
  "stream": false
}
response = requests.post(url, json=payload, headers=headers)
print(response.json())
```

{% hint style="success" %}
**Pro tip:** you can assign a system role to the Claude models by using "system" parameter outside of messages array.
{% endhint %}

{% code overflow="wrap" %}
```json
{
    model="claude-3-5-sonnet-20240620",
    max_tokens=2048,

    # role prompt:
    system="You are a seasoned data scientist at a Fortune 500 company.", 
    messages=[
        {"role": "user", "content": "Analyze this dataset for anomalies: <dataset>{{DATASET}}</dataset>"}
    ]
}
```
{% endcode %}

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
  "model": "claude-3-5-sonnet-20240620",
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

## **Batch Processing**

Due to the complexity of its description, this capability has been placed on [a separate page](batch-processing.md).

## **Vision**

{% hint style="info" %}
**Note:** API only support [Base64 string](../glossary/concepts.md#base64) as image input.
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
    model="claude-3-5-sonnet-latest",
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
  "id": "msg-12345",
  "object": "message",
  "created": 1627684940,
  "model": "claude-3-5-sonnet-20240620",
  "choices": [
    {
      "message": {
        "role": "assistant",
        "content": "The weather in San Francisco is currently sunny with a temperature of 68°F."
      },
      "finish_reason": "stop"
    }
  ],
  "usage": {
    "prompt_tokens": 10,
    "completion_tokens": 15,
    "total_tokens": 25
  }
}
```
{% endcode %}
