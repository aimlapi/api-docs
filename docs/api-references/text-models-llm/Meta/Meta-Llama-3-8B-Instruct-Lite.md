# Llama-3-8B-Instruct-Lite

{% hint style="info" %}
This documentation is valid for the following list of our models:

* `meta-llama/Meta-Llama-3-8B-Instruct-Lite`
{% endhint %}

## Model Overview

A generative text model optimized for dialogue and instruction-following use cases. It leverages a refined transformer architecture to deliver high performance in text generation tasks.

## How to Make a Call

<details>

<summary>Step-by-Step Instructions</summary>

### :digit\_one:  Setup You Can’t Skip

:black\_small\_square:  [**Create an Account**](https://aimlapi.com/app/sign-up): Visit the AI/ML API website and create an account (if you don’t have one yet).\
:black\_small\_square:  [**Generate an API Key**](https://aimlapi.com/app/keys): After logging in, navigate to your account dashboard and generate your API key. Ensure that key is enabled on UI.

### &#x20;:digit\_two:  Copy the code example

At the bottom of this page, you'll find [a code example](Meta-Llama-3-8B-Instruct-Lite.md#code-example) that shows how to structure the request. Choose the code snippet in your preferred programming language and copy it into your development environment.

### :digit\_three:  Modify the code example

:black\_small\_square:  Replace `<YOUR_AIMLAPI_KEY>` with your actual AI/ML API key from your account.\
:black\_small\_square:  Insert your question or request into the `content` field—this is what the model will respond to.

### :digit\_four:  <sup><sub><mark style="background-color:yellow;">(Optional)<mark style="background-color:yellow;"><sub></sup> Adjust other optional parameters if needed

Only `model` and `messages` are required parameters for this model (and we’ve already filled them in for you in the example), but you can include optional parameters if needed to adjust the model’s behavior. Below, you can find the corresponding [API schema](Meta-Llama-3-8B-Instruct-Lite.md#api-schema), which lists all available parameters along with notes on how to use them.

### :digit\_five:  Run your modified code

Run your modified code in your development environment. Response time depends on various factors, but for simple prompts it rarely exceeds a few seconds.

{% hint style="success" %}
If you need a more detailed walkthrough for setting up your development environment and making a request step by step — feel free to use our [Quickstart guide](../../../quickstart/setting-up.md).
{% endhint %}

</details>

## API Schema

{% openapi-operation spec="meta-llama-3-8b-instruct-lite" path="/v1/chat/completions" method="post" %}
[OpenAPI meta-llama-3-8b-instruct-lite](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/text-models-llm/Meta/Meta-Llama-3-8B-Instruct-Lite.json)
{% endopenapi-operation %}

## Code Example

{% code overflow="wrap" %}
```python
import requests

response = requests.post(
    "https://api.aimlapi.com/v1/chat/completions",
    headers={
        "Content-Type":"application/json", 

        # Insert your AIML API Key instead of <YOUR_AIMLAPI_KEY>:
        "Authorization":"Bearer <YOUR_AIMLAPI_KEY>",
        "Content-Type":"application/json"
    },
    json={
        "model":"meta-llama/Meta-Llama-3-8B-Instruct-Lite",
        "messages":[
            {
                "role":"user",

                # Insert your question for the model here, instead of Hello:
                "content":"Hello"
            }
        ]
    }
)

data = response.json()
print(data)
```
{% endcode %}

<details>

<summary>Response</summary>

{% code overflow="wrap" %}
```json5
{'id': 'npQo3s3-4Yz4kd-92dab7f63b26cee7', 'object': 'chat.completion', 'choices': [{'index': 0, 'finish_reason': 'stop', 'logprobs': None, 'message': {'role': 'assistant', 'content': "Hello! It's nice to meet you. Is there something I can help you with, or would you like to chat?", 'tool_calls': []}}], 'created': 1744209196, 'model': 'meta-llama/Meta-Llama-3-8B-Instruct-Lite', 'usage': {'prompt_tokens': 2, 'completion_tokens': 5, 'total_tokens': 7}}
```
{% endcode %}

</details>
