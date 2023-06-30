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

      const readmeContent = response.text();

      const tableRegex = /\|(.+)\|(.+)\|/g;
      const matchedTables = (await readmeContent).match(tableRegex);

      // console.log(
      //   `these are the tables that got matched: ${[matchedTables].length}`
      // );

      const eventsData = matchedTables.slice(2).map((event) => {
        const columns = event.split("|").map((column) => column.trim());

        const eventName = columns[1].replace("**", "");

        // const found = columns.find((item) => item === );

        // console.log(found);

        return {
          name: eventName.replace("**", ""),
          description: columns[2].replace("<br/>", "\n"),
          date: columns[3],
          time: columns[4],
          location: columns[5],
          link: columns[6]
            .split("](")
            .splice(1, 1, "''")
            .toString()
            .replace(")", ""),
        };
      });

      const tableBottomBorder = eventsData.find((item) =>
        item.name.includes("---")
      );

      const tableHeadings = eventsData.find((item) => item.name === "Name");

      let updatedEvents;

      updatedEvents = eventsData.filter(
        (item) => item != tableHeadings && tableBottomBorder
      );

      res.status(200).json(updatedEvents);
    } catch (error) {
      console.error(`Error fetching events data: ${error}`);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res
      .status(400)
      .json({ error: "You made a mistake in the request header. Use 'GET'" });
  }
}
