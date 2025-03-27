# Assistant API

**Assistants** are AI-driven entities with assigned roles and instructions, allowing them to process messages, use tools, and maintain context within threads for structured and interactive responses. \
One Assistant can be used across multiple Threads and users.

This page provides API schemas for the following methods:

<table><thead><tr><th width="295.01666259765625"></th><th></th></tr></thead><tbody><tr><td><a href="assistant-api.md#create-an-assistant">Create an Assistant</a></td><td><img src="../../../.gitbook/assets/POST.png" alt="" data-size="line"> <code>https://api.aimlapi.com/assistants</code></td></tr><tr><td><a href="assistant-api.md#retrieve-a-list-of-assistants-along-with-their-parameters">Retrieve a list of Assistants along with their parameters</a></td><td><img src="../../../.gitbook/assets/GET.png" alt="" data-size="line"> <code>https://api.aimlapi.com/assistants</code></td></tr><tr><td><a href="assistant-api.md#retrieve-information-about-a-specific-assistant-by-its-id">Retrieve information about a specific Assistant by its ID</a></td><td><img src="../../../.gitbook/assets/GET.png" alt="" data-size="line"> <code>https://api.aimlapi.com/assistants/{assistantId}</code></td></tr><tr><td><a href="assistant-api.md#modify-a-specific-assistant-by-its-id">Modify a specific Assistant by its ID</a></td><td><img src="../../../.gitbook/assets/POST.png" alt="" data-size="line"> <code>https://api.aimlapi.com/assistants/{assistantId}</code></td></tr><tr><td><a href="assistant-api.md#delete-a-specific-assistant-by-its-id">Delete a specific Assistant by its ID</a></td><td><img src="../../../.gitbook/assets/DELETE.png" alt="" data-size="line"> <code>https://api.aimlapi.com/assistants/{assistantId}</code></td></tr></tbody></table>

After each API schema, you'll find a short example demonstrating how to correctly call the described method in code using the OpenAI SDK.

{% hint style="warning" %}
Note that the method names in the API schema and the SDK often differ.\
Accordingly, when calling these methods via the REST API, you should use the names from the API schema, while for calls through the OpenAI SDK, use the names from the examples.
{% endhint %}

## API Schemas

### Create an Assistant

Create an Assistant with a model and instructions.

{% openapi src="https://api.aimlapi.com/docs-public-yaml?key=2b878a3c71a785f13366e9be96bacb29" path="/assistants" method="post" %}
[https://api.aimlapi.com/docs-public-yaml?key=2b878a3c71a785f13366e9be96bacb29](https://api.aimlapi.com/docs-public-yaml?key=2b878a3c71a785f13366e9be96bacb29)
{% endopenapi %}

#### Python + OpenAI SDK Example:

{% code overflow="wrap" %}
```python
from openai import OpenAI
client = OpenAI()

assistant = client.beta.assistants.create(
  name="Math Tutor",
  instructions="You are a personal math tutor. Write and run code to answer math questions.",
  tools=[{"type": "code_interpreter"}],
  model="gpt-4o",
)
```
{% endcode %}



***

### Retrieve a list of Assistants along with their parameters

{% openapi src="https://api.aimlapi.com/docs-public-yaml?key=2b878a3c71a785f13366e9be96bacb29" path="/assistants" method="get" %}
[https://api.aimlapi.com/docs-public-yaml?key=2b878a3c71a785f13366e9be96bacb29](https://api.aimlapi.com/docs-public-yaml?key=2b878a3c71a785f13366e9be96bacb29)
{% endopenapi %}

#### Python + OpenAI SDK Example:

{% code overflow="wrap" %}
```python
from openai import OpenAI
client = OpenAI()

my_assistants = client.beta.assistants.list(
    order="desc",
    limit="20",
)
print(my_assistants.data)
```
{% endcode %}



***

### Retrieve information about a specific Assistant by its ID

{% openapi src="https://api.aimlapi.com/docs-public-yaml?key=2b878a3c71a785f13366e9be96bacb29" path="/assistants/{assistantId}" method="get" %}
[https://api.aimlapi.com/docs-public-yaml?key=2b878a3c71a785f13366e9be96bacb29](https://api.aimlapi.com/docs-public-yaml?key=2b878a3c71a785f13366e9be96bacb29)
{% endopenapi %}

#### Python + OpenAI SDK Example:

{% code overflow="wrap" %}
```python
from openai import OpenAI
client = OpenAI()

my_assistant = client.beta.assistants.retrieve("asst_abc123")
print(my_assistant)

```
{% endcode %}



***

### Modify a specific Assistant by its ID

{% openapi src="https://api.aimlapi.com/docs-public-yaml?key=2b878a3c71a785f13366e9be96bacb29" path="/assistants/{assistantId}" method="post" %}
[https://api.aimlapi.com/docs-public-yaml?key=2b878a3c71a785f13366e9be96bacb29](https://api.aimlapi.com/docs-public-yaml?key=2b878a3c71a785f13366e9be96bacb29)
{% endopenapi %}

#### Python + OpenAI SDK Example:

{% code overflow="wrap" %}
```python
from openai import OpenAI
client = OpenAI()

my_updated_assistant = client.beta.assistants.update(
  "asst_abc123",
  instructions="You are an HR bot, and you have access to files to answer employee questions about company policies. Always response with info from either of the files.",
  name="HR Helper",
  tools=[{"type": "file_search"}],
  model="gpt-4o"
)

print(my_updated_assistant)
```
{% endcode %}



***

### Delete a specific Assistant by its ID

{% openapi src="https://api.aimlapi.com/docs-public-yaml?key=2b878a3c71a785f13366e9be96bacb29" path="/assistants/{assistantId}" method="delete" %}
[https://api.aimlapi.com/docs-public-yaml?key=2b878a3c71a785f13366e9be96bacb29](https://api.aimlapi.com/docs-public-yaml?key=2b878a3c71a785f13366e9be96bacb29)
{% endopenapi %}

#### Python + OpenAI SDK Example:

{% code overflow="wrap" %}
```python
from openai import OpenAI
client = OpenAI()

response = client.beta.assistants.delete("asst_abc123")
print(response)
```
{% endcode %}
