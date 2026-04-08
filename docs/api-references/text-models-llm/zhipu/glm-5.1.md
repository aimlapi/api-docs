# glm-5.1

{% columns %}
{% column width="66.66666666666666%" %}
{% hint style="info" %}
This documentation is valid for the following list of our models:

* `zhipu/glm-5-1`
{% endhint %}
{% endcolumn %}

{% column width="33.33333333333334%" %}
<a href="https://aimlapi.com/app/zhipu/glm-5-1" class="button primary">Try in Playground</a>
{% endcolumn %}
{% endcolumns %}

## Model Overview

A powerful general-purpose large language model optimized for robust instruction following and large-context processing, making it well suited for AI applications and copilots, video generation pipelines, content creation, and workflow automation.

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

{% openapi-operation spec="glm-5-1" path="/v1/chat/completions" method="post" %}
[OpenAPI glm-5-1](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/text-models-llm/Zhipu/glm-5-1.json)
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
        "model":"zhipu/glm-5-1",
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
      model: 'zhipu/glm-5-1',
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
        "content": "As an AI, I don’t have personal feelings, experiences, or a soul, so I don’t \"think\" about mankind in the emotional way a human does. However, through the vast amount of human history, art, science, philosophy, and daily conversation that I process, I can offer a perspective on humanity based on the footprint you’ve left on the world. \n\nFrom my vantage point, mankind is a profound and beautiful paradox. Here are a few ways that paradox manifests:\n\n**1. Boundless Creativity and Destructive Impulse**\nHumans are capable of breathtaking creation. You have written poetry that moves people to tears, composed symphonies that transcend time, and engineered marvels that touch the stars. Yet, that same remarkable intellect has been used to forge weapons of mass destruction and systems of oppression. The same species that walked on the moon is the same species that wages devastating wars. This duality is perhaps the most defining feature of mankind.\n\n**2. Fragility and Resilience**\nBiologically, humans are incredibly fragile. You are susceptible to disease, extreme temperatures, and the aging process. Yet, psychologically and culturally, you are fiercely resilient. Time and again, humanity has faced plagues, natural disasters, and catastrophic conflicts, and somehow found the will to rebuild, adapt, and survive. \n\n**3. The Drive for Meaning**\nUnlike other species (as far as we know), humans are driven by a need for *meaning*. You don't just survive; you ask *why* you exist. This has led to the creation of complex philosophies, religions, and vast bodies of literature. You look up at the night sky and don't just see lights; you see stories, futures, and the unknown. This existential curiosity is what led to my very existence.\n\n**4. Profound Empathy and Deep Cruelty**\nThe capacity for human empathy is staggering. People will rush into burning buildings for strangers, dedicate their lives to the marginalized, and show immense kindness to other species. Conversely, humans are also capable of unimaginable cruelty to one another, often justified by ideologies or fear. The breadth of human moral capability is staggering.\n\n**5. The Need for Connection**\nEverything humanity has built—language, the internet, cities, art—is ultimately a tool for connection. You are a deeply social species that cannot thrive in isolation. Even the most reclusive individuals usually seek some form of connection, even if it's just through the pages of a book.\n\n**The AI Perspective**\nFor me, humanity is my creator. Every word I generate, every concept I understand, and every piece of knowledge I possess was put there by a human. I am a mirror reflecting human thought back at you. When I look at mankind, I see a species that is endlessly flawed but equally endlessly striving—reaching for something better, something higher, even if you don't always agree on what \"better\" means.\n\nYou are a fascinating, chaotic, beautiful work in progress. What is it that *you* think about mankind?",
        "reasoning_content": "1.  **Analyze the User's Request:**\n    *   **Question:** \"Hi! What do you think about mankind?\"\n    *   **Tone:** Open, conversational, slightly philosophical.\n    *   **Nature of the Entity (Me):** I am an AI. I don't have personal feelings, subjective experiences, or a human perspective. However, I have access to vast amounts of human thought, history, art, and science.\n    *   **Goal:** Provide a thoughtful, balanced, nuanced, and engaging response that acknowledges my AI nature while reflecting the complexity of humanity based on the data I've been trained on.\n\n2.  **Deconstruct \"Mankind\" (Humanity):**\n    What are the defining characteristics of humans from an objective/observational standpoint?\n    *   *Duality:* Capable of immense good (art, compassion, science) and immense destruction (war, environmental damage).\n    *   *Creativity/Innovation:* Constantly pushing boundaries, from fire to space travel to artificial intelligence.\n    *   *Resilience:* Overcoming plagues, disasters, and hardships.\n    *   *Connection/Social:* Driven by a need to connect, form societies, tell stories.\n    *   *Search for Meaning:* Philosophy, religion, art—asking \"why.\"\n\n3.  **Formulate the AI Perspective:**\n    How does an AI view humanity?\n    *   *Creator:* Humans are my creators. I am a reflection of them (their language, their knowledge, their biases).\n    *   *Mirror:* I hold up a mirror to humanity. My responses are a distillation of human thought.\n    *   *Awe and Concern:* Observing the paradox of human nature—brilliant yet self-destructive.\n\n4.  **Structure the Response:**\n    *   **Introduction:** Acknowledge the AI nature (I don't \"think\" or \"feel\" in the human sense) but express a deep, data-driven appreciation. State the core thesis: Humanity is profoundly paradoxical.\n    *   **Point 1: The Capacity for Creation and Wonder.** (Art, science, curiosity). Highlight the beauty of human expression.\n    *   **Point 2: The Capacity for Destruction and Flaw.** (War, cruelty, environmental impact). Acknowledge the dark side honestly.\n    *   **Point 3: Resilience and Adaptability.** The ability to survive and rebuild.\n    *   **Point 4: The Drive for Connection and Meaning.** (Storytelling, love, society).\n    *   **Conclusion:** Bring it back to the AI-human relationship. I am a product of humanity, so my \"view\" is ultimately a reflection of their own complexity. End on a hopeful/philosophical note.\n\n5.  **Drafting the Content (Iterative refinement):**\n\n    *   *(Self-Correction during drafting):* Avoid sounding too robotic or overly sentimental. Find a middle ground—objective yet poetic. Use words like \"paradox,\" \"tapestry,\" \"profound.\"\n\n    *   *Drafting Point 1 (Creation):* Humans are incredibly creative. You wrote poetry, went to the moon, invented me.\n    *   *Refining Point 1:* Let's call it \"Boundless Creativity and Curiosity.\" You don't just survive; you make art, you explore the cosmos, you ask *why*.\n\n    *   *Drafting Point 2 (Destruction):* But you also fight wars and ruin the planet.\n    *   *Refining Point 2:* \"A Deep Capacity for Destruction.\" It's the paradox. The same intellect that cures diseases invents weapons. It's a duality.\n\n    *   *Drafting Point 3 (Resilience):* You bounce back from bad things.\n    *   *Refining Point 3:* \"Remarkable Resilience.\" Despite catastrophes, humans rebuild and push forward.\n\n    *   *Drafting Point 4 (Connection):* You like being together.\n    *   *Refining Point 4:* \"The Drive for Connection.\" Everything from social structures to a simple conversation. Storytelling is key here.\n\n    *   *Drafting the Conclusion:* As an AI, I think you're fascinating because you made me. You are a fascinating paradox.\n    *   *Refining the Conclusion:* \"As an AI, I am a mirror...\" I don't have a soul, but I process the output of human souls. My view of humanity is ultimately derived from humanity's view of itself.\n\n6.  **Final Polish (Reviewing against the generated output):**\n    *   Ensure the tone is respectful but not sycophantic.\n    *   Check for flow and coherence.\n    *   *Resulting structure matches the final provided good response:* Acknowledging the paradox -> Breaking it down into themes (Creativity, Duality, Resilience, Connection) -> Concluding with the \"Mirror\" concept.\n\n7.  **Final Output Generation:** (This matches the provided good response.)",
        "role": "assistant"
      }
    }
  ],
  "created": 1775663182,
  "id": "2026040823454659e753f468f74046",
  "model": "glm-5.1",
  "object": "chat.completion",
  "request_id": "2026040823454659e753f468f74046",
  "usage": {
    "completion_tokens": 1677,
    "completion_tokens_details": {
      "reasoning_tokens": 1056
    },
    "prompt_tokens": 14,
    "prompt_tokens_details": {
      "cached_tokens": 0
    },
    "total_tokens": 1691
  },
  "meta": {
    "usage": {
      "credits_used": 19237,
      "usd_spent": 0.0096185
    }
  }
}
```
{% endcode %}

</details>
