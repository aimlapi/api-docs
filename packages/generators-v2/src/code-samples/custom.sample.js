export const customSample = (options) => {
  const jsonBody = JSON.stringify(options.customParams, null, 2);

  return [
    {
      lang: 'JavaScript',
      source: `async function main() {
  const response = await fetch('${options.customUrlApi}', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer <YOUR_AIMLAPI_KEY>',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(${jsonBody.replace(/\n/g, '\n    ')}),
  });

  const data = await response.json();
  console.log(JSON.stringify(data, null, 2));
}

main();`,
    },
    {
      lang: 'Python',
      source: `import requests

response = requests.post(
    "${options.customUrlApi}",
    headers={
        "Content-Type": "application/json",
        "Authorization": "Bearer <YOUR_AIMLAPI_KEY>",
    },
    json=${jsonBody.replace(/\n/g, '\n    ')}
)

data = response.json()
print(data)`,
    },
    {
      lang: 'cURL',
      source: `curl -L \\
  --request POST \\
  --url '${options.customUrlApi}' \\
  --header 'Authorization: Bearer <YOUR_AIMLAPI_KEY>' \\
  --header 'Content-Type: application/json' \\
  --data '${jsonBody.replace(/'/g, "\\'").replace(/\n/g, '\n    ')}'`,
    },
    {
      lang: 'HTTP',
      source: `POST / HTTP/1.1
Host: test.com
Authorization: Bearer <YOUR_AIMLAPI_KEY>
Content-Type: application/json
Accept: */*

${jsonBody}`,
    },
  ];
};
