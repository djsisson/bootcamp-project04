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

app.listen(8080, () => {
  console.log("App is running.");
});
