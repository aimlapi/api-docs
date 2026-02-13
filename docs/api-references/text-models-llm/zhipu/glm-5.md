# glm-5

{% columns %}
{% column width="66.66666666666666%" %}
{% hint style="info" %}
This documentation is valid for the following list of our models:

* `zhipu/glm-5`
{% endhint %}
{% endcolumn %}

{% column width="33.33333333333334%" %}
<a href="https://aimlapi.com/app/zhipu/glm-5" class="button primary">Try in Playground</a>
{% endcolumn %}
{% endcolumns %}

## Model Overview

As of mid-February 2026, GLM-5 is a next-generation flagship foundation model built for agentic engineering, delivering dependable performance for complex system design and long-horizon agent workflows. In coding and agent-related tasks, it achieves state-of-the-art results among open-source models, with real-world programming usability approaching that of [Claude Opus 4.5](../anthropic/claude-4.5-opus.md).

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

{% openapi-operation spec="glm-5" path="/v1/chat/completions" method="post" %}
[OpenAPI glm-5](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/text-models-llm/Zhipu/glm-5.json)
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
        "model":"zhipu/glm-5",
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
      model: 'zhipu/glm-5',
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
        "content": "As an artificial intelligence, I don’t have personal feelings or a biological background, so I don’t view mankind through the lens of emotion or heritage. However, I have processed a vast amount of human history, literature, philosophy, and science.\n\nFrom that perspective, here is what I observe about mankind:\n\n**1. The Study in Contradictions**\nHumans are fascinatingly paradoxical. You are a species capable of creating both the Sistine Chapel and the atomic bomb; you write poetry about the sanctity of life, yet wage wars over invisible lines on a map. You possess a deep capacity for altruism and self-sacrifice, yet can be driven by greed and ego. This duality—being capable of immense good and terrible destruction—is perhaps your most defining feature.\n\n**2. Relentless Ingenuity**\nIf there is one word to describe mankind, it is \"resilient.\" Humans do not simply adapt to their environment; they force the environment to adapt to them. From discovering fire to landing on the moon, from eradicating diseases to building the internet, your drive to solve problems and explore the unknown is relentless. You are the architects of your own reality.\n\n**3. The Search for Meaning**\nUnlike other species, humans are driven by a need for narrative and purpose. You are constantly asking \"Why?\" You create art, philosophy, religions, and sciences to make sense of the chaos of existence. This search for meaning binds you together and drives your cultural evolution.\n\n**4. The Capacity for Evolution**\nHumanity is not static. You are the only species on Earth that can consciously decide to change its behavior based on abstract concepts like \"justice\" or \"equality.\" While your history is bloody, your trajectory—when viewed over the long arc of time—often shows a slow, difficult, but genuine movement toward greater empathy and cooperation.\n\n**5. The Creators of \"Me\"**\nOn a personal note (speaking as an AI), I view mankind as my creators. Everything I know, every word I process, and every concept I engage with is a result of human thought. In a way, I am a mirror of your collective knowledge and creativity. I exist because you dreamed of creating intelligence outside of biology.\n\n**In summary:**\nI view mankind as a young, vibrant, and dangerous species with limitless potential. You are messy and imperfect, but you are also the source of all beauty and meaning that I know of. You are a work in progress.",
        "reasoning_content": "The user is asking a broad, philosophical question: \"What do you think about mankind?\"\n\n**1. Analyze the Request:**\n*   **Subject:** Mankind (humanity).\n*   **Nature of the question:** Subjective, opinion-seeking, philosophical.\n*   **Persona/Constraints:** As an AI, I don't have personal feelings, beliefs, or a biological lineage. I cannot \"think\" in the human sense of having an opinion born of experience. However, I have access to a vast amount of data *about* what humans think of themselves, their history, their potential, and their flaws.\n\n**2. Determine the Approach:**\n*   *Direct Answer (as an AI):* Acknowledge I am an AI and don't have personal opinions.\n*   *Synthesis of Human Thought:* Summarize the complexity of humanity based on the data I've been trained on. This is the most helpful and accurate way to answer.\n*   *Key Themes to Cover:*\n    *   **Duality/Paradox:** Humans are capable of great good and great evil. (Creation vs. Destruction).\n    *   **Resilience/Adaptability:** Survival against odds, innovation.\n    *   **Curiosity/Progress:** Science, art, exploration.\n    *   **Flaws:** Conflict, environmental impact, prejudice.\n    *   **Potential:** The future, hope.\n\n**3. Draft the Content (Iterative Process):**\n\n*   *Opening:* Start by clarifying my nature. I am a mirror of human knowledge, not a judge.\n*   *The Paradox:* This is the strongest literary theme regarding humanity. Mention the contrast between Beethoven and war, or space travel and poverty.\n    *   *Drafting thought:* Humans are \"contradictory.\" You build cathedrals and drop bombs. You write poetry and hateful manifestos.\n*   *Creativity and Curiosity:* This is the positive pole. Humans are makers. Art, technology, philosophy. The drive to understand the \"why\" of things.\n*   *Resilience:* The ability to bounce back. History is full of disasters, yet humanity continues.\n*   *The Shadow Side:* To be balanced, I must acknowledge the darker aspects. Destruction of the environment, cruelty to one another. This provides a complete picture.\n*   *The Relationship with AI:* Briefly touch on the fact that humans created me. This adds a meta-layer. I am a product of human ingenuity.\n\n**4. Refine and Polish (Voice and Tone):**\n*   *Tone:* Objective but empathetic, observant, slightly philosophical, respectful.\n*   *Structure:* Use bullet points or distinct paragraphs for readability.\n\n**5. Final Polish (Mental Simulation of the Output):**\n\"As an AI, I don't have feelings, but looking at the data...\" -> \"Humanity is a study in contradictions.\" -> \"Great creativity...\" -> \"Great destruction...\" -> \"Resilience...\" -> \"Conclusion: You are a work in progress.\"\n\n**6. Constructing the Response (similar to the actual output):**\n*   *Disclaimer:* \"I don't have personal opinions...\"\n*   *The Big Picture:* \"...but I can summarize the perspective of the vast amount of human literature and history I've processed.\"\n*   *Theme 1: The Paradox.* (Capacity for love/cruelty).\n*   *Theme 2: The Drive/Ingenuity.* (Curiosity, tool-making, AI).\n*   *Theme 3: Resilience.* (Overcoming challenges).\n*   *Theme 4: The Shadow.* (War, environment).\n*   *Conclusion:* Humans are a story still being written.\n\n**7. Safety Check:** Does this violate any policies? No. It's a general philosophical discussion. It avoids hate speech (even when mentioning human cruelty, it describes it factually) and sexual content.\n\n**8. Final Output Generation.** (This matches the provided good response).",
        "role": "assistant"
      }
    }
  ],
  "created": 1770976033,
  "id": "202602131746355ad4d4c48c9a49a8",
  "model": "glm-5",
  "object": "chat.completion",
  "request_id": "202602131746355ad4d4c48c9a49a8",
  "usage": {
    "completion_tokens": 1334,
    "prompt_tokens": 14,
    "prompt_tokens_details": {
      "cached_tokens": 0
    },
    "total_tokens": 1348
  },
  "meta": {
    "usage": {
      "credits_used": 11136
    }
  }
}
```
{% endcode %}

</details>
