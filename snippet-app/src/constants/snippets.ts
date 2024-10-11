const configByName = import.meta.glob('../../../shared/snippets/**/*.json', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

const contentByName = import.meta.glob('../../../shared/snippets/**/*.hbs', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

const configById = Object.keys(configByName).reduce((byKey, key) => {
  const next = { ...byKey };

  const [, path] = key.split('/snippets/');
  const [group, file] = path.split('/');
  const [name] = file.split('.');

  next[`${group}.${name}`] = JSON.parse(configByName[key]);

  return next;
}, {} as Record<string, { title: string }>);

export const snippets = Object.keys(contentByName).reduce((byKey, key) => {
  const next = { ...byKey };

  const [, path] = key.split('/snippets/');
  const [group, file] = path.split('/');
  const [name, language] = file.split('.');

  const config = configById[`${group}.${name}`]!;

  next[key] = { ...next[key], group, name, language, content: contentByName[key], config: config };

  return next;
}, {} as Record<string, { config: { title: string; payload?: Record<string, unknown> }; group: string; name: string; language: string; content: string }>);
