# reve/edit-image

{% columns %}
{% column width="66.66666666666666%" %}
{% hint style="info" %}
This documentation is valid for the following list of our models:

* `reve/edit-image`
{% endhint %}
{% endcolumn %}

{% column width="33.33333333333334%" %}
<a href="https://aimlapi.com/app/?model=reve/edit-image&#x26;mode=image" class="button primary">Try in Playground</a>
{% endcolumn %}
{% endcolumns %}

## Model Overview

The model allows you to modify images using plain text commands: adjust colors, text, and perspectives.

## Setup your API Key

If you don’t have an API key for the AI/ML API yet, feel free to use our [Quickstart guide](https://docs.aimlapi.com/quickstart/setting-up).

## API Schema

{% openapi-operation spec="reve-edit-image" path="/v1/images/generations" method="post" %}
[OpenAPI reve-edit-image](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/image-models/Reve/reve-edit-image.json)
{% endopenapi-operation %}

## Quick Example

Let's generate a new image using the one from the [flux/dev Quick Example](../flux/flux-dev.md#quick-example) as a reference — and make a simple change to it with a prompt.

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
            "model": "reve/edit-image",
            "prompt": "Make the dinosaur sit on a lounge chair with its back to the camera, looking toward the water. The setting sun has almost disappeared below the horizon.",
            "image_url": "https://raw.githubusercontent.com/aimlapi/api-docs/main/reference-files/t-rex.png"
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
      model: 'reve/edit-image',
      prompt: 'Make the dinosaur sit on a lounge chair with its back to the camera, looking toward the water. The setting sun has almost disappeared below the horizon.',
      image_url: 'https://raw.githubusercontent.com/aimlapi/api-docs/main/reference-files/t-rex.png'
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
  "data": [
    {
      "url": "https://cdn.aimlapi.com/generations/phoenix/1759282497910-293a844d-2f8c-4513-85e8-c80dec720892.png",
      "b64_json": null,
      "request_id": "rsid-4af47c2ebb2e31f34dce88cb35873bab",
      "content_violation": false
    }
  ],
  "meta": {
    "usage": {
      "tokens_used": 210000
    }
  }
}
```
{% endcode %}

</details>

| Reference Image                                                           | Generated Image                                                                                                         |
| ------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| ![](https://cdn.aimlapi.com/eagle/files/monkey/GHx5aT0PR9GXtGi3Cx7CE.png) | <img src="../../../.gitbook/assets/1759282497910-293a844d-2f8c-4513-85e8-c80dec720892.png" alt="" data-size="original"> |
