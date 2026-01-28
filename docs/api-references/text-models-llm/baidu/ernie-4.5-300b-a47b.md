# ernie-4.5-300b-a47b

{% columns %}
{% column width="66.66666666666666%" %}
{% hint style="info" %}
This documentation is valid for the following list of our models:

* `baidu/ernie-4.5-300b-a47b`
{% endhint %}
{% endcolumn %}

{% column width="33.33333333333334%" %}
<a href="https://aimlapi.com/app/baidu/ernie-4-5-300b-a47b" class="button primary">Try in Playground</a>
{% endcolumn %}
{% endcolumns %}

## Model Overview

A post-trained LLM with 300B total parameters and 47B activated parameters per token. \
Non-reasoning variant.

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

{% openapi-operation spec="ernie-4-5-300b-a47b" path="/v1/chat/completions" method="post" %}
[OpenAPI ernie-4-5-300b-a47b](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/text-models-llm/baidu/ernie-4.5-300b-a47b.json)
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
        "model":"baidu/ernie-4.5-300b-a47b",
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
      model: 'baidu/ernie-4.5-300b-a47b',
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
  "id": "019bd682e8fd00bca8d4a94aace650ce",
  "object": "chat.completion",
  "created": 1768830462,
  "model": "baidu/ernie-4.5-300b-a47b",
  "choices": [
    {
      "index": 0,
      "message": {
        "role": "assistant",
        "content": "As an AI, I don't have personal feelings, but I can provide an analysis of humanity based on available data.\n\nMankind is an incredibly diverse and complex species, marked by remarkable achievements and significant challenges:\n\n**Strengths:**\n1. **Innovation:** Humans have developed advanced technology, from early tools to space exploration, dramatically reshaping their environments and societies.\n2. **Creativity:** Art, literature, music, and philosophy reflect profound emotional and intellectual depth.\n3. **Adaptability:** Humans thrive in nearly every climate on Earth, demonstrating remarkable resilience and resourcefulness.\n4. **Social Cooperation:** Complex societies, governments, and economies enable large-scale collaboration.\n5. **Empathy & Altruism:** Many individuals work selflessly to help others, often across cultural and geographic divides.\n\n**Challenges:**\n1. **Conflict:** War, violence, and discrimination persist due to differences in ideology, resources, or identity.\n2. **Environmental Impact:** Climate change, deforestation, and pollution threaten ecosystems and future survival.\n3. **Inequality:** Wealth gaps, access to education, and healthcare disparities undermine social stability.\n4. **Ethical Dilemmas:** Rapid technological advancements (e.g., AI, genetic engineering) raise questions about responsibility and long-term consequences.\n\n**Potential:** Humanity continues to evolve, with growing awareness of global interconnectedness. Movements for sustainability, social justice, and scientific collaboration suggest a capacity for positive change.\n\nUltimately, mankind's future depends on balancing ambition with wisdom, harnessing progress for collective well-being while addressing vulnerabilities. What aspect of humanity interests you most?"
      },
      "finish_reason": "stop"
    }
  ],
  "usage": {
    "prompt_tokens": 16,
    "completion_tokens": 371,
    "total_tokens": 387,
    "prompt_tokens_details": {
      "cached_tokens": 0
    },
    "prompt_cache_hit_tokens": 0,
    "prompt_cache_miss_tokens": 16
  },
  "system_fingerprint": "",
  "meta": {
    "usage": {
      "credits_used": 944
    }
  }
}
```
{% endcode %}

</details>
