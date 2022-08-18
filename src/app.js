import express from "express";
import cors from "cors";
import userRoutes from "../routes/users";

const app = express();

app.set("port", 3000);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(userRoutes);

export default app;