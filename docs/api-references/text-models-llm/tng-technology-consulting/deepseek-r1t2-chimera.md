# Deepseek R1T2 Chimera
description: "Model id: tngtech/deepseek-r1t2-chimera. API reference for Ling 3.0 Flash VL: request schema and code examples."
---

# Ling 3.0 Flash VL

{% columns %}
{% column width="66.66666666666666%" %}
{% hint style="info" %}
This documentation is valid for the following list of our models:

* `tngtech/deepseek-r1t2-chimera`
{% endhint %}
{% endcolumn %}

{% column width="33.33333333333334%" %}
<a href="https://aimlapi.com/app/tngtech/deepseek-r1t2-chimera" class="button primary">Try in Playground</a>
{% endcolumn %}
{% endcolumns %}

## Model Overview

DeepSeek-TNG R1T2 Chimera is the second-generation Chimera model from TNG Tech: a 671B-parameter mixture-of-experts model assembled from DeepSeek R1-0528, R1 and V3-0324 checkpoints with an Assembly-of-Experts merge. It always reasons before answering, takes text in and returns text, and has a 131K-token context window.

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
▪ **Provide input:** fill in the request input field(s) shown in the example.

**4️ (Optional) Tune the request**\
See the API schema below for optional generation settings.

**5️ Run your code**\
Run the updated code in your development environment.

{% hint style="success" %}
For a detailed walkthrough, use our [Quickstart guide](https://docs.aimlapi.com/quickstart/setting-up).
{% endhint %}

</details>

## API Schema

{% openapi-operation spec="deepseek-r1t2-chimera" path="/v1/chat/completions" method="post" %}
[OpenAPI deepseek-r1t2-chimera](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/text-models-llm/tng-technology-consulting/deepseek-r1t2-chimera.json)
{% endopenapi-operation %}

## Code Example

{% tabs %}
{% tab title="Python" %}
{% code overflow="wrap" %}
```python
import requests

response = requests.post(
    "https://api.aimlapi.com/v1/chat/completions",
    headers={
        "Authorization": "Bearer <YOUR_AIMLAPI_KEY>",
        "Content-Type": "application/json",
    },
    json={'model': 'tngtech/deepseek-r1t2-chimera', 'messages': ['<message>']},
)

print(response.json())
```
{% endcode %}
{% endtab %}

{% tab title="JavaScript" %}
{% code overflow="wrap" %}
```javascript
const response = await fetch('https://api.aimlapi.com/v1/chat/completions', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer <YOUR_AIMLAPI_KEY>',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
  "model": "tngtech/deepseek-r1t2-chimera",
  "messages": [
    "<message>"
  ]
}),
});

console.log(await response.json());
```
{% endcode %}
{% endtab %}
{% endtabs %}

<details>

<summary>Response</summary>

{% code overflow="wrap" %}
```json
{
  "id": "chatcmpl-CQ9FPg3osank0dx0k46Z53LTqtXMl",
  "object": "chat.completion",
  "created": 1762343744,
  "choices": [
    {
      "index": 0,
      "message": {
        "role": "assistant",
        "content": "Hello! I'm just a program, so I don't have feelings, but I'm here and ready to help you. How can I assist you today?",
        "refusal": null,
        "annotations": null,
        "audio": null,
        "tool_calls": null
      },
      "finish_reason": "stop",
      "logprobs": null
    }
  ],
  "model": "tngtech/deepseek-r1t2-chimera",
  "usage": {
    "prompt_tokens": 137,
    "completion_tokens": 914,
    "total_tokens": 1051,
    "completion_tokens_details": null,
    "prompt_tokens_details": null
  },
  "meta": {
    "usage": {
      "credits_used": 120000,
      "usd_spent": 0.06
    }
  }
}
```
{% endcode %}

</details>
