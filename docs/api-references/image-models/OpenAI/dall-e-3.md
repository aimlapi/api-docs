# DALL·E 3

{% hint style="info" %}
This documentation is valid for the following list of our models:

* `dall-e-3`
{% endhint %}

## Model Overview

This model represents a significant leap forward in AI-driven image creation, capable of generating images from text inputs. This model processes prompts with enhanced neural network architectures, resulting in images that are not only relevant but also rich in detail and diversity. DALL·E 3's deep learning techniques analyze and understand complex descriptions, allowing for the generation of visuals across a wide range of styles and subjects.

You can also view [a detailed comparison of this model](https://aimlapi.com/comparisons/flux-1-vs-dall-e-3) on our main website.

## Setup your API Key

If you don’t have an API key for the AI/ML API yet, feel free to use our [Quickstart guide](https://docs.aimlapi.com/quickstart/setting-up).

## API Schema

{% openapi-operation spec="dall-e-3" path="/v1/images/generations" method="post" %}
[OpenAPI dall-e-3](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/image-models/OpenAI/dall-e-3.json)
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
            "model": "dall-e-3",
            "quality": "hd"
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
      model: 'dall-e-3',
      prompt: 'A T-Rex relaxing on a beach, lying on a sun lounger and wearing sunglasses.',
      quality: 'hd',
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

{% hint style="info" %}
Note that the model applies automatic prompt enhancement, and this behavior cannot be disabled. The enhanced prompt is also returned in the response (see the `revised_prompt` parameter in the response).
{% endhint %}

<details>

<summary>Response</summary>

{% code overflow="wrap" %}
```json5
{
  created: 1756973055,
  data: [
    {
      revised_prompt: 'A massive T-Rex is taking a well-deserved vacation at a tranquil beach. The charismatic dinosaur lies leisurely on a large, comfortable sun lounger. Its tiny, clawed hands hold a pair of fashionable sunglasses in place over its sharp, menacing eyes, adding an air of humor to the otherwise intimidating figure. The soothing sound of the waves and the gentle warmth of the sun create a calming atmosphere around the chilling predator, lending the scene an amusing contradiction.',
      url: 'https://oaidalleapiprodscus.blob.core.windows.net/private/org-5drZvxmo1TGoMx2jeKKGAGSh/user-eKr1xiaNRxSYqgKrXfgZzSAJ/img-B7BCSmDWQgWlGA2vu24HSzqS.png?st=2025-09-04T07%3A04%3A15Z&se=2025-09-04T09%3A04%3A15Z&sp=r&sv=2024-08-04&sr=b&rscd=inline&rsct=image/png&skoid=38e27a3b-6174-4d3e-90ac-d7d9ad49543f&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-09-04T02%3A45%3A18Z&ske=2025-09-05T02%3A45%3A18Z&sks=b&skv=2024-08-04&sig=fGRfHnpFybyg6wwJw7PYXJKM1AF1NWwD/W5qPKIha7U%3D'
    }
  ]
}
```
{% endcode %}

</details>

<figure><img src="../../../.gitbook/assets/img-4BSO0AAOQo7DPgFCzpzLOibU.png" alt=""><figcaption><p><code>"A T-Rex relaxing on a beach, lying on a sun lounger and wearing sunglasses."</code></p></figcaption></figure>
