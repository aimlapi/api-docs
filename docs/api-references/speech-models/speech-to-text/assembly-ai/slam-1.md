# slam-1



{% hint style="info" %}
This documentation is valid for the following list of our models:

* `aai/slam-1`
{% endhint %}

{% hint style="success" %}
This model use per-second billing. The cost of audio transcription is based on the number of seconds in the input audio file, not the processing time.
{% endhint %}

## Model Overview

A new Speech-to-Text model offering exceptional accuracy by leveraging its deep understanding of context and semantics.

## Setup your API Key

If you don’t have an API key for the AI/ML API yet, feel free to use our [Quickstart guide](https://docs.aimlapi.com/quickstart/setting-up).

## API Schema

#### Creating and sending a speech-to-text conversion task to the server

{% openapi-operation spec="slam-1" path="/v1/stt/create" method="post" %}
[OpenAPI slam-1](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/speech-models/AssemblyAI/slam-1.json)
{% endopenapi-operation %}

#### Requesting the result of the task from the server using the generation\_id

{% openapi-operation spec="stt-fetch" path="/v1/stt/{generation_id}" method="get" %}
[OpenAPI stt-fetch](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/speech-models/Deepgram/nova-2-pair.json)
{% endopenapi-operation %}

## Quick Example: Processing a Speech Audio File via URL

Let's transcribe the following audio fragment:

{% embed url="https://drive.google.com/file/d/1ZN-28NUbK1TXHt6oEPj42zUJCv82e9L4/view?usp=sharing" %}

{% code overflow="wrap" %}
```python
import time
import requests
import json   # for getting a structured output with indentation

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
        "model": "aai/slam-1",
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
                
                print("Processing complete:/n", response_data["result"]["text"])
                
                # Uncomment the line below to print the entire "result" object with all service data
                # print("Processing complete:/n", json.dumps(response_data["result"], indent=2, ensure_ascii=False))
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
{'generation_id': '227b2ca6-72a6-4e82-906d-957ba03e470f'}
Still waiting... Checking again in 10 seconds.
Processing complete:/n {
  "id": "51d9be59-2180-407f-93e1-ea3c3dec7fcd",
  "language_model": "assemblyai_default",
  "acoustic_model": "assemblyai_default",
  "language_code": "en_us",
  "status": "completed",
  "audio_url": "https://audio-samples.github.io/samples/mp3/blizzard_primed/sample-0.mp3",
  "text": "He doesn't belong to you, and I don't see how you have anything to do with what is be his power, if he possess only that from this stage to you.",
  "words": [
    {
      "text": "He",
      "start": 320,
      "end": 400,
      "confidence": 0.8894227,
      "speaker": null
    },
    {
      "text": "doesn't",
      "start": 480,
      "end": 960,
      "confidence": 0.85873646,
      "speaker": null
    },
    {
      "text": "belong",
      "start": 960,
      "end": 1360,
      "confidence": 0.98418343,
      "speaker": null
    },
    {
      "text": "to",
      "start": 1440,
      "end": 1520,
      "confidence": 0.9947456,
      "speaker": null
    },
    {
      "text": "you,",
      "start": 1600,
      "end": 1680,
      "confidence": 0.542386,
      "speaker": null
    },
    {
      "text": "and",
      "start": 1920,
      "end": 2000,
      "confidence": 0.99181706,
      "speaker": null
    },
    {
      "text": "I",
      "start": 2160,
      "end": 2240,
      "confidence": 0.9949956,
      "speaker": null
    },
    {
      "text": "don't",
      "start": 2240,
      "end": 2560,
      "confidence": 0.9778317,
      "speaker": null
    },
    {
      "text": "see",
      "start": 2560,
      "end": 2640,
      "confidence": 0.9933328,
      "speaker": null
    },
    {
      "text": "how",
      "start": 2800,
      "end": 2880,
      "confidence": 0.9756232,
      "speaker": null
    },
    {
      "text": "you",
      "start": 3120,
      "end": 3200,
      "confidence": 0.9898425,
      "speaker": null
    },
    {
      "text": "have",
      "start": 3360,
      "end": 3440,
      "confidence": 0.9754379,
      "speaker": null
    },
    {
      "text": "anything",
      "start": 3600,
      "end": 3680,
      "confidence": 0.9352868,
      "speaker": null
    },
    {
      "text": "to",
      "start": 4080,
      "end": 4160,
      "confidence": 0.99539536,
      "speaker": null
    },
    {
      "text": "do",
      "start": 4160,
      "end": 4320,
      "confidence": 0.994307,
      "speaker": null
    },
    {
      "text": "with",
      "start": 4400,
      "end": 4480,
      "confidence": 0.9825462,
      "speaker": null
    },
    {
      "text": "what",
      "start": 4560,
      "end": 4640,
      "confidence": 0.9361658,
      "speaker": null
    },
    {
      "text": "is",
      "start": 4800,
      "end": 4880,
      "confidence": 0.9499776,
      "speaker": null
    },
    {
      "text": "be",
      "start": 4960,
      "end": 5040,
      "confidence": 0.74536353,
      "speaker": null
    },
    {
      "text": "his",
      "start": 5120,
      "end": 5280,
      "confidence": 0.98388886,
      "speaker": null
    },
    {
      "text": "power,",
      "start": 5360,
      "end": 5440,
      "confidence": 0.15106322,
      "speaker": null
    },
    {
      "text": "if",
      "start": 5600,
      "end": 5680,
      "confidence": 0.22255379,
      "speaker": null
    },
    {
      "text": "he",
      "start": 5920,
      "end": 6000,
      "confidence": 0.3464594,
      "speaker": null
    },
    {
      "text": "possess",
      "start": 6080,
      "end": 6640,
      "confidence": 0.094453804,
      "speaker": null
    },
    {
      "text": "only",
      "start": 6640,
      "end": 6720,
      "confidence": 0.83083403,
      "speaker": null
    },
    {
      "text": "that",
      "start": 6880,
      "end": 6960,
      "confidence": 0.9876517,
      "speaker": null
    },
    {
      "text": "from",
      "start": 7120,
      "end": 7200,
      "confidence": 0.9683188,
      "speaker": null
    },
    {
      "text": "this",
      "start": 7200,
      "end": 7280,
      "confidence": 0.9067986,
      "speaker": null
    },
    {
      "text": "stage",
      "start": 7440,
      "end": 7680,
      "confidence": 0.9634684,
      "speaker": null
    },
    {
      "text": "to",
      "start": 7920,
      "end": 8000,
      "confidence": 0.9013573,
      "speaker": null
    },
    {
      "text": "you.",
      "start": 8080,
      "end": 8160,
      "confidence": 0.7715247,
      "speaker": null
    }
  ],
  "utterances": null,
  "confidence": 0.83341193,
  "audio_duration": 11,
  "punctuate": true,
  "format_text": true,
  "dual_channel": null,
  "webhook_url": null,
  "webhook_status_code": null,
  "webhook_auth": false,
  "webhook_auth_header_name": null,
  "speed_boost": false,
  "auto_highlights_result": null,
  "auto_highlights": false,
  "audio_start_from": null,
  "audio_end_at": null,
  "word_boost": [],
  "boost_param": null,
  "prompt": null,
  "keyterms_prompt": [],
  "filter_profanity": false,
  "redact_pii": false,
  "redact_pii_audio": false,
  "redact_pii_audio_quality": null,
  "redact_pii_audio_options": null,
  "redact_pii_policies": null,
  "redact_pii_sub": null,
  "speaker_labels": false,
  "speaker_options": null,
  "content_safety": false,
  "iab_categories": false,
  "content_safety_labels": {
    "status": "unavailable",
    "results": [],
    "summary": {}
  },
  "iab_categories_result": {
    "status": "unavailable",
    "results": [],
    "summary": {}
  },
  "language_detection": false,
  "language_detection_options": null,
  "language_confidence_threshold": null,
  "language_confidence": null,
  "custom_spelling": null,
  "throttled": false,
  "auto_chapters": false,
  "summarization": false,
  "summary_type": null,
  "summary_model": null,
  "custom_topics": false,
  "topics": [],
  "speech_threshold": null,
  "speech_model": "slam-1",
  "chapters": null,
  "disfluencies": false,
  "entity_detection": false,
  "sentiment_analysis": false,
  "sentiment_analysis_results": null,
  "entities": null,
  "speakers_expected": null,
  "summary": null,
  "custom_topics_results": null,
  "is_deleted": null,
  "multichannel": null,
  "project_id": 675898,
  "token_id": 1245789
}
```
{% endcode %}

</details>
