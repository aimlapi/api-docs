# Imagen 3

{% hint style="info" %}
This documentation is valid for the following list of our models:

* `imagen-3.0-generate-002`
{% endhint %}

## Model Overview <a href="#model-overview" id="model-overview"></a>

Google's latest text-to-image AI model, designed to generate high-quality, photorealistic images from text descriptions with improved detail, lighting, and fewer artifacts. It boasts enhanced natural language understanding and better text rendering.

## Setup your API Key <a href="#setup-your-api-key" id="setup-your-api-key"></a>

If you don’t have an API key for the AI/ML API yet, feel free to use our [Quickstart guide](https://docs.aimlapi.com/quickstart/setting-up).

## API Schema

{% openapi-operation spec="imagen-3" path="/v1/images/generations" method="post" %}
[Broken link](broken-reference)
{% endopenapi-operation %}

## Quick Example

Let's generate an image of the specified size using a simple prompt.

{% tabs %}
{% tab title="Python" %}
{% code overflow="wrap" %}
```python
import requests


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
            "model": "imagen-3.0-generate-002",
            "convert_base64_to_url": True,
        }
    )

    response.raise_for_status()
    data = response.json()

    print("Generation:", data)


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
        model: 'imagen-3.0-generate-002',
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

Note that prompt enhancement is _enabled_ by default. The model will also return the enhanced prompt in the response. If you prefer not to use this feature, set the parameter `enhance_prompt` to `False`.

<details>

<summary>Response</summary>

{% code overflow="wrap" %}
```json5
Generation: {'data': [{'mime_type': 'image/png', 'url': 'https://cdn.aimlapi.com/generations/guepard/1746720987715-f2285114-7255-49fd-bef4-269b37225465.png', 'prompt': "A close-up shot of a playful raccoon with a mischievous glint in its eyes, enjoying a scoop of strawberry ice cream on a hot summer day. The raccoon is perched on a park bench, its small paws delicately holding the cone as it takes a satisfying lick. The ice cream melts slightly in the warm weather, creating a delightful, drippy texture. Sunlight bathes the scene in a warm, golden light, enhancing the colours and creating a vibrant atmosphere. The background is slightly blurred, with lush greenery and a hint of a vibrant blue sky. The photo is taken with a Canon EOS R5 camera using a 50mm lens, capturing the detail of the raccoon's fur, the melting ice cream, and the bright colours of the surroundings."}]}
```
{% endcode %}

</details>

Default aspect ratio is 1:1, so we obtained the following 1024x1024 image by running this code example:

<figure><img src="../../../.gitbook/assets/1746720987715-f2285114-7255-49fd-bef4-269b37225465.png" alt=""><figcaption><p>In reality, raccoons shouldn’t be given ice cream or chocolate—it’s harmful to their metabolism. <br>But in the AI world, raccoons party like there’s no tomorrow.</p></figcaption></figure>
