# llama-3.1-lumimaid

{% hint style="info" %}
This documentation is valid for the following list of our models:

* `neversleep/llama-3.1-lumimaid-70b`
{% endhint %}

## Model Overview

A fine-tuned variant of the Llama 3 model, specifically designed for enhanced conversational capabilities and role-playing scenarios. It excels in generating coherent and contextually relevant dialogues while maintaining a broad knowledge base.

## How to Make a Call

<details>

<summary>Step-by-Step Instructions</summary>

### :digit\_one:  Setup You Can’t Skip

:black\_small\_square:  [**Create an Account**](https://aimlapi.com/app/sign-up): Visit the AI/ML API website and create an account (if you don’t have one yet).\
:black\_small\_square:  [**Generate an API Key**](https://aimlapi.com/app/keys): After logging in, navigate to your account dashboard and generate your API key. Ensure that key is enabled on UI.

### &#x20;:digit\_two:  Copy the code example

At the bottom of this page, you'll find [a code example](llama-3.1-lumimaid.md#code-example) that shows how to structure the request. Choose the code snippet in your preferred programming language and copy it into your development environment.

### :digit\_three:  Modify the code example

:black\_small\_square:  Replace `<YOUR_AIMLAPI_KEY>` with your actual AI/ML API key from your account.\
:black\_small\_square:  Insert your question or request into the `content` field—this is what the model will respond to.

### :digit\_four:  <sup><sub><mark style="background-color:yellow;">(Optional)<mark style="background-color:yellow;"><sub></sup> Adjust other optional parameters if needed

Only `model` and `messages` are required parameters for this model (and we’ve already filled them in for you in the example), but you can include optional parameters if needed to adjust the model’s behavior. Below, you can find the corresponding [API schema](llama-3.1-lumimaid.md#api-schema), which lists all available parameters along with notes on how to use them.

### :digit\_five:  Run your modified code

Run your modified code in your development environment. Response time depends on various factors, but for simple prompts it rarely exceeds a few seconds.

{% hint style="success" %}
If you need a more detailed walkthrough for setting up your development environment and making a request step by step — feel free to use our [Quickstart guide](../../../quickstart/setting-up.md).
{% endhint %}

</details>

## API Schema

{% openapi-operation spec="llama-3-1-lumimaid" path="/v1/chat/completions" method="post" %}
[OpenAPI llama-3-1-lumimaid](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/text-models-llm/NeverSleep/llama-3.1-lumimaid.json)
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
        "model":"neversleep/llama-3.1-lumimaid-70b",
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
{'id': 'gen-1744187921-zagjYTrHUVni4cndSAO6', 'object': 'chat.completion', 'choices': [{'index': 0, 'finish_reason': 'stop', 'logprobs': None, 'message': {'role': 'assistant', 'content': "It's nice to meet you. Is there something I can help you with or would you like to chat?", 'refusal': None}}], 'created': 1744187921, 'model': 'neversleep/llama-3.1-lumimaid-70b', 'usage': {'prompt_tokens': 89, 'completion_tokens': 228, 'total_tokens': 317}}
```
{% endcode %}

</details>
