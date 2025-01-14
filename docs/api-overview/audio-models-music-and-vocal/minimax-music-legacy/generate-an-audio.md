---
icon: code
---

# Generate an Audio

## Overview

* **High-Quality Music Generation**: Create music tracks based on descriptive prompts.
* **Flexible Integration**: Compatible with various programming languages and frameworks.

## Consumption

1 audio file will be generated for each request, consuming a total of 73 500 AI/ML Tokens.

## API Reference

{% swagger src="minimax-docs.yaml" path="/v2/generate/audio" method="post" %}
[minimax-docs.yaml](minimax-docs.yaml)
{% endswagger %}

## Examples

{% tabs %}
{% tab title="JavaScript" %}
```javascript
const main = async () => {
  const response = await fetch("https://api.aimlapi.com/v2/generate/audio", {
    method: "POST",
    headers: {
      Authorization: "Bearer <YOUR_API_KEY>",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "minimax-music",
      prompt: "##Swift and Boundless \n In the realm of innovation, where visions align, \n\nAIML API's the name, making tech shine. \nIntelligent solutions, breaking the mold, \n\nSwift inference power, bold and untold.\n##'",
      reference_audio_url: "https://cdn.aimlapi.com/squirrel/files/zebra/WzNbqH7vR20MNTOD1Ec7k_output.mp3",
    })
  }).then((res) => res.json());

  console.log("Generation:", response);
};

main()

```
{% endtab %}

{% tab title="Python" %}
```python
import requests


def main():
    url = "https://api.aimlapi.com/v2/generate/audio"
    payload = {
        "model": "minimax-music",
        "prompt": "##Swift and Boundless \n In the realm of innovation, where visions align, \n\nAIML API's the name, making tech shine. \nIntelligent solutions, breaking the mold, \n\nSwift inference power, bold and untold.\n##'",
        "reference_audio_url": "https://cdn.aimlapi.com/squirrel/files/zebra/WzNbqH7vR20MNTOD1Ec7k_output.mp3",
    }
    headers = {"Authorization": "Bearer <YOUR_API_KEY>", "Content-Type": "application/json"}

    response = requests.post(url, json=payload, headers=headers)
    print("Generation:", response.json())


if __name__ == "__main__":
    main()

```
{% endtab %}
{% endtabs %}
