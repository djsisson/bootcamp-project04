import express, { response } from "express";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

import Database from "better-sqlite3";
const db = new Database("database.db");



app.get("/", (req, res) => {
    res.send("test from server");
})

app.listen(8080, () => {
    console.log("App is running.");
})