# Marvin

## About

[Marvin](https://github.com/PrefectHQ/marvin) is a Python framework by PrefectHQ for building agentic AI workflows and producing structured outputs. It allows developers to define _Tasks_ (objective-focused units of work) and assign them to specialized _Agents_ (LLM-powered configurations). Marvin supports type-safe results via Pydantic models, integrates with multiple LLM providers through Pydantic AI, and enables orchestration of multi-agent threads for complex workflows.

## Installation

***

### 1) Install Marvin

```bash
uv add marvin
# or
pip install marvin
```

***

### 2) Set your environment variable

macOS / Linux:

```bash
export AIML_API_KEY=your-api-key
```

Windows PowerShell:

```powershell
setx AIML_API_KEY "your-api-key"
```

***

### 3) Example — Run an AI/ML API Agent

**File:** `examples/provider_specific/aimlapi/run_agent.py`

{% tabs %}
{% tab title="Python" %}
{% code overflow="wrap" %}
```python
from __future__ import annotations

import os
from pathlib import Path

from pydantic_ai.models.openai import OpenAIModel
from pydantic_ai.providers.openai import OpenAIProvider

import marvin

AIML_API_URL = "https://api.aimlapi.com/v1"


def get_provider() -> OpenAIProvider:
    api_key = os.getenv("AIML_API_KEY")
    if not api_key:
        raise RuntimeError("Set AIML_API_KEY environment variable to your AI/ML API key.")
    return OpenAIProvider(api_key=api_key, base_url=AIML_API_URL)


def write_file(path: str, content: str) -> None:
    """Write content to a file."""
    Path(path).write_text(content)


def main() -> None:
    writer = marvin.Agent(
        model=OpenAIModel("gpt-4o", provider=get_provider()),
        name="AI/ML Writer",
        instructions="Write concise, engaging content for developers",
        tools=[write_file],
    )

    result = marvin.run(
        "how to use pydantic? write haiku to docs.md",
        agents=[writer],
    )
    print(result)


if __name__ == "__main__":
    main()
```
{% endcode %}
{% endtab %}
{% endtabs %}

Run it:

```bash
AIML_API_KEY=your-api-key \
uv run examples/provider_specific/aimlapi/run_agent.py
```

***

### 4) Other Examples

More examples are available in the same directory:

> [github.com/PrefectHQ/marvin/tree/main/examples/provider\_specific/aimlapi](https://github.com/PrefectHQ/marvin/tree/main/examples/provider_specific/aimlapi)

* `structured_output.py` — structured JSON output
* `tools_agent.py` — agent with custom tools (dates, weather)

***

## Tips

* **Profiles:** use multiple configurations (default = [`openai/gpt-5-chat-latest`](../api-references/text-models-llm/openai/gpt-5-chat.md), budget = [`openai/o4-mini`](../api-references/text-models-llm/openai/o4-mini.md))
* **Structured results:** pass `result_type=...` for typed outputs
* **Tools:** register Python functions via `Agent(tools=[...])`
* **Token limits:** increase output size if needed

***

## Troubleshooting

| Issue                   | Solution                                        |
| ----------------------- | ----------------------------------------------- |
| **401** Unauthorized    | Check your API key and remove extra spaces      |
| **404** Model not found | Verify the model ID exists in your account      |
| Network error           | Whitelist `api.aimlapi.com` if behind VPN/proxy |

***

## Helpful Links

* Dashboard: [https://aimlapi.com/app](https://aimlapi.com/app)
* API Keys: [https://aimlapi.com/app/keys](https://aimlapi.com/app/keys)
* Models: [https://aimlapi.com/models](https://aimlapi.com/models)
* Docs: [https://docs.aimlapi.com](https://docs.aimlapi.com)
* Marvin repository: [https://github.com/PrefectHQ/marvin](https://github.com/PrefectHQ/marvin)

Enjoy coding with **Marvin + AI/ML API** 🚀
