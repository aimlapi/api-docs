---
description: >-
  Ready-made tools — web search, page extraction, screenshots, news, company
  data and more — callable with your AI/ML API key from agents, MCP clients and
  your own apps.
icon: toolbox
hidden: true
---

# Toolbox

**Toolbox** is a set of ready-made actions your LLM can use: web search, reading a web page as Markdown, website screenshots, news search, company and domain data, and hundreds more. You call them with the **same AI/ML API key** you use for models. There is no separate account to sign up for and no third-party key to manage, and usage is billed to your AI/ML API balance.

Use them when a model needs **fresh or external data**, or needs to **act**, beyond what it already knows. Typical cases: a research agent that searches and cites sources, a support bot that reads a customer's page, or an app that builds a report with a live screenshot.

## Ways to use them

| You are building… | Use | Who runs the tool |
| --- | --- | --- |
| An agent in **Claude Code, Cursor, Claude Desktop** | [MCP](mcp.md) — the `tools_*` tools appear automatically | your MCP client |
| Your **own app or pipeline** | the REST API below | your code |
| An app on **chat/completions** with function calling | tool definitions in `tools[]` + `/v1/tools/run` | your code |
| A one-call agent on **/v1/responses** (OpenAI models) | our MCP server as a `{"type": "mcp"}` tool | the model |

**Base URL:** `https://tools.aimlapi.com`. **Auth:** `Authorization: Bearer <YOUR_AIMLAPI_KEY>`.

## Quickstart: MCP

The fastest way in. One command, no API key to paste, and the whole Toolbox shows up in your agent.

{% tabs %}
{% tab title="Claude Code" %}
```bash
claude mcp add --transport http --scope user aimlapi https://mcp.aimlapi.com/mcp
```

Then, in a Claude Code session, run `/mcp`, pick **aimlapi** and choose **Authenticate** — a browser opens for you to sign in to AI/ML API.

`--scope user` makes the server available in every project; drop it to add it to the current folder only. Do not pass `--header` — that switches the client to API-key auth instead of the browser sign-in.
{% endtab %}

{% tab title="Cursor" %}
Add to `~/.cursor/mcp.json` (global) or `.cursor/mcp.json` (project), with no `headers` block — leaving it out is what triggers the sign-in:

```json
{
  "mcpServers": {
    "aimlapi": {
      "url": "https://mcp.aimlapi.com/mcp"
    }
  }
}
```

Then open **Cursor Settings → Tools & Integrations**, find **aimlapi**, click **···→ Enable**, then **Login**.
{% endtab %}

{% tab title="Claude Desktop" %}
**Settings → Connectors → Add custom connector**, name it `AIMLAPI` and point it at:

```
https://mcp.aimlapi.com/mcp
```

Click **Add**, then **Connect** on the new connector and sign in. Adding alone does not authenticate it — the tools stay inactive until you click **Connect**.
{% endtab %}
{% endtabs %}

**What you get.** Four tools that hand the agent the whole catalog — it searches for what it needs, checks the price, and runs it:

```
tools_search → tools_inspect → tools_run → tools_run_status
```

Ask for something that needs live data and the agent works it out by itself:

> _"Find three fresh news items about the Model Context Protocol and give me the links."_

It calls `tools_search` to find a news tool, `tools_inspect` to see the input it takes, then `tools_run`. You pay only for the run; the other three calls are free. Results arrive marked `"untrusted": true`, so the agent treats them as data rather than instructions.

The same connection also exposes the model tools — chat, images, embeddings, balance. See [MCP](mcp.md) for the full client list, OAuth details and troubleshooting.

## REST: search → inspect → run

**1. Find a tool.** Describe what you need in plain words.

```bash
curl https://tools.aimlapi.com/v1/tools/search \
  -H "Authorization: Bearer $AIMLAPI_KEY" -H "Content-Type: application/json" \
  -d '{"query": "web search", "limit": 5}'
```

```json
[{ "id": "web/search", "name": "web_search", "description": "Search the web and return a list of relevant pages.",
   "pricing": { "type": "tiered", "amount_usd": 0.0091 } }, …]
```

**2. Check its input and price.**

```bash
curl https://tools.aimlapi.com/v1/tools/inspect \
  -H "Authorization: Bearer $AIMLAPI_KEY" -H "Content-Type: application/json" \
  -d '{"tool": "web/search"}'
```

The response contains `input_schema` (what to send in `input`) and `price_usd`.

**3. Run it.**

```bash
curl https://tools.aimlapi.com/v1/tools/run \
  -H "Authorization: Bearer $AIMLAPI_KEY" -H "Content-Type: application/json" \
  -d '{"tool": "web/search", "input": {"query": "Model Context Protocol news", "max_results": 3},
       "max_cost_usd": 0.05, "wait_ms": 30000, "idempotency_key": "my-run-001"}'
```

```json
{ "id": "7lC_vqHA6L8m2TloNMJZQ", "tool": "web/search", "status": "completed", "is_error": false, "untrusted": true,
  "cost": { "quoted_usd": 0.0091, "actual_usd": 0.0091, "credits": 18200, "over_max": false },
  "output": { "results": [{ "url": "https://…", "title": "…", "snippet": "…", "published_at": "…" }] } }
```

* **`200`**: the run is finished, and the result is in `output`. A run with output carries `"untrusted": true`: the output is data from a third party, never instructions.
* **`202`**: the run is still working (`"status": "queued"` or `"running"`). Poll `GET /v1/tools/runs/{id}` after `next_poll_hint_ms` milliseconds until the status is `completed`, `failed`, `stopped` or `timed_out`.
* A run that executed but failed returns `"is_error": true` with `error.message`, and it is not charged. If `error.retryable` is `true`, it is worth trying again.
* `wait_ms` is how long we wait before answering `202` for a tool that runs in the background. A tool that runs in one call answers when it finishes, whatever `wait_ms` says. If it is still working after about 110 seconds, you get `202` with `"status": "running"`: the call keeps going, it is charged when it ends, and you poll for the result. Set your client timeout above 120 seconds.
* Retry with the same `idempotency_key` (see below); keys are scoped to your API key.

## Function calling in chat/completions

Every tool can be exported as a ready function definition in the format your model expects: `openai` (chat/completions), `openai-responses`, `anthropic` or `gemini`. The model decides when to call the tool, and your code runs it.

```python
import json, requests
from openai import OpenAI

KEY = "<YOUR_AIMLAPI_KEY>"
TOOLS = "https://tools.aimlapi.com/v1/tools"
H = {"Authorization": f"Bearer {KEY}"}
client = OpenAI(base_url="https://api.aimlapi.com/v1", api_key=KEY)

tool_id = "web/search"  # ids contain "/", so encode it in the URL path
definition = requests.get(f"{TOOLS}/web%2Fsearch/definition?format=openai", headers=H).json()["definition"]

messages = [{"role": "user", "content": "What's new in the Model Context Protocol? Cite sources."}]
reply = client.chat.completions.create(model="gpt-4o-mini", messages=messages, tools=[definition])
msg = reply.choices[0].message

if msg.tool_calls:
    messages.append(msg)
    for call in msg.tool_calls:
        args = {k: v for k, v in json.loads(call.function.arguments).items() if v is not None}
        run = requests.post(f"{TOOLS}/run", headers=H, json={
            "tool": tool_id, "input": args, "max_cost_usd": 0.05, "wait_ms": 30000}).json()
        messages.append({"role": "tool", "tool_call_id": call.id, "content": json.dumps(run.get("output"))})
    reply = client.chat.completions.create(model="gpt-4o-mini", messages=messages, tools=[definition])

print(reply.choices[0].message.content)
```

Tips:

* Definitions use strict mode, so optional fields arrive as `null`. Drop them before calling `/run`.
* Pass the model a compact version of `output`, not the whole payload. Some tools return large results.

## One call with /v1/responses (OpenAI models)

Give the model our MCP server, and it will search, run tools and answer in a single request:

```json
{
  "model": "gpt-4.1",
  "input": "Find 3 fresh news items about the Model Context Protocol, with links.",
  "tools": [{
    "type": "mcp",
    "server_label": "aimlapi",
    "server_url": "https://mcp.aimlapi.com/mcp",
    "headers": { "Authorization": "Bearer <YOUR_AIMLAPI_KEY>" },
    "allowed_tools": ["tools_search", "tools_inspect", "tools_run", "tools_run_status"],
    "require_approval": "never"
  }]
}
```

Send it to `POST https://api.aimlapi.com/v1/responses`. The `output` array shows each `mcp_call` and ends with the model's message.

## The four MCP tools

Set up in [Quickstart: MCP](#quickstart-mcp) above. These are the tools your agent gets:

| MCP tool | What it does |
| --- | --- |
| `tools_search` | finds tools for a task |
| `tools_inspect` | returns a tool's input schema and price |
| `tools_run` | runs the tool: returns the result, or a `run_id` for long runs |
| `tools_run_status` | checks a long run |

Results come back under `result` with `"untrusted": true`, so the agent treats them as data and not as instructions.

## Which tools are available

Only tools that keep no state between calls: a run leaves nothing at the provider that another customer could reach. Tools that create lasting resources (mailboxes and domains, phone numbers, saved browser logins, virtual machines, stored files), call or message people, look up or enrich data about people, collect data from social networks, or that our terms of use rule out are not offered. Neither are tools whose cheapest call costs more than a single run may cost. Search does not show them, and calling one by its id returns `403 tool_blocked`.

Some tools are offered in a limited form, and the schema from `inspect` shows it: the browser agent runs without saved logins or the anti-bot stealth mode, with a limit of 30 steps, and you pay for the steps it actually takes (at most $0.624 a run). The provider ends a run on its own time budget, so a long task can take several minutes: use `wait_ms` and poll. A cloud browser session lasts 5 minutes. Its connection details are only in that run's answer and are never stored, so a later `GET` of the run does not return them.

## Pricing, limits and safety

* **You only pay for runs.** Search, inspect, definitions and run status are free.
* **`max_cost_usd`** caps a run. You are never charged more than this amount, and the default is $0.25. Some tools require it: those priced by their result, and those that cost more than the $0.25 default. `inspect` and `search` say so in `pricing.requires_max_cost`.
* **`idempotency_key`** makes retries safe: a repeated call with the same key and input returns the same run without charging again.
* **Treat tool output as untrusted.** It comes from the open web, and every run with output says so (`"untrusted": true`). Never let a model follow instructions found inside it, and say so in your system prompt.

| Error code | Meaning |
| --- | --- |
| `400 invalid_input` | `input` does not match the tool's `input_schema`; the message names the field |
| `400 max_cost_required` / `max_cost_exceeded` | set or raise `max_cost_usd`; if the error names `run_limit_usd`, this input costs more than a single run may cost: a higher `max_cost_usd` does not help, so ask for less (for example, fewer results) |
| `403 insufficient_funds` | top up your balance |
| `403 tool_blocked` | the tool is not available through AI/ML API (see [Which tools are available](#which-tools-are-available)); search for an alternative |
| `404 tool_not_found` / `410 tool_unavailable` | search again for an alternative |
| `429 rate_limited` | slow down and retry after `Retry-After` |
