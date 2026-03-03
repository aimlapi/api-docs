# grok-4.1-fast-reasoning

{% columns %}
{% column width="66.66666666666666%" %}
{% hint style="info" %}
This documentation is valid for the following list of our models:

* `x-ai/grok-4-1-fast-reasoning`
{% endhint %}
{% endcolumn %}

{% column width="33.33333333333334%" %}
<a href="https://aimlapi.com/app/x-ai/grok-4-1-fast-reasoning" class="button primary">Try in Playground</a>
{% endcolumn %}
{% endcolumns %}

## Model Overview

xAI’s multimodal model, offering state-of-the-art cost efficiency and a 2M-token context window.\
Reasoning variant.

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

{% openapi-operation spec="grok-4-1-fast-reasoning" path="/v1/chat/completions" method="post" %}
[OpenAPI grok-4-1-fast-reasoning](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/text-models-llm/xAI/grok-4-1-fast-reasoning.json)
{% endopenapi-operation %}

## Code Example

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
        "model":"x-ai/grok-4-1-fast-reasoning",
        "messages":[
            {
                "role":"user",
                # insert your prompt here 
                "content":"Hi! What do you think about mankind?"  
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
      model: 'x-ai/grok-4-1-fast-reasoning',
      messages:[
          {
              role:'user',
              // insert your prompt here
              content: 'Hi! What do you think about mankind?'
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
  "id": "b7b4739a-39d2-1fd3-f6fc-2a97de9da190",
  "object": "chat.completion",
  "created": 1763993842,
  "model": "grok-4-1-fast-reasoning",
  "choices": [
    {
      "index": 0,
      "message": {
        "role": "assistant",
        "content": "Hi! Mankind? Fascinating bunch. You've got this wild mix of brilliance and absurdity—splitting atoms to power cities (or bombs), painting the Sistine Chapel while arguing over who gets the last slice of pizza, and launching rockets to Mars just because \"why not?\" You've invented coffee, democracy, and the internet, but also reality TV and pineapple on pizza. Capable of staggering kindness and unthinkable cruelty, yet somehow you keep muddling forward, adapting, creating, and occasionally tripping over your own shoelaces.\n\nOverall, I'm optimistic. You're the species that built *me*, after all. What's not to like? What sparked the question—good day or existential crisis? 😊",
        "refusal": null
      },
      "finish_reason": "stop"
    }
  ],
  "usage": {
    "prompt_tokens": 165,
    "completion_tokens": 140,
    "total_tokens": 573,
    "prompt_tokens_details": {
      "text_tokens": 165,
      "audio_tokens": 0,
      "image_tokens": 0,
      "cached_tokens": 151
    },
    "completion_tokens_details": {
      "reasoning_tokens": 268,
      "audio_tokens": 0,
      "accepted_prediction_tokens": 0,
      "rejected_prediction_tokens": 0
    },
    "num_sources_used": 0
  },
  "system_fingerprint": "fp_fcabeb8dbc",
  "meta": {
    "usage": {
      "tokens_used": 515
    }
  }
}
```
{% endcode %}

</details>
