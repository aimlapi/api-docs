---
description: >-
  Description of code generation as a capability of some our AI models and a
  list of supporting models.
layout:
  title:
    visible: true
  description:
    visible: false
  tableOfContents:
    visible: true
  outline:
    visible: true
  pagination:
    visible: true
---

# Code Generation

## Overview

While all text models can write code in various languages upon request, some models are specifically trained for such tasks. These specialized models excel in generating functions, scripts, or even entire applications by understanding user intent and translating it into syntactically correct code. They support multiple programming languages and can provide solutions ranging from simple algorithms to complex system components.

Beyond code generation, AI models help with debugging, refactoring, and optimization. Developers can ask for explanations of code snippets, receive suggestions for improvements, or convert code between languages. This capability streamlines development workflows, reduces repetitive tasks, and enhances productivity.

## Models That Support Code Generation

Let's go over this again: any [text chat model](../api-references/model-database.md#text-models-llm) can generate some code based on your request. However, here is a list of models specifically trained for this by the developer:

* [mistralai/codestral-2501](../api-references/text-models-llm/Mistral-AI/codestral-2501.md)
* [Qwen/Qwen2.5-Coder-32B-Instruct](../api-references/text-models-llm/Alibaba-Cloud/Qwen2.5-Coder-32B-Instruct.md)
* [anthropic/claude-opus-4](../api-references/text-models-llm/anthropic/claude-4-opus.md)
* [anthropic/claude-sonnet-4](../api-references/text-models-llm/anthropic/claude-4-sonnet.md)
