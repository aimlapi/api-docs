---
description: Overview of the capabilities of AIML API vision models.
icon: eye
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

# Vision Models

## Overview

Our API enables you to use machine learning models for tasks that require visual capabilities. These models are referred to as _vision models_. Within our API, we offer two categories of vision models: **OCR** and **OFR**.

### OCR: Optical Character Recognition

With OCR technology, you can analyze any document and extract text as well as other characters and symbols. This allows you to detect:

* Text
* Paragraph blocks
* Handwriting
* Text inside PDF/TIFF files

{% content-ref url="ocr-optical-character-recognition/" %}
[ocr-optical-character-recognition](ocr-optical-character-recognition/)
{% endcontent-ref %}

### OFR: Optical Feature Recognition

In contrast to OCR, OFR allows you to analyze not just documents but also images. You can filter exactly what you want to find in the image by the features they include:

* Crop hints
* Faces
* Image properties
* Labels
* Landmarks
* Logos
* Multiple objects
* Explicit content
* Web entities and pages
* And many more

{% content-ref url="ofr-optical-feature-recognition.md" %}
[ofr-optical-feature-recognition.md](ofr-optical-feature-recognition.md)
{% endcontent-ref %}
