---
icon: code
---

# Generate with GPT

## Overview

You can generate clip lyrics, a title, and tags based on your short description of the song you want. To achieve that, you can send a request with the following body:

```json
{
    "gpt_description_prompt": "A story about frogs."
}
```

As optional parameters, you can choose the target model using the `mv` parameter and set the boolean `make_instrumental` parameter if you want a song without vocals, only music, on example:

```json
{
    "gpt_description_prompt": "A story about frogs.",
    "mv": "chirp-v3.5",
    "make_instrumental": true
}
```

## Example

{% tabs %}
{% tab title="JavaScript" %}
```javascript
const main = async () => {
  const { clip_ids } = await fetch('https://api.aimlapi.com/v2/generate/audio/suno-ai/clip', {
    method: 'POST',
    headers: {
      Authorization: 'Bearer my_key',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      gpt_description_prompt: 'A story about frogs.',
    }),
  }).then((res) => res.json());

  console.log('Generated clip ids:', clip_ids);
};

main();
```
{% endtab %}

{% tab title="Python" %}
```python
import requests


def main():
    response = requests.post(
        "https://api.aimlapi.com/v2/generate/audio/suno-ai/clip",
        headers={
            "Authorization": "Bearer my_key",
            "Content-Type": "application/json",
        },
        json={
            "gpt_description_prompt": "A story about frogs.",
        },
    )

    response.raise_for_status()
    data = response.json()
    clip_ids = data["clip_ids"]

    print("Generated clip ids:", clip_ids)


if __name__ == "__main__":
    main()

```
{% endtab %}
{% endtabs %}
