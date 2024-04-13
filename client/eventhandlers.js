import * as r from "./routes.js";
import * as g from "./globals.js";

const g_ElePanel = document.querySelector(".element-panel");
const g_IconPanel = document.querySelector(".icon-panel");
const g_NameForm = document.querySelector(".change-name");

function clearActiveElement() {
  document.querySelector(".element-select.active").classList.toggle("active");
}

function e_RandomName() {
  document.querySelector(".random-name").addEventListener("click", async (e) => {
    g_NameForm.username.placeholder = await r.getNewName().then();
  });
}

function e_CancelUser() {
  document.querySelector(".cancel-user").addEventListener("click", (e) => {
    g.setAll(JSON.parse(localStorage.getItem("GuestBookUser")));
    clearActiveElement();
    g_NameForm.username.placeholder = g.getSettings().username;
    selectCurrentIcon();
  });
}

 function e_ChangeUser() {
  g_NameForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    g.setUserName(g_NameForm.username.placeholder)
    await r.changeUser().then()
    selectCurrentIcon()
  });
}

function e_ElementIcons() {
  g.getThemes().forEach((x, i) => {
    const element = document.createElement("div");
    element.style.backgroundImage = `url('${x.path}')`;
    element.style.setProperty("--bgcolour", x.colour);
    element.classList.add("element-select");
    element.addEventListener("click", (e) => {
      document
        .querySelector(".element-select.active")
        .classList.toggle("active");
      e.target.classList.toggle("active");
      showIcons(i);
    });
    g_ElePanel.appendChild(element);
  });
}

function selectCurrentIcon() {
  const index = g.getIcons().get(g.getSettings().icon_id).theme - 1;
  g_ElePanel.children[index].classList.add("active");
  showIcons(index+1)
}

function showIcons(element) {
  g_IconPanel.innerHTML = "";
  g.getIcons().forEach((x, i) => {
    if (x.theme == element) {
      const iconselector = document.createElement("div");
      const icon = document.createElement("img");
      icon.classList.add("icon-select");
      icon.src = x.path;
      iconselector.appendChild(icon);
      if (g.getSettings().icon_id == i) iconselector.classList.add("active");
      iconselector.style.setProperty(
        "--bgcolour",
        g.getThemes().get(element).colour
      );
      iconselector.addEventListener("click", (e) => {
        g.setUserIcon(i);
        const isActiveEle = document.querySelector(".icon-container.active");
        if (isActiveEle != null) isActiveEle.classList.toggle("active");
        e.target.parentNode.classList.toggle("active");
      });
      iconselector.classList.add("icon-container");
      g_IconPanel.appendChild(iconselector);
    }
  });
}

function setEvents() {
  e_CancelUser();
  e_ChangeUser();
  e_ElementIcons();
  e_RandomName();
  selectCurrentIcon();
  g_NameForm.username.placeholder = g.getSettings().username;
}

export { setEvents };
