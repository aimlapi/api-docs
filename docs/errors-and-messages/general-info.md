---
description: >-
  General information about types of using error statuses/messages and their
  structure.
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

# General Info

This section provides descriptions of the errors a user may encounter when calling our models and solutions via the API. Below, you'll learn about the different error classes and the structure of a response that indicates a failed request.

## Error structure

The general structure of the error response body includes the following parameters:

* **message** – The error message explaining that the free-tier limit has been reached and suggesting upgrading to a paid plan.
* **path** – The API endpoint that was called when the error occurred.
* **requestId** – A unique identifier for the specific request, useful for debugging or support inquiries.
* **statusCode** – The HTTP status code indicating the error type (**429** means too many requests).
* **timestamp** – The exact time when the error occurred, in ISO 8601 format.

For example:

{% code overflow="wrap" %}
```json
{
    "message": "Free-tier limit: You've reached your free limit for the hour. Get AI/ML Subscription to use API, visit https://aimlapi.com/app/billing/ !"
    "path": "/v1/chat/completions"
    "requestId": "798b860e-98c2-4e8e-8c50-550bcfc2eccc"
    "statusCode": "429"
    "timestamp": "2025-03-11T07:13:27.813Z"
}
```
{% endcode %}

## HTTP Status Code Classes and Their Meanings

HTTP status codes are divided into several main classes, each indicating a specific type of server response. Users of our API may receive messages from the following three classes:

#### **2xx — Success**

These codes indicate that the request was successfully processed.

* **200 OK** — The request was successful, and the server is returning the requested data.
* **201 Created** — A new resource was successfully created (e.g., after a POST request).
* **204 No Content** — The request was processed, but there is no response body.

#### **4xx — Client Errors**

These errors indicate that the request is incorrect or cannot be processed by the server.

* **400 Bad Request** — The request is malformed (e.g., syntax errors or invalid parameters).
* **401 Unauthorized** — Authentication is required.
* **403 Forbidden** — Access is denied, even if authentication was successful.
* **404 Not Found** — The requested resource was not found.
* **429 Too Many Requests** — The client has exceeded the request limit.

#### **5xx — Server Errors**

These codes indicate issues on the server side.

* **500 Internal Server Error** — A generic server-side error.
* **502 Bad Gateway** — Issues with a proxy server or gateway.
* **503 Service Unavailable** — The server is temporarily unavailable (e.g., due to overload).
* **504 Gateway Timeout** — The server did not receive a timely response from another service.

These status codes help quickly identify what happened to a request and determine the appropriate steps for troubleshooting.
