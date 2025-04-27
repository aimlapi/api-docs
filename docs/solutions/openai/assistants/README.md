# Assistants

## Solution Overview

OpenAI Assistants provide a powerful business solution for integrating AI-driven interactions into applications and workflows. By defining specific roles, instructions, and tools, businesses can create tailored AI assistants capable of handling customer support, data analysis, content generation, and more. With structured thread-based conversations and API-driven automation, Assistants streamline complex processes, enhance user engagement, and improve operational efficiency. Whether used for internal productivity or customer-facing interactions, they offer a scalable way to incorporate advanced AI capabilities into any business environment.

***

## Main Entities in Assistants' Workflow

Here's a simple explanation of how **Messages**, **Threads**, **Assistants**, **Runs**, and **Tools** work in OpenAI's Assistants' workflow:

* A **Message** is a single exchange in a conversation. It can be something a user sends to the Assistant (like a question or command) or something the Assistant replies with. Think of it as one text bubble in a chat.
* A **Thread** is a collection of Messages that belong to the same conversation. It keeps all the back-and-forth exchanges together, so the Assistant can remember what was said earlier in that conversation. Each time a user starts a new discussion, it creates a new Thread. There is no limit to the number of Messages you can store in a Thread. When the size of the Messages exceeds the model's context window, the Thread will smartly truncate messages before fully dropping the least important ones.
* An **Assistant** is the AI itself—its personality, skills, and behavior. When you set up an Assistant, you define what it knows, how it should respond, and whether it can use extra Tools (like APIs or file uploads). One Assistant can be used across multiple Threads and users.
* A **Run** is the process that executes the Assistant’s response within a Thread. When a user sends a Message, a Run is created to generate the Assistant’s reply based on the conversation history and its predefined behavior. Runs manage the execution flow, including any tool calls the Assistant might need to make. A Run goes through different statuses—such as `queued`, `in_progress`, `completed`, or `failed`—indicating its current state. Each Thread can have multiple Runs, ensuring smooth and structured interactions between the user and the Assistant.
* A **Tool** is an additional capability that an Assistant can use to enhance its responses. Tools allow the Assistant to perform external actions, such as calling APIs, retrieving files, or running custom functions. (You may have already encountered this concept by using [Function Calling](../../../capabilities/function-calling.md) when calling text models without creating Assistants.)\
  When a Tool is enabled, the Assistant can decide when to use it based on the conversation context. If a Tool is required during a Run, the process pauses until the necessary output is provided. This makes Tools essential for handling complex tasks that go beyond simple text-based interactions. \
  Currently, three Tool options are available:&#x20;
  * **Code Interpreter**, which can write or debug code for you in different programming languages,&#x20;
  * **File Search**, which can analyze the file you provided and is capable of discussing its contents,
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
[**Create a Run**](runs.md#create-a-run) to initiate the Chat Completion process for messages within the specified Thread using the specified Assistant. This is very similar to calling a model without using the Assistants and Threads framework. If external Tool calls might be needed during processing, you must predefine the available Tools in the `tools` parameter and set `tool_choice` to `'auto'`.

{% hint style="warning" %}
Note that runs expire ten minutes after creation. \
Be sure to submit your Tool outputs before the 10-minute mark.
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

## Example #1: Chat With Assistant (Without Streaming)

<details>

<summary>Full Step-by-Step Explanation</summary>

This Python script implements a **console-based chat** using OpenAI's Assistant API, with **gpt-4o** as the default model. However, you can replace it with any [OpenAI text model](../../../api-references/text-models-llm/OpenAI/) of your choice.

Unlike the streaming version, this version **waits for the full response** before displaying it. Below is a detailed breakdown of its execution.

***

### **1. Initialization Phase**

**Objects Created:**

1. **OpenAI Client (`client`)**
   * Connects to OpenAI's API using an AIMLAPI key and base URL.
2. **Assistant (`my_assistant`)**
   * Created using `client.beta.assistants.create()`.
   * Receives predefined **instructions** (`"You are a helpful assistant."`).
   * Assigned a **model** (`"gpt-4o"`).
   * Generates an **Assistant ID** (`assistant_id`), which will be used to process Messages.
3. **Thread (`thread`)**
   * Created using `client.beta.threads.create()`.
   * The conversation takes place within this **Thread**, ensuring context persistence.
   * Generates a **Thread ID** (`thread_id`), which links all messages together.

***

### **2. Chat Loop Execution**

The script enters a **while loop**, allowing continuous conversation:

1. **User Input (`user_input`)**
   * The user types a Message (stored in `user_input`).
   * If the user types `"exit"` or `"quit"`, the loop terminates.
2. **Message Sent to the Assistant (`send_message(user_message)`)**
   * If the Message is **empty**, a warning is displayed.
   *   The Message is added to the **Thread** using:

       ```python
       client.beta.threads.messages.create(
           thread_id=thread_id,
           role="user",
           content=user_message
       )
       ```
3. **Assistant Processes the Message (`run = client.beta.threads.runs.create_and_poll()`)**
   * This function:
     * Starts processing the Message.
     * Waits **until the Assistant completes** its response.
     * Returns the Run status.
4. **Fetching the Assistant’s Response (`client.beta.threads.messages.list()`)**
   * If the Run status is `"completed"`, the script retrieves all Messages from the **Thread history**.
   *   The last **Assistant Message** is extracted and displayed:

       ```python
       for message in reversed(messages.data):
           if message.role == "assistant":
               print(f"assistant > {message.content[0].text.value}")
               return
       ```
5. **Error Handling**
   *   If something goes wrong, an error message is displayed:

       ```python
       print("⚠️ Error: Failed to get a response from the assistant.")
       ```
6. **Loop Repeats Until User Exits**

***

### **Summary of Identifiers Passed Between Functions**

<table><thead><tr><th width="274" valign="top">Identifier</th><th valign="top">Purpose</th><th valign="top">Where It's Used</th></tr></thead><tbody><tr><td valign="top"><code>assistant_id</code></td><td valign="top">Identifies the Assistant instance</td><td valign="top">Created during initialization, used in <code>send_message()</code></td></tr><tr><td valign="top"><code>thread_id</code></td><td valign="top">Links all Messages in the conversation</td><td valign="top">Created during initialization, used in <code>send_message()</code> and fetching responses</td></tr><tr><td valign="top"><code>user_message</code></td><td valign="top">Stores user input</td><td valign="top">Passed from the chat loop to <code>send_message()</code></td></tr><tr><td valign="top"><code>run.status</code></td><td valign="top">Tracks response completion</td><td valign="top">Checked after <code>create_and_poll()</code></td></tr><tr><td valign="top"><code>message.content[0].text.value</code></td><td valign="top">Holds the Assistant's response</td><td valign="top">Extracted from <code>messages.list()</code></td></tr></tbody></table>

***

### **Final Execution Flow Summary**

1. Initialize API client, Assistant, and Thread (IDs stored).
2. Enter chat loop → user types a Message.
3. Send Message to Assistant (`send_message()`).
4. Wait for Assistant to generate the full response.
5. Fetch and display the response.
6. Loop repeats until user types `"exit"`.

🚀 This version provides a more structured, response-driven approach to interacting with the assistant.

</details>

```python
import openai
from openai import OpenAI

# Connect to OpenAI API
client = OpenAI(
    api_key="<YOUR_AIMLAPI_KEY>",
    base_url="https://api.aimlapi.com/"
)

# Create an Assistant
my_assistant = client.beta.assistants.create(
    instructions="You are a helpful assistant.",
    name="AI Assistant",
    model="gpt-4o",  # Specify the model
)

assistant_id = my_assistant.id  # Store Assistant ID
thread = client.beta.threads.create()  # Create a new Thread
thread_id = thread.id  # Store the Thread ID


def send_message(user_message):
    """Send a message to the Assistant and receive a full response"""
    if not user_message.strip():
        print("⚠️ Message cannot be empty!")
        return

    # Add the user's Message to the thread
    client.beta.threads.messages.create(
        thread_id=thread_id,
        role="user",
        content=user_message
    )

    # Start a new Run and wait for completion
    run = client.beta.threads.runs.create_and_poll(
        thread_id=thread_id,
        assistant_id=assistant_id,
        instructions="Keep responses concise and clear."
    )

    # Check if the Run was successful
    if run.status == "completed":
        # Retrieve messages from the thread
        messages = client.beta.threads.messages.list(thread_id=thread_id)
        
        # Find the last Assistant Message
        for message in reversed(messages.data):
            if message.role == "assistant":
                print()  # Add an empty line for spacing
                print(f"Assistant > {message.content[0].text.value}")
                return

    print("⚠️ Error: Failed to get a response from the Assistant.")


# Main chat loop
print("🤖 AI Assistant is ready! Type 'exit' to quit.")
while True:
    user_input = input("\nYou > ")
    if user_input.lower() in ["exit", "quit"]:
        print("👋 Chat session ended. See you next time!")
        break
    send_message(user_input)

```

<details>

<summary>Assistant Interaction Example</summary>

{% code overflow="wrap" %}
````
🤖 AI Assistant is ready! Type 'exit' to quit.

You > Hi! Could you write me a python function that squares the sum of two numbers?                     

Assistant > Certainly! Here's a simple Python function that squares the sum of two numbers:

```python
def square_of_sum(a, b):
    return (a + b) ** 2

# Example usage:
result = square_of_sum(3, 4)
print(result)  # Output: 49
```

This function takes two arguments, `a` and `b`, calculates their sum, and then returns the square of that sum.
Вы > Wow! Thanks a lot!

Assistant > You're welcome! If you have any more questions or need further assistance, feel free to ask. 
Happy coding!

You > exit 

Assistant > 👋 Chat session ended. See you next time!
````
{% endcode %}

</details>

## Example #2: Chat With Assistant (With Streaming)

<details>

<summary>Full Step-by-Step Explanation</summary>

This Python script implements a **console-based chat** using OpenAI's Assistant API, with steaming mode and **gpt-4o** as the default model. However, you can replace it with any [OpenAI text model](../../../api-references/text-models-llm/OpenAI/) of your choice, except for `o1`, as it does not support streaming.\
Below is a detailed breakdown of what happens during execution.

### **1. Initialization Phase**

**Objects Created:**

1. **OpenAI Client (`client`)**
   * Connects to OpenAI's API with an AIMLAPI key and base URL.
2. **Assistant (`my_assistant`)**
   * Created using `client.beta.assistants.create()`.
   * Receives predefined instructions (`"You are a helpful assistant."`).
   * Assigned a **model** (`"gpt-4o"`).
   * Generates an **Assistant ID** (`assistant_id`), which will be used later for Message processing.
3. **Thread (`thread`)**
   * Created using `client.beta.threads.create()`.
   * Each chat session operates within a **single Thread**, meaning all Messages in this session will share context.
   * Generates a **Thread ID** (`thread_id`), which links Messages together.

***

### **2. Handling Events: AssistantEventHandler**

To enable **streaming responses**, the script defines a custom event handler:

#### **Event: `on_text_created(self, text)`**

* Triggered when the Assistant starts generating a response.
* Displays `assistant >` to indicate that a response is coming.

#### **Event: `on_text_delta(self, delta, snapshot)`**

* Triggered when the Assistant sends a new portion of text.
* Prints the received `delta.value` **in real time**, making the response feel dynamic.

#### **Event: `on_tool_call_created(self, tool_call)`**

* Triggered when the Assistant calls an external Tool (e.g., a Code Interpreter).
* Displays `assistant > {tool_call.type}` to indicate the Tool being used.

#### **Event: `on_tool_call_delta(self, delta, snapshot)`**

* Triggered when the Assistant sends updates related to Tool execution.
* If the Assistant runs a **Code Interpreter**, it prints:
  * The **input command** being executed.
  * Any **output logs** produced.

***

### **3. Chat Loop Execution**

The script enters a **while loop**, allowing continuous conversation:

1. **User Input (`user_input`)**
   * The user types a Message (stored in `user_input`).
   * If the user types `"exit"` or `"quit"`, the loop terminates.
2. **Message Sent to the Assistant (`send_message(user_message)`)**
   * If the Message is **empty**, a warning is displayed.
   *   The Message is added to the **Thread** using:

       ```python
       client.beta.threads.messages.create(
           thread_id=thread_id,
           role="user",
           content=user_message
       )
       ```
   *   The Assistant processes the Message via:

       ```python
       with client.beta.threads.runs.stream(
           thread_id=thread_id,
           assistant_id=assistant_id,
           instructions="Keep responses concise and clear.",
           event_handler=EventHandler(),
       ) as stream:
           stream.until_done()
       ```
   * The **Thread ID** and **Assistant ID** ensure the assistant maintains context.

***

### **4. Streaming Response Processing**

* The Assistant **starts generating a response** asynchronously.
* The **event handler (`EventHandler`) captures each update** and displays it in real time.
* The loop repeats until the user exits.

***

### **Summary of Identifiers Passed Between Functions**

<table><thead><tr><th width="171" valign="top">Identifier</th><th width="243" valign="top">Purpose</th><th valign="top">Where It's Used</th></tr></thead><tbody><tr><td valign="top"><code>assistant_id</code></td><td valign="top">Identifies the assistant instance</td><td valign="top">Created during initialization, used in <code>send_message()</code></td></tr><tr><td valign="top"><code>thread_id</code></td><td valign="top">Links all messages in the conversation</td><td valign="top">Created during initialization, used in <code>send_message()</code> and streaming</td></tr><tr><td valign="top"><code>user_message</code></td><td valign="top">Stores user input</td><td valign="top">Passed from the chat loop to <code>send_message()</code></td></tr><tr><td valign="top"><code>delta.value</code></td><td valign="top">Holds streamed response text</td><td valign="top">Displayed by <code>on_text_delta()</code></td></tr></tbody></table>

***

### **Final Execution Flow Summary**

1. Initialize API client, Assistant, and Thread (IDs stored).
2. Enter chat loop → user types a Message.
3. Send Message to Assistant (`send_message()`).
4. Stream Assistant's response (processed event by event).
5. Loop repeats until user types `"exit"`.

🚀 This structure ensures a smooth, real-time chat experience with persistent context.

</details>

```python
import openai
from openai import OpenAI
from typing_extensions import override
from openai import AssistantEventHandler

# Connect to OpenAI API
client = OpenAI(
    api_key="<YOUR_AIMLAPI_KEY>",
    base_url="https://api.aimlapi.com/"
)

# Create an assistant
my_assistant = client.beta.assistants.create(
    instructions="You are a helpful assistant.",
    name="AI Assistant",
    model="gpt-4o",  # Specify the model
)

assistant_id = my_assistant.id  # Store assistant ID
thread = client.beta.threads.create()  # Create a new thread
thread_id = thread.id  # Store the thread ID


# Event handler for streaming responses
class EventHandler(AssistantEventHandler):
    @override
    def on_text_created(self, text) -> None:
        print("\nAssistant >", end=" ", flush=True)

    @override
    def on_text_delta(self, delta, snapshot):
        print(delta.value, end="", flush=True)

    def on_tool_call_created(self, tool_call):
        print(f"\nAssistant > {tool_call.type}\n", flush=True)

    def on_tool_call_delta(self, delta, snapshot):
        if delta.type == 'code_interpreter':
            if delta.code_interpreter.input:
                print(delta.code_interpreter.input, end="", flush=True)
            if delta.code_interpreter.outputs:
                print(f"\n\noutput >", flush=True)
                for output in delta.code_interpreter.outputs:
                    if output.type == "logs":
                        print(f"\n{output.logs}", flush=True)


def send_message(user_message):
    """Send a message to the Assistant and display the response"""
    if not user_message.strip():
        print("⚠️ Message cannot be empty!")
        return

    # Add the user's Message to the Thread
    client.beta.threads.messages.create(
        thread_id=thread_id,
        role="user",
        content=user_message
    )

    # Start processing the Message with streaming output
    with client.beta.threads.runs.stream(
        thread_id=thread_id,
        assistant_id=assistant_id,
        instructions="Keep responses concise and clear.",
        event_handler=EventHandler(),
    ) as stream:
        stream.until_done()


# Main chat loop
print("🤖 AI Assistant is ready! Type 'exit' to quit.")
while True:
    user_input = input("\nYou > ")
    if user_input.lower() in ["exit", "quit"]:
        print("👋 Chat session ended. See you next time!")
        break
    send_message(user_input)

```

<details>

<summary>Assistant Interaction Example</summary>

<pre data-overflow="wrap"><code>🤖 AI Assistant is ready! Type 'exit' to quit.

You > Hi! Please write 3 good things about corn flakes for me 

Assistant > Hi! Here are three good things about corn flakes:

1. **Nutritional Value**: Corn flakes are typically fortified with essential vitamins and minerals such as iron, vitamin B, and folic acid, contributing to a balanced diet.

2. **Low in Fat**: Corn flakes are generally low in fat, making them a suitable option for those looking 
to maintain or reduce their fat intake.

3. **Convenience**: They are quick and easy to prepare, offering a convenient breakfast option or snack with minimal preparation.
<strong>
</strong><strong>You > Thank you! And now, after the flakes, it's a good day for Python, isn't it? :)
</strong>
Assistant > Absolutely! A good bowl of ideas with a sprinkle of Python code can make any day better. Whether it's for data analysis, web development, automation, or just playing around with new concepts, Python is versatile and beginner-friendly, making it a great choice to dive into. Happy coding!

You > Bye! exit

Assistant > Goodbye! If you have more questions in the future, feel free to reach out. Have a great day!
</code></pre>



</details>

