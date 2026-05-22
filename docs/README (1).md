# llms.txt

## AIMLAPI — Unified AI/ML API. Documentation portal

> One API to access 500+ AI models for chat, image, video, audio, code, embeddings and vision. Single integration for OpenAI, Anthropic, Google, Meta, ByteDance, DeepSeek, Kling AI, Alibaba Cloud, MiniMax, ElevenLabs and more.

### Authentication

* API Key via Authorization header: `Authorization: Bearer YOUR_AIMLAPI_KEY`
* [Manage API keys in dashboard](https://aimlapi.com/app/keys)

### Key Links

* [Documentation](https://docs.aimlapi.com)
* [Playground](https://aimlapi.com/app)
* [Models List](https://api.aimlapi.com/v1/models)
* [Full OpenAPI Spec](https://api.aimlapi.com/docs-public-yaml)
* [Pricing](https://aimlapi.com/ai-ml-api-pricing)
* [How to use account, playground, API keys, dashboards, manage billing, and more](https://help.aimlapi.com/)

### Compatibility

* OpenAI-compatible API
* Anthropic-compatible API
* Supports streaming responses
* Supports multimodal inputs
* Supports tool calling / function calling
* Supports JSON mode for compatible models
* Supports batching for Anthropic models

### Production Usage

* Use exponential backoff for retries
* Monitor usage via Billing and Logs dashboards
* Model availability may vary by provider
* Some models support asynchronous generation workflows

### Async Workflows

* `POST /v2/generate/video`
* `POST /v2/generate/audio`
* Poll generation status using returned generation IDs

### SDKs

*
* [OpenAI SDK](quickstart/supported-sdks.md#openai)

Base URL: https://api.aimlapi.com

### Core Endpoints

* `POST /v1/chat/completions` — [Chat completion docs](https://docs.aimlapi.com/api-references/text-models-llm)
* `POST /v1/images/generations` — [Image generation docs](https://docs.aimlapi.com/api-references/image-models)
* `POST /v2/generate/video` — [Video generation docs](https://docs.aimlapi.com/api-references/video-models)
* `POST /v1/stt/create` — [Speech-to-Text API overview](https://docs.aimlapi.com/api-references/speech-models/speech-to-text)
* `POST /v1/tts` — [Text-to-Speech API overview](https://docs.aimlapi.com/api-references/speech-models/text-to-speech)
* `POST /v2/generate/audio` [Music API overview](https://docs.aimlapi.com/api-references/music-models)
* `POST /v1/embeddings` — [Embeddings docs](https://docs.aimlapi.com/api-references/embeddings)
* `GET /v1/models` — List all available models (see Models List in Key Links)
* `GET /v2/billing` — \[Get user balance info] (https://docs.aimlapi.com/api-references/service-endpoints/account-balance)

### Example Request

* [View complete code examples in Quickstart](https://docs.aimlapi.com/quickstart)
* cURL example: `curl -X POST https://api.aimlapi.com/v1/chat/completions -H "Authorization: Bearer YOUR_AIMLAPI_KEY" -H "Content-Type: application/json" -d '{"model":"gpt-4o-mini","messages":[{"role":"user","content":"Hello"}]}'`
* [Python SDK examples](https://docs.aimlapi.com/sdks/python)

### Capabilities

chat • image-generation • video-generation • music-generation • speech-to-text • text-to-speech • embeddings • vision • code-generation • reasoning • function-calling • streaming • web-search • batching

* [Explore all models](https://aimlapi.com/models)

### Extended Resources

* [Getting Started Guide](https://docs.aimlapi.com/introduction)
* [API Reference Index](https://docs.aimlapi.com/#browse-models)
* [MCP Endpoint](https://docs.aimlapi.com/~gitbook/mcp)
* [Blog](https://aimlapi.com/blog)
* [Academy](https://aimlapi.com/academy)
