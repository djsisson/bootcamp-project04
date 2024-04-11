import express from "express";
import cors from "cors";
import * as seed from "./seed.js";

const app = express();

app.use(express.json());
app.use(cors());

import Database from "better-sqlite3";
const db = new Database("database.db");

app.get("/", (req, res) => {
  res.send("test from server");
});

app.get("/themes", (req, res) => {
  res.json(db.prepare("SELECT * FROM themes").all());
});

app.get("/icons", (req, res) => {
  res.json(db.prepare("SELECT * FROM icons").all());
});


app.post("/users/random", (req, res) => {
  res.json(seed.newUser());
});

app.post("/users/:userid(\\d+)", (req, res) => {
  try {
    Object.assign(req.params, req.query);
    const update = db
      .prepare(
        "UPDATE users SET username = (@username), icon_id = (@iconid) WHERE user_id = (@userid)"
      )
      .run(req.params);
    res.json(req.params);
  } catch (error) {
    res.status(500).json(error);
  }
});

app.get("/users/:userId(\\d+)", (req, res) => {
  res.json(
    db.prepare("SELECT * FROM users WHERE user_id = (?)").all(req.params.userId)
  );
});

app.listen(8080, () => {
  console.log("App is running.");
});
