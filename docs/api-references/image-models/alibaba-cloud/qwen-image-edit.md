# qwen-image-edit

{% hint style="info" %}
This documentation is valid for the following list of our models:

* `alibaba/qwen-image-edit`
{% endhint %}

## Model Overview

The image editing variant of our 20B Qwen-Image model. It expands the model’s distinctive text rendering abilities to editing tasks, making accurate text modifications within images possible.

## Setup your API Key

If you don’t have an API key for the AI/ML API yet, feel free to use our [Quickstart guide](https://docs.aimlapi.com/quickstart/setting-up).

## API Schema

{% openapi-operation spec="qwen-image-edit" path="/v1/images/generations" method="post" %}
[OpenAPI qwen-image-edit](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/image-models/Alibaba-Cloud/qwen-image-edit.json)
{% endopenapi-operation %}

## Quick Example

Let's generate an image of the specified size using a simple prompt.

{% tabs %}
{% tab title="Python" %}
{% code overflow="wrap" %}
```python
import requests
import json

def main():
    response = requests.post(
        "https://api.aimlapi.com/v1/images/generations",
        headers={
            # Insert your AIML API Key instead of <YOUR_AIMLAPI_KEY>:
            "Authorization": "Bearer <YOUR_AIMLAPI_KEY>",
            "Content-Type": "application/json",
        },
        json={
            "model": "alibaba/qwen-image-edit",
            "prompt": "Make the dinosaur sit on a lounge chair with its back to the camera, looking toward the water. The setting sun has almost disappeared below the horizon.",
            "image": "https://raw.githubusercontent.com/aimlapi/api-docs/main/reference-files/t-rex.png"
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

const response = await fetch('https://api.aimlapi.com/v1/images/generations', {
  method: 'POST',
  headers: {
    // Insert your AIML API Key instead of <YOUR_AIMLAPI_KEY>:
    'Authorization': 'Bearer <YOUR_AIMLAPI_KEY>',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    model: 'alibaba/qwen-image-edit',
    prompt: 'Make the dinosaur sit on a lounge chair with its back to the camera, looking toward the water. The setting sun has almost disappeared below the horizon.',
    image: 'https://raw.githubusercontent.com/aimlapi/api-docs/main/reference-files/t-rex.png',        
  }),
});

const data = await response.json();
console.log(JSON.stringify(data, null, 2));
```
{% endcode %}
{% endtab %}
{% endtabs %}

<details>

<summary>Response</summary>

{% code overflow="wrap" %}
```json5
{
  "created": 1756832341,
  "data": [
    {
      "url": "https://dashscope-result-sgp.oss-ap-southeast-1.aliyuncs.com/7d/06/20250903/1955eee6/ac748d89-d6b1-4d4e-bc65-eea543098bb9-1.png?Expires=1757438140&OSSAccessKeyId=LTAI5tRcsWJEymQaTsKbKqGf&Signature=aDhUphXV84V1nPMmdRl49ShSKxY%3D"
    }
  ]
}
```
{% endcode %}

</details>

We obtained the following 1184x896 image by running this code example:

<figure><img src="../../../.gitbook/assets/ac748d89-d6b1-4d4e-bc65-eea543098bb9-1.png" alt=""><figcaption><p><code>'Make the dinosaur sit on a lounge chair with its back to the camera, looking toward the water.</code> <br><code>The setting sun has almost disappeared below the horizon.'</code></p></figcaption></figure>
