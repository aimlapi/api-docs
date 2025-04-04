# flux/dev/image-to-image

{% hint style="info" %}
This documentation is valid for the following list of our models:

* `flux/dev/image-to-image`
{% endhint %}

## Model Overview

A state-of-the-art image generation model that utilizes a 12 billion parameter rectified flow transformer architecture. It is designed to generate high-quality images from textual descriptions, making it a powerful tool for developers and creatives.

<table><thead><tr><th width="220" valign="top">Model</th><th>Generated image properties</th></tr></thead><tbody><tr><td valign="top"><a href="flux-dev-image-to-image.md">flux/dev/image-to-image</a></td><td>Format: <strong>PNG</strong><br>Fixed size: Matches the dimensions of the reference image.</td></tr></tbody></table>

## Setup your API Key

If you don’t have an API key for the AI/ML API yet, feel free to use our [Quickstart guide](https://docs.aimlapi.com/quickstart/setting-up).

## Submit a request

### API Schema

{% openapi src="https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/image-models/flux/flux-dev-image-to-image.json" path="/v1/images/generations" method="post" %}
[https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/image-models/flux/flux-dev-image-to-image.json](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/image-models/flux/flux-dev-image-to-image.json)
{% endopenapi %}

