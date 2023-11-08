import React from "react";
import { Box, Flex, Image, Text } from "@chakra-ui/react";
import Link from "next/link";

interface eventProps {
  data: {
    slug: string;
    name: string;
    date: string;
    location: {
      address: string;
    };
  }[];
}

const Events = ({ data }: eventProps) => {
  return (
    <Flex gap={["0em", "1.2em"]} flexWrap="wrap" my="1.4em">
      {data?.map(({ slug, name, date, location: { address } }, index) => {
        return (
          <Box
            p="1px"
            backgroundImage="var(--bubu)"
            borderRadius="8px"
            width={{ lg: "23.5%", md: "48%", base: "100%" }}
            height={{ lg: "320px", base: "100%", md: "100%" }}
            my={{ base: ".3em" }}
            mx={{ base: ".1em" }}
          >
            <Link href={`/event/${slug}`} key={index}>
              <Box
                boxSize="fit-content"
                height="100%"
                width="100%"
                borderRadius="7px"
                background="var(--charcoal-alt)"
                py=".4em"
                px=".4em"
              >
                <Image
                  src="/img/preview.png"
                  alt="preview"
                  loading="lazy"
                  borderRadius="6px"
                  boxSize="fit-content"
                  background="var(--charcoal-alt)"
                />
                <Box fontSize="12px" height="fit-content" py=".3em">
                  <Text py=".4em" color="#fff" fontWeight="600">
                    {name}
                  </Text>
                  <Text py=".4em" color="#fff">
                    {/* {dayjs(date).format("DD-MM-YYYY")} */}
                    {date}
                  </Text>
                  <Text py=".4em" color="#fff">
                    {address}
                  </Text>
                </Box>
              </Box>
            </Link>
          </Box>
        );
      })}
    </Flex>
  );
};

export default Events;
