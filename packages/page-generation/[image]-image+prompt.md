# MODEL_ID

{% columns %}
{% column width="66.66666666666666%" %}
{% hint style="info" %}
This documentation is valid for the following list of our models:

* `DEVELOPER/MODEL_ID`
{% endhint %}
{% endcolumn %}

{% column width="33.33333333333334%" %}
<a href="https://aimlapi.com/app/MODEL_ID" class="button primary">Try in Playground</a>
{% endcolumn %}
{% endcolumns %}

## Model Overview

.

## Setup your API Key

If you don’t have an API key for the AI/ML API yet, feel free to use our [Quickstart guide](https://docs.aimlapi.com/quickstart/setting-up).

## API Schema

.

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
            "model": "DEVELOPER/MODEL_ID",
            "image_url": "https://raw.githubusercontent.com/aimlapi/api-docs/main/reference-files/t-rex.png",
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
    model: 'DEVELOPER/MODEL_ID',
    prompt: 'Add a bird to the foreground of the photo.',
    image_url: 'https://raw.githubusercontent.com/aimlapi/api-docs/main/reference-files/t-rex.png',        
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
