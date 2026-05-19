# OpenAI

## Overview

OpenAI is an AI research and product company focused on developing general-purpose artificial intelligence systems for both consumers and enterprises. The company is widely known for the GPT family of models, including lightweight [GPT-4.1 Nano](../openai/gpt-4.1-nano.md) variants for low-latency workloads, balanced [GPT-4.1](../openai/gpt-4.1.md) and [GPT-4o](gpt-4o.md) models for production use, and advanced reasoning-oriented o-series models designed for complex coding, analytical, and agentic tasks. OpenAI’s broader ecosystem also includes multimodal capabilities such as image understanding, speech processing, audio generation, and real-time interaction APIs, along with products like ChatGPT, Codex, and developer-focused agentic tooling.

The chat models from this provider support multiple API paradigms and multimodal workflows. OpenAI models can be accessed through both the standard `/v1/chat/completions` endpoint and the newer `/v1/responses` endpoint, which provides unified handling for text, images, audio, tool usage, and structured outputs. Some models additionally support integrated web search and retrieval capabilities, allowing them to access external information sources directly during generation.

#### Supported capabilities

Supported capabilities vary depending on the specific model, with different models offering different combinations of the features listed below.

* Text completions: Build advanced conversational systems and text-processing pipelines.
* Function Calling: Utilize tools, APIs, and structured workflows.
* Stream mode: Receive partial responses incrementally as tokens are generated.
* Batch Processing: Execute multiple independent requests within a single API call.
* Vision Tasks: Process and analyze images and visual inputs.
* Audio Tasks: Transcribe, generate, and process speech and audio streams.
* Web Search: Access external web information directly from supported models.

***

Other model categories from this provider are available as well.

* [Image](../../image-models/OpenAI/)&#x20;
* [Speech-To-Text](../../speech-voice-models/stt/OpenAI/)&#x20;
* [Embedding](../../embedding-models/OpenAI/)
