import * as g from "./globals.js";

async function getThemes() {
  try {
    const response = await fetch(`${g.db}themes`);
    if (response.status == 200) {
      const themes = await response.json();
      const newThemes = new Map(
        themes.map((x) => [x.theme_id, { colour: x.colour, path: x.path }])
      );
      g.setThemes(newThemes);
    }
  } catch (error) {
    console.log(error);
  }
}

async function getIcons() {
  try {
    const response = await fetch(`${g.db}icons`);
    if (response.status == 200) {
      const icons = await response.json();
      const newIcons = new Map(
        icons.map((x) => [x.icon_id, { theme: x.theme_id, path: x.path }])
      );
      g.setIcons(newIcons);
    }
  } catch (error) {
    console.log(error);
  }
}

async function getCurrentUser(userId) {
  try {
    const response = await fetch(`${g.db}users/${userId}`);
    if (response.status == 200) {
      const currentUser = await response.json();
      g.setAll(currentUser);
      return true;
    } else if (response.status == 400) {
      localStorage.removeItem("GuestBookUser");
      return false;
    }
  } catch (error) {
    console.log(error);
  }
}

async function getNewUser() {
  try {
    const response = await fetch(`${g.db}users/new`, { method: "POST" });
    if (response.status == 200) {
      const newUser = await response.json();
      g.setAll(newUser);
    }
  } catch (error) {
    console.log(error);
  }
}

async function getNewName() {
  try {
    const response = await fetch(`${g.db}users/random`);
    if (response.status == 200) {
      const newName = await response.json();
      return newName;
    }
  } catch (error) {
    console.log(error);
  }
}

async function changeUser() {
  try {
    const response = await fetch(
      `${g.db}users/${g.getSettings().user_id}?username=${
        g.getSettings().username
      }&iconid=${g.getSettings().icon_id}`,
      { method: "PUT" }
    );
    console.log(response)
    if (response.status == 200) {
      const newName = await response.json();
      
      g.saveSettings();
      return newName;
    }
  } catch (error) {
    console.log(error);
  }
}

export {
  getThemes,
  getIcons,
  getCurrentUser,
  getNewUser,
  getNewName,
  changeUser,
};