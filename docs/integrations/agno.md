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



## **Our Supported models**

* All OpenAI-compatible models ([gpt-4o](broken-reference), [gpt-4o-mini](broken-reference), [gpt-4-turbo](broken-reference), [gpt-3.5-turbo](broken-reference), [o3-mini](broken-reference), [o1](broken-reference), etc),
* [Google models](broken-reference),
* [Anthropic models](broken-reference) is only partially supported and only via `api.aimlapi.com/v2` base URL,
* [MistralAI models](broken-reference),
* [DeepSeek models](broken-reference),
* [xAI models](broken-reference),
* and some other models (the list is constantly being updated).

## **Supported features**

* Synchronous and asynchronous requests
* Chain-of-thought reasoning
* Built-in RAG and multimodal support
* Collaborative agent workflows (Teams)
* Access to built-in tools (DuckDuckGo, Docker, and many more)

## More

For further information about the framework, please check the [official Agno documentation.](https://docs.agno.com/introduction)

