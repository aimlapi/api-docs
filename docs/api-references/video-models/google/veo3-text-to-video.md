# Veo3 (Text-to-Video)

{% hint style="info" %}
This documentation is valid for the following list of our models:

* `google/veo3`
{% endhint %}

## Overview

The model generates high-quality short videos from text or image prompts with significant advancements over its predecessor, [Veo2](veo2-text-to-video.md).

## Setup your API Key

If you don’t have an API key for the AI/ML API yet, feel free to use our [Quickstart guide](https://docs.aimlapi.com/quickstart/setting-up).

## How to Make a Call

<details>

<summary>Step-by-Step Instructions</summary>

Generating a video using this model involves sequentially calling two endpoints:&#x20;

* The first one is for creating and sending a video generation task to the server (returns a generation ID).
* The second one is for requesting the generated video from the server using the generation ID received from the first endpoint.&#x20;

Below, you can find two corresponding API schemas and an example with both endpoint calls.

</details>

## API Schemas

### Video Generation

You can generate a video using this API. In the basic setup, you only need a prompt.&#x20;

{% hint style="warning" %}
The prompt will be automatically enhanced using AI. To disable this feature, set the parameter `enhance_prompt` to `false`.
{% endhint %}

{% openapi-operation spec="veo3" path="/v2/generate/video/google/generation" method="post" %}
[OpenAPI veo3](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/video-models/Google/veo3.json)
{% endopenapi-operation %}

### Retrieve the generated video from the server

After sending a request for video generation, this task is added to the queue. Based on the service's load, the generation can be completed in a couple of minutes

&#x20;or take a bit more.&#x20;

{% openapi-operation spec="veo3-fetch" path="/v2/generate/video/google/generation" method="get" %}
[OpenAPI veo3-fetch](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/video-models/Google/veo3-pair.json)
{% endopenapi-operation %}

## Full Example: Generating and Retrieving the Video From the Server

The code below creates a video generation task, then automatically polls the server every **10** seconds until it finally receives the video URL.

{% hint style="warning" %}
This model produces highly detailed and natural-looking videos, so generation may take around 2 minutes for a 8-second video with audio.
{% endhint %}

{% code overflow="wrap" %}
```python
import requests
import time

base_url = "https://api.aimlapi.com/v2"
# Insert your AIML API Key instead of <YOUR_AIMLAPI_KEY>:
aimlapi_key = "<YOUR_AIMLAPI_KEY>"

# Creating and sending a video generation task to the server
def generate_video():
    url = f"{base_url}/generate/video/google/generation"
    headers = {
        "Authorization": f"Bearer {aimlapi_key}", 
    }

    data = {
        "model": "google/veo3",
        "prompt": '''
A menacing evil dragon appears in a distance above the tallest mountain, then rushes toward the camera with its jaws open, revealing massive fangs. We see it's coming.
'''
    }
 
    response = requests.post(url, json=data, headers=headers)
    
    if response.status_code >= 400:
        print(f"Error: {response.status_code} - {response.text}")
    else:
        response_data = response.json()
        # print(response_data)
        return response_data
    

# Requesting the result of the task from the server using the generation_id
def get_video(gen_id):
    url = f"{base_url}/generate/video/google/generation"
    params = {
        "generation_id": gen_id,
    }
    
    headers = {
        "Authorization": f"Bearer {aimlapi_key}", 
        "Content-Type": "application/json"
        }

    response = requests.get(url, params=params, headers=headers)
    # print("Generation:", response.json())
    return response.json()



def main():
     # Running video generation and getting a task id
    gen_response = generate_video()
    gen_id = gen_response.get("id")
    print("Gen_ID:  ", gen_id)

    # Trying to retrieve the video from the server every 10 sec
    if gen_id:
        start_time = time.time()

        timeout = 1000
        while time.time() - start_time < timeout:
            response_data = get_video(gen_id)

            if response_data is None:
                print("Error: No response from API")
                break
        
            status = response_data.get("status")
            print("Status:", status)

            if status == "waiting" or status == "active" or  status == "queued" or status == "generating":
                print("Still waiting... Checking again in 10 seconds.")
                time.sleep(10)
            else:
                print("Processing complete:/n", response_data)
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
Gen_ID:   df43b636-6b09-4b6d-bbd2-f710ac0a3cfd:veo3
Status: generating
Still waiting... Checking again in 10 seconds.
Status: generating
Still waiting... Checking again in 10 seconds.
Status: generating
Still waiting... Checking again in 10 seconds.
Status: generating
Still waiting... Checking again in 10 seconds.
Status: generating
Still waiting... Checking again in 10 seconds.
Status: generating
Still waiting... Checking again in 10 seconds.
Status: generating
Still waiting... Checking again in 10 seconds.
Status: generating
Still waiting... Checking again in 10 seconds.
Status: generating
Still waiting... Checking again in 10 seconds.
Status: generating
Still waiting... Checking again in 10 seconds.
Status: generating
Still waiting... Checking again in 10 seconds.
Status: generating
Still waiting... Checking again in 10 seconds.
Status: generating
Still waiting... Checking again in 10 seconds.
Status: generating
Still waiting... Checking again in 10 seconds.
Status: completed
Processing complete:/n {'id': 'df43b636-6b09-4b6d-bbd2-f710ac0a3cfd:veo3', 'status': 'completed', 'video': {'url': 'https://cdn.aimlapi.com/eagle/files/tiger/R6LdSHLx937-O7ra31ySQ_output.mp4', 'content_type': 'video/mp4', 'file_name': 'output.mp4', 'file_size': 3716781}}
```
{% endcode %}

</details>

**Original (with sound)**: [1280x720](https://drive.google.com/file/d/1P9ZTV332Op4nhXM_KM4imdyOI-9Irl58/view?usp=sharing)

**Low-res GIF preview**:

<figure><img src="../../../.gitbook/assets/ezgif-374c7b0f8e0e06.gif" alt=""><figcaption><p><code>"A menacing evil dragon appears in a distance above the tallest mountain, then rushes toward the camera with its jaws open, revealing massive fangs. We see it's coming."</code></p></figcaption></figure>
