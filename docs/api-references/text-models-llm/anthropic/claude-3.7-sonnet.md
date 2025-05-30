# Claude 3.7 Sonnet

{% hint style="info" %}
This documentation is valid for the following list of our models:

* `claude-3-7-sonnet-20250219`
* `claude-3-7-sonnet-latest`
* `anthropic/claude-3.7-sonnet`
{% endhint %}

## Model Overview

Anthropic's hybrid reasoning model, designed to tackle complex tasks requiring both rapid inference and detailed problem-solving. It introduces a dual-mode operation, combining standard language generation with extended thinking capabilities.

## How to Make a Call

{% stepper %}
{% step %}
### Setup You Can’t Skip&#x20;

:black\_small\_square:  [**Create an Account**](https://aimlapi.com/app/sign-up): Visit the AI/ML API website and create an account (if you don’t have one yet).\
:black\_small\_square:  [**Generate an API Key**](https://aimlapi.com/app/keys): After logging in, navigate to your account dashboard and generate your API key. Ensure that key is enabled on UI.
{% endstep %}

{% step %}
### Copy the code example

At the bottom of this page, you'll find [a code example](claude-3.7-sonnet.md#code-example-python) that shows how to structure the request. Choose the code snippet in your preferred programming language and copy it into your development environment.
{% endstep %}

{% step %}
### Modify the code example

:black\_small\_square:  Replace `<YOUR_AIMLAPI_KEY>` with your actual AI/ML API key from your account.\
:black\_small\_square:  Insert your question or request into the `content` field—this is what the model will respond to.
{% endstep %}

{% step %}
### <sup><sub><mark style="background-color:yellow;">(Optional)<mark style="background-color:yellow;"><sub></sup> Adjust other optional parameters if needed

Only `model` and `messages` are required parameters for this model (and we’ve already filled them in for you in the example), but you can include optional parameters if needed to adjust the model’s behavior. Below, you can find the corresponding [API schema](claude-3.7-sonnet.md#api-schema), which lists all available parameters along with notes on how to use them.
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

{% openapi src="../Anthropic/claude-3-7-sonnet.json" path="/v1/chat/completions" method="post" %}
[claude-3-7-sonnet.json](../Anthropic/claude-3-7-sonnet.json)
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
        "model":"anthropic/claude-3.7-sonnet",
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
{'id': 'msg_01MmQNxa1E5mU8EyMXzT9zEU', 'object': 'chat.completion', 'model': 'claude-3-7-sonnet-20250219', 'choices': [{'index': 0, 'message': {'reasoning_content': '', 'content': "Hello! How can I assist you today? Whether you have a question, need information, or would like to discuss a particular topic, I'm here to help. What's on your mind?", 'role': 'assistant'}, 'finish_reason': 'end_turn', 'logprobs': None}], 'created': 1744218600, 'usage': {'prompt_tokens': 50, 'completion_tokens': 1323, 'total_tokens': 1373}}
```
{% endcode %}

</details>
