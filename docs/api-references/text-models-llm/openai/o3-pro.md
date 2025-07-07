---
layout:
  width: default
  title:
    visible: true
  description:
    visible: false
  tableOfContents:
    visible: true
  outline:
    visible: true
  pagination:
    visible: true
---

# o3-pro

{% hint style="info" %}
This documentation is valid for the following list of our models:

* `openai/o3-pro`
{% endhint %}

## Model Overview

Designed for deeper reasoning and tougher questions, o3-pro uses more compute to deliver higher-quality answers. It’s only available in the /responses API, which supports multi-turn model interactions and will enable more advanced features in the future. Some complex requests may take a few minutes.

## How to Make a Call

<details>

<summary>Step-by-Step Instructions</summary>

### :digit\_one:  Setup You Can’t Skip

:black\_small\_square:  [**Create an Account**](https://aimlapi.com/app/sign-up): Visit the AI/ML API website and create an account (if you don’t have one yet).\
:black\_small\_square:  [**Generate an API Key**](https://aimlapi.com/app/keys): After logging in, navigate to your account dashboard and generate your API key. Ensure that key is enabled on UI.

### &#x20;:digit\_two:  Copy the code example

At the bottom of this page, you'll find [a code example](o3-pro.md#code-example) that shows how to structure the request. Choose the code snippet in your preferred programming language and copy it into your development environment.

### :digit\_three:  Modify the code example

:black\_small\_square:  Replace `<YOUR_AIMLAPI_KEY>` with your actual AI/ML API key from your account.\
:black\_small\_square:  Insert your question or request into the `input` field—this is what the model will respond to.

### :digit\_four:  <sup><sub><mark style="background-color:yellow;">(Optional)<mark style="background-color:yellow;"><sub></sup> Adjust other optional parameters if needed

Only `model` and `input` are required parameters for this model (and we’ve already filled them in for you in the example), but you can include optional parameters if needed to adjust the model’s behavior. Below, you can find the corresponding [API schema](o3-pro.md#api-schema), which lists all available parameters along with notes on how to use them.

### :digit\_five:  Run your modified code

Run your modified code in your development environment. Response time depends on various factors, but for simple prompts it rarely exceeds a few seconds.

{% hint style="success" %}
If you need a more detailed walkthrough for setting up your development environment and making a request step by step — feel free to use our [Quickstart guide](../../../quickstart/setting-up.md).
{% endhint %}

</details>

## API Schema

{% hint style="warning" %}
**Note:** This model can ONLY be called via the **`/responses`** endpoint!
{% endhint %}

{% openapi-operation spec="o3-pro-response" path="/v1/responses" method="post" %}
[OpenAPI o3-pro-response](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/text-models-llm/OpenAI/o3-pro.json)
{% endopenapi-operation %}

## Code Example

{% tabs %}
{% tab title="Python" %}
{% code overflow="wrap" %}
```python
import requests
import json   # for getting a structured output with indentation

response = requests.post(
    "https://api.aimlapi.com/v1/responses",
    headers={
        "Content-Type":"application/json", 

        # Insert your AIML API Key instead of <YOUR_AIMLAPI_KEY>:
        "Authorization":"Bearer <YOUR_AIMLAPI_KEY>",
        "Content-Type":"application/json"
    },
    json={
        "model":"openai/o3-pro",
        "input":"Hello"  # Insert your question for the model here, instead of Hello   
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
  try {
    const response = await fetch('https://api.aimlapi.com/v1/responses', {
      method: 'POST',
      headers: {
        // Insert your AIML API Key instead of <YOUR_AIMLAPI_KEY>
        'Authorization': 'Bearer <YOUR_AIMLAPI_KEY>',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'openai/o3-pro',
        input: 'Hello',  // Insert your question here, instead of Hello 
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status ${response.status}`);
    }

    const data = await response.json();
    console.log(JSON.stringify(data, null, 2));

  } catch (error) {
    console.error('Error', error);
  }
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
  "id": "resp_686ba45ce63481a2a4b1fad55d2bea8102a1cc22f1a1bcf1",
  "object": "response",
  "created_at": 1751884892,
  "error": null,
  "incomplete_details": null,
  "instructions": null,
  "max_output_tokens": 512,
  "model": "o3-pro-2025-06-10",
  "output": [
    {
      "id": "rs_686ba463d18481a29dde85cfd7b055bf02a1cc22f1a1bcf1",
      "type": "reasoning",
      "summary": []
    },
    {
      "id": "msg_686ba463d4e081a2b2e2aff962ab00f702a1cc22f1a1bcf1",
      "type": "message",
      "status": "in_progress",
      "content": [
        {
          "type": "output_text",
          "annotations": [],
          "logprobs": [],
          "text": "Hello! How can I help you today?"
        }
      ],
      "role": "assistant"
    }
  ],
  "parallel_tool_calls": true,
  "previous_response_id": null,
  "reasoning": {
    "effort": "medium",
    "summary": null
  },
  "temperature": 1,
  "text": {
    "format": {
      "type": "text"
    }
  },
  "tool_choice": "auto",
  "tools": [],
  "top_p": 1,
  "truncation": "disabled",
  "usage": {
    "input_tokens": 294,
    "input_tokens_details": {
      "cached_tokens": 0
    },
    "output_tokens": 2520,
    "output_tokens_details": {
      "reasoning_tokens": 0
    },
    "total_tokens": 2814
  },
  "metadata": {},
  "output_text": "Hello! How can I help you today?"
}
```
{% endcode %}

</details>
