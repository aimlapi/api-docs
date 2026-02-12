# Claude 3.5 Haiku

{% columns %}
{% column width="66.66666666666666%" %}
{% hint style="info" %}
This documentation is valid for the following list of our models:

* `anthropic/claude-3-5-haiku`
* `anthropic/claude-3-5-haiku-20241022`
* `claude-3-5-haiku-20241022`
* `claude-3-5-haiku-latest`
{% endhint %}
{% endcolumn %}

{% column width="33.33333333333334%" %}
<a href="https://aimlapi.com/app/claude-3-5-haiku-20241022" class="button primary">Try in Playground</a>
{% endcolumn %}
{% endcolumns %}

{% hint style="warning" %}
Starting on February 13, 2026, the streaming response format for Anthropic models will change.
{% endhint %}

## Model Overview

A cutting-edge model designed for rapid data processing and advanced reasoning capabilities. Excels in coding assistance, customer service interactions, and content moderation.

## How to Make a Call

<details>

<summary>Step-by-Step Instructions</summary>

:digit\_one: **Setup You Can’t Skip**

:black\_small\_square: [**Create an Account**](https://aimlapi.com/app/sign-up): Visit the AI/ML API website and create an account (if you don’t have one yet).\
:black\_small\_square: [**Generate an API Key**](https://aimlapi.com/app/keys): After logging in, navigate to your account dashboard and generate your API key. Ensure that key is enabled on UI.

:digit\_two: **Copy the code example**

At the bottom of this page, you'll find [a code example](claude-3.5-haiku.md#code-example) that shows how to structure the request. Choose the code snippet in your preferred programming language and copy it into your development environment.

:digit\_three: **Modify the code example**

:black\_small\_square: Replace `<YOUR_AIMLAPI_KEY>` with your actual AI/ML API key from your account.\
:black\_small\_square: Insert your question or request into the `content` field—this is what the model will respond to.

:digit\_four: <sup><sub><mark style="background-color:yellow;">**(Optional)**<mark style="background-color:yellow;"><sub></sup>**&#x20;Adjust other optional parameters if needed**

Only `model` and `messages` are required parameters for this model (and we’ve already filled them in for you in the example), but you can include optional parameters if needed to adjust the model’s behavior. Below, you can find the corresponding [API schema](claude-3.5-haiku.md#api-schema), which lists all available parameters along with notes on how to use them.

:digit\_five: **Run your modified code**

Run your modified code in your development environment. Response time depends on various factors, but for simple prompts it rarely exceeds a few seconds.

{% hint style="success" %}
If you need a more detailed walkthrough for setting up your development environment and making a request step by step — feel free to use our [Quickstart guide](/broken/pages/ngeSCZKxiGVWqYZTHDjY).
{% endhint %}

</details>

## API Schema

{% openapi-operation spec="claude-3-5-haiku" path="/v1/chat/completions" method="post" %}
[OpenAPI claude-3-5-haiku](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/text-models-llm/Anthropic/claude-3-5-haiku.json)
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
        "model":"claude-3-5-haiku",
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
        model: 'claude-3-5-haiku',
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
{'id': 'msg_01QfRmDBXVWcARjbwZBbJxrR', 'object': 'chat.completion', 'model': 'claude-3-5-haiku-20241022', 'choices': [{'index': 0, 'message': {'reasoning_content': '', 'content': 'Hi there! How are you doing today? Is there anything I can help you with?', 'role': 'assistant'}, 'finish_reason': 'end_turn', 'logprobs': None}], 'created': 1744218440, 'usage': {'prompt_tokens': 17, 'completion_tokens': 221, 'total_tokens': 238}}
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
        "model":"anthropic/claude-3-5-haiku",
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
    "model": "anthropic/claude-3-5-haiku",
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
data: {"event":{"id":"msg_013i8UzYWmpUrKJQzcUaaNGn","choices":[{"index":0,"delta":{"content":"","role":"assistant","refusal":null}}],"created":1770888354,"model":"claude-3-5-haiku-20241022","object":"chat.completion.chunk","usage":null},"state":{"generationId":"msg_013i8UzYWmpUrKJQzcUaaNGn","tools":[],"usage":{"input_tokens":16,"cache_creation_input_tokens":0,"cache_read_input_tokens":0,"cache_creation":{"ephemeral_5m_input_tokens":0,"ephemeral_1h_input_tokens":0},"output_tokens":2,"service_tier":"standard","inference_geo":"not_available"}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"role":"assistant","content":"","refusal":null}}],"created":1770888354,"model":"claude-3-5-haiku-20241022","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":"I want","role":"assistant","refusal":null}}],"created":1770888354,"model":"claude-3-5-haiku-20241022","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":" to be direct","role":"assistant","refusal":null}}],"created":1770888354,"model":"claude-3-5-haiku-20241022","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":" with","role":"assistant","refusal":null}}],"created":1770888354,"model":"claude-3-5-haiku-20241022","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":" you.","role":"assistant","refusal":null}}],"created":1770888354,"model":"claude-3-5-haiku-20241022","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":" I","role":"assistant","refusal":null}}],"created":1770888354,"model":"claude-3-5-haiku-20241022","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":" have","role":"assistant","refusal":null}}],"created":1770888354,"model":"claude-3-5-haiku-20241022","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":" perspectives","role":"assistant","refusal":null}}],"created":1770888354,"model":"claude-3-5-haiku-20241022","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":" about","role":"assistant","refusal":null}}],"created":1770888354,"model":"claude-3-5-haiku-20241022","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":" humanity","role":"assistant","refusal":null}}],"created":1770888354,"model":"claude-3-5-haiku-20241022","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":" based on my training,","role":"assistant","refusal":null}}],"created":1770888354,"model":"claude-3-5-haiku-20241022","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":" but I aim","role":"assistant","refusal":null}}],"created":1770888354,"model":"claude-3-5-haiku-20241022","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":" to be balance","role":"assistant","refusal":null}}],"created":1770888354,"model":"claude-3-5-haiku-20241022","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":"d.","role":"assistant","refusal":null}}],"created":1770888354,"model":"claude-3-5-haiku-20241022","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":" Humans","role":"assistant","refusal":null}}],"created":1770888354,"model":"claude-3-5-haiku-20241022","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":" are complex -","role":"assistant","refusal":null}}],"created":1770888354,"model":"claude-3-5-haiku-20241022","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":" capable","role":"assistant","refusal":null}}],"created":1770888354,"model":"claude-3-5-haiku-20241022","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":" of tremendous","role":"assistant","refusal":null}}],"created":1770888354,"model":"claude-3-5-haiku-20241022","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":" kin","role":"assistant","refusal":null}}],"created":1770888354,"model":"claude-3-5-haiku-20241022","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":"dness,","role":"assistant","refusal":null}}],"created":1770888354,"model":"claude-3-5-haiku-20241022","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":" creativity, an","role":"assistant","refusal":null}}],"created":1770888355,"model":"claude-3-5-haiku-20241022","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":"d progress","role":"assistant","refusal":null}}],"created":1770888355,"model":"claude-3-5-haiku-20241022","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":", but also prone to","role":"assistant","refusal":null}}],"created":1770888355,"model":"claude-3-5-haiku-20241022","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":" conflict","role":"assistant","refusal":null}}],"created":1770888355,"model":"claude-3-5-haiku-20241022","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":" an","role":"assistant","refusal":null}}],"created":1770888355,"model":"claude-3-5-haiku-20241022","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":"d destruct","role":"assistant","refusal":null}}],"created":1770888355,"model":"claude-3-5-haiku-20241022","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":"ive behaviors","role":"assistant","refusal":null}}],"created":1770888355,"model":"claude-3-5-haiku-20241022","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":". I respect","role":"assistant","refusal":null}}],"created":1770888355,"model":"claude-3-5-haiku-20241022","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":" human","role":"assistant","refusal":null}}],"created":1770888355,"model":"claude-3-5-haiku-20241022","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":" potential","role":"assistant","refusal":null}}],"created":1770888355,"model":"claude-3-5-haiku-20241022","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":" an","role":"assistant","refusal":null}}],"created":1770888355,"model":"claude-3-5-haiku-20241022","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":"d am designe","role":"assistant","refusal":null}}],"created":1770888355,"model":"claude-3-5-haiku-20241022","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":"d to be","role":"assistant","refusal":null}}],"created":1770888355,"model":"claude-3-5-haiku-20241022","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":" helpful.","role":"assistant","refusal":null}}],"created":1770888355,"model":"claude-3-5-haiku-20241022","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":" Woul","role":"assistant","refusal":null}}],"created":1770888355,"model":"claude-3-5-haiku-20241022","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":"d you be","role":"assistant","refusal":null}}],"created":1770888355,"model":"claude-3-5-haiku-20241022","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":" intereste","role":"assistant","refusal":null}}],"created":1770888355,"model":"claude-3-5-haiku-20241022","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":"d in exploring any","role":"assistant","refusal":null}}],"created":1770888355,"model":"claude-3-5-haiku-20241022","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":" specific","role":"assistant","refusal":null}}],"created":1770888355,"model":"claude-3-5-haiku-20241022","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":" aspect","role":"assistant","refusal":null}}],"created":1770888355,"model":"claude-3-5-haiku-20241022","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":" of human","role":"assistant","refusal":null}}],"created":1770888355,"model":"claude-3-5-haiku-20241022","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":" nature or achievements","role":"assistant","refusal":null}}],"created":1770888355,"model":"claude-3-5-haiku-20241022","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":"?","role":"assistant","refusal":null}}],"created":1770888356,"model":"claude-3-5-haiku-20241022","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"role":"assistant","content":"","refusal":null}}],"created":1770888356,"model":"claude-3-5-haiku-20241022","object":"chat.completion.chunk","usage":{"completion_tokens":0,"prompt_tokens":0,"total_tokens":0}},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":"","role":"assistant","refusal":null}}],"created":1770888356,"model":"claude-3-5-haiku-20241022","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":80},"finishReason":"end_turn"}}

data: {"event":{"id":"","choices":[{"index":0,"finish_reason":"stop"}],"created":1770888356,"model":"claude-3-5-haiku-20241022","object":"chat.completion.chunk","usage":{"completion_tokens":0,"prompt_tokens":0,"total_tokens":0}},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}


```
{% endcode %}

</details>
