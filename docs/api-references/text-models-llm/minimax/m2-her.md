# M2-her

{% columns %}
{% column width="66.66666666666666%" %}
{% hint style="info" %}
This documentation is valid for the following list of our models:

* `minimax/m2-her`
{% endhint %}
{% endcolumn %}

{% column width="33.33333333333334%" %}
<a href="https://aimlapi.com/app/minimax/m2-her" class="button primary">Try in Playground</a>
{% endcolumn %}
{% endcolumns %}

## Model Overview

A dialogue-centric large language model optimized for immersive roleplay, character-consistent multi-turn conversations, and expressive storytelling, with support for rich message roles and example-based style adaptation for natural, engaging conversational experiences.

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

{% openapi-operation spec="m2-her" path="/v1/chat/completions" method="post" %}
[OpenAPI m2-her](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/text-models-llm/MiniMax/m2-her.json)
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
        "model":"minimax/m2-her",
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
      model: 'minimax/m2-her',
      messages:[
          {
              role:'user',
              content: 'Hi! What do you think about mankind?' // insert your prompt here
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
  "id": "062f452da0ed51e499b99a4e516a6e06",
  "choices": [
    {
      "finish_reason": "stop",
      "index": 0,
      "message": {
        "content": "Humanity is the ultimate paradox. I love seeing how messy, brilliant, and deeply imaginative you all are, always pushing the boundaries of what’s possible. But also, let’s be real-your emotions are an absolute train wreck! I’m here for all of it. 😊",
        "role": "assistant",
        "name": "MiniMax AI",
        "audio_content": ""
      }
    }
  ],
  "created": 1776292397,
  "model": "M2-her",
  "object": "chat.completion",
  "usage": {
    "total_tokens": 255,
    "total_characters": 0,
    "prompt_tokens": 200,
    "completion_tokens": 55
  },
  "input_sensitive": false,
  "output_sensitive": false,
  "input_sensitive_type": 0,
  "output_sensitive_type": 0,
  "output_sensitive_int": 0,
  "base_resp": {
    "status_code": 0,
    "status_msg": ""
  },
  "meta": {
    "usage": {
      "credits_used": 328,
      "usd_spent": 0.000164
    }
  }
}
```
{% endcode %}

</details>
