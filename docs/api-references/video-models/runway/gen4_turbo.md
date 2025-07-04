# gen4\_turbo

{% hint style="info" %}
This documentation is valid for the following list of our models:

* `runway/gen4_turbo`
{% endhint %}

## Overview

This release brings faster, more scalable AI video generation with higher visual quality. This version allows for 10-second video generation. Gen4 Turbo delivers realistic motion, coherent subjects and styles across frames, and high prompt fidelity, supported by strong world modeling.

## How to Make a Call

<details>

<summary>Step-by-Step Instructions</summary>

### :digit\_one:  Setup You Can’t Skip

:black\_small\_square:  [**Create an Account**](https://aimlapi.com/app/sign-up): Visit the AI/ML API website and create an account (if you don’t have one yet).\
:black\_small\_square:  [**Generate an API Key**](https://aimlapi.com/app/keys): After logging in, navigate to your account dashboard and generate your API key. Ensure that key is enabled on UI.

### &#x20;:digit\_two:  Copy the code example

At the bottom of this page, you'll find [a code example](gen4_turbo.md#full-example-generating-and-retrieving-the-video-from-the-server) that shows how to structure the request. Choose the code snippet in your preferred programming language and copy it into your development environment.

{% hint style="success" %}
Generating a video using this model involves sequentially calling two endpoints:&#x20;

* The first one is for creating and sending a video generation task to the server (returns a generation ID).
* The second one is for requesting the generated video from the server using the generation ID received from the first endpoint.&#x20;

The code example combines both endpoint calls.
{% endhint %}

### :digit\_three:  Modify the code example

:black\_small\_square:  Replace `<YOUR_AIMLAPI_KEY>` with your actual AI/ML API key from your account.\
:black\_small\_square:  Insert your instructions into the `prompt` field—this is what the model will do with the image.

### :digit\_four:  <sup><sub><mark style="background-color:yellow;">(Optional)<mark style="background-color:yellow;"><sub></sup> Adjust other optional parameters if needed

Only `image_url` is a required parameter for this model (and we’ve already filled it in for you in the example), but you can include optional parameters if needed to adjust the model’s behavior. Below, you can find the corresponding [API schema](gen4_turbo.md#api-schemas) ("Video Generation"), which lists all available parameters along with notes on how to use them.

### :digit\_five:  Run your modified code

Run your modified code in your development environment. Response time depends on various factors, but for simple prompts it rarely exceeds a minute.

{% hint style="success" %}
If you need a more detailed walkthrough for setting up your development environment and making a request step by step — feel free to use our [Quickstart guide](../../../quickstart/setting-up.md).
{% endhint %}

</details>

## API Schemas

### Video Generation

You can generate a video using this API. In the basic setup, you need only an image URL and the aspect ratio of the desired result. The model can detect and use the aspect ratio from the input image, but for correct operation in this case, the image's width-to-height ratio must be between `0.5` and `2`.

{% openapi src="https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/video-models/runway/gen4_turbo.json" path="/v2/generate/video/runway/generation" method="post" %}
[https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/video-models/runway/gen4_turbo.json](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/video-models/runway/gen4_turbo.json)
{% endopenapi %}

### Retrieve the generated video from the server

After sending a request for video generation, this task is added to the queue. This endpoint lets you check the status of a video generation task using its `id`, obtained from the endpoint described above.\
If the video generation task status is `complete`, the response will include the final result — with the generated video URL and additional metadata.

{% openapi src="https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/video-models/runway/gen4_turbo-pair.json" path="/v2/generate/video/runway/generation" method="get" %}
[https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/video-models/runway/gen4_turbo-pair.json](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/video-models/runway/gen4_turbo-pair.json)
{% endopenapi %}

## Full Example: Generating and Retrieving the Video From the Server

Let’s take a beautiful but somewhat barren mountain landscape:

<figure><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Liebener_Spitze_SW.JPG/1280px-Liebener_Spitze_SW.JPG" alt=""><figcaption><p><a href="https://commons.wikimedia.org/wiki/File:Liebener_Spitze_SW.JPG">commons.wikimedia.org</a></p></figcaption></figure>

Then ask Gen4 Turbo to populate it with an epic reptilian creature using the following prompt:

_<mark style="background-color:blue;">"A menacing evil dragon appears in a distance above the tallest mountain, then rushes toward the camera with its jaws open, revealing massive fangs. We see it's coming"</mark>_

We combine both methods above in one program: first it sends a video generation request to the server, then it checks for results every 10 seconds.&#x20;

{% hint style="warning" %}
Don’t forget to replace `<YOUR_AIMLAPI_KEY>` with your actual AI/ML API key from your [API Key management page](https://aimlapi.com/app/keys/) — in **both** places in the code!
{% endhint %}

{% code overflow="wrap" %}
```python
import time
import requests

# Creating and sending a video generation task to the server (returns a generation ID)
def generate_video():
    url = "https://api.aimlapi.com/v2/generate/video/runway/generation"
    payload = {
        "model": "runway/gen4_turbo",
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

The following video was generated by running the code example above. Processing time: \~65 sec. \
You may also check out the [original video in 1280×720 resolution](https://drive.google.com/file/d/1vDMftEwlfspfHPbDIpc2FhuirrsyC9B-/view?usp=sharing).

<figure><img src="../../../.gitbook/assets/ezgif-51208c7d200818.gif" alt=""><figcaption><p>Just a humble GIF preview... and yet, somehow still scary!</p></figcaption></figure>
