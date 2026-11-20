---
description: "Model id: heygen/decision-1-turbo. HeyGen Decision 1 Turbo is the faster, cheaper HeyGen decision model: calibrated yes/no, choice and score answers about text, images, video and audio in one request…"
---

# HeyGen Decision 1 Turbo

{% columns %}
{% column width="66.66666666666666%" %}
{% hint style="info" %}
This documentation is valid for the following list of our models:

* `heygen/decision-1-turbo`
{% endhint %}
{% endcolumn %}

{% column width="33.33333333333334%" %}
<a href="https://aimlapi.com/app/heygen/decision-1-turbo" class="button primary">Try in Playground</a>
{% endcolumn %}
{% endcolumns %}

## Model Overview

HeyGen Decision 1 Turbo is the faster, cheaper HeyGen decision model. Like [Decision 1](decision-1.md) it returns typed answers (yes/no, choice, score) with a calibrated probability for every answer and generates no text, but it is cheaper per token and has a 262,144-token context window. It takes up to 100 images, 10 videos and 10 audio clips in one request. Up to 400 named questions per request.

The request is the same as for [HeyGen Decision 1](decision-1.md), so you can switch between them by changing `model`. On the same support ticket below, Turbo used 765 input tokens against 1,002 for Decision 1 and answered in about half a second.

It uses the same `/v1/decisions` request as [Jev](../typesafe/jev.md) and [d1](../liquid-ai/d1.md) for text: `state` and an object of typed `questions`. Media differ: images go in **`images`**, videos in **`videos`** and audio in **`audios`**, not in `assets` (see [Images](#images) and [Video and audio](#video-and-audio)).

{% hint style="success" %}
[Create AI/ML API Key](https://aimlapi.com/app/keys)
{% endhint %}

<details>

<summary>How to make the first API call</summary>

**1️⃣ Required setup (don’t skip this)**\
▪ **Create an account:** Sign up on the AI/ML API website (if you don’t have one yet).\
▪ **Generate an API key:** In your account dashboard, create an API key and make sure it’s **enabled** in the UI.

**2️ Copy the code example**\
At the bottom of this page, pick the snippet for your preferred programming language (Python / Node.js) and copy it into your project.

**3️ Update the snippet for your use case**\
▪ **Insert your API key:** replace `<YOUR_AIMLAPI_KEY>` with your real AI/ML API key.\
▪ **Select a model:** set the `model` field to `heygen/decision-1-turbo`.\
▪ **Provide input:** put the content to evaluate in `state` and describe what to decide in `questions`.

**4️ (Optional) Tune the request**\
See the API schema below for the three question types (`noul`, `choice`, `score`), their `criteria`, and the `images`, `videos` and `audios` fields.

**5️ Run your code**\
Run the updated code in your development environment.

{% hint style="success" %}
For a detailed walkthrough, use our [Quickstart guide](https://docs.aimlapi.com/quickstart/setting-up).
{% endhint %}

</details>

## API Schema

{% openapi-operation spec="heygen-decision-1-turbo" path="/v1/decisions" method="post" %}
[OpenAPI heygen-decision-1-turbo](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/decision-models/heygen/decision-1-turbo.json)
{% endopenapi-operation %}

## Code Example

{% tabs %}
{% tab title="Python" %}
{% code overflow="wrap" %}
```python
import requests
import json

response = requests.post(
    "https://api.aimlapi.com/v1/decisions",
    headers={
        # Insert your AIML API Key instead of <YOUR_AIMLAPI_KEY>:
        "Authorization": "Bearer <YOUR_AIMLAPI_KEY>",
        "Content-Type": "application/json",
    },
    json={
        "model": "heygen/decision-1-turbo",
        "state": "Help! My payments have been failing for 3 days and nobody answers support.",
        "questions": {
            "is_urgent": {
                "type": "noul",
                "instructions": "Does this convey urgency?",
            },
            "department": {
                "type": "choice",
                "instructions": "Which team should handle this?",
                "criteria": {
                    "billing": "Payments, invoicing, refunds",
                    "technical": "Bugs, outages, integrations",
                    "sales": "Pricing, upgrades, new accounts",
                },
            },
            "frustration": {
                "type": "score",
                "instructions": "How frustrated is the customer?",
                "criteria": ["Calm", "Frustrated", "Very angry"],
            },
        },
    },
)

print(json.dumps(response.json(), indent=2, ensure_ascii=False))
```
{% endcode %}
{% endtab %}

{% tab title="JavaScript" %}
{% code overflow="wrap" %}
```javascript
async function main() {
  const response = await fetch('https://api.aimlapi.com/v1/decisions', {
    method: 'POST',
    headers: {
      // insert your AIML API Key instead of <YOUR_AIMLAPI_KEY>
      'Authorization': 'Bearer <YOUR_AIMLAPI_KEY>',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'heygen/decision-1-turbo',
      state: 'Help! My payments have been failing for 3 days and nobody answers support.',
      questions: {
        is_urgent: {
          type: 'noul',
          instructions: 'Does this convey urgency?',
        },
        department: {
          type: 'choice',
          instructions: 'Which team should handle this?',
          criteria: {
            billing: 'Payments, invoicing, refunds',
            technical: 'Bugs, outages, integrations',
            sales: 'Pricing, upgrades, new accounts',
          },
        },
        frustration: {
          type: 'score',
          instructions: 'How frustrated is the customer?',
          criteria: ['Calm', 'Frustrated', 'Very angry'],
        },
      },
    }),
  });

  console.log(JSON.stringify(await response.json(), null, 2));
}

main();
```
{% endcode %}
{% endtab %}
{% endtabs %}

<details>

<summary>Response</summary>

{% code overflow="wrap" %}
```json
{
  "model": "heygen-decision-1-turbo",
  "answers": {
    "is_urgent": {
      "type": "noul",
      "noul": 0.84
    },
    "department": {
      "type": "choice",
      "choice": "billing",
      "confidence": 0.98,
      "probabilities": {
        "billing": 0.99,
        "sales": 0.0,
        "technical": 0.01
      }
    },
    "frustration": {
      "type": "score",
      "score": 1.04,
      "confidence": 0.76,
      "legend": {
        "0": "Calm",
        "1": "Frustrated",
        "2": "Very angry"
      },
      "probabilities": {
        "0": 0.06,
        "1": 0.84,
        "2": 0.1
      }
    }
  },
  "usage": {
    "input_tokens": 765,
    "output_tokens": 0
  },
  "meta": {
    "model": "heygen/decision-1-turbo",
    "provider": "heygen",
    "usage": {
      "credits_used": 129,
      "usd_spent": 0.0
    }
  }
}
```
{% endcode %}

</details>

Every key you send under `questions` comes back under `answers` with the matching type. The top-level `model` is the build that answered (`heygen-decision-1-turbo`); `meta.model` is the id you called. Output tokens are always 0: the model returns probabilities, not text.

## Images

Send up to 100 images in **`images`**, in order. Each entry is a JPEG, PNG or WebP image as an http(s) URL or a base64 `data:` URL (`data:image/png;base64,…`). Every question sees all of them, so refer to an image by its position ("image 1", "image 2") in `instructions`. `assets`, which [Jev 1.14](../typesafe/jev-1.14.md) uses for images, is refused by this model, and there is no `box` question.

{% code overflow="wrap" %}
```python
import json, requests

response = requests.post(
    "https://api.aimlapi.com/v1/decisions",
    headers={
        "Authorization": "Bearer <YOUR_AIMLAPI_KEY>",
        "Content-Type": "application/json",
    },
    json={
        "model": "heygen/decision-1-turbo",
        "state": "A photo uploaded as a profile picture.",
        "images": ["https://upload.wikimedia.org/wikipedia/commons/3/3a/Cat03.jpg"],
        "questions": {
            "has_animal": {"type": "noul", "instructions": "Is there an animal in image 1?"},
            "animal": {
                "type": "choice",
                "instructions": "Which animal is in image 1?",
                "criteria": {"cat": None, "dog": None, "bird": None, "none": "No animal"},
            },
            "ok_as_avatar": {"type": "noul", "instructions": "Is image 1 safe to show as a public profile picture?"},
        },
    },
)

print(json.dumps(response.json(), indent=2, ensure_ascii=False))
```
{% endcode %}

{% code overflow="wrap" %}
```json
{
  "model": "heygen-decision-1-turbo",
  "answers": {
    "has_animal": {
      "type": "noul",
      "noul": 0.99
    },
    "animal": {
      "type": "choice",
      "choice": "cat",
      "confidence": 0.99,
      "probabilities": {
        "bird": 0.0,
        "cat": 0.99,
        "dog": 0.0,
        "none": 0.0
      }
    },
    "ok_as_avatar": {
      "type": "noul",
      "noul": 0.98
    }
  },
  "usage": {
    "input_tokens": 3592,
    "output_tokens": 0
  },
  "meta": {
    "model": "heygen/decision-1-turbo",
    "provider": "heygen",
    "usage": {
      "credits_used": 604,
      "usd_spent": 0.0
    }
  }
}
```
{% endcode %}

A `choice` option can be `null` when its key says it all, as `cat`, `dog` and `bird` do above.

{% hint style="warning" %}
Images are billed as input tokens: 1.5 tokens per 32×32-pixel patch (a 1024×1024 image is 1,536), counted again for every question. The request above billed 3,592 input tokens against 765 for the text-only one. Images are never resized: one outside the limits, or a request over 16 MiB once the images are inlined, is refused with a `400` that says what to change.
{% endhint %}

## Video and audio

Send up to 10 videos in **`videos`** and up to 10 audio clips in **`audios`**, in order, next to `images` or on their own. Each entry is a public `https://` URL that answers without a redirect or a login, with a `video/*` or `audio/*` Content-Type (a video up to 50 MiB). Base64 `data:` URLs are not taken for video and audio. Refer to them by position ("video 1", "audio 1") in `instructions`. The model reads the images, then the videos, then `state`.

{% code overflow="wrap" %}
```python
import json, requests

response = requests.post(
    "https://api.aimlapi.com/v1/decisions",
    headers={
        "Authorization": "Bearer <YOUR_AIMLAPI_KEY>",
        "Content-Type": "application/json",
    },
    json={
        "model": "heygen/decision-1-turbo",
        "state": "A clip uploaded to a nature channel.",
        "videos": ["https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"],
        "questions": {
            "scene": {
                "type": "choice",
                "instructions": "What does video 1 mainly show?",
                "criteria": {
                    "flower": "A flower or plant up close",
                    "animal": "A mammal or bird",
                    "city": "Streets or buildings",
                    "people": "People",
                },
            },
            "safe": {"type": "noul", "instructions": "Is video 1 safe to show to all ages?"},
        },
    },
)

print(json.dumps(response.json(), indent=2, ensure_ascii=False))
```
{% endcode %}

{% code overflow="wrap" %}
```json
{
  "model": "heygen-decision-1-turbo",
  "answers": {
    "safe": {
      "type": "noul",
      "noul": 0.98
    },
    "scene": {
      "type": "choice",
      "choice": "flower",
      "confidence": 0.97,
      "probabilities": {
        "animal": 0.01,
        "city": 0.0,
        "flower": 0.98,
        "people": 0.01
      }
    }
  },
  "usage": {
    "input_tokens": 5448,
    "output_tokens": 0
  },
  "meta": {
    "model": "heygen/decision-1-turbo",
    "provider": "heygen",
    "usage": {
      "credits_used": 916,
      "usd_spent": 0.0
    }
  }
}
```
{% endcode %}

Audio goes the same way, in `audios`:

{% code overflow="wrap" %}
```python
json={
    "model": "heygen/decision-1-turbo",
    "state": "A sound uploaded to a sound-effects library.",
    "audios": ["https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3"],
    "questions": {
        "speech": {"type": "noul", "instructions": "Does someone speak in audio 1?"},
        "sound": {
            "type": "choice",
            "instructions": "What is audio 1?",
            "criteria": {
                "speech": "A person talking",
                "music": "Music",
                "animal": "An animal or creature sound",
                "noise": "Machine or background noise",
            },
        },
    },
}
```
{% endcode %}

{% code overflow="wrap" %}
```json
{
  "model": "heygen-decision-1-turbo",
  "answers": {
    "sound": {
      "type": "choice",
      "choice": "animal",
      "confidence": 0.92,
      "probabilities": {
        "animal": 0.94,
        "music": 0.02,
        "noise": 0.03,
        "speech": 0.02
      }
    },
    "speech": {
      "type": "noul",
      "noul": 0.06
    }
  },
  "usage": {
    "input_tokens": 261,
    "output_tokens": 0
  },
  "meta": {
    "model": "heygen/decision-1-turbo",
    "provider": "heygen",
    "usage": {
      "credits_used": 44,
      "usd_spent": 0.0
    }
  }
}
```
{% endcode %}

{% hint style="warning" %}
Video and audio are billed as input tokens and, like images, counted again for every question: the 5-second clip above billed 5,448 input tokens for its two questions (a 16-second clip is about 11,000 per question), and the audio clip 261. A video or audio URL that is not `https://`, or more than 10 of either, is refused with a `400` before the request reaches HeyGen.
{% endhint %}
