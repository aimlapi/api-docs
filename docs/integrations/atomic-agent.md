# ⚛️ Atomic Agent

<div align="left" data-with-frame="false"><figure><img src="../.gitbook/assets/atomic-agent-logo.png" alt="Atomic Agent logo" width="188"><figcaption></figcaption></figure></div>

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

***

## Quick Install

One command, no account or key required:

```sh
# macOS / Linux
curl -fsSL https://atomicagent.io/install | sh
```

```powershell
# Windows
irm https://atomicagent.io/install.ps1 | iex
```

***

## Configuration

You will need an AIMLAPI key from your [account dashboard](https://aimlapi.com/app/keys).

### Option 1: Built-in provider wizard (recommended)

Atomic Agent ships with a native AI/ML API provider, so there is nothing to configure by hand.

1. Run `atomic-agent tui`.
2. Type `/model` to open the LLM Local/Cloud panel.
3. Select **AI/ML API (aimlapi.com — 500+ models, OpenAI-compatible)**.
4. Paste your API key when prompted.
5. Pick a chat model. The list is fetched live from the AI/ML API, so new models appear as soon as they are released.

The wizard stores the key as `AIMLAPI_API_KEY` in `~/.atomic-agent/.env` and writes the provider entry to `~/.atomic-agent/config.json`.

### Option 2: Manual configuration

Add the provider to the `llm` block of `~/.atomic-agent/config.json`:

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

```sh
AIMLAPI_API_KEY=your_key_here
```

The base URL (`https://api.aimlapi.com`) is built into the provider; you do not need to set it.

{% hint style="info" %}
If you prefer the generic `"kind": "openai-compatible"` provider instead, set `"baseUrl": "https://api.aimlapi.com"` **without** the `/v1` suffix. Atomic Agent appends `/v1/chat/completions` itself, and a doubled path returns 404. That provider kind reads its key from `OPENAI_COMPAT_API_KEY`.
{% endhint %}

***

## Model Selection

* Default chat model for the AI/ML API provider: `openai/gpt-5.5-2026-04-23`.
* Any model ID from the [AI/ML API catalog](https://aimlapi.com/models) works, for example `anthropic/claude-sonnet-4-5` or `alibaba/qwen3.8-max-preview`. The configured model ID is sent to the API as-is, so you are not limited to the bundled list.
* Embedding models from the AI/ML API catalog can be selected too, or embeddings can stay on the local llama-server daemon.
* For cloud models, Atomic Agent uses native function calling, so tool use works out of the box.

***

## Verification

Start a session:

```sh
atomic-agent tui
```

Ask for something that requires a tool call, for example: "list the files in this folder and summarize them". If the model responds and tools execute, the integration is working.

***

## Use Cases

* **Frontier models inside a local agent.** Keep the agent runtime, tools, and files on your machine while using top cloud models for reasoning.
* **Claude and Gemini in Atomic Agent.** These model families are only reachable through an aggregator; AI/ML API is the supported path.
* **One key, many models.** Switch between model families without separate accounts and billing per provider.
* **Mixed setups.** Run embeddings locally and chat in the cloud, or the other way around.

***

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

***

## Links

* Website: [atomicagent.io](https://atomicagent.io)
* GitHub: [github.com/AtomicBot-ai/atomic-agent](https://github.com/AtomicBot-ai/atomic-agent)
* Discord: [discord.gg/Us7qXtDGw](https://discord.gg/Us7qXtDGw)
* X: [@atomicagent_io](https://x.com/atomicagent_io)
