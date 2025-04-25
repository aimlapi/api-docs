---
hidden: true
icon: user-group
---

# Create an Assistant to Discuss a Specific Document

## Idea and Step-by-Step Plan

Today, we’re going to create an AI [Assistant](../solutions/openai/assistants/) that helps users engage with the content of a particular document. This assistant can answer questions about the text, explain specific sections, find relevant parts, and even participate in discussions — for example, by offering arguments, clarifying ambiguous points, or helping formulate conclusions. It's especially useful when working with technical documentation, legal texts, research papers, or project documents.

The following features need to be implemented:

* Core assistant functionality (ability to communicate with the user and respond accurately to questions using [Chat Completion](../capabilities/completion-or-chat-models.md) capability).
* Document upload (TXT).

## Implementation

Core functionality:

```python
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

PDF uploading

{% code overflow="wrap" %}
```python
file = client.files.create(
    file=open("bonus.pdf", "rb"),
    purpose='assistants'
)
print(file)
```
{% endcode %}

## Full Code Example

<details>

<summary>Expand</summary>



{% code overflow="wrap" %}
```python
```
{% endcode %}

</details>
