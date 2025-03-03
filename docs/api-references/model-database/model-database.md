---
icon: ballot
description: A full list of available models.
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

# 📒 All Model IDs

{% hint style="info" %}
If you need to select models based on specific parameters for your task, visit the [dedicated page on our official website](https://aimlapi.com/models/), which offers convenient filtering options. On the selected model’s page, you can find detailed technical and commercial information.
{% endhint %}

The section **Get Model List via API** contains API reference for the service endpoint, which lets you request the full model list.

The section **Model IDs** lists the identifiers of all available and deprecated models, grouped by category. These IDs are used to specify the exact models in your code, like this:

<figure><img src="../../.gitbook/assets/image (3).png" alt=""><figcaption></figcaption></figure>

If you already know the identifier, use the page search function (<kbd>Ctrl+F</kbd> for Win/Linux, <kbd>Command+F</kbd> for Mac) to locate it.

{% hint style="success" %}
**New Model Request**

Can't find the model you need? Join our [Discord community](https://discord.gg/8CwhkUuCR6) to propose new models for integration into our API offerings. Your contributions help us grow and serve you better.
{% endhint %}

## Get Model List via API

{% openapi src="https://api.aimlapi.com/docs-public-yaml?key=2b878a3c71a785f13366e9be96bacb29" path="/models" method="get" %}
[https://api.aimlapi.com/docs-public-yaml?key=2b878a3c71a785f13366e9be96bacb29](https://api.aimlapi.com/docs-public-yaml?key=2b878a3c71a785f13366e9be96bacb29)
{% endopenapi %}

## Full List of Model IDs
[#references:start]: <> ({ "template": "modelsData" })

### Text Models (LLM)

| Model ID                | Developer     | Context | Model Card                        |
|-----------------------|-------------------|-------------------|-----------------------|
|  [gpt-4o](../text-models-llm/OpenAI/gpt-4o.md) | Open AI   | 128000   | [Chat GPT-4o](https://aimlapi.com/models/chat-gpt-4-omni)  |
|  [gpt-4o-2024-08-06](../text-models-llm/OpenAI/gpt-4o.md) | Open AI   | 128000   | [GPT-4o-2024-08-06](https://aimlapi.com/models/gpt-4o-2024-08-06-api)  |
|  [gpt-4o-2024-05-13](../text-models-llm/OpenAI/gpt-4o.md) | Open AI   | 128000   | [GPT-4o-2024-05-13](https://aimlapi.com/models/gpt-4o-2024-05-13-api)  |
|  [gpt-4o-mini](../text-models-llm/OpenAI/gpt-4o-mini.md) | Open AI   | 128000   | [Chat GPT 4o mini](https://aimlapi.com/models/chat-gpt-4o-mini)  |
|  [gpt-4o-mini-2024-07-18](../text-models-llm/OpenAI/gpt-4o-mini.md) | Open AI   | 128000   | -  |
|  [chatgpt-4o-latest](../text-models-llm/OpenAI/gpt-4o.md) | Open AI   | 128000   | -  |
|  [gpt-4-turbo](../text-models-llm/OpenAI/gpt-4-turbo.md) | Open AI   | 128000   | [Chat GPT 4 Turbo](https://aimlapi.com/models/chat-gpt-4-turbo)  |
|  [gpt-4-turbo-2024-04-09](../text-models-llm/OpenAI/gpt-4-turbo.md) | Open AI   | 128000   | -  |
|  [gpt-4](../text-models-llm/OpenAI/gpt-4.md) | Open AI   | 8000   | [Chat GPT 4 ](https://aimlapi.com/models/chat-gpt-4)  |
|  [gpt-4-0125-preview](../text-models-llm/OpenAI/gpt-4-preview.md) | Open AI   | 8000   | -  |
|  [gpt-4-1106-preview](../text-models-llm/OpenAI/gpt-4-preview.md) | Open AI   | 8000   | -  |
|  [gpt-3.5-turbo](../text-models-llm/OpenAI/gpt-3.5-turbo.md) | Open AI   | 16000   | -  |
|  [gpt-3.5-turbo-0125](../text-models-llm/OpenAI/gpt-3.5-turbo.md) | Open AI   | 16000   | -  |
|  [gpt-3.5-turbo-1106](../text-models-llm/OpenAI/gpt-3.5-turbo.md) | Open AI   | 16000   | [Chat GPT-3.5 Turbo 1106](https://aimlapi.com/models/chat-gpt-3-5-turbo-1106)  |
|  [o1-preview](../text-models-llm/OpenAI/o1-preview.md) | Open AI   | 128000   | [OpenAI o1-preview](https://aimlapi.com/models/openai-o1-preview-api)  |
|  [o1-preview-2024-09-12](../text-models-llm/OpenAI/o1-preview.md) | Open AI   | 128000   | -  |
|  [o1-mini](../text-models-llm/OpenAI/o1-mini.md) | Open AI   | 128000   | [OpenAI o1-mini](https://aimlapi.com/models/openai-o1-mini-api)  |
|  [o1-mini-2024-09-12](../text-models-llm/OpenAI/o1-mini.md) | Open AI   | 128000   | -  |
|  [o3-mini](../text-models-llm/OpenAI/o3-mini.md) | Open AI   | 200000   | [OpenAI o3 mini](https://aimlapi.com/models/openai-o3-mini-api)  |
|  [gpt-4.5-preview](../text-models-llm/OpenAI/gpt-4.5-preview.md) | Open AI   | 128000   | [Chat GPT 4.5 preview](https://aimlapi.com/models/chat-gpt-4-5-preview-api)  |
|  [o1](../text-models-llm/OpenAI/o1.md) | Open AI   | 200000   | [OpenAI o1](https://aimlapi.com/models/openai-o1-api)  |
|  [microsoft/WizardLM-2-8x22B](../text-models-llm/Microsoft/WizardLM-2-8x22B.md) | Microsoft   | 64000   | [WizardLM 2-8 (22B)](https://aimlapi.com/models/wizardlm-2-8-22b)  |
|  [meta-llama/Llama-3.2-90B-Vision-Instruct-Turbo](../text-models-llm/Meta/Llama-3.2-90B-Vision-Instruct-Turbo.md) | Meta   | 131000   | [Llama 3.2 90B Vision Instruct Turbo](https://aimlapi.com/models/llama-3-2-90b-vision-instruct-turbo-api)  |
|  [google/gemma-2-27b-it](../text-models-llm/Google/gemma-2-27b-it.md) | Google   | 8000   | [Gemma 2 (27b)](https://aimlapi.com/models/gemma-2-27b)  |
|  [meta-llama/Llama-Vision-Free](../text-models-llm/Meta/Llama-Vision-Free.md) | Meta   | 128000   | -  |
|  [Gryphe/MythoMax-L2-13b](../text-models-llm/Gryphe/MythoMax-L2-13b.md) | Gryphe   | 4000   | [MythoMax-L2 (13B)](https://aimlapi.com/models/mythomax-l2-13b)  |
|  [mistralai/Mixtral-8x22B-Instruct-v0.1](../text-models-llm/Mistral-AI/Mixtral-8x22B-Instruct.md) | Mistral AI   | 64000   | [Mixtral 8x22B Instruct](https://aimlapi.com/models/mixtral-8x22b-instruct)  |
|  [Qwen/Qwen2-72B-Instruct](../text-models-llm/Alibaba-Cloud/Qwen2-72B-Instruct.md) | Qwen   | 32000   | [Qwen 2 Instruct (72B)](https://aimlapi.com/models/qwen-2-instruct-72b)  |
|  [mistralai/Mixtral-8x7B-Instruct-v0.1](../text-models-llm/Mistral-AI/Mixtral-8x7B-Instruct-v0.1.md) | Mistral AI   | 64000   | [Mixtral-8x7B Instruct v0.1](https://aimlapi.com/models/mixtral-8x7b-instruct-v01)  |
|  [nvidia/Llama-3.1-Nemotron-70B-Instruct-HF](../text-models-llm/NVIDIA/Llama-3.1-Nemotron-70B-Instruct-HF.md) | Nvidia   | 128000   | [Llama 3.1 Nemotron 70B Instruct](https://aimlapi.com/models/llama-3-1-nemotron-70b-instruct-api)  |
|  [NousResearch/Nous-Hermes-2-Mixtral-8x7B-DPO](../text-models-llm/NousResearch/Nous-Hermes-2-Mixtral-8x7B-DPO.md) | NousResearch   | 32000   | -  |
|  [meta-llama/Llama-3.3-70B-Instruct-Turbo](../text-models-llm/Meta/Llama-3.3-70B-Instruct-Turbo.md) | Meta   | 128000   | [Meta Llama 3.3 70B Instruct Turbo](https://aimlapi.com/models/meta-llama-3-3-70b-instruct-turbo-api)  |
|  [upstage/SOLAR-10.7B-Instruct-v1.0](../text-models-llm/Upstage-AI/SOLAR-10.7B-Instruct.md) | Upstage   | 4000   | [Upstage SOLAR Instruct v1 (11B)](https://aimlapi.com/models/upstage-solar-instruct-v1-11b)  |
|  [meta-llama/Llama-3.2-3B-Instruct-Turbo](../text-models-llm/Meta/Llama-3.2-3B-Instruct-Turbo.md) | Meta   | 131000   | [Llama 3.2 3B Instruct Turbo](https://aimlapi.com/models/llama-3-2-3b-instruct-turbo)  |
|  [meta-llama/Llama-3.2-11B-Vision-Instruct-Turbo](../text-models-llm/Meta/Llama-3.2-11B-Vision-Instruct-Turbo.md) | Meta   | 131000   | [Llama 3.2 11B Vision Instruct Turbo](https://aimlapi.com/models/llama-3-2-11b-vision-instruct-turbo-api)  |
|  [meta-llama/Llama-2-13b-chat-hf](../text-models-llm/Meta/Llama-2-13b-chat-hf.md) | Meta   | 4100   | [LLaMA-2 Chat (13B)](https://aimlapi.com/models/llama-2-chat-13b)  |
|  [Qwen/Qwen2.5-7B-Instruct-Turbo](../text-models-llm/Alibaba-Cloud/Qwen2.5-7B-Instruct-Turbo.md) | Qwen   | 32000   | [Qwen 2.5 7B Instruct Turbo](https://aimlapi.com/models/qwen-2-5-7b-instruct-api)  |
|  [Qwen/Qwen2.5-Coder-32B-Instruct](../text-models-llm/Alibaba-Cloud/Qwen2.5-Coder-32B-Instruct.md) | Qwen   | 131000   | -  |
|  [databricks/dbrx-instruct](../text-models-llm/Databricks/dbrx-instruct.md) | Databricks   | 32000   | [DBRX Instruct](https://aimlapi.com/models/dbrx-instruct)  |
|  [meta-llama/Meta-Llama-3-8B-Instruct-Lite](../text-models-llm/Meta/Meta-Llama-3-8B-Instruct-Lite.md) | Meta   | 9000   | [Llama 3 8B Instruct Lite](https://aimlapi.com/models/llama-3-8b-instruct-lite-api)  |
|  [meta-llama/Llama-3-8b-chat-hf](../text-models-llm/Meta/Llama-3-chat-hf.md) | Meta   | 8000   | [Llama 3 8B Instruct Reference](https://aimlapi.com/models/llama-3-8b-instruct-reference-api)  |
|  [meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo-128K](../text-models-llm/Meta/Meta-Llama-3.1-8B-Instruct-Turbo.md) | Meta   | 128000   | -  |
|  [meta-llama/Llama-3-70b-chat-hf](../text-models-llm/Meta/Llama-3-chat-hf.md) | Meta   | 8000   | [Llama 3 70B Instruct Reference](https://aimlapi.com/models/meta-llama-3-70b-instruct)  |
|  [Qwen/Qwen2.5-72B-Instruct-Turbo](../text-models-llm/Alibaba-Cloud/Qwen2.5-72B-Instruct-Turbo.md) | Qwen   | 32000   | [Qwen 2.5 72B Instruct Turbo](https://aimlapi.com/models/qwen-2-5-72b-instruct-turbo)  |
|  [meta-llama/Meta-Llama-3.1-405B-Instruct-Turbo](../text-models-llm/Meta/Meta-Llama-3.1-405B-Instruct-Turbo.md) | Meta   | 4000   | [Llama 3.1 (405B) Instruct Turbo](https://aimlapi.com/models/llama-3-1-405b-api)  |
|  [meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo](../text-models-llm/Meta/Meta-Llama-3.1-8B-Instruct-Turbo.md) | Meta   | 128000   | [Llama 3.1 8B Instruct Turbo](https://aimlapi.com/models/llama-3-1-8b-api)  |
|  [meta-llama/Meta-Llama-3.1-70B-Instruct-Turbo](../text-models-llm/Meta/Meta-Llama-3.1-70B-Instruct-Turbo.md) | Meta   | 128000   | [Llama 3.1 70B Instruct Turbo](https://aimlapi.com/models/llama-3-1-70b-instruct-turbo-api)  |
|  [google/gemma-2b-it](../text-models-llm/Google/gemma-2b-it.md) | Google   | 8000   | [Gemma Instruct (2B)](https://aimlapi.com/models/gemma-instruct-2b)  |
|  [mistralai/Mistral-7B-Instruct-v0.2](../text-models-llm/Mistral-AI/Mistral-7B-Instruct.md) | Mistral AI   | 32000   | [Mistral (7B) Instruct v0.2](https://aimlapi.com/models/mistral-7b-instruct-v02)  |
|  [mistralai/Mistral-7B-Instruct-v0.1](../text-models-llm/Mistral-AI/Mistral-7B-Instruct.md) | Mistral AI   | 8000   | [Mistral (7B) Instruct v0.1](https://aimlapi.com/models/mistral-7b-instruct)  |
|  [mistralai/Mistral-7B-Instruct-v0.3](../text-models-llm/Mistral-AI/Mistral-7B-Instruct.md) | Mistral AI   | 32000   | [Mistral (7B) Instruct v0.3](https://aimlapi.com/models/mistral-7b-instruct-v0-3)  |
|  [meta-llama/Meta-Llama-3-70B-Instruct-Turbo](../text-models-llm/Meta/Meta-Llama-3-70B-Instruct-Turbo.md) | Meta   | 128000   | -  |
|  [meta-llama/Meta-Llama-3-70B-Instruct-Lite](../text-models-llm/Meta/Meta-Llama-3-70B-Instruct-Lite.md) | Meta   | 8000   | [Llama 3 70B Instruct Lite](https://aimlapi.com/models/llama-3-70b-instruct-lite-api)  |
|  [google/gemma-2-9b-it](../text-models-llm/Google/gemma-2-9b-it.md) | Google   | 8000   | [Gemma 2 (9B)](https://aimlapi.com/models/gemma-2-9b)  |
|  [Gryphe/MythoMax-L2-13b-Lite](../text-models-llm/Gryphe/MythoMax-L2-13b-Lite.md) | Gryphe   | 4000   | -  |
|  [meta-llama/Llama-2-7b-chat-hf](../text-models-llm/Meta/Llama-2-7b-chat-hf.md) | Meta   | 4000   | [LLaMA-2 Chat (7B)](https://aimlapi.com/models/llama-2-chat-7b)  |
|  [claude-3-opus-20240229](../text-models-llm/Anthropic/claude-3-opus.md) | Anthropic   | 200000   | [Claude 3 Opus](https://aimlapi.com/models/claude-3-opus)  |
|  [claude-3-sonnet-20240229](../text-models-llm/Anthropic/claude-3-sonnet.md) | Anthropic   | 200000   | [Claude 3 Sonnet](https://aimlapi.com/models/claude-3-sonnet)  |
|  [claude-3-haiku-20240307](../text-models-llm/Anthropic/claude-3-haiku.md) | Anthropic   | 200000   | -  |
|  [claude-3-5-sonnet-20240620](../text-models-llm/Anthropic/claude-3-5-sonnet.md) | Anthropic   | 200000   | -  |
|  [claude-3-5-sonnet-20241022](../text-models-llm/Anthropic/claude-3-5-sonnet.md) | Anthropic   | 200000   | [Claude 3.5 Sonnet 20241022](https://aimlapi.com/models/claude-3-5-sonnet)  |
|  [claude-3-5-haiku-20241022](../text-models-llm/Anthropic/claude-3-5-haiku.md) | Anthropic   | 200000   | -  |
|  [claude-3-7-sonnet-20250219](../text-models-llm/Anthropic/claude-3-7-sonnet.md) | Anthropic   | 200000   | [Claude 3.7 Sonnet](https://aimlapi.com/models/claude-3-7-sonnet-api)  |
|  [gemini-1.5-flash](../text-models-llm/Google/gemini-1.5-flash.md) | Google   | 1000000   | [Gemini 1.5 Flash](https://aimlapi.com/models/gemini-1-5-flash-api)  |
|  [gemini-1.5-pro](../text-models-llm/Google/gemini-1.5-pro.md) | Google   | 1000000   | [Gemini 1.5 Pro](https://aimlapi.com/models/gemini-1-5-pro-api)  |
|  [gemini-pro](../text-models-llm/Google/gemini-pro.md) | Google   | 32000   | [Gemini 1.0 Pro](https://aimlapi.com/models/gemini-1-0-pro-api)  |
|  [gemini-2.0-flash-exp](../text-models-llm/Google/gemini-2.0-flash-exp.md) | Google   | 1000000   | [Gemini 2.0 Flash Experimental](https://aimlapi.com/models/gemini-2-0-flash-experimental)  |
|  [qwen-max](../text-models-llm/Alibaba-Cloud/qwen-max.md) | Alibaba Cloud   | 32000   | [Qwen Max](https://aimlapi.com/models/qwen-max-api)  |
|  [qwen-plus](../text-models-llm/Alibaba-Cloud/qwen-plus.md) | Alibaba Cloud   | 131000   | [Qwen Plus](https://aimlapi.com/models/qwen-plus-api)  |
|  [qwen-turbo](../text-models-llm/Alibaba-Cloud/qwen-turbo.md) | Alibaba Cloud   | 1000000   | [Qwen Turbo](https://aimlapi.com/models/qwen-turbo-api)  |
|  [qwen-max-2025-01-25](../text-models-llm/Alibaba-Cloud/qwen-max.md) | Alibaba Cloud   | 32000   | [Qwen Max 2025-01-25](https://aimlapi.com/models/qwen-max-2025-01-25-api)  |
|  [mistralai/mistral-tiny](../text-models-llm/Mistral-AI/mistral-tiny.md) | Mistral AI   | 32000   | [Mistral Tiny](https://aimlapi.com/models/mistral-tiny-api)  |
|  [x-ai/grok-beta](../text-models-llm/xAI/grok-beta.md) | X AI   | 131000   | [Grok-2 Beta](https://aimlapi.com/models/grok-2-beta-api)  |
|  [mistralai/mistral-nemo](../text-models-llm/Mistral-AI/mistral-nemo.md) | Mistral AI   | 128000   | [Mistral Nemo](https://aimlapi.com/models/mistral-nemo-api)  |
|  [neversleep/llama-3.1-lumimaid-70b](../text-models-llm/NeverSleep/llama-3.1-lumimaid.md) | Open Source   | 8000   | [Llama 3.1 Lumimaid 70b](https://aimlapi.com/models/llama-3-1-lumimaid-70b-api)  |
|  [anthracite-org/magnum-v4-72b](../text-models-llm/Anthracite/magnum-v4.md) | Anthracite   | 32000   | [Magnum v4 72B](https://aimlapi.com/models/magnum-v4-72b-api)  |
|  [nvidia/llama-3.1-nemotron-70b-instruct](../text-models-llm/NVIDIA/llama-3.1-nemotron-70b.md) | Nvidia   | 128000   | [Llama 3.1 Nemotron 70B Instruct](https://aimlapi.com/models/llama-3-1-nemotron-70b-instruct-api)  |
|  [cohere/command-r-plus](../text-models-llm/Cohere/command-r-plus.md) | Cohere   | 128000   | [Command R+](https://aimlapi.com/models/command-r-api)  |
|  [ai21/jamba-1-5-mini](../text-models-llm/AI21-Labs/jamba-1-5-mini.md) | AI21 Labs   | 256000   | [Jamba 1.5 Mini](https://aimlapi.com/models/jamba-1-5-mini-api)  |
|  [qwen/qvq-72b-preview](../text-models-llm/Alibaba-Cloud/qvq-72b-preview.md) | Qwen   | 32000   | [QVQ-72B-Preview](https://aimlapi.com/models/qvq-72b-preview-api)  |
|  [mistralai/codestral-2501](../text-models-llm/Mistral-AI/codestral-2501.md) | Mistral AI   | 256000   | [Mistral Codestral-2501](https://aimlapi.com/models/mistral-codestral-2501-api)  |
|  [MiniMax-Text-01](../text-models-llm/MiniMax/text-01.md) | Minimax AI   | 1000000   | [MiniMax-Text-01](https://aimlapi.com/models/minimax-text-01-api)  |
|  [abab6.5s-chat](../text-models-llm/MiniMax/abab6.5s-chat.md) | Minimax AI   | 245000   | -  |

### Image Models

| Model ID                | Developer     | Context | Model Card                        |
|-----------------------|-------------------|-------------------|-----------------------|
|  [dall-e-3](../image-models/OpenAI/dall-e-3.md) | Open AI   |    | [OpenAI DALL·E 3](https://aimlapi.com/models/openai-dall-e-3)  |
|  [dall-e-2](../image-models/OpenAI/dall-e-2.md) | Open AI   |    | [OpenAI DALL·E 2](https://aimlapi.com/models/openai-dall-e-2-api)  |
|  [stabilityai/stable-diffusion-xl-base-1.0](../image-models/Stability-AI/stable-diffusion-xl-base-1.0.md) | Stability AI   |    | [Stable Diffusion XL 1.0](https://aimlapi.com/models/stable-diffusion-xl-1-0)  |
|  [imagen-3.0-generate-002](../image-models/Google/imagen-3.0.md) | Google   |    | [Imagen 3](https://aimlapi.com/models/imagen-3-api)  |
|  [flux/schnell](../image-models/Black-Forest-Labs/flux-schnell.md) | Flux   |    | [FLUX.1 [schnell]](https://aimlapi.com/models/flux-1-schnell-api)  |
|  [flux-pro](../image-models/Black-Forest-Labs/flux-pro.md) | Flux   |    | [FLUX.1 [pro]](https://aimlapi.com/models/flux-1-pro-api)  |
|  [flux-pro/v1.1](../image-models/Black-Forest-Labs/flux-pro.md) | Flux   |    | [FLUX 1.1 [pro]](https://aimlapi.com/models/flux-1-1-pro-api)  |
|  [flux-pro/v1.1-ultra](../image-models/Black-Forest-Labs/flux-pro-v1.1-ultra.md) | Flux   |    | [FLUX 1.1 [pro ultra]](https://aimlapi.com/models/flux-1-1-pro-ultra-api)  |
|  [flux/dev](../image-models/Black-Forest-Labs/flux-dev.md) | Flux   |    | [FLUX.1 [dev]](https://aimlapi.com/models/flux-1-dev-api)  |
|  [flux/dev/image-to-image](../image-models/Black-Forest-Labs/flux-dev-image-to-image.md) | Flux   |    | -  |
|  [stable-diffusion-v3-medium](../image-models/Stability-AI/stable-diffusion-v3-medium.md) | Stability AI   |    | [Stable Diffusion 3](https://aimlapi.com/models/stable-diffusion-3-api)  |
|  [stable-diffusion-v35-large](../image-models/Stability-AI/stable-diffusion-v35-large.md) | Stability AI   |    | [Stable Diffusion 3.5 Large](https://aimlapi.com/models/stable-diffusion-3-5-large-api)  |
|  [flux-realism](../image-models/Black-Forest-Labs/flux-realism.md) | Flux   |    | [FLUX Realism LoRA](https://aimlapi.com/models/flux-realism-lora-api)  |
|  [recraft-v3](../image-models/RecraftAI/recraft-v3.md) | Recraft AI   |    | [Recraft v3](https://aimlapi.com/models/recraft-v3)  |

### Video Models

| Model ID                | Developer     | Context | Model Card                        |
|-----------------------|-------------------|-------------------|-----------------------|
|  [kling-video/v1/standard/image-to-video](../video-models/Kling-AI/v1-standard-image-to-video.md) | Kling AI   |    | [Kling AI (image-to-video)](https://aimlapi.com/models/kling-ai-image-to-video)  |
|  [kling-video/v1/standard/text-to-video](../video-models/Kling-AI/v1-standard-text-to-video.md) | Kling AI   |    | [Kling AI (text-to-video)](https://aimlapi.com/models/kling-ai-text-to-video-api)  |
|  [kling-video/v1/pro/image-to-video](../video-models/Kling-AI/v1-pro-image-to-video.md) | Kling AI   |    | [Kling AI (image-to-video)](https://aimlapi.com/models/kling-ai-image-to-video)  |
|  [kling-video/v1/pro/text-to-video](../video-models/Kling-AI/v1-pro-text-to-video.md) | Kling AI   |    | [Kling AI (text-to-video)](https://aimlapi.com/models/kling-ai-text-to-video-api)  |
|  [kling-video/v1.6/standard/text-to-video](../video-models/Kling-AI/v1.6-standard-text-to-video.md) | Kling AI   |    | [Kling 1.6 Standard](https://aimlapi.com/models/kling-1-6-standard)  |
|  [kling-video/v1.6/standard/image-to-video](../video-models/Kling-AI/v1.6-standart-image-to-video.md) | Kling AI   |    | [Kling 1.6 Standart](https://aimlapi.com/models/kling-1-6-standard)  |
|  [kling-video/v1.6/pro/image-to-video](../video-models/Kling-AI/v1.6-pro-image-to-video.md) | Kling AI   |    | [Kling 1.6 Pro](https://aimlapi.com/models/kling-1-6-pro-api)  |
|  [video-01](../video-models/MiniMax/video-01.md) | Minimax AI   |    | [MiniMax Video-01](https://aimlapi.com/models/minimax-video-01-api)  |
|  [video-01-live2d](../video-models/MiniMax/video-01-live2d.md) | Minimax AI   |    | -  |
|  [gen3a_turbo](../video-models/Runway/gen3a_turbo.md) | Runway ML   |    | [Runway Gen-3 turbo](https://aimlapi.com/models/runway-gen-3-turbo)  |

### Embedding Models

| Model ID                | Developer     | Context | Model Card                        |
|-----------------------|-------------------|-------------------|-----------------------|
|  [text-embedding-3-small](../embedding-models/OpenAI/text-embedding-3-small.md) | Open AI   | 8000   | -  |
|  [text-embedding-3-large](../embedding-models/OpenAI/text-embedding-3-large.md) | Open AI   | 8000   | [Text-embedding-3-large](https://aimlapi.com/models/text-embedding-3-large)  |
|  [text-embedding-ada-002](../embedding-models/OpenAI/text-embedding-ada-002.md) | Open AI   | 8000   | [Text-embedding-ada-002](https://aimlapi.com/models/text-embedding-ada-002)  |
|  [togethercomputer/m2-bert-80M-32k-retrieval](../embedding-models/Together-AI/m2-bert-80M-retrieval.md) | Together AI   | 32000   | [M2-BERT-Retrieval-32k](https://aimlapi.com/models/m2-bert-retrieval-32k)  |
|  [BAAI/bge-base-en-v1.5](../embedding-models/BAAI/bge-base-en.md) | BAAI   |    | [BAAI-Bge-Base-1p5](https://aimlapi.com/models/baai-bge-base-1p5)  |
|  [togethercomputer/m2-bert-80M-2k-retrieval](../embedding-models/Together-AI/m2-bert-80M-retrieval.md) | Together AI   |    | [M2-BERT-Retrieval-2K](https://aimlapi.com/models/m2-bert-retrieval-2k)  |
|  [BAAI/bge-large-en-v1.5](../embedding-models/BAAI/bge-large-en.md) | BAAI   |    | [bge-large-en](https://aimlapi.com/models/baai-bge-large-1p5)  |
|  [togethercomputer/m2-bert-80M-8k-retrieval](../embedding-models/Together-AI/m2-bert-80M-retrieval.md) | Together AI   | 8000   | [M2-BERT-Retrieval-8k](https://aimlapi.com/models/m2-bert-retrieval-8k)  |
|  [voyage-large-2-instruct](../embedding-models/Anthropic/voyage-large-2-instruct.md) | Anthropic   | 16000   | [Voyage Large 2 Instruct](https://aimlapi.com/models/voyage-large-2-instruct-api)  |
|  [voyage-finance-2](../embedding-models/Anthropic/voyage-finance-2.md) | Anthropic   | 32000   | -  |
|  [voyage-multilingual-2](../embedding-models/Anthropic/voyage-multilingual-2.md) | Anthropic   | 32000   | -  |
|  [voyage-law-2](../embedding-models/Anthropic/voyage-law-2.md) | Anthropic   | 16000   | -  |
|  [voyage-code-2](../embedding-models/Anthropic/voyage-code-2.md) | Anthropic   | 16000   | -  |
|  [voyage-large-2](../embedding-models/Anthropic/voyage-large-2.md) | Anthropic   | 16000   | -  |
|  [voyage-2](../embedding-models/Anthropic/voyage-2.md) | Anthropic   | 4000   | -  |
|  [textembedding-gecko@001](../embedding-models/Google/textembedding-gecko.md) | Google   | 3000   | -  |
|  [textembedding-gecko@003](../embedding-models/Google/textembedding-gecko.md) | Google   | 2000   | [Textembedding-gecko@003](https://aimlapi.com/models/textembedding-gecko-003-api)  |
|  [textembedding-gecko-multilingual@001](../embedding-models/Google/textembedding-gecko.md) | Google   | 2000   | [Textembedding-gecko-multilingual@001](https://aimlapi.com/models/textembedding-gecko-multilingual-001-api)  |
|  [text-multilingual-embedding-002](../embedding-models/Google/text-multilingual-embedding-002.md) | Google   | 2000   | -  |

### Voice/Speech Models
#### Text-to-Speech
| Model ID                | Developer     | Context | Model Card                        |
|-----------------------|-------------------|-------------------|-----------------------|
|  [#g1_aura-asteria-en](../speech-voice-models/tts/Deepgram/aura.md) | Deepgram   |    | [Aura](https://aimlapi.com/models/aura)  |
|  [#g1_aura-hera-en](../speech-voice-models/tts/Deepgram/aura.md) | Deepgram   |    | [Aura](https://aimlapi.com/models/aura)  |
|  [#g1_aura-luna-en](../speech-voice-models/tts/Deepgram/aura.md) | Deepgram   |    | [Aura](https://aimlapi.com/models/aura)  |
|  [#g1_aura-stella-en](../speech-voice-models/tts/Deepgram/aura.md) | Deepgram   |    | [Aura](https://aimlapi.com/models/aura)  |
|  [#g1_aura-athena-en](../speech-voice-models/tts/Deepgram/aura.md) | Deepgram   |    | [Aura](https://aimlapi.com/models/aura)  |
|  [#g1_aura-zeus-en](../speech-voice-models/tts/Deepgram/aura.md) | Deepgram   |    | [Aura](https://aimlapi.com/models/aura)  |
|  [#g1_aura-orion-en](../speech-voice-models/tts/Deepgram/aura.md) | Deepgram   |    | [Aura](https://aimlapi.com/models/aura)  |
|  [#g1_aura-arcas-en](../speech-voice-models/tts/Deepgram/aura.md) | Deepgram   |    | [Aura](https://aimlapi.com/models/aura)  |
|  [#g1_aura-perseus-en](../speech-voice-models/tts/Deepgram/aura.md) | Deepgram   |    | [Aura](https://aimlapi.com/models/aura)  |
|  [#g1_aura-angus-en](../speech-voice-models/tts/Deepgram/aura.md) | Deepgram   |    | [Aura](https://aimlapi.com/models/aura)  |
|  [#g1_aura-orpheus-en](../speech-voice-models/tts/Deepgram/aura.md) | Deepgram   |    | [Aura](https://aimlapi.com/models/aura)  |
|  [#g1_aura-helios-en](../speech-voice-models/tts/Deepgram/aura.md) | Deepgram   |    | [Aura](https://aimlapi.com/models/aura)  |
#### Speech-to-Text
| Model ID                | Developer     | Context | Model Card                        |
|-----------------------|-------------------|-------------------|-----------------------|
|  [#g1_nova-2-general](../speech-voice-models/stt/Deepgram/nova-2.md) | Deepgram   |    | [Deepgram Nova-2](https://aimlapi.com/models/deepgram-nova-2)  |
|  [#g1_nova-2-meeting](../speech-voice-models/stt/Deepgram/nova-2.md) | Deepgram   |    | [Deepgram Nova-2](https://aimlapi.com/models/deepgram-nova-2)  |
|  [#g1_nova-2-phonecall](../speech-voice-models/stt/Deepgram/nova-2.md) | Deepgram   |    | [Deepgram Nova-2](https://aimlapi.com/models/deepgram-nova-2)  |
|  [#g1_nova-2-voicemail](../speech-voice-models/stt/Deepgram/nova-2.md) | Deepgram   |    | [Deepgram Nova-2](https://aimlapi.com/models/deepgram-nova-2)  |
|  [#g1_nova-2-finance](../speech-voice-models/stt/Deepgram/nova-2.md) | Deepgram   |    | [Deepgram Nova-2](https://aimlapi.com/models/deepgram-nova-2)  |
|  [#g1_nova-2-conversationalai](../speech-voice-models/stt/Deepgram/nova-2.md) | Deepgram   |    | [Deepgram Nova-2](https://aimlapi.com/models/deepgram-nova-2)  |
|  [#g1_nova-2-video](../speech-voice-models/stt/Deepgram/nova-2.md) | Deepgram   |    | [Deepgram Nova-2](https://aimlapi.com/models/deepgram-nova-2)  |
|  [#g1_nova-2-medical](../speech-voice-models/stt/Deepgram/nova-2.md) | Deepgram   |    | [Deepgram Nova-2](https://aimlapi.com/models/deepgram-nova-2)  |
|  [#g1_nova-2-drivethru](../speech-voice-models/stt/Deepgram/nova-2.md) | Deepgram   |    | [Deepgram Nova-2](https://aimlapi.com/models/deepgram-nova-2)  |
|  [#g1_nova-2-automotive](../speech-voice-models/stt/Deepgram/nova-2.md) | Deepgram   |    | [Deepgram Nova-2](https://aimlapi.com/models/deepgram-nova-2)  |
|  [#g1_whisper-large](../speech-voice-models/stt/OpenAI/whisper-large.md) | Deepgram   |    | [Whisper](https://aimlapi.com/models/whisper)  |
|  [#g1_whisper-medium](../speech-voice-models/stt/OpenAI/whisper-medium.md) | Deepgram   |    | -  |
|  [#g1_whisper-small](../speech-voice-models/stt/OpenAI/whisper-small.md) | Deepgram   |    | -  |
|  [#g1_whisper-tiny](../speech-voice-models/stt/OpenAI/whisper-tiny.md) | Deepgram   |    | -  |
|  [#g1_whisper-base](../speech-voice-models/stt/OpenAI/whisper-base.md) | Deepgram   |    | -  |

### Music Models

| Model ID                | Developer     | Context | Model Card                        |
|-----------------------|-------------------|-------------------|-----------------------|
|  [stable-audio](../music-models/Stability-AI/stable-audio.md) | Stability AI   |    | [Stable Audio](https://aimlapi.com/models/stable-audio)  |
|  [minimax-music](../music-models/MiniMax/minimax-music-[legacy].md) | Minimax AI   |    | -  |
|  [music-01](../music-models/MiniMax/music-01.md) | Minimax AI   |    | [MiniMax Music](https://aimlapi.com/models/minimax-music-api)  |

### Content Moderation Models

| Model ID                | Developer     | Context | Model Card                        |
|-----------------------|-------------------|-------------------|-----------------------|
|  [Meta-Llama/Llama-Guard-7b](../moderation-safety-models/Meta/Llama-Guard-7b.md) | Meta   | 4000   | [Llama Guard (7B)](https://aimlapi.com/models/llama-guard-7b)  |
|  [meta-llama/Llama-Guard-3-11B-Vision-Turbo](../moderation-safety-models/Meta/Llama-Guard-3-11B-Vision-Turbo.md) | Meta   | 128000   | -  |
|  [meta-llama/LlamaGuard-2-8b](../moderation-safety-models/Meta/LlamaGuard-2-8b.md) | Meta   | 8000   | [LlamaGuard 2 (8b)](https://aimlapi.com/models/llama-guard-2-8b)  |
|  [meta-llama/Meta-Llama-Guard-3-8B](../moderation-safety-models/Meta/Meta-Llama-Guard-3-8B.md) | Meta   | 8000   | [Llama Guard 3 (8B)](https://aimlapi.com/models/llama-guard-3-8b)  |

### 3D-Generating Models

| Model ID                | Developer     | Context | Model Card                        |
|-----------------------|-------------------|-------------------|-----------------------|
|  [triposr](../3d-generating-models/Stability-AI/triposr.md) | Tripo AI   |    | [Stable TripoSR 3D](https://aimlapi.com/models/stable-tripo-sr-api)  |

### Web Search Models

| Model ID                | Developer     | Context | Model Card                        |
|-----------------------|-------------------|-------------------|-----------------------|
|  [bagoodex/bagoodex-search-v1](../web-search-models/Bagoodex/bagoodex-search-v1.md) | Bagoodex   | 32000   | [Bagoodex Web Search v1](https://aimlapi.com/models/bagoodex-search-v1-api)  |


[#references:end]: <> ({})
