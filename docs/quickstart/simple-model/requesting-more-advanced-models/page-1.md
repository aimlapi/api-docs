---
hidden: true
noIndex: true
---

# Page 1

## **Document upload**

You can upload documents (PDF, DOCX, etc.) to the API so a chat model like GPT‑4o can analyze the content — for reading, summarizing, Q\&A, etc. (this uses file upload endpoints together with the assistant).

{% tabs %}
{% tab title="Python" %}
{% code overflow="wrap" %}
```python
import requests

# Upload file
files_url = "https://api.aimlapi.com/v1/files"
headers = {"Authorization": "Bearer <YOUR_AIMLAPI_KEY>"}
with open("report.pdf", "rb") as f:
    files_resp = requests.post(files_url, headers=headers, files={"file": f, "purpose": "chat_analysis"})
file_id = files_resp.json()["id"]

# Chat using uploaded file
chat_url = "https://api.aimlapi.com/v1/chat/completions"
payload = {
    "model": "gpt-4o",
    "messages": [
        {"role": "user", "content": "Summarize the document."},
        {"role": "system", "content": f"Use file: {file_id}"}
    ]
}
chat_resp = requests.post(chat_url, headers=headers, json=payload)
print(chat_resp.json())
```
{% endcode %}
{% endtab %}

{% tab title="Python + OpenAI SDK" %}
```python
file_resp = client.files.create(
    file=open("report.pdf", "rb"),
    purpose="chat_analysis"
)
file_id = file_resp["id"]

chat = client.chat.completions.create(
    model="gpt‑4o",
    messages=[
        {"role": "user", "content": "Summarize the document."},
        {"role": "system", "content": f"Use file: {file_id}"}
    ]
)
print(chat)
```
{% endtab %}
{% endtabs %}

<details>

<summary>Example response</summary>

{% code overflow="wrap" %}
```json
```
{% endcode %}

</details>

***
