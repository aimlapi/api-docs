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

This page describes the SDK[^1]s that can be used to call our API.

<details>

<summary>Key Definitions &#x26; Notes</summary>

The **REST API** itself is _not_ an SDK. It is the **server-side interface** that exposes your models over HTTP. It defines endpoints, HTTP methods (POST/GET), required headers, and the structure of request and response JSON. Essentially, it’s the “contract” the server provides for clients to interact with models programmatically.

***

An **SDK** (Software Development Kit) is a **client-side library** that wraps around the REST API. It handles details like building HTTP requests, serializing/deserializing JSON, error handling, retries, and sometimes additional conveniences.&#x20;

You can skip the SDK and call the REST API directly via cURL, fetch, requests, etc. \
The SDK just makes your life easier; the REST API is the “core interface” the SDK talks to.

***

The following flow shows how a request travels from your code to the model and back. Using an SDK is optional — it simply wraps the REST API for convenience.

> Your code → SDK (optional) → REST API → Model → REST API → SDK → Your code

</details>

{% hint style="info" %}
Comparing requests made with raw REST API and different SDKs, pay attention to the following common aspects:

* how the Authorization header and the AIML API key are provided,
* how the `POST` method and the endpoint URL are specified,
* how the input parameters are passed.
{% endhint %}

{% hint style="success" %}
Also take a look at the [**INTEGRATIONS**](../integrations/our-integration-list.md) section — it covers many third-party services and libraries (workflow platforms, coding assistants, etc.) that allow you to integrate our models in various ways.
{% endhint %}

***

## REST API

We use the REST API because it’s fast, simple, and easy to understand. Only in Python do you need to import a separate library (`requests`), while cURL and JavaScript (Node.js) already have built-in support for HTTP requests. Therefore, REST API is used in the documentation examples for _all_ of our models.

### Installation

In Python examples, you need to import the `requests` library. The Node.js and cURL examples do not require any additional imports.

Install the library first:

{% tabs %}
{% tab title="Shell" %}
```bash
pip install requests
```
{% endtab %}
{% endtabs %}

Import the library in every Python code snippet where you make calls to the REST API.

{% tabs %}
{% tab title="Python" %}
```python
import requests
```
{% endtab %}
{% endtabs %}

### Authorization

Our API authorization is based on a Bearer token. Include it in the `Authorization` HTTP header within the request. Example:

{% tabs %}
{% tab title="cURL" %}
```ruby
  --header 'Authorization: Bearer <YOUR_AIMLAPI_KEY>' \
```
{% endtab %}

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
{% endtabs %}

### Request Example

{% tabs %}
{% tab title="cURL" %}
```ruby
curl --request POST \
  --url https://api.aimlapi.com/chat/completions \
  --header 'Authorization: Bearer <YOUR_AIMLAPI_KEY>' \
  --header 'Content-Type: application/json' \
  --data '{
    "model": "google/gemma-3-4b-it",
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

{% tab title="JavaScript" %}
```javascript
fetch("https://api.aimlapi.com/chat/completions", {
  method: "POST",
  headers: {
    Authorization: "Bearer <YOUR_AIMLAPI_KEY>",
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    model: "google/gemma-3-4b-it",
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
import json  # for getting a structured output with indentation

response = requests.post(
    url="https://api.aimlapi.com/chat/completions",
    headers={
        "Authorization": "Bearer <YOUR_AIMLAPI_KEY>",
        "Content-Type": "application/json",
    },
    data=json.dumps(
        {
            "model": "google/gemma-3-4b-it",
            "messages": [
                {
                    "role": "user",
                    "content": "What kind of model are you?",
                },
            ],
            "max_tokens": 512
        }
    ),
)

response.raise_for_status()
print(response.json())
```
{% endtab %}
{% endtabs %}

***

## OpenAI

The OpenAI SDK is a nice module that allows us to use the AI/ML API without dealing with repetitive boilerplate code for handling cURL requests.&#x20;

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

{% hint style="info" %}
Therefore, we don’t have the option to call a video model through this SDK.
{% endhint %}

</details>

### Installation

<details>

<summary>Python</summary>

1\. Make sure you have Python 3.7+ and `pip` installed.

2\. Install the OpenAI SDK via terminal or Jupyter Notebook:

```bash
pip install openai
```

> In Jupyter Notebook, you can also use:
>
> ```python
> %pip install openai
> ```

3\. Import the SDK:

```python
import openai
```

***

</details>

<details>

<summary>JavaScript (Node.js)</summary>

1\. Make sure you have Node.js 18+ and npm installed.

2\. Install the OpenAI SDK in your project:

```bash
npm install openai
```

3\. Import the SDK and initialize the client:

```js
import OpenAI from "openai";
```

</details>

### Example Code

<details>

<summary>Code Explanation</summary>

Before we can use the OpenAI SDK, it needs to be imported:

| JavaScript                              | Python                      |
| --------------------------------------- | --------------------------- |
| `const { OpenAI } = require("openai");` | `from openai import OpenAI` |

The next step is to initialize variables that our code will use. The two main ones are: [the base URL and the API key](#user-content-fn-2)[^2].

**baseURL**

Unlike direct REST API calls, where the full endpoint URL is specified explicitly, calls made through the OpenAI SDK separate the first part of the URL—up to and including the API version—into a dedicated variable called `baseURL`, which is provided separately.

<table><thead><tr><th width="345.1998291015625">JavaScript</th><th>Python</th></tr></thead><tbody><tr><td><p><code>const baseURL =</code> <br><br><code>"https://api.aimlapi.com/v1";</code></p><p><code>const apiKey = "&#x3C;YOUR_AIMLAPI_KEY>";</code></p></td><td><code>base_url = "https://api.aimlapi.com/v1"</code><br><code>api_key = "&#x3C;YOUR_AIMLAPI_KEY>"</code></td></tr></tbody></table>

{% hint style="success" %}
Using versioned URLs can help ensure compatibility with future updates and changes to the API. It is recommended to use versioned URLs for long-term projects to maintain stability.
{% endhint %}

The remaining part of the URL is not specified directly and is instead defined using a predefined set of identifiers provided by OpenAI, as shown below:



Before we use the API, we need to create an instance of the OpenAI SDK class. It allows us to use all their methods. The instance is created with our imported package, and here we forward two main parameters: [the base URL and the API key](#user-content-fn-2)[^2].

</details>

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

[^1]: An SDK (Software Development Kit) is a **client-side library** that wraps around the REST API.

[^2]: Because of notation, these two parameters are called slightly differently in different languages (camel case in JS and snake case in Python), but their functionality is the same.
