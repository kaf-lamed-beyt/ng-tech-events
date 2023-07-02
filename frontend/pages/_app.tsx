import { ChakraProvider } from "@chakra-ui/react";
import Head from "next/head";
import React from "react";
import { Inter } from "next/font/google";
import { theme } from "@utils/theme";
import "../style/globals.scss";
import { MetaData } from "three-data";

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>9ja Tech Events</title>
        <link rel="icon" href="/assemble.svg" />
      </Head>
      <main className={inter.className}>
        <ChakraProvider theme={theme}>
          <Component pageProps={...pageProps} />
        </ChakraProvider>
      </main>
    </>
  );
}
