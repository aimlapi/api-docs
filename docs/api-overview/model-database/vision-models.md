---
icon: eye
description: >-
  Welcome to the Vision Models API documentation! The AI/ML API allows you to
  leverage vision capabilities to analyze and understand images through our
  models.
hidden: true
---

# Vision Models

| ID                                             | Provider    |
| ---------------------------------------------- | ----------- |
| gpt-4o                                         | open-ai     |
| gpt-4o-2024-08-06                              | open-ai     |
| gpt-4o-2024-05-13                              | open-ai     |
| gpt-4o-mini                                    | open-ai     |
| gpt-4o-mini-2024-07-18                         | open-ai     |
| gpt-4-turbo                                    | open-ai     |
| gpt-4-turbo-2024-04-09                         | open-ai     |
| meta-llama/Llama-3.2-90B-Vision-Instruct-Turbo | open-source |
| meta-llama/Llama-Vision-Free                   | open-source |
| meta-llama/Llama-3.2-11B-Vision-Instruct-Turbo | open-source |
| gemini-1.5-flash                               | google      |
| gemini-1.5-pro                                 | google      |
| claude-3-5-sonnet-latest                       | anthropic   |
| claude-3-haiku-latest                          | anthropic   |
| claude-3-opus-latest                           | anthropic   |
| claude-3-sonnet-latest                         | anthropic   |
| claude-3-5-haiku-latest                        | anthropic   |
| qwen/qvq-72b-preview                           | openrouter  |

## Key Features

* **Image Analysis**: Understand and describe the content of images.
* **Flexible Input Methods**: Supports both image URLs and base64 encoded images.
* **Multiple Image Inputs**: Analyze multiple images in a single request.

## Quick Start

Images can be provided to the model in two main ways: by passing an image URL or by passing the base64 encoded image directly in the request.

### **Uploading Images by URL**

<details>

<summary>Python Example</summary>

```python
import requests
import json

url = "https://api.aimlapi.com/chat/completions"

payload = json.dumps({
  "model": "gpt-4o",
  "messages": [
    {
      "role": "user",
      "content": [
        {"type": "text", "text": "What’s in this image?"},
        {
          "type": "image_url",
          "image_url": {
            "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Gfp-wisconsin-madison-the-nature-boardwalk.jpg/2560px-Gfp-wisconsin-madison-the-nature-boardwalk.jpg"
          }
        }
      ]
    }
  ],
  "max_tokens": 300
})

headers = {
  'Content-Type': 'application/json',
  'Authorization': 'Bearer YOUR_API_KEY'
}

response = requests.post(url, headers=headers, data=payload)
print(response.json())

```

</details>

{% hint style="info" %}
In this example, the GPT-4o model was used with the corresponding set of parameters. If you are using models from Anthropic (claude-3.5-sonnet, etc), check [here](../text-models-llm/function-calling/anthropic.md).
{% endhint %}

### Uploading Base64 Encoded Images

For local images, you can pass the base64 encoded image to the model.

<details>

<summary>Python Example</summary>

```python
import base64
import requests

# Function to encode the image
def encode_image(image_path):
  with open(image_path, "rb") as image_file:
    return base64.b64encode(image_file.read()).decode('utf-8')

# Path to your image
image_path = "path_to_your_image.jpg"
base64_image = encode_image(image_path)

url = "https://api.aimlapi.com/chat/completions"
headers = {
  "Content-Type": "application/json",
  "Authorization": "Bearer YOUR_API_KEY"
}
payload = {
  "model": "gpt-4o",
  "messages": [
    {
      "role": "user",
      "content": [
        {"type": "text", "text": "What’s in this image?"},
        {"type": "image_url", "image_url": {"url": f"data:image/jpeg;base64,{base64_image}"}}
      ]
    }
  ],
  "max_tokens": 300
}

response = requests.post(url, headers=headers, json=payload)
print(response.json())

```

</details>

{% hint style="info" %}
In this example, the GPT-4o model was used with the corresponding set of parameters. If you are using models from Anthropic (claude-3.5-sonnet, etc), check [here](../text-models-llm/function-calling/anthropic.md).
{% endhint %}

### Multiple Image Inputs

The API can process multiple images in a single request.

**Python Example**

```python
import requests
import json

url = "https://api.aimlapi.com/chat/completions"

payload = json.dumps({
  "model": "gpt-4o",
  "messages": [
    {
      "role": "user",
      "content": [
        {"type": "text", "text": "What are in these images? Is there any difference between them?"},
        {"type": "image_url", "image_url": {"url": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Gfp-wisconsin-madison-the-nature-boardwalk.jpg/2560px-Gfp-wisconsin-madison-the-nature-boardwalk.jpg"}},
        {"type": "image_url", "image_url": {"url": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Gfp-wisconsin-madison-the-nature-boardwalk.jpg/2560px-Gfp-wisconsin-madison-the-nature-boardwalk.jpg"}}
      ]
    }
  ],
  "max_tokens": 300
})

headers = {
  'Content-Type': 'application/json',
  'Authorization': 'Bearer YOUR_API_KEY'
}

response = requests.post(url, headers=headers, data=payload)
print(response.json())

```
