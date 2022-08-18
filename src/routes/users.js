import { Router } from "express";
import {
  // deleteTask,
  getRestaurants,
  // saveTask,
  // getTask,
  // updateTask,
  // getTasksCount,
} from "../controllers/Requests";

const router = Router();

router.get("/restaurants", getRestaurants);

// router.get("/tasks/count", getTasksCount);

// router.post("/tasks", saveTask);

// router.get("/tasks/:id", getTask);

// router.delete("/tasks/:id", deleteTask);

// router.put("/tasks/:id", updateTask);

export default router;