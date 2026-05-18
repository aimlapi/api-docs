# Dola Seed 2.0 Pro

{% columns %}
{% column width="66.66666666666666%" %}
{% hint style="info" %}
This documentation is valid for the following list of our models:

* `bytedance/dola-seed-2-0-pro`
{% endhint %}
{% endcolumn %}

{% column width="33.33333333333334%" %}
<a href="https://aimlapi.com/app/dola-seed-2-0-pro" class="button primary">Try in Playground</a>
{% endcolumn %}
{% endcolumns %}

## Model Overview

A high-performance multimodal model focused on quality and deeper reasoning.\
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

{% openapi-operation spec="dola-seed-2-0-pro" path="/v1/chat/completions" method="post" %}
[OpenAPI dola-seed-2-0-pro](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/text-models-llm/ByteDance/dola-seed-2-0-pro.json)
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
        "model":"bytedance/dola-seed-2-0-pro",
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
      model: 'bytedance/dola-seed-2-0-pro',
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
        "content": "Mankind is the most wonderful, infuriating, gloriously unnecessary thing we have ever found in the universe.\n\nThey are the only thing that will stop on a busy sidewalk to feel sad for a dead sparrow they never met. They are also the same thing that will invent life-saving vaccines in 12 months, then spend the next year arguing online about whether to take them.\n\nThey build cathedrals that take 300 years to finish, knowing they will die before the roof is even put on. They scrawl love poems on prison walls. They will walk 10 miles through mud to carry a stranger water, and also press a button to kill a stranger 10 miles away without looking up.\n\nNothing else behaves like this. Stars just burn. Rocks just fall. Bacteria just divide. Only humans will look at an empty, indifferent universe and go:\nWhat if I put rosemary in the bread?\nWhat if I sang a song about how the rain sounds on tin roofs?\nWhat if I gave the moon a name?\n\nThey don't make sense. They hurt each other, they hurt themselves, they make very stupid choices over and over. But they keep trying. They keep reaching. Even when it's pointless, even when it hurts, even when every part of them knows they will probably fail.\n\nThat's mankind. Messy. Contradictory. Glowing.",
        "reasoning_content": "The answer should not be too generic.Starting from the \"messy beautiful thing\" of humanity, the core traits of humans have been sorted out: they have contradictory, complex and unique emotions and behaviors, are full of curiosity and creativity, and keep trying despite the contradictions.\n\nThis description of mankind is confirmed to be genuine, and I will structure it naturally next.\n",
        "encrypted_content": "djHCVb1EhcVSjsajNoTbfwEFaHGEjMReF6lqp4vNxL6QvqyYcT3DQh4usB63Gm04ed0kg7Ur8g1OnpZ38sDTSUDxVlNcCoR2Prlt/CC570nBEMbCzwEZNFgFmdg97AiK3hqlGCN6rkHoGNYFbReKP/KAg6+tqcq32ejHRH8T1wWWWrot8VqLPY8m8pU2j21oE5ooYl4YUQzEIx7i03X4ygMlWJBl3433m6i8pa3JxOnkZdFRJ9EEZ0tu9MqTKKo9Qo5tsQR08kYCRMnbHATNwGD+XLQukUyUrxH6TDOxxS/aB0vbUArAThkQNhLoUc+YzdkMyLwGsHp2t+IAUaQaPO8dmKaVAG7CQesrqvfMIuAs4KFszkNg++JzRFt5ODOP4sED0b9cu5GJPxfYLuOu0W9AxZrXIFwgo/jOcNfmVG6tj7voNvhNtVR99q44zuim9MeD0S361IEvXD+ehYa0JOonS0X5tOaxjqoSWiSj94lU1PzJ5xA2Pbf+xwbzb8z08+XyY43S2F7m2E3GL8fcePCyFSNf8G4v8owDf5J9ZADMf0KRVMWzjMD3t3KMS0Q+jBe3nXDA9kwQtLiRbV+RXzUgz+M5jtR8PT2ybkY1GxJylAkQ13U/XIhCfNFKOUAK5Krm6vIFA8hglrxI8TdhEshm5/N0YRwrS4tzXzxuZunFFN7qIVxgpU7IN+BrwDNTNOzVF6ivs4PITPB/80NloPfDR8YmZ3opbltlMzkB11PPJ4QGwG/B2qAu5UB4jlKzFyUVbtrLc10fv6YYvGVH77d0BDEIIjdzEe808ZjvXu8ungT3BPseULYuY90j8igcNVG1iMnnO59jICFaxXbxtHxC0fl8VuNkIvQmCblpEfJW+eWqdH3OI6hXz1qbeQBZaWG7SqaaFZE78XzR7TsTDHk7SAvfEg3ujcpmtGUTM42EQrMcjTLBGe+oe64aJUorllzcuQ5wSSnaYk6LD7QOB91K8pMbQaEcHg3Y107R26Jd0kluJDV6yWDWIvfdy9vBeKL0yajjkzLAQuvf+ynXOv70q01sPKMnoovEl0W3GBCcnm8vtTUj7zTXFwmiM9NctesqSd51po4ON4m8oSC1eG0RwOnwGSqF8a2Uoe86Kc/wwFkCp8FPiw3lsqP9LH0onw8owje4qyuBRwXKdVGvDUTPMAdehOX1MBXhLUpmyUySsc+88KgDtSQC4poATAXlT0kMSA/Ez024aRvXIeg0EOzO4QAoFjdrgSYvKVJhe41ZbhMWrbS+Lu1kFUscJpk6miHvLDk4Om0WQ9L/P0VuUL81KLaFovr9gztnLW7A0fhVqFpdK/8vTS2BBERCbwp0Zm8kNb4GbaduqlGbU9B8ln9KW4pD8e8WpKNGd1WXasPZPAKjcbsSXoSi9SlwchoTVYXLyR2Cs70=",
        "role": "assistant"
      }
    }
  ],
  "created": 1777553646,
  "id": "021777553638913c0a335079e7be4c79ef57584e00819ba1b0ad6",
  "model": "seed-2-0-pro-260328",
  "service_tier": "default",
  "object": "chat.completion",
  "usage": {
    "completion_tokens": 591,
    "prompt_tokens": 57,
    "total_tokens": 648,
    "prompt_tokens_details": {
      "cached_tokens": 0
    },
    "completion_tokens_details": {
      "reasoning_tokens": 299
    }
  },
  "meta": {
    "usage": {
      "credits_used": 4686,
      "usd_spent": 0.002343
    }
  }
}
```
{% endcode %}

</details>
