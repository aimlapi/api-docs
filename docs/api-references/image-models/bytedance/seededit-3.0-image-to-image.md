# Seededit 3.0 (Image-to-Image)

{% columns %}
{% column width="66.66666666666666%" %}
{% hint style="info" %}
This documentation is valid for the following list of our models:

* `bytedance/seededit-3.0-i2i`
{% endhint %}
{% endcolumn %}

{% column width="33.33333333333334%" %}
<a href="https://aimlapi.com/app/?model=bytedance/seededit-3.0-i2i&#x26;mode=image" class="button primary">Try in Playground</a>
{% endcolumn %}
{% endcolumns %}

## Model Overview

This model can process and generate 4K images, editing selected areas naturally and precisely while faithfully preserving the visual fidelity of non-edited areas.

## Setup your API Key

If you don’t have an API key for the AI/ML API yet, feel free to use our [Quickstart guide](https://docs.aimlapi.com/quickstart/setting-up).

## API Schema

{% openapi-operation spec="seededit-3-0-i2i" path="/v1/images/generations" method="post" %}
[OpenAPI seededit-3-0-i2i](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/image-models/ByteDance/seededit-3.0-i2i.json)
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
            "model": "bytedance/seededit-3.0-i2i",
            "image": "https://raw.githubusercontent.com/aimlapi/api-docs/main/reference-files/t-rex.png",
            "prompt": "Add a bird to the foreground of the photo.",
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
const response = await fetch('https://api.aimlapi.com/v1/images/generations', {
  method: 'POST',
  headers: {
    // Insert your AIML API Key instead of <YOUR_AIMLAPI_KEY>:
    'Authorization': 'Bearer <YOUR_AIMLAPI_KEY>',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    model: 'bytedance/seededit-3.0-i2i',
    prompt: 'Add a bird to the foreground of the photo.',
    image: 'https://raw.githubusercontent.com/aimlapi/api-docs/main/reference-files/t-rex.png',        
  }),
});

const data = await response.json();
console.log(JSON.stringify(data, null, 2));
```
{% endcode %}
{% endtab %}
{% endtabs %}

<details>

<summary>Response</summary>

{% code overflow="wrap" %}
```json5
{
  "created": 1754408583,
  "data": [
    {
      "url": "https://ark-content-generation-v2-ap-southeast-1.tos-ap-southeast-1.volces.com/seededit-3-0-i2i/0217544085757151f54867e2807e9e62dfa0a3e2d06531a7ce49c.jpeg?X-Tos-Algorithm=TOS4-HMAC-SHA256&X-Tos-Credential=AKLTYWJkZTExNjA1ZDUyNDc3YzhjNTM5OGIyNjBhNDcyOTQ%2F20250805%2Fap-southeast-1%2Ftos%2Frequest&X-Tos-Date=20250805T154303Z&X-Tos-Expires=86400&X-Tos-Signature=e37babdb426ccd6e36f96a019145af3ea8a6e5cb21f3761d8aa3eae32b24d738&X-Tos-SignedHeaders=host"
    }
  ]
}
```
{% endcode %}

</details>

<table data-full-width="false"><thead><tr><th>Reference Image</th><th>Generated Image</th></tr></thead><tbody><tr><td><div><figure><img src="../../../.gitbook/assets/t-rex (1) (1).png" alt=""><figcaption><p>(original)</p></figcaption></figure></div></td><td><div><figure><img src="../../../.gitbook/assets/0217544093775394225d7fbf52e6d4163826afb0078a23d9f0ef9.jpg" alt=""><figcaption><p><code>"Add a bird to the foreground of the photo."</code></p></figcaption></figure></div></td></tr></tbody></table>

<details>

<summary>More generated images</summary>

| <div><figure><img src="../../../.gitbook/assets/0217544095136411f54867e2807e9e62dfa0a3e2d06531af9c13d.jpg" alt=""><figcaption><p><code>"Add a crown to the T-rex's head."</code></p></figcaption></figure></div>                                                                                                                                                                   | <div><figure><img src="../../../.gitbook/assets/0217544646651366d76cd7acfd572da46abbcedd46e0f23b280e2.jpg" alt=""><figcaption><p><code>"Add a couple of silver wings"</code></p></figcaption></figure></div>                                                                                                                             |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <div><figure><img src="../../../.gitbook/assets/0217544649506046d76cd7acfd572da46abbcedd46e0f23e52b51.jpg" alt=""><figcaption><p><code>"Remove the dinosaur. Place a book and a bouquet of wildflowers in blue and pink tones on the lounge chair. Let a light foamy surf gently wash the bottom of the chair. Don't change anything else."</code></p></figcaption></figure></div> | <div><figure><img src="../../../.gitbook/assets/0217544652410221b9856d510eb90951bba42702ad03c2f94ae0e.jpg" alt=""><figcaption><p><code>"Make the dinosaur sit on a lounge chair with its back to the camera, looking toward the water. The setting sun has almost disappeared below the horizon."</code></p></figcaption></figure></div> |

</details>
