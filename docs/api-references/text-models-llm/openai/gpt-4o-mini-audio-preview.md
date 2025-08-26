# gpt-4o-mini-audio-preview

{% hint style="info" %}
This documentation is valid for the following list of our models:

* `gpt-4o-mini-audio-preview`
{% endhint %}

## Model Overview

A preview release of the smaller GPT-4o Audio mini model. Handles both audio and text as input and output via the REST API. You can choose from a wide range of audio formats for output and specify the voice the model will use for audio responses.

## Setup your API Key

If you don’t have an API key for the AI/ML API yet, feel free to use our [Quickstart guide](https://docs.aimlapi.com/quickstart/setting-up).

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
        model="gpt-4o-mini-audio-preview",
        modalities=["text", "audio"],
        audio={"voice": "alloy", "format": "wav"},
        messages=[
            {
                # Your instructions for the model
                "role": "system",
                "content": "Speak english"
            },
            {   
                # Your question (insert it istead of Hello)
                "role": "user",
                "content": "Hello"
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
ChatCompletion(id='chatcmpl-BrghGGR73s5Wt5thg4mhAxquxzmBi', choices=[Choice(finish_reason='stop', index=0, logprobs=None, message=ChatCompletionMessage(content=None, refusal=None, role='assistant', annotations=[], audio=ChatCompletionAudio(id='audio_686f762b97b08191bb5ea391c6b41e1c', data='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!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!WE’VE OMITTED 90% OF THE BASE64-ENCODED FILE FOR BREVITY — EVEN FOR SUCH A SHORT MODEL RESPONSE, IT’S STILL EXTREMELY LARGE.                                    !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!cAKAAoACsALAAuADIAMwA4ADsAOAA5ADgAOgA7ADoAOwA7AD8APQA+ADwAPQA+AD8AQQA+AD8APAA9ADsAOwA8ADwAOwA7ADoAOwA4ADoANQA1ADEAMQAyAC4ALAAnACUAIAAfABwAGgAaABUAFQASABAACgAIAAQA//8AAPv/+v/4//b/8v/0//L/9P/z//P/8//t/+7/6v/p/+f/5//o/+X/5P/k/+X/5f/l/+X/5P/h/97/3//g/93/2v/Z/9b/2P/Z/9j/1f/T/87/zv/O/87/zP/J/8j/zP/I/8f/w//C/8P/x//F/8b/xf/D/8P/w//F/8L/xf/J/8f/xf/H/8j/yv/K/8n/yv/L/8v/z//O/9D/zv/Q/9D/0v/Q/9P/1P/R/9P/1P/T/9X/1P/X/9b/2P/b/9n/2//c/97/3//h/97/3v/g/+P/5v/m/+T/5v/m/+n/5P/n/+X/5//u//D/9P/2//X/8//5//j/9///////AQAEAAsAAwAMAAQACgAPAA4ADgAJABEACQAEAAgACwALAA8AFgAWACUAKQAgACsAJQAvACAADwAbABoARgApACwANQArAEMAEQASAAoAEQAkADAAFABCAEEACQA=', expires_at=1752138811, transcript="Hi there! How's it going?"), function_call=None, tool_calls=None))], created=1752135210, model='gpt-4o-mini-audio-preview-2024-12-17', object='chat.completion', service_tier=None, system_fingerprint='fp_1dfa95e5cb', usage=CompletionUsage(completion_tokens=1278, prompt_tokens=4, total_tokens=1282, completion_tokens_details=CompletionTokensDetails(accepted_prediction_tokens=0, audio_tokens=30, reasoning_tokens=0, rejected_prediction_tokens=0, text_tokens=14), prompt_tokens_details=PromptTokensDetails(audio_tokens=0, cached_tokens=0, text_tokens=14, image_tokens=0)))
Audio saved to: c:\Users\user\Documents\Python Scripts\LLMs\audio.wav
```
{% endcode %}

</details>

{% embed url="https://drive.google.com/file/d/14rtmCmtPR5eKDLpRWIbkOtzlE-R1K5NM/view?usp=sharing" %}

## API Schema

{% openapi-operation spec="gpt-4o-mini-audio-preview" path="/v1/chat/completions" method="post" %}
[OpenAPI gpt-4o-mini-audio-preview](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/text-models-llm/OpenAI/gpt-4o-mini-audio-preview.json)
{% endopenapi-operation %}
