---
description: >-
  Connect Hermes Agent to AI/ML API through the native provider fork or a manual
  OpenAI-compatible setup.
---

# Hermes

## About

[Hermes Agent](https://github.com/NousResearch/hermes-agent) is an agent framework for CLI and messaging workflows. It supports OpenAI-compatible providers and can use AI/ML API either through the AI/ML API fork or through manual OpenAI-compatible configuration in the official repository.

This guide covers both setup paths.

## Quick start

Use the AI/ML API fork if you want the fastest setup:

1. Clone the fork.
2. Install Hermes from source.
3. Export `AIMLAPI_API_KEY`.
4. Run `hermes model`.
5. Choose `AI/ML API`.
6. Start chatting with `hermes chat`.

Use the official Hermes repository if you want to stay on upstream Hermes and do not mind manual OpenAI-compatible configuration.

> On Windows, use WSL2 for the source install commands below. The Hermes setup script is a Unix shell script intended for Linux/macOS-style environments.

## When to use AI/ML API with Hermes

AI/ML API works well with Hermes when you want:

* one key for many model providers
* an OpenAI-compatible endpoint
* fast switching between coding, reasoning, and multimodal models

## Prerequisites

Before you start, make sure you have:

* Python 3.11 or newer
* Git
* an AI/ML API key from [aimlapi.com/app/keys](https://aimlapi.com/app/keys)
* a model ID from [aimlapi.com/models](https://aimlapi.com/models)

Use this base URL:

```bash
https://api.aimlapi.com/v1
```

Need a key first? Use API Key Management.

## Choose a setup path

### Option 1: AI/ML API fork

Use the AI/ML API fork if you want the smoothest setup.

Repository:

* [aimlapi/hermes-agent-aimlapi](https://github.com/aimlapi/hermes-agent-aimlapi/tree/feature/add-aimlapi-provider)

Benefits:

* `AI/ML API` appears in `hermes model`
* the endpoint is preconfigured
* model discovery is tuned for chat models
* the API key uses `AIMLAPI_API_KEY`

### Option 2: Official Hermes repository

Use the official Hermes repository if you want to stay on upstream Hermes.

Repository:

* [NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent)

This path uses Hermes' generic OpenAI-compatible provider flow.

## Option 1: Set up the AI/ML API fork

Clone the fork, install Hermes from source, then start provider setup:

```bash
git clone https://github.com/aimlapi/hermes-agent-aimlapi.git
cd hermes-agent-aimlapi
git checkout feature/add-aimlapi-provider
./setup-hermes.sh
export AIMLAPI_API_KEY=your_key_here
hermes model
```

Then:

1. Choose `AI/ML API`.
2. Pick a model.
3. Start Hermes with `hermes` or `hermes chat`.

Hermes already knows the default endpoint. You do not need to enter it manually.

### Saved configuration

Hermes stores provider settings in `~/.hermes/config.yaml` and reads secrets from `~/.hermes/.env`.

Example `config.yaml`:

```yaml
model:
  provider: aimlapi
  base_url: https://api.aimlapi.com/v1
  default: openai/gpt-5-chat-latest
```

Example `.env`:

```bash
AIMLAPI_API_KEY=your_key_here
AIMLAPI_BASE_URL=https://api.aimlapi.com/v1
```

`AIMLAPI_BASE_URL` is optional.

### One-off run

Use this when you want to test AI/ML API without changing your default provider:

```bash
hermes chat --provider aimlapi --model openai/gpt-5-chat-latest
```

### Verify the fork setup

Run a quick health check:

```bash
hermes doctor
```

Then open a chat directly:

```bash
hermes chat --provider aimlapi --model openai/gpt-5-chat-latest
```

## Option 2: Set up official Hermes

Clone the upstream repository and install Hermes from source:

```bash
git clone https://github.com/NousResearch/hermes-agent.git
cd hermes-agent
./setup-hermes.sh
```

Add your AI/ML API credentials to `~/.hermes/.env` using the OpenAI-compatible variables:

```bash
OPENAI_API_KEY=your_key_here
OPENAI_BASE_URL=https://api.aimlapi.com/v1
```

Then set a model in `~/.hermes/config.yaml`:

```yaml
model:
  provider: custom
  base_url: https://api.aimlapi.com/v1
  default: openai/gpt-5-chat-latest
```

Start Hermes:

```bash
hermes
```

### Verify the upstream setup

Check that Hermes sees your configuration:

```bash
hermes doctor
```

Then start a chat and confirm the selected model answers normally:

```bash
hermes chat
```

### What changes in the upstream flow

Compared with the fork:

* `AI/ML API` does not appear as a native provider
* Hermes treats the endpoint as a custom OpenAI-compatible backend
* you may need to enter model IDs manually
* credentials use `OPENAI_API_KEY` and `OPENAI_BASE_URL`

## Model selection

Use exact AI/ML API model IDs in Hermes.

Common examples:

* `openai/gpt-5-chat-latest`
* `anthropic/claude-sonnet-4.6`
* `google/gemini-2.5-flash`

The Hermes picker focuses on chat-completion models. Non-chat models are excluded from the interactive list.

### Good starting models

Start with one of these:

* `openai/gpt-5-chat-latest` for strong general use
* `anthropic/claude-sonnet-4.6` for coding and long-form work
* `google/gemini-2.5-flash` for lower latency and lower cost

For the full catalog, use All Model IDs.

## Switch models later

To change the saved model, run:

```bash
hermes model
```

To switch inside a session in the fork, use `/model`:

```
/model aimlapi:openai/gpt-5-chat-latest
/model aimlapi:anthropic/claude-sonnet-4.6
/model aimlapi:google/gemini-2.5-flash
```

## CLI and gateway usage

Once configured, the normal Hermes commands work as usual:

```bash
hermes
hermes chat
```

If you use the Hermes gateway, it reuses the same default provider:

```bash
hermes gateway setup
hermes gateway start
```

## Config checklist

Make sure these values line up:

* base URL: `https://api.aimlapi.com/v1`
* provider: `aimlapi` in the fork, `custom` in upstream
* model ID: exact AI/ML API model ID
* API key variable: `AIMLAPI_API_KEY` in the fork or `OPENAI_API_KEY` in upstream

## Diagnostics

Check your setup with:

```bash
hermes doctor
```

This helps confirm:

* your API key is present
* Hermes can reach the models endpoint
* the saved provider config is valid

## Troubleshooting

### `hermes` command is not found

Make sure you ran the install script from the repository root:

```bash
./setup-hermes.sh
```

Then restart your terminal and try again:

```bash
hermes doctor
```

If you are on Windows, run the setup through WSL2.

### Hermes does not ask for the endpoint

This is expected in the AI/ML API fork. The default endpoint is built in:

```bash
https://api.aimlapi.com/v1
```

### My model is missing from the picker

Usually one of these is true:

* the model is not exposed as a chat-completion model
* the live model list failed to load
* the model is not in the starter list yet

Set the model manually in `config.yaml` if needed.

### Hermes selects another provider

Force AI/ML API with one of these:

* run `hermes model` and choose `AI/ML API`
* set `model.provider: aimlapi`
* use `hermes chat --provider aimlapi --model ...`

### I want to use a proxy

Set a custom base URL:

```bash
AIMLAPI_BASE_URL=https://your-proxy.example/v1
```

### I get an auth error

Usually one of these is wrong:

* the key is missing from `~/.hermes/.env`
* the variable name does not match your setup path
* the saved provider points to another backend

Run `hermes doctor` first. Then reopen `~/.hermes/.env` and verify the key name.

## Links

* All Model IDs
* [AI/ML API keys](https://aimlapi.com/app/keys)
* [AI/ML API model catalog](https://aimlapi.com/models)
* [AI/ML API models endpoint](https://api.aimlapi.com/models)
* [Hermes repository](https://github.com/NousResearch/hermes-agent)
