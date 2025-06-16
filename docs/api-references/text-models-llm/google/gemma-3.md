# gemma-3

{% hint style="info" %}
This documentation is valid for the following list of our models:

* `google/gemma-3-1b-it`
* `google/gemma-3-4b-it`
* `google/gemma-3-12b-it`
* `google/gemma-3-27b-it`
{% endhint %}

## Model Overview

This page describes four variants of Google’s latest open AI model, Gemma 3. All variants share the same set of parameters but differ in speed and reasoning capabilities.

## How to Make a Call

{% stepper %}
{% step %}
### Setup You Can’t Skip&#x20;

:black\_small\_square:  [**Create an Account**](https://aimlapi.com/app/sign-up): Visit the AI/ML API website and create an account (if you don’t have one yet).\
:black\_small\_square:  [**Generate an API Key**](https://aimlapi.com/app/keys): After logging in, navigate to your account dashboard and generate your API key. Ensure that key is enabled on UI.
{% endstep %}

{% step %}
### Copy the code example

At the bottom of this page, you'll find [a code example](gemma-3.md#code-example-python) that shows how to structure the request. Choose the code snippet in your preferred programming language and copy it into your development environment.
{% endstep %}

{% step %}
### Modify the code example

:black\_small\_square:  Replace `<YOUR_AIMLAPI_KEY>` with your actual AI/ML API key from your account.\
:black\_small\_square:  Insert your question or request into the `content` field—this is what the model will respond to.
{% endstep %}

{% step %}
### <sup><sub><mark style="background-color:yellow;">(Optional)<mark style="background-color:yellow;"><sub></sup> Adjust other optional parameters if needed

Only `model` and `messages` are required parameters for this model (and we’ve already filled them in for you in the example), but you can include optional parameters if needed to adjust the model’s behavior. Below, you can find the corresponding [API schema](gemma-3.md#api-schema), which lists all available parameters along with notes on how to use them.
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

{% openapi-operation spec="gemma-3" path="/v1/chat/completions" method="post" %}
[Broken link](broken-reference)
{% endopenapi-operation %}

## Code Example (Python)

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
        "model":"google/gemma-3-27b-it",
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
{'id': 'gen-1744217834-d0OUILKDSxXQwmh2EorK', 'object': 'chat.completion', 'choices': [{'index': 0, 'finish_reason': 'stop', 'logprobs': None, 'message': {'role': 'assistant', 'content': "\nHello there! 👋 \n\nIt's great to connect with you. How can I help you today? \n\nJust let me know what you're thinking, whether you have a question, want to brainstorm ideas, need some information, or just want to chat. I'm here and ready to assist!\n\n\n\n", 'refusal': None}}], 'created': 1744217834, 'model': 'google/gemma-3-27b-it', 'usage': {'prompt_tokens': 0, 'completion_tokens': 0, 'total_tokens': 0}}
```
{% endcode %}

</details>
