import { connect } from "../database.js";

export const getRestaurants = async (req, res) => {
  const connection = await connect();

  const [rows] = await connection.execute("SELECT * FROM restaurant");
  res.json(rows);
};

export const getCategoriesRestaurants = async (req, res) => {
  const connection = await connect();

  const [rows] = await connection.execute("SELECT * FROM categories_restaurant");
  res.json(rows);
};

export const getRestaurantsForCategory = async (req, res) => {
  const connection = await connect();

  const query = "SELECT restaurant.id, restaurant.name, restaurant.city, restaurant.address, restaurant.latitude, restaurant.longitude, restaurant.phone, restaurant.opening_time, restaurant.closing_time FROM `restaurant` INNER JOIN category_restaurant ON restaurant.id = category_restaurant.restaurant_id INNER JOIN categories_restaurant ON categories_restaurant.id = category_restaurant.category_id WHERE category_restaurant.category_id = ?";

  const [rows] = await connection.execute(query, [
    req.params.id
  ]);

  res.json(rows);
};

export const getCategoriesDish = async (req, res) => {
  const connection = await connect();

  const [rows] = await connection.execute("SELECT * FROM categories_dish");
  res.json(rows);
};

export const saveTask = async (req, res) => {
  try {
    const connection = await connect();
    const [results] = await connection.execute(
      "INSERT INTO tasks(title, description) VALUES (?, ?)",
      [req.body.title, req.body.description]
    );

    const newUser = {
      id: results.insertId,
      ...req.body,
    };
    res.json(newUser);
  } catch (error) {
    console.error(error);
  }
};

export const getTask = async (req, res) => {
  const connection = await connect();
  const rows = await connection.execute("SELECT * FROM tasks WHERE id = ?", [
    req.params.id,
  ]);
  res.json(rows[0][0]);
};
