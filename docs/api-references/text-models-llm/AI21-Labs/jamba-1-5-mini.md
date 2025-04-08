# jamba-1-5-mini

{% hint style="info" %}
This documentation is valid for the following list of our models:

* `ai21/jamba-1-5-mini`
{% endhint %}

## Model Overview

A state-of-the-art hybrid SSM-Transformer model designed for high efficiency and performance in instruction-following tasks. It excels in processing long contexts and generating high-quality outputs, making it suitable for a variety of applications in natural language processing.

## How to Make a Call

{% stepper %}
{% step %}
### Setup You Can’t Skip&#x20;

:black\_small\_square:  [**Create an Account**](https://aimlapi.com/app/sign-up): Visit the AI/ML API website and create an account (if you don’t have one yet).\
:black\_small\_square:  [**Generate an API Key**](https://aimlapi.com/app/keys): After logging in, navigate to your account dashboard and generate your API key. Ensure that key is enabled on UI.
{% endstep %}

{% step %}
### Copy the code example

At the bottom of this page, you'll find [a code example](jamba-1-5-mini.md#example) that shows how to structure the request. Choose the code snippet in your preferred programming language and copy it into your development environment.
{% endstep %}

{% step %}
### Modify the code example

:black\_small\_square:  Replace `<YOUR_AIMLAPI_KEY>` with your actual AI/ML API key from your account.\
:black\_small\_square:  Insert your question or request into the `content` field—this is what the model will respond to.
{% endstep %}

{% step %}
### <sup><sub><mark style="background-color:yellow;">(Optional)<mark style="background-color:yellow;"><sub></sup> Adjust other optional parameters if needed

Only `model` and `messages` are required parameters for this model (and we’ve already filled them in for you in the example), but you can include optional parameters if needed to adjust the model’s behavior. Below, you can find the corresponding [API schema](jamba-1-5-mini.md#api-schema), which lists all available parameters along with notes on how to use them.
{% endstep %}

{% step %}
### Run your modified code

Run your modified code in your development environment. Response time depends on various factors, but for simple prompts it rarely exceeds a few seconds.
{% endstep %}
{% endstepper %}

{% hint style="success" %}
If you need a more detailed walkthrough for setting up your development environment and making a request step by step — feel free to use our [Quickstart guide](../../../quickstart/setting-up.md).
{% endhint %}

## API Schema

{% openapi src="jamba-1-5-mini.json" path="/v1/chat/completions" method="post" %}
[jamba-1-5-mini.json](jamba-1-5-mini.json)
{% endopenapi %}

## Example

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
        "model":"ai21/jamba-1-5-mini",
        "messages":[
            {
                "role":"user",

                # Insert your question for the model here, instead of Hello.
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
{'id': 'gen-1744142790-lUbp2sBR54bSs1DgQlZT', 'object': 'chat.completion', 'choices': [{'index': 0, 'finish_reason': 'stop', 'logprobs': None, 'message': {'role': 'assistant', 'content': 'Hi there! How can I assist you today?', 'refusal': None}}], 'created': 1744142790, 'model': 'ai21/jamba-1-5-mini', 'usage': {'prompt_tokens': 5, 'completion_tokens': 10, 'total_tokens': 15}}
```
{% endcode %}

</details>
