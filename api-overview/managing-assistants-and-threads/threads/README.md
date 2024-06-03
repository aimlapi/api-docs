---
description: >-
  The Threads API is very useful for creating a chat-like experience with a
  relatively large message history
---

# Threads

### Create Thread

{% swagger src="../../../.gitbook/assets/aimlapi.yaml" path="/threads" method="post" %}
[aimlapi.yaml](../../../.gitbook/assets/aimlapi.yaml)
{% endswagger %}

```python
thread = client.beta.threads.create(
  messages=[
    {
      "role": "user",
      "content": "Create 3 data visualizations based on the trends in this file.",
      "attachments": [
        {
          "file_id": file.id,
          "tools": [{"type": "code_interpreter"}]
        }
      ]
    }
  ]
)
```
