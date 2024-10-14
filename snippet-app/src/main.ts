const run = async () => {
  const app = await import('./inject');
  app.inject();
};

if (['complete', 'loaded', 'interactive'].includes(document.readyState)) {
  run();
} else {
  document.addEventListener('DOMContentLoaded', () => run());
}
