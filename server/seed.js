import Database from "better-sqlite3";
import { faker } from "@faker-js/faker";
const db = new Database("database.db");

const g_userCount = 100;

function createTables() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS reactions (
        reaction_id INTEGER PRIMARY KEY,
        reaction TEXT NOT NULL UNIQUE,
        code TEXT NOT NULL UNIQUE
    )
`);

  db.exec(`
    CREATE TABLE IF NOT EXISTS themes (
        theme_id INTEGER PRIMARY KEY,
        name TEST NOT NULL UNIQUE,
        colour TEXT NOT NULL UNIQUE,
        path TEXT NOT NULL UNIQUE 
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

  db.exec(`
      CREATE TABLE IF NOT EXISTS message_reaction (
          id INTEGER PRIMARY KEY,
          msg_id INTEGER REFERENCES messages (msg_id)
              ON UPDATE CASCADE
              ON DELETE CASCADE,
          reaction_id INTEGER REFERENCES reactions (reaction_id)
              ON UPDATE CASCADE
              ON DELETE CASCADE,
          user_id INTEGER CASCADE REFERENCES users (user_id)
              ON UPDATE CASCADE
              ON DELETE CASCADE,
          UNIQUE (msg_id, user_id)
      )
  `);
}

function dropTables() {
  db.exec(`DROP TABLE IF EXISTS message_reaction`);
  db.exec(`DROP TABLE IF EXISTS messages`);
  db.exec(`DROP TABLE IF EXISTS users`);
  db.exec(`DROP TABLE IF EXISTS icons`);
  db.exec(`DROP TABLE IF EXISTS themes`);
  db.exec(`DROP TABLE IF EXISTS reactions`);
}

const reactions = [
  { reaction: "Happy", code: "1F600" },
  { reaction: "Sad", code: "1F641" },
  { reaction: "Angry", code: "1F621" },
  { reaction: "Heart", code: "1F496 " },
  { reaction: "Thumbs Up", code: "1F44D " },
];

const themes = [
  { name: "Pyro", colour: "#ef7938", path: "./assets/elements/pyro.svg" },
  { name: "Cryo", colour: "#9fd6e3", path: "./assets/elements/cryo.svg" },
  { name: "Anemo", colour: "#74c2a8", path: "./assets/elements/anemo.svg" },
  { name: "Dendro", colour: "#a5c83b", path: "./assets/elements/dendro.svg" },
  { name: "Hydro", colour: "#4cc2f1", path: "./assets/elements/hydro.svg" },
  { name: "Geo", colour: "#fab632", path: "./assets/elements/geo.svg" },
  { name: "Electro", colour: "#af8ec1", path: "./assets/elements/electro.svg" },
];

const icons = [
  { name: "Albedo", path: "./assets/icons/albedo_icon.webp", theme_id: 6 },
  {
    name: "Alhaitham",
    path: "./assets/icons/alhaitham_icon.webp",
    theme_id: 4,
  },
  {
    name: "Arataki",
    path: "./assets/icons/arataki_Itto_icon.webp",
    theme_id: 6,
  },
  { name: "Baizhu", path: "./assets/icons/baizhu_icon.webp", theme_id: 4 },
  { name: "Chiori", path: "./assets/icons/chiori_icon.webp", theme_id: 6 },
  { name: "Cyno", path: "./assets/icons/cyno_icon.webp", theme_id: 7 },
  { name: "Dehya", path: "./assets/icons/dehya_icon.webp", theme_id: 1 },
  { name: "Diluc", path: "./assets/icons/diluc_icon.webp", theme_id: 1 },
  { name: "Eula", path: "./assets/icons/eula_icon.webp", theme_id: 2 },
  { name: "Furina", path: "./assets/icons/furina_icon.webp", theme_id: 5 },
  { name: "Ganyu", path: "./assets/icons/ganyu_icon.webp", theme_id: 2 },
  { name: "Hu tao", path: "./assets/icons/hu_tao_icon.webp", theme_id: 1 },
  { name: "Jean", path: "./assets/icons/jean_icon.webp", theme_id: 3 },
  {
    name: "Kaedehara Kazuha",
    path: "./assets/icons/kaedehara_kazuha_icon.webp",
    theme_id: 3,
  },
  {
    name: "Kamisato Ayaka",
    path: "./assets/icons/kamisato_ayaka_icon.webp",
    theme_id: 2,
  },
  {
    name: "Kamisato Ayato",
    path: "./assets/icons/kamisato_ayato_icon.webp",
    theme_id: 5,
  },
  { name: "Keqing", path: "./assets/icons/keqing_icon.webp", theme_id: 7 },
  { name: "Klee", path: "./assets/icons/klee_icon.webp", theme_id: 1 },
  { name: "Lyney", path: "./assets/icons/lyney_icon.webp", theme_id: 1 },
  { name: "Mona", path: "./assets/icons/mona_icon.webp", theme_id: 5 },
  { name: "Nahida", path: "./assets/icons/nahida_icon.webp", theme_id: 4 },
  { name: "Navia", path: "./assets/icons/navia_icon.webp", theme_id: 6 },
  {
    name: "Neuvillette",
    path: "./assets/icons/neuvillette_icon.webp",
    theme_id: 5,
  },
  { name: "Nilou", path: "./assets/icons/nilou_icon.webp", theme_id: 5 },
  { name: "Qiqi", path: "./assets/icons/qiqi_icon.webp", theme_id: 2 },
  {
    name: "Raiden Shogun",
    path: "./assets/icons/raiden_shogun_icon.webp",
    theme_id: 7,
  },
  {
    name: "Sangonomiya Kokomi",
    path: "./assets/icons/sangonomiya_kokomi_icon.webp",
    theme_id: 5,
  },
  { name: "Shenhe", path: "./assets/icons/shenhe_icon.webp", theme_id: 2 },
  {
    name: "Tartaglia",
    path: "./assets/icons/tartaglia_icon.webp",
    theme_id: 5,
  },
  { name: "Tighnari", path: "./assets/icons/tighnari_icon.webp", theme_id: 4 },
  { name: "Venti", path: "./assets/icons/venti_icon.webp", theme_id: 3 },
  { name: "Wanderer", path: "./assets/icons/wanderer_icon.webp", theme_id: 3 },
  {
    name: "Wriothesley",
    path: "./assets/icons/wriothesley_icon.webp",
    theme_id: 2,
  },
  { name: "Xianyun", path: "./assets/icons/xianyun_icon.webp", theme_id: 3 },
  { name: "Xiao", path: "./assets/icons/xiao_icon.webp", theme_id: 3 },
  { name: "Yae Miko", path: "./assets/icons/yae_miko_icon.webp", theme_id: 7 },
  { name: "Yelan", path: "./assets/icons/yelan_icon.webp", theme_id: 5 },
  { name: "Yoimiya", path: "./assets/icons/yoimiya_icon.webp", theme_id: 1 },
  { name: "Zhongli", path: "./assets/icons/zhongli_icon.webp", theme_id: 6 },
];

function insertReactions() {
  let sql = reactions.map((item) => "(?, ?)").join(", ");
  let params = reactions.flatMap((item) => [item.reaction, item.code]);
  db.prepare(`INSERT INTO reactions (reaction, code) VALUES ${sql}`).run(
    ...params
  );
}

function insertThemes() {
  let sql = themes.map((item) => "(?, ?, ?)").join(", ");
  let params = themes.map((item) => [item.name, item.colour, item.path]);
  db.prepare(`INSERT INTO themes (name, colour, path) VALUES ${sql}`).run(
    ...params
  );
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
      const msgid = db
        .prepare(
          `INSERT INTO messages (message, created, updated, likes, user_id) VALUES (?, ?, ?, ?, ?)`
        )
        .run(
          faker.lorem.sentences({ min: 1, max: 3 }, "\n"),
          createdDate.getTime(),
          recentDate,
          likes,
          i + 1
        );
      generateReactions(msgid.lastInsertRowid);
    }
  }
}

function generateReactions(msgid) {
  for (let i = 0; i < g_userCount; i++) {
    if (Math.random() < 0.1) {
      db.prepare(
        `INSERT INTO message_reaction (msg_id, reaction_id, user_id) VALUES (?, ?, ?)`
      ).run(
        msgid,
        parseInt(Math.floor(Math.random() * reactions.length)) + 1,
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

function getRandomName() {
  return `${faker.word.adjective()} ${faker.word.noun()}`;
}

function getRandomIcon() {
  return parseInt(Math.floor(Math.random() * icons.length) + 1);
}

// resetDb();

export { resetDb, getRandomName, getRandomIcon };
