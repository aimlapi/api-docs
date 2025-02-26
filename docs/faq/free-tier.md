---
icon: circle-question
description: FAQ section about AI/ML API Free Tier option.
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

# How to use the Free Tier?

## About

The Free Tier allows users to use the service with certain limits at no cost. This helps them test the product and see if it works for their goals before making any payments.

## Which models are included

### **In AI Playground**

Some models can be tested in the [AI Playground](https://aimlapi.com/app/) available on our official website. There, you will find a list of models ready to be launched.&#x20;

<figure><img src="../.gitbook/assets/playground-model-list.png" alt=""><figcaption></figcaption></figure>

The following rules apply:

* Regular models come with 50 free requests per day.
* You can execute only one request at a time.
* [Pro models](pro-models.md) have a limit of 10,000 AI/ML API tokens per day.

### **Via API**

Using our API on the Free Tier, you can access:

* [Chat completion text models](../api-references/text-models-llm/chat-completion.md),
* [Embedding models](broken-reference),
* [Image models](../api-references/image-models/).

The following Free Tier rules apply:

* You are allowed 10 free requests per hour.
* When using Chat Completion text models, the maximum output is limited to 512 tokens. Image attachments in messages are not supported.
* You can generate up to 10 images per hour.&#x20;
* Using the following image models, you can only 1 image generated at a time:

<details>

<summary>Model list</summary>

* flux/schnell&#x20;
* flux-pro&#x20;
* flux-pro/v1.1&#x20;
* flux-pro/v1.1-ultra
* flux/dev
* flux/dev/image-to-image
* flux-realism
* stable-diffusion-v3-medium&#x20;
* stable-diffusion-v35-large
* recraft-v3

</details>

* For the following models generated images are limited to a resolution of 512x512 pixels:

<details>

<summary>Model list</summary>

* dall-e-2
* dall-e-3
* stabilityai/stable-diffusion-xl-base-1.0

</details>

* If image generation requires more than 512 AI/ML API tokens, the request will not be processed.
