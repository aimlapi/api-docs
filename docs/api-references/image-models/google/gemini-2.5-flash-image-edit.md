# Gemini 2.5 Flash Image Edit

{% columns %}
{% column width="75%" %}
{% hint style="info" %}
This documentation is valid for the following list of our models:

* `google/gemini-2.5-flash-image-edit`
{% endhint %}
{% endcolumn %}

{% column width="25%" %}

{% endcolumn %}
{% endcolumns %}

## Model Overview

The model takes multiple images as input, with the prompt defining how they are used or combined.

## Setup your API Key

If you don’t have an API key for the AI/ML API yet, feel free to use our [Quickstart guide](https://docs.aimlapi.com/quickstart/setting-up).

## API Schema

<details>

<summary>Aspect ratio/Resolution Table</summary>

| Aspect ratio | Resolution | Tokens |
| ------------ | ---------- | ------ |
| 1:1          | 1024×1024  | 1290   |
| 2:3          | 832×1248   | 1290   |
| 3:2          | 1248×832   | 1290   |
| 3:4          | 864×1184   | 1290   |
| 4:3          | 1184×864   | 1290   |
| 4:5          | 896×1152   | 1290   |
| 5:4          | 1152×896   | 1290   |
| 9:16         | 768×1344   | 1290   |
| 16:9         | 1344×768   | 1290   |
| 21:9         | 1536×672   | 1290   |

</details>

{% openapi-operation spec="gemini-2-5-flash-image-edit" path="/v1/images/generations" method="post" %}
[OpenAPI gemini-2-5-flash-image-edit](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/image-models/Google/gemini-2.5-flash-image-edit.json)
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
            "model": "google/gemini-2.5-flash-image-edit",
            "image_urls": [
                "https://raw.githubusercontent.com/aimlapi/api-docs/main/reference-files/t-rex.png",
                "https://raw.githubusercontent.com/aimlapi/api-docs/main/reference-files/blue-mug.jpg"
            ],
            "prompt": "Combine the images so the T-Rex is wearing a business suit, sitting in a cozy small café, drinking from the mug. Blur the background slightly to create a bokeh effect.",
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
        model: 'google/gemini-2.5-flash-image-edit',
        image_urls: [
                'https://raw.githubusercontent.com/aimlapi/api-docs/main/reference-files/t-rex.png',
                'https://raw.githubusercontent.com/aimlapi/api-docs/main/reference-files/blue-mug.jpg'
        ],
        prompt: 'Combine the images so the T-Rex is wearing a business suit, sitting in a cozy small café, drinking from the mug. Blur the background slightly to create a bokeh effect.',
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
  "images": [
    {
      "url": "https://cdn.aimlapi.com/eagle/files/panda/9g3PokYLjWoygTVrRgfvG_output.png",
      "content_type": "image/png",
      "file_name": "output.png",
      "file_size": 2273159,
      "width": null,
      "height": null
    }
  ],
  "description": "Here is your T-Rex in a business suit, enjoying a drink in a cozy cafe! "
}
```
{% endcode %}

</details>

<table data-full-width="false"><thead><tr><th width="339.6666259765625" valign="top">Reference Images</th><th valign="top">Generated Image</th></tr></thead><tbody><tr><td valign="top"><div><figure><img src="../../../.gitbook/assets/flux-dev-t-rex.png" alt=""><figcaption><p>Image #1</p></figcaption></figure></div></td><td valign="top"><div><figure><img src="../../../.gitbook/assets/gemini_2.5_flash_image_edit_output.png" alt=""><figcaption><p><kbd><code>"Combine the images so the T-Rex is wearing a business suit, sitting in a cozy small café, drinking from the mug. Blur the background slightly to create a bokeh effect."</code></kbd></p></figcaption></figure></div></td></tr><tr><td valign="top"><div><figure><img src="../../../.gitbook/assets/blue-mug (1).jpg" alt=""><figcaption><p>Image #2</p></figcaption></figure></div></td><td valign="top"></td></tr></tbody></table>
