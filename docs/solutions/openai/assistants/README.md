# Assistants

## Solution Overview

OpenAI Assistants provide a powerful business solution for integrating AI-driven interactions into applications and workflows. By defining specific roles, instructions, and tools, businesses can create tailored AI assistants capable of handling customer support, data analysis, content generation, and more. With structured thread-based conversations and API-driven automation, Assistants streamline complex processes, enhance user engagement, and improve operational efficiency. Whether used for internal productivity or customer-facing interactions, they offer a scalable way to incorporate advanced AI capabilities into any business environment.

***

## Main Entities in Assistants' Workflow

Here's a simple explanation of how **Messages**, **Threads**, **Assistants**, **Runs**, and **Tools** work in OpenAI's Assistants' workflow:

* A **Message** is a single exchange in a conversation. It can be something a user sends to the assistant (like a question or command) or something the assistant replies with. Think of it as one text bubble in a chat.
* A **Thread** is a collection of Messages that belong to the same conversation. It keeps all the back-and-forth exchanges together, so the assistant can remember what was said earlier in that conversation. Each time a user starts a new discussion, it creates a new Thread. There is no limit to the number of Messages you can store in a Thread. When the size of the Messages exceeds the model's context window, the Thread will smartly truncate messages before fully dropping the least important ones.
* An **Assistant** is the AI itself—its personality, skills, and behavior. When you set up an Assistant, you define what it knows, how it should respond, and whether it can use extra tools (like APIs or file uploads). One Assistant can be used across multiple Threads and users.
* A **Run** is the process that executes the Assistant’s response within a Thread. When a user sends a Message, a Run is created to generate the Assistant’s reply based on the conversation history and its predefined behavior. Runs manage the execution flow, including any tool calls the Assistant might need to make. A Run goes through different statuses—such as queued, in\_progress, completed, or failed—indicating its current state. Each Thread can have multiple Runs, ensuring smooth and structured interactions between the user and the Assistant.
* A **Tool** is an additional capability that an Assistant can use to enhance its responses. Tools allow the Assistant to perform external actions, such as calling APIs, retrieving files, or running custom functions. (You may have already encountered this concept by using [Function Calling](../../../capabilities/function-calling.md) when calling text models without creating Assistants.)\
  When a Tool is enabled, the Assistant can decide when to use it based on the conversation context. If a Tool is required during a Run, the process pauses until the necessary output is provided. This makes Tools essential for handling complex tasks that go beyond simple text-based interactions. \
  Currently, three Tool options are available:&#x20;
  * **Code Interpreter**,&#x20;
  * **File Search**,&#x20;
  * **Function Calling**, which can call your custom functions.

***

## How to Use Assistant API

{% stepper %}
{% step %}
[**Create an Assistant**](assistant-api.md#create-an-assistant). To set up an Assistant, you need to choose an AI model that will handle chat completion. The selected model determines the Assistant’s capabilities and response quality. Additionally, you should define the Assistant’s role and behavior by providing instructions—this will guide how it interacts with users. Additionally, you can add files to further train the Assistant on specific materials, enhancing its ability to provide more tailored responses. Enabling tools like **Code Interpreter**, **File Search**, and **Function Calling** can further improve its functionality.\
Once created, the Assistant will be assigned a unique ID, which you’ll use in further interactions. The method returns the ID of the created Assistant, which you can use later to link it with Threads and Runs.

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
{% endstep %}

{% step %}
[**Create a Thread**](threads.md#create-a-thread) where the interaction between the created Assistant and the user (a human) will take place. This method returns the ID of the created Thread.

```python
thread = client.beta.threads.create()
```
{% endstep %}

{% step %}
[**Create the first user message**](messages.md#create-a-message) either directly in the code or by passing it from a form. This message will be the first in your Thread. You must specify `role: 'user'` and the corresponding `thread_id`.

{% code overflow="wrap" %}
```python
message = client.beta.threads.messages.create(
  thread_id=thread.id,
  role="user",
  content="I need to solve the equation `3x + 11 = 14`. Can you help me?"
)
```
{% endcode %}
{% endstep %}

{% step %}
[**Create a Run**](runs.md#create-a-run) to initiate the Chat Completion process for messages within the specified Thread using the specified Assistant. This is very similar to calling a model without using the Assistants and Threads framework. If external tool calls might be needed during processing, you must predefine the available tools in the `tools` parameter and set `tool_choice` to `'auto'`.

{% hint style="warning" %}
Note that runs expire ten minutes after creation. \
Be sure to submit your tool outputs before the 10-minute mark.
{% endhint %}

{% code overflow="wrap" %}
```python
run = client.beta.threads.runs.create_and_poll(
  thread_id=thread.id,
  assistant_id=assistant.id,
  instructions="Please address the user as Jane Doe. The user has a premium account."
)
```
{% endcode %}
{% endstep %}
{% endstepper %}
