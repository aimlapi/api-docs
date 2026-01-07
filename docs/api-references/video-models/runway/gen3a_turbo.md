---
description: 'Description of the gen3a_turbo model: Pricing, API Reference, Examples.'
---

# gen3a\_turbo

{% columns %}
{% column width="66.66666666666666%" %}
{% hint style="info" %}
This documentation is valid for the following list of our models:

* `gen3a_turbo`
{% endhint %}
{% endcolumn %}

{% column width="33.33333333333334%" %}
<a href="https://aimlapi.com/app/gen3a_turbo" class="button primary">Try in Playground</a>
{% endcolumn %}
{% endcolumns %}

An advanced AI model designed for converting images into high-quality videos. It allows users to generate dynamic video content with smooth motion and detailed textures from still images or text prompts, significantly enhancing creative workflows in multimedia production.

## Setup your API Key

If you don’t have an API key for the AI/ML API yet, feel free to use our [Quickstart guide](https://docs.aimlapi.com/quickstart/setting-up).

## How to Make a Call

<details>

<summary>Step-by-Step Instructions</summary>

Generating a video using this model involves sequentially calling two endpoints:

* The first one is for creating and sending a video generation task to the server (returns a generation ID).
* The second one is for requesting the generated video from the server using the generation ID received from the first endpoint.

Below, you can find both corresponding API schemas.

</details>

## API Schemas

{% hint style="success" %}
Now, all of our API schemas for video models use our new universal short URL — `https://api.aimlapi.com/v2/video/generations`. \
However, you can still call this model using the legacy URL that includes the vendor name.
{% endhint %}

### Video Generation

You can generate a video using this API. In the basic setup, you need only an image URL and the aspect ratio of the desired result. The model can detect and use the aspect ratio from the input image, but for correct operation in this case, the image's width-to-height ratio must be between `0.5` and `2`.

{% openapi-operation spec="runway-gen3a-turbo" path="/v2/video/generations" method="post" %}
[OpenAPI runway-gen3a-turbo](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/video-models/runway/gen3a_turbo.json)
{% endopenapi-operation %}

### Retrieve the generated video from the server

After sending a request for video generation, this task is added to the queue. This endpoint lets you check the status of a video generation task using its `id`, obtained from the endpoint described above.\
If the video generation task status is `completed`, the response will include the final result — with the generated video URL and additional metadata.

{% openapi-operation spec="universal-video-endpoint-fetch" path="/v2/video/generations" method="get" %}
[OpenAPI universal-video-endpoint-fetch](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/video-models/universal-video-fetch.json)
{% endopenapi-operation %}

## Full Example: Generating and Retrieving the Video From the Server

<details>

<summary>How it works</summary>

Let’s take a beautiful but somewhat barren mountain landscape:

<figure><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Liebener_Spitze_SW.JPG/1280px-Liebener_Spitze_SW.JPG" alt=""><figcaption><p><a href="https://commons.wikimedia.org/wiki/File:Liebener_Spitze_SW.JPG">commons.wikimedia.org</a></p></figcaption></figure>

Then ask Gen4 Turbo to populate it with an epic reptilian creature using the following prompt:

_<mark style="background-color:blue;">"A menacing evil dragon appears in a distance above the tallest mountain, then rushes toward the camera with its jaws open, revealing massive fangs. We see it's coming"</mark>_

We combine both methods above in one program: first it sends a video generation request to the server, then it checks for results every 10 seconds.

{% hint style="warning" %}
Don’t forget to replace `<YOUR_AIMLAPI_KEY>` with your actual AI/ML API key from your [API Key management page](https://aimlapi.com/app/keys/) — in **both** places in the code!
{% endhint %}

</details>

{% tabs %}
{% tab title="Python" %}
{% code overflow="wrap" %}
```python
import time
import requests

# Creating and sending a video generation task to the server (returns a generation ID)
def generate_video():
    url = "https://api.aimlapi.com/v2/generate/video/runway/generation"
    payload = {
        "model": "gen3a_turbo",
        "prompt": "A menacing evil dragon appears in a distance above the tallest mountain, then rushes toward the camera with its jaws open, revealing massive fangs. We see it's coming",
        "ratio": "16:9",
        "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Liebener_Spitze_SW.JPG/1280px-Liebener_Spitze_SW.JPG",
    }
    # Insert your AI/ML API key instead of <YOUR_AIMLAPI_KEY>:
    headers = {"Authorization": "Bearer <YOUR_AIMLAPI_KEY>", "Content-Type": "application/json"}

    response = requests.post(url, json=payload, headers=headers)

    if response.status_code >= 400:
        print(f"Error: {response.status_code} - {response.text}")
    else:
        response_data = response.json()
        print("Generation:", response_data)
        return response_data


# Requesting the result of the generation task from the server using the generation_id:
def retrieve_video(gen_id):
    url = "https://api.aimlapi.com/v2/generate/video/runway/generation"
    params = {
        "generation_id": gen_id,
    }
    # Insert your AI/ML API key instead of <YOUR_AIMLAPI_KEY>:
    headers = {"Authorization": "Bearer <YOUR_AIMLAPI_KEY>", "Content-Type": "application/json"}

    response = requests.get(url, params=params, headers=headers)
    return response.json()
    
    
# This is the main function of the program. From here, we sequentially call the video generation and then repeatedly request the result from the server every 10 seconds:
def main():
    generation_response = generate_video()
    gen_id = generation_response.get("id")
        
    if gen_id:
        start_time = time.time()

        timeout = 600
        while time.time() - start_time < timeout:
            response_data = retrieve_video(gen_id)

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
Generation: {'id': 'd0cddca1-e382-4625-84c9-0817a6441876', 'status': 'queued'}
Still waiting... Checking again in 10 seconds.
Still waiting... Checking again in 10 seconds.
Still waiting... Checking again in 10 seconds.
Still waiting... Checking again in 10 seconds.
Still waiting... Checking again in 10 seconds.
Still waiting... Checking again in 10 seconds.
Still waiting... Checking again in 10 seconds.
Generation complete:/n {'id': 'd0cddca1-e382-4625-84c9-0817a6441876', 'status': 'completed', 'video': ['https://cdn.aimlapi.com/wolf/704dae4c-2ec9-4390-9625-abb52c359c4f.mp4?_jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXlIYXNoIjoiYjNjYzExNDU1YTJmODNmZCIsImJ1Y2tldCI6InJ1bndheS10YXNrLWFydGlmYWN0cyIsInN0YWdlIjoicHJvZCIsImV4cCI6MTc0NDU4ODgwMH0.Jzmu6gPsBTTiZecKxSSwi9qk0-KSaHIgQbIOmCKe0Lk']}
```
{% endcode %}

</details>

The following video was generated by running the code example above. Processing time: \~25 sec.\
You may also check out the [original video in 1280×720 resolution](https://drive.google.com/file/d/1vDMftEwlfspfHPbDIpc2FhuirrsyC9B-/view?usp=sharing).

<div align="left"><figure><img src="../../../.gitbook/assets/run3a_turbo_preview.gif" alt=""><figcaption><p>"What... the hell are you?" (c)</p></figcaption></figure></div>
