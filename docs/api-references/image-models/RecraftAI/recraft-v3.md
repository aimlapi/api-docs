# Recraft v3

{% hint style="info" %}
This documentation is valid for the following list of our models:

* `recraft-v3`
{% endhint %}

## Model Overview

A state-of-the-art image generation model specifically designed for professional designers, featuring advanced text generation capabilities, anatomical accuracy, and precise style control. It stands out for its ability to generate images with extended text content and vector art support.

## Setup your API Key

If you don’t have an API key for the AI/ML API yet, feel free to use our [Quickstart guide](https://docs.aimlapi.com/quickstart/setting-up).

## API Schema

{% openapi-operation spec="recraft-v3" path="/v1/images/generations" method="post" %}
[OpenAPI recraft-v3](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/image-models/RecraftAI/recraft-v3.json)
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
            "prompt": "A T-Rex relaxing on a beach, lying on a sun lounger and wearing sunglasses.",
            "model": "recraft-v3"
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

<figure><img src="../../../.gitbook/assets/recraft-v3_xsMTrYgz4vMITXeT1gjl_image.webp" alt=""><figcaption></figcaption></figure>

One of **recraft-v3**’s strengths is its wide range of supported styles. By default, it generates realistic images, but we tried a few others—here’s what we got:

<details>

<summary>Style Experiments</summary>

<figure><img src="../../../.gitbook/assets/z63Ea5DaeAof090gW4uFU_image.webp" alt=""><figcaption><p><code>"style": "digital_illustration/infantile_sketch"</code></p></figcaption></figure>

<figure><img src="../../../.gitbook/assets/image (10).png" alt=""><figcaption><p><code>"style": "vector_illustration"</code></p></figcaption></figure>

{% hint style="success" %}
When the `'vector_illustration'` style is selected, the model generates an SVG vector format! For preview purposes, we took a screenshot  ☝️️
{% endhint %}

<figure><img src="../../../.gitbook/assets/BzyizbtjMMLFKWjXDRL40_image.webp" alt=""><figcaption><p><code>"style": "digital_illustration/2d_art_poster"</code></p></figcaption></figure>

<figure><img src="../../../.gitbook/assets/A1DxLWD88bory91zT9BKW_image.webp" alt=""><figcaption><p><code>"style": "digital_illustration/handmade_3d"</code></p></figcaption></figure>

</details>
