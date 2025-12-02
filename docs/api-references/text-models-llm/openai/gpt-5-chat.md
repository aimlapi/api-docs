# gpt-5-chat

<table data-header-hidden data-full-width="true"><thead><tr><th width="546.4443969726562" valign="top"></th><th width="202.666748046875" valign="top"></th></tr></thead><tbody><tr><td valign="top"><div data-gb-custom-block data-tag="hint" data-style="info" class="hint hint-info"><p>This documentation is valid for the following list of our models:</p><ul><li><code>openai/gpt-5-chat-latest</code></li></ul></div></td><td valign="top"><a href="https://aimlapi.com/app/openai/gpt-5-chat-latest" class="button primary">Try in Playground</a></td></tr></tbody></table>

## Model Overview

The non-reasoning version of [GPT‑5](gpt-5.md).

## How to Make a Call

<details>

<summary>Step-by-Step Instructions</summary>

:digit\_one: **Setup You Can’t Skip**

:black\_small\_square: [**Create an Account**](https://aimlapi.com/app/sign-up): Visit the AI/ML API website and create an account (if you don’t have one yet).\
:black\_small\_square: [**Generate an API Key**](https://aimlapi.com/app/keys): After logging in, navigate to your account dashboard and generate your API key. Ensure that key is enabled on UI.

:digit\_two: **Copy the code example**

At the bottom of this page, you'll find [a code example](gpt-5-chat.md#code-example) that shows how to structure the request. Choose the code snippet in your preferred programming language and copy it into your development environment.

:digit\_three: **Modify the code example**

:black\_small\_square: Replace `<YOUR_AIMLAPI_KEY>` with your actual AI/ML API key from your account.\
:black\_small\_square: Insert your question or request into the `content` field—this is what the model will respond to.

:digit\_four: <sup><sub><mark style="background-color:yellow;">**(Optional)**<mark style="background-color:yellow;"><sub></sup>**&#x20;Adjust other optional parameters if needed**

Only `model` and `messages` are required parameters for this model (and we’ve already filled them in for you in the example), but you can include optional parameters if needed to adjust the model’s behavior. Below, you can find the corresponding [API schema](gpt-5-chat.md#api-schemas), which lists all available parameters along with notes on how to use them.

:digit\_five: **Run your modified code**

Run your modified code in your development environment. Response time depends on various factors, but for simple prompts it rarely exceeds a few seconds.

{% hint style="success" %}
If you need a more detailed walkthrough for setting up your development environment and making a request step by step — feel free to use our [Quickstart guide](../../../quickstart/setting-up.md).
{% endhint %}

</details>

## API Schemas

<details>

<summary>Chat Completions vs. Responses API</summary>

**Chat Completions**\
The _chat completions_ API is the older, chat-oriented interface where you send a list of messages (`role: user`, `role: assistant`, etc.), and the model returns a single response. It was designed specifically for conversational workflows and follows a structured chat message format. It is now considered a legacy interface.

**Responses**\
The _Responses_ API is the newer, unified interface used across OpenAI’s latest models. Instead of focusing only on chat, it supports multiple input types (text, images, audio, tools, etc.) and multiple output modalities (text, JSON, images, audio, video). It is more flexible, more consistent across models, and intended to replace chat completions entirely.

</details>

### Chat Completions Endpoint

{% openapi-operation spec="gpt-5-chat" path="/v1/chat/completions" method="post" %}
[OpenAPI gpt-5-chat](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/text-models-llm/OpenAI/gpt-5-chat.json)
{% endopenapi-operation %}

### Responses Endpoint

This endpoint is currently used _only_ with OpenAI models. Some models support both the `/chat/completions` and `/responses` endpoints, while others support only one of them.

{% openapi-operation spec="gpt-5-chat-RESPONSES" path="/v1/responses" method="post" %}
[OpenAPI gpt-5-chat-RESPONSES](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/text-models-llm/OpenAI/gpt-5-chat-RESPONSES.json)
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
        "model":"openai/gpt-5-chat-latest",
        "messages":[
            {
                "role":"user",
                "content":"Hello"  # insert your prompt here, instead of Hello
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
      model: 'openai/gpt-5-chat-latest',
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
  "id": "chatcmpl-C2LzHL8ho70oHYKMGSWr6wanLutvD",
  "object": "chat.completion",
  "choices": [
    {
      "index": 0,
      "finish_reason": "stop",
      "logprobs": null,
      "message": {
        "role": "assistant",
        "content": "Hi there! 👋 How’s your day going?",
        "refusal": null,
        "annotations": []
      }
    }
  ],
  "created": 1754677211,
  "model": "gpt-5-chat-latest",
  "usage": {
    "prompt_tokens": 21,
    "completion_tokens": 231,
    "total_tokens": 252,
    "prompt_tokens_details": {
      "cached_tokens": 0,
      "audio_tokens": 0
    },
    "completion_tokens_details": {
      "reasoning_tokens": 0,
      "audio_tokens": 0,
      "accepted_prediction_tokens": 0,
      "rejected_prediction_tokens": 0
    }
  },
  "system_fingerprint": "fp_8e31f7e21a"
}
```
{% endcode %}

</details>

## Code Example #2: Using /responses Endpoint

{% tabs %}
{% tab title="Python" %}
{% code overflow="wrap" %}
```python
import requests
import json   # for getting a structured output with indentation

response = requests.post(
    "https://api.aimlapi.com/v1/responses",
    headers={
        "Content-Type":"application/json", 

        # Insert your AIML API Key instead of <YOUR_AIMLAPI_KEY>:
        "Authorization":"Bearer <YOUR_AIMLAPI_KEY>",
        "Content-Type":"application/json"
    },
    json={
        "model":"openai/gpt-5-chat-latest",
        "input":"Hello"  # Insert your question for the model here, instead of Hello   
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
  try {
    const response = await fetch('https://api.aimlapi.com/v1/responses', {
      method: 'POST',
      headers: {
        // Insert your AIML API Key instead of <YOUR_AIMLAPI_KEY>
        'Authorization': 'Bearer <YOUR_AIMLAPI_KEY>',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'openai/gpt-5-chat-latest',
        input: 'Hello',  // Insert your question here, instead of Hello 
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status ${response.status}`);
    }

    const data = await response.json();
    console.log(JSON.stringify(data, null, 2));

  } catch (error) {
    console.error('Error', error);
  }
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
  "id": "resp_68963fb142d08197b4d3ae3ad852542c054845c6ea84caa2",
  "object": "response",
  "created_at": 1754677169,
  "error": null,
  "incomplete_details": null,
  "instructions": null,
  "max_output_tokens": 512,
  "model": "gpt-5-chat-latest",
  "output": [
    {
      "id": "msg_68963fb1c5b88197b1ac96592463ffa7054845c6ea84caa2",
      "type": "message",
      "status": "completed",
      "content": [
        {
          "type": "output_text",
          "annotations": [],
          "logprobs": [],
          "text": "Hi! How’s your day going?"
        }
      ],
      "role": "assistant"
    }
  ],
  "parallel_tool_calls": true,
  "previous_response_id": null,
  "reasoning": {
    "effort": null,
    "summary": null
  },
  "temperature": 1,
  "text": {
    "format": {
      "type": "text"
    },
    "verbosity": "medium"
  },
  "tool_choice": "auto",
  "tools": [],
  "top_p": 1,
  "truncation": "disabled",
  "usage": {
    "input_tokens": 21,
    "input_tokens_details": {
      "cached_tokens": 0
    },
    "output_tokens": 189,
    "output_tokens_details": {
      "reasoning_tokens": 0
    },
    "total_tokens": 210
  },
  "metadata": {},
  "output_text": "Hi! How’s your day going?"
}
```
{% endcode %}

</details>
