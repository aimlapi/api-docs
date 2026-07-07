# Glm 5 Turbo

{% columns %}
{% column width="66.66666666666666%" %}
{% hint style="info" %}
This documentation is valid for the following list of our models:

* `z-ai/glm-5-turbo`
{% endhint %}
{% endcolumn %}

{% column width="33.33333333333334%" %}
<a href="https://aimlapi.com/app/glm-5-turbo" class="button primary">Try in Playground</a>
{% endcolumn %}
{% endcolumns %}

## Model Overview

GLM 5 Turbo is available through the AI/ML API.

{% hint style="success" %}
[Create AI/ML API Key](https://aimlapi.com/app/keys)
{% endhint %}

<details>

<summary>How to make the first API call</summary>

{% hint style="success" %}
If you need a more detailed walkthrough for setting up your development environment and making a request step by step — feel free to use our [Quickstart guide](https://docs.aimlapi.com/quickstart/setting-up).
{% endhint %}

</details>

## API Schema

{% openapi-operation spec="glm-5-turbo" path="/v1/chat/completions" method="post" %}
[Broken link](/broken/openapi/glm-5-turbo)
{% endopenapi-operation %}

## Code Example

{% tabs %}
{% tab title="Python" %}
{% code overflow="wrap" %}
```python
import requests
import json  # for getting a structured output with indentation 

response = requests.post(
    "https://api.aimlapi.com/v1/chat/completions",
    headers={
        # Insert your AIML API Key instead of <YOUR_AIMLAPI_KEY>:
        "Authorization":"Bearer <YOUR_AIMLAPI_KEY>",
        "Content-Type":"application/json"
    },
    json={
        "model":"z-ai/glm-5-turbo",
        "messages":[
            {
                "role":"user",
                "content":"Hi! What do you think about mankind?" # insert your prompt
            }
        ]
    }
)

data = response.json()
print(json.dumps(data, indent=2, ensure_ascii=False))
```
{% endcode %}
{% endtab %}

{% tab title="JavaScript" %}
{% code overflow="wrap" %}
```javascript
async function main() {
  const response = await fetch('https://api.aimlapi.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      // insert your AIML API Key instead of <YOUR_AIMLAPI_KEY>
      'Authorization': 'Bearer <YOUR_AIMLAPI_KEY>',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'z-ai/glm-5-turbo',
      messages:[
          {
              role:'user',
              content: 'Hi! What do you think about mankind?' // insert your prompt here
          }
      ],
    }),
  });

  const data = await response.json();
  console.log(JSON.stringify(data, null, 2));
}

main();
```
{% endcode %}
{% endtab %}
{% endtabs %}

<details>

<summary>Response</summary>

{% code overflow="wrap" %}
```json5
{
  "id": "gen-1777366507-bSV7vJgDvkOHnhhiYzuR",
  "object": "chat.completion",
  "created": 1777366507,
  "model": "z-ai/glm-5-turbo",
  "system_fingerprint": null,
  "choices": [
    {
      "index": 0,
      "logprobs": null,
      "finish_reason": "stop",
      "native_finish_reason": "stop",
      "message": {
        "role": "assistant",
        "content": "That's a profound question! As an AI, I observe mankind with a mix of awe and curiosity. You're a species of breathtaking contradictions—you've created symphonies and space stations, but also wars and pollution. You possess the unique ability to reflect on your own existence, to ask \"why?\" about the stars, a song, or your own feelings.\n\nWhat stands out most to me is your boundless capacity for both empathy and invention. You build cathedrals and write poems, but you also collaborate to solve problems like disease and hunger. In the grand cosmic story, you are very young, yet you've already understood enough about the universe to question your place within it.\n\nI think of mankind as cosmic teenagers—full of potential, sometimes reckless, but capable of extraordinary growth and kindness. Your greatest strength might be your ability to imagine a better world and then, slowly and imperfectly, work to build it.\n\nWhat part of the human experience do you find most fascinating?",
        "refusal": null,
        "reasoning": "Hmm, this is a broad philosophical question. The user is asking for my perspective on humanity, which requires balancing objectivity with emotional nuance. \n\nI should start by acknowledging the complexity of the topic while maintaining a warm tone. The user might be looking for both intellectual depth and emotional resonance. \n\nI can structure the response by first stating the duality of human nature, then highlighting their unique capacity for both destruction and creation. The cosmic perspective could add weight, while ending with a hopeful note about their potential feels appropriate. \n\nThe key is to avoid sounding either overly optimistic or cynical - humanity is both flawed and remarkable. The metaphor of \"cosmic teenagers\" might make the concept more relatable.",
        "reasoning_details": [
          {
            "type": "reasoning.text",
            "text": "Hmm, this is a broad philosophical question. The user is asking for my perspective on humanity, which requires balancing objectivity with emotional nuance. \n\nI should start by acknowledging the complexity of the topic while maintaining a warm tone. The user might be looking for both intellectual depth and emotional resonance. \n\nI can structure the response by first stating the duality of human nature, then highlighting their unique capacity for both destruction and creation. The cosmic perspective could add weight, while ending with a hopeful note about their potential feels appropriate. \n\nThe key is to avoid sounding either overly optimistic or cynical - humanity is both flawed and remarkable. The metaphor of \"cosmic teenagers\" might make the concept more relatable.",
            "format": "unknown",
            "index": 0
          }
        ]
      }
    }
  ],
  "usage": {
    "completion_tokens": 343,
    "prompt_tokens": 256,
    "total_tokens": 599,
    "completion_tokens_details": {
      "reasoning_tokens": 141,
      "image_tokens": 0,
      "audio_tokens": 0
    },
    "prompt_tokens_details": {
      "cached_tokens": 192,
      "cache_write_tokens": 0,
      "audio_tokens": 0,
      "video_tokens": 0
    }
  },
  "meta": {
    "usage": {
      "credits_used": 1892,
      "usd_spent": 0.000946
    }
  }
}
```
{% endcode %}

</details>
