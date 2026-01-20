---
hidden: true
noIndex: true
---

# gpt-4o-mini-transcribe

{% hint style="info" %}
This documentation is valid for the following list of our models:

* `openai/gpt-4o-mini-transcribe`
{% endhint %}

{% hint style="success" %}
Note:

Previously, our STT models operated via a single API call to `POST https://api.aimlapi.com/v1/stt`. You can view the API schema [here](../stt-legacy.md).

Now, we are switching to a new two-step process:

* `POST https://api.aimlapi.com/v1/stt/create` – Creates and submits a speech-to-text processing task to the server. This method accepts the same parameters as the old version but returns a `generation_id` instead of the final transcript.
* `GET https://api.aimlapi.com/v1/stt/{generation_id}` – Retrieves the generated transcript from the server using the `generation_id` obtained from the previous API call.

This approach helps prevent generation failures due to timeouts.\
We've prepared [a couple of examples](gpt-4o-mini-transcribe.md#quick-code-examples) below to make the transition to the new STT API easier for you.
{% endhint %}

## Model Overview

A speech-to-text model based on [GPT-4o mini](../../../text-models-llm/OpenAI/gpt-4o-mini.md) for audio transcription. It provides improved word error rates and more accurate language recognition compared to the original Whisper models. Recommended for use cases that require higher transcription accuracy.

{% hint style="success" %}
OpenAI STT models are priced based on tokens, similar to chat models. In practice, this means the cost primarily depends on the duration of the input audio.
{% endhint %}

## Setup your API Key

If you don’t have an API key for the AI/ML API yet, feel free to use our [Quickstart guide](https://docs.aimlapi.com/quickstart/setting-up).

## API Schemas

#### Creating and sending a speech-to-text conversion task to the server

{% openapi-operation spec="gpt-4o-mini-transcribe" path="/v1/stt/create" method="post" %}
[OpenAPI gpt-4o-mini-transcribe](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/speech-models/OpenAI/gpt-4o-mini-transcribe.json)
{% endopenapi-operation %}

#### Requesting the result of the task from the server using the generation\_id

{% openapi-operation spec="stt-fetch" path="/v1/stt/{generation_id}" method="get" %}
[OpenAPI stt-fetch](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/speech-models/Deepgram/nova-2-pair.json)
{% endopenapi-operation %}

## Quick Code Examples

Let's use the `openai/gpt-4o-mini-transcribe` model to transcribe the following audio fragment:

{% embed url="https://drive.google.com/file/d/1ZN-28NUbK1TXHt6oEPj42zUJCv82e9L4/view?usp=sharing" %}

### Example Code: Processing a Speech Audio File via URL

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
        "model": "openai/gpt-4o-mini-transcribe",
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

            if status == "waiting" or status == "generating":
                print("Still waiting... Checking again in 10 seconds.")
                time.sleep(10)
            else:
                print("Processing complete:\n", response_data["result"]['results']["channels"][0]["alternatives"][0]["transcript"])
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
{'generation_id': 'f3e8729e-9a36-4650-81f1-c08fc1b16f39'}
Processing complete:
 He doesn't belong to you and I don't see how you have anything to do with what is be his power You he's he personally that from this stage to you Be fine
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
        "model": "#g1_whisper-tiny",
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
                print("Processing complete:\n", response_data["result"]['results']["channels"][0]["alternatives"][0]["transcript"])
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
{'generation_id': 'f3e8729e-9a36-4650-81f1-c08fc1b16f39'}
Processing complete:
 He doesn't belong to you and I don't see how you have anything to do with what is be his power You he's he personally that from this stage to you Be fine
```
{% endcode %}

</details>
