---
icon: brackets-curly
description: >-
  The Threads API is very useful for creating a chat-like experience with a
  relatively large message history
---

# Threads

## API Reference

{% swagger src="https://api-staging.aimlapi.com/docs-public-json" path="/threads/{threadId}" method="delete" %}
[https://api-staging.aimlapi.com/docs-public-json](https://api-staging.aimlapi.com/docs-public-json)
{% endswagger %}

{% swagger src="https://api-staging.aimlapi.com/docs-public-json" path="/threads" method="post" %}
[https://api-staging.aimlapi.com/docs-public-json](https://api-staging.aimlapi.com/docs-public-json)
{% endswagger %}

{% swagger src="https://api-staging.aimlapi.com/docs-public-json" path="/threads/{threadId}" method="get" %}
[https://api-staging.aimlapi.com/docs-public-json](https://api-staging.aimlapi.com/docs-public-json)
{% endswagger %}

{% swagger src="https://api-staging.aimlapi.com/docs-public-json" path="/threads/{threadId}" method="post" %}
[https://api-staging.aimlapi.com/docs-public-json](https://api-staging.aimlapi.com/docs-public-json)
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
