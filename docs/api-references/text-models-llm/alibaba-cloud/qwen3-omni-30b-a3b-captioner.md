# qwen3-omni-30b-a3b-captioner

{% columns %}
{% column width="66.66666666666666%" %}
{% hint style="info" %}
This documentation is valid for the following list of our models:

* `alibaba/qwen3-omni-30b-a3b-captioner`
{% endhint %}
{% endcolumn %}

{% column width="33.33333333333334%" %}
<a href="https://aimlapi.com/app/alibaba/qwen3-omni-30b-a3b-captioner" class="button primary">Try in Playground</a>
{% endcolumn %}
{% endcolumns %}

## Model Overview

This model is an open-source model built on **Qwen3-Omni** that automatically generates rich, detailed descriptions of complex audio — including speech, music, ambient sounds, and effects — without prompts. It detects emotions, musical styles, instruments, and sensitive information, making it ideal for audio analysis, security auditing, intent recognition, and editing.

{% hint style="success" %}
[Create AI/ML API Key](https://aimlapi.com/app/keys)
{% endhint %}

<details>

<summary><a href="/broken/pages/SRFAXAuCqLrtsE0WyVnE">How to make the first API call</a></summary>

:digit\_one:  **Required setup (don’t skip this)**\
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
If you need a more detailed walkthrough for setting up your development environment and making a request step by step — feel free to use our [Quickstart guide](../../../quickstart/setting-up.md).
{% endhint %}

</details>

## API Schema

{% openapi-operation spec="qwen3-omni-30b-a3b-captioner" path="/v1/chat/completions" method="post" %}
[OpenAPI qwen3-omni-30b-a3b-captioner](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/text-models-llm/Alibaba-Cloud/qwen3-omni-30b-a3b-captioner.json)
{% endopenapi-operation %}

## Code Example

{% tabs %}
{% tab title="Python" %}
<pre class="language-python" data-overflow="wrap"><code class="lang-python">import requests
import json  # for getting a structured output with indentation 

response = requests.post(
    "https://api.aimlapi.com/v1/chat/completions",
    headers={
        # Insert your AIML API Key instead of &#x3C;YOUR_AIMLAPI_KEY>:
        "Authorization":"Bearer &#x3C;YOUR_AIMLAPI_KEY>",
        "Content-Type":"application/json"
    },
    json={
      "model": "alibaba/qwen3-omni-30b-a3b-captioner",
      "messages": [
        {
          "role": "user",
          "content": [
            {
              "type": "input_audio",
              "input_audio": {
<strong>                "data": "https://cdn.aimlapi.com/eagle/files/elephant/cJUTeeCmpoqIV1Q3WWDAL_vibevoice-output-7b98283fd3974f48ba90e91d2ee1f971.mp3"
</strong>              }
            }
          ]
        }
      ]
    }
)

data = response.json()
print(json.dumps(data, indent=2, ensure_ascii=False))
</code></pre>
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
      model: 'alibaba/qwen3-max-instruct',
      messages:[
        {
          role: 'user',
          content: [
            {
              type: 'input_audio',
              input_audio: {
                data: 'https://cdn.aimlapi.com/eagle/files/elephant/cJUTeeCmpoqIV1Q3WWDAL_vibevoice-output-7b98283fd3974f48ba90e91d2ee1f971.mp3'
              }
            }
          ]
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
  "id": "chatcmpl-bec5dc33-8f63-96b9-89a4-00aecfce7af8",
  "system_fingerprint": null,
  "object": "chat.completion",
  "choices": [
    {
      "index": 0,
      "finish_reason": "stop",
      "logprobs": null,
      "message": {
        "role": "assistant",
        "content": "Hello! How can I help you today?"
      }
    }
  ],
  "created": 1758898624,
  "model": "qwen3-max",
  "usage": {
    "prompt_tokens": 23,
    "completion_tokens": 113,
    "total_tokens": 136
  }
}
```
{% endcode %}

</details>
