# Qwen-QwQ-32B

{% hint style="info" %}
This documentation is valid for the following list of our models:

* `Qwen/QwQ-32B`
{% endhint %}

## Model Overview

QwQ-32B is a compact reasoning model designed to tackle complex problem-solving tasks with state-of-the-art efficiency. Despite its relatively small size of 32 billion parameters, it achieves performance comparable to much larger models like DeepSeek-R1 (671 billion parameters). Leveraging reinforcement learning (RL) and agentic capabilities, QwQ-32B excels in mathematical reasoning, coding, and structured workflows.

**Key Features:**

* Compact yet powerful: Achieves near-parity with larger models while requiring significantly less computational power.
* Reinforcement learning-driven reasoning: Integrates multi-stage RL for improved problem-solving and adaptability.
* Agentic capabilities: Dynamically adjusts reasoning processes based on environmental feedback.
* Wide context window: Processes up to 131,072 tokens for handling long-form inputs effectively.

## How to Make a Call

{% stepper %}
{% step %}
### Setup You Can’t Skip&#x20;

:black\_small\_square:  [**Create an Account**](https://aimlapi.com/app/sign-up): Visit the AI/ML API website and create an account (if you don’t have one yet).\
:black\_small\_square:  [**Generate an API Key**](https://aimlapi.com/app/keys): After logging in, navigate to your account dashboard and generate your API key. Ensure that key is enabled on UI.
{% endstep %}

{% step %}
### Copy the code example

At the bottom of this page, you'll find [a code example](qwen-qwq-32b.md#code-example-python) that shows how to structure the request. Choose the code snippet in your preferred programming language and copy it into your development environment.
{% endstep %}

{% step %}
### Modify the code example

:black\_small\_square:  Replace `<YOUR_AIMLAPI_KEY>` with your actual AI/ML API key from your account.\
:black\_small\_square:  Insert your question or request into the `content` field—this is what the model will respond to.
{% endstep %}

{% step %}
### <sup><sub><mark style="background-color:yellow;">(Optional)<mark style="background-color:yellow;"><sub></sup> Adjust other optional parameters if needed

Only `model` and `messages` are required parameters for this model (and we’ve already filled them in for you in the example), but you can include optional parameters if needed to adjust the model’s behavior. Below, you can find the corresponding [API schema](qwen-qwq-32b.md#api-schema), which lists all available parameters along with notes on how to use them.
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

{% openapi src="https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/text-models-llm/Alibaba-Cloud/qwen-QwQ-32B.json" path="/v1/chat/completions" method="post" %}
[https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/text-models-llm/Alibaba-Cloud/qwen-QwQ-32B.json](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/text-models-llm/Alibaba-Cloud/qwen-QwQ-32B.json)
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
        "model":"Qwen/QwQ-32B",
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
{'id': 'npK8kgb-2j9zxn-92d49c21a9f9302c', 'object': 'chat.completion', 'choices': [{'index': 0, 'finish_reason': 'stop', 'logprobs': None, 'message': {'role': 'assistant', 'content': '<think>\nOkay, the user said "Hello". I should respond politely. Let me think of a friendly greeting. Maybe "Hello! How can I assist you today?" That sounds good. It\'s welcoming and opens the door for them to ask for help. I\'ll go with that.\n</think>\n\nHello! How can I assist you today?', 'tool_calls': []}}], 'created': 1744145142, 'model': 'Qwen/QwQ-32B', 'usage': {'prompt_tokens': 25, 'completion_tokens': 88, 'total_tokens': 113}}
```
{% endcode %}

</details>
