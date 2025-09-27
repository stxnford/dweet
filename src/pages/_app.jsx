import React from 'react';

import { ChakraProvider } from '@chakra-ui/react';

import '@/styles/global.css';
import { DM_Sans } from 'next/font/google';

const dm = DM_Sans({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
});

export default function App({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <main className={dm.className}>
        <Component {...pageProps} />
      </main>
    </ChakraProvider>
  );
}
