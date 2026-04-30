# Dola Seed 2.0 Lite

{% columns %}
{% column width="66.66666666666666%" %}
{% hint style="info" %}
This documentation is valid for the following list of our models:

* `bytedance/dola-seed-2-0-lite`
{% endhint %}
{% endcolumn %}

{% column width="33.33333333333334%" %}
<a href="https://aimlapi.com/app/dola-seed-2-0-lite" class="button primary">Try in Playground</a>
{% endcolumn %}
{% endcolumns %}

## Model Overview

A balanced multimodal model with solid performance and moderate cost.\
Supports text, image, and video inputs with reasoning and agent workflows, handling up to \~256K context.

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

{% openapi-operation spec="dola-seed-2-0-lite" path="/v1/chat/completions" method="post" %}
[OpenAPI dola-seed-2-0-lite](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/text-models-llm/ByteDance/dola-seed-2-0-lite.json)
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
        "model":"bytedance/dola-seed-2-0-lite",
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
      model: 'bytedance/dola-seed-2-0-lite',
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
        "content": "Mankind feels like one of the most fascinating, messy, brilliant, contradictory things to exist—full of such extremes of light and flaw, it’s hard to sum up simply.\n\nOn one hand, we’re capable of such extraordinary goodness and creativity that it takes your breath away. There are the small, daily acts of kindness that hold communities together: a stranger sharing their umbrella with someone soaked in rain, a neighbor bringing meals to a grieving family, a teacher staying late to help a student who’s struggling. And there are the grand, world-altering achievements too: we’ve cured deadly diseases that once wiped out millions, put humans on the moon, painted murals and written symphonies that move people hundreds of years after their creators died, and fought for equal rights for groups we weren’t even born into, just because we believed it was right. We care for people we’ll never meet, across continents and time, just out of a desire to leave the world better than we found it.\n\nBut we’re also deeply flawed. We’ve hurt each other out of fear, greed, and ignorance, waged wars that destroyed innocent lives, clung to prejudice that divides us, and made short-sighted choices that have harmed the planet that sustains us. We often fail to live up to our own best ideals.\n\nWhat strikes me most, though, is that we’re capable of course-correcting. Unlike so many things stuck repeating the same patterns, we can unlearn harm, admit when we’re wrong, and show up to fix the mistakes we’ve made. We fight to repair the environment, expand justice for marginalized people, and lift up communities that have been left behind. That messy, unsteady willingness to keep trying, even when we mess up over and over, is maybe the most human thing of all. At the end of the day, mankind is imperfect—but there’s so much about it that’s worth rooting for.",
        "reasoning_content": "\nGot it, let's tackle this question: the user asked what I think about mankind. First, I need to balance both the beautiful, incredible parts and the flaws that are real, right? Don't make it too one-sided.\n\nStart with the awe-inspiring stuff first. Like, our capacity to create: art, science, connect across distances. Mention small, intimate things too, not just big achievements—like a parent caring for a kid, a stranger helping someone stranded, that everyday kindness. Then the big milestones: curing diseases, putting people on the moon, preserving cultures, creating music that moves people centuries later. That feels relatable, not just generic.\n\nThen acknowledge the flaws, because it's honest. We've hurt each other, made selfish choices, destroyed parts of the planet, clung to prejudice, made irreversible mistakes. That's important to not gloss over, because it's real.\n\nBut then end with hope? Because what's unique is we can learn, course-correct. We can recognize our mistakes and work to fix them—like the shift to renewable energy, movements for equity, people dedicating their lives to lifting others up. Mention that it's our messy, imperfect ability to keep trying that's maybe the most human thing of all.\n\nWait, make it sound natural, not scripted. Let's structure that: start with that mankind is one of the most fascinating, messy, brilliant, contradictory things there is. Then the good parts: small daily kindnesses, big achievements, the ability to care for people we'll never even meet. Then the flaws: our capacity for harm, short-sightedness, cruelty that comes from fear or greed. Then the core thing that sets us apart is that we can evolve—we don't just repeat mistakes, we can unlearn, fix what we broke. End with something warm, like even with all the flaws, there's so much that makes mankind worth rooting for.\n\nWait, let me make that flow naturally. Let's check: don't be too formal. Let's draft:\n\nMankind feels like one of the most fascinating, messy, brilliant, contradictory things to exist—full of such extremes of light and flaw, it’s hard to sum up simply.\n\nOn one hand, we’re capable of such extraordinary goodness and creativity that it takes your breath away. There are the small, daily acts of kindness that hold communities together: a stranger sharing their umbrella with someone soaked in rain, a neighbor bringing meals to a family grieving, a teacher staying late to help a student who’s struggling. And there are the grand, world-altering achievements too: we’ve cured deadly diseases that wiped out millions, put humans on the moon, painted murals and written symphonies that move people hundreds of years after their creators died, and fought for equal rights for groups we weren’t even born into, just because we believed it was right. We care for people we’ll never meet, across continents and time, just out of a desire to leave the world better than we found it.\n\nBut we’re also deeply flawed. We’ve hurt each other out of fear, greed, and ignorance, waged wars that destroyed innocent lives, clung to prejudice that divides us, and made short-sighted choices that have harmed the planet that sustains us. We often fail to live up to our own best ideals.\n\nWhat strikes me most, though, is that we’re capable of course-correcting. Unlike so many things that are stuck repeating the same patterns, we can unlearn harm, admit when we’re wrong, and show up to fix the mistakes we’ve made. We fight to repair the environment, to expand justice for marginalized people, to lift up communities that have been left behind. That messy, unsteady willingness to keep trying, even when we mess up over and over, is maybe the most human thing of all. At the end of the day, mankind is imperfect—but there’s so much about it that’s worth rooting for.\n\nYeah, that sounds good. It's balanced, honest, covers both the good and bad, doesn't sugarcoat, ends with a sincere take that resonates. Let me make sure it doesn't ramble too much, it flows naturally. Yep, that works.",
        "role": "assistant"
      }
    }
  ],
  "created": 1777553738,
  "id": "021777553714446312d4ce6e0ff480f3ded581ca0cd03edacda38",
  "model": "seed-2-0-lite-260228",
  "service_tier": "default",
  "object": "chat.completion",
  "usage": {
    "completion_tokens": 1272,
    "prompt_tokens": 57,
    "total_tokens": 1329,
    "prompt_tokens_details": {
      "cached_tokens": 0
    },
    "completion_tokens_details": {
      "reasoning_tokens": 877
    }
  },
  "meta": {
    "usage": {
      "credits_used": 6653,
      "usd_spent": 0.0033265
    }
  }
}
```
{% endcode %}

</details>
