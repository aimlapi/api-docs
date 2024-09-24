---
hidden: true
icon: code
---

# Clip Continuation / Extension

## Overview

Our API also allows you to take an existing song and generate a new one from a certain timecode, enabling you to continue an existing clip.

#### Payload

```json
{
    "continue_clip_id": "uuid",
    "continue_at": 121.1,
    "prompt": "new lyrics"
}
```

You can also use `title` and `tags` properties here just like in custom clip generation.

#### Example Request with Title and Tags

```json
{
    "continue_clip_id": "uuid",
    "continue_at": 121.1,
    "prompt": "new lyrics",
    "title": "New Beginnings",
    "tags": ["rock", "uplifting"]
}
```

## Example

{% tabs %}
{% tab title="JavaScript" %}
```javascript
const main = async () => {
  const prompt = `
    [Verse]
    Silver cities shine brightly
    Skies are painted blue
    Hopes and dreams take flight
    Future starts anew

    [Verse 2]
    Machines hum a new tune
    Worlds we’ve never seen
    Chasing stars so far
    Building our own dream

    [Chorus]
    Future dreams so high
    Touch the endless sky
    Live beyond the now
    Make the future wow

    [Verse 3]
    We create the world
    Technology our guide
    Hearts and minds as one
    Infinite the ride

    [Chorus]
    Future dreams so high
    Touch the endless sky
    Live beyond the now
    Make the future wow

    [Bridge]
    With every beat we rise
    See through wiser eyes
    The places we can go
    A brilliance that will grow
    `;
  const { clip_ids } = await fetch('https://api.aimlapi.com/v2/generate/audio/suno-ai/clip', {
    method: 'POST',
    headers: {
      Authorization: 'Bearer my_key',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      prompt,
      continue_clip_id: 'b1581eda-b2d6-4c1d-9239-1c4a511cb1e8',
      continue_at: 124.3,
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
    prompt = """
    [Verse]
    Silver cities shine brightly
    Skies are painted blue
    Hopes and dreams take flight
    Future starts anew

    [Verse 2]
    Machines hum a new tune
    Worlds we’ve never seen
    Chasing stars so far
    Building our own dream

    [Chorus]
    Future dreams so high
    Touch the endless sky
    Live beyond the now
    Make the future wow

    [Verse 3]
    We create the world
    Technology our guide
    Hearts and minds as one
    Infinite the ride

    [Chorus]
    Future dreams so high
    Touch the endless sky
    Live beyond the now
    Make the future wow

    [Bridge]
    With every beat we rise
    See through wiser eyes
    The places we can go
    A brilliance that will grow
    """

    response = requests.post(
        "https://api.aimlapi.com/v2/generate/audio/suno-ai/clip",
        headers={
            "Authorization": "Bearer my_key",
            "Content-Type": "application/json",
        },
        json={
            "prompt": prompt,
            "continue_clip_id": "b1581eda-b2d6-4c1d-9239-1c4a511cb1e8",
            "continue_at": 124.3,
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

