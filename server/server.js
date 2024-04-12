import express from "express";
import cors from "cors";
import * as query from "./query.js";

const app = express();

app.use(express.json());
app.use(cors());

import Database from "better-sqlite3";
const db = new Database("database.db");

app.get("/", (req, res) => {
  res.status(403).send();
});

app.get("/themes", (req, res) => {
  try {
    res.status(200).json(query.getAllThemes());
  } catch (error) {
    res.status(500).send();
  }
});

app.get("/icons", (req, res) => {
  try {
    res.status(200).json(query.getAllIcons());
  } catch (error) {
    res.status(500).send();
  }
});

app.get("/users/random", (req, res) => {
  try {
    res.status(200).json(query.getRandomName());
  } catch (error) {
    res.status(500).send();
  }
});

app.post("/users/new", (req, res) => {
  try {
    res.status(200).json(query.generateNewUser());
  } catch (error) {
    res.status(400).send();
  }
});

app.put("/users/:userid(\\d+)", (req, res) => {
  let userid = {};
  Object.assign(userid, req.params, req.query);
  try {
    const result = query.updateUser(userid);
    if (result.changes == 0) {
      res.status(400).send();
    } else {
      res.status(200).json(userid);
    }
  } catch (error) {
    res.status(400).send();
  }
});

app.get("/users/:userid(\\d+)", (req, res) => {
  try {
    const result = query.getUser(req.params.userid);
    if (result.length == 0) {
      res.status(400).send();
    } else {
      res.status(200).send(result);
    }
  } catch (error) {
    res.status(400).send();
  }
});

app.delete("/users/:userid(\\d+)", (req, res) => {
  try {
    const result = query.deleteUser(req.params.userid);
    if (result.changes == 0) {
      res.status(400).send();
    } else {
      res.status(200).send();
    }
  } catch (error) {
    res.status(400).send();
  }
});

app.get("/messages/:msgid(\\d+)", (req, res) => {
  try {
    const result = query.getMessageById(req.params.msgid);
    if (result.length == 0) {
      res.status(400).send();
    } else {
      res.status(200).send(result);
    }
  } catch (error) {
    res.status(400).send();
  }
});

app.get("/messages/count", (req, res) => {
  try {
    const result = query.getTotalMessageCount();
    if (result.length == 0) {
      res.status(400).send();
    } else {
      res.status(200).send(result);
    }
  } catch (error) {
    res.status(400).send();
  }
});

app.get("/messages/:userid(\\d+)/:offset(\\d+)/:count(\\d+)", (req, res) => {
  try {
    res
      .status(200)
      .json(query.getMessages(req.params.userid, req.params.offset, req.params.count));
  } catch (error) {
    res.status(400).send();
  }
});

app.get("/messages/user/:userid(\\d+)", (req, res) => {
  try {
    const result = query.getUser(req.params.userid);
    if (result.length == 0) {
      res.status(400).send();
    } else {
      res.status(200).send(result);
    }
  } catch (error) {
    res.status(400).send();
  }
});

app.put("/messages/:msgid(\\d+)/Like", (req, res) => {
  //TODO
  try {
  } catch (error) {
    res.status(400).send();
  }
});

app.post("/messages/:userid(\\d+)", (req, res) => {
  try {
    res.status(200).json(query.newMessage(req.params.userid, req.body.message));
  } catch (error) {
    res.status(400).send();
  }
});

app.delete("/messages/:msgid(\\d+)", (req, res) => {
  try {
    const result = query.deleteMessage(req.params.msgid);
    if (result.changes == 0) {
      res.status(400).send();
    } else {
      res.status(200).send();
    }
  } catch (error) {
    res.status(400).send();
  }
});

app.listen(8080, () => {
  console.log("App is running.");
});
