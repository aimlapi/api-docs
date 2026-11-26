---
description: >-
  AI/ML API is listed in models.dev, the open model catalog that OpenCode, Cline
  and other tools use to build their provider lists.
---

# models.dev

## About

[models.dev](https://models.dev) is an open catalog of AI models and providers: model IDs, context limits, prices, and the settings a client needs to call each provider. Coding tools read it to build their provider and model lists, so a provider listed there shows up in those tools without extra code.

AI/ML API is listed in models.dev as **AI/ML API** (provider ID `aimlapi`) since [PR #9531](https://github.com/anomalyco/models.dev/pull/9531). The entry describes AI/ML API as an OpenAI-compatible provider:

| Field | Value |
| --- | --- |
| Provider ID | `aimlapi` |
| Name | AI/ML API |
| API key variable | `AIMLAPI_API_KEY` |
| Base URL | `https://api.aimlapi.com/v1` |
| SDK package | `@ai-sdk/openai-compatible` |

You can see the entry and its models at [models.dev](https://models.dev) or in the raw catalog at `https://models.dev/api.json` under the `aimlapi` key.

## Tools that pick up the entry

### OpenCode

[OpenCode](https://github.com/anomalyco/opencode) builds its list of providers from the models.dev catalog. AI/ML API appears there as a native provider.

1. Run:

   ```bash
   opencode auth login
   ```

   or type `/connect` inside the OpenCode TUI.
2. Pick **AI/ML API** from the list (it is in the **Services** group).
3. Paste your AI/ML API key.
4. Choose an AI/ML API model with `/models`.

Instead of logging in, you can export the key, and OpenCode picks it up from the environment:

```bash
export AIMLAPI_API_KEY=your_key_here
opencode
```

{% hint style="info" %}
Prefer a browser sign-in with no key to copy? `npx aimlapi opencode` signs you in and starts OpenCode with AI/ML API as a provider. See [CLI](../quickstart/cli.md#opencode).
{% endhint %}

### Cline

Cline generates its provider list from models.dev. Since Cline v4.1.24, **AI/ML API** is in the provider list in Cline settings. See [Cline](cline.md).

## Prerequisites

* an AI/ML API key from [aimlapi.com/app/keys](https://aimlapi.com/app/keys)
* a recent version of the tool you want to use

Need a key first? Use [API Key Management](../api-references/service-endpoints/api-key-management.md).

## Model selection

The models.dev entry lists AI/ML API chat models with their exact IDs, for example `openai/gpt-5-5` or `anthropic/claude-sonnet-5`. Tools show the models from the catalog version they ship with or download.

For the full AI/ML API catalog, use [All Model IDs](../api-references/model-database.md).

## Troubleshooting

<details>

<summary>AI/ML API is missing from my tool's provider list</summary>

Update the tool. Tools ship or cache a copy of the catalog, and older versions were built before AI/ML API was added.

</details>

<details>

<summary>A model I need is not in the list</summary>

The catalog lists a subset of AI/ML API chat models. If your tool lets you type a model ID by hand, use the exact ID from [aimlapi.com/models](https://aimlapi.com/models).

</details>

## Links

* [models.dev](https://models.dev)
* [models.dev repository](https://github.com/anomalyco/models.dev)
* [AI/ML API keys](https://aimlapi.com/app/keys)
* [AI/ML API model catalog](https://aimlapi.com/models)
