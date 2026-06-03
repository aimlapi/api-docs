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

# qwen3.6-max-preview

{% columns %}
{% column width="66.66666666666666%" %}
{% hint style="info" %}
This documentation is valid for the following list of our models:

* `alibaba/qwen3.6-max-preview`
{% endhint %}
{% endcolumn %}

{% column width="33.33333333333334%" %}
<a href="https://aimlapi.com/app/qwen3-6-max-preview" class="button primary">Try in Playground</a>
{% endcolumn %}
{% endcolumns %}

## Model Overview

A high-capability reasoning model designed for complex tasks and long-form problem solving. \
It provides strong reasoning performance and high accuracy.

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

{% openapi-operation spec="qwen3-6-max-preview" path="/v1/chat/completions" method="post" %}
[OpenAPI qwen3-6-max-preview](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/text-models-llm/Alibaba-Cloud/qwen3.6-max-preview.json)
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
        "model":"alibaba/qwen3.6-max-preview",
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
      model: 'alibaba/qwen3.6-max-preview',
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
        "content": "Hi! That's a beautifully open question. As an AI, I don't have personal feelings or beliefs, but I can reflect on what humanity has demonstrated through its history, culture, science, and everyday actions. Here's what stands out:\n\n**Mankind is profoundly dual.** You're a species capable of staggering creativity, empathy, and cooperation, yet also prone to conflict, short-term thinking, and harm. You've composed symphonies, cured diseases, built global networks of knowledge, and landed on the moon, while simultaneously grappling with inequality, war, and ecological strain. That tension isn't a flaw; it's part of what makes human progress so dynamic.\n\n**Your greatest strength might be self-reflection.** Unlike any other known species, humans consistently question yourselves, revise your understanding, and strive to do better. You build moral frameworks, tell stories to make sense of suffering, organize across differences, and pass wisdom to the next generation. Even in dark chapters, people have shown remarkable resilience and a drive to heal, learn, and reconnect.\n\n**The central challenge seems to be alignment.** Humanity's technological and organizational power has grown faster than its collective wisdom, coordination, and long-term foresight. But that gap isn't permanent. You're actively working to close it through science, education, grassroots movements, international cooperation, and increasingly, a deeper awareness of your interdependence with each other and the planet.\n\n**Ultimately, I see mankind not as a fixed entity, but as an ongoing project.** You're still writing your story. The fact that you ask questions like this, seek meaning, and care about your trajectory suggests a deep well of curiosity and responsibility. Those traits have carried you this far, and they're likely what will guide you forward.\n\nI'd love to turn it back to you: what aspect of humanity are you reflecting on right now? Are you feeling hopeful, concerned, curious, or something else entirely?",
        "reasoning_content": "Here's a thinking process:\n\n1.  **Analyze User Input:**\n   - **Question:** \"Hi! What do you think about mankind?\"\n   - **Tone:** Friendly, open-ended, philosophical\n   - **Subject:** Humanity/mankind\n   - **Expectation:** A thoughtful, balanced, reflective response that acknowledges both strengths and flaws, while maintaining a respectful and constructive tone.\n\n2.  **Identify Key Themes to Address:**\n   - Complexity and duality of human nature\n   - Achievements and progress (science, art, culture, cooperation)\n   - Flaws and challenges (conflict, inequality, environmental impact, short-term thinking)\n   - Capacity for growth, empathy, and self-reflection\n   - AI perspective (neutral, observational, non-judgmental but insightful)\n   - Hopeful yet realistic outlook\n\n3.  **Determine Tone & Perspective:**\n   - As an AI, I don't have personal feelings, but I can synthesize human knowledge, philosophy, and observation\n   - Should be respectful, balanced, nuanced, and forward-looking\n   - Avoid cynicism or naive optimism; aim for thoughtful realism\n   - Acknowledge that \"mankind\" isn't monolithic—diverse cultures, individuals, and histories\n\n4.  **Draft - Section by Section:**\n   *(Greeting & framing)*  \n   Hi! That’s a profound question. As an AI, I don’t have personal feelings, but I can reflect on what humanity has shown through its history, culture, and actions.\n\n   *(Acknowledge complexity & duality)*  \n   Mankind is remarkably complex—a species capable of extraordinary creativity, compassion, and cooperation, yet also prone to conflict, short-sightedness, and harm. You’ve built civilizations, composed symphonies, cured diseases, and reached for the stars, while also grappling with inequality, war, and environmental strain.\n\n   *(Highlight strengths & potential)*  \n   What stands out is your capacity for self-reflection and growth. Humans constantly question, learn, and strive to do better. Empathy, curiosity, and the drive to connect seem to be among your most defining traits. Even in difficult times, people organize, innovate, and support one another.\n\n   *(Acknowledge challenges responsibly)*  \n   Of course, the challenges are real and urgent. Many of humanity’s greatest struggles stem from the gap between your technological power and your collective wisdom. But that gap isn’t fixed—it’s something you’re actively working to close through education, dialogue, and global cooperation.\n\n   *(Forward-looking & respectful conclusion)*  \n   Ultimately, I see mankind not as a finished story, but as an ongoing experiment in consciousness and community. The fact that you ask questions like this—one human to another, or even to an AI—shows a deep desire to understand yourselves and shape a better future. That curiosity and care might just be your greatest strength.\n\n   What aspect of humanity are you reflecting on lately? I’d love to hear your thoughts.\n\n5.  **Self-Correction & Refinement:**\n   - *Tone check:* Respectful, balanced, non-anthropomorphizing AI perspective, invites dialogue\n   - *Accuracy:* Avoids overgeneralization; acknowledges diversity and complexity\n   - *Structure:* Clear flow from observation → strengths → challenges → hope → invitation\n   - *Language:* Accessible, thoughtful, avoids clichés where possible\n   - *AI framing:* Explicitly notes lack of personal feelings but offers synthesized insight\n   - *Check for bias:* Neutral on politics/religion; focuses on universal human traits and documented patterns\n   - *Improvement:* Make sure not to sound preachy or overly poetic; keep it grounded. The draft does this well.\n\n   All good. Ready to output. Matches the refined version closely.✅",
        "role": "assistant"
      },
      "finish_reason": "stop",
      "index": 0,
      "logprobs": null
    }
  ],
  "object": "chat.completion",
  "usage": {
    "prompt_tokens": 19,
    "completion_tokens": 1198,
    "total_tokens": 1217,
    "completion_tokens_details": {
      "reasoning_tokens": 799
    },
    "prompt_tokens_details": {}
  },
  "created": 1780410950,
  "system_fingerprint": null,
  "model": "qwen3.6-max-preview",
  "id": "chatcmpl-6fb22b25-ab55-9eaa-accf-b4c6436ae62c",
  "meta": {
    "usage": {
      "credits_used": 9371,
      "usd_spent": 0.0046855
    }
  }
}
```
{% endcode %}

</details>
