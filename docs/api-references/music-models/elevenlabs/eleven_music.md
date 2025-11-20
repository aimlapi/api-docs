# eleven\_music

{% hint style="info" %}
This documentation is valid for the following list of our models:

* `elevenlabs/eleven_music`
{% endhint %}

An advanced audio generation model designed to create high-quality audio tracks from textual prompts.

## How to Make a Call

<details>

<summary>Step-by-Step Instructions</summary>

:digit\_one: **Setup You Can’t Skip**

:black\_small\_square: [**Create an Account**](https://aimlapi.com/app/sign-up): Visit the AI/ML API website and create an account (if you don’t have one yet).\
:black\_small\_square: [**Generate an API Key**](https://aimlapi.com/app/keys): After logging in, navigate to your account dashboard and generate your API key. Ensure that key is enabled on UI.

:digit\_two: **Copy the code example**

At the bottom of this page, you'll find [a code example](eleven_music.md#full-example-generating-and-retrieving-the-video-from-the-server) that shows how to structure the request. Choose the code snippet in your preferred programming language and copy it into your development environment.

{% hint style="success" %}
Generating a music piece using this model involves sequentially calling two endpoints:

* The first one is for creating and sending a music generation task to the server (returns a generation ID).
* The second one is for requesting the generated piece from the server using the generation ID received from the first endpoint.

The code example combines both endpoint calls.
{% endhint %}

:digit\_three: **Modify the code example**

:black\_small\_square: Replace `<YOUR_AIMLAPI_KEY>` with your actual AI/ML API key from your account.\
:black\_small\_square: Provide your instructions via the `prompt` parameter. The model will use them to generate a musical composition.

:digit\_four: <sup><sub><mark style="background-color:yellow;">**(Optional)**<mark style="background-color:yellow;"><sub></sup>**&#x20;Adjust other optional parameters if needed**

Only `prompt` is a required parameter for this model (and we’ve already filled it in for you in the example), but you can include optional parameters if needed to adjust the model’s behavior. Below, you can find the corresponding [API schema](eleven_music.md#api-schemas) ("Generate a music sample"), which lists all available parameters along with notes on how to use them.

:digit\_five: **Run your modified code**

Run your modified code in your development environment. Response time depends on various factors, but for simple prompts it rarely exceeds 30 seconds.

{% hint style="success" %}
If you need a more detailed walkthrough for setting up your development environment and making a request step by step — feel free to use our [Quickstart guide](../../../quickstart/setting-up.md).
{% endhint %}

</details>

## API Schemas

### Generate a music sample

This endpoint creates and sends a music generation task to the server — and returns a generation ID and the task status.

{% openapi-operation spec="eleven-music" path="/v2/generate/audio" method="post" %}
[OpenAPI eleven-music](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/music-models/elevenlabs/eleven_music.json)
{% endopenapi-operation %}

### Retrieve the generated music sample from the server <a href="#retrieve-the-generated-video-from-the-server" id="retrieve-the-generated-video-from-the-server"></a>

After sending a request for music generation, this task is added to the queue. Based on the service's load, the generation can be completed in 30-40 seconds or take a bit more.

{% openapi-operation spec="eleven-music-fetch" path="/v2/generate/audio" method="get" %}
[OpenAPI eleven-music-fetch](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/music-models/elevenlabs/eleven_music-pair.json)
{% endopenapi-operation %}

## Quick Code Example

Here is an example of generation an audio file based on a prompt using this music model.

{% tabs %}
{% tab title="Python" %}
{% code overflow="wrap" %}
```python
import time
import requests

# Insert your AI/ML API key instead of <YOUR_AIMLAPI_KEY>:
aimlapi_key = '<YOUR_AIMLAPI_KEY>'

# Creating and sending an audio generation task to the server (returns a generation ID)
def generate_audio():
    url = "https://api.aimlapi.com/v2/generate/audio"
    payload = {
        "model": "elevenlabs/eleven_music",
        "prompt": "lo-fi pop hip-hop ambient music, slow intro: 10 s, then faster and with loud bass: 10 s",
        "music_length_ms": 20000,
    }
    headers = {"Authorization": f"Bearer {aimlapi_key}", "Content-Type": "application/json"}

    response = requests.post(url, json=payload, headers=headers)

    if response.status_code >= 400:
        print(f"Error: {response.status_code} - {response.text}")
    else:
        response_data = response.json()
        print("Generation: ", response_data)
        return response_data


# Requesting the result of the generation task from the server using the generation_id:
def retrieve_audio(gen_id):
    url = "https://api.aimlapi.com/v2/generate/audio"
    params = {
        "generation_id": gen_id,
    }
    headers = {"Authorization": f"Bearer {aimlapi_key}", "Content-Type": "application/json"}
    response = requests.get(url, params=params, headers=headers)
    return response.json()
    
# This is the main function of the program. From here, we sequentially call the audio generation and then repeatedly request the result from the server every 10 seconds:
def main():
    generation_response = generate_audio()
    gen_id = generation_response.get("id")
        
    if gen_id:
        start_time = time.time()

        timeout = 600
        while time.time() - start_time < timeout:
            response_data = retrieve_audio(gen_id)

            if response_data is None:
                print("Error: No response from API")
                break
        
            status = response_data.get("status")
            if status == "generating" or status == "queued" or status == "waiting":
                print("Still waiting... Checking again in 10 seconds.")
                time.sleep(10)
            else:
                print("Generation complete:/n", response_data)
                return response_data
   
        print("Timeout reached. Stopping.")
        return None    


if __name__ == "__main__":
    main()
```
{% endcode %}
{% endtab %}
{% endtabs %}

<details>

<summary>Response</summary>

{% code overflow="wrap" %}
```json5
Generation: {'status': 'queued', 'id': '60ac7c34-3224-4b14-8e7d-0aa0db708325:elevenlabs/eleven_music'}
Still waiting... Checking again in 10 seconds.
Still waiting... Checking again in 10 seconds.
Generation complete:/n {'id': '60ac7c34-3224-4b14-8e7d-0aa0db708325:elevenlabs/eleven_music', 'status': 'completed', 'audio_file': {'url': 'https://cdn.aimlapi.com/generations/hippopotamus/1757963033314-8ca7729d-b78c-4d4c-9ef9-89b2fb3d07e8.mp3'}}
```
{% endcode %}

</details>

Listen to the track we generated:

{% embed url="https://drive.google.com/file/d/1qwu_K_iGtTLdlR_mrZkoSjQ040Q4Nqng/view?usp=sharing" %}
"`lo-fi pop hip-hop ambient music, slow intro: 10 s, then faster and with loud bass: 10 s"`
{% endembed %}
