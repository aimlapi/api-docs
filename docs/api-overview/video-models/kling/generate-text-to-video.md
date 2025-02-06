---
icon: code
---

# Generate Text to Video

## Overview

You can generate a video using the AI/ML API. In the basic setup, you need only a prompt.

{% hint style="info" %}
Please note that there is not just one, but several variations of this API described below, each with its own set of supported models and available parameters. You can explore these variations by selecting different options from the **object** dropdown menu and choose the one that suits you best.
{% endhint %}

{% swagger src="https://api.aimlapi.com/docs-public-yaml?key=3b878a3c71a785f13366e9be96bacb27" path="/v2/generate/video/kling/generation" method="post" %}
[https://api.aimlapi.com/docs-public-yaml?key=3b878a3c71a785f13366e9be96bacb27](https://api.aimlapi.com/docs-public-yaml?key=3b878a3c71a785f13366e9be96bacb27)
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
