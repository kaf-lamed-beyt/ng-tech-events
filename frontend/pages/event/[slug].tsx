import { Box, Text, Flex, Center, Button } from "@chakra-ui/react";
import type { EventObject, EventData } from "../../src/types/index";
import fetch from "node-fetch";
import React from "react";
import { MetaData } from "@components/metadata";
import Layout from "@layout/index";
import { useRouter } from "next/router";
import { Inter } from "next/font/google";
import { CiClock1, CiLocationOn, CiCalendarDate } from "react-icons/ci";

const Inter_Font = Inter({
  subsets: ["latin"],
  fallback: ["system-ui"],
  weight: ["400", "500"],
});

const InterClassName = Inter_Font.className;

export async function getStaticPaths() {
  const request = await fetch("https://ng-tech-events.netlify.app/api/events", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const response = (await request.json()) as EventObject;

  const paths = response.events.map((eventData) => ({
    params: {
      slug: eventData.slug,
    },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps() {
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

const EventDetails = (props: { data: EventObject }) => {
  const router = useRouter();
  const slug = router.query.slug as string;
  const event: EventData | undefined = props.data.events.find(
    (event) => event.slug === slug
  );

  const {
    name,
    time,
    date,
    link,
    location: { address, state },
    description,
  } = event;

  if (!event) {
    return (
      <>
        <Center>
          <Text fontSize="6em" color="grey">
            This event doesn't exist
          </Text>
        </Center>
      </>
    );
  }

  return (
    <>
      <MetaData
        url="ng-tech-events.netlify.app"
        pageTitle={name}
        description="A pool of upcoming and past tech events in 9ja's tech ecosystem"
        previewImage="/img/preview.png"
      />
      <Layout>
        <Box mt="1.5em" mb="2.5em">
          <Box
            borderRadius="1.25em"
            borderStyle="solid"
            borderColor="white"
            borderWidth="0.25em"
            aspectRatio="2.746"
            width="100%"
            py="1.6em"
            px="1em"
          >
            <Text
              fontSize="2.5em"
              mb="0.833em"
              color="#fff"
              fontWeight="500"
              letterSpacing="0.05em"
              className={InterClassName}
            >
              {name}
            </Text>
          </Box>
        </Box>
        <Box ml="1.5em" mr="1.1em">
          <Text
            fontSize="1.3em"
            mb="2.5em"
            color="#eee"
            className={InterClassName}
            fontWeight="400"
            letterSpacing="0.03em"
          >
            {description === "None" ? "" : description}
          </Text>
          <Text
            fontSize="1.333em"
            color="#fff"
            fontWeight="500"
            className={InterClassName}
            letterSpacing="0.07em"
            mb="0.833em"
          >
            Date, Time & Location
          </Text>
          <Flex
            alignItems="center"
            justifyContent="space-between"
            mb="2.25em"
            flexWrap={{ base: "wrap" }}
            gap={["1em", ".8em"]}
          >
            <Flex alignItems="center" gap={[".5em"]}>
              <Box
                background="var(--charcoal-alt)"
                height="48px"
                width="50px"
                px=".65em"
                py=".5em"
                borderRadius="6px"
                alignItems="center"
              >
                <CiCalendarDate color="#fff" size={30} />
              </Box>
              <Text
                color="#eee"
                fontSize="1em"
                fontWeight="400"
                className={InterClassName}
                letterSpacing="0.03em"
              >
                {date}
              </Text>
            </Flex>
            <Flex alignItems="center" gap={[".5em"]}>
              <Box
                background="var(--charcoal-alt)"
                height="48px"
                width="50px"
                px=".65em"
                py=".5em"
                borderRadius="6px"
                alignItems="center"
              >
                <CiLocationOn color="#fff" size={30} />
              </Box>
              <Text
                color="#eee"
                fontSize="1em"
                fontWeight="400"
                className={InterClassName}
                letterSpacing="0.03em"
              >
                {time}
              </Text>
            </Flex>
            <Flex alignItems="center" gap={[".5em"]}>
              <Box
                background="var(--charcoal-alt)"
                height="48px"
                width="50px"
                px=".65em"
                py=".5em"
                borderRadius="6px"
                alignItems="center"
              >
                <CiClock1 color="#fff" size={30} />
              </Box>
              <Text
                color="#eee"
                fontSize="1em"
                fontWeight="400"
                className={InterClassName}
                letterSpacing="0.03em"
              >
                {address}
                {state || !state ? "" : `, ${state}`}
              </Text>
            </Flex>
          </Flex>
          <Center>
            <Box
              backgroundImage="var(--nin)"
              height="47px"
              px=".14em"
              borderRadius="6px"
              width={{ md: "50%", lg: "50%", base: "100%" }}
            >
              <a href={link} target="_blank">
                <Button
                  mt=".14em"
                  className={InterClassName}
                  bg="var(--charcoal-alt)"
                  color="#FFF"
                  fontSize="1em"
                  py="1.2em"
                  width="100%"
                  height="43px"
                  textAlign="center"
                  fontWeight="normal"
                  _hover={{ background: "var(--charcoal-alt)" }}
                >
                  Register
                </Button>
              </a>
            </Box>
          </Center>
        </Box>
      </Layout>
    </>
  );
};

export default EventDetails;
