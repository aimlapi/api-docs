# Lip Sync

{% columns %}
{% column width="66.66666666666666%" %}
{% hint style="info" %}
This documentation is valid for the following list of our models:

* `pixverse/lip-sync`
{% endhint %}
{% endcolumn %}

{% column width="33.33333333333334%" %}
<a href="https://aimlapi.com/app/pixverse/lip-sync" class="button primary">Try in Playground</a>
{% endcolumn %}
{% endcolumns %}

This model generates videos with synchronized audio. For lip-sync input, you may either supply text with a predefined voice, or pass a URL to an external audio file containing speech.

### Setup your API Key

If you don’t have an API key for the AI/ML API yet, feel free to use our [Quickstart guide](https://docs.aimlapi.com/quickstart/setting-up).

### How to Make a Call

<details>

<summary>Step-by-Step Instructions</summary>

Generating a video using this model involves sequentially calling two endpoints:

* The first one is for creating and sending a video generation task to the server (returns a generation ID).
* The second one is for requesting the generated video from the server using the generation ID received from the first endpoint.

Below, you can find both corresponding API schemas.

</details>

### API Schemas

#### Create a video generation task and send it to the server

You can generate a video using this API. In the basic setup, you only need a reference video and a prompt. This endpoint creates and sends a video generation task to the server — and returns a generation ID.

### POST /v2/video/generations

>

```json
{"openapi":"3.0.0","info":{"title":"AIML API","version":"1.0.0"},"servers":[{"url":"https://api.aimlapi.com"}],"paths":{"/v2/video/generations":{"post":{"operationId":"_v2_video_generations","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","properties":{"model":{"type":"string","enum":["pixverse/lip-sync"]},"video_url":{"type":"string","format":"uri","description":"A HTTPS URL pointing to a video or a data URI containing a video. This video will be used as a reference during generation."},"audio_url":{"type":"string","format":"uri","description":"A direct link to an online audio file or a Base64-encoded local to an audio file used for lip-syncing in the video. Use either audio_url or (lip_sync_tts_speaker together with lip_sync_tts_content), but not both."},"lip_sync_tts_content":{"type":"string","description":"The text content to be lip-synced in the video. Use either audio_url or (lip_sync_tts_speaker together with lip_sync_tts_content), but not both."},"lip_sync_tts_speaker":{"type":"string","enum":["Harper","Ava","Isabella","Sophia","Emily","Chloe","Julia","Mason","Jack","Liam","James","Oliver","Adrian","Ethan","Auto"],"description":"A predefined system voice used for generating speech in the video. Use either audio_url or (lip_sync_tts_speaker together with lip_sync_tts_content), but not both."}},"required":["model","video_url"],"title":"pixverse/lip-sync"}}}},"responses":{"200":{"content":{"application/json":{"schema":{"type":"object","properties":{"id":{"type":"string","description":"The ID of the generated video."},"status":{"type":"string","enum":["queued","generating","completed","error"],"description":"The current status of the generation task."},"video":{"type":"object","nullable":true,"properties":{"url":{"type":"string","format":"uri","description":"The URL where the file can be downloaded from."}},"required":["url"]},"error":{"type":"object","nullable":true,"properties":{"name":{"type":"string"},"message":{"type":"string"}},"required":["name","message"],"description":"Description of the error, if any."},"meta":{"type":"object","nullable":true,"properties":{"usage":{"type":"object","nullable":true,"properties":{"credits_used":{"type":"number","description":"The number of tokens consumed during generation."}},"required":["credits_used"]}},"description":"Additional details about the generation."}},"required":["id","status"]}}}}}}}}}
```

#### Retrieve the generated video from the server

After sending a request for video generation, this task is added to the queue. This endpoint lets you check the status of a video generation task using its `id`, obtained from the endpoint described above.\
If the video generation task status is `completed`, the response will include the final result — with the generated video URL and additional metadata.

### GET /v2/video/generations

>

```json
{"openapi":"3.0.0","info":{"title":"AIML API","version":"1.0.0"},"servers":[{"url":"https://api.aimlapi.com"}],"security":[{"access-token":[]}],"components":{"securitySchemes":{"access-token":{"scheme":"bearer","bearerFormat":"<YOUR_AIMLAPI_KEY>","type":"http","description":"Bearer key","in":"header"}}},"paths":{"/v2/video/generations":{"get":{"operationId":"_v2_video_generations","parameters":[{"name":"generation_id","required":true,"in":"query","schema":{"type":"string"}}],"responses":{"200":{"content":{"application/json":{"schema":{"type":"object","properties":{"id":{"type":"string","description":"The ID of the generated video."},"status":{"type":"string","enum":["queued","generating","completed","error"],"description":"The current status of the generation task."},"video":{"type":"object","nullable":true,"properties":{"url":{"type":"string","format":"uri","description":"The URL where the file can be downloaded from."}},"required":["url"]},"error":{"type":"object","nullable":true,"properties":{"name":{"type":"string"},"message":{"type":"string"}},"required":["name","message"],"description":"Description of the error, if any."},"meta":{"type":"object","nullable":true,"properties":{"usage":{"type":"object","nullable":true,"properties":{"credits_used":{"type":"number","description":"The number of tokens consumed during generation."}},"required":["credits_used"]}},"description":"Additional details about the generation."}},"required":["id","status"]}}}}}}}}}
```

### Full Example: Generating and Retrieving the Video From the Server

The code below creates a video generation task, then automatically polls the server every **15** seconds until it finally receives the video URL.

{% tabs %}
{% tab title="Python" %}
{% code overflow="wrap" %}
```python
import requests
import time

# Insert your AI/ML API key instead of <YOUR_AIMLAPI_KEY>:
api_key = "<YOUR_AIMLAPI_KEY>"

# Creating and sending a video generation task to the server
def generate_video():
    url = "https://api.aimlapi.com/v2/video/generations"
    headers = {
        "Authorization": f"Bearer {api_key}", 
    }

    data = {
        "model": "pixverse/lip-sync",
        "video_url": "https://raw.githubusercontent.com/aimlapi/api-docs/main/reference-files/racoon-in-the-forest.mp4",
        "lip_sync_tts_content": "Through the forest, past the roots — I’ve got to get there fast! No time to stop!",
        "lip_sync_tts_speaker": "Oliver"
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
    url = "https://api.aimlapi.com/v2/video/generations"
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
    gen_id = gen_response.get("id")
    print("Generation ID:  ", gen_id)

    # Try to retrieve the video from the server every 15 sec
    if gen_id:
        start_time = time.time()

        timeout = 1000
        while time.time() - start_time < timeout:
            response_data = get_video(gen_id)

            if response_data is None:
                print("Error: No response from API")
                break

            status = response_data.get("status")
            
            if status in ["queued", "generating"]:
                print(f"Status: {status}. Checking again in 15 seconds.")
                time.sleep(15)
            else:
                print("Processing complete:\n", response_data)
                return response_data

        print("Timeout reached. Stopping.")
        return None     


if __name__ == "__main__":
    main()
```
{% endcode %}
{% endtab %}

{% tab title="JavaScript" %}
{% code overflow="wrap" %}
```javascript
// Insert your AIML API Key instead of <YOUR_AIMLAPI_KEY>
const apiKey = '<YOUR_AIMLAPI_KEY>';

// Creating and sending a video generation task to the server
async function generateVideo() {
  const url = 'https://api.aimlapi.com/v2/video/generations';

  const data = {
    model: 'pixverse/lip-sync',
    video_url: 'https://raw.githubusercontent.com/aimlapi/api-docs/main/reference-files/racoon-in-the-forest.mp4',
    lip_sync_tts_content: 'Through the forest, past the roots — I’ve got to get there fast! No time to stop!',
    lip_sync_tts_speaker: 'Oliver'
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Error: ${response.status} - ${errorText}`);
      return null;
    }

    const responseData = await response.json();
    console.log(responseData);
    return responseData;
  } catch (error) {
    console.error('Request failed:', error);
    return null;
  }
}

// Requesting the result of the task from the server using the generation_id
async function getVideo(genId) {
  const url = new URL('https://api.aimlapi.com/v2/video/generations');
  url.searchParams.append('generation_id', genId);

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
    });

    return await response.json();
  } catch (error) {
    console.error('Error fetching video:', error);
    return null;
  }
}

// Initiates video generation and checks the status every 15 seconds until completion or timeout
async function main() {
    const genResponse = await generateVideo();

    if (!genResponse || !genResponse.id) {
        console.error("No generation ID received.");
        return;
    }

    const genId = genResponse.id;
    console.log("Generation ID:", genId);

    const timeout = 1000 * 1000; // 1000 sec
    const interval = 15 * 1000; // 15 sec
    const startTime = Date.now();

    const checkStatus = async () => {
        if (Date.now() - startTime >= timeout) {
            console.log("Timeout reached. Stopping.");
            return;
        }

        const responseData = await getVideo(genId);

        if (!responseData) {
            console.error("Error: No response from API");
            return;
        }

        const status = responseData.status;

        if (["waiting", "queued", "generating"].includes(status)) {
            console.log(`Status: ${status}. Checking again in 15 seconds.`);
            await new Promise(resolve => setTimeout(resolve, interval));
            return checkStatus();
        } else {
            console.log("Processing complete:\n", responseData);
        }
    };

    await checkStatus();
}

main();
```
{% endcode %}
{% endtab %}
{% endtabs %}

<details>

<summary>Statuses</summary>

<table><thead><tr><th width="169.99993896484375">Status</th><th>Description</th></tr></thead><tbody><tr><td><code>queued</code></td><td>Job is waiting in queue</td></tr><tr><td><code>generating</code></td><td>Video is being generated</td></tr><tr><td><code>completed</code></td><td>Generation successful, video available</td></tr><tr><td><code>error</code></td><td>Generation failed, check <code>error</code> field</td></tr></tbody></table>

</details>

<details>

<summary>Response</summary>

{% code overflow="wrap" %}
```json5
{'id': 'z-IMFJo2ORUJBR7OWIqDM', 'status': 'queued', 'meta': {'usage': {'credits_used': 2000000}}}
Generation ID:   z-IMFJo2ORUJBR7OWIqDM
Status: queued. Checking again in 15 seconds.
Status: generating. Checking again in 15 seconds.
Processing complete:
 {'id': 'z-IMFJo2ORUJBR7OWIqDM', 'status': 'succeeded', 'video': {'url': 'https://cdn.aimlapi.com/panda/pixverse%2Fmp4%2Fmedia%2Fweb%2Fori%2FPUQnIoDi49sKyQ48-vAtQ_seed0.mp4'}}
```
{% endcode %}

</details>

**Processing time**: \~34 sec.

**Generated video** (1280x720, with sound):

{% embed url="https://drive.google.com/file/d/1EkmqzdcH8rc8LOGayFxcCoG1vMCu5IcL/view" %}
