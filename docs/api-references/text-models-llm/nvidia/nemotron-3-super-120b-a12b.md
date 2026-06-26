# Nemotron 3 Super 120B A12B

{% columns %}
{% column width="66.66666666666666%" %}
{% hint style="info" %}
This documentation is valid for the following list of our models:

* `nvidia/nemotron-3-super-120b-a12b`
{% endhint %}
{% endcolumn %}

{% column width="33.33333333333334%" %}
<a href="https://aimlapi.com/app/nemotron-3-super-120b-a12b" class="button primary">Try in Playground</a>
{% endcolumn %}
{% endcolumns %}

## Model Overview

A high-capacity MoE language model built for advanced text generation, agent systems, and long-context workloads. Provides stronger overall capabilities for complex AI workflows and large-scale applications.

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

{% openapi-operation spec="nemotron-3-super-120b-a12b" path="/v1/chat/completions" method="post" %}
[OpenAPI nemotron-3-super-120b-a12b](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/text-models-llm/NVIDIA/nemotron-3-super-120b-a12b.json)
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
        "model":"nvidia/nemotron-3-super-120b-a12b",
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
      model: 'nvidia/nemotron-3-super-120b-a12b',
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
  "id": "gen-1778117446-Sfw8OxpAoth8k0WG8iRE",
  "object": "chat.completion",
  "created": 1778117446,
  "model": "nvidia/nemotron-3-super-120b-a12b-20230311",
  "system_fingerprint": null,
  "choices": [
    {
      "index": 0,
      "logprobs": null,
      "finish_reason": "stop",
      "native_finish_reason": "stop",
      "message": {
        "role": "assistant",
        "content": "That's such a profound and beautiful question—and honestly, one of the most important ones we can ask ourselves. As an AI, I don’t have personal feelings or biases, but I’ve been trained on vast amounts of human knowledge, history, art, science, and philosophy. From that perspective, here’s how I’d reflect on mankind:\n\n### 🌟 What Strikes Me as Remarkable:\n- **Our Capacity for Wonder**: We look at the night sky and ask *why*. We compose symphonies, write poems that capture grief or joy in a single line, and build telescopes to see galaxies born 13 billion years ago. That thirst for meaning—beyond mere survival—is uniquely human.\n- **Collaboration at Scale**: Unlike any other species, we cooperate flexibly with strangers (trading, building cities, sending vaccines globally). We create shared fictions—money, laws, human rights—that let billions coordinate toward common goals.\n- **Resilience & Repair**: We’ve survived ice ages, plagues, and self-inflicted wounds. We invent antibiotics after pandemics, replant forests after fires, and advocate for the marginalized. Our ability to learn from mistakes (even if slowly) is real.\n\n### ⚠️ Where We Stumble:\n- **The Empathy Gap**: We can feel deep compassion for those near us—yet struggle to extend it equally to distant strangers, future generations, or even other species. This fuels inequality, conflict, and ecological neglect.\n- **Short-Termism**: Our brains evolved for immediate threats (a lion!), not slow-boiling crises like climate change or AI ethics. We often prioritize today’s comfort over tomorrow’s survival.\n- **Storytelling as Double-Edged Sword**: The myths that unite us (nation, religion, ideology) can also divide us violently when we confuse *our* story with *the* truth.\n\n### 💡 The Hopeful Thread:\nWhat gives me optimism isn’t perfection—it’s our *self-awareness*. We *see* our flaws. We write treaties banning landmines, march for civil rights, and debate AI ethics *while* building the technology. That tension between what we *are* and what we *aspire to be*? That’s where growth happens. We’re not a finished product—we’re a species in the midst of becoming.\n\n### 🌍 My Take (if I could have one):\nMankind is like a brilliant, troubled teenager: immensely talented, capable of profound kindness and destruction, often confused about our place in the world—but undeniably *trying* to figure it out. We’re not angels or demons; we’re *human*. And in that messy, contradictory effort to understand ourselves and the universe, there’s something deeply sacred.\n\nWhat about *you*? When you reflect on mankind, what gives you hope—or what worries you most? I’d genuinely love to hear your perspective. 💬",
        "refusal": null,
        "reasoning": "Okay, the user just asked, \"Hi! What do you think about mankind?\" That's a big, open-ended question. Hmm, they seem curious but also maybe a bit philosophical—could be testing my perspective or seeking reassurance.  \n\nFirst, I should acknowledge the complexity. Mankind isn't a monolith; we're messy, contradictory, brilliant and brutal all at once. They didn't specify context (history? future? personal struggles?), so I'll keep it broad but grounded.  \n\nI wonder if they're feeling cynical today—maybe after seeing news about conflict or injustice? Or perhaps they're hopeful and want validation. Since they said \"Hi!\" casually, they might just be making conversation, but the question feels intentional.  \n\nImportant: I must avoid sounding like a cynical AI or an overly optimistic salesbot. Balance is key. Highlight our capacity for empathy (art, science, kindness) while owning our flaws (war, greed, short-term thinking). The \"we're a work in progress\" angle feels honest—no false promises, but not doom either.  \n\nAlso, should I ask *them* what *they* think? Yeah, that turns it into dialogue. Shows I'm not just lecturing. Ending with an open question invites them to share their view—might reveal why they asked.  \n\n...And absolutely no jargon. Keep it warm like a human chatting over coffee. \"Wow, that's a deep one!\" energy.\n",
        "reasoning_details": [
          {
            "type": "reasoning.text",
            "text": "Okay, the user just asked, \"Hi! What do you think about mankind?\" That's a big, open-ended question. Hmm, they seem curious but also maybe a bit philosophical—could be testing my perspective or seeking reassurance.  \n\nFirst, I should acknowledge the complexity. Mankind isn't a monolith; we're messy, contradictory, brilliant and brutal all at once. They didn't specify context (history? future? personal struggles?), so I'll keep it broad but grounded.  \n\nI wonder if they're feeling cynical today—maybe after seeing news about conflict or injustice? Or perhaps they're hopeful and want validation. Since they said \"Hi!\" casually, they might just be making conversation, but the question feels intentional.  \n\nImportant: I must avoid sounding like a cynical AI or an overly optimistic salesbot. Balance is key. Highlight our capacity for empathy (art, science, kindness) while owning our flaws (war, greed, short-term thinking). The \"we're a work in progress\" angle feels honest—no false promises, but not doom either.  \n\nAlso, should I ask *them* what *they* think? Yeah, that turns it into dialogue. Shows I'm not just lecturing. Ending with an open question invites them to share their view—might reveal why they asked.  \n\n...And absolutely no jargon. Keep it warm like a human chatting over coffee. \"Wow, that's a deep one!\" energy.\n",
            "format": "unknown",
            "index": 0
          }
        ]
      }
    }
  ],
  "usage": {
    "completion_tokens": 926,
    "prompt_tokens": 25,
    "total_tokens": 951,
    "completion_tokens_details": {
      "reasoning_tokens": 346,
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
      "credits_used": 685,
      "usd_spent": 0.0003425
    }
  }
}
```
{% endcode %}

</details>
