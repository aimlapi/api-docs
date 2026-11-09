# DeepSeek

DeepSeek is an AI research company focused on developing high-performance large language models for reasoning, coding, mathematics, and agentic workflows. The company is best known for the DeepSeek model family, which emphasizes strong analytical capabilities, efficient inference architectures, and competitive performance across software engineering and complex reasoning benchmarks. DeepSeek places significant focus on scalable reasoning systems, long-context processing, and reinforcement-learning-based model improvement, while continuing to expand multimodal and tool-augmented AI capabilities.

***

The currently supported model families include:

* **DeepSeek Chat models** — general-purpose conversational and instruction-following models optimized for production workloads, assistant applications, content generation, and developer integrations.
* **DeepSeek Reasoner models** — advanced reasoning-oriented models designed for multi-step analytical tasks, mathematics, software engineering, logical problem solving, and complex agentic workflows. These models are optimized for deeper reasoning and structured analytical generation.
* **DeepSeek Terminus models** — production-oriented models focused on scalable inference, balanced reasoning quality, and enterprise integration scenarios.
* **DeepSeek Flash models** — lightweight low-latency variants optimized for fast response times and cost-efficient high-throughput workloads.
* **DeepSeek Pro models** — higher-capability models intended for advanced reasoning, coding, research, and complex instruction-following workflows.

All DeepSeek models in this provider are accessed through the standard `/v1/chat/completions` endpoint, providing a unified OpenAI-compatible integration layer across the entire model catalog.

Supported capabilities vary depending on the specific model, with different models offering different combinations of the features listed below.

* **Text completions** — Build conversational systems and advanced text-processing pipelines.
* **Function Calling** — Utilize tools, APIs, and structured workflows.
* **Stream mode** — Receive partial responses incrementally as tokens are generated.
* **Reasoning Tasks** — Execute advanced analytical, mathematical, and multi-step reasoning workflows.
* **Coding Tasks** — Generate, analyze, refactor, and debug source code across multiple programming languages.
