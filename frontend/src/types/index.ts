type LocationData = {
  address: string;
  state: string;
};

export type EventData = {
  name: string;
  description: string;
  date: string;
  time: string;
  slug: string;
  location: LocationData;
  categories: string[];
  link: string;
};

type EventCategory =
  | "design"
  | "mobile"
  | "web"
  | "-content writing"
  | "-technical writing"
  | "ml"
  | "cloud"
  | "startup"
  | "iot"
  | "android"
  | "general"
  | "web3"
  | "data-analytics"
  | "blockchain"
  | "cyber-security"
  | "web-design"
  | "ui"
  | "hybrid"
  | "devfest"
  | string;

type LocationCategory =
  | "online"
  | "abuja"
  | "ilorin"
  | "lagos"
  | "port harcourt"
  | "ibadan"
  | "imo"
  | "osun"
  | string;

export type EventObject = {
  all_locations: LocationCategory[];
  events: EventData[];
};
