'use client';

import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import { ReactNode } from 'react';

import { setupDependencyInjectionContainerRegistry } from '@/DI/ioc';
import { theme } from '@/theme/theme';

type Props = {
  children: ReactNode;
};

setupDependencyInjectionContainerRegistry();

export function RootProviders({ children }: Props) {
  return (
    <AppRouterCacheProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}
