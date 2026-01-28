# Nano Banana Pro Edit (Gemini 3 Pro Image Edit)

{% columns %}
{% column width="66.66666666666666%" %}
{% hint style="info" %}
This documentation is valid for the following list of our models:

* `google/nano-banana-pro-edit`
* `google/gemini-3-pro-image-preview-edit`
{% endhint %}

{% hint style="success" %}
Both IDs listed above refer to the same model; we support them for backward compatibility.
{% endhint %}
{% endcolumn %}

{% column width="33.33333333333334%" %}
<a href="https://aimlapi.com/app/google/nano-banana-pro-edit" class="button primary">Try in Playground</a>
{% endcolumn %}
{% endcolumns %}

## Model Overview

Google’s smartest image-to-image model as of the November 2025 preview release. The model takes multiple images as input, with the prompt defining how they are used or combined.

## Setup your API Key

If you don’t have an API key for the AI/ML API yet, feel free to use our [Quickstart guide](https://docs.aimlapi.com/quickstart/setting-up).

## API Schema

{% openapi-operation spec="gemini-3-pro-image-preview-edit" path="/v1/images/generations" method="post" %}
[OpenAPI gemini-3-pro-image-preview-edit](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/image-models/Google/gemini-3-pro-image-preview-edit.json)
{% endopenapi-operation %}

## Quick Example

Let's generate an image of the specified size using two input images and a prompt that defines how they should be edited.

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
            "model": "google/nano-banana-pro-edit",
            "image_urls": [
                "https://raw.githubusercontent.com/aimlapi/api-docs/main/reference-files/t-rex.png",
                "https://raw.githubusercontent.com/aimlapi/api-docs/main/reference-files/blue-mug.jpg"
            ],
            "prompt": "Combine the images so the T-Rex is wearing a business suit, sitting in a cozy small café, drinking from the mug. Blur the background slightly to create a bokeh effect.",
            "aspect_ratio": "16:9",
            "resolution": "1K"
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
        model: 'google/nano-banana-pro-edit',
        image_urls: [
                'https://raw.githubusercontent.com/aimlapi/api-docs/main/reference-files/t-rex.png',
                'https://raw.githubusercontent.com/aimlapi/api-docs/main/reference-files/blue-mug.jpg'
        ],
        prompt: 'Combine the images so the T-Rex is wearing a business suit, sitting in a cozy small café, drinking from the mug. Blur the background slightly to create a bokeh effect.',
        aspect_ratio: '1:1',
        resolution: '1K'
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
  "description": "",
  "data": [
    {
      "url": "https://cdn.aimlapi.com/flamingo/files/b/koala/qnutcal6jcrPr43jMp_Xg.png",
      "content_type": "image/png",
      "width": null,
      "height": null,
      "file_name": "qnutcal6jcrPr43jMp_Xg.png"
    }
  ],
  "meta": {
    "usage": {
      "tokens_used": 315000
    }
  }
}
```
{% endcode %}

</details>

<table data-full-width="true"><thead><tr><th width="389.7999267578125" valign="top">Reference Images</th><th valign="top">Generated Image</th></tr></thead><tbody><tr><td valign="top"><div><figure><img src="../../../.gitbook/assets/t-rex (1) (1).png" alt=""><figcaption><p>Image #1</p></figcaption></figure></div></td><td valign="top"><div><figure><img src="../../../.gitbook/assets/gemini-3-pro-image-preview-edit.png" alt=""><figcaption><p><kbd><code>"Combine the images so the T-Rex is wearing a business suit, sitting in a cozy small café, drinking from the mug. Blur the background slightly to create a bokeh effect."</code></kbd></p></figcaption></figure></div></td></tr><tr><td valign="top"><div><figure><img src="../../../.gitbook/assets/blue-mug (1).jpg" alt=""><figcaption><p>Image #2</p></figcaption></figure></div></td><td valign="top"></td></tr></tbody></table>

Here’s an example of the output using alternative `resolution` and `aspect_ratio` parameters:

<figure><img src="../../../.gitbook/assets/nano-banana-pro-edit_output2.png" alt=""><figcaption><p><code>"aspect_ratio": "16:9"</code>,  <code>"resolution": "2K"</code></p></figcaption></figure>
