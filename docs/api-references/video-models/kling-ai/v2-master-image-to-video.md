# v2-master/image-to-video

{% columns %}
{% column width="66.66666666666666%" %}
{% hint style="info" %}
This documentation is valid for the following list of our models:

* `klingai/v2-master-image-to-video`
{% endhint %}
{% endcolumn %}

{% column width="33.33333333333334%" %}
<a href="https://aimlapi.com/app/?model=klingai/v2-master-image-to-video&#x26;mode=video" class="button primary">Try in Playground</a>
{% endcolumn %}
{% endcolumns %}

Compared to [v1.6](../Kling-AI/v1.6-pro-image-to-video.md), this Kling model better aligns with the prompt and delivers more dynamic and visually appealing results.

## Setup your API Key

If you don’t have an API key for the AI/ML API yet, feel free to use our [Quickstart guide](https://docs.aimlapi.com/quickstart/setting-up).

## Code Example

The code below creates a video generation task, then automatically polls the server every **10** seconds until it finally receives the video URL.

{% hint style="info" %}
This model produces highly detailed and natural-looking videos, so generation may take around 5–6 minutes for a 5-second video and 11-14 minutes for a 10-second video.
{% endhint %}

{% tabs %}
{% tab title="Python" %}
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
        "model": "klingai/v2-master-image-to-video",
        "prompt": "Mona Lisa puts on glasses with her hands.",
        "image_url": "https://s2-111386.kwimgs.com/bs2/mmu-aiplatform-temp/kling/20240620/1.jpeg",
        "duration": "5",       
    }
 
    response = requests.post(url, json=data, headers=headers)
    
    if response.status_code >= 400:
        print(f"Error: {response.status_code} - {response.text}")
    else:
        response_data = response.json()
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
{% endtab %}
{% endtabs %}

<details>

<summary>Response</summary>

{% code overflow="wrap" %}
```json5
Gen_ID:   88a64d31-cce4-41e8-b9d8-5392e8c2a6d4:kling-video/v2/master/image-to-video
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
Processing complete:/n {'id': '88a64d31-cce4-41e8-b9d8-5392e8c2a6d4:kling-video/v2/master/image-to-video', 'status': 'completed', 'video': {'url': 'https://cdn.aimlapi.com/eagle/files/kangaroo/iKWC3BJOdav7Cy8cWSO9k_output.mp4', 'content_type': 'video/mp4', 'file_name': 'output.mp4', 'file_size': 5150376}}
```
{% endcode %}

</details>

<details>

<summary>Generated Video</summary>

**Original**: [784x1172](https://drive.google.com/file/d/1CtkWU6zvsTZj5O82dWnp42tcfRWSDWyH/view?usp=sharing)

**Low-res GIF preview**:

<figure><img src="../../../.gitbook/assets/kling-master-monalisa.gif" alt=""><figcaption><p><code>"prompt": "Mona Lisa puts on glasses with her hands."</code></p></figcaption></figure>

</details>

## API Schemas

Generating a video using this model involves sequentially calling two endpoints:&#x20;

* The first one is for creating and sending a video generation task to the server (returns a generation ID).
* The second one is for requesting the generated video from the server using the generation ID received from the first endpoint.&#x20;

Below, you can find two corresponding API schemas and an example with both endpoint calls.

### Create a video generation task and send it to the server

{% openapi-operation spec="kling-v2-master-i2v" path="/v2/generate/video/kling/generation" method="post" %}
[OpenAPI kling-v2-master-i2v](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/video-models/Kling-AI/v2-master-image-to-video.json)
{% endopenapi-operation %}

### Retrieve the generated video from the server

After sending a request for video generation, this task is added to the queue. This endpoint lets you check the status of a video generation task using its `generation_id`, obtained from the endpoint described above.\
If the video generation task status is `complete`, the response will include the final result — with the generated video URL and additional metadata.

{% openapi-operation spec="kling-fetch" path="/v2/generate/video/kling/generation" method="get" %}
[OpenAPI kling-fetch](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/video-models/Kling-AI/v1.6-standard-effects-pair.json)
{% endopenapi-operation %}
