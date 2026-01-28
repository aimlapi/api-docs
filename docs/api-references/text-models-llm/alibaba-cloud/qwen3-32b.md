# qwen3-32b

{% columns %}
{% column width="66.66666666666666%" %}
{% hint style="info" %}
This documentation is valid for the following list of our models:

* `alibaba/qwen3-32b`
{% endhint %}
{% endcolumn %}

{% column width="33.33333333333334%" %}
<a href="https://aimlapi.com/app/alibaba/qwen3-32b" class="button primary">Try in Playground</a>
{% endcolumn %}
{% endcolumns %}

## Model Overview

A world-class model with comparable quality to DeepSeek R1 while outperforming [GPT-4.1](../openai/gpt-4.1.md) and [Claude Sonnet 3.7](../anthropic/claude-3.7-sonnet.md). Optimized for both complex reasoning and efficient dialogue.

{% hint style="success" %}
[Create AI/ML API Key](https://aimlapi.com/app/keys)
{% endhint %}

<details>

<summary>How to make the first API call</summary>

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

{% openapi-operation spec="qwen3-32b" path="/v1/chat/completions" method="post" %}
[OpenAPI qwen3-32b](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/text-models-llm/Alibaba-Cloud/qwen3-32b.json)
{% endopenapi-operation %}

## Code Example #1: Without Thinking and Streaming

{% hint style="warning" %}
`enable_thinking` must be set to `false` for non-streaming calls.
{% endhint %}

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
        "model":"alibaba/qwen3-32b",
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
      model: 'alibaba/qwen3-32b',
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
  "id": "chatcmpl-1d8a5aa6-34ce-9832-a296-d312b944b437",
  "system_fingerprint": null,
  "object": "chat.completion",
  "choices": [
    {
      "index": 0,
      "finish_reason": "stop",
      "logprobs": null,
      "message": {
        "role": "assistant",
        "content": "Hello! How can I assist you today? 😊",
        "reasoning_content": ""
      }
    }
  ],
  "created": 1756990273,
  "model": "qwen3-32b",
  "usage": {
    "prompt_tokens": 19,
    "completion_tokens": 65,
    "total_tokens": 84
  }
}
```
{% endcode %}

</details>

## Code Example #2: Enable Thinking and Streaming

{% tabs %}
{% tab title="Python" %}
{% code overflow="wrap" %}
```python
import requests

response = requests.post(
    "https://api.aimlapi.com/v1/chat/completions",
    headers={
        # Insert your AIML API Key instead of <YOUR_AIMLAPI_KEY>:
        "Authorization":"Bearer <YOUR_AIMLAPI_KEY>",
        "Content-Type":"application/json"
    },
    json={
        "model":"alibaba/qwen3-32b",
        "messages":[
            {
                "role":"user",
                "content":"Hello"  # insert your prompt here, instead of Hello
            }
        ],
        "enable_thinking": True, 
        "stream": True
    }
)

print(response.text)
```
{% endcode %}
{% endtab %}
{% endtabs %}

<details>

<summary>Response</summary>

{% code overflow="wrap" %}
```json5
data: {"id":"chatcmpl-81964e30-1a7c-9668-b78c-a750587ec497","choices":[{"delta":{"content":null,"role":"assistant","refusal":null,"reasoning_content":""},"index":0,"finish_reason":null}],"created":1753944369,"model":"qwen3-32b","object":"chat.completion.chunk","usage":null}

data: {"id":"chatcmpl-81964e30-1a7c-9668-b78c-a750587ec497","choices":[{"delta":{"content":null,"refusal":null,"reasoning_content":"Okay"},"index":0,"finish_reason":null}],"created":1753944369,"model":"qwen3-32b","object":"chat.completion.chunk","usage":null}

data: {"id":"chatcmpl-81964e30-1a7c-9668-b78c-a750587ec497","choices":[{"delta":{"content":null,"refusal":null,"reasoning_content":","},"index":0,"finish_reason":null}],"created":1753944369,"model":"qwen3-32b","object":"chat.completion.chunk","usage":null}

data: {"id":"chatcmpl-81964e30-1a7c-9668-b78c-a750587ec497","choices":[{"delta":{"content":null,"refusal":null,"reasoning_content":" the"},"index":0,"finish_reason":null}],"created":1753944369,"model":"qwen3-32b","object":"chat.completion.chunk","usage":null}

data: {"id":"chatcmpl-81964e30-1a7c-9668-b78c-a750587ec497","choices":[{"delta":{"content":null,"refusal":null,"reasoning_content":" user said \"Hello\". I should respond in a friendly and welcoming manner. Let"},"index":0,"finish_reason":null}],"created":1753944369,"model":"qwen3-32b","object":"chat.completion.chunk","usage":null}

data: {"id":"chatcmpl-81964e30-1a7c-9668-b78c-a750587ec497","choices":[{"delta":{"content":null,"refusal":null,"reasoning_content":" me make sure to acknowledge their greeting and offer assistance. Maybe something like, \""},"index":0,"finish_reason":null}],"created":1753944369,"model":"qwen3-32b","object":"chat.completion.chunk","usage":null}

data: {"id":"chatcmpl-81964e30-1a7c-9668-b78c-a750587ec497","choices":[{"delta":{"content":null,"refusal":null,"reasoning_content":"Hello! How can I assist you today?\" That's simple and open-ended."},"index":0,"finish_reason":null}],"created":1753944369,"model":"qwen3-32b","object":"chat.completion.chunk","usage":null}

data: {"id":"chatcmpl-81964e30-1a7c-9668-b78c-a750587ec497","choices":[{"delta":{"content":null,"refusal":null,"reasoning_content":" I need to check if there's any specific context I should consider, but since"},"index":0,"finish_reason":null}],"created":1753944369,"model":"qwen3-32b","object":"chat.completion.chunk","usage":null}

data: {"id":"chatcmpl-81964e30-1a7c-9668-b78c-a750587ec497","choices":[{"delta":{"content":null,"refusal":null,"reasoning_content":" there's none, a general response is fine. Alright, that should work."},"index":0,"finish_reason":null}],"created":1753944369,"model":"qwen3-32b","object":"chat.completion.chunk","usage":null}

data: {"id":"chatcmpl-81964e30-1a7c-9668-b78c-a750587ec497","choices":[{"delta":{"content":"Hello! How can I assist you today?","refusal":null,"reasoning_content":null},"index":0,"finish_reason":null}],"created":1753944369,"model":"qwen3-32b","object":"chat.completion.chunk","usage":null}

data: {"id":"chatcmpl-81964e30-1a7c-9668-b78c-a750587ec497","choices":[{"delta":{"content":"","refusal":null,"reasoning_content":null},"index":0,"finish_reason":"stop"}],"created":1753944369,"model":"qwen3-32b","object":"chat.completion.chunk","usage":null}

data: {"id":"chatcmpl-81964e30-1a7c-9668-b78c-a750587ec497","choices":[],"created":1753944369,"model":"qwen3-32b","object":"chat.completion.chunk","usage":{"prompt_tokens":13,"completion_tokens":2010,"total_tokens":2023,"completion_tokens_details":{"reasoning_tokens":82}}}
```
{% endcode %}

</details>

The example above prints the raw output of the model. The text is typically split into multiple chunks. While this is helpful for debugging, if your goal is to evaluate the model's reasoning and get a clean, human-readable response, you should aggregate both the reasoning and the final answer in a loop — for example:

<details>

<summary>Example with response parsing</summary>

{% code overflow="wrap" %}
```python
import requests
import json

response = requests.post(
    "https://api.aimlapi.com/v1/chat/completions",
    headers={
        # Insert your AIML API Key instead of <YOUR_AIMLAPI_KEY>:
        "Authorization": "Bearer b72af53a19ea41caaf5a74ba1f6fc62b",
        "Content-Type": "application/json",
    },
    json={
        "model": "alibaba/qwen3-32b",
        "messages": [
            {
                "role": "user",
                
                # Insert your question for the model here, instead of Hello:
                "content": "Hello" 
            }
        ],
        "stream": True,
    }
)

answer = ""
reasoning = ""

for line in response.iter_lines():
    if not line or not line.startswith(b"data:"):
        continue

    try:
        raw = line[6:].decode("utf-8").strip()
        if raw == "[DONE]":
            continue

        data = json.loads(raw)
        choices = data.get("choices")
        if not choices or "delta" not in choices[0]:
            continue

        delta = choices[0]["delta"]
        content_piece = delta.get("content")
        reasoning_piece = delta.get("reasoning_content")

        if content_piece:
            answer += content_piece
        if reasoning_piece:
            reasoning += reasoning_piece

    except Exception as e:
        print(f"Error parsing chunk: {e}")


print("\n--- MODEL REASONING ---")
print(reasoning.strip())

print("\n--- MODEL RESPONSE ---")
print(answer.strip())
```
{% endcode %}

</details>

After running such code, you'll receive only the model's textual output in a clear and structured format:

<details>

<summary>Response</summary>

{% code overflow="wrap" %}
```json5
--- MODEL REASONING ---
Okay, the user sent "Hello". I need to respond appropriately. Since it's a greeting, I should reply in a friendly and welcoming manner. Maybe ask how I can assist them. Keep it simple and open-ended to encourage them to share what they need help with. Let me make sure the tone is positive and helpful.

--- MODEL RESPONSE ---
Hello! How can I assist you today? 😊
```
{% endcode %}

</details>
