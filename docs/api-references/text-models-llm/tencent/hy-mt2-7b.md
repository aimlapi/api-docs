# Hy-MT2-7B

{% columns %}
{% column width="66.66666666666666%" %}
{% hint style="info" %}
This documentation is valid for the following list of our models:

* `tencent/hy-mt2-7b`
{% endhint %}
{% endcolumn %}

{% column width="33.33333333333334%" %}
<a href="https://aimlapi.com/app/tencent/hy-mt2-7b" class="button primary">Try in Playground</a>
{% endcolumn %}
{% endcolumns %}

## Model Overview

Hy-MT2-7B is a 7B-parameter translation model from Tencent. It supports 33 language pairs and five Chinese dialect and minority-language pairs, with workflows for structured, delimiter-based, contextual, glossary-based, and style-guided translation.

It sits between [Hy-MT2-1.8B](hy-mt2-1.8b.md) and the flagship [Hy-MT2-30B-A3B](hy-mt2-30b-a3b.md) — the middle option when the compact model is not accurate enough and the flagship is more than the job needs. Context window is 8192 tokens, with up to 4096 tokens of output.

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
▪ **Provide input:** fill in the request input field(s) shown in the example.

**4️ (Optional) Tune the request**\
See the API schema below for optional generation settings.

**5️ Run your code**\
Run the updated code in your development environment.

{% hint style="success" %}
For a detailed walkthrough, use our [Quickstart guide](https://docs.aimlapi.com/quickstart/setting-up).
{% endhint %}

</details>

## API Schema

{% openapi-operation spec="hy-mt2-7b" path="/v1/chat/completions" method="post" %}
[OpenAPI hy-mt2-7b](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/text-models-llm/tencent/hy-mt2-7b.json)
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
        "Authorization": "Bearer <YOUR_AIMLAPI_KEY>",
        "Content-Type": "application/json",
    },
    json={
        "model": "tencent/hy-mt2-7b",
        "messages": [
            {
                "role": "user",
                # State the target language, then the text to translate:
                "content": "Translate into French: The library closes at six on weekdays."
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
      model: 'tencent/hy-mt2-7b',
      messages: [
        {
          role: 'user',
          // State the target language, then the text to translate:
          content: 'Translate into French: The library closes at six on weekdays.'
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
```json
{
  "id": "gen-1787591210-few1zyyh7JTBpsukLc5G",
  "object": "chat.completion",
  "created": 1787591210,
  "model": "tencent/hy-mt2-7b",
  "system_fingerprint": null,
  "service_tier": null,
  "choices": [
    {
      "index": 0,
      "logprobs": null,
      "finish_reason": "stop",
      "native_finish_reason": "stop",
      "message": {
        "role": "assistant",
        "content": "La bibliothèque ferme à six heures les jours ouvrés.",
        "refusal": null,
        "reasoning": null
      }
    }
  ],
  "usage": {
    "completion_tokens": 17,
    "prompt_tokens": 14,
    "total_tokens": 31,
    "completion_tokens_details": {
      "reasoning_tokens": 0,
      "image_tokens": 0,
      "audio_tokens": 0
    },
    "prompt_tokens_details": {
      "cached_tokens": 0,
      "cache_write_tokens": 0,
      "audio_tokens": 0,
      "video_tokens": 0
    }
  },
  "meta": {
    "usage": {
      "credits_used": 17,
      "usd_spent": 8.5e-06
    }
  }
}
```
{% endcode %}

</details>
