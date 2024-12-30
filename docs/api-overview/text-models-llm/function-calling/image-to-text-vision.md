---
icon: code
---

# Image-To-Text (Vision)

## Vision Tasks

**Example Request: Image Analysis**

{% hint style="info" %}
**Note:** API only support BASE64 String as Image input.&#x20;
{% endhint %}

## Possible Media Types

* `image/png`
* `image/gif`
* `image/webp`

## Example

```python
import requests

url = "https://api.aimlapi.com/v1/chat/completions"
headers = {
    "Authorization": "Bearer YOUR_API_KEY",
    "Content-Type": "application/json"
}
payload = {
  "model": "claude-3-5-sonnet-20240620",
  "max_tokens": 1024,
  "messages": [
    {
      "role": "user",
      "content": [
        {
          "type": "image",
          "source": {
            "type": "base64",
            "media_type": "image/jpeg",
            "data": "/9j/4QCARXhpZgAATU0AKgAAAAgABQESAAMAAAABAAEAAAEaAAUAAAABAAAASgEbAAUAAAABAAAAUgEoAAMAAAABAAIAAIdpAAQAAAABAAAAWgAAAAAAAABIAAAAAQAAAEgAAAABAAKgAgAEAAAAAQAABXigAwAEAAAAAQAAAxkAAAAA/+EA+mh0"
          }
        },
        {
          "type": "text",
          "text": "Extract all of the fields from this image and return in a JSON format"
        }
      ]
    }
  ]
}

response = requests.post(url, json=payload, headers=headers)
print(response.json())

```

