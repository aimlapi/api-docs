# qwen3-omni-30b-a3b-captioner



<table data-header-hidden data-full-width="true"><thead><tr><th width="546.4443969726562" valign="top"></th><th width="202.666748046875" valign="top"></th></tr></thead><tbody><tr><td valign="top"><div data-gb-custom-block data-tag="hint" data-style="info" class="hint hint-info"><p>This documentation is valid for the following model: </p><p><code>alibaba/qwen3-omni-30b-a3b-captioner</code></p></div></td><td valign="top"><a href="https://aimlapi.com/app/?model=alibaba/qwen3-omni-30b-a3b-captioner&#x26;mode=chat" class="button primary">Try in Playground</a></td></tr></tbody></table>

## Model Overview

This model is an open-source model built on **Qwen3-Omni** that automatically generates rich, detailed descriptions of complex audio — including speech, music, ambient sounds, and effects — without prompts. It detects emotions, musical styles, instruments, and sensitive information, making it ideal for audio analysis, security auditing, intent recognition, and editing.

## How to Make a Call

<details>

<summary>Step-by-Step Instructions</summary>

### :digit\_one:  Setup You Can’t Skip

:black\_small\_square:  [**Create an Account**](https://aimlapi.com/app/sign-up): Visit the AI/ML API website and create an account (if you don’t have one yet).\
:black\_small\_square:  [**Generate an API Key**](https://aimlapi.com/app/keys): After logging in, navigate to your account dashboard and generate your API key. Ensure that key is enabled on UI.

### &#x20;:digit\_two:  Copy the code example

At the bottom of this page, you'll find [a code example](qwen3-omni-30b-a3b-captioner.md#code-example) that shows how to structure the request. Choose the code snippet in your preferred programming language and copy it into your development environment.

### :digit\_three:  Modify the code example

:black\_small\_square:  Replace `<YOUR_AIMLAPI_KEY>` with your actual AI/ML API key from your account.\
:black\_small\_square:  Insert your question or request into the `content` field—this is what the model will respond to.

### :digit\_four:  <sup><sub><mark style="background-color:yellow;">(Optional)<mark style="background-color:yellow;"><sub></sup> Adjust other optional parameters if needed

Only `model` and `messages` are required parameters for this model (and we’ve already filled them in for you in the example), but you can include optional parameters if needed to adjust the model’s behavior. Below, you can find the corresponding [API schema](qwen3-omni-30b-a3b-captioner.md#api-schema), which lists all available parameters along with notes on how to use them.

### :digit\_five:  Run your modified code

Run your modified code in your development environment. Response time depends on various factors, but for simple prompts it rarely exceeds a few seconds.

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
