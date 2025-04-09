# llama-3.1-nemotron-70b

{% hint style="info" %}
This documentation is valid for the following list of our models:

* `nvidia/llama-3.1-nemotron-70b-instruct`
{% endhint %}

## Model Overview

A sophisticated large language model developed by NVIDIA, designed to enhance the performance of instruction-following tasks. It utilizes advanced training techniques and a robust architecture to generate human-like responses across a variety of applications.

## How to Make a Call

{% stepper %}
{% step %}
### Setup You Can’t Skip&#x20;

:black\_small\_square:  [**Create an Account**](https://aimlapi.com/app/sign-up): Visit the AI/ML API website and create an account (if you don’t have one yet).\
:black\_small\_square:  [**Generate an API Key**](https://aimlapi.com/app/keys): After logging in, navigate to your account dashboard and generate your API key. Ensure that key is enabled on UI.
{% endstep %}

{% step %}
### Copy the code example

At the bottom of this page, you'll find [a code example](llama-3.1-nemotron-70b.md#code-example-python) that shows how to structure the request. Choose the code snippet in your preferred programming language and copy it into your development environment.
{% endstep %}

{% step %}
### Modify the code example

:black\_small\_square:  Replace `<YOUR_AIMLAPI_KEY>` with your actual AI/ML API key from your account.\
:black\_small\_square:  Insert your question or request into the `content` field—this is what the model will respond to.
{% endstep %}

{% step %}
### <sup><sub><mark style="background-color:yellow;">(Optional)<mark style="background-color:yellow;"><sub></sup> Adjust other optional parameters if needed

Only `model` and `messages` are required parameters for this model (and we’ve already filled them in for you in the example), but you can include optional parameters if needed to adjust the model’s behavior. Below, you can find the corresponding [API schema](llama-3.1-nemotron-70b.md#api-schema), which lists all available parameters along with notes on how to use them.
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

{% openapi src="llama-3.1-nemotron-70b.json" path="/v1/chat/completions" method="post" %}
[llama-3.1-nemotron-70b.json](llama-3.1-nemotron-70b.json)
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
        "model":"nvidia/llama-3.1-nemotron-70b-instruct",
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
{'id': 'gen-1744191323-N0aZy5UyzpOYfRwYbik3', 'object': 'chat.completion', 'choices': [{'index': 0, 'finish_reason': 'stop', 'logprobs': {'content': [], 'refusal': []}, 'message': {'role': 'assistant', 'content': "Hello!\n\nHow can I assist you today? Do you have:\n\n1. **A question** on a specific topic you'd like answered?\n2. **A problem** you're trying to solve and need help with?\n3. **A topic** you'd like to **discuss**?\n4. **A game or activity** in mind (e.g., trivia, word games, storytelling)?\n5. **Something else** on your mind (feel free to surprise me)?\n\nPlease respond with a number or describe what's on your mind, and I'll do my best to help!", 'refusal': None}}], 'created': 1744191323, 'model': 'nvidia/llama-3.1-nemotron-70b-instruct', 'usage': {'prompt_tokens': 11, 'completion_tokens': 78, 'total_tokens': 89}}
```
{% endcode %}

</details>
