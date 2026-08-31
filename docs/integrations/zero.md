---
description: >-
  Connect Zero, the terminal coding agent, to AI/ML API through its built-in
  provider preset.
---

# Zero

## About

[Zero](https://github.com/Gitlawb/zero) is an AI coding agent for your local terminal. It inspects a repository, edits files, and runs commands, either through its TUI or non-interactively with `zero exec` for scripts and CI.

AI/ML API is a **built-in, recommended provider preset** in Zero — it ships upstream, so there is nothing to patch or build from source. Zero also offers guided onboarding: you can create an AI/ML API account, top it up, and get a key without leaving the terminal.

## Quick start

{% stepper %}
{% step %}
## Install Zero

```bash
npm install -g @gitlawb/zero
```
{% endstep %}

{% step %}
## Set your API key

```bash
export AIMLAPI_API_KEY=your_key_here
```

You can skip this step and let Zero's onboarding create an account and issue a key for you.
{% endstep %}

{% step %}
## Select AI/ML API

```bash
zero providers setup aimlapi --set-active
```
{% endstep %}

{% step %}
## Start Zero

```bash
zero
```
{% endstep %}
{% endstepper %}

## When to use AI/ML API with Zero

AI/ML API works well with Zero when you want:

* one key and one base URL for many model providers
* to switch models without re-configuring the agent
* to onboard from the terminal, without opening a dashboard first

## Prerequisites

Before you start, make sure you have:

* Zero installed (see [github.com/Gitlawb/zero](https://github.com/Gitlawb/zero))
* an AI/ML API key from [aimlapi.com/app/keys](https://aimlapi.com/app/keys) — or use the guided onboarding below
* a model ID from [aimlapi.com/models](https://aimlapi.com/models)

The base URL is:

```
https://api.aimlapi.com/v1
```

Need a key first? Use [API Key Management](/broken/pages/cdd447f8b558d5268491de41a1a02c07771cac9b).

## Set up AI/ML API in Zero

### Option 1 — Provider setup command

```bash
zero providers setup aimlapi --set-active
```

The preset fills in the base URL and default model. `--set-active` makes AI/ML API the provider Zero uses for the next session.

### Option 2 — Setup wizard

Run `zero` and follow the setup wizard, or run it directly:

```bash
zero setup
```

AI/ML API is listed as **aimlapi.com** and sorts to the top of the picker as a recommended provider.

### Option 3 — Environment variable

Export the key before running setup and Zero picks it up automatically:

```bash
# ~/.zshrc or ~/.bashrc
export AIMLAPI_API_KEY=your_key_here
```

### Guided onboarding

If you have no key yet, the onboarding flow in the TUI takes an email, creates an AI/ML API account, lets you choose a top-up amount, opens checkout in the browser, and saves the issued key into your Zero provider profile.

## Model selection

Use exact AI/ML API model IDs. List what is available:

```bash
zero models list
```

### Good starting models

* `anthropic/claude-sonnet-5` — the preset default, strong for coding
* `openai/gpt-5-5` — strong general use
* `google/gemini-3-7-flash` — lower latency and lower cost

For the full catalog, use [All Model IDs](/broken/pages/9db43b2a9ecf64fedb7fcfc447a3ace848669984).

## Config checklist

Make sure these values are set:

* API key variable: `AIMLAPI_API_KEY`
* provider ID: `aimlapi` (shown as **aimlapi.com**)
* base URL: `https://api.aimlapi.com/v1` (built in, no manual config needed)
* model ID: exact AI/ML API chat model ID

## Troubleshooting

<details>

<summary>Zero does not pick up AIMLAPI_API_KEY</summary>

Check that the variable is exported in the current shell:

```bash
echo $AIMLAPI_API_KEY
```

Then confirm what Zero resolved:

```bash
zero doctor
zero providers list
```

</details>

<details>

<summary>aimlapi.com is not in the provider list</summary>

Update Zero to the latest version — the preset ships upstream:

```bash
npm install -g @gitlawb/zero@latest
```

</details>

<details>

<summary>I get an auth error</summary>

Check that:

* `AIMLAPI_API_KEY` is correctly set and exported
* the key is valid at [aimlapi.com/app/keys](https://aimlapi.com/app/keys)
* your balance is sufficient at [aimlapi.com/app](https://aimlapi.com/app)

</details>

<details>

<summary>I want to point Zero at a different endpoint</summary>

`AIMLAPI_INFERENCE_URL` overrides the inference base URL. Leave it unset to use the default `https://api.aimlapi.com/v1`.

</details>

## Links

* [All Model IDs](/broken/pages/9db43b2a9ecf64fedb7fcfc447a3ace848669984)
* [AI/ML API keys](https://aimlapi.com/app/keys)
* [AI/ML API model catalog](https://aimlapi.com/models)
* [Zero repository](https://github.com/Gitlawb/zero)
