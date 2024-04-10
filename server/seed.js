import Database from "better-sqlite3";
const db = new Database("database.db");

db.exec(`
    CREATE TABLE IF NOT EXISTS reactions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        reaction TEXT NOT NULL UNIQUE
    )
`);

db.exec(`
    CREATE TABLE IF NOT EXISTS icons (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL UNIQUE,
        path TEXT NOT NULL UNIQUE
    )
`);

db.exec(`
    CREATE TABLE IF NOT EXISTS themes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        theme TEXT NOT NULL UNIQUE 
)
`);

db.exec(`
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL UNIQUE,
        icon INTEGER CASCADE REFERENCES icons,
        theme INTEGER CASCADE REFERENCES theme
    )
`);

db.exec(`
    CREATE TABLE IF NOT EXISTS messages (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER CASCADE REFERENCES users,
        message TEXT NOT NULL,
        created DATE,
        updated DATE,
        likes INTEGER
    )
`);

db.exec(`
    CREATE TABLE IF NOT EXISTS message_reaction (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        msg_id INTEGER CASCADE REFERENCES messages,
        reaction_id INTEGER CASCADE REFERENCES reactions,
        user_id INTEGER CASCADE REFERENCES users,
        UNIQUE (msg_id, reaction_id, user_id)
    )
`);

const reactions = [
  { reaction: "Happy" },
  { reaction: "Sad" },
  { reaction: "Angry" },
  { reaction: "Heart" },
  { reaction: "Thumbs Up" },
];

const themes = [
  { theme: "#ef7938" },
  { theme: "#9fd6e3" },
  { theme: "#74c2a8" },
  { theme: "#a5c83b" },
  { theme: "#4cc2f1" },
  { theme: "#fab632" },
  { theme: "#af8ec1" },
];

const icons = [
  { name: "Albedo", path: "./assets/albedo_icon.webp" },
  { name: "Alhaitham", path: "./assets/alhaitham_icon.webp" },
  { name: "Arataki", path: "./assets/arataki_Itto_icon.webp" },
  { name: "Baizhu", path: "./assets/baizhu_icon.webp" },
  { name: "Chiori", path: "./assets/chiori_icon.webp" },
  { name: "Cyno", path: "./assets/cyno_icon.webp" },
  { name: "Dehya", path: "./assets/dehya_icon.webp" },
  { name: "Diluc", path: "./assets/diluc_icon.webp" },
  { name: "Eula", path: "./assets/eula_icon.webp" },
  { name: "Furina", path: "./assets/furina_icon.webp" },
  { name: "Ganyu", path: "./assets/ganyu_icon.webp" },
  { name: "Hu tao", path: "./assets/hu_tao_icon.webp" },
  { name: "Jean", path: "./assets/jean_icon.webp" },
  { name: "Kaedehara Kazuha", path: "./assets/kaedehara_kazuha_icon.webp" },
  { name: "Kamisato Ayaka", path: "./assets/kamisato_ayaka_icon.webp" },
  { name: "Kamisato Ayato", path: "./assets/kamisato_ayato_icon.webp" },
  { name: "Keqing", path: "./assets/keqing_icon.webp" },
  { name: "Klee", path: "./assets/klee_icon.webp" },
  { name: "Lyney", path: "./assets/lyney_icon.webp" },
  { name: "Mona", path: "./assets/mona_icon.webp" },
  { name: "Nahida", path: "./assets/nahida_icon.webp" },
  { name: "Navia", path: "./assets/navia_icon.webp" },
  { name: "Neuvillette", path: "./assets/neuvillette_icon.webp" },
  { name: "Nilou", path: "./assets/nilou_icon.webp" },
  { name: "Qiqi", path: "./assets/qiqi_icon.webp" },
  { name: "Raiden Shogun", path: "./assets/raiden_shogun_icon.webp" },
  { name: "Sangonomiya Kokomi", path: "./assets/sangonomiya_kokomi_icon.webp" },
  { name: "Shenhe", path: "./assets/shenhe_icon.webp" },
  { name: "Tartaglia", path: "./assets/tartaglia_icon.webp" },
  { name: "Tighnari", path: "./assets/tighnari_icon.webp" },
  { name: "Venti", path: "./assets/venti_icon.webp" },
  { name: "Wanderer", path: "./assets/wanderer_icon.webp" },
  { name: "Wriothesley", path: "./assets/wriothesley_icon.webp" },
  { name: "Xianyun", path: "./assets/xianyun_icon.webp" },
  { name: "Xiao", path: "./assets/xiao_icon.webp" },
  { name: "Yae Miko", path: "./assets/yae_miko_icon.webp" },
  { name: "Yelan", path: "./assets/yelan_icon.webp" },
  { name: "Yoimiya", path: "./assets/yoimiya_icon.webp" },
  { name: "Zhongli", path: "./assets/zhongli_icon.webp" },
];

let sql = reactions.map((item) => "(?)").join(", ");
let params = reactions.flatMap((item) => item.reaction);
db.prepare(`INSERT INTO reactions (reaction) VALUES ${sql}`).run(params);

sql = themes.map((item) => "(?)").join(", ");
params = themes.flatMap((item) => item.theme);
db.prepare(`INSERT INTO themes (theme) VALUES ${sql}`).run(params);

sql = icons.map((item) => "(?, ?)").join(", ");
params = icons.flatMap((item) => [item.name , item.path]);
db.prepare(`INSERT INTO icons (name, path) VALUES ${sql}`).run(params);
