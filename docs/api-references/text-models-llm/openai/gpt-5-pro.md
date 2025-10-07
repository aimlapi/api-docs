# gpt-5-pro



<table data-header-hidden data-full-width="true"><thead><tr><th width="546.4443969726562" valign="top"></th></tr></thead><tbody><tr><td valign="top"><div data-gb-custom-block data-tag="hint" data-style="info" class="hint hint-info"><p>This documentation is valid for the following list of our models:</p><ul><li><code>openai/gpt-5-pro</code></li></ul></div></td></tr></tbody></table>

## Model Overview

Version of [GPT-5](gpt-5.md) that produces smarter and more precise responses

## How to Make a Call

<details>

<summary>Step-by-Step Instructions</summary>

### :digit\_one:  Setup You Can’t Skip

:black\_small\_square:  [**Create an Account**](https://aimlapi.com/app/sign-up): Visit the AI/ML API website and create an account (if you don’t have one yet).\
:black\_small\_square:  [**Generate an API Key**](https://aimlapi.com/app/keys): After logging in, navigate to your account dashboard and generate your API key. Ensure that key is enabled on UI.

### &#x20;:digit\_two:  Copy the code example

At the bottom of this page, you'll find [a code example](gpt-5-pro.md#code-example) that shows how to structure the request. Choose the code snippet in your preferred programming language and copy it into your development environment.

### :digit\_three:  Modify the code example

:black\_small\_square:  Replace `<YOUR_AIMLAPI_KEY>` with your actual AI/ML API key from your account.\
:black\_small\_square:  Insert your question or request into the `content` field—this is what the model will respond to.

### :digit\_four:  <sup><sub><mark style="background-color:yellow;">(Optional)<mark style="background-color:yellow;"><sub></sup> Adjust other optional parameters if needed

Only `model` and `messages` are required parameters for this model (and we’ve already filled them in for you in the example), but you can include optional parameters if needed to adjust the model’s behavior. Below, you can find the corresponding [API schema](gpt-5-pro.md#api-schema), which lists all available parameters along with notes on how to use them.

### :digit\_five:  Run your modified code

Run your modified code in your development environment. Response time depends on various factors, but for simple prompts it rarely exceeds a few seconds.

{% hint style="success" %}
If you need a more detailed walkthrough for setting up your development environment and making a request step by step — feel free to use our [Quickstart guide](../../../quickstart/setting-up.md).
{% endhint %}

</details>

## API Schema

### Responses Endpoint

This endpoint is currently used _only_ with OpenAI models. Some models support both the `/chat/completions` and `/responses` endpoints, while others support only one of them. OpenAI has announced plans to expand the capabilities of the `/responses` endpoint in the future.

{% openapi-operation spec="responses-all-models" path="/v1/responses" method="post" %}
[OpenAPI responses-all-models](https://api.aimlapi.com/docs-public-yaml)
{% endopenapi-operation %}

## Code Example

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
        "model":"openai/gpt-5-pro",
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
        model: 'openai/gpt-5-pro',
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
