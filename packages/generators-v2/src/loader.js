export async function loadSchema(url, headers = {}) {
  const response = await fetch(url, { headers });
  if (!response.ok) {
    throw new Error(`Failed to load schema from ${url}: ${response.status}`);
  }
  return await response.json();
}
