const run = async () => {
  const app = await import('./inject');
  console.log('inject.');
  app.inject();
};

if (['complete', 'loaded', 'interactive'].includes(document.readyState)) {
  run();
} else {
  document.addEventListener('DOMContentLoaded', () => run());
}
