import { Box, Text, filter } from "@chakra-ui/react";
import { Categories, Location } from "@components/categories";
import Events from "@components/event-card";
import Hero from "@components/hero";
import { EventCardSK } from "@components/skeletons";
import { getEvents } from "@utils/fetcher";
import { getUniqueCategories } from "@utils/uniquecategories";
import { useRouter } from "next/router";
import React from "react";
import useSWR from "swr";

const Home = () => {
  const router = useRouter();
  const { query } = router;
  const { location, category } = query;

  const { data, error, isLoading } = useSWR(`/api/events`, () => getEvents(), {
    revalidateIfStale: true,
    revalidateOnFocus: true,
  });

  let uniqueCategories = [];

  const events = data?.events;
  const locations = data?.all_locations;
  const states = events?.map((event) => event);

  const categories = getUniqueCategories(events);

  const sortedCategories = uniqueCategories.sort();

  const mod_location =
    typeof location === "string" && locations.includes("-")
      ? location.replace("-", " ")
      : location;

  let matchCategory;
  let matchLocation;

  const filteredEvents = states?.filter((event) => {
    matchCategory = event.categories.includes(category);
    matchLocation =
      mod_location === "" || event.location.state === mod_location;

    return matchCategory && matchLocation;
  });

  return (
    <>
      <Hero />
      <Box my="1em">
        <Text fontFamily="var(--bebas)" fontSize="2em" color="#fff" mt="1.3em">
          Events happening {location === "online" || !location ? "" : "in"}
        </Text>
      </Box>
      {error ? (
        <Text textAlign="center" color="#fff">
          Error fetching events
        </Text>
      ) : (
        <>
          <Location />
          <Categories />
          {isLoading ? (
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
                      {!matchCategory ? "under this category" : null} in this
                      location. Sorry 😩
                    </Text>
                  ) : (
                    <Events data={filteredEvents} />
                  )}
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
