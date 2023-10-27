import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import { Inter } from "next/font/google";
import { theme } from "@utils/theme";
import "../style/globals.scss";
import Head from "next/head";

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel="icon" href="/assemble.svg" />
      </Head>

      <main className={inter.className}>
        <ChakraProvider theme={theme}>
          <Component {...pageProps} />
        </ChakraProvider>
      </main>
    </>
  );
}
