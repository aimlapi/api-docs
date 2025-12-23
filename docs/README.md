---
description: Learn how to get started with the AI/ML API
---

# 🧭 Documentation Map

This page helps you quickly find the right AI model or ready-to-use solution for your task. Open the API reference and copy a working example to integrate it into your code in minutes.

***

**Trending Models**

<table data-column-title-hidden data-view="cards" data-full-width="false"><thead><tr><th align="center"></th><th data-hidden data-card-cover data-type="image">Cover image</th><th data-hidden data-card-target data-type="content-ref"></th></tr></thead><tbody><tr><td align="center">Pro-Grade Image Model</td><td><a href=".gitbook/assets/photo_2025-11-21 20.42.54.jpeg">photo_2025-11-21 20.42.54.jpeg</a></td><td><a href="api-references/image-models/google/gemini-3-pro-image-preview.md">gemini-3-pro-image-preview.md</a></td></tr><tr><td align="center">Top Video Generator</td><td><a href=".gitbook/assets/photo_2025-11-10_18-53-24.jpg">photo_2025-11-10_18-53-24.jpg</a></td><td><a href="api-references/video-models/openai/sora-2-t2v.md">sora-2-t2v.md</a></td></tr><tr><td align="center">Smarter Reasoning &#x26; Coding</td><td><a href=".gitbook/assets/2025-11-25 14.33.02.jpg">2025-11-25 14.33.02.jpg</a></td><td><a href="api-references/text-models-llm/google/gemini-3-pro-preview.md">gemini-3-pro-preview.md</a></td></tr></tbody></table>

***

<table data-header-hidden data-full-width="false"><thead><tr><th width="281.09991455078125" valign="top"></th><th valign="top"></th></tr></thead><tbody><tr><td valign="top"><p><strong>Start with this code block</strong><br><br>🚀 <a href="quickstart/setting-up.md"><strong>Setup guide</strong></a> <br><br>🧩 <a href="quickstart/supported-sdks.md"><strong>SDKs</strong></a>  </p><p></p><p>▶️ <a href="https://aimlapi.com/app/"><strong>Run in Playground</strong></a></p></td><td valign="top"><pre class="language-python" data-overflow="wrap"><code class="lang-python">from openai import OpenAI
client = OpenAI(
base_url="https://api.aimlapi.com/v1",
api_key="&#x3C;YOUR_AIMLAPI_KEY>",
)
response = client.chat.completions.create(
model="gpt-4o",
messages=[{"role": "user", "content": "Write a one-sentence story about numbers."}]
)
print(response.choices[0].message.content)
</code></pre></td></tr><tr><td valign="top"></td><td valign="top"></td></tr></tbody></table>

***

## Browse Models

Popular | [View all 400+ models >](api-references/model-database.md)

<table data-view="cards"><thead><tr><th></th><th></th><th></th><th data-hidden data-card-target data-type="content-ref"></th></tr></thead><tbody><tr><td><a href="api-references/text-models-llm/OpenAI/">ChatGPT</a></td><td></td><td></td><td><a href="api-references/text-models-llm/OpenAI/">OpenAI</a></td></tr><tr><td><a href="api-references/text-models-llm/DeepSeek/">DeepSeek</a></td><td></td><td></td><td><a href="api-references/text-models-llm/DeepSeek/">DeepSeek</a></td></tr><tr><td><a href="api-references/image-models/flux/">Flux</a></td><td></td><td></td><td><a href="api-references/image-models/flux/">flux</a></td></tr></tbody></table>

Select the model by its **Task**, by its **Developer** or by the supported **Capabilities**:

{% hint style="info" %}
If you've already made your choice and know the model ID, use the [Search panel](https://docs.aimlapi.com/?q=) on your right.
{% endhint %}

{% tabs %}
{% tab title="Models by TASK" %}
{% content-ref url="api-references/text-models-llm/" %}
[text-models-llm](api-references/text-models-llm/)
{% endcontent-ref %}

{% content-ref url="api-references/image-models/" %}
[image-models](api-references/image-models/)
{% endcontent-ref %}

{% content-ref url="api-references/video-models/" %}
[video-models](api-references/video-models/)
{% endcontent-ref %}

{% content-ref url="api-references/music-models/" %}
[music-models](api-references/music-models/)
{% endcontent-ref %}

{% content-ref url="api-references/speech-models/" %}
[speech-models](api-references/speech-models/)
{% endcontent-ref %}

{% content-ref url="api-references/moderation-safety-models/" %}
[moderation-safety-models](api-references/moderation-safety-models/)
{% endcontent-ref %}

{% content-ref url="api-references/3d-generating-models/" %}
[3d-generating-models](api-references/3d-generating-models/)
{% endcontent-ref %}

{% content-ref url="api-references/vision-models/" %}
[vision-models](api-references/vision-models/)
{% endcontent-ref %}

{% content-ref url="api-references/embedding-models/" %}
[embedding-models](api-references/embedding-models/)
{% endcontent-ref %}
{% endtab %}

{% tab title="Models by DEVELOPER" %}
**Alibaba Cloud**: [Text/Chat](api-references/text-models-llm/Alibaba-Cloud/) [Image](api-references/video-models/alibaba-cloud/) [Video](api-references/image-models/alibaba-cloud/) [Text-to-Speech](api-references/speech-models/text-to-speech/alibaba-cloud/)

**Anthracite**: [Text/Chat](api-references/text-models-llm/Anthracite/)

<mark style="background-color:green;">**Anthropic**</mark>: [Text/Chat](api-references/text-models-llm/Anthropic/) [Embedding](api-references/embedding-models/Anthropic/)

**Assembly AI:** [Speech-To-Text](api-references/speech-models/speech-to-text/assembly-ai/)

**BAAI**: [Embedding](api-references/embedding-models/BAAI/)

**ByteDance**: [Image](api-references/video-models/bytedance/) [Video](api-references/image-models/bytedance/)

**Cohere**: [Text/Chat](api-references/text-models-llm/Cohere/)

<mark style="background-color:green;">**DeepSeek**</mark>: [Text/Chat](api-references/text-models-llm/DeepSeek/)

**Deepgram**: [Speech-To-Text](api-references/speech-voice-models/stt/Deepgram/) [Text-to-Speech](api-references/speech-voice-models/tts/Deepgram/)

<mark style="background-color:green;">**ElevenLabs**</mark>**:** [Text-to-Speech](api-references/speech-models/text-to-speech/elevenlabs/) [Voice Chat](api-references/speech-models/voice-chat/elevenlabs/) [Music](api-references/music-models/elevenlabs/)

<mark style="background-color:green;">**Flux**</mark>: [Image](api-references/image-models/flux/)

**Google**: [Text/Chat](api-references/text-models-llm/Google/) [Image](api-references/image-models/google/) [Video](api-references/video-models/google/) [Music](api-references/vision-models/ocr-optical-character-recognition/google/) [Vision(OCR)](api-references/music-models/google/) [Embedding](api-references/embedding-models/Google/)

**Gryphe**: [Text/Chat](api-references/text-models-llm/gryphe/)

**Inworld**: [Text-to-Speech](api-references/speech-models/text-to-speech/inworld/)

<mark style="background-color:green;">**Kling AI**</mark>: [Image](api-references/image-models/kling-ai/)  [Video](api-references/video-models/Kling-AI/)

**Krea**: [Video](api-references/video-models/krea/)

**LTXV**: [Video](api-references/video-models/ltxv/)

**Meta**: [Text/Chat](api-references/text-models-llm/Meta/)

**Microsoft**: [Text-to-Speech](api-references/speech-models/text-to-speech/microsoft/)

<mark style="background-color:green;">**MiniMax**</mark>: [Text/Chat](api-references/text-models-llm/MiniMax/) [Video](api-references/video-models/MiniMax/) [Music](api-references/music-models/MiniMax/) [Voice-Chat](api-references/speech-models/voice-chat/)

**Mistral AI**: [Text/Chat](api-references/text-models-llm/Mistral-AI/) [Vision(OCR)](api-references/vision-models/ocr-optical-character-recognition/mistral-ai/)

**Moonshot**: [Text/Chat](api-references/text-models-llm/moonshot/)

**NousResearch**: [Text/Chat](api-references/text-models-llm/nousresearch/)

**NVIDIA**: [Text/Chat](api-references/text-models-llm/NVIDIA/)

<mark style="background-color:green;">**OpenAI**</mark>: [Text/Chat](api-references/text-models-llm/OpenAI/) [Image](api-references/image-models/OpenAI/) [Speech-To-Text](api-references/speech-voice-models/stt/OpenAI/) [Embedding](api-references/embedding-models/OpenAI/)

**Perplexity**: [Text/Chat](api-references/text-models-llm/perplexity/)

**PixVerse:** [Video](api-references/video-models/pixverse/)

**RecraftAI**: [Image](api-references/image-models/RecraftAI/)

**Reve**: [Image](api-references/image-models/reve/)

**Runway**: [Video](api-references/video-models/runway/)

<mark style="background-color:green;">**Stability AI**</mark>: [Image](api-references/image-models/Stability-AI/) [Music](api-references/music-models/Stability-AI/) [3D-Generation](api-references/3d-generating-models/Stability-AI/)

**Sber AI**: [Video](api-references/video-models/sber-ai/)

**Tencent**: [Image](api-references/image-models/tencent/)

**Together AI**: [Embedding](api-references/embedding-models/Together-AI/)

**VEED**: [Video](api-references/video-models/veed/)

**xAI**: [Text/Chat](api-references/text-models-llm/xAI/) [Image](api-references/image-models/xai/)

**Zhipu**: [Text/Chat](api-references/text-models-llm/zhipu/)
{% endtab %}

{% tab title="Text Models by CAPABILITY" %}
{% content-ref url="capabilities/completion-or-chat-models.md" %}
[completion-or-chat-models.md](capabilities/completion-or-chat-models.md)
{% endcontent-ref %}

{% content-ref url="capabilities/streaming-mode.md" %}
[streaming-mode.md](capabilities/streaming-mode.md)
{% endcontent-ref %}

{% content-ref url="capabilities/code-generation.md" %}
[code-generation.md](capabilities/code-generation.md)
{% endcontent-ref %}

{% content-ref url="capabilities/thinking-reasoning.md" %}
[thinking-reasoning.md](capabilities/thinking-reasoning.md)
{% endcontent-ref %}

{% content-ref url="capabilities/function-calling.md" %}
[function-calling.md](capabilities/function-calling.md)
{% endcontent-ref %}

{% content-ref url="capabilities/image-to-text-vision.md" %}
[image-to-text-vision.md](capabilities/image-to-text-vision.md)
{% endcontent-ref %}

{% content-ref url="capabilities/web-search.md" %}
[web-search.md](capabilities/web-search.md)
{% endcontent-ref %}
{% endtab %}
{% endtabs %}

## Browse Solutions

* [AI Search Engine](solutions/ai-search-engine/) – if you need to create a project where information must be found on the internet and then presented to you in a structured format, use this solution.
* [OpenAI Assistants](solutions/openai/assistants/) – if you need to create tailored AI Assistants capable of handling customer support, data analysis, content generation, and more.

***

## Going Deeper

<table data-header-hidden data-full-width="false"><thead><tr><th width="409.4000244140625"></th><th valign="top"></th></tr></thead><tbody><tr><td><p><strong>Use more text model capabilities in your project:</strong><br><br><span data-gb-custom-inline data-tag="emoji" data-code="1f4d6">📖</span> <a href="capabilities/completion-or-chat-models.md">​Completion and Chat Completion</a></p><p><span data-gb-custom-inline data-tag="emoji" data-code="1f4d6">📖</span> <a href="capabilities/function-calling.md">Function Calling</a></p><p><span data-gb-custom-inline data-tag="emoji" data-code="1f4d6">📖</span> <a href="capabilities/streaming-mode.md">Streaming Mode</a></p><p><span data-gb-custom-inline data-tag="emoji" data-code="1f4d6">📖</span> <a href="capabilities/image-to-text-vision.md">Vision in Text Models (Image-to-Text)</a></p><p><span data-gb-custom-inline data-tag="emoji" data-code="1f4d6">📖</span> <a href="capabilities/code-generation.md">Code Generation</a></p><p><span data-gb-custom-inline data-tag="emoji" data-code="1f4d6">📖</span> <a href="capabilities/thinking-reasoning.md">Thinking / Reasoning</a></p><p><span data-gb-custom-inline data-tag="emoji" data-code="1f4d6">📖</span> <a href="capabilities/web-search.md">Web Search</a><br><br></p></td><td valign="top"><p><strong>Miscellaneous</strong>:<br><br><span data-gb-custom-inline data-tag="emoji" data-code="1f517">🔗</span> <a href="integrations/our-integration-list.md">Integrations</a></p><p><span data-gb-custom-inline data-tag="emoji" data-code="1f4d7">📗</span> <a href="/broken/pages/Zz7piDzGOANDC63nM8xE">Glossary</a></p><p><span data-gb-custom-inline data-tag="emoji" data-code="26a0">⚠️</span> <a href="/broken/pages/YApTOWrutNaVS6Kmkbi4">Errors and Messages</a></p><p><span data-gb-custom-inline data-tag="emoji" data-code="2753">❓</span> <a href="/broken/pages/woZ3J6qGHZ4rL9NFv2cL">FAQ </a>​</p><p><br></p></td></tr><tr><td><strong>Learn more about developer-specific features:</strong><br><br><span data-gb-custom-inline data-tag="emoji" data-code="1f4d6">📖</span> <a href="capabilities/anthropic.md">Features of Anthropic Models</a><br></td><td valign="top"></td></tr></tbody></table>

## Have a Minute? Help Make the Docs Better!

We’re currently working on improving our documentation portal, and your feedback would be **incredibly** helpful! Take [**a quick 5-question survey**](https://tally.so/r/w4G9Er) (no personal info required!)

You can also rate each individual page using the built-in form on the right side of the screen:

<figure><img src=".gitbook/assets/rateform-5.webp" alt=""><figcaption></figcaption></figure>

Have suggestions for improvement? [**Let us know!**](https://forms.aimlapi.com/doc)
