const db = import.meta.env.VITE_DATABASE_URL;
let g_icons = [];
let g_user = {};

const g_ElePanel = document.querySelector(".element-panel");
const g_IconPanel = document.querySelector(".icon-panel");
const g_NameForm = document.querySelector(".change-name");

document.querySelector(".random-name").addEventListener("click",(e) => {
  getRandomName();
  })
document.querySelector(".cancel-user").addEventListener("click",(e) => {
  g_user=JSON.parse(localStorage.getItem("guestbookuser"))
  document.querySelector(".element-select.active").classList.toggle("active")
    g_NameForm.username.placeholder = g_user.username;
    selectCurrentIcon();
  })
  
  async function getRandomName() {
      const response = await fetch(`${db}users/random`);
      const newUser = await response.json();
      g_NameForm.username.placeholder = newUser;
      g_user.username=newUser;
    }

async function getIcons() {
  const response = await fetch(`${db}icons`);
  g_icons = await response.json();
  // put the games onto the page
  g_icons.forEach(function (icon) {
    // DOM manipulation to put the games onto the html
    const element = document.createElement("div");
    element.style.backgroundImage = `url('${icon.path}')`;
    element.style.setProperty("--bgcolour", icon.colour);
    element.classList.add("element-select");
    element.addEventListener("click", (e) => {
      document.querySelector(".element-select.active").classList.toggle("active")
      e.target.classList.toggle("active")
      showIcons(icon.id - 1);
    });
    g_ElePanel.appendChild(element);
  });
  selectCurrentIcon()
}

function selectCurrentIcon() {
if (g_user == null) return
  g_icons.forEach((element) => {
    element.characters.forEach((character) => {
      if (character.id == g_user.icon_id){
        g_ElePanel.children[element.id-1].classList.add("active")
        showIcons(element.id-1)
      }
    })
  })

}

function showIcons(element) {
  g_IconPanel.innerHTML = "";
  g_icons[element].characters.forEach((x) => {
    const iconselector = document.createElement("div");
    const icon = document.createElement("img");
    icon.classList.add("icon-select");
    icon.src = x.path;
    iconselector.appendChild(icon);
    if (g_user.icon_id == x.id) iconselector.classList.add("active");
    iconselector.style.setProperty("--bgcolour", g_icons[element].colour);
    iconselector.addEventListener("click", (e) => {
      g_user.icon_id = x.id;
      const isActiveEle = document.querySelector(".icon-container.active")
      if(isActiveEle != null) isActiveEle.classList.toggle("active")
      e.target.parentNode.classList.toggle("active")
    })
    iconselector.classList.add("icon-container");
    g_IconPanel.appendChild(iconselector);
  });
}

getIcons();
loadUser();




function loadUser() {
  g_user = JSON.parse(localStorage.getItem("guestbookuser"))
  if (g_user == null) {
    getRandomUser();
  } else {
    g_NameForm.username.placeholder = g_user.username;
    selectCurrentIcon();
  }
  
  
}

async function getRandomUser() {
  const response = await fetch(`${db}users/new`, { method: "POST" });
  const newUser = await response.json();
  localStorage.setItem("guestbookuser", JSON.stringify(newUser));
  g_user = newUser;
  g_NameForm.username.placeholder = g_user.username;
  selectCurrentIcon()
}

g_NameForm.addEventListener("submit", (e) => {
  e.preventDefault();
  changeUser();
});

async function changeUser(){
  const response = await fetch(`${db}users/${g_user.user_id}?username=${g_NameForm.username.placeholder}&iconid=${g_user.icon_id}`, { method: "PUT" });
  const newUser = await response.json();
  localStorage.setItem("guestbookuser", JSON.stringify(g_user));
  g_NameForm.username.placeholder = g_user.username;
  selectCurrentIcon()
}