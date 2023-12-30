'use client';

import { NextUIProvider } from '@nextui-org/react';

type ProviderProps = {
  children: React.ReactNode;
};

export default function Providers({ children }: ProviderProps) {
  return <NextUIProvider>{children}</NextUIProvider>;
}
