---
icon: image-landscape
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

Now you are ready to start generating images.

{% content-ref url="generate-an-image.md" %}
[generate-an-image.md](generate-an-image.md)
{% endcontent-ref %}
