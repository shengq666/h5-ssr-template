'use client';

import { createContext } from 'react';

export const DemoContext = createContext({});

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DemoContext.Provider value="dark">{children}</DemoContext.Provider>;
}
