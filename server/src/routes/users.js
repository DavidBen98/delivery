import { Router } from "express";
import {
  getRestaurants,
  getCategoriesRestaurants,
  getCategoriesDish,
  getRestaurantsForCategory,
  getAllDishes,
  getDishesForCategory,
  getDishesForRestaurant,
  getCategoriesForRestaurant,
  getRestaurantForId,
  getDishesForCategoryOfRestaurant,
  getOpinionsForRestaurant,
  getUser,
  registerUser,
  existUser,
  registerUserWithGoogle,
  getLocationsForId
} from "../controllers/Requests.js";

const router = Router();

router.get("/restaurants", getRestaurants);

router.get("/restaurants/:id", getRestaurantForId);

router.get("/restaurants/dishes/:idRestaurant", getDishesForCategoryOfRestaurant); //obtener platos por restaurant

router.get("/restaurants/category/:idRestaurant", getCategoriesForRestaurant); //obtener platos por restaurant

router.get("/restaurants/opinions/:idRestaurant", getOpinionsForRestaurant); //obtener platos por restaurant

router.get("/categories/restaurants", getCategoriesRestaurants); //obtener categorias de restaurantes

router.get("/categories/restaurants/:id", getRestaurantsForCategory); //obtener restaurantes segun categorias de restaurantes

router.get("/categories/dish", getCategoriesDish); //obtener categorias de platos

router.get("/categories/dish/dishes", getAllDishes); //obtener todos los platos

router.get("/categories/dish/dishes/:idCategory", getDishesForCategory); //obtener platos por categorias

router.get("/categories/dish/dishes/restaurant/:idRestaurant", getDishesForRestaurant); //obtener platos por restaurant

router.post("/login", getUser);

router.post("/user", existUser);

router.post("/register", registerUser);

router.post("/registerWithGoogle", registerUserWithGoogle);

router.get("/location/:id", getLocationsForId);

export default router;