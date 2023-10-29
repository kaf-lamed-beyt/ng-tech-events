import { Badge, Box, Flex, Text } from "@chakra-ui/react";
import { getEvents } from "@utils/fetcher";
import { getUniqueCategories, setCategories } from "@utils/uniquecategories";
import { useRouter } from "next/router";
import React from "react";
import useSWR from "swr";

export const Categories = () => {
  const router = useRouter();
  const { location } = router.query;
  const [activeCategory, setCategory] = React.useState<number | null>();
  const { data } = useSWR("/api/events", () => getEvents());

  const events = data?.events;

  if (events) {
    setCategories(events);
  }

  const eventLocations = data?.all_locations;
  const uniqueCategories = getUniqueCategories();

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
      flexWrap={{ lg: "wrap", base: "wrap" }}
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
              item === "iot" || item === "ml" ? "uppercase" : "lowercase"
            }
            onClick={() => handleCategory(index)}
            _hover={{ cursor: "pointer" }}
            transition="all .3s ease-in-out"
            background={
              index === activeCategory ? "#fff" : "var(--deep-charcoal)"
            }
            color={
              index === activeCategory || activeCategory
                ? "var(--primary)"
                : "var(--secondary)"
            }
          >
            <Text fontSize="1.3em">{item}</Text>
          </Badge>
        );
      })}
    </Flex>
  );
};
