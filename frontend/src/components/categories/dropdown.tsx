import {
  Box,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import { getEventLocations, getEvents } from "@utils/fetcher";
import { getUniqueCategories, setCategories } from "@utils/uniquecategories";
import { useRouter } from "next/router";
import React from "react";
import { RxCaretDown } from "react-icons/rx";
import useSWR from "swr";

export const Location = () => {
  const router = useRouter();
  const { category, location } = router.query;
  const [isHovered, setHovered] = React.useState(null);
  const [activeLocation, setLocation] = React.useState<string | null>("");

  const handleHoveredItem = (index: number) => {
    setHovered(index);
  };

  const onHover = () => {
    setHovered(null);
  };

  const { data, error } = useSWR("/api/events", () => getEvents(), {
    revalidateOnFocus: true,
  });

  const locations = data?.all_locations;
  const events = data?.events;
  if (events) {
    setCategories(events);
  }
  const uniqueCategories = getUniqueCategories();

  error ? <Text>Erorr fetching event locations</Text> : null;

  const handleActiveLocation = (index: number) => {
    let slug;
    const selectedLocation = locations[index];
    setLocation(selectedLocation);

    if (selectedLocation.includes("")) {
      slug = selectedLocation.toLocaleLowerCase().split(" ").join("-");
    }

    router.push(
      {
        pathname: router.pathname,
        query: {
          location: slug,
          category:
            !category || uniqueCategories.length === 0
              ? uniqueCategories[0]
              : category,
        },
      },
      undefined,
      { scroll: false }
    );
  };

  return (
    <Menu>
      <MenuButton>
        <Flex>
          {activeLocation ? (
            <Text
              fontSize="2em"
              fontWeight="700"
              color="#fff"
              textTransform="capitalize"
            >
              {activeLocation}
            </Text>
          ) : (
            <Text
              fontSize="2em"
              fontWeight="700"
              color="#fff"
              textTransform="capitalize"
            >
              {location ? location : "All events"}
            </Text>
          )}
          <Box
            boxSize="fit-content"
            my="auto"
            mx=".5em"
            p=".2em"
            background="#fff"
            borderRadius="50%"
          >
            <RxCaretDown fontWeight="bold" />
          </Box>
        </Flex>
      </MenuButton>
      <MenuList
        background="var(--deep-charcoal)"
        border="1px solid var(--bg-two)"
      >
        {locations?.map((location: string, index: number) => {
          return (
            <MenuItem
              key={index}
              _hover={{
                cursor: "pointer",
              }}
              textTransform="capitalize"
              onMouseEnter={() => handleHoveredItem(index)}
              onMouseLeave={onHover}
              color="#fff"
              background={
                isHovered === index ? "var(--bg-two)" : "var(--deep-charcoal)"
              }
              onClick={() => handleActiveLocation(index)}
              transition={isHovered !== index ? "all .3s ease-in-out" : ""}
              opacity={isHovered !== null && isHovered !== index ? 0.5 : 1}
            >
              {location}
            </MenuItem>
          );
        })}
      </MenuList>
    </Menu>
  );
};
