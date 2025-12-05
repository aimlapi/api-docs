# grok-code-fast-1

<table data-header-hidden data-full-width="true"><thead><tr><th width="546.4443969726562" valign="top"></th><th width="202.666748046875" valign="top"></th></tr></thead><tbody><tr><td valign="top"><div data-gb-custom-block data-tag="hint" data-style="info" class="hint hint-info"><p>This documentation is valid for the following model:</p><ul><li><code>x-ai/grok-code-fast-1</code></li></ul></div></td><td valign="top"><a href="https://aimlapi.com/app/x-ai/grok-code-fast-1" class="button primary">Try in Playground</a></td></tr></tbody></table>

## Model Overview

This model provides rapid, budget-friendly reasoning for agentic coding. By showing reasoning traces in its output, it enables developers to refine and improve workflows.

## How to Make a Call

<details>

<summary>Step-by-Step Instructions</summary>

:digit\_one: **Setup You Can’t Skip**

:black\_small\_square: [**Create an Account**](https://aimlapi.com/app/sign-up): Visit the AI/ML API website and create an account (if you don’t have one yet).\
:black\_small\_square: [**Generate an API Key**](https://aimlapi.com/app/keys): After logging in, navigate to your account dashboard and generate your API key. Ensure that key is enabled on UI.

:digit\_two: **Copy the code example**

At the bottom of this page, you'll find [a code example](grok-code-fast-1.md#code-example) that shows how to structure the request. Choose the code snippet in your preferred programming language and copy it into your development environment.

:digit\_three: **Modify the code example**

:black\_small\_square: Replace `<YOUR_AIMLAPI_KEY>` with your actual AI/ML API key from your account.\
:black\_small\_square: Insert your question or request into the `content` field—this is what the model will respond to.

:digit\_four: <sup><sub><mark style="background-color:yellow;">**(Optional)**<mark style="background-color:yellow;"><sub></sup>**&#x20;Adjust other optional parameters if needed**

Only `model` and `messages` are required parameters for this model (and we’ve already filled them in for you in the example), but you can include optional parameters if needed to adjust the model’s behavior. Below, you can find the corresponding [API schema](grok-code-fast-1.md#api-schema), which lists all available parameters along with notes on how to use them.

:digit\_five: **Run your modified code**

Run your modified code in your development environment. Response time depends on various factors, but for simple prompts it rarely exceeds a few seconds.

{% hint style="success" %}
If you need a more detailed walkthrough for setting up your development environment and making a request step by step — feel free to use our [Quickstart guide](../../../quickstart/setting-up.md).
{% endhint %}

</details>

## API Schema

{% openapi-operation spec="grok-code-fast-1" path="/v1/chat/completions" method="post" %}
[OpenAPI grok-code-fast-1](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/text-models-llm/xAI/grok-code-fast-1.json)
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
        "model":"x-ai/grok-code-fast-1",
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
      model: 'x-ai/grok-code-fast-1',
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
  "id": "1c044ed9-fcf0-4ea2-6d79-820bdcee6280_us-east-1",
  "system_fingerprint": "fp_10f00c862d",
  "object": "chat.completion",
  "choices": [
    {
      "index": 0,
      "finish_reason": "stop",
      "message": {
        "role": "assistant",
        "content": "Hello! I'm Grok, built by xAI to help with questions and chats. What can I do for you today?",
        "refusal": null
      }
    }
  ],
  "created": 1758231743,
  "model": "grok-code-fast-1",
  "usage": {
    "prompt_tokens": 86,
    "completion_tokens": 79,
    "total_tokens": 165,
    "prompt_tokens_details": {
      "text_tokens": 205,
      "audio_tokens": 0,
      "image_tokens": 0,
      "cached_tokens": 192
    },
    "completion_tokens_details": {
      "reasoning_tokens": 214,
      "audio_tokens": 0,
      "accepted_prediction_tokens": 0,
      "rejected_prediction_tokens": 0
    },
    "num_sources_used": 0
  }
}
```
{% endcode %}

</details>
