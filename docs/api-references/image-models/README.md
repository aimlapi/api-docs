---
description: A description of image generation process using AIML API image models.
icon: image-landscape
---

# Image Models

## Overview

Our API features the capability to generate images. We support various models for image generation, including both open-source and proprietary options.

We support multiple image models. You can find the [complete list](./#all-available-image-models) along with API reference links at the end of the page.

## How to Generate an Image

### Select a model

First, decide which model you want to use. Models can be trained for specific tasks (e.g., realistic results), offer higher resolutions, or include features like negative prompts. You can read about our supported models and their features on our [main website](https://aimlapi.com/models?integration-category=Image+Generation).

### Imagine a prompt

Next, construct a prompt for the image. Depending on your needs, this prompt can include keywords that will shape the image: place, objects, quality, style, and other elements. This prompt is a crucial part of the image generation process and determines what will be displayed in the image.

### Configure metaparameters

Then, configure the metaparameters for your generation:

* **Steps**: The `n` parameter in the API controls the number of iterations the model will take to shape your image. Experiment with this parameter to achieve the best result for your prompt.
* **Size**: The `size` parameter controls the resolution of the resulting image. All models have minimum and maximum resolutions, sometimes with different aspect ratios. Experiment with this parameter as well.

### Quick Code Example

Here is an example of generation an image of a robot classroom using the `flux-pro` image model:

{% tabs %}
{% tab title="Python" %}
{% code overflow="wrap" %}
```python
import requests

url = "https://api.aimlapi.com/v1/images/generations/"

payload = {
  "model": "flux/schnell",
  "prompt": """
Create a classroom of young robots. 
The chalkboard in the classroom has 'AI Is Your Friend' written on it.
"""
}

headers = {
  #put your AIML API Key instead of <YOUR_AIMLAPI_KEY>:
  "Authorization": "Bearer <YOUR_AIMLAPI_KEY>", 
  "content-type": "application/json"
}

response = requests.post(url, json=payload, headers=headers)
response.raise_for_status()

print("Generation:", response.json())
```
{% endcode %}
{% endtab %}
{% endtabs %}

We obtained the following image by running that code example:

<div align="left"><figure><img src="../../.gitbook/assets/66c834ddf0e7e8e65fb69c9f_flux.1 robots (2).webp" alt=""><figcaption><p><em>(And AI needs your clothes, your boots and your motorcycle.)</em></p></figcaption></figure></div>
