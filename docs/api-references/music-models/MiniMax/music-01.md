# music-01

{% hint style="info" %}
This documentation is valid for the following list of our models:

* `music-01`
{% endhint %}

## Model Overview

An advanced AI model that generates diverse high-quality audio compositions by analyzing and reproducing musical patterns, rhythms, and vocal styles from the reference track. Refine the process using a text prompt.

## Setup your API Key

If you don’t have an API key for the AI/ML API yet, feel free to use our [Quickstart guide](https://docs.aimlapi.com/quickstart/setting-up).

## API Schemas

### Generate a music sample

This endpoint creates and sends a music generation task to the server — and returns a generation ID and the task status.

{% openapi src="music-01-pair.json" path="/v2/generate/audio/minimax/upload" method="post" %}
[music-01-pair.json](music-01-pair.json)
{% endopenapi %}

### Retrieve the generated music sample from the server <a href="#retrieve-the-generated-video-from-the-server" id="retrieve-the-generated-video-from-the-server"></a>

After sending a request for music generation, this task is added to the queue. Based on the service's load, the generation can be completed in 50-60 seconds or take a bit more.

{% openapi src="music-01.json" path="/v2/generate/audio/minimax/generate" method="post" %}
[music-01.json](music-01.json)
{% endopenapi %}
