---
icon: plug
---

# MCP

Connect AIMLAPI to your AI client — **Claude Desktop, Claude (web), Cursor, Claude Code**, and other MCP-capable apps — over the [Model Context Protocol](https://modelcontextprotocol.io/) using **OAuth**.

You sign in with your AIMLAPI account in the browser; there is **no API key to copy or paste**. Once connected, you can discover and compare models, run inference (LLM / image / video / audio / embeddings), manage long-running generation jobs, and check your balance — directly from the client.

Usage is billed to your AIMLAPI account, exactly like the REST API.

> Prefer to paste an API key instead of signing in? That method is also supported — add an `Authorization: Bearer <YOUR_AIMLAPI_KEY>` header instead of using OAuth. This guide covers the **OAuth** (browser sign-in) flow.

## Prerequisites

* An **AIMLAPI account** — create one at [https://aimlapi.com](https://aimlapi.com/).
* A client that supports **remote MCP servers over Streamable HTTP with OAuth** (all clients below do).
* A balance on your account if you plan to run billable inference (top up at [https://aimlapi.com/app/billing](https://aimlapi.com/app/billing)).
* **A correct system clock.** OAuth tokens are time-sensitive — if your computer's date, time, or time zone is wrong, the sign-in will fail (and some clients won't even start the session). Make sure the clock is set automatically / synced before you begin.

## Endpoint

| Environment | MCP URL                       |
| ----------- | ----------------------------- |
| Production  | `https://mcp.aimlapi.com/mcp` |

You only ever enter this **one URL**. Your client discovers everything else (the sign-in page, how to register, how to get a token) automatically.

## How the OAuth connection works

When you add the server URL **without an API key**, your client:

1. Contacts the MCP server and is told that authentication is required.
2. Automatically discovers the AIMLAPI authorization server.
3. Registers itself and opens your browser.
4. You **sign in to AIMLAPI** and **approve access**; the client receives a token and connects.

You never handle a key. The client stores the token securely and refreshes it for you.

> **Note on the "Connect" button (Claude Desktop & web).** Adding the connector only _registers_ it — it does not sign you in. After you add it, the connector appears with a **Connect** button; you must click **Connect** to open the browser and complete the AIMLAPI sign-in. Until you click **Connect** and approve, the connector stays added but **not authenticated**, and its tools will not work.

## Claude Desktop

1. **Settings → Connectors → Add custom connector.**
2. **Name:** `AIMLAPI` · **Remote MCP server URL:** `https://mcp.aimlapi.com/mcp`
3. Click **Add**. The connector is now registered.
4. Click **Connect** on the AIMLAPI connector. A browser window opens → **sign in to AIMLAPI** → **approve access**.
5. The connector shows **connected**, and the AIMLAPI tools become available in your chats.
6. **Verify:** open a chat and ask _"Use AIMLAPI to check my account balance."_ A returned balance confirms the connection and authorization are working.

**Remove:** **Settings → Connectors → AIMLAPI → Remove / Disconnect.**

## Claude (web — claude.ai)

1. Open **Settings → Connectors → Add custom connector** (on Team/Enterprise plans this is done by an Owner under **Organization settings → Connectors**).
2. Enter the URL `https://mcp.aimlapi.com/mcp` and add it.
3. Click **Connect** on the AIMLAPI connector. A browser flow opens → **sign in to AIMLAPI** → **approve** → connected.
4. **Verify:** ask _"Use AIMLAPI to check my account balance."_

> Custom-connector availability depends on your Claude plan.

**Remove:** **Settings → Connectors → AIMLAPI → Remove.**

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

Then open **Cursor Settings → Tools & Integrations** and find **aimlapi**. It usually appears **Disabled** first — click **···→ Enable**, then click **Login**. A browser opens → **sign in to AIMLAPI** → **Allow**. The server turns green when connected.

**Verify:** in an Agent chat, ask _"Using aimlapi, check my account balance."_

**Remove:** Cursor cannot delete an MCP server from the UI — the **···** menu only offers Configure / Reload / Enable. To remove it, open `~/.cursor/mcp.json` (the **Configure** dialog shows its path) and delete the `aimlapi` block, then **Reload** or restart Cursor. Note: turning off the source toggle only hides the server from the UI — the entry stays in the file until you delete it there.

## Claude Code (CLI)

```bash
claude mcp add --transport http aimlapi https://mcp.aimlapi.com/mcp
```

By default this adds the server in **local** scope — it is only available inside the current folder / project. To make it available everywhere, add `--scope user`:

```bash
claude mcp add --transport http --scope user aimlapi https://mcp.aimlapi.com/mcp
```

Then, inside an interactive Claude Code session, run **`/mcp`**, select **aimlapi**, and choose **Authenticate** — a browser opens for you to sign in. (Do **not** pass an `--header` flag; that switches the client to API-key auth instead of OAuth.)

**Verify:** run `claude mcp list` (the server should show as connected), or in a session ask _"Use the aimlapi MCP to check my account balance."_

**Remove:** `claude mcp remove aimlapi` (confirm with `claude mcp list`).

## Other MCP clients

Any client implementing the MCP authorization spec (OAuth 2.1 + PKCE with dynamic client registration) works the same way: point it at `https://mcp.aimlapi.com/mcp` with no API key and complete the browser sign-in. To inspect the flow step by step, use the MCP Inspector:

```bash
npx @modelcontextprotocol/inspector@latest
```

Set **Transport = Streamable HTTP**, **URL = `https://mcp.aimlapi.com/mcp`**, then use **Open Auth Settings → Quick OAuth Flow**.

## What you can do once connected

* **Discover models** — search and compare the catalog, get a comparable headline price.
* **Run inference** — LLM chat, embeddings, image / video / audio generation.
* **Manage jobs** — submit long-running generations and poll their status/results.
* **Account** — check your balance and usage.

Every call is billed to your AIMLAPI account, just like the REST API.

## Managing the connection

To stop using AIMLAPI from a client, **remove or disconnect** the AIMLAPI connector — the exact step differs per client:

| Client         | How to remove                                                                                                           |
| -------------- | ----------------------------------------------------------------------------------------------------------------------- |
| Claude Desktop | Settings → Connectors → AIMLAPI → Remove / Disconnect.                                                                  |
| Claude (web)   | Settings → Connectors → AIMLAPI → Remove.                                                                               |
| Cursor         | Edit `~/.cursor/mcp.json` and delete the `aimlapi` block (cannot be removed from the UI), then Reload / restart Cursor. |
| Claude Code    | `claude mcp remove aimlapi`.                                                                                            |

**Clean reinstall.** Removing the connector in the client does not always revoke the OAuth token on the AIMLAPI side. For a fully clean reinstall — one that shows the sign-in / approval screen again — also revoke the app's access in your AIMLAPI account (**Authorized apps / Connections → Revoke**) before adding the server back.

## Troubleshooting

<table data-search="false"><thead><tr><th>Symptom</th><th>Fix</th></tr></thead><tbody><tr><td>Browser didn't open, or the client is stuck "connecting"</td><td>Remove the connector and add it again; make sure you clicked <strong>Connect</strong> and completed the AIMLAPI sign-in in the browser.</td></tr><tr><td>Session won't start / "clock is set incorrectly" / sign-in fails immediately</td><td>Your system clock is wrong. Set the date, time, and time zone automatically, then retry — OAuth tokens are time-sensitive.</td></tr><tr><td>Connector added but tools don't work</td><td>You likely didn't click <strong>Connect</strong> (Desktop / web) or <strong>Enable + Login</strong> (Cursor). The connector must be authenticated, not just added.</td></tr><tr><td>Server shows <strong>Disabled</strong> in Cursor after editing <code>mcp.json</code></td><td>Open <strong>···→ Enable</strong>, then <strong>Login</strong> to authenticate.</td></tr><tr><td>MCP works in one folder but is missing in another (Claude Code)</td><td>It was added in <strong>local</strong> scope. Re-add with <code>--scope user</code> to make it global.</td></tr><tr><td>Reinstalled but never asked to sign in again</td><td>The old OAuth token is still valid. Revoke the app in <strong>AIMLAPI → Authorized apps</strong>, then reconnect.</td></tr><tr><td>Connected, but inference fails with an insufficient-balance error</td><td>Top up at <a href="https://aimlapi.com/app/billing">https://aimlapi.com/app/billing</a>.</td></tr><tr><td>The client connects but never asks you to sign in</td><td>You likely added an <code>Authorization</code> header — with a header the client uses API-key auth, not OAuth. Remove the header to use OAuth.</td></tr><tr><td>"Sign-in failed" / authorization error</td><td>Confirm you're signing in to the correct AIMLAPI account, then retry from the client.</td></tr></tbody></table>
