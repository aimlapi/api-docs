---
description: This page provides api schemas and descriptions for Threads API methods.
layout:
  title:
    visible: true
  description:
    visible: false
  tableOfContents:
    visible: true
  outline:
    visible: true
  pagination:
    visible: true
---

# Thread API

**Threads** serve as conversation containers that store Messages exchanged between a user and an Assistant, maintaining context and continuity across interactions.

This page provides API schemas for the following methods:

<table><thead><tr><th width="302.0833740234375"></th><th></th></tr></thead><tbody><tr><td><a href="threads.md#create-a-thread">Create a Thread</a></td><td><img src="../../../.gitbook/assets/POST.png" alt="" data-size="line"> <code>https://api.aimlapi.com/threads</code></td></tr><tr><td><a href="threads.md#retrieve-information-about-a-specific-thread-by-its-id">Retrieve information about a specific Thread by its ID</a></td><td><img src="../../../.gitbook/assets/GET.png" alt="" data-size="line"> <code>https://api.aimlapi.com/threads/{threadId}</code></td></tr><tr><td><a href="threads.md#modify-a-specific-thread-by-its-id">Modify a specific Thread by its ID</a></td><td><img src="../../../.gitbook/assets/POST.png" alt="" data-size="line"> <code>https://api.aimlapi.com/threads/{threadId}</code></td></tr><tr><td><a href="threads.md#delete-a-specific-thread-by-its-id">Delete a specific Thread by its ID</a></td><td><img src="../../../.gitbook/assets/DELETE.png" alt="" data-size="line"> <code>https://api.aimlapi.com/threads/{threadId}</code></td></tr></tbody></table>

After each API schema, you'll find a short example demonstrating how to correctly call the described method in code using the OpenAI SDK.

{% hint style="warning" %}
Note that the method names in the API schema and the SDK often differ.\
Accordingly, when calling these methods via the REST API, you should use the names from the API schema, while for calls through the OpenAI SDK, use the names from the examples.
{% endhint %}

## API Schemas

### Create a Thread

{% openapi src="https://api.aimlapi.com/docs-public-yaml?key=2b878a3c71a785f13366e9be96bacb29" path="/threads" method="post" %}
[https://api.aimlapi.com/docs-public-yaml?key=2b878a3c71a785f13366e9be96bacb29](https://api.aimlapi.com/docs-public-yaml?key=2b878a3c71a785f13366e9be96bacb29)
{% endopenapi %}

#### Python + OpenAI SDK Example:

<pre class="language-python"><code class="lang-python"><strong>from openai import OpenAI
</strong>client = OpenAI()

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
</code></pre>



***

### Retrieve information about a specific Thread by its ID

{% openapi src="https://api.aimlapi.com/docs-public-yaml?key=2b878a3c71a785f13366e9be96bacb29" path="/threads/{threadId}" method="get" %}
[https://api.aimlapi.com/docs-public-yaml?key=2b878a3c71a785f13366e9be96bacb29](https://api.aimlapi.com/docs-public-yaml?key=2b878a3c71a785f13366e9be96bacb29)
{% endopenapi %}

#### Python + OpenAI SDK Example:

```python
from openai import OpenAI
client = OpenAI()

my_thread = client.beta.threads.retrieve("thread_abc123")
print(my_thread)
```



***

### Modify a specific Thread by its ID

{% openapi src="https://api.aimlapi.com/docs-public-yaml?key=2b878a3c71a785f13366e9be96bacb29" path="/threads/{threadId}" method="post" %}
[https://api.aimlapi.com/docs-public-yaml?key=2b878a3c71a785f13366e9be96bacb29](https://api.aimlapi.com/docs-public-yaml?key=2b878a3c71a785f13366e9be96bacb29)
{% endopenapi %}

#### Python + OpenAI SDK Example:

```python
from openai import OpenAI
client = OpenAI()

my_updated_thread = client.beta.threads.update(
  "thread_abc123",
  metadata={
    "modified": "true",
    "user": "abc123"
  }
)
print(my_updated_thread)
```



***

### Delete a specific Thread by its ID

{% openapi src="https://api.aimlapi.com/docs-public-yaml?key=2b878a3c71a785f13366e9be96bacb29" path="/threads/{threadId}" method="delete" %}
[https://api.aimlapi.com/docs-public-yaml?key=2b878a3c71a785f13366e9be96bacb29](https://api.aimlapi.com/docs-public-yaml?key=2b878a3c71a785f13366e9be96bacb29)
{% endopenapi %}

#### Python + OpenAI SDK Example:

```python
from openai import OpenAI
client = OpenAI()

response = client.beta.threads.delete("thread_abc123")
print(response)
```
