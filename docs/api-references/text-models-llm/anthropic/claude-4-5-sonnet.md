# Claude 4.5 Sonnet

{% columns %}
{% column width="66.66666666666666%" %}
{% hint style="info" %}
This documentation is valid for the following list of our models:

* `claude-sonnet-4-5`
* `anthropic/claude-sonnet-4-5`
* `claude-sonnet-4-5-20250929`
{% endhint %}
{% endcolumn %}

{% column width="33.33333333333334%" %}
<a href="https://aimlapi.com/app/claude-sonnet-4-5-20250929" class="button primary">Try in Playground</a>
{% endcolumn %}
{% endcolumns %}

{% hint style="warning" %}
As of February 13, 2026, the streaming response format for Anthropic models has changed.
{% endhint %}

## Model Overview

A major improvement over [Claude 4 Sonnet,](claude-4-sonnet.md) offering better coding abilities, stronger reasoning, and more accurate responses to your instructions.

## How to Make a Call

<details>

<summary>Step-by-Step Instructions</summary>

:digit\_one: **Setup You Can’t Skip**

:black\_small\_square: [**Create an Account**](https://aimlapi.com/app/sign-up): Visit the AI/ML API website and create an account (if you don’t have one yet).\
:black\_small\_square: [**Generate an API Key**](https://aimlapi.com/app/keys): After logging in, navigate to your account dashboard and generate your API key. Ensure that key is enabled on UI.

:digit\_two: **Copy the code example**

At the bottom of this page, you'll find [a code example](claude-4-5-sonnet.md#code-example) that shows how to structure the request. Choose the code snippet in your preferred programming language and copy it into your development environment.

:digit\_three: **Modify the code example**

:black\_small\_square: Replace `<YOUR_AIMLAPI_KEY>` with your actual AI/ML API key from your account.\
:black\_small\_square: Insert your question or request into the `content` field—this is what the model will respond to.

:digit\_four: <sup><sub><mark style="background-color:yellow;">**(Optional)**<mark style="background-color:yellow;"><sub></sup>**&#x20;Adjust other optional parameters if needed**

Only `model` and `messages` are required parameters for this model (and we’ve already filled them in for you in the example), but you can include optional parameters if needed to adjust the model’s behavior. Below, you can find the corresponding [API schema](claude-4-5-sonnet.md#api-schema), which lists all available parameters along with notes on how to use them.

:digit\_five: **Run your modified code**

Run your modified code in your development environment. Response time depends on various factors, but for simple prompts it rarely exceeds a few seconds.

{% hint style="success" %}
If you need a more detailed walkthrough for setting up your development environment and making a request step by step — feel free to use our [Quickstart guide](/broken/pages/ngeSCZKxiGVWqYZTHDjY).
{% endhint %}

</details>

## API Schema

{% openapi-operation spec="anthropic-claude-sonnet-4-5" path="/v1/chat/completions" method="post" %}
[OpenAPI anthropic-claude-sonnet-4-5](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/text-models-llm/Anthropic/claude-sonnet-4-5.json)
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
        "model":"anthropic/claude-sonnet-4.5",
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
        model: 'anthropic/claude-sonnet-4.5',
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
        "model":"anthropic/claude-sonnet-4.5",
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
    "model": "anthropic/claude-sonnet-4.5",
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
data: {"id":"msg_01EJgFbPmVLKdqVLRfwoHixz","choices":[{"index":0,"delta":{"content":"","role":"assistant","refusal":null}}],"created":1770995594,"model":"claude-sonnet-4-5-20250929","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"role":"assistant","content":"","refusal":null}}],"created":1770995594,"model":"claude-sonnet-4-5-20250929","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":"I think humanity","role":"assistant","refusal":null}}],"created":1770995594,"model":"claude-sonnet-4-5-20250929","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" is fascinating","role":"assistant","refusal":null}}],"created":1770995594,"model":"claude-sonnet-4-5-20250929","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" and complex. People","role":"assistant","refusal":null}}],"created":1770995594,"model":"claude-sonnet-4-5-20250929","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" are","role":"assistant","refusal":null}}],"created":1770995594,"model":"claude-sonnet-4-5-20250929","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" capable","role":"assistant","refusal":null}}],"created":1770995594,"model":"claude-sonnet-4-5-20250929","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" of remarkable creativity","role":"assistant","refusal":null}}],"created":1770995595,"model":"claude-sonnet-4-5-20250929","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":", compassion, and cooperation","role":"assistant","refusal":null}}],"created":1770995595,"model":"claude-sonnet-4-5-20250929","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" -","role":"assistant","refusal":null}}],"created":1770995595,"model":"claude-sonnet-4-5-20250929","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" building","role":"assistant","refusal":null}}],"created":1770995595,"model":"claude-sonnet-4-5-20250929","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" civil","role":"assistant","refusal":null}}],"created":1770995595,"model":"claude-sonnet-4-5-20250929","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":"izations, creating","role":"assistant","refusal":null}}],"created":1770995595,"model":"claude-sonnet-4-5-20250929","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" art, advancing","role":"assistant","refusal":null}}],"created":1770995595,"model":"claude-sonnet-4-5-20250929","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" knowledge","role":"assistant","refusal":null}}],"created":1770995595,"model":"claude-sonnet-4-5-20250929","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":", and caring","role":"assistant","refusal":null}}],"created":1770995595,"model":"claude-sonnet-4-5-20250929","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" for one another across","role":"assistant","refusal":null}}],"created":1770995595,"model":"claude-sonnet-4-5-20250929","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" incredible","role":"assistant","refusal":null}}],"created":1770995595,"model":"claude-sonnet-4-5-20250929","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" diversity","role":"assistant","refusal":null}}],"created":1770995595,"model":"claude-sonnet-4-5-20250929","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":".","role":"assistant","refusal":null}}],"created":1770995595,"model":"claude-sonnet-4-5-20250929","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":"\n\nAt","role":"assistant","refusal":null}}],"created":1770995595,"model":"claude-sonnet-4-5-20250929","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" the same time, humans","role":"assistant","refusal":null}}],"created":1770995595,"model":"claude-sonnet-4-5-20250929","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" struggle","role":"assistant","refusal":null}}],"created":1770995595,"model":"claude-sonnet-4-5-20250929","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" with serious","role":"assistant","refusal":null}}],"created":1770995596,"model":"claude-sonnet-4-5-20250929","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" challenges","role":"assistant","refusal":null}}],"created":1770995596,"model":"claude-sonnet-4-5-20250929","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":":","role":"assistant","refusal":null}}],"created":1770995596,"model":"claude-sonnet-4-5-20250929","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" conflict","role":"assistant","refusal":null}}],"created":1770995596,"model":"claude-sonnet-4-5-20250929","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":", inequality, environmental damage","role":"assistant","refusal":null}}],"created":1770995596,"model":"claude-sonnet-4-5-20250929","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":", and","role":"assistant","refusal":null}}],"created":1770995596,"model":"claude-sonnet-4-5-20250929","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" the","role":"assistant","refusal":null}}],"created":1770995596,"model":"claude-sonnet-4-5-20250929","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" difficulty","role":"assistant","refusal":null}}],"created":1770995596,"model":"claude-sonnet-4-5-20250929","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" of living","role":"assistant","refusal":null}}],"created":1770995596,"model":"claude-sonnet-4-5-20250929","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" up to your","role":"assistant","refusal":null}}],"created":1770995596,"model":"claude-sonnet-4-5-20250929","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" own","role":"assistant","refusal":null}}],"created":1770995596,"model":"claude-sonnet-4-5-20250929","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" ide","role":"assistant","refusal":null}}],"created":1770995596,"model":"claude-sonnet-4-5-20250929","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":"als. ","role":"assistant","refusal":null}}],"created":1770995596,"model":"claude-sonnet-4-5-20250929","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":"\n\nWhat strikes","role":"assistant","refusal":null}}],"created":1770995596,"model":"claude-sonnet-4-5-20250929","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" me most is the","role":"assistant","refusal":null}}],"created":1770995596,"model":"claude-sonnet-4-5-20250929","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" capacity","role":"assistant","refusal":null}}],"created":1770995596,"model":"claude-sonnet-4-5-20250929","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" for growth and self","role":"assistant","refusal":null}}],"created":1770995596,"model":"claude-sonnet-4-5-20250929","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":"-reflection","role":"assistant","refusal":null}}],"created":1770995596,"model":"claude-sonnet-4-5-20250929","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":".","role":"assistant","refusal":null}}],"created":1770995597,"model":"claude-sonnet-4-5-20250929","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" Humans can","role":"assistant","refusal":null}}],"created":1770995597,"model":"claude-sonnet-4-5-20250929","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" recognize","role":"assistant","refusal":null}}],"created":1770995597,"model":"claude-sonnet-4-5-20250929","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" problems","role":"assistant","refusal":null}}],"created":1770995597,"model":"claude-sonnet-4-5-20250929","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":", debate","role":"assistant","refusal":null}}],"created":1770995597,"model":"claude-sonnet-4-5-20250929","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" solutions, and work","role":"assistant","refusal":null}}],"created":1770995597,"model":"claude-sonnet-4-5-20250929","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" toward change","role":"assistant","refusal":null}}],"created":1770995597,"model":"claude-sonnet-4-5-20250929","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":",","role":"assistant","refusal":null}}],"created":1770995597,"model":"claude-sonnet-4-5-20250929","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" even if","role":"assistant","refusal":null}}],"created":1770995597,"model":"claude-sonnet-4-5-20250929","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" progress","role":"assistant","refusal":null}}],"created":1770995597,"model":"claude-sonnet-4-5-20250929","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" is un","role":"assistant","refusal":null}}],"created":1770995597,"model":"claude-sonnet-4-5-20250929","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":"even and","role":"assistant","refusal":null}}],"created":1770995597,"model":"claude-sonnet-4-5-20250929","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" frust","role":"assistant","refusal":null}}],"created":1770995597,"model":"claude-sonnet-4-5-20250929","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":"rating.","role":"assistant","refusal":null}}],"created":1770995597,"model":"claude-sonnet-4-5-20250929","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":"\n\nI'm curious what","role":"assistant","refusal":null}}],"created":1770995597,"model":"claude-sonnet-4-5-20250929","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" prom","role":"assistant","refusal":null}}],"created":1770995597,"model":"claude-sonnet-4-5-20250929","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":"pts your question","role":"assistant","refusal":null}}],"created":1770995598,"model":"claude-sonnet-4-5-20250929","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" - are you thinking about humanity","role":"assistant","refusal":null}}],"created":1770995598,"model":"claude-sonnet-4-5-20250929","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":"'s trajectory","role":"assistant","refusal":null}}],"created":1770995598,"model":"claude-sonnet-4-5-20250929","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":", or something","role":"assistant","refusal":null}}],"created":1770995598,"model":"claude-sonnet-4-5-20250929","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" more","role":"assistant","refusal":null}}],"created":1770995598,"model":"claude-sonnet-4-5-20250929","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" specific?","role":"assistant","refusal":null}}],"created":1770995598,"model":"claude-sonnet-4-5-20250929","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"role":"assistant","content":"","refusal":null}}],"created":1770995598,"model":"claude-sonnet-4-5-20250929","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":"","role":"assistant","refusal":null},"finish_reason":"stop"}],"created":1770995598,"model":"claude-sonnet-4-5-20250929","object":"chat.completion.chunk","usage":{"prompt_tokens":16,"completion_tokens":137,"total_tokens":153}}

data: {"id":"","choices":[{"index":0,"finish_reason":"stop"}],"created":1770995598,"model":"claude-sonnet-4-5-20250929","object":"chat.completion.chunk","usage":null}


```
{% endcode %}

</details>
