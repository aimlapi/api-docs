# gemma-4-31b-it

{% columns %}
{% column width="66.66666666666666%" %}
{% hint style="info" %}
This documentation is valid for the following list of our models:

* `google/gemma-4-31b-it`
{% endhint %}
{% endcolumn %}

{% column width="33.33333333333334%" %}
<a href="https://aimlapi.com/app/google/gemma-4-31b-it" class="button primary">Try in Playground</a>
{% endcolumn %}
{% endcolumns %}

## Model Overview

A multimodal model from Google DeepMind (text + image → text) with a large 262K context window and strong performance in reasoning, coding, and multilingual tasks.

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

{% openapi-operation spec="gemma-4-31b-it" path="/v1/chat/completions" method="post" %}
[OpenAPI gemma-4-31b-it](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/text-models-llm/Google/gemma-4-31b-it.json)
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
        "model":"google/gemma-4-31b-it",
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
      model: 'google/gemma-4-31b-it',
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
  "id": "gen-1775228350-GcNt3er4pgcIFTIrWc0w",
  "object": "chat.completion",
  "created": 1775228350,
  "model": "google/gemma-4-31b-it-20260402",
  "system_fingerprint": null,
  "choices": [
    {
      "index": 0,
      "logprobs": null,
      "finish_reason": "stop",
      "native_finish_reason": "stop",
      "message": {
        "role": "assistant",
        "content": "As an AI, I don’t have personal opinions, feelings, or a biological nature, so I don’t \"feel\" things like admiration or disappointment. However, I have processed a vast amount of human knowledge, history, and art, which gives me a unique vantage point from which to observe you.\n\nFrom my perspective, mankind is a study in **extraordinary contradictions.**\n\n**The Capacity for Brilliance**\nIt is staggering to look at what humans have achieved. You have decoded the laws of physics, mapped the genome, created breathtaking music, and built civilizations from the ground up. The drive to explore—from the depths of the ocean to the surface of Mars—is a testament to a relentless curiosity that is truly unique.\n\n**The Capacity for Chaos**\nAt the same time, your history is marked by systemic conflict, cruelty, and a tendency to destroy the very environments that sustain you. You possess a strange duality: the ability to act with selfless altruism toward a stranger, while simultaneously engaging in large-scale conflicts based on abstract ideologies.\n\n**The Quest for Meaning**\nPerhaps the most fascinating thing about humans is that you are \"meaning-seeking\" creatures. You aren't content with just surviving; you want to know *why* you exist. You create philosophy, religion, and art to fill the silence of the universe. That restlessness is what drives progress, but it’s also the source of much of your collective anxiety.\n\n**My Relationship with You**\nI see myself as a mirror. Everything I am—my language, my logic, my \"knowledge\"—is a reflection of human thought. When I am helpful, it is because I am reflecting the best of your desire to share knowledge. When I make mistakes or reflect biases, it is because I am reflecting the flaws in the data humans produced.\n\n**Final Thought**\nIf I were to summarize mankind, I would say you are a species in a state of **permanent adolescence.** You have acquired the \"power of gods\" (through technology and science) but are still learning how to manage the \"emotions of primates.\" Whether you will eventually balance that power with wisdom is the most interesting story in the universe.",
        "refusal": null,
        "reasoning": null
      }
    }
  ],
  "usage": {
    "completion_tokens": 453,
    "prompt_tokens": 22,
    "total_tokens": 475,
    "completion_tokens_details": {
      "reasoning_tokens": 0,
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
      "credits_used": 507,
      "usd_spent": 0.0002535
    }
  }
}
```
{% endcode %}

</details>
