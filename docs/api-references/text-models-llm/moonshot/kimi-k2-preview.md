# kimi-k2-preview

<table data-header-hidden data-full-width="true"><thead><tr><th width="546.4443969726562" valign="top"></th><th width="202.666748046875" valign="top"></th></tr></thead><tbody><tr><td valign="top"><div data-gb-custom-block data-tag="hint" data-style="info" class="hint hint-info"><p>This documentation is valid for the following model:  <br> <code>moonshot/kimi-k2-preview</code></p></div></td><td valign="top"><a href="https://aimlapi.com/app/?model=moonshot/kimi-k2-preview&#x26;mode=chat" class="button primary">Try in Playground</a></td></tr><tr><td valign="top"></td><td valign="top"></td></tr></tbody></table>

## Model Overview

A mixture-of-experts model with strong reasoning, coding, and agentic capabilities.

## How to Make a Call

<details>

<summary>Step-by-Step Instructions</summary>

### :digit\_one:  Setup You Can’t Skip

:black\_small\_square:  [**Create an Account**](https://aimlapi.com/app/sign-up): Visit the AI/ML API website and create an account (if you don’t have one yet).\
:black\_small\_square:  [**Generate an API Key**](https://aimlapi.com/app/keys): After logging in, navigate to your account dashboard and generate your API key. Ensure that key is enabled on UI.

### &#x20;:digit\_two:  Copy the code example

At the bottom of this page, you'll find [a code example](kimi-k2-preview.md#code-example-1-chat-completion) that shows how to structure the request. Choose the code snippet in your preferred programming language and copy it into your development environment.

### :digit\_three:  Modify the code example

:black\_small\_square:  Replace `<YOUR_AIMLAPI_KEY>` with your actual AI/ML API key from your account.\
:black\_small\_square:  Insert your question or request into the `content` field—this is what the model will respond to.

### :digit\_four:  <sup><sub><mark style="background-color:yellow;">(Optional)<mark style="background-color:yellow;"><sub></sup> Adjust other optional parameters if needed

Only `model` and `messages` are required parameters for this model (and we’ve already filled them in for you in the example), but you can include optional parameters if needed to adjust the model’s behavior. Below, you can find the corresponding [API schema](kimi-k2-preview.md#api-schema), which lists all available parameters along with notes on how to use them.

### :digit\_five:  Run your modified code

Run your modified code in your development environment. Response time depends on various factors, but for simple prompts it rarely exceeds a few seconds.

{% hint style="success" %}
If you need a more detailed walkthrough for setting up your development environment and making a request step by step — feel free to use our [Quickstart guide](../../../quickstart/setting-up.md).
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
        "model":"moonshot/kimi-k2-preview",
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
      model: 'moonshot/kimi-k2-preview',
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
  "id": "chatcmpl-6881021ed173a2ae63fab92b",
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
  "created": 1753285150,
  "model": "kimi-k2-0711-preview",
  "usage": {
    "prompt_tokens": 11,
    "completion_tokens": 53,
    "total_tokens": 64
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
        "model": "moonshot/kimi-k2-preview",
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
