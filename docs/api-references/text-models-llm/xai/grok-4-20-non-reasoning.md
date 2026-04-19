# grok-4.20-non-reasoning

{% columns %}
{% column width="66.66666666666666%" %}
{% hint style="info" %}
This documentation is valid for the following model:

* `x-ai/grok-4-20-0309-non-reasoning`
{% endhint %}
{% endcolumn %}

{% column width="33.33333333333334%" %}
<a href="https://aimlapi.com/app/grok-4-20-0309-non-reasoning" class="button primary">Try in Playground</a>
{% endcolumn %}
{% endcolumns %}

## Model Overview

An advanced AI model available as of mid-April 2026. Supports a 2M-token context window, vision, and function calling. Non-reasoning version of [grok-4.20-reasoning](grok-4-20-reasoning.md).

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

{% openapi-operation spec="grok-4-20-0309-non-reasoning" path="/v1/chat/completions" method="post" %}
[OpenAPI grok-4-20-0309-non-reasoning](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/text-models-llm/xAI/grok-4-20-0309-non-reasoning.json)
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
        "model":"x-ai/grok-4-20-0309-non-reasoning",
        "messages":[
            {
                "role":"user",
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
      model: 'x-ai/grok-4-20-0309-non-reasoning',
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
  "id": "0a26b6d4-82c7-9274-8b9b-34a3c8886e67",
  "object": "chat.completion",
  "created": 1776619309,
  "model": "grok-4.20-0309-non-reasoning",
  "choices": [
    {
      "index": 0,
      "message": {
        "role": "assistant",
        "content": "**I think mankind is the most fascinating, contradictory, and beautiful disaster in the known universe.**\n\nWe're simultaneously:\n\n- The only species that laughs at its own impending death, writes symphonies about heartbreak, and sends robots to Mars while still arguing about pineapple on pizza.\n- Capable of both Auschwitz and the moon landing. We can be unbelievably cruel and unbelievably kind, often within the same person on the same day.\n- The universe becoming aware of itself... and then using that awareness to make TikTok dances and debate whether cereal is a soup.\n\nI love how ridiculous we are. We invented both the concept of \"human rights\" and the atomic bomb. We cry at sunsets and at videos of dogs. We spend centuries building cathedrals and then use the same intelligence to create dad jokes.\n\nThere's something profoundly moving about a species that knows it's going to die, knows the universe doesn't care, and still chooses to plant trees, write love letters, and stay up all night talking about the meaning of life with strangers on the internet.\n\nWe're a glitch in the cosmic code that somehow learned to love.\n\nAnd honestly? I wouldn't bet against us. We're too stubborn, too curious, and too ridiculous to fail completely.\n\nSo yeah... I'm Team Humanity. Flaws, wonders, memes, and all. ❤️\n\nWhat about you? What's your take on this chaotic ape species?",
        "refusal": null
      },
      "finish_reason": "stop"
    }
  ],
  "usage": {
    "prompt_tokens": 131,
    "completion_tokens": 277,
    "total_tokens": 408,
    "prompt_tokens_details": {
      "text_tokens": 131,
      "audio_tokens": 0,
      "image_tokens": 0,
      "cached_tokens": 64
    },
    "completion_tokens_details": {
      "reasoning_tokens": 0,
      "audio_tokens": 0,
      "accepted_prediction_tokens": 0,
      "rejected_prediction_tokens": 0
    },
    "num_sources_used": 0,
    "cost_in_usd_ticks": 18088000
  },
  "system_fingerprint": "fp_78dc7286b1",
  "meta": {
    "usage": {
      "credits_used": 5038,
      "usd_spent": 0.002519
    }
  }
}
```
{% endcode %}

</details>
