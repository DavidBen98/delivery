import { Router } from "express";
import {
  // deleteTask,
  getRestaurants,
  getCategoriesRestaurants,
  getCategoriesDish,
  getRestaurantsForCategory,
  getAllDishes,
  getDishesForCategory,
  getDishesForRestaurant,
  getCategoriesForRestaurant,
  getRestaurantForId
  // saveTask,
  // getTask,
  // updateTask,
  // getTasksCount,
} from "../controllers/Requests.js";

const router = Router();

router.get("/restaurants", getRestaurants);

router.get("/restaurants/:id", getRestaurantForId);

router.get("/categories/restaurants", getCategoriesRestaurants); //obtener categorias de restaurantes

router.get("/categories/restaurants/:id", getRestaurantsForCategory); //obtener restaurantes segun categorias de restaurantes

router.get("/categories/dish", getCategoriesDish); //obtener categorias de platos

router.get("/categories/dish/dishes", getAllDishes); //obtener todos los platos

router.get("/categories/dish/dishes/:idCategory", getDishesForCategory); //obtener platos por categorias

router.get("/categories/dish/dishes/restaurant/:idRestaurant", getDishesForRestaurant); //obtener platos por restaurant

router.get("/restaurants/category/:idRestaurant", getCategoriesForRestaurant); //obtener platos por restaurant

// router.get("/tasks/count", getTasksCount);

// router.post("/tasks", saveTask);

// router.get("/tasks/:id", getTask);

// router.delete("/tasks/:id", deleteTask);

// router.put("/tasks/:id", updateTask);

export default router;