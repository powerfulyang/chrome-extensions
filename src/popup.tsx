import { queryClient } from '@/utils';
import { QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { createRoot } from 'react-dom/client';
import browser from 'webextension-polyfill';

browser.tabs.query({ active: true, currentWindow: true }).then(() => {
  const root = document.getElementById('root');
  if (root) {
    createRoot(root).render(
      <React.StrictMode>
        <QueryClientProvider client={queryClient}>
          <div>Popup</div>
        </QueryClientProvider>
      </React.StrictMode>,
    );
  }
});
