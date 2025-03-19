---
description: 'Description of the gen3a_turbo model: Pricing, API Reference, Examples.'
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

# gen3a\_turbo

## Overview

An advanced AI model designed for converting images into high-quality videos. It allows users to generate dynamic video content with smooth motion and detailed textures from still images or text prompts, significantly enhancing creative workflows in multimedia production.

Each generation costs <kbd><mark style="background-color:blue;">525 000<mark style="background-color:blue;"></kbd> AI/ML Tokens.

## Setup your API Key

If you don’t have an API key for the AI/ML API yet, feel free to use our [Quickstart guide](https://docs.aimlapi.com/quickstart/setting-up).

## How to Make a Call

Generating a video using this model involves sequentially calling two endpoints:&#x20;

* The first one is for creating and sending a video generation task to the server (returns a generation ID).
* The second one is for requesting the generated video from the server using the generation ID received from the first endpoint.&#x20;

Below, you can find two corresponding API schemas and an example that combines both endpoint calls.

## API Schemas

### Video Generation

You can generate a video using this API. In the basic setup, you need only a prompt and the aspect ratio of the desired result.

{% openapi src="https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/video-models/runway/gen3a_turbo.json" path="/v2/generate/video/runway/generation" method="post" %}
[https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/video-models/runway/gen3a_turbo.json](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/video-models/runway/gen3a_turbo.json)
{% endopenapi %}

### Fetch Generation

{% openapi src="https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/video-models/runway/gen3a_turbo-pair.json" path="/v2/generate/video/runway/generation" method="get" %}
[https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/video-models/runway/gen3a_turbo-pair.json](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/video-models/runway/gen3a_turbo-pair.json)
{% endopenapi %}

## Example

{% hint style="info" %}
Ensure you replace `<YOUR_AIMLAPI_KEY>` with your actual API key before running the code.
{% endhint %}

{% tabs %}
{% tab title="Python" %}
{% code overflow="wrap" %}
```python
import requests


def main():
    url = "https://api.aimlapi.com/v2/generate/video/runway/generation"
    payload = {
        "model": "runway-gen3/turbo/image-to-video",
        "prompt": "A jellyfish in the ocean",
        "ratio": "16:9",
        "image_url": "https://upload.wikimedia.org/wikipedia/commons/3/35/Maldivesfish2.jpg",
    }
    headers = {"Authorization": "Bearer <YOUR_AIMLAPI_KEY>", "Content-Type": "application/json"}

    response = requests.post(url, json=payload, headers=headers)
    print("Generation:", response.json())


if __name__ == "__main__":
    main()

```
{% endcode %}
{% endtab %}

{% tab title="JavaScript" %}
{% code overflow="wrap" %}
```javascript
const main = async () => {
  const response = await fetch('https://api.aimlapi.com/v2/generate/video/runway/generation', {
    method: 'POST',
    headers: {
      Authorization: 'Bearer <YOUR_AIMLAPI_KEY>',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'runway-gen3/turbo/image-to-video',
      prompt: 'A jellyfish in the ocean',
      ratio: '16:9',
      image_url: 'https://upload.wikimedia.org/wikipedia/commons/3/35/Maldivesfish2.jpg',
    }),
  }).then((res) => res.json());

  console.log('Generation:', response);
};

main()
```
{% endcode %}
{% endtab %}
{% endtabs %}
