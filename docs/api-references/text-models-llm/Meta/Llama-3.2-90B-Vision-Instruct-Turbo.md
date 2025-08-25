# Llama-3.2-90B-Vision-Instruct-Turbo

<table data-header-hidden data-full-width="true"><thead><tr><th width="546.4443969726562" valign="top"></th><th width="202.666748046875" valign="top"></th></tr></thead><tbody><tr><td valign="top"><div data-gb-custom-block data-tag="hint" data-style="info" class="hint hint-info"><p>This documentation is valid for the following list of our models:</p><ul><li><code>meta-llama/Llama-3.2-90B-Vision-Instruct-Turbo</code></li></ul></div></td><td valign="top"><a href="https://aimlapi.com/app/?model=meta-llama/Llama-3.2-90B-Vision-Instruct-Turbo&#x26;mode=chat" class="button primary">Try in Playground</a></td></tr></tbody></table>

## Model Overview

A pretrained, instruction-tuned image reasoning model that takes text and images as input and generates text output. The Llama 3.2-Vision models are fine-tuned for tasks like visual recognition, image-based reasoning, captioning, and answering general questions about images. They outperform many open and proprietary multimodal models on standard benchmarks.

## How to Make a Call

<details>

<summary>Step-by-Step Instructions</summary>

### :digit\_one:  Setup You Can’t Skip

:black\_small\_square:  [**Create an Account**](https://aimlapi.com/app/sign-up): Visit the AI/ML API website and create an account (if you don’t have one yet).\
:black\_small\_square:  [**Generate an API Key**](https://aimlapi.com/app/keys): After logging in, navigate to your account dashboard and generate your API key. Ensure that key is enabled on UI.

### &#x20;:digit\_two:  Copy the code example

Below, you'll find [a code example](Llama-3.2-90B-Vision-Instruct-Turbo.md#code-example) that shows how to structure the request. Choose the code snippet in your preferred programming language and copy it into your development environment.

### :digit\_three:  Modify the code example

:black\_small\_square:  Replace `<YOUR_AIMLAPI_KEY>` with your actual AI/ML API key from your account.\
:black\_small\_square:  Insert your question or request into the `content` field—this is what the model will respond to.

### :digit\_four:  <sup><sub><mark style="background-color:yellow;">(Optional)<mark style="background-color:yellow;"><sub></sup> Adjust other optional parameters if needed

Only `model` and `messages` are required parameters for this model (and we’ve already filled them in for you in the example), but you can include optional parameters if needed to adjust the model’s behavior. Below, you can find the corresponding [API schema](Llama-3.2-90B-Vision-Instruct-Turbo.md#api-schema), which lists all available parameters along with notes on how to use them.

### :digit\_five:  Run your modified code

Run your modified code in your development environment. Response time depends on various factors, but for simple prompts it rarely exceeds a few seconds.

{% hint style="success" %}
If you need a more detailed walkthrough for setting up your development environment and making a request step by step — feel free to use our [Quickstart guide](../../../quickstart/setting-up.md).
{% endhint %}

</details>

## Code Example

{% tabs %}
{% tab title="Python" %}
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
        "model":"meta-llama/Llama-3.2-90B-Vision-Instruct-Turbo",
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
{% endtab %}
{% endtabs %}

<details>

<summary>Response</summary>

{% code overflow="wrap" %}
```json5
{'id': 'npQeQJu-2j9zxn-92da8ec6698de8e9', 'object': 'chat.completion', 'choices': [{'index': 0, 'finish_reason': 'stop', 'logprobs': None, 'message': {'role': 'assistant', 'content': 'Hello! How can I assist you today?', 'tool_calls': []}}], 'created': 1744207509, 'model': 'meta-llama/Llama-3.2-90B-Vision-Instruct-Turbo', 'usage': {'prompt_tokens': 28, 'completion_tokens': 25, 'total_tokens': 53}}
```
{% endcode %}

</details>

## API Schema

{% openapi-operation spec="llama-3-2-90b-vision-instruct-turbo" path="/v1/chat/completions" method="post" %}
[OpenAPI llama-3-2-90b-vision-instruct-turbo](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/text-models-llm/Meta/Llama-3.2-90B-Vision-Instruct-Turbo.json)
{% endopenapi-operation %}
