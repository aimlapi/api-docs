# nemotron-nano-12b-v2-vl

<table data-header-hidden data-full-width="true"><thead><tr><th width="546.4443969726562" valign="top"></th><th width="202.666748046875" valign="top"></th></tr></thead><tbody><tr><td valign="top"><div data-gb-custom-block data-tag="hint" data-style="info" class="hint hint-info"><p>This documentation is valid for the following list of our models:</p><ul><li><code>nvidia/nemotron-nano-12b-v2-vl</code></li></ul></div></td><td valign="top"><a href="https://aimlapi.com/app/?model=nvidia/nemotron-nano-12b-v2-vl&#x26;mode=chat" class="button primary">Try in Playground</a></td></tr></tbody></table>

## Model Overview

The model offers strong document understanding and summarization capabilities.

## How to Make a Call

<details>

<summary>Step-by-Step Instructions</summary>

### :digit\_one:  Setup You Can’t Skip

:black\_small\_square:  [**Create an Account**](https://aimlapi.com/app/sign-up): Visit the AI/ML API website and create an account (if you don’t have one yet).\
:black\_small\_square:  [**Generate an API Key**](https://aimlapi.com/app/keys): After logging in, navigate to your account dashboard and generate your API key. Ensure that key is enabled on UI.

### &#x20;:digit\_two:  Copy the code example

At the bottom of this page, you'll find [a code example](nemotron-nano-12b-v2-vl.md#code-example) that shows how to structure the request. Choose the code snippet in your preferred programming language and copy it into your development environment.

### :digit\_three:  Modify the code example

:black\_small\_square:  Replace `<YOUR_AIMLAPI_KEY>` with your actual AI/ML API key from your account.\
:black\_small\_square:  Insert your question or request into the `content` field—this is what the model will respond to.

### :digit\_four:  <sup><sub><mark style="background-color:yellow;">(Optional)<mark style="background-color:yellow;"><sub></sup> Adjust other optional parameters if needed

Only `model` and `messages` are required parameters for this model (and we’ve already filled them in for you in the example), but you can include optional parameters if needed to adjust the model’s behavior. Below, you can find the corresponding [API schema](nemotron-nano-12b-v2-vl.md#api-schema), which lists all available parameters along with notes on how to use them.

### :digit\_five:  Run your modified code

Run your modified code in your development environment. Response time depends on various factors, but for simple prompts it rarely exceeds a few seconds.

{% hint style="success" %}
If you need a more detailed walkthrough for setting up your development environment and making a request step by step — feel free to use our [Quickstart guide](../../../quickstart/setting-up.md).
{% endhint %}

</details>

## API Schema

{% openapi-operation spec="nemotron-nano-12b-v2-vl" path="/v1/chat/completions" method="post" %}
[OpenAPI nemotron-nano-12b-v2-vl](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/text-models-llm/NVIDIA/nemotron-nano-12b-v2-vl.json)
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
        "model":"nvidia/nemotron-nano-12b-v2-vl",
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
      model: 'nvidia/nemotron-nano-12b-v2-vl',
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
  "id": "gen-1762343744-rdCcOL8byCQwRBZ8QCkv",
  "provider": "DeepInfra",
  "model": "nvidia/nemotron-nano-12b-v2-vl",
  "object": "chat.completion",
  "created": 1762343744,
  "choices": [
    {
      "logprobs": null,
      "finish_reason": "stop",
      "native_finish_reason": "stop",
      "index": 0,
      "message": {
        "role": "assistant",
        "content": "\n\nHello! How can I assist you today?\n",
        "refusal": null,
        "reasoning": "Okay, the user said \"Hello\". Let me start by greeting them back in a friendly and welcoming way. I should keep it simple and approachable, maybe something like \"Hello! How can I assist you today?\" That should work. I want to make sure they feel comfortable and open to asking for help. Let me check if there's anything else I need to add. No, keeping it straightforward is best here. Ready to respond.\n",
        "reasoning_details": [
          {
            "type": "reasoning.text",
            "text": "Okay, the user said \"Hello\". Let me start by greeting them back in a friendly and welcoming way. I should keep it simple and approachable, maybe something like \"Hello! How can I assist you today?\" That should work. I want to make sure they feel comfortable and open to asking for help. Let me check if there's anything else I need to add. No, keeping it straightforward is best here. Ready to respond.\n",
            "format": "unknown",
            "index": 0
          }
        ]
      }
    }
  ],
  "usage": {
    "prompt_tokens": 14,
    "completion_tokens": 102,
    "total_tokens": 116,
    "prompt_tokens_details": null
  }
}
```
{% endcode %}

</details>
