---
icon: hammer-brush
description: >-
  A description of the software development kits (SDKs) that can be used to
  interact with the AIML API.
layout:
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
---

# Supported SDKs

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
[How do I configure the base URL and API key?](../faq/openai-sdk-doesnt-work.md)
{% endhint %}

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

{% tab title="Shell" %}
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

## Next Steps

* [Check our full list of model IDs](../api-references/model-database/model-database.md)
