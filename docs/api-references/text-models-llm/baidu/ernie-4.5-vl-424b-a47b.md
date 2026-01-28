# ernie-4.5-vl-424b-a47b

{% columns %}
{% column width="66.66666666666666%" %}
{% hint style="info" %}
This documentation is valid for the following list of our models:

* `baidu/ernie-4.5-vl-424b-a47b`
{% endhint %}
{% endcolumn %}

{% column width="33.33333333333334%" %}
<a href="https://aimlapi.com/app/baidu/ernie-4-5-vl-424b-a47b" class="button primary">Try in Playground</a>
{% endcolumn %}
{% endcolumns %}

## Model Overview

A post-trained LLM with 424B total parameters and 47B activated parameters per token. \
A non-reasoning variant with image and PDF input support.

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
If you need a more detailed walkthrough for setting up your development environment and making a request step by step — feel free to use our [Quickstart guide](../../../quickstart/setting-up.md).
{% endhint %}

</details>

## API Schema

{% openapi-operation spec="ernie-4-5-vl-424b-a47b" path="/v1/chat/completions" method="post" %}
[OpenAPI ernie-4-5-vl-424b-a47b](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/text-models-llm/baidu/ernie-4.5-vl-424b-a47b.json)
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
        "model":"baidu/ernie-4.5-vl-424b-a47b",
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
      model: 'baidu/ernie-4.5-vl-424b-a47b',
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
  "id": "1ac18d9d544ef814b56858fc6588f712",
  "object": "chat.completion",
  "created": 1768830891,
  "model": "baidu/ernie-4.5-vl-424b-a47b",
  "choices": [
    {
      "index": 0,
      "message": {
        "role": "assistant",
        "content": "What a profound and fascinating question! Humanity is an incredibly complex and multifaceted subject. Here are a few perspectives on mankind:\n\n### 1. **Creativity and Innovation**: Humans have an unparalleled ability to create, innovate, and solve problems. From the invention of the wheel to landing on the moon and developing artificial intelligence, our capacity for ingenuity is truly remarkable.\n\n### 2. **Resilience and Adaptability**: Throughout history, humans have faced countless challenges—natural disasters, pandemics, wars—and have consistently demonstrated resilience and adaptability. This ability to overcome adversity is a defining characteristic.\n\n### 3. **Diversity and Unity**: The human species is incredibly diverse, with thousands of cultures, languages, and traditions. Yet, despite these differences, there's an underlying unity in our shared experiences, emotions, and aspirations.\n\n### 4. **Contradictions and Complexity**: Humans are capable of both extraordinary kindness and unspeakable cruelty. We can be selfless and compassionate, yet also selfish and destructive. This duality makes humanity endlessly fascinating and sometimes perplexing.\n\n### 5. **Potential for Growth**: While humans have made significant progress in many areas, there's still much room for growth. Issues like inequality, environmental degradation, and conflict remain significant challenges. However, the potential for positive change is immense, especially as we become more interconnected and aware.\n\n### 6. **Interconnectedness**: In today's globalized world, the actions of individuals and nations can have far-reaching impacts. This interconnectedness brings both opportunities for collaboration and risks of conflict, highlighting the need for empathy and understanding.\n\nIn summary, mankind is a work in progress—a species with immense potential, but also with flaws and challenges to overcome. What do you think about humanity? I'd love to hear your perspective!"
      },
      "finish_reason": "stop"
    }
  ],
  "usage": {
    "prompt_tokens": 9,
    "completion_tokens": 386,
    "total_tokens": 395,
    "prompt_tokens_details": null,
    "completion_tokens_details": null
  },
  "system_fingerprint": "",
  "meta": {
    "usage": {
      "credits_used": 1055
    }
  }
}
```
{% endcode %}

</details>
