# jamba-1-5-mini

{% hint style="success" %}
This documentation is valid for the following list of our models:

* `ai21/jamba-1-5-mini`
{% endhint %}

<table data-header-hidden data-full-width="false"><thead><tr><th width="163.33331298828125" valign="top"></th><th width="173.23333740234375" valign="top"></th><th width="145.65008544921875" valign="top"></th><th width="177.60009765625" valign="top"></th><th width="107.88330078125" valign="top"></th></tr></thead><tbody><tr><td valign="top">Context: <kbd>128,000</kbd></td><td valign="top">Parameters: <kbd>70B</kbd></td><td valign="top">Cutoff date: <kbd>2025-03-17</kbd></td><td valign="top">Input:  <kbd>Text</kbd>, <kbd>Image</kbd>, <kbd>Document</kbd></td><td valign="top">Output:  <kbd>Text</kbd></td></tr><tr><td valign="top">Function calling   <span data-gb-custom-inline data-tag="emoji" data-code="2705">✅</span></td><td valign="top">Code Generation   <span data-gb-custom-inline data-tag="emoji" data-code="2705">✅</span></td><td valign="top">Web Search   <span data-gb-custom-inline data-tag="emoji" data-code="2705">✅</span></td><td valign="top">Vision   <span data-gb-custom-inline data-tag="emoji" data-code="2705">✅</span></td><td valign="top">Stream   <span data-gb-custom-inline data-tag="emoji" data-code="2705">✅</span></td></tr></tbody></table>

<div align="right" data-full-width="false">
  <figure>
    <a href="https://aimlapi.com/app/" target="_blank">
      <img src="../../../.gitbook/assets/изображение (2).png" alt="">
    </a>
    <figcaption></figcaption>
  </figure>
</div>

## Model Overview

A state-of-the-art hybrid SSM-Transformer model designed for high efficiency and performance in instruction-following tasks. It excels in processing long contexts and generating high-quality outputs, making it suitable for a variety of applications in natural language processing.

## Setup your API Key

If you don’t have an API key for the AI/ML API yet, feel free to use our [Quickstart guide](https://docs.aimlapi.com/quickstart/setting-up).

## Submit a request

### API Schema

{% openapi src="jamba-1-5-mini.json" path="/v1/chat/completions" method="post" %}
[jamba-1-5-mini.json](jamba-1-5-mini.json)
{% endopenapi %}
