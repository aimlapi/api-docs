# gen4\_aleph

{% hint style="info" %}
This documentation is valid for the following list of our models:

* `runway/gen4_aleph`
{% endhint %}

This is a video-to-video model capable of either modifying the input video or generating the next shot in a story that begins in the input and continues based on your prompt. You can define camera angles and movements, alter the plot, change character appearances, or adjust the environment.

## How to Make a Call

<details>

<summary>Step-by-Step Instructions</summary>

### :digit\_one:  Setup You Can’t Skip

:black\_small\_square:  [**Create an Account**](https://aimlapi.com/app/sign-up): Visit the AI/ML API website and create an account (if you don’t have one yet).\
:black\_small\_square:  [**Generate an API Key**](https://aimlapi.com/app/keys): After logging in, navigate to your account dashboard and generate your API key. Ensure that key is enabled on UI.

### :digit\_two:  Copy the code example

At the bottom of this page, you'll find [a code example](gen4_aleph.md#full-example-generating-and-retrieving-the-video-from-the-server) that shows how to structure the request. Choose the code snippet in your preferred programming language and copy it into your development environment.

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

Only `video_url` and `prompt` are required parameters for this model (and we’ve already filled it in for you in the example), but you can include optional parameters if needed to adjust the model’s behavior. Below, you can find the corresponding [API schema](gen4_aleph.md#api-schemas) ("Video Generation"), which lists all available parameters along with notes on how to use them.

### :digit\_five:  Run your modified code

Run your modified code in your development environment. Response time depends on various factors, but for simple prompts it rarely exceeds a minute.

{% hint style="success" %}
If you need a more detailed walkthrough for setting up your development environment and making a request step by step — feel free to use our [Quickstart guide](../../../quickstart/setting-up.md).
{% endhint %}

</details>

## Full Example: Generating and Retrieving the Video From the Server

<details>

<summary>How it works</summary>

Let’s take a video of our running raccoon and ask Aleph to add a small fairy riding on its back. Here’s the prompt we can use:

_`"`_`Add a small fairy as a rider on the raccoon’s back. She must have a black-and-golden face and a cloak in the colors of a dark emerald tropical butterfly with bright blue shimmering spots.`_`"`_

We combine both methods above in one program: first it sends a video generation request to the server, then it checks for results every 10 seconds.&#x20;

{% hint style="warning" %}
Don’t forget to replace `<YOUR_AIMLAPI_KEY>` with your actual AI/ML API key from your [API Key management page](https://aimlapi.com/app/keys/)!
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
        "model": "runway/gen4_aleph",
        "video_url":"https://zovi0.github.io/public_misc/kling-v2-master-t2v-racoon.mp4",
        "prompt":'''
            Add a small fairy as a rider on the raccoon’s back. She must have a black-and-golden face and a cloak in the colors of a dark emerald tropical butterfly with bright blue shimmering spots.
        '''
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
{'id': '6d6c768f-702e-4737-a3c9-0c6c6f4fec0a', 'status': 'queued'}
Generation ID:   6d6c768f-702e-4737-a3c9-0c6c6f4fec0a
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
Processing complete:/n {'id': '6d6c768f-702e-4737-a3c9-0c6c6f4fec0a', 'status': 'completed', 'video': ['https://cdn.aimlapi.com/wolf/cbd4bc0a-e4dd-45be-abb4-fa95b014dc46.mp4?_jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXlIYXNoIjoiY2YzNmNmZDVkMDcwZDcxNyIsImJ1Y2tldCI6InJ1bndheS10YXNrLWFydGlmYWN0cyIsInN0YWdlIjoicHJvZCIsImV4cCI6MTc1NTA0MzIwMH0.nsiluZQnDhkSr5peYkbNFLeUxn7vJ59C1ablCEm9CSI']}
```
{% endcode %}

</details>

**Processing time**: \~3 min 30 sec. \
**Original**: [1280×720](https://drive.google.com/file/d/1x_AYR09NphtcDpBykCx8u4Kq7AAdgJIt/view?usp=sharing)\
**Low-res GIF preview**:

<table data-full-width="false"><thead><tr><th>Reference Video</th><th>Generated (Edited) Video</th></tr></thead><tbody><tr><td><div><figure><img src="../../../.gitbook/assets/енто и секвойи.gif" alt=""><figcaption></figcaption></figure></div></td><td><div><figure><img src="../../../.gitbook/assets/runway-aleph-preview.gif" alt=""><figcaption></figcaption></figure></div></td></tr></tbody></table>

## API Schemas

### Video Generation

You can generate a video using this API. In the basic setup, you need only a video URL and a prompt.

{% openapi-operation spec="runway-gen4-aleph" path="/v2/generate/video/runway/generation" method="post" %}
[OpenAPI runway-gen4-aleph](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/video-models/runway/gen4_aleph.json)
{% endopenapi-operation %}

### Retrieve the generated video from the server

After sending a request for video generation, this task is added to the queue. This endpoint lets you check the status of a video generation task using its `id`, obtained from the endpoint described above.\
If the video generation task status is `complete`, the response will include the final result — with the generated video URL and additional metadata.

{% openapi-operation spec="runway-fetch" path="/v2/generate/video/runway/generation" method="get" %}
[OpenAPI runway-fetch](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/video-models/runway/gen4_turbo-pair.json)
{% endopenapi-operation %}
