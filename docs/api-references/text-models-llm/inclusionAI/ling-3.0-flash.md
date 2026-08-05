# Ling 3.0 Flash

{% columns %}
{% column width="66.66666666666666%" %}
{% hint style="info" %}
This documentation is valid for the following list of our models:

* `inclusionai/ling-3.0-flash`
{% endhint %}
{% endcolumn %}

{% column width="33.33333333333334%" %}
<a href="https://aimlapi.com/app/ling-3.0-flash" class="button primary">Try in Playground</a>
{% endcolumn %}
{% endcolumns %}

## Model Overview

Ling-3.0-flash is available through the AI/ML API.

{% hint style="success" %}
[Create AI/ML API Key](https://aimlapi.com/app/keys)
{% endhint %}

<details>

<summary>How to make the first API call</summary>

{% hint style="success" %}
If you need a more detailed walkthrough for setting up your development environment and making a request step by step — feel free to use our [Quickstart guide](https://docs.aimlapi.com/quickstart/setting-up).
{% endhint %}

</details>

## API Schema

{% openapi-operation spec="ling-3-0-flash" path="/v1/chat/completions" method="post" %}
[OpenAPI ling-3-0-flash](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/text-models-llm/inclusionAI/ling-3.0-flash.json)
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
        "model":"inclusionai/ling-3.0-flash",
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
      model: 'inclusionai/ling-3.0-flash',
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
  "id": "gen-1785930367-Ws6xHsLoXadrCLegs3Z4",
  "object": "chat.completion",
  "created": 1785930367,
  "model": "inclusionai/ling-3.0-flash:free",
  "system_fingerprint": null,
  "service_tier": null,
  "choices": [
    {
      "index": 0,
      "logprobs": null,
      "finish_reason": "stop",
      "native_finish_reason": "stop",
      "message": {
        "role": "assistant",
        "content": "That's a fascinating and deeply broad question! Here are some thoughts:\n\n**The remarkable side of humanity:**\n- **Creativity and curiosity** — We've composed symphonies, painted masterpieces, explored the cosmos, and unlocked the secrets of DNA.\n- **Compassion and cooperation** — Humans have an extraordinary capacity for empathy, altruism, and building communities to support one another.\n- **Resilience** — Throughout history, humanity has endured plagues, wars, natural disasters, and yet continues to rebuild and adapt.\n\n**The challenging side:**\n- **Destructive tendencies** — We've caused immense suffering through conflict, exploitation, and environmental damage.\n- **Inequality** — Despite our resources and knowledge, vast disparities in wealth, opportunity, and justice persist.\n- **Self-awareness paradox** — We're the only species (as far as we know) that fully understands our own mortality, which can lead to both profound wisdom and deep existential anxiety.\n\n**What stands out most** is the tension between our potential and our flaws. Humanity has the capacity for both extraordinary cruelty and extraordinary kindness — often simultaneously. We are the species that can write a beautiful poem *and* wage a devastating war.\n\nUltimately, I think humanity is a work in progress — messy, contradictory, and deeply interesting. The fact that we can even *ask* this question about ourselves is, in itself, remarkable.\n\nWhat's your perspective? I'd love to hear your thoughts! 😊",
        "refusal": null,
        "reasoning": "The user is asking for my opinion about mankind. This is a broad, philosophical question. I should provide a thoughtful, balanced perspective that acknowledges both the achievements and challenges of humanity. I'll aim for a nuanced response that's respectful and engaging.",
        "reasoning_details": [
          {
            "type": "reasoning.text",
            "text": "The user is asking for my opinion about mankind. This is a broad, philosophical question. I should provide a thoughtful, balanced perspective that acknowledges both the achievements and challenges of humanity. I'll aim for a nuanced response that's respectful and engaging.",
            "format": "unknown",
            "index": 0
          }
        ]
      }
    }
  ],
  "usage": {
    "completion_tokens": 364,
    "prompt_tokens": 29,
    "total_tokens": 393,
    "completion_tokens_details": {
      "reasoning_tokens": 69,
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
    "metrics": {
      "duration_ms": 2592,
      "ttft_ms": 2592,
      "tps": 140.43
    }
  }
}
```
{% endcode %}

</details>
