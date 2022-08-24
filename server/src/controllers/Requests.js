import { connect } from "../database.js";
const fs = require("fs");
const path = require("path");

export const getRestaurants = async (req, res) => {
  const connection = await connect();

  const [rows] = await connection.execute("SELECT * FROM restaurant");
  res.json(rows);
};

export const getRestaurantForId = async (req, res) => {
  const connection = await connect();

  const [rows] = await connection.execute("SELECT * FROM restaurant WHERE id = ?", [
    req.params.id
  ]);
  res.json(rows);
};

export const getCategoriesRestaurants = async (req, res) => {
  const connection = await connect();

  const [rows] = await connection.execute("SELECT * FROM categories_restaurant");
  res.json(rows);
};

export const getRestaurantsForCategory = async (req, res) => {
  const connection = await connect();

  const query = "SELECT restaurant.id, restaurant.name, restaurant.image, " + 
  "restaurant.city, restaurant.address, restaurant.latitude, " +
  "restaurant.longitude, restaurant.phone, restaurant.opening_time, " +
  "restaurant.closing_time FROM `restaurant` " +
  "INNER JOIN category_restaurant ON restaurant.id = category_restaurant.restaurant_id " +
  "INNER JOIN categories_restaurant ON categories_restaurant.id = category_restaurant.category_id " +
  "WHERE category_restaurant.category_id = ?";

  const [rows] = await connection.execute(query, [
    req.params.id
  ]);

  rows.map(restaurant => (
    fs.writeFileSync(path.join(__dirname, '../../dbimages/restaurants/' + restaurant.id + ".png"),
    restaurant.image)
  ));

  res.json(rows);
};

export const getCategoriesForRestaurant = async (req, res) => {
  const connection = await connect();

  // const query = "SELECT categories_dish.name, dish.name FROM categories_dish INNER JOIN category_dish ON category_dish.category_dish_id = categories_dish.id INNER JOIN dish ON category_dish.dish_id = dish.id WHERE dish.restaurant_id = ?";
  const query = "SELECT categories_dish.name as category, dish.name as dish " + 
  "FROM categories_dish " +
  "INNER JOIN category_dish ON category_dish.category_dish_id = categories_dish.id " +
  "INNER JOIN dish ON category_dish.dish_id = dish.id " +
  "WHERE dish.restaurant_id =?";

  const [rows] = await connection.execute(query, [
    req.params.idRestaurant
  ]);
  res.json(rows);
};

export const getCategoriesDish = async (req, res) => {
  const connection = await connect();

  const [rows] = await connection.execute("SELECT * FROM categories_dish");
  res.json(rows);
};

export const getAllDishes = async (req, res) => {
  const connection = await connect();

  const [rows] = await connection.execute("SELECT * FROM dishes");
  res.json(rows);
};

export const getDishesForRestaurant = async (req, res) => {
  const connection = await connect();

  const [rows] = await connection.execute("SELECT * FROM dishes WHERE restaurant_id = ?", [
    req.params.id
  ]);

  res.json(rows);
};

export const getDishesForCategory = async (req, res) => {
  const connection = await connect();

  const [rows] = await connection.execute("SELECT dish.id, dish.name, dish.short_description, dish.price, dish.photo, dish.restaurant_id FROM `dish` INNER JOIN category_dish ON dish.id = category_dish.dish_id WHERE category_dish_id = ?", [
    req.params.idCategory
  ]);

  rows.map(dish => (
    fs.writeFileSync(path.join(__dirname, '../../dbimages/dishes/' + dish.id + ".png"),
    dish.photo)
  ));
  
  res.json(rows);
};
