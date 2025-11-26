# flux-pro/v1.1-ultra

{% columns %}
{% column width="66.66666666666666%" %}
{% hint style="info" %}
This documentation is valid for the following list of our models:

* `flux-pro/v1.1-ultra`
{% endhint %}
{% endcolumn %}

{% column width="33.33333333333334%" %}
<a href="https://aimlapi.com/app/?model=flux-pro/v1.1-ultra&#x26;mode=image" class="button primary">Try in Playground</a>
{% endcolumn %}
{% endcolumns %}

## Model Overview

An advanced AI image generator designed to create high-resolution images rapidly and efficiently. It is optimized for various applications, including content creation, e-commerce, and advertising, providing users with the ability to generate visually appealing images at unprecedented speeds.

<table data-full-width="true"><thead><tr><th width="250" valign="top">Model</th><th>Generated image properties</th></tr></thead><tbody><tr><td valign="top"><code>flux-pro/v1.1-ultra</code></td><td>Format: <strong>JPEG, PNG</strong><br>Fixed size: <strong>2752</strong>x<strong>1536</strong></td></tr></tbody></table>

## Setup your API Key

If you don’t have an API key for the AI/ML API yet, feel free to use our [Quickstart guide](https://docs.aimlapi.com/quickstart/setting-up).

## API Schema

{% openapi-operation spec="flux-pro-v1-1-ultra" path="/v1/images/generations" method="post" %}
[OpenAPI flux-pro-v1-1-ultra](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/image-models/flux/flux-pro-v1.1-ultra.json)
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
            "prompt": "A T-Rex relaxing on a beach, lying on a sun lounger and wearing sunglasses.",
            "model": "flux-pro/v1.1-ultra",
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
      model: 'flux-pro/v1.1-ultra',
      prompt: 'A T-Rex relaxing on a beach, lying on a sun lounger and wearing sunglasses.',
    }),
  });

  const data = await response.json();
  console.log(data);
}

main()
```
{% endcode %}
{% endtab %}
{% endtabs %}

<details>

<summary>Response</summary>

{% code overflow="wrap" %}
```json5
{
  images: [
    {
      url: 'https://cdn.aimlapi.com/squirrel/files/koala/xt87Jiwy69wpF4jGEFKbZ_806ed881d147466d81af027c6779cbc5.jpg',
      width: 2752,
      height: 1536,
      content_type: 'image/jpeg'
    }
  ],
  timings: {},
  seed: 526588311,
  has_nsfw_concepts: [ false ],
  prompt: 'A T-Rex relaxing on a beach, lying on a sun lounger and wearing sunglasses.'
}
```
{% endcode %}

</details>

We obtained the following 2752x1536 image by running this code example:

<figure><img src="../../../.gitbook/assets/Xw0w4dVpJk88_d8CBZQas_c2d37af49746421fa848a95df405288a (1).jpg" alt=""><figcaption><p><code>'A T-Rex relaxing on a beach, lying on a sun lounger and wearing sunglasses.'</code></p></figcaption></figure>
