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
    <Flex
      gap={["0em", "1.2em"]}
      flexWrap={{ lg: "wrap", base: "wrap" }}
      my="1.4em"
    >
      {data?.map(({ slug, name, date, location: { address } }, index) => {
        return (
          <Link href={`/event/${slug}`} key={index}>
            <Box
              p="1px"
              backgroundImage="var(--bubu)"
              borderRadius="8px"
              width={{ lg: "23.2%", md: "48%", base: "100%" }}
              height={{ lg: "320px", base: "100%", md: "100%" }}
              my={{ base: ".3em" }}
              mx={{ base: ".1em" }}
            >
              <Box
                boxSize="fit-content"
                height="100%"
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
                  height=""
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
            </Box>
          </Link>
        );
      })}
    </Flex>
  );
};

export default Events;
