---
layout:
  width: default
  title:
    visible: true
  description:
    visible: true
  tableOfContents:
    visible: true
  outline:
    visible: true
  pagination:
    visible: true
  metadata:
    visible: true
---

# gemini-2.5-flash-lite-preview

<table data-header-hidden data-full-width="true"><thead><tr><th width="546.4443969726562" valign="top"></th><th width="202.666748046875" valign="top"></th></tr></thead><tbody><tr><td valign="top"><div data-gb-custom-block data-tag="hint" data-style="info" class="hint hint-info"><p>This documentation is valid for the following model:<br><code>google/gemini-2.5-flash-lite-preview</code></p></div></td><td valign="top"><a href="https://aimlapi.com/app/google/gemini-2-5-flash-lite-preview" class="button primary">Try in Playground</a></td></tr></tbody></table>

## Model Overview

The model excels at high-volume, latency-sensitive tasks like translation and classification.

## How to Make a Call

<details>

<summary>Step-by-Step Instructions</summary>

#### :digit\_one: Setup You Can’t Skip

:black\_small\_square: [**Create an Account**](https://aimlapi.com/app/sign-up): Visit the AI/ML API website and create an account (if you don’t have one yet).\
:black\_small\_square: [**Generate an API Key**](https://aimlapi.com/app/keys): After logging in, navigate to your account dashboard and generate your API key. Ensure that key is enabled on UI.

#### :digit\_two: Copy the code example

At the bottom of this page, you'll find [a code example](gemini-2.5-flash-lite-preview.md#code-example) that shows how to structure the request. Choose the code snippet in your preferred programming language and copy it into your development environment.

#### :digit\_three: Modify the code example

:black\_small\_square: Replace `<YOUR_AIMLAPI_KEY>` with your actual AI/ML API key from your account.\
:black\_small\_square: Insert your question or request into the `content` field—this is what the model will respond to.

#### :digit\_four: <sup><sub><mark style="background-color:yellow;">(Optional)<mark style="background-color:yellow;"><sub></sup> Adjust other optional parameters if needed

Only `model` and `messages` are required parameters for this model (and we’ve already filled them in for you in the example), but you can include optional parameters if needed to adjust the model’s behavior. Below, you can find the corresponding [API schema](gemini-2.5-flash-lite-preview.md#api-schema), which lists all available parameters along with notes on how to use them.

#### :digit\_five: Run your modified code

Run your modified code in your development environment. Response time depends on various factors, but for simple prompts it rarely exceeds a few seconds.

{% hint style="success" %}
If you need a more detailed walkthrough for setting up your development environment and making a request step by step — feel free to use our [Quickstart guide](../../../quickstart/setting-up.md).
{% endhint %}

</details>

## API Schema

{% openapi-operation spec="gemini-2-5-flash-lite-preview" path="/v1/chat/completions" method="post" %}
[OpenAPI gemini-2-5-flash-lite-preview](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/text-models-llm/Google/gemini-2.5-flash-lite-preview.json)
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
        "model":"google/gemini-2.5-flash-lite-preview",
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
      model: 'google/gemini-2.5-flash-lite-preview',
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
  "id": "gen-1752482994-9LhqM48PhAmhiRTtl2ys",
  "object": "chat.completion",
  "choices": [
    {
      "index": 0,
      "finish_reason": "stop",
      "logprobs": null,
      "message": {
        "role": "assistant",
        "content": "Hello there! How can I help you today?",
        "reasoning_content": null,
        "refusal": null
      }
    }
  ],
  "created": 1752482994,
  "model": "google/gemini-2.5-flash-lite-preview-06-17",
  "usage": {
    "prompt_tokens": 0,
    "completion_tokens": 9,
    "total_tokens": 9
  }
}
```
{% endcode %}

</details>
