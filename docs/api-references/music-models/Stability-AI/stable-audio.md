# stable-audio

{% hint style="info" %}
This documentation is valid for the following list of our models:

* `stable-audio`
{% endhint %}

## Model Overview

An advanced audio generation model designed to create high-quality audio tracks from textual prompts.

## Setup your API Key

If you don’t have an API key for the AI/ML API yet, feel free to use our [Quickstart guide](https://docs.aimlapi.com/quickstart/setting-up).

## API Schemas

{% openapi src="stable-audio.json" path="/v2/generate/audio" method="post" %}
[stable-audio.json](stable-audio.json)
{% endopenapi %}

### Retrieve the generated music sample from the server <a href="#retrieve-the-generated-video-from-the-server" id="retrieve-the-generated-video-from-the-server"></a>

After sending a request for music generation, this task is added to the queue. Based on the service's load, the generation can be completed in 50-60 seconds or take a bit more.

{% openapi src="stable-audio-pair.json" path="/v2/generate/audio" method="get" %}
[stable-audio-pair.json](stable-audio-pair.json)
{% endopenapi %}
