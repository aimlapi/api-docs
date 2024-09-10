---
icon: book-open
---

# Raw HTTP API Access

## Authorization

AI/ML API authorization is based on a Bearer token. You need to include it in the `Authorization` HTTP header within the request. Example header:

```http
Authorization: Bearer abc_api_key_xyz
```

## Send Request

Next, you need to send an HTTP request to our server. One straightforward way is to send a `CURL` request in the following format:

```bash
curl --request POST \
  --url https://api.aimlapi.com/chat/completions \
  --header 'Authorization: Bearer abc_api_key_xyz' \
  --header 'Content-Type: application/json' \
  --data '{
    "model": "gpt-4o",
    "messages": [
        {
            "role": "user",
            "content": "What kind of model are you?"
        }
    ],
    "max_tokens": 512,
    "stream": false
}'
```

