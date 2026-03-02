# Claude 4.6 Sonnet

{% columns %}
{% column width="66.66666666666666%" %}
{% hint style="info" %}
This documentation is valid for the following list of our models:

* `anthropic/claude-sonnet-4.6`
* `anthropic/claude-sonnet-4-6-20260218`
{% endhint %}
{% endcolumn %}

{% column width="33.33333333333334%" %}
<a href="https://aimlapi.com/app/anthropic/claude-sonnet-4.6" class="button primary">Try in Playground</a>
{% endcolumn %}
{% endcolumns %}

## Model Overview

A general-purpose LLM with an optimal balance of intelligence, cost, and speed. It’s great for chatbots, assistants, and production text generation workflows, and it supports prompt caching for efficient repeated contexts.

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

{% openapi-operation spec="claude-sonnet-4-6" path="/v1/chat/completions" method="post" %}
[OpenAPI claude-sonnet-4-6](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/text-models-llm/Anthropic/claude-sonnet-4-6.json)
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
        "model":"anthropic/claude-sonnet-4.6",
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
      model: 'anthropic/claude-sonnet-4.6',
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
  "id": "msg_01YB1iL1Pmi8P2J7FqnWgNfW",
  "object": "chat.completion",
  "model": "claude-sonnet-4-6",
  "choices": [
    {
      "index": 0,
      "message": {
        "reasoning_content": "",
        "content": "Hi! That's a big question. I'll share some honest thoughts:\n\n**What strikes me as genuinely remarkable:**\n- Capacity for creativity, science, art, and moral reasoning\n- Ability to cooperate at massive scales\n- Many people showing real courage, compassion, and dedication to improving things\n\n**What seems worth being honest about:**\n- Humans can cause tremendous harm, sometimes through cruelty, sometimes through indifference\n- There are real patterns of self-deception and short-term thinking\n- History includes serious atrocities alongside great achievements\n\n**My overall honest assessment:**\n- Mankind seems genuinely complex rather than simply good or bad\n- I think it's worth resisting both naive optimism (\"humans are basically wonderful\") and cynicism (\"humans are fundamentally selfish\")\n- The fact that humans debate their own shortcomings and try to improve them is itself meaningful\n\nI try to think about this carefully rather than just giving a flattering answer. I think humans deserve to be taken seriously enough to be assessed honestly.\n\nWhat's prompting your question? Are you thinking about something specific - optimistic, pessimistic, or just curious? I'm happy to discuss particular aspects you're interested in.",
        "role": "assistant"
      },
      "finish_reason": "end_turn",
      "logprobs": null
    }
  ],
  "created": 1772199635,
  "usage": {
    "prompt_tokens": 16,
    "completion_tokens": 264,
    "total_tokens": 280
  },
  "meta": {
    "usage": {
      "credits_used": 10421
    }
  }
}
```
{% endcode %}

</details>
