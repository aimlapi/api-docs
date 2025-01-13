---
icon: code
---

# Generate Text to Video

## Overview

You can generate a video using the AI/ML API. In the basic setup, you need only a prompt.

{% swagger src="https://api-staging.aimlapi.com/docs-public-yaml" path="/v2/generate/video/kling/generation" method="post" %}
[https://api-staging.aimlapi.com/docs-public-yaml](https://api-staging.aimlapi.com/docs-public-yaml)
{% endswagger %}

## Example

{% hint style="info" %}
Ensure you replace `"my_key"` with your actual API key before running the code.
{% endhint %}

{% tabs %}
{% tab title="JavaScript" %}
```javascript
const main = async () => {
  const response = await fetch('https://api.aimlapi.com/v2/generate/video/kling/generation', {
    method: 'POST',
    headers: {
      Authorization: 'Bearer my_key',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'kling-video/v1/standard/text-to-video',
      prompt: 'A DJ on the stand is playing, around a World War II battlefield, lots of explosions, thousands of dancing soldiers, between tanks shooting, barbed wire fences, lots of smoke and fire, black and white old video: hyper realistic, photorealistic, photography, super detailed, very sharp, on a very white background',
      ratio: '16:9',
      duration: '5',
    }),
  }).then((res) => res.json());

  console.log('Generation:', response);
};
```
{% endtab %}

{% tab title="Python" %}
```python
import requests


def main():
    url = "https://api.aimlapi.com/v2/generate/video/kling/generation"
    payload = {
        "model": "kling-video/v1/standard/text-to-video",
        "prompt": "A DJ on the stand is playing, around a World War II battlefield, lots of explosions, thousands of dancing soldiers, between tanks shooting, barbed wire fences, lots of smoke and fire, black and white old video: hyper realistic, photorealistic, photography, super detailed, very sharp, on a very white background",
        "ratio": "16:9",
        "duration": "5",
    }
    headers = {"Authorization": "Bearer my_key", "Content-Type": "application/json"}

    response = requests.post(url, json=payload, headers=headers)
    print("Generation:", response.json())


if __name__ == "__main__":
    main()

```
{% endtab %}
{% endtabs %}
