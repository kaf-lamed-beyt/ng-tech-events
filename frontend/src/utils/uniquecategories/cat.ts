// setCategories.js
import { addCategory } from "./unique";

interface Event {
  name: string;
  description: string;
  date: string;
  time: string;
  location: {
    address: string;
    state: string;
  };
  link: string;
  categories: string[];
}

type SetCategoriesFunction = (events: Event[]) => void;
export const setCategories: SetCategoriesFunction = (events) => {
  events.forEach((event) => {
    event.categories.forEach((category) => {
      addCategory(category);
    });
  });
};
