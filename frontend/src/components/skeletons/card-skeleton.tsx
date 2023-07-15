import React from "react";
import { Flex, Skeleton, Box, SkeletonText } from "@chakra-ui/react";

interface cardProp {
  count: [];
}

const EventCardSK = ({ count }: cardProp) => {
  return (
    <Flex
      gap={["0em", "1.2em"]}
      flexWrap={{ lg: "wrap", base: "wrap" }}
      my="1.4em"
    >
      {count?.map((_, index) => {
        return (
          <Box
            key={index}
            boxSize="fit-content"
            borderRadius="7px"
            background="var(--charcoal-alt)"
            py=".7em"
            px=".4em"
            width={{ lg: "23.2%", md: "48%", base: "100%" }}
            height={{ lg: "fit-content", base: "100%", md: "100%" }}
            my={{ base: ".3em" }}
            mx={{ base: ".1em" }}
          >
            <Skeleton
              borderRadius="6px"
              height="150px"
              width="100%"
              startColor="var(--bg-deus)"
              endColor="var(--subtle-charcoal)"
            />
            <Box height="fit-content" py=".3em">
              <SkeletonText
                mt=".4em"
                noOfLines={3}
                spacing={3}
                skeletonHeight="2"
                startColor="var(--subtle-charcoal)"
              />
            </Box>
          </Box>
        );
      })}
    </Flex>
  );
};

export default EventCardSK;
