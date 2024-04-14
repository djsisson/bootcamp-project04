const db = import.meta.env.VITE_DATABASE_URL;
let themes = [];
let icons = [];
let messages = [];
let reactions = [];
let baseReactions = [];
let settings = { user_id: 0 };

function getThemes() {
  return themes;
}

function setThemes(newThemes) {
  themes = newThemes;
}

function getIcons() {
  return icons;
}

function setIcons(newIcons) {
  icons = newIcons;
}

function getSettings() {
  return settings;
}

function setUserName(name) {
  settings.username = name;
}

function setUserIcon(icon) {
  settings.icon_id = icon;
}

function setUserId(id) {
  settings.user_id = id;
}

function setAll(newSettings) {
  settings = newSettings;
  saveSettings();
}

function saveSettings() {
  localStorage.setItem("GuestBookUser", JSON.stringify(settings));
}

function getMessages() {
  return messages;
}

function setMessages(newMessages) {
  messages = newMessages;
}

function getColourFromId(iconId) {
  return themes.get(icons.get(iconId).theme).colour;
}

function getBaseReactions() {
  return baseReactions;
}

function setBaseReactions(newReactions) {
  baseReactions = newReactions;
}

function getReactions() {
  return reactions;
}

function setReactions(newReactions) {
  reactions = newReactions;
}

function updateReaction(msgid, reaction) {
  reactions.set(msgid, reaction);
}

export {
  db,
  getThemes,
  setThemes,
  getIcons,
  setIcons,
  getSettings,
  saveSettings,
  setUserName,
  setUserIcon,
  setUserId,
  setAll,
  getMessages,
  setMessages,
  getColourFromId,
  getReactions,
  setReactions,
  getBaseReactions,
  setBaseReactions,
  updateReaction,
};
