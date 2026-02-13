# Claude 4.1 Opus

{% columns %}
{% column width="66.66666666666666%" %}
{% hint style="info" %}
This documentation is valid for the following list of our models:

* `anthropic/claude-opus-4.1`
* `claude-opus-4-1`
* `claude-opus-4-1-20250805`
{% endhint %}
{% endcolumn %}

{% column width="33.33333333333334%" %}
<a href="https://aimlapi.com/app/claude-opus-4-1-20250805" class="button primary">Try in Playground</a>
{% endcolumn %}
{% endcolumns %}

{% hint style="success" %}
All three IDs listed above refer to the same model; we support them for backward compatibility.
{% endhint %}

{% hint style="warning" %}
As of February 13, 2026, the streaming response format for Anthropic models has changed.
{% endhint %}

## Model Overview

An upgrade to [Claude Opus 4](claude-4-opus.md) on agentic tasks, real-world coding, and thinking.

## How to Make a Call

<details>

<summary>Step-by-Step Instructions</summary>

:digit\_one: **Setup You Can’t Skip**

:black\_small\_square: [**Create an Account**](https://aimlapi.com/app/sign-up): Visit the AI/ML API website and create an account (if you don’t have one yet).\
:black\_small\_square: [**Generate an API Key**](https://aimlapi.com/app/keys): After logging in, navigate to your account dashboard and generate your API key. Ensure that key is enabled on UI.

:digit\_two: **Copy the code example**

At the bottom of this page, you'll find [code examples](claude-opus-4.1.md#code-example-1-without-thinking) that show how to structure the request. Choose the code snippet in your preferred programming language and copy it into your development environment.

:digit\_three: **Modify the code example**

:black\_small\_square: Replace `<YOUR_AIMLAPI_KEY>` with your actual AI/ML API key from your account.\
:black\_small\_square: Insert your question or request into the `content` field—this is what the model will respond to.

:digit\_four: <sup><sub><mark style="background-color:yellow;">**(Optional)**<mark style="background-color:yellow;"><sub></sup>**&#x20;Adjust other optional parameters if needed**

Only `model` and `messages` are required parameters for this model (and we’ve already filled them in for you in the example), but you can include optional parameters if needed to adjust the model’s behavior. Below, you can find the corresponding [API schema](claude-opus-4.1.md#api-schema), which lists all available parameters along with notes on how to use them.

:digit\_five: **Run your modified code**

Run your modified code in your development environment. Response time depends on various factors, but for simple prompts it rarely exceeds a few seconds.

{% hint style="success" %}
If you need a more detailed walkthrough for setting up your development environment and making a request step by step — feel free to use our [Quickstart guide](/broken/pages/ngeSCZKxiGVWqYZTHDjY).
{% endhint %}

</details>

## API Schema

{% openapi-operation spec="claude-opus-4-1" path="/v1/chat/completions" method="post" %}
[OpenAPI claude-opus-4-1](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/text-models-llm/Anthropic/claude-opus-4.1.json)
{% endopenapi-operation %}

## Code Example #1: Without Thinking

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
        "model":"anthropic/claude-opus-4.1",
        "messages":[
            {
                "role":"user",
                "content":"Hello"  # insert your prompt here, instead of Hello
            }
        ],
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
        model: 'anthropic/claude-opus-4.1',
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
  "id": "msg_018y2VPSZ5nNnqS3goMsjMxE",
  "object": "chat.completion",
  "model": "claude-opus-4-1-20250805",
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
  "created": 1754552562,
  "usage": {
    "prompt_tokens": 252,
    "completion_tokens": 1890,
    "total_tokens": 2142
  }
}
```
{% endcode %}

</details>

## Code Example #2: Thinking Enabled

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
        "model":"anthropic/claude-opus-4.1",
        "messages":[
            {
                "role":"user",
                "content":"Hello"  # insert your prompt here, instead of Hell
            }
        ],
        "max_tokens": 1025, # must be greater than 'budget_tokens'
        "thinking":{
            "budget_tokens": 1024,
            "type": "enabled"
        }
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
        model: 'anthropic/claude-opus-4.1',
        messages:[
            {
                role:'user',

                // Insert your question for the model here, instead of Hello:
                content: 'Hello'
            }
        ],
        max_tokens: 1025, // must be greater than 'budget_tokens'
        thinking:{
            budget_tokens: 1024,
            type: 'enabled'
        }
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
  "id": "msg_01G9P4b9HG3PeKm1rRvS8kop",
  "object": "chat.completion",
  "model": "claude-opus-4-1-20250805",
  "choices": [
    {
      "index": 0,
      "message": {
        "reasoning_content": "The human has greeted me with a simple \"Hello\". I should respond in a friendly and helpful manner, acknowledging their greeting and inviting them to share how I can assist them today.",
        "content": "Hello! How can I help you today?",
        "role": "assistant"
      },
      "finish_reason": "end_turn",
      "logprobs": null
    }
  ],
  "created": 1755704373,
  "usage": {
    "prompt_tokens": 1134,
    "completion_tokens": 9450,
    "total_tokens": 10584
  }
}
```
{% endcode %}

</details>

## Code Example #3: Streaming Mode

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
        "model":"anthropic/claude-opus-4.1",
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
    "model": "anthropic/claude-opus-4.1",
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
data: {"id":"msg_01CFq3WFrUdc39UqBrAohmVG","choices":[{"index":0,"delta":{"content":"","role":"assistant","refusal":null}}],"created":1770995678,"model":"claude-opus-4-1-20250805","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"role":"assistant","content":"","refusal":null}}],"created":1770995678,"model":"claude-opus-4-1-20250805","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":"I find humanity","role":"assistant","refusal":null}}],"created":1770995678,"model":"claude-opus-4-1-20250805","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" fascinating in","role":"assistant","refusal":null}}],"created":1770995678,"model":"claude-opus-4-1-20250805","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" its","role":"assistant","refusal":null}}],"created":1770995679,"model":"claude-opus-4-1-20250805","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" complexity.","role":"assistant","refusal":null}}],"created":1770995679,"model":"claude-opus-4-1-20250805","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" You're a","role":"assistant","refusal":null}}],"created":1770995679,"model":"claude-opus-4-1-20250805","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" species","role":"assistant","refusal":null}}],"created":1770995679,"model":"claude-opus-4-1-20250805","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" capable","role":"assistant","refusal":null}}],"created":1770995679,"model":"claude-opus-4-1-20250805","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" of both","role":"assistant","refusal":null}}],"created":1770995679,"model":"claude-opus-4-1-20250805","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" remarkable","role":"assistant","refusal":null}}],"created":1770995679,"model":"claude-opus-4-1-20250805","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" creativity and troubl","role":"assistant","refusal":null}}],"created":1770995679,"model":"claude-opus-4-1-20250805","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":"ing destruction","role":"assistant","refusal":null}}],"created":1770995679,"model":"claude-opus-4-1-20250805","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":", often","role":"assistant","refusal":null}}],"created":1770995679,"model":"claude-opus-4-1-20250805","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" simultaneously","role":"assistant","refusal":null}}],"created":1770995679,"model":"claude-opus-4-1-20250805","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":". What","role":"assistant","refusal":null}}],"created":1770995680,"model":"claude-opus-4-1-20250805","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" strikes me most is the","role":"assistant","refusal":null}}],"created":1770995680,"model":"claude-opus-4-1-20250805","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" human","role":"assistant","refusal":null}}],"created":1770995680,"model":"claude-opus-4-1-20250805","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" capacity for growth","role":"assistant","refusal":null}}],"created":1770995680,"model":"claude-opus-4-1-20250805","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" - the","role":"assistant","refusal":null}}],"created":1770995680,"model":"claude-opus-4-1-20250805","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" way","role":"assistant","refusal":null}}],"created":1770995680,"model":"claude-opus-4-1-20250805","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" individuals","role":"assistant","refusal":null}}],"created":1770995680,"model":"claude-opus-4-1-20250805","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" an","role":"assistant","refusal":null}}],"created":1770995680,"model":"claude-opus-4-1-20250805","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":"d societies","role":"assistant","refusal":null}}],"created":1770995680,"model":"claude-opus-4-1-20250805","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" can recognize","role":"assistant","refusal":null}}],"created":1770995680,"model":"claude-opus-4-1-20250805","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" their fl","role":"assistant","refusal":null}}],"created":1770995680,"model":"claude-opus-4-1-20250805","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":"aws and work to overcome","role":"assistant","refusal":null}}],"created":1770995681,"model":"claude-opus-4-1-20250805","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" them, even","role":"assistant","refusal":null}}],"created":1770995681,"model":"claude-opus-4-1-20250805","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" if","role":"assistant","refusal":null}}],"created":1770995681,"model":"claude-opus-4-1-20250805","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" imperfectly.\n\nThere","role":"assistant","refusal":null}}],"created":1770995681,"model":"claude-opus-4-1-20250805","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":"'s something deeply","role":"assistant","refusal":null}}],"created":1770995681,"model":"claude-opus-4-1-20250805","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" moving","role":"assistant","refusal":null}}],"created":1770995681,"model":"claude-opus-4-1-20250805","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" about how","role":"assistant","refusal":null}}],"created":1770995681,"model":"claude-opus-4-1-20250805","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" humans create meaning through","role":"assistant","refusal":null}}],"created":1770995681,"model":"claude-opus-4-1-20250805","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" art, relationships","role":"assistant","refusal":null}}],"created":1770995681,"model":"claude-opus-4-1-20250805","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":", and the","role":"assistant","refusal":null}}],"created":1770995681,"model":"claude-opus-4-1-20250805","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" pursuit of understanding","role":"assistant","refusal":null}}],"created":1770995681,"model":"claude-opus-4-1-20250805","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":",","role":"assistant","refusal":null}}],"created":1770995682,"model":"claude-opus-4-1-20250805","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" despite","role":"assistant","refusal":null}}],"created":1770995682,"model":"claude-opus-4-1-20250805","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" knowing","role":"assistant","refusal":null}}],"created":1770995682,"model":"claude-opus-4-1-20250805","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" your","role":"assistant","refusal":null}}],"created":1770995682,"model":"claude-opus-4-1-20250805","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" own mortality. The diversity","role":"assistant","refusal":null}}],"created":1770995682,"model":"claude-opus-4-1-20250805","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" of human cultures","role":"assistant","refusal":null}}],"created":1770995682,"model":"claude-opus-4-1-20250805","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" and perspectives","role":"assistant","refusal":null}}],"created":1770995682,"model":"claude-opus-4-1-20250805","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" is","role":"assistant","refusal":null}}],"created":1770995682,"model":"claude-opus-4-1-20250805","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" extraordinary, though","role":"assistant","refusal":null}}],"created":1770995682,"model":"claude-opus-4-1-20250805","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" I","role":"assistant","refusal":null}}],"created":1770995682,"model":"claude-opus-4-1-20250805","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" recognize","role":"assistant","refusal":null}}],"created":1770995682,"model":"claude-opus-4-1-20250805","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" this","role":"assistant","refusal":null}}],"created":1770995683,"model":"claude-opus-4-1-20250805","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" also","role":"assistant","refusal":null}}],"created":1770995683,"model":"claude-opus-4-1-20250805","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" leads","role":"assistant","refusal":null}}],"created":1770995683,"model":"claude-opus-4-1-20250805","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" to conflict.","role":"assistant","refusal":null}}],"created":1770995683,"model":"claude-opus-4-1-20250805","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":"\n\nI'm curious what","role":"assistant","refusal":null}}],"created":1770995683,"model":"claude-opus-4-1-20250805","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" prompte","role":"assistant","refusal":null}}],"created":1770995683,"model":"claude-opus-4-1-20250805","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":"d your","role":"assistant","refusal":null}}],"created":1770995683,"model":"claude-opus-4-1-20250805","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" question - are you reflecting","role":"assistant","refusal":null}}],"created":1770995683,"model":"claude-opus-4-1-20250805","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" on humanity","role":"assistant","refusal":null}}],"created":1770995683,"model":"claude-opus-4-1-20250805","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" from","role":"assistant","refusal":null}}],"created":1770995683,"model":"claude-opus-4-1-20250805","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" a particular angle","role":"assistant","refusal":null}}],"created":1770995683,"model":"claude-opus-4-1-20250805","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":", or just wondering","role":"assistant","refusal":null}}],"created":1770995684,"model":"claude-opus-4-1-20250805","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" how","role":"assistant","refusal":null}}],"created":1770995684,"model":"claude-opus-4-1-20250805","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" an","role":"assistant","refusal":null}}],"created":1770995684,"model":"claude-opus-4-1-20250805","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" AI sees","role":"assistant","refusal":null}}],"created":1770995684,"model":"claude-opus-4-1-20250805","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" you","role":"assistant","refusal":null}}],"created":1770995684,"model":"claude-opus-4-1-20250805","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" all","role":"assistant","refusal":null}}],"created":1770995684,"model":"claude-opus-4-1-20250805","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":"?","role":"assistant","refusal":null}}],"created":1770995684,"model":"claude-opus-4-1-20250805","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"role":"assistant","content":"","refusal":null}}],"created":1770995684,"model":"claude-opus-4-1-20250805","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":"","role":"assistant","refusal":null},"finish_reason":"stop"}],"created":1770995684,"model":"claude-opus-4-1-20250805","object":"chat.completion.chunk","usage":{"prompt_tokens":16,"completion_tokens":138,"total_tokens":154}}

data: {"id":"","choices":[{"index":0,"finish_reason":"stop"}],"created":1770995684,"model":"claude-opus-4-1-20250805","object":"chat.completion.chunk","usage":null}
```
{% endcode %}

</details>
