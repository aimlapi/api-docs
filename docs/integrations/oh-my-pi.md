# Oh My Pi

## About

[oh-my-pi](https://github.com/can1357/oh-my-pi) (omp) is an AI coding agent for the terminal. It ships subagents, plan mode, LSP, DAP, hindsight memory, hash-anchored edits, and time-traveling rules, backed by a native Rust engine. The project homepage is [omp.sh](https://omp.sh/).

As of [PR #2120](https://github.com/can1357/oh-my-pi/pull/2120) (merged June 8, 2026), AI/ML API is a built-in provider preset in omp. Set `AIMLAPI_API_KEY` in your environment and omp will discover and use it automatically — no custom provider config needed.

## Quick start

```bash
export AIMLAPI_API_KEY=your_key_here
omp
```

omp discovers the key, loads the bundled AI/ML API model catalog, and is ready to use.

## When to use AI/ML API with omp

AI/ML API works well with omp when you want:

* one key for many model providers with a single OpenAI-compatible endpoint
* access to 350+ chat-compatible models without hand-writing provider config
* AI/ML API models in omp's role-based routing and provider fallback chains

## Prerequisites

Before you start, make sure you have:

* omp installed (see [omp.sh](https://omp.sh/) or [github.com/can1357/oh-my-pi](https://github.com/can1357/oh-my-pi))
* an AI/ML API key from [aimlapi.com/app/keys](https://aimlapi.com/app/keys)
* a model ID from [aimlapi.com/models](https://aimlapi.com/models)

The base URL is:

```
https://api.aimlapi.com/v1
```

Need a key first? Use [API Key Management](/broken/pages/cdd447f8b558d5268491de41a1a02c07771cac9b).

## Set up AI/ML API in omp

### Environment variable

Set `AIMLAPI_API_KEY` in your shell or in your project's `.env` file:

```bash
export AIMLAPI_API_KEY=your_key_here
```

omp reads the key automatically via `getEnvApiKey()`. No additional config is required.

### Persistent setup

Add the key to your shell profile to make it available across sessions:

```bash
# ~/.zshrc or ~/.bashrc
export AIMLAPI_API_KEY=your_key_here
```

### Bundled model catalog

omp ships a pre-generated catalog of AI/ML API chat-compatible models (350+ models as of the initial release). The catalog excludes image, video, TTS, embedding, and media models so only chat-completion models appear in the model picker. The catalog is regenerated from `/v1/models` on each release.

## Model selection

Use exact AI/ML API model IDs. Common examples:

* `openai/gpt-4o`
* `anthropic/claude-sonnet-4-5`
* `google/gemini-2.5-flash`

### Good starting models

* `openai/gpt-4o` for strong general use
* `anthropic/claude-sonnet-4-5` for coding and long-form work
* `google/gemini-2.5-flash` for lower latency and lower cost

For the full catalog, use [All Model IDs](/broken/pages/9db43b2a9ecf64fedb7fcfc447a3ace848669984).

## Provider routing

omp supports role-based model routing and fallback chains. The `aimlapi` provider participates in these the same way as any other built-in provider. You can pin AI/ML API models to specific roles (e.g. main agent, subagents, plan mode) in your omp config.

Example role config:

```toml
[model]
provider = "aimlapi"
model = "openai/gpt-4o"
```

## Config checklist

Make sure these values are set:

* API key variable: `AIMLAPI_API_KEY`
* provider ID: `aimlapi`
* base URL: `https://api.aimlapi.com/v1` (built in, no manual config needed)
* model ID: exact AI/ML API chat-completion model ID

## Troubleshooting

<details>

<summary>omp does not pick up AIMLAPI_API_KEY</summary>

The preset was added in [PR #2120](https://github.com/can1357/oh-my-pi/pull/2120). Update omp to the latest version.

Check that the variable is exported in the current shell:

```bash
echo $AIMLAPI_API_KEY
```

If it is empty, re-export it or source your shell profile.

</details>

<details>

<summary>A model I want is missing from the picker</summary>

The bundled catalog covers chat-completion models. Non-chat models (image, video, TTS, embedding) are intentionally excluded. If a chat model you need was released after the last catalog regeneration, set the model ID directly in your omp config.

</details>

<details>

<summary>I get an auth error</summary>

Check that:

* `AIMLAPI_API_KEY` is correctly set and exported
* the key is valid at [aimlapi.com/app/keys](https://aimlapi.com/app/keys)
* no other environment variable is overriding the key

</details>

<details>

<summary>I want to use a proxy</summary>

Set a custom base URL in your omp provider config. The `aimlapi` registry entry reads `AIMLAPI_API_KEY` against whatever base URL is configured.

</details>

## Links

* [All Model IDs](/broken/pages/9db43b2a9ecf64fedb7fcfc447a3ace848669984)
* [AI/ML API keys](https://aimlapi.com/app/keys)
* [AI/ML API model catalog](https://aimlapi.com/models)
* [oh-my-pi repository](https://github.com/can1357/oh-my-pi)
* [omp homepage](https://omp.sh/)
