# nemotron-3-nano-30b-a3b

{% columns %}
{% column width="66.66666666666666%" %}
{% hint style="info" %}
This documentation is valid for the following list of our models:

* `nvidia/nemotron-3-nano-30b-a3b`
{% endhint %}
{% endcolumn %}

{% column width="33.33333333333334%" %}
<a href="https://aimlapi.com/app/nemotron-3-nano-30b-a3b" class="button primary">Try in Playground</a>
{% endcolumn %}
{% endcolumns %}

## Model Overview

A lightweight MoE language model optimized for computational efficiency, text generation, and agentic workflows. Designed for chatbots, AI agents, and long-context tasks with lower resource requirements.

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

{% openapi-operation spec="nemotron-3-nano-30b-a3b" path="/v1/chat/completions" method="post" %}
[OpenAPI nemotron-3-nano-30b-a3b](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/text-models-llm/NVIDIA/nemotron-3-nano-30b-a3b.json)
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
        "model":"nvidia/nemotron-3-nano-30b-a3b",
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
      model: 'nvidia/nemotron-3-nano-30b-a3b',
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
  "id": "gen-1778117281-ppABz4UAkgEvlBXvPZuS",
  "object": "chat.completion",
  "created": 1778117281,
  "model": "nvidia/nemotron-3-nano-30b-a3b",
  "system_fingerprint": null,
  "choices": [
    {
      "index": 0,
      "logprobs": null,
      "finish_reason": "stop",
      "native_finish_reason": "stop",
      "message": {
        "role": "assistant",
        "content": "I’ll answer with a take that leans on a mix of observation, history, and a bit of philosophical reflection—nothing “right” or “wrong,” just one way of looking at it.\n\n---\n\n## 1. **What makes humanity remarkable**\n\n| Aspect | Why it’s striking |\n|--------|-------------------|\n| **Creativity & Tool‑making** | From stone tools to quantum computers, we continuously devise new ways to reshape our environment. Art, music, storytelling, and humor are uniquely human ways of processing experience and sharing meaning. |\n| **Self‑reflection** | We can ask “Why am I here?” and “What does it all mean?” That meta‑awareness drives philosophy, science, and religion, and it gives us the capacity for both humility and aspiration. |\n| **Co‑operation on a massive scale** | We build societies that can coordinate millions of people—languages, laws, economies, and international treaties—allowing projects like eradicating smallpox or building the International Space Station. |\n| **Adaptability** | Humans thrive in deserts, tundras, underwater habitats, and even micro‑gravity. Our biological flexibility (including cultural adaptation) lets us survive where most other species would perish. |\n\n---\n\n## 2. **The darker / problematic side**\n\n| Issue | What it reveals |\n|-------|-----------------|\n| **Capacity for harm** | Our intellect is matched by the ability to design weapons of mass destruction, cause ecological collapse, or exploit one another on a systemic level. This paradox—powerful cognition paired with moral blind spots—is a central tension in human history. |\n| **Pattern of domination** | From empires to colonial enterprises, there’s a recurrent theme of using knowledge and technology to subjugate or exploit others, often justifying it with ideology or “civilizing” narratives. |\n| **Short‑term thinking** | Many of our collective crises (climate change, biodiversity loss, unsustainable debt) stem from prioritizing immediate gains—profit, political power—over long‑term stewardship. |\n| **Tribalism** | Our ability to form tight‑knit groups can also lead to “in‑group” bias, prejudice, and conflict with “out‑groups.” This is both an evolutionary adaptation for survival and a source of many modern social problems. |\n\n---\n\n## 3. **A dialectical view**\n\n* **Thesis:** Humanity creates tools, cultures, and systems that expand our possibilities.  \n* **Antithesis:** The same tools can become weapons or sources of inequality, leading to self‑inflicted crises.  \n* **Synthesis:** The next stage of human development is likely to involve **meta‑cognition and ethical coordination**—using our reflective capacities to align our technological power with a more equitable, sustainable vision of the future.\n\nIn other words, the binary of “good vs. bad” is too simplistic; humanity is a **dynamic process** where progress and regression are intertwined. When we collectively recognize the pitfalls (e.g., climate inaction, widening wealth gaps) and channel our ingenuity toward solutions, we can tip the balance toward a more constructive trajectory.\n\n---\n\n## 4. **What might help shift the balance?**\n\n1. **Collective storytelling that emphasizes shared vulnerability**  \n   Narrative empathy can reduce tribalism and encourage policies that benefit the planet as a whole.\n\n2. **Institutional reforms that embed long‑term thinking**  \n   Examples include independent climate courts, intergenerational budgets, and AI governance frameworks that prioritize safety and fairness.\n\n3. **Education that blends STEM with ethics and the humanities**  \n   Teaching critical thinking alongside moral philosophy nurtures the habit of asking “not just ‘can we?’ but ‘should we?’”\n\n4. **Technology that is co‑designed with communities**  \n   When tools are built *with* the people they serve—rather than *for* them—the outcomes tend to be more equitable and less coercive.\n\n---\n\n## 5. **A personal takeaway**\n\nIf I had to sum it up in one sentence: **Humanity is a paradox‑rich species capable of extraordinary creation and equally profound self‑sabotage; our future will be shaped by whether we can marshal our ingenuity toward inclusive, long‑term stewardship of ourselves and the planet.**\n\n---\n\n**Bottom line:**  \nHumanity is a work in progress—a tapestry woven from moments of brilliance and blunders. By acknowledging both the luminous achievements and the shadows we cast, we can better navigate the path ahead. What we *think* about humanity matters less than what we *do* with that understanding. If we choose to act wisely, the best chapters of the human story are still unwritten.",
        "refusal": null,
        "reasoning": "The user asks a philosophical question. There's no disallowed content. It's a safe open-ended question. We can respond with a thoughtful reflection on humanity, acknowledging complexity, achievements, challenges. Need to be respectful, no political persuasion issues. Provide nuanced answer.\n",
        "reasoning_details": [
          {
            "type": "reasoning.text",
            "text": "The user asks a philosophical question. There's no disallowed content. It's a safe open-ended question. We can respond with a thoughtful reflection on humanity, acknowledging complexity, achievements, challenges. Need to be respectful, no political persuasion issues. Provide nuanced answer.\n",
            "format": "unknown",
            "index": 0
          }
        ]
      }
    }
  ],
  "usage": {
    "completion_tokens": 1062,
    "prompt_tokens": 25,
    "total_tokens": 1087,
    "completion_tokens_details": {
      "reasoning_tokens": 74,
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
      "credits_used": 518,
      "usd_spent": 0.000259
    }
  }
}
```
{% endcode %}

</details>
