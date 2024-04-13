const db = import.meta.env.VITE_DATABASE_URL;
let themes = [];
let icons = [];
let settings = {user_id: 0};

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

function setUserName(name){
settings.username = name
}

function setUserIcon(icon){
    settings.icon_id = icon
}

function setUserId(id){
    settings.user_id = id
}

function setAll(newSettings){
 settings = newSettings
 saveSettings()
}


function saveSettings() {
  localStorage.setItem("GuestBookUser", JSON.stringify(settings));
}

export { db, getThemes, setThemes, getIcons, setIcons, getSettings, saveSettings, setUserName, setUserIcon , setUserId, setAll};
