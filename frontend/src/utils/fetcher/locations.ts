export const getEventLocations = async () => {
  const request = await fetch("/api/events", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const response = await request.json();
  return response.all_locations;
};
