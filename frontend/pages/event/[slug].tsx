import { Box, Text, Flex, Center } from "@chakra-ui/react";
import type { EventObject, EventData } from "../../src/types/index";
import fetch from "node-fetch";
import React from "react";
import type { GetStaticPropsContext } from "next";
import { MetaData } from "@components/metadata";
import Layout from "@layout/index";
import { useRouter } from "next/router";
import Image from "next/image";
import Calendar from "../../public/calendar.svg";
import Time from "../../public/time.svg";
import Location from "../../public/location.svg";

export async function getStaticPaths() {
  const request = await fetch("https://ng-tech-events.netlify.app/api/events", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const response = (await request.json()) as EventObject;

  const paths = response.events.map((eventData) => "/event/" + eventData.slug);

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(context: GetStaticPropsContext) {
  const request = await fetch("https://ng-tech-events.netlify.app/api/events", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const response = (await request.json()) as EventObject;
  return {
    props: {
      data: response,
    },
  };
}

const EventDetails = (props: { pageProps: { data: EventObject } }) => {
  const router = useRouter();
  const slug = router.query.slug as string;
  const event: EventData | undefined = props.pageProps.data.events.find(
    (event) => event.slug === slug
  );

  if (!event) {
    return (
      <>
        <Center>
          <Text fontSize="9xl" color="grey">
            This event doesn't exist
          </Text>
        </Center>
      </>
    );
  }

  return (
    <>
      <MetaData
        url={"9ja-events.tech" + "/event/" + event.slug}
        pageTitle={event.name}
        description="A pool of upcoming and past tech events in 9ja's tech ecosystem"
        previewImage="/img/preview.png"
      />
      <Layout>
        <Box mt="2.38rem" mb="3.25rem">
          <Box
            borderRadius="3.125rem"
            borderStyle="solid"
            borderColor="white"
            borderWidth="4px"
            aspectRatio="2.746"
            width="100%"
          ></Box>
        </Box>
        <Box ml="2.57rem" mr="1.88rem">
          <Text
            fontSize="3.74356rem"
            mb="1.25rem"
            color="#fff"
            fontWeight="500"
            letterSpacing="0.22463rem"
            className="clash-display-500"
          >
            {event.name}
          </Text>
          <Text
            fontSize="1.5rem"
            mb="3rem"
            color="#eee"
            className="sf-pro-display-400"
            fontWeight="400"
            letterSpacing="0.09rem"
          >
            {event.description === "None" ? "" : event.description}
          </Text>
          <Text
            fontSize="2rem"
            color="#fff"
            fontWeight="500"
            className="clash-display-500"
            letterSpacing="0.12rem"
            mb="1.25rem"
          >
            Date, Time & Location
          </Text>
          <Flex alignItems="center" justifyContent="space-between" mb="4.5rem">
            <Flex alignItems="center" columnGap="0.75rem">
              <Image src={Calendar} alt="Date" />
              <Text
                color="#eee"
                fontSize="1.5rem"
                fontWeight="400"
                className="sf-pro-display-400"
                letterSpacing="0.09rem"
              >
                {event.date}
              </Text>
            </Flex>
            <Flex alignItems="center" columnGap="0.75rem">
              <Image src={Time} alt="Time" />
              <Text
                color="#eee"
                fontSize="1.5rem"
                fontWeight="400"
                className="sf-pro-display-400"
                letterSpacing="0.09rem"
              >
                {event.time}
              </Text>
            </Flex>
            <Flex alignItems="center" columnGap="0.75rem">
              <Image src={Location} alt="Location" />
              <Text
                color="#eee"
                fontSize="1.5rem"
                fontWeight="400"
                className="sf-pro-display-400"
                letterSpacing="0.09rem"
              >
                {event.location.address}
                {event.location.state || !event.location.state
                  ? ""
                  : ", " + event.location.state}
              </Text>
            </Flex>
          </Flex>
          <Box
            borderRadius="0.625rem"
            border="1px solid var(--bubu, #CCFF78)"
            className="clash-display-500"
            bg="#212121"
            color="#FFF"
            py="1.31rem"
            px="11.94rem"
            fontSize="1.5rem"
            mb="12rem"
          >
            <Center>
              <a href={event.link} target="_blank">
                Register
              </a>
            </Center>
          </Box>
        </Box>
      </Layout>
    </>
  );
};

export default EventDetails;
