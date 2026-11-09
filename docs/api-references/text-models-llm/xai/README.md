# xAI

**xAI** is an artificial intelligence company focused on developing the Grok family of large language models and multimodal AI systems. Founded by Elon Musk, the company positions Grok as a “maximally truth-seeking” AI assistant designed to provide direct, insightful, and real-time responses. xAI places strong emphasis on reasoning, large-context processing, web-connected generation, and agentic tool usage, while integrating its models across the broader X ecosystem and developer platforms.

The currently supported model families include:

* **Grok flagship models** — xAI’s primary reasoning and multimodal models intended for production AI workloads. The Grok lineup includes:
  * High-performance reasoning models optimized for coding, analytical workflows, and advanced instruction following.
  * Fast non-reasoning variants designed for low-latency conversational and agentic applications.
  * Vision-capable Grok models supporting image understanding and multimodal interaction.\
    Recent Grok generations also introduce extended context windows, native tool calling, structured outputs, search integration, and real-time external information retrieval capabilities.

All xAI models in this provider are accessed through the standard `/v1/chat/completions` endpoint, providing a unified OpenAI-compatible integration layer across the entire model catalog.

***

Supported capabilities vary depending on the specific model, with different models offering different combinations of the features listed below.

* **Text completions**: Build conversational systems and advanced text-processing pipelines.
* **Function Calling**: Utilize tools, APIs, and structured workflows.
* **Stream mode**: Receive partial responses incrementally as tokens are generated.
* **Vision Tasks**: Process and analyze images and visual inputs.
* **Reasoning Tasks**: Execute advanced analytical, coding, and multi-step reasoning workflows.
* **Large Context Processing**: Work with extremely large prompts, documents, and conversational histories.

***

Other model categories from this provider are available as well.

* [Image](../../image-models/xai/)
