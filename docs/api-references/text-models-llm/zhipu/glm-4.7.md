# glm-4.7

{% columns %}
{% column width="66.66666666666666%" %}
{% hint style="info" %}
This documentation is valid for the following list of our models:

* `zhipu/glm-4.7`
{% endhint %}
{% endcolumn %}

{% column width="33.33333333333334%" %}
<a href="https://aimlapi.com/app/zhipu/glm-4.7" class="button primary">Try in Playground</a>
{% endcolumn %}
{% endcolumns %}

## Model Overview

The flagship LLM optimized for agentic coding and stable multi-step reasoning, supporting long-context workflows (200K context; up to 128K max output tokens).

## How to Make a Call

<details>

<summary>Step-by-Step Instructions</summary>

:digit\_one: **Setup You Can’t Skip**

:black\_small\_square: [**Create an Account**](https://aimlapi.com/app/sign-up): Visit the AI/ML API website and create an account (if you don’t have one yet).\
:black\_small\_square: [**Generate an API Key**](https://aimlapi.com/app/keys): After logging in, navigate to your account dashboard and generate your API key. Ensure that key is enabled on UI.

:digit\_two: **Copy the code example**

At the bottom of this page, you'll find [a code example](glm-4.7.md#code-example) that shows how to structure the request. Choose the code snippet in your preferred programming language and copy it into your development environment.

:digit\_three: **Modify the code example**

:black\_small\_square: Replace `<YOUR_AIMLAPI_KEY>` with your actual AI/ML API key from your account.\
:black\_small\_square: Insert your question or request into the `content` field—this is what the model will respond to.

:digit\_four: <sup><sub><mark style="background-color:yellow;">**(Optional)**<mark style="background-color:yellow;"><sub></sup>**&#x20;Adjust other optional parameters if needed**

Only `model` and `messages` are required parameters for this model (and we’ve already filled them in for you in the example), but you can include optional parameters if needed to adjust the model’s behavior. Below, you can find the corresponding [API schema](glm-4.7.md#api-schema), which lists all available parameters along with notes on how to use them.

:digit\_five: **Run your modified code**

Run your modified code in your development environment. Response time depends on various factors, but for simple prompts it rarely exceeds a few seconds.

{% hint style="success" %}
If you need a more detailed walkthrough for setting up your development environment and making a request step by step — feel free to use our [Quickstart guide](../../../quickstart/setting-up.md).
{% endhint %}

</details>

## API Schema

{% openapi-operation spec="glm-4-7" path="/v1/chat/completions" method="post" %}
[OpenAPI glm-4-7](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/text-models-llm/Zhipu/glm-4.7.json)
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
        "model":"zhipu/glm-4.7",
        "messages":[
            {
                "role":"user",
                "content":"Hello" # insert your prompt here, instead of Hello
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
      model: 'zhipu/glm-4.7',
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
  "choices": [
    {
      "finish_reason": "stop",
      "index": 0,
      "message": {
        "content": "Hello! I'm GLM, a large language model trained by Z.ai. I'm designed to have helpful, respectful conversations and assist with various tasks.\n\nHow can I help you today? Whether you have questions, need information, or just want to chat, I'm here to assist.",
        "reasoning_content": "Let me consider how to respond to this greeting thoughtfully.\n\nThe user has started with a simple \"Hello\" - this is likely the beginning of a conversation. I should respond in a way that's both welcoming and open-ended.\n\nFirst, I'll acknowledge their greeting warmly. Then I should introduce myself briefly to establish context. Since I'm GLM, an AI assistant, I should make that clear while also expressing my willingness to help.\n\nI should also consider what information might be useful to share at this point. My capabilities include answering questions, providing information, and assisting with various tasks. It would be helpful to mention some examples of what I can do.\n\nThe tone should be friendly and professional, inviting further interaction. I want to make the user feel comfortable asking questions or requesting assistance.\n\nLet me craft a response that's welcoming, informative, and encourages further conversation. I'll keep it concise but include enough detail to be helpful.",
        "role": "assistant"
      }
    }
  ],
  "created": 1766547128,
  "id": "20251224113151a94620120f9e4ebf",
  "model": "glm-4.7",
  "object": "chat.completion",
  "request_id": "20251224113151a94620120f9e4ebf",
  "usage": {
    "completion_tokens": 247,
    "prompt_tokens": 6,
    "prompt_tokens_details": {
      "cached_tokens": 2
    },
    "total_tokens": 253
  },
  "meta": {
    "usage": {
      "credits_used": 1149
    }
  }
}
```
{% endcode %}

</details>
