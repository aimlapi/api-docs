# Agno

## About

[Agno](https://app.agno.com/) is a lightweight library for building **Agents** (AI programs that operate autonomously).  The core of an Agent is a model, tools and instructions. Agents also have memory, knowledge, storage and the ability to reason.

Developers use Agno to build Reasoning Agents, Multimodal Agents, Teams of Agents and Agentic Workflows. Agno also provides a beautiful UI to chat with your Agents, pre-built FastAPI routes to serve your Agents and tools to monitor and evaluate their performance.

{% hint style="success" %}
No data is sent to [agno.com](https://app.agno.com), all agent data is stored locally in your sqlite database! \
The playground app is available to [run locally](https://docs.agno.com/introduction/playground) if you prefer working offline!
{% endhint %}

## Installation

```sh
pip install -U agno
```

## How to Use AIML API with Agno

Agno ships an `AIMLAPI` model class (`agno.models.aimlapi`). It uses the OpenAI-compatible endpoint `https://api.aimlapi.com/v1` and reads your key from `AIMLAPI_API_KEY`, or from the `api_key` argument:

{% code overflow="wrap" %}
```python
from agno.agent import Agent
from agno.models.aimlapi import AIMLAPI

agent = Agent(
    model=AIMLAPI(
        id="openai/gpt-5.6-luna",
        api_key="<YOUR_AIMLAPI_KEY>"
    ),
    markdown=True,
    telemetry=False,
)

agent.print_response("Tell me, why is the sky blue in 2 sentences")
```
{% endcode %}

<details>

<summary>Response</summary>

```
┌─ Message ───────────────────────────────────────────────────────────────────┐
│                                                                             │
│ Tell me, why is the sky blue in 2 sentences                                 │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
┌─ Response (2.5s) ───────────────────────────────────────────────────────────┐
│                                                                             │
│ The sky appears blue due to a phenomenon called Rayleigh scattering.  This  │
│ scattering effect preferentially disperses shorter wavelengths of light,    │
│ such as blue and violet, more than longer wavelengths like red and orange.  │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

</details>

{% hint style="info" %}
In Agno versions before 2.0 the class was named `AIMLApi`. Update Agno with `pip install -U agno` and import `AIMLAPI`.
{% endhint %}

## Model settings

| Parameter | Default |
| --- | --- |
| `id` | `gpt-5.6-luna` |
| `api_key` | value of `AIMLAPI_API_KEY` |
| `base_url` | `https://api.aimlapi.com/v1` |
| `max_tokens` | `4096` |

## **Our Supported models**

Any AI/ML API chat model works with `AIMLAPI`. Pass its exact ID from [All Model IDs](../api-references/model-database.md) as `id`, for example `openai/gpt-5-5`, `anthropic/claude-sonnet-5` or `google/gemini-3.6-flash`.

## **Supported features**

* Synchronous and asynchronous requests, with streaming
* Tool use
* Structured output
* Image input with vision models
* Retries with backoff

## Code Examples

<details>

<summary><strong>Prerequisites</strong></summary>

1\. Create and activate a virtual environment

```bash
python3 -m venv ~/.venvs/aienv
source ~/.venvs/aienv/bin/activate
```

2\. Export your [AIMLAPI\_API\_KEY](https://aimlapi.com/app/keys)

```bash
export AIMLAPI_API_KEY=***
```

3\. Install libraries

```bash
pip install -U openai ddgs duckdb yfinance agno
```

</details>

### Stream mode

{% tabs %}
{% tab title="Python" %}
{% code overflow="wrap" %}
```python
from agno.agent import Agent, RunOutput  # noqa
from agno.models.aimlapi import AIMLAPI

agent = Agent(model=AIMLAPI(id="openai/gpt-5.6-luna"), markdown=True)

# Get the response in a variable
# run: RunOutput = agent.run("Share a 2 sentence horror story")
# print(run.content)

# Print the response in the terminal
agent.print_response("Share a 2 sentence horror story", stream=True)
```
{% endcode %}
{% endtab %}
{% endtabs %}

### Image agent

{% tabs %}
{% tab title="Python" %}
{% code overflow="wrap" %}
```python
from agno.agent import Agent
from agno.media import Image
from agno.models.aimlapi import AIMLAPI

agent = Agent(
    model=AIMLAPI(id="openai/gpt-5.6-luna"),
    markdown=True,
)

agent.print_response(
    "Tell me about this image",
    images=[
        Image(
            url="https://upload.wikimedia.org/wikipedia/commons/0/0c/GoldenGateBridge-001.jpg"
        )
    ],
    stream=True,
)
```
{% endcode %}
{% endtab %}
{% endtabs %}

### Tool use

{% tabs %}
{% tab title="Python" %}
{% code overflow="wrap" %}
```python
"""Run `pip install ddgs` to install dependencies."""

from agno.agent import Agent
from agno.models.aimlapi import AIMLAPI
from agno.tools.websearch import WebSearchTools

agent = Agent(
    model=AIMLAPI(id="openai/gpt-5.6-luna"),
    tools=[WebSearchTools()],
    markdown=True,
)

agent.print_response("Whats happening in France?")
```
{% endcode %}
{% endtab %}
{% endtabs %}

## More

For further information about the framework, please check [the official Agno documentation](https://docs.agno.com/introduction).

For more examples (structured output, retries, image agent with memory), see the [AI/ML API cookbook in the Agno repository](https://github.com/agno-agi/agno/tree/main/cookbook/90_models/aimlapi).
