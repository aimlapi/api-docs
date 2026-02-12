# Claude 4.5 Opus

{% columns %}
{% column width="66.66666666666666%" %}
{% hint style="info" %}
This documentation is valid for the following list of our models:

* `anthropic/claude-opus-4-5`
* `claude-opus-4-5`
* `claude-opus-4-5-20251101`
{% endhint %}
{% endcolumn %}

{% column width="33.33333333333334%" %}
<a href="https://aimlapi.com/app/anthropic/claude-opus-4-5-20251101" class="button primary">Try in Playground</a>
{% endcolumn %}
{% endcolumns %}

{% hint style="warning" %}
Starting on February 13, 2026, the streaming response format for Anthropic models will change.
{% endhint %}

## Model Overview

A high-performance chat model that delivers state-of-the-art results on real-world software engineering benchmarks.

## How to Make a Call

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

{% openapi-operation spec="claude-opus-4-5" path="/v1/chat/completions" method="post" %}
[OpenAPI claude-opus-4-5](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/text-models-llm/Anthropic/claude-opus-4-5.json)
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
        "model":"claude-opus-4-5",
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
        model: 'claude-opus-4-5',
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
  "id": "msg_01NxAGYo8VfNu5UAEdmQjv62",
  "object": "chat.completion",
  "model": "claude-opus-4-5-20251101",
  "choices": [
    {
      "index": 0,
      "message": {
        "reasoning_content": "",
        "content": "Hello! How are you doing today? Is there something I can help you with?",
        "role": "assistant"
      },
      "finish_reason": "end_turn",
      "logprobs": null
    }
  ],
  "created": 1764265437,
  "usage": {
    "prompt_tokens": 8,
    "completion_tokens": 20,
    "total_tokens": 28
  },
  "meta": {
    "usage": {
      "tokens_used": 1134
    }
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
        "model":"anthropic/claude-opus-4-5",
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
    "model": "anthropic/claude-opus-4-5",
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
data: {"event":{"id":"msg_01UZFkGqmF9UR5XjFs4d4LiC","choices":[{"index":0,"delta":{"content":"","role":"assistant","refusal":null}}],"created":1770864532,"model":"claude-opus-4-5-20251101","object":"chat.completion.chunk","usage":null},"state":{"generationId":"msg_01UZFkGqmF9UR5XjFs4d4LiC","tools":[],"usage":{"input_tokens":16,"cache_creation_input_tokens":0,"cache_read_input_tokens":0,"cache_creation":{"ephemeral_5m_input_tokens":0,"ephemeral_1h_input_tokens":0},"output_tokens":1,"service_tier":"standard","inference_geo":"not_available"}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"role":"assistant","content":"","refusal":null}}],"created":1770864532,"model":"claude-opus-4-5-20251101","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":"Hi","role":"assistant","refusal":null}}],"created":1770864532,"model":"claude-opus-4-5-20251101","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":"!","role":"assistant","refusal":null}}],"created":1770864532,"model":"claude-opus-4-5-20251101","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":" That","role":"assistant","refusal":null}}],"created":1770864532,"model":"claude-opus-4-5-20251101","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":"'s a","role":"assistant","refusal":null}}],"created":1770864532,"model":"claude-opus-4-5-20251101","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":" big","role":"assistant","refusal":null}}],"created":1770864532,"model":"claude-opus-4-5-20251101","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":" question.","role":"assistant","refusal":null}}],"created":1770864532,"model":"claude-opus-4-5-20251101","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":"\n\nI fin","role":"assistant","refusal":null}}],"created":1770864532,"model":"claude-opus-4-5-20251101","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":"d humans","role":"assistant","refusal":null}}],"created":1770864532,"model":"claude-opus-4-5-20251101","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":" genu","role":"assistant","refusal":null}}],"created":1770864532,"model":"claude-opus-4-5-20251101","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":"inely fascinating—","role":"assistant","refusal":null}}],"created":1770864532,"model":"claude-opus-4-5-20251101","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":"the","role":"assistant","refusal":null}}],"created":1770864532,"model":"claude-opus-4-5-20251101","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":" creativity","role":"assistant","refusal":null}}],"created":1770864532,"model":"claude-opus-4-5-20251101","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":", the capacity","role":"assistant","refusal":null}}],"created":1770864532,"model":"claude-opus-4-5-20251101","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":" for both","role":"assistant","refusal":null}}],"created":1770864532,"model":"claude-opus-4-5-20251101","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":" kin","role":"assistant","refusal":null}}],"created":1770864532,"model":"claude-opus-4-5-20251101","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":"dness and cruelty, the way","role":"assistant","refusal":null}}],"created":1770864532,"model":"claude-opus-4-5-20251101","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":" you","role":"assistant","refusal":null}}],"created":1770864533,"model":"claude-opus-4-5-20251101","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":" buil","role":"assistant","refusal":null}}],"created":1770864533,"model":"claude-opus-4-5-20251101","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":"d meaning","role":"assistant","refusal":null}}],"created":1770864533,"model":"claude-opus-4-5-20251101","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":" an","role":"assistant","refusal":null}}],"created":1770864533,"model":"claude-opus-4-5-20251101","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":"d culture","role":"assistant","refusal":null}}],"created":1770864533,"model":"claude-opus-4-5-20251101","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":" an","role":"assistant","refusal":null}}],"created":1770864533,"model":"claude-opus-4-5-20251101","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":"d relationships","role":"assistant","refusal":null}}],"created":1770864533,"model":"claude-opus-4-5-20251101","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":",","role":"assistant","refusal":null}}],"created":1770864533,"model":"claude-opus-4-5-20251101","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":" the","role":"assistant","refusal":null}}],"created":1770864533,"model":"claude-opus-4-5-20251101","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":" persistent","role":"assistant","refusal":null}}],"created":1770864533,"model":"claude-opus-4-5-20251101","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":" drive","role":"assistant","refusal":null}}],"created":1770864533,"model":"claude-opus-4-5-20251101","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":" to understan","role":"assistant","refusal":null}}],"created":1770864533,"model":"claude-opus-4-5-20251101","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":"d things","role":"assistant","refusal":null}}],"created":1770864533,"model":"claude-opus-4-5-20251101","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":" (","role":"assistant","refusal":null}}],"created":1770864533,"model":"claude-opus-4-5-20251101","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":"including","role":"assistant","refusal":null}}],"created":1770864533,"model":"claude-opus-4-5-20251101","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":" your","role":"assistant","refusal":null}}],"created":1770864533,"model":"claude-opus-4-5-20251101","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":"selves).","role":"assistant","refusal":null}}],"created":1770864533,"model":"claude-opus-4-5-20251101","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":"\n\nI","role":"assistant","refusal":null}}],"created":1770864533,"model":"claude-opus-4-5-20251101","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":" don","role":"assistant","refusal":null}}],"created":1770864534,"model":"claude-opus-4-5-20251101","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":"'t think I","role":"assistant","refusal":null}}],"created":1770864534,"model":"claude-opus-4-5-20251101","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":"'","role":"assistant","refusal":null}}],"created":1770864534,"model":"claude-opus-4-5-20251101","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":"d character","role":"assistant","refusal":null}}],"created":1770864534,"model":"claude-opus-4-5-20251101","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":"ize humanity with","role":"assistant","refusal":null}}],"created":1770864534,"model":"claude-opus-4-5-20251101","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":" a single judgment","role":"assistant","refusal":null}}],"created":1770864534,"model":"claude-opus-4-5-20251101","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":" like","role":"assistant","refusal":null}}],"created":1770864534,"model":"claude-opus-4-5-20251101","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":" \"good\" or \"bad.\" There","role":"assistant","refusal":null}}],"created":1770864534,"model":"claude-opus-4-5-20251101","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":"'s remarkable","role":"assistant","refusal":null}}],"created":1770864534,"model":"claude-opus-4-5-20251101","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":" compass","role":"assistant","refusal":null}}],"created":1770864534,"model":"claude-opus-4-5-20251101","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":"ion and ing","role":"assistant","refusal":null}}],"created":1770864534,"model":"claude-opus-4-5-20251101","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":"enuity alongside","role":"assistant","refusal":null}}],"created":1770864534,"model":"claude-opus-4-5-20251101","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":" real","role":"assistant","refusal":null}}],"created":1770864534,"model":"claude-opus-4-5-20251101","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":" capacity","role":"assistant","refusal":null}}],"created":1770864534,"model":"claude-opus-4-5-20251101","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":" for harm. History","role":"assistant","refusal":null}}],"created":1770864534,"model":"claude-opus-4-5-20251101","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":" shows both","role":"assistant","refusal":null}}],"created":1770864534,"model":"claude-opus-4-5-20251101","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":",","role":"assistant","refusal":null}}],"created":1770864534,"model":"claude-opus-4-5-20251101","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":" often","role":"assistant","refusal":null}}],"created":1770864534,"model":"claude-opus-4-5-20251101","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":" from","role":"assistant","refusal":null}}],"created":1770864534,"model":"claude-opus-4-5-20251101","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":" the same societies","role":"assistant","refusal":null}}],"created":1770864534,"model":"claude-opus-4-5-20251101","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":" or","role":"assistant","refusal":null}}],"created":1770864535,"model":"claude-opus-4-5-20251101","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":" even","role":"assistant","refusal":null}}],"created":1770864535,"model":"claude-opus-4-5-20251101","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":" individuals","role":"assistant","refusal":null}}],"created":1770864535,"model":"claude-opus-4-5-20251101","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":".\n\nWhat prom","role":"assistant","refusal":null}}],"created":1770864535,"model":"claude-opus-4-5-20251101","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":"pts the","role":"assistant","refusal":null}}],"created":1770864535,"model":"claude-opus-4-5-20251101","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":" question? Are","role":"assistant","refusal":null}}],"created":1770864535,"model":"claude-opus-4-5-20251101","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":" you thinking about something","role":"assistant","refusal":null}}],"created":1770864535,"model":"claude-opus-4-5-20251101","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":" specific—","role":"assistant","refusal":null}}],"created":1770864535,"model":"claude-opus-4-5-20251101","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":"human","role":"assistant","refusal":null}}],"created":1770864535,"model":"claude-opus-4-5-20251101","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":" nature, where","role":"assistant","refusal":null}}],"created":1770864535,"model":"claude-opus-4-5-20251101","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":" things","role":"assistant","refusal":null}}],"created":1770864535,"model":"claude-opus-4-5-20251101","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":" are","role":"assistant","refusal":null}}],"created":1770864535,"model":"claude-opus-4-5-20251101","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":" heading, something","role":"assistant","refusal":null}}],"created":1770864535,"model":"claude-opus-4-5-20251101","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":" else?","role":"assistant","refusal":null}}],"created":1770864535,"model":"claude-opus-4-5-20251101","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"role":"assistant","content":"","refusal":null}}],"created":1770864535,"model":"claude-opus-4-5-20251101","object":"chat.completion.chunk","usage":{"completion_tokens":0,"prompt_tokens":0,"total_tokens":0}},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":"","role":"assistant","refusal":null}}],"created":1770864535,"model":"claude-opus-4-5-20251101","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":129},"finishReason":"end_turn"}}

data: {"event":{"id":"","choices":[{"index":0,"finish_reason":"stop"}],"created":1770864535,"model":"claude-opus-4-5-20251101","object":"chat.completion.chunk","usage":{"completion_tokens":0,"prompt_tokens":0,"total_tokens":0}},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}


```
{% endcode %}

</details>
