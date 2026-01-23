# gpt-4o-transcribe

{% hint style="info" %}
This documentation is valid for the following list of our models:

* `openai/gpt-4o-transcribe`
{% endhint %}

{% hint style="success" %}
Note:

Previously, our STT models operated via a single API call to `POST https://api.aimlapi.com/v1/stt`. You can view the API schema [here](../stt-legacy.md).

Now, we are switching to a new two-step process:

* `POST https://api.aimlapi.com/v1/stt/create` – Creates and submits a speech-to-text processing task to the server. This method accepts the same parameters as the old version but returns a `generation_id` instead of the final transcript.
* `GET https://api.aimlapi.com/v1/stt/{generation_id}` – Retrieves the generated transcript from the server using the `generation_id` obtained from the previous API call.

This approach helps prevent generation failures due to timeouts.\
We've prepared [a couple of examples](gpt-4o-transcribe.md#quick-code-examples) below to make the transition to the new STT API easier for you.
{% endhint %}

## Model Overview

A speech-to-text model based on GPT-4o for audio transcription. It provides improved word error rates and more accurate language recognition compared to the original Whisper models. Recommended for use cases that require higher transcription accuracy.

{% hint style="success" %}
OpenAI STT models are priced based on tokens, similar to chat models. In practice, this means the cost primarily depends on the duration of the input audio.
{% endhint %}

## Setup your API Key

If you don’t have an API key for the AI/ML API yet, feel free to use our [Quickstart guide](https://docs.aimlapi.com/quickstart/setting-up).

## API Schemas

#### Creating and sending a speech-to-text conversion task to the server

{% openapi-operation spec="gpt-4o-transcribe" path="/v1/stt/create" method="post" %}
[OpenAPI gpt-4o-transcribe](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/speech-models/OpenAI/gpt-4o-transcribe.json)
{% endopenapi-operation %}

#### Requesting the result of the task from the server using the generation\_id

{% openapi-operation spec="stt-fetch" path="/v1/stt/{generation_id}" method="get" %}
[OpenAPI stt-fetch](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/speech-models/Deepgram/nova-2-pair.json)
{% endopenapi-operation %}

## Code Example: Processing a Speech Audio File via URL

Let's use the `openai/gpt-4o-transcribe` model to transcribe the following audio fragment:

{% embed url="https://drive.google.com/file/d/1ZN-28NUbK1TXHt6oEPj42zUJCv82e9L4/view?usp=sharing" %}

{% tabs %}
{% tab title="Python" %}
{% code overflow="wrap" %}
```python
import requests
import time
import json

base_url = "https://api.aimlapi.com/v1"
# Insert your AIML API Key instead of <YOUR_AIMLAPI_KEY>:
api_key = "<YOUR_AIMLAPI_KEY>"

# Create and send a speech-to-text conversion task to the server
def create_stt():
    url = f"{base_url}/stt/create"
    headers = {
        "Authorization": f"Bearer {api_key}", 
    }
    data = {
        "model": "openai/gpt-4o-transcribe",
        "url": "https://audio-samples.github.io/samples/mp3/blizzard_primed/sample-0.mp3"
    }
 
    response = requests.post(url, json=data, headers=headers)
    if response.status_code >= 400:
        print(f"Error: {response.status_code} - {response.text}")
    else:
        response_data = response.json()
        print(response_data)
        return response_data

# Request the result of the task from the server using the generation_id
def get_stt(gen_id):
    url = f"{base_url}/stt/{gen_id}"
    headers = {
        "Authorization": f"Bearer {api_key}", 
    }
    response = requests.get(url, headers=headers)
    return response.json()
    
# Start the generation, then repeatedly request the result from the server every 10 sec.
def main():
    stt_response = create_stt()
    gen_id = stt_response.get("generation_id")

    if gen_id:
        start_time = time.time()

        timeout = 600
        while time.time() - start_time < timeout:
            response_data = get_stt(gen_id)

            if response_data is None:
                print("Error: No response from API")
                break
        
            status = response_data.get("status")

            if status in ["queued", "generating"]:
                print(f"Status: {status}. Checking again in 10 seconds.")
                time.sleep(10)
            else:
                # data = .json()
                print("Processing complete:")
                print(json.dumps(response_data["result"], indent=2, ensure_ascii=False))
                return response_data
   
        print("Timeout reached. Stopping.")
        return None     


if __name__ == "__main__":
    main()
```
{% endcode %}
{% endtab %}

{% tab title="JS" %}
{% code overflow="wrap" %}
```javascript
const baseUrl = "https://api.aimlapi.com/v1";
// Insert your AIML API Key instead of <YOUR_AIMLAPI_KEY>:
const apiKey = "<YOUR_AIMLAPI_KEY>";

// Create and send a speech-to-text conversion task to the server
async function createSTT() {
  const url = `${baseUrl}/stt/create`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "openai/gpt-4o-transcribe",
      url: "https://audio-samples.github.io/samples/mp3/blizzard_primed/sample-0.mp3",
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    console.error(`Error: ${response.status} - ${text}`);
    return null;
  }

  const data = await response.json();
  console.log(data);
  return data;
}

// Request the result of the task from the server using the generation_id
async function getSTT(genId) {
  const url = `${baseUrl}/stt/${genId}`;

  const response = await fetch(url, {
    headers: {
      "Authorization": `Bearer ${apiKey}`,
    },
  });

  if (!response.ok) {
    return null;
  }

  return response.json();
}

// Start generation and poll every 10s
async function main() {
  const sttResponse = await createSTT();
  const genId = sttResponse?.generation_id;

  if (!genId) {
    console.error("No generation_id received");
    return null;
  }

  const startTime = Date.now();
  const timeoutMs = 600 * 1000; // 10 minutes

  while (Date.now() - startTime < timeoutMs) {
    const responseData = await getSTT(genId);

    if (!responseData) {
      console.error("Error: No response from API");
      return null;
    }

    const status = responseData.status;

    if (status === "queued" || status === "generating") {
      console.log(`Status: ${status}. Checking again in 10 seconds.`);
      await new Promise(resolve => setTimeout(resolve, 10_000));
    } else {
      console.log("Processing complete:");
      console.log(JSON.stringify(responseData.result, null, 2));
      return responseData;
    }
  }

  console.log("Timeout reached. Stopping.");
  return null;
}

main();
```
{% endcode %}
{% endtab %}
{% endtabs %}

<details>

<summary>Response</summary>

{% code overflow="wrap" %}
```
{'generation_id': 'RlLz0hRdAs9voL5Qi1Pzr', 'status': 'queued'}
Status: queued. Checking again in 10 seconds.
Processing complete:
{
  "text": "He doesn't belong to you, and I don't see how you have anything to do with what is be his power. He's he personally that from this stage to you.",
  "usage": {
    "type": "tokens",
    "total_tokens": 135,
    "input_tokens": 100,
    "input_token_details": {
      "text_tokens": 0,
      "audio_tokens": 100
    },
    "output_tokens": 35
  }
}
```
{% endcode %}

</details>
