# Google

Google develops multiple families of AI models focused on reasoning, coding, multimodal understanding, and long-context interaction across text, images, audio, and video. As part of the broader Google ecosystem, the company integrates frontier AI capabilities into developer platforms, productivity tools, search systems, and enterprise infrastructure.

The currently supported model families include:

* **Gemini models** — Google’s flagship multimodal and reasoning-oriented models designed for production AI workloads. The Gemini lineup includes:
  * **Flash models** optimized for low latency and cost efficiency.
  * **Pro models** intended for balanced general-purpose production use.
  * Advanced reasoning-capable variants focused on coding, analytical tasks, tool usage, and agentic workflows.\
    Gemini models place strong emphasis on multimodal processing, long context windows, native tool integration, and real-time interaction capabilities.
* **Gemma models** — lightweight open-weight models designed for efficient deployment, customization, and research workflows. Gemma models are optimized for smaller-scale inference environments while still supporting strong reasoning, coding, and conversational capabilities across a wide range of applications.

All Google models in this developer are accessed through the standard `/v1/chat/completions` endpoint, providing a unified OpenAI-compatible integration layer across the entire model catalog.

***

Supported capabilities vary depending on the specific model, with different models offering different combinations of the features listed below.

* **Text completions**: Build conversational systems and advanced text-processing pipelines.
* **Function Calling**: Utilize tools, APIs, and structured workflows.
* **Stream mode**: Receive partial responses incrementally as tokens are generated.
* **Batch Processing**: Execute multiple independent requests within a single API call.
* **Vision Tasks**: Process and analyze images and visual inputs.
* **Audio Tasks**: Transcribe, generate, and process audio content.
* **Video Tasks**: Analyze and reason over video inputs.

***

Other model categories from this provider are available as well.

* [Image](../../image-models/google/)&#x20;
* [Video](../../video-models/google/)&#x20;
* [Music](../../vision-models/ocr-optical-character-recognition/google/)&#x20;
* [Vision(OCR)](../../music-models/google/)&#x20;
* [Embedding](../../embedding-models/Google/)
