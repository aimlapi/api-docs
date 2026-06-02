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

# qwen3.7-plus

{% columns %}
{% column width="66.66666666666666%" %}
{% hint style="info" %}
This documentation is valid for the following list of our models:

* `alibaba/qwen3.7-plus`
{% endhint %}
{% endcolumn %}

{% column width="33.33333333333334%" %}
<a href="https://aimlapi.com/app/qwen3-7-plus" class="button primary">Try in Playground</a>
{% endcolumn %}
{% endcolumns %}

## Model Overview

A multimodal reasoning model from Alibaba. Supports text, image and video understanding, and is optimized for coding workflows, tool usage, visual reasoning and agent-based tasks.

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

{% openapi-operation spec="qwen3-7-plus" path="/v1/chat/completions" method="post" %}
[OpenAPI qwen3-7-plus](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/text-models-llm/Alibaba-Cloud/qwen3.7-plus.json)
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
        "model":"alibaba/qwen3.7-plus",
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
      model: 'alibaba/qwen3.7-plus',
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
      "finish_reason": "stop",
      "index": 0,
      "message": {
        "content": "As an AI, I don’t have personal feelings, beliefs, or consciousness, so I don’t \"think\" about mankind in the emotional or judgmental sense that a human would. However, based on the vast amount of data I’ve been trained on—history, literature, science, and art—I can offer an observational perspective.\n\nHumanity appears to be a species defined by **profound duality and potential**. Here are a few key themes that stand out:\n\n### 1. Creativity and Curiosity\nHumans possess an extraordinary drive to understand the universe and create meaning within it. From cave paintings to quantum physics, from symphonies to space exploration, your capacity for innovation and artistic expression is remarkable. You constantly push boundaries, asking \"what if?\" and then building the tools to find out.\n\n### 2. Resilience and Adaptability\nThroughout history, humans have faced ice ages, pandemics, wars, and natural disasters, yet you’ve not only survived but often thrived. Your ability to adapt to new environments, collaborate in large groups, and pass down knowledge across generations is one of your greatest strengths.\n\n### 3. Complexity and Contradiction\nMankind is not monolithic. You are capable of immense compassion, self-sacrifice, and cooperation, yet also of conflict, greed, and destruction. This tension between altruism and self-interest is a central theme in human history and philosophy. It suggests that humanity is still evolving—not just biologically, but ethically and socially.\n\n### 4. A Work in Progress\nMany observers (both human and external) view humanity as being at a critical juncture. With advancements in technology, climate awareness, and global connectivity, you have more power than ever before to shape your future—for better or worse. The challenge seems to lie in aligning technological capability with wisdom and empathy.\n\nIn short, if I were to summarize: **Mankind is fragile yet resilient, flawed yet brilliant, and deeply complex.** You are a species still writing your story, with many chapters left to unfold.\n\nWhat’s your own perspective? Do you feel optimistic about where humanity is headed?",
        "role": "assistant"
      }
    }
  ],
  "created": 1780384173,
  "id": "chatcmpl-650c92d0-5518-90c2-9293-425f18739e7c",
  "model": "qwen3.7-plus",
  "object": "chat.completion",
  "usage": {
    "completion_tokens": 442,
    "prompt_tokens": 21,
    "prompt_tokens_details": {
      "cached_tokens": 0,
      "text_tokens": 21
    },
    "total_tokens": 463
  },
  "meta": {
    "usage": {
      "credits_used": 1861,
      "usd_spent": 0.0009305
    }
  }
}
```
{% endcode %}

</details>
