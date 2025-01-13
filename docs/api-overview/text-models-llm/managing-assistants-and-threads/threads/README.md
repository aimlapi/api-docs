---
icon: brackets-curly
description: >-
  The Threads API is very useful for creating a chat-like experience with a
  relatively large message history
---

# Threads

## API Reference

{% swagger src="broken-reference" path="/threads/{threadId}" method="delete" %}
[Broken link](broken-reference)
{% endswagger %}

{% swagger src="broken-reference" path="/threads" method="post" %}
[Broken link](broken-reference)
{% endswagger %}

{% swagger src="broken-reference" path="/threads/{threadId}" method="get" %}
[Broken link](broken-reference)
{% endswagger %}

{% swagger src="broken-reference" path="/threads/{threadId}" method="post" %}
[Broken link](broken-reference)
{% endswagger %}

## Example

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
