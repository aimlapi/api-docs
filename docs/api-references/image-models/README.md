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

* **Steps**: The `n`parameter in the API controls the number of iterations the model will take to shape your image. Experiment with this parameter to achieve the best result for your prompt.
* **Size**: The `size` parameter controls the resolution of the resulting image. All models have minimum and maximum resolutions, sometimes with different aspect ratios. Experiment with this parameter as well.

### Quick Code Example

Here is an example of generation an image of a robot classroom using the `flux-pro` image model:

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

We obtained the following image by running that code example:

<figure><img src="../../.gitbook/assets/66c834ddf0e7e8e65fb69c9f_flux.1 robots (2).webp" alt=""><figcaption><p><em>(And AI needs your clothes, your boots and your motorcycle.)</em></p></figcaption></figure>

## All Available Image Models

<table><thead><tr><th width="274.20001220703125">Model ID  +  API Reference link</th><th width="123.39996337890625">Developer</th><th width="103.79998779296875">Context</th><th>Model Card</th></tr></thead><tbody><tr><td><a href="alibaba-cloud/qwen-image.md">alibaba/qwen-image</a></td><td>Alibaba Cloud</td><td></td><td><a href="https://aimlapi.com/models/qwen-image">Qwen Image</a></td></tr><tr><td><a href="alibaba-cloud/qwen-image-edit.md">alibaba/qwen-image-edit</a></td><td>Alibaba Cloud</td><td></td><td><a href="https://aimlapi.com/models/qwen-image-edit">Qwen Image Edit</a></td></tr><tr><td><a href="bytedance/seedream-3.0.md">bytedance/seedream-3.0</a></td><td>ByteDance</td><td></td><td><a href="https://aimlapi.com/models/seedream-3-0">Seedream 3.0</a></td></tr><tr><td><a href="bytedance/seededit-3.0-image-to-image.md">bytedance/seededit-3.0-i2i</a></td><td>ByteDance</td><td></td><td><a href="https://aimlapi.com/models/seedream-3-0">Seedream 3.0</a></td></tr><tr><td><a href="bytedance/seedream-v4-text-to-image.md">bytedance/seedream-v4-text-to-image</a></td><td>ByteDance</td><td></td><td><a href="https://aimlapi.com/models/seedream-4">Seedream 4 Text-to-Image</a></td></tr><tr><td><a href="bytedance/seedream-v4-edit-image-to-image.md">bytedance/seedream-v4-edit</a></td><td>ByteDance</td><td></td><td><a href="https://aimlapi.com/models/seedream-4-edit">Seedream 4 Edit</a></td></tr><tr><td><a href="bytedance/uso.md">bytedance/uso</a></td><td>ByteDance</td><td></td><td><a href="https://aimlapi.com/models/uso">USO</a></td></tr><tr><td><a href="flux/flux-pro.md">flux-pro</a></td><td>Flux</td><td></td><td><a href="https://aimlapi.com/models/flux-1-pro-api">FLUX.1 [pro]</a></td></tr><tr><td><a href="flux/flux-pro.md">flux-pro/v1.1</a></td><td>Flux</td><td></td><td><a href="https://aimlapi.com/models/flux-1-1-pro-api">FLUX 1.1 [pro]</a></td></tr><tr><td><a href="flux/flux-pro-v1.1-ultra.md">flux-pro/v1.1-ultra</a></td><td>Flux</td><td></td><td><a href="https://aimlapi.com/models/flux-1-1-pro-ultra-api">FLUX 1.1 [pro ultra]</a></td></tr><tr><td><a href="flux/flux-realism.md">flux-realism</a></td><td>Flux</td><td></td><td><a href="https://aimlapi.com/models/flux-realism-lora-api">FLUX Realism LoRA</a></td></tr><tr><td><a href="flux/flux-dev.md">flux/dev</a></td><td>Flux</td><td></td><td><a href="https://aimlapi.com/models/flux-1-dev-api">FLUX.1 [dev]</a></td></tr><tr><td><a href="flux/flux-dev-image-to-image.md">flux/dev/image-to-image</a></td><td>Flux</td><td></td><td>-</td></tr><tr><td><a href="flux/flux-schnell.md">flux/schnell</a></td><td>Flux</td><td></td><td><a href="https://aimlapi.com/models/flux-1-schnell-api">FLUX.1 [schnell]</a></td></tr><tr><td><a href="flux/flux-kontext-max-text-to-image.md">flux/kontext-max/text-to-image</a></td><td>Flux</td><td></td><td><a href="https://aimlapi.com/models/flux-1-kontext-max">FLUX.1 Kontext [max]</a></td></tr><tr><td><a href="flux/flux-kontext-max-image-to-image.md">flux/kontext-max/image-to-image</a></td><td>Flux</td><td></td><td><a href="https://aimlapi.com/models/flux-1-kontext-max">FLUX.1 Kontext [max]</a></td></tr><tr><td><a href="flux/flux-kontext-pro-text-to-image.md">flux/kontext-pro/text-to-image</a></td><td>Flux</td><td></td><td><a href="https://aimlapi.com/models/flux-1-kontext-pro">Flux.1 Kontext [pro]</a></td></tr><tr><td><a href="flux/flux-kontext-pro-image-to-image.md">flux/kontext-pro/image-to-image</a></td><td>Flux</td><td></td><td><a href="https://aimlapi.com/models/flux-1-kontext-pro">Flux.1 Kontext [pro]</a></td></tr><tr><td><a href="flux/flux-srpo-text-to-image.md">flux/srpo</a></td><td>Flux</td><td></td><td><a href="https://aimlapi.com/models/flux-1-srpo-t2i">FLUX.1 SRPO Text-to-Image</a></td></tr><tr><td><a href="flux/flux-srpo-image-to-image.md">flux/srpo/image-to-image</a></td><td>Flux</td><td></td><td><a href="https://aimlapi.com/models/flux-1-srpo-i2i">FLUX.1 SRPO Image-to-Image</a></td></tr><tr><td><a href="google/imagen-3.0.md">imagen-3.0-generate-002</a></td><td>Google</td><td></td><td><a href="https://aimlapi.com/models/imagen-3-api">Imagen 3</a></td></tr><tr><td><a href="google/imagen-4-preview.md">google/imagen4/preview</a></td><td>Google</td><td></td><td><a href="https://aimlapi.com/models/imagen-4-preview">Imagen 4 Preview</a></td></tr><tr><td><a href="google/imagen-4-ultra.md">imagen-4.0-ultra-generate-preview-06-06</a></td><td>Google</td><td></td><td><a href="https://aimlapi.com/models/imagen-4-ultra">Imagen 4 Ultra</a></td></tr><tr><td><a href="google/gemini-2.5-flash-image.md">google/gemini-2.5-flash-image</a></td><td>Google</td><td></td><td><a href="https://aimlapi.com/models/gemini-2-5-flash-image">Gemini 2.5 Flash Image</a></td></tr><tr><td><a href="google/gemini-2.5-flash-image.md">google/gemini-2.5-flash-image-edit</a></td><td>Google</td><td></td><td><a href="https://aimlapi.com/models/gemini-2-5-flash-image-edit">Gemini 2.5 Flash Image Edit</a></td></tr><tr><td><a href="google/imagen-4-generate.md">google/imagen-4.0-generate-001</a></td><td>Google</td><td></td><td><a href="https://aimlapi.com/models/imagen-4-0-generate-001">Imagen 4.0 Generate</a></td></tr><tr><td><a href="google/imagen-4-fast-generate.md">google/imagen-4.0-fast-generate-001</a></td><td>Google</td><td></td><td><a href="https://aimlapi.com/models/imagen-4-0-fast-generate-001">Imagen 4.0 Fast Generate</a></td></tr><tr><td><a href="google/imagen-4-ultra-generate.md">google/imagen-4.0-ultra-generate-001</a></td><td>Google</td><td></td><td><a href="https://aimlapi.com/models/imagen-4-0-ultra-generate-001">Imagen 4.0 Ultra Generate</a></td></tr><tr><td><a href="OpenAI/dall-e-2.md">dall-e-2</a></td><td>OpenAI</td><td></td><td><a href="https://aimlapi.com/models/openai-dall-e-2-api">OpenAI DALL·E 2</a></td></tr><tr><td><a href="OpenAI/dall-e-3.md">dall-e-3</a></td><td>OpenAI</td><td></td><td><a href="https://aimlapi.com/models/openai-dall-e-3">OpenAI DALL·E 3</a></td></tr><tr><td><a href="openai/gpt-image-1.md">openai/gpt-image-1</a></td><td>OpenAI</td><td></td><td><a href="https://aimlapi.com/models/gpt-image-1">gpt-image-1</a></td></tr><tr><td><a href="RecraftAI/recraft-v3.md">recraft-v3</a></td><td>Recraft AI</td><td></td><td><a href="https://aimlapi.com/models/recraft-v3">Recraft v3</a></td></tr><tr><td><a href="reve/reve-create-image.md">reve/create-image</a></td><td>Reve</td><td></td><td><a href="https://aimlapi.com/models/reve-create-image">Reve Create Image</a></td></tr><tr><td><a href="reve/reve-edit-image.md">reve/edit-image</a></td><td>Reve</td><td></td><td><a href="https://aimlapi.com/models/reve-edit-image">Reve Edit Image</a></td></tr><tr><td><a href="reve/reve-remix-edit-image.md">reve/remix-edit-image</a></td><td>Reve</td><td></td><td><a href="https://aimlapi.com/models/reve-remix-image">Reve Remix Image</a></td></tr><tr><td><a href="Stability-AI/stable-diffusion-v3-medium.md">stable-diffusion-v3-medium</a></td><td>Stability AI</td><td></td><td><a href="https://aimlapi.com/models/stable-diffusion-3-api">Stable Diffusion 3</a></td></tr><tr><td><a href="Stability-AI/stable-diffusion-v35-large.md">stable-diffusion-v35-large</a></td><td>Stability AI</td><td></td><td><a href="https://aimlapi.com/models/stable-diffusion-3-5-large-api">Stable Diffusion 3.5 Large</a></td></tr><tr><td><a href="tencent/hunyuan-image-v3-text-to-image.md">hunyuan/hunyuan-image-v3-text-to-image</a></td><td>Tencent</td><td></td><td><a href="https://aimlapi.com/models/hunyuanimage-3-0">HunyuanImage 3.0</a></td></tr><tr><td><a href="topaz-labs/sharpen.md">topaz-labs/sharpen</a></td><td>Topaz Labs</td><td></td><td><em>Coming Soon</em></td></tr><tr><td><a href="topaz-labs/sharpen-generative.md">topaz-labs/sharpen-gen</a></td><td>Topaz Labs</td><td></td><td><em>Coming Soon</em></td></tr><tr><td><a href="xai/grok-2-image.md">x-ai/grok-2-image</a></td><td>xAI</td><td></td><td><em>Coming Soon</em></td></tr></tbody></table>
