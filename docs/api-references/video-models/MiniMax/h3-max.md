# MiniMax H3 Max

{% columns %}
{% column width="66.66666666666666%" %}
{% hint style="info" %}
This documentation is valid for the following list of our models:

* `minimax/h3-max`
{% endhint %}
{% endcolumn %}

{% column width="33.33333333333334%" %}
<a href="https://aimlapi.com/app/minimax/h3-max" class="button primary">Try in Playground</a>
{% endcolumn %}
{% endcolumns %}

## Model Overview

MiniMax H3 Max is a post-trained H3 video model tuned for faster generation and closer prompt adherence, producing 5-15 second clips at 480p or 768p and 24 fps with native stereo audio, from text, a first/last frame, or reference images, video and audio.

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

{% openapi-operation spec="h3-max" path="/v2/video/generations" method="post" %}
[OpenAPI h3-max](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/video-models/MiniMax/h3-max.json)
{% endopenapi-operation %}

### Retrieve the generated video from the server

Poll this endpoint with the `generation_id` returned by the submit request. When the status is `completed`, the response includes the generated video URL.

{% openapi-operation spec="universal-video-endpoint-fetch" path="/v2/video/generations" method="get" %}
[OpenAPI universal-video-endpoint-fetch](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/video-models/universal-video-fetch.json)
{% endopenapi-operation %}

## Code Example

The examples submit a generation task and poll every **15 seconds** until the final result is available.

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

generation = requests.post(url, headers=headers, json={'model': 'minimax/h3-max', 'prompt': 'Describe what you want the model to generate.', 'image_url': 'https://example.com/input.jpg', 'duration': 6})
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
  "model": "minimax/h3-max",
  "prompt": "Describe what you want the model to generate.",
  "image_url": "https://example.com/input.jpg",
  "duration": 6
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

{% code overflow="wrap" %}
```json
{
  "id": "60ac7c34-3224-4b14-8e7d-0aa0db708325",
  "status": "completed",
  "video": {
    "url": "https://cdn.aimlapi.com/generations/hedgehog/1759866285599-0cdfb138-c03a-49d4-a601-4f6413e27b15.mp4"
  },
  "error": {
    "name": "<name>",
    "message": "<message>"
  },
  "meta": {
    "usage": {
      "credits_used": 120000,
      "usd_spent": 0.06
    }
  },
  "model": "minimax/h3-max"
}
```
{% endcode %}

</details>
