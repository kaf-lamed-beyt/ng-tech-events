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

      const eventsData = matchedTables.map((event) => {
        const columns = event.split("|").map((column) => column.trim());

        return {
          name: columns[1],
          date: columns[2],
          time: columns[3],
          location: columns[4],
          link: columns[5],
        };
      });

      res.status(200).json(eventsData);
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
