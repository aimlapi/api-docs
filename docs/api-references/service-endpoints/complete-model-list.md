---
icon: money-check-pen
---

# Complete Model List

## Get Model List via API

You can query the complete list of available models through this API.\
No API key is required for this request. You can also simply open [this list](https://api.aimlapi.com/models) in any web browser.<br>

{% openapi-operation spec="models" path="/models" method="get" %}
[OpenAPI models](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/service-endpoints/models.json)
{% endopenapi-operation %}

## Output Examples by Model Type

As of early 2026, this endpoint returns a list of more than 400 models. Each item represents a single model identified by a unique ID. Depending on the model category (chat, video, etc.), the set of fields in each item may vary slightly, so below we provide representative examples from the main model categories.

#### Example output item for a chat model

Unlike other types of models, every chat model includes a non-empty `features` list that clearly shows what the model can do: support for streaming, instructions for SYSTEM or DEVELOPER roles besides the regular prompt, whether the model is described by the developer as “thinking”, etc.

For more details on many of these, see the [CAPABILITIES](../../capabilities/completion-or-chat-models.md) section of this documentation portal.

{% code overflow="wrap" %}
```json
{
  "id": "o3-mini",
  "type": "chat-completion",
  "info": {
    "name": "o3 mini",
    "developer": "Open AI",
    "description": "OpenAI o3-mini excels in reasoning tasks with advanced features like deliberative alignment and extensive context support.",
    "contextLength": 200000,
    "maxTokens": 100000,
    "url": "https://aimlapi.com/models/openai-o3-mini-api",
    "docs_url": "https://docs.aimlapi.com/api-references/text-models-llm/openai/o3-mini"
  },
  "features": [
    "openai/chat-completion",
    "openai/response-api",
    "openai/chat-assistant",
    "openai/chat-completion.function",
    "openai/chat-completion.message.refusal",
    "openai/chat-completion.message.system",
    "openai/chat-completion.message.developer",
    "openai/chat-completion.message.assistant",
    "openai/chat-completion.stream",
    "openai/chat-completion.max-completion-tokens",
    "openai/chat-completion.number-of-messages",
    "openai/chat-completion.stop",
    "openai/chat-completion.seed",
    "openai/chat-completion.reasoning",
    "openai/chat-completion.response-format"
  ],
  "endpoints": [
    "/v1/chat/completions",
    "/v1/responses"
  ]
}
```
{% endcode %}

#### Example output item for an image model

{% code overflow="wrap" %}
```json
{
  "id": "flux/kontext-max/text-to-image",
  "type": "image",
  "info": {
    "name": "Flux Kontext Max",
    "developer": "Flux",
    "description": "A new Flux model optimized for maximum image quality.",
    "url": "https://aimlapi.com/models/flux-1-kontext-max",
    "docs_url": "https://docs.aimlapi.com/api-references/image-models/flux/flux-kontext-max-text-to-image"
  },
  "features": [],
  "endpoints": [
    "/v1/images/generations"
  ]
}
```
{% endcode %}

#### Example output item for a video model

{% code overflow="wrap" %}
```json
{
  "id": "veo2/image-to-video",
  "type": "video",
  "info": {
    "name": "Veo2 Image-to-Video",
    "description": "Veo2 Image-to-Video: Google's AI transforming still images into dynamic videos",
    "developer": "Google",
    "url": "https://aimlapi.com/models/veo-2-image-to-video-api",
    "docs_url": "https://docs.aimlapi.com/api-references/video-models/google/veo2-image-to-video"
  },
  "features": [],
  "endpoints": [
    "/v2/generate/video/google/generation",
    "/v2/video/generations"
  ]
}
```
{% endcode %}

