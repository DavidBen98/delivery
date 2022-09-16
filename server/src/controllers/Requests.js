import { connect } from "../database.js";
const jwt = require('jsonwebtoken');
const fs = require("fs");
const path = require("path");
const bcrypt = require('bcrypt');
require('dotenv').config();
import { schemaRegister } from "./Validations.js";

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

  const [rows] = await connection.execute("SELECT * FROM categories_restaurant WHERE active = 1");
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

  const [rows] = await connection.execute("SELECT * FROM categories_dish WHERE active = 1");
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

  console.log(rows[0].photo);

  rows.map(dish => (
    fs.writeFileSync(path.join(__dirname, '../../dbimages/dishes/' + dish.id + ".png"),
    dish.photo)
  ));
  
  res.json(rows);
};


export const getDishesForCategoryOfRestaurant = async (req, res) => {
  const connection = await connect();

  const query = "SELECT category_dish.category_dish_id as category_id, categories_dish.name as category_name, dish.id, dish.name, " + 
  "dish.short_description, dish.price, dish.photo, dish.restaurant_id " + 
  "FROM `category_dish` " + 
  "INNER JOIN categories_dish on categories_dish.id = category_dish.category_dish_id " +
  "INNER JOIN dish on dish.id = category_dish.dish_id " +
  "WHERE dish.restaurant_id = ? AND categories_dish.active = 1";

  const [rows] = await connection.execute(query, [
    req.params.idRestaurant
  ]);

  rows.map(dish => (
    fs.writeFileSync(path.join(__dirname, '../../dbimages/dishes/' + dish.id + ".png"),
    dish.photo)
  ));
  
  res.json(rows);
}

export const getOpinionsForRestaurant = async (req, res) => {
  const connection = await connect();

  const [rows] = await connection.execute("SELECT opinions.id, opinions.description, opinions.date, opinions.user_id, opinions.stars, " +
    // "user.photo as user_photo, user.first_name as first_name " +
    "user.first_name as first_name " +
    "FROM `opinions` " + 
    "INNER JOIN `user` ON user.id = opinions.user_id " +
    "WHERE restaurant_id = ?", [
    req.params.idRestaurant
  ]);

  // rows.map(opinion => (
  //   fs.writeFileSync(path.join(__dirname, '../../dbimages/users/' + opinion.user_id + ".png"),
  //   opinion.user_photo)
  // ));
  
  res.json(rows);
};

export const getUser = async (req, res) => {
    const connection = await connect();

    const [rows] = await connection.execute(
        "SELECT * FROM user " +
        "WHERE username = ?", [
        req.body.username,
    ]);

    if (!rows.length) return res.status(400).json({ error: true, message: 'Username and/or password are incorrect' });
    
    const validPassword = await bcrypt.compare(req.body.password, rows[0].password); 

    if (!validPassword) return res.status(400).json({ error: true, message: 'Username and/or password are incorrect' });
  
    const token = jwt.sign({
      id: rows[0].id,
      first_name: rows[0].first_name,
      second_name: rows[0].second_name,
      username: rows[0].username,
      email: rows[0].email,
    }, process.env.TOKEN_SECRET);

    res.header('auth-token', token).json({
      error: 'null',
      data: rows,
      token
    });
};

export const existUser = async(req, res) => {
  const connection = await connect();

  const [rows] = await connection.execute(
      "SELECT email FROM user " +
      "WHERE email = ?", [
      req.body.email,
  ]);

  return res.json({
    data: rows,
  })
}

export const registerUser = async (req, res) => {
    const { error } = schemaRegister.validate({
        first_name: req.body.first_name,
        second_name: req.body.second_name,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
    });

    if (error) {
        return res.status(400).json(
            {error: error.details[0].message}
        )
    }

    const connection = await connect();

    const [userEmail] = await connection.execute(
        "SELECT email " +
        "FROM user " +
        `WHERE email = "${req.body.email}"`
    );

    if (userEmail.length > 0) {
        return res.status(400).json(
            {error: 'Email ya registrado'}
        )
    }

    const [userUsername] = await connection.execute(
      "SELECT username " +
      "FROM user " +
      `WHERE username = "${req.body.username}"`
    );

    if (userUsername.length > 0) {
        return res.status(400).json(
            {error: 'Username ya registrado'}
        )
    }

    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.password, salt);

    const user = {
        first_name: req.body.first_name,
        second_name: req.body.second_name,
        username: req.body.username,
        email: req.body.email,
        password: password,
        image: req.body.image
    }

    try {
        const [rows] = await connection.execute(
            "INSERT INTO `user`(`first_name`, `second_name`, `username`, `password`, `email`) " +
            `VALUES ("${user.first_name}", "${user.second_name}","${user.username}","${user.password}", "${user.email}")`
        );
        
        const base64Data = req.body.image.replace(/^data:([A-Za-z-+/]+);base64,/, '');
        
        fs.writeFileSync(path.join(__dirname, '../../dbimages/users/'+user.username+'.png'),
        base64Data, {encoding: 'base64'});


        res.json({
            error: null,
            data: rows
        })
    } catch (error) {
        res.status(400).json({error})
    }
}

export const registerUserWithGoogle = async (req, res) => {
  const connection = await connect();

  const user = {
    first_name: req.body.first_name,
    second_name: req.body.second_name,
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    image: req.body.image
  }

  try {
      const [rows] = await connection.execute(
          "INSERT INTO `user`(`first_name`, `second_name`, `username`, `password`, `email`, `image`) " +
          `VALUES ("${user.first_name}", "${user.second_name}","${user.username}","${user.password}", "${user.email}", , "${user.image}")`
      );

      res.json({
          error: null,
          data: rows
      })
  } catch (error) {
      res.status(400).json({error})
  }
}