import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from './components/app';

const inject = () => {
  const element = document.createElement('div');

  document.body.append(element);

  createRoot(element).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
};

if (['complete', 'loaded', 'interactive'].includes(document.readyState)) {
  inject();
} else {
  document.addEventListener('DOMContentLoaded', () => inject());
}
