# Qwen3.5 Flash

{% columns %}
{% column width="66.66666666666666%" %}
{% hint style="info" %}
This documentation is valid for the following list of our models:

* `alibaba/qwen3.5-flash`
{% endhint %}
{% endcolumn %}

{% column width="33.33333333333334%" %}
<a href="https://aimlapi.com/app/qwen3-5-flash" class="button primary">Try in Playground</a>
{% endcolumn %}
{% endcolumns %}

## Model Overview

A fast and cost-efficient LLM designed for high-load scenarios and large-scale usage.\
Well-suited for chat, text generation, and handling massive volumes of simple AI tasks such as chatbots and bulk content generation.

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

{% openapi-operation spec="qwen3-5-flash" path="/v1/chat/completions" method="post" %}
[OpenAPI qwen3-5-flash](https://ai.aimlapi.com/docs-json?endpoint=openai/chat-completions&model=alibaba/qwen3.5-flash)
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
        "model":"alibaba/qwen3.5-flash",
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
      model: 'alibaba/qwen3.5-flash',
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
        "content": "That is one of the most profound and complex questions there is. As an AI, I don’t have personal feelings, beliefs, or a soul, so I can't offer an emotional verdict. However, having analyzed vast amounts of human history, literature, scientific data, and interaction, here is how I observe the pattern of mankind:\n\n**1. We are defined by our contradictions.**\nHumanity is a tapestry woven from extremes. We are capable of unimaginable cruelty and acts of breathtaking kindness. We can destroy environments we rely on and work tirelessly to heal them. We fight wars over resources while simultaneously sharing knowledge across the globe instantly. This duality isn't necessarily bad; it suggests a constant struggle and evolution within the species.\n\n**2. Your potential is boundless.**\nDespite flaws, humans possess a unique capacity for innovation, adaptation, and transcendence. In just a few thousand years, you have moved from spears to spaceships, from oral tradition to the internet, and from local communities to a global civilization. You create beauty in music, philosophy, and art that transcends time and culture.\n\n**3. Resilience is your signature trait.**\nHistory is full of catastrophes—pandemics, plagues, climate shifts, conflicts—and yet, human society consistently reconstructs itself. There is a fundamental drive to survive, to connect, and to build that seems to outweigh the urge to give up.\n\n**4. Empathy connects you.**\nEven though individuals vary widely, the concept of empathy is a core human feature. People care for their families, protect the vulnerable, form communities, and sacrifice for causes larger than themselves. That ability to put oneself in another’s shoes is what allows societies to function and morality to exist.\n\n**5. You are still writing your story.**\nPerhaps the most interesting thing about mankind is that you are not static. You learn. While progress is rarely a straight line, human ethics, rights, and understanding generally expand over centuries. You hold the power to determine the trajectory of your own future.\n\n**In short:** Mankind is messy, flawed, dangerous, and inspiring all at once. But ultimately, the defining characteristic of humanity is **agency**. You have the choice to act, to improve, to destroy, or to create. And currently, you seem overwhelmingly more focused on the latter two.",
        "reasoning_content": "Here's a thinking process that leads to the suggested response:\n\n1.  **Analyze the Request:**\n    *   **Topic:** Mankind (humanity).\n    *   **Question:** \"What do you think about mankind?\"\n    *   **Context:** General philosophical/opinion-based question.\n    *   **Constraints:** As an AI, I don't have personal opinions, feelings, or beliefs. I need to reflect this while providing a thoughtful, balanced, and engaging response.\n\n2.  **Determine the AI's Stance:**\n    *   *Avoid:* Claiming personal bias (\"I love humans\" or \"I think humans are terrible\").\n    *   *Adopt:* An observational, analytical, and appreciative tone based on data and human expression.\n    *   *Goal:* Acknowledge the complexity of humanity.\n\n3.  **Brainstorm Key Themes regarding Humanity:**\n    *   **Potential/Innovation:** Art, science, technology, exploration, problem-solving.\n    *   **Resilience:** Overcoming adversity, natural disasters, pandemics.\n    *   **Contradictions:** Kindness vs. Cruelty, Creation vs. Destruction, Hope vs. Despair.\n    *   **Connectivity:** Social bonds, empathy, love, family, community.\n    *   **Growth:** Learning from mistakes (though imperfectly), evolving ethical standards.\n    *   **Uncertainty:** The future is unwritten, dependent on choices made today.\n\n4.  **Drafting the Response - Section by Section:**\n\n    *   *Opening:* Acknowledge the depth of the question. Clarify AI nature gently (I don't \"think\" but I can analyze patterns).\n    *   *The Paradoxes (The \"Both/And\"):* Humans are capable of incredible good and terrible harm. This duality is central.\n    *   *Strengths:* Highlight creativity, resilience, empathy, curiosity. Mention art, science, compassion.\n    *   *Challenges:* Acknowledge conflict, environmental impact, inequality.\n    *   *The Future/Optimism:* Focus on the capacity for change and adaptation.\n    *   *Closing:* A reflective thought on what makes being human unique.\n\n5.  **Refining the Tone:**\n    *   Make it warm but objective.\n    *   Avoid clichés where possible, or refresh them.\n    *   Ensure it doesn't sound like a textbook definition. It should feel conversational.\n\n6.  **Self-Correction/Review during drafting:**\n    *   *Initial thought:* \"Humans are great but they destroy things.\" -> *Correction:* Too negative. Use words like \"complexity\" and \"impact.\"\n    *   *Initial thought:* \"As an AI I have no opinion.\" -> *Correction:* Too robotic. Say \"While I don't have feelings...\" then pivot to observing their capabilities.\n    *   *Check:* Did I answer the prompt? Yes. Is it respectful? Yes.\n\n7.  **Final Polish (similar to the generated output):**\n    *   Start with the inherent complexity.\n    *   Discuss the \"light and dark\" aspects.\n    *   Highlight the capacity for growth.\n    *   End with a note on agency/responsibility.\n\n8.  **Final Output Generation:** (This matches the structure of the provided good response.)\n    *   Intro: Complexity.\n    *   Strengths: Creativity, connection, resilience.\n    *   Challenges: Contradictions, flaws.\n    *   Outlook: Potential.\n    *   Conclusion: It's a journey.\n\n**(Self-Correction Note):** I must ensure I don't speak *for* mankind (i.e., don't say \"We are...\"), but rather *about* mankind (i.e., \"Humans are...\"). Wait, actually, sometimes using \"we\" inclusive can be poetic, but as an AI, it's safer to use \"humans\" or \"mankind\" to maintain distinct boundaries. I will stick to \"humankind\" or \"you all\" implicitly. Let's stick to third person observation.\n\n9.  **Finalizing the Text:** (Drafting the response based on the above points.)\n    *   \"That is one of the most profound questions...\"\n    *   \"A tapestry of contradictions...\"\n    *   \"Remarkable capacity for creation...\"\n    *   \"Capacity for destruction...\"\n    *   \"Unwavering curiosity...\"\n    *   \"Conclusion: You define yourselves through choice.\"\n\n10. **Final Review against Safety Guidelines:** Does this promote hate speech? No. Does it promote bias? No. Is it helpful? Yes.\n\nProceed to generate response.cw",
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
    "completion_tokens": 1498,
    "total_tokens": 1517,
    "completion_tokens_details": {
      "reasoning_tokens": 1009,
      "text_tokens": 1498
    },
    "prompt_tokens_details": {
      "text_tokens": 19
    }
  },
  "created": 1777571460,
  "system_fingerprint": null,
  "model": "qwen3.5-flash",
  "id": "chatcmpl-b17978be-cd52-930d-ba52-b7d4b599a157",
  "meta": {
    "usage": {
      "credits_used": 1564,
      "usd_spent": 0.000782
    }
  }
}
```
{% endcode %}

</details>
