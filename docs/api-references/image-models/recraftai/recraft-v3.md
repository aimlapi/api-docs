# Recraft v3

{% columns %}
{% column width="66.66666666666666%" %}
{% hint style="info" %}
This documentation is valid for the following list of our models:

* `recraft-v3`
{% endhint %}
{% endcolumn %}

{% column width="33.33333333333334%" %}
<a href="https://aimlapi.com/app/recraft-v3" class="button primary">Try in Playground</a>
{% endcolumn %}
{% endcolumns %}

## Model Overview

A state-of-the-art image generation model specifically designed for professional designers, featuring advanced text generation capabilities, anatomical accuracy, and precise style control. It stands out for its ability to generate images with extended text content and vector art support.

## Setup your API Key

If you don’t have an API key for the AI/ML API yet, feel free to use our [Quickstart guide](https://docs.aimlapi.com/quickstart/setting-up).

## API Schema

{% openapi-operation spec="recraft-v3" path="/v1/images/generations" method="post" %}
[OpenAPI recraft-v3](https://4401d86825a13bf607936cc3a9f3897a.r2.cloudflarestorage.com/gitbook-x-prod-openapi/raw/9b046e7a933a95d42552a103d5e4eec3ca68d3d987904a65410fcd801ad0b25e.json?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=dce48141f43c0191a2ad043a6888781c%2F20260915%2Fauto%2Fs3%2Faws4_request&X-Amz-Date=20260915T135023Z&X-Amz-Expires=172800&X-Amz-Signature=952a6ea68326922df2f4589fa108078632afc9827f304992d7e8eb7f6bc906bd&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)
{% endopenapi-operation %}

## Quick Example

Let's generate an image using a simple prompt.

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
            "model": "recraft-v3",
            "prompt": "A T-Rex relaxing on a beach, lying on a sun lounger and wearing sunglasses."
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
      model: 'recraft-v3',
      prompt: 'A T-Rex relaxing on a beach, lying on a sun lounger and wearing sunglasses. Realistic photo.',
      
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
  images: [
    {
      url: 'https://cdn.aimlapi.com/eagle/files/koala/Z1MUK5lqaL70uC5Mn6Rlj_image.webp',
      content_type: 'image/webp',
      file_name: 'image.webp',
      file_size: 347808
    }
  ]
}
```
{% endcode %}

</details>

We obtained the following 2048x1024 image by running this code example:

<figure><img src="https://3927338786-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FROMd1X5PuqtikJ48n2N9%2Fuploads%2Fgit-blob-5264f507ee8e30994dc97f9f05e76846d7e9eb0e%2Frecraft-v3_xsMTrYgz4vMITXeT1gjl_image.webp?alt=media" alt=""><figcaption></figcaption></figure>

One of **recraft-v3**’s strengths is its wide range of supported styles. By default, it generates realistic images, but we tried a few others—here’s what we got:

<details>

<summary>Style Experiments</summary>

<figure><img src="https://3927338786-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FROMd1X5PuqtikJ48n2N9%2Fuploads%2Fgit-blob-24bb922b204241edb369aeea8fdcee54e54f3d86%2Fz63Ea5DaeAof090gW4uFU_image.webp?alt=media" alt=""><figcaption><p><code>"style": "digital_illustration/infantile_sketch"</code></p></figcaption></figure>

<figure><img src="https://3927338786-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FROMd1X5PuqtikJ48n2N9%2Fuploads%2Fgit-blob-7d30272cc68a48d378e1cde07077c837d8aec809%2Fimage.png?alt=media" alt=""><figcaption><p><code>"style": "vector_illustration"</code></p></figcaption></figure>

{% hint style="success" %}
When the `'vector_illustration'` style is selected, the model generates an SVG vector format! For preview purposes, we took a screenshot ☝️️
{% endhint %}

<figure><img src="https://3927338786-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FROMd1X5PuqtikJ48n2N9%2Fuploads%2Fgit-blob-cd53629c9e51240e0505f51c8bef45922720aae3%2FBzyizbtjMMLFKWjXDRL40_image.webp?alt=media" alt=""><figcaption><p><code>"style": "digital_illustration/2d_art_poster"</code></p></figcaption></figure>

<figure><img src="https://3927338786-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FROMd1X5PuqtikJ48n2N9%2Fuploads%2Fgit-blob-28d6b4566298e80feeae80d146f1126ad2d11284%2FA1DxLWD88bory91zT9BKW_image.webp?alt=media" alt=""><figcaption><p><code>"style": "digital_illustration/handmade_3d"</code></p></figcaption></figure>

</details>
