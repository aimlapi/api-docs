# Sharpen

{% columns %}
{% column width="75%" %}
{% hint style="info" %}
This documentation is valid for the following list of our models:

* `topaz-labs/sharpen`
{% endhint %}
{% endcolumn %}

{% column width="25%" %}

{% endcolumn %}
{% endcolumns %}

## Model Overview

The model produces sharper visuals, eliminating blur and improving clarity across the subject or the entire frame.

## Setup your API Key

If you don’t have an API key for the AI/ML API yet, feel free to use our [Quickstart guide](https://docs.aimlapi.com/quickstart/setting-up).

## API Schema

{% openapi-operation spec="sharpen" path="/v1/images/generations" method="post" %}
[OpenAPI sharpen](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/image-models/topaz-labs/sharpen.json)
{% endopenapi-operation %}

## Quick Example

Let's sharpen a relatively strongly blurred image using the `Strong` mode while adjusting the `strength` parameter.

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
          "mode": "Strong",
          "strength": 0.9,
          "minor_denoise": 0.9,
          "output_format": "png",
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
        mode: 'Strong',
        strength: 0.9,
        minor_denoise: 0.9,
        output_format: 'png',
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
      "url": "https://cdn.aimlapi.com/komodo/output/6435616/ddb723c4-ed16-42f4-8818-9ca4de176ea7.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Checksum-Mode=ENABLED&X-Amz-Credential=ccc352dcd71a436e5fd697125a1be9f8%2F20251027%2Fauto%2Fs3%2Faws4_request&X-Amz-Date=20251027T162246Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&x-id=GetObject&X-Amz-Signature=4f4c449772b258bcf53e7257444698e2e486832e77ab5835728afc4aabfa0f8c"
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

<table data-full-width="true"><thead><tr><th width="612.7329711914062" valign="top">Blurred Image</th><th valign="top">Deblurred Image</th></tr></thead><tbody><tr><td valign="top"><div><figure><img src="../../../.gitbook/assets/blurred-landscape.png" alt=""><figcaption></figcaption></figure></div></td><td valign="top"><div><figure><img src="../../../.gitbook/assets/sharpen_strength_0.9.png" alt=""><figcaption><p>"mode": "Strong"<br>"strength": 0.9</p></figcaption></figure></div></td></tr></tbody></table>

For clarity, we’ve created a split image showing the results of different parameter settings.

<figure><img src="../../../.gitbook/assets/triple-with-statements.png" alt=""><figcaption></figcaption></figure>



