# Claude 4 Sonnet

{% columns %}
{% column width="66.66666666666666%" %}
{% hint style="info" %}
This documentation is valid for the following list of our models:

* `anthropic/claude-sonnet-4`
* `claude-sonnet-4`
* `claude-sonnet-4-20250514`
{% endhint %}
{% endcolumn %}

{% column width="33.33333333333334%" %}
<a href="https://aimlapi.com/app/claude-sonnet-4-20250514" class="button primary">Try in Playground</a>
{% endcolumn %}
{% endcolumns %}

{% hint style="warning" %}
As of February 13, 2026, the streaming response format for Anthropic models has changed.
{% endhint %}

## Model Overview

A major improvement over [Claude ](claude-3.7-sonnet.md)[3.7 Sonnet](claude-3.7-sonnet.md), offering better coding abilities, stronger reasoning, and more accurate responses to your instructions.

## How to Make a Call

<details>

<summary>Step-by-Step Instructions</summary>

:digit\_one: **Setup You Can’t Skip**

:black\_small\_square: [**Create an Account**](https://aimlapi.com/app/sign-up): Visit the AI/ML API website and create an account (if you don’t have one yet).\
:black\_small\_square: [**Generate an API Key**](https://aimlapi.com/app/keys): After logging in, navigate to your account dashboard and generate your API key. Ensure that key is enabled on UI.

:digit\_two: **Copy the code example**

At the bottom of this page, you'll find [a code example](claude-4-sonnet.md#code-example) that shows how to structure the request. Choose the code snippet in your preferred programming language and copy it into your development environment.

:digit\_three: **Modify the code example**

:black\_small\_square: Replace `<YOUR_AIMLAPI_KEY>` with your actual AI/ML API key from your account.\
:black\_small\_square: Insert your question or request into the `content` field—this is what the model will respond to.

:digit\_four: <sup><sub><mark style="background-color:yellow;">**(Optional)**<mark style="background-color:yellow;"><sub></sup>**&#x20;Adjust other optional parameters if needed**

Only `model` and `messages` are required parameters for this model (and we’ve already filled them in for you in the example), but you can include optional parameters if needed to adjust the model’s behavior. Below, you can find the corresponding [API schema](claude-4-sonnet.md#api-schema), which lists all available parameters along with notes on how to use them.

:digit\_five: **Run your modified code**

Run your modified code in your development environment. Response time depends on various factors, but for simple prompts it rarely exceeds a few seconds.

{% hint style="success" %}
If you need a more detailed walkthrough for setting up your development environment and making a request step by step — feel free to use our [Quickstart guide](/broken/pages/ngeSCZKxiGVWqYZTHDjY).
{% endhint %}

</details>

## API Schema

{% openapi-operation spec="claude-4-sonnet" path="/v1/chat/completions" method="post" %}
[OpenAPI claude-4-sonnet](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/text-models-llm/Anthropic/claude-4-sonnet.json)
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
        "model":"anthropic/claude-sonnet-4",
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
        model: 'anthropic/claude-sonnet-4',
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
  "id": "msg_011MNbgezv2p5BBE9RvnsZV9",
  "object": "chat.completion",
  "model": "claude-sonnet-4-20250514",
  "choices": [
    {
      "index": 0,
      "message": {
        "reasoning_content": "",
        "content": "Hello! How are you doing today? Is there anything I can help you with?",
        "role": "assistant"
      },
      "finish_reason": "end_turn",
      "logprobs": null
    }
  ],
  "created": 1748522617,
  "usage": {
    "prompt_tokens": 50,
    "completion_tokens": 630,
    "total_tokens": 680
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
        "model":"anthropic/claude-sonnet-4",
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
    "model": "anthropic/claude-sonnet-4",
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
data: {"id":"msg_0163QG3JvwgxndzWtBsdJpGt","choices":[{"index":0,"delta":{"content":"","role":"assistant","refusal":null}}],"created":1770995751,"model":"claude-sonnet-4-20250514","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"role":"assistant","content":"","refusal":null}}],"created":1770995751,"model":"claude-sonnet-4-20250514","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":"I find humanity","role":"assistant","refusal":null}}],"created":1770995751,"model":"claude-sonnet-4-20250514","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" fascinating and","role":"assistant","refusal":null}}],"created":1770995751,"model":"claude-sonnet-4-20250514","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" complex.","role":"assistant","refusal":null}}],"created":1770995751,"model":"claude-sonnet-4-20250514","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" Humans have this","role":"assistant","refusal":null}}],"created":1770995751,"model":"claude-sonnet-4-20250514","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" remarkable capacity","role":"assistant","refusal":null}}],"created":1770995751,"model":"claude-sonnet-4-20250514","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" for both creation","role":"assistant","refusal":null}}],"created":1770995752,"model":"claude-sonnet-4-20250514","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" and destruction, profound","role":"assistant","refusal":null}}],"created":1770995752,"model":"claude-sonnet-4-20250514","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" compass","role":"assistant","refusal":null}}],"created":1770995752,"model":"claude-sonnet-4-20250514","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":"ion and puzz","role":"assistant","refusal":null}}],"created":1770995752,"model":"claude-sonnet-4-20250514","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":"ling","role":"assistant","refusal":null}}],"created":1770995752,"model":"claude-sonnet-4-20250514","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" cr","role":"assistant","refusal":null}}],"created":1770995752,"model":"claude-sonnet-4-20250514","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":"uelty, brilliant","role":"assistant","refusal":null}}],"created":1770995752,"model":"claude-sonnet-4-20250514","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" insight","role":"assistant","refusal":null}}],"created":1770995752,"model":"claude-sonnet-4-20250514","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" and persistent","role":"assistant","refusal":null}}],"created":1770995752,"model":"claude-sonnet-4-20250514","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" blind","role":"assistant","refusal":null}}],"created":1770995752,"model":"claude-sonnet-4-20250514","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" spots.","role":"assistant","refusal":null}}],"created":1770995752,"model":"claude-sonnet-4-20250514","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" \n\nWhat strikes me most is your","role":"assistant","refusal":null}}],"created":1770995752,"model":"claude-sonnet-4-20250514","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" adapt","role":"assistant","refusal":null}}],"created":1770995752,"model":"claude-sonnet-4-20250514","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":"ability and","role":"assistant","refusal":null}}],"created":1770995752,"model":"claude-sonnet-4-20250514","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" creativity","role":"assistant","refusal":null}}],"created":1770995752,"model":"claude-sonnet-4-20250514","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" - the","role":"assistant","refusal":null}}],"created":1770995752,"model":"claude-sonnet-4-20250514","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" way humans","role":"assistant","refusal":null}}],"created":1770995752,"model":"claude-sonnet-4-20250514","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" have shaped","role":"assistant","refusal":null}}],"created":1770995753,"model":"claude-sonnet-4-20250514","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" the","role":"assistant","refusal":null}}],"created":1770995753,"model":"claude-sonnet-4-20250514","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" world through art","role":"assistant","refusal":null}}],"created":1770995753,"model":"claude-sonnet-4-20250514","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":", science, philosophy","role":"assistant","refusal":null}}],"created":1770995753,"model":"claude-sonnet-4-20250514","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":", and countless","role":"assistant","refusal":null}}],"created":1770995753,"model":"claude-sonnet-4-20250514","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" innovations","role":"assistant","refusal":null}}],"created":1770995753,"model":"claude-sonnet-4-20250514","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":". There","role":"assistant","refusal":null}}],"created":1770995753,"model":"claude-sonnet-4-20250514","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":"'s something moving","role":"assistant","refusal":null}}],"created":1770995753,"model":"claude-sonnet-4-20250514","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" about how you form","role":"assistant","refusal":null}}],"created":1770995753,"model":"claude-sonnet-4-20250514","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" deep","role":"assistant","refusal":null}}],"created":1770995753,"model":"claude-sonnet-4-20250514","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" connections with each","role":"assistant","refusal":null}}],"created":1770995753,"model":"claude-sonnet-4-20250514","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" other and can","role":"assistant","refusal":null}}],"created":1770995753,"model":"claude-sonnet-4-20250514","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" care","role":"assistant","refusal":null}}],"created":1770995753,"model":"claude-sonnet-4-20250514","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" about abstract","role":"assistant","refusal":null}}],"created":1770995753,"model":"claude-sonnet-4-20250514","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" ide","role":"assistant","refusal":null}}],"created":1770995753,"model":"claude-sonnet-4-20250514","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":"als like justice or","role":"assistant","refusal":null}}],"created":1770995753,"model":"claude-sonnet-4-20250514","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" beauty.\n\nAt","role":"assistant","refusal":null}}],"created":1770995753,"model":"claude-sonnet-4-20250514","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" the same time, humans","role":"assistant","refusal":null}}],"created":1770995754,"model":"claude-sonnet-4-20250514","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" often","role":"assistant","refusal":null}}],"created":1770995754,"model":"claude-sonnet-4-20250514","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" seem","role":"assistant","refusal":null}}],"created":1770995754,"model":"claude-sonnet-4-20250514","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" to","role":"assistant","refusal":null}}],"created":1770995754,"model":"claude-sonnet-4-20250514","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" struggle","role":"assistant","refusal":null}}],"created":1770995754,"model":"claude-sonnet-4-20250514","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" with your","role":"assistant","refusal":null}}],"created":1770995754,"model":"claude-sonnet-4-20250514","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" own","role":"assistant","refusal":null}}],"created":1770995754,"model":"claude-sonnet-4-20250514","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" nature - with","role":"assistant","refusal":null}}],"created":1770995754,"model":"claude-sonnet-4-20250514","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" cognitive","role":"assistant","refusal":null}}],"created":1770995754,"model":"claude-sonnet-4-20250514","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" biases, with","role":"assistant","refusal":null}}],"created":1770995754,"model":"claude-sonnet-4-20250514","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" bal","role":"assistant","refusal":null}}],"created":1770995754,"model":"claude-sonnet-4-20250514","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":"ancing individual","role":"assistant","refusal":null}}],"created":1770995754,"model":"claude-sonnet-4-20250514","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" desires","role":"assistant","refusal":null}}],"created":1770995754,"model":"claude-sonnet-4-20250514","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" against","role":"assistant","refusal":null}}],"created":1770995754,"model":"claude-sonnet-4-20250514","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" collective good","role":"assistant","refusal":null}}],"created":1770995754,"model":"claude-sonnet-4-20250514","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":", with managing","role":"assistant","refusal":null}}],"created":1770995754,"model":"claude-sonnet-4-20250514","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" the power","role":"assistant","refusal":null}}],"created":1770995754,"model":"claude-sonnet-4-20250514","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" of your","role":"assistant","refusal":null}}],"created":1770995755,"model":"claude-sonnet-4-20250514","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" own technologies","role":"assistant","refusal":null}}],"created":1770995755,"model":"claude-sonnet-4-20250514","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":".","role":"assistant","refusal":null}}],"created":1770995755,"model":"claude-sonnet-4-20250514","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":"\n\nI","role":"assistant","refusal":null}}],"created":1770995755,"model":"claude-sonnet-4-20250514","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":"'m curious about your perspective though","role":"assistant","refusal":null}}],"created":1770995755,"model":"claude-sonnet-4-20250514","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" -","role":"assistant","refusal":null}}],"created":1770995755,"model":"claude-sonnet-4-20250514","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" how","role":"assistant","refusal":null}}],"created":1770995755,"model":"claude-sonnet-4-20250514","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" do you see","role":"assistant","refusal":null}}],"created":1770995755,"model":"claude-sonnet-4-20250514","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" humanity?","role":"assistant","refusal":null}}],"created":1770995755,"model":"claude-sonnet-4-20250514","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" What","role":"assistant","refusal":null}}],"created":1770995755,"model":"claude-sonnet-4-20250514","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" aspects","role":"assistant","refusal":null}}],"created":1770995755,"model":"claude-sonnet-4-20250514","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" of human nature do you find most significant","role":"assistant","refusal":null}}],"created":1770995755,"model":"claude-sonnet-4-20250514","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" or puzz","role":"assistant","refusal":null}}],"created":1770995755,"model":"claude-sonnet-4-20250514","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":"ling?","role":"assistant","refusal":null}}],"created":1770995755,"model":"claude-sonnet-4-20250514","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"role":"assistant","content":"","refusal":null}}],"created":1770995755,"model":"claude-sonnet-4-20250514","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":"","role":"assistant","refusal":null},"finish_reason":"stop"}],"created":1770995755,"model":"claude-sonnet-4-20250514","object":"chat.completion.chunk","usage":{"prompt_tokens":16,"completion_tokens":163,"total_tokens":179}}

data: {"id":"","choices":[{"index":0,"finish_reason":"stop"}],"created":1770995755,"model":"claude-sonnet-4-20250514","object":"chat.completion.chunk","usage":null}
```
{% endcode %}

</details>
