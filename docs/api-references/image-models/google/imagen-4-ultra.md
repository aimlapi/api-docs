---
hidden: true
noIndex: true
layout:
  width: default
  title:
    visible: true
  description:
    visible: false
  tableOfContents:
    visible: true
  outline:
    visible: true
  pagination:
    visible: true
  metadata:
    visible: true
---

# Imagen 4 Ultra

{% hint style="info" %}
This documentation is valid for the following list of our models:

* `imagen-4.0-ultra-generate-preview-06-06`
{% endhint %}

## Model Overview <a href="#model-overview" id="model-overview"></a>

Google’s highest quality image generation model as of July 2025.

## Setup your API Key <a href="#setup-your-api-key" id="setup-your-api-key"></a>

If you don’t have an API key for the AI/ML API yet, feel free to use our [Quickstart guide](https://docs.aimlapi.com/quickstart/setting-up).

## API Schema

<table data-header-hidden><thead><tr><th width="189"></th><th></th></tr></thead><tbody><tr><td><strong>model</strong>*</td><td><em>string</em><br><em>enum</em>:  [ <code>google/imagen4/preview</code> ]</td></tr><tr><td><strong>aspect_ratio</strong></td><td><p><em>string</em><br><em>default</em>: <code>1:1</code></p><p>The aspect ratio of the generated image.</p><p><em>enum</em>:  [ <code>1:1</code>, <code>16:9</code>, <code>9:16</code>, <code>3:4</code>, <code>4:3</code> ]</p></td></tr><tr><td><strong>negative_prompt</strong></td><td><p><em>string</em></p><p>The description of elements to avoid in the generated image.</p></td></tr><tr><td><strong>prompt</strong>*</td><td><p><em>string</em><br><em>maxLength</em>: <code>4000</code></p><p>The text prompt describing the content, style, or composition of the image to be generated.</p></td></tr><tr><td><strong>num_images</strong></td><td><p><em>number</em><br><em>minimum</em>: <code>1</code><br><em>maximum</em>: <code>4</code><br><em>default</em>: <code>1</code></p><p>The number of images to generate.</p></td></tr><tr><td><strong>seed</strong></td><td><p><em>integer</em><br><em>minimum</em>: <code>1</code></p><p>The same seed and the same prompt given to the same version of the model will output the same image every time.</p></td></tr></tbody></table>

## Quick Example

Let's generate an image of the specified aspect ratio using a simple prompt.

{% tabs %}
{% tab title="Python" %}
{% code overflow="wrap" %}
```python
import requests
import json   # for getting a structured output with indentation

def main():
    response = requests.post(
        "https://api.aimlapi.com/v1/images/generations",
        headers={
            # Insert your AIML API Key instead of <YOUR_AIMLAPI_KEY>:
            "Authorization": "Bearer <YOUR_AIMLAPI_KEY>",
            "Content-Type": "application/json",
        },
        json={
            "prompt": "Racoon eating ice-cream",
            "model": "imagen-4.0-ultra-generate-preview-06-06",
            "aspect_ratio": "16:9",
            "convert_base64_to_url": True
        }
    )

    response.raise_for_status()
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
  try {
    const response = await fetch('https://api.aimlapi.com/v1/images/generations', {
      method: 'POST',
      headers: {
        // Insert your AIML API Key instead of <YOUR_AIMLAPI_KEY>:
        'Authorization': 'Bearer <YOUR_AIMLAPI_KEY>',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: 'Racoon eating ice-cream',
        model: 'imagen-4.0-ultra-generate-preview-06-06',
        aspect_ratio: '16:9',
        convert_base64_to_url: true
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Generation:', data);

  } catch (error) {
    console.error('Error:', error);
  }
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
      "mime_type": "image/png",
      "url": "https://cdn.aimlapi.com/generations/guepard/1753091188132-ea2fc805-e828-4afe-82e6-7831a2d4080e.png"
    }
  ]
}
```
{% endcode %}

</details>

So we obtained the following 1408x768 image by running this code example:

<figure><img src="../../../.gitbook/assets/google-imagen-4.0-ultra-generate-preview-06-06_output.png" alt=""><figcaption><p>In reality, raccoons shouldn’t be given ice cream or chocolate—it’s harmful to their metabolism. <br>But in the AI world, raccoons party like there’s no tomorrow.</p></figcaption></figure>
