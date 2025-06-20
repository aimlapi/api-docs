# v2-master/text-to-video

{% hint style="info" %}
This documentation is valid for the following list of our models:

* `klingai/v2-master-image-to-video`
{% endhint %}

## Model Overview

Compared to [v1.6](v1.6-pro-text-to-video.md), this Kling model better aligns with the prompt and delivers more dynamic and visually appealing results.

## Setup your API Key

If you don’t have an API key for the AI/ML API yet, feel free to use our [Quickstart guide](https://docs.aimlapi.com/quickstart/setting-up).

## How to Make a Call

Generating a video using this model involves making two sequential API calls:

* The first one is for creating and sending a video generation task to the server (returns a generation ID).&#x20;
* The second one is for requesting the generated or extended video from the server using the generation ID received from the first endpoint.&#x20;

Below, you can find both corresponding API schemas.

## API Schemas

### Create a video generation task and send it to the server

{% openapi-operation spec="kling-v2-master-t2v" path="/v2/generate/video/kling/generation" method="post" %}
[OpenAPI kling-v2-master-t2v](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/video-models/Kling-AI/v2-master-text-to-video.json)
{% endopenapi-operation %}

### Retrieve the generated video from the server

After sending a request for video generation, this task is added to the queue. Based on the service's load, the generation can be completed in seconds or take a bit more.&#x20;

{% openapi-operation spec="kling-fetch" path="/v2/generate/video/kling/generation" method="get" %}
[OpenAPI kling-fetch](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/video-models/Kling-AI/v1.6-standard-effects-pair.json)
{% endopenapi-operation %}

## Code Example (Python)

The code below creates a video generation task, then automatically polls the server every **10** seconds until it finally receives the video URL.

{% hint style="warning" %}
This model produces highly detailed and natural-looking videos, so generation may take around 5–6 minutes for a 5-second video and 11-14 minutes for a 10-second video.
{% endhint %}

<details>

<summary>Full code example</summary>

<pre class="language-python" data-overflow="wrap"><code class="lang-python">import requests
import time

base_url = "https://api.aimlapi.com/v2"
api_key = "&#x3C;YOUR_AIMLAPI_KEY>"

# Creating and sending a video generation task to the server
def generate_video():
    url = f"{base_url}/generate/video/kling/generation"
    headers = {
        "Authorization": f"Bearer {api_key}", 
    }
<strong>
</strong>    data = {
        "model": "klingai/v2-master-text-to-video",
        "prompt": "A cheerful white raccoon running through a sequoia forest",
        "aspect_ratio": "16:9",
        "duration": "5",
        "cfg_scale": 0.9  
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
    url = f"{base_url}/generate/video/kling/generation"
    params = {
        "generation_id": gen_id,
    }
    
    # Insert your AIML API Key instead of &#x3C;YOUR_AIMLAPI_KEY>:
    headers = {
        "Authorization": f"Bearer {api_key}", 
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
        while time.time() - start_time &#x3C; timeout:
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
</code></pre>

</details>

<details>

<summary>Response</summary>

{% code overflow="wrap" %}
```json5
Gen_ID:   10c09c56-2e00-4a64-89ec-358ff71f8144:kling-video/v2/master/text-to-video
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
Status: generating
Still waiting... Checking again in 10 seconds.
Status: generating
Still waiting... Checking again in 10 seconds.
Status: completed
Processing complete:/n {'id': '10c09c56-2e00-4a64-89ec-358ff71f8144:kling-video/v2/master/text-to-video', 'status': 'completed', 'video': {'url': 'https://cdn.aimlapi.com/eagle/files/lion/0jOQ9V3lSX-nz16Xu6BMV_output.mp4', 'content_type': 'video/mp4', 'file_name': 'output.mp4', 'file_size': 11664920}}
```
{% endcode %}

</details>

<details>

<summary>Generated Video</summary>

**Original**: [1280x720](https://drive.google.com/file/d/1kGC9QJcypu6Qzjred1Bo1YpnuTx25yNV/view?usp=sharing)

**Low-res GIF preview**:

<figure><img src="../../../.gitbook/assets/kling-master-t2v-racoon.gif" alt=""><figcaption><p><code>"prompt": "A cheerful white raccoon running through a sequoia forest"</code></p></figcaption></figure>

</details>
