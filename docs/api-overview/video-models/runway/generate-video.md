---
icon: code
---

# Generate Video

## Overview

You can generate a video using the AI/ML API. In the basic setup, you need only a prompt and the aspect ratio of the desired result.

### Ratio

* **Type:** String
* **Key:** `ratio`
* **Allowed Values:**  `16:9`, `9:16`

### Prompt

* **Type:** String
* **Key:** `prompt`
* **Character Limit:** 2048 characters

### Image URL

* **Type:** URL
* **Key:** `image_url`
* **Description:** Base image URL for the generation

## Example

{% hint style="info" %}
Ensure you replace `"my_key"` with your actual API key before running the code.
{% endhint %}

{% tabs %}
{% tab title="JavaScript" %}
```javascript
const main = async () => {
  const response = await fetch('https://api.aimlapi.com/v2/generate/video/runway/generation', {
    method: 'POST',
    headers: {
      Authorization: 'Bearer my_key',
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
{% endtab %}

{% tab title="Python" %}
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
    headers = {"Authorization": "Bearer my_key", "Content-Type": "application/json"}

    response = requests.post(url, json=payload, headers=headers)
    print("Generation:", response.json())


if __name__ == "__main__":
    main()

```
{% endtab %}
{% endtabs %}

