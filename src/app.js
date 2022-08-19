import cors from "cors";
import morgan from "morgan";
import userRoutes from "./routes/users.js";
import express from "express";

const app = express();

app.set("port", 3000);

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(userRoutes);

export default app;