---
description: Given a prompt and/or an input image, the model will generate a new image.
---

# Image

### Create image

{% swagger src="../.gitbook/assets/aimlapi.yaml" path="/images/generations" method="post" %}
[aimlapi.yaml](../.gitbook/assets/aimlapi.yaml)
{% endswagger %}

### Create image with URL

{% swagger src="../.gitbook/assets/aimlapi.yaml" path="/images/generations/with-url" method="post" %}
[aimlapi.yaml](../.gitbook/assets/aimlapi.yaml)
{% endswagger %}

## Parameters

<table><thead><tr><th width="115">Parameter</th><th width="78">Type</th><th width="107">Required</th><th width="463">Description</th><th data-hidden></th></tr></thead><tbody><tr><td>prompt</td><td>string</td><td>required</td><td>A description of the desired images. Maximum length varies by model.</td><td></td></tr><tr><td>model</td><td>string</td><td>required</td><td>The model to use for image generation.</td><td></td></tr><tr><td>steps</td><td>integer</td><td>Defaults to 20</td><td>Number of generation steps.</td><td></td></tr><tr><td>seed</td><td>integer</td><td>optional</td><td>Seed used for generation. Can be used to reproduce image generations.</td><td></td></tr><tr><td>n</td><td>integer</td><td>Defaults to 1</td><td>Number of image results to generate.</td><td></td></tr><tr><td>height</td><td>integer</td><td>Defaults to 1024</td><td>Height of the image to generate in number of pixels.</td><td></td></tr><tr><td>width</td><td>integer</td><td>Defaults to 1024</td><td>Width of the image to generate in number of pixels.</td><td></td></tr><tr><td>negative_prompt</td><td>string</td><td>optional</td><td>The prompt or prompts not to guide the image generation.</td><td></td></tr></tbody></table>
