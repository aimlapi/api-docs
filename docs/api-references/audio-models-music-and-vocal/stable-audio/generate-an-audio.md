---
icon: code
---

# Generate an audio (Stable Audio)

## Overview

* **High-Quality Music Generation**: Create music tracks based on descriptive prompts.
* **Flexible Integration**: Compatible with various programming languages and frameworks.

## Consumption

1 audio file will be generated for each request, consuming a total of 252 AI/ML Tokens per step.

## API Reference

{% openapi src="../../../api-overview/audio-models-music-and-vocal/stable-audio/stable-audio-docs.yaml" path="/v2/generate/audio" method="post" %}
[stable-audio-docs.yaml](../../../api-overview/audio-models-music-and-vocal/stable-audio/stable-audio-docs.yaml)
{% endopenapi %}

## Examples

{% tabs %}
{% tab title="JavaScript" %}
```javascript
const main = async () => {
  const response = await fetch('https://api.aimlapi.com/v2/generate/audio', {
    method: 'POST',
    headers: {
      Authorization: 'Bearer <YOUR_API_KEY>',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'stable-audio',
      prompt: 'lo-fi pop hip-hop ambient music',
      steps: 100,
      seconds_total: 10,
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


def main():
    url = "https://api.aimlapi.com/v2/generate/audio"
    payload = {
        "model": "stable-audio",
        "prompt": "lo-fi pop hip-hop ambient music",
        "steps": 100,
        "seconds_total": 10,
    }
    headers = {"Authorization": "Bearer <YOUR_API_KEY>", "Content-Type": "application/json"}

    response = requests.post(url, json=payload, headers=headers)
    print("Generation:", response.json())

if __name__ == "__main__":
    main()

```
{% endtab %}
{% endtabs %}
