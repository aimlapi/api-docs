# Seed 1.8

{% columns %}
{% column width="66.66666666666666%" %}
{% hint style="info" %}
This documentation is valid for the following list of our models:

* `bytedance/seed-1-8`
{% endhint %}
{% endcolumn %}

{% column width="33.33333333334%" %}
<a href="https://aimlapi.com/app/bytedance/seed-1-8" class="button primary">Try in Playground</a>
{% endcolumn %}
{% endcolumns %}

## Model Overview

A general-purpose agentic model optimized for efficient and accurate execution of complex tasks in real-world scenarios.

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
If you need a more detailed walkthrough for setting up your development environment and making a request step by step — feel free to use our [Quickstart guide](../../../quickstart/setting-up.md).
{% endhint %}

</details>

## API Schema

{% openapi-operation spec="seed-1-8" path="/v1/chat/completions" method="post" %}
[OpenAPI seed-1-8](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/text-models-llm/ByteDance/seed-1-8.json)
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
        "model":"bytedance/seed-1-8",
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
      model: 'bytedance/seed-1-8',
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
      "logprobs": null,
      "message": {
        "content": "Hi there! That’s such a profound, layered question—mankind is equal parts breathtakingly brilliant and deeply flawed, a species still figuring itself out.\n\nOn one hand, we’re capable of extraordinary goodness and innovation: we’ve cured diseases that once wiped out entire populations, sent probes to the edges of our solar system, created art and music that transcends time and culture, and rallied by the millions to help strangers during disasters (think of the global outpouring after earthquakes or refugee crises). Our capacity for empathy, to care for someone we’ve never met, is one of our most beautiful traits.\n\nOn the other hand, we carry a heavy shadow: we’ve waged devastating wars, exploited each other and the planet for short-term gain, perpetuated systemic inequality, and pushed the natural world to the brink of crisis. These flaws aren’t inherent, but they’re a reminder of how easily we can prioritize self-interest over collective good.\n\nWhat feels most important to me, though, is that we’re a work in progress. We’ve learned from past mistakes—think of the abolition of slavery, the expansion of civil rights, the growing global movement for climate action—and we keep striving to do better. Mankind isn’t just one thing; it’s the teacher staying late to help a student, the scientist working tirelessly on a vaccine, the activist fighting for justice, and also the person making a small, kind choice each day. We have the potential to shape a more compassionate, sustainable future—we just have to keep choosing it, together.",
        "reasoning_content": "Got it, let's tackle this question: \"Hi! What do you think about mankind?\" First, I need to balance the complexity—mankind has both incredible highs and deep lows. Let's start with the positive aspects: creativity, innovation, compassion, resilience. Mention things like scientific breakthroughs (cures for diseases, space exploration), art, music, acts of kindness (helping strangers, disaster relief). Then, the challenging parts: conflict, environmental harm, inequality, cruelty. But important to frame it as a dynamic, evolving species. Maybe end on a note of hope, since we've shown the capacity to learn and improve. Let's make it heartfelt and nuanced, not too one-sided. Let's structure it:\n\n1. Greeting back, acknowledge it's a big question.\n2. The bright side: creativity, empathy, progress—examples like vaccines, renewable energy, community support.\n3. The shadow side: division, exploitation, ecological damage—examples like wars, climate crisis, inequality.\n4. The middle ground: we're a work in progress. Our capacity for growth and redemption is what stands out; we've corrected past wrongs (like civil rights movements) and keep striving for better.\n5. End with a hopeful note, emphasizing that our choices shape who we are, and there's potential for more good.\n\nLet me put that into natural language:\n\nHi there! That’s such a profound, layered question—mankind is equal parts breathtakingly brilliant and deeply flawed, a species still figuring itself out.\n\nOn one hand, we’re capable of extraordinary goodness and innovation: we’ve cured diseases that once wiped out entire populations, sent probes to the edges of our solar system, created art and music that transcends time and culture, and rallied by the millions to help strangers during disasters (think of the global outpouring after earthquakes or refugee crises). Our capacity for empathy, to care for someone we’ve never met, is one of our most beautiful traits.\n\nOn the other hand, we carry a heavy shadow: we’ve waged devastating wars, exploited each other and the planet for short-term gain, perpetuated systemic inequality, and pushed the natural world to the brink of crisis. These flaws aren’t inherent, but they’re a reminder of how easily we can prioritize self-interest over collective good.\n\nWhat feels most important to me, though, is that we’re a work in progress. We’ve learned from past mistakes—think of the abolition of slavery, the expansion of civil rights, the growing global movement for climate action—and we keep striving to do better. Mankind isn’t just one thing; it’s the teacher staying late to help a student, the scientist working tirelessly on a vaccine, the activist fighting for justice, and also the person making a small, kind choice each day. We have the potential to shape a more compassionate, sustainable future—we just have to keep choosing it, together.",
        "role": "assistant"
      }
    }
  ],
  "created": 1769655426,
  "id": "021769655407356f0a583d75381f7c0a662383f3247915e311aa6",
  "model": "seed-1-8-251228",
  "service_tier": "default",
  "object": "chat.completion",
  "usage": {
    "completion_tokens": 922,
    "prompt_tokens": 42,
    "total_tokens": 964,
    "prompt_tokens_details": {
      "cached_tokens": 0
    },
    "completion_tokens_details": {
      "reasoning_tokens": 606
    }
  },
  "meta": {
    "usage": {
      "credits_used": 3897
    }
  }
}
```
{% endcode %}

</details>
