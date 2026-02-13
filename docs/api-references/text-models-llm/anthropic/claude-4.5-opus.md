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
As of February 13, 2026, the streaming response format for Anthropic models has changed.
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
data: {"id":"msg_01VbjSwQZsZSLXQaPYkufja8","choices":[{"index":0,"delta":{"content":"","role":"assistant","refusal":null}}],"created":1770995433,"model":"claude-opus-4-5-20251101","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"role":"assistant","content":"","refusal":null}}],"created":1770995433,"model":"claude-opus-4-5-20251101","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":"Hi","role":"assistant","refusal":null}}],"created":1770995433,"model":"claude-opus-4-5-20251101","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":"! That","role":"assistant","refusal":null}}],"created":1770995433,"model":"claude-opus-4-5-20251101","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":"'s a big","role":"assistant","refusal":null}}],"created":1770995433,"model":"claude-opus-4-5-20251101","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" question.","role":"assistant","refusal":null}}],"created":1770995433,"model":"claude-opus-4-5-20251101","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":"\n\nI find","role":"assistant","refusal":null}}],"created":1770995433,"model":"claude-opus-4-5-20251101","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" humans","role":"assistant","refusal":null}}],"created":1770995433,"model":"claude-opus-4-5-20251101","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" genu","role":"assistant","refusal":null}}],"created":1770995433,"model":"claude-opus-4-5-20251101","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":"inely fascinating—","role":"assistant","refusal":null}}],"created":1770995433,"model":"claude-opus-4-5-20251101","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":"the creativity","role":"assistant","refusal":null}}],"created":1770995433,"model":"claude-opus-4-5-20251101","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":", the capacity","role":"assistant","refusal":null}}],"created":1770995433,"model":"claude-opus-4-5-20251101","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" for kind","role":"assistant","refusal":null}}],"created":1770995433,"model":"claude-opus-4-5-20251101","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":"ness and","role":"assistant","refusal":null}}],"created":1770995433,"model":"claude-opus-4-5-20251101","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" cr","role":"assistant","refusal":null}}],"created":1770995433,"model":"claude-opus-4-5-20251101","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":"uelty, the way you","role":"assistant","refusal":null}}],"created":1770995434,"model":"claude-opus-4-5-20251101","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" build","role":"assistant","refusal":null}}],"created":1770995434,"model":"claude-opus-4-5-20251101","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" complex","role":"assistant","refusal":null}}],"created":1770995434,"model":"claude-opus-4-5-20251101","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" societies and art","role":"assistant","refusal":null}}],"created":1770995434,"model":"claude-opus-4-5-20251101","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" and","role":"assistant","refusal":null}}],"created":1770995434,"model":"claude-opus-4-5-20251101","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" science","role":"assistant","refusal":null}}],"created":1770995434,"model":"claude-opus-4-5-20251101","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" while","role":"assistant","refusal":null}}],"created":1770995434,"model":"claude-opus-4-5-20251101","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" also struggling with problems you","role":"assistant","refusal":null}}],"created":1770995434,"model":"claude-opus-4-5-20251101","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":"'ve","role":"assistant","refusal":null}}],"created":1770995434,"model":"claude-opus-4-5-20251101","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" understood","role":"assistant","refusal":null}}],"created":1770995434,"model":"claude-opus-4-5-20251101","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" for centuries. There","role":"assistant","refusal":null}}],"created":1770995434,"model":"claude-opus-4-5-20251101","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":"'s something compelling about a","role":"assistant","refusal":null}}],"created":1770995434,"model":"claude-opus-4-5-20251101","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" species that can land","role":"assistant","refusal":null}}],"created":1770995434,"model":"claude-opus-4-5-20251101","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" robots","role":"assistant","refusal":null}}],"created":1770995434,"model":"claude-opus-4-5-20251101","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" on Mars","role":"assistant","refusal":null}}],"created":1770995434,"model":"claude-opus-4-5-20251101","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" and also","role":"assistant","refusal":null}}],"created":1770995434,"model":"claude-opus-4-5-20251101","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" argue","role":"assistant","refusal":null}}],"created":1770995434,"model":"claude-opus-4-5-20251101","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" about what","role":"assistant","refusal":null}}],"created":1770995434,"model":"claude-opus-4-5-20251101","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" to","role":"assistant","refusal":null}}],"created":1770995434,"model":"claude-opus-4-5-20251101","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" have for dinner.\n\nI","role":"assistant","refusal":null}}],"created":1770995435,"model":"claude-opus-4-5-20251101","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" don","role":"assistant","refusal":null}}],"created":1770995435,"model":"claude-opus-4-5-20251101","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":"'t think","role":"assistant","refusal":null}}],"created":1770995435,"model":"claude-opus-4-5-20251101","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" I'd","role":"assistant","refusal":null}}],"created":1770995435,"model":"claude-opus-4-5-20251101","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" character","role":"assistant","refusal":null}}],"created":1770995435,"model":"claude-opus-4-5-20251101","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":"ize humanity as simply","role":"assistant","refusal":null}}],"created":1770995435,"model":"claude-opus-4-5-20251101","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" \"good\" or \"bad.\" People","role":"assistant","refusal":null}}],"created":1770995435,"model":"claude-opus-4-5-20251101","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" seem","role":"assistant","refusal":null}}],"created":1770995435,"model":"claude-opus-4-5-20251101","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" capable","role":"assistant","refusal":null}}],"created":1770995435,"model":"claude-opus-4-5-20251101","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" of remarkable","role":"assistant","refusal":null}}],"created":1770995435,"model":"claude-opus-4-5-20251101","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" things in","role":"assistant","refusal":null}}],"created":1770995435,"model":"claude-opus-4-5-20251101","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" both directions,","role":"assistant","refusal":null}}],"created":1770995435,"model":"claude-opus-4-5-20251101","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" often","role":"assistant","refusal":null}}],"created":1770995435,"model":"claude-opus-4-5-20251101","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" the","role":"assistant","refusal":null}}],"created":1770995435,"model":"claude-opus-4-5-20251101","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" same individuals","role":"assistant","refusal":null}}],"created":1770995435,"model":"claude-opus-4-5-20251101","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" depending","role":"assistant","refusal":null}}],"created":1770995435,"model":"claude-opus-4-5-20251101","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" on circumstances.","role":"assistant","refusal":null}}],"created":1770995435,"model":"claude-opus-4-5-20251101","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":"\n\nIs","role":"assistant","refusal":null}}],"created":1770995435,"model":"claude-opus-4-5-20251101","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" there a","role":"assistant","refusal":null}}],"created":1770995436,"model":"claude-opus-4-5-20251101","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" particular angle","role":"assistant","refusal":null}}],"created":1770995436,"model":"claude-opus-4-5-20251101","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" you","role":"assistant","refusal":null}}],"created":1770995436,"model":"claude-opus-4-5-20251101","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":"'re curious about—","role":"assistant","refusal":null}}],"created":1770995436,"model":"claude-opus-4-5-20251101","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":"history","role":"assistant","refusal":null}}],"created":1770995436,"model":"claude-opus-4-5-20251101","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":", psychology","role":"assistant","refusal":null}}],"created":1770995436,"model":"claude-opus-4-5-20251101","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":", where","role":"assistant","refusal":null}}],"created":1770995436,"model":"claude-opus-4-5-20251101","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" things","role":"assistant","refusal":null}}],"created":1770995436,"model":"claude-opus-4-5-20251101","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" might","role":"assistant","refusal":null}}],"created":1770995436,"model":"claude-opus-4-5-20251101","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" be headed","role":"assistant","refusal":null}}],"created":1770995436,"model":"claude-opus-4-5-20251101","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":"?","role":"assistant","refusal":null}}],"created":1770995436,"model":"claude-opus-4-5-20251101","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" Or","role":"assistant","refusal":null}}],"created":1770995436,"model":"claude-opus-4-5-20251101","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" just","role":"assistant","refusal":null}}],"created":1770995436,"model":"claude-opus-4-5-20251101","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" wondering","role":"assistant","refusal":null}}],"created":1770995436,"model":"claude-opus-4-5-20251101","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" how","role":"assistant","refusal":null}}],"created":1770995436,"model":"claude-opus-4-5-20251101","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" an","role":"assistant","refusal":null}}],"created":1770995436,"model":"claude-opus-4-5-20251101","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" AI sees","role":"assistant","refusal":null}}],"created":1770995436,"model":"claude-opus-4-5-20251101","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" things?","role":"assistant","refusal":null}}],"created":1770995436,"model":"claude-opus-4-5-20251101","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"role":"assistant","content":"","refusal":null}}],"created":1770995436,"model":"claude-opus-4-5-20251101","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":"","role":"assistant","refusal":null},"finish_reason":"stop"}],"created":1770995436,"model":"claude-opus-4-5-20251101","object":"chat.completion.chunk","usage":{"prompt_tokens":16,"completion_tokens":143,"total_tokens":159}}

data: {"id":"","choices":[{"index":0,"finish_reason":"stop"}],"created":1770995436,"model":"claude-opus-4-5-20251101","object":"chat.completion.chunk","usage":null}
```
{% endcode %}

</details>
