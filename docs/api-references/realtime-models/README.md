---
description: Overview of the available realtime (live) voice models.
icon: microphone
---

# Realtime Models

## Overview

Realtime (live) models hold a continuous, two-way voice conversation over a single WebSocket connection. You stream microphone audio in, and the model streams spoken audio (and, where supported, text) back while the user is still in the conversation. Each model family keeps its provider's own WebSocket protocol, so the official OpenAI and Google GenAI SDKs work with only the base URL and the API key changed.

How sessions work, authentication and browser client secrets, billing, limits and errors are described in the [Realtime Sessions](../../capabilities/realtime-sessions.md) guide.

{% hint style="info" %}
You can try realtime models in the [Playground](https://aimlapi.com/app/): open the model picker and choose the **Realtime** tab.
{% endhint %}

## All Available Realtime Models

<table data-header-hidden="false" data-header-sticky data-full-width="true"><thead><tr><th width="320">Model ID + API Reference link</th><th width="132">Developer</th><th>Protocol</th></tr></thead><tbody><tr><td><a href="openai/gpt-realtime-2.1.md">openai/gpt-realtime-2.1</a></td><td>OpenAI</td><td>OpenAI Realtime</td></tr><tr><td><a href="openai/gpt-realtime-2.1-mini.md">openai/gpt-realtime-2.1-mini</a></td><td>OpenAI</td><td>OpenAI Realtime</td></tr><tr><td><a href="openai/gpt-live-1.md">openai/gpt-live-1</a></td><td>OpenAI</td><td>GPT-Live</td></tr><tr><td><a href="xai/grok-voice-think-fast-2.0.md">x-ai/grok-voice-think-fast-2.0</a></td><td>xAI</td><td>OpenAI Realtime (xAI dialect)</td></tr><tr><td><a href="google/gemini-3.8-live.md">google/gemini-3.8-live</a></td><td>Google</td><td>Gemini Live</td></tr></tbody></table>
