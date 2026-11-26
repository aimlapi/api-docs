---
description: >-
  Use an AI/ML API vision model as the VLM in rea-video, the shot-by-shot video
  breakdown tool.
---

# rea-video

## About

[rea-video](https://github.com/JuneYaooo/rea-video) reverse-engineers videos shot by shot: whether a shot was filmed, AI-generated or coded, and how to remake it. It runs deterministic forensics offline and can add a multimodal model (VLM) that looks at the frames to improve its calls.

rea-video talks to any OpenAI-compatible VLM endpoint, so you can point it at AI/ML API with three environment variables. Since [PR #19](https://github.com/JuneYaooo/rea-video/pull/19) (rea-video **v0.1.0**), its VLM requests carry a `rea-video` User-Agent, which some gateways require.

## Quick start

{% stepper %}
{% step %}
## Install rea-video

You need Python 3.10 or later and ffmpeg.

```bash
pip install "rea-video[ocr] @ git+https://github.com/JuneYaooo/rea-video"
```
{% endstep %}

{% step %}
## Point the VLM at AI/ML API

```bash
export REA_VLM_BASE_URL=https://api.aimlapi.com/v1
export REA_VLM_API_KEY=your_key_here
export REA_VLM_MODEL=google/gemini-3.6-flash
```
{% endstep %}

{% step %}
## Run a breakdown with the VLM

```bash
rea-video decompose ref.mp4 -o out/ref --vlm
```
{% endstep %}
{% endstepper %}

## When to use AI/ML API with rea-video

AI/ML API works well with rea-video when you want:

* to try different vision models for shot analysis with one key
* a fallback list of models from different providers
* the same key for other tools in your video workflow

## Prerequisites

Before you start, make sure you have:

* rea-video v0.1.0 or later
* an AI/ML API key from [aimlapi.com/app/keys](https://aimlapi.com/app/keys)
* a vision-capable chat model ID from [aimlapi.com/models](https://aimlapi.com/models)

Need a key first? Use [API Key Management](../api-references/service-endpoints/api-key-management.md).

## Configure rea-video

rea-video reads its VLM settings from the environment:

| Variable | Value for AI/ML API |
| --- | --- |
| `REA_VLM_BASE_URL` | `https://api.aimlapi.com/v1` |
| `REA_VLM_API_KEY` | your AI/ML API key |
| `REA_VLM_MODEL` | a vision model ID, or a comma-separated fallback list |

All three must be set. When they are, rea-video uses this endpoint instead of Gemini and sends requests to `https://api.aimlapi.com/v1/chat/completions`. The same model also rewrites remake prompts.

### Keep settings in a file

Put the same lines in a file and pass it with `--env-file`:

```bash
# aimlapi.env
REA_VLM_BASE_URL=https://api.aimlapi.com/v1
REA_VLM_API_KEY=your_key_here
REA_VLM_MODEL=google/gemini-3.6-flash
```

```bash
rea-video --env-file aimlapi.env decompose ref.mp4 -o out/ref --vlm
```

### Optional settings

* `REA_VLM_MEDIA`: `both` (default: a short clip plus keyframes), `video` or `frames`. Use `frames` if your model does not accept video input.
* `REA_VLM_VIDEO_PART`: `image_url` or `video_url`, how a clip is attached.
* `REA_VLM_REASONING_EFFORT`: `low`, `medium` or `high`, passed to thinking models.

## Model selection

Use a model that accepts image input. To fall back to another model when a call fails, list several IDs:

```bash
export REA_VLM_MODEL=google/gemini-3.6-flash,anthropic/claude-sonnet-5
```

For the full catalog, use [All Model IDs](../api-references/model-database.md).

## Verify

After a run, check the `VLM:` line in the summary:

```bash
rea-video summary out/ref
```

If every VLM call failed, the run still finishes, and the summary says so.

## Troubleshooting

<details>

<summary>The summary says all VLM calls failed</summary>

Check that:

* all three `REA_VLM_*` variables are set in the shell that runs rea-video, or in the `--env-file`
* the key is valid at [aimlapi.com/app/keys](https://aimlapi.com/app/keys) and your balance is sufficient
* the model accepts images; if it rejects video clips, set `REA_VLM_MEDIA=frames`

</details>

<details>

<summary>rea-video still uses Gemini</summary>

rea-video uses the OpenAI-compatible endpoint only when `REA_VLM_BASE_URL`, `REA_VLM_API_KEY` and `REA_VLM_MODEL` are all set.

</details>

## Links

* [rea-video repository](https://github.com/JuneYaooo/rea-video)
* [AI/ML API keys](https://aimlapi.com/app/keys)
* [AI/ML API model catalog](https://aimlapi.com/models)
