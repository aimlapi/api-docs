# flux/kontext-pro/text-to-image

{% columns %}
{% column width="66.66666666666666%" %}
{% hint style="info" %}
This documentation is valid for the following list of our models:

* `flux/kontext-pro/text-to-image`
{% endhint %}
{% endcolumn %}

{% column width="33.33333333333334%" %}
<a href="https://aimlapi.com/app/?model=flux/kontext-pro/text-to-image&#x26;mode=image" class="button primary">Try in Playground</a>
{% endcolumn %}
{% endcolumns %}

## Model Overview

A new Flux model optimized for faster generation speed.

<table data-full-width="true"><thead><tr><th width="277.46661376953125">Model</th><th width="593">Properties of Generated Images</th></tr></thead><tbody><tr><td><code>flux/kontext-pro/text-to-image</code></td><td>Format: <strong>JPEG, PNG</strong><br>Image size can't be set directly — only a preset aspect ratio can be chosen.<br>Default aspect ratio and size: <strong>1:1</strong>, <strong>1024</strong>x<strong>1024</strong></td></tr></tbody></table>

## Setup your API Key

If you don’t have an API key for the AI/ML API yet, feel free to use our [Quickstart guide](https://docs.aimlapi.com/quickstart/setting-up).

## API Schema

{% openapi-operation spec="flux-kontext-pro-try-3" path="/v1/images/generations" method="post" %}
[OpenAPI flux-kontext-pro-try-3](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/image-models/flux/flux-kontext-pro.json)
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
            "prompt": "A T-Rex relaxing on a beach, lying on a sun lounger and wearing sunglasses.",
            "model": "flux/kontext-pro/text-to-image",
            "aspect_ratio": "21:9"   
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
      model: 'flux/kontext-pro/text-to-image',
      prompt: 'A T-Rex relaxing on a beach, lying on a sun lounger and wearing sunglasses.',
      aspect_ratio: '21:9',
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
      "url": "https://cdn.aimlapi.com/squirrel/files/koala/6e4yw7_YnA8tEe03QW8wW_5298e11de5a24f1f9cf4f277cbdd3316.jpg",
      "width": 1568,
      "height": 672,
      "content_type": "image/jpeg"
    }
  ],
  "timings": {},
  "seed": 2561481494,
  "has_nsfw_concepts": [
    false
  ],
  "prompt": "A T-Rex relaxing on a beach, lying on a sun lounger and wearing sunglasses."
}
```
{% endcode %}

</details>

We obtained the following 1568x672 image by running this code example:

<figure><img src="../../../.gitbook/assets/EgskSnirzZYljpVeLSTNR_917caa60fb8f450cbd9576756171cd68.jpg" alt=""><figcaption><p><code>'A T-Rex relaxing on a beach, lying on a sun lounger and wearing sunglasses.'</code></p></figcaption></figure>
