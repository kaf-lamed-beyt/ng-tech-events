import React from "react";
import useSWR from "swr";
import { useRouter } from "next/router";
import { getEvents } from "@utils/fetcher";
import { Badge, Box, Flex, Text } from "@chakra-ui/react";

export const Categories = () => {
  const router = useRouter();
  const { location } = router.query;
  // console.log(router.query);
  const [activeCategory, setCategory] = React.useState<number | null>();

  let uniqueCategories = [];
  const { data, error, isLoading } = useSWR("/api/events", () => getEvents());

  const events = data?.events;
  const eventLocations = data?.all_locations;

  const categories = events?.forEach((event) => {
    event.categories.forEach((category) => {
      if (!uniqueCategories.includes(category)) {
        uniqueCategories.push(category);
      }
    });
  });

  const sortedCategories = uniqueCategories.sort();

  const handleCategory = (index: number) => {
    const category = index;
    const selectedCategory = uniqueCategories[category].toLowerCase();
    setCategory(category);

    router.push(
      {
        pathname: router.pathname,
        query: {
          location: !eventLocations.includes(location)
            ? eventLocations[0]
            : location,
          category: selectedCategory,
        },
      },
      undefined,
      { scroll: false }
    );
  };

  return (
    <Flex
      mt="1.2em"
      gap={["1em", "1em"]}
      width={{ lg: "fit-content", base: "100%" }}
      flexWrap={{ lg: "wrap" }}
      overflowX="auto"
    >
      {uniqueCategories?.map((item, index) => {
        return (
          <Badge
            px="1.2em"
            py=".5em"
            key={index}
            width="fit-content"
            fontWeight="normal"
            borderRadius="1.7em"
            textTransform={
              item === "iot" || item === "ml" ? "uppercase" : "capitalize"
            }
            onClick={() => handleCategory(index)}
            _hover={{ cursor: "pointer" }}
            transition="all .3s ease-in-out"
            background={
              index === activeCategory ? "#fff" : "var(--deep-charcoal)"
            }
            color={
              index === activeCategory ? "var(--primary)" : "var(--secondary)"
            }
          >
            <Text fontSize="1.3em">{item}</Text>
          </Badge>
        );
      })}
    </Flex>
  );
};
