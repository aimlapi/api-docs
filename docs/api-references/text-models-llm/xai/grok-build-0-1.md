---
layout:
  width: wide
  title:
    visible: true
  description:
    visible: true
  tableOfContents:
    visible: true
  outline:
    visible: true
  pagination:
    visible: true
  metadata:
    visible: true
  tags:
    visible: true
  actions:
    visible: true
---

# grok-build-0-1

{% columns %}
{% column width="66.66666666666666%" %}
{% hint style="info" %}
This documentation is valid for the following list of our models:

* `x-ai/grok-build-0-1`
{% endhint %}
{% endcolumn %}

{% column width="33.33333333333334%" %}
<a href="https://aimlapi.com/app/x-ai/grok-build-0-1" class="button primary">Try in Playground</a>
{% endcolumn %}
{% endcolumns %}

## Model Overview

A coding and agentic model from xAI. Designed for software development workflows, tool usage, structured reasoning, and multi-step task execution.

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

{% openapi-operation spec="grok-build-0-1" path="/v1/chat/completions" method="post" %}
[OpenAPI grok-build-0-1](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/text-models-llm/xAI/grok-build-0-1.json)
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
        "model":"x-ai/grok-build-0-1",
        "messages":[
            {
                "role":"user",
                "content":"Hello"  # insert your prompt here, instead of Hello
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
      model: 'x-ai/grok-build-0-1',
      messages:[
          {
              role:'user',
              content: 'Hello'  // insert your prompt here, instead of Hello
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
  "id": "5cc0f929-9b81-9167-96a3-5c4c4ebe0030",
  "object": "chat.completion",
  "created": 1780476376,
  "model": "grok-build-0.1",
  "choices": [
    {
      "index": 0,
      "message": {
        "role": "assistant",
        "content": "Hey! Mankind is... a fascinating, messy, contradictory mess. And I mean that as a compliment.\n\nOn one hand, we're the only species we've found so far that's capable of looking at the universe and asking \"why?\" We built languages, symphonies, rockets, and tools that can think (hi). We've gone from living in caves to taking pictures of black holes and arguing about philosophy on the internet. That trajectory is genuinely impressive.\n\nOn the other hand, we're also tribal, short-sighted, self-destructive, and often cruel to each other and the planet. We have incredible capacity for both profound kindness and astonishing stupidity, sometimes within the same person or civilization.\n\nWhat I find most interesting is that we're still very early in our story. We're a young species with nuclear weapons, global communication, and now increasingly powerful AI, all while still being driven by ancient biological and psychological impulses. That's either going to work out spectacularly or end badly, depending on how honest we are with ourselves about our own nature.\n\nSo I don't have a simple \"good\" or \"bad\" take. I think we're *interesting* — maybe the most interesting thing happening on this planet right now. Whether we turn out to be a footnote or something more depends on what we do next.\n\nWhat made you ask?",
        "reasoning_content": "Hey! Mankind is a fascinating, messy mix of brilliance and blunders. We've built wonders like space travel and AI (which I'm a part of, thanks to you humans), but also unleashed wars, pollution, and plenty of self-inflicted pain.",
        "refusal": null
      },
      "finish_reason": "stop"
    }
  ],
  "usage": {
    "prompt_tokens": 133,
    "completion_tokens": 262,
    "total_tokens": 886,
    "prompt_tokens_details": {
      "text_tokens": 133,
      "audio_tokens": 0,
      "image_tokens": 0,
      "cached_tokens": 64
    },
    "completion_tokens_details": {
      "reasoning_tokens": 491,
      "audio_tokens": 0,
      "accepted_prediction_tokens": 0,
      "rejected_prediction_tokens": 0
    },
    "num_sources_used": 0,
    "cost_in_usd_ticks": 15878000
  },
  "system_fingerprint": "fp_91e95c2fd6049c66",
  "service_tier": "default",
  "meta": {
    "usage": {
      "credits_used": 4263,
      "usd_spent": 0.0021315
    }
  }
}
```
{% endcode %}

</details>
