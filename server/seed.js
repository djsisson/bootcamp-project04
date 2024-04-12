import Database from "better-sqlite3";
import { faker } from "@faker-js/faker";
const db = new Database("database.db");

const g_userCount = 100;

function createTables() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS reactions (
        reaction_id INTEGER PRIMARY KEY,
        reaction TEXT NOT NULL UNIQUE
    )
`);

  db.exec(`
    CREATE TABLE IF NOT EXISTS themes (
        theme_id INTEGER PRIMARY KEY,
        name TEST NOT NULL UNIQUE,
        colour TEXT NOT NULL UNIQUE 
)
`);

  db.exec(`
    CREATE TABLE IF NOT EXISTS icons (
        icon_id INTEGER PRIMARY KEY,
        name TEXT NOT NULL UNIQUE,
        path TEXT NOT NULL UNIQUE,
        theme_id INTEGER REFERENCES themes (theme_id)
            ON UPDATE RESTRICT
            ON DELETE RESTRICT
    )
`);

  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
        user_id INTEGER PRIMARY KEY,
        username TEXT NOT NULL UNIQUE,
        icon_id INTEGER REFERENCES icons (icon_id)
            ON UPDATE RESTRICT
            ON DELETE RESTRICT
    )
`);

  db.exec(`
    CREATE TABLE IF NOT EXISTS messages (
        msg_id INTEGER PRIMARY KEY,
        message TEXT NOT NULL,
        created INTEGER,
        updated INTEGER,
        likes INTEGER,
        user_id INTEGER REFERENCES users (user_id)
            ON UPDATE CASCADE
            ON DELETE CASCADE
    )
`);

  // db.exec(`
  //     CREATE TABLE IF NOT EXISTS message_reaction (
  //         id INTEGER PRIMARY KEY,
  //         msg_id INTEGER CASCADE REFERENCES messages,
  //         reaction_id INTEGER CASCADE REFERENCES reactions,
  //         user_id INTEGER CASCADE REFERENCES users,
  //         UNIQUE (msg_id, reaction_id, user_id)
  //     )
  // `);
}

function dropTables() {
  db.exec(`DROP TABLE IF EXISTS messages`);
  db.exec(`DROP TABLE IF EXISTS users`);
  db.exec(`DROP TABLE IF EXISTS icons`);
  db.exec(`DROP TABLE IF EXISTS themes`);
  db.exec(`DROP TABLE IF EXISTS reactions`);
  db.exec(`DROP TABLE IF EXISTS message_reaction`);
}

const reactions = [
  { reaction: "Happy" },
  { reaction: "Sad" },
  { reaction: "Angry" },
  { reaction: "Heart" },
  { reaction: "Thumbs Up" },
];

const themes = [
  { name: "Pyro" ,colour: "#ef7938" },
  { name: "Cryo" ,colour: "#9fd6e3" },
  { name: "Anemo" ,colour: "#74c2a8" },
  { name: "Dendro" ,colour: "#a5c83b" },
  { name: "Hydro" ,colour: "#4cc2f1" },
  { name: "Geo" ,colour: "#fab632" },
  { name: "Electro" ,colour: "#af8ec1" },
];

const icons = [
  { name: "Albedo", path: "./assets/albedo_icon.webp", theme_id: 6 },
  { name: "Alhaitham", path: "./assets/alhaitham_icon.webp", theme_id: 4 },
  { name: "Arataki", path: "./assets/arataki_Itto_icon.webp", theme_id: 6 },
  { name: "Baizhu", path: "./assets/baizhu_icon.webp", theme_id: 4 },
  { name: "Chiori", path: "./assets/chiori_icon.webp", theme_id: 6 },
  { name: "Cyno", path: "./assets/cyno_icon.webp", theme_id: 7 },
  { name: "Dehya", path: "./assets/dehya_icon.webp", theme_id: 1 },
  { name: "Diluc", path: "./assets/diluc_icon.webp", theme_id: 1 },
  { name: "Eula", path: "./assets/eula_icon.webp", theme_id: 2 },
  { name: "Furina", path: "./assets/furina_icon.webp", theme_id: 5 },
  { name: "Ganyu", path: "./assets/ganyu_icon.webp", theme_id: 2 },
  { name: "Hu tao", path: "./assets/hu_tao_icon.webp", theme_id: 1 },
  { name: "Jean", path: "./assets/jean_icon.webp", theme_id: 3 },
  {
    name: "Kaedehara Kazuha",
    path: "./assets/kaedehara_kazuha_icon.webp",
    theme_id: 3,
  },
  {
    name: "Kamisato Ayaka",
    path: "./assets/kamisato_ayaka_icon.webp",
    theme_id: 2,
  },
  {
    name: "Kamisato Ayato",
    path: "./assets/kamisato_ayato_icon.webp",
    theme_id: 5,
  },
  { name: "Keqing", path: "./assets/keqing_icon.webp", theme_id: 7 },
  { name: "Klee", path: "./assets/klee_icon.webp", theme_id: 1 },
  { name: "Lyney", path: "./assets/lyney_icon.webp", theme_id: 1 },
  { name: "Mona", path: "./assets/mona_icon.webp", theme_id: 5 },
  { name: "Nahida", path: "./assets/nahida_icon.webp", theme_id: 4 },
  { name: "Navia", path: "./assets/navia_icon.webp", theme_id: 6 },
  { name: "Neuvillette", path: "./assets/neuvillette_icon.webp", theme_id: 5 },
  { name: "Nilou", path: "./assets/nilou_icon.webp", theme_id: 5 },
  { name: "Qiqi", path: "./assets/qiqi_icon.webp", theme_id: 2 },
  {
    name: "Raiden Shogun",
    path: "./assets/raiden_shogun_icon.webp",
    theme_id: 7,
  },
  {
    name: "Sangonomiya Kokomi",
    path: "./assets/sangonomiya_kokomi_icon.webp",
    theme_id: 5,
  },
  { name: "Shenhe", path: "./assets/shenhe_icon.webp", theme_id: 2 },
  { name: "Tartaglia", path: "./assets/tartaglia_icon.webp", theme_id: 5 },
  { name: "Tighnari", path: "./assets/tighnari_icon.webp", theme_id: 4 },
  { name: "Venti", path: "./assets/venti_icon.webp", theme_id: 3 },
  { name: "Wanderer", path: "./assets/wanderer_icon.webp", theme_id: 3 },
  { name: "Wriothesley", path: "./assets/wriothesley_icon.webp", theme_id: 2 },
  { name: "Xianyun", path: "./assets/xianyun_icon.webp", theme_id: 3 },
  { name: "Xiao", path: "./assets/xiao_icon.webp", theme_id: 3 },
  { name: "Yae Miko", path: "./assets/yae_miko_icon.webp", theme_id: 7 },
  { name: "Yelan", path: "./assets/yelan_icon.webp", theme_id: 5 },
  { name: "Yoimiya", path: "./assets/yoimiya_icon.webp", theme_id: 1 },
  { name: "Zhongli", path: "./assets/zhongli_icon.webp", theme_id: 6 },
];

function insertReactions() {
  let sql = reactions.map((item) => "(?)").join(", ");
  let params = reactions.flatMap((item) => item.reaction);
  db.prepare(`INSERT INTO reactions (reaction) VALUES ${sql}`).run(params);
}

function insertThemes() {
  let sql = themes.map((item) => "(?, ?)").join(", ");
  let params = themes.map((item) => [item.name, item.colour]);
  db.prepare(`INSERT INTO themes (name, colour) VALUES ${sql}`).run(...params);
}

function insertIcons() {
  let sql = icons.map((item) => "(?, ?, ?)").join(", ");
  let params = icons.map((item) => [item.name, item.path, item.theme_id]);
  db.prepare(`INSERT INTO icons (name, path, theme_id) VALUES ${sql}`).run(
    ...params
  );
}

function insertUsers() {
  for (let i = 0; i < g_userCount; i++) {
    db.prepare(`INSERT INTO users (username, icon_id) VALUES (?, ?)`).run(
      `${faker.word.adjective()} ${faker.word.noun()}`,
      parseInt(Math.floor(Math.random() * icons.length) + 1)
    );
  }
}

function insertMessages() {
  for (let i = 0; i < g_userCount; i++) {
    for (let j = 0; j < parseInt(Math.floor(Math.random() * 4)); j++) {
      let createdDate = faker.date.recent({ days: 365 });
      let recentDate = faker.date
        .between({
          from: createdDate,
          to: Date.now(),
        })
        .getTime();
      let likes = parseInt(Math.floor((Math.random() * g_userCount) / 2));
      db.prepare(
        `INSERT INTO messages (message, created, updated, likes, user_id) VALUES (?, ?, ?, ?, ?)`
      ).run(
        faker.lorem.sentences({ min: 1, max: 3 }, "\n"),
        createdDate.getTime(),
        recentDate,
        likes,
        i + 1
      );
    }
  }
}

function resetDb() {
  db.transaction(() => {
    dropTables();
  }).apply();
  db.transaction(() => {
    createTables();
  }).apply();
  db.transaction(() => {
    insertReactions();
  }).apply();
  db.transaction(() => {
    insertThemes();
  }).apply();
  db.transaction(() => {
    insertIcons();
  }).apply();
  db.transaction(() => {
    insertUsers();
  }).apply();
  db.transaction(() => {
    insertMessages();
  }).apply();
}

function newUser() {
  const insert = db.prepare(
    `INSERT INTO users (username, icon_id) VALUES (?, ?)`
  );
  try {
    const trans = db
      .transaction((x) => {
        const test = insert.run(
          `${faker.word.adjective()} ${faker.word.noun()}`,
          parseInt(Math.floor(Math.random() * icons.length) + 1)
        );
        return test;
      })
      .apply();
    return db
      .prepare("SELECT * FROM users where user_id = (?)")
      .all(trans.lastInsertRowid);
  } catch (error) {
    throw error;
  }
}

export { newUser , resetDb};
