// uniqueCategories.js
let uniqueCategories: string[] = [];

export function getUniqueCategories(): string[] {
  return uniqueCategories;
}

export function addCategory(category: string): void {
  if (!uniqueCategories.includes(category)) {
    uniqueCategories.push(category);
  }
}
