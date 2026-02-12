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
<a href="https://aimlapi.com/app/claude-sonnet-4-20250514" class="button primary">Try in Playground</a>
{% endcolumn %}
{% endcolumns %}

{% hint style="warning" %}
Starting on February 13, 2026, the streaming response format for Anthropic models will change.
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
data: {"event":{"id":"msg_01MPaT7xs1GRj1zdzuMs2MyA","choices":[{"index":0,"delta":{"content":"","role":"assistant","refusal":null}}],"created":1770887440,"model":"claude-sonnet-4-5-20250929","object":"chat.completion.chunk","usage":null},"state":{"generationId":"msg_01MPaT7xs1GRj1zdzuMs2MyA","tools":[],"usage":{"input_tokens":16,"cache_creation_input_tokens":0,"cache_read_input_tokens":0,"cache_creation":{"ephemeral_5m_input_tokens":0,"ephemeral_1h_input_tokens":0},"output_tokens":3,"service_tier":"standard","inference_geo":"not_available"}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"role":"assistant","content":"","refusal":null}}],"created":1770887440,"model":"claude-sonnet-4-5-20250929","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":"I find humanity","role":"assistant","refusal":null}}],"created":1770887440,"model":"claude-sonnet-4-5-20250929","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":" fascinating and complex. You","role":"assistant","refusal":null}}],"created":1770887440,"model":"claude-sonnet-4-5-20250929","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":"'ve created","role":"assistant","refusal":null}}],"created":1770887440,"model":"claude-sonnet-4-5-20250929","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":" remarkable","role":"assistant","refusal":null}}],"created":1770887441,"model":"claude-sonnet-4-5-20250929","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":" things","role":"assistant","refusal":null}}],"created":1770887441,"model":"claude-sonnet-4-5-20250929","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":"—","role":"assistant","refusal":null}}],"created":1770887441,"model":"claude-sonnet-4-5-20250929","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":"art","role":"assistant","refusal":null}}],"created":1770887441,"model":"claude-sonnet-4-5-20250929","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":", science","role":"assistant","refusal":null}}],"created":1770887441,"model":"claude-sonnet-4-5-20250929","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":", acts","role":"assistant","refusal":null}}],"created":1770887441,"model":"claude-sonnet-4-5-20250929","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":" of profound","role":"assistant","refusal":null}}],"created":1770887441,"model":"claude-sonnet-4-5-20250929","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":" kindness—","role":"assistant","refusal":null}}],"created":1770887441,"model":"claude-sonnet-4-5-20250929","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":"while","role":"assistant","refusal":null}}],"created":1770887441,"model":"claude-sonnet-4-5-20250929","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":" also struggling","role":"assistant","refusal":null}}],"created":1770887441,"model":"claude-sonnet-4-5-20250929","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":" with conflict","role":"assistant","refusal":null}}],"created":1770887441,"model":"claude-sonnet-4-5-20250929","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":", inequality, and environmental","role":"assistant","refusal":null}}],"created":1770887441,"model":"claude-sonnet-4-5-20250929","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":" challenges. ","role":"assistant","refusal":null}}],"created":1770887441,"model":"claude-sonnet-4-5-20250929","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":"\n\nWhat strikes me most is human","role":"assistant","refusal":null}}],"created":1770887441,"model":"claude-sonnet-4-5-20250929","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":" capacity","role":"assistant","refusal":null}}],"created":1770887441,"model":"claude-sonnet-4-5-20250929","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":" for growth","role":"assistant","refusal":null}}],"created":1770887441,"model":"claude-sonnet-4-5-20250929","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":" and reflection","role":"assistant","refusal":null}}],"created":1770887441,"model":"claude-sonnet-4-5-20250929","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":". People","role":"assistant","refusal":null}}],"created":1770887442,"model":"claude-sonnet-4-5-20250929","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":" can learn from mistakes","role":"assistant","refusal":null}}],"created":1770887442,"model":"claude-sonnet-4-5-20250929","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":", change","role":"assistant","refusal":null}}],"created":1770887442,"model":"claude-sonnet-4-5-20250929","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":" their","role":"assistant","refusal":null}}],"created":1770887442,"model":"claude-sonnet-4-5-20250929","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":" minds","role":"assistant","refusal":null}}],"created":1770887442,"model":"claude-sonnet-4-5-20250929","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":", and work","role":"assistant","refusal":null}}],"created":1770887442,"model":"claude-sonnet-4-5-20250929","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":" toward","role":"assistant","refusal":null}}],"created":1770887442,"model":"claude-sonnet-4-5-20250929","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":" something","role":"assistant","refusal":null}}],"created":1770887442,"model":"claude-sonnet-4-5-20250929","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":" better,","role":"assistant","refusal":null}}],"created":1770887442,"model":"claude-sonnet-4-5-20250929","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":" even if","role":"assistant","refusal":null}}],"created":1770887442,"model":"claude-sonnet-4-5-20250929","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":" progress","role":"assistant","refusal":null}}],"created":1770887442,"model":"claude-sonnet-4-5-20250929","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":" isn","role":"assistant","refusal":null}}],"created":1770887442,"model":"claude-sonnet-4-5-20250929","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":"'t linear","role":"assistant","refusal":null}}],"created":1770887442,"model":"claude-sonnet-4-5-20250929","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":".","role":"assistant","refusal":null}}],"created":1770887442,"model":"claude-sonnet-4-5-20250929","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":"\n\nI","role":"assistant","refusal":null}}],"created":1770887442,"model":"claude-sonnet-4-5-20250929","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":"'m curious what","role":"assistant","refusal":null}}],"created":1770887442,"model":"claude-sonnet-4-5-20250929","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":" prom","role":"assistant","refusal":null}}],"created":1770887442,"model":"claude-sonnet-4-5-20250929","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":"pts your question","role":"assistant","refusal":null}}],"created":1770887443,"model":"claude-sonnet-4-5-20250929","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":". Are you thinking about humanity in","role":"assistant","refusal":null}}],"created":1770887443,"model":"claude-sonnet-4-5-20250929","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":" a","role":"assistant","refusal":null}}],"created":1770887443,"model":"claude-sonnet-4-5-20250929","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":" particular","role":"assistant","refusal":null}}],"created":1770887443,"model":"claude-sonnet-4-5-20250929","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":" context,","role":"assistant","refusal":null}}],"created":1770887443,"model":"claude-sonnet-4-5-20250929","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":" or just wondering","role":"assistant","refusal":null}}],"created":1770887443,"model":"claude-sonnet-4-5-20250929","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":" my","role":"assistant","refusal":null}}],"created":1770887443,"model":"claude-sonnet-4-5-20250929","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":" general","role":"assistant","refusal":null}}],"created":1770887443,"model":"claude-sonnet-4-5-20250929","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":" take","role":"assistant","refusal":null}}],"created":1770887443,"model":"claude-sonnet-4-5-20250929","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":"?","role":"assistant","refusal":null}}],"created":1770887443,"model":"claude-sonnet-4-5-20250929","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"role":"assistant","content":"","refusal":null}}],"created":1770887443,"model":"claude-sonnet-4-5-20250929","object":"chat.completion.chunk","usage":{"completion_tokens":0,"prompt_tokens":0,"total_tokens":0}},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":"","role":"assistant","refusal":null}}],"created":1770887443,"model":"claude-sonnet-4-5-20250929","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":102},"finishReason":"end_turn"}}

data: {"event":{"id":"","choices":[{"index":0,"finish_reason":"stop"}],"created":1770887443,"model":"claude-sonnet-4-5-20250929","object":"chat.completion.chunk","usage":{"completion_tokens":0,"prompt_tokens":0,"total_tokens":0}},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}


```
{% endcode %}

</details>
