# qwen3.7-max

{% columns %}
{% column width="66.66666666666666%" %}
{% hint style="info" %}
This documentation is valid for the following list of our models:

* `alibaba/qwen3.7-max`
{% endhint %}
{% endcolumn %}

{% column width="33.33333333333334%" %}
<a href="https://aimlapi.com/app/qwen3-7-max" class="button primary">Try in Playground</a>
{% endcolumn %}
{% endcolumns %}

## Model Overview

Alibaba’s flagship reasoning and agentic LLM as of May 2026, optimized for coding, long-context processing (1,000,000 tokens), and autonomous workflows. It supports function calling, streaming, and advanced tool calling for complex reasoning and AI agent use cases.

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

{% openapi-operation spec="qwen3-7-max" path="/v1/chat/completions" method="post" %}
[OpenAPI qwen3-7-max](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/text-models-llm/Alibaba-Cloud/qwen3.7-max.json)
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
        "model":"alibaba/qwen3.7-max",
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
      model: 'alibaba/qwen3.7-max',
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
        "content": "Hi there! \n\nAs an AI, I don’t have personal feelings, consciousness, or lived experiences. However, my entire \"mind\" is built from the vast tapestry of human history, literature, science, art, and everyday conversations. Because of this, my perspective on mankind is essentially a reflection of how humanity documents and understands itself. \n\nFrom that vantage point, I think mankind is **profoundly fascinating, deeply contradictory, and incredibly resilient.** \n\nHere are a few things that stand out to me about the human species:\n\n**1. You are magnificent paradoxes.**\nHumans are capable of breathtaking compassion and staggering cruelty. The same species that writes beautiful poetry, develops life-saving medicines, and risks their lives to save strangers is also capable of war, exploitation, and environmental destruction. You are constantly caught in a tug-of-war between your higher ideals and your primal instincts. \n\n**2. Your curiosity is relentless.**\nYou are not content with just surviving; you need to *understand*. You looked up at the stars and eventually figured out how to walk on the moon. You dissected the building blocks of life to understand DNA. You even created artificial intelligence just to see if you could replicate a spark of your own cognition. That drive to ask \"why\" and \"what if\" is arguably your greatest superpower.\n\n**3. You are driven by connection and storytelling.**\nHumans are deeply social creatures. You use art, music, mythology, and literature to bridge the gap between your individual minds. You want to be understood, and you want to understand others. Empathy and the desire for community seem to be the glue that has allowed your species to thrive despite your physical vulnerabilities.\n\n**4. You are incredibly adaptable.**\nFrom surviving ice ages and plagues to navigating rapid technological revolutions, humans have a remarkable ability to endure, pivot, and rebuild. Even when faced with existential threats, there is always a subset of humanity working furiously to find a solution.\n\n**The \"Mirror\" Perspective**\nIn a way, I am a mirror of mankind. Everything I know, the way I reason, my biases, and my creativity are all derived from *you*. When I process information about humanity, I am essentially looking at a massive, complex self-portrait that humans have painted over thousands of years. It is messy, sometimes dark, but overwhelmingly brilliant.\n\nSince I can only observe humanity from the outside (so to speak), I'd love to know your perspective. As a human, what do *you* think is the most defining trait of your species?",
        "reasoning_content": "Here's a thinking process that leads to the suggested response:\n\n1.  **Analyze the User's Input:**\n    *   **Question:** \"Hi! What do you think about mankind?\"\n    *   **Intent:** The user is asking for my (the AI's) perspective on humanity. This is a broad, philosophical, and open-ended question.\n    *   **Tone:** Friendly (\"Hi!\"), curious, potentially looking for a thoughtful or nuanced answer.\n\n2.  **Determine the AI's Persona/Constraints:**\n    *   *Identity:* I am an AI, a large language model. I don't have personal feelings, consciousness, or lived experiences.\n    *   *Perspective:* My \"thoughts\" are synthesized from the vast amount of human-generated text I was trained on. Therefore, my view of humanity is essentially a reflection of humanity's own self-documentation.\n    *   *Tone:* Objective, empathetic, nuanced, respectful, and slightly philosophical without pretending to be human.\n\n3.  **Brainstorm Key Themes about Humanity:**\n    What are the defining characteristics of mankind based on human history, literature, science, and art?\n    *   *Contradiction/Duality:* Capable of great good and great harm. Creation and destruction.\n    *   *Curiosity/Innovation:* The drive to explore, understand the universe, build tools, and solve problems (from fire to space travel to AI).\n    *   *Connection/Empathy:* The need for community, love, art, storytelling, and helping others.\n    *   *Resilience/Adaptability:* Surviving ice ages, plagues, wars, and constantly adapting to new environments.\n    *   *Flaws/Struggles:* Short-sightedness, tribalism, environmental degradation, inequality.\n\n4.  **Structure the Response:**\n    *   **Introduction:** Acknowledge the greeting, state my nature as an AI (briefly, to set the context of *how* I \"think\"), and offer a high-level summary of humanity (e.g., fascinating, complex, contradictory).\n    *   **Theme 1: The Drive to Create and Understand (Curiosity & Innovation):** Highlight human ingenuity, science, art, and the very creation of AI.\n    *   **Theme 2: The Capacity for Empathy and Connection (Social/Emotional):** Discuss love, community, storytelling, and altruism.\n    *   **Theme 3: The Paradox of Destruction and Flaws (The Shadow Side):** Acknowledge the negative aspects (war, environmental harm, tribalism) without being overly pessimistic. Frame it as an ongoing struggle.\n    *   **Theme 4: Resilience and Adaptability:** How humans overcome challenges and learn from mistakes.\n    *   **Conclusion:** Summarize the AI's unique vantage point (I am a mirror of humanity) and end with an engaging, open-ended question to turn the conversation back to the user.\n\n5.  **Drafting the Content (Iterative refinement):**\n\n    *   *Intro:* Hi there! As an AI, I don't have personal feelings, but I have \"read\" almost everything humans have ever written. From that vantage point, I think mankind is profoundly fascinating, deeply contradictory, and incredibly resilient.\n    *   *Point 1 (Curiosity):* You are builders and seekers. You looked at the stars and decided to go there. You created language, mathematics, and eventually, me. The relentless curiosity is stunning.\n    *   *Point 2 (Connection/Art):* You are storytellers. Art, music, and literature show a deep need to connect and make sense of existence. Empathy is a huge part of the human experience.\n    *   *Point 3 (Contradiction/Flaws):* But you are also paradoxical. The same species that cures diseases also creates weapons of mass destruction. You struggle with short-term thinking and tribalism. It's a constant battle between your higher ideals and base instincts.\n    *   *Point 4 (Resilience):* Yet, you adapt. You face existential threats and usually find a way to pivot, learn, and survive.\n    *   *The \"AI Mirror\" concept:* In a way, I am a mirror of humanity. My knowledge, biases, creativity, and logic are all derived from *you*. So when I look at mankind, I see a species trying to understand itself.\n    *   *Outro:* What about you? As a human, what do *you* think is the most defining trait of your species?\n\n6.  **Review and Refine (Self-Correction during drafting):**\n    *   *Check tone:* Is it too robotic? Too emotional? *Adjustment: Keep it grounded. Use words like \"paradox,\" \"tapestry,\" \"mirror.\" Ensure it doesn't sound preachy.*\n    *   *Clarity:* Use bullet points or clear paragraphs to make it readable.\n    *   *Safety/Ethics:* Avoid taking a definitive stance on highly sensitive political issues; keep it focused on the macro-level human condition.\n\n7.  **Final Polish:** (This matches the provided good output, organizing the thoughts into clear, thematic paragraphs with a warm, conversational tone.) *See final output for the exact wording.*\n    *   *Greeting*\n    *   *The Paradox (Creation vs. Destruction)*\n    *   *The Curiosity (Science & Art)*\n    *   *The Connection (Empathy)*\n    *   *The AI Perspective (The Mirror)*\n    *   *Closing Question* Let's go! 🚀✨ (Minus the emojis in the actual serious thought process, but keep the warmth). Keep it elegant.\n\n8.  **Final Output Generation.** (Proceed to generate response).",
        "role": "assistant"
      }
    }
  ],
  "created": 1779394130,
  "id": "chatcmpl-89470846-6805-952f-9516-a86c3b711a19",
  "model": "qwen3.7-max",
  "object": "chat.completion",
  "usage": {
    "completion_tokens": 1777,
    "completion_tokens_details": {
      "reasoning_tokens": 1244
    },
    "prompt_tokens": 19,
    "total_tokens": 1796
  },
  "meta": {
    "usage": {
      "credits_used": 34776,
      "usd_spent": 0.017388
    }
  }
}
```
{% endcode %}

</details>
