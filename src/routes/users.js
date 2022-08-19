import { Router } from "express";
import {
  // deleteTask,
  getRestaurants,
  getCategoriesRestaurants,
  getCategoriesDish,
  getRestaurantsForCategory,
  // saveTask,
  // getTask,
  // updateTask,
  // getTasksCount,
} from "../controllers/Requests.js";

const router = Router();

router.get("/restaurants", getRestaurants);

router.get("/categories/restaurants", getCategoriesRestaurants); //obtener categorias de restaurantes

router.get("/categories/restaurants/:id", getRestaurantsForCategory); //obtener restaurantes segun categorias de restaurantes

router.get("/categories/dish", getCategoriesDish); //obtener categorias de platos


// router.get("/tasks/count", getTasksCount);

// router.post("/tasks", saveTask);

// router.get("/tasks/:id", getTask);

// router.delete("/tasks/:id", deleteTask);

// router.put("/tasks/:id", updateTask);

export default router;