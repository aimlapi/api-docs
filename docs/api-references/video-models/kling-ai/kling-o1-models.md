---
hidden: true
noIndex: true
---

# kling o1 models

{% columns %}
{% column width="66.66666666666666%" %}
{% hint style="info" %}
This documentation is valid for the following list of our models:

* `klingai/image-o1`
* `klingai/video-o1-reference-to-video`
* `klingai/video-o1-image-to-video`
* `klingai/video-o1-video-to-video-edit`
* `klingai/video-o1-video-to-video-reference`
{% endhint %}
{% endcolumn %}

{% column width="33.33333333333334%" %}
<a href="https://aimlapi.com/app/?model=klingai/image-o1" class="button primary">Try in Playground</a>
{% endcolumn %}
{% endcolumns %}

## Model Overview

Kling O1 models are a family of high-quality image and video generation systems developed by Kling AI and served via fal ai. The Kling Image O1 model focuses on image creation and editing, producing photorealistic scenes, human portraits, product shots, and stylized visuals suitable for a wide range of creative and commercial use cases.

The Kling Video O1 variants support reference-to-video, image-to-video, and video-to-video workflows, enabling generation and editing of short-form content such as ads, promos, and social clips. These models are optimized for smooth motion, visual coherence, and consistent style or identity across frames, making them suitable for professional video production pipelines.

## How to Make a Call

<details>

<summary>Step-by-Step Instructions</summary>

:digit\_one: **Setup You Can’t Skip**

:black\_small\_square: [**Create an Account**](https://aimlapi.com/app/sign-up): Visit the AI/ML API website and create an account (if you don’t have one yet). :black\_small\_square: [**Generate an API Key**](https://aimlapi.com/app/keys): After logging in, navigate to your account dashboard and generate your API key. Ensure the key is enabled on the UI.

:digit\_two: **Copy the code example**

At the bottom of this page, you'll find a code example that shows how to structure the request. Choose the code snippet in your preferred programming language and copy it into your development environment.

:digit\_three: **Modify the code example**

:black\_small\_square: Replace `<YOUR_AIMLAPI_KEY>` with your actual AI/ML API key. :black\_small\_square: Insert your question or request into the `content` field—this is what the model will respond to.

:digit\_four: <sup><sub><mark style="background-color:yellow;">**(Optional)**<mark style="background-color:yellow;"><sub></sup> **Adjust other optional parameters if needed**

Only `model` and `messages` are required parameters for this model (and they are already correctly set in the example), but you can include optional parameters to fine-tune behavior. Below, you can find the corresponding **API schema**, which lists all available parameters and usage notes.

:digit\_five: **Run your modified code**

Run your modified code inside your development environment. Response time depends on many factors, but for simple prompts it rarely exceeds a few seconds.

{% hint style="success" %}
If you need a more detailed walkthrough for setting up your development environment and making a request step-by-step, feel free to use our [**Quickstart guide.**](https://docs.aimlapi.com/quickstart/setting-up)
{% endhint %}

</details>

## API Schema

{% openapi-operation spec="kling-o1-models" path="/v1/images/generations" method="post" %}
[OpenAPI kling-o1-models](https://raw.githubusercontent.com/D1m7asis/aimlapi-api-docs/2c1e462b47e633f8d3e3accd939c2705f65bbefc/docs/api-references/autoDoc/kling-o1-models.json)
{% endopenapi-operation %}

{% openapi-operation spec="kling-o1-models" path="/images/generations" method="post" %}
[OpenAPI kling-o1-models](https://raw.githubusercontent.com/D1m7asis/aimlapi-api-docs/2c1e462b47e633f8d3e3accd939c2705f65bbefc/docs/api-references/autoDoc/kling-o1-models.json)
{% endopenapi-operation %}

## Code Example

{% tabs %}
{% tab title="Python" %}
{% code overflow="wrap" %}
```python
import requests

response = requests.post(
    "https://api.aimlapi.com/v1/images/generations",
    headers={"Authorization":"Bearer <YOUR_AIMLAPI_KEY>","Content-Type":"application/json"},
    data=json.dumps({
        "model": "klingai/image-o1",
        "prompt": "Combine the images so the T-Rex is wearing a business suit, sitting in a cozy small café, drinking from the mug. Blur the background slightly to create a bokeh effect.",
        "image_urls": [\
            "https://raw.githubusercontent.com/aimlapi/api-docs/main/reference-files/t-rex.png",\
            "https://raw.githubusercontent.com/aimlapi/api-docs/main/reference-files/blue-mug.jpg",\
        ],
    })
)

data = response.json()
```
{% endcode %}
{% endtab %}

{% tab title="JavaScript" %}
{% code overflow="wrap" %}
```javascript
const response = await fetch('https://api.aimlapi.com/v1/images/generations', {
    method: 'POST',
    headers: {
      "Authorization": "Bearer <YOUR_AIMLAPI_KEY>",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      "model": "klingai/image-o1",
      "prompt": "Combine the images so the T-Rex is wearing a business suit, sitting in a cozy small café, drinking from the mug. Blur the background slightly to create a bokeh effect.",
      "image_urls": [\
        "https://raw.githubusercontent.com/aimlapi/api-docs/main/reference-files/t-rex.png",\
        "https://raw.githubusercontent.com/aimlapi/api-docs/main/reference-files/blue-mug.jpg",\
      ],

    })
});

const data = await response.json();
```
{% endcode %}
{% endtab %}
{% endtabs %}

<details>

<summary>Response</summary>

{% code overflow="wrap" %}
```json5
{
  "id": "img-gen-1744193377-PR9oTu6vDabN9nj0VUUX",
  "object": "image.generation",
  "created": 1744193377,
  "model": "klingai/image-o1",
  "data": [\
    {\
      "url": "https://cdn.aimlapi.com/generated/klingai/image-o1/example-output-1.png",\
      "revised_prompt": "A T-Rex wearing a business suit, sitting in a cozy small café, drinking from a blue mug with a slightly blurred bokeh background."\
    }\
  ],
  "usage": {
    "prompt_tokens": 0,
    "completion_tokens": 0,
    "total_tokens": 0
  }
}
```
{% endcode %}

</details>

```
```
