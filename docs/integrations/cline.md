# Cline

## About

Cline is an open-source AI coding assistant with two working modes (Plan/Act), terminal command execution, and support for the Model Context Protocol (MCP) in VS Code.

You can find the Cline repository and community on [GitHub](https://github.com/cline).

## Installing Cline in VS Code

1. Open the **Extensions** tab in the VS Code sidebar.

<figure><img src="../.gitbook/assets/file-MSoV7yWuiF.png" alt=""><figcaption></figcaption></figure>

2. In the search bar, type **Cline**.
3. Find the extension and click **Install**.

<figure><img src="../.gitbook/assets/file-EtVsh1r3HJ.png" alt=""><figcaption></figcaption></figure>

4. After installation, a separate **Cline** tab will appear in the sidebar.

<figure><img src="../.gitbook/assets/file-2M7nFjSF7c (1).png" alt=""><figcaption></figcaption></figure>

## **Configuring Cline**

1. Go to the **Cline** tab in the sidebar.
2. Click the gear icon in the top-right corner.

<figure><img src="../.gitbook/assets/file-jxjkvunu8d.png" alt=""><figcaption></figcaption></figure>



In the settings:

* Set **API Provider** to **OpenAI Compatible**.
* In **Base URL**, enter one of our available endpoints.
* In **API Key**, enter your [AI/ML API key](https://aimlapi.com/app/keys).
* In **Model ID**, specify the model name. You can find some model selection tips in our [description of code generation as a capability](../capabilities/code-generation.md).
* Click **Save**.

All done — start coding with Cline!

## Usage Example

Here’s the request we made:&#x20;

```
Create a Python file named test and add code to print Hello, world
```

<figure><img src="../.gitbook/assets/file-hUIEu0dwuF.png" alt=""><figcaption></figcaption></figure>

If you expand the **API Request** section, you can view the data — including your prompt.

Since I asked to create a file in the request, the file was generated. You can see a preview and its contents, but it hasn’t been saved yet.

To save the file, Cline asks for confirmation.

<figure><img src="../.gitbook/assets/file-vI3i1xgY23.png" alt=""><figcaption></figcaption></figure>

Once the file is saved, a second API request appears with metadata, along with a notification that the task was successfully completed.

## **Supported Models**

These models have been tested by our team for compatibility with Cline integration.

<details>

<summary>Supported Model List</summary>

* [gpt-3.5-turbo](../api-references/text-models-llm/OpenAI/gpt-3.5-turbo.md)&#x20;
* [gpt-3.5-turbo-0125](../api-references/text-models-llm/OpenAI/gpt-3.5-turbo.md)
* [gpt-3.5-turbo-1106](../api-references/text-models-llm/OpenAI/gpt-3.5-turbo.md)
* [gpt-4o](../api-references/text-models-llm/OpenAI/gpt-4o.md)
* [gpt-4o-2024-05-13](../api-references/text-models-llm/OpenAI/gpt-4o.md)
* [gpt-4o-2024-08-06](../api-references/text-models-llm/OpenAI/gpt-4o.md)
* [gpt-4o-mini](../api-references/text-models-llm/OpenAI/gpt-4o-mini.md)
* [gpt-4o-mini-2024-07-18](../api-references/text-models-llm/OpenAI/gpt-4o-mini.md)
* [chatgpt-4o-latest](../api-references/text-models-llm/OpenAI/gpt-4o.md)
* [gpt-4o-2024-05-13](../api-references/text-models-llm/OpenAI/gpt-4o.md)
* [gpt-4o-2024-08-06](../api-references/text-models-llm/OpenAI/gpt-4o.md)
* [gpt-4-turbo](../api-references/text-models-llm/OpenAI/gpt-4-turbo.md)
* [gpt-4-turbo-2024-04-09](../api-references/text-models-llm/OpenAI/gpt-4-turbo.md)
* [gpt-4-0125-preview](../api-references/text-models-llm/OpenAI/gpt-4-preview.md)
* [gpt-4-1106-preview](../api-references/text-models-llm/OpenAI/gpt-4-preview.md)
* [o3-mini](../api-references/text-models-llm/OpenAI/o3-mini.md)
* [gpt-4.5-preview](../api-references/text-models-llm/OpenAI/gpt-4.5-preview.md)
* [openai/gpt-4.1-2025-04-14](../api-references/text-models-llm/openai/gpt-4.1.md)
* [openai/gpt-4.1-mini-2025-04-14](../api-references/text-models-llm/openai/gpt-4.1-mini.md)
* [openai/gpt-4.1-nano-2025-04-14](../api-references/text-models-llm/openai/gpt-4.1-nano.md)
* [openai/o4-mini-2025-04-16](../api-references/text-models-llm/openai/o4-mini.md)



* [deepseek/deepseek-chat](../api-references/text-models-llm/DeepSeek/deepseek-chat.md)
* [deepseek/deepseek-r1](../api-references/text-models-llm/DeepSeek/deepseek-r1.md)



* [meta-llama/Llama-3.2-90B-Vision-Instruct-Turbo](../api-references/text-models-llm/Meta/Llama-3.2-90B-Vision-Instruct-Turbo.md)
* [meta-llama/Llama-Vision-Free](../api-references/text-models-llm/Meta/Llama-Vision-Free.md)
* [meta-llama/Llama-3.3-70B-Instruct-Turbo](../api-references/text-models-llm/Meta/Llama-3.3-70B-Instruct-Turbo.md)
* [meta-llama/Llama-3.2-3B-Instruct-Turbo](../api-references/text-models-llm/Meta/Llama-3.2-3B-Instruct-Turbo.md)
* [meta-llama/Llama-3.2-11B-Vision-Instruct-Turbo](../api-references/text-models-llm/Meta/Llama-3.2-11B-Vision-Instruct-Turbo.md)
* [meta-llama/Meta-Llama-3.1-405B-Instruct-Turbo](../api-references/text-models-llm/Meta/Meta-Llama-3.1-405B-Instruct-Turbo.md)
* [meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo](../api-references/text-models-llm/Meta/Meta-Llama-3.1-8B-Instruct-Turbo.md)
* [meta-llama/Meta-Llama-3.1-70B-Instruct-Turbo](../api-references/text-models-llm/Meta/Meta-Llama-3.1-70B-Instruct-Turbo.md)
* [meta-llama/llama-4-maverick](../api-references/text-models-llm/meta/llama-4-maverick.md)



* [Qwen/Qwen2-72B-Instruct](../api-references/text-models-llm/Alibaba-Cloud/Qwen2-72B-Instruct.md)
* [Qwen/Qwen2.5-7B-Instruct-Turbo](../api-references/text-models-llm/Alibaba-Cloud/Qwen2.5-7B-Instruct-Turbo.md)
* [Qwen/Qwen2.5-Coder-32B-Instruct](../api-references/text-models-llm/Alibaba-Cloud/Qwen2.5-Coder-32B-Instruct.md)
* [qwen-max](../api-references/text-models-llm/Alibaba-Cloud/qwen-max.md)
* [qwen-max-2025-01-25](../api-references/text-models-llm/Alibaba-Cloud/qwen-max.md)
* [qwen-plus](../api-references/text-models-llm/Alibaba-Cloud/qwen-plus.md)
* [qwen-turbo](../api-references/text-models-llm/Alibaba-Cloud/qwen-turbo.md)
* [Qwen/Qwen2.5-72B-Instruct-Turbo](../api-references/text-models-llm/Alibaba-Cloud/Qwen2.5-72B-Instruct-Turbo.md)
* [Qwen/QwQ-32B](../api-references/text-models-llm/alibaba-cloud/qwen-qwq-32b.md)



* [mistralai/Mixtral-8x7B-Instruct-v0.1](../api-references/text-models-llm/Mistral-AI/Mixtral-8x7B-Instruct-v0.1.md)
* [mistralai/Mistral-7B-Instruct-v0.1](../api-references/text-models-llm/Mistral-AI/Mistral-7B-Instruct.md)
* [mistralai/Mistral-7B-Instruct-v0.2](../api-references/text-models-llm/Mistral-AI/Mistral-7B-Instruct.md)
* [mistralai/Mistral-7B-Instruct-v0.3](../api-references/text-models-llm/Mistral-AI/Mistral-7B-Instruct.md)
* [mistralai/mistral-tiny](../api-references/text-models-llm/Mistral-AI/mistral-tiny.md)
* [mistralai/mistral-nemo](../api-references/text-models-llm/Mistral-AI/mistral-nemo.md)
* [mistralai/codestral-2501](../api-references/text-models-llm/Mistral-AI/codestral-2501.md)



* [gemini-1.5-flash](../api-references/text-models-llm/Google/gemini-1.5-flash.md)
* [gemini-1.5-pro](../api-references/text-models-llm/Google/gemini-1.5-pro.md)
* [google/gemini-2.0-flash-exp](../api-references/text-models-llm/Google/gemini-2.0-flash-exp.md)
* [gemini-2.0-flash-exp](../api-references/text-models-llm/Google/gemini-2.0-flash-exp.md)
* [google/gemini-2.0-flash](../api-references/text-models-llm/google/gemini-2.0-flash.md)

- [google/gemini-2.5-pro-preview](../api-references/text-models-llm/google/gemini-2.5-pro-preview.md)



* [x-ai/grok-beta](../api-references/text-models-llm/xAI/grok-beta.md)
* [x-ai/grok-3-beta](../api-references/text-models-llm/xai/grok-3-beta.md)
* [x-ai/grok-3-mini-beta](../api-references/text-models-llm/xai/grok-3-mini-beta.md)



* [neversleep/llama-3.1-lumimaid-70b](../api-references/text-models-llm/NeverSleep/llama-3.1-lumimaid.md)
* [anthracite-org/magnum-v4-72b](../api-references/text-models-llm/Anthracite/magnum-v4.md)
* [cohere/command-r-plus](../api-references/text-models-llm/Cohere/command-r-plus.md)
* [nvidia/Llama-3.1-Nemotron-70B-Instruct-HF](../api-references/text-models-llm/NVIDIA/Llama-3.1-Nemotron-70B-Instruct-HF.md)
* [NousResearch/Nous-Hermes-2-Mixtral-8x7B-DPO](../api-references/text-models-llm/NousResearch/Nous-Hermes-2-Mixtral-8x7B-DPO.md)



* [MiniMax-Text-01](../api-references/text-models-llm/MiniMax/text-01.md)
* [abab6.5s-chat](../api-references/text-models-llm/MiniMax/abab6.5s-chat.md)

</details>

## Troubleshooting

Possible Issues:

* **403 status code (no body)** — This is the most common error. Possible causes:
  * You might need to use a different endpoint. Be sure to refer to the documentation for the specific model you've selected from our catalog!
  * The user may have run out of tokens or doesn’t have enough. Check your balance in your account dashboard.
* **400 status code (no body)** — This error occurs when using models that are not compatible with the integration. See the previous section [Supported Models](cline.md#supported-models) :point\_up:
