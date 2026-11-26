---
description: >-
  Use AI/ML API models for the AI agents in AiSOC, the self-hosted AI security
  operations center, through its custom endpoint credential.
---

# AiSOC

## About

[AiSOC](https://github.com/beenuar/AiSOC) is an open-source, self-hostable AI Security Operations Center. It ingests security telemetry, detects threats, and investigates them with AI agents.

AiSOC can run its agents on any OpenAI-compatible endpoint through a **Custom endpoint** credential. Since [PR #1543](https://github.com/beenuar/AiSOC/pull/1543) (AiSOC **v20.3.0** and later), the settings form can also list the models an endpoint offers, so you can pick an AI/ML API model from a dropdown instead of typing its ID.

## Quick start

{% stepper %}
{% step %}
## Start AiSOC

```bash
git clone https://github.com/beenuar/AiSOC && cd AiSOC
make up
```
{% endstep %}

{% step %}
## Open the credential form

In the console, go to **Settings → Deployment & AI** and click **Configure BYOK credential**.
{% endstep %}

{% step %}
## Fill in AI/ML API

* **Provider**: Custom endpoint
* **Base URL**: `https://api.aimlapi.com/v1`
* **API key**: your AI/ML API key
{% endstep %}

{% step %}
## Pick a model and save

Click **List models from endpoint**, choose a model, then click **Save credential** and **Test**.
{% endstep %}
{% endstepper %}

## When to use AI/ML API with AiSOC

AI/ML API works well with AiSOC when you want:

* to choose the model behind AiSOC's agents from hundreds of chat models with one key
* to switch models for a tenant without redeploying AiSOC
* a hosted model endpoint instead of running a model yourself

## Prerequisites

Before you start, make sure you have:

* AiSOC v20.3.0 or later, running (see the [AiSOC quick start](https://github.com/beenuar/AiSOC#quick-start))
* an account in the AiSOC console that can change settings
* an AI/ML API key from [aimlapi.com/app/keys](https://aimlapi.com/app/keys)

Need a key first? Use [API Key Management](../api-references/service-endpoints/api-key-management.md).

## Set up AI/ML API in AiSOC

1. Open **Settings → Deployment & AI**.
2. Click **Configure BYOK credential** (or **Edit BYOK credential** if one exists).
3. Set **Provider** to **Custom endpoint**.
4. Set **Base URL** to `https://api.aimlapi.com/v1`.
5. Paste your AI/ML API key into **API key**. AiSOC encrypts the key before storing it and never shows it again in the UI.
6. Click **List models from endpoint** and choose a model from the list, or type a model ID into **Model**.
7. Make sure **Use this credential** is on.
8. Click **Save credential**, then **Test**.

AiSOC sends chat requests to `https://api.aimlapi.com/v1/chat/completions` and reads the model list from `https://api.aimlapi.com/v1/models`.

## Model selection

**List models from endpoint** shows only chat models from the AI/ML API catalog.

For the full catalog, use [All Model IDs](../api-references/model-database.md).

## Config checklist

Make sure these values are set:

* Provider: **Custom endpoint**
* Base URL: `https://api.aimlapi.com/v1`
* API key: your AI/ML API key
* Model: exact AI/ML API chat model ID
* **Use this credential**: on

## Troubleshooting

<details>

<summary>I don't see "List models from endpoint"</summary>

Model listing arrived in AiSOC v20.3.0. Update AiSOC, or type the model ID into **Model** by hand.

</details>

<details>

<summary>Test fails with an auth error</summary>

Check that:

* the key is valid at [aimlapi.com/app/keys](https://aimlapi.com/app/keys)
* the base URL is exactly `https://api.aimlapi.com/v1`
* your balance is sufficient at [aimlapi.com/app](https://aimlapi.com/app)

</details>

<details>

<summary>AiSOC keeps using the default model</summary>

Make sure **Use this credential** is on. When it is off, AiSOC falls back to the defaults of the deployment without deleting your saved settings.

</details>

## Links

* [AiSOC repository](https://github.com/beenuar/AiSOC)
* [AI/ML API keys](https://aimlapi.com/app/keys)
* [AI/ML API model catalog](https://aimlapi.com/models)
