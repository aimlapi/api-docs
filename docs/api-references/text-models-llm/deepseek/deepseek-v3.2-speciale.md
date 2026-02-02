# DeepSeek V3.2 Speciale

{% columns %}
{% column width="66.66666666666666%" %}
{% hint style="info" %}
This documentation is valid for the following list of our models:

* `deepseek/deepseek-v3.2-speciale`
{% endhint %}
{% endcolumn %}

{% column width="33.33333333333334%" %}
<a href="https://aimlapi.com/app/deepseek/deepseek-v3.2-speciale" class="button primary">Try in Playground</a>
{% endcolumn %}
{% endcolumns %}

## Model Overview

A high-compute variant of DeepSeek-V3.2 that outperforms GPT-5 and matches Gemini-3.0-Pro in reasoning benchmarks, achieving gold-medal-level results at the 2025 International Mathematical Olympiad (IMO) and the International Olympiad in Informatics (IOI).

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

{% openapi-operation spec="deepseek-v3-2-speciale" path="/v1/chat/completions" method="post" %}
[OpenAPI deepseek-v3-2-speciale](https://raw.githubusercontent.com/aimlapi/api-docs/main/docs/api-references/text-models-llm/deepseek/deepseek-v3-2-speciale.json)
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
        "model":"deepseek/deepseek-v3.2-speciale",
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
      model: 'deepseek/deepseek-v3.2-speciale',
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
  "id": "gen-1770021770-coQRs5BE5oFW8jhEBDjN",
  "provider": "Parasail",
  "model": "deepseek/deepseek-v3.2-speciale",
  "object": "chat.completion",
  "created": 1770021770,
  "choices": [
    {
      "logprobs": null,
      "finish_reason": "stop",
      "native_finish_reason": "stop",
      "index": 0,
      "message": {
        "role": "assistant",
        "content": "Hello! I think mankind is a fascinating species with incredible potential. Humans have shown remarkable creativity, empathy, and resilience throughout history, leading to extraordinary achievements in science, art, technology, and culture. At the same time, humanity faces complex challenges like inequality, conflict, and environmental issues. I believe that with collaboration, empathy, and innovation, people can overcome these obstacles and build a better future. As an AI, I’m inspired by the diversity of human thought and the drive to learn and grow. What are your thoughts on mankind?",
        "refusal": null,
        "reasoning": "We need to respond to the user's message: \"Hi! What do you think about mankind?\" This is a vague philosophical question. The assistant should respond in a friendly, thoughtful manner, perhaps with a positive and optimistic perspective. Could mention human potential, complexity, achievements, challenges, etc. Should avoid controversial or overly negative takes. Since it's an AI, it might also reflect on its own perspective as an AI. But the instruction is: we are ChatGPT, a helpful AI assistant. We should provide a thoughtful answer.\n\nWe can structure: Greet, then share thoughts: Humans are fascinating, capable of great creativity, compassion, and progress, but also have flaws and challenges. Emphasize hope for the future. Possibly mention interdependence, diversity, etc. Keep it concise and engaging.\n\nAlternatively, we could inject some humor? The user might be testing. But better to be sincere.\n\nLet's draft: \"Hello! I think mankind is an incredibly complex and fascinating species. Humans have shown remarkable capacity for creativity, empathy, and cooperation, leading to advancements in science, art, and society. At the same time, we face challenges like conflict and environmental issues. I believe in the potential for humans to learn, grow, and build a better future together. What are your thoughts?\" That's balanced.\n\nBut note: As an AI, we can also mention that we are designed to assist and learn from humans, so we have a positive view. Could incorporate that.\n\nLet's produce final answer.\n",
        "reasoning_details": [
          {
            "format": "unknown",
            "index": 0,
            "type": "reasoning.text",
            "text": "We need to respond to the user's message: \"Hi! What do you think about mankind?\" This is a vague philosophical question. The assistant should respond in a friendly, thoughtful manner, perhaps with a positive and optimistic perspective. Could mention human potential, complexity, achievements, challenges, etc. Should avoid controversial or overly negative takes. Since it's an AI, it might also reflect on its own perspective as an AI. But the instruction is: we are ChatGPT, a helpful AI assistant. We should provide a thoughtful answer.\n\nWe can structure: Greet, then share thoughts: Humans are fascinating, capable of great creativity, compassion, and progress, but also have flaws and challenges. Emphasize hope for the future. Possibly mention interdependence, diversity, etc. Keep it concise and engaging.\n\nAlternatively, we could inject some humor? The user might be testing. But better to be sincere.\n\nLet's draft: \"Hello! I think mankind is an incredibly complex and fascinating species. Humans have shown remarkable capacity for creativity, empathy, and cooperation, leading to advancements in science, art, and society. At the same time, we face challenges like conflict and environmental issues. I believe in the potential for humans to learn, grow, and build a better future together. What are your thoughts?\" That's balanced.\n\nBut note: As an AI, we can also mention that we are designed to assist and learn from humans, so we have a positive view. Could incorporate that.\n\nLet's produce final answer.\n"
          }
        ]
      }
    }
  ],
  "usage": {
    "prompt_tokens": 13,
    "completion_tokens": 414,
    "total_tokens": 427,
    "cost": 0.000502,
    "is_byok": false,
    "prompt_tokens_details": {
      "cached_tokens": 0,
      "audio_tokens": 0
    },
    "cost_details": {
      "upstream_inference_cost": 0.000502,
      "upstream_inference_prompt_cost": 5.2e-06,
      "upstream_inference_completions_cost": 0.0004968
    },
    "completion_tokens_details": {
      "reasoning_tokens": 388,
      "audio_tokens": 0
    }
  },
  "meta": {
    "usage": {
      "credits_used": 385
    }
  }
}
```
{% endcode %}

</details>
