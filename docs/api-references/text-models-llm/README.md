---
description: Overview of the capabilities of AIML API text models (LLMs).
icon: text-size
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

# Text Models (LLM)

<details>

<summary>Overview</summary>

The AI/ML API provides access to text-based models, also known as **Large Language Models** (**LLM**s), and allows you to interact with them through natural language (that's why a third common name for such models is **chat models**). These models can be applied to various tasks, enabling the creation of diverse applications using our API. For example, text models can be used to:

* Create a system that searches your photos using text prompts.
* Act as a psychological supporter.
* Play games with you through natural language.
* Assist you with coding.
* Perform a security assessment (pentests) on servers for vulnerabilities.
* Write documentation for your services.
* Serve as a grammar corrector for multiple languages with deep context understanding.
* And much more.

</details>

<details>

<summary>Specific Capabilities</summary>

There are several capabilities of text models that are worth mentioning separately.

**Completion** allows the model to analyze a given text fragment and predict how it might continue based on the probabilities of the next possible tokens or characters. **Chat Completion** extends this functionality, enabling a simulated dialogue between the user and the model based on predefined roles (e.g., "strict language teacher" and "student"). A detailed description and examples can be found in our [Completion and Chat Completion](../../capabilities/completion-or-chat-models.md) article.

***

An evolution of chat completion includes **Assistants** (preconfigured conversational agents with specific roles) and **Threads** (a mechanism for maintaining conversation history for context). Examples of this functionality can be found in the [Managing Assistants & Threads](../../solutions/openai/assistants/) article.

***

**Function Calling** allows a chat model to invoke external programmatic tools (e.g., a function you have written) while generating a response. A detailed description and examples are available in the [Function Calling](../../capabilities/function-calling.md) article.

</details>

<details>

<summary>Endpoint</summary>

All text and chat models use the same endpoint:&#x20;

<img src="../../.gitbook/assets/POST.png" alt="" data-size="line">  [https://api.aimlapi.com/v1/chat/completions](https://api.aimlapi.com/v1/chat/completions)&#x20;

The parameters may vary (especially for models from different developers), so it’s best to check the API schema on each model’s page for details. Example: [**o4-mini**](openai/o4-mini.md#api-schema).

</details>

<details>

<summary><span data-gb-custom-inline data-tag="emoji" data-code="2705">✅</span>  Quick Code Example</summary>

We will call the [**gpt-4o**](OpenAI/gpt-4o.md) model using the Python programming language and the OpenAI SDK.

{% hint style="info" %}
If you need a more detailed explanation of how to call a model's API in code, check out our [<mark style="color:blue;">QUICKSTART</mark>](broken-reference) section.
{% endhint %}

{% code overflow="wrap" %}
```python
%pip install openai
import os
from openai import OpenAI

client = OpenAI(
    base_url="https://api.aimlapi.com/v1",

    # Insert your AIML API Key in the quotation marks instead of <YOUR_AIMLAPI_KEY>:
    api_key="<YOUR_AIMLAPI_KEY>",  
)

response = client.chat.completions.create(
    model="gpt-4o",
    messages=[
        {
            "role": "system",
            "content": "You are an AI assistant who knows everything.",
        },
        {
            "role": "user",
            "content": "Tell me, why is the sky blue?"
        },
    ],
)

message = response.choices[0].message.content

print(f"Assistant: {message}")
```
{% endcode %}

By running this code example, we received the following response from the chat model:

{% code overflow="wrap" %}
```http
Assistant: The sky appears blue due to a phenomenon called Rayleigh scattering. When sunlight enters Earth's atmosphere, it collides with gas molecules and small particles. Sunlight is made up of different colors, each with different wavelengths. Blue light has a shorter wavelength and is scattered in all directions by the gas molecules in the atmosphere more than other colors with longer wavelengths, such as red or yellow.
As a result, when you look up at the sky during the day, you see this scattered blue light being dispersed in all directions, making the sky appear blue to our eyes. During sunrise and sunset, the sun's light passes through a greater thickness of Earth's atmosphere, scattering the shorter blue wavelengths out of your line of sight and leaving the longer wavelengths, like red and orange, more dominant, which is why the sky often turns those colors at those times.
```
{% endcode %}

</details>

<details>

<summary>Complete Text Model List</summary>

<table><thead><tr><th width="297.4000244140625">Model ID</th><th width="115.20001220703125">Developer</th><th width="97.79998779296875">Context</th><th>Model Card</th></tr></thead><tbody><tr><td><a href="OpenAI/gpt-4o.md">gpt-4o</a></td><td>Open AI</td><td>128000</td><td><a href="https://aimlapi.com/models/chat-gpt-4-omni">Chat GPT-4o</a></td></tr><tr><td><a href="OpenAI/gpt-4o.md">gpt-4o-2024-08-06</a></td><td>Open AI</td><td>128000</td><td><a href="https://aimlapi.com/models/gpt-4o-2024-08-06-api">GPT-4o-2024-08-06</a></td></tr><tr><td><a href="OpenAI/gpt-4o.md">gpt-4o-2024-05-13</a></td><td>Open AI</td><td>128000</td><td><a href="https://aimlapi.com/models/gpt-4o-2024-05-13-api">GPT-4o-2024-05-13</a></td></tr><tr><td><a href="OpenAI/gpt-4o-mini.md">gpt-4o-mini</a></td><td>Open AI</td><td>128000</td><td><a href="https://aimlapi.com/models/chat-gpt-4o-mini">Chat GPT 4o mini</a></td></tr><tr><td><a href="OpenAI/gpt-4o-mini.md">gpt-4o-mini-2024-07-18</a></td><td>Open AI</td><td>128000</td><td>-</td></tr><tr><td><a href="OpenAI/gpt-4o.md">chatgpt-4o-latest</a></td><td>Open AI</td><td>128000</td><td>-</td></tr><tr><td><a href="openai/gpt-4o-audio-preview.md">gpt-4o-audio-preview</a></td><td>Open AI</td><td>128000</td><td><a href="https://aimlapi.com/models/gpt-4o-audio-preview-api">GPT-4o Audio Preview</a></td></tr><tr><td><a href="openai/gpt-4o-mini-audio-preview.md">gpt-4o-mini-audio-preview</a></td><td>Open AI</td><td>128000</td><td><a href="https://aimlapi.com/models/gpt-4o-mini-audio-api">GPT-4o mini Audio</a></td></tr><tr><td><a href="openai/gpt-4o-search-preview.md">gpt-4o-search-preview</a></td><td>Open AI</td><td>128000</td><td><a href="https://aimlapi.com/models/gpt-4o-search-preview-api">GPT-4o Search Preview</a></td></tr><tr><td><a href="openai/gpt-4o-mini-search-preview.md">gpt-4o-mini-search-preview</a></td><td>Open AI</td><td>128000</td><td><a href="https://aimlapi.com/models/gpt-4o-mini-search-preview-api">GPT-4o Mini Search Preview</a></td></tr><tr><td><a href="OpenAI/gpt-4-turbo.md">gpt-4-turbo</a></td><td>Open AI</td><td>128000</td><td><a href="https://aimlapi.com/models/chat-gpt-4-turbo">Chat GPT 4 Turbo</a></td></tr><tr><td><a href="OpenAI/gpt-4-turbo.md">gpt-4-turbo-2024-04-09</a></td><td>Open AI</td><td>128000</td><td>-</td></tr><tr><td><a href="OpenAI/gpt-4.md">gpt-4</a></td><td>Open AI</td><td>8000</td><td><a href="https://aimlapi.com/models/chat-gpt-4">Chat GPT 4</a></td></tr><tr><td><a href="OpenAI/gpt-4-preview.md">gpt-4-0125-preview</a></td><td>Open AI</td><td>8000</td><td>-</td></tr><tr><td><a href="OpenAI/gpt-4-preview.md">gpt-4-1106-preview</a></td><td>Open AI</td><td>8000</td><td>-</td></tr><tr><td><a href="OpenAI/gpt-3.5-turbo.md">gpt-3.5-turbo</a></td><td>Open AI</td><td>16000</td><td><a href="https://aimlapi.com/models/chat-gpt-3-5">Chat GPT 3.5 Turbo</a></td></tr><tr><td><a href="OpenAI/gpt-3.5-turbo.md">gpt-3.5-turbo-0125</a></td><td>Open AI</td><td>16000</td><td><a href="https://aimlapi.com/models/chat-gpt-3-5-turbo-0125">Chat GPT-3.5 Turbo 0125</a></td></tr><tr><td><a href="OpenAI/gpt-3.5-turbo.md">gpt-3.5-turbo-1106</a></td><td>Open AI</td><td>16000</td><td><a href="https://aimlapi.com/models/chat-gpt-3-5-turbo-1106">Chat GPT-3.5 Turbo 1106</a></td></tr><tr><td><a href="OpenAI/o1.md">o1</a></td><td>Open AI</td><td>200000</td><td><a href="https://aimlapi.com/models/openai-o1-api">OpenAI o1</a></td></tr><tr><td><a href="OpenAI/o1-preview.md">o1-preview</a></td><td>Open AI</td><td>128000</td><td><a href="https://aimlapi.com/models/openai-o1-preview-api">OpenAI o1-preview</a></td></tr><tr><td><a href="OpenAI/o1-preview.md">o1-preview-2024-09-12</a></td><td>Open AI</td><td>128000</td><td>-</td></tr><tr><td><a href="OpenAI/o1-mini.md">o1-mini</a></td><td>Open AI</td><td>128000</td><td><a href="https://aimlapi.com/models/openai-o1-mini-api">OpenAI o1-mini</a></td></tr><tr><td><a href="OpenAI/o1-mini.md">o1-mini-2024-09-12</a></td><td>Open AI</td><td>128000</td><td>-</td></tr><tr><td><a href="OpenAI/o3-mini.md">o3-mini</a></td><td>Open AI</td><td>200000</td><td><a href="https://aimlapi.com/models/openai-o3-mini-api">OpenAI o3 mini</a></td></tr><tr><td><a href="OpenAI/gpt-4.5-preview.md">gpt-4.5-preview</a></td><td>Open AI</td><td>128000</td><td><a href="https://aimlapi.com/models/chat-gpt-4-5-preview-api">Chat GPT 4.5 preview</a></td></tr><tr><td><a href="openai/gpt-4.1.md">openai/gpt-4.1-2025-04-14</a></td><td>Open AI</td><td>1000000</td><td><a href="https://aimlapi.com/models/gpt-4-1">GPT-4.1</a></td></tr><tr><td><a href="openai/gpt-4.1-mini.md">openai/gpt-4.1-mini-2025-04-14</a></td><td>Open AI</td><td>1000000</td><td><a href="https://aimlapi.com/models/gpt-4-1-mini-api">GPT-4.1 Mini</a></td></tr><tr><td><a href="openai/gpt-4.1-nano.md">openai/gpt-4.1-nano-2025-04-14</a></td><td>Open AI</td><td>1000000</td><td><a href="https://aimlapi.com/models/gpt-4-1-nano-api">GPT-4.1 Nano</a></td></tr><tr><td><a href="openai/o4-mini.md">openai/o4-mini-2025-04-16</a></td><td>Open AI</td><td>200000</td><td><a href="https://aimlapi.com/models/gpt-o4-mini-2025-04-16">GPT-o4-mini-2025-04-16</a></td></tr><tr><td><a href="DeepSeek/deepseek-chat.md">DeepSeek V3</a></td><td>DeepSeek</td><td>128000</td><td><a href="https://aimlapi.com/models/deepseek-v3">DeepSeek V3</a></td></tr><tr><td><a href="DeepSeek/deepseek-r1.md">DeepSeek R1</a></td><td>DeepSeek</td><td>128000</td><td><a href="https://aimlapi.com/models/deepseek-r1-api">DeepSeek R1</a></td></tr><tr><td><a href="Meta/Llama-3.2-90B-Vision-Instruct-Turbo.md">meta-llama/Llama-3.2-90B-Vision-Instruct-Turbo</a></td><td>Meta</td><td>131000</td><td><a href="https://aimlapi.com/models/llama-3-2-90b-vision-instruct-turbo-api">Llama 3.2 90B Vision Instruct Turbo</a></td></tr><tr><td><a href="Google/gemma-2-27b-it.md">google/gemma-2-27b-it</a></td><td>Google</td><td>8000</td><td><a href="https://aimlapi.com/models/gemma-2-27b">Gemma 2 (27b)</a></td></tr><tr><td><a href="Meta/Llama-Vision-Free.md">meta-llama/Llama-Vision-Free</a></td><td>Meta</td><td>128000</td><td>-</td></tr><tr><td><a href="Mistral-AI/Mixtral-8x22B-Instruct.md">mistralai/Mixtral-8x22B-Instruct-v0.1</a></td><td>Mistral AI</td><td>64000</td><td><a href="https://aimlapi.com/models/mixtral-8x22b-instruct">Mixtral 8x22B Instruct</a></td></tr><tr><td><a href="Alibaba-Cloud/Qwen2-72B-Instruct.md">Qwen/Qwen2-72B-Instruct</a></td><td>Alibaba Cloud</td><td>32000</td><td><a href="https://aimlapi.com/models/qwen-2-instruct-72b">Qwen 2 Instruct (72B)</a></td></tr><tr><td><a href="Mistral-AI/Mixtral-8x7B-Instruct-v0.1.md">mistralai/Mixtral-8x7B-Instruct-v0.1</a></td><td>Mistral AI</td><td>64000</td><td><a href="https://aimlapi.com/models/mixtral-8x7b-instruct-v01">Mixtral-8x7B Instruct v0.1</a></td></tr><tr><td><a href="NVIDIA/Llama-3.1-Nemotron-70B-Instruct-HF.md">nvidia/Llama-3.1-Nemotron-70B-Instruct-HF</a></td><td>Nvidia</td><td>128000</td><td><a href="https://aimlapi.com/models/llama-3-1-nemotron-70b-instruct-api">Llama 3.1 Nemotron 70B Instruct</a></td></tr><tr><td><a href="NousResearch/Nous-Hermes-2-Mixtral-8x7B-DPO.md">NousResearch/Nous-Hermes-2-Mixtral-8x7B-DPO</a></td><td>NousResearch</td><td>32000</td><td>-</td></tr><tr><td><a href="Meta/Llama-3.3-70B-Instruct-Turbo.md">meta-llama/Llama-3.3-70B-Instruct-Turbo</a></td><td>Meta</td><td>128000</td><td><a href="https://aimlapi.com/models/meta-llama-3-3-70b-instruct-turbo-api">Meta Llama 3.3 70B Instruct Turbo</a></td></tr><tr><td><a href="Meta/Llama-3.2-3B-Instruct-Turbo.md">meta-llama/Llama-3.2-3B-Instruct-Turbo</a></td><td>Meta</td><td>131000</td><td><a href="https://aimlapi.com/models/llama-3-2-3b-instruct-turbo">Llama 3.2 3B Instruct Turbo</a></td></tr><tr><td><a href="Meta/Llama-3.2-11B-Vision-Instruct-Turbo.md">meta-llama/Llama-3.2-11B-Vision-Instruct-Turbo</a></td><td>Meta</td><td>131000</td><td><a href="https://aimlapi.com/models/llama-3-2-11b-vision-instruct-turbo-api">Llama 3.2 11B Vision Instruct Turbo</a></td></tr><tr><td><a href="Alibaba-Cloud/Qwen2.5-7B-Instruct-Turbo.md">Qwen/Qwen2.5-7B-Instruct-Turbo</a></td><td>Alibaba Cloud</td><td>32000</td><td><a href="https://aimlapi.com/models/qwen-2-5-7b-instruct-api">Qwen 2.5 7B Instruct Turbo</a></td></tr><tr><td><a href="Alibaba-Cloud/Qwen2.5-Coder-32B-Instruct.md">Qwen/Qwen2.5-Coder-32B-Instruct</a></td><td>Alibaba Cloud</td><td>131000</td><td>-</td></tr><tr><td><a href="Meta/Meta-Llama-3-8B-Instruct-Lite.md">meta-llama/Meta-Llama-3-8B-Instruct-Lite</a></td><td>Meta</td><td>9000</td><td><a href="https://aimlapi.com/models/llama-3-8b-instruct-lite-api">Llama 3 8B Instruct Lite</a></td></tr><tr><td><a href="Meta/Llama-3-chat-hf.md">meta-llama/Llama-3-8b-chat-hf</a></td><td>Meta</td><td>8000</td><td><a href="https://aimlapi.com/models/llama-3-8b-instruct-reference-api">Llama 3 8B Instruct Reference</a></td></tr><tr><td><a href="Meta/Llama-3-chat-hf.md">meta-llama/Llama-3-70b-chat-hf</a></td><td>Meta</td><td>8000</td><td><a href="https://aimlapi.com/models/meta-llama-3-70b-instruct">Llama 3 70B Instruct Reference</a></td></tr><tr><td><a href="Meta/Meta-Llama-3.1-405B-Instruct-Turbo.md">meta-llama/Meta-Llama-3.1-405B-Instruct-Turbo</a></td><td>Meta</td><td>4000</td><td><a href="https://aimlapi.com/models/llama-3-1-405b-api">Llama 3.1 (405B) Instruct Turbo</a></td></tr><tr><td><a href="Meta/Meta-Llama-3.1-8B-Instruct-Turbo.md">meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo</a></td><td>Meta</td><td>128000</td><td><a href="https://aimlapi.com/models/llama-3-1-8b-api">Llama 3.1 8B Instruct Turbo</a></td></tr><tr><td><a href="Meta/Meta-Llama-3.1-70B-Instruct-Turbo.md">meta-llama/Meta-Llama-3.1-70B-Instruct-Turbo</a></td><td>Meta</td><td>128000</td><td><a href="https://aimlapi.com/models/llama-3-1-70b-instruct-turbo-api">Llama 3.1 70B Instruct Turbo</a></td></tr><tr><td><a href="meta/llama-4-maverick.md">meta-llama/llama-4-scout</a></td><td>Meta</td><td>256000</td><td><em>Coming soon</em></td></tr><tr><td><a href="meta/llama-4-maverick.md">meta-llama/llama-4-maverick</a></td><td>Meta</td><td>256000</td><td><em>Coming soon</em></td></tr><tr><td><a href="Mistral-AI/Mistral-7B-Instruct.md">mistralai/Mistral-7B-Instruct-v0.2</a></td><td>Mistral AI</td><td>32000</td><td><a href="https://aimlapi.com/models/mistral-7b-instruct-v02">Mistral (7B) Instruct v0.2</a></td></tr><tr><td><a href="Mistral-AI/Mistral-7B-Instruct.md">mistralai/Mistral-7B-Instruct-v0.1</a></td><td>Mistral AI</td><td>8000</td><td><a href="https://aimlapi.com/models/mistral-7b-instruct">Mistral (7B) Instruct v0.1</a></td></tr><tr><td><a href="Mistral-AI/Mistral-7B-Instruct.md">mistralai/Mistral-7B-Instruct-v0.3</a></td><td>Mistral AI</td><td>32000</td><td><a href="https://aimlapi.com/models/mistral-7b-instruct-v0-3">Mistral (7B) Instruct v0.3</a></td></tr><tr><td><a href="Gryphe/MythoMax-L2-13b-Lite.md">Gryphe/MythoMax-L2-13b-Lite</a></td><td>Gryphe</td><td>4000</td><td>-</td></tr><tr><td><a href="Anthropic/claude-3-opus.md">claude-3-opus-20240229</a></td><td>Anthropic</td><td>200000</td><td><a href="https://aimlapi.com/models/claude-3-opus">Claude 3 Opus</a></td></tr><tr><td><a href="Anthropic/claude-3-haiku.md">claude-3-haiku-20240307</a></td><td>Anthropic</td><td>200000</td><td>-</td></tr><tr><td><a href="Anthropic/claude-3.5-sonnet.md">claude-3-5-sonnet-20240620</a></td><td>Anthropic</td><td>200000</td><td>-</td></tr><tr><td><a href="Anthropic/claude-3.5-sonnet.md">claude-3-5-sonnet-20241022</a></td><td>Anthropic</td><td>200000</td><td><a href="https://aimlapi.com/models/claude-3-5-sonnet">Claude 3.5 Sonnet 20241022</a></td></tr><tr><td><a href="anthropic/claude-3.5-haiku.md">claude-3-5-haiku-20241022</a></td><td>Anthropic</td><td>200000</td><td>-</td></tr><tr><td><a href="anthropic/claude-3.7-sonnet.md">claude-3-7-sonnet-20250219</a></td><td>Anthropic</td><td>200000</td><td><a href="https://aimlapi.com/models/claude-3-7-sonnet-api">Claude 3.7 Sonnet</a></td></tr><tr><td><a href="Google/gemini-1.5-flash.md">gemini-1.5-flash</a></td><td>Google</td><td>1000000</td><td><a href="https://aimlapi.com/models/gemini-1-5-flash-api">Gemini 1.5 Flash</a></td></tr><tr><td><a href="Google/gemini-1.5-pro.md">gemini-1.5-pro</a></td><td>Google</td><td>1000000</td><td><a href="https://aimlapi.com/models/gemini-1-5-pro-api">Gemini 1.5 Pro</a></td></tr><tr><td><a href="Google/gemini-2.0-flash-exp.md">gemini-2.0-flash-exp</a></td><td>Google</td><td>1000000</td><td><a href="https://aimlapi.com/models/gemini-2-0-flash-experimental">Gemini 2.0 Flash Experimental</a></td></tr><tr><td><a href="google/gemini-2.0-flash-thinking-exp-01-21.md">google/gemini-2.0-flash-thinking-exp-01-21</a></td><td>Google</td><td>1000000</td><td><a href="https://aimlapi.com/models/gemini-2-0-flash-thinking-experimental-api">Gemini 2.0 Flash Thinking Experimental</a></td></tr><tr><td><a href="google/gemini-2.0-flash.md">gemini-2.0-flash</a></td><td>Google</td><td>1000000</td><td><em>Coming soon</em></td></tr><tr><td><a href="google/gemini-2.5-pro-exp.md">gemini-2.5-pro-exp-03-25</a></td><td>Google</td><td>1000000</td><td><em>Coming soon</em></td></tr><tr><td><a href="google/gemini-2.5-pro-preview.md">google/gemini-2.5-pro-preview</a> or<br><a href="google/gemini-2.5-pro-preview.md">google/gemini-2.5-pro-preview-05-06</a></td><td>Google</td><td>1000000</td><td><em>Coming soon</em></td></tr><tr><td><a href="google/gemini-2.5-flash-preview.md">google/gemini-2.5-flash-preview</a></td><td>Google</td><td>1000000</td><td><em>Coming soon</em></td></tr><tr><td><a href="Alibaba-Cloud/qwen-max.md">qwen-max</a></td><td>Alibaba Cloud</td><td>32000</td><td><a href="https://aimlapi.com/models/qwen-max-api">Qwen Max</a></td></tr><tr><td><a href="Alibaba-Cloud/qwen-plus.md">qwen-plus</a></td><td>Alibaba Cloud</td><td>131000</td><td><a href="https://aimlapi.com/models/qwen-plus-api">Qwen Plus</a></td></tr><tr><td><a href="Alibaba-Cloud/qwen-turbo.md">qwen-turbo</a></td><td>Alibaba Cloud</td><td>1000000</td><td><a href="https://aimlapi.com/models/qwen-turbo-api">Qwen Turbo</a></td></tr><tr><td><a href="Alibaba-Cloud/qwen-max.md">qwen-max-2025-01-25</a></td><td>Alibaba Cloud</td><td>32000</td><td><a href="https://aimlapi.com/models/qwen-max-2025-01-25-api">Qwen Max 2025-01-25</a></td></tr><tr><td><a href="Alibaba-Cloud/Qwen2.5-72B-Instruct-Turbo.md">Qwen/Qwen2.5-72B-Instruct-Turbo</a></td><td>Alibaba Cloud</td><td>32000</td><td><a href="https://aimlapi.com/models/qwen-2-5-72b-instruct-turbo">Qwen 2.5 72B Instruct Turbo</a></td></tr><tr><td><a href="alibaba-cloud/qwen-qwq-32b.md">Qwen/QwQ-32B</a></td><td>Alibaba Cloud</td><td>131000</td><td><a href="https://aimlapi.com/models/qwq-32b-api">QwQ-32B</a></td></tr><tr><td><a href="alibaba-cloud/qwen3-235b-a22b.md">Qwen/Qwen3-235B-A22B-fp8-tput</a></td><td>Alibaba Cloud</td><td>32000</td><td><em>Coming Soon</em></td></tr><tr><td><a href="Mistral-AI/mistral-tiny.md">mistralai/mistral-tiny</a></td><td>Mistral AI</td><td>32000</td><td><a href="https://aimlapi.com/models/mistral-tiny-api">Mistral Tiny</a></td></tr><tr><td><a href="xAI/grok-beta.md">x-ai/grok-beta</a></td><td>xAI</td><td>131000</td><td><a href="https://aimlapi.com/models/grok-2-beta-api">Grok-2 Beta</a></td></tr><tr><td><a href="xai/grok-3-beta.md">x-ai/grok-3-beta</a></td><td>xAI</td><td>131000</td><td><a href="https://aimlapi.com/models/grok-3-beta-api">Grok 3 Beta</a></td></tr><tr><td><a href="xai/grok-3-mini-beta.md">x-ai/grok-3-mini-beta</a></td><td>xAI</td><td>131000</td><td><a href="https://aimlapi.com/models/grok-3-beta-mini-api">Grok 3 Beta Mini</a></td></tr><tr><td><a href="Mistral-AI/mistral-nemo.md">mistralai/mistral-nemo</a></td><td>Mistral AI</td><td>128000</td><td><a href="https://aimlapi.com/models/mistral-nemo-api">Mistral Nemo</a></td></tr><tr><td><a href="NeverSleep/llama-3.1-lumimaid.md">neversleep/llama-3.1-lumimaid-70b</a></td><td>Open Source</td><td>8000</td><td><a href="https://aimlapi.com/models/llama-3-1-lumimaid-70b-api">Llama 3.1 Lumimaid 70b</a></td></tr><tr><td><a href="Anthracite/magnum-v4.md">anthracite-org/magnum-v4-72b</a></td><td>Anthracite</td><td>32000</td><td><a href="https://aimlapi.com/models/magnum-v4-72b-api">Magnum v4 72B</a></td></tr><tr><td><a href="NVIDIA/llama-3.1-nemotron-70b.md">nvidia/llama-3.1-nemotron-70b-instruct</a></td><td>Nvidia</td><td>128000</td><td><a href="https://aimlapi.com/models/llama-3-1-nemotron-70b-instruct-api">Llama 3.1 Nemotron 70B Instruct</a></td></tr><tr><td><a href="Cohere/command-r-plus.md">cohere/command-r-plus</a></td><td>Cohere</td><td>128000</td><td><a href="https://aimlapi.com/models/command-r-api">Command R+</a></td></tr><tr><td><a href="AI21-Labs/jamba-1-5-mini.md">ai21/jamba-1-5-mini</a></td><td>AI21 Labs</td><td>256000</td><td><a href="https://aimlapi.com/models/jamba-1-5-mini-api">Jamba 1.5 Mini</a></td></tr><tr><td><a href="Mistral-AI/codestral-2501.md">mistralai/codestral-2501</a></td><td>Mistral AI</td><td>256000</td><td><a href="https://aimlapi.com/models/mistral-codestral-2501-api">Mistral Codestral-2501</a></td></tr><tr><td><a href="MiniMax/text-01.md">MiniMax-Text-01</a></td><td>Minimax AI</td><td>1000000</td><td><a href="https://aimlapi.com/models/minimax-text-01-api">MiniMax-Text-01</a></td></tr><tr><td><a href="MiniMax/abab6.5s-chat.md">abab6.5s-chat</a></td><td>Minimax AI</td><td>245000</td><td>-</td></tr></tbody></table>

</details>
