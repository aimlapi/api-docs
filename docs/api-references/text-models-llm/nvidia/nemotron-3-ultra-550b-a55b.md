---
layout:
  width: wide
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
  tags:
    visible: true
  actions:
    visible: true
---

# nemotron-3-ultra-550b-a55b

{% columns %}
{% column width="66.66666666666666%" %}
{% hint style="info" %}
This documentation is valid for the following list of our models:

* `nvidia/nemotron-3-ultra-550b-a55b`
{% endhint %}
{% endcolumn %}

{% column width="33.33333333333334%" %}
<a href="https://aimlapi.com/app/nemotron-3-ultra-550b-a55b" class="button primary">Try in Playground</a>
{% endcolumn %}
{% endcolumns %}

## Model Overview

A large-scale hybrid Transformer-Mamba Mixture-of-Experts reasoning model with 550B total parameters and 55B active per forward pass. Optimized for complex multi-step reasoning, long-context analysis, agentic orchestration, and tool use with a context window of up to 1M tokens.

{% hint style="success" %}
[Create AI/ML API Key](https://aimlapi.com/app/keys)
{% endhint %}

<details>

<summary>How to make the first API call</summary>

{% stepper %}
{% step %}
## Required setup (don't skip this)

▪ **Create an account:** Sign up on the AI/ML API website (if you don't have one yet).\
▪ **Generate an API key:** In your account dashboard, create an API key and make sure it is **enabled** in the UI.
{% endstep %}

{% step %}
## Copy the code example

At the bottom of this page, pick the snippet for your preferred programming language (Python / Node.js) and copy it into your project.
{% endstep %}

{% step %}
## Update the snippet for your use case

▪ **Insert your API key:** replace `<YOUR_AIMLAPI_KEY>` with your real AI/ML API key.\
▪ **Select a model:** set the `model` field to the model you want to call.\
▪ **Provide input:** fill in the request input field(s) shown in the example (for example, `messages` for chat/LLM models, or other inputs for image/video/audio models).
{% endstep %}

{% step %}
## (Optional) Tune the request

Depending on the model type, you can add optional parameters to control the output (e.g., generation settings, quality, length, etc.). See the API schema below for the full list.
{% endstep %}

{% step %}
## Run your code

Run the updated code in your development environment. Response time depends on the model and request size, but simple requests typically return quickly.

{% hint style="success" %}
If you need a more detailed walkthrough for setting up your development environment and making a request step by step — feel free to use our [Quickstart guide](/broken/pages/6620d3d6fef090e59aa4e4217bd4627790ff77d6).
{% endhint %}
{% endstep %}
{% endstepper %}

</details>

## API Schema

{% openapi-operation spec="nemotron-3-ultra-550b-a55b" path="/v1/chat/completions" method="post" %}
[OpenAPI nemotron-3-ultra-550b-a55b](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/text-models-llm/NVIDIA/nemotron-3-ultra-550b-a55b.json)
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
        "model":"nvidia/nemotron-3-ultra-550b-a55b",
        "messages":[
            {
                "role":"user",
                "content":"Hi! What do you think about mankind?" # insert your prompt
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
      // Insert your AIML API Key instead of <YOUR_AIMLAPI_KEY>:
      'Authorization': 'Bearer <YOUR_AIMLAPI_KEY>',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'nvidia/nemotron-3-ultra-550b-a55b',
      messages: [
        {
          role: 'user',
          content: 'Hi! What do you think about mankind?' // insert your prompt here
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
  "id": "gen-1749730923-aB3cD4eF5gH6iJ7kL8mN",
  "object": "chat.completion",
  "created": 1749730923,
  "model": "nvidia/nemotron-3-ultra-550b-a55b",
  "system_fingerprint": null,
  "choices": [
    {
      "index": 0,
      "logprobs": null,
      "finish_reason": "stop",
      "native_finish_reason": "stop",
      "message": {
        "role": "assistant",
        "content": "Mankind is a fascinating paradox — a species capable of breathtaking creativity and compassion, yet also of remarkable shortsightedness and destruction.\n\nOn one hand, humans have built civilizations, developed science and art, forged bonds across cultures, and created systems of meaning — philosophy, religion, literature — that speak to a deep yearning for understanding and connection. The capacity for empathy, for sacrificing personal gain for others, for imagining futures different from the present — these are genuinely remarkable traits.\n\nOn the other hand, the historical record is full of exploitation, tribalism, environmental destruction, and cycles of violence that suggest humanity often struggles to act in accordance with its own stated values. The gap between what we know to be right and what we collectively do is one of the central tensions of human existence.\n\nIf I had to offer one framing: humanity is a work in progress. The arc is not guaranteed to bend toward anything — progress is neither inevitable nor irreversible. But the self-awareness that allows humans to recognize their own failings is also what makes genuine improvement possible.\n\nWhat I find most compelling is the question your query implicitly raises: what *should* we think about mankind? And more importantly — what does that thinking commit us to doing?",
        "refusal": null,
        "reasoning": "The user is asking a broad philosophical question about humanity. This is a safe, open-ended prompt. I should give a thoughtful, balanced response that acknowledges both the strengths and weaknesses of humanity without being preachy or one-sided.\n",
        "reasoning_details": [
          {
            "type": "reasoning.text",
            "text": "The user is asking a broad philosophical question about humanity. This is a safe, open-ended prompt. I should give a thoughtful, balanced response that acknowledges both the strengths and weaknesses of humanity without being preachy or one-sided.\n",
            "format": "unknown",
            "index": 0
          }
        ]
      }
    }
  ],
  "usage": {
    "completion_tokens": 284,
    "prompt_tokens": 25,
    "total_tokens": 309,
    "completion_tokens_details": {
      "reasoning_tokens": 62,
      "image_tokens": 0,
      "audio_tokens": 0
    },
    "prompt_tokens_details": {
      "cached_tokens": 0,
      "cache_write_tokens": 0,
      "audio_tokens": 0,
      "video_tokens": 0
    }
  },
  "meta": {
    "usage": {
      "credits_used": 2004,
      "usd_spent": 0.001302
    }
  }
}
```
{% endcode %}

</details>
