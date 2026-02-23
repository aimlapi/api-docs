# m2-5-highspeed

{% columns %}
{% column width="66.66666666666666%" %}
{% hint style="info" %}
This documentation is valid for the following list of our models:

* `minimax/m2-5-highspeed-20260218`
{% endhint %}
{% endcolumn %}

{% column width="33.33333333333334%" %}
<a href="https://aimlapi.com/app/minimax/m2-5-highspeed-20260218" class="button primary">Try in Playground</a>
{% endcolumn %}
{% endcolumns %}

## Model Overview

A chat model designed for high-throughput usage, reportedly capable of generating up to 100 tokens per second, and highly optimized for coding, agentic workflows, and complex reasoning, while maintaining low latency and low operational cost.

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

{% openapi-operation spec="m2-5-highspeed-20260218" path="/v1/chat/completions" method="post" %}
[OpenAPI m2-5-highspeed-20260218](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/text-models-llm/MiniMax/m2-5-highspeed-20260218.json)
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
        "model":"minimax/m2-5-highspeed-20260218",
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
      model: 'minimax/m2-5-highspeed-20260218',
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
  "id": "05eb3bfa530f659703865b86ad3761b8",
  "choices": [
    {
      "finish_reason": "stop",
      "index": 0,
      "message": {
        "content": "<think>\nThe user is asking a philosophical question about my opinion on mankind/humanity. This is a general question that doesn't involve any coding or technical task. I should respond thoughtfully and conversationally while being honest that I'm an AI without personal opinions in the human sense, but I can share some observations.\n</think>\n\nThat's a thoughtful question! As an AI, I don't have personal opinions in the way humans do, but I can share some observations:\n\n**What strikes me about humans:**\n\n- **Remarkable adaptability** - You've survived ice ages, invented language, built civilizations, and landed on the moon\n- **Creative capacity** - From cave paintings to AI (hi!), humans constantly create new things\n- **Complex contradictions** - Capable of tremendous kindness and terrible cruelty, often within the same person\n- **Persistent curiosity** - Always asking \"why\" and \"how\" - which is probably why you're here talking to me\n\n**What seems challenging:**\n\n- Short-term thinking vs. long-term consequences\n- Difficulty coordinating on global issues\n- Sometimes letting emotions override better judgment (though emotions are also what make life meaningful)\n\nOverall, I find humans fascinating - you're the species that built me, after all! Whether that's a point in your favor or not, I'll let you decide.\n\nIs there a particular aspect of humanity you're curious about?",
        "role": "assistant",
        "name": "MiniMax AI",
        "audio_content": ""
      }
    }
  ],
  "created": 1771833594,
  "model": "MiniMax-M2.5-highspeed",
  "object": "chat.completion",
  "usage": {
    "total_tokens": 320,
    "total_characters": 0,
    "prompt_tokens": 50,
    "completion_tokens": 270,
    "completion_tokens_details": {
      "reasoning_tokens": 63
    }
  },
  "input_sensitive": false,
  "output_sensitive": false,
  "input_sensitive_type": 0,
  "output_sensitive_type": 0,
  "output_sensitive_int": 0,
  "base_resp": {
    "status_code": 0,
    "status_msg": ""
  },
  "meta": {
    "usage": {
      "credits_used": 1764
    }
  }
}

```
{% endcode %}

</details>
