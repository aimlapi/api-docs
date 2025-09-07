# grok-3-mini-beta

<table data-header-hidden data-full-width="true"><thead><tr><th width="546.4443969726562" valign="top"></th><th width="202.666748046875" valign="top"></th></tr></thead><tbody><tr><td valign="top"><div data-gb-custom-block data-tag="hint" data-style="info" class="hint hint-info"><p>This documentation is valid for the following model: </p><ul><li><code>x-ai/grok-3-mini-beta</code></li></ul></div></td><td valign="top"><a href="https://aimlapi.com/app/?model=x-ai/grok-3-mini-beta&#x26;mode=chat" class="button primary">Try in Playground</a></td></tr></tbody></table>

## Model Overview

A lighter version of the [Grok 3 Beta model](grok-3-beta.md), designed for quicker response times while maintaining robust reasoning capabilities. It is particularly suited for applications where speed is prioritized over exhaustive accuracy checks.

## How to Make a Call

<details>

<summary>Step-by-Step Instructions</summary>

### :digit\_one:  Setup You Can’t Skip

:black\_small\_square:  [**Create an Account**](https://aimlapi.com/app/sign-up): Visit the AI/ML API website and create an account (if you don’t have one yet).\
:black\_small\_square:  [**Generate an API Key**](https://aimlapi.com/app/keys): After logging in, navigate to your account dashboard and generate your API key. Ensure that key is enabled on UI.

### &#x20;:digit\_two:  Copy the code example

At the bottom of this page, you'll find [a code example](grok-3-mini-beta.md#code-example) that shows how to structure the request. Choose the code snippet in your preferred programming language and copy it into your development environment.

### :digit\_three:  Modify the code example

:black\_small\_square:  Replace `<YOUR_AIMLAPI_KEY>` with your actual AI/ML API key from your account.\
:black\_small\_square:  Insert your question or request into the `content` field—this is what the model will respond to.

### :digit\_four:  <sup><sub><mark style="background-color:yellow;">(Optional)<mark style="background-color:yellow;"><sub></sup> Adjust other optional parameters if needed

Only `model` and `messages` are required parameters for this model (and we’ve already filled them in for you in the example), but you can include optional parameters if needed to adjust the model’s behavior. Below, you can find the corresponding [API schema](grok-3-mini-beta.md#api-schema), which lists all available parameters along with notes on how to use them.

### :digit\_five:  Run your modified code

Run your modified code in your development environment. Response time depends on various factors, but for simple prompts it rarely exceeds a few seconds.

{% hint style="success" %}
If you need a more detailed walkthrough for setting up your development environment and making a request step by step — feel free to use our [Quickstart guide](../../../quickstart/setting-up.md).
{% endhint %}

</details>

## API Schema

{% openapi src="https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/text-models-llm/xAI/grok-3-mini-beta.json" path="/v1/chat/completions" method="post" %}
[https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/text-models-llm/xAI/grok-3-mini-beta.json](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/text-models-llm/xAI/grok-3-mini-beta.json)
{% endopenapi %}

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
        "model":"x-ai/grok-3-mini-beta",
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
      model: 'x-ai/grok-3-mini-beta',
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
{'id': 'gen-1744380893-6fzXa86I1KOoFhg8d7Y8', 'system_fingerprint': 'fp_d133ae3397', 'object': 'chat.completion', 'choices': [{'index': 0, 'finish_reason': 'stop', 'logprobs': None, 'message': {'role': 'assistant', 'content': "Hello! I'm Assistant, here to help. How can I assist you today? 😊", 'reasoning_content': 'First, the user said "Hello." This is a simple greeting. As an AI assistant, my response should be friendly, engaging, and appropriate.\n\nMy role is to be helpful and truthful, based on the instructions. I should continue the conversation naturally.\n\nA good response to "Hello" could be:\n- A greeting back, like "Hi there!" or "Hello! How can I help you?"\n- Since this might be the start of a conversation, I should invite further interaction.\n\nKeep it concise and not overwhelming. People often say "Hello" to test or start a chat.\n\nFinally, end my response in a way that encourages more dialogue, unless it\'s a standalone interaction.\n\nPossible response:\n- "Hello! How are you today?"\n- Or, "Hi! What can I assist you with?"\n\nTo make it more personal, I could reference being an AI, but that might not be necessary right away.\n\nThe system prompt says: "You are a helpful and truthful AI assistant named Assistant." So, I should respond as Assistant.\n\nStructure:\n1. Greet back.\n2. Offer help or ask a question to continue.\n\nFinal response: "Hello! I\'m Assistant, here to help. What\'s on your mind?"', 'refusal': None}}], 'created': 1744380893, 'model': 'x-ai/grok-3-mini-beta', 'usage': {'prompt_tokens': 5, 'completion_tokens': 19, 'total_tokens': 24}}
```
{% endcode %}

</details>
