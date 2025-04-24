// src/main.tsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Import the auto-generated registerSW helper
import { registerSW } from 'virtual:pwa-register';

const updateSW = registerSW({
  onNeedRefresh() {
    // you could prompt the user to reload for updates
    console.log('New content available; please refresh.');
  },
  onOfflineReady() {
    console.log('App is ready to work offline.');
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Optionally expose updateSW to UI (e.g. a “Refresh” button)
// window.updateServiceWorker = updateSW;
