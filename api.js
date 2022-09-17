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
  var form = new URLSearchParams();
  form.append('first_name', values.first_name);
  form.append("second_name", values.second_name);
  form.append("username", values.username);
  form.append("email", values.email);
  
  const fileToBase64 = async() => {
    return new Promise(resolve => {
      var reader = new FileReader();
      // Read file content on file loaded event
      reader.onload = function(event) {
        resolve(event.target.result);
      };
      
      // Convert data to base64 
      reader.readAsDataURL(values.image);
    });
  }; 

  const exist = await fetch(`${API}/user`, {
    headers: {'Content-Type': 'application/json'},
    method: 'POST',
    body: JSON.stringify({
      email: values.email,
    }),
  }).then((data) => data.json()).then((data) => data);

  if (!exist.length && values.social === 'Google') {
      form.append("password", null);
      form.append("image", values.image);

      const res = await fetch(`${API}/registerWithGoogle`, {
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        method: 'POST',
        body: form,
      }); 
      
      return await res.json();
      
  } else if (!exist) {
    form.append("password", values.password);

    const res = await fileToBase64()
    .then(result => {
        form.append("image", result);
        return;
      })
      .then (() => {
        return fetch(`${API}/register`, {
          headers: {'Content-Type': 'application/x-www-form-urlencoded'},
          method: 'POST',
          body: form,
        });
    })
  }

  return await res.json();
}