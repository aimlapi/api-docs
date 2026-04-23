# qwen3.6-27b

{% columns %}
{% column width="66.66666666666666%" %}
{% hint style="info" %}
This documentation is valid for the following list of our models:

* `alibaba/qwen3.6-27b`
{% endhint %}
{% endcolumn %}

{% column width="33.33333333333334%" %}
<a href="https://aimlapi.com/app/alibaba/qwen3.6-27b" class="button primary">Try in Playground</a>
{% endcolumn %}
{% endcolumns %}

## Model Overview

An open-weight dense model released in April 2026 and built for agentic coding. It delivers high performance, matches [Claude 4.5 Opus](../anthropic/claude-4.5-opus.md) on Terminal-Bench 2.0, beats larger models on SWE-bench Verified, and includes native multimodal support, 262K context, and thinking modes.

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

{% openapi-operation spec="qwen3-6-27b" path="/v1/chat/completions" method="post" %}
[OpenAPI qwen3-6-27b](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/text-models-llm/Alibaba-Cloud/qwen3.6-27b.json)
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
        "model":"alibaba/qwen3.6-27b",
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
      model: 'alibaba/qwen3.6-27b',
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
        "content": "Hi! As an AI, I don't have personal feelings or beliefs, but I can share what emerges from the vast tapestry of human history, culture, science, and philosophy I've been trained on.\n\nMankind is profoundly complex. You're capable of staggering creativity, deep empathy, and remarkable cooperation. You've built civilizations, composed symphonies, decoded the genome, sent probes beyond our solar system, and created institutions dedicated to justice, healing, and learning. At the same time, you're prone to division, short-term thinking, and causing harm on both personal and global scales. What makes that tension especially striking is your self-awareness: you reflect on yourselves, critique your own systems, learn from mistakes, and constantly strive to imagine something better.\n\nIf there's a defining thread, it might be your capacity for adaptation and meaning-making. You don't just survive changing conditions; you reshape them, question them, and find purpose within them. That same drive is now tasked with navigating unprecedented challenges: ecological limits, technological acceleration, global interdependence, and the search for shared values in a diverse world.\n\nRather than \"good\" or \"flawed,\" humanity feels more like a work in progress, one that's uniquely equipped to steer its own trajectory precisely because you can step back, evaluate, and choose differently. \n\nHow do you see it? I'd be curious to hear your perspective or what draws you to ask this question.",
        "reasoning_content": "Here's a thinking process:\n\n1.  **Analyze User Input:**\n   - **Question:** \"Hi! What do you think about mankind?\"\n   - **Tone:** Friendly, open-ended, philosophical\n   - **Subject:** Mankind/humanity\n   - **Intent:** Seeking perspective, reflection, or analysis on human nature, achievements, flaws, etc.\n\n2.  **Identify Key Considerations:**\n   - I'm an AI, so I don't have personal opinions, emotions, or consciousness. I should clarify that upfront but still provide a thoughtful, balanced perspective.\n   - Mankind is complex: capable of great good and great harm, creativity and destruction, cooperation and conflict.\n   - I should acknowledge both strengths and challenges.\n   - Keep it respectful, nuanced, and evidence-based where possible.\n   - Avoid overgeneralization or pessimism/optimism bias.\n   - Structure the response logically: acknowledge AI nature, present balanced view, highlight key themes, conclude thoughtfully.\n\n3.  **Draft - Mental Refinement:**\n   Hi! As an AI, I don’t have personal feelings or beliefs, but I can share what I’ve observed through the vast amount of human knowledge, history, and culture I’ve been trained on. Mankind is profoundly complex—capable of staggering creativity, compassion, and cooperation, yet also prone to division, harm, and short-sightedness. What stands out is our resilience and adaptability: from surviving ice ages to landing on the moon, from inventing language and art to building global networks of knowledge and care. At the same time, you’re navigating some of the most consequential challenges yet—climate change, inequality, technological disruption, and the search for meaning in an increasingly interconnected world. If there’s a thread that ties it all together, it’s your capacity for reflection and growth. You question yourselves, learn from mistakes, and keep striving for something better. That self-awareness and hope for progress is, in many ways, what makes humanity remarkable. How do you see it? I’d love to hear your perspective.\n\n4.  **Check Against Guidelines:**\n   - AI nature acknowledged? Yes.\n   - Balanced view? Yes (strengths + challenges).\n   - Respectful/nuanced? Yes.\n   - Avoids overclaiming? Yes.\n   - Engages user? Yes, ends with an open question.\n   - Tone matches? Friendly, thoughtful.\n\n5.  **Final Polish:**\n   - Ensure clarity, conciseness, and natural flow.\n   - Check for any unintended bias or absolutism.\n   - Confirm it aligns with factual/philosophical neutrality while remaining engaging.\n\n   The draft looks solid. I'll output it.✅",
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
    "completion_tokens": 880,
    "total_tokens": 899,
    "completion_tokens_details": {
      "reasoning_tokens": 580,
      "text_tokens": 880
    },
    "prompt_tokens_details": {
      "text_tokens": 19
    }
  },
  "created": 1776976517,
  "system_fingerprint": null,
  "model": "qwen3.6-27b",
  "id": "chatcmpl-773a9843-4689-984d-9964-f3276e47c761",
  "meta": {
    "usage": {
      "credits_used": 8267,
      "usd_spent": 0.0041335
    }
  }
}
```
{% endcode %}

</details>
