# qwen3-next-80b-a3b-thinking

{% columns %}
{% column %}
{% hint style="info" %}
This documentation is valid for the following model:

* `alibaba/qwen3-next-80b-a3b-thinking`
{% endhint %}
{% endcolumn %}

{% column %}
<a href="https://aimlapi.com/app/alibaba/qwen3-next-80b-a3b-thinking" class="button primary">Try in Playground</a>
{% endcolumn %}
{% endcolumns %}

## Model Overview

The model may take longer to generate reasoning content than its predecessor. Alibaba Cloud strongly recommends its use for highly complex reasoning tasks.

## How to Make a Call

<details>

<summary>Step-by-Step Instructions</summary>

#### :digit\_one: Setup You Can’t Skip

:black\_small\_square: [**Create an Account**](https://aimlapi.com/app/sign-up): Visit the AI/ML API website and create an account (if you don’t have one yet).\
:black\_small\_square: [**Generate an API Key**](https://aimlapi.com/app/keys): After logging in, navigate to your account dashboard and generate your API key. Ensure that key is enabled on UI.

#### :digit\_two: Copy the code example

At the bottom of this page, you'll find [a code example](qwen3-next-80b-a3b-thinking.md#code-example) that shows how to structure the request. Choose the code snippet in your preferred programming language and copy it into your development environment.

#### :digit\_three: Modify the code example

:black\_small\_square: Replace `<YOUR_AIMLAPI_KEY>` with your actual AI/ML API key from your account.\
:black\_small\_square: Insert your question or request into the `content` field—this is what the model will respond to.

#### :digit\_four: <sup><sub><mark style="background-color:yellow;">(Optional)<mark style="background-color:yellow;"><sub></sup> Adjust other optional parameters if needed

Only `model` and `messages` are required parameters for this model (and we’ve already filled them in for you in the example), but you can include optional parameters if needed to adjust the model’s behavior. Below, you can find the corresponding [API schema](qwen3-next-80b-a3b-thinking.md#api-schema), which lists all available parameters along with notes on how to use them.

#### :digit\_five: Run your modified code

Run your modified code in your development environment. Response time depends on various factors, but for simple prompts it rarely exceeds a few seconds.

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
