# Anthropic

## Features

* **Text completions:** Build advanced chat bots or text processors
* **Function Calling:** Utilize tools for specific tasks and API calling.
* **Vision Tasks:**  Process and analyze images.

## Example Requests

**Function Calling**

To process text and use function calling, follow the examples below:

**Example Request 1: Get Weather Information**

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

**Example Request 2: Simple Text Response**

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

**Pro tip: you can assign a system role to the Claude models by using "system" parameter outside of messages array.**&#x20;

```json
model="claude-3-5-sonnet-20240620",
    max_tokens=2048,
    system="You are a seasoned data scientist at a Fortune 500 company.", # <-- role prompt
    messages=[
        {"role": "user", "content": "Analyze this dataset for anomalies: <dataset>{{DATASET}}</dataset>"}
    ]
```

## Vision Tasks

**Example Request: Image Analysis**

**Please note that API only support BASE64 String as Image input.**&#x20;

```
possible media types:
'image/jpeg' 'image/png' 'image/gif' 'image/webp'
```

To process and analyze images, use the following example:

```python
import requests

url = "https://api.aimlapi.com/vision"
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
      "content": [
        {
          "type": "image",
          "source": {
            "type": "base64",
            "media_type": "image/jpeg",
            "data": "/9j/4QCARXhpZgAATU0AKgAAAAgABQESAAMAAAABAAEAAAEaAAUAAAABAAAASgEbAAUAAAABAAAAUgEoAAMAAAABAAIAAIdpAAQAAAABAAAAWgAAAAAAAABIAAAAAQAAAEgAAAABAAKgAgAEAAAAAQAABXigAwAEAAAAAQAAAxkAAAAA/+EA+mh0

response = requests.post(url, json=payload, headers=headers)
print(response.json())

```

#### Streaming with Python SDK

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

## API Endpoints

**Endpoint for Messages:**&#x20;

* `https://api.aimlapi.com/messages`
* `https://api.aimlapi.com/v1/messages`

## Response Structure

The response structure for the Anthropic Models API includes:

* `id`: Unique identifier for the request.
* `object`: Type of object returned.
* `created`: Timestamp of the request.
* `model`: Model used for the request.
* `choices`: List of completion choices.
* `usage`: Token usage information.
