---
icon: code
---

# Extend Video

## Overview

You can extend a video using an existing video you generated before (using its ID) or by using an image (by URL). The extension can be done by appending to or prepending from the original content.

### Keywords

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

## Examples

{% hint style="info" %}
Ensure you replace `"my_key"` with your actual API key before running the code.
{% endhint %}

### Extension with the Image

{% tabs %}
{% tab title="JavaScript" %}
```javascript
const main = async () => {
  const response = await fetch('https://api.aimlapi.com/v2/generate/video/luma-ai/generation', {
    method: 'POST',
    headers: {
      Authorization: 'Bearer my_key',
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
    "Authorization": "Bearer my_key",
    "Content-Type": "application/json"
  }
  
  response = requests.post(url, json=payload, headers=headers)
  print("Generation:",  response.json())
  
if __name__ == "__main__":
    main()
```
{% endtab %}
{% endtabs %}

### Extension with the Generation

{% tabs %}
{% tab title="JavaScript" %}
```javascript
const main = async () => {
  const response = await fetch('https://api.aimlapi.com/v2/generate/video/luma-ai/generation', {
    method: 'POST',
    headers: {
      Authorization: 'Bearer my_key',
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
    "Authorization": "Bearer my_key",
    "Content-Type": "application/json"
  }
  
  response = requests.post(url, json=payload, headers=headers)
  print("Generation:",  response.json())
  
if __name__ == "__main__":
    main()
```
{% endtab %}
{% endtabs %}



