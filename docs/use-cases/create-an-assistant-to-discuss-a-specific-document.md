---
icon: user-group
---

# Create an Assistant to Discuss a Specific Document

## Idea and Step-by-Step Plan

Today, we’re going to create an AI [Assistant](../solutions/openai/assistants/) that helps users engage with the content of a particular document. This Assistant can answer questions about the text, explain specific sections, find relevant parts, and even participate in discussions — for example, by offering arguments, clarifying ambiguous points, or helping formulate conclusions. It's especially useful when working with technical documentation, legal texts, research papers, or project documents.

The following features need to be implemented:

* Core Assistant functionality (ability to communicate with the user and respond accurately to questions using [Chat Completion](../capabilities/completion-or-chat-models.md) capability).
* Document upload (TXT).
* Streaming mode.

{% hint style="success" %}
You can read the step-by-step explanation below or jump straight to the [ready-to-use Python code](create-an-assistant-to-discuss-a-specific-document.md#full-code-example) at the bottom of this page. \
Make sure you have [your AIMLAPI key](https://aimlapi.com/app/keys)!
{% endhint %}

## Step-by-Step Explanation

### 1. Preparing Input File

As input, we used a `.txt` file with the following content and placed it in the same directory as our Python script. For testing, we created a simple file with recipes for three different dishes.

<details>

<summary>Input Text File (recipes.txt)</summary>

{% code overflow="wrap" %}
```
1. Sun-Dried Tomato & Garlic Pasta

Prep Time: 25 minutes
Servings: 2

Ingredients:
•	200g spaghetti
•	6–8 sun-dried tomatoes in oil
•	2 garlic cloves
•	Olive oil — 2 tbsp
•	Salt — to taste
•	Black pepper — to taste
•	Fresh basil (optional)
Required Kitchen Tools:
•	Large pot
•	Frying pan
•	Strainer
•	Cutting board & knife
•	Wooden spoon
Instructions:
1.	Boil a large pot of salted water and cook the spaghetti according to package instructions.
2.	While the pasta cooks, finely chop the garlic and sun-dried tomatoes.
3.	In a frying pan, heat olive oil over medium heat. Add garlic and cook for 30 seconds until fragrant.
4.	Add sun-dried tomatoes and stir for 2–3 minutes.
5.	Drain the pasta and toss it into the pan with the tomato-garlic mixture.
6.	Mix well, season with salt and pepper, and garnish with fresh basil if desired.
7.	Serve hot.


2. Chickpea & Avocado Salad

Prep Time: 15 minutes
Servings: 2

Ingredients:
•	1 can of chickpeas (400g), drained and rinsed
•	1 ripe avocado, diced
•	1 small red onion, finely chopped
•	Juice of 1 lemon
•	Olive oil — 1 tbsp
•	Salt & pepper — to taste
•	Fresh parsley (optional)
Required Kitchen Tools:
•	Mixing bowl
•	Cutting board & knife
•	Fork or spoon
•	Citrus squeezer (optional)
Instructions:
1.	In a bowl, combine chickpeas, diced avocado, and chopped red onion.
2.	Squeeze in lemon juice and drizzle with olive oil.
3.	Season with salt and pepper.
4.	Toss everything gently to mix, trying not to mash the avocado.
5.	Top with chopped parsley if desired.
6.	Serve immediately or chill for 10 minutes.


3. Quick Oatmeal Banana Cookies
Prep Time: 10 minutes
Bake Time: 15 minutes
Servings: ~12 cookies

Ingredients:
•	2 ripe bananas
•	1 cup rolled oats
•	1/4 cup chocolate chips or chopped nuts (optional)
•	1/2 tsp cinnamon (optional)
Required Kitchen Tools:
•	Mixing bowl
•	Fork or potato masher
•	Baking tray
•	Parchment paper
•	Oven
Instructions:
1.	Preheat oven to 180°C (350°F). Line a baking tray with parchment paper.
2.	In a bowl, mash the bananas until smooth.
3.	Mix in oats and any add-ins like chocolate chips or cinnamon.
4.	Scoop spoonfuls of the mixture onto the tray and flatten slightly.
5.	Bake for 12–15 minutes until edges are golden.
6.	Let cool for a few minutes before serving.

```
{% endcode %}

</details>

### 2. Core assistant functionality

Assistants are a highly advanced way of working with chat models. If you have never worked with OpenAI Assistants before, we recommend reviewing the key concepts and structure of how Assistants operate in the [corresponding section](../solutions/openai/assistants/#main-entities-in-assistants-workflow).

Below, in the expandable sections, you can see a still quite basic example of creating a working Assistant, and a little further down, an example of a conversation with it in the console. To exit, you need to type `exit` or `quit`. Please note: this example is written without using the [streaming mode](../capabilities/streaming-mode.md), which means the Assistant does not provide an answer word by word, but first forms it completely, and then the entire response appears in the console at once.

<details>

<summary>Simple Example with the Core Assistant Functionality </summary>

```python
import openai
from openai import OpenAI

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

def initial_request():
    client.beta.threads.messages.create(
        thread_id=thread.id,
        role="user",
        content="Hi! Let's chat!",
    )


def send_message(user_message):
    """Send a message to the assistant and receive a full response"""
    if not user_message.strip():
        print("⚠️ Message cannot be empty!")
        return

    # Add the user's message to the thread
    client.beta.threads.messages.create(
        thread_id=thread_id,
        role="user",
        content=user_message
    )

    # Start a new run and wait for completion
    run = client.beta.threads.runs.create_and_poll(
        thread_id=thread_id,
        assistant_id=assistant_id,
        instructions="Keep responses concise and clear."
    )

    # Check if the run was successful
    if run.status == "completed":
        # Retrieve messages from the thread
        messages = client.beta.threads.messages.list(thread_id=thread_id)
        
        # Find the last assistant message
        for message in reversed(messages.data):
            if message.role == "assistant":
                print()  # Add an empty line for spacing
                print(f"assistant > {message.content[0].text.value}")
                return

    print("⚠️ Error: Failed to get a response from the assistant.")


# Main chat loop
initial_request()
print("🤖 AI Assistant is ready! Type 'exit' to quit.")
while True:
    user_input = input("\nYou > ")
    if user_input.lower() in ["exit", "quit"]:
        print("👋 Chat session ended. See you next time!")
        break
    send_message(user_input)

```

</details>

<details>

<summary>Interaction Example</summary>

{% code overflow="wrap" %}
```
🤖 AI Assistant is ready! Type 'exit' to quit.

You > Hi! What could we discuss today?

assistant > Hi there! We could chat about a wide range of topics. Here are a few options:
Current events or news updates.
Technology advancements.
Book or movie recommendations.
Travel destinations.
Hobbies or personal interests.
Let me know what you’re interested in!

You > Cool! Okay, maybe next time! Bye!

assistant > Goodbye! If you have more questions in the future, feel free to ask. Have a great day! 😊

You > exit

👋 Chat session ended. See you next time!
```
{% endcode %}

</details>

### 3. Let's Add a File to Discuss!

Since we want to immediately start discussing the file contents with the Assistant upon launch, we need to pass it to the Assistant in advance, directly in the code.\
First, we will open our .txt file using Python’s built-in mechanism and pass the file ID in the first user message created directly from the code. The text of this initial message will be set as follows: "_Here's my .txt file — extract the text, read through it, and let me know when you're ready to start answering my questions about this document._"

<details>

<summary><strong>File uploading</strong></summary>

{% code overflow="wrap" %}
```python
file = client.files.create(
    file=open("recipes.txt", "rb"),
    purpose='assistants'
)
print(file)
```
{% endcode %}

</details>

<details>

<summary><strong>Creating the first message in code with attaching the file</strong></summary>

{% code overflow="wrap" %}
```python
# First message with file attachment
client.beta.threads.messages.create(
    thread_id=thread.id,
    role="user",
    content="Here's my .txt file — extract the text, read through it, and let me know when you're ready to start answering my questions about this document.",
    attachments=[
        {
            "file_id": txt_id,
            "tools": [{"type": "file_search"}]
        }
    ]
)
```
{% endcode %}

</details>

### 4. Add Streaming Mode

For a more dynamic interaction, the established practice when communicating with online AI chats is now [streaming mode](../capabilities/streaming-mode.md), where the model's response appears on the user's screen word by word as it is being formed. Let's add this feature to our Assistant as well.

<details>

<summary>Explanation</summary>

**How to handle events**

To do this, we will use the pre-built `EventHandler` class from the `AssistantEventHandler` library.

```python
from openai import AssistantEventHandler
```

Creating the handler:

{% code overflow="wrap" %}
```python
# Custom event handler to stream assistant responses
class EventHandler(AssistantEventHandler):
    def on_text_created(self, text):
        print("\nassistant >", end="", flush=True)

    def on_text_delta(self, delta, snapshot):
        print(delta.value, end="", flush=True)

    def on_tool_call_created(self, tool_call):
        print(f"\nassistant > {tool_call.type}\n", flush=True)

    def on_tool_call_delta(self, delta, snapshot):
        if delta.type == 'file_search':
            if delta.file_search.input:
                print(delta.file_search.input, end="", flush=True)
            if delta.file_search.outputs:
                print(f"\n\noutput >", flush=True)
                for output in delta.file_search.outputs:
                    if output.type == "logs":
                        print(f"\n{output.logs}", flush=True)
```
{% endcode %}

**What events are handled**

`on_text_created(self, text)`

Triggered when the Assistant creates a text response. The code simply prints `assistant >` to indicate the beginning of the output.

`on_text_delta(self, delta, snapshot)`

Triggered when new parts of text (tokens) arrive. The code prints each new word or letter to the console without a newline (end=""), creating the effect of the text appearing gradually.

`on_tool_call_created(self, tool_call)`

Triggered if the Assistant decides to use one of the tools (e.g., Code Interpreter or external APIs). The code simply prints the type of the invoked tool.

`on_tool_call_delta(self, delta, snapshot)`

Triggered when the assistant sends data to a tool or receives a result from it.

***

**How it works**

When the Assistant starts forming a response, it triggers `on_text_created`.

Then, as tokens are generated, `on_text_delta` is triggered, updating the text in real time.

If a tool is used in the response, `on_tool_call_created` is triggered, followed by `on_tool_call_delta` to show the process of the tool handling the data.

</details>

In the next section, you will find the ready-made code for creating an Assistant, passing it an input file, and interacting with it in streaming mode. At the end of the page, you will also find the listing of our conversation with this Assistant.

## Full Code Example

<details>

<summary>Code</summary>

{% code overflow="wrap" %}
```python
import openai
from openai import OpenAI
from openai import AssistantEventHandler

client = openai.OpenAI(
    base_url="https://api.aimlapi.com/",
    # Replace with your AIMLAPI key
    api_key="<YOUR_AIMLAPI_KEY>"
)

# Custom event handler to stream assistant responses
class EventHandler(AssistantEventHandler):
    def on_text_created(self, text):
        print("\nassistant >", end="", flush=True)

    def on_text_delta(self, delta, snapshot):
        print(delta.value, end="", flush=True)

    def on_tool_call_created(self, tool_call):
        print(f"\nassistant > {tool_call.type}\n", flush=True)

    def on_tool_call_delta(self, delta, snapshot):
        if delta.type == 'file_search':
            if delta.file_search.input:
                print(delta.file_search.input, end="", flush=True)
            if delta.file_search.outputs:
                print(f"\n\noutput >", flush=True)
                for output in delta.file_search.outputs:
                    if output.type == "logs":
                        print(f"\n{output.logs}", flush=True)

# Upload the TXT file
file = client.files.create(
    file=open("recipes.txt", "rb"),
    purpose="assistants"
)
txt_id = file.id

# Create the assistant with appropriate instructions
assistant = client.beta.assistants.create(
    name="Recipe Assistant",
    instructions="You assist with questions based on the information from the file that was uploaded to you.",
    tools=[{"type": "file_search"}],
    model="gpt-4o"  # Specify the model
)

# Create a thread for the conversation
thread = client.beta.threads.create()

# First message with file attachment
client.beta.threads.messages.create(
    thread_id=thread.id,
    role="user",
    content="Here's my .txt file — extract the text, read through it, and let me know when you're ready to start answering my questions about this document.",
    attachments=[
        {
            "file_id": txt_id,
            "tools": [{"type": "file_search"}]
        }
    ]
)

# Start the initial run and stream the response
with client.beta.threads.runs.stream(
    thread_id=thread.id,
    assistant_id=assistant.id,
    event_handler=EventHandler()
) as stream:
    stream.until_done()

# Start the interactive loop for further conversation
while True:
    user_input = input("\nYou > ")
    if user_input.lower() in ["exit", "quit"]:
        break

    client.beta.threads.messages.create(
        thread_id=thread.id,
        role="user",
        content=user_input
    )

    with client.beta.threads.runs.stream(
        thread_id=thread.id,
        assistant_id=assistant.id,
        event_handler=EventHandler()
    ) as stream:
        stream.until_done()

```
{% endcode %}

</details>

<details>

<summary>Conversation Example</summary>

{% code overflow="wrap" %}
```
assistant > file_search

assistant >I've accessed the file you uploaded and am ready to assist you with any questions you have about its content. Please feel free to ask!

You > Glad to hear that! Could you briefly summarize what kind of information is contained in this document?

assistant > file_search

assistant >The document you uploaded contains recipes for three different dishes. Here's a brief summary of each:

1. **Sun-Dried Tomato & Garlic Pasta**: This recipe involves cooking spaghetti and then mixing it with a sautéed mixture of garlic and sun-dried tomatoes. It also includes optional garnishing with fresh basil.

2. **Chickpea & Avocado Salad**: This is a quick salad recipe that combines chickpeas, avocado, and red onion, dressed with lemon juice and olive oil. Optional parsley can be added for garnish.

3. **Quick Oatmeal Banana Cookies**: A simple cookie recipe that uses ingredients like ripe bananas and rolled oats, with optional additions like chocolate chips or nuts. The cookies are baked until golden brown【9:0†recipes.txt】.

Feel free to ask any further questions you may have about this document!

You > What's the fastest dish to make?

assistant >The fastest dish to make from the document is the **Chickpea & Avocado Salad**. It requires no cooking and is primarily a matter of combining ingredients like chickpeas, avocado, red onion, lemon juice, and olive oil. The preparation time 
is minimal, especially if you have canned chickpeas which just need to be rinsed【9:0†recipes.txt】.

You > Thanx! is there smth else vegan?  

assistant >Yes, aside from the Chickpea & Avocado Salad, the **Sun-Dried Tomato & Garlic Pasta** is also vegan. It consists of simple ingredients like spaghetti, garlic, and sun-dried tomatoes, with optional basil for garnishing【9:0†recipes.txt】.

You > Awesome, I'm off to the store to get some garlic! By the way, what do your notes mean? like "【9:0†recipes.txt】" 

assistant >The notes like "【9:0†recipes.txt】" are citations that refer back to the specific part of the document where the 
information was found. The numbers indicate:

- `9`: The index of the message or query where this information was accessed.
- `0`: The specific result in the search query result list.
- `recipes.txt`: The name of the document from which the information was extracted.

These citations help keep track of sources for extracted information.

You > Cool, you're honestly really easy to work with! Thanks and see you soon!

assistant >Thank you for your kind words! I'm glad I could help. Don't hesitate to return if you have more questions in the future. Have a great time cooking and see you soon!

You > exit
```
{% endcode %}

</details>

***

Copy the code, insert your AIMLAPI key, specify the path to your document in the code, and give it a try yourself!
