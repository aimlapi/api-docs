# universal

{% hint style="info" %}
This documentation is valid for the following list of our models:

* `aai/universal`
{% endhint %}

A new Speech-to-Text model offering exceptional accuracy by leveraging its deep understanding of context and semantics, with the broadest language support.

{% hint style="success" %}
This model use per-second billing. The cost of audio transcription is based on the number of seconds in the input audio file, not the processing time.
{% endhint %}

## Setup your API Key

If you don’t have an API key for the AI/ML API yet, feel free to use our [Quickstart guide](https://docs.aimlapi.com/quickstart/setting-up).

## API Schema

#### Creating and sending a speech-to-text conversion task to the server

{% openapi-operation spec="aai-universal" path="/v1/stt/create" method="post" %}
[OpenAPI aai-universal](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/speech-models/AssemblyAI/universal.json)
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
        "model": "aai/universal",
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
{'generation_id': '0cff4e24-c1ba-419d-8b62-46f342985881'}
Still waiting... Checking again in 10 seconds.
Processing complete:/n {
  "id": "04d07a4c-9238-4860-ac6f-534d58fdaf9a",
  "language_model": "assemblyai_default",
  "acoustic_model": "assemblyai_default",
  "language_code": "en_us",
  "status": "completed",
  "audio_url": "https://audio-samples.github.io/samples/mp3/blizzard_primed/sample-0.mp3",
  "text": "He doesn't belong to you. And I don't see how you have anything to do with what is be his power yet his he presumably that from this stage to you be fired.",
  "words": [
    {
      "text": "He",
      "start": 400,
      "end": 520,
      "confidence": 0.98876953,
      "speaker": null
    },
    {
      "text": "doesn't",
      "start": 520,
      "end": 880,
      "confidence": 0.9296875,
      "speaker": null
    },
    {
      "text": "belong",
      "start": 880,
      "end": 1320,
      "confidence": 1,
      "speaker": null
    },
    {
      "text": "to",
      "start": 1320,
      "end": 1560,
      "confidence": 0.99853516,
      "speaker": null
    },
    {
      "text": "you.",
      "start": 1560,
      "end": 1840,
      "confidence": 0.99853516,
      "speaker": null
    },
    {
      "text": "And",
      "start": 1840,
      "end": 2120,
      "confidence": 0.99365234,
      "speaker": null
    },
    {
      "text": "I",
      "start": 2120,
      "end": 2280,
      "confidence": 0.99902344,
      "speaker": null
    },
    {
      "text": "don't",
      "start": 2280,
      "end": 2520,
      "confidence": 0.9949544,
      "speaker": null
    },
    {
      "text": "see",
      "start": 2520,
      "end": 2720,
      "confidence": 0.99902344,
      "speaker": null
    },
    {
      "text": "how",
      "start": 2720,
      "end": 3000,
      "confidence": 0.99902344,
      "speaker": null
    },
    {
      "text": "you",
      "start": 3000,
      "end": 3320,
      "confidence": 0.99853516,
      "speaker": null
    },
    {
      "text": "have",
      "start": 3320,
      "end": 3600,
      "confidence": 0.99658203,
      "speaker": null
    },
    {
      "text": "anything",
      "start": 3600,
      "end": 4080,
      "confidence": 0.9968262,
      "speaker": null
    },
    {
      "text": "to",
      "start": 4080,
      "end": 4240,
      "confidence": 0.99902344,
      "speaker": null
    },
    {
      "text": "do",
      "start": 4240,
      "end": 4360,
      "confidence": 0.99902344,
      "speaker": null
    },
    {
      "text": "with",
      "start": 4360,
      "end": 4520,
      "confidence": 0.9902344,
      "speaker": null
    },
    {
      "text": "what",
      "start": 4520,
      "end": 4720,
      "confidence": 0.9941406,
      "speaker": null
    },
    {
      "text": "is",
      "start": 4720,
      "end": 4920,
      "confidence": 0.9819336,
      "speaker": null
    },
    {
      "text": "be",
      "start": 4920,
      "end": 5080,
      "confidence": 0.8720703,
      "speaker": null
    },
    {
      "text": "his",
      "start": 5080,
      "end": 5280,
      "confidence": 0.9951172,
      "speaker": null
    },
    {
      "text": "power",
      "start": 5280,
      "end": 5520,
      "confidence": 0.8588867,
      "speaker": null
    },
    {
      "text": "yet",
      "start": 5520,
      "end": 5840,
      "confidence": 0.5756836,
      "speaker": null
    },
    {
      "text": "his",
      "start": 5840,
      "end": 6160,
      "confidence": 0.5419922,
      "speaker": null
    },
    {
      "text": "he",
      "start": 6160,
      "end": 6360,
      "confidence": 0.96972656,
      "speaker": null
    },
    {
      "text": "presumably",
      "start": 6360,
      "end": 6840,
      "confidence": 0.5012207,
      "speaker": null
    },
    {
      "text": "that",
      "start": 6840,
      "end": 7000,
      "confidence": 0.8901367,
      "speaker": null
    },
    {
      "text": "from",
      "start": 7000,
      "end": 7160,
      "confidence": 0.9951172,
      "speaker": null
    },
    {
      "text": "this",
      "start": 7160,
      "end": 7320,
      "confidence": 0.9926758,
      "speaker": null
    },
    {
      "text": "stage",
      "start": 7320,
      "end": 7680,
      "confidence": 0.9953613,
      "speaker": null
    },
    {
      "text": "to",
      "start": 7680,
      "end": 7960,
      "confidence": 0.9941406,
      "speaker": null
    },
    {
      "text": "you",
      "start": 7960,
      "end": 8320,
      "confidence": 0.9975586,
      "speaker": null
    },
    {
      "text": "be",
      "start": 9440,
      "end": 9720,
      "confidence": 0.4555664,
      "speaker": null
    },
    {
      "text": "fired.",
      "start": 9720,
      "end": 10050,
      "confidence": 0.4534912,
      "speaker": null
    }
  ],
  "utterances": null,
  "confidence": 0.90746206,
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
  "speech_model": "universal",
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
