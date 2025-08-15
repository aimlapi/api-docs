# Toolhouse

## Overview

[**Toolhouse**](https://app.toolhouse.ai/) is a Backend-as-a-Service (BaaS) to build, run, and manage AI agents. Toolhouse simplifies the process of building agents in a local environment and running them in production.

With Toolhouse, you define agents as code and deploy them as APIs using a single command. Toolhouse agents are automatically connected to the Toolhouse MCP Server; it gives agents access to RAG, memory, code execution, browser use, and all the functionality agents need to perform actions. You can add MCP Servers and even define custom code that the agent can use to perform actions not covered by public MCP Servers. Toolhouse has built-in eval, prompt optimization, and agentic orchestration.

For further information about the framework, please check the official documentation:

* [Toolhouse Docs – Quick start (Python)](https://docs.toolhouse.ai/toolhouse/toolhouse-sdk/quick-start)
* [Toolhouse SDK on GitHub (Python)](https://github.com/toolhouseai/toolhouse-sdk-python)

***

## Integration via Python

### Installation

```bash
pip install toolhouse openai python-dotenv
```

> Optionally add: `pip install groq` or other SDKs, depending on the target LLM platform.

***

### Connection Setup

{% hint style="warning" %}
You should obtain our [**API key**](https://aimlapi.com/app/keys) first.
{% endhint %}

1. Create a `.env` file in your project:

```bash
TOOLHOUSE_API_KEY=<your_toolhouse_api_key>
AIMLAPI_KEY=<your_aimlapi_key>
```

2. Example Python integration (`toolhouse_example.py`):

{% code overflow="wrap" %}
```python
import os
from dotenv import load_dotenv
from toolhouse import Toolhouse
from openai import OpenAI

load_dotenv()

th = Toolhouse(api_key=os.getenv("TOOLHOUSE_API_KEY"))

client = OpenAI(
    api_key=os.getenv("AIMLAPI_KEY"),
    base_url="https://api.aimlapi.com/v1",
)

MODEL = "mistralai/Mistral-7B-Instruct-v0.2"

messages = [
    {
        "role": "user",
        "content": "List 3 innovative uses of AI in healthcare."
    }
]

response = client.chat.completions.create(
    model=MODEL,
    messages=messages,
    tools=th.get_tools()
)

tool_run = th.run_tools(response)
messages.extend(tool_run)

response = client.chat.completions.create(
    model=MODEL,
    messages=messages,
    tools=th.get_tools()
)

print(response.choices[0].message.content)
```
{% endcode %}

***

### GUI Integration

The Toolhouse GUI ([https://app.toolhouse.ai](https://app.toolhouse.ai)) supports:

* API key management
* Tool selection via Bundles
* Agent execution & history
* Monitoring tool calls in logs

Tool configuration is managed entirely through their GUI and reflected in tool discovery (`th.get_tools()`).

***

## Integration via TypeScript

### Installation

Install the required dependencies:

```bash
npm install @toolhouseai/sdk openai dotenv
```

***

### Connection Setup

1. Create a `.env` file in the project root:

```env
TOOLHOUSE_API_KEY=<Your Toolhouse API Key>
AIMLAPI_KEY=<Your AIMLAPI Key>
```

2. Create a TypeScript file (`toolhouse.ts`) with the following content:

```ts
import 'dotenv/config';
import { Toolhouse } from '@toolhouseai/sdk';
import OpenAI from 'openai';

const MODEL = 'mistralai/Mistral-7B-Instruct-v0.2';

async function main() {
  const toolhouse = new Toolhouse({
    apiKey: process.env.TOOLHOUSE_API_KEY,
    metadata: {
      id: "aimlapi-integration",
      timezone: "0"
    }
  });

  const client = new OpenAI({
    baseURL: "https://api.aimlapi.com/v1",
    apiKey: process.env.AIMLAPI_KEY
  });

  const messages = [{
    role: "user",
    content: "List three use cases of AI in retail."
  }];

  const tools = await toolhouse.getTools();
  const chatCompletion = await client.chat.completions.create({
    model: MODEL,
    messages,
    tools
  });

  const toolResponses = await toolhouse.runTools(chatCompletion);
  const finalMessages = [...messages, ...toolResponses];

  const finalResponse = await client.chat.completions.create({
    model: MODEL,
    messages: finalMessages,
    tools
  });

  console.log(JSON.stringify(finalResponse, null, 2));
}

main();
```

3. Run the script:

```bash
npx ts-node toolhouse.ts
```

***

### GUI Integration

Toolhouse provides a browser-based GUI at [app.toolhouse.ai](https://app.toolhouse.ai/) where you can:

* Manage API keys
* Add and organize tools via Bundles
* Monitor execution logs
* Trigger and test agents visually

> ✅ Toolhouse integration with AIMLAPI is fully supported via `baseURL` override in the OpenAI-compatible SDK.

***

## ✅ Supported AIMLAPI Models

All chat-compatible models served by AIMLAPI are supported, including:

* **Mistralai** – `Mistral-7B-Instruct`, `Mixtral-8x7B`
* **Meta** – `Meta-LLaMA-3.1`, `LLaMA-3.3`
* **Anthropic** – `Claude-3.5-Haiku`
* **NVIDIA** – `Nemotron-70B`
* **Google, xAI, Alibaba, Cohere, DeepSeek** – all supported through the unified `https://api.aimlapi.com/v1` endpoint.

📘 View [our full text (chat) model catalog](../api-references/text-models-llm/#complete-text-model-list).

***

## ⚙️ Supported Parameters

No AIMLAPI-specific parameter differences were found. Use standard OpenAI-compatible parameters:

* `model`
* `messages`
* `temperature`
* `max_tokens`
* `stream`
* `tools` (Toolhouse integration)

***

## 🧠 Supported Call Features

<table><thead><tr><th width="289">Feature</th><th>Via Python</th><th>Via TypeScript</th></tr></thead><tbody><tr><td>Synchronous calls</td><td>✅</td><td>✅</td></tr><tr><td>Asynchronous use</td><td>🟡 (manual)</td><td>✅ (via Promises)</td></tr><tr><td>Tool Calling</td><td>✅</td><td>✅</td></tr><tr><td>Streaming</td><td>✅</td><td>✅</td></tr><tr><td>Threads</td><td>❌</td><td>❌</td></tr><tr><td>Local tools</td><td>✅</td><td>✅ via <code>registerLocalTool()</code></td></tr></tbody></table>
