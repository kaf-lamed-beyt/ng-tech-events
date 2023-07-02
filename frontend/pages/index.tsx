import useSWR from "swr";
import { getEvents } from "@utils/fetcher";
import { Center } from "centa";

export default function Homepage() {
  const { data, error, isLoading } = useSWR("/api/events", () => getEvents(), {
    revalidateOnFocus: true,
  });

  return (
    <>
      <Center>
        <h1
          style={{
            fontSize: "50px",
            fontWeight: "800",
            textAlign: "center",
          }}
        >
          coming soon...
        </h1>
      </Center>
    </>
  );
}
