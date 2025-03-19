---
description: Welcome to the AI/ML API!
layout:
  title:
    visible: true
  description:
    visible: true
  tableOfContents:
    visible: true
  outline:
    visible: true
  pagination:
    visible: true
---

# 🧭 Documentation Map

This documentation portal is designed to help you choose and configure the AI **model** that best suits your needs—or one of our **solutions** (ready-to-use tools for specific practical tasks) from our available options and correctly integrate it into your code. Simply follow the steps below.

{% stepper %}
{% step %}
### &#x20;<mark style="background-color:green;">QUICKSTART</mark>&#x20;

Prepare everything needed to call our API:\
[setting-up.md](quickstart/setting-up.md "mention")     [supported-sdks.md](quickstart/supported-sdks.md "mention")&#x20;

***
{% endstep %}

{% step %}
### &#x20;<mark style="background-color:yellow;">SELECT  YOUR  AI</mark>&#x20;

**Find a Suitable Model**   |     [**API REFERENCES**](broken-reference)

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
**AI21 Labs**:  [Text/Chat](api-references/text-models-llm/AI21-Labs/)\
**Alibaba Cloud**:  [Text/Chat](api-references/text-models-llm/Alibaba-Cloud/)    [Video](api-references/video-models/alibaba-cloud/)\
**Anthracite**:  [Text/Chat](api-references/text-models-llm/Anthracite/)\
<mark style="background-color:green;">**Anthropic**</mark>:  [Text/Chat](api-references/text-models-llm/Anthropic/)  [Embedding](api-references/embedding-models/Anthropic/) \
**BAAI**:  [Embedding](api-references/embedding-models/BAAI/)\
**Cohere**:  [Text/Chat](api-references/text-models-llm/Cohere/)\
<mark style="background-color:green;">**DeepSeek**</mark>:  [Text/Chat](api-references/text-models-llm/DeepSeek/)\
**Deepgram**:  [Speech-To-Text](api-references/speech-voice-models/stt/Deepgram/)  [Text-to-Speech](api-references/speech-voice-models/tts/Deepgram/)\
**Flux**:  [Image](api-references/image-models/flux/)\
**Google**:  [Text/Chat](api-references/text-models-llm/Google/)  [Image](api-references/image-models/Google/)  [Embedding](api-references/embedding-models/Google/)    [Video](api-references/video-models/google/)\
**Gryphe**:  [Text/Chat](api-references/text-models-llm/Gryphe/)\
<mark style="background-color:green;">**Kling AI**</mark>:  [Video](api-references/video-models/Kling-AI/)\
**Meta**:  [Text/Chat](api-references/text-models-llm/Meta/)\
**Microsoft**:  [Text/Chat](api-references/text-models-llm/Microsoft/)\
<mark style="background-color:green;">**MiniMax**</mark>:  [Text/Chat](api-references/text-models-llm/MiniMax/)  [Video](api-references/video-models/MiniMax/)  [Music](api-references/music-models/MiniMax/)\
**Mistral AI**:  [Text/Chat](api-references/text-models-llm/Mistral-AI/)\
**NVIDIA**:  [Text/Chat](api-references/text-models-llm/NVIDIA/)\
**NeverSleep**:  [Text/Chat](api-references/text-models-llm/NeverSleep/)\
**NousResearch**:  [Text/Chat](api-references/text-models-llm/NousResearch/)\
<mark style="background-color:green;">**OpenAI**</mark>:  [Text/Chat](api-references/text-models-llm/OpenAI/)  [Image](api-references/image-models/OpenAI/)  [Speech-To-Text](api-references/speech-voice-models/stt/OpenAI/)  [Embedding](api-references/embedding-models/OpenAI/) \
**RecraftAI**:  [Image](api-references/image-models/RecraftAI/)\
**Runway**:  [Video](api-references/video-models/runway/)\
<mark style="background-color:green;">**Stability AI**</mark>:  [Image](api-references/image-models/Stability-AI/)  [Music](api-references/music-models/Stability-AI/)  [3D-Generation](api-references/3d-generating-models/Stability-AI/)\
**Together AI**:  [Embedding](api-references/embedding-models/Together-AI/)\
**Upstage AI**:  [Text/Chat](api-references/text-models-llm/Upstage-AI/)\
**xAI**:  [Text/Chat](api-references/text-models-llm/xAI/)
{% endtab %}

{% tab title="Models by CAPABILITY" %}
{% content-ref url="capabilities/completion-or-chat-models.md" %}
[completion-or-chat-models.md](capabilities/completion-or-chat-models.md)
{% endcontent-ref %}

{% content-ref url="capabilities/function-calling.md" %}
[function-calling.md](capabilities/function-calling.md)
{% endcontent-ref %}

{% content-ref url="capabilities/image-to-text-vision.md" %}
[image-to-text-vision.md](capabilities/image-to-text-vision.md)
{% endcontent-ref %}

{% content-ref url="capabilities/code-generation.md" %}
[code-generation.md](capabilities/code-generation.md)
{% endcontent-ref %}
{% endtab %}
{% endtabs %}

**Choose Ready-to-Use Solutions Instead**    |    [**SOLUTIONS**](broken-reference)

* [AI Search Engine](solutions/ai-search-engine/) – if you need to create a project where information must be found on the internet and then presented to you in a structured format, use this solution.

***
{% endstep %}

{% step %}
### &#x20;<mark style="background-color:orange;">GOING  DEEPER</mark>&#x20;

<table data-header-hidden data-full-width="true"><thead><tr><th width="375"></th><th valign="top"></th></tr></thead><tbody><tr><td><p><strong>More about text model capabilities:</strong><br><br><span data-gb-custom-inline data-tag="emoji" data-code="1f4d6">📖</span> <a href="capabilities/completion-or-chat-models.md">​Completion and Chat Completion</a></p><p><span data-gb-custom-inline data-tag="emoji" data-code="1f4d6">📖</span> <a href="capabilities/managing-assistants-and-threads/">Managing Assistants &#x26; Threads</a></p><p><span data-gb-custom-inline data-tag="emoji" data-code="1f4d6">📖</span> <a href="capabilities/function-calling.md">Function Calling</a></p><p><span data-gb-custom-inline data-tag="emoji" data-code="1f4d6">📖</span> <a href="capabilities/image-to-text-vision.md">Vision in Text Models (Image-to-Text)</a></p><p><span data-gb-custom-inline data-tag="emoji" data-code="1f4d6">📖</span> <a href="capabilities/code-generation.md">Code Generation</a></p><p><br></p></td><td valign="top"><p><strong>Miscellaneous</strong>:<br><br><span data-gb-custom-inline data-tag="emoji" data-code="1f517">🔗</span>  <a href="broken-reference">Integrations</a></p><p><span data-gb-custom-inline data-tag="emoji" data-code="1f4d7">📗</span>   <a href="broken-reference">Glossary</a></p><p><span data-gb-custom-inline data-tag="emoji" data-code="26a0">⚠️</span>  <a href="broken-reference">Errors and Messages</a></p><p><span data-gb-custom-inline data-tag="emoji" data-code="2753">❓</span>    <a href="broken-reference">FAQ</a> ​</p><p><br></p></td></tr><tr><td><strong>More about developer-specific features:</strong><br><br><span data-gb-custom-inline data-tag="emoji" data-code="1f4d6">📖</span> <a href="capabilities/anthropic.md">Features of Anthropic Models</a></td><td valign="top"></td></tr></tbody></table>
{% endstep %}
{% endstepper %}
