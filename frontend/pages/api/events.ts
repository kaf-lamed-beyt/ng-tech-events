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

      const eventsData = matchedTables.slice(2).map((event) => {
        const columns = event.split("|").map((column) => column.trim());
        const eventName = columns[1].replace("**", "");

        const state = columns[5].includes("Lagos")
          ? "lagos"
          : columns[5].includes("Kwara" || "kwara")
          ? "ilorin"
          : columns[5].includes("osun" || "Osun")
          ? "osun"
          : "";

        return {
          name: eventName.replace("**", ""),
          description: columns[2].replace("<br/>", "\n"),
          date: columns[3],
          time: columns[4],
          location: {
            address: columns[5],
            state,
          },
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
