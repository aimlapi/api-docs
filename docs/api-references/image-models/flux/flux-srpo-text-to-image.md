# flux/srpo/text-to-image

{% columns %}
{% column width="66.66666666666666%" %}
{% hint style="info" %}
This documentation is valid for the following list of our models:

* `flux/srpo`
{% endhint %}
{% endcolumn %}

{% column width="33.33333333333334%" %}
<a href="https://aimlapi.com/app/?model=flux/srpo&#x26;mode=image" class="button primary">Try in Playground</a>
{% endcolumn %}
{% endcolumns %}

## Model Overview

[flux/dev](flux-dev.md) model upgraded with Tencent’s SRPO technique.

<table data-full-width="true"><thead><tr><th width="201.13336181640625" valign="top">Model</th><th>Generated image properties</th></tr></thead><tbody><tr><td valign="top"><code>flux/srpo</code></td><td>Format: <strong>PNG</strong><br>Min size: <strong>512</strong>x<strong>512</strong><br>Max size: <strong>1536</strong>x<strong>1536</strong><br>Default size: <strong>1024</strong>x<strong>768</strong><br><mark style="background-color:yellow;">For both height and width, the value must be a multiple of 32.</mark></td></tr></tbody></table>

## Setup your API Key

If you don’t have an API key for the AI/ML API yet, feel free to use our [Quickstart guide](https://docs.aimlapi.com/quickstart/setting-up).

## API Schema

{% openapi-operation spec="flux-srpo" path="/v1/images/generations" method="post" %}
[OpenAPI flux-srpo](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/image-models/flux/flux-srpo.json)
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
            "model": "flux/srpo",
            "prompt": "A T-Rex relaxing on a beach, lying on a sun lounger and wearing sunglasses.",
            "image_size": {
                "width": 1440,
                "height": 512
            }  
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
      model: 'flux/srpo',
      prompt: 'A T-Rex relaxing on a beach, lying on a sun lounger and wearing sunglasses.',
      image_size: {
                width: 1440,
                height: 512
            }
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
      "url": "https://cdn.aimlapi.com/eagle/files/zebra/GtH4bTLhiXD7YTwYAlO21.jpeg",
      "width": 1440,
      "height": 512,
      "content_type": "image/jpeg"
    }
  ],
  "timings": {
    "inference": 0.747110141441226
  },
  "seed": 490733907,
  "has_nsfw_concepts": [
    false
  ],
  "prompt": "A T-Rex relaxing on a beach, lying on a sun lounger and wearing sunglasses.",
  "data": [
    {
      "url": "https://cdn.aimlapi.com/eagle/files/zebra/GtH4bTLhiXD7YTwYAlO21.jpeg",
      "width": 1440,
      "height": 512,
      "content_type": "image/jpeg"
    }
  ],
  "meta": {
    "usage": {
      "tokens_used": 52500
    }
  }
}
```
{% endcode %}

</details>

We obtained the following 1440x512 image by running this code example:

<figure><img src="../../../.gitbook/assets/GtH4bTLhiXD7YTwYAlO21.jpeg" alt=""><figcaption><p><code>'A T-Rex relaxing on a beach, lying on a sun lounger and wearing sunglasses.'</code></p></figcaption></figure>
