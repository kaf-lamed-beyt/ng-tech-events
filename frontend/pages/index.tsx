import useSWR from "swr";
import { getEvents } from "@utils/fetcher";
import { MetaData } from "@components/metadata";
import Layout from "@layout/index";
import Home from "@containers/home";

export default function Homepage() {
  const { data, error, isLoading } = useSWR("/api/events", () => getEvents(), {
    revalidateOnFocus: true,
  });

  return (
    <>
      <MetaData
        url="9ja-events.tech"
        pageTitle="Techies Assemble"
        description="A pool of upcoming and past tech events in 9ja's tech ecosystem"
        previewImage="/img/preview.png"
      />
      <Layout>
        <Home />
      </Layout>
    </>
  );
}
