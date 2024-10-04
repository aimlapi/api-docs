---
description: >-
  The Threads API is very useful for creating a chat-like experience with a
  relatively large message history
icon: brackets-curly
---

# Threads

## API Reference

{% swagger src="../../../../.gitbook/assets/docs-public.yaml" path="/threads/{threadId}" method="delete" %}
[docs-public.yaml](../../../../.gitbook/assets/docs-public.yaml)
{% endswagger %}

{% swagger src="../../../../.gitbook/assets/docs-public.yaml" path="/threads" method="post" %}
[docs-public.yaml](../../../../.gitbook/assets/docs-public.yaml)
{% endswagger %}

{% swagger src="../../../../.gitbook/assets/docs-public.yaml" path="/threads/{threadId}" method="get" %}
[docs-public.yaml](../../../../.gitbook/assets/docs-public.yaml)
{% endswagger %}

{% swagger src="../../../../.gitbook/assets/docs-public.yaml" path="/threads/{threadId}" method="post" %}
[docs-public.yaml](../../../../.gitbook/assets/docs-public.yaml)
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
