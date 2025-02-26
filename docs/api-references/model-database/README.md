---
icon: crystal-ball
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

The section **Model IDs** lists the identifiers of all available and deprecated models, grouped by category. These IDs are used to specify the exact models in your code, like this:&#x20;

<figure><img src="../../.gitbook/assets/image (3).png" alt=""><figcaption></figcaption></figure>

If you already know the identifier, use the page search function (<kbd>Ctrl+F</kbd> for Win/Linux, <kbd>Command+F</kbd> for Mac) to locate it.&#x20;

{% hint style="success" %}
**New Model Request**

Can't find the model you need? Join our [Discord community](https://discord.gg/8CwhkUuCR6) to propose new models for integration into our API offerings. Your contributions help us grow and serve you better.
{% endhint %}

## Get Model List via API&#x20;

{% openapi src="https://api.aimlapi.com/docs-public-yaml?key=2b878a3c71a785f13366e9be96bacb29" path="/models" method="get" %}
[https://api.aimlapi.com/docs-public-yaml?key=2b878a3c71a785f13366e9be96bacb29](https://api.aimlapi.com/docs-public-yaml?key=2b878a3c71a785f13366e9be96bacb29)
{% endopenapi %}

## Full List of Model IDs

### Text Models

#### Chat Completion Models

| ID                                             | Developer        |
| ---------------------------------------------- | ---------------- |
| gpt-4o                                         | openai           |
| gpt-4o-2024-08-06                              | openai           |
| gpt-4o-2024-05-13                              | openai           |
| gpt-4o-mini                                    | openai           |
| gpt-4o-mini-2024-07-18                         | openai           |
| chatgpt-4o-latest                              | openai           |
| gpt-4-turbo                                    | openai           |
| gpt-4-turbo-2024-04-09                         | openai           |
| gpt-4                                          | openai           |
| gpt-4-0125-preview                             | openai           |
| gpt-4-1106-preview                             | openai           |
| gpt-3.5-turbo                                  | openai           |
| gpt-3.5-turbo-0125                             | openai           |
| gpt-3.5-turbo-1106                             | openai           |
| o1-preview                                     | openai           |
| o1-preview-2024-09-12                          | openai           |
| o1-mini                                        | openai           |
| o1-mini-2024-09-12                             | openai           |
| codellama/CodeLlama-34b-Instruct-hf            | codellama        |
| upstage/SOLAR-10.7B-Instruct-v1.0              | upstage          |
| meta-llama/Meta-Llama-Guard-3-8B               | Meta             |
| google/gemma-2b-it                             | Google           |
| Gryphe/MythoMax-L2-13b                         | GrypheAI         |
| meta-llama/LlamaGuard-2-8b                     | Meta             |
| mistralai/Mistral-7B-Instruct-v0.1             | mistralai        |
| mistralai/Mistral-7B-Instruct-v0.2             | mistralai        |
| deepseek-ai/deepseek-llm-67b-chat              | deepseek-ai      |
| Qwen/Qwen2-72B-Instruct                        | Qwen             |
| mistralai/Mistral-7B-Instruct-v0.3             | mistralai        |
| meta-llama/Llama-2-13b-chat-hf                 | Meta             |
| Meta-Llama/Llama-Guard-7b                      | Meta             |
| meta-llama/Meta-Llama-3-70B-Instruct-Lite      | Meta             |
| google/gemma-2-27b-it                          | Google           |
| meta-llama/Llama-3-8b-chat-hf                  | Meta             |
| mistralai/Mixtral-8x7B-Instruct-v0.1           | mistralai        |
| microsoft/WizardLM-2-8x22B                     | Microsoft        |
| meta-llama/Llama-3-70b-chat-hf                 | Meta             |
| llava-hf/llava-v1.6-mistral-7b-hf              | llava-hf         |
| databricks/dbrx-instruct                       | databricks       |
| NousResearch/Nous-Hermes-2-Mixtral-8x7B-DPO    | NousResearch     |
| meta-llama/Meta-Llama-3-8B-Instruct-Turbo      | Meta             |
| meta-llama/Meta-Llama-3-8B-Instruct-Lite       | Meta             |
| Gryphe/MythoMax-L2-13b-Lite                    | GrypheAI         |
| Qwen/Qwen1.5-110B-Chat                         | Qwen             |
| meta-llama/Meta-Llama-3-70B-Instruct-Turbo     | Meta             |
| meta-llama/Meta-Llama-3.1-405B-Instruct-Turbo  | Meta             |
| Qwen/Qwen1.5-72B-Chat                          | Qwen             |
| meta-llama/Llama-3.2-90B-Vision-Instruct-Turbo | Meta             |
| Qwen/Qwen2.5-7B-Instruct-Turbo                 | Qwen             |
| meta-llama/Llama-Vision-Free                   | Meta             |
| Qwen/Qwen2.5-72B-Instruct-Turbo                | Qwen             |
| google/gemma-2-9b-it                           | Google           |
| meta-llama/Meta-Llama-3.1-70B-Instruct-Turbo   | Meta             |
| mistralai/Mixtral-8x22B-Instruct-v0.1          | mistralai        |
| meta-llama/Llama-Guard-3-11B-Vision-Turbo      | Meta             |
| meta-llama/Llama-3.2-3B-Instruct-Turbo         | Meta             |
| meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo    | Meta             |
| meta-llama/Llama-3.2-11B-Vision-Instruct-Turbo | Meta             |
| togethercomputer/CodeLlama-34b-Instruct        | togethercomputer |
| togethercomputer/llama-2-13b-chat              | togethercomputer |
| togethercomputer/llama-2-7b-chat               | togethercomputer |
| claude-3-opus-20240229                         | anthropic        |
| claude-3-sonnet-20240229                       | anthropic        |
| claude-3-haiku-20240307                        | anthropic        |
| claude-3-5-sonnet-20240620                     | anthropic        |
| claude-3-5-sonnet-20241022                     | anthropic        |
| claude-3-5-haiku-20241022                      | anthropic        |
| anthropic/claude-3.5-sonnet-20240620           | anthropic        |
| anthropic/claude-3.5-sonnet-20241022           | anthropic        |
| anthropic/claude-3.5-sonnet                    | anthropic        |
| claude-3-5-sonnet-latest                       | anthropic        |
| anthropic/claude-3-haiku-20240307              | anthropic        |
| anthropic/claude-3-haiku                       | anthropic        |
| claude-3-haiku-latest                          | anthropic        |
| anthropic/claude-3-opus-20240229               | anthropic        |
| anthropic/claude-3-opus                        | anthropic        |
| claude-3-opus-latest                           | anthropic        |
| anthropic/claude-3-sonnet-20240229             | anthropic        |
| anthropic/claude-3-sonnet                      | anthropic        |
| claude-3-sonnet-latest                         | anthropic        |
| anthropic/claude-3-5-haiku-20241022            | anthropic        |
| anthropic/claude-3-5-haiku                     | anthropic        |
| claude-3-5-haiku-latest                        | anthropic        |
| gemini-1.5-flash                               | google           |
| gemini-1.5-pro                                 | google           |
| gemini-pro                                     | google           |
| gemini-2.0-flash-exp                           | google           |
| mistralai/mistral-tiny                         | mistralai        |
| x-ai/grok-beta                                 | x-ai             |
| mistralai/mistral-nemo                         | mistralai        |
| neversleep/llama-3.1-lumimaid-70b              | neversleep       |
| anthracite-org/magnum-v4-72b                   | anthracite-org   |
| nvidia/llama-3.1-nemotron-70b-instruct         | nvidia           |
| eva-unit-01/eva-qwen-2.5-14b                   | qwen             |
| cohere/command-r-plus                          | cohere           |
| ai21/jamba-1-5-mini                            | ai21             |
| deepseek/deepseek-chat                         | deepseek         |
| qwen/qvq-72b-preview                           | qwen             |

### Image Models

| ID                                       | Developer   |
| ---------------------------------------- | ----------- |
| dall-e-3                                 | openai      |
| dall-e-2                                 | openai      |
| stabilityai/stable-diffusion-xl-base-1.0 | stabilityai |
| flux/schnell                             | Flux        |
| flux-pro                                 | Flux        |
| flux-pro/v1.1                            | Flux        |
| flux-pro/v1.1-ultra                      | Flux        |
| flux/dev                                 | Flux        |
| flux/dev/image-to-image                  | Flux        |
| stable-diffusion-v3-medium               | stabilityai |
| stable-diffusion-v35-large               | stabilityai |
| flux-realism                             | Flux        |
| recraft-v3                               | recraft     |
| triposr                                  | tripo       |

### Video Models

| ID                                                          | Developer |
| ----------------------------------------------------------- | --------- |
| [runway-gen3/turbo/image-to-video](../video-models/runway/) | Runway    |
| [luma-ai](../video-models/luma-ai-v2/)                      | Luma-ai   |

### Web Search Models

| ID                                                                                                                 | Developer |
| ------------------------------------------------------------------------------------------------------------------ | --------- |
| [bagoodex-search-v1](https://docs.aimlapi.com/api-overview/web-search-models/bagoodex/bagoodex-bagoodex-search-v1) | Bagoodex  |

### Voice/Speech Models

#### Text-To-Speech

| ID                   | Developer |
| -------------------- | --------- |
| #g1\_aura-asteria-en | deepgram  |
| #g1\_aura-hera-en    | deepgram  |
| #g1\_aura-luna-en    | deepgram  |
| #g1\_aura-stella-en  | deepgram  |
| #g1\_aura-athena-en  | deepgram  |
| #g1\_aura-zeus-en    | deepgram  |
| #g1\_aura-orion-en   | deepgram  |
| #g1\_aura-arcas-en   | deepgram  |
| #g1\_aura-perseus-en | deepgram  |
| #g1\_aura-angus-en   | deepgram  |
| #g1\_aura-orpheus-en | deepgram  |
| #g1\_aura-helios-en  | deepgram  |

#### Speech-To-Text

| id                           | Developer |
| ---------------------------- | --------- |
| #g1\_nova-2-general          | deepgram  |
| #g1\_nova-2-meeting          | deepgram  |
| #g1\_nova-2-phonecall        | deepgram  |
| #g1\_nova-2-voicemail        | deepgram  |
| #g1\_nova-2-finance          | deepgram  |
| #g1\_nova-2-conversationalai | deepgram  |
| #g1\_nova-2-video            | deepgram  |
| #g1\_nova-2-medical          | deepgram  |
| #g1\_nova-2-drivethru        | deepgram  |
| #g1\_nova-2-automotive       | deepgram  |
| #g1\_whisper-large           | deepgram  |
| #g1\_whisper-medium          | deepgram  |
| #g1\_whisper-small           | deepgram  |
| #g1\_whisper-tiny            | deepgram  |
| #g1\_whisper-base            | deepgram  |
| #g1\_redaction               | deepgram  |

### Vision Models

| ID                                             | Developer  |
| ---------------------------------------------- | ---------- |
| gpt-4o                                         | open-ai    |
| gpt-4o-2024-08-06                              | open-ai    |
| gpt-4o-2024-05-13                              | open-ai    |
| gpt-4o-mini                                    | open-ai    |
| gpt-4o-mini-2024-07-18                         | open-ai    |
| gpt-4-turbo                                    | open-ai    |
| gpt-4-turbo-2024-04-09                         | open-ai    |
| meta-llama/Llama-3.2-90B-Vision-Instruct-Turbo | Meta       |
| meta-llama/Llama-Vision-Free                   | Meta       |
| meta-llama/Llama-3.2-11B-Vision-Instruct-Turbo | Meta       |
| gemini-1.5-flash                               | Google     |
| gemini-1.5-pro                                 | Google     |
| claude-3-5-sonnet-latest                       | anthropic  |
| claude-3-haiku-latest                          | anthropic  |
| claude-3-opus-latest                           | anthropic  |
| claude-3-sonnet-latest                         | anthropic  |
| claude-3-5-haiku-latest                        | anthropic  |
| qwen/qvq-72b-preview                           | openrouter |

### Embedding Models

| ID                                         | Developer        |
| ------------------------------------------ | ---------------- |
| text-embedding-3-small                     | openai           |
| text-embedding-3-large                     | openai           |
| text-embedding-ada-002                     | openai           |
| togethercomputer/m2-bert-80M-32k-retrieval | togethercomputer |
| BAAI/bge-base-en-v1.5                      | BAAI             |
| togethercomputer/m2-bert-80M-2k-retrieval  | togethercomputer |
| BAAI/bge-large-en-v1.5                     | BAAI             |
| togethercomputer/m2-bert-80M-8k-retrieval  | togethercomputer |
| voyage-large-2-instruct                    | anthropic        |
| voyage-finance-2                           | anthropic        |
| voyage-multilingual-2                      | anthropic        |
| voyage-law-2                               | anthropic        |
| voyage-code-2                              | anthropic        |
| voyage-large-2                             | anthropic        |
| voyage-2                                   | anthropic        |
| textembedding-gecko@001                    | gemini           |
| textembedding-gecko@003                    | gemini           |
| textembedding-gecko-multilingual@001       | gemini           |
| text-multilingual-embedding-002            | gemini           |

### Content Moderation/Safety Models

| ID                                        | Developer |
| ----------------------------------------- | --------- |
| meta-llama/Meta-Llama-Guard-3-8B          | Meta      |
| Meta-Llama/Llama-Guard-7b                 | Meta      |
| meta-llama/Llama-Guard-3-11B-Vision-Turbo | Meta      |
| meta-llama/LlamaGuard-2-8b                | Meta      |

### 3D-Generating Models

| ID      | Developer    |
| ------- | ------------ |
| triposr | Stability AI |
