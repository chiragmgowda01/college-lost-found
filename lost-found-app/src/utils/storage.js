const KEY = "campus_lost_found_items";

export const getItems = () => {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || [];
  } catch {
    return [];
  }
};

export const saveItems = (items) => {
  localStorage.setItem(KEY, JSON.stringify(items));
};

export const addItem = (item) => {
  const items = getItems();
  saveItems([item, ...items]);
};

export const removeItem = (id) => {
  const items = getItems().filter((item) => String(item.id) !== String(id));
  saveItems(items);
};

export const getItemById = (id) => {
  return getItems().find((item) => String(item.id) === String(id));
};