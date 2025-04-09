# Llama-3.3-70B-Instruct-Turbo

{% hint style="info" %}
This documentation is valid for the following list of our models:

* `meta-llama/Llama-3.3-70B-Instruct-Turbo`
{% endhint %}

## Model Overview

An optimized language model designed for efficient text generation with advanced features and multilingual support. Specifically tuned for instruction-following tasks, making it suitable for applications requiring conversational capabilities and task-oriented responses.

## How to Make a Call

{% stepper %}
{% step %}
### Setup You Can’t Skip&#x20;

:black\_small\_square:  [**Create an Account**](https://aimlapi.com/app/sign-up): Visit the AI/ML API website and create an account (if you don’t have one yet).\
:black\_small\_square:  [**Generate an API Key**](https://aimlapi.com/app/keys): After logging in, navigate to your account dashboard and generate your API key. Ensure that key is enabled on UI.
{% endstep %}

{% step %}
### Copy the code example

At the bottom of this page, you'll find [a code example](Llama-3.3-70B-Instruct-Turbo.md#code-example-python) that shows how to structure the request. Choose the code snippet in your preferred programming language and copy it into your development environment.
{% endstep %}

{% step %}
### Modify the code example

:black\_small\_square:  Replace `<YOUR_AIMLAPI_KEY>` with your actual AI/ML API key from your account.\
:black\_small\_square:  Insert your question or request into the `content` field—this is what the model will respond to.
{% endstep %}

{% step %}
### <sup><sub><mark style="background-color:yellow;">(Optional)<mark style="background-color:yellow;"><sub></sup> Adjust other optional parameters if needed

Only `model` and `messages` are required parameters for this model (and we’ve already filled them in for you in the example), but you can include optional parameters if needed to adjust the model’s behavior. Below, you can find the corresponding [API schema](Llama-3.3-70B-Instruct-Turbo.md#api-schema), which lists all available parameters along with notes on how to use them.
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

{% openapi src="Llama-3.3-70B-Instruct-Turbo.json" path="/v1/chat/completions" method="post" %}
[Llama-3.3-70B-Instruct-Turbo.json](Llama-3.3-70B-Instruct-Turbo.json)
{% endopenapi %}

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
        "model":"meta-llama/Llama-3.3-70B-Instruct-Turbo",
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
{'id': 'npQ5s8C-2j9zxn-92d9f3c84a529790', 'object': 'chat.completion', 'choices': [{'index': 0, 'finish_reason': 'stop', 'logprobs': None, 'message': {'role': 'assistant', 'content': "Hello. It's nice to meet you. Is there something I can help you with or would you like to chat?", 'tool_calls': []}}], 'created': 1744201161, 'model': 'meta-llama/Llama-3.3-70B-Instruct-Turbo', 'usage': {'prompt_tokens': 67, 'completion_tokens': 46, 'total_tokens': 113}}
```
{% endcode %}

</details>
