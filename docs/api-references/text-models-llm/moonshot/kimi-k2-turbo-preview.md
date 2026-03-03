# kimi-k2-turbo-preview

{% columns %}
{% column width="66.66666666666666%" %}
{% hint style="info" %}
This documentation is valid for the following list of our models:

* `moonshot/kimi-k2-turbo-preview`
{% endhint %}
{% endcolumn %}

{% column width="33.33333333333334%" %}
<a href="https://aimlapi.com/app/moonshot/kimi-k2-turbo-preview" class="button primary">Try in Playground</a>
{% endcolumn %}
{% endcolumns %}

## Model Overview

The high-speed version of [Kimi K2](kimi-k2-preview.md). A model fine-tuned for agentic tasks, coding, and conversational use, featuring a context window of up to 256,000 tokens and fast generation speeds — ideal for handling long documents and real-time interactions.

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

{% openapi-operation spec="kimi-k2-turbo-preview" path="/v1/chat/completions" method="post" %}
[OpenAPI kimi-k2-turbo-preview](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/text-models-llm/Moonshot/kimi-k2-turbo-preview.json)
{% endopenapi-operation %}

## Code Example #1: Chat Completion

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
        "model":"moonshot/kimi-k2-turbo-preview",
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
      model: 'moonshot/kimi-k2-turbo-preview',
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
  "id": "chatcmpl-690895f53d8b644f83fe679e",
  "object": "chat.completion",
  "choices": [
    {
      "index": 0,
      "finish_reason": "stop",
      "message": {
        "role": "assistant",
        "content": "Hi there! How can I help you today?"
      }
    }
  ],
  "created": 1762170357,
  "model": "kimi-k2-turbo-preview",
  "usage": {
    "prompt_tokens": 10,
    "completion_tokens": 231,
    "total_tokens": 241
  }
}
```
{% endcode %}

</details>

## Code Example #2: Web Search

{% tabs %}
{% tab title="Python" %}
{% code overflow="wrap" %}
```python
import json
import requests
from typing import Dict, Any

# Insert your AIML API Key instead of <YOUR_AIMLAPI_KEY>:
API_KEY = "<YOUR_AIMLAPI_KEY>"
BASE_URL = "https://api.aimlapi.com/v1"

HEADERS = {
    "Authorization": f"Bearer {API_KEY}",
    "Content-Type": "application/json",
}


def search_impl(arguments: Dict[str, Any]) -> Any:
    return arguments


def chat(messages):
    url = f"{BASE_URL}/chat/completions"
    payload = {
        "model": "moonshot/kimi-k2-turbo-preview",
        "messages": messages,
        "temperature": 0.6,
        "tools": [
            {
                "type": "builtin_function",
                "function": {"name": "$web_search"},
            }
        ]
    }

    response = requests.post(url, headers=HEADERS, json=payload)
    response.raise_for_status()
    return response.json()["choices"][0]


def main():
    messages = [
        {"role": "system", "content": "You are Kimi."},
        {"role": "user", "content": "Please search for Moonshot AI Context Caching technology and tell me what it is in English."}
    ]

    finish_reason = None
    while finish_reason is None or finish_reason == "tool_calls":
        choice = chat(messages)
        finish_reason = choice["finish_reason"]
        message = choice["message"]

        if finish_reason == "tool_calls":
            messages.append(message)

            for tool_call in message["tool_calls"]:
                tool_call_name = tool_call["function"]["name"]
                tool_call_arguments = json.loads(tool_call["function"]["arguments"])

                if tool_call_name == "$web_search":
                    tool_result = search_impl(tool_call_arguments)
                else:
                    tool_result = f"Error: unable to find tool by name '{tool_call_name}'"

                messages.append({
                    "role": "tool",
                    "tool_call_id": tool_call["id"],
                    "name": tool_call_name,
                    "content": json.dumps(tool_result),
                })

    print(message["content"])


if __name__ == "__main__":
    main()
```
{% endcode %}
{% endtab %}
{% endtabs %}

<details>

<summary>Response</summary>

{% code overflow="wrap" %}
```
Moonshot AI’s “Context Caching” is a **prompt-cache** layer for the Kimi large-language-model API.  
It lets you upload long, static text (documents, system prompts, few-shot examples, code bases, etc.) once, store the resulting key-value (KV) tensors in Moonshot’s servers, and then re-use that cached prefix in as many later requests as you want. Because the heavy “prefill” computation is already done, subsequent calls that start with the same context:

- Skip re-processing the cached tokens  
- Return the first token up to **83 % faster**  
- Cost up to **90 % less input-token money** (you pay only a small cache-storage and cache-hit fee instead of the full per-token price every time)

Typical use-cases are FAQ bots that always read the same manual, repeated analysis of a static repo, or any agent that keeps a long instruction set in every turn.  
You create a cache object with a TTL (time-to-live), pay a one-time creation charge plus a per-minute storage fee, and then pay a tiny fee each time an incoming request “hits” the cache.
```
{% endcode %}

</details>
