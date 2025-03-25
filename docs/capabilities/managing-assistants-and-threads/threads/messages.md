# Messages

**Messages** are individual pieces of communication within a thread, sent either by the user or the assistant, helping to maintain the flow and context of the conversation.

This page provides API schemas for the following methods:

* [Create a message](messages.md#create-a-message)
* [Retrieve information about a specific message by its ID](messages.md#retrieve-information-about-a-specific-message-by-its-id)
* [Modify a specific thread by its ID](messages.md#modify-a-specific-message-by-its-id)
* [Delete a specific message by its ID](messages.md#delete-a-specific-message-by-its-id)

After each schema, you'll find a short example demonstrating how to correctly call the described method in code using the OpenAI SDK.

## API Schemas

### Create a message

{% openapi src="https://api.aimlapi.com/docs-public-yaml?key=2b878a3c71a785f13366e9be96bacb29" path="/threads/{threadId}/messages" method="post" %}
[https://api.aimlapi.com/docs-public-yaml?key=2b878a3c71a785f13366e9be96bacb29](https://api.aimlapi.com/docs-public-yaml?key=2b878a3c71a785f13366e9be96bacb29)
{% endopenapi %}

### Retrieve information about a specific message by its ID

{% openapi src="https://api.aimlapi.com/docs-public-yaml?key=2b878a3c71a785f13366e9be96bacb29" path="/threads/{threadId}/messages/{messageId}" method="get" %}
[https://api.aimlapi.com/docs-public-yaml?key=2b878a3c71a785f13366e9be96bacb29](https://api.aimlapi.com/docs-public-yaml?key=2b878a3c71a785f13366e9be96bacb29)
{% endopenapi %}

### Retrieve a list of messages along with their properties

{% openapi src="https://api.aimlapi.com/docs-public-yaml?key=2b878a3c71a785f13366e9be96bacb29" path="/threads/{threadId}/messages" method="get" %}
[https://api.aimlapi.com/docs-public-yaml?key=2b878a3c71a785f13366e9be96bacb29](https://api.aimlapi.com/docs-public-yaml?key=2b878a3c71a785f13366e9be96bacb29)
{% endopenapi %}

### Modify a specific message by its ID

{% openapi src="https://api.aimlapi.com/docs-public-yaml?key=2b878a3c71a785f13366e9be96bacb29" path="/threads/{threadId}/messages/{messageId}" method="post" %}
[https://api.aimlapi.com/docs-public-yaml?key=2b878a3c71a785f13366e9be96bacb29](https://api.aimlapi.com/docs-public-yaml?key=2b878a3c71a785f13366e9be96bacb29)
{% endopenapi %}

### Delete a specific message by its ID

(coming soon)
