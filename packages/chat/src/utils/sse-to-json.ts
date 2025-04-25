export const transformSseToJson = (line: string) => {
  const lines = line.split("\n");
  const result: { event: string; data: Record<string, unknown> }[] = [];

  for (const line of lines) {
    const [, event, json] = line.match(/^(.+?):(.+)/) ?? [];

    if (!event) {
      continue;
    }

    const parsed = json ? JSON.parse(json) : {};

    result.push({ event, data: parsed });
  }

  return result;
};
