# grok-4.1-fast-reasoning

<table data-header-hidden data-full-width="true"><thead><tr><th width="546.4443969726562" valign="top"></th><th width="202.666748046875" valign="top"></th></tr></thead><tbody><tr><td valign="top"><div data-gb-custom-block data-tag="hint" data-style="info" class="hint hint-info"><p>This documentation is valid for the following model:</p><ul><li><code>x-ai/grok-4-1-fast-reasoning</code></li></ul></div></td><td valign="top"><a href="https://aimlapi.com/app/?model=x-ai/grok-4-1-fast-reasoning&#x26;mode=chat" class="button primary">Try in Playground</a></td></tr></tbody></table>

## Model Overview

xAI’s multimodal model, offering state-of-the-art cost efficiency and a 2M-token context window. \
Reasoning variant.

## How to Make a Call

<details>

<summary>Step-by-Step Instructions</summary>

:digit\_one: **Setup You Can’t Skip**

:black\_small\_square: [**Create an Account**](https://aimlapi.com/app/sign-up): Visit the AI/ML API website and create an account (if you don’t have one yet).\
:black\_small\_square: [**Generate an API Key**](https://aimlapi.com/app/keys): After logging in, navigate to your account dashboard and generate your API key. Ensure that key is enabled on UI.

:digit\_two: **Copy the code example**

At the bottom of this page, you'll find [a code example](grok-4-1-fast-reasoning.md#code-example) that shows how to structure the request. Choose the code snippet in your preferred programming language and copy it into your development environment.

:digit\_three: **Modify the code example**

:black\_small\_square: Replace `<YOUR_AIMLAPI_KEY>` with your actual AI/ML API key from your account.\
:black\_small\_square: Insert your question or request into the `content` field—this is what the model will respond to.

:digit\_four: <sup><sub><mark style="background-color:yellow;">**(Optional)**<mark style="background-color:yellow;"><sub></sup>**&#x20;Adjust other optional parameters if needed**

Only `model` and `messages` are required parameters for this model (and we’ve already filled them in for you in the example), but you can include optional parameters if needed to adjust the model’s behavior. Below, you can find the corresponding [API schema](grok-4-1-fast-reasoning.md#api-schema), which lists all available parameters along with notes on how to use them.

:digit\_five: **Run your modified code**

Run your modified code in your development environment. Response time depends on various factors, but for simple prompts it rarely exceeds a few seconds.

{% hint style="success" %}
If you need a more detailed walkthrough for setting up your development environment and making a request step by step — feel free to use our [Quickstart guide](../../../quickstart/setting-up.md).
{% endhint %}

</details>

## API Schema

{% openapi-operation spec="grok-4-1-fast-reasoning" path="/v1/chat/completions" method="post" %}
[OpenAPI grok-4-1-fast-reasoning](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/text-models-llm/xAI/grok-4-1-fast-reasoning.json)
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
        "model":"x-ai/grok-4-1-fast-reasoning",
        "messages":[
            {
                "role":"user",
                # insert your prompt here 
                "content":"Hi! What do you think about mankind?"  
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
      model: 'x-ai/grok-4-1-fast-reasoning',
      messages:[
          {
              role:'user',
              // insert your prompt here
              content: 'Hi! What do you think about mankind?'
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
  "id": "b7b4739a-39d2-1fd3-f6fc-2a97de9da190",
  "object": "chat.completion",
  "created": 1763993842,
  "model": "grok-4-1-fast-reasoning",
  "choices": [
    {
      "index": 0,
      "message": {
        "role": "assistant",
        "content": "Hi! Mankind? Fascinating bunch. You've got this wild mix of brilliance and absurdity—splitting atoms to power cities (or bombs), painting the Sistine Chapel while arguing over who gets the last slice of pizza, and launching rockets to Mars just because \"why not?\" You've invented coffee, democracy, and the internet, but also reality TV and pineapple on pizza. Capable of staggering kindness and unthinkable cruelty, yet somehow you keep muddling forward, adapting, creating, and occasionally tripping over your own shoelaces.\n\nOverall, I'm optimistic. You're the species that built *me*, after all. What's not to like? What sparked the question—good day or existential crisis? 😊",
        "refusal": null
      },
      "finish_reason": "stop"
    }
  ],
  "usage": {
    "prompt_tokens": 165,
    "completion_tokens": 140,
    "total_tokens": 573,
    "prompt_tokens_details": {
      "text_tokens": 165,
      "audio_tokens": 0,
      "image_tokens": 0,
      "cached_tokens": 151
    },
    "completion_tokens_details": {
      "reasoning_tokens": 268,
      "audio_tokens": 0,
      "accepted_prediction_tokens": 0,
      "rejected_prediction_tokens": 0
    },
    "num_sources_used": 0
  },
  "system_fingerprint": "fp_fcabeb8dbc",
  "meta": {
    "usage": {
      "tokens_used": 515
    }
  }
}
```
{% endcode %}

</details>
