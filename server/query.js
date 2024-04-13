import * as seed from "./seed.js";
import Database from "better-sqlite3";

const db = new Database("database.db");

function getAllThemes() {
  try {
    const themes = db.prepare("SELECT * FROM themes").all();
    return themes;
  } catch (error) {
    throw error;
  }
}

function getRandomName(){
  return seed.getRandomName()
}

function getAllIcons() {
  try {
    const icons = db.prepare("SELECT * FROM icons").all();
    return icons;
  } catch (error) {
    throw error;
  }
}


function getAllIconsJson() {
  try {
    const icons = db
      .prepare(
        `SELECT t.*, json_group_array(json_object('id', i.icon_id, 'name', i.name, 'path', i.path)) Characters FROM icons as i INNER JOIN themes AS t ON i.theme_id = t.theme_id GROUP BY i.theme_id`
      )
      .all();
    return icons.map((x) => ({
      id: x.theme_id,
      name: x.name,
      colour: x.colour,
      path: x.path,
      characters: JSON.parse(x.Characters),
    }));
  } catch (error) {
    throw error;
  }
}

function generateNewUser() {
  const newUser = db.prepare(
      `INSERT INTO users (username, icon_id) VALUES (?, ?)`
    );
  try {
    const trans = db
      .transaction((x) => {
        const test = newUser.run(seed.getRandomName(), seed.getRandomIcon());
        return test;
      })
      .apply();
    return db
      .prepare("SELECT * FROM users where user_id = (?)")
      .all(trans.lastInsertRowid)[0];
  } catch (error) {
    throw error;
  }
}

function getUser(userid) {
  try {
    const user = db
      .prepare("SELECT * FROM users WHERE user_id = (?)")
      .all(userid)[0];
    return user;
  } catch (error) {
    throw error;
  }
}

function deleteUser(userid) {
  const user = db.prepare("DELETE FROM users WHERE user_id = (?)");
  try {
    const trans = db
      .transaction(() => {
        const test = user.run(userid);
        return test;
      })
      .apply();
    return trans;
  } catch (error) {
    throw error;
  }
}

function updateUser(userid) {
  const user = db.prepare(
    "UPDATE users SET username = (@username), icon_id = (@iconid) WHERE user_id = (@userid)"
  );
  try {
    const trans = db
      .transaction(() => {
        const test = user.run(userid);
        return test;
      })
      .apply();
    return trans;
  } catch (error) {
    throw error;
  }
}

function messagesByUser(userid) {
  try {
    const msg = db
      .prepare("SELECT * FROM messages WHERE user_id = (?)")
      .all(userid);
    return msg;
  } catch (error) {
    throw error;
  }
}

function getMessageById(msgId) {
  try {
    const msg = db
      .prepare("SELECT * FROM messages WHERE msg_id = (?)")
      .all(msgId);
    return msg;
  } catch (error) {
    throw error;
  }
}

function newMessage(userid, message) {
  const insert = db.prepare(
    `INSERT INTO messages (message, created, updated, likes, user_id) VALUES (?, ?, ?, ? , ?)`
  );
  try {
    const trans = db
      .transaction((x) => {
        const test = insert.run(message, Date.now(), Date.now(), 0, userid);
        return test;
      })
      .apply();
    return db
      .prepare("SELECT * FROM messages where msg_id = (?)")
      .all(trans.lastInsertRowid);
  } catch (error) {
    throw error;
  }
}

function getMessages(userid = 0, page = 0, count = 10) {
  try {
    if (page==0) page = Date.now()
    const newMessageFromUser = `SELECT * FROM messages WHERE user_id = (?) ORDER BY created DESC LIMIT 1`;
    const message = db.prepare(`${newMessageFromUser}`).all(userid);
    let msgid = 0;
    if (message.length != 0) msgid = message[0].msg_id;
    const newestMessages = db
      .prepare(
        `SELECT * FROM messages WHERE msg_id != (?) AND created < (?) ORDER BY created DESC LIMIT (?)`
      )
      .all(msgid,page ,count - Boolean(msgid));
    return message.concat(newestMessages);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

function getTotalMessageCount(){
  try {
    const total = db.prepare("SELECT COUNT(*) AS Total FROM messages").all();
    return total;
  } catch (error) {
    throw error;
  }
}

function likeMessage(msgid) {
  //TODO
}

function deleteMessage(msgid) {
  const msg = db.prepare("DELETE FROM messages WHERE msg_id = (?)");
  try {
    const trans = db
      .transaction(() => {
        const test = msg.run(msgid);
        return test;
      })
      .apply();
    return trans;
  } catch (error) {
    throw error;
  }
}

export {
  getAllThemes,
  getAllIcons,
  generateNewUser,
  getUser,
  updateUser,
  deleteUser,
  getMessages,
  deleteMessage,
  messagesByUser,
  getMessageById,
  newMessage,
  likeMessage,
  getTotalMessageCount,
  getRandomName
};
