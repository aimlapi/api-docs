# grok-3-mini-beta

{% hint style="info" %}
This documentation is valid for the following list of our models:

* `x-ai/grok-3-mini-beta`
{% endhint %}

## Model Overview

A lighter version of the [Grok 3 Beta model](grok-3-beta.md), designed for quicker response times while maintaining robust reasoning capabilities. It is particularly suited for applications where speed is prioritized over exhaustive accuracy checks.

## How to Make a Call

{% stepper %}
{% step %}
### Setup You Can’t Skip&#x20;

:black\_small\_square:  [**Create an Account**](https://aimlapi.com/app/sign-up): Visit the AI/ML API website and create an account (if you don’t have one yet).\
:black\_small\_square:  [**Generate an API Key**](https://aimlapi.com/app/keys): After logging in, navigate to your account dashboard and generate your API key. Ensure that key is enabled on UI.
{% endstep %}

{% step %}
### Copy the code example

At the bottom of this page, you'll find [a code example](grok-3-mini-beta.md#code-example-python) that shows how to structure the request. Choose the code snippet in your preferred programming language and copy it into your development environment.
{% endstep %}

{% step %}
### Modify the code example

:black\_small\_square:  Replace `<YOUR_AIMLAPI_KEY>` with your actual AI/ML API key from your account.\
:black\_small\_square:  Insert your question or request into the `content` field—this is what the model will respond to.
{% endstep %}

{% step %}
### <sup><sub><mark style="background-color:yellow;">(Optional)<mark style="background-color:yellow;"><sub></sup> Adjust other optional parameters if needed

Only `model` and `messages` are required parameters for this model (and we’ve already filled them in for you in the example), but you can include optional parameters if needed to adjust the model’s behavior. Below, you can find the corresponding [API schema](grok-3-mini-beta.md#api-schema), which lists all available parameters along with notes on how to use them.
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

{% openapi src="https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/text-models-llm/xAI/grok-3-mini-beta.json" path="/v1/chat/completions" method="post" %}
[https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/text-models-llm/xAI/grok-3-mini-beta.json](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/text-models-llm/xAI/grok-3-mini-beta.json)
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
        "model":"x-ai/grok-3-mini-beta",
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
{'id': 'gen-1744380893-6fzXa86I1KOoFhg8d7Y8', 'system_fingerprint': 'fp_d133ae3397', 'object': 'chat.completion', 'choices': [{'index': 0, 'finish_reason': 'stop', 'logprobs': None, 'message': {'role': 'assistant', 'content': "Hello! I'm Assistant, here to help. How can I assist you today? 😊", 'reasoning_content': 'First, the user said "Hello." This is a simple greeting. As an AI assistant, my response should be friendly, engaging, and appropriate.\n\nMy role is to be helpful and truthful, based on the instructions. I should continue the conversation naturally.\n\nA good response to "Hello" could be:\n- A greeting back, like "Hi there!" or "Hello! How can I help you?"\n- Since this might be the start of a conversation, I should invite further interaction.\n\nKeep it concise and not overwhelming. People often say "Hello" to test or start a chat.\n\nFinally, end my response in a way that encourages more dialogue, unless it\'s a standalone interaction.\n\nPossible response:\n- "Hello! How are you today?"\n- Or, "Hi! What can I assist you with?"\n\nTo make it more personal, I could reference being an AI, but that might not be necessary right away.\n\nThe system prompt says: "You are a helpful and truthful AI assistant named Assistant." So, I should respond as Assistant.\n\nStructure:\n1. Greet back.\n2. Offer help or ask a question to continue.\n\nFinal response: "Hello! I\'m Assistant, here to help. What\'s on your mind?"', 'refusal': None}}], 'created': 1744380893, 'model': 'x-ai/grok-3-mini-beta', 'usage': {'prompt_tokens': 5, 'completion_tokens': 19, 'total_tokens': 24}}
```
{% endcode %}

</details>
