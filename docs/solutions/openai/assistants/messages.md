# Message API

**Messages** are individual pieces of communication within a Thread, sent either by the user or the Assistant, helping to maintain the flow and context of the conversation.

This page provides API schemas for the following methods:

<table><thead><tr><th width="295.01666259765625"></th><th></th></tr></thead><tbody><tr><td><a href="messages.md#create-a-message">Create a Message</a></td><td><img src="/broken/files/j1sGKuO2wS5fYyQZ5SGg" alt="" data-size="line"> <code>https://api.aimlapi.com/threads/{threadId}/messages</code></td></tr><tr><td><a href="messages.md#retrieve-a-list-of-messages-from-a-specific-thread-along-with-their-properties">Retrieve a list of Messages from a specific Thread along with their properties</a></td><td><img src="/broken/files/vAXd7V6xv3QmKrLeptB1" alt="" data-size="line"> <code>https://api.aimlapi.com/threads/{threadId}/messages</code></td></tr><tr><td><a href="messages.md#retrieve-information-about-a-specific-message-by-its-id">Retrieve information about a specific Message by its ID</a></td><td><img src="/broken/files/vAXd7V6xv3QmKrLeptB1" alt="" data-size="line"> <code>https://api.aimlapi.com/threads/{threadId}/messages/{messageId}</code></td></tr><tr><td><a href="messages.md#modify-a-specific-message-by-its-id">Modify a specific Message by its ID</a></td><td><img src="/broken/files/j1sGKuO2wS5fYyQZ5SGg" alt="" data-size="line"> <code>https://api.aimlapi.com/threads/{threadId}/messages/{messageId}</code></td></tr><tr><td><a href="messages.md#delete-a-specific-message-by-its-id">Delete a specific Message by its ID</a></td><td><img src="../../../.gitbook/assets/delete.png" alt="" data-size="line"> <code>https://api.aimlapi.com/threads/{threadId}/messages/{messageId}</code></td></tr></tbody></table>

After each API schema, you'll find a short example demonstrating how to correctly call the described method in code using the OpenAI SDK.

{% hint style="warning" %}
Note that the method names in the API schema and the SDK often differ.\
Accordingly, when calling these methods via the REST API, you should use the names from the API schema, while for calls through the OpenAI SDK, use the names from the examples.
{% endhint %}

## API Schemas

### Create a Message

{% openapi-operation spec="ass-msg-create" path="/threads/{threadId}/messages" method="post" %}
[OpenAPI ass-msg-create](https://api.aimlapi.com/docs-public-yaml)
{% endopenapi-operation %}

#### Python + OpenAI SDK Example:

```python
from openai import OpenAI
client = OpenAI()

thread_message = client.beta.threads.messages.create(
  "thread_abc123",
  role="user",
  content="How does AI work? Explain it in simple terms.",
)
print(thread_message)
```

***

### Retrieve a list of Messages from a specific Thread along with their properties

{% openapi-operation spec="ass-msg-list" path="/threads/{threadId}/messages" method="get" %}
[OpenAPI ass-msg-list](https://api.aimlapi.com/docs-public-yaml)
{% endopenapi-operation %}

#### Python + OpenAI SDK Example:

```python
from openai import OpenAI
client = OpenAI()

thread_messages = client.beta.threads.messages.list("thread_abc123")
print(thread_messages.data)
```

***

### Retrieve information about a specific Message by its ID

{% openapi-operation spec="ass-msg-info" path="/threads/{threadId}/messages/{messageId}" method="get" %}
[OpenAPI ass-msg-info](https://api.aimlapi.com/docs-public-yaml)
{% endopenapi-operation %}

#### Python + OpenAI SDK Example:

```python
from openai import OpenAI
client = OpenAI()

message = client.beta.threads.messages.retrieve(
  message_id="msg_abc123",
  thread_id="thread_abc123",
)
print(message)
```

***

### Modify a specific message by its ID

{% openapi-operation spec="ass-msg-modify" path="/threads/{threadId}/messages/{messageId}" method="post" %}
[OpenAPI ass-msg-modify](https://api.aimlapi.com/docs-public-yaml)
{% endopenapi-operation %}

#### Python + OpenAI SDK Example:

```python
from openai import OpenAI
client = OpenAI()

message = client.beta.threads.messages.update(
  message_id="msg_abc12",
  thread_id="thread_abc123",
  metadata={
    "modified": "true",
    "user": "abc123",
  },
)
print(message)
```

***

### Delete a specific message by its ID

{% openapi-operation spec="ass-msg-delete" path="/threads/{threadId}/messages/{messageId}" method="delete" %}
[OpenAPI ass-msg-delete](https://api.aimlapi.com/docs-public-yaml)
{% endopenapi-operation %}

#### Python + OpenAI SDK Example:

```python
from openai import OpenAI
client = OpenAI()

deleted_message = client.beta.threads.messages.delete(
  message_id="msg_abc12",
  thread_id="thread_abc123",
)
print(deleted_message)
```
