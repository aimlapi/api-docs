# grok-3-mini-beta

{% columns %}
{% column width="66.66666666666666%" %}
{% hint style="info" %}
This documentation is valid for the following list of our models:

* `x-ai/grok-3-mini-beta`
{% endhint %}
{% endcolumn %}

{% column width="33.33333333333334%" %}
<a href="https://aimlapi.com/app/x-ai/grok-3-mini-beta" class="button primary">Try in Playground</a>
{% endcolumn %}
{% endcolumns %}

## Model Overview

A lighter version of the [Grok 3 Beta model](grok-3-beta.md), designed for quicker response times while maintaining robust reasoning capabilities. It is particularly suited for applications where speed is prioritized over exhaustive accuracy checks.

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
