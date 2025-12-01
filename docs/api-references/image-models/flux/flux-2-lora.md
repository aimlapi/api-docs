# flux-2-lora

{% columns %}
{% column width="66.66666666666666%" %}
{% hint style="info" %}
This documentation is valid for the following list of our models:

* `blackforestlabs/flux-2-lora`
{% endhint %}
{% endcolumn %}

{% column width="33.33333333333334%" %}
<a href="https://aimlapi.com/app/?model=blackforestlabs/flux-2-lora&#x26;mode=image" class="button primary">Try in Playground</a>
{% endcolumn %}
{% endcolumns %}

## Model Overview

This text-to-image model enables you to apply your trained adapters, producing domain-specific outputs aligned with your brand aesthetic, expert content areas, or specialized visual constraints.

## Setup your API Key

If you don’t have an API key for the AI/ML API yet, feel free to use our [Quickstart guide](https://docs.aimlapi.com/quickstart/setting-up).

## API Schema

{% openapi-operation spec="flux-2-lora" path="/v1/images/generations" method="post" %}
[OpenAPI flux-2-lora](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/image-models/flux/flux-2-lora.json)
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
            "Content-Type": "application/json"
        },
        json={
            "model": "blackforestlabs/flux-2-lora",
            "prompt": "A T-Rex relaxing on a beach, lying on a sun lounger and wearing sunglasses.",
            "image_size": {
                "width": 1472,
                "height": 512 
            }
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
      model: 'blackforestlabs/flux-2-lora',
      prompt: 'A T-Rex relaxing on a beach, lying on a sun lounger and wearing sunglasses.',
      image_size: {
        width: 1472,
        height: 512
      },
    }),
  });

  const data = await response.json();
  console.log('Generation:', data);
}

main();
```
{% endcode %}
{% endtab %}
{% endtabs %}

<details>

<summary>Response</summary>

{% code overflow="wrap" %}
```json
{
  "data": [
    {
      "url": "https://cdn.aimlapi.com/flamingo/files/b/0a847b04/UNSH9jzS_1AHujNGtda30.png"
    }
  ],
  "meta": {
    "usage": {
      "tokens_used": 44100
    }
  }
}
```
{% endcode %}

</details>

We obtained the following nice 1472x512 image by running this code example:

<div align="left"><figure><img src="../../../.gitbook/assets/UNSH9jzS_1AHujNGtda30.png" alt=""><figcaption><p><code>"A T-Rex relaxing on a beach, lying on a sun lounger and wearing sunglasses."</code></p></figcaption></figure></div>
