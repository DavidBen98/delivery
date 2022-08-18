import { connect } from "../database";

export const getRestaurants = async (req, res) => {
  console.log("aca llego")
  const connection = await connect();
  // connection.then((a) => console.log(a)).catch((err) => console.error(err));

  const [rows] = await connection.execute("SELECT * FROM restaurant");
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
