---
layout:
  title:
    visible: true
  description:
    visible: false
  tableOfContents:
    visible: true
  outline:
    visible: true
  pagination:
    visible: true
---

# Speech-to-Text

## Overview

Speech-to-text models convert spoken language into written text, enabling voice-based interactions across various applications. These models leverage deep learning techniques, such as recurrent neural networks (RNNs) and transformers, to process audio signals and transcribe them with high accuracy. They are commonly used in voice assistants, transcription services, and accessibility tools, supporting multiple languages and adapting to different accents and speech patterns.

{% hint style="warning" %}
Generated audio transcriptions are stored on the server for 1 hour from the time of creation.
{% endhint %}

## Quick Code Examples

Let's use the `#g1_whisper-large` model to transcribe the following audio fragment:

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
        "model": "#g1_whisper-large",
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
{'generation_id': 'e3d46bba-7562-44a9-b440-504d940342a3'}
Processing complete:
 he doesn't belong to you and i don't see how you have anything to do with what is be his power yet he's he personified from this stage to you be fire
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
        "model": "#g1_whisper-large",
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
{'generation_id': 'dd412e9d-044c-43ae-b97b-e920755074d5'}
Processing complete:
 he doesn't belong to you and i don't see how you have anything to do with what is be his power yet he's he personified from this stage to you be fire
```
{% endcode %}

</details>
