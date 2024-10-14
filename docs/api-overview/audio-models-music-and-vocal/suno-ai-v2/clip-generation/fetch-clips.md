---
icon: code
---

# Fetch Clips

## Overview

After sending a request for clip generation, this task is added to the queue. Based on the service's load, the generation can be completed in seconds or take a few minutes. Here are the API details to wait for a certain clip generation status.

### Edge Cases

Each status has its own priority, described below:

* `submitted` -> `queued` -> `streaming` -> `completed` -> `error`

If the clip status reaches any higher-priority status than you requested, then the result is immediately returned. For example, if you are waiting for the `completed` status and your request fails (reaching the `error` status), then the result is immediately returned with the current error status.

If clip generation takes too long, it can reach a timeout of 2 minutes. In such cases, the result returns with the current actual status. This polling allows you to request it again and wait for the needed status.

{% hint style="info" %}
You cannot wait for an `error` status.
{% endhint %}

## Example

### Single clip fetching

For example, if you are waiting for clip streaming (when the clip is popped from the queue and generation is in processing), then you can send the following request:

{% tabs %}
{% tab title="JavaScript" %}
```javascript
const main = async () => {
  const url = new URL('https://api.aimlapi.com/v2/generate/audio/suno-ai/clip');
  url.searchParams.set('clip_id', '755f9bbb-d99b-4880-992b-f05244ddba61');
  url.searchParams.set('status', 'streaming');

  const data = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: 'Bearer my_key',
      'Content-Type': 'application/json',
    },
  }).then((res) => res.json());

  console.log('Clip data:', data);
};

main();

```
{% endtab %}

{% tab title="Python" %}
```python
import requests


def main():
    response = requests.get(
        "https://api.aimlapi.com/v2/generate/audio/suno-ai/clip",
        params={
            "clip_id": "755f9bbb-d99b-4880-992b-f05244ddba61",
            "status": "streaming",
        },
        headers={
            "Authorization": "Bearer my_key",
            "Content-Type": "application/json",
        },
    )

    response.raise_for_status()
    data = response.json()
    print("Clip data:", data)


if __name__ == "__main__":
    main()

```
{% endtab %}
{% endtabs %}

If you wish to wait until clip generation fully completes, you can set it to wait for `completed` status.

### Multiple clip fetching

You can also fetch multiple clips in the same way as you fetch a single clip. Currently, the maximum size for concurrent clip fetching is 6 clips.

For multiple clip fetching, the status property works like "wait for every clip to reach the provided status," or return as-is if the timeout is reached.

To achieve this, you should send requests with an array of needed clip IDs in the `clip_ids[]` property instead of `clip_id`:

{% tabs %}
{% tab title="JavaScript" %}
```javascript
const main = async () => {
  const url = new URL('https://api.aimlapi.com/v2/generate/audio/suno-ai/clips');
  url.searchParams.set('clip_ids[]', '755f9bbb-d99b-4880-992b-f05244ddba61');
  url.searchParams.set('status', 'streaming');

  const data = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: 'Bearer my_key',
      'Content-Type': 'application/json',
    },
  }).then((res) => res.json());

  console.log('Clips data:', data);
};

main();

```
{% endtab %}

{% tab title="Python" %}
```python
import requests


def main():
    response = requests.get(
        "https://api.aimlapi.com/v2/generate/audio/suno-ai/clips",
        params={
            "clip_ids[]": "755f9bbb-d99b-4880-992b-f05244ddba61",
            "status": "streaming",
        },
        headers={
            "Authorization": "Bearer my_key",
            "Content-Type": "application/json",
        },
    )

    response.raise_for_status()
    data = response.json()
    print("Clip data:", data)


if __name__ == "__main__":
    main()

```
{% endtab %}
{% endtabs %}

