# Sharpen Generative

{% columns %}
{% column width="75%" %}
{% hint style="info" %}
This documentation is valid for the following list of our models:

* `topaz-labs/sharpen-gen`
{% endhint %}
{% endcolumn %}

{% column width="25%" %}

{% endcolumn %}
{% endcolumns %}

## Model Overview

A next-level sharpening model powered by generative AI, capable of recovering missing details during the refocusing/resharpening process.

## Setup your API Key

If you don’t have an API key for the AI/ML API yet, feel free to use our [Quickstart guide](https://docs.aimlapi.com/quickstart/setting-up).

## API Schema

{% openapi-operation spec="sharpen-gen" path="/v1/images/generations" method="post" %}
[OpenAPI sharpen-gen](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/image-models/topaz-labs/sharpen-gen.json)
{% endopenapi-operation %}

## Quick Example

Let's sharpen a relatively strongly blurred image using the _Strong_ mode while adjusting the _strength_ parameter.

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
          "model": "topaz-labs/sharpen",
          "image_url": "https://raw.githubusercontent.com/aimlapi/api-docs/main/reference-files/blurred-landscape.png",
          "mode": "Super Focus V2",
          "strength": 0.6,
          "output_format": "jpeg",
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
        model: 'topaz-labs/sharpen',
        image_url: 'https://raw.githubusercontent.com/aimlapi/api-docs/main/reference-files/blurred-landscape.png',
        mode: 'Super Focus V2',
        strength: 0.6,
        output_format: 'jpeg',
      }),
    });
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
      "url": "https://cdn.aimlapi.com/komodo/output/6435616/5cff080e-5d24-4fc3-85f5-0e57621ead7d.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Checksum-Mode=ENABLED&X-Amz-Credential=ccc352dcd71a436e5fd697125a1be9f8%2F20251027%2Fauto%2Fs3%2Faws4_request&X-Amz-Date=20251027T202819Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&x-id=GetObject&X-Amz-Signature=d6d1d9c641c33bde33b14090d579d490d30f75e82283764705acd28b18765a70"
    }
  ],
  "meta": {
    "usage": {
      "tokens_used": 210000
    }
  }
}
```
{% endcode %}

</details>

<table data-full-width="true"><thead><tr><th valign="top">Blurred Image</th><th valign="top">Deblurred Image</th><th></th></tr></thead><tbody><tr><td valign="top"><div><figure><img src="../../../../reference-files/blurred-face (1).jpeg" alt=""><figcaption></figcaption></figure></div></td><td valign="top"><div><figure><img src="../../../.gitbook/assets/5cff080e-5d24-4fc3-85f5-0e57621ead7d.jpeg" alt=""><figcaption><p>"mode": "Super Focus V2"<br>"strength": 0.6</p></figcaption></figure></div></td><td></td></tr></tbody></table>
