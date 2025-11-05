# nemotron-nano-9b-v2

<table data-header-hidden data-full-width="true"><thead><tr><th width="546.4443969726562" valign="top"></th><th width="202.666748046875" valign="top"></th></tr></thead><tbody><tr><td valign="top"><div data-gb-custom-block data-tag="hint" data-style="info" class="hint hint-info"><p>This documentation is valid for the following list of our models:</p><ul><li><code>nvidia/nemotron-nano-9b-v2</code></li></ul></div></td><td valign="top"><a href="https://aimlapi.com/app/?model=nvidia/nemotron-nano-9b-v2&#x26;mode=chat" class="button primary">Try in Playground</a></td></tr></tbody></table>

## Model Overview

A unified model designed for both reasoning and non-reasoning tasks. It processes user inputs by first producing a reasoning trace, then delivering a final answer. The reasoning behavior can be adjusted through the system prompt — allowing the model to either show its intermediate reasoning steps or respond directly with the final result.\
The model offers strong document understanding and summarization capabilities.&#x20;

## How to Make a Call

<details>

<summary>Step-by-Step Instructions</summary>

### :digit\_one:  Setup You Can’t Skip

:black\_small\_square:  [**Create an Account**](https://aimlapi.com/app/sign-up): Visit the AI/ML API website and create an account (if you don’t have one yet).\
:black\_small\_square:  [**Generate an API Key**](https://aimlapi.com/app/keys): After logging in, navigate to your account dashboard and generate your API key. Ensure that key is enabled on UI.

### &#x20;:digit\_two:  Copy the code example

At the bottom of this page, you'll find [a code example](nemotron-nano-9b-v2.md#code-example) that shows how to structure the request. Choose the code snippet in your preferred programming language and copy it into your development environment.

### :digit\_three:  Modify the code example

:black\_small\_square:  Replace `<YOUR_AIMLAPI_KEY>` with your actual AI/ML API key from your account.\
:black\_small\_square:  Insert your question or request into the `content` field—this is what the model will respond to.

### :digit\_four:  <sup><sub><mark style="background-color:yellow;">(Optional)<mark style="background-color:yellow;"><sub></sup> Adjust other optional parameters if needed

Only `model` and `messages` are required parameters for this model (and we’ve already filled them in for you in the example), but you can include optional parameters if needed to adjust the model’s behavior. Below, you can find the corresponding [API schema](nemotron-nano-9b-v2.md#api-schema), which lists all available parameters along with notes on how to use them.

### :digit\_five:  Run your modified code

Run your modified code in your development environment. Response time depends on various factors, but for simple prompts it rarely exceeds a few seconds.

{% hint style="success" %}
If you need a more detailed walkthrough for setting up your development environment and making a request step by step — feel free to use our [Quickstart guide](../../../quickstart/setting-up.md).
{% endhint %}

</details>

## API Schema

{% openapi-operation spec="nemotron-nano-9b-v2" path="/v1/chat/completions" method="post" %}
[OpenAPI nemotron-nano-9b-v2](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/text-models-llm/NVIDIA/nemotron-nano-9b-v2.json)
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
        "model":"nvidia/nemotron-nano-9b-v2",
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
      model: 'nvidia/nemotron-nano-9b-v2',
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
{
  "id": "gen-1762343928-hETm6La6igsboRxBM0fa",
  "provider": "DeepInfra",
  "model": "nvidia/nemotron-nano-9b-v2",
  "object": "chat.completion",
  "created": 1762343928,
  "choices": [
    {
      "logprobs": null,
      "finish_reason": "stop",
      "native_finish_reason": "stop",
      "index": 0,
      "message": {
        "role": "assistant",
        "content": "\n\nHello! How can I assist you today? 😊\n",
        "refusal": null,
        "reasoning": "Okay, the user just said \"Hello\". That's a greeting. I should respond politely. Let me make sure to acknowledge their greeting and offer help. Maybe say something like \"Hello! How can I assist you today?\" That's friendly and opens the door for them to ask questions. I should keep it simple and welcoming.\n",
        "reasoning_details": [
          {
            "type": "reasoning.text",
            "text": "Okay, the user just said \"Hello\". That's a greeting. I should respond politely. Let me make sure to acknowledge their greeting and offer help. Maybe say something like \"Hello! How can I assist you today?\" That's friendly and opens the door for them to ask questions. I should keep it simple and welcoming.\n",
            "format": "unknown",
            "index": 0
          }
        ]
      }
    }
  ],
  "usage": {
    "prompt_tokens": 14,
    "completion_tokens": 84,
    "total_tokens": 98,
    "prompt_tokens_details": null
  }
}
```
{% endcode %}

</details>
