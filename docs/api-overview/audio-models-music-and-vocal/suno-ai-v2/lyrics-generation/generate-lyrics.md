---
icon: code
---

# Generate Lyrics

## Overview

Our API allows you to generate lyrics and a title for your song. These lyrics can be used as the `prompt` property in custom song generation.

## Example

{% tabs %}
{% tab title="JavaScript" %}
```javascript
const main = async () => {
  const prompt = `A song about the future.`;
  const { id } = await fetch('https://api.aimlapi.com/v2/generate/audio/suno-ai/lyric', {
    method: 'POST',
    headers: {
      Authorization: 'Bearer my_key',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      prompt,
    }),
  }).then((res) => res.json());

  console.log('Generated lyric id:', id);
};

main();

```
{% endtab %}

{% tab title="Python" %}
```python
import requests


def main():
    prompt = "A song about the future."

    response = requests.post(
        "https://api.aimlapi.com/v2/generate/audio/suno-ai/clip",
        headers={
            "Authorization": "Bearer my_key",
            "Content-Type": "application/json",
        },
        json={
            "prompt": prompt,
        },
    )

    response.raise_for_status()
    data = response.json()

    print("Generated lyric id:", data["id"])


if __name__ == "__main__":
    main()

```
{% endtab %}
{% endtabs %}

This request will return a generated lyrics ID. To fetch the actual lyrics data, you need to retrieve it using this ID.

{% content-ref url="fetch-lyrics.md" %}
[fetch-lyrics.md](fetch-lyrics.md)
{% endcontent-ref %}
