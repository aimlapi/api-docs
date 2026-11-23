# Pixverse Swap
description: "Model id: pixverse/swap. HeyGen Avatar 6 Turbo is the lower-cost Turbo variant of HeyGen Avatar 6, with the same inputs: a photo of a person and an audio track become a talking-avatar video at up to 2K. No HeyGen account or avatar needed. Does not support tools/function calling."
---

# HeyGen Avatar 6 Turbo

{% columns %}
{% column width="66.66666666666666%" %}
{% hint style="info" %}
This documentation is valid for the following list of our models:

* `pixverse/swap`
{% endhint %}
{% endcolumn %}

{% column width="33.33333333333334%" %}
<a href="https://aimlapi.com/app/pixverse/swap" class="button primary">Try in Playground</a>
{% endcolumn %}
{% endcolumns %}

## Model Overview

PixVerse Swap replaces a person, an object or the background in a video with the one from a photo, keeping the original motion and sound.

## Setup your API Key

If you don't have an API key yet, use our [Quickstart guide](https://docs.aimlapi.com/quickstart/setting-up).

## How to Make a Call

<details>

<summary>Step-by-Step Instructions</summary>

Generating a video involves sequentially calling two endpoints:

* Create and submit a video generation task. The response contains a generation ID.
* Poll the retrieval endpoint with that generation ID until the status is `completed`.

</details>

## API Schemas

### Create a video generation task and send it to the server

{% openapi-operation spec="swap" path="/v2/video/generations" method="post" %}
[OpenAPI swap](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/video-models/pixverse/swap.json)
{% endopenapi-operation %}

### Retrieve the generated video from the server

Poll this endpoint with the `generation_id` returned by the submit request. When the status is `completed`, the response includes the generated video URL.

{% openapi-operation spec="universal-video-endpoint-fetch" path="/v2/video/generations" method="get" %}
[OpenAPI universal-video-endpoint-fetch](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/video-models/universal-video-fetch.json)
{% endopenapi-operation %}

## Code Example

The examples submit a generation task and poll every **15 seconds** until the final result is available. Replace `<PHOTO_URL>` and `<AUDIO_URL>` with public URLs of your photo and audio.

{% tabs %}
{% tab title="Python" %}
{% code overflow="wrap" %}
```python
import requests
import time

api_key = "<YOUR_AIMLAPI_KEY>"
url = "https://api.aimlapi.com/v2/video/generations"
headers = {
    "Authorization": f"Bearer {api_key}",
    "Content-Type": "application/json",
}

generation = requests.post(
    url,
    headers=headers,
    json={
        "model": "pixverse/swap",
        "image_url": "<PHOTO_URL>",
        "audio_url": "<AUDIO_URL>",
        "resolution": "1080p",
        "motion_prompt": "Friendly, nods while speaking, small hand gestures.",
    },
)
generation.raise_for_status()
generation_id = generation.json()["id"]

while True:
    result = requests.get(
        url,
        headers=headers,
        params={"generation_id": generation_id},
    )
    result.raise_for_status()
    data = result.json()
    if data.get("status") not in ("queued", "generating"):
        print(data)
        break
    time.sleep(15)
```
{% endcode %}
{% endtab %}

{% tab title="JavaScript" %}
{% code overflow="wrap" %}
```javascript
const apiKey = "<YOUR_AIMLAPI_KEY>";
const url = "https://api.aimlapi.com/v2/video/generations";
const headers = {
  "Authorization": `Bearer ${apiKey}`,
  "Content-Type": "application/json",
};

const generation = await fetch(url, {
  method: "POST",
  headers,
  body: JSON.stringify({
    model: "pixverse/swap",
    image_url: "<PHOTO_URL>",
    audio_url: "<AUDIO_URL>",
    resolution: "1080p",
    motion_prompt: "Friendly, nods while speaking, small hand gestures.",
  }),
});
const { id: generationId } = await generation.json();

while (true) {
  const response = await fetch(
    `${url}?generation_id=${encodeURIComponent(generationId)}`,
    { headers },
  );
  const data = await response.json();
  if (!["queued", "generating"].includes(data.status)) {
    console.log(data);
    break;
  }
  await new Promise((resolve) => setTimeout(resolve, 15000));
}
```
{% endcode %}
{% endtab %}
{% endtabs %}

<details>

<summary>Response</summary>

The shape of a finished generation; `video.url` is the MP4 to download, and `meta.usage` is what the request cost.

{% code overflow="wrap" %}
```json
{
  "id": "<generation_id>",
  "status": "completed",
  "video": {
    "url": "<video_url>"
  },
  "meta": {
    "usage": {
      "credits_used": "<credits>",
      "usd_spent": "<usd>"
    }
  },
  "model": "pixverse/swap"
}
```
{% endcode %}

</details>
