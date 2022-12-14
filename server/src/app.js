import cors from "cors";
import morgan from "morgan";
import userRoutes from "./routes/users.js";
import express from "express";

// const bodyParser = require("body-parser");

const app = express();
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

app.set("port", 3000);

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(userRoutes);

export default app;