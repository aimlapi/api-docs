# MCP

Connect AI/ML API to your AI agent (Claude Code, Cursor, Claude Desktop, and other MCP‑compatible clients) with a single URL and your AI/ML API key. Once connected, your agent can **discover and compare models, run inference (chat / embeddings / image / video / audio), manage long‑running generation jobs, and check your balance** — all in natural language, directly from the client you already use.

{% hint style="info" %}
**What is MCP?** The [Model Context Protocol](https://modelcontextprotocol.io/) is an open standard that lets AI applications talk to external tools and data through a uniform interface. The AI/ML API MCP server exposes the AI/ML API platform as a set of MCP **tools** that any MCP‑compatible agent can call on your behalf.
{% endhint %}

***

## Why use it

The AI/ML API MCP server is a thin, stateless layer in front of the public AI/ML API REST API. Instead of writing HTTP calls, you let your AI agent use AI/ML API as a native tool:

* **One connection, every modality** — text, images, video, audio, embeddings, all through the same server.
* **Model discovery built in** — search the full catalog, compare cards side by side, and let the agent pick the cheapest or fastest model for a task.
* **Real, comparable prices** — the catalog surfaces the same prices you are actually charged (platform margin already applied), so cost comparisons are accurate.
* **Safe long‑running jobs** — video and audio generations return a job you can poll; submits are **idempotent**, so a retry never bills you twice.
* **Predictable, machine‑readable errors** — every failure comes back in a single, stable format your agent can reason about (never a raw upstream message, never your key).

Your usage is billed to the owner of the API key you connect with, exactly as if you had called the REST API directly.

***

## Prerequisites

1. **An AI/ML API account** — sign up at [aimlapi.com](https://aimlapi.com/).
2. **An API key** — create one in your dashboard at [aimlapi.com/app/keys](https://aimlapi.com/app/keys). The key's balance, limits, and permissions apply to every call made through the MCP server.
3. **An MCP‑compatible client** — Claude Code, Cursor, Claude Desktop, or any client that supports MCP over Streamable HTTP.

Keep your API key secret. Anyone with the key can spend your balance.

***

## Connect your client

The server speaks **MCP over Streamable HTTP**. Point your client at the `/mcp` endpoint and send your AI/ML API key as a **Bearer token**.

| Setting            | Value                                    |
| ------------------ | ---------------------------------------- |
| **Endpoint**       | `https://mcp.aimlapi.com/mcp`            |
| **Transport**      | Streamable HTTP                          |
| **Authentication** | `Authorization: Bearer YOUR_AIMLAPI_KEY` |

> The header `X-AIMLAPI-Key: YOUR_AIMLAPI_KEY` is also accepted as an alias if your client makes it easier to set a custom header than a Bearer token.

### Claude Code

Add the server from the command line:

```bash
claude mcp add --transport http aimlapi https://mcp.aimlapi.com/mcp \
  --header "Authorization: Bearer YOUR_AIMLAPI_KEY"
```

…or add it to your project's `.mcp.json` (or your user configuration):

```jsonc
{
  "mcpServers": {
    "aimlapi": {
      "type": "http",
      "url": "https://mcp.aimlapi.com/mcp",
      "headers": { "Authorization": "Bearer YOUR_AIMLAPI_KEY" }
    }
  }
}
```

### Cursor

Edit `~/.cursor/mcp.json` (global) or `.cursor/mcp.json` (per project):

```jsonc
{
  "mcpServers": {
    "aimlapi": {
      "url": "https://mcp.aimlapi.com/mcp",
      "headers": { "Authorization": "Bearer YOUR_AIMLAPI_KEY" }
    }
  }
}
```

### Claude Desktop

On builds that support remote connectors: **Settings → Connectors → Add custom connector**, paste the URL `https://mcp.aimlapi.com/mcp`, and add an `Authorization: Bearer YOUR_AIMLAPI_KEY` header.

If your build only supports local (stdio) servers, bridge to the remote server with [`mcp-remote`](https://www.npmjs.com/package/mcp-remote) in `claude_desktop_config.json`:

```jsonc
{
  "mcpServers": {
    "aimlapi": {
      "command": "npx",
      "args": [
        "-y", "mcp-remote",
        "https://mcp.aimlapi.com/mcp",
        "--header", "Authorization: Bearer YOUR_AIMLAPI_KEY"
      ]
    }
  }
}
```

### Any other client / testing the connection

Any MCP client that supports Streamable HTTP works — set the URL to `https://mcp.aimlapi.com/mcp` and add the `Authorization` header.

To try the server without wiring it into an agent, use the official [MCP Inspector](https://github.com/modelcontextprotocol/inspector):

```bash
npx @modelcontextprotocol/inspector
```

In the Inspector: set **Transport** to _Streamable HTTP_, **URL** to `https://mcp.aimlapi.com/mcp`, add a header `Authorization: Bearer YOUR_AIMLAPI_KEY`, then **Connect → List Tools** and call any tool (start with `ping`).

> **Note on claude.ai (web).** The claude.ai web app is **not supported yet**. Its web connectors require OAuth, while this server authenticates with an AI/ML API key. Use Claude Code, Cursor, or Claude Desktop instead. (OAuth support is on the roadmap.)

***

## How billing works

* Every inference or generation call is billed to the **owner of the API key** you connected with — identical to calling the REST API directly.
* Your key's **balance, spending limit, and permissions** are enforced on every call. If the balance is too low or a limit is exceeded, the call fails with a clear error (see [Error handling](mcp.md#error-handling)) and nothing is charged.
* **Discovery and account tools are free** (`models_list`, `models_search`, `models_compare`, `model_get`, `models_find_best`, `account_balance`, `account_usage`, `ping`) — they read catalog and account data and never run a model.
* **Inference and generation tools are billed** (`llm_chat`, `embeddings_create`, `image_generate`, `video_generate`, `audio_generate`).
* Prices shown in the catalog are in **USD with the platform margin already applied**, so they match what you are actually charged.

Check your balance any time by asking the agent to run `account_balance`, or your month‑to‑date usage with `account_usage`.

***

## Tools reference

The server exposes **15 tools**. Your agent calls them automatically based on your requests; you rarely name a tool explicitly. Parameters below are the ones you (or the agent) can set — **required** parameters are in **bold**.

### Model discovery (free)

| Tool               | Parameters                                                                  | What it does                                                                                                                                              |
| ------------------ | --------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `models_list`      | `modality`, `max_price`, `min_context`, `capabilities[]`, `limit`, `cursor` | Browse the catalog with optional filters. Returns compact cards with a comparable headline price. Cursor‑paginated.                                       |
| `models_search`    | **`query`**, plus the same filters                                          | Case‑insensitive substring search over model id, name, description, and tags.                                                                             |
| `models_compare`   | **`ids[]`** (2–10)                                                          | Full cards for several models side by side: capabilities, the complete per‑unit price list, and recent performance metrics.                               |
| `model_get`        | **`id`**                                                                    | The full card for one model: capabilities, per‑unit USD pricing, structured modalities, and speed metrics (TTFT / tokens‑per‑second / duration, p50–p99). |
| `models_find_best` | **`optimize_for`** (`cheapest` \| `fastest`), plus filters, `limit`         | Deterministic ranking of models for an objective. Models that can't be ranked (priced on request, or no recent traffic) are summarised under `excluded`.  |

**Filters** (shared by list / search / find\_best):

* `modality` — one of `text`, `image`, `video`, `audio`, `embedding`, `ocr`, `other`.
* `max_price` — maximum comparable price for the model's headline unit, normalized so models are comparable (for text models this is **USD per 1,000,000 tokens**). Most meaningful when paired with a `modality` filter; models priced on request are excluded.
* `min_context` — minimum context window, in tokens.
* `capabilities[]` — required capabilities; **all** must be present. Curated vocabulary, e.g. `tools`, `streaming`, `vision`, `reasoning`, `structured_output`, `web_search`, `audio`, `file_input`, `image_to_video`.

> **Tip:** for a fair "cheapest" or "fastest" ranking, always add a `modality` filter so you compare like with like (e.g. only text models).

### Inference (billed)

| Tool                | Parameters                                                                                                                                                                                  | What it does                                                                                                                                                                       |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `llm_chat`          | **`model`**, **`messages`**, plus common OpenAI params (`temperature`, `top_p`, `max_tokens`, `stop`, `response_format`, `tools`, `tool_choice`, `reasoning_effort`, `provider`, `seed`, …) | Runs a chat completion against any AI/ML API LLM. `messages` is an OpenAI‑style array (`{ role, content }`, oldest first). The complete assistant reply is returned in one result. |
| `embeddings_create` | **`model`**, **`input`**, `encoding_format`, `dimensions`                                                                                                                                   | Creates embedding vector(s) for a text string or an array of strings.                                                                                                              |

The `model` parameter selects which model runs — pass an id or a public alias (e.g. `"gpt-5"`, `"claude-opus-4-8"`, `"text-embedding-3-small"`). Use `models_search` or `models_find_best` first if you're not sure which id to use.

### Media generation (billed)

| Tool             | Parameters                                             | What it does                                                                               |
| ---------------- | ------------------------------------------------------ | ------------------------------------------------------------------------------------------ |
| `image_generate` | **`model`**, **`prompt`**, `params`                    | **Synchronous** — the image result is returned inline in one call.                         |
| `video_generate` | **`model`**, **`prompt`**, `params`, `idempotency_key` | **Asynchronous** — returns a `job_id` immediately; poll it and fetch the result when done. |
| `audio_generate` | **`model`**, **`prompt`**, `params`, `idempotency_key` | **Asynchronous** — returns a `job_id` immediately; poll it and fetch the result when done. |

Model‑specific options go inside a **`params`** object, forwarded to the model as‑is — e.g. `size` / `n` / `response_format` for images, `duration` / `aspect_ratio` / `resolution` for video, `voice` for audio. See the model's card (`model_get`) for what it accepts.

### Jobs (free — poll an async generation)

| Tool         | Parameters   | What it does                                                                                                               |
| ------------ | ------------ | -------------------------------------------------------------------------------------------------------------------------- |
| `job_status` | **`job_id`** | Returns the current status: `processing`, `complete`, or `error`.                                                          |
| `job_result` | **`job_id`** | Returns the finished artifact (media URL + usage) once complete; otherwise returns the current status with `ready: false`. |

Jobs are private to the key that created them: an unknown or someone else's `job_id` returns `job_not_found`.

### Account & diagnostics (free)

| Tool              | What it does                                                                       |
| ----------------- | ---------------------------------------------------------------------------------- |
| `account_balance` | Current account balance (in API credits) and whether it is running low.            |
| `account_usage`   | This key's month‑to‑date usage and its configured spending limit, if any.          |
| `ping`            | Returns `pong` — a quick check that the server is reachable and your key is valid. |

***

## Working with async generation (video & audio)

Image generation is synchronous — you get the result in a single `image_generate` call. **Video and audio are asynchronous** because they can take a while.

{% stepper %}
{% step %}
## Submit

Call `video_generate` (or `audio_generate`) with a `model` and `prompt`. You immediately get back a job handle:

```json
{ "job_id": "…", "kind": "video", "model": "…", "status": "processing" }
```
{% endstep %}

{% step %}
## Poll

Call `job_status` with that `job_id` until the status changes:

```json
{ "job_id": "…", "kind": "video", "model": "…", "status": "processing" }
```

→ eventually `"status": "complete"` or `"status": "error"`.
{% endstep %}

{% step %}
## Fetch the result

Call `job_result` with the `job_id`:

```json
{
  "job_id": "…",
  "kind": "video",
  "model": "…",
  "status": "complete",
  "result": { "url": "https://…", "usage": { … } }
}
```

If the job isn't finished yet, `job_result` returns `"status": "processing"` with `"ready": false`. If it failed, it returns `"status": "error"` with an `error` object.
{% endstep %}
{% endstepper %}

Your agent handles this loop for you — you can simply say _"generate a video of … and give me the link when it's ready."_

### Idempotency — retries never double‑charge

Async submits are **idempotent**. If a submit is retried (network hiccup, agent retry, duplicate request), you get back the **same `job_id`** — no second generation is started and you are **not charged twice**.

* Pass an explicit **`idempotency_key`** to control this, or rely on the automatically derived key (based on your account, model, and request parameters).
* Idempotency holds for a **24‑hour** window.

***

## Error handling

Every tool failure returns a single, machine‑readable envelope — never a raw upstream or internal message, and never your API key:

```json
{
  "error": {
    "code": "insufficient_balance",
    "message": "Your AIMLAPI balance is insufficient to complete this request.",
    "retryable": false,
    "request_id": "…"
  }
}
```

* **`code`** — a stable machine‑readable identifier (see the table below). Branch on this.
* **`message`** — human‑readable prose. May change; don't parse it.
* **`retryable`** — `true` for transient conditions where the same request may succeed on a later attempt.
* **`request_id`** — include this when contacting support so we can correlate logs.

| Code                    | Retryable | Meaning                                                                                     |
| ----------------------- | :-------: | ------------------------------------------------------------------------------------------- |
| `invalid_key`           |     no    | The API key is missing, invalid, disabled, revoked, or not permitted to use the MCP server. |
| `insufficient_balance`  |     no    | Your balance is too low to complete the request. Top up and retry.                          |
| `key_limit_exceeded`    |     no    | The key exceeded its configured usage/spending limit.                                       |
| `model_not_found`       |     no    | The requested model id/alias doesn't exist.                                                 |
| `validation_error`      |     no    | The request is malformed (e.g. a missing or invalid parameter).                             |
| `job_not_found`         |     no    | The `job_id` is unknown or belongs to another account.                                      |
| `upstream_rate_limited` |  **yes**  | A rate limit was reached upstream — retry shortly.                                          |
| `upstream_error`        |  **yes**  | The upstream service is temporarily unavailable — retry.                                    |

Retryable errors (`upstream_rate_limited`, `upstream_error`) are safe to retry after a short backoff. Non‑retryable errors need a change on your side (fix the request, top up, or adjust the key).

***

## Example agent prompts

Because the tools plug into your agent, you interact in plain language. A few examples:

* _"List the five cheapest text models with at least a 100k context window, then use the cheapest one to summarize this document."_
* _"Compare `gpt-5`, `claude-opus-4-8`, and `gemini-2.5-pro` — capabilities, price, and speed — and recommend one for long‑context reasoning."_
* _"What's the fastest image model right now? Generate a 1024×1024 logo concept with it."_
* _"Generate a 5‑second video of waves on a beach and give me the download link when it's ready."_
* _"Create embeddings for these ten product descriptions with `text-embedding-3-small`."_
* _"What's my AI/ML API balance and how much have I used this month?"_

***

## FAQ & troubleshooting

<details>

<summary>The agent says it can't authenticate / I get <code>invalid_key</code>.</summary>

Double‑check the `Authorization: Bearer YOUR_AIMLAPI_KEY` header is set with a real key from [aimlapi.com/app/keys](https://aimlapi.com/app/keys), and that the key is enabled and permitted to use the MCP server. Run `ping` to confirm the connection.

</details>

<details>

<summary>Can I use this from the claude.ai website?</summary>

Not yet — see the note in [Connect your client](mcp.md#connect-your-client). Use Claude Code, Cursor, or Claude Desktop for now.

</details>

<details>

<summary>Is my usage billed differently through MCP?</summary>

No. It's billed to your API key exactly like a direct REST API call. Discovery and account tools are free; inference and generation tools are billed at the model's normal rate.

</details>

<details>

<summary>A generation failed midway — was I charged?</summary>

For a failed **submit**, no billable generation is created and you aren't charged. For an error after a generation has already started, the model's normal billing applies. Retrying an async submit with the same `idempotency_key` never starts a second generation.

</details>

<details>

<summary>Do the catalog prices include the markup?</summary>

Yes. Catalog prices are in USD with the platform margin already applied — they match what you're actually charged.

</details>

<details>

<summary>A tool returned <code>upstream_rate_limited</code> or <code>upstream_error</code>.</summary>

These are transient (`retryable: true`). Wait a moment and try again.

</details>

***

## Support

* **Dashboard & API keys:** [aimlapi.com/app/keys](https://aimlapi.com/app/keys)
* **About MCP:** [modelcontextprotocol.io](https://modelcontextprotocol.io/)
* Include the `request_id` from an error envelope when contacting support so we can trace the request in our logs.
