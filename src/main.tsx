import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/index.scss';
import App from './App.tsx';

async function enableMocking() {
  if (import.meta.env.MODE !== 'test') {
    return;
  }

  const { worker } = await import('./mocks/browser.js');

  return worker.start();
}

enableMocking().then(() => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
});
