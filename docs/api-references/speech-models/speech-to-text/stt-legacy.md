---
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

# stt \[legacy]

{% hint style="warning" %}
This is the old version of our STT API, which has been known to experience failures due to timeouts. To avoid such issues, we recommend using the new endpoints described on other pages in the Speech-to-Text category.&#x20;

The migration won’t take much time since the input parameters of the main endpoint remain the same, and each model includes detailed code examples.
{% endhint %}

{% hint style="success" %}
This service uses per-second billing. The cost of audio transcription is based on the number of seconds in the input audio file, not the processing time.
{% endhint %}

{% openapi-operation spec="stt-legacy" path="/v1/stt" method="post" %}
[Broken link](broken-reference)
{% endopenapi-operation %}

