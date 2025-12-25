# gpt-4o-audio-preview

{% columns %}
{% column width="66.66666666666666%" %}
{% hint style="info" %}
This documentation is valid for the following list of our models:

* `gpt-4o-audio-preview`
{% endhint %}
{% endcolumn %}

{% column width="33.33333333333334%" %}
<a href="https://aimlapi.com/app/gpt-4o-audio-preview" class="button primary">Try in Playground</a>
{% endcolumn %}
{% endcolumns %}

## Model Overview

A text model with a support for audio prompts and the ability to generate spoken audio responses. This expansion enhances the potential for AI applications in text and voice-based interactions and audio analysis. You can choose from a wide range of audio formats for output and specify the voice the model will use for audio responses.

## Setup your API Key

If you don’t have an API key for the AI/ML API yet, feel free to use our [Quickstart guide](https://docs.aimlapi.com/quickstart/setting-up).

## API Schema

{% openapi-operation spec="gpt-4o-audio-preview" path="/v1/chat/completions" method="post" %}
[OpenAPI gpt-4o-audio-preview](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/text-models-llm/OpenAI/gpt-4o-audio-preview.json)
{% endopenapi-operation %}

## Code Example

{% tabs %}
{% tab title="Python" %}
{% code overflow="wrap" %}
```python
from openai import OpenAI
import base64
import os

client = OpenAI(
    base_url = "https://api.aimlapi.com",
    # Insert your AI/ML API key instead of <YOUR_AIMLAPI_KEY>:
    api_key = "<YOUR_AIMLAPI_KEY>"
)

def main():
    response = client.chat.completions.create(
        model="gpt-4o-audio-preview",
        modalities=["text", "audio"],
        audio={"voice": "alloy", "format": "wav"},
        messages=[
            {
                "role": "system",
                "content": "Speak english" # Your instructions for the model
            },
            {   
                "role": "user",
                "content": "Hello" # Your question (insert it istead of Hello)
            }
        ],
        max_tokens=6000,  
    )

    wav_bytes = base64.b64decode(response.choices[0].message.audio.data)
    with open("audio.wav", "wb") as f:
        f.write(wav_bytes)
    dist = os.path.abspath("audio.wav")
    print("Audio saved to:", dist)
     
if __name__ == "__main__":
    main()
```
{% endcode %}
{% endtab %}
{% endtabs %}

<details>

<summary>Response</summary>

{% hint style="warning" %}
We’ve omitted 99% of the base64-encoded file for brevity — even for such a short model response, it’s still extremely large.
{% endhint %}

{% code overflow="wrap" %}
```json5
ChatCompletion(id='chatcmpl-BrgY0KMxWgy1EHUxYJC49MuMNmdOP', choices=[Choice(finish_reason='stop', index=0, logprobs=None, message=ChatCompletionMessage(content=None, refusal=None, role='assistant', annotations=[], audio=ChatCompletionAudio(id='audio_686f73ecf0648191a602c4f315cad928', data='UklGRv////9XQVZFZm10IBAAAAABAAEAwF0AAIC7AAACABAAZGF0Yf////8YABAAEgAXABEAFwASABQAFQAVABcADAAPAAsAEgAOABEACwANABAACgALAAMADQAHABAACAAKAAcACgAFAAQACAAHAAUABQAFAAIACAAAAAgA/v8BAP7////8//b/AQD1/wMA9P/9//X/+f/3//H/+v/1//3/6v/5/+n/9P/u//X/8v/w//P/7v/z/+v/9f/q//T/6//r/+r/6P/s/+P/7P/l/+b/4f/g/+X/3//m/9//6f/l/+X/6f/e/+r/3//l/9n/3f/g/9r/2//V/9z/1P/g/93/4//f/+T/5//q/+X/4//h/9v/3f/X/97/0//Z/9L/2v/Z/9v/2//f/+X/4P/k/+P/4v/h/+H/3P/i/9//3P/f/9n/3f/d/+P/3f/k/97/5P/g/+n/5f/p/+r/6//n/+z/7f/t//D/6//v/+v/6v/m/+L/4v/n/+r/6P/u/+7/9v/7/wEAAQAAAP7/+P/6//L/7v/o/+H/5f/b/+f/4v/1//L///8EAAIADQAJABkADwARAAoADAABAP7/+//5//n/9f8AAPr/BAD//AwABAAYA//8CAP3/AgABAAUABAD8/wQAAQAFAP7/BAABAAEA/////wIAAAADAAIA/v/+//z////7/wEA/P8AAP///v8EAPz//P/9/wQAAQD8/wAAAQD///z/AgD7//7/+/8AAAAA+/8AAP3//v/9/wUAAwD///7/AwACAAIAAgAAAPv/AQD8/wYAAgD7//r/AgABAAAABQD5/wUAAgADAP//AQAFAPn/AQD7/wYA+//9//n//v/7//r/AAD8/wMA//8BAP//AwD9/wMA/f/+//z/+//9//n//v/+/wQAAgACAP7/AwD//wEAAAD8//v/AgD6/wQA/f8AAPn/AAD9//z/AQD//wEA/P/6//7//P/+//7//P8AAPj//P///wIA+v/9/wAA+/8CAP///f/9//r/BQD+/wgAAAADAP3/AQACAAMABAD8/wEA+/8GAP3//v/6/wIA///9/wEA+v8EAPf/AAD5/wUA9/8AAAAA/P8AAPn/AQD3/wMA/P/8//3//v//////AAD8/////P8CAP//BAD7/wUA/P8CAP3///8AAPn/AwD3/wkA/f8FAPr/AwD9//3/AQD1/wEA+//+//v/AwADAAAA///9/wIA/f8DAPz//P/9///////6//7//f8AAAAAAQD+//v/AQD7/////P8AAP7//v////r//v8BAAQA+v/+//z//P8AAP7/AwD8/wAAAQD4/////v8DAP7///8AAPz//P/7/wIA///8//z//f/8//z/AQD8//v//f/7//v/+f/8//z/+/////z//v8AAAAA/v/6/wAA/f8AAPj/AAD+/wIAAgD5//3//P/+//r//v///wAA///9/////                                                                                                                                                     !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!WE’VE OMITTED 90% OF THE BASE64-ENCODED FILE FOR BREVITY — EVEN FOR SUCH A SHORT MODEL RESPONSE, IT’S STILL EXTREMELY LARGE.                                    !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!wUAAwAFAAQABgACAAIAAgACAAYAAwAFAAEAAQD///7/AAACAAQAAAD+////AQAAAP//AQADAAMAAgADAAIAAAACAAUABQADAAUABgAGAAcABgAGAAUABQAFAAYABQAFAAgABwAKAAoABwAJAAUABwAIAAgACQAGAAgABQAJAAcABwAJAAcACgAGAAgABAAEAAMAAgAGAAQABAADAAYABQAEAAYAAwAFAAIAAwAGAAYABQADAAQAAAABAAEAAgACAAEAAAD8/////f/+//r/+f/5//f/+P/2//j/9//7//j//P/7//z/+v/6//z/+P/6//f/+//6//r/+v/4//v/+v/6//r//f/6//n//f/8//3/+//9//3////9//3//f/8//v/+/8AAP3//f/6//r//v/6//z/9//6//j/+f/4//r/+f/3//f/9f/3//L/8f/0//P/9P/1//X/8//1//H/9f/z//b/9v/2//j/9P/2//P/+P/0//f/+P/1//X/9f/2//X/9P/1//L/8v/1//P/9P/1//X/9v/4//X/9v/3//n/+v/6//n/+f/3//r/8f/1//P/8//4//j//f/6//v/+P/+//v/+P////z/AwABAA0AAgAOAAYADgAPAA0ACwAEAAwABAD+//3//v///wAABQAAAA4AFwAGABgAFQAgAAQA8f8BAPj/NQAUAAoAJAAXADsABQD9//v/DwAKABYABQA7AC4A2/8=', expires_at=1752138236, transcript="Hi there! How's it going?"), function_call=None, tool_calls=None))], created=1752134636, model='gpt-4o-audio-preview-2025-06-03', object='chat.completion', service_tier=None, system_fingerprint='fp_b5d60d6081', usage=CompletionUsage(completion_tokens=5838, prompt_tokens=74, total_tokens=5912, completion_tokens_details=CompletionTokensDetails(accepted_prediction_tokens=0, audio_tokens=33, reasoning_tokens=0, rejected_prediction_tokens=0, text_tokens=14), prompt_tokens_details=PromptTokensDetails(audio_tokens=0, cached_tokens=0, text_tokens=14, image_tokens=0)))
```
{% endcode %}

</details>

{% embed url="https://drive.google.com/file/d/1JUWnbhFDwMCW1JqWzkvDXNqI6QNEOuVf/view?usp=sharing" %}
