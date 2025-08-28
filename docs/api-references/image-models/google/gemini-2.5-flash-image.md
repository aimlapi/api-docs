# Gemini 2.5 Flash Image

{% hint style="info" %}
This documentation is valid for the following list of our models:

* `google/gemini-2.5-flash-image`
{% endhint %}

## Model Overview <a href="#model-overview" id="model-overview"></a>

Google’s smartest image generation model as of August 2025.

{% hint style="info" %}
Images produced or modified with Gemini 2.5 Flash Image carry an invisible SynthID digital watermark, allowing them to be recognized as AI-generated or edited.
{% endhint %}

## Setup your API Key <a href="#setup-your-api-key" id="setup-your-api-key"></a>

If you don’t have an API key for the AI/ML API yet, feel free to use our [Quickstart guide](https://docs.aimlapi.com/quickstart/setting-up).

## API Schema

{% openapi-operation spec="gemini-2-5-flash-image" path="/v1/images/generations" method="post" %}
[OpenAPI gemini-2-5-flash-image](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/image-models/Google/gemini-2.5-flash-image.json)
{% endopenapi-operation %}

## Quick Example

Let's generate an image of the specified aspect ratio using a simple prompt.

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
            "model": "google/gemini-2.5-flash-image",
            "prompt": "Racoon eating ice-cream"
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
        model: 'google/gemini-2.5-flash-image',
        prompt: 'Racoon eating ice-cream',
        aspect_ratio: '16:9'
      }),
    });

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
Generation: {'images': [{'url': 'https://cdn.aimlapi.com/eagle/files/elephant/Ltdy-0QLZAnyBGLRyh-pP.jpeg', 'content_type': None, 'file_name': None, 'file_size': None}], 'description': "Sounds adorable! Here's a racoon enjoying some ice cream: "}
```
{% endcode %}

</details>

So we obtained the following 1024x1024 image by running this code example:

<figure><img src="../../../.gitbook/assets/Ltdy-0QLZAnyBGLRyh-pP.jpeg" alt=""><figcaption><p>In reality, raccoons shouldn’t be given ice cream or chocolate—it’s harmful to their metabolism. <br>But in the AI world, raccoons party like there’s no tomorrow.</p></figcaption></figure>
