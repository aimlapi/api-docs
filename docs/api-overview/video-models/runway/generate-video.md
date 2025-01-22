---
icon: code
---

# Generate Video

## Overview

You can generate a video using the AI/ML API. In the basic setup, you need only a prompt and the aspect ratio of the desired result.

### Ratio

* **Type:** String
* **Key:** `ratio`
* **Allowed Values:**  `1280:768`, `768:1280`

### Prompt

* **Type:** String
* **Key:** `promptText`
* **Character Limit:** 512 characters

### Image

* **Type:** URL | Array of objects
* **Key:** `promptImage`
* **Description:** Base image URL for the generation

### Watermark

* **Type:** Boolean
* **Key:** `watermark`
* **Description:** A boolean indicating whether or not the output video will contain a Runway watermark

### Duration

* **Type:** Integer
* **Key:** `duration`
* **Allowed Values:**  `5`, `10`
* **Description:** The number of seconds of duration for the output video

### Seed

* **Type:** Integer
* **Key:** `seed`
* **Description:** If unspecified, a random number is chosen. Varying the seed integer is a way to get different results for the same other request parameters. Using the same seed integer for an identical request will produce similar results.

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
      model: 'gen3a_turbo',
      promptText: 'A jellyfish in the ocean',
      ratio: '768:1280"',
      promptImage: [
        {
          'uri': 'https://upload.wikimedia.org/wikipedia/commons/3/35/Maldivesfish2.jpg',
          'position': 'first'
        },
        {
          'uri': 'https://upload.wikimedia.org/wikipedia/commons/3/35/Maldivesfish2.jpg',
          'position': 'last'
        },
      ],
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
        "model": "gen3a_turbo",
        "promptText": "A jellyfish in the ocean",
        "ratio": "768:1280",
        "promptImage": [
            {
                "uri": "https://upload.wikimedia.org/wikipedia/commons/3/35/Maldivesfish2.jpg",
                "position": "first"
            },
            {
                "uri": "https://upload.wikimedia.org/wikipedia/commons/3/35/Maldivesfish2.jpg",
                "position": "last"
            },
        ],
    }
    headers = {"Authorization": "Bearer my_key", "Content-Type": "application/json"}

    response = requests.post(url, json=payload, headers=headers)
    print("Generation:", response.json())


if __name__ == "__main__":
    main()

```
{% endtab %}
{% endtabs %}

