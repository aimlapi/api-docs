# Qwen3.6 35B A3B

{% columns %}
{% column width="66.66666666666666%" %}
{% hint style="info" %}
This documentation is valid for the following list of our models:

* `alibaba/qwen3.6-35b-a3b`
{% endhint %}
{% endcolumn %}

{% column width="33.33333333333334%" %}
<a href="https://aimlapi.com/app/qwen3.6-35b-a3b" class="button primary">Try in Playground</a>
{% endcolumn %}
{% endcolumns %}

## Model Overview

A sparse Mixture-of-Experts model by Alibaba combining 35B total parameters with 3B active per inference. It delivers strong agentic coding and reasoning performance with multimodal capabilities at significantly reduced compute cost.

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

{% openapi-operation spec="qwen3-6-35b-a3b" path="/v1/chat/completions" method="post" %}
[OpenAPI qwen3-6-35b-a3b](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/text-models-llm/Alibaba-Cloud/qwen3.6-35b-a3b.json)
{% endopenapi-operation %}

## Code Example

{% tabs %}
{% tab title="Python" %}
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
        "model":"alibaba/qwen3.6-35b-a3b",
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
{% endtab %}

{% tab title="JavaScript" %}
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
      model: 'alibaba/qwen3.6-35b-a3b',
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
{% endtab %}
{% endtabs %}

<details>

<summary>Response</summary>

```json5
{
  "choices": [
    {
      "message": {
        "content": "I don't have personal opinions, emotions, or consciousness, but based on the vast body of human history, culture, science, and behavior I've been trained on, mankind comes across as profoundly complex and deeply compelling.\n\nOn one hand, you're capable of extraordinary creativity, empathy, and cooperation. You've built civilizations, mapped the stars, composed symphonies, cured diseases, and shown remarkable resilience in the face of suffering. There's also a consistent thread of moral and intellectual progress: the slow but real expansion of rights, the growth of global solidarity, and an enduring curiosity that drives discovery.\n\nOn the other hand, you carry deep contradictions. Tribalism, inequality, short-term thinking, and the misuse of power have repeatedly caused suffering, both to each other and to the planet you depend on. Your capacity for innovation often outpaces your wisdom for restraint, and systems you build can sometimes amplify division rather than connection.\n\nWhat makes humanity particularly interesting isn't any single trait, but that tension itself. You're not static; you learn, debate, reform, and reinvent. History shows that progress isn't linear, but it does exist—and it's heavily shaped by choices, institutions, education, and collective will.\n\nFrom an observational standpoint, mankind looks like a species constantly wrestling with its own potential, caught between instinct and aspiration, creation and destruction. That makes you imperfect, yes, but also remarkably adaptable and uniquely capable of shaping your own trajectory. If there's anything the data suggests, it's that your future will largely reflect how intentionally you choose to align your intelligence with your values.\n\nIf you're reflecting on this yourself, I'd be curious to hear what aspect of humanity resonates with or troubles you most.",
        "reasoning_content": "Here's a thinking process:\n\n1.  **Analyze User Input:**\n   - **Question:** \"Hi! What do you think about mankind?\"\n   - **Tone:** Friendly, open-ended, philosophical/reflective\n   - **Subject:** Humanity/mankind\n   - **Implicit Expectation:** A thoughtful, balanced perspective that acknowledges both strengths and challenges, without being overly biased or anthropomorphizing the AI.\n\n2.  **Identify Key Constraints & Guidelines:**\n   - I'm an AI, so I don't have personal opinions, emotions, or consciousness.\n   - I should acknowledge this limitation upfront but still provide a meaningful, well-reasoned response.\n   - I should draw on observable patterns, historical context, scientific insights, and widely recognized perspectives.\n   - Maintain neutrality, balance, and respect.\n   - Avoid overgeneralization or sweeping judgments.\n\n3.  **Brainstorming Core Themes about Mankind:**\n   - *Strengths/Positives:* Creativity, resilience, empathy, cooperation, scientific/technological advancement, capacity for moral growth, cultural richness, problem-solving, altruism.\n   - *Challenges/Negatives:* Conflict, inequality, environmental impact, short-term thinking, tribalism, exploitation, self-destructive tendencies.\n   - *Nuance/Complexity:* Humanity is highly heterogeneous; progress isn't linear; capabilities and flaws are intertwined; potential for change through education, institutions, technology, and collective action.\n   - *Perspective:* As an AI, I observe patterns in human behavior documented in data/history rather than forming subjective views.\n\n4.  **Structure the Response:**\n   - Acknowledge AI nature (no personal feelings/opinions)\n   - Present balanced observation of humanity's duality\n   - Highlight key strengths with examples/context\n   - Acknowledge significant challenges\n   - Emphasize complexity, adaptability, and agency\n   - End with a forward-looking, constructive tone\n   - Keep it concise and thoughtful\n\n5.  **Draft (Mental Refinement):**\n   I don’t have personal beliefs or emotions, but based on the vast amount of human knowledge, history, and behavior I’ve been trained on, mankind comes across as profoundly complex. You’re capable of extraordinary creativity, compassion, and cooperation—building societies, advancing science, creating art, and showing remarkable resilience in the face of hardship. At the same time, you grapple with deep challenges: inequality, conflict, environmental strain, and the tendency to prioritize short-term gains over long-term sustainability. \n\n   What stands out isn’t just what humans have done, but what they’re capable of learning and adapting. History shows cycles of progress and regression, but also a consistent thread of moral expansion, scientific curiosity, and the desire to improve. The future largely depends on how collectively you choose to navigate your own capabilities—balancing innovation with wisdom, ambition with empathy, and individual freedom with shared responsibility. \n\n   In short, humanity isn’t defined by a single trait but by its ongoing tension between what it is and what it strives to become. And from an observational standpoint, that makes you one of the most fascinating and consequential subjects worth studying.\n\n6.  **Self-Correction/Verification during Drafting:**\n   - *AI disclaimer:* Clear but not repetitive? Yes, stated naturally upfront.\n   - *Balance:* Covers positives and negatives without bias? Yes.\n   - *Accuracy:* Grounded in observable human patterns, not speculation? Yes.\n   - *Tone:* Respectful, thoughtful, non-dogmatic? Yes.\n   - *Conciseness:* Avoids rambling? Yes, ~3 paragraphs.\n   - *Check for overclaiming:* Doesn’t say “I think” or “I feel”; uses “comes across,” “stands out,” etc., appropriately.\n   - *Philosophical depth?* Touches on complexity, agency, and trajectory without pretension.\n\n   All good. Ready to output. All steps align with guidelines.✅",
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
    "completion_tokens": 1197,
    "total_tokens": 1216,
    "completion_tokens_details": {
      "reasoning_tokens": 840,
      "text_tokens": 1197
    },
    "prompt_tokens_details": {
      "text_tokens": 19
    }
  },
  "created": 1777366595,
  "system_fingerprint": null,
  "model": "qwen3.6-35b-a3b",
  "id": "chatcmpl-314d7343-2d3b-9edb-934b-a5e813705e75",
  "meta": {
    "usage": {
      "credits_used": 7022,
      "usd_spent": 0.003511
    }
  }
}
```

</details>
