---
icon: binary
---

# Embeddings

New Embedding Models

The latest embedding models from AI/ML API, `text-embedding-3-small` and `text-embedding-3-large`, are now available. These models offer cost savings, enhanced multilingual support, and customizable parameters to manage their size.

#### What are Embeddings?

Embeddings from AI/ML API quantify the similarity between text strings. These embeddings are particularly useful for:

* **Search**: Rank search results by their relevance to a query.
* **Clustering**: Group similar text strings together.
* **Recommendations**: Suggest items based on related text strings.
* **Anomaly Detection**: Identify outliers that differ significantly from the norm.
* **Diversity Measurement**: Analyze the spread of similarities within a dataset.
* **Classification**: Categorize text strings by comparing them to labeled examples.

An embedding is a vector (list) of floating-point numbers, where the distance between vectors indicates their relatedness. Smaller distances indicate higher similarity, while larger distances suggest lower similarity.

For more information on Embeddings pricing, visit our pricing page. Costs are calculated based on the number of tokens in the input.



**Example: Generating Embeddings**

```
curl https://api.aimlapi.com/v1/embeddings \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $AIMLAPI_API_KEY" \
  -d '{
    "input": "Your text string goes here",
    "model": "text-embedding-3-small"
  }'

```

The response will include the embedding vector and additional metadata.

**Example Embedding Response**

```json
{
  "object": "list",
  "data": [
    {
      "object": "embedding",
      "index": 0,
      "embedding": [
        -0.006929283495992422,
        -0.005336422007530928,
        // ...(omitted for spacing)
        -4.547132266452536e-05,
        -0.024047505110502243
      ]
    }
  ],
  "model": "text-embedding-3-small",
  "usage": {
    "prompt_tokens": 5,
    "total_tokens": 5
  }
}


```

By default, the length of the embedding vector is 1536 for `text-embedding-3-small` or 3072 for `text-embedding-3-large`. You can reduce the dimensions of the embedding using the `dimensions` parameter without losing its ability to represent concepts. More details on embedding dimensions can be found in the embedding use case section.

#### Embedding Models

AI/ML API offers two robust third-generation embedding models (indicated by -3 in the model ID).&#x20;

| Model                  | \~ Pages per Dollar | Performance on MTEB Eval | Max Input Tokens |
| ---------------------- | ------------------- | ------------------------ | ---------------- |
| text-embedding-3-small | 62,500              | 62.3%                    | 8191             |
| text-embedding-3-large | 9,615               | 64.6%                    | 8191             |
| text-embedding-ada-002 | 12,500              | 61.0%                    | 8191             |

#### Example in Python

Here's how to use the embeddings API in Python:

```python
import os
import json
import openai

# Initialize the API client
client = openai.OpenAI(
    base_url="https://api.aimlapi.com/v1",
    api_key=os.getenv("AIMLAPI_API_KEY"),
)

# Define the text for which to generate an embedding
text = "Your text string goes here"

# Request the embedding
response = client.embeddings.create(
    input=text,
    model="text-embedding-3-small"
)

# Extract the embedding from the response
embedding = response['data'][0]['embedding']

# Print the embedding
print(json.dumps(embedding, indent=2))

```

This Python example shows how to set up an API client, send text to the embeddings API, and handle the response to extract and print the embedding vector.
