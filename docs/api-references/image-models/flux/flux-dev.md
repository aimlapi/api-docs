# flux/dev

{% columns %}
{% column width="66.66666666666666%" %}
{% hint style="info" %}
This documentation is valid for the following list of our models:

* `flux/dev`
{% endhint %}
{% endcolumn %}

{% column width="33.33333333333334%" %}
<a href="https://aimlapi.com/app/?model=flux/dev&#x26;mode=image" class="button primary">Try in Playground</a>
{% endcolumn %}
{% endcolumns %}

## Model Overview

A state-of-the-art image generation model that utilizes a 12 billion parameter rectified flow transformer architecture. It is designed to generate high-quality images from textual descriptions, making it a powerful tool for developers and creatives.

<table data-full-width="true"><thead><tr><th width="215" valign="top">Model</th><th>Generated image properties</th></tr></thead><tbody><tr><td valign="top"><code>flux/dev</code></td><td>Format: <strong>PNG</strong><br>Min size: <strong>512</strong>x<strong>512</strong><br>Max size: <strong>1536</strong>x<strong>1536</strong><br>Default size: <strong>1024</strong>x<strong>768</strong><br><mark style="background-color:yellow;">For both height and width, the value must be a multiple of 32.</mark></td></tr></tbody></table>

## Setup your API Key

If you don’t have an API key for the AI/ML API yet, feel free to use our [Quickstart guide](https://docs.aimlapi.com/quickstart/setting-up).

## API Schema

{% openapi-operation spec="flux-dev" path="/v1/images/generations" method="post" %}
[OpenAPI flux-dev](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/image-models/flux/flux-dev.json)
{% endopenapi-operation %}

## Quick Example

Let's generate an image using a simple prompt.

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
            "model": "flux/dev",
            "prompt": "A T-Rex relaxing on a beach, lying on a sun lounger and wearing sunglasses.",
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
      model: 'flux/dev',
      prompt: 'A T-Rex relaxing on a beach, lying on a sun lounger and wearing sunglasses.',
    }),
  });

  const data = await response.json();
  console.log(data);
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
      "url": "https://cdn.aimlapi.com/eagle/files/monkey/zS_fT2UFKmLqlbEHYCRys.jpeg",
      "width": 1024,
      "height": 768,
      "content_type": "image/jpeg"
    }
  ],
  "timings": {
    "inference": 1.226824438199401
  },
  "seed": 1765470393,
  "has_nsfw_concepts": [
    false
  ],
  "prompt": "A T-Rex relaxing on a beach, lying on a sun lounger and wearing sunglasses."
}
```
{% endcode %}

</details>

We obtained the following 1024x768 image by running this code example:

<figure><img src="../../../.gitbook/assets/t-rex (1) (1).png" alt=""><figcaption><p><code>'A T-Rex relaxing on a beach, lying on a sun lounger and wearing sunglasses.'</code></p></figcaption></figure>
