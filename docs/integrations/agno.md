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

A user of the Agno can&#x20;

{% code overflow="wrap" %}
```python
from agno.models.aimlapi import AIMLApi

agent = Agent(
    model=AIMLApi(
        id="google/gemini-1.5-flash", 
        api_key="<YOUR_AIMLAPI_KEY>"
    ), 
    markdown=True, 
    telemetry=False, 
    monitoring=False
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



## **Our Supported models**

* All OpenAI-compatible models ([gpt-4o](../api-references/text-models-llm/OpenAI/gpt-4o.md), [gpt-4o-mini](../api-references/text-models-llm/OpenAI/gpt-4o-mini.md), [gpt-4-turbo](../api-references/text-models-llm/OpenAI/gpt-4-turbo.md), [gpt-3.5-turbo](../api-references/text-models-llm/OpenAI/gpt-3.5-turbo.md), [o3-mini](../api-references/text-models-llm/OpenAI/o3-mini.md), [o1](../api-references/text-models-llm/OpenAI/o1.md), etc),
* [Google models](../api-references/text-models-llm/Google/),
* [Anthropic models](../api-references/text-models-llm/Anthropic/) is only partially supported and only via `api.aimlapi.com/v2` base URL,
* and some other models (the list is constantly being updated).

## **Supported features**

* Synchronous and asynchronous requests
* Chain-of-thought reasoning
* Built-in RAG and multimodal support
* Collaborative agent workflows (Teams)
* Access to built-in tools (DuckDuckGo, Docker, and many more)

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
pip install -U openai duckduckgo-search duckdb yfinance agno
```

</details>

### Stream mode

{% tabs %}
{% tab title="Python" %}
{% code overflow="wrap" %}
```python
from agno.agent import Agent, RunResponse  # noqa
from agno.models.aimlapi import AIMLApi

agent = Agent(model=AIMLApi(id="gpt-4o-mini"), markdown=True)

# Get the response in a variable
# run_response: Iterator[RunResponse] = agent.run("Share a 2 sentence horror story", stream=True)
# for chunk in run_response:
#     print(chunk.content)

# Print the response in the terminal
agent.print_response("Share a 2 sentence horror story", stream=True)
```
{% endcode %}
{% endtab %}

{% tab title="Second Tab" %}

{% endtab %}
{% endtabs %}

### Image agent

{% tabs %}
{% tab title="Python" %}
{% code overflow="wrap" %}
```python
from agno.agent import Agent
from agno.media import Image
from agno.models.aimlapi import AIMLApi

agent = Agent(
    model=AIMLApi(id="meta-llama/Llama-3.2-11B-Vision-Instruct-Turbo"),
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

{% tab title="Second Tab" %}

{% endtab %}
{% endtabs %}

### Tool use

{% tabs %}
{% tab title="Python" %}
{% code overflow="wrap" %}
```python
"""Run `pip install duckduckgo-search` to install dependencies."""

from agno.agent import Agent
from agno.models.aimlapi import AIMLApi
from agno.tools.duckduckgo import DuckDuckGoTools

agent = Agent(
    model=AIMLApi(id="gpt-4o-mini"), markdown=True),
    tools=[DuckDuckGoTools()],
    show_tool_calls=True,
    markdown=True,
    debug_mode=True,
)

agent.print_response("Whats happening in France?")
```
{% endcode %}
{% endtab %}

{% tab title="Second Tab" %}

{% endtab %}
{% endtabs %}

## More

For further information about the framework, please check the [official Agno documentation.](https://docs.agno.com/introduction)

For additional examples, check out our [repo](https://github.com/D1m7asis/agno-aimlapi/tree/63522cb6c302f88d7a40ab734ee037ca8dc73d23/cookbook/models/aimlapi).
