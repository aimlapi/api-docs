---
description: >-
  Access leading AI models (GPT-4o, Gemini, and others) through a single unified
  API. Setup typically takes under five minutes. New accounts receive 10,000
  free tokens.
hidden: true
noIndex: true
icon: hand-wave
---

# Quickstart

***

Here, you'll learn how to start using our API in your code. The following steps must be completed regardless of whether you integrate one of the [models](../../api-references/model-database.md) we offer or use our ready-made solution:

* [generating an AIML API Key](./#generating-an-aiml-api-key),
* [configuring the base URL](./#configuring-base-url),
* [making an API call](./#making-an-api-call).

Let's walk through an example of connecting to [the free-tier Gemma 3](../../api-references/text-models-llm/google/gemma-3.md) model via [REST API](../supported-sdks.md#rest-api). \
After completing the steps, you will be able to generate text with this model at no cost.

This guide is suitable even for complete beginners.

## G**enerating an AIML API Key**

<details>

<summary><mark style="color:blue;">What is an API Key?</mark></summary>

You can find your AIML API key on the [account page](https://aimlapi.com/app/keys).

An AIML API key is a credential that grants you access to our API from your code.\
It is a sensitive string that is shown **only at creation time** and should be kept confidential. \
Do not share this key with anyone, as it could be misused without your knowledge.\
If you lose it, generate a new key from your dashboard.

⚠️ <mark style="color:orange;">Note that API keys from third-party organizations cannot be used with our API: you need an AIML API Key.</mark>

</details>

To use the AIML API, you need to create an account and generate an AIML API key. \
Follow these steps:

1. [**Create an Account**](https://aimlapi.com/app/sign-up)**:** Visit the AI/ML API website and create an account.
2. [**Generate an API Key**](https://aimlapi.com/app/keys)**:** After logging in, navigate to your account dashboard and generate your API key. Ensure that key is enabled on UI.

<figure><img src="../../.gitbook/assets/image.png" alt=""><figcaption></figcaption></figure>

## **Configuring Base URL**

<details>

<summary><mark style="color:blue;">What is a Base URL?</mark></summary>

The **Base URL** is the first part of the URL (including the protocol, domain, and pathname) that determines the server responsible for handling your request. It’s crucial to configure the correct Base URL in your application, especially if you are using SDKs from OpenAI, Azure, or other providers. By default, these SDKs are set to point to their servers, which are not compatible with our API keys and do not support many of the models we offer.

</details>

Depending on your environment and application, you will set the base URL differently. Below is a universal string that you can use to access our API. Copy it or return here later when you are ready with your environment or app.

```
https://api.aimlapi.com
```

The AI/ML API supports both versioned and non-versioned URLs, providing flexibility in your API requests. You can use either of the following formats:

* <kbd>https://api.aimlapi.com</kbd>
* <kbd>https://api.aimlapi.com/v1</kbd>

{% hint style="success" %}
Using versioned URLs can help ensure compatibility with future updates and changes to the API. It is recommended to use versioned URLs for long-term projects to maintain stability.
{% endhint %}

## Making an API Call

Based on your environment, you will call our API differently. Below are two common ways to call our API using two popular programming languages: **JavaScript** (NodeJS) и **Python**.

{% hint style="info" %}
In the examples below, we use the [**OpenAI SDK**](../supported-sdks.md#openai). This is possible due to our compatibility with most OpenAI APIs, but this is just one approach. You can use our API without this SDK with raw cURL queries.
{% endhint %}

If you don’t want lengthy explanations, here’s the code you can use right away in a Python or Node.js program. You only need to replace `<YOUR_AIMLAPI_KEY>` with your AIML API Key obtained from your account.

However, below, we will still go through these examples step by step in both languages explaining every single line.

{% tabs %}
{% tab title="Python" %}
{% code overflow="wrap" %}
```python
from openai import OpenAI

# Insert your AIML API key in the quotation marks instead of <YOUR_AIMLAPI_KEY>:
api_key = "<YOUR_AIMLAPI_KEY>" 
base_url = "https://api.aimlapi.com/v1"

system_prompt = "You are a travel agent. Be descriptive and helpful."
user_prompt = "Tell me about San Francisco"

api = OpenAI(api_key=api_key, base_url=base_url)


def main():
    completion = api.chat.completions.create(
        model="google/gemma-3-4b-it",
        messages=[
            {"role": "user", "content": user_prompt},
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

{% tab title="NodeJS" %}
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
      model: "google/gemma-3-4b-it",
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
    });

    const response = completion.choices[0].message.content;

    console.log("User:", userPrompt);
    console.log("AI:", response);
  } 
  catch (error) {
    console.error("Error:", error.message);
  }
};

main();
```
{% endcode %}
{% endtab %}
{% endtabs %}

<details>

<summary>Step-by-step example in JavaScript (NodeJS)</summary>

We assume you already have Node.js installed. If not, here is a [guide for beginners](../../faq/can-i-use-api-in-nodejs.md).

Create a new folder for the example project

```bash
mkdir ./aimlapi-welcome
cd ./aimlapi-welcome
```

Create a project file

```bash
npm init -y
```

Install the required dependencies

```bash
npm i openai
```

Create a file with the source code

```bash
touch ./index.js
```

And paste the following content to the file and save it

```javascript
#!/usr/bin/env node

const OpenAI = require("openai");
const baseURL = "https://api.aimlapi.com/v1";
const apiKey = "PASTE YOUR API KEY HERE";
const systemPrompt = "You are a travel agent. Be descriptive and helpful.";
const userPrompt = "Tell me about San Francisco";

const api = new OpenAI({
  apiKey,
  baseURL,
});

const main = async () => {
  try {
    const completion = await api.chat.completions.create({
      model: "google/gemma-3-27b-it",
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

Run the file

```bash
./index.js
```

You will see a response that looks like this

{% code overflow="wrap" %}
```json5
User: Tell me about San Francisco
AI: San Francisco, located in the northern part of California, USA, is a vibrant and culturally rich city known for its iconic landmarks, beautiful scenery, and diverse neighborhoods.

The city is famous for its iconic Golden Gate Bridge, an engineering marvel and one of the most recognized structures in the world. Spanning the Golden Gate Strait, this red-orange suspension bridge connects San Francisco to Marin County and offers breathtaking views of the San Francisco Bay and the Pacific Ocean.
```
{% endcode %}

</details>

<details>

<summary>Step-by-step example in Python</summary>

Let's start from very beginning. We assume you already installed Python (with venv), if not, here a [guide for the beginners](../../faq/can-i-use-api-in-python.md).

Create a new folder for test project, name it as `aimlapi-welcome` and change to it.

```bash
mkdir ./aimlapi-welcome
cd ./aimlapi-welcome
```

(Optional) If you use IDE then we recommend to open created folder as workspace. On example, in VSCode you can do it with:

```
code .
```

Run a terminal inside created folder and create virtual envorinment with a command

```shell
python3 -m venv ./.venv
```

Activate created virtual environment

```shell
# Linux / Mac
source ./.venv/bin/activate
# Windows
./.venv/bin/Activate.bat
```

Install requirement dependencies. In our case we need only OpenAI SDK

```shell
pip install openai
```

Create new file and name it as `travel.py`

```shell
touch travel.py
```

Paste following content inside this `travel.py` and replace `<YOUR_AIMLAPI_KEY>` with your API key you got on [first step](./#generating-an-api-key).

```python
from openai import OpenAI

base_url = "https://api.aimlapi.com/v1"
api_key = "<YOUR_AIMLAPI_KEY>"
system_prompt = "You are a travel agent. Be descriptive and helpful."
user_prompt = "Tell me about San Francisco"

api = OpenAI(api_key=api_key, base_url=base_url)


def main():
    completion = api.chat.completions.create(
        model="google/gemma-3-4b-it",
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_prompt},
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

Run the application

```shell
python3 ./travel.py
```

If you done all correct, you will see following output:

{% code overflow="wrap" %}
```json5
User: Tell me about San Francisco
AI:  San Francisco, located in northern California, USA, is a vibrant and culturally rich city known for its iconic landmarks, beautiful vistas, and diverse neighborhoods. It's a popular tourist destination famous for its iconic Golden Gate Bridge, which spans the entrance to the San Francisco Bay, and the iconic Alcatraz Island, home to the infamous federal prison.

The city's famous hills offer stunning views of the bay and the cityscape. Lombard Street, the "crookedest street in the world," is a must-see attraction, with its zigzagging pavement and colorful gardens. Ferry Building Marketplace is a great place to explore local food and artisanal products, and the Pier 39 area is home to sea lions, shops, and restaurants.

San Francisco's diverse neighborhoods each have their unique character. The historic Chinatown is the oldest in North America, while the colorful streets of the Mission District are known for their murals and Latin American culture. The Castro District is famous for its LGBTQ+ community and vibrant nightlife.
```
{% endcode %}

</details>

## Code Explanation

Both examples are written in different programming languages, but despite that, they look very similar. Let's break down the code step by step and see what's going on.

In the examples above, we are using the OpenAI SDK. The OpenAI SDK is a nice module that allows us to use the AI/ML API without dealing with repetitive boilerplate code for handling cURL requests. Before we can use the OpenAI SDK, it needs to be imported. The import happens in the following places:

{% tabs %}
{% tab title="JavaScript" %}
```javascript
const { OpenAI } = require("openai");
```
{% endtab %}

{% tab title="Python" %}
```python
from openai import OpenAI
```
{% endtab %}
{% endtabs %}

Simple as it is. The next step is to initialize variables that our code will use. The two main ones are: the base URL and the API key. We already discussed them at the beginning of the article.

{% tabs %}
{% tab title="JavaScript" %}
```javascript
const baseURL = "https://api.aimlapi.com/v1";
const apiKey = "<YOUR_AIMLAPI_KEY>";
const systemPrompt = "You are a travel agent. Be descriptive and helpful";
const userPrompt = "Tell me about San Francisco";
```
{% endtab %}

{% tab title="Python" %}
```python
base_url = "https://api.aimlapi.com/v1"
api_key = "<YOUR_AIMLAPI_KEY>"
system_prompt = "You are a travel agent. Be descriptive and helpful."
user_prompt = "Tell me about San Francisco"
```
{% endtab %}
{% endtabs %}

To communicate with LLM models, users use texts. These texts are usually called "Prompts." Inside our code, we have prompts with two roles: the system and the user. The system prompt is designed to be the main source of instruction for LLM generation, while the user prompt is designed to be user input, the subject of the system prompt. Despite that many models can operate differently, this behavior usually applies to chat LLM models, currently one of the most useful and popular ones.

Inside the code, the prompt is called in variable `userPrompt` in JS, and `user_prompt` in Python.

Before we use the API, we need to create an instance of the OpenAI SDK class. It allows us to use all their methods. The instance is created with our imported package, and here we forward two main parameters: [the base URL and the API key](#user-content-fn-1)[^1].

{% tabs %}
{% tab title="JavaScript" %}
```javascript
const api = new OpenAI({
  apiKey,
  baseURL,
});
```
{% endtab %}

{% tab title="Python" %}
```python
api = OpenAI(api_key=api_key, base_url=base_url)
```
{% endtab %}
{% endtabs %}

All preparation steps are done. Now we need to write our functionality and create something great. In the examples above, we make the simplest travel agent. Let's break down the steps of how we send a request to the model.

The best practice is to split the code blocks into complete parts with their own logic and not place executable code inside global module code. This rule applies in both languages we discuss. So we create a main function with all our logic. In JS, this function needs to be async, due to Promises and simplicity. In Python, requests run synchronously.

The OpenAI SDK provides us with methods to communicate with chat models. It is placed inside the `chat.completions.create` function. This function accepts multiple parameters but requires only two: `model` and `messages`.

* `model` is a string, the name of the model that you want to use. In this example, you must use a chat model, so select one from [the list of available chat models](../../api-references/text-models-llm/#complete-text-model-list).
* `messages` is an array of objects with a `content` field as prompt and a `role` string that can be `user` or `assistant`. With the role, the model can understand what to do with this prompt: in our example, it is a user message.

We also use `max_tokens` and `temperature`.

With that knowledge, we can now send our request like the following:

{% tabs %}
{% tab title="JavaScript" %}
```javascript
const completion = await api.chat.completions.create({
  model: "google/gemma-3-4b-it",
  messages: [
    {
      role: "user",
      content: userPrompt,
    },
  ],
  temperature: 0.7,
  max_tokens: 256,
});
```
{% endtab %}

{% tab title="Python" %}
```python
completion = api.chat.completions.create(
    model="google/gemma-3-4b-it",
    messages=[
        {
          "role": "user", 
          "content": user_prompt
        }
    ],
    temperature=0.7,
    max_tokens=256,
)
```
{% endtab %}
{% endtabs %}

The response from the function `chat.completions.create` contains a [completion](../../capabilities/completion-or-chat-models.md). Completion is a fundamental part of LLM models' logic. Every LLM model is some sort of word autocomplete engine, trained by huge amounts of data. The chat models are designed to autocomplete large chunks of messages with prompts and certain roles, but other models can have their own custom logic without even roles.

Inside this completion, we are interested in the text of the generation. We can get it by getting the result from the completion variable:

{% tabs %}
{% tab title="JavaScript" %}
```javascript
const response = completion.choices[0].message.content;
```
{% endtab %}

{% tab title="Python" %}
```python
response = completion.choices[0].message.content
```
{% endtab %}
{% endtabs %}

In certain cases, completion can have multiple results. These results are called choices. Every choice has a message, the product of generation. The string content is placed inside the `content` variable, which we placed inside our response variable above.

In the next steps, we can finally see the results. In both examples, we print the user prompt and response like it was a conversation:

{% tabs %}
{% tab title="JavaScript" %}
```javascript
console.log("User:", userPrompt);
console.log("AI:", response);
```
{% endtab %}

{% tab title="Python" %}
```python
print("User:", user_prompt)
print("AI:", response)
```
{% endtab %}
{% endtabs %}

Voila! Using AI/ML API models is the simplest and most productive way to get into the world of Machine Learning and Artificial Intelligence.

## Future Steps

* [Move to production-ready models: see the guide for connecting GPT-4o](u9q0.md)
* [Browse and compare AI models, including GPT, Claude, and many others, using the Playground](https://aimlapi.com/app/)
* [Know more about supported SDKs](../supported-sdks.md)
* [Learn more about special text model capabilities](/broken/pages/qQxIeD1HucvN1Duoxrk0)
* [Join the community: get help and share your projects in our Discord](https://discord.com/invite/hvaUsJpVJf)

[^1]: Because of notation, these two parameters are called slightly differently in different languages (camel case in JS and snake case in Python), but their functionality is the same.
