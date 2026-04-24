# DeepSeek V4 Pro

{% columns %}
{% column width="66.66666666666666%" %}
{% hint style="info" %}
This documentation is valid for the following list of our models:

* `deepseek/deepseek-v4-pro`
{% endhint %}
{% endcolumn %}

{% column width="33.33333333333334%" %}
<a href="https://aimlapi.com/app/deepseek/deepseek-v4-pro" class="button primary">Try in Playground</a>
{% endcolumn %}
{% endcolumns %}

## Model Overview

A high-performance reasoning model as of late April 2026, designed for complex tasks, coding, and logic-heavy workflows. It supports up to 1M context length and includes an advanced thinking mode for deeper analysis.

{% hint style="success" %}
[Create AI/ML API Key](https://aimlapi.com/app/keys)
{% endhint %}

<details>

<summary>How to make the first API call</summary>

**1️⃣ Required setup (don’t skip this)**\
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
If you need a more detailed walkthrough for setting up your development environment and making a request step by step — feel free to use our [Quickstart guide](/broken/pages/ngeSCZKxiGVWqYZTHDjY).
{% endhint %}

</details>

## API Schema

{% openapi-operation spec="deepseek-v4-pro" path="/v1/chat/completions" method="post" %}
[OpenAPI deepseek-v4-pro](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/text-models-llm/DeepSeek/deepseek-v4-pro.json)
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
        "model":"deepseek/deepseek-v4-pro",
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
      // insert your AIML API Key instead of <YOUR_AIMLAPI_KEY>
      'Authorization': 'Bearer <YOUR_AIMLAPI_KEY>',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'deepseek/deepseek-v4-pro',
      messages:[
          {
              role:'user',
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
  "id": "b8df8a22-3902-4241-889e-dc1f446e9794",
  "object": "chat.completion",
  "created": 1777066093,
  "model": "deepseek-v4-pro",
  "choices": [
    {
      "index": 0,
      "message": {
        "role": "assistant",
        "content": "That's quite a profound question—and one that philosophers, historians, and storytellers have grappled with for millennia. Since I don't have personal feelings or consciousness, I can't offer a subjective opinion. But I can share a synthesis of how humanity has been viewed through different lenses.\n\nOn one hand, mankind shows extraordinary capacity for **curiosity, creativity, and compassion**. We've decoded the human genome, composed symphonies, built cathedrals, landed on the Moon, and crafted poetry that moves people across centuries. Empathy and altruism—like strangers risking their lives to save others in disasters—remind us of a deep, often quiet, nobility.\n\nOn the other hand, we're a species marked by **contradiction**. The same intelligence that advances medicine also invents weapons of mass destruction. Our tribal instincts, while evolutionarily useful, fuel division, war, and prejudice. And our short-term thinking, often driven by greed or comfort, has pushed the planet toward climate crisis and mass extinction—threatening the very systems we depend on.\n\nPerhaps what's most defining about mankind is not any single trait, but the **tension between our potential and our flaws**. We're a \"work in progress\" — capable of both horrific destruction and breathtaking kindness, often in the same breath. Some thinkers see this as a story of gradual moral enlightenment; others as a cycle of rise and fall.\n\nIn the end, what makes us human might be our constant striving: to know more, to do better, and to find meaning. The future remains unwritten, and that's where choice comes in.",
        "reasoning_content": "We are asked: \"Hi! What do you think about mankind?\" This is a broad philosophical question. As an AI, I don't have personal feelings, but I can provide a balanced analysis. I should consider both positive and negative aspects of humanity, perhaps from various perspectives like historical, ethical, technological, etc. The tone should be neutral and thoughtful. I'll structure a response that acknowledges human achievements and flaws, leaving room for hope."
      },
      "logprobs": null,
      "finish_reason": "stop"
    }
  ],
  "usage": {
    "prompt_tokens": 13,
    "completion_tokens": 416,
    "total_tokens": 429,
    "prompt_tokens_details": {
      "cached_tokens": 0
    },
    "completion_tokens_details": {
      "reasoning_tokens": 89
    },
    "prompt_cache_hit_tokens": 0,
    "prompt_cache_miss_tokens": 13
  },
  "system_fingerprint": "fp_9954b31ca7_prod0820_fp8_kvcache_20260402",
  "meta": {
    "usage": {
      "credits_used": 3824,
      "usd_spent": 0.001912
    }
  }
}
```
{% endcode %}

</details>
