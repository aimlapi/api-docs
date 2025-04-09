# DeepSeek V3

{% hint style="info" %}
This documentation is valid for the following list of our models:

* `deepseek-chat`
* `deepseek/deepseek-chat`
* `deepseek/deepseek-chat-v3-0324`
{% endhint %}

{% hint style="success" %}
We provide the latest version of this model from Mar 24, 2025.\
All three IDs listed above refer to the same model; we support them for backward compatibility.
{% endhint %}

## Model Overview

DeepSeek V3 (or deepseek-chat) is an advanced conversational AI designed to deliver highly engaging and context-aware dialogues. This model excels in understanding and generating human-like text, making it an ideal solution for creating responsive and intelligent chatbots. Its sophisticated architecture enables it to grasp subtle nuances in language, providing a seamless conversational experience that mimics human interaction.

## How to Make a Call

{% stepper %}
{% step %}
### Setup You Can’t Skip&#x20;

:black\_small\_square:  [**Create an Account**](https://aimlapi.com/app/sign-up): Visit the AI/ML API website and create an account (if you don’t have one yet).\
:black\_small\_square:  [**Generate an API Key**](https://aimlapi.com/app/keys): After logging in, navigate to your account dashboard and generate your API key. Ensure that key is enabled on UI.
{% endstep %}

{% step %}
### Copy the code example

At the bottom of this page, you'll find [a code example](deepseek-chat.md#code-example-python) that shows how to structure the request. Choose the code snippet in your preferred programming language and copy it into your development environment.
{% endstep %}

{% step %}
### Modify the code example

:black\_small\_square:  Replace `<YOUR_AIMLAPI_KEY>` with your actual AI/ML API key from your account.\
:black\_small\_square:  Insert your question or request into the `content` field—this is what the model will respond to.
{% endstep %}

{% step %}
### <sup><sub><mark style="background-color:yellow;">(Optional)<mark style="background-color:yellow;"><sub></sup> Adjust other optional parameters if needed

Only `model` and `messages` are required parameters for this model (and we’ve already filled them in for you in the example), but you can include optional parameters if needed to adjust the model’s behavior. Below, you can find the corresponding [API schema](deepseek-chat.md#api-schema), which lists all available parameters along with notes on how to use them.
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

{% openapi src="deepseek-chat.json" path="/v1/chat/completions" method="post" %}
[deepseek-chat.json](deepseek-chat.json)
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
        "model":"deepseek-chat",
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
{'id': 'gen-1744194041-A363xKnsNwtv6gPnUPnO', 'object': 'chat.completion', 'choices': [{'index': 0, 'finish_reason': 'stop', 'logprobs': None, 'message': {'role': 'assistant', 'content': "Hello! 😊 How can I assist you today? Feel free to ask me anything—I'm here to help! 🚀", 'reasoning_content': '', 'refusal': None}}], 'created': 1744194041, 'model': 'deepseek/deepseek-chat-v3-0324', 'usage': {'prompt_tokens': 16, 'completion_tokens': 88, 'total_tokens': 104}}
```
{% endcode %}

</details>
