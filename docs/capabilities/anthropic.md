# Features of Anthropic Models

## Features

* **Text completions:** Build advanced chat bots or text processors
* **Function Calling:** Utilize tools for specific tasks and API calling.
* **Vision Tasks:** Process and analyze images.

## Example Requests

{% openapi src="https://api.aimlapi.com/docs-public-yaml?key=2b878a3c71a785f13366e9be96bacb29" path="/messages" method="post" %}
[https://api.aimlapi.com/docs-public-yaml?key=2b878a3c71a785f13366e9be96bacb29](https://api.aimlapi.com/docs-public-yaml?key=2b878a3c71a785f13366e9be96bacb29)
{% endopenapi %}

## **Vision**

{% hint style="info" %}
**Note:** API only support BASE64 String as Image input.
{% endhint %}

### Possible Media Types

* `image/png`
* `image/gif`
* `image/webp`

```python
import httpx
import base64
from openai import OpenAI

client = OpenAI(
    base_url='https://api.aimlapi.com',
    api_key='<YOUR_API_KEY>'    
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

## **Function Calling**

To process text and use function calling, follow the examples below:

### **Example Request 1: Get Weather Information**

```python
import requests

url = "https://api.aimlapi.com/messages"
headers = {
    "Authorization": "Bearer YOUR_API_KEY",
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

### **Example Request 2: Simple Text Response**

```python
import requests

url = "https://api.aimlapi.com/messages"
headers = {
    "Authorization": "Bearer YOUR_API_KEY",
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

{% hint style="info" %}
**Pro tip:** you can assign a system role to the Claude models by using "system" parameter outside of messages array.
{% endhint %}

```json
{
    model="claude-3-5-sonnet-20240620",
    max_tokens=2048,
    system="You are a seasoned data scientist at a Fortune 500 company.", # <-- role prompt
    messages=[
        {"role": "user", "content": "Analyze this dataset for anomalies: <dataset>{{DATASET}}</dataset>"}
    ]
}
```

## Example Response

The responses from the AI/ML API for Anthropic models will typically include the generated text or results from the tool called. Here is an example response for a weather query:

```python
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

## Streaming with Python SDK

To enable streaming of responses, set `stream=True` in your request payload.

```python
import requests

url = "https://api.aimlapi.com/messages"
headers = {
    "Authorization": "Bearer YOUR_API_KEY",
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
