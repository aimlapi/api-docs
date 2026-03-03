# kimi-k2-preview

{% columns %}
{% column width="66.66666666666666%" %}
{% hint style="info" %}
This documentation is valid for the following list of our models:

* `moonshot/kimi-k2-preview`
* `moonshot/kimi-k2-0905-preview`
{% endhint %}
{% endcolumn %}

{% column width="33.33333333333334%" %}
<a href="https://aimlapi.com/app/moonshot/kimi-k2-preview" class="button primary">Try in Playground</a><a href="https://aimlapi.com/app/moonshot/kimi-k2-0905-preview" class="button primary">Try in Playground</a>
{% endcolumn %}
{% endcolumns %}

## Model Overview

`moonshot/kimi-k2-preview` (July 2025) is a mixture-of-experts model with strong reasoning, coding, and agentic capabilities.

`moonshot/kimi-k2-0905-preview` (September 2025) is an upgraded version with improved grounding, better instruction following, and a stronger focus on coding and agentic tasks. The memory has doubled from 128k to a decent 256k tokens.

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

{% openapi-operation spec="moonshot-kimi-k2-preview" path="/v1/chat/completions" method="post" %}
[OpenAPI moonshot-kimi-k2-preview](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/text-models-llm/Moonshot/kimi-k2-preview.json)
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
        "model":"moonshot/kimi-k2-0905-preview",
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
      model: 'moonshot/kimi-k2-0905-preview',
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
  "id": "chatcmpl-6908c55b7589dac387b2bd3b",
  "object": "chat.completion",
  "choices": [
    {
      "index": 0,
      "finish_reason": "stop",
      "message": {
        "role": "assistant",
        "content": "Hello! How can I help you today?"
      }
    }
  ],
  "created": 1762182491,
  "model": "kimi-k2-0905-preview",
  "usage": {
    "prompt_tokens": 3,
    "completion_tokens": 53,
    "total_tokens": 56
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
        "model": "moonshot/kimi-k2-0905-preview",
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
Moonshot AI’s “Context Caching” is a data-management layer for the Kimi large-language-model API.

What it does  
1. You upload or define a large, static context once (for example a 100-page product manual, a legal contract, or a code base).  
2. The platform stores this context in a fast-access cache and gives it a tag/ID.  
3. In every subsequent call you only send the new user question; the system re-uses the cached context instead of transmitting and re-processing the whole document each time.  
4. When the cache TTL expires it is deleted automatically; you can also refresh or invalidate it explicitly.

Benefits  
- Up to 90 % lower token consumption (you pay only for the incremental prompt and the new response).  
- 83 % shorter time-to-first-token latency, because the heavy prefill phase is skipped on every reuse.  
- API price stays the same; savings come from not re-sending the same long context.

Typical use cases  
- Customer-support bots that answer many questions against the same knowledge base.  
- Repeated analysis of a static code repository.  
- High-traffic AI applications that repeatedly query the same large document set.

Billing (during public beta)  
- Cache creation: 24 CNY per million tokens cached.  
- Storage: 10 CNY per million tokens per minute.  
- Cache hit: 0.02 CNY per successful call that re-uses the cache.

In short, Context Caching lets developers treat very long, seldom-changing context as a reusable asset, cutting both cost and latency for repeated queries.
```
{% endcode %}

</details>
