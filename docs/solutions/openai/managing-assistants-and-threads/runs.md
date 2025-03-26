# Run and Run Step API

Runs are processes that execute the assistant’s logic within a thread, allowing it to process messages, generate responses, and call external tools if needed. Runs go through different statuses, such as `queued`, `in_progress`, and `completed`, and trigger **events** based on their progress, including tool calls and message updates.

This page provides API schemas for the following methods:

* [Create a run](runs.md#create-a-run)
* [Create a thread and run it in one request](runs.md#create-a-thread-and-run-it-in-one-request)
* [Retrieve a list of runs along with their parameters](runs.md#retrieve-a-list-of-runs-along-with-their-parameterss)
* [Retrieve information about a specific run by its ID](runs.md#retrieve-information-about-a-specific-run-by-its-id)
* [Modify a specific run by its ID](runs.md#modify-a-specific-run-by-its-id)
* [Cancel a specific run by its ID](runs.md#cancel-a-specific-run-by-its-id)

After each schema, you'll find a short example demonstrating how to correctly call the described method in code using the OpenAI SDK.

{% hint style="warning" %}
Note that the method names in the API schema and the SDK often differ.\
Accordingly, when calling these methods via the REST API, you should use the names from the API schema, while for calls through the OpenAI SDK, use the names from the examples.
{% endhint %}

## API Schemas

### Create a run

{% openapi src="https://api.aimlapi.com/docs-public-yaml?key=2b878a3c71a785f13366e9be96bacb29" path="/threads/{threadId}/runs" method="post" %}
[https://api.aimlapi.com/docs-public-yaml?key=2b878a3c71a785f13366e9be96bacb29](https://api.aimlapi.com/docs-public-yaml?key=2b878a3c71a785f13366e9be96bacb29)
{% endopenapi %}

### Create a thread and run it in one request

(coming soon)



### Retrieve a list of runs along with their parameters

{% openapi src="https://api.aimlapi.com/docs-public-yaml?key=2b878a3c71a785f13366e9be96bacb29" path="/threads/{threadId}/runs" method="get" %}
[https://api.aimlapi.com/docs-public-yaml?key=2b878a3c71a785f13366e9be96bacb29](https://api.aimlapi.com/docs-public-yaml?key=2b878a3c71a785f13366e9be96bacb29)
{% endopenapi %}

### Retrieve information about a specific run by its ID

{% openapi src="https://api.aimlapi.com/docs-public-yaml?key=2b878a3c71a785f13366e9be96bacb29" path="/threads/{threadId}/runs/{runId}" method="get" %}
[https://api.aimlapi.com/docs-public-yaml?key=2b878a3c71a785f13366e9be96bacb29](https://api.aimlapi.com/docs-public-yaml?key=2b878a3c71a785f13366e9be96bacb29)
{% endopenapi %}

### Modify a specific run by its ID

{% openapi src="https://api.aimlapi.com/docs-public-yaml?key=2b878a3c71a785f13366e9be96bacb29" path="/threads/{threadId}/runs/{runId}" method="post" %}
[https://api.aimlapi.com/docs-public-yaml?key=2b878a3c71a785f13366e9be96bacb29](https://api.aimlapi.com/docs-public-yaml?key=2b878a3c71a785f13366e9be96bacb29)
{% endopenapi %}

### Cancel a specific run by its ID

(coming soon)
