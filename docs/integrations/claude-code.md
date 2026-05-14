# Claude Code

This guide explains how to configure **Claude Code** to work with Claude models available through AIML API.

## Overview

Claude Code is a powerful coding agent by Anthropic that can analyze codebases, generate code, and assist with development workflows. By pointing it to AIML API, you can use Claude models available on our platform without connecting directly to Anthropic.

## Prerequisites

* Node.js 18+
* npm
* [AIMLAPI\_KEY](https://aimlapi.com/app/keys)

***

{% stepper %}
{% step %}
### Step 1 — Install Claude Code

Install the CLI globally:

```bash
npm install -g @anthropic-ai/claude-code
```

Verify installation:

```bash
claude --version
```
{% endstep %}

{% step %}
### Step 2 — Configure AIML API

Claude Code uses Anthropic-compatible environment variables. \
You need to override them to point to AIML API.

#### Set API Key

```bash
export ANTHROPIC_API_KEY=<YOUR_AIMLAPI_KEY>
```

#### Set Base URL

```bash
export ANTHROPIC_BASE_URL=https://api.aimlapi.com
```
{% endstep %}

{% step %}
### Step 3 — Select a Model

Claude Code requires a model name. Use any Claude model [available on AIML API](../api-references/text-models-llm/#complete-text-model-list):

```bash
export ANTHROPIC_MODEL=claude-haiku-4-5
```
{% endstep %}

{% step %}
### Step 4 — Run Claude Code

Navigate to your project and start the agent:

```bash
cd your-project
claude
```
{% endstep %}
{% endstepper %}

## Usage Examples

### Ask about your codebase

```bash
claude "Explain the architecture of this project"
```

### Refactor code

```bash
claude "Refactor this code to use async/await"
```

### Generate new functionality

```bash
claude "Add JWT authentication to this API"
```

## How It Works

Claude Code communicates using the Anthropic API format.\
AIML API provides a compatible interface, so no changes to request structure are required.

All requests are routed through:

```
https://api.aimlapi.com
```

{% hint style="warning" %}
Notes

* Only Claude models available on AIML API can be used
* Performance and pricing depend on the selected model
* No additional SDK setup is required
{% endhint %}

## Using CLAUDE.md files

`CLAUDE.md` is a markdown file placed in your project root that Claude Code automatically reads at the beginning of each session. It can be used to define coding conventions, architectural guidelines, preferred libraries, workflows, and review requirements.

## Usage & Cost Monitoring

If you need to monitor usage and costs separately, you can create a dedicated API key for Claude Code usage in your Account. After that, you can view token usage details and corresponding USD costs in the dashboard under the Usage section.

For details, see the [API keys](https://help.aimlapi.com/article/40-starter-guide#API-Key-Management-p9p8e) and [Usage](https://help.aimlapi.com/article/40-starter-guide#Available-Filters-LJ8By) sections in the Starter Guide.

***

## Troubleshooting

<details>

<summary>Claude command not found</summary>

Make sure the package is installed globally:

```bash
npm list -g @anthropic-ai/claude-code
```

</details>

<details>

<summary>Authentication error</summary>

Check your API key:

```bash
echo $ANTHROPIC_API_KEY
```

</details>

<details>

<summary>Model not available</summary>

Ensure that you:

* Selected an _Anthropic_ model
* Chose one [available on AIML API](../api-references/text-models-llm/#complete-text-model-list)
* Specified the correct model ID

</details>

<details>

<summary>Connection issues</summary>

Verify the base URL:

```bash
echo $ANTHROPIC_BASE_URL
```

Expected:

```
https://api.aimlapi.com
```

</details>

## Summary

By configuring Claude Code to use AIML API, you can:

* Run Claude models via a unified API
* Integrate coding agents into your workflow
* Avoid direct dependency on Anthropic infrastructure
