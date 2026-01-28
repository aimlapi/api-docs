# Errors with status code 5xx

These codes indicate issues on the server side.

{% hint style="success" %}
This may mean an issue on our side or on the AI model provider's side. Try making the call again in a few minutes. If the problem persists, contact our [support team](https://help.aimlapi.com/), and we will investigate.
{% endhint %}

* **500 Internal Server Error** — An unexpected error occurred on the server.
* **502 Bad Gateway** — A downstream service or partner API returned an invalid response.
* **503 Service Unavailable** — The AI model or a partner service is temporarily unavailable.
* **504 Gateway Timeout** — The generation did not finish within the allowed time limit.

## The most frequently received messages

The most frequently received messages in this class are shown below.\
We will gradually expand this list.

<table data-full-width="true"><thead><tr><th width="125.62164306640625" valign="top">Status code</th><th width="273.759765625" valign="top">Message</th><th valign="top">Explanation</th></tr></thead><tbody><tr><td valign="top">500</td><td valign="top">"Internal server error"</td><td valign="top">An unexpected error occurred on our side while processing your request. Retry the call; if the problem persists, contact our support team.</td></tr><tr><td valign="top">500</td><td valign="top">"Something wrong with the server. Please, try again later."</td><td valign="top">A third-party service (including a partner model API) returned an error while processing your request. Your request is valid — try again a bit later or contact support if the problem persists.</td></tr><tr><td valign="top">500</td><td valign="top">"Coupon code not found"</td><td valign="top">The coupon / promo code you entered does not exist or is no longer valid. Check the code for typos or use a different coupon.</td></tr><tr><td valign="top">500</td><td valign="top">"The model is under maintenance, please contact us at help@aimlapi.com."</td><td valign="top">Your Request ID is "*". An unexpected error occurred in one of the services handling your request. Please try again later and, if the issue persists, contact our support team and include the Request ID.</td></tr><tr><td valign="top">502</td><td valign="top">"Bad Gateway`'</td><td valign="top">A downstream service or partner API returned an invalid response.</td></tr><tr><td valign="top">503</td><td valign="top">"Service unavailable"</td><td valign="top">For some technical reason, the AI model or a partner service could not complete your request. Please try again later or contact our support team if the issue persists.</td></tr><tr><td valign="top">504</td><td valign="top">"Generation timeout"</td><td valign="top">A downstream service or partner API returned an invalid response.</td></tr></tbody></table>
