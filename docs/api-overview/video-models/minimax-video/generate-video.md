---
icon: code
---

# Generate Video

## Overview

You can generate a video using the AI/ML API. In the basic setup, you need a prompt and an image URL.

{% swagger src="https://api.aimlapi.com/docs-public-yaml?key=3b878a3c71a785f13366e9be96bacb27" path="/v2/generate/video/minimax/generation" method="post" %}
[https://api.aimlapi.com/docs-public-yaml?key=3b878a3c71a785f13366e9be96bacb27](https://api.aimlapi.com/docs-public-yaml?key=3b878a3c71a785f13366e9be96bacb27)
{% endswagger %}

## Example: Create video based on first frame and prompt

{% hint style="warning" %}
Ensure you replace `"my_key"` with your actual API key before running the code.
{% endhint %}

{% tabs %}
{% tab title="JavaScript" %}
```javascript
const main = async () => {
  const response = await fetch('https://api.aimlapi.com/v2/generate/video/minimax/generation', {
    method: 'POST',
    headers: {
      Authorization: 'Bearer <YOUR_API_KEY>',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'video-01',
      prompt: 'Mona Lisa puts on glasses with her hands.',
      first_frame_image: 'https://s2-111386.kwimgs.com/bs2/mmu-aiplatform-temp/kling/20240620/1.jpeg',
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
    url = "https://api.aimlapi.com/v2/generate/video/minimax/generation"
    payload = {
        "model": "video-01",
        "prompt": "Mona Lisa puts on glasses with her hands.",
        "first_frame_image": "https://s2-111386.kwimgs.com/bs2/mmu-aiplatform-temp/kling/20240620/1.jpeg",
    }
    headers = {"Authorization": "Bearer <YOUR_API_KEY>", "Content-Type": "application/json"}

    response = requests.post(url, json=payload, headers=headers)
    print("Generation:", response.json())


if __name__ == "__main__":
    main()
```
{% endtab %}
{% endtabs %}
