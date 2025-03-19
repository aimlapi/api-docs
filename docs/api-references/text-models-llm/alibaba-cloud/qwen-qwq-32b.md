# Qwen-QwQ-32B

{% hint style="info" %}
This documentation is valid for the following list of our models:

* `Qwen/QwQ-32B`
{% endhint %}

## Model Overview

QwQ-32B is a compact reasoning model designed to tackle complex problem-solving tasks with state-of-the-art efficiency. Despite its relatively small size of 32 billion parameters, it achieves performance comparable to much larger models like DeepSeek-R1 (671 billion parameters). Leveraging reinforcement learning (RL) and agentic capabilities, QwQ-32B excels in mathematical reasoning, coding, and structured workflows.

**Key Features:**

* Compact yet powerful: Achieves near-parity with larger models while requiring significantly less computational power.
* Reinforcement learning-driven reasoning: Integrates multi-stage RL for improved problem-solving and adaptability.
* Agentic capabilities: Dynamically adjusts reasoning processes based on environmental feedback.
* Wide context window: Processes up to 131,072 tokens for handling long-form inputs effectively.

## Setup your API Key

If you don’t have an API key for the AI/ML API yet, feel free to use our [Quickstart guide](https://docs.aimlapi.com/quickstart/setting-up).

## Submit a request

### API Schema

{% openapi src="https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/text-models-llm/Alibaba-Cloud/qwen-QwQ-32B.json" path="/v1/chat/completions" method="post" %}
[https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/text-models-llm/Alibaba-Cloud/qwen-QwQ-32B.json](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/text-models-llm/Alibaba-Cloud/qwen-QwQ-32B.json)
{% endopenapi %}

