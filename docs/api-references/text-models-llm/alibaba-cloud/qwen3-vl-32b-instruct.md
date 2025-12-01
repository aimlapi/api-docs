# qwen3-vl-32b-instruct

{% columns %}
{% column width="66.66666666666666%" %}
{% hint style="info" %}
This documentation is valid for the following list of our models:

* `alibaba/qwen3-vl-32b-instruct`
{% endhint %}
{% endcolumn %}

{% column width="33.33333333333334%" %}
<a href="https://aimlapi.com/app/?model=alibaba/qwen3-vl-32b-instruct&#x26;mode=chat" class="button primary">Try in Playground</a>
{% endcolumn %}
{% endcolumns %}

## Model Overview

The most advanced vision-language model in the Qwen series as of October 2025 — a non-thinking-capable version of the model. Optimized for instruction-following in image description, visual dialogue, and content-generation tasks.

## How to Make a Call

<details>

<summary>Step-by-Step Instructions</summary>

:digit\_one: **Setup You Can’t Skip**

:black\_small\_square: [**Create an Account**](https://aimlapi.com/app/sign-up): Visit the AI/ML API website and create an account (if you don’t have one yet).\
:black\_small\_square: [**Generate an API Key**](https://aimlapi.com/app/keys): After logging in, navigate to your account dashboard and generate your API key. Ensure that key is enabled on UI.

:digit\_two: **Copy the code example**

At the bottom of this page, you'll find [a code example](qwen3-vl-32b-instruct.md#code-example) that shows how to structure the request. Choose the code snippet in your preferred programming language and copy it into your development environment.

:digit\_three: **Modify the code example**

:black\_small\_square: Replace `<YOUR_AIMLAPI_KEY>` with your actual AI/ML API key from your account.\
:black\_small\_square: Insert your question or request into the `content` field—this is what the model will respond to.

:digit\_four: <sup><sub><mark style="background-color:yellow;">**(Optional)**<mark style="background-color:yellow;"><sub></sup>**&#x20;Adjust other optional parameters if needed**

Only `model` and `messages` are required parameters for this model (and we’ve already filled them in for you in the example), but you can include optional parameters if needed to adjust the model’s behavior. Below, you can find the corresponding [API schema](qwen3-vl-32b-instruct.md#api-schema), which lists all available parameters along with notes on how to use them.

:digit\_five: **Run your modified code**

Run your modified code in your development environment. Response time depends on various factors, but for simple prompts it rarely exceeds a few seconds.

{% hint style="success" %}
If you need a more detailed walkthrough for setting up your development environment and making a request step by step — feel free to use our [Quickstart guide](../../../quickstart/setting-up.md).
{% endhint %}

</details>

## API Schema

{% openapi-operation spec="qwen3-vl-32b-instruct" path="/v1/chat/completions" method="post" %}
[OpenAPI qwen3-vl-32b-instruct](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/text-models-llm/Alibaba-Cloud/qwen3-vl-32b-instruct.json)
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
        "model":"alibaba/qwen3-vl-32b-instruct",
        "messages":[
            {
                # Insert your question for the model here:
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
      model: 'alibaba/qwen3-vl-32b-instruct',
      messages:[
          {
              role:'user',
              // Insert your question for the model here:
              content:'Hi! What do you think about mankind?'
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
  "choices": [
    {
      "message": {
        "content": "Hi! 😊 That’s a beautiful and deep question — one that philosophers, scientists, artists, and everyday people have been asking for centuries.\n\nI think mankind is *remarkably complex* — full of contradictions, potential, and wonder. On one hand, we’ve achieved incredible things: we’ve explored space, cured diseases, created art that moves souls, built cities that rise into the sky, and connected across continents in ways unimaginable just a century ago. We’re capable of profound kindness, empathy, creativity, and courage.\n\nOn the other hand, we’ve also caused immense suffering — through war, injustice, environmental destruction, and indifference to each other’s pain. We often struggle with our own flaws: fear, greed, ego, and short-sightedness.\n\nBut here’s what gives me hope: **we’re also capable of change**. We can learn from our mistakes. We can choose compassion over conflict, cooperation over competition. Every act of kindness, every effort to understand another, every step toward justice — these are signs that humanity is not defined by its worst impulses, but by its capacity to grow.\n\nSo, I’d say:  \n➡️ Mankind is flawed, yes — but also deeply hopeful.  \n➡️ We’re messy, but we’re trying.  \n➡️ We make mistakes, but we can also heal, create, and love.\n\nAnd perhaps most importantly — **we’re not alone in this journey**. We’re all part of something bigger, and together, we have the power to shape a better future.\n\nWhat about you? How do *you* see mankind? 💬✨",
        "role": "assistant"
      },
      "finish_reason": "stop",
      "index": 0,
      "logprobs": null
    }
  ],
  "object": "chat.completion",
  "usage": {
    "prompt_tokens": 17,
    "completion_tokens": 329,
    "total_tokens": 346,
    "prompt_tokens_details": {
      "text_tokens": 17
    },
    "completion_tokens_details": {
      "text_tokens": 329
    }
  },
  "created": 1764625045,
  "system_fingerprint": null,
  "model": "qwen3-vl-32b-instruct",
  "id": "chatcmpl-a12ab46a-3541-93a8-8180-280ecadbb795",
  "meta": {
    "usage": {
      "tokens_used": 1960
    }
  }
}
```
{% endcode %}

</details>
