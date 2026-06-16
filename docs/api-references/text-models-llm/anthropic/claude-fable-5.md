# Claude Fable 5

{% columns %}
{% column width="66.66666666666666%" %}
{% hint style="info" %}
This documentation is valid for the following list of our models:

* `anthropic/claude-fable-5`
* `claude-fable-5`
{% endhint %}
{% endcolumn %}

{% column width="33.33333333333334%" %}
<a href="https://aimlapi.com/app/anthropic/claude-fable-5" class="button primary">Try in Playground</a>
{% endcolumn %}
{% endcolumns %}

{% hint style="warning" %}
**Access to Claude Fable 5 may be interrupted.** Anthropic may restrict availability without notice, and requests can fail intermittently. Data retention applies and zero-data-retention is not supported. For production use, we currently recommend **Claude Opus 4.8**.
{% endhint %}

## Model Overview

Claude Fable 5 is Anthropic's most capable widely released model, built for demanding reasoning and long-horizon agentic work. It supports a 1M-token context window, up to 128k output tokens, vision, function calling, streaming, and adaptive thinking.

{% hint style="success" %}
[Create AI/ML API Key](https://aimlapi.com/app/keys)
{% endhint %}

<details>

<summary>How to make the first API call</summary>

**1. Required setup (don't skip this)**\\

* **Create an account:** Sign up on the AI/ML API website if you don't have one yet.\\
* **Generate an API key:** In your account dashboard, create an API key and make sure it's enabled in the UI.

**2. Copy the code example**\
At the bottom of this page, pick the snippet for your preferred programming language (Python or JavaScript) and copy it into your project.

**3. Update the snippet for your use case**\\

* **Insert your API key:** Replace `<YOUR_AIMLAPI_KEY>` with your real AI/ML API key.\\
* **Select a model:** Set the `model` field to the model you want to call.\\
* **Provide input:** Fill in the `messages` field shown in the example.

**4. (Optional) Tune the request**\
You can add optional parameters to control the output. See the API schema below for the full list.

**5. Run your code**\
Run the updated code in your development environment. Response time depends on the model and request size, but simple requests typically return quickly.

{% hint style="success" %}
For a detailed walkthrough of environment setup and API requests, see the [Quickstart guide](/broken/pages/ngeSCZKxiGVWqYZTHDjY).
{% endhint %}

</details>

## API Schema

{% openapi-operation spec="claude-fable-5" path="/v1/chat/completions" method="post" %}
[OpenAPI claude-fable-5](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/text-models-llm/Anthropic/claude-fable-5.json)
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
        "Authorization": "Bearer <YOUR_AIMLAPI_KEY>",
        "Content-Type": "application/json"
    },
    json={
        "model": "anthropic/claude-fable-5",
        "messages": [
            {
                "role": "user",
                "content": "How are you?"  # insert your prompt
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
      // Insert your AIML API Key instead of <YOUR_AIMLAPI_KEY>
      'Authorization': 'Bearer <YOUR_AIMLAPI_KEY>',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'anthropic/claude-fable-5',
      messages: [
        {
          role: 'user',
          content: 'How are you?', // insert your prompt
        },
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
  "id": "chatcmpl-CQ9FPg3osank0dx0k46Z53LTqtXMl",
  "object": "chat.completion",
  "created": 1762343744,
  "model": "anthropic/claude-fable-5",
  "choices": [
    {
      "index": 0,
      "message": {
        "role": "assistant",
        "content": "I'm doing well, thank you! I'm Claude Fable 5, ready to help with whatever you need. What can I assist you with today?"
      },
      "finish_reason": "stop"
    }
  ],
  "usage": {
    "prompt_tokens": 21,
    "completion_tokens": 31,
    "total_tokens": 52
  },
  "meta": {
    "usage": {
      "credits_used": 52000,
      "usd_spent": 0.00153
    }
  }
}
```
{% endcode %}

</details>
