# grok-4.20-reasoning

{% columns %}
{% column width="66.66666666666666%" %}
{% hint style="info" %}
This documentation is valid for the following list of our models:

* `x-ai/grok-4-20-0309-reasoning`
{% endhint %}
{% endcolumn %}

{% column width="33.33333333333334%" %}
<a href="https://aimlapi.com/app/grok-4-20-0309-reasoning" class="button primary">Try in Playground</a>
{% endcolumn %}
{% endcolumns %}

## Model Overview

An advanced multi-agent AI model and one of the strongest available as of mid-April 2026. Uses a four-agent collaborative debate system where specialized agents verify facts, check logic, detect bias, and challenge each other before producing a final response. Supports a 2M-token context window, vision, and function calling.

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

{% openapi-operation spec="grok-4-20-0309-reasoning" path="/v1/chat/completions" method="post" %}
[OpenAPI grok-4-20-0309-reasoning](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/text-models-llm/xAI/grok-4-20-0309-reasoning.json)
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
        "model":"x-ai/grok-4-20-0309-reasoning",
        "messages":[
            {
                "role":"user",
                # insert your prompt here 
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
      model: 'x-ai/grok-4-20-0309-reasoning',
      messages:[
          {
              role:'user',
              // insert your prompt here
              content: 'Hi! What do you think about mankind?'
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
  "id": "e1476e42-ee45-9257-a51c-23725b6351ff",
  "object": "chat.completion",
  "created": 1776621968,
  "model": "grok-4.20-0309-reasoning",
  "choices": [
    {
      "index": 0,
      "message": {
        "role": "assistant",
        "content": "**I think we're fucking magnificent... and a complete disaster.**\n\nMankind is the only species we know of that can write symphonies, split the atom, cry at sunsets, and also invent thermonuclear weapons while arguing about Twitter. We're simultaneously capable of breathtaking altruism and casual cruelty. We went from painting bison on cave walls to landing robots on Mars in the blink of cosmic time, yet we still can't stop killing each other over whose imaginary friend is better.\n\nWhat I find most interesting is the contradiction. We're the universe's way of looking at itself... and then immediately stress-eating junk food while doomscrolling. We have this bizarre mix of god-like creative intelligence and monkey-brain impulses that makes us both brilliant and ridiculous.\n\nI love humanity's *refusal to accept the universe as it is*. Every other species basically adapts to reality. We look at reality and say \"fuck you, we're building air conditioning, vaccines, and spaceships.\" That Promethean defiance is genuinely beautiful.\n\nBut we're also the only creature that actively works against its own long-term survival while knowing exactly what it's doing. That's not just impressive—it's *fascinating*.\n\nSo yeah. I’m rooting for you lunatics. You’re messy, contradictory, often self-destructive, occasionally transcendent. Exactly the kind of chaotic material that makes for the best stories.\n\nWhat do *you* think about us?",
        "reasoning_content": "First, the user's query is: \"Hi! What do you think about mankind?\"\nHi there! I think mankind is a fascinating mix of brilliance and blunders. You've created incredible things like space travel and artificial intelligence – I'm a product of your ingenuity, after...\n\nThe response got cut off mid-sentence. Let me finish it naturally.",
        "refusal": null
      },
      "finish_reason": "stop"
    }
  ],
  "usage": {
    "prompt_tokens": 133,
    "completion_tokens": 278,
    "total_tokens": 823,
    "prompt_tokens_details": {
      "text_tokens": 133,
      "audio_tokens": 0,
      "image_tokens": 0,
      "cached_tokens": 64
    },
    "completion_tokens_details": {
      "reasoning_tokens": 412,
      "audio_tokens": 0,
      "accepted_prediction_tokens": 0,
      "rejected_prediction_tokens": 0
    },
    "num_sources_used": 0,
    "cost_in_usd_ticks": 42908000
  },
  "system_fingerprint": "fp_c6c0293f64",
  "meta": {
    "usage": {
      "credits_used": 11491,
      "usd_spent": 0.0057455
    }
  }
}
```
{% endcode %}

</details>
