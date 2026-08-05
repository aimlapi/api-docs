# ⚛️ Atomic Agent

## About

Atomic Agent is an open-source, local-first AI agent that runs on your computer. It plans multi-step tasks and executes them with real tools: shell, files, browser automation, skills, and MCP servers. All agent state, memory, and configuration live on your machine in `~/.atomic-agent`.

Atomic Agent can run open models fully locally through a built-in llama.cpp backend, or connect to cloud models. AI/ML API is a **native built-in provider**: one API key gives the agent access to 500+ models, including GPT, Claude, Gemini, Qwen, and Grok families, with no endpoint configuration.

Atomic Agent is MIT-licensed and available for macOS, Linux, and Windows.

{% hint style="success" %}
**No native Anthropic or Google provider exists in Atomic Agent.** AI/ML API is the built-in way to use Claude and Gemini models with it.
{% endhint %}

### What you get

* A terminal agent (CLI + TUI) that plans and executes multi-step tasks
* Tool use out of the box: shell, file operations, browser automation, skills, MCP servers
* Local-first state: config, memory, and sessions stored in `~/.atomic-agent`
* Mix of local and cloud models in one app (for example, local embeddings + cloud chat)
* Live model catalog: the provider fetches the current AI/ML API model list at setup time
* Telegram connector and an OpenAI-compatible local HTTP server
* MIT license, installs without an account

## Prerequisites

* An AIMLAPI key obtained from your [account dashboard](https://aimlapi.com/app/keys)

***

{% stepper %}
{% step %}
### Step 1 — Install Atomic Agent

One command, no account or key required.

macOS / Linux:

```bash
curl -fsSL https://atomicagent.io/install | sh
```

Windows:

```powershell
irm https://atomicagent.io/install.ps1 | iex
```
{% endstep %}

{% step %}
### Step 2 — Open the Provider Panel

Launch the TUI and open the LLM Local/Cloud panel:

```bash
atomic-agent tui
```

Then type:

```
/model
```
{% endstep %}

{% step %}
### Step 3 — Connect AI/ML API

Select **AI/ML API (aimlapi.com — 500+ models, OpenAI-compatible)** from the provider list and paste your API key when prompted.

The wizard stores the key as `AIMLAPI_API_KEY` in `~/.atomic-agent/.env` and writes the provider entry to `~/.atomic-agent/config.json`. The base URL is built into the provider, so there is nothing else to configure.
{% endstep %}

{% step %}
### Step 4 — Pick a Model

Choose a chat model from the list. Atomic Agent fetches the current model catalog live from the AI/ML API, so new models appear as soon as they are released.

The default chat model is `openai/gpt-5.5-2026-04-23`. Any model ID from the [AI/ML API catalog](https://aimlapi.com/models) works, for example `anthropic/claude-sonnet-4-5` or `alibaba/qwen3.8-max-preview` — the configured ID is sent to the API as-is.
{% endstep %}

{% step %}
### Step 5 — Run Your First Task

Ask for something that requires a tool call, for example: "list the files in this folder and summarize them". If the model responds and tools execute, the integration is working.

You can return to `/model` at any time to switch the provider or the model. No restart is required.
{% endstep %}
{% endstepper %}

## Manual Configuration

If you prefer editing files over the wizard, add the provider to the `llm` block of `~/.atomic-agent/config.json`:

```json
{
  "llm": {
    "activeTextProvider": "aimlapi",
    "activeEmbeddingProvider": "local-llama",
    "toolTransport": "auto",
    "providers": [
      {
        "id": "aimlapi",
        "kind": "aimlapi",
        "defaultChatModel": "openai/gpt-5.5-2026-04-23"
      }
    ]
  }
}
```

Then put your key in `~/.atomic-agent/.env`:

```bash
AIMLAPI_API_KEY=your_key_here
```

{% hint style="info" %}
If you prefer the generic `"kind": "openai-compatible"` provider instead, set `"baseUrl": "https://api.aimlapi.com"` **without** the `/v1` suffix. Atomic Agent appends `/v1/chat/completions` itself, and a doubled path returns 404. That provider kind reads its key from `OPENAI_COMPAT_API_KEY`.
{% endhint %}

## Model Notes

* Embedding models from the AI/ML API catalog can be selected too, or embeddings can stay on the local llama-server daemon.
* For cloud models, Atomic Agent uses native function calling, so tool use works out of the box.

## Use Cases

* **Frontier models inside a local agent.** Keep the agent runtime, tools, and files on your machine while using top cloud models for reasoning.
* **Claude and Gemini in Atomic Agent.** These model families are only reachable through an aggregator; AI/ML API is the supported path.
* **One key, many models.** Switch between model families without separate accounts and billing per provider.
* **Mixed setups.** Run embeddings locally and chat in the cloud, or the other way around.

## Troubleshooting

<details>

<summary>401 / authentication errors</summary>

Check that `AIMLAPI_API_KEY` is present in `~/.atomic-agent/.env` and has no extra whitespace. Re-entering the key via the `/model` wizard rewrites it correctly.

</details>

<details>

<summary>404 on chat requests (manual openai-compatible setup)</summary>

Remove the `/v1` suffix from `baseUrl`. The agent appends `/v1/chat/completions` itself.

</details>

<details>

<summary>Model not found</summary>

Verify the exact model ID against the [AI/ML API models list](https://aimlapi.com/models). The ID is passed to the API verbatim.

</details>

<details>

<summary>Switching provider or model later</summary>

Open `/model` in the TUI at any time to change the provider or the chat model. No restart is required.

</details>

## Links

* Website: [atomicagent.io](https://atomicagent.io)
* GitHub: [github.com/AtomicBot-ai/atomic-agent](https://github.com/AtomicBot-ai/atomic-agent)
* Discord: [discord.gg/Us7qXtDGw](https://discord.gg/Us7qXtDGw)
* X: [@atomicagent_io](https://x.com/atomicagent_io)
