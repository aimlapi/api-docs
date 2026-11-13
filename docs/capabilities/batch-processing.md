---
description: >-
  Run many chat completion requests asynchronously at a lower price: upload a
  JSONL file, create a batch, and download the results within 24 hours.
---

# Batch Processing

Batch processing runs many Chat Completions requests asynchronously. You write the requests to a JSONL file, upload it, create a batch from it, and download the results when the batch ends, within 24 hours. A request in a batch costs less than the same request sent on its own: see [Models and prices](#models-and-prices).

The API follows OpenAI's Batch API. If you use the OpenAI SDK, change the base URL and the API key: `files.create`, `files.content` and every `batches.*` call work as they are, for input files up to 50 MiB.

| Action                    | Endpoint                             |
| ------------------------- | ------------------------------------ |
| Upload a file             | `POST /v1/files`                     |
| List files                | `GET /v1/files`                      |
| Get a file                | `GET /v1/files/{file_id}`            |
| Download a file's content | `GET /v1/files/{file_id}/content`    |
| Delete a file             | `DELETE /v1/files/{file_id}`         |
| Create a batch            | `POST /v1/batches`                   |
| Get a batch               | `GET /v1/batches/{batch_id}`         |
| List batches              | `GET /v1/batches`                    |
| Cancel a batch            | `POST /v1/batches/{batch_id}/cancel` |

{% hint style="info" %}
The [older inline format](#legacy-inline-format) (a `requests` array in the body, Anthropic models only) still works. New integrations should use the file-based flow on this page.
{% endhint %}

***

## How a batch works

1. **Write the file.** Put one request per line in a JSONL file. Every line uses the same model and sets `max_tokens`.
2. **Upload it** with `purpose=batch`. You get a file ID.
3. **Create the batch** with that file ID. The answer comes at once, with the status `validating`.
4. **Validation.** Every line is checked, the worst-case cost of the batch is reserved on your balance, and the batch is sent to the model's provider. The status becomes `in_progress`.
5. **The batch ends.** The results are collected (`finalizing`), and the batch ends as `completed`, `expired`, `cancelled` or `failed`. You are charged once, for what ran, and the rest of the reservation is released.
6. **Read the results** from the output file and the error file. Poll the batch, or pass a [`webhook_url`](#get-notified-when-a-batch-ends) to be notified when it ends.

## Models and prices

A batch price is set per model. For most providers it is 50% of the provider's list price; for xAI it is 20% below the standard price. A batch runs at the model's own provider, with no fallback to another provider.

| Provider      | Models                                                                                                                                                                  | Batch price           |
| ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------- |
| Anthropic     | Claude Opus 4.5, 4.6, 4.7, 4.8, 5 and 5.5; Claude Sonnet 4.5, 4.6, 5 and 5.5; Claude Haiku 4.5 and 5.5; Claude Fable 5, 5.1 and 5.2                                      | 50% of list price     |
| OpenAI        | GPT-6 Astra, GPT-6 Sol, GPT-6 Luna, GPT-6.1 Sol, GPT-6.1 Terra, GPT-5.6 Sol, Terra and Luna, GPT-5.5, GPT-5.4, GPT-5.2, GPT-5.1, GPT-5, GPT-5 mini, GPT-5 nano, GPT-4.1, GPT-4.1 mini, GPT-4o, GPT-4o mini, o3 | 50% of list price     |
| Google        | Gemini 2.5 Pro, Gemini 3.1 Pro Preview, Gemini 3 Flash Preview, Gemini 3.5 Flash, Gemini 3.7 Flash, Gemini 3.8 Flash, Gemini 3.1 Flash-Lite, Gemini 3.5 Flash-Lite       | 50% of list price     |
| Alibaba Cloud | Qwen Max, Qwen3.8 Max, Qwen3.7 Plus, Qwen Plus                                                                                                                          | 50% of list price     |
| Mistral       | Mistral Large (`mistral-large-4-0`)                                                                                                                                     | 50% of list price     |
| xAI           | Grok 4.3, Grok 4.5, Grok 4.6, Grok 4.7, Grok 4.20 (0309) reasoning and non-reasoning                                                                                    | 20% below standard    |

The exact batch price of a model is in the [model list](../api-references/service-endpoints/complete-model-list.md): with `?include=pricing`, a model that can run in a batch carries a `pricing.batch` block with its units and thresholds. A model without `pricing.batch` cannot run in a batch: creating one returns `400 model_not_supported_for_batch`.

***

## Prepare the input file

The input file is JSONL: one JSON object per line. Each line is one Chat Completions request:

{% code overflow="wrap" %}
```json
{"custom_id": "request-1", "method": "POST", "url": "/v1/chat/completions", "body": {"model": "anthropic/claude-opus-5-5", "max_tokens": 1024, "messages": [{"role": "user", "content": "How to learn NestJS?"}]}}
{"custom_id": "request-2", "method": "POST", "url": "/v1/chat/completions", "body": {"model": "anthropic/claude-opus-5-5", "max_tokens": 1024, "messages": [{"role": "user", "content": "How to learn React?"}]}}
```
{% endcode %}

| Field       | Rule                                                                                                                                                                                       |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `custom_id` | Your ID of the request: 1 to 512 characters, unique in the file. Any text works, and you get it back unchanged with the result. All `custom_id`s of a file together are at most 16 MiB |
| `method`    | `POST`                                                                                                                                                                                     |
| `url`       | `/v1/chat/completions`                                                                                                                                                                     |
| `body`      | The Chat Completions request body, with the rules below                                                                                                                                    |

Rules for `body`:

* **One model per file.** Every line names the same model ID, spelled the same way.
* **`max_tokens` or `max_completion_tokens` is required** on every line. The reservation for the batch is priced from it (see [Billing](#billing)), so a line without one fails with `max_tokens_required`.
* **Text and function tools only.** `messages` takes the roles `system`, `developer`, `user`, `assistant` and `tool`, with `content` as a string or an array of `text` parts, plus `name`, `tool_calls` and `tool_call_id`. Images, audio, files and server tools (such as web search) are not supported.
* **Supported fields:** `model`, `messages`, `max_tokens`, `max_completion_tokens`, `temperature`, `top_p`, `stop`, `seed`, `frequency_penalty`, `presence_penalty`, `response_format` (`text`, `json_object`, `json_schema`), `tools` (type `function`), `tool_choice`, `parallel_tool_calls` and `user`. `stream` may only be `false` and `n` only `1`. `cache_control` is accepted on messages, text parts and tools. Any other field fails the line, and the error names the field.
* **Size.** A line is at most 1 MiB. The file is at most 200 MiB, and at most the provider's own limit (see [Limits](#limits)).

{% hint style="warning" %}
The whole file is checked before anything is sent or reserved. If any line breaks a rule above, the batch ends as `failed`, and its `errors` list the first 100 problems with their line numbers. Nothing is charged. Fix the file and create the batch again.
{% endhint %}

## Upload the file

{% openapi-operation spec="file-upload" path="/v1/files" method="post" %}
[OpenAPI file-upload](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/capabilities/file-upload.json)
{% endopenapi-operation %}

<details>

<summary>Code Example (Python)</summary>

{% code overflow="wrap" %}
```python
import requests
import json  # for getting a structured output with indentation

# Insert your AIML API Key instead of <YOUR_AIMLAPI_KEY>
API_KEY = "<YOUR_AIMLAPI_KEY>"
BASE_URL = "https://api.aimlapi.com/v1"

headers = {"Authorization": f"Bearer {API_KEY}"}

with open("requests.jsonl", "rb") as f:
    response = requests.post(
        f"{BASE_URL}/files",
        headers=headers,
        files={"file": ("requests.jsonl", f, "application/jsonl")},
        data={"purpose": "batch"},
    )

data = response.json()
print(json.dumps(data, indent=2, ensure_ascii=False))
```
{% endcode %}

</details>

<details>

<summary>Response</summary>

```json5
{
  "id": "file-3f2b8c1e-7a4d-4e0b-9c55-1d2e3f4a5b6c",
  "object": "file",
  "bytes": 342,
  "created_at": 1794585600,
  "expires_at": null,
  "filename": "requests.jsonl",
  "purpose": "batch",
  "status": "processed",
  "status_details": null
}
```

</details>

### Files over 50 MiB

`POST /v1/files` takes a file of up to 50 MiB in one request. For a file of up to 200 MiB, upload it in parts. This flow differs from OpenAI's: the bytes of each part go to a signed link, not in the body of the request, so the OpenAI SDK's `uploads.*` helpers do not work with it. Use plain HTTP:

1. `POST /v1/uploads` with `filename`, `purpose: "batch"`, `bytes` (the total size) and, optionally, `mime_type`. The upload stays open for 1 hour.
2. For each part, `POST /v1/uploads/{upload_id}/parts` with `{"part_number": n}` (from 1). The answer carries a `url`.
3. `PUT` the part's bytes to that `url` and keep the `ETag` header of the answer. Every part except the last must be at least 5 MiB.
4. `POST /v1/uploads/{upload_id}/complete` with `{"parts": [{"part_number": 1, "etag": "..."}, ...]}`. The answer's `file` is the uploaded file; use its `id` as `input_file_id`.

`POST /v1/uploads/{upload_id}/cancel` abandons an upload. You can have up to 20 uploads open at a time.

<details>

<summary>Code Example: upload in parts (Python)</summary>

{% code overflow="wrap" %}
```python
import os
import requests

# Insert your AIML API Key instead of <YOUR_AIMLAPI_KEY>
API_KEY = "<YOUR_AIMLAPI_KEY>"
BASE_URL = "https://api.aimlapi.com/v1"
PATH = "requests.jsonl"
PART_SIZE = 16 * 1024 * 1024  # every part but the last must be at least 5 MiB

headers = {"Authorization": f"Bearer {API_KEY}"}

upload = requests.post(
    f"{BASE_URL}/uploads",
    headers=headers,
    json={
        "filename": os.path.basename(PATH),
        "purpose": "batch",
        "bytes": os.path.getsize(PATH),
        "mime_type": "application/jsonl",
    },
).json()

parts = []
with open(PATH, "rb") as f:
    part_number = 1
    while chunk := f.read(PART_SIZE):
        part = requests.post(
            f"{BASE_URL}/uploads/{upload['id']}/parts",
            headers=headers,
            json={"part_number": part_number},
        ).json()
        # The signed link needs no Authorization header
        put = requests.put(part["url"], data=chunk)
        put.raise_for_status()
        parts.append({"part_number": part_number, "etag": put.headers["ETag"]})
        part_number += 1

completed = requests.post(
    f"{BASE_URL}/uploads/{upload['id']}/complete",
    headers=headers,
    json={"parts": parts},
).json()
print("File ID:", completed["file"]["id"])
```
{% endcode %}

</details>

## Create a batch

{% openapi-operation spec="batch-create-from-file" path="/v1/batches" method="post" %}
[OpenAPI batch-create-from-file](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/capabilities/batch-create-from-file.json)
{% endopenapi-operation %}

The answer comes at once, before the file is read to its end: the batch starts in `validating`. Problems found later, in the file or with the reservation, end the batch as `failed` and are listed in its `errors`.

Batches are created with an API key. To make a retry safe, send an `Idempotency-Key` header (up to 255 characters): the same request with the same key returns the batch the first request created, and a different request with a key you already used returns `409 idempotency_key_reused`.

<details>

<summary>Code Example (Python)</summary>

{% code overflow="wrap" %}
```python
import requests
import json  # for getting a structured output with indentation

# Insert your AIML API Key instead of <YOUR_AIMLAPI_KEY>
API_KEY = "<YOUR_AIMLAPI_KEY>"
BASE_URL = "https://api.aimlapi.com/v1"

headers = {
    "Authorization": f"Bearer {API_KEY}",
    "Content-Type": "application/json",
}

data = {
    "input_file_id": "file-3f2b8c1e-7a4d-4e0b-9c55-1d2e3f4a5b6c",
    "endpoint": "/v1/chat/completions",
    "completion_window": "24h",
    "metadata": {"project": "docs-example"},
}

response = requests.post(f"{BASE_URL}/batches", headers=headers, json=data)
data = response.json()
print("Batch created:", json.dumps(data, indent=2, ensure_ascii=False))
```
{% endcode %}

</details>

<details>

<summary>Response</summary>

```json5
Batch created: {
  "id": "batch_V1StGXR8Z5jdHi6BmyT8k",
  "object": "batch",
  "endpoint": "/v1/chat/completions",
  "model": "anthropic/claude-opus-5-5",
  "errors": null,
  "input_file_id": "file-3f2b8c1e-7a4d-4e0b-9c55-1d2e3f4a5b6c",
  "completion_window": "24h",
  "status": "validating",
  "output_file_id": null,
  "error_file_id": null,
  "created_at": 1794585660,
  "in_progress_at": null,
  "expires_at": 1794672060,
  "finalizing_at": null,
  "completed_at": null,
  "failed_at": null,
  "expired_at": null,
  "cancelling_at": null,
  "cancelled_at": null,
  "request_counts": {
    "total": 0,
    "completed": 0,
    "failed": 0
  },
  "usage": null,
  "metadata": {
    "project": "docs-example"
  }
}
```

</details>

## Statuses

| Status        | Meaning                                                                                                                                                                                        |
| ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `validating`  | The file is being checked, the cost reserved and the batch sent to the provider                                                                                                               |
| `in_progress` | The provider is running the batch. `request_counts` is updated while it runs                                                                                                                  |
| `finalizing`  | The provider has finished, and the results are being collected and priced                                                                                                                     |
| `completed`   | The batch ran to its end. This includes a batch whose lines all failed one by one: read `request_counts` and the error file                                                                   |
| `failed`      | The batch itself was refused: by the file check, by the reservation, or by the provider. `errors` says why                                                                                     |
| `expired`     | The 24-hour window ended before every line ran. Lines that finished are in the output file and are charged; the others are in the error file with `batch_expired`                             |
| `cancelling`  | A cancel was accepted and is in progress                                                                                                                                                       |
| `cancelled`   | The batch was cancelled. Lines that finished before the cancel are in the output file and are charged                                                                                          |

`completed`, `failed`, `expired` and `cancelled` are final. `request_counts.failed` counts lines that failed, expired or were cancelled.

## Check a batch

{% openapi-operation spec="batch-retrieve" path="/v1/batches/{batch_id}" method="get" %}
[OpenAPI batch-retrieve](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/capabilities/batch-retrieve.json)
{% endopenapi-operation %}

<details>

<summary>Code Example (Python)</summary>

{% code overflow="wrap" %}
```python
import time
import requests

# Insert your AIML API Key instead of <YOUR_AIMLAPI_KEY>
API_KEY = "<YOUR_AIMLAPI_KEY>"
BASE_URL = "https://api.aimlapi.com/v1"
batch_id = "batch_V1StGXR8Z5jdHi6BmyT8k"

headers = {"Authorization": f"Bearer {API_KEY}"}

while True:
    batch = requests.get(f"{BASE_URL}/batches/{batch_id}", headers=headers).json()
    print(batch["status"], batch["request_counts"])
    if batch["status"] in ("completed", "failed", "expired", "cancelled"):
        break
    time.sleep(60)

print("Output file:", batch["output_file_id"])
print("Error file:", batch["error_file_id"])
print("Errors:", batch["errors"])
```
{% endcode %}

</details>

<details>

<summary>Response (status: completed)</summary>

```json5
{
  "id": "batch_V1StGXR8Z5jdHi6BmyT8k",
  "object": "batch",
  "endpoint": "/v1/chat/completions",
  "model": "anthropic/claude-opus-5-5",
  "errors": null,
  "input_file_id": "file-3f2b8c1e-7a4d-4e0b-9c55-1d2e3f4a5b6c",
  "completion_window": "24h",
  "status": "completed",
  "output_file_id": "file-8d0c2a4f-91b3-4c7e-a2d5-6f1e0b9c3a71",
  "error_file_id": null,
  "created_at": 1794585660,
  "in_progress_at": 1794585672,
  "expires_at": 1794672060,
  "finalizing_at": 1794586813,
  "completed_at": 1794586820,
  "failed_at": null,
  "expired_at": null,
  "cancelling_at": null,
  "cancelled_at": null,
  "request_counts": {
    "total": 2,
    "completed": 2,
    "failed": 0
  },
  "usage": {
    "input_tokens": 28,
    "input_tokens_details": {
      "cached_tokens": 0
    },
    "output_tokens": 1534,
    "output_tokens_details": {
      "reasoning_tokens": 0
    },
    "total_tokens": 1562
  },
  "metadata": {
    "project": "docs-example"
  }
}
```

</details>

## Read the results

When a batch ends, `output_file_id` points to the results of the lines that succeeded, and `error_file_id` to the lines that failed. Either may be `null` when it has no lines. Download a file with `GET /v1/files/{file_id}/content`.

{% openapi-operation spec="file-content" path="/v1/files/{file_id}/content" method="get" %}
[OpenAPI file-content](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/capabilities/file-content.json)
{% endopenapi-operation %}

The endpoint answers with a `302` redirect to a signed link that works for 5 minutes. Most HTTP clients, and the OpenAI SDK's `files.content`, follow it on their own. Request the content again when you need a new link.

Each line of the output file is the result of one request, with your `custom_id`. The order of the lines is not guaranteed: match results to requests by `custom_id`. `response.body` is a Chat Completions response.

{% code overflow="wrap" %}
```json
{"id": "batch_req_Qm9X2c1vR8kLp3TzYw7aBn5D", "custom_id": "request-1", "response": {"status_code": 200, "request_id": null, "body": {"object": "chat.completion", "choices": [{"index": 0, "message": {"role": "assistant", "content": "..."}, "finish_reason": "stop"}], "usage": {"prompt_tokens": 14, "completion_tokens": 761, "total_tokens": 775}}}, "error": null}
```
{% endcode %}

Each line of the error file has `response: null` and an `error`:

{% code overflow="wrap" %}
```json
{"id": "batch_req_Hk4Ws0eLq2NbV7xCz9mRt1Fy", "custom_id": "request-2", "response": null, "error": {"code": "batch_expired", "message": "The batch window ended before this line ran."}}
```
{% endcode %}

| `error.code`             | Meaning                                                                                                                                  |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `batch_expired`          | The 24-hour window ended before the line ran                                                                                             |
| `batch_cancelled`        | The batch was cancelled before the line ran                                                                                              |
| `batch_line_missing`     | The provider returned no result for the line                                                                                             |
| `batch_result_too_large` | The results of the batch passed the 4 GiB limit, so this line was not stored. Split the file                                             |
| Any other code           | The provider refused or failed this line. `error.status` carries the HTTP status when the provider gave one                             |

Lines in the error file are not charged. Output and error files are deleted 30 days after they are created: see the file's `expires_at`.

<details>

<summary>Code Example (Python)</summary>

{% code overflow="wrap" %}
```python
import json
import requests

# Insert your AIML API Key instead of <YOUR_AIMLAPI_KEY>
API_KEY = "<YOUR_AIMLAPI_KEY>"
BASE_URL = "https://api.aimlapi.com/v1"
batch_id = "batch_V1StGXR8Z5jdHi6BmyT8k"

headers = {"Authorization": f"Bearer {API_KEY}"}

batch = requests.get(f"{BASE_URL}/batches/{batch_id}", headers=headers).json()

def read_lines(file_id):
    # requests follows the redirect to the signed link
    # and drops the Authorization header on the way
    response = requests.get(f"{BASE_URL}/files/{file_id}/content", headers=headers)
    response.raise_for_status()
    return [json.loads(line) for line in response.text.splitlines() if line.strip()]

if batch["output_file_id"]:
    for line in read_lines(batch["output_file_id"]):
        answer = line["response"]["body"]["choices"][0]["message"]["content"]
        print(line["custom_id"], "->", answer[:80])

if batch["error_file_id"]:
    for line in read_lines(batch["error_file_id"]):
        print(line["custom_id"], "failed:", line["error"]["code"], line["error"]["message"])
```
{% endcode %}

</details>

## List batches

{% openapi-operation spec="batch-list" path="/v1/batches" method="get" %}
[OpenAPI batch-list](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/capabilities/batch-list.json)
{% endopenapi-operation %}

Returns your batches of the file-based format, newest first. Pass the `last_id` of a page as `after` to get the next one. A batch of the inline format is not listed; read it by its ID.

<details>

<summary>Code Example (Python)</summary>

{% code overflow="wrap" %}
```python
import requests

# Insert your AIML API Key instead of <YOUR_AIMLAPI_KEY>
API_KEY = "<YOUR_AIMLAPI_KEY>"
BASE_URL = "https://api.aimlapi.com/v1"

headers = {"Authorization": f"Bearer {API_KEY}"}

params = {"limit": 20}
while True:
    page = requests.get(f"{BASE_URL}/batches", headers=headers, params=params).json()
    for batch in page["data"]:
        print(batch["id"], batch["status"], batch["request_counts"])
    if not page["has_more"]:
        break
    params["after"] = page["last_id"]
```
{% endcode %}

</details>

## Cancel a batch

{% openapi-operation spec="batch-cancel-by-id" path="/v1/batches/{batch_id}/cancel" method="post" %}
[OpenAPI batch-cancel-by-id](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/capabilities/batch-cancel-by-id.json)
{% endopenapi-operation %}

| When you cancel                                   | What happens                                                                                                                                                  |
| ------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Before the provider has the batch (`validating`) | The cancel is recorded, and the batch ends as `cancelled` without running. Nothing is charged, and any reservation is released                              |
| While the provider runs it (`in_progress`)        | The provider is asked to stop, and the answer has the status `cancelling`. Lines that finished before the cancel are returned and charged                      |
| The provider refuses the cancel                   | `502 cancel_failed`. The batch keeps running and its reservation stays. Try again                                                                            |
| The batch is already finishing or has ended       | The answer is the batch as it is. Nothing changes: a batch whose results are already being collected ends as what it is                                     |

<details>

<summary>Code Example (Python)</summary>

{% code overflow="wrap" %}
```python
import requests
import json

# Insert your AIML API Key instead of <YOUR_AIMLAPI_KEY>
API_KEY = "<YOUR_AIMLAPI_KEY>"
BASE_URL = "https://api.aimlapi.com/v1"
batch_id = "batch_V1StGXR8Z5jdHi6BmyT8k"

headers = {"Authorization": f"Bearer {API_KEY}"}

response = requests.post(f"{BASE_URL}/batches/{batch_id}/cancel", headers=headers)
print(response.status_code)
print(json.dumps(response.json(), indent=2, ensure_ascii=False))
```
{% endcode %}

</details>

## Get notified when a batch ends

Instead of polling, pass `webhook_url` when you create the batch. When the batch ends, a signed event is sent to that address: `batch.completed`, `batch.failed`, `batch.cancelled` or `batch.expired`.

```json
{
  "input_file_id": "file-3f2b8c1e-7a4d-4e0b-9c55-1d2e3f4a5b6c",
  "endpoint": "/v1/chat/completions",
  "completion_window": "24h",
  "webhook_url": "https://example.com/hooks/aimlapi"
}
```

* The address must be a public `https` URL on port 443 or 8443, with a host name rather than an IP address.
* Your account needs a webhook signing secret first. Without one, the request returns `400 webhook_secret_required`.
* The event carries the batch's `status`, `request_counts`, `output_file_id`, `error_file_id` and up to 10 `errors`. Download the files as described above.

How to create the secret, verify the signature and handle retries: [Webhooks](webhooks.md).

***

## Billing

**Reservation.** After the file is checked, the worst-case cost of the whole batch is reserved on your balance, before anything is sent to the provider. For each line the worst case is:

* the input, counted as one token per 2 bytes of the line (plus 600 tokens for a line with `tools`), at the batch input price;
* plus `max_tokens` (or `max_completion_tokens`) at the batch output price;
* on Gemini models, plus the reasoning budget sent with the line: half of its `max_tokens`;
* on xAI reasoning models (Grok 4.3, 4.5, 4.6, 4.7 and 4.20 reasoning), plus three times its `max_tokens` at the reasoning price, because their reasoning is not bounded by `max_tokens`.

The reservation is held until the batch ends. A lower `max_tokens` lowers it.

**Your balance stays usable.** A batch whose reservation would take more than 80% of your available balance fails with `batch_hold_over_balance_share`, so that your other requests are not refused while it runs. Lower `max_tokens`, split the file, or top up.

**Charge.** You are charged once, when the batch ends, for the usage the provider reported on the lines that succeeded, at the batch price. A succeeded line with no reported usage is priced from an estimate. Failed, expired and cancelled lines are not charged. The rest of the reservation is released.

**Refusals.** If the reservation is refused, the batch ends as `failed` and nothing is charged. The error says how much the batch needed:

| `errors[].code`                 | Meaning                                                                       |
| ------------------------------- | ----------------------------------------------------------------------------- |
| `insufficient_credits`          | Your balance does not cover the worst case of the batch                       |
| `batch_hold_over_balance_share` | The worst case would take more than 80% of your available balance            |
| `key_quota_exceeded`            | The API key's spend limit does not cover the worst case                       |
| `tenant_spend_limit`            | The organization or workspace budget does not cover the worst case            |
| `account_spend_limit`           | The spend limit of a new account does not cover the worst case                |

The batch object shows token `usage`, not amounts of money.

## Files

* **Who sees a file.** A file belongs to the user who uploaded it, in the workspace of the API key used. A batch belongs to the user and workspace that created it, and so do its output and error files. Any other user, including another member of the same organization, and a key of another workspace get `404`.
* **Purposes.** You can upload only `purpose=batch`. Output and error files have the purpose `batch_output`. The Files API lists and serves only these two purposes.
* **Retention.** Output and error files are deleted 30 days after they are created.
* **Deleting an input file** while a batch still uses it returns `409`. The batch reads the file again while it runs and lets go of it when it ends.

### List files

{% openapi-operation spec="file-list" path="/v1/files" method="get" %}
[OpenAPI file-list](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/capabilities/file-list.json)
{% endopenapi-operation %}

### Get a file

{% openapi-operation spec="file-get" path="/v1/files/{file_id}" method="get" %}
[OpenAPI file-get](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/capabilities/file-get.json)
{% endopenapi-operation %}

### Delete a file

{% openapi-operation spec="file-delete" path="/v1/files/{file_id}" method="delete" %}
[OpenAPI file-delete](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/capabilities/file-delete.json)
{% endopenapi-operation %}

## Limits

| Limit                                  | Value                                                                                                                                                                  |
| -------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `endpoint`                             | `/v1/chat/completions` only                                                                                                                                            |
| `completion_window`                    | `24h` only                                                                                                                                                             |
| Input file, `POST /v1/files`           | 50 MiB. A larger request returns `413`                                                                                                                                 |
| Input file, uploaded in parts          | 200 MiB                                                                                                                                                                |
| Uploads open at a time                 | 20 per user. An upload expires 1 hour after it is created                                                                                                              |
| Line                                   | 1 MiB                                                                                                                                                                  |
| `custom_id`                            | 512 characters; 16 MiB for all `custom_id`s of a file                                                                                                                  |
| `metadata`                             | 16 keys; keys up to 64 characters, values up to 512                                                                                                                    |
| Batches in progress                    | 3 per account (per organization, or per user without one). Creating a fourth returns `429 batch_limit_exceeded` with `Retry-After`                                     |
| Lines in progress                      | 100,000 per account across its batches in progress. A batch that would go over it fails during validation with `batch_limit_exceeded`                                  |
| Provider capacity                      | Shared by all accounts. When a provider's capacity is full, creating a batch returns `429 batch_limit_exceeded` (`Retry-After: 300`), or the batch fails during validation |
| Validation                             | A batch still validating after 1 hour fails with `validation_timeout`                                                                                                  |
| Results of one batch                   | 4 GiB for the output and error files together. Lines past it fail with `batch_result_too_large` and are not charged                                                    |

Each provider also limits the size of one batch:

| Provider      | Lines per file | File size |
| ------------- | -------------- | --------- |
| Anthropic     | 100,000        | 256 MB    |
| OpenAI        | 50,000         | 200 MB    |
| Google        | 100,000        | 1 GB      |
| Alibaba Cloud | 50,000         | 500 MB    |
| Mistral       | 100,000        | 512 MB    |
| xAI           | 50,000         | 50 MB     |

The 200 MiB limit on input files applies first. A file over a provider's limit fails with `too_many_requests` or `file_too_large`.

## Errors

A request that is refused returns an OpenAI-style error body:

```json
{
  "error": {
    "message": "Only /v1/chat/completions is supported.",
    "type": "invalid_request_error",
    "param": "endpoint",
    "code": "unsupported_endpoint"
  }
}
```

| Status | `code`                                   | Meaning                                                                                                             |
| ------ | ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| 400    | `unsupported_endpoint`                   | `endpoint` is not `/v1/chat/completions`                                                                            |
| 400    | `unsupported_completion_window`          | `completion_window` is not `24h`                                                                                    |
| 400    | `invalid_metadata`                       | `metadata` breaks its limits                                                                                        |
| 400    | `invalid_idempotency_key`                | `Idempotency-Key` is longer than 255 characters                                                                     |
| 400    | `invalid_file_purpose`                   | The file was not uploaded with `purpose=batch`                                                                      |
| 400    | `empty_file`                             | The file has no requests                                                                                            |
| 400    | `invalid_json`, `invalid_line`, `line_too_large`, `max_tokens_required` | The first line of the file is invalid. The message starts with `Line 1:`                     |
| 400    | `model_not_supported_for_batch`          | The model has no batch price                                                                                        |
| 400    | `model_not_allowed`                      | The API key's model list does not include the model                                                                 |
| 400    | `invalid_webhook_url`, `webhook_secret_required` | See [Get notified when a batch ends](#get-notified-when-a-batch-ends)                                       |
| 400    | `invalid_limit`, `invalid_after`         | Invalid paging parameters of `GET /v1/batches`                                                                      |
| 403    | `api_key_required`                       | Batches are created with an API key                                                                                 |
| 404    | `file_not_found`                         | No such file for this API key and workspace                                                                         |
| 404    | `batch_not_found`                        | No such batch for this API key and workspace                                                                        |
| 409    | `idempotency_key_reused`                 | The `Idempotency-Key` was used for a different request                                                              |
| 429    | `batch_limit_exceeded`                   | Too many batches in progress, or the provider's capacity is full. Wait for `Retry-After` seconds                    |
| 502    | `cancel_failed`                          | The provider did not accept the cancel. The batch keeps running                                                     |

The first line is checked when the batch is created; the rest of the file during validation. Problems found during validation end the batch as `failed`, and the batch's `errors.data` lists them with `line` and `param`:

| `errors[].code`                    | Meaning                                                                                  |
| ---------------------------------- | ---------------------------------------------------------------------------------------- |
| `invalid_json`                     | The line is not valid JSON                                                               |
| `invalid_line`                     | The line breaks the line format, or uses a field that is not supported (named in the message) |
| `line_too_large`                   | The line is over 1 MiB                                                                   |
| `max_tokens_required`              | The line sets neither `max_tokens` nor `max_completion_tokens`                           |
| `duplicate_custom_id`              | The `custom_id` is used more than once                                                   |
| `mixed_models`                     | The line names a different model than the first line                                     |
| `custom_ids_too_long`              | The `custom_id`s of the file add up to more than 16 MiB                                  |
| `too_many_requests`, `file_too_large` | The file is over the provider's limit                                                 |
| `batch_limit_exceeded`             | The batch would take your account or the provider over its lines in progress             |
| `validation_timeout`               | The file could not be checked within 1 hour                                              |

The reservation errors are listed under [Billing](#billing). A batch that the provider itself refuses ends as `failed` with the provider's error.

{% hint style="info" %}
Batches of the file-based format are always live. [Sandbox mode](sandbox-mode.md) does not cover them: a sandbox request with `input_file_id` returns `400 sandbox_unsupported`.
{% endhint %}

***

## Legacy inline format

The older format sends the requests in the body of `POST /v1/batches`, as a `requests` array in Anthropic's Message Batches shape. It works only with [Claude models](../api-references/text-models-llm/anthropic/) and keeps working as before. Its batches are not listed by `GET /v1/batches`, and it has no webhooks. For new integrations, use the [file-based flow](#how-a-batch-works) above. If a retirement date is announced, the answers of the inline format will carry a `Deprecation` header.

| Action                           | Endpoint                                                                     |
| -------------------------------- | ---------------------------------------------------------------------------- |
| Create a message batch           | `POST /v1/batches` with `requests`                                           |
| Get status or results of a batch | `GET /v1/batches?batch_id={batch_id}` or `GET /v1/batches/{batch_id}`        |
| Cancel a batch                   | `POST /v1/batches/cancel/{batch_id}` or `POST /v1/batches/{batch_id}/cancel` |

### Create a message batch

{% openapi-operation spec="batch-create" path="/v1/batches" method="post" %}
[OpenAPI batch-create](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/capabilities/batch-create.json)
{% endopenapi-operation %}

<details>

<summary>Code Example (Python)</summary>

{% code overflow="wrap" %}
```python
import requests
import json  # for getting a structured output with indentation

# Insert your AIML API Key instead of <YOUR_AIMLAPI_KEY>
API_KEY = "<YOUR_AIMLAPI_KEY>"
BASE_URL = "https://api.aimlapi.com/v1"

headers = {
    "Authorization": f"Bearer {API_KEY}",
    "Content-Type": "application/json"
}

data = {
    "requests": [
        {
            "custom_id": "test-01",
            "params": {
                "model": "claude-sonnet-4-20250514",
                "max_tokens": 1024,
                "messages": [
                    {
                        "role": "user",
                        "content": "How to learn nestjs?"
                    }
                ]
            }
        },
        {
            "custom_id": "test-02",
            "params": {
                "model": "claude-sonnet-4-5-20250929",
                "max_tokens": 1024,
                "messages": [
                    {
                        "role": "user",
                        "content": "How to learn Reactjs?"
                    }
                ]
            }
        }
    ]
}

response = requests.post(f"{BASE_URL}/batches", headers=headers, data=json.dumps(data))
data = response.json()
print("Batch created:", json.dumps(data, indent=2, ensure_ascii=False))
```
{% endcode %}

</details>

<details>

<summary>Response</summary>

```json5
Batch created: {
  "id": "kgTRCVoAz4GwrHWIOFZjg",
  "type": "message_batch",
  "processing_status": "in_progress",
  "request_counts": {
    "processing": 2,
    "succeeded": 0,
    "errored": 0,
    "canceled": 0,
    "expired": 0
  },
  "ended_at": null,
  "created_at": "2026-05-04T17:27:37.468424+00:00",
  "expires_at": "2026-05-05T17:27:37.468424+00:00",
  "archived_at": null,
  "cancel_initiated_at": null,
  "results_url": null
}
```

</details>

### Get status or results of a batch

{% openapi-operation spec="batch-get" path="/v1/batches" method="get" %}
[OpenAPI batch-get](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/capabilities/batch-get.json)
{% endopenapi-operation %}

<details>

<summary>Code Example (Python)</summary>

{% code overflow="wrap" %}
```python
import requests
import json

# Insert your AIML API Key instead of <YOUR_AIMLAPI_KEY>
API_KEY = "<YOUR_AIMLAPI_KEY>"
BASE_URL = "https://api.aimlapi.com/v1"
batch_id = "kgTRCVoAz4GwrHWIOFZjg"

headers = {
    "Authorization": f"Bearer {API_KEY}",
    "Content-Type": "application/json"
}

response = requests.get(f"{BASE_URL}/batches?batch_id={batch_id}", headers=headers)

# A finished batch returns its results as JSON Lines
try:
    data = [json.loads(line) for line in response.text.splitlines() if line.strip()]
    print(json.dumps(data, indent=2))
except json.JSONDecodeError:
    print("Raw response:\n", response.text[:500])
```
{% endcode %}

</details>

### Cancel a batch

{% openapi-operation spec="batch-cancel2" path="/v1/batches/cancel/{batch_id}" method="post" %}
[OpenAPI batch-cancel2](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/capabilities/batch-cancel.json)
{% endopenapi-operation %}

<details>

<summary>Code Example (Python)</summary>

```python
import requests
import json

# Insert your AIML API Key instead of <YOUR_AIMLAPI_KEY>
API_KEY = "<YOUR_AIMLAPI_KEY>"
BASE_URL = "https://api.aimlapi.com/v1"

# Insert your batch_id here
batch_id = "fe91QH0tkQwaJSXo0q77O"

headers = {
    "Authorization": f"Bearer {API_KEY}",
    "Content-Type": "application/json"
}

response = requests.post(f"{BASE_URL}/batches/cancel/{batch_id}", headers=headers)
print(response.status_code)
print(json.dumps(response.json(), indent=2, ensure_ascii=False))
```

</details>
