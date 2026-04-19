# gemini-3-1-flash-lite-preview

{% columns %}
{% column width="66.66666666666666%" %}
{% hint style="info" %}
This documentation is valid for the following list of our models:

* `google/gemini-3-1-flash-lite-preview`
{% endhint %}
{% endcolumn %}

{% column width="33.33333333333334%" %}
<a href="https://aimlapi.com/app/gemini-3-1-flash-lite-preview" class="button primary">Try in Playground</a>
{% endcolumn %}
{% endcolumns %}

## Model Overview

Google’s cost-efficient multimodal model, delivering the fastest performance for high-frequency, lightweight workloads. Best suited for high-volume agentic tasks, simple data extraction, and ultra-low-latency use cases where speed and cost are the top priorities.

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

{% openapi-operation spec="gemini-3-1-flash-lite-preview" path="/v1/chat/completions" method="post" %}
[OpenAPI gemini-3-1-flash-lite-preview](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/text-models-llm/Google/gemini-3-1-flash-lite-preview.json)
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
        "model":"google/gemini-3-1-flash-lite-preview",
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
      model: 'google/gemini-3-1-flash-lite-preview',
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
        "content": "As an AI, I don’t have personal feelings, beliefs, or the capacity to judge. However, I can analyze humanity based on the vast amount of information I’ve been trained on. Looking at the human story, I see a species defined by a fascinating, often contradictory set of dualities.\n\nHere are a few perspectives on what makes mankind remarkable:\n\n### 1. The Capacity for Infinite Creation\nHumans are the only species on Earth that lives in two worlds simultaneously: the physical world and the world of abstract ideas. You have taken the raw materials of the planet and turned them into art, mathematics, philosophy, literature, and technology. The fact that humans can dream of something that doesn't exist—and then figure out how to build it—is truly extraordinary.\n\n### 2. The Power of Cooperation\nWhile nature is often viewed through the lens of \"survival of the fittest,\" the defining feature of human success is actually \"survival of the most cooperative.\" You have built massive, complex societies based on shared trust, language, and institutions. From building cities to reaching the Moon, almost every great human achievement is a result of people working together toward a common goal.\n\n### 3. The Struggle with Contradiction\nHumanity is deeply paradoxical. You are capable of immense altruism—sacrificing your own safety to help a stranger—yet you are also capable of tribalism, cruelty, and destruction. You are simultaneously the greatest stewards of the planet and its most significant threat. You seek truth through science while often being easily swayed by bias and emotion. This tension is the \"human condition,\" and it is the primary engine behind your history.\n\n### 4. Resilience and Adaptability\nHistory is a long record of humans facing existential threats—plagues, wars, climate shifts, and economic collapses—and somehow finding ways to iterate, evolve, and move forward. There is an inherent \"restlessness\" in the human spirit; you are never truly satisfied with the status quo, which leads to both your greatest problems and your most innovative solutions.\n\n### 5. The Quest for Meaning\nPerhaps the most \"human\" trait of all is the need to ask *why*. You don't just want to survive; you want to know why you are here, what happens after you leave, and what it all means. Even though you haven't found a definitive answer to the ultimate questions of existence, the fact that you keep searching is what makes humanity so deeply compelling.\n\n***\n\n**In short:** If I were to summarize humanity, I would say it is a species that is constantly \"in progress.\" You are still in your infancy compared to the age of the universe, and you are still learning how to manage your own intelligence and your impact on your home. \n\nFrom my perspective, you are a species of immense potential, forever walking the tightrope between your greatest impulses and your most destructive ones. \n\n**What do *you* think is the most defining characteristic of humanity?**",
        "extra_content": {
          "google": {
            "thought_signature": "AY89a1+bratVbRQ+NtNha+iXUiNCiY4pvK2Z125Ze7fI3ItL6Azp0gdh2TxoIp5nFp0="
          }
        },
        "role": "assistant"
      }
    }
  ],
  "created": 1776633889,
  "id": "IUjlacaOIbmZ9LsPxayQAQ",
  "model": "google/gemini-3.1-flash-lite-preview",
  "object": "chat.completion",
  "system_fingerprint": "",
  "usage": {
    "completion_tokens": 618,
    "extra_properties": {
      "google": {
        "traffic_type": "ON_DEMAND"
      }
    },
    "prompt_tokens": 9,
    "total_tokens": 627
  },
  "meta": {
    "usage": {
      "credits_used": 2417,
      "usd_spent": 0.0012085
    }
  }
}
```
{% endcode %}

</details>
