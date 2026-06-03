---
layout:
  width: wide
  title:
    visible: true
  description:
    visible: true
  tableOfContents:
    visible: true
  outline:
    visible: true
  pagination:
    visible: true
  metadata:
    visible: true
  tags:
    visible: true
  actions:
    visible: true
---

# MAI-Transcribe 1.5

{% columns %}
{% column width="66.66666666666666%" %}
{% hint style="info" %}
This documentation is valid for the following list of our models:

* `microsoft/mai-transcribe-1.5`
{% endhint %}
{% endcolumn %}

{% column width="33.33333333333334%" %}
<a href="https://aimlapi.com/app/microsoft/mai-transcribe-1.5" class="button primary">Try in Playground</a>
{% endcolumn %}
{% endcolumns %}

## Model Overview

MAI-Transcribe 1.5 — speech-to-text model from Microsoft. Supports multilingual transcription, automatic language detection, and punctuation restoration.

## Setup your API Key

If you don't have an API key for the AI/ML API yet, feel free to use our [Quickstart guide](https://docs.aimlapi.com/quickstart/setting-up).

## API Schemas

#### Creating and sending a speech-to-text conversion task to the server

{% openapi-operation spec="microsoft-mai-transcribe-1-5" path="/v1/stt/create" method="post" %}
[OpenAPI microsoft-mai-transcribe-1-5](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/speech-models/Microsoft/mai-transcribe-1.5.json)
{% endopenapi-operation %}

#### Requesting the result of the task from the server using the generation\_id

{% openapi-operation spec="universal-stt-fetch" path="/v1/stt/{generation_id}" method="get" %}
[OpenAPI universal-stt-fetch](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/speech-models/universal-stt-fetch.json)
{% endopenapi-operation %}

## Code Example: Processing a Speech Audio File via URL

Let's use the `microsoft/mai-transcribe-1.5` model to transcribe the following audio fragment:

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
        "model": "microsoft/mai-transcribe-1.5",
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
      model: "microsoft/mai-transcribe-1.5",
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
{'generation_id': 'XY3D-mYpFxC-WIx-Lv3wh', 'status': 'queued'}
Status: queued. Checking again in 10 seconds.
Processing complete:
{
  "text": "He doesn't belong to you, and I don't see how you have anything to do with what is be his power yet. He's he is only that from this stage to you.",
  "usage": {
    "seconds": 11,
    "cost": 0.0011
  }
}
```
{% endcode %}

</details>
