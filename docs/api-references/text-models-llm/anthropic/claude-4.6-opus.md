# Claude 4.6 Opus

{% columns %}
{% column width="66.66666666666666%" %}
{% hint style="info" %}
This documentation is valid for the following list of our models:

* `anthropic/claude-opus-4-6`
{% endhint %}
{% endcolumn %}

{% column width="33.33333333333334%" %}
<a href="https://aimlapi.com/app/anthropic/claude-opus-4-6" class="button primary">Try in Playground</a>
{% endcolumn %}
{% endcolumns %}

## Model Overview

The model significantly advances its [predecessor’s](claude-4.5-opus.md) coding capabilities. It shows stronger planning, can handle longer and more complex agent-style workflows, operates more reliably in large codebases, and delivers improved code review and debugging that help it identify and fix its own mistakes. Beyond software development, Opus 4.6 applies these enhanced capabilities to everyday professional tasks, including financial analysis, research, and working with documents, spreadsheets, and presentations.

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

{% openapi-operation spec="claude-opus-4-6" path="/v1/chat/completions" method="post" %}
[OpenAPI claude-opus-4-6](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/text-models-llm/Anthropic/claude-opus-4-6.json)
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
        "model":"anthropic/claude-opus-4-6",
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
      model: 'anthropic/claude-opus-4-6',
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
  "id": "msg_018e8mCDfQGYKTGHTdUKNmuU",
  "object": "chat.completion",
  "model": "claude-opus-4-6",
  "choices": [
    {
      "index": 0,
      "message": {
        "reasoning_content": "",
        "content": "Hi! That's a big question. Here are some honest thoughts:\n\n**What I find remarkable**\n- Human creativity and problem-solving ability\n- The capacity for empathy, cooperation, and self-sacrifice\n- Building cumulative knowledge across generations\n- Art, music, science - the drive to understand and express\n\n**What's more complicated**\n- Humans have a real capacity for both great kindness and great cruelty\n- There's often a gap between what people value in principle and how they actually behave\n- Progress on big problems (poverty, conflict, environment) is real but uneven and slow\n\n**My honest position**\nI'd be cautious about sweeping judgments in either direction. \"Humanity is wonderful\" and \"humanity is terrible\" are both oversimplifications. People are complex, shaped by circumstances, and capable of change.\n\nI should also be transparent: I'm an AI, so my \"perspective\" has limits. I don't experience human life. I can observe patterns in what humans have written and done, but I'd weight your lived experience of humanity more heavily than my outside view.\n\nWhat prompted the question? I'm curious whether you're feeling more optimistic or pessimistic about it.",
        "role": "assistant"
      },
      "finish_reason": "end_turn",
      "logprobs": null
    }
  ],
  "created": 1770635443,
  "usage": {
    "prompt_tokens": 16,
    "completion_tokens": 264,
    "total_tokens": 280
  },
  "meta": {
    "usage": {
      "credits_used": 17368
    }
  }
}
```
{% endcode %}

</details>
