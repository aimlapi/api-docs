---
description: >-
  This documentation portal is designed to help you choose the AI model that
  best suits your needs from our available options and correctly integrate it
  into your code.
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

## Welcome to the AI/ML API!

<table data-view="cards"><thead><tr><th></th><th data-type="content-ref"></th><th data-type="content-ref"></th><th data-type="content-ref"></th><th></th><th data-hidden data-type="files"></th><th data-hidden data-card-cover data-type="files"></th></tr></thead><tbody><tr><td><strong>Start Here</strong>:</td><td><a href="quickstart/setting-up.md">setting-up.md</a></td><td><a href="quickstart/supported-sdks.md">supported-sdks.md</a></td><td><a href="api-references/model-database/model-database.md">model-database.md</a></td><td><span data-gb-custom-inline data-tag="emoji" data-code="1f4a1">💡</span><a data-mention href="broken-reference">Broken link</a></td><td><a href=".gitbook/assets/kit.png">kit.png</a></td><td><a href=".gitbook/assets/Group 39481.png">Group 39481.png</a></td></tr><tr><td><strong>Going Deeper</strong>:</td><td><a href="capabilities/completion-or-chat-models.md">completion-or-chat-models.md</a></td><td><a href="capabilities/managing-assistants-and-threads/">managing-assistants-and-threads</a></td><td><a href="capabilities/function-calling.md">function-calling.md</a></td><td></td><td><a href=".gitbook/assets/Code.png">Code.png</a></td><td><a href=".gitbook/assets/Group 39482.png">Group 39482.png</a></td></tr><tr><td><strong>Miscellaneous</strong>:</td><td><a href="broken-reference">Broken link</a></td><td><a href="broken-reference">Broken link</a></td><td><a href="broken-reference">Broken link</a></td><td></td><td><a href=".gitbook/assets/Link.png">Link.png</a></td><td><a href=".gitbook/assets/Group 39483.png">Group 39483.png</a></td></tr></tbody></table>

Select the model by its Task, by its Developer (developing company) or by the supported capabilities:

{% hint style="info" %}
If you've already made your choice and know the model ID, use the the [Search panel](https://docs.aimlapi.com/?q=) on your right.
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
**AI21 Labs**: [Text/Chat](api-references/text-models-llm/AI21-Labs/)\
**Alibaba Cloud**: [Text/Chat](api-references/text-models-llm/Alibaba-Cloud/)\
**Anthracite**: [Text/Chat](api-references/text-models-llm/Anthracite/)\
<mark style="background-color:green;">**Anthropic**</mark>: [Text/Chat](api-references/text-models-llm/Anthropic/) [Embedding](api-references/embedding-models/Anthropic/)\
**BAAI**: [Embedding](api-references/embedding-models/BAAI/)\
<mark style="background-color:green;">**Bagoodex**</mark>: [WebSearch](broken-reference)\
**Black Forest Labs**: [Image](api-references/image-models/Black-Forest-Labs/)\
**Cohere**: [Text/Chat](api-references/text-models-llm/Cohere/)\
**Databricks**: [Text/Chat](api-references/text-models-llm/Databricks/)\
<mark style="background-color:green;">**DeepSeek**</mark>: [Text/Chat](api-references/text-models-llm/DeepSeek/)\
**Deepgram**: [Speech-To-Text](api-references/speech-voice-models/stt/Deepgram/) [Text-to-Speech](api-references/speech-voice-models/tts/Deepgram/)\
**Google**: [Text/Chat](api-references/text-models-llm/Google/) [Image](api-references/image-models/Google/) [Embedding](api-references/embedding-models/Google/)\
**Gryphe**: [Text/Chat](api-references/text-models-llm/Gryphe/)\
<mark style="background-color:green;">**Kling AI**</mark>: [Video](api-references/video-models/Kling-AI/)\
**Meta**: [Text/Chat](api-references/text-models-llm/Meta/)\
**Microsoft**: [Text/Chat](api-references/text-models-llm/Microsoft/)\
<mark style="background-color:green;">**MiniMax**</mark>: [Text/Chat](api-references/text-models-llm/MiniMax/) [Video](api-references/video-models/MiniMax/) [Music](api-references/music-models/MiniMax/)\
**Mistral AI**: [Text/Chat](api-references/text-models-llm/Mistral-AI/)\
**NVIDIA**: [Text/Chat](api-references/text-models-llm/NVIDIA/)\
**NeverSleep**: [Text/Chat](api-references/text-models-llm/NeverSleep/)\
**NousResearch**: [Text/Chat](api-references/text-models-llm/NousResearch/)\
<mark style="background-color:green;">**OpenAI**</mark>: [Text/Chat](api-references/text-models-llm/OpenAI/) [Image](api-references/image-models/OpenAI/) [Speech-To-Text](api-references/speech-voice-models/stt/OpenAI/) [Embedding](api-references/embedding-models/OpenAI/)\
**RecraftAI**: [Image](api-references/image-models/RecraftAI/)\
**Runway**: [Video](api-references/video-models/runway/)\
<mark style="background-color:green;">**Stability AI**</mark>: [Image](api-references/image-models/Stability-AI/) [Music](api-references/music-models/Stability-AI/) [3D-Generation](api-references/3d-generating-models/Stability-AI/)\
**Together AI**: [Embedding](api-references/embedding-models/Together-AI/)\
**Upstage AI**: [Text/Chat](api-references/text-models-llm/Upstage-AI/)\
**xAI**: [Text/Chat](api-references/text-models-llm/xAI/)
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
{% endtab %}
{% endtabs %}

## Getting Started

To start using the AI/ML API, follow the [Quickstart guide](quickstart/setting-up.md) to set up your environment and make your first API call.
