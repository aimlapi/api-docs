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

## POST /v1/images/generations

>

```json
{"openapi":"3.0.0","info":{"title":"AIML API","version":"1.0.0"},"servers":[{"url":"https://api.aimlapi.com"}],"paths":{"/v1/images/generations":{"post":{"operationId":"_v1_images_generations","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","properties":{"model":{"type":"string","enum":["recraft-v3"]},"prompt":{"type":"string","maxLength":1000,"description":"The text prompt describing the content, style, or composition of the image to be generated."},"image_size":{"anyOf":[{"type":"object","properties":{"width":{"type":"integer","minimum":64,"maximum":1536,"default":1024},"height":{"type":"integer","minimum":64,"maximum":1536,"default":768}},"description":"For both height and width, the value must be a multiple of 32."},{"type":"string","enum":["square_hd","square","portrait_4_3","portrait_16_9","landscape_4_3","landscape_16_9"],"description":"The size of the generated image."}],"default":"square_hd"},"style":{"type":"string","enum":["any","realistic_image","digital_illustration","vector_illustration","realistic_image/b_and_w","realistic_image/hard_flash","realistic_image/hdr","realistic_image/natural_light","realistic_image/studio_portrait","realistic_image/enterprise","realistic_image/motion_blur","digital_illustration/pixel_art","digital_illustration/hand_drawn","digital_illustration/grain","digital_illustration/infantile_sketch","digital_illustration/2d_art_poster","digital_illustration/handmade_3d","digital_illustration/hand_drawn_outline","digital_illustration/engraving_color","digital_illustration/2d_art_poster_2","vector_illustration/engraving","vector_illustration/line_art","vector_illustration/line_circuit","vector_illustration/linocut"],"default":"realistic_image","description":"The style of the generated images."},"colors":{"type":"array","items":{"type":"object","properties":{"r":{"type":"integer","minimum":0,"maximum":255},"g":{"type":"integer","minimum":0,"maximum":255},"b":{"type":"integer","minimum":0,"maximum":255}},"required":["r","g","b"]},"default":[],"description":"An array of preferred colors."},"num_images":{"type":"number","enum":[1],"default":1,"description":"The number of images to generate."}},"required":["model","prompt"],"title":"recraft-v3"}}}},"responses":{"200":{"content":{"application/json":{"schema":{"type":"object","properties":{"data":{"type":"array","nullable":true,"items":{"type":"object","properties":{"url":{"type":"string","nullable":true,"description":"The URL where the file can be downloaded from."},"b64_json":{"type":"string","nullable":true,"description":"The base64-encoded JSON of the generated image."}}},"description":"The list of generated images."},"meta":{"type":"object","nullable":true,"properties":{"usage":{"type":"object","nullable":true,"properties":{"credits_used":{"type":"number","description":"The number of tokens consumed during generation."}},"required":["credits_used"]}},"description":"Additional details about the generation."}}}}}}}}}}}
```

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
