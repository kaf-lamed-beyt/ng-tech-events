import { Box, Text } from "@chakra-ui/react";
import React from "react";
import Head from "next/head";

const EventDetails = () => {
  return (
    <>
      <Head>
        <title>Event name &mdash; Techies Assemble</title>
      </Head>

      <Box>
        <Text fontSize="lg">Welcome to this unique page</Text>
      </Box>
    </>
  );
};

export default EventDetails;
