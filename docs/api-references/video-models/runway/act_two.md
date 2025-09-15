# act\_two

{% hint style="info" %}
This documentation is valid for the following list of our models:

* `runway/act_two`
{% endhint %}

## Overview

This video-to-video model lets you animate characters using reference performance videos. Simply provide a video of someone acting out a scene along with a character reference (image or video), and Act-Two will transfer the performance to your character — including natural motion, speech, and facial expressions.

## How to Make a Call

<details>

<summary>Step-by-Step Instructions</summary>

### :digit\_one:  Setup You Can’t Skip

:black\_small\_square:  [**Create an Account**](https://aimlapi.com/app/sign-up): Visit the AI/ML API website and create an account (if you don’t have one yet).\
:black\_small\_square:  [**Generate an API Key**](https://aimlapi.com/app/keys): After logging in, navigate to your account dashboard and generate your API key. Ensure that key is enabled on UI.

### :digit\_two:  Copy the code example

At the bottom of this page, you'll find [a code example](act_two.md#full-example-generating-and-retrieving-the-video-from-the-server) that shows how to structure the request. Choose the code snippet in your preferred programming language and copy it into your development environment.

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

Only `character` and `reference` are required parameter for this model (and we’ve already filled it in for you in the example), but you can include optional parameters if needed to adjust the model’s behavior. Below, you can find the corresponding [API schema](act_two.md#api-schemas) ("Video Generation"), which lists all available parameters along with notes on how to use them.

### :digit\_five:  Run your modified code

Run your modified code in your development environment. Response time depends on various factors, but for simple prompts it rarely exceeds a minute.

{% hint style="success" %}
If you need a more detailed walkthrough for setting up your development environment and making a request step by step — feel free to use our [Quickstart guide](../../../quickstart/setting-up.md).
{% endhint %}

</details>



## API Schemas

### Video Generation

You can generate a video using this API. In the basic setup, you only need an image or video URL for the character (`character`), and a video URL for body movements and/or facial expressions (`reference`).

{% openapi-operation spec="runway-act-two" path="/v2/generate/video/runway/generation" method="post" %}
[OpenAPI runway-act-two](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/video-models/runway/act_two.json)
{% endopenapi-operation %}

### Retrieve the generated video from the server

After sending a request for video generation, this task is added to the queue. This endpoint lets you check the status of a video generation task using its `id`, obtained from the endpoint described above.\
If the video generation task status is `complete`, the response will include the final result — with the generated video URL and additional metadata.

{% openapi-operation spec="runway-fetch" path="/v2/generate/video/runway/generation" method="get" %}
[OpenAPI runway-fetch](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/video-models/runway/gen4_turbo-pair.json)
{% endopenapi-operation %}

## Full Example: Generating and Retrieving the Video From the Server

<details>

<summary>How it works</summary>

As the character reference, we will use a scan of a famous Leonardo da Vinci painting. For the motion reference, we will use a video of a cheerful woman dancing, generated with the [kling-video/v1.6/pro/text-to-video](../kling-ai/v1.6-pro-text-to-video.md) model.

| Character reference image                                                                                       | Motion reference video                                                                                                                          |
| --------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| <div><figure><img src="../../../.gitbook/assets/mona-lisa.jpeg" alt=""><figcaption></figcaption></figure></div> | <p></p><div align="left"><figure><img src="../../../.gitbook/assets/runway-act-two-preview.gif" alt=""><figcaption></figcaption></figure></div> |

We combine both POST and GET methods above in one program: first it sends a video generation request to the server, then it checks for results every 10 seconds.

{% hint style="warning" %}
Don’t forget to replace `<YOUR_AIMLAPI_KEY>` with your actual AI/ML API key from your [API Key management page](https://aimlapi.com/app/keys/) — in **both** places in the code!
{% endhint %}

</details>

{% tabs %}
{% tab title="Python" %}
{% code overflow="wrap" %}
```python
import requests
import time

# replace <YOUR_AIMLAPI_KEY> with your actual AI/ML API key
api_key = "<YOUR_AIMLAPI_KEY>"
base_url = "https://api.aimlapi.com/v2"

# Creating and sending a video generation task to the server
def generate_video():
    url = f"{base_url}/generate/video/runway/generation"
    headers = {
        "Authorization": f"Bearer {api_key}", 
    }

    data = {
        "model": "runway/act_two",
        "character":
            {
                "type":"image",
                "url":"https://s2-111386.kwimgs.com/bs2/mmu-aiplatform-temp/kling/20240620/1.jpeg"
            },
        "reference":
            {
                "type":"video",
                "url": "https://zovi0.github.io/public_misc/kling-video-v1.6-pro-text-to-video-dancing-woman-output.mp4"
            },
        "frame_size":"1280:720",
        "body_control":True,
        "expression_intensity":3
    }

    response = requests.post(url, json=data, headers=headers)
    
    if response.status_code >= 400:
        print(f"Error: {response.status_code} - {response.text}")
    else:
        response_data = response.json()
        print(response_data)
        return response_data
    

# Requesting the result of the task from the server using the generation_id
def get_video(gen_id):
    url = f"{base_url}/generate/video/runway/generation"
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
    gen_id = gen_response.get("id")
    print("Generation ID:  ", gen_id)

    # Trying to retrieve the video from the server every 10 sec
    if gen_id:
        start_time = time.time()
        timeout = 1800
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
{'id': 'dbf7a50e-87b2-4ba5-921f-f02fdb8f7cc6', 'status': 'queued'}
Generation ID:   dbf7a50e-87b2-4ba5-921f-f02fdb8f7cc6
Status: generating
Still waiting... Checking again in 10 seconds.
Status: generating
Still waiting... Checking again in 10 seconds.
Status: generating
Still waiting... Checking again in 10 seconds.
Status: generating
Still waiting... Checking again in 10 seconds.
Status: completed
Processing complete:/n {'id': 'dbf7a50e-87b2-4ba5-921f-f02fdb8f7cc6', 'status': 'completed', 'video': ['https://cdn.aimlapi.com/wolf/d462f7e3-bdc6-43ac-8c2a-ac2d61dea014.mp4?_jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXlIYXNoIjoiNzZmNzY0NDRiZTViYWI2YyIsImJ1Y2tldCI6InJ1bndheS10YXNrLWFydGlmYWN0cyIsInN0YWdlIjoicHJvZCIsImV4cCI6MTc1NDc4NDAwMH0._q7rh2fmm7a16k7UHAnDh3aUOIy-fT8NJO3hP-KT4_s']}
```
{% endcode %}

</details>

The following video was generated by running the code example above. \
Processing time: \~45 sec. \
Original: [784×1168](https://drive.google.com/file/d/1QzqNY6tZdyDh1P5mn3_7QsAPOeoUqtYA/view?usp=sharing)&#x20;

<div align="left"><figure><img src="../../../.gitbook/assets/runway-act-two-preview (1).gif" alt=""><figcaption><p>Low-resolution GIF preview</p></figcaption></figure></div>
