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

{% hint style="success" %}
If you are a manager and simply want to test a model to evaluate its performance, for instance in content generation, the quickest approach is **to use** [**our Playground**](https://aimlapi.com/app/). \
It offers an intuitive, user-friendly interface—no coding required.

Programmatic API calls are best suited for developers who want to integrate a model into their own apps.
{% endhint %}

***

Here, you'll learn how to start using our API in your code. \
The following steps must be completed regardless of which of our models you plan to call:

* [generating an AIML API Key](./#generating-an-aiml-api-key),
* [choosing and preparing your development environment](./#choosing-and-preparing-the-development-environment),
* [making an API call](./#making-an-api-call).

Let's walk through an example of connecting to [the free-tier Gemma 3](../../api-references/text-models-llm/google/gemma-3.md) model via REST API. \
After completing the steps, you will be able to generate text with this model at no cost.

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

1. [**Create an Account**](https://aimlapi.com/app/sign-up): Visit the AI/ML API website and create an account.
2. [**Generate an API Key**](https://aimlapi.com/app/keys): After logging in, navigate to your account dashboard and generate your API key. Ensure that key is enabled on UI.

<figure><img src="../../.gitbook/assets/image.png" alt=""><figcaption></figcaption></figure>

***

## Choosing and Preparing the Development Environment

Each language has recommended environments for running code samples.

<table data-header-hidden><thead><tr><th width="196.9332275390625"></th><th></th></tr></thead><tbody><tr><td>Python</td><td><ul><li><a href="https://jupyter.org/try-jupyter/notebooks/?path=Untitled.ipynb">Jupyter Notebook</a> is a popular online environment for running Python code and is the fastest option if you do not want to install anything locally.</li><li><a href="https://code.visualstudio.com/download">Visual Studio Code</a> (VS Code) is a lightweight and widely used code editor that supports both Python and Node.js. It is suitable for running and debugging local examples and for working on real projects.</li></ul></td></tr><tr><td>JavaScript</td><td><ul><li><a href="https://code.visualstudio.com/download">Visual Studio Code</a> (VS Code)</li></ul></td></tr><tr><td>cURL</td><td><ul><li><a href="https://reqbin.com/curl">REQBIN</a> is a web-based REST client that lets you quickly run cURL requests directly in your browser, without installing any tools.</li><li><a href="https://git-scm.com/install/windows">Git Bash</a> (Windows) or the built-in Terminal (macOS/Linux) allow you to run cURL examples and other command-line tools locally.  </li></ul></td></tr></tbody></table>

## Making an API Call

Based on your environment, you will call our API differently. Below are two common ways to call our API using two popular programming languages: **JavaScript** (NodeJS) и **Python**.

{% hint style="info" %}
In the examples below, we use the [**REST API SDK**](../supported-sdks.md#rest-api). This approach works with all of our APIs, but it is not the only way to integrate. You can use [**other supported SDKs**](../supported-sdks.md), or make direct requests using cURL without any SDK.
{% endhint %}

If you don’t want lengthy explanations, here’s the code you can use right away in a Python or Node.js program. You only need to replace `<YOUR_AIMLAPI_KEY>` with your AIML API Key obtained from your account.

However, below, we will still go through these examples step by step in both languages explaining every single line.

{% tabs %}
{% tab title="Python" %}
{% code overflow="wrap" %}
```python
import requests 

response = requests.post(
    "https://api.aimlapi.com/v1/chat/completions",
    headers={
        # Insert your AIML API Key instead of <YOUR_AIMLAPI_KEY>:
        "Authorization":"Bearer <YOUR_AIMLAPI_KEY>",
        "Content-Type":"application/json"
    },
    
    # Input parameter section
    json={
        "model":"google/gemma-3-4b-it",
        "messages":[   
            {
                "role":"user",
                "content": "Tell me about San Francisco"  # insert your prompt
            }
        ],
        "temperature": 0.7,
        "max_tokens": 256,
    }
)

data = response.json()
print(data)
```
{% endcode %}
{% endtab %}

{% tab title="JavaScript" %}
{% code overflow="wrap" %}
```javascript
async function main() {
  const response = await fetch('https://api.aimlapi.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      // Insert your AIML API Key instead of <YOUR_AIMLAPI_KEY>
      'Authorization': 'Bearer <YOUR_AIMLAPI_KEY>',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'google/gemma-3-4b-it',
      messages:[
          {
              role:'user',
              content: 'Tell me about San Francisco'  // Insert your prompt here
          }
      ],
      temperature: 0.7,
      max_tokens: 256,
    }),
  });

  const data = await response.json();
  console.log(JSON.stringify(data, null, 2));
}

main();
```
{% endcode %}
{% endtab %}
{% endtabs %}

<details>

<summary>Step-by-step instruction in JavaScript (NodeJS)</summary>

We assume you already have Node.js installed. If not, here is a [guide for beginners](../../faq/can-i-use-api-in-nodejs.md).

Create a new folder for the example project:

```bash
mkdir ./aimlapi-welcome
cd ./aimlapi-welcome
```

Create a project file:

```bash
npm init -y
```

Create a file with the source code:

```bash
touch ./index.js
```

And paste the following content to the file and save it:

```javascript
async function main() {
  const response = await fetch('https://api.aimlapi.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      // Insert your AIML API Key instead of <YOUR_AIMLAPI_KEY>
      'Authorization': 'Bearer <YOUR_AIMLAPI_KEY>',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'google/gemma-3-4b-it',
      messages:[
          {
              role:'user',
              content: 'Tell me about San Francisco'  // Insert your prompt here
          }
      ],
      temperature: 0.7,
      max_tokens: 256,
    }),
  });

  const data = await response.json();
  console.log(JSON.stringify(data, null, 2));
}

main();
```

Run the file:

```bash
./index.js
```

You will see a response that looks like this:

{% code overflow="wrap" %}
```json5
User: Tell me about San Francisco
AI: San Francisco, located in the northern part of California, USA, is a vibrant and culturally rich city known for its iconic landmarks, beautiful scenery, and diverse neighborhoods.

The city is famous for its iconic Golden Gate Bridge, an engineering marvel and one of the most recognized structures in the world. Spanning the Golden Gate Strait, this red-orange suspension bridge connects San Francisco to Marin County and offers breathtaking views of the San Francisco Bay and the Pacific Ocean.
```
{% endcode %}

</details>

<details>

<summary>Step-by-step instruction in Python</summary>

Let's start from very beginning. We assume you already installed Python (with venv), if not, here a [guide for the beginners](../../faq/can-i-use-api-in-python.md).

Create a new folder for test project, name it as `aimlapi-welcome` and change to it.

```bash
mkdir ./aimlapi-welcome
cd ./aimlapi-welcome
```

(Optional) If you use IDE then we recommend to open created folder as workspace. On example, in Visual Studio Code you can do it with:

```
code .
```

Run a terminal inside created folder and create virtual envorinment with a command:

```shell
python3 -m venv ./.venv
```

Activate created virtual environment:

```shell
# Linux / Mac
source ./.venv/bin/activate
# Windows
./.venv/bin/Activate.bat
```

Install requirement dependencies. In our case (REST API SDK) we need only `request` library:

```shell
pip install requests
```

Create new file and name it as `travel.py`:

```shell
touch travel.py
```

Paste following content inside this `travel.py` and replace `<YOUR_AIMLAPI_KEY>` with your API key you got on [first step](./#generating-an-api-key):

```python
import requests 

response = requests.post(
    "https://api.aimlapi.com/v1/chat/completions",
    headers={
        # Insert your AIML API Key instead of <YOUR_AIMLAPI_KEY>:
        "Authorization":"Bearer <YOUR_AIMLAPI_KEY>",
        "Content-Type":"application/json"
    },
    json={
        "model":"google/gemma-3-4b-it",
        "messages":[
            {
                "role":"user",
                "content": "Tell me about San Francisco"  # insert your prompt
            }
        ],
        "temperature": 0.7,
        "max_tokens": 256,
    }
)

data = response.json()
print(data)
```

Run the application:

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

### Code Explanation

Both examples are written in different programming languages, but despite that, they look very similar. Let's break down the code step by step and see what's going on.

In the examples above, we are using the OpenAI SDK. The OpenAI SDK is a nice module that allows us to use the AI/ML API without dealing with repetitive boilerplate code for handling cURL requests. Before we can use the OpenAI SDK, it needs to be imported. The import happens in the following places:

{% tabs %}
{% tab title="JavaScript" %}
```javascript
// No additional import is required.
```
{% endtab %}

{% tab title="Python" %}
```python
import requests
```
{% endtab %}
{% endtabs %}

The next step is to initialize variables that our code will use. The two main ones are: the base URL and the API key.

{% tabs %}
{% tab title="JavaScript" %}
```javascript
const apiKey = "<YOUR_AIMLAPI_KEY>";
```
{% endtab %}

{% tab title="Python" %}
```python
api_key = "<YOUR_AIMLAPI_KEY>"
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

The best practice is to split the code blocks into complete parts with their own logic and not place executable code inside global module code. This rule applies in both languages we discuss. So we create a main function with all our logic. In JS, this function needs to be async. In Python, requests run synchronously.

We also use [`max_tokens`](#user-content-fn-2)[^2] and [`temperature`](#user-content-fn-3)[^3].

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

Voila!

***

## Future Steps

* [Move to production-ready models: see the guide for connecting GPT-4o](u9q0.md)
* [Browse and compare AI models, including GPT, Claude, and many others, using the Playground](https://aimlapi.com/app/)
* [Know more about supported SDKs](../supported-sdks.md)
* [Learn more about special text model capabilities](/broken/pages/qQxIeD1HucvN1Duoxrk0)
* [Join the community: get help and share your projects in our Discord](https://discord.com/invite/hvaUsJpVJf)

[^1]: Because of notation, these two parameters are called slightly differently in different languages (camel case in JS and snake case in Python), but their functionality is the same.

[^2]: The maximum number of tokens that can be generated in the chat completion. This value can be used to control costs for text generated via API.

[^3]: Higher values like 0.8 will make the output more random, while lower values like 0.2 will make it more focused and deterministic.
