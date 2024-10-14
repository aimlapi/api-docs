---
icon: code
---

# Generate Video

## Overview

You can generate a video using the AI/ML API. In the basic setup, you need only a prompt and the aspect ratio of the desired result.

### Aspect Ratio

* **Type:** String
* **Allowed Values:** `1:1`, `16:9`, `9:16`, `4:3`, `3:4`, `21:9`, `9:21`

### Prompt

* **Type:** String
* **Character Limit:** 2048 characters

### Loop

* **Type:** Boolean
* **Description:** Controls if the generated video will be looped.
* **Default Value:** `false`

### Keywords

For instructions on how to use keywords, please refer to the [extend-video.md](extend-video.md "mention") article.

## Example

{% hint style="info" %}
Ensure you replace `"my_key"` with your actual API key before running the code.
{% endhint %}

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
      loop: false
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
    "aspect_ratio": "16:9"
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

