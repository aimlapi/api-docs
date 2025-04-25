# flux/dev

{% hint style="info" %}
This documentation is valid for the following list of our models:

* `flux/dev`
{% endhint %}

## Model Overview

A state-of-the-art image generation model that utilizes a 12 billion parameter rectified flow transformer architecture. It is designed to generate high-quality images from textual descriptions, making it a powerful tool for developers and creatives.

<table><thead><tr><th width="215" valign="top">Model</th><th>Generated image properties</th></tr></thead><tbody><tr><td valign="top"><code>flux/dev</code></td><td>Format: <strong>PNG</strong><br>Min size: <strong>512</strong>x<strong>512</strong><br>Max size: <strong>1536</strong>x<strong>1536</strong><br>Default size: <strong>1024</strong>x<strong>768</strong><br><mark style="background-color:yellow;">For both height and width, the value must be a multiple of 32.</mark></td></tr></tbody></table>

## Setup your API Key

If you don’t have an API key for the AI/ML API yet, feel free to use our [Quickstart guide](https://docs.aimlapi.com/quickstart/setting-up).

## Submit a request

### API Schema

{% openapi src="https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/image-models/flux/flux-dev.json" path="/v1/images/generations" method="post" %}
[https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/image-models/flux/flux-dev.json](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/image-models/flux/flux-dev.json)
{% endopenapi %}

