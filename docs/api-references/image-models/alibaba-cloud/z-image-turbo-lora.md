# z-image-turbo-lora

{% columns %}
{% column width="66.66666666666666%" %}
{% hint style="info" %}
This documentation is valid for the following list of our models:

* `alibaba/z-image-turbo-lora`
{% endhint %}
{% endcolumn %}

{% column width="33.33333333333334%" %}
<a href="https://aimlapi.com/app/alibaba/z-image-turbo-lora" class="button primary">Try in Playground</a>
{% endcolumn %}
{% endcolumns %}

## Model Overview

An ultra-fast 6B-parameter text-to-image model with LoRA[^1] support.

## Setup your API Key

If you don’t have an API key for the AI/ML API yet, feel free to use our [Quickstart guide](https://docs.aimlapi.com/quickstart/setting-up).

## API Schema

{% openapi-operation spec="z-image-turbo-lora" path="/v1/images/generations" method="post" %}
[OpenAPI z-image-turbo-lora](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/image-models/Alibaba-Cloud/z-image-turbo-lora.json)
{% endopenapi-operation %}

## Quick Example

Let's generate an image of the specified size using a simple prompt.

{% tabs %}
{% tab title="Python" %}
{% code overflow="wrap" %}
```python
import requests
import json  # for getting a structured output with indentation

def main():
    response = requests.post(
        "https://api.aimlapi.com/v1/images/generations",
        headers={
            # Insert your AIML API Key instead of <YOUR_AIMLAPI_KEY>:
            "Authorization": "Bearer <YOUR_AIMLAPI_KEY>",
            "Content-Type": "application/json",
        },
        json={
            "model": "alibaba/z-image-turbo-lora",
            "prompt": "A T-Rex relaxing on a beach, lying on a sun lounger and wearing sunglasses.",
            "image_size": {
                "width": 1440,
                "height": 512
            },
        }
    )

    data = response.json()
    print(json.dumps(data, indent=2, ensure_ascii=False))

if __name__ == "__main__":
    main()
```
{% endcode %}
{% endtab %}

{% tab title="JS" %}
{% code overflow="wrap" %}
```javascript
async function main() {
  const response = await fetch('https://api.aimlapi.com/v1/images/generations', {
    method: 'POST',
    headers: {
      // Insert your AIML API Key instead of <YOUR_AIMLAPI_KEY>:
      'Authorization': 'Bearer <YOUR_AIMLAPI_KEY>',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'alibaba/z-image-turbo-lora',
      prompt: 'A T-Rex relaxing on a beach, lying on a sun lounger and wearing sunglasses.',
      image_size: {
        width: 1440,
        height: 512
      },
    }),
  });

  const data = await response.json();
  console.log('Generation:', data);
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
  "data": [
    {
      "url": "https://cdn.aimlapi.com/flamingo/files/b/0a84de54/-IaUBYEQiYqRaeT7oZvus.png"
    }
  ],
  "meta": {
    "usage": {
      "tokens_used": 17850
    }
  }
}
```
{% endcode %}

</details>

We obtained the following 1440x512 image by running this code example:

<figure><img src="../../../.gitbook/assets/-IaUBYEQiYqRaeT7oZvus.png" alt=""><figcaption></figcaption></figure>

[^1]: The **LoRA algorithm** (Low-Rank Adaptation) is a parameter-efficient fine-tuning technique used to adapt large language models (LLMs) and stable diffusion models to new tasks or domains without retraining the entire model. This process is faster and requires significantly less memory and computational resources than full fine-tuning.
