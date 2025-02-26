# MiniMax Video

## Overview

Our API allows developers to generate, retrieve, and extend AI-generated content using a variety of inputs. This API is particularly useful for creative applications, such as generating video content using a text prompt as an instruction and an image as the first frame.

## Step-by-Step Guide

### Authentication

All API requests require a Bearer token for authentication. Include your token in the `Authorization` header of each request.

### Calling API

There are two APIs: the task of creating video generation and querying the status of video generation. The steps are as follows:&#x20;

1. Call the [Generate Video](generate-video.md) API. It creates a video generation task and returned you `generation_id`.
2. Call the [Fetch Generation](fetch-generation.md) API. It queries the video generation status based on your `generation_id`.
3. If your generation was successful, you can use the URL returned by the query interface to view and download the results through the File API.

{% content-ref url="generate-video.md" %}
[generate-video.md](generate-video.md)
{% endcontent-ref %}

{% content-ref url="fetch-generation.md" %}
[fetch-generation.md](fetch-generation.md)
{% endcontent-ref %}
