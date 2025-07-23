# Mistral-7B-Instruct

{% hint style="info" %}
This documentation is valid for the following list of our models:

* `mistralai/Mistral-7B-Instruct-v0.1`
* `mistralai/Mistral-7B-Instruct-v0.2`
* `mistralai/Mistral-7B-Instruct-v0.3`
{% endhint %}

## Model Overview

An advanced version of the Mistral-7B model, fine-tuned specifically for instruction-based tasks. This model is designed to enhance language generation and understanding capabilities.

## How to Make a Call

<details>

<summary>Step-by-Step Instructions</summary>

### :digit\_one:  Setup You Can’t Skip

:black\_small\_square:  [**Create an Account**](https://aimlapi.com/app/sign-up): Visit the AI/ML API website and create an account (if you don’t have one yet).\
:black\_small\_square:  [**Generate an API Key**](https://aimlapi.com/app/keys): After logging in, navigate to your account dashboard and generate your API key. Ensure that key is enabled on UI.

### &#x20;:digit\_two:  Copy the code example

At the bottom of this page, you'll find [a code example](Mistral-7B-Instruct.md#code-example) that shows how to structure the request. Choose the code snippet in your preferred programming language and copy it into your development environment.

### :digit\_three:  Modify the code example

:black\_small\_square:  Replace `<YOUR_AIMLAPI_KEY>` with your actual AI/ML API key from your account.\
:black\_small\_square:  Insert your question or request into the `content` field—this is what the model will respond to.

### :digit\_four:  <sup><sub><mark style="background-color:yellow;">(Optional)<mark style="background-color:yellow;"><sub></sup> Adjust other optional parameters if needed

Only `model` and `messages` are required parameters for this model (and we’ve already filled them in for you in the example), but you can include optional parameters if needed to adjust the model’s behavior. Below, you can find the corresponding [API schema](Mistral-7B-Instruct.md#api-schema), which lists all available parameters along with notes on how to use them.

### :digit\_five:  Run your modified code

Run your modified code in your development environment. Response time depends on various factors, but for simple prompts it rarely exceeds a few seconds.

{% hint style="success" %}
If you need a more detailed walkthrough for setting up your development environment and making a request step by step — feel free to use our [Quickstart guide](../../../quickstart/setting-up.md).
{% endhint %}

</details>

## API Schema

{% openapi-operation spec="mistral-7b-instruct" path="/v1/chat/completions" method="post" %}
[OpenAPI mistral-7b-instruct](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/text-models-llm/Mistral-AI/Mistral-7B-Instruct.json)
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
        "model":"mistralai/Mistral-7B-Instruct-v0.3",
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
{'id': 'npPQHux-3NKUce-92d937464c2aff02', 'object': 'chat.completion', 'choices': [{'index': 0, 'finish_reason': 'stop', 'logprobs': None, 'message': {'role': 'assistant', 'content': " Hello! How can I help you today? Is there something specific you'd like to talk about or learn more about? I'm here to answer questions and provide information on a wide range of topics. Let me know if you have any questions or if there's something you'd like to discuss.", 'tool_calls': []}}], 'created': 1744193439, 'model': 'mistralai/Mistral-7B-Instruct-v0.3', 'usage': {'prompt_tokens': 2, 'completion_tokens': 27, 'total_tokens': 29}}
```
{% endcode %}

</details>
