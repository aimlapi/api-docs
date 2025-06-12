# gpt-image-1

{% hint style="info" %}
This documentation is valid for the following list of our models:

* `openai/gpt-image-1`
{% endhint %}

## Model Overview

GPT Image 1 is OpenAI's new state-of-the-art image generation model. It's a natively multimodal language model that generates images based on a text prompt.

## Setup your API Key

If you don’t have an API key for the AI/ML API yet, feel free to use our [Quickstart guide](https://docs.aimlapi.com/quickstart/setting-up).

## API Schema

{% hint style="info" %}
Note that by default, the `quality` parameter is set to `'medium'`. The output image will still look great, but for even more detailed results, consider setting this parameter to `'high'`.
{% endhint %}

{% openapi-operation spec="gpt-image-1" path="/v1/images/generations" method="post" %}
[Broken link](broken-reference)
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
            "prompt": "A T-Rex relaxing on a beach, lying on a sun lounger and wearing sunglasses. Realistic photo.",
            "model": "openai/gpt-image-1",
            "size": "1536x1024"
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
        prompt: 'A T-Rex relaxing on a beach, lying on a sun lounger and wearing sunglasses. Realistic photo.',
        model: 'openai/gpt-image-1',
        size: '1536x1024'
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
  "created": 1749730922,
  "background": "opaque",
  "data": [
    {
      "url": "https://cdn.aimlapi.com/generations/hedgehog/1749730923700-29fe35d2-4aef-4bc5-a911-6c39884d16a8.png"
    }
  ],
  "output_format": "png",
  "quality": "medium",
  "size": "1536x1024",
  "usage": {
    "input_tokens": 29,
    "input_tokens_details": {
      "image_tokens": 0,
      "text_tokens": 29
    },
    "output_tokens": 1568,
    "total_tokens": 1597
  }
}
```
{% endcode %}

</details>

We obtained the following 1536x1024 image by running this code example (\~ 26 s):

<figure><img src="../../../.gitbook/assets/1749730923700-29fe35d2-4aef-4bc5-a911-6c39884d16a8.png" alt=""><figcaption><p><code>"A T-Rex relaxing on a beach, lying on a sun lounger and wearing sunglasses. Realistic photo."</code></p></figcaption></figure>

<details>

<summary>More images</summary>

<figure><img src="../../../.gitbook/assets/1749730482361-dd6507ff-57da-4077-8774-735936749de9.png" alt=""><figcaption><p><code>"A T-Rex relaxing on a beach, lying on a sun lounger and wearing sunglasses."</code></p></figcaption></figure>

<figure><img src="../../../.gitbook/assets/1749730310081-78afd54b-e184-485a-9864-98026eadbc76.png" alt=""><figcaption><p><code>"Racoon eating ice-cream"</code></p></figcaption></figure>

</details>
