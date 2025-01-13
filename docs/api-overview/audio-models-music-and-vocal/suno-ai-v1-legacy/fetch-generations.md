---
icon: brackets-curly
---

# Fetch Generations

## API Reference

{% swagger src="https://api-staging.aimlapi.com/docs-public-json" path="/" method="get" %}
[https://api-staging.aimlapi.com/docs-public-json](https://api-staging.aimlapi.com/docs-public-json)
{% endswagger %}

## Examples

{% tabs %}
{% tab title="JavaScript" %}
```javascript
const axios = require('axios');

const url = 'https://api.aimlapi.com/?ids[0]=ID';
const headers = {
  'Content-Type': 'application/json',
  'Authorization': 'Bearer YOUR_API_KEY'
};

axios.get(url, { headers: headers })
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.error(error);
  });

```
{% endtab %}

{% tab title="Python" %}
```python
import requests

url = "https://api.aimlapi.com/?ids[0]=ID"
headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_API_KEY'
}
response = requests.get(url, headers=headers)

print(response.text)

```
{% endtab %}

{% tab title="Ruby" %}
```ruby
message = "hello world"
puts message
```
{% endtab %}
{% endtabs %}
