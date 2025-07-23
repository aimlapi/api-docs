# ElizaOS

## About

[ElizaOS](https://eliza.how/docs/intro) is a powerful multi-agent simulation framework designed to create, deploy, and manage autonomous AI agents. Built with TypeScript, it provides a flexible and extensible platform for developing intelligent agents that can interact across multiple platforms while maintaining consistent personalities and knowledge.

## Installation

1. Install `bun` и `Node.js` (v18+)
2. Clone the repo and run:

```bash
git clone <https://github.com/elizaos/eliza-starter.git> 
cd eliza-starter 
cp .env.example .env 
bun i && bun run build && bun start
```

You can find more details in the [official documentation](https://eliza.how/docs/intro#installation).

## How to Use AIML API via ElizaOS

1. Define your [AIMLAPI key](https://aimlapi.com/app/keys) and other environment variables:

```bash
AIMLAPI_API_KEY=sk-***
AIMLAPI_SMALL_MODEL=openai/gpt-3.5-turbo
AIMLAPI_MEDIUM_MODEL=anthropic/claude-3-5-sonnet-20240521-v2:0
AIMLAPI_LARGE_MODEL=google/gemini-2.0-pro
```

2. Configure your character in the `character.json` file as follows:

```json
{
  "modelProvider": "aimlapi",
  "settings": {
    "model": "gpt-4",
    "maxInputTokens": 200000,
	...
  }
}
```

ElizaOS provides a UI at [http://localhost:3000](http://localhost:3000). Each configured character appears as a separate conversation partner in the left-hand panel:

<figure><img src="../.gitbook/assets/image (12).png" alt=""><figcaption></figcaption></figure>

Click the small speaker icon below any message to hear it read aloud:

<figure><img src="../.gitbook/assets/изображение (6).png" alt=""><figcaption></figcaption></figure>

## Our Supported Models

In the environment variables for ElizaOS, you can specify almost any of our [text models](../api-references/text-models-llm/#complete-text-model-list), including:

* OpenAI ChatGPT ([openai/gpt-3.5-turbo](../api-references/text-models-llm/OpenAI/gpt-3.5-turbo.md), [gpt-4-turbo](../api-references/text-models-llm/OpenAI/gpt-4-turbo.md), ...),
* Google Gemini ([google/gemini-2.0-flash](../api-references/text-models-llm/google/gemini-2.0-flash.md), ...)
