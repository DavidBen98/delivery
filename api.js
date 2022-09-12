const API = "http://localhost:3000";

export const getRestaurants = async () => {
  const res = await fetch(API+"/restaurants");
  return await res.json();
};

export const getRestaurantForId = async (id) => {
  const res = await fetch(`${API}/restaurants/${id}`);
  return await res.json();
};

export const getCategoriesRestaurants = async () => {
  const res = await fetch(`${API}/categories/restaurants`);

  return await res.json();
};

export const getRestaurantsForCategory = async (id) => {
  const res = await fetch(`${API}/categories/restaurants/${id}`);
  return await res.json();
};


export const getCategoriesDish = async () => {
  const res = await fetch(API+"/categories/dish");
  return await res.json();
};

export const getAllDishes = async () => {
  const res = await fetch(API+"/categories/dish/dishes");
  return await res.json();
};

export const getDishesForCategory = async (idCategory) => {
  const res = await fetch(`${API}/categories/dish/dishes/${idCategory}`);
  return await res.json();
};

export const getDishesForRestaurant = async (idRestaurant) => {
  const res = await fetch(`${API}/categories/dish/dishes/restaurant/${idRestaurant}`);
  return await res.json();
};

export const getCategoriesForRestaurant = async (idRestaurant) => {
  const res = await fetch(`${API}/restaurants/category/${idRestaurant}`);
  return await res.json();
}

export const getDishesForCategoryOfRestaurant = async (idRestaurant) => {
  const res = await fetch(`${API}/restaurants/dishes/${idRestaurant}`);
  return await res.json();
}

export const getOpinionsForRestaurant  = async (idRestaurant) => {
  const res = await fetch(`${API}/restaurants/opinions/${idRestaurant}`);
  return await res.json();
}

export const getUser = async (values) => {
  const user = values.username;
  const password = values.password;
  
  const res = await fetch(`${API}/login`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "username": user,
      "password": password,
    }),
  });

  return await res.json();
}

export const newUser = async (values) => {
  const first_name = values.first_name;
  const second_name = values.second_name;
  const username = values.username;
  const email = values.email;
  const password = values.password;
  const image = values.image;

  const res = await fetch(`${API}/register`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      first_name,
      second_name,
      username,
      email,
      password,
      image
    }),
  });

  return await res.json();
}