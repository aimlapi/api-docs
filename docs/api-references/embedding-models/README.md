---
icon: binary
---

# Embedding Models

We support multiple embedding models. You can find the [complete list](./#all-available-embedding-models) along with API reference links at the end of the page.

## What are Embeddings?

Embeddings from AI/ML API quantify the similarity between text strings. These embeddings are particularly useful for:

* **Search**: Rank search results by their relevance to a query.
* **Clustering**: Group similar text strings together.
* **Recommendations**: Suggest items based on related text strings.
* **Anomaly Detection**: Identify outliers that differ significantly from the norm.
* **Diversity Measurement**: Analyze the spread of similarities within a dataset.
* **Classification**: Categorize text strings by comparing them to labeled examples.

An embedding is a vector (list) of floating-point numbers, where the distance between vectors indicates their relatedness. Smaller distances indicate higher similarity, while larger distances suggest lower similarity.

## Pricing

For more information on Embeddings pricing, visit our [pricing page](https://aimlapi.com/ai-ml-api-pricing). Costs are calculated based on the number of tokens in the input.

## **Example: Generating Embeddings**

```shell
curl https://api.aimlapi.com/v1/embeddings \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $AIMLAPI_API_KEY" \
  -d '{
    "input": "Your text string goes here",
    "model": "text-embedding-3-small"
  }'

```

The response will include the embedding vector and additional metadata:

<details>

<summary><strong>Response</strong></summary>

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

</details>

By default, the length of the embedding vector is 1536 for `text-embedding-3-small` or 3072 for `text-embedding-3-large`. You can reduce the dimensions of the embedding using the `dimensions` parameter without losing its ability to represent concepts. More details on embedding dimensions can be found in the embedding use case section.

## Example in Python

Here's how to use the embeddings API in Python:

```python
import os
import json
import openai

# Initialize the API client
client = openai.OpenAI(
    base_url="https://api.aimlapi.com/v1",
    api_key=os.getenv("<YOUR_AIMLAPI_KEY"),
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

## All Available Embedding Models

<table><thead><tr><th width="274.20001220703125">Model ID</th><th width="124.20001220703125">Developer</th><th width="103.60009765625">Context</th><th>Model Card</th></tr></thead><tbody><tr><td><a href="OpenAI/text-embedding-3-small.md">text-embedding-3-small</a></td><td>Open AI</td><td>8000</td><td>-</td></tr><tr><td><a href="OpenAI/text-embedding-3-large.md">text-embedding-3-large</a></td><td>Open AI</td><td>8000</td><td><a href="https://aimlapi.com/models/text-embedding-3-large">Text-embedding-3-large</a></td></tr><tr><td><a href="OpenAI/text-embedding-ada-002.md">text-embedding-ada-002</a></td><td>Open AI</td><td>8000</td><td><a href="https://aimlapi.com/models/text-embedding-ada-002">Text-embedding-ada-002</a></td></tr><tr><td><a href="Together-AI/m2-bert-80M-retrieval.md">togethercomputer/m2-bert-80M-32k-retrieval</a></td><td>Together AI</td><td>32000</td><td><a href="https://aimlapi.com/models/m2-bert-retrieval-32k">M2-BERT-Retrieval-32k</a></td></tr><tr><td><a href="BAAI/bge-base-en.md">BAAI/bge-base-en-v1.5</a></td><td>BAAI</td><td></td><td><a href="https://aimlapi.com/models/baai-bge-base-1p5">BAAI-Bge-Base-1p5</a></td></tr><tr><td><a href="Together-AI/m2-bert-80M-retrieval.md">togethercomputer/m2-bert-80M-2k-retrieval</a></td><td>Together AI</td><td></td><td><a href="https://aimlapi.com/models/m2-bert-retrieval-2k">M2-BERT-Retrieval-2K</a></td></tr><tr><td><a href="BAAI/bge-large-en.md">BAAI/bge-large-en-v1.5</a></td><td>BAAI</td><td></td><td><a href="https://aimlapi.com/models/baai-bge-large-1p5">bge-large-en</a></td></tr><tr><td><a href="Together-AI/m2-bert-80M-retrieval.md">togethercomputer/m2-bert-80M-8k-retrieval</a></td><td>Together AI</td><td>8000</td><td><a href="https://aimlapi.com/models/m2-bert-retrieval-8k">M2-BERT-Retrieval-8k</a></td></tr><tr><td><a href="Anthropic/voyage-large-2-instruct.md">voyage-large-2-instruct</a></td><td>Anthropic</td><td>16000</td><td><a href="https://aimlapi.com/models/voyage-large-2-instruct-api">Voyage Large 2 Instruct</a></td></tr><tr><td><a href="Anthropic/voyage-finance-2.md">voyage-finance-2</a></td><td>Anthropic</td><td>32000</td><td>-</td></tr><tr><td><a href="Anthropic/voyage-multilingual-2.md">voyage-multilingual-2</a></td><td>Anthropic</td><td>32000</td><td>-</td></tr><tr><td><a href="Anthropic/voyage-law-2.md">voyage-law-2</a></td><td>Anthropic</td><td>16000</td><td>-</td></tr><tr><td><a href="Anthropic/voyage-code-2.md">voyage-code-2</a></td><td>Anthropic</td><td>16000</td><td>-</td></tr><tr><td><a href="Anthropic/voyage-large-2.md">voyage-large-2</a></td><td>Anthropic</td><td>16000</td><td>-</td></tr><tr><td><a href="Anthropic/voyage-2.md">voyage-2</a></td><td>Anthropic</td><td>4000</td><td>-</td></tr><tr><td><a href="Google/textembedding-gecko.md">textembedding-gecko@001</a></td><td>Google</td><td>3000</td><td>-</td></tr><tr><td><a href="Google/textembedding-gecko.md">textembedding-gecko@003</a></td><td>Google</td><td>2000</td><td><a href="https://aimlapi.com/models/textembedding-gecko-003-api">Textembedding-gecko@003</a></td></tr><tr><td><a href="Google/textembedding-gecko.md">textembedding-gecko-multilingual@001</a></td><td>Google</td><td>2000</td><td><a href="https://aimlapi.com/models/textembedding-gecko-multilingual-001-api">Textembedding-gecko-multilingual@001</a></td></tr><tr><td><a href="Google/text-multilingual-embedding-002.md">text-multilingual-embedding-002</a></td><td>Google</td><td>2000</td><td>-</td></tr></tbody></table>
