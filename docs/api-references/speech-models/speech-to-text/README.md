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
```lisp
{'generation_id': 'dd412e9d-044c-43ae-b97b-e920755074d5'}
Processing complete:
 he doesn't belong to you and i don't see how you have anything to do with what is be his power yet he's he personified from this stage to you be fire
```
{% endcode %}

</details>

## All Available Speech-to-Text Models

<table data-full-width="true"><thead><tr><th width="266.20001220703125">Model ID + API Reference link</th><th width="132.79998779296875">Developer</th><th width="103.5999755859375">Context</th><th>Model Card</th></tr></thead><tbody><tr><td><a href="assembly-ai/slam-1.md">aai/slam-1</a></td><td>Assembly AI</td><td></td><td><a href="https://aimlapi.com/models/slam-1">Slam 1</a></td></tr><tr><td><a href="assembly-ai/universal.md">aai/universal</a></td><td>Assembly AI</td><td></td><td><a href="https://aimlapi.com/models/universal">Universal</a></td></tr><tr><td><a href="../../speech-voice-models/stt/Deepgram/nova-2.md">#g1_nova-2-automotive</a></td><td>Deepgram</td><td></td><td><a href="https://aimlapi.com/models/deepgram-nova-2">Deepgram Nova-2</a></td></tr><tr><td><a href="../../speech-voice-models/stt/Deepgram/nova-2.md">#g1_nova-2-conversationalai</a></td><td>Deepgram</td><td></td><td><a href="https://aimlapi.com/models/deepgram-nova-2">Deepgram Nova-2</a></td></tr><tr><td><a href="../../speech-voice-models/stt/Deepgram/nova-2.md">#g1_nova-2-drivethru</a></td><td>Deepgram</td><td></td><td><a href="https://aimlapi.com/models/deepgram-nova-2">Deepgram Nova-2</a></td></tr><tr><td><a href="../../speech-voice-models/stt/Deepgram/nova-2.md">#g1_nova-2-finance</a></td><td>Deepgram</td><td></td><td><a href="https://aimlapi.com/models/deepgram-nova-2">Deepgram Nova-2</a></td></tr><tr><td><a href="../../speech-voice-models/stt/Deepgram/nova-2.md">#g1_nova-2-general</a></td><td>Deepgram</td><td></td><td><a href="https://aimlapi.com/models/deepgram-nova-2">Deepgram Nova-2</a></td></tr><tr><td><a href="../../speech-voice-models/stt/Deepgram/nova-2.md">#g1_nova-2-medical</a></td><td>Deepgram</td><td></td><td><a href="https://aimlapi.com/models/deepgram-nova-2">Deepgram Nova-2</a></td></tr><tr><td><a href="../../speech-voice-models/stt/Deepgram/nova-2.md">#g1_nova-2-meeting</a></td><td>Deepgram</td><td></td><td><a href="https://aimlapi.com/models/deepgram-nova-2">Deepgram Nova-2</a></td></tr><tr><td><a href="../../speech-voice-models/stt/Deepgram/nova-2.md">#g1_nova-2-phonecall</a></td><td>Deepgram</td><td></td><td><a href="https://aimlapi.com/models/deepgram-nova-2">Deepgram Nova-2</a></td></tr><tr><td><a href="../../speech-voice-models/stt/Deepgram/nova-2.md">#g1_nova-2-video</a></td><td>Deepgram</td><td></td><td><a href="https://aimlapi.com/models/deepgram-nova-2">Deepgram Nova-2</a></td></tr><tr><td><a href="../../speech-voice-models/stt/Deepgram/nova-2.md">#g1_nova-2-voicemail</a></td><td>Deepgram</td><td></td><td><a href="https://aimlapi.com/models/deepgram-nova-2">Deepgram Nova-2</a></td></tr><tr><td><a href="../../speech-voice-models/stt/OpenAI/whisper-tiny.md">#g1_whisper-tiny</a></td><td>OpenAI</td><td></td><td>-</td></tr><tr><td><a href="../../speech-voice-models/stt/OpenAI/whisper-small.md">#g1_whisper-small</a></td><td>OpenAI</td><td></td><td>-</td></tr><tr><td><a href="../../speech-voice-models/stt/OpenAI/whisper-base.md">#g1_whisper-base</a></td><td>OpenAI</td><td></td><td>-</td></tr><tr><td><a href="../../speech-voice-models/stt/OpenAI/whisper-medium.md">#g1_whisper-medium</a></td><td>OpenAI</td><td></td><td>-</td></tr><tr><td><a href="../../speech-voice-models/stt/OpenAI/whisper-large.md">#g1_whisper-large</a></td><td>OpenAI</td><td></td><td><a href="https://aimlapi.com/models/whisper">Whisper</a></td></tr><tr><td><a href="openai/gpt-4o-transcribe.md">openai/gpt-4o-transcribe</a></td><td>OpenAI</td><td></td><td><a href="https://aimlapi.com/models/gpt-4o-transcribe">GPT-4o Transcribe</a></td></tr><tr><td><a href="openai/gpt-4o-mini-transcribe.md">openai/gpt-4o-mini-transcribe</a></td><td>OpenAI</td><td></td><td><a href="https://aimlapi.com/models/gpt-4o-mini-transcribe">GPT-4o Mini Transcribe</a></td></tr></tbody></table>
