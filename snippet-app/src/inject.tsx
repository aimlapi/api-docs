import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from './components/app';

export const inject = () => {
  const element = document.createElement('div');

  document.body.append(element);

  createRoot(element).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
};
