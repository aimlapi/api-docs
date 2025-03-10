---
icon: image-landscape
description: A description of image generation process using AIML API image models.
layout:
  title:
    visible: true
  description:
    visible: false
  tableOfContents:
    visible: true
  outline:
    visible: true
  pagination:
    visible: true
---

# Image Models

## Overview

Our API features the capability to generate images. We support various models for image generation, including both open-source and proprietary options.

## How to Generate an Image

### Select a model

First, decide which model you want to use. Models can be trained for specific tasks (e.g., realistic results), offer higher resolutions, or include features like negative prompts. You can read about our supported models and their features [here](https://aimlapi.com/models?integration-category=Image+Generation).

### Imagine a prompt

Next, construct a prompt for the image. Depending on your needs, this prompt can include keywords that will shape the image: place, objects, quality, style, and other elements. This prompt is a crucial part of the image generation process and determines what will be displayed in the image.

### Configure metaparameters

Then, configure the metaparameters for your generation:

* **Steps**: The `n`parameter in the API controls the number of iterations the model will take to shape your image. Experiment with this parameter to achieve the best result for your prompt.
* **Size**: The `size` parameter controls the resolution of the resulting image. All models have minimum and maximum resolutions, sometimes with different aspect ratios. Experiment with this parameter as well.

### Quick Code Example

Here is an example of generation an image of a robot classroom using the `flux-pro` image model:

<pre class="language-python" data-overflow="wrap"><code class="lang-python"><strong>%pip install openai
</strong>import os
from openai import OpenAI
import requests
url = "https://api.aimlapi.com/v1/images/generations/"

model="flux-pro"
prompt="""
Create a classroom of young robots. 
The chalkboard in the classroom has 'AI Is Your Friend' written on it.
"""
payload = {
  "prompt": prompt,
  "model": model,
}

headers = {
  #put your AIML API Key instead of &#x3C;YOUR_API_KEY>:
  "Authorization": "Bearer &#x3C;YOUR_API_KEY>", 
  "content-type": "application/json"
}

response = requests.post(url, json=payload, headers=headers)
</code></pre>

We obtained the following image by running that code example:

<figure><img src="../../.gitbook/assets/66c834ddf0e7e8e65fb69c9f_flux.1 robots (2).webp" alt=""><figcaption><p><em>(And AI needs your clothes, your boots and your motorcycle.)</em></p></figcaption></figure>
