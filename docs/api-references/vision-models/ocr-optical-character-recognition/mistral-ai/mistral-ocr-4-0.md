# Mistral OCR 4

{% columns %}
{% column width="66.66666666666666%" %}
{% hint style="info" %}
This documentation is valid for the following list of our models:

* `mistral/mistral-ocr-4-0`
{% endhint %}
{% endcolumn %}

{% column width="33.33333333333334%" %}
<a href="https://aimlapi.com/app/mistral/mistral-ocr-4-0" class="button primary">Try in Playground</a>
{% endcolumn %}
{% endcolumns %}

## Model Overview

Mistral OCR 4 is Mistral's most advanced document extraction and understanding model, adding native paragraph-level bounding box extraction and structural block labels on top of high-fidelity text, table, and image extraction from PDFs and images. Fully backward compatible with Mistral OCR 3.

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

{% openapi-operation spec="mistral-ocr-4-0" path="/v1/ocr" method="post" %}
[OpenAPI mistral-ocr-4-0](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/vision-models/ocr-optical-character-recognition/mistral-ai/mistral-ocr-4-0.json)
{% endopenapi-operation %}

## Code Example

{% tabs %}
{% tab title="Python" %}
{% code overflow="wrap" %}
```python
import requests

response = requests.post(
    "https://api.aimlapi.com/v1/ocr",
    headers={
        "Authorization": "Bearer <YOUR_AIMLAPI_KEY>",
        "Content-Type": "application/json",
    },
    json={'model': 'mistral/mistral-ocr-4-0', 'document': '<document>'},
)

print(response.json())
```
{% endcode %}
{% endtab %}

{% tab title="JavaScript" %}
{% code overflow="wrap" %}
```javascript
const response = await fetch('https://api.aimlapi.com/v1/ocr', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer <YOUR_AIMLAPI_KEY>',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
  "model": "mistral/mistral-ocr-4-0",
  "document": "<document>"
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
  "pages": [
    {
      "index": 0,
      "markdown": "<markdown>",
      "images": [
        {
          "id": "<id>",
          "top_left_x": 0,
          "top_left_y": 0,
          "bottom_right_x": 0,
          "bottom_right_y": 0,
          "image_base64": "<image_base64>"
        }
      ],
      "dimensions": {
        "dpi": 0,
        "height": 0,
        "width": 0
      }
    }
  ],
  "model": "<model>",
  "document_annotation": "<document_annotation>",
  "usage_info": {
    "pages_processed": 0,
    "doc_size_bytes": 0
  },
  "meta": {
    "usage": {
      "credits_used": 120000,
      "usd_spent": 0.06
    }
  }
}
```
{% endcode %}

</details>
