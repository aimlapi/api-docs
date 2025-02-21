---
description: FAQ section about max_tokens parameter and its possible impact on a request.
icon: circle-question
layout:
  title:
    visible: true
  description:
    visible: false
  tableOfContents:
    visible: true
  outline:
    visible: true
  pagination:
    visible: true
---

# Can I call API in the asynchronous mode?

Sure, any of our available models. Let's see how this works with an example in Python.

## Example in Python

Below, we will see how two requests are handled when the second one is shorter and lighter than the first. We will compare synchronous processing (first example) and asynchronous processing (second example). After each example, the **Response** section shows the model's output for both queries. Pay attention to the order in which the answers are returned in each response!

### **Synchronous call:**

```python
from openai import OpenAI

def complete_chat(question):
    api_key = '<YOUR_API_KEY>'
    client = OpenAI(
        base_url='https://api.aimlapi.com',
        api_key=api_key,
    )    

    response = client.chat.completions.create(
        model="gpt-4o",
        messages=[{"role": "user", "content": question}],
    )
    print(f"Response for: {question}\n{response}\n")

def main():
    long_question = "List the 5 most famous hockey players of the 20th century."
    short_question = "What is 2+2?"

    # Execute both requests sequentially
    complete_chat(long_question)
    complete_chat(short_question)

if __name__ == "__main__":
    main()
```

<details>

<summary>Response</summary>

{% code overflow="wrap" %}
```jsonp
Response for: List the 5 most famous hockey players of the 20th century.
ChatCompletion(id='chatcmpl-B2cvJsSA2txXAYTWIfxIg55DYBchm', choices=[Choice(finish_reason='stop', index=0, logprobs=None, message=ChatCompletionMessage(content='The 20th century saw numerous iconic hockey players who made significant impacts 
on the game. Here are five of the most famous:\n\n1. **Wayne Gretzky** - Often referred to as "The Great One," Gretzky set numerous records and is widely considered the greatest hockey player of all time. He played the majority of his career 
in the NHL with the Edmonton Oilers and the Los Angeles Kings.\n\n2. **Bobby Orr** - Renowned for revolutionizing the role of the defenseman in hockey, Orr\'s incredible speed, scoring, and playmaking abilities made him a standout player, primarily with the Boston Bruins.\n\n3. **Gordie Howe** - Known as "Mr. Hockey," Howe\'s career spanned several decades, and he was famous for his toughness, skill, and scoring ability. He played the majority of his career with the Detroit Red Wings.\n\n4. **Mario Lemieux** - Known as "Super Mario," Lemieux was a dominant force with the Pittsburgh Penguins, overcoming numerous health challenges to become one of the game\'s all-time greats.\n\n5. **Maurice "Rocket" Richard** - As a prolific goal scorer, Richard became the first player to score 50 goals in a season and 500 in a career. He played his entire career with the Montreal Canadiens and was an inspiration to generations of players.\n\nEach of these players not only excelled on the ice but also left a lasting legacy on the sport.', refusal=None, role='assistant', audio=None, function_call=None, tool_calls=None))], created=1739965977, model='gpt-4o-2024-08-06', object='chat.completion', service_tier=None, system_fingerprint='fp_523b9b6e5f', usage=CompletionUsage(completion_tokens=9293, prompt_tokens=231, total_tokens=9524, completion_tokens_details=CompletionTokensDetails(accepted_prediction_tokens=0, audio_tokens=0, reasoning_tokens=0, rejected_prediction_tokens=0), prompt_tokens_details=PromptTokensDetails(audio_tokens=0, cached_tokens=0)))

Response for: What is 2+2?
ChatCompletion(id='chatcmpl-B2cvP4PDesi5QipRvtzNHH6vYkszq', choices=[Choice(finish_reason='stop', index=0, logprobs=None, message=ChatCompletionMessage(content='2+2 equals 4.', refusal=None, role='assistant', audio=None, function_call=None, tool_calls=None))], created=1739965983, model='gpt-4o-2024-08-06', object='chat.completion', service_tier=None, system_fingerprint='fp_523b9b6e5f', usage=CompletionUsage(completion_tokens=252, prompt_tokens=147, total_tokens=399, completion_tokens_details=CompletionTokensDetails(accepted_prediction_tokens=0, audio_tokens=0, reasoning_tokens=0, rejected_prediction_tokens=0), prompt_tokens_details=PromptTokensDetails(audio_tokens=0, cached_tokens=0)))
```
{% endcode %}

</details>

### **Asynchronous call**:

```python
import asyncio
from openai import AsyncOpenAI

async def complete_chat(question):
    api_key = '<YOUR_API_KEY>'
    client = AsyncOpenAI(
        base_url='https://api.aimlapi.com',
        api_key=api_key,
    )    

    response = await client.chat.completions.create(
        model="gpt-4o",
        messages=[{"role": "user", "content": question}],
    )
    print(f"Response for: {question}\n{response}\n")

async def main():
    long_question = "List the 5 most famous hockey players of the 20th century."
    short_question = "What is 2+2?"

    # Run both requests concurrently
    await asyncio.gather(
        complete_chat(long_question),
        complete_chat(short_question),
    )

if __name__ == "__main__":
    try:
        asyncio.run(main())  # Works in a regular Python script
    except RuntimeError:
        loop = asyncio.get_event_loop()
        loop.run_until_complete(main())  # Works in Jupyter and other environments

```

<details>

<summary>Response</summary>

{% code overflow="wrap" %}
```jsonp
Response for: What is 2+2?
ChatCompletion(id='chatcmpl-B2cmWSVgRW5N7bq4Plj3C39881Fc3', choices=[Choice(finish_reason='stop', index=0, logprobs=None, message=ChatCompletionMessage(content='2 + 2 equals 4.', refusal=None, role='assistant', audio=None, function_call=None, tool_calls=None))], created=1739965432, model='gpt-4o-2024-08-06', object='chat.completion', service_tier=None, system_fingerprint='fp_523b9b6e5f', usage=CompletionUsage(completion_tokens=284, prompt_tokens=147, total_tokens=431, completion_tokens_details=CompletionTokensDetails(accepted_prediction_tokens=0, audio_tokens=0, reasoning_tokens=0, rejected_prediction_tokens=0), prompt_tokens_details=PromptTokensDetails(audio_tokens=0, cached_tokens=0)))

Response for: List the 5 most famous hockey players of the 20th century.
ChatCompletion(id='chatcmpl-B2cmWL39tvXjlmSGBuA1ckWDiOqQ5', choices=[Choice(finish_reason='stop', index=0, logprobs=None, message=ChatCompletionMessage(content='The 20th century saw many legendary hockey players who left a significant impact 
on the sport. Here are five of the most famous:\n\n1. **Wayne Gretzky** - Often referred to as "The Great One," Gretzky is widely considered the best hockey player of all time. His records and achievements have set the standard for excellence in the NHL.\n\n2. **Gordie Howe** - Known as "Mr. Hockey," Howe\'s career spanned five decades, and he was renowned for 
his scoring ability, physical play, and longevity in the sport.\n\n3. **Bobby Orr** - Orr revolutionized the defenseman position with his offensive skills and skating ability. He is most famous for his time with the Boston Bruins and his iconic "flying goal."\n\n4. **Maurice "Rocket" Richard** - A goal-scoring machine, Richard became the first player in NHL history to score 50 goals in a single season and 500 in a career. He was an icon for the Montreal Canadiens and a hero in Quebec.\n\n5. **Mario Lemieux** - Known as "Super Mario," Lemieux was an incredibly skilled player who overcame health challenges to become one of the most prolific scorers in NHL history.\n\nThese players not only dominated in their respective eras but also contributed to the evolution and popularity of hockey worldwide.', refusal=None, role='assistant', audio=None, function_call=None, tool_calls=None))], created=1739965432, model='gpt-4o-2024-08-06', object='chat.completion', service_tier=None, system_fingerprint='fp_523b9b6e5f', usage=CompletionUsage(completion_tokens=8537, prompt_tokens=231, total_tokens=8768, completion_tokens_details=CompletionTokensDetails(accepted_prediction_tokens=0, audio_tokens=0, reasoning_tokens=0, rejected_prediction_tokens=0), prompt_tokens_details=PromptTokensDetails(audio_tokens=0, cached_tokens=0)))

```
{% endcode %}

</details>

As we can see, in the case of asynchronous execution, the response to a shorter or lighter query may be returned faster than the response to a longer or more complex one, even if the lighter query was formally queued second.&#x20;
