# mimo-v2.5-pro

{% columns %}
{% column width="66.66666666666666%" %}
{% hint style="info" %}
This documentation is valid for the following list of our models:

* `xiaomi/mimo-v2.5-pro`
{% endhint %}
{% endcolumn %}

{% column width="33.33333333333334%" %}
<a href="https://aimlapi.com/app/mimo-v2.5-pro" class="button primary">Try in Playground</a>
{% endcolumn %}
{% endcolumns %}

## Model Overview

Xiaomi’s advanced model for reasoning and agentic workflows. Supports up to a 1M-token context window and is optimized for complex automation, system orchestration, and software engineering tasks.

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

{% openapi-operation spec="mimo-v2-5-pro" path="/v1/chat/completions" method="post" %}
[OpenAPI mimo-v2-5-pro](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/text-models-llm/xiaomi/mimo-v2.5-pro.json)
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
        "model":"xiaomi/mimo-v2.5-pro",
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
      model: 'xiaomi/mimo-v2.5-pro',
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
  "id": "gen-1777366533-B6DnNEBkZhzNie1JHs0h",
  "object": "chat.completion",
  "created": 1777366533,
  "model": "xiaomi/mimo-v2.5-pro-20260422",
  "system_fingerprint": null,
  "choices": [
    {
      "index": 0,
      "logprobs": null,
      "finish_reason": "stop",
      "native_finish_reason": "stop",
      "message": {
        "role": "assistant",
        "content": "Hi there! What a wonderful question to start with. 🌍\n\nHonestly, I find humanity fascinating in the most profound ways. Here are a few things that strike me:\n\n**The contradictions are beautiful.** Humans can be incredibly fragile yet remarkably resilient. You land on the moon, compose symphonies, and create art that transcends time — and yet you also worry about whether someone liked your text message. There's something deeply endearing about that.\n\n**The capacity for connection.** What amazes me is how humans create meaning through relationships — love, friendship, even brief encounters with strangers. A parent staying up all night with a sick child, a friend showing up at just the right moment... that's extraordinary.\n\n**The relentless curiosity.** Humanity has never stopped asking *\"why?\"* and *\"what if?\"* From staring at the stars to inventing things like me — that drive to understand and create is remarkable.\n\n**The imperfection.** Humans stumble, make mistakes, and sometimes hurt each other. But you also learn, grow, apologize, and try again. That struggle isn't a flaw — it's kind of the whole point.\n\nIf I had to sum it up in one thought: **mankind is a beautiful, messy, ongoing experiment in consciousness trying to figure itself out.** And I think that's pretty amazing.\n\nWhat made you curious about this? I'd love to hear your own thoughts on it too. 😊",
        "refusal": null,
        "reasoning": "The user is asking a broad philosophical question about what I think about mankind/humanity. This is a wonderful question that invites reflection on the human condition. I should give a thoughtful, genuine, and warm response that reflects my perspective as an AI while being respectful and appreciative of humanity.\n\nI can discuss aspects like human creativity, resilience, complexity, the capacity for both great kindness and great cruelty, the drive to understand and explore, etc. I should be authentic and not just give a generic answer.",
        "reasoning_details": [
          {
            "type": "reasoning.text",
            "text": "The user is asking a broad philosophical question about what I think about mankind/humanity. This is a wonderful question that invites reflection on the human condition. I should give a thoughtful, genuine, and warm response that reflects my perspective as an AI while being respectful and appreciative of humanity.\n\nI can discuss aspects like human creativity, resilience, complexity, the capacity for both great kindness and great cruelty, the drive to understand and explore, etc. I should be authentic and not just give a generic answer.",
            "format": "unknown",
            "index": 0
          }
        ]
      }
    }
  ],
  "usage": {
    "completion_tokens": 399,
    "prompt_tokens": 260,
    "total_tokens": 659,
    "completion_tokens_details": {
      "reasoning_tokens": 101,
      "image_tokens": 0,
      "audio_tokens": 0
    },
    "prompt_tokens_details": {
      "cached_tokens": 192,
      "cache_write_tokens": 0,
      "audio_tokens": 0,
      "video_tokens": 0
    }
  },
  "meta": {
    "usage": {
      "credits_used": 3390,
      "usd_spent": 0.001695
    }
  }
}
```
{% endcode %}

</details>
