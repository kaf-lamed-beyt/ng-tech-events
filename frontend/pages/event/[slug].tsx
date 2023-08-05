// import { Box, Text } from "@chakra-ui/react";
// import { getEvents } from "@utils/fetcher";
// import { GetStaticPropsContext } from "next";
// import React from "react";
// import fetch from "node-fetch";
// import Head from "next/head";

// export async function getStaticPaths() {
//   const request = await fetch("https://ng-tech-events.netlify.app/event");
//   const response = await request.json();

//   const events = response?.events;

//   console.log(events);

//   const paths = events.map(({ slug }) => ({
//     params: {
//       slug: slug,
//     },
//   }));

//   return {
//     paths,
//     fallback: false,
//   };
// }

// export async function getStaticProps(context: GetStaticPropsContext) {
//   return {
//     props: {
//       data: {},
//     },
//   };
// }

// const EventDetails = () => {
//   return (
//     <>
//       <Head>
//         <title>Event name &mdash; Techies Assemble</title>
//       </Head>

//       <Box>
//         <Text fontSize="lg">Welcome to this unique page</Text>
//       </Box>
//     </>
//   );
// };

// export default EventDetails;
