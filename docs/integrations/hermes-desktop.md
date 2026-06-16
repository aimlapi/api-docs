# Hermes Desktop

## About

[Hermes Desktop](https://github.com/fathah/hermes-desktop) is a native desktop app for installing, configuring, and chatting with [Hermes Agent](https://github.com/NousResearch/hermes-agent). It provides a GUI for provider setup, model selection, sessions, tools, skills, and messaging gateways — without having to manage the CLI by hand.

As of [PR #612](https://github.com/fathah/hermes-desktop/pull/612) (merged June 9, 2026), AI/ML API is a built-in provider preset in Hermes Desktop. You can select it from the provider list during first-run setup or at any time in Settings.

## Quick start

1. Download and install Hermes Desktop from [hermesagents.cc](https://hermesagents.cc/).
2. Open the app. On first launch it runs the setup wizard.
3. When prompted for a provider, choose **AI/ML API**.
4. Enter your AI/ML API key.
5. Pick a model and start chatting.

## When to use AI/ML API with Hermes Desktop

AI/ML API works well with Hermes Desktop when you want:

* one key for many model providers
* an OpenAI-compatible endpoint with no custom configuration
* fast switching between coding, reasoning, and multimodal models from a GUI

## Prerequisites

Before you start, make sure you have:

* Hermes Desktop installed ([hermesagents.cc](https://hermesagents.cc/))
* an AI/ML API key from [aimlapi.com/app/keys](https://aimlapi.com/app/keys)
* a model ID from [aimlapi.com/models](https://aimlapi.com/models)

The base URL is:

```bash
https://api.aimlapi.com/v1
```

Need a key first? Use [API Key Management](/broken/pages/b1dbdf89b3ed7f9af9a90506fe3124b622cfc559).

## Set up AI/ML API in Hermes Desktop

### First-run setup wizard

When Hermes Desktop opens for the first time:

1. Choose **Local** mode (runs Hermes Agent at `127.0.0.1:8642`) or **Remote** mode (connects to a hosted Hermes API server).
2. At the provider step, select **AI/ML API** from the list.
3. Enter your `AIMLAPI_API_KEY` in the key field.
4. Pick a model from the auto-discovered model list.
5. Complete setup. The app saves your config and opens the workspace.

### Change provider in Settings

To switch to AI/ML API after initial setup:

1. Open **Settings** → **Provider**.
2. Select **AI/ML API**.
3. Enter your `AIMLAPI_API_KEY`.
4. Save.

### Saved configuration

Hermes Desktop stores provider config in the standard Hermes files under `~/.hermes/`:

`~/.hermes/.env`:

```bash
AIMLAPI_API_KEY=your_key_here
```

`~/.hermes/config.yaml`:

```yaml
model:
  provider: aimlapi
  base_url: https://api.aimlapi.com/v1
  default: openai/gpt-4o
```

### How the CLI bridge works

The Hermes Agent CLI does not yet have a native `aimlapi` provider ID. Hermes Desktop bridges this by routing AI/ML API traffic through `--provider custom`, passing `CUSTOM_BASE_URL` and mapping `AIMLAPI_API_KEY` to `OPENAI_API_KEY` so the CLI can authenticate. This is transparent — from the desktop UI it behaves like any other built-in provider.

## Model selection

Use exact AI/ML API model IDs. Hermes Desktop auto-discovers available models from `/v1/models` — no hardcoded model list.

Common examples:

* `openai/gpt-4o`
* `anthropic/claude-sonnet-4-5`
* `google/gemini-2.5-flash`

### Good starting models

* `openai/gpt-4o` for strong general use
* `anthropic/claude-sonnet-4-5` for coding and long-form work
* `google/gemini-2.5-flash` for lower latency and lower cost

For the full catalog, use [All Model IDs](/broken/pages/ec6db764340ce0627cef7e114fb5a65a73cafbf4).

## Switch models

Open the **Models** screen to manage saved model configurations per provider. To change the active model mid-session, use the `/model` slash command in chat:

```bash
/model openai/gpt-4o
/model anthropic/claude-sonnet-4-5
```

## Verify the setup

After setup, open a chat and send a message. If the model responds normally, the provider is configured correctly.

You can also check the active provider and model from the chat footer or with the `/status` slash command.

## Config checklist

Make sure these values are set:

* base URL: `https://api.aimlapi.com/v1`
* provider: `AI/ML API` (shown as `aimlapi` in config files)
* model ID: exact AI/ML API model ID
* API key variable: `AIMLAPI_API_KEY`

## Troubleshooting

<details>

<summary>AI/ML API does not appear in the provider list</summary>

The preset was added in [PR #612](https://github.com/fathah/hermes-desktop/pull/612). Update Hermes Desktop to the latest version from [hermesagents.cc](https://hermesagents.cc/) or the [releases page](https://github.com/fathah/hermes-desktop/releases).

</details>

<details>

<summary>My model is missing from the picker</summary>

The model list is pulled live from `/v1/models`. If a model does not appear, set it manually in `~/.hermes/config.yaml`:

```yaml
model:
  default: openai/gpt-4o
```

</details>

<details>

<summary>I get an auth error</summary>

Check that:

* `AIMLAPI_API_KEY` is set in `~/.hermes/.env`
* the key is valid at [aimlapi.com/app/keys](https://aimlapi.com/app/keys)
* no other provider is overriding the env key

Use **Settings → Backup & Debug → Debug dump** for a full diagnostics report.

</details>

<details>

<summary>I want to use a proxy</summary>

Set a custom base URL in `~/.hermes/config.yaml`:

```yaml
model:
  base_url: https://your-proxy.example/v1
```

</details>

## Links

* [All Model IDs](/broken/pages/ec6db764340ce0627cef7e114fb5a65a73cafbf4)
* [AI/ML API keys](https://aimlapi.com/app/keys)
* [AI/ML API model catalog](https://aimlapi.com/models)
* [Hermes Desktop repository](https://github.com/fathah/hermes-desktop)
* [Hermes Desktop releases](https://github.com/fathah/hermes-desktop/releases)
* [Hermes Agent repository](https://github.com/NousResearch/hermes-agent)
