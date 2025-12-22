# qwen3-next-80b-a3b-thinking

{% columns %}
{% column width="66.66666666666666%" %}
{% hint style="info" %}
This documentation is valid for the following list of our models:

* `alibaba/qwen3-next-80b-a3b-thinking`
{% endhint %}
{% endcolumn %}

{% column width="33.33333333333334%" %}
<a href="https://aimlapi.com/app/alibaba/qwen3-next-80b-a3b-thinking" class="button primary">Try in Playground</a>
{% endcolumn %}
{% endcolumns %}

## Model Overview

The model may take longer to generate reasoning content than its predecessor. Alibaba Cloud strongly recommends its use for highly complex reasoning tasks.

{% hint style="success" %}
[Create AI/ML API Key](https://aimlapi.com/app/keys)
{% endhint %}

<details>

<summary><a href="../../../quickstart/setting-up.md">How to make the first API call</a></summary>

:digit\_one:  **Required setup (don’t skip this)**\
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

{% openapi-operation spec="qwen3-next-80b-a3b-thinking" path="/v1/chat/completions" method="post" %}
[OpenAPI qwen3-next-80b-a3b-thinking](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/text-models-llm/Alibaba-Cloud/qwen3-next-80b-a3b-thinking.json)
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
        "model":"alibaba/qwen3-next-80b-a3b-thinking",
        "messages":[
            {
                "role":"user",
                "content":"Hello"  # insert your prompt here, instead of Hello
            }
        ],
        "enable_thinking": False
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
      model: 'alibaba/qwen3-next-80b-a3b-thinking',
      messages:[
          {
              role:'user',
              content: 'Hello'  // insert your prompt here, instead of Hello
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
  "id": "chatcmpl-576aaaf9-f712-9114-b098-c1ee83fbfb6b",
  "system_fingerprint": null,
  "object": "chat.completion",
  "choices": [
    {
      "index": 0,
      "finish_reason": "stop",
      "logprobs": null,
      "message": {
        "role": "assistant",
        "content": "Hello! 😊 How can I assist you today?",
        "reasoning_content": "Okay, the user said \"Hello\". I need to respond appropriately. Let me think.\n\nFirst, I should acknowledge their greeting. A simple \"Hello!\" would be good. Maybe add a friendly emoji to keep it warm.\n\nWait, but maybe they want to start a conversation. I should ask how I can help them. That way, I'm being helpful and opening the door for them to ask questions.\n\nLet me check the standard response. Typically, for \"Hello\", the assistant says something like \"Hello! How can I assist you today?\" or \"Hi there! What can I do for you?\"\n\nYes, that's right. Keep it friendly and open-ended. Maybe add a smiley emoji to make it approachable.\n\nSo the response should be: \"Hello!  How can I assist you today?\"\n\nThat's good. Let me make sure there's no mistake. Yes, that's standard. No need for anything complicated here. Just a simple, welcoming reply.\n\nAlternatively, sometimes people use \"Hi\" instead of \"Hello\", but since they said \"Hello\", responding with \"Hello\" is fine. Maybe \"Hi there!\" could also work, but sticking to \"Hello\" matches their greeting.\n\nYes, \"Hello!  How can I assist you today?\" is perfect. It's polite, friendly, and offers assistance. That should be the response."
      }
    }
  ],
  "created": 1758229078,
  "model": "qwen3-next-80b-a3b-thinking",
  "usage": {
    "prompt_tokens": 9,
    "completion_tokens": 7182,
    "total_tokens": 7191,
    "completion_tokens_details": {
      "reasoning_tokens": 277
    }
  }
}
```
{% endcode %}

</details>
