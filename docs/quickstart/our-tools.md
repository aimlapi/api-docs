---
description: >-
  Ready-made tools — web search, page extraction, screenshots, news and social
  data and more — callable with your AI/ML API key from agents, MCP clients and
  your own apps.
icon: toolbox
hidden: true
---

# Our Tools

**Our Tools** are ready-made actions your AI can use: web search, reading a web page as Markdown, website screenshots, news and social media search, company and domain data, and hundreds more. You call them with the **same AI/ML API key** you use for models. There is no separate account to sign up for and no third-party key to manage, and usage is billed to your AI/ML API balance.

Use them when a model needs **fresh or external data**, or needs to **act**, beyond what it already knows. Typical cases: a research agent that searches and cites sources, a support bot that reads a customer's page, or an app that builds a report with a live screenshot.

## Ways to use them

| You are building… | Use | Who runs the tool |
| --- | --- | --- |
| An agent in **Claude Code, Cursor, Claude Desktop** | [MCP](mcp.md) — the `tools_*` tools appear automatically | your MCP client |
| Your **own app or pipeline** | the REST API below | your code |
| An app on **chat/completions** with function calling | tool definitions in `tools[]` + `/v1/tools/run` | your code |
| A one-call agent on **/v1/responses** (OpenAI models) | our MCP server as a `{"type": "mcp"}` tool | the model |

**Base URL:** `https://tools.aimlapi.com`. **Auth:** `Authorization: Bearer <YOUR_AIMLAPI_KEY>`.

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
{ "id": "7lC_vqHA6L8m2TloNMJZQ", "tool": "web/search", "status": "completed", "is_error": false,
  "cost": { "quoted_usd": 0.0091, "actual_usd": 0.0091, "credits": 18200, "over_max": false },
  "output": { "results": [{ "url": "https://…", "title": "…", "snippet": "…", "published_at": "…" }] } }
```

* **`200`**: the run is finished, and the result is in `output`.
* **`202`**: the run is still working (`"status": "queued"`). Poll `GET /v1/tools/runs/{id}` after `next_poll_hint_ms` milliseconds until the status is `completed`, `failed`, `stopped` or `timed_out`.
* A run that executed but failed returns `"is_error": true` with `error.message`. If `error.retryable` is `true`, it is worth trying again.

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

## In MCP clients

Connect our MCP server as described in [MCP](mcp.md). Four tools give the agent the whole catalog:

| MCP tool | What it does |
| --- | --- |
| `tools_search` | finds tools for a task |
| `tools_inspect` | returns a tool's input schema and price |
| `tools_run` | runs the tool: returns the result, or a `run_id` for long runs |
| `tools_run_status` | checks a long run |

Results come back under `result` with `"untrusted": true`, so the agent treats them as data and not as instructions.

## Pricing, limits and safety

* **You only pay for runs.** Search, inspect, definitions and run status are free.
* **`max_cost_usd`** caps a run. You are never charged more than this amount, and the default is $0.25. Some tools with variable pricing require it explicitly; the price is shown by `inspect`.
* **`idempotency_key`** makes retries safe: a repeated call with the same key and input returns the same run without charging again.
* **Treat tool output as untrusted.** It comes from the open web. Never let a model follow instructions found inside it, and say so in your system prompt.

| Error code | Meaning |
| --- | --- |
| `400 invalid_input` | `input` does not match the tool's `input_schema`; the message names the field |
| `400 max_cost_required` / `max_cost_exceeded` | set or raise `max_cost_usd` |
| `403 insufficient_funds` | top up your balance |
| `403 tool_blocked` | Our Tools are not enabled for this key |
| `404 tool_not_found` / `410 tool_unavailable` | search again for an alternative |
| `429 rate_limited` | slow down and retry after `Retry-After` |
