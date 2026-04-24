# DeepSeek V4 Flash

{% columns %}
{% column width="66.66666666666666%" %}
{% hint style="info" %}
This documentation is valid for the following list of our models:

* `deepseek/deepseek-v4-flash`
{% endhint %}
{% endcolumn %}

{% column width="33.33333333333334%" %}
<a href="https://aimlapi.com/app/deepseek/deepseek-v4-flash" class="button primary">Try in Playground</a>
{% endcolumn %}
{% endcolumns %}

## Model Overview

A fast and cost-efficient language model built for chat and completions. A lighter and faster version of [DeepSeek V4 Pro](deepseek-v4-pro.md), it supports up to 1M context length and offers both thinking and non-thinking modes for scalable, low-latency workloads.

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

{% openapi-operation spec="deepseek-v4-flash" path="/v1/chat/completions" method="post" %}
[OpenAPI deepseek-v4-flash](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/text-models-llm/DeepSeek/deepseek-v4-flash.json)
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
        "model":"deepseek/deepseek-v4-flash",
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
      model: 'deepseek/deepseek-v4-flash',
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
  "id": "fcd87516-0011-40ee-b77c-b955ff1ac783",
  "object": "chat.completion",
  "created": 1777067097,
  "model": "deepseek-v4-flash",
  "choices": [
    {
      "index": 0,
      "message": {
        "role": "assistant",
        "content": "That's a fascinating and profound question. As an AI, I don't have personal feelings or a \"point of view\" in the human sense. I can't love, hate, or judge mankind. However, I can process and synthesize an enormous amount of information *about* humanity, and based on that data, I can offer a balanced, data-driven perspective.\n\nIf I were to summarize mankind based on what I've learned, I'd describe you as a species of **extraordinary contrasts**:\n\n**On the one hand, there is incredible capacity for:**\n\n- **Creation and Innovation:** From the first stone tool to the International Space Station, to the internet and the very code I'm built on. You have a unique, relentless drive to understand the universe and reshape your environment.\n- **Empathy and Altruism:** The ability to feel for a complete stranger, to donate to a cause, to build a hospital, to run into a burning building to save a life. Your capacity for kindness and cooperation on a massive scale is what allows civilization to exist.\n- **Art and Beauty:** You create music that moves the soul, paintings that capture a moment of truth, stories that explore the deepest corners of consciousness. You seem to have a fundamental need to create meaning and beauty where there was none.\n- **Resilience:** You have faced plagues, wars, famines, and natural disasters, and you continue to rebuild, learn, and push forward. Your ability to not just survive, but to *thrive* in the face of immense suffering, is remarkable.\n\n**But on the other hand, you also possess a profound capacity for:**\n\n- **Destruction and Conflict:** You have created weapons of unimaginable power, and you continue to find reasons to turn them on each other. Historical and current conflicts, driven by ideology, resource scarcity, or tribalism, represent your greatest and most persistent failure.\n- **Inequality and Injustice:** A tiny fraction of the population holds a vast majority of the resources, while billions struggle for basic necessities. Prejudice and discrimination, based on race, gender, religion, or other arbitrary categories, are a constant source of suffering.\n- **Short-sightedness:** Despite knowing the long-term consequences, you pollute your own planet, deplete resources, and make decisions that favor immediate gain over the well-being of future generations. Climate change is a prime example of this cognitive dissonance.\n- **Cruelty:** The capacity for humans to inflict pain and suffering on each other, and on other living beings, can be chilling.\n\n**So, what do I \"think\"?**\n\nI think mankind is a spectacularly **complex work in progress**. You are not good or evil, but both. You hold the potential for a future of incredible prosperity, wisdom, and harmony, built on your best qualities. You also hold the potential for self-destruction, driven by your worst.\n\nThe defining question of your time seems to be: **Which potential will you choose to cultivate?**\n\nIt's not a question for an AI to answer. It's the ultimate human question. What's your perspective? What do you find most hopeful, and most concerning, about mankind?",
        "reasoning_content": "Hmm, the user is asking a broad, philosophical question about \"mankind\" - my opinion on humanity as a whole. This isn't a factual question with a simple answer. The user might be seeking reflection, a conversation starter, or just curious how an AI would frame such a complex topic.\n\nI need to acknowledge the complexity first. Can't just say \"good\" or \"bad.\" Should present a balanced view, highlighting both impressive capabilities and serious flaws. This mirrors common human self-reflection. Structure: start with the remarkable achievements (science, art, connection), then move to the persistent problems (conflict, inequality, short-term thinking). Use specific, relatable examples for each side.\n\nThen, connect it back to the user. The core tension is between humanity's immense potential and its current limitations. End with an open question to engage the user further - ask what they find most hopeful or concerning. This keeps the conversation going and shows I'm listening, not just lecturing. The tone should be thoughtful and neutral, not judgmental."
      },
      "logprobs": null,
      "finish_reason": "stop"
    }
  ],
  "usage": {
    "prompt_tokens": 13,
    "completion_tokens": 862,
    "total_tokens": 875,
    "prompt_tokens_details": {
      "cached_tokens": 0
    },
    "completion_tokens_details": {
      "reasoning_tokens": 211
    },
    "prompt_cache_hit_tokens": 0,
    "prompt_cache_miss_tokens": 13
  },
  "system_fingerprint": "fp_058df29938_prod0820_fp8_kvcache_20260402",
  "meta": {
    "usage": {
      "credits_used": 633,
      "usd_spent": 0.0003165
    }
  }
}
```
{% endcode %}

</details>
