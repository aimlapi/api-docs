# Luma Uni-1 Max

{% columns %}
{% column width="66.66666666666666%" %}
{% hint style="info" %}
This documentation is valid for the following list of our models:

* `luma/uni-1-max-max`
{% endhint %}
{% endcolumn %}

{% column width="33.33333333333334%" %}
<a href="https://aimlapi.com/app/luma/uni-1-max-max" class="button primary">Try in Playground</a>
{% endcolumn %}
{% endcolumns %}

## Model Overview

Luma Uni-1 Max is the higher-quality image generation and editing variant of Uni-1 with the same parameters.

{% hint style="success" %}
[Create AI/ML API Key](https://aimlapi.com/app/keys)
{% endhint %}

<details>

<summary>How to make the first API call</summary>

**1️⃣ Required setup (don’t skip this)**\
▪ **Create an account:** Sign up on the AI/ML API website (if you don’t have one yet).\
▪ **Generate an API key:** In your account dashboard, create an API key and make sure it’s **enabled** in the UI.

**2️ Copy the code example**\
At the bottom of this page, pick the snippet for your preferred programming language (Python / Node.js) and copy it into your project.

**3️ Update the snippet for your use case**\
▪ **Insert your API key:** replace `<YOUR_AIMLAPI_KEY>` with your real AI/ML API key.\
▪ **Select a model:** set the `model` field to the model you want to call.\
▪ **Provide input:** fill in the request input field(s) shown in the example.

**4️ (Optional) Tune the request**\
See the API schema below for optional generation settings.

**5️ Run your code**\
Run the updated code in your development environment.

{% hint style="success" %}
For a detailed walkthrough, use our [Quickstart guide](https://docs.aimlapi.com/quickstart/setting-up).
{% endhint %}

</details>

## API Schema

{% openapi-operation spec="uni-1-max" path="/v1/images/generations" method="post" %}
[OpenAPI uni-1-max](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/image-models/Luma-AI/uni-1-max.json)
{% endopenapi-operation %}

## Code Example

{% tabs %}
{% tab title="Python" %}
{% code overflow="wrap" %}
```python
import requests

response = requests.post(
    "https://api.aimlapi.com/v1/images/generations",
    headers={
        "Authorization": "Bearer <YOUR_AIMLAPI_KEY>",
        "Content-Type": "application/json",
    },
    json={'model': 'luma/uni-1-max-max', 'prompt': 'Describe what you want the model to generate.', 'image_url': 'https://example.com/input.jpg'},
)

print(response.json())
```
{% endcode %}
{% endtab %}

{% tab title="JavaScript" %}
{% code overflow="wrap" %}
```javascript
const response = await fetch('https://api.aimlapi.com/v1/images/generations', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer <YOUR_AIMLAPI_KEY>',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
  "model": "luma/uni-1-max",
  "prompt": "Describe what you want the model to generate.",
  "image_url": "https://example.com/input.jpg"
}),
});

console.log(await response.json());
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
      "url": "https://cdn.aimlapi.com/generations/hedgehog/1749730923700-29fe35d2-4aef-4bc5-a911-6c39884d16a8.png",
      "b64_json": null
    }
  ],
  "meta": {
    "usage": {
      "credits_used": 120000,
      "usd_spent": 0.06
    }
  },
  "model": "luma/uni-1-max"
}
```
{% endcode %}

</details>
