# qwen3.5-plus

{% columns %}
{% column width="66.66666666666666%" %}
{% hint style="info" %}
This documentation is valid for the following list of our models:

* `alibaba/qwen3.5-plus-20260218`
{% endhint %}
{% endcolumn %}

{% column width="33.33333333333334%" %}
<a href="https://aimlapi.com/app/alibaba/qwen3.5-plus-20260218" class="button primary">Try in Playground</a>
{% endcolumn %}
{% endcolumns %}

## Model Overview

A commercial large language model designed for long-context text generation and enterprise-grade conversational AI. Supports up to 1M tokens per request with production-ready API stability.

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

{% openapi-operation spec="qwen3-5-plus-20260218" path="/v1/chat/completions" method="post" %}
[OpenAPI qwen3-5-plus-20260218](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/text-models-llm/Alibaba-Cloud/qwen3.5-plus-20260218.json)
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
        "model":"alibaba/qwen3.5-plus-20260218",
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
      model: 'alibaba/qwen3.5-plus-20260218',
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
  "choices": [
    {
      "message": {
        "content": "Hello! That's a profound question. As an AI, I don't have personal feelings or beliefs, but I can offer an observation based on the vast amount of human history, literature, and data I've been trained on.\n\nMankind appears to be a study in **contradictions and immense potential**:\n\n*   **Creativity vs. Destruction**: Humans have composed symphonies, built skyscrapers, and decoded the genome, yet they have also waged devastating wars and caused significant environmental harm. This duality seems to be a core part of the human experience.\n*   **Resilience and Adaptability**: Throughout history, humanity has faced plagues, ice ages, and societal collapses, yet consistently found ways to adapt, rebuild, and innovate. The drive to survive and improve conditions is remarkably strong.\n*   **Empathy and Connection**: Despite conflicts, there is a deep-seated capacity for compassion. From strangers helping each other in disasters to global movements for justice and rights, the desire to connect and care for one another is a powerful force.\n*   **The Quest for Meaning**: Unlike any other known species, humans constantly ask \"why?\" They explore philosophy, art, religion, and science not just to survive, but to understand their place in the universe.\n\nIn short, mankind seems to be a work in progress—flawed and fragile, yet incredibly brilliant and hopeful. Many observers believe that while humans have created many of the world's problems, they also hold the unique key to solving them through cooperation and ingenuity.\n\nWhat are your thoughts? Do you feel more optimistic or concerned about where humanity is heading?",
        "role": "assistant"
      },
      "finish_reason": "stop",
      "index": 0,
      "logprobs": null
    }
  ],
  "object": "chat.completion",
  "usage": {
    "prompt_tokens": 21,
    "completion_tokens": 337,
    "total_tokens": 358,
    "completion_tokens_details": {
      "text_tokens": 337
    },
    "prompt_tokens_details": {
      "text_tokens": 21
    }
  },
  "created": 1771967570,
  "system_fingerprint": null,
  "model": "qwen3.5-plus",
  "id": "chatcmpl-f907391c-4f0c-96ed-9058-caa5782daa22",
  "meta": {
    "usage": {
      "credits_used": 2125
    }
  }
}
```
{% endcode %}

</details>
