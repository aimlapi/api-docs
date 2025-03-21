# flux/dev

{% hint style="info" %}
This documentation is valid for the following list of our models:

* flux/dev
{% endhint %}

## Model Overview

A state-of-the-art image generation model that utilizes a 12 billion parameter rectified flow transformer architecture. It is designed to generate high-quality images from textual descriptions, making it a powerful tool for developers and creatives.

## Setup your API Key

If you don’t have an API key for the AI/ML API yet, feel free to use our [Quickstart guide](https://docs.aimlapi.com/quickstart/setting-up).

## Submit a request

### API Schema

{% openapi src="../Black-Forest-Labs/flux-dev.json" path="/v1/images/generations" method="post" %}
[flux-dev.json](../Black-Forest-Labs/flux-dev.json)
{% endopenapi %}
