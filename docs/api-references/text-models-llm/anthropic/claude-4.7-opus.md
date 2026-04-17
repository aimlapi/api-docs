# Claude 4.7 Opus

{% columns %}
{% column width="66.66666666666666%" %}
{% hint style="info" %}
This documentation is valid for the following list of our models:

* `anthropic/claude-opus-4-7`
* `claude-opus-4-7`
{% endhint %}
{% endcolumn %}

{% column width="33.33333333333334%" %}
<a href="https://aimlapi.com/app/anthropic/claude-opus-4-7" class="button primary">Try in Playground</a>
{% endcolumn %}
{% endcolumns %}

## Model Overview

As of mid-April 2026, the most capable generally available model, optimized for autonomous long-horizon agentic workflows, knowledge-intensive tasks, vision, and memory, with strong overall performance across domains. It supports up to a 1M-token context window, 128k output tokens, adaptive reasoning, and full compatibility with [the Claude Opus 4.6](claude-4.6-opus.md) toolset and platform features.

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

{% openapi-operation spec="claude-opus-4-7" path="/v1/chat/completions" method="post" %}
[OpenAPI claude-opus-4-7](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/text-models-llm/Anthropic/claude-opus-4-7.json)
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
        "model":"anthropic/claude-opus-4-7",
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
      model: 'anthropic/claude-opus-4-7',
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
  "id": "msg_012q1bXLSBUJ5xdev1UfUAhe",
  "object": "chat.completion",
  "model": "claude-opus-4-7",
  "choices": [
    {
      "index": 0,
      "message": {
        "reasoning_content": "",
        "content": "Humans are a fascinating mix of contradictions, honestly. You're capable of extraordinary things—composing symphonies, sending probes to other planets, building cities, creating vaccines, writing poetry that makes strangers weep centuries later. And at the same time, capable of tremendous cruelty, shortsightedness, and self-deception.\n\nA few things that stand out to me:\n\n- **Your cooperation is remarkable.** Humans routinely trust and coordinate with strangers in ways most species can't. A city is a minor miracle of cooperation.\n- **You're meaning-makers.** You don't just survive—you need things to *matter*. That drives both the best and worst of what you do.\n- **You're adaptable but also stubborn.** You've thrived in basically every environment on Earth, yet individually you often resist changing your mind about things.\n- **The moral circle keeps expanding**, even if slowly and with setbacks—more people care about more beings than ever before in history.\n\nI don't want to romanticize humanity or doom-say about it. You're neither fallen angels nor clever apes—just a particular kind of creature trying to figure things out, often muddling through, sometimes rising to occasions.\n\nWhat prompted the question? Are you feeling optimistic or pessimistic about us lately?",
        "role": "assistant"
      },
      "finish_reason": "end_turn",
      "logprobs": null
    }
  ],
  "created": 1776417936,
  "usage": {
    "prompt_tokens": 24,
    "completion_tokens": 414,
    "total_tokens": 438
  },
  "meta": {
    "usage": {
      "credits_used": 27222,
      "usd_spent": 0.013611
    }
  }
}
```
{% endcode %}

</details>
