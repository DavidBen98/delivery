const API = "http://localhost:3000";

export const deleteTask = async (id) => {
  await fetch(`${API}/${id}`, {
    method: "DELETE",
  });
};

export const getRestaurants = async () => {
  const res = await fetch(API+"/restaurants");
  return await res.json();
};

export const getCategoriesRestaurants = async () => {
  const res = await fetch(API+"/categories/restaurants");

  return await res.json();
};

export const getRestaurantsForCategory = async (id) => {
  const res = await fetch(`${API}/categories/restaurants/${id}`);
  console.log(`${API}/categories/restaurants/${id}`);
  return await res.json();
};

export const getCategoriesDish = async () => {
  const res = await fetch(API+"/categories/dish");
  return await res.json();
};

export const saveTask = async (newTask) => {
  const res = await fetch(API, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newTask),
  });
  return await res.json();
};

export const getTask = async (taskId) => {
  const res = await fetch(`${API}/${taskId}`);
  return await res.json();
};

export const updateTask = async (taskId, newTask) => {
  // console.log(taskId, newTask)
  const res = await fetch(`${API}/${taskId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newTask),
  });
  return res;
};