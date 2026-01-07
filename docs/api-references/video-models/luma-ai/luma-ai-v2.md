# Luma Ray 1.6 (Text-to-Video)

{% columns %}
{% column width="66.66666666666666%" %}
{% hint style="info" %}
This documentation is valid for the following list of our models:

* `luma/ray-1-6`
{% endhint %}
{% endcolumn %}

{% column width="33.33333333333334%" %}
<a href="https://aimlapi.com/app/luma/ray-1-6" class="button primary">Try in Playground</a>
{% endcolumn %}
{% endcolumns %}

## Overview

The Luma AI Dream Machine API allows developers to generate and extend AI-generated videos based on text prompts.

## Setup your API Key

If you don’t have an API key for the AI/ML API yet, feel free to use our [Quickstart guide](https://docs.aimlapi.com/quickstart/setting-up).

## How to Make a Call

<details>

<summary>Step-by-Step Instructions</summary>

Generating a video using this model involves making two sequential API calls:

* The first one is for creating and sending a video generation task to the server (returns a generation ID). This can be either a generation from a reference image/prompt or a video extension operation that adds length to an existing video.
* The second one is for requesting the generated or extended video from the server using the generation ID received from the first endpoint. Within this API call, you can use either the standard endpoint to retrieve the generated/extended video or a special endpoint to request multiple generations at once.

Below, you can find three corresponding API schemas and examples for all endpoint calls.

</details>

## API Schemas

### Generate video

`loop` parameter controls if the generated video will be looped.

{% openapi-operation spec="ray-1-6" path="/v2/video/generations" method="post" %}
[OpenAPI ray-1-6](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/video-models/luma-ai/ray-1-6.json)
{% endopenapi-operation %}

### Fetch generation

After sending a request for video generation, this task is added to the queue. This endpoint lets you check the status of a video generation task using its `id`, obtained from the endpoint described above.\
If the video generation task status is `completed`, the response will include the final result — with the generated video URL and additional metadata.

{% openapi-operation spec="universal-video-endpoint-fetch" path="/v2/video/generations" method="get" %}
[OpenAPI universal-video-endpoint-fetch](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/video-models/universal-video-fetch.json)
{% endopenapi-operation %}

### Example: Fetch Single Generation

For example, if you are waiting for video dreaming (when the video is popped from the queue and generation is in processing), then you can send the following request:

{% tabs %}
{% tab title="Python" %}
{% code overflow="wrap" %}
```python
import requests


def main():
    response = requests.get(
        "https://api.aimlapi.com/v2/generate/video/luma-ai/generation",
        params={
            "generation_id": "755f9bbb-d99b-4880-992b-f05244ddba61",
            "status": "dreaming"
        },
        headers={
            "Authorization": "Bearer <YOUR_AIMLAPI_KEY>",
            "Content-Type": "application/json",
        },
    )

    response.raise_for_status()
    data = response.json()
    print("Generation:", data)


if __name__ == "__main__":
    main()
```
{% endcode %}
{% endtab %}

{% tab title="JavaScript" %}
{% code overflow="wrap" %}
```javascript
const main = async () => {
  const url = new URL('https://api.aimlapi.com/v2/generate/video/luma-ai/generation');
  url.searchParams.set('generation_id', '755f9bbb-d99b-4880-992b-f05244ddba61');
  url.searchParams.set('state', 'dreaming');

  const data = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: 'Bearer <YOUR_AIMLAPI_KEY>',
      'Content-Type': 'application/json',
    },
  }).then((res) => res.json());

  console.log('Generation:', data);
};

main();

```
{% endcode %}
{% endtab %}
{% endtabs %}

### Fetch Multiple Generations

Instead of using the `generation_id` parameter, you will pass `generation_ids`, which can be an array of IDs. This parameter can also accept IDs separated by commas.

{% openapi-operation spec="luma-gens-fetch" path="/v2/generate/video/luma-ai/generations" method="get" %}
[OpenAPI luma-gens-fetch](https://api.aimlapi.com/docs-public-yaml)
{% endopenapi-operation %}

### Example: Fetch Multiple Generations

{% tabs %}
{% tab title="Python" %}
{% code overflow="wrap" %}
```python
import requests


def main():
    response = requests.get(
        "https://api.aimlapi.com/v2/generate/video/luma-ai/generations",
        params={
            "generation_ids[]": "755f9bbb-d99b-4880-992b-f05244ddba61",
            "status": "streaming",
        },
        headers={
            "Authorization": "Bearer <YOUR_AIMLAPI_KEY>",
            "Content-Type": "application/json",
        },
    )

    response.raise_for_status()
    data = response.json()
    print("Generation:", data)


if __name__ == "__main__":
    main()
```
{% endcode %}
{% endtab %}

{% tab title="JavaScript" %}
{% code overflow="wrap" %}
```javascript
const main = async () => {
  const url = new URL('https://api.aimlapi.com/v2/generate/video/luma-ai/generations');
  url.searchParams.set('generation_ids[]', '755f9bbb-d99b-4880-992b-f05244ddba61');
  url.searchParams.set('state', 'dreaming');

  const data = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: 'Bearer <YOUR_AIMLAPI_KEY>',
      'Content-Type': 'application/json',
    },
  }).then((res) => res.json());

  console.log('Generation:', data);
};

main();

```
{% endcode %}
{% endtab %}
{% endtabs %}

### Example: Fetch Multiple Generations

{% hint style="info" %}
Ensure you replace `<YOUR_AIMLAPI_KEY>` with your actual API key before running the code.
{% endhint %}

{% tabs %}
{% tab title="Python" %}
```python
import requests


def main():
  url = "https://api.aimlapi.com/v2/generate/video/luma-ai/generation"
  payload = {
    "prompt": "Flying jellyfish",
    "aspect_ratio": "16:9"
  }
  headers = {
    "Authorization": "Bearer <YOUR_AIMLAPI_KEY>",
    "Content-Type": "application/json"
  }
  
  response = requests.post(url, json=payload, headers=headers)
  print("Generation:",  response.json())
  
if __name__ == "__main__":
    main()
```
{% endtab %}

{% tab title="JavaScript" %}
```javascript
const main = async () => {
  const response = await fetch('https://api.aimlapi.com/v2/generate/video/luma-ai/generation', {
    method: 'POST',
    headers: {
      Authorization: 'Bearer <YOUR_AIMLAPI_KEY>',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      prompt: 'A jellyfish in the ocean',
      aspect_ratio: '19:9',
      loop: false
    }),
  }).then((res) => res.json());

  console.log('Generation:', response);
};

main();
```
{% endtab %}
{% endtabs %}

### Extend video

You can extend a video using an existing video you generated before (using its generation ID) or by using an image (via URL). The extension can be done by appending to or prepending from the original content.

The `keywords` parameter controls the following extensions. It can include parameters for defining frames:

* **first frame** (`frame0`)
* **last frame** (`frame1`)

For example, if you want to use an image as a reference for a frame:

```json
{
        "keyframes": {
            "frame0": {
                "type": "image",
                "url": "https://example.com/image1.png"
            }
        }
}
```

Or, in the case of using a previously generated video:

```json
{
    "keyframes": {
        "frame1": {
            "type": "generation",
            "id": "0f3ea4aa-10e7-4dae-af0b-263ab4ac45f9"
        }
    }
}
```

{% openapi-operation spec="luma-t2v-v2" path="/v2/generate/video/luma-ai/generation" method="post" %}
[OpenAPI luma-t2v-v2](https://api.aimlapi.com/docs-public-yaml?key=2b878a3c71a785f13366e9be96bacb29)
{% endopenapi-operation %}

## Examples

{% hint style="warning" %}
Ensure you replace `<YOUR_AIMLAPI_KEY>` with your actual API key before running the code.
{% endhint %}

### Extension with the Image

{% tabs %}
{% tab title="Python" %}
```python
import requests


def main()
  url = "https://api.aimlapi.com/v2/generate/video/luma-ai/generation"
  headers = {
    "Authorization": "Bearer <YOUR_AIMLAPI_KEY>",
    "Content-Type": "application/json"
  }
  payload = {
    "prompt": "Flying jellyfish",
    "aspect_ratio": "16:9",
    "keyframes": {
      "frame0": {
        "type": "image",
        "url": "https://example.com/image1.png"
      }
    }
  }
  
  response = requests.post(url, json=payload, headers=headers)
  print("Generation:",  response.json())
  
  
if __name__ == "__main__":
    main()
```
{% endtab %}

{% tab title="JavaScript" %}
```javascript
const main = async () => {
  const response = await fetch('https://api.aimlapi.com/v2/generate/video/luma-ai/generation', {
    method: 'POST',
    headers: {
      Authorization: 'Bearer <YOUR_AIMLAPI_KEY>',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      prompt: 'A jellyfish in the ocean',
      aspect_ratio: '19:9',
      keyframes: {
        frame0: {
          type: 'image',
          url: 'https://example.com/image1.png',
        },
      },
    }),
  }).then((res) => res.json());

  console.log('Generation:', response);
};

main();

```
{% endtab %}
{% endtabs %}

### Extension with the Generation

{% tabs %}
{% tab title="Python" %}
```python
import requests


def main()
  url = "https://api.aimlapi.com/v2/generate/video/luma-ai/generation"
  headers = {
    "Authorization": "Bearer <YOUR_AIMLAPI_KEY>",
    "Content-Type": "application/json"
  }
  payload = {
    "prompt": "Flying jellyfish",
    "aspect_ratio": "16:9",
    "keyframes": {
      "frame0": {
        "type": "generation",
        "id": "0f3ea4aa-10e7-4dae-af0b-263ab4ac45f9"
      }
    }
  }
  
  response = requests.post(url, json=payload, headers=headers)
  print("Generation:",  response.json())
  
if __name__ == "__main__":
    main()
```
{% endtab %}

{% tab title="JavaScript" %}
```javascript
const main = async () => {
  const response = await fetch('https://api.aimlapi.com/v2/generate/video/luma-ai/generation', {
    method: 'POST',
    headers: {
      Authorization: 'Bearer <YOUR_AIMLAPI_KEY>',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      prompt: 'A jellyfish in the ocean',
      aspect_ratio: '19:9',
      keyframes: {
        frame0: {
          type: 'generation',
          id: '0f3ea4aa-10e7-4dae-af0b-263ab4ac45f9',
        },
      },
    }),
  }).then((res) => res.json());

  console.log('Generation:', response);
};

main();

```
{% endtab %}
{% endtabs %}
