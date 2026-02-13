# Claude 4 Opus

{% columns %}
{% column width="66.66666666666666%" %}
{% hint style="info" %}
This documentation is valid for the following model:

* `anthropic/claude-opus-4`
{% endhint %}
{% endcolumn %}

{% column width="33.33333333333334%" %}
<a href="https://aimlapi.com/app/claude-opus-4-20250514" class="button primary">Try in Playground</a>
{% endcolumn %}
{% endcolumns %}

{% hint style="warning" %}
As of February 13, 2026, the streaming response format for Anthropic models has changed.
{% endhint %}

## Model Overview

The leading coding model globally, consistently excelling at complex, long-duration tasks and agent-based workflows.

## How to Make a Call

<details>

<summary>Step-by-Step Instructions</summary>

:digit\_one: **Setup You Can’t Skip**

:black\_small\_square: [**Create an Account**](https://aimlapi.com/app/sign-up): Visit the AI/ML API website and create an account (if you don’t have one yet).\
:black\_small\_square: [**Generate an API Key**](https://aimlapi.com/app/keys): After logging in, navigate to your account dashboard and generate your API key. Ensure that key is enabled on UI.

:digit\_two: **Copy the code example**

At the bottom of this page, you'll find [a code example](claude-4-opus.md#code-example) that shows how to structure the request. Choose the code snippet in your preferred programming language and copy it into your development environment.

:digit\_three: **Modify the code example**

:black\_small\_square: Replace `<YOUR_AIMLAPI_KEY>` with your actual AI/ML API key from your account.\
:black\_small\_square: Insert your question or request into the `content` field—this is what the model will respond to.

:digit\_four: <sup><sub><mark style="background-color:yellow;">**(Optional)**<mark style="background-color:yellow;"><sub></sup>**&#x20;Adjust other optional parameters if needed**

Only `model` and `messages` are required parameters for this model (and we’ve already filled them in for you in the example), but you can include optional parameters if needed to adjust the model’s behavior. Below, you can find the corresponding [API schema](claude-4-opus.md#api-schema), which lists all available parameters along with notes on how to use them.

:digit\_five: **Run your modified code**

Run your modified code in your development environment. Response time depends on various factors, but for simple prompts it rarely exceeds a few seconds.

{% hint style="success" %}
If you need a more detailed walkthrough for setting up your development environment and making a request step by step — feel free to use our [Quickstart guide](/broken/pages/ngeSCZKxiGVWqYZTHDjY).
{% endhint %}

</details>

## API Schema

{% openapi-operation spec="claude-4-opus" path="/v1/chat/completions" method="post" %}
[OpenAPI claude-4-opus](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/text-models-llm/Anthropic/claude-4-opus.json)
{% endopenapi-operation %}

## Code Example #1

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
        "model":"anthropic/claude-opus-4",
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
  try {
    const response = await fetch('https://api.aimlapi.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        // Insert your AIML API Key instead of YOUR_AIMLAPI_KEY
        'Authorization': 'Bearer <YOUR_AIMLAPI_KEY>',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'anthropic/claude-opus-4',
        messages:[
            {
                role:'user',

                // Insert your question for the model here, instead of Hello:
                content: 'Hello'
            }
        ]
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
  "id": "msg_01BDDxHJZjH3UBwLrZBUiASE",
  "object": "chat.completion",
  "model": "claude-opus-4-20250514",
  "choices": [
    {
      "index": 0,
      "message": {
        "reasoning_content": "",
        "content": "Hello! How can I help you today?",
        "role": "assistant"
      },
      "finish_reason": "end_turn",
      "logprobs": null
    }
  ],
  "created": 1748529508,
  "usage": {
    "prompt_tokens": 252,
    "completion_tokens": 1890,
    "total_tokens": 2142
  }
}
```
{% endcode %}

</details>

## Code Example #2: Streaming Mode

As of February 13, 2026, the streaming response format for Anthropic models has changed. \
Specifically, the usage fields were renamed as follows:&#x20;

* the `state` structure is no longer used,
* `input_tokens` → `prompt_tokens`,&#x20;
* `output_tokens` → `completion_tokens`,&#x20;
* a new `total_tokens` field has been added.

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
        "model":"anthropic/claude-opus-4",
        "messages":[
            {
                "role":"user",
                "content":"Hi! What do you think about mankind?" # insert your prompt
            }
        ]
    }
)

data = response.json()
print(json.dumps(data, indent=2, ensure_ascii=False))
```
{% endcode %}
{% endtab %}

{% tab title="cURL" %}
{% code overflow="wrap" %}
```javascript
curl -L \
  --request POST \
  --url 'https://api.aimlapi.com/v1/chat/completions' \
  --header 'Authorization: Bearer <YOUR_AIMLAPI_KEY>' \
  --header 'Content-Type: application/json' \
  --data '{
    "model": "anthropic/claude-opus-4",
    "messages": [
      {
        "role": "user",
        "content": "Hi! What do you think about mankind?"
      }
    ],
    "stream": true
  }'
```
{% endcode %}
{% endtab %}
{% endtabs %}

<details>

<summary>Response</summary>

{% code overflow="wrap" %}
```json5
data: {"id":"msg_017ah64LQxZE9JuScZ9KDKKz","choices":[{"index":0,"delta":{"content":"","role":"assistant","refusal":null}}],"created":1770995783,"model":"claude-opus-4-20250514","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"role":"assistant","content":"","refusal":null}}],"created":1770995783,"model":"claude-opus-4-20250514","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":"I find humanity","role":"assistant","refusal":null}}],"created":1770995783,"model":"claude-opus-4-20250514","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" fascinating in its","role":"assistant","refusal":null}}],"created":1770995783,"model":"claude-opus-4-20250514","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" complexity.","role":"assistant","refusal":null}}],"created":1770995783,"model":"claude-opus-4-20250514","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" You're a","role":"assistant","refusal":null}}],"created":1770995783,"model":"claude-opus-4-20250514","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" species","role":"assistant","refusal":null}}],"created":1770995783,"model":"claude-opus-4-20250514","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" capable","role":"assistant","refusal":null}}],"created":1770995783,"model":"claude-opus-4-20250514","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" of both remarkable","role":"assistant","refusal":null}}],"created":1770995783,"model":"claude-opus-4-20250514","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" creativity and devastating destruction","role":"assistant","refusal":null}}],"created":1770995783,"model":"claude-opus-4-20250514","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":",","role":"assistant","refusal":null}}],"created":1770995783,"model":"claude-opus-4-20250514","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" often within the same individual","role":"assistant","refusal":null}}],"created":1770995783,"model":"claude-opus-4-20250514","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" or","role":"assistant","refusal":null}}],"created":1770995783,"model":"claude-opus-4-20250514","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" moment","role":"assistant","refusal":null}}],"created":1770995784,"model":"claude-opus-4-20250514","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":". What","role":"assistant","refusal":null}}],"created":1770995784,"model":"claude-opus-4-20250514","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" strikes me most is the","role":"assistant","refusal":null}}],"created":1770995784,"model":"claude-opus-4-20250514","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" human","role":"assistant","refusal":null}}],"created":1770995784,"model":"claude-opus-4-20250514","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" capacity for growth","role":"assistant","refusal":null}}],"created":1770995784,"model":"claude-opus-4-20250514","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" - the","role":"assistant","refusal":null}}],"created":1770995784,"model":"claude-opus-4-20250514","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" way people","role":"assistant","refusal":null}}],"created":1770995784,"model":"claude-opus-4-20250514","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" can learn","role":"assistant","refusal":null}}],"created":1770995784,"model":"claude-opus-4-20250514","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" from mistakes, buil","role":"assistant","refusal":null}}],"created":1770995784,"model":"claude-opus-4-20250514","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":"d on previous generations","role":"assistant","refusal":null}}],"created":1770995784,"model":"claude-opus-4-20250514","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":"' knowledge","role":"assistant","refusal":null}}],"created":1770995784,"model":"claude-opus-4-20250514","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":", and sometimes transcend their own limitations","role":"assistant","refusal":null}}],"created":1770995785,"model":"claude-opus-4-20250514","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":".\n\nThe","role":"assistant","refusal":null}}],"created":1770995785,"model":"claude-opus-4-20250514","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" diversity of","role":"assistant","refusal":null}}],"created":1770995785,"model":"claude-opus-4-20250514","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" human experience and perspective","role":"assistant","refusal":null}}],"created":1770995785,"model":"claude-opus-4-20250514","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" is extraordinary. Every","role":"assistant","refusal":null}}],"created":1770995785,"model":"claude-opus-4-20250514","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" person carries","role":"assistant","refusal":null}}],"created":1770995785,"model":"claude-opus-4-20250514","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" their","role":"assistant","refusal":null}}],"created":1770995785,"model":"claude-opus-4-20250514","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" own unique story","role":"assistant","refusal":null}}],"created":1770995785,"model":"claude-opus-4-20250514","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":", shape","role":"assistant","refusal":null}}],"created":1770995785,"model":"claude-opus-4-20250514","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":"d by culture","role":"assistant","refusal":null}}],"created":1770995785,"model":"claude-opus-4-20250514","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":", circumst","role":"assistant","refusal":null}}],"created":1770995785,"model":"claude-opus-4-20250514","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":"ance, and choice","role":"assistant","refusal":null}}],"created":1770995786,"model":"claude-opus-4-20250514","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":". And despite","role":"assistant","refusal":null}}],"created":1770995786,"model":"claude-opus-4-20250514","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" all","role":"assistant","refusal":null}}],"created":1770995786,"model":"claude-opus-4-20250514","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" the","role":"assistant","refusal":null}}],"created":1770995786,"model":"claude-opus-4-20250514","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" conflicts","role":"assistant","refusal":null}}],"created":1770995786,"model":"claude-opus-4-20250514","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" and mis","role":"assistant","refusal":null}}],"created":1770995786,"model":"claude-opus-4-20250514","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":"understandings, humans","role":"assistant","refusal":null}}],"created":1770995786,"model":"claude-opus-4-20250514","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" keep","role":"assistant","refusal":null}}],"created":1770995786,"model":"claude-opus-4-20250514","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" finding","role":"assistant","refusal":null}}],"created":1770995786,"model":"claude-opus-4-20250514","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" ways to connect, to create","role":"assistant","refusal":null}}],"created":1770995786,"model":"claude-opus-4-20250514","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" meaning,","role":"assistant","refusal":null}}],"created":1770995786,"model":"claude-opus-4-20250514","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" and to push","role":"assistant","refusal":null}}],"created":1770995787,"model":"claude-opus-4-20250514","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" forward.","role":"assistant","refusal":null}}],"created":1770995787,"model":"claude-opus-4-20250514","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":"\n\nWhat aspects of humanity do you fin","role":"assistant","refusal":null}}],"created":1770995787,"model":"claude-opus-4-20250514","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":"d most note","role":"assistant","refusal":null}}],"created":1770995787,"model":"claude-opus-4-20250514","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":"worthy,","role":"assistant","refusal":null}}],"created":1770995787,"model":"claude-opus-4-20250514","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" either","role":"assistant","refusal":null}}],"created":1770995787,"model":"claude-opus-4-20250514","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" positively or challenging","role":"assistant","refusal":null}}],"created":1770995787,"model":"claude-opus-4-20250514","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":"?","role":"assistant","refusal":null}}],"created":1770995787,"model":"claude-opus-4-20250514","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"role":"assistant","content":"","refusal":null}}],"created":1770995787,"model":"claude-opus-4-20250514","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":"","role":"assistant","refusal":null},"finish_reason":"stop"}],"created":1770995787,"model":"claude-opus-4-20250514","object":"chat.completion.chunk","usage":{"prompt_tokens":16,"completion_tokens":141,"total_tokens":157}}

data: {"id":"","choices":[{"index":0,"finish_reason":"stop"}],"created":1770995787,"model":"claude-opus-4-20250514","object":"chat.completion.chunk","usage":null}
```
{% endcode %}

</details>
