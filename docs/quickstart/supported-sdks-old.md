---
description: >-
  A description of the software development kits (SDKs) that can be used to
  interact with the AIML API.
hidden: true
noIndex: true
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

This page describes the SDK[^1]s that can be used to call our API.

Comparing requests made with different SDKs, pay attention to the following common aspects across all SDKs:

* how the Authorization header and the AIML API key are provided,
* how the `POST` method and the endpoint URL are specified,
* how the input parameters are passed.

{% hint style="success" %}
Also take a look at the [**INTEGRATIONS**](../integrations/our-integration-list.md) section — it covers many third-party services and libraries (workflow platforms, coding assistants, etc.) that allow you to integrate our models in various ways.
{% endhint %}

***

## REST API

This SDK is simple to use, and the required `requests` library is commonly preinstalled in many environments. Therefore, this SDK is used in the documentation examples for all of our models.

### Authorization

Our API authorization is based on a Bearer token. Include it in the `Authorization` HTTP header within the request. Example:

{% tabs %}
{% tab title="JavaScript" %}
```javascript
  headers: {
    Authorization: "Bearer <YOUR_AIMLAPI_KEY>",
  },
```
{% endtab %}

{% tab title="Python" %}
```python
    headers={
        "Authorization": "Bearer <YOUR_AIMLAPI_KEY>",
    },
```
{% endtab %}

{% tab title="cURL" %}
```ruby
  --header 'Authorization: Bearer <YOUR_AIMLAPI_KEY>' \
```
{% endtab %}
{% endtabs %}

### Request Example

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
    "max_tokens": 512
}'
```
{% endtab %}
{% endtabs %}

***

## OpenAI

The OpenAI SDK is a nice module that allows us to use the AI/ML API without dealing with repetitive boilerplate code for handling cURL requests.&#x20;

In the [setting up article](https://docs.aimlapi.com/quickstart/setting-up), we showed an example of how to use the OpenAI SDK with the AI/ML API. We configured the environment from the very beginning and executed our request to the AI/ML API.

<details>

<summary>The AI features that the OpenAI SDK supports</summary>

* Streaming
* Completions
* Chat Completions
* Audio
* Beta Assistants
* Beta Threads
* Embeddings
* Image Generation
* File Uploads

</details>

### Example Code

{% tabs %}
{% tab title="Python" %}
{% code overflow="wrap" %}
```python
from openai import OpenAI

# Insert your AIML API key in the quotation marks instead of <YOUR_AIMLAPI_KEY>:
api_key = "<YOUR_AIMLAPI_KEY>" 
base_url = "https://api.aimlapi.com/v1"
user_prompt = "Tell me about San Francisco"

api = OpenAI(api_key=api_key, base_url=base_url)


def main():
    completion = api.chat.completions.create(
        model="google/gemma-3-4b-it",
        messages=[
            {
              "role": "user", 
              "content": user_prompt
            },
        ],
        temperature=0.7,
        max_tokens=256,
    )

    response = completion.choices[0].message.content
    print("User:", user_prompt)
    print("AI:", response)


if __name__ == "__main__":
    main()
```
{% endcode %}
{% endtab %}

{% tab title="JavaScript" %}
{% code overflow="wrap" %}
```javascript
#!/usr/bin/env node

const OpenAI = require("openai");
const baseURL = "https://api.aimlapi.com/v1";
const apiKey = "<YOUR_AIMLAPI_KEY>";
const systemPrompt = "You are a travel agent. Be descriptive and helpful.";
const userPrompt = "Tell me about San Francisco";

const api = new OpenAI({
  apiKey,
  baseURL,
});

const main = async () => {
  try {
    const completion = await api.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
        {
          role: "user",
          content: userPrompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 256,
    });

    const response = completion.choices[0].message.content;

    console.log("User:", userPrompt);
    console.log("AI:", response);
  } catch (error) {
      console.error("Error:", error.message);
  }
};

main();
```
{% endcode %}
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
* [Browse and compare AI models, including GPT, Claude, and many others, using the Playground](https://aimlapi.com/app/)
* [Learn more about special text model capabilities](/broken/pages/qQxIeD1HucvN1Duoxrk0)
* [Join the community: get help and share your projects in our Discord](https://discord.com/invite/hvaUsJpVJf)

[^1]: Software Development Kits
