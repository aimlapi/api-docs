# Qwen-QwQ-32B

{% columns %}
{% column %}
{% hint style="info" %}
This documentation is valid for the following model:

* `Qwen/QwQ-32B`
{% endhint %}
{% endcolumn %}

{% column %}
<a href="https://aimlapi.com/app/qwen/qwq-32b" class="button primary">Try in Playground</a>
{% endcolumn %}
{% endcolumns %}

## Model Overview

A compact reasoning model designed to tackle complex problem-solving tasks. Achieves performance comparable to much larger models like [DeepSeek-R1](../DeepSeek/deepseek-r1.md) (671 billion parameters). Excels in mathematical reasoning, coding, and structured workflows.

## How to Make a Call

<details>

<summary>Step-by-Step Instructions</summary>

#### :digit\_one: Setup You Can’t Skip

:black\_small\_square: [**Create an Account**](https://aimlapi.com/app/sign-up): Visit the AI/ML API website and create an account (if you don’t have one yet).\
:black\_small\_square: [**Generate an API Key**](https://aimlapi.com/app/keys): After logging in, navigate to your account dashboard and generate your API key. Ensure that key is enabled on UI.

#### :digit\_two: Copy the code example

At the bottom of this page, you'll find [a code example](qwen-qwq-32b.md#code-example) that shows how to structure the request. Choose the code snippet in your preferred programming language and copy it into your development environment.

#### :digit\_three: Modify the code example

:black\_small\_square: Replace `<YOUR_AIMLAPI_KEY>` with your actual AI/ML API key from your account.\
:black\_small\_square: Insert your question or request into the `content` field—this is what the model will respond to.

#### :digit\_four: <sup><sub><mark style="background-color:yellow;">(Optional)<mark style="background-color:yellow;"><sub></sup> Adjust other optional parameters if needed

Only `model` and `messages` are required parameters for this model (and we’ve already filled them in for you in the example), but you can include optional parameters if needed to adjust the model’s behavior. Below, you can find the corresponding [API schema](qwen-qwq-32b.md#api-schema), which lists all available parameters along with notes on how to use them.

#### :digit\_five: Run your modified code

Run your modified code in your development environment. Response time depends on various factors, but for simple prompts it rarely exceeds a few seconds.

{% hint style="success" %}
If you need a more detailed walkthrough for setting up your development environment and making a request step by step — feel free to use our [Quickstart guide](../../../quickstart/setting-up.md).
{% endhint %}

</details>

## API Schema

{% openapi-operation spec="qwen-qwq-32b" path="/v1/chat/completions" method="post" %}
[OpenAPI qwen-qwq-32b](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/text-models-llm/Alibaba-Cloud/qwen-QwQ-32B.json)
{% endopenapi-operation %}

## Code Example

{% tabs %}
{% tab title="Python" %}
{% code overflow="wrap" %}
```python
import requests
import json  # for getting a structured output with indentation 

response = requests.post(
    "https://api.aimlapi.com/v1/chat/completions",
    headers={
        # Insert your AIML API Key instead of <YOUR_AIMLAPI_KEY>:
        "Authorization":"Bearer <YOUR_AIMLAPI_KEY>",
        "Content-Type":"application/json"
    },
    json={
        "model":"Qwen/QwQ-32B",
        "messages":[
            {
                "role":"user",
                "content":"Hello"  # insert your prompt here, instead of Hello
            }
        ]
    }
)

data = response.json()
print(json.dumps(data, indent=2, ensure_ascii=False))
```
{% endcode %}
{% endtab %}

{% tab title="JavaScript" %}
{% code overflow="wrap" %}
```javascript
async function main() {
  const response = await fetch('https://api.aimlapi.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      // insert your AIML API Key instead of <YOUR_AIMLAPI_KEY>
      'Authorization': 'Bearer <YOUR_AIMLAPI_KEY>',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'Qwen/QwQ-32B',
      messages:[
          {
              role:'user',
              content: 'Hello'  // insert your prompt here, instead of Hello
          }
      ],
    }),
  });

  const data = await response.json();
  console.log(JSON.stringify(data, null, 2));
}

main();
```
{% endcode %}
{% endtab %}
{% endtabs %}

<details>

<summary>Response</summary>

{% code overflow="wrap" %}
```json5
{'id': 'npK8kgb-2j9zxn-92d49c21a9f9302c', 'object': 'chat.completion', 'choices': [{'index': 0, 'finish_reason': 'stop', 'logprobs': None, 'message': {'role': 'assistant', 'content': '<think>\nOkay, the user said "Hello". I should respond politely. Let me think of a friendly greeting. Maybe "Hello! How can I assist you today?" That sounds good. It\'s welcoming and opens the door for them to ask for help. I\'ll go with that.\n</think>\n\nHello! How can I assist you today?', 'tool_calls': []}}], 'created': 1744145142, 'model': 'Qwen/QwQ-32B', 'usage': {'prompt_tokens': 25, 'completion_tokens': 88, 'total_tokens': 113}}
```
{% endcode %}

</details>
