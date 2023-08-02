import { QueryClientProvider } from '@tanstack/react-query';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import browser from 'webextension-polyfill';
import { queryClient } from '@/utils';
import { VirtualTable } from '@/components/VirtualTable';
import './styles/base.scss';

browser.tabs.query({ active: true, currentWindow: true }).then(() => {
  const root = document.getElementById('options');
  if (root) {
    createRoot(root).render(
      <StrictMode>
        <QueryClientProvider client={queryClient}>
          <VirtualTable />
        </QueryClientProvider>
      </StrictMode>,
    );
  }
});
