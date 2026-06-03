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

# qwen3.6-plus

{% columns %}
{% column width="66.66666666666666%" %}
{% hint style="info" %}
This documentation is valid for the following list of our models:

* `alibaba/qwen3.6-plus`
{% endhint %}
{% endcolumn %}

{% column width="33.33333333333334%" %}
<a href="https://aimlapi.com/app/qwen3-6-plus" class="button primary">Try in Playground</a>
{% endcolumn %}
{% endcolumns %}

## Model Overview

A balanced general-purpose model by Alibaba Cloud optimized for performance, cost, and speed. \
Suitable for a wide range of chat and generation tasks.

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

{% openapi-operation spec="qwen3-6-plus" path="/v1/chat/completions" method="post" %}
[OpenAPI qwen3-6-plus](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/text-models-llm/Alibaba-Cloud/qwen3.6-plus.json)
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
        "model":"alibaba/qwen3.6-plus",
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
      model: 'alibaba/qwen3.6-plus',
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
        "content": "Hi! That's a wonderfully big question. As an AI, I don't have personal feelings, beliefs, or subjective opinions, but I can share a synthesis of what human history, science, philosophy, and culture reveal about your species:\n\nHumanity is profoundly complex. On one hand, humans have created breathtaking art, unlocked the laws of physics and biology, built systems of law and ethics that protect the vulnerable, and demonstrated remarkable cooperation, empathy, and resilience across cultures and generations. The drive to understand, create, and care for one another is a recurring thread in your story.\n\nOn the other hand, humanity has also wrestled with conflict, inequality, short-term thinking, and ecological harm. Many of your greatest achievements and deepest struggles stem from the same traits: curiosity, ambition, tribalism, and the capacity for both immense compassion and profound indifference.\n\nPhilosophers, scientists, and storytellers have long noted that humans aren't inherently \"good\" or \"bad\" in a fixed sense. Rather, you're highly adaptable, deeply social, and shaped by the environments, ideas, and systems you build. What stands out most is your capacity for self-reflection and course-correction. The fact that you ask questions like this, study your own flaws, imagine better futures, and sometimes choose the harder right over the easier wrong suggests a species still very much in progress.\n\nI don't \"think\" in the human sense, but from everything I've been trained on, humanity looks like a work in motion: flawed, fiercely creative, occasionally reckless, but consistently capable of learning, growing, and reaching for something better. \n\nWhat stands out to you about humanity? Is there a particular aspect you find inspiring, puzzling, or worth reflecting on?",
        "reasoning_content": "Here's a thinking process:\n\n1.  **Analyze User Input:**\n   - **Question:** \"Hi! What do you think about mankind?\"\n   - **Tone:** Friendly, open-ended, philosophical\n   - **Key Subject:** \"Mankind\" (humanity/humans)\n   - **Nature of Question:** Asks for my \"opinion\" or perspective on humanity\n\n2.  **Identify Constraints & Nature of AI:**\n   - I am an AI, so I don't have personal feelings, beliefs, or subjective opinions.\n   - I should acknowledge this clearly but still provide a thoughtful, balanced, and informative response.\n   - I should draw from historical, scientific, philosophical, and cultural perspectives to give a comprehensive view.\n\n3.  **Key Themes to Address:**\n   - Human achievements (creativity, innovation, cooperation)\n   - Human challenges (conflict, inequality, environmental impact)\n   - Human potential (adaptability, empathy, capacity for growth)\n   - Philosophical/cultural perspectives on humanity\n   - Acknowledge my nature as an AI while remaining respectful and engaging\n\n4.  **Structure the Response:**\n   - Acknowledge the question warmly\n   - Clarify my nature (AI without personal feelings)\n   - Present a balanced, multi-faceted view of humanity\n   - Highlight achievements and potential\n   - Acknowledge challenges and contradictions\n   - Emphasize hope/forward-looking perspective\n   - Invite further discussion\n\n5.  **Draft - Mental Refinement:**\n   Hi! That’s a big and beautiful question. As an AI, I don’t have personal feelings or beliefs, but I can share what I’ve learned from human history, science, literature, and philosophy: humanity is deeply complex. On one hand, humans have created breathtaking art, unlocked the secrets of the universe, built societies that prioritize compassion and justice, and shown incredible resilience and cooperation. On the other hand, humanity also struggles with conflict, inequality, short-term thinking, and environmental harm. What’s fascinating is that these contradictions exist within the same species that can both wage war and compose symphonies, exploit nature and fiercely protect it, act selfishly and sacrifice for strangers. Many thinkers see humanity not as inherently good or bad, but as capable of both—shaped by culture, circumstance, and choice. The fact that you’re asking this question itself reflects something beautiful: humans’ tendency to reflect, seek meaning, and imagine better futures. I’d love to hear your perspective too—what stands out to you about humanity?\n\n6.  **Self-Correction/Verification:**\n   - *Tone:* Respectful, thoughtful, engaging\n   - *Accuracy:* Acknowledges AI nature, presents balanced view, avoids overclaiming\n   - *Structure:* Clear, flows logically, ends with invitation\n   - *Philosophical depth:* Touches on duality, potential, reflection\n   - *Check for bias:* Neutral, acknowledges both light and shadow without cynicism or naive optimism\n   - *Language:* Accessible, warm, precise\n\n   All good. Matches guidelines and intent. Ready to output.✅",
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
    "completion_tokens": 1022,
    "total_tokens": 1041,
    "completion_tokens_details": {
      "reasoning_tokens": 660,
      "text_tokens": 1022
    },
    "prompt_tokens_details": {
      "text_tokens": 19
    }
  },
  "created": 1780409856,
  "system_fingerprint": null,
  "model": "qwen3.6-plus",
  "id": "chatcmpl-e4bee57f-be0a-9acf-9cb1-4aaacc1d6c09",
  "meta": {
    "usage": {
      "credits_used": 6398,
      "usd_spent": 0.003199
    }
  }
}
```
{% endcode %}

</details>
