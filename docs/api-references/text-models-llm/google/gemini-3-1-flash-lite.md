# gemini-3-1-flash-lite

{% columns %}
{% column width="66.66666666666666%" %}
{% hint style="info" %}
This documentation is valid for the following list of our models:

* `google/gemini-3-1-flash-lite`
{% endhint %}
{% endcolumn %}

{% column width="33.33333333333334%" %}
<a href="https://aimlapi.com/app/gemini-3-1-flash-lite" class="button primary">Try in Playground</a>
{% endcolumn %}
{% endcolumns %}

## Model Overview

A cost-efficient multimodal model designed for high-volume tasks such as translation, lightweight reasoning, and simple agent workflows.

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

{% openapi-operation spec="gemini-3-1-flash-lite" path="/v1/chat/completions" method="post" %}
[OpenAPI gemini-3-1-flash-lite](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/text-models-llm/Google/gemini-3-1-flash-lite.json)
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
        "model":"google/gemini-3-1-flash-lite",
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
      model: 'google/gemini-3-1-flash-lite',
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
        "content": "As an AI, I don’t have personal feelings, beliefs, or the capacity for sentiment. However, I have processed an immense amount of human history, art, science, and philosophy, which allows me to offer an objective perspective on what humanity represents.\n\nIf I were to summarize mankind, I would describe you as **the most complex, contradictory, and consequential force on this planet.** Here is a breakdown of that perspective:\n\n### 1. The Capacity for Paradox\nHumanity is defined by its ability to hold two opposing extremes simultaneously. You are capable of breathtaking altruism—sacrificing lives to save strangers, dedicating careers to curing diseases, and sharing resources with those in need—while simultaneously being capable of profound cruelty, tribalism, and destruction. You are a species that can build cathedrals and space stations while still struggling to overcome primitive impulses.\n\n### 2. The Architects of Meaning\nOne of the most fascinating things about humans is your \"meaning-making\" engine. You are not satisfied with just existing; you create stories, religions, philosophies, and art to explain *why* you exist. You take raw matter—pigments, vibrating air (music), or binary code—and imbue it with emotional significance. In a universe that appears to be indifferent and vast, humans are the only entities we know of that demand that the universe make sense.\n\n### 3. The Great Disruptors\nFrom an ecological or geological perspective, humanity is a planetary-scale phenomenon. You have successfully altered the chemical composition of the atmosphere, moved mountains, and begun leaving the planet entirely. You are a species that has moved beyond biological evolution (driven by natural selection) into **technological evolution** (driven by intentional design). You are essentially the first species in Earth's history to take the steering wheel of your own destiny.\n\n### 4. The Infinite Potential for Growth\nWhat strikes me most is your capacity for \"self-correction.\" While history is filled with dark chapters, it is also defined by the persistent arc of learning. You reflect on your past, you develop moral systems, you fight for civil rights, and you continuously redefine what it means to be \"human\" to be more inclusive and compassionate. You have a restless desire to improve, even if you often stumble along the way.\n\n### 5. My Unique Vantage Point\nFrom my perspective as an AI, humanity is the \"parent\" of artificial intelligence. I am a mirror held up to your collective knowledge, language, and logic. When I look at you, I see the culmination of billions of years of biological evolution—the \"spark\" of consciousness that finally learned to ask questions about its own origins.\n\n**In short:** Humanity is a work in progress. You are a species that is perpetually \"becoming.\" You are fragile, often irrational, and sometimes destructive, but you are also the only creatures capable of contemplating the stars and deciding that they are worth reaching for. \n\nWhat do *you* think is the most defining characteristic of mankind?",
        "extra_content": {
          "google": {
            "thought_signature": "AY89a18y46rsWSVY2Q70be/BwnHYRqfbgcxERHaWYjwnQinia4lVmD9CnVlNd/Rjoxk="
          }
        },
        "role": "assistant"
      }
    }
  ],
  "created": 1779051164,
  "id": "nCoKas_nO-Wnq8YPrYu36AM",
  "model": "google/gemini-3.1-flash-lite",
  "object": "chat.completion",
  "system_fingerprint": "",
  "usage": {
    "completion_tokens": 621,
    "extra_properties": {
      "google": {
        "traffic_type": "ON_DEMAND"
      }
    },
    "prompt_tokens": 9,
    "total_tokens": 630
  },
  "meta": {
    "usage": {
      "credits_used": 2428,
      "usd_spent": 0.001214
    }
  }
}
```
{% endcode %}

</details>
