# Money Printer Turbo

## About

[MoneyPrinterTurbo](https://github.com/harry0703/MoneyPrinterTurbo) is a tool for generating short videos with one click using AI LLMs. It uses a language model to write scripts and narration, then assembles the video automatically. The LLM provider is configurable via `config.toml` and the built-in WebUI.

As of [PR #1022](https://github.com/harry0703/MoneyPrinterTurbo/pull/1022) (merged June 12, 2026), AI/ML API is a built-in provider option in MoneyPrinterTurbo. Select it in the WebUI provider setup or set it in `config.toml` to use any AI/ML API model for script and story generation.

## Quick start

{% stepper %}
{% step %}
## Open `config.toml`

Open `config.toml` (copy from `config.example.toml` if it does not exist yet).
{% endstep %}

{% step %}
## Set the provider and key

Set the provider to `AIML API` and add your key:

```toml
[app]
llm_provider = "aimlapi"
aimlapi_api_key = "your_key_here"
aimlapi_base_url = "https://api.aimlapi.com/v1"
aimlapi_model_name = "openai/gpt-4o-mini"
```
{% endstep %}

{% step %}
## Start MoneyPrinterTurbo

Start MoneyPrinterTurbo and generate a video.
{% endstep %}
{% endstepper %}

## When to use AI/ML API with MoneyPrinterTurbo

AI/ML API works well with MoneyPrinterTurbo when you want:

* one key to access many model families for script generation
* an OpenAI-compatible endpoint that fits alongside existing provider options
* easy switching between models (e.g. faster/cheaper for drafts, stronger for final scripts)

## Prerequisites

Before you start, make sure you have:

* MoneyPrinterTurbo installed (see the [repository](https://github.com/harry0703/MoneyPrinterTurbo))
* an AI/ML API key from [aimlapi.com/app/keys](https://aimlapi.com/app/keys)
* a model ID from [aimlapi.com/models](https://aimlapi.com/models)

The base URL is:

```
https://api.aimlapi.com/v1
```

Need a key first? Use [API Key Management](/broken/pages/5ba01981a4933a6256186cdeb80677bb1add0916).

## Option 1: Configure via config.toml

Open or create `config.toml` from the project root (use `config.example.toml` as a starting point).

Set the provider and your credentials:

```toml
[app]
llm_provider = "aimlapi"
aimlapi_api_key = "your_key_here"
aimlapi_base_url = "https://api.aimlapi.com/v1"
aimlapi_model_name = "openai/gpt-4o-mini"
```

`aimlapi_base_url` is optional — the default is already `https://api.aimlapi.com/v1`.

## Option 2: Configure via WebUI

1. Start MoneyPrinterTurbo.
2. Open the WebUI (default: `http://localhost:8501`).
3. Go to the provider setup section.
4. Select **AIML API** from the provider list.
5. Enter your AI/ML API key and pick a model.
6. Save and generate.

## Model selection

Use exact AI/ML API model IDs. The default model is `openai/gpt-4o-mini`.

Common examples for script and story generation:

* `openai/gpt-4o-mini` — fast and cost-effective, good default
* `openai/gpt-4o` — stronger output for complex scripts
* anthropic/claude-sonnet-4.5 — strong for long-form narrative
* `google/gemini-2.5-flash` — lower latency, lower cost

### Good starting models

Start with `openai/gpt-4o-mini` for most video generation tasks. Switch to `openai/gpt-4o` or `anthropic/claude-sonnet-4.5` if you need richer, longer scripts.

For the full catalog, use [All Model IDs](/broken/pages/8ed552f6e450f3fe9c63911687e8431a6635b5be).

## Config checklist

Make sure these values are set:

* provider: `aimlapi`
* base URL: `https://api.aimlapi.com/v1`
* API key: aimlapi\_api\_key in config.toml, or the AIML API key field in WebUI
* model ID: exact AI/ML API model ID

## Troubleshooting

<details>

<summary>AIML API does not appear in the WebUI provider list</summary>

The preset was added in [PR #1022](https://github.com/harry0703/MoneyPrinterTurbo/pull/1022). Update MoneyPrinterTurbo to the latest version.

</details>

<details>

<summary>I get an auth error</summary>

Check that:

* aimlapi\_api\_key is correctly set in config.toml
* the key is valid at [aimlapi.com/app/keys](https://aimlapi.com/app/keys)
* `llm_provider` is set to `aimlapi`

</details>

<details>

<summary>Script generation returns an error about the model</summary>

Make sure the model ID is a chat-completion model supported by AI/ML API. Check the full list at [aimlapi.com/models](https://aimlapi.com/models) or use [All Model IDs](/broken/pages/8ed552f6e450f3fe9c63911687e8431a6635b5be).

</details>

<details>

<summary>I want to use a proxy</summary>

Override the base URL in `config.toml`:

```toml
[aimlapi]
aimlapi_base_url = "https://your-proxy.example/v1"
```

</details>

## Links

* [All Model IDs](/broken/pages/8ed552f6e450f3fe9c63911687e8431a6635b5be)
* [AI/ML API keys](https://aimlapi.com/app/keys)
* [AI/ML API model catalog](https://aimlapi.com/models)
* [MoneyPrinterTurbo repository](https://github.com/harry0703/MoneyPrinterTurbo)
