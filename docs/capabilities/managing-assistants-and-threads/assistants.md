# Assistants

**Assistants** are AI-driven entities with assigned roles and instructions, allowing them to process messages, use tools, and maintain context within threads for structured and interactive responses. \
One Assistant can be used across multiple Threads and users.

This page provides API schemas for the following methods:

* [Create an assistant](assistants.md#create-an-assistant)
* [Retrieve a list of assistants along with their parameters](assistants.md#retrieve-a-list-of-assistants-along-with-their-parameters)
* [Retrieve information about a specific assistant by its ID](assistants.md#retrieve-information-about-a-specific-assistant-by-its-id)
* [Modify a specific assistant by its ID](assistants.md#modify-a-specific-assistant-by-its-id)
* [Delete a specific assistant by its ID](assistants.md#delete-a-specific-assistant-by-its-id)

After each schema, you'll find a short example demonstrating how to correctly call the described method in code using the OpenAI SDK.

{% hint style="warning" %}
Note that the method names in the API schema and the SDK often differ.&#x20;

Accordingly, when calling these methods via the REST API, you should use the names from the API schema, while for calls through the OpenAI SDK, use the names from the examples.
{% endhint %}

## API Schemas

### Create an assistant

Create an assistant with a model and instructions.

{% openapi src="https://api.aimlapi.com/docs-public-yaml?key=2b878a3c71a785f13366e9be96bacb29" path="/assistants" method="post" %}
[https://api.aimlapi.com/docs-public-yaml?key=2b878a3c71a785f13366e9be96bacb29](https://api.aimlapi.com/docs-public-yaml?key=2b878a3c71a785f13366e9be96bacb29)
{% endopenapi %}

### Retrieve a list of assistants along with their parameters

{% openapi src="https://api.aimlapi.com/docs-public-yaml?key=2b878a3c71a785f13366e9be96bacb29" path="/assistants" method="get" %}
[https://api.aimlapi.com/docs-public-yaml?key=2b878a3c71a785f13366e9be96bacb29](https://api.aimlapi.com/docs-public-yaml?key=2b878a3c71a785f13366e9be96bacb29)
{% endopenapi %}

### Retrieve information about a specific assistant by its ID

{% openapi src="https://api.aimlapi.com/docs-public-yaml?key=2b878a3c71a785f13366e9be96bacb29" path="/assistants/{assistantId}" method="get" %}
[https://api.aimlapi.com/docs-public-yaml?key=2b878a3c71a785f13366e9be96bacb29](https://api.aimlapi.com/docs-public-yaml?key=2b878a3c71a785f13366e9be96bacb29)
{% endopenapi %}

### Modify a specific assistant by its ID

{% openapi src="https://api.aimlapi.com/docs-public-yaml?key=2b878a3c71a785f13366e9be96bacb29" path="/assistants/{assistantId}" method="post" %}
[https://api.aimlapi.com/docs-public-yaml?key=2b878a3c71a785f13366e9be96bacb29](https://api.aimlapi.com/docs-public-yaml?key=2b878a3c71a785f13366e9be96bacb29)
{% endopenapi %}

### Delete a specific assistant by its ID

{% openapi src="https://api.aimlapi.com/docs-public-yaml?key=2b878a3c71a785f13366e9be96bacb29" path="/assistants/{assistantId}" method="delete" %}
[https://api.aimlapi.com/docs-public-yaml?key=2b878a3c71a785f13366e9be96bacb29](https://api.aimlapi.com/docs-public-yaml?key=2b878a3c71a785f13366e9be96bacb29)
{% endopenapi %}

