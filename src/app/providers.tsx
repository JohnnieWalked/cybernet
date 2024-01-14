'use client';

import { useRef } from 'react';

/* auth */
import { SessionProvider } from 'next-auth/react';

/* redux-toolkit */
import { makeStore, AppStore } from '@/store';
import { Provider } from 'react-redux';

/* next ui */
import { NextUIProvider } from '@nextui-org/react';

type ProviderProps = {
  children: React.ReactNode;
};

export default function Providers({ children }: ProviderProps) {
  /* redux-toolkey guide for next.js applications */
  const storeRef = useRef<AppStore>();

  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  return (
    <Provider store={storeRef.current}>
      <SessionProvider>
        <NextUIProvider>{children}</NextUIProvider>
      </SessionProvider>
    </Provider>
  );
}
