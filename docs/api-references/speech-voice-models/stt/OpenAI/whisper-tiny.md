# whisper-tiny

{% hint style="info" %}
This documentation is valid for the following list of our models:

* \#g1\_whisper-tiny
{% endhint %}

{% hint style="warning" %}
Note:&#x20;

Previously, our STT models operated via a single API call to `POST https://api.aimlapi.com/v1/stt`.

Now, we are switching to a new two-step process:

* `POST https://api.aimlapi.com/v1/stt/create` – Creates and submits a speech-to-text processing task to the server. This method accepts the same parameters as the old version but returns a `generation_id` instead of the final transcript.
* `GET https://api.aimlapi.com/v1/stt/{generation_id}` – Retrieves the generated transcript from the server using the `generation_id` obtained from the previous API call.

This approach helps prevent generation failures due to timeouts. \
We've prepared [a couple of examples](whisper-tiny.md#quick-code-examples) below to make the transition to the new STT API easier for you.
{% endhint %}

## Model Overview

The Whisper models are primarily for AI research, focusing on model robustness, generalization, and biases, and are also effective for English speech recognition. The use of Whisper models for transcribing non-consensual recordings or in high-risk decision-making contexts is strongly discouraged due to potential inaccuracies and ethical concerns.

The models are trained using 680,000 hours of audio and corresponding transcripts from the internet, with 65% being English audio and transcripts, 18% non-English audio with English transcripts, and 17% non-English audio with matching non-English transcripts, covering 98 languages in total.

## Setup your API Key

If you don’t have an API key for the AI/ML API yet, feel free to use our [Quickstart guide](https://docs.aimlapi.com/quickstart/setting-up).

## Submit a request

### API Schema

#### Creating and sending a speech-to-text conversion task to the server

{% openapi src="whisper-tiny.json" path="/v1/stt/create" method="post" %}
[whisper-tiny.json](whisper-tiny.json)
{% endopenapi %}

#### Requesting the result of the task from the server using the generation\_id

{% openapi src="https://api.aimlapi.com/docs-public-yaml?key=2b878a3c71a785f13366e9be96bacb29" path="/v1/stt/{generation_id}" method="get" %}
[https://api.aimlapi.com/docs-public-yaml?key=2b878a3c71a785f13366e9be96bacb29 ](https://api.aimlapi.com/docs-public-yaml?key=2b878a3c71a785f13366e9be96bacb29)
{% endopenapi %}



## Quick Code Examples

Let's use the `#g1_whisper-tiny` model to transcribe the following audio fragment:

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
        "model": "#g1_whisper-tiny",
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
                ("Still waiting... Checking again in 10 seconds.")
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
                ("Still waiting... Checking again in 10 seconds.")
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
{'generation_id': 'f3e8729e-9a36-4650-81f1-c08fc1b16f39'}
Processing complete:
 He doesn't belong to you and I don't see how you have anything to do with what is be his power You he's he personally that from this stage to you Be fine
```
{% endcode %}

</details>
