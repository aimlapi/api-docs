# Run and Run Step API

Runs are processes that execute the assistant’s logic within a thread, allowing it to process messages, generate responses, and call external tools if needed. Runs go through different statuses, such as `queued`, `in_progress`, and `completed`, and trigger **events** based on their progress, including tool calls and message updates.

This page provides API schemas for the following methods:

<table><thead><tr><th width="295.01666259765625"></th><th></th></tr></thead><tbody><tr><td><a href="runs.md#create-a-run">Create a Run</a></td><td><img src="../../../.gitbook/assets/POST.png" alt="" data-size="line"> <code>https://api.aimlapi.com/threads/{threadId}/runs</code></td></tr><tr><td><a href="runs.md#create-a-thread-and-run-it-in-one-request">Create a Thread and run it in one request</a></td><td><img src="../../../.gitbook/assets/POST.png" alt="" data-size="line"> <code>https://api.aimlapi.com/threads/runs</code></td></tr><tr><td><a href="runs.md#retrieve-a-list-of-runs-belonging-to-a-specific-thread">Retrieve a list of Runs belonging to a specific Thread</a></td><td><img src="../../../.gitbook/assets/GET.png" alt="" data-size="line"> <code>https://api.aimlapi.com/threads/{threadId}/runs</code></td></tr><tr><td><a href="runs.md#retrieve-information-about-a-specific-run-by-its-id">Retrieve information about a specific Run by its ID</a></td><td><img src="../../../.gitbook/assets/GET.png" alt="" data-size="line"> <code>https://api.aimlapi.com/threads/{threadId}/runs/{runId}</code></td></tr><tr><td><a href="runs.md#modify-a-specific-run-by-its-id">Modify a specific Run by its ID</a></td><td><img src="../../../.gitbook/assets/POST.png" alt="" data-size="line"> <code>https://api.aimlapi.com/threads/{threadId}/runs/{runId}</code></td></tr><tr><td><a href="runs.md#submit-tool-outputs-to-a-specific-run">Submit Tool outputs to a specific Run</a></td><td><img src="../../../.gitbook/assets/POST.png" alt="" data-size="line"> <code>https://api.aimlapi.com/threads/{threadId}/runs/{runId}/submit_tool_outputs</code></td></tr><tr><td><a href="runs.md#cancel-a-specific-run-by-its-id">Cancel a specific Run by its ID</a></td><td><img src="../../../.gitbook/assets/POST.png" alt="" data-size="line"> <code>https://api.aimlapi.com/threads/{threadId}/runs/{runId}/cancel</code></td></tr><tr><td><a href="runs.md#retrieve-a-list-of-runs-belonging-to-a-specific-thread">Retrieve a list of Run Steps belonging to a specific Run</a></td><td><img src="../../../.gitbook/assets/GET.png" alt="" data-size="line"> <code>https://api.aimlapi.com/threads/{threadId}/runs/{runId}/steps</code></td></tr><tr><td><a href="runs.md#retrieve-information-about-a-specific-run-step-by-its-id">Retrieve information about a specific Run Step by its ID</a></td><td><img src="../../../.gitbook/assets/GET.png" alt="" data-size="line"> <code>https://api.aimlapi.com/threads/{threadId}/runs/{runId}/steps/{stepId}</code></td></tr></tbody></table>

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

#### Python + OpenAI SDK Example:

```python
from openai import OpenAI
client = OpenAI()

run = client.beta.threads.runs.create(
  thread_id="thread_abc123",
  assistant_id="asst_abc123"
)

print(run)
```



***

### Create a Thread and run it in one request

{% openapi src="https://api.aimlapi.com/docs-public-yaml?key=2b878a3c71a785f13366e9be96bacb29" path="/threads/runs" method="post" %}
[https://api.aimlapi.com/docs-public-yaml?key=2b878a3c71a785f13366e9be96bacb29](https://api.aimlapi.com/docs-public-yaml?key=2b878a3c71a785f13366e9be96bacb29)
{% endopenapi %}

#### Python + OpenAI SDK Example:

```python
from openai import OpenAI
client = OpenAI()

run = client.beta.threads.create_and_run(
  assistant_id="asst_abc123",
  thread={
    "messages": [
      {"role": "user", "content": "Explain deep learning to a 5 year old."}
    ]
  }
)

print(run)
```



***

### Retrieve a list of Runs belonging to a specific Thread

{% openapi src="https://api.aimlapi.com/docs-public-yaml?key=2b878a3c71a785f13366e9be96bacb29" path="/threads/{threadId}/runs" method="get" %}
[https://api.aimlapi.com/docs-public-yaml?key=2b878a3c71a785f13366e9be96bacb29](https://api.aimlapi.com/docs-public-yaml?key=2b878a3c71a785f13366e9be96bacb29)
{% endopenapi %}

#### Python + OpenAI SDK Example:

```python
from openai import OpenAI
client = OpenAI()

runs = client.beta.threads.runs.list(
  "thread_abc123"
)

print(runs)
```



***

### Retrieve information about a specific Run by its ID

{% openapi src="https://api.aimlapi.com/docs-public-yaml?key=2b878a3c71a785f13366e9be96bacb29" path="/threads/{threadId}/runs/{runId}" method="get" %}
[https://api.aimlapi.com/docs-public-yaml?key=2b878a3c71a785f13366e9be96bacb29](https://api.aimlapi.com/docs-public-yaml?key=2b878a3c71a785f13366e9be96bacb29)
{% endopenapi %}

#### Python + OpenAI SDK Example:

```python
from openai import OpenAI
client = OpenAI()

run = client.beta.threads.runs.retrieve(
  thread_id="thread_abc123",
  run_id="run_abc123"
)

print(run)
```



***

### Modify a specific run by its ID

{% openapi src="https://api.aimlapi.com/docs-public-yaml?key=2b878a3c71a785f13366e9be96bacb29" path="/threads/{threadId}/runs/{runId}" method="post" %}
[https://api.aimlapi.com/docs-public-yaml?key=2b878a3c71a785f13366e9be96bacb29](https://api.aimlapi.com/docs-public-yaml?key=2b878a3c71a785f13366e9be96bacb29)
{% endopenapi %}

#### Python + OpenAI SDK Example:

```python
from openai import OpenAI
client = OpenAI()

run = client.beta.threads.runs.update(
  thread_id="thread_abc123",
  run_id="run_abc123",
  metadata={"user_id": "user_abc123"},
)

print(run)
```



***

### Submit Tool outputs to a specific Run

{% openapi src="https://api.aimlapi.com/docs-public-yaml?key=2b878a3c71a785f13366e9be96bacb29" path="/threads/{threadId}/runs/{runId}/submit_tool_outputs" method="post" %}
[https://api.aimlapi.com/docs-public-yaml?key=2b878a3c71a785f13366e9be96bacb29](https://api.aimlapi.com/docs-public-yaml?key=2b878a3c71a785f13366e9be96bacb29)
{% endopenapi %}

#### Python + OpenAI SDK Example:

```python
from openai import OpenAI
client = OpenAI()

run = client.beta.threads.runs.submit_tool_outputs(
  thread_id="thread_123",
  run_id="run_123",
  tool_outputs=[
    {
      "tool_call_id": "call_001",
      "output": "70 degrees and sunny."
    }
  ]
)

print(run)
```



***

### Cancel a specific Run by its ID

{% openapi src="https://api.aimlapi.com/docs-public-yaml?key=2b878a3c71a785f13366e9be96bacb29" path="/threads/{threadId}/runs/{runId}/cancel" method="post" %}
[https://api.aimlapi.com/docs-public-yaml?key=2b878a3c71a785f13366e9be96bacb29](https://api.aimlapi.com/docs-public-yaml?key=2b878a3c71a785f13366e9be96bacb29)
{% endopenapi %}

#### Python + OpenAI SDK Example:

```python
from openai import OpenAI
client = OpenAI()

run = client.beta.threads.runs.cancel(
  thread_id="thread_abc123",
  run_id="run_abc123"
)

print(run)
```



***

### Retrieve a list of Run Steps belonging to a specific Run

{% openapi src="https://api.aimlapi.com/docs-public-yaml?key=2b878a3c71a785f13366e9be96bacb29" path="/threads/{threadId}/runs/{runId}/steps" method="get" %}
[https://api.aimlapi.com/docs-public-yaml?key=2b878a3c71a785f13366e9be96bacb29](https://api.aimlapi.com/docs-public-yaml?key=2b878a3c71a785f13366e9be96bacb29)
{% endopenapi %}

#### Python + OpenAI SDK Example:

```python
from openai import OpenAI
client = OpenAI()

run_steps = client.beta.threads.runs.steps.list(
    thread_id="thread_abc123",
    run_id="run_abc123"
)

print(run_steps)
```



***

### Retrieve information about a specific Run Step by its ID

{% openapi src="https://api.aimlapi.com/docs-public-yaml?key=2b878a3c71a785f13366e9be96bacb29" path="/threads/{threadId}/runs/{runId}/steps/{stepId}" method="get" %}
[https://api.aimlapi.com/docs-public-yaml?key=2b878a3c71a785f13366e9be96bacb29](https://api.aimlapi.com/docs-public-yaml?key=2b878a3c71a785f13366e9be96bacb29)
{% endopenapi %}

#### Python + OpenAI SDK Example:

```python
from openai import OpenAI
client = OpenAI()

run_step = client.beta.threads.runs.steps.retrieve(
    thread_id="thread_abc123",
    run_id="run_abc123",
    step_id="step_abc123"
)

print(run_step)
```
