---
hidden: true
icon: plug
---

# MCP

Connect AIMLAPI to your AI client — **Claude Desktop, Claude (web), Cursor, Claude Code**, and other MCP-capable apps — over the [Model Context Protocol](https://modelcontextprotocol.io/) using **OAuth**.

You sign in with your AIMLAPI account in the browser; there is **no API key to copy or paste**. Once connected, you can discover and compare models, run inference (LLM / image / video / audio / embeddings), manage long-running generation jobs, and check your balance — directly from the client.

Usage is billed to your AIMLAPI account, exactly like the REST API.

{% hint style="info" %}
Prefer to paste an API key instead of signing in? That method is also supported — add an `Authorization: Bearer <YOUR_AIMLAPI_KEY>` header instead of using OAuth. This guide covers the **OAuth** (browser sign-in) flow.
{% endhint %}

***

## Prerequisites

* An **AIMLAPI account** — create one at [https://aimlapi.com](https://aimlapi.com/).
* A client that supports **remote MCP servers over Streamable HTTP with OAuth** (all clients below do).
* A balance on your account if you plan to run billable inference (top up at [https://aimlapi.com/app/billing](https://aimlapi.com/app/billing)).

## Endpoint

| Environment | MCP URL                       |
| ----------- | ----------------------------- |
| Production  | `https://mcp.aimlapi.com/mcp` |

You only ever enter this **one URL**. Your client discovers everything else (the sign-in page, how to register, how to get a token) automatically.

## How the OAuth connection works

{% stepper %}
{% step %}
## Contacts the MCP server

When you add the server URL **without an API key**, your client contacts the MCP server and is told that authentication is required.
{% endstep %}

{% step %}
## Discovers the authorization server

Your client automatically discovers the AIMLAPI authorization server.
{% endstep %}

{% step %}
## Registers and opens your browser

Your client registers itself and opens your browser.
{% endstep %}

{% step %}
## Sign in and approve access

You **sign in to AIMLAPI** and **approve access**; the client receives a token and connects.
{% endstep %}
{% endstepper %}

You never handle a key. The client stores the token securely and refreshes it for you.

***

## Claude Desktop

{% stepper %}
{% step %}
## Open the connector settings

Go to **Settings → Connectors → Add custom connector**.
{% endstep %}

{% step %}
## Add AIMLAPI

Set **Name:** `AIMLAPI` · **Remote MCP server URL:** `https://mcp.aimlapi.com/mcp`
{% endstep %}

{% step %}
## Sign in and connect

Click **Add**. A browser window opens → **sign in to AIMLAPI** → **approve access**.

The connector appears as **connected**, and the AIMLAPI tools become available in your chats.
{% endstep %}
{% endstepper %}

## Claude (web — claude.ai)

{% stepper %}
{% step %}
## Open connector settings

Open **Settings → Connectors → Add custom connector**.

On Team/Enterprise plans this is done by an Owner under **Organization settings → Connectors**.
{% endstep %}

{% step %}
## Add the server URL

Enter the URL `https://mcp.aimlapi.com/mcp` and add it.
{% endstep %}

{% step %}
## Complete the browser flow

A browser flow opens → **sign in to AIMLAPI** → **approve** → connected.
{% endstep %}
{% endstepper %}

{% hint style="info" %}
Custom-connector availability depends on your Claude plan.
{% endhint %}

## Cursor

Add the server to `~/.cursor/mcp.json` (global) or `.cursor/mcp.json` (project). **Do not add a `headers` block** — leaving it out is what triggers the OAuth flow:

```json
{
  "mcpServers": {
    "aimlapi": {
      "url": "https://mcp.aimlapi.com/mcp"
    }
  }
}
```

{% stepper %}
{% step %}
## Open Cursor tools settings

Open **Cursor Settings → Tools & Integrations**, find **aimlapi**, and click **Login**.
{% endstep %}

{% step %}
## Sign in and allow access

A browser opens → **sign in to AIMLAPI** → **Allow**.
{% endstep %}

{% step %}
## Confirm connection

The server turns green when connected.
{% endstep %}
{% endstepper %}

## Claude Code (CLI)

```bash
claude mcp add --transport http aimlapi https://mcp.aimlapi.com/mcp
```

{% stepper %}
{% step %}
## Open the MCP menu

Inside an interactive Claude Code session, run **`/mcp`**.
{% endstep %}

{% step %}
## Select AIMLAPI

Select **aimlapi** and choose **Authenticate**.
{% endstep %}

{% step %}
## Sign in in the browser

A browser opens for you to sign in. (Do **not** pass an `--header` flag; that switches the client to API-key auth instead of OAuth.)
{% endstep %}
{% endstepper %}

## Other MCP clients

Any client implementing the MCP authorization spec (OAuth 2.1 + PKCE with dynamic client registration) works the same way: point it at `https://mcp.aimlapi.com/mcp` with no API key and complete the browser sign-in.

To inspect the flow step by step, use the MCP Inspector:

```bash
npx @modelcontextprotocol/inspector@latest
```

Set **Transport = Streamable HTTP**, **URL = `https://mcp.aimlapi.com/mcp`**, then use **Open Auth Settings → Quick OAuth Flow**.

***

## What you can do once connected

* **Discover models** — search and compare the catalog, get a comparable headline price.
* **Run inference** — LLM chat, embeddings, image / video / audio generation.
* **Manage jobs** — submit long-running generations and poll their status/results.
* **Account** — check your balance and usage.

Every call is billed to your AIMLAPI account, just like the REST API.

## Managing the connection

To stop using AIMLAPI from a client, **remove or disconnect** the AIMLAPI connector in that client's settings.

## Troubleshooting

| Symptom                                                           | Fix                                                                                                                                 |
| ----------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| Browser didn't open, or the client is stuck "connecting"          | Remove the connector and add it again; make sure you completed the AIMLAPI sign-in in the browser.                                  |
| Connected, but inference fails with an insufficient-balance error | Top up at [https://aimlapi.com/app/billing](https://aimlapi.com/app/billing).                                                       |
| The client connects but never asks you to sign in                 | You likely added an `Authorization` header — with a header the client uses API-key auth, not OAuth. Remove the header to use OAuth. |
| "Sign-in failed" / authorization error                            | Confirm you're signing in to the correct AIMLAPI account, then retry from the client.                                               |
