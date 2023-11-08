import React from "react";
import useSWR from "swr";
import Hero from "@components/hero";
import { useRouter } from "next/router";
import { getEvents } from "@utils/fetcher";
import Events from "@components/event-card";
import { Box, Text } from "@chakra-ui/react";
import { EventCardSK } from "@components/skeletons";
import { Categories, Location } from "@components/categories";
import { getUniqueCategories, setCategories } from "@utils/uniquecategories";

const Home = () => {
  const router = useRouter();
  const { query } = router;
  const { location, category } = query;

  const { data, error, isLoading, isValidating } = useSWR(
    `/api/events`,
    () => getEvents(),
    {
      revalidateIfStale: true,
      revalidateOnFocus: true,
    }
  );

  const events = data?.events;
  const locations = data?.all_locations;
  const states = events?.map((event) => event);

  if (events) {
    setCategories(events);
  }

  const uniqueCategories = getUniqueCategories();

  const mod_location = location;

  let matchedCategory;
  let matchedLocation;

  const filteredEvents = states?.filter((event) => {
    matchedCategory = event.categories.includes(category);
    matchedLocation = event?.location.state === mod_location;

    if (matchedCategory) {
      return matchedCategory;
    } else if (matchedLocation) {
      return matchedLocation;
    } else {
      return matchedCategory && matchedLocation;
    }
  });

  const filteredLocations = filteredEvents.map(
    (events) => events.location.state
  );
  const filteredCategories = filteredEvents.map((events) => events.categories);
  const mergedCats = filteredCategories.toString().split(",");

  return (
    <>
      {/* temporarily remove the hero section so people can get acess to the platform faster instead of scrolling */}
      {/* <Hero /> */}
      <Box my="1em">
        <Text fontFamily="var(--bebas)" fontSize="2em" color="#fff" mt="1.3em">
          Events happening {location === "online" || !location ? "" : "in"}
        </Text>
      </Box>
      {error ? (
        <Text textAlign="center" color="#fff">
          Error fetching events data
        </Text>
      ) : (
        <>
          <Location />
          <Categories />
          {isLoading || isValidating ? (
            <EventCardSK count={events} />
          ) : (
            <>
              {!location && !category ? (
                <Events data={events} />
              ) : (
                <>
                  {filteredEvents.length === 0 ? (
                    <Text
                      textAlign="center"
                      my="1.5em"
                      fontSize={{ lg: "1.5em", md: "1em", base: "1em" }}
                      fontWeight="400"
                      color="#bab1b1"
                      width={{ base: "100%" }}
                    >
                      Oops! There are no events{" "}
                      {matchedCategory
                        ? `under this category: ${category},`
                        : null}{" "}
                      in this location. Sorry 😩
                    </Text>
                  ) : (
                    <Events data={filteredEvents} />
                  )}
                  {/* {mergedCats.includes(category) &&
                  filteredLocations.includes(location)
                    ? "yes"
                    : "no"} */}
                </>
              )}
            </>
          )}
        </>
      )}
    </>
  );
};

export default Home;
