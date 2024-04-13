import * as r from "./routes.js";
import * as g from "./globals.js";

const g_ElePanel = document.querySelector(".element-panel");
const g_IconPanel = document.querySelector(".icon-panel");
const g_NameForm = document.querySelector(".change-name");
const g_messagePanel = document.querySelector(".message-wrapper");

function clearActiveElement() {
  document.querySelector(".element-select.active").classList.toggle("active");
}

function UserSelect(opacity, status) {
  const userPanel = document.querySelector(".name-wrapper");
  userPanel.style.display = status;
  userPanel.style.opacity = opacity;
}

function e_ClearFilter() {
  document
    .querySelector(".clear-current-filter")
    .addEventListener("click", (e) => {
      e.stopPropagation();
      document.querySelector(".clear-filter").style.display = "none";
      getMessages();
    });
}

function e_RandomName() {
  document
    .querySelector(".random-name")
    .addEventListener("click", async (e) => {
      g_NameForm.username.placeholder = await r.getNewName().then();
    });
}

function e_CancelUser() {
  document.querySelector(".cancel-user").addEventListener("click", (e) => {
    e.stopPropagation();
    g.setAll(JSON.parse(localStorage.getItem("GuestBookUser")));
    clearActiveElement();
    g_NameForm.username.placeholder = g.getSettings().username;
    selectCurrentIcon();
    setHeader();
    UserSelect(0, "none");
  });
}

function e_BodyClick() {
  document.body.addEventListener("click", (e) => {
    UserSelect(0, "none");
  });
}

function e_ChangeUser() {
  g_NameForm.addEventListener("submit", async (e) => {
    e.stopPropagation();
    e.preventDefault();
    g.setUserName(g_NameForm.username.placeholder);
    await r.changeUser().then();
    selectCurrentIcon();
    setHeader();
    UserSelect(0, "none");
    document.querySelector(".clear-filter").style.display = "none";
    getMessages();
  });
}

function e_ElementIcons() {
  g.getThemes().forEach((x, i) => {
    const element = document.createElement("div");
    element.style.backgroundImage = `url('${x.path}')`;
    element.style.setProperty("--bgcolour", x.colour);
    element.classList.add("element-select");
    element.addEventListener("click", (e) => {
      e.stopPropagation();
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
  showIcons(index + 1);
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
        e.stopPropagation();
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

function setHeader() {
  document.querySelector(".welcome-user").textContent = `Welcome ${
    g.getSettings().username
  }`;
  const welcomeIcon = document.querySelector(".header-icon");
  welcomeIcon.innerHTML = "";
  const icon = document.createElement("img");
  icon.classList.add("icon-select");
  icon.src = g.getIcons().get(g.getSettings().icon_id).path;
  welcomeIcon.style.setProperty(
    "--bgcolour",
    g.getColourFromId(g.getSettings().icon_id)
  );
  icon.addEventListener("click", (e) => {
    e.stopPropagation();
    UserSelect(1, "flex");
  });
  welcomeIcon.appendChild(icon);
}

async function getMessages() {
  await r.getMessages().then();
  displayMessages();
}

function displayMessages() {
  g_messagePanel.innerHTML = "";
  g.getMessages().forEach((x) => {
    const element = document.createElement("div");
    element.classList.add("message-container");
    element.style.setProperty("--bgcolour", g.getColourFromId(x.icon_id));
    const msgUserProfile = document.createElement("div");
    msgUserProfile.classList.add("user-profile");
    const msgIconContainer = document.createElement("div");
    msgIconContainer.classList.add("icon-container");
    msgIconContainer.classList.add("msg-icon");
    msgIconContainer.title = `Click to Filter Messages by ${x.username}`
    msgIconContainer.style.setProperty(
      "--bgcolour",
      g.getColourFromId(x.icon_id)
    );
    msgIconContainer.addEventListener("click", async (e) => {
      e.stopPropagation(e);
      await r.getMessagesByUser(x.user_id).then();
      document.querySelector(".clear-filter").style.display = "block";
      displayMessages();
    });
    const msgIcon = document.createElement("img");
    msgIcon.classList.add("icon-select");
    msgIcon.src = g.getIcons().get(x.icon_id).path;
    msgIconContainer.appendChild(msgIcon);
    msgUserProfile.appendChild(msgIconContainer);
    element.appendChild(msgUserProfile);
    const msgUserName = document.createElement("span");
    msgUserName.classList.add("msg-UserName");
    msgUserName.textContent = x.username;
    msgUserProfile.appendChild(msgUserName);
    const newMessage = document.createElement("div");
    newMessage.classList.add("message-content");
    newMessage.textContent = x.message;
    element.appendChild(newMessage);
    g_messagePanel.appendChild(element);
  });
}

function setEvents() {
  e_CancelUser();
  e_ChangeUser();
  e_ElementIcons();
  e_RandomName();
  e_BodyClick();
  e_ClearFilter();
  selectCurrentIcon();
  g_NameForm.username.placeholder = g.getSettings().username;
}

export { setEvents, setHeader, getMessages };
