# Text-to-Video v2

## Overview

The Luma AI Dream Machine API allows developers to generate and extend AI-generated videos based on text prompts.

Each video generation/extend costs <kbd><mark style="background-color:blue;">500 000<mark style="background-color:blue;"></kbd> AI/ML Tokens.

## Setup your API Key

If you don’t have an API key for the AI/ML API yet, feel free to use our [Quickstart guide](https://docs.aimlapi.com/quickstart/setting-up).

## How to Make a Call

<details>

<summary>Step-by-Step Instructions</summary>

Generating a video using this model involves making two sequential API calls:

* The first one is for creating and sending a video generation task to the server (returns a generation ID). This can be either a generation from a reference image/prompt or a video extension operation that adds length to an existing video.
* The second one is for requesting the generated or extended video from the server using the generation ID received from the first endpoint.  Within this API call, you can use either the standard endpoint to retrieve the generated/extended video or a special endpoint to request multiple generations at once.

Below, you can find three corresponding API schemas and examples for all endpoint calls.

</details>

## API Schemas

### Generate video

`loop` parameter controls if the generated video will be looped.

{% openapi-operation spec="luma-t2v-v2" path="/v2/generate/video/luma-ai/generation" method="post" %}
[OpenAPI luma-t2v-v2](https://api.aimlapi.com/docs-public-yaml?key=2b878a3c71a785f13366e9be96bacb29)
{% endopenapi-operation %}

### Fetch generation

After sending a request for video generation, this task is added to the queue. Based on the service's load, the generation can be completed in seconds or take a bit more. Here are the API details to wait for a certain video generation state.

Each state has its own priority, described below:

* `queued` -> `dreaming` -> `completed` -> `failed`

If the video state reaches any higher-priority state than you requested, then the result is immediately returned. For example, if you are waiting for the `completed` state and your request fails (reaching the `failed` state), then the result is immediately returned with the current error state.

If video generation takes too long, it can reach a timeout of 30 seconds. In such cases, the result returns with the current actual state. This polling allows you to request it again and wait for the needed state.

{% hint style="info" %}
You cannot wait for an `failed` state.
{% endhint %}

{% openapi-operation spec="luma-gen-fetch" path="/v2/generate/video/luma-ai/generation" method="get" %}
[OpenAPI luma-gen-fetch](https://api.aimlapi.com/docs-public-yaml)
{% endopenapi-operation %}

#### Example: Fetch Single Generation

{% hint style="info" %}
Ensure you replace `"my_key"` with your actual API key before running the code.
{% endhint %}

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

If you are waiting for a video to be fully generated, you can wait for the `completed` state in the same way as described above.

### Fetch Multiple Generations

Instead of using the `generation_id` parameter, you will pass `generation_ids`, which can be an array of IDs. This parameter can also accept IDs separated by commas.

{% openapi-operation spec="luma-gens-fetch" path="/v2/generate/video/luma-ai/generations" method="get" %}
[OpenAPI luma-gens-fetch](https://api.aimlapi.com/docs-public-yaml)
{% endopenapi-operation %}

#### Example: Fetch Multiple Generations

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

#### Example: Fetch Multiple Generations

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



