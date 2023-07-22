import { uniqueCategories } from "./data";

interface Event {
    categories: string[];
    name: string;
    date: string;
    description: string;
    link: string;
    location: {
        address: string;
        state: string;
    };
    time: string
}

function getUniqueCategories(events: Event[] | null | undefined): string[] {
  
    if (events) {
      events.forEach((event) => {
        event.categories.forEach((category) => {
          if (!uniqueCategories.includes(category)) {
            uniqueCategories.push(category);
          }
        });
      });
    }
  
    return uniqueCategories;
  }

export default getUniqueCategories;
