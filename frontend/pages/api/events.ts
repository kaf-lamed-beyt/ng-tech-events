import { categories } from "@containers/data";
import { NextApiRequest, NextApiResponse } from "next";

export default async function eventsApiRoute(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const response = await fetch(
        "https://raw.githubusercontent.com/kaf-lamed-beyt/ng-tech-events/master/README.md",
        {
          method: "GET",
        }
      );

      let states;
      let state;
      const readmeContent = await response.text();
      const tableRegex = /\|(.+)\|(.+)\|/g;
      const anchorTagsRegex = /<a[^>]*>([^<]*)<\/a>/gi;

      // adjust tsc to accomodate the --downlevelIteration flag in tsconfig
      const matchedLocations = [
        ...(await readmeContent).matchAll(anchorTagsRegex),
      ];
      const matchedTables = (await readmeContent).match(tableRegex);

      states = matchedLocations.map((state) => state[1].toLocaleLowerCase());

      const eventsData = matchedTables.map((event) => {
        const columns = event.split("|").map((column) => column.trim());
        const eventName = columns[1].replace("**", "");

        state = states.find((name) =>
          columns[5].toLocaleLowerCase().includes(name)
        );

        // split and remove whitespace
        const categories = columns[7]
          .split(",")
          .map((item) =>
            item.trimStart().includes(" ")
              ? item.replace(" ", "-").toLocaleLowerCase()
              : item.toLocaleLowerCase().trim()
          );

        const name = eventName.replace("**", "").replace("&mdash;", "—");

        return {
          name,
          slug: name.split(" ").join("-").toLocaleLowerCase(),
          description: columns[2].replace("<br/>", "\n"),
          date: columns[3],
          time: columns[4],
          location: {
            address: columns[5],
            state,
          },
          categories: categories.filter(
            (item) => item !== "" && item !== "n/a"
          ),
          link: columns[6]
            .split("](")
            .splice(1, 1, "''")
            .toString()
            .replace(")", ""),
        };
      });

      let updatedEvents;

      updatedEvents = eventsData.filter(
        (item) => !item.name.includes("Name") && !item.name.includes("---")
      );

      const data = {
        all_locations: states,
        events: updatedEvents,
      };

      res.status(200).json(data);
    } catch (error) {
      console.error(`Error fetching events data, ${error}`);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res
      .status(400)
      .json({ error: "You made a mistake in the request header. Use 'GET'" });
  }
}
