---
layout:
  width: wide
  title:
    visible: true
  description:
    visible: true
  tableOfContents:
    visible: true
  outline:
    visible: true
  pagination:
    visible: true
  metadata:
    visible: true
  tags:
    visible: true
  actions:
    visible: true
---

# Nova-3

{% columns %}
{% column width="66.66666666666666%" %}
{% hint style="info" %}
This documentation is valid for the following list of our models:

* `nova-3`
{% endhint %}
{% endcolumn %}

{% column width="33.33333333333334%" %}
<a href="https://aimlapi.com/app/deepgram/nova-3" class="button primary">Try in Playground</a>
{% endcolumn %}
{% endcolumns %}

Nova-3 — high-accuracy speech-to-text model from Deepgram optimized for real-time and batch transcription with low latency, speaker diarization, and advanced audio intelligence features.

{% hint style="success" %}
This model uses per-minute billing. The cost of audio transcription is based on the duration of the input audio file.
{% endhint %}

## Setup your API Key

If you don't have an API key for the AI/ML API yet, feel free to use our [Quickstart guide](https://docs.aimlapi.com/quickstart/setting-up).

## API Schemas

{% openapi-operation spec="deepgram-nova-3" path="/v1/stt/create" method="post" %}
[OpenAPI deepgram-nova-3](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/speech-models/Deepgram/nova-3.json)
{% endopenapi-operation %}

## Example

{% code overflow="wrap" %}
```python
import time
import requests
import json

base_url = "https://api.aimlapi.com/v1"
# Insert your AIML API Key instead of <YOUR_AIMLAPI_KEY>:
api_key = "<YOUR_AIMLAPI_KEY>"

# Creating and sending a speech-to-text conversion task to the server
def create_stt():
    url = f"{base_url}/stt/create"
    headers = {
        "Authorization": f"Bearer {api_key}",
    }

    data = {
        "model": "nova-3",
        "url": "https://audio-samples.github.io/samples/mp3/blizzard_primed/sample-0.mp3"
    }

    response = requests.post(url, json=data, headers=headers)

    if response.status_code >= 400:
        print(f"Error: {response.status_code} - {response.text}")
    else:
        response_data = response.json()
        print(response_data)
        return response_data

# Requesting the result of the task from the server using the generation_id
def get_stt(gen_id):
    url = f"{base_url}/stt/{gen_id}"
    headers = {
        "Authorization": f"Bearer {api_key}",
    }
    response = requests.get(url, headers=headers)
    return response.json()

# First, start the generation, then repeatedly request the result from the server every 10 seconds.
def main():
    stt_response = create_stt()
    gen_id = stt_response.get("generation_id")

    if gen_id:
        start_time = time.time()
        timeout = 600
        while time.time() - start_time < timeout:
            response_data = get_stt(gen_id)

            if response_data is None:
                print("Error: No response from API")
                break

            status = response_data.get("status")

            if status == "waiting" or status == "active":
                print("Still waiting... Checking again in 10 seconds.")
                time.sleep(10)
            else:
                print("Processing complete:\n", response_data["result"]["results"]["channels"][0]["alternatives"][0]["transcript"])

                # Uncomment the line below to print the entire result object with all service data
                # print("Processing complete:\n", json.dumps(response_data["result"], indent=2, ensure_ascii=False))
                return response_data

        print("Timeout reached. Stopping.")
        return None


if __name__ == "__main__":
    main()
```
{% endcode %}

<details>

<summary>Response</summary>

{% code overflow="wrap" %}
```json5
{'generation_id': 'a1b2c3d4-e5f6-7890-abcd-ef1234567890'}
Still waiting... Checking again in 10 seconds.
Processing complete:
{
  "status": "completed",
  "result": {
    "metadata": {
      "request_id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
      "created": "2025-06-04T12:00:00.000Z",
      "duration": 11.4,
      "channels": 1,
      "models": ["nova-3"],
      "model_info": {
        "nova-3": {
          "name": "nova-3",
          "version": "2024-12-18.0",
          "arch": "nova-3"
        }
      }
    },
    "results": {
      "channels": [
        {
          "alternatives": [
            {
              "transcript": "He doesn't belong to you, and I don't see how you have anything to do with what is be his power, if he possess only that from this stage to you.",
              "confidence": 0.9941406,
              "words": [
                {
                  "word": "he",
                  "start": 0.32,
                  "end": 0.4,
                  "confidence": 0.9941406,
                  "speaker": 0,
                  "punctuated_word": "He"
                }
              ]
            }
          ]
        }
      ]
    }
  }
}
```
{% endcode %}

</details>
