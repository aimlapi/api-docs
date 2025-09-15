# hailuo-02

{% hint style="info" %}
This documentation is valid for the following list of our models:

* `minimax/hailuo-02`
{% endhint %}

Compared to earlier versions, this model brings enhanced physics, more natural camera movement, and better alignment with prompts. It currently supports 10-second clips at 768p, with native 1080p coming soon.

## Setup your API Key

If you don’t have an API key for the AI/ML API yet, feel free to use our [Quickstart guide](https://docs.aimlapi.com/quickstart/setting-up).

## Full Example: Generating and Retrieving the Video From the Server

The code below creates a video generation task, then automatically polls the server every **10** seconds until it finally receives the video URL.

{% hint style="info" %}
Generation may take around 4-5 minutes for a 6-second video and 8-9 minutes for a 10-second video.
{% endhint %}

{% tabs %}
{% tab title="Python" %}
{% code overflow="wrap" %}
```python
import requests
import time

# Insert your AIML API Key instead of <YOUR_AIMLAPI_KEY>:
base_url = "https://api.aimlapi.com/v2"
api_key = "<YOUR_AIMLAPI_KEY>"

# Creating and sending a video generation task to the server
def generate_video():
    url = f"{base_url}/generate/video/minimax/generation"
    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json"
    }

    data = {
        "model": "minimax/hailuo-02",
        "prompt": "Mona Lisa puts on glasses with her hands.",
        "first_frame_image": "https://s2-111386.kwimgs.com/bs2/mmu-aiplatform-temp/kling/20240620/1.jpeg"      
    }
 
    response = requests.post(url, json=data, headers=headers)
    
    if response.status_code >= 400:
        print(f"Error: {response.status_code} - {response.text}")
    else:
        response_data = response.json()
        return response_data
    

# Requesting the result of the task from the server using the generation_id
def get_video(gen_id):
    url = f"{base_url}/generate/video/minimax/generation"
    params = {
        "generation_id": gen_id,
    }
    
    headers = {
        "Authorization": f"Bearer {api_key}", 
        "Content-Type": "application/json"
        }

    response = requests.get(url, params=params, headers=headers)
    return response.json()


def main():
     # Running video generation and getting a task id
    gen_response = generate_video()
    print(gen_response)
    gen_id = gen_response.get("generation_id")
    print("Generation ID:  ", gen_id)

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
{% endtab %}
{% endtabs %}

<details>

<summary>Response</summary>

{% code overflow="wrap" %}
```json5
{'generation_id': '282052359471184', 'status': 'queued'}
Gen_ID:   282052359471184
Status: queued
Still waiting... Checking again in 10 seconds.
Status: queued
Still waiting... Checking again in 10 seconds.
Status: queued
Still waiting... Checking again in 10 seconds.
Status: queued
Still waiting... Checking again in 10 seconds.
Status: queued
Still waiting... Checking again in 10 seconds.
Status: queued
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
Processing complete:/n {'id': '282052359471184', 'status': 'completed', 'video': {'url': 'https://cdn.aimlapi.com/whale/inference_output%2Fvideo%2F2025-06-20%2Fff397144-0af8-4c32-a157-b60b1e05ed32%2Foutput.mp4?Expires=1750446300&OSSAccessKeyId=LTAI5tAmwsjSaaZVA6cEFAUu&Signature=hNtlgGPljugZ1uxDyRPXRCBS%2B1Y%3D'}}
```
{% endcode %}

</details>

<details>

<summary>Generated Video</summary>

**Original**: [768x1142](https://drive.google.com/file/d/1l4R2YH2jowZR1Brgbrg3wQYqip3bFtMu/view?usp=sharing)

**Low-res GIF preview**:

<figure><img src="../../../.gitbook/assets/minimax-hailuo-02-preview.gif" alt=""><figcaption></figcaption></figure>

</details>

## API Schemas

Generating a video using this model involves sequentially calling two endpoints:&#x20;

* The first one is for creating and sending a video generation task to the server (returns a generation ID).
* The second one is for requesting the generated video from the server using the generation ID received from the first endpoint.&#x20;

Below, you can find two corresponding API schemas and an example with both endpoint calls.

### Create a video generation task and send it to the server

{% openapi-operation spec="hailuo-02" path="/v2/generate/video/minimax/generation" method="post" %}
[OpenAPI hailuo-02](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/video-models/MiniMax/hailuo-02.json)
{% endopenapi-operation %}

### Retrieve the generated video from the server

After sending a request for video generation, this task is added to the queue. This endpoint lets you check the status of a video generation task using its `id`, obtained from the endpoint described above.\
If the video generation task status is `complete`, the response will include the final result — with the generated video URL and additional metadata.

{% openapi src="../MiniMax/video-01-live2d-pair.json" path="/v2/generate/video/minimax/generation" method="get" %}
[video-01-live2d-pair.json](../MiniMax/video-01-live2d-pair.json)
{% endopenapi %}
