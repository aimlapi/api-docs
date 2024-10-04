---
icon: book-open
description: >-
  Learn how you can tweak results of your AI/ML API responses with tailored
  requests
---

# Parameters

## Overview

When you send a request to the text model, you can specify custom parameters that affect the model's response. These parameters can control your model usage, optimize your requests, and achieve more creative or exact results.

## Possible Parameters

### Maximum Tokens

This parameter specifies the maximum number of tokens (words or pieces of words) that the model will generate in response to the prompt. A lower number of tokens typically results in faster response times.

```python
max_tokens = 50  # Limit the model to generate up to 50 tokens.
```

### Stop Sequences

Stop sequences are strings that, when detected in the model's output, signal the model to stop generating further tokens. This is particularly useful when the desired output is a concise response or a single word.

```python
stop = ["\n"]  # Instructs the model to stop generating when it produces a newline character.
```

### Temperature

The temperature controls the randomness of the model's output. Setting it to 0 results in deterministic output, whereas higher values up to 1 introduce more variation and creativity in responses.

```python
temperature = 0.5  # Sets a balance between randomness and determinism.
```

### Top P (Nucleus Sampling)

The top P parameter, also known as nucleus sampling, filters the model's token choices such that the cumulative probability of the tokens considered at each step is at least P. This method allows for more dynamic and contextually relevant responses.

```python
top_p = 0.9  # Only tokens that contribute to the top 90% cumulative probability are considered.
```

### Top K (Top-K Sampling)

Top K limits the model's choices to the K most likely next tokens. Lower values can speed up generation and may improve coherency by focusing on the most probable tokens.

```python
top_k = 40  # The model will only consider the top 40 most probable next tokens.
```

### Repetition Penalty

This parameter discourages the model from repeating the same line or phrase, promoting more diverse and engaging content.

```python
repetition_penalty = 1.2  # Applies a penalty to discourage repetition.
```
