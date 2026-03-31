export const sttSample = (options, fullSchema) => {
  const params = {
    model: options.name,
  };
  const schema =
    fullSchema?.paths?.['/v1/stt/create']?.post?.requestBody?.content?.[
      'application/json'
    ]?.schema;
  if (schema?.properties?.url) {
    Object.assign(params, {
      url: 'https://audio-samples.github.io/samples/mp3/blizzard_primed/sample-0.mp3',
    });
  } else {
    console.log('NO URL PROPERTY FOUND IN SCHEMA');
  }
  const jsonBody = JSON.stringify(params, null, 2);

  return [
    {
      lang: 'cURL',
      source: `curl -L \\
  --request POST \\
  --url 'https://api.aimlapi.com/v1/stt/create' \\
  --header 'Authorization: Bearer <YOUR_AIMLAPI_KEY>' \\
  --header 'Content-Type: application/json' \\
  --data '${jsonBody.replace(/'/g, "\\'").replace(/\n/g, '\n    ')}'`,
    },
    {
      lang: 'JavaScript',
      source: `async function main() {
  const response = await fetch('https://api.aimlapi.com/v1/stt/create', {
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
    "https://api.aimlapi.com/v1/stt/create",
    headers={
        "Content-Type": "application/json",
        "Authorization": "Bearer <YOUR_AIMLAPI_KEY>",
    },
    json=${jsonBody.replace(/\n/g, '\n    ')}
)

data = response.json()
print(data)`,
    },
  ];
};
