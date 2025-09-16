# nova-2

{% hint style="info" %}
This documentation is valid for the following list of our models:

* `#g1_nova-2-automotive`
* `#g1_nova-2-conversationalai`
* `#g1_nova-2-drivethru`
* `#g1_nova-2-finance`
* `#g1_nova-2-general`
* `#g1_nova-2-medical`
* `#g1_nova-2-meeting`
* `#g1_nova-2-phonecall`
* `#g1_nova-2-video`
* `#g1_nova-2-voicemail`
{% endhint %}

## Model Overview

Nova-2 builds on the advancements of Nova-1 with speech-specific optimizations to its Transformer architecture, refined data curation techniques, and a multi-stage training approach. These improvements result in a lower word error rate (WER) and better entity recognition (including proper nouns and alphanumeric sequences), as well as enhanced punctuation and capitalization.

Nova-2 offers the following model options:

* **automotive**: Optimized for audio with automotive oriented vocabulary.
* **conversationalai**: Optimized for use cases in which a human is talking to an automated bot, such as IVR, a voice assistant, or an automated kiosk.
* **drivethru**: Optimized for audio sources from drivethrus.
* **finance**: Optimized for multiple speakers with varying audio quality, such as might be found on a typical earnings call. Vocabulary is heavily finance oriented.
* **general**: Optimized for everyday audio processing.
* **medical**: Optimized for audio with medical oriented vocabulary.
* **meeting**: Optimized for conference room settings, which include multiple speakers with a single microphone.
* **phonecall**: Optimized for low-bandwidth audio phone calls.
* **video**: Optimized for audio sourced from videos.
* **voicemail**: Optimized for low-bandwidth audio clips with a single speaker. Derived from the phonecall model.

{% hint style="success" %}
Nova-2 models use per-second billing. The cost of audio transcription is based on the number of seconds in the input audio file, not the processing time.
{% endhint %}

## Setup your API Key

If you don’t have an API key for the AI/ML API yet, feel free to use our [Quickstart guide](https://docs.aimlapi.com/quickstart/setting-up).

## Quick Code Examples

Let's use the `#g1_nova-2-meeting` model to transcribe the following audio fragment:

{% embed url="https://drive.google.com/file/d/1ZN-28NUbK1TXHt6oEPj42zUJCv82e9L4/view?usp=sharing" %}

### Example #1: Processing a Speech Audio File via URL

<pre class="language-python" data-overflow="wrap"><code class="lang-python">import time
import requests

base_url = "https://api.aimlapi.com/v1"
# Insert your AIML API Key instead of &#x3C;YOUR_AIMLAPI_KEY>:
api_key = "&#x3C;YOUR_AIMLAPI_KEY>"

<strong># Creating and sending a speech-to-text conversion task to the server
</strong>def create_stt():
    url = f"{base_url}/stt/create"
    headers = {
        "Authorization": f"Bearer {api_key}", 
    }

    data = {
        "model": "#g1_nova-2-meeting",
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
        while time.time() - start_time &#x3C; timeout:
            response_data = get_stt(gen_id)

            if response_data is None:
                print("Error: No response from API")
                break
        
            status = response_data.get("status")

            if status == "waiting" or status == "active":
                print("Still waiting... Checking again in 10 seconds.")
                time.sleep(10)
            else:
                print("Processing complete:/n", response_data["result"]['results']["channels"][0]["alternatives"][0]["transcript"])
                return response_data
   
        print("Timeout reached. Stopping.")
        return None     


if __name__ == "__main__":
    main()

</code></pre>

<details>

<summary>Response</summary>

{% code overflow="wrap" %}
```
{'generation_id': 'h66460ba-0562-1dd9-b440-a56d947e72a3'}
Processing complete:
 He doesn't belong to you and i don't see how you have anything to do with what is be his power yet he's he persona from this stage to you be fine
```
{% endcode %}

</details>

### Example #2: Processing a Speech Audio File via File Path

{% code overflow="wrap" %}
```python
import time
import requests

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
        "model": "#g1_nova-2-meeting",
    }
    with open("stt-sample.mp3", "rb") as file:
        files = {"audio": ("sample.mp3", file, "audio/mpeg")}
        response = requests.post(url, data=data, headers=headers, files=files)
    
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
                print("Processing complete:/n", response_data["result"]['results']["channels"][0]["alternatives"][0]["transcript"])
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
```
{'generation_id': 'd793a81c-f8d8-40e0-a7c6-049ec6f54446'}
Processing complete:
 He doesn't belong to you, and I don't see how you have anything to do with what is be his power yet. He's he pursuing that from this stage to you.
```
{% endcode %}

</details>

## API Schema

#### Creating and sending a speech-to-text conversion task to the server

{% openapi-operation spec="nova-2" path="/v1/stt/create" method="post" %}
[OpenAPI nova-2](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/speech-models/Deepgram/nova-2.json)
{% endopenapi-operation %}

#### Requesting the result of the task from the server using the generation\_id

{% openapi-operation spec="stt-fetch" path="/v1/stt/{generation_id}" method="get" %}
[OpenAPI stt-fetch](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/speech-models/Deepgram/nova-2-pair.json)
{% endopenapi-operation %}
