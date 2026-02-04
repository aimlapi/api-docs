# qwen3-vl-32b-instruct

{% columns %}
{% column width="66.66666666666666%" %}
{% hint style="info" %}
This documentation is valid for the following list of our models:

* `alibaba/qwen3-vl-32b-instruct`
{% endhint %}
{% endcolumn %}

{% column width="33.33333333333334%" %}
<a href="https://aimlapi.com/app/alibaba/qwen3-vl-32b-instruct" class="button primary">Try in Playground</a>
{% endcolumn %}
{% endcolumns %}

## Model Overview

The most advanced vision-language model in the Qwen series as of October 2025 — a non-thinking-capable version of the model. Optimized for instruction-following in image description, visual dialogue, and content-generation tasks.

{% hint style="success" %}
[Create AI/ML API Key](https://aimlapi.com/app/keys)
{% endhint %}

<details>

<summary>How to make the first API call</summary>

:digit\_one:  **Required setup (don’t skip this)**\
▪ **Create an account:** Sign up on the AI/ML API website (if you don’t have one yet).\
▪ **Generate an API key:** In your account dashboard, create an API key and make sure it’s **enabled** in the UI.

**2️ Copy the code example**\
At the bottom of this page, pick the snippet for your preferred programming language (Python / Node.js) and copy it into your project.

**3️ Update the snippet for your use case**\
▪ **Insert your API key:** replace `<YOUR_AIMLAPI_KEY>` with your real AI/ML API key.\
▪ **Select a model:** set the `model` field to the model you want to call.\
▪ **Provide input:** fill in the request input field(s) shown in the example (for example, `messages` for chat/LLM models, or other inputs for image/video/audio models).

**4️ (Optional) Tune the request**\
Depending on the model type, you can add optional parameters to control the output (e.g., generation settings, quality, length, etc.). See the API schema below for the full list.

**5️ Run your code**\
Run the updated code in your development environment. Response time depends on the model and request size, but simple requests typically return quickly.

{% hint style="success" %}
If you need a more detailed walkthrough for setting up your development environment and making a request step by step — feel free to use our [Quickstart guide](../../../quickstart/setting-up-old.md).
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
