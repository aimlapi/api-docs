# Claude 3 Sonnet

{% hint style="info" %}
This documentation is valid for the following list of our models:

* anthropic/claude-3-sonnet
* claude-3-sonnet-latest
{% endhint %}

## Model Overview

Sonnet is engineered to balance performance and speed, positioning it as an excellent option for applications that need both high efficiency and robust capabilities. As a multimodal model like its counterparts, Sonnet can process and analyze both text and image data.

## Setup your API Key

If you don’t have an API key for the AI/ML API yet, feel free to use our [Quickstart guide](https://docs.aimlapi.com/quickstart/setting-up).

## Submit a request

### API Schema

{% openapi src="claude-3-sonnet.json" path="/v1/chat/completions" method="post" %}
[claude-3-sonnet.json](claude-3-sonnet.json)
{% endopenapi %}
