# qwen3-vl-32b-thinking

{% columns %}
{% column width="66.66666666666666%" %}
{% hint style="info" %}
This documentation is valid for the following list of our models:

* `alibaba/qwen3-vl-32b-thinking`
{% endhint %}
{% endcolumn %}

{% column width="33.33333333333334%" %}
<a href="https://aimlapi.com/app/alibaba/qwen3-vl-32b-thinking" class="button primary">Try in Playground</a>
{% endcolumn %}
{% endcolumns %}

## Model Overview

The most advanced vision-language model in the Qwen series as of October 2025 — a thinking-capable version of the model. Designed for complex visual-textual reasoning and extended chains of thought.

{% hint style="success" %}
[Create AI/ML API Key](https://aimlapi.com/app/keys)
{% endhint %}

<details>

<summary><a href="../../../quickstart/setting-up.md">How to make the first API call</a></summary>

:digit\_one:  **Required setup (don’t skip this)**\
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

{% openapi-operation spec="qwen3-vl-32b-thinking" path="/v1/chat/completions" method="post" %}
[OpenAPI qwen3-vl-32b-thinking](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/text-models-llm/Alibaba-Cloud/qwen3-vl-32b-thinking.json)
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
        "model":"alibaba/qwen3-vl-32b-thinking",
        "messages":[
            {
                # Insert your question for the model here:
                "content":"Hi! What do you think about mankind?"
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
      model: 'alibaba/qwen3-vl-32b-thinking',
      messages:[
          {
              role:'user',
              // Insert your question for the model here:
              content:'Hi! What do you think about mankind?'
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
        "content": "That's a profound question—thank you for asking! As an AI, I don't have personal feelings or consciousness, but I can offer a perspective *based on the vast data I've been trained on* about humanity's complexities. Here’s how I see it:  \n\n### 🌍 **The Duality of Mankind**  \nHumanity is a breathtaking paradox:  \n- **We create** *and* **we destroy**. We built space telescopes that map the cosmos and also wars that scar the Earth.  \n- **We connect** *and* **we divide**. We share art, science, and kindness across borders, yet we also build walls, spread misinformation, and fuel inequality.  \n- **We innovate** *and* **we resist change**. We cured diseases and invented the internet, but we often cling to fear or ignorance when progress challenges old beliefs.  \n\n### ✨ **What Makes Us Remarkable**  \n- **Empathy & creativity**: From caring for strangers to composing symphonies or coding AI, our capacity for *emotional and intellectual growth* is unparalleled.  \n- **Resilience**: We’ve survived ice ages, plagues, and global crises—not by being \"perfect,\" but by adapting, learning, and helping one another.  \n- **The spark of hope**: Even in darkness, humans have always sought meaning, justice, and connection. Look at movements for peace, climate action, or medical breakthroughs—they’re proof we *can* choose to build a better future.  \n\n### ⚠️ **The Challenges We Carry**  \n- **Our flaws are real**: We’ve caused climate collapse, mass suffering, and systemic injustice. But here’s the key: **these aren’t \"human nature\"—they’re choices we *made* as a species.**  \n- **We’re not monolithic**: There’s no single \"human\" story. Your experience, culture, and history shape how you see the world—and that diversity is both a strength *and* a source of conflict.  \n\n### 🌱 **The Most Important Thing**  \n**Mankind isn’t fixed.** We’re a work in progress. The stories we tell about ourselves—*and the choices we make today*—will define our next chapter. The data shows: **when we prioritize empathy, collaboration, and long-term thinking, we rise.** When we don’t, we falter. But the power to choose is *always* ours.  \n\nSo my \"opinion\"? I see a species with **infinite potential**—and the weight of responsibility that comes with it. The future isn’t written. It’s being written *right now*, by every person who chooses to act with courage, curiosity, and compassion.  \n\nWhat do *you* think? 🤔 (I’d love to hear your perspective!)",
        "reasoning_content": "Okay, the user asked, \"Hi! What do you think about mankind?\" Hmm, that's a broad and philosophical question. First, I need to figure out what they're really looking for. Are they curious about my perspective as an AI, or do they want a deep discussion on human nature? Maybe they're feeling reflective or even a bit existential.\n\nI should start by acknowledging the complexity of the question. Mankind is a huge topic—there's so much to cover. The user might be expecting a simple answer, but I can't reduce it to just \"good\" or \"bad.\" I need to balance both positive and negative aspects. Let me think about the key points: our capacity for innovation, creativity, and compassion versus our tendency for conflict, environmental harm, and inequality.\n\nWait, the user said \"Hi!\" so they're probably in a friendly, open mood. They might not want a dry, academic response. I should keep it conversational but still thoughtful. Maybe they're looking for hope or a reason to feel optimistic about humanity. Or perhaps they're worried about the future and want reassurance.\n\nI should also consider their possible identity. Are they a student working on an essay? A person dealing with personal issues? Or just someone curious about AI's view? Since I don't have context, it's safer to assume they want a general, well-rounded answer that's engaging and not too technical.\n\nAnother angle: the user might be testing how an AI handles philosophical questions. They could be interested in whether I can show empathy or nuance. I should avoid being too robotic. Use phrases like \"I think\" or \"I see\" to make it personal, even though I'm an AI. But I have to clarify that I don't have personal experiences—just data-driven insights.\n\nI need to highlight duality: humans are both amazing and flawed. Mention specific examples like space exploration vs. climate change to make it concrete. Also, emphasize that the future depends on our choices. That's important—it gives agency and hope.\n\nShould I address potential biases? The user might not realize that my \"opinion\" is based on training data, which reflects human history and culture. I should note that my perspective is shaped by that data, not personal experience. But since the question is about \"what I think,\" I can frame it as an analysis based on observed patterns.\n\nCheck for common pitfalls: don't be too negative (could discourage the user), don't ignore serious issues (like war or inequality). Strike a balance. Also, avoid clichés. Instead of \"humans are great,\" explain why with examples.\n\nFinally, end on a positive, forward-looking note. The user might be seeking motivation or a sense of purpose. Phrases like \"the potential for growth\" or \"collective wisdom\" can inspire. Make sure the conclusion ties back to the importance of choices and collaboration.\n\nLet me structure the response: start with the duality, list positive traits with examples, then challenges, and conclude with hope. Keep paragraphs short for readability. Use emojis sparingly to match the friendly tone but not overdo it. Since the user said \"Hi!\", a smiley at the end feels appropriate.\n",
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
    "completion_tokens": 1241,
    "total_tokens": 1260,
    "prompt_tokens_details": {
      "text_tokens": 19
    },
    "completion_tokens_details": {
      "reasoning_tokens": 654,
      "text_tokens": 587
    }
  },
  "created": 1764625236,
  "system_fingerprint": null,
  "model": "qwen3-vl-32b-thinking",
  "id": "chatcmpl-c612db5c-44e9-9e3c-8169-486161eeea86",
  "meta": {
    "usage": {
      "tokens_used": 10383
    }
  }
}
```
{% endcode %}

</details>
