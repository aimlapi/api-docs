---
description: >-
  A description of the software development kits (SDKs) that can be used to
  interact with the AIML API.
icon: hammer-brush
layout:
  width: default
  title:
    visible: true
  description:
    visible: false
  tableOfContents:
    visible: true
  outline:
    visible: true
  pagination:
    visible: true
  metadata:
    visible: true
---

# Supported SDKs

This page describes the SDK[^1]s that can be used to call our API.&#x20;

{% hint style="success" %}
Also take a look at the [**INTEGRATIONS**](../integrations/our-integration-list.md) section — it covers many third-party services and libraries (workflow platforms, coding assistants, etc.) that allow you to integrate our models in various ways.
{% endhint %}

## OpenAI

In the [setting up article](setting-up.md), we showed an example of how to use the OpenAI SDK with the AI/ML API. We configured the environment from the very beginning and executed our request to the AI/ML API.

We fully support the OpenAI API structure, and you can seamlessly use the features that the OpenAI SDK provides out-of-the-box, including:

* Streaming
* Completions
* Chat Completions
* Audio
* Beta Assistants
* Beta Threads
* Embeddings
* Image Generation
* Uploads

This support provides easy integration into systems already using OpenAI's standards. For example, you can integrate our API into any product that supports LLM models by updating only two things in the configuration: the base URL and the API key.

{% hint style="info" %}
[How do I configure the base URL and API key?](setting-up.md)
{% endhint %}

***

## REST API

Because we support the OpenAI API structure, our API can be used with the same endpoints as OpenAI. You can call them from any environment.

### Authorization

AI/ML API authorization is based on a Bearer token. You need to include it in the `Authorization` HTTP header within the request, on example:

```http
Authorization: Bearer <YOUR_AIMLAPI_KEY>
```

### Request Example

When your token is ready you can call our API through HTTP.

{% tabs %}
{% tab title="JavaScript" %}
```javascript
fetch("https://api.aimlapi.com/chat/completions", {
  method: "POST",
  headers: {
    Authorization: "Bearer <YOUR_AIMLAPI_KEY>",
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    model: "gpt-4o",
    messages: [
      {
        role: "user",
        content: "What kind of model are you?",
      },
    ],
    max_tokens: 512,
    stream: false,
  }),
})
  .then((res) => res.json())
  .then(console.log);
```
{% endtab %}

{% tab title="Python" %}
```python
import requests
import json

response = requests.post(
    url="https://api.aimlapi.com/chat/completions",
    headers={
        "Authorization": "Bearer <YOUR_AIMLAPI_KEY>",
        "Content-Type": "application/json",
    },
    data=json.dumps(
        {
            "model": "gpt-4o",
            "messages": [
                {
                    "role": "user",
                    "content": "What kind of model are you?",
                },
            ],
            "max_tokens": 512,
            "stream": False,
        }
    ),
)

response.raise_for_status()
print(response.json())
```
{% endtab %}

{% tab title="cURL" %}
```ruby
curl --request POST \
  --url https://api.aimlapi.com/chat/completions \
  --header 'Authorization: Bearer <YOUR_AIMLAPI_KEY>' \
  --header 'Content-Type: application/json' \
  --data '{
    "model": "gpt-4o",
    "messages": [
        {
            "role": "user",
            "content": "What kind of model are you?"
        }
    ],
    "max_tokens": 512,
    "stream": false
}'
```
{% endtab %}
{% endtabs %}

***

## AI/ML API Python library

We have started developing our own SDK to simplify the use of our service. Currently, it supports only chat completion and embedding models.

{% hint style="success" %}
If you’d like to contribute to expanding its functionality, feel free to reach out to us on [**Discord**](https://discord.com/invite/hvaUsJpVJf)!
{% endhint %}

### Installation

After obtaining your AIML API key, create an .env file and copy the required contents into it.

```shell
touch .env
```

Copy the code below, paste it into your `.env` file, and set your API key in `AIML_API_KEY="<YOUR_AIMLAPI_KEY>"`, replacing `<YOUR_AIMLAPI_KEY>` with your actual key:

```shell
AIML_API_KEY = "<YOUR_AIMLAPI_KEY>"
AIML_API_URL = "https://api.aimlapi.com/v1"
```

Install `aiml_api` package:

```shell
# install from PyPI
pip install aiml_api
```

### Request Example

{% tabs %}
{% tab title="Python" %}
{% code overflow="wrap" %}
```python
from aiml_api import AIML_API

api = AIML_API()

completion = api.chat.completions.create(
    model = "mistralai/Mistral-7B-Instruct-v0.2",
    messages = [
        {"role": "user", "content": "Explain the importance of low-latency LLMs"},
    ],
    temperature = 0.7,
    max_tokens = 256,
)

response = completion.choices[0].message.content
print("AI:", response)
```
{% endcode %}
{% endtab %}
{% endtabs %}

To execute the script, use:

```shell
python3 <your_script_name>.py
```

***

## Next Steps

* [Check our full list of model IDs](../api-references/model-database.md)

[^1]: Software Development Kits
