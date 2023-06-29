import useSWR from "swr";
import { getEvents } from "@utils/fetcher";

export default function Homepage() {
  const { data, error, isLoading } = useSWR("/api/events", () => getEvents(), {
    revalidateOnFocus: true,
  });

  console.log(data);

  return (
    <>
      <h1 style={{ fontSize: "50px", fontWeight: "800", textAlign: "center" }}>
        Hello tech events
      </h1>
    </>
  );
}
