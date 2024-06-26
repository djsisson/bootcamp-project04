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
      e.stopPropagation();
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
      icon.alt = x.name;
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
  icon.alt = g.getIcons().get(g.getSettings().icon_id).name;
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
  await r.getMessages().then(()=>  {
    displayMessages();
    getReactions();
  });
  
  
}

async function getReactions() {
  let newReactions = new Map();
  g.setReactions(newReactions)
  g.getMessages().forEach (async (msg) => {
    await r.getMsgReactions(msg.msg_id).then((result) => {
      g.updateReaction(msg.msg_id,result)
      setReactionsForElement(document.querySelector(`.message-reactions-${msg.msg_id}`),msg.msg_id)
    })
  })
}

function createMessage(x) {
  //message container
  const element = document.createElement("div");
  element.classList.add("message-container");
  element.style.setProperty("--bgcolour", g.getColourFromId(x.icon_id));

  //user profile
  const msgUserProfile = document.createElement("div");
  msgUserProfile.classList.add("user-profile");

  //icon container
  const msgIconContainer = document.createElement("div");
  msgIconContainer.classList.add("icon-container");
  msgIconContainer.classList.add("msg-icon");
  msgIconContainer.title = `Click to Filter Messages by ${x.username}`;
  msgIconContainer.style.setProperty(
    "--bgcolour",
    g.getColourFromId(x.icon_id)
  );
  msgIconContainer.addEventListener("click", async (e) => {
    e.stopPropagation(e);
    document.querySelector(".clear-filter").style.display = "block";
    await r.getMessagesByUser(x.user_id).then(() => {
      displayMessages();
      getReactions();
    });
    
    
  });

  //icon
  const msgIcon = document.createElement("img");
  msgIcon.classList.add("icon-select");
  msgIcon.src = g.getIcons().get(x.icon_id).path;
  msgIcon.alt = g.getIcons().get(x.icon_id).name;

  //username
  const msgUserName = document.createElement("span");
  msgUserName.classList.add("msg-UserName");
  msgUserName.textContent = x.username;

  //message content wrapper
  const newMessageWrapper = document.createElement("div");
  newMessageWrapper.classList.add("message-content-wrapper");

  //message content
  const newMessage = document.createElement("div");
  newMessage.classList.add("message-content");
  newMessage.textContent = x.message;

  //message reactions

  const newReactions = document.createElement("div");
  newReactions.classList.add("message-reactions");
  newReactions.classList.add(`message-reactions-${x.msg_id}`);
  // setReactionsForElement(newReactions, x.msg_id);

  //delete button if owner of message
  if (g.getSettings().user_id == x.user_id) {
    const delButton = document.createElement("button");
    delButton.textContent = "\u{1F5D1}";
    delButton.classList.add("delete-message");
    delButton.addEventListener("click", async (e) => {
      e.stopPropagation();
      if ((await r.delMessage(x.msg_id)) == true) {
        getMessages();
      }
    });
    element.appendChild(delButton);
  }

  //append all
  msgIconContainer.appendChild(msgIcon);
  msgUserProfile.appendChild(msgIconContainer);
  element.appendChild(msgUserProfile);
  msgUserProfile.appendChild(msgUserName);
  newMessageWrapper.appendChild(newMessage);
  newMessageWrapper.appendChild(newReactions);
  element.appendChild(newMessageWrapper);

  return element;
}

function setReactionsForElement(element, msg_id) {
  element.innerHTML = "";
  g.getBaseReactions().forEach((r, i) => {
    const newRadio = document.createElement("input");
    newRadio.type = "radio";
    newRadio.name = `${msg_id}-reaction`;
    newRadio.id = `${msg_id}-reaction-${r}`;
    newRadio.classList.add("msg-radio");
    const newLabel = document.createElement("label");
    newLabel.htmlFor = `${msg_id}-reaction-${r}`;
    const charCode = parseInt(r, 16);
    newLabel.textContent = `${String.fromCodePoint(charCode)}`;
    const newCount = document.createElement("span");
    const found = g
      .getReactions()
      .get(msg_id)
      .findIndex((j) => j.code == r);
    if (found != -1) {
      newCount.textContent = g.getReactions().get(msg_id)[found].count;
    }
    newCount.classList.add(`msg${msg_id}-${charCode}`);
    const radioGap = document.createElement("span");
    newRadio.reactionId = i;
    newRadio.addEventListener("change", async (e) => {
      await changeMsgReactions(element, msg_id, e.target.reactionId);
    });
    element.appendChild(newRadio);
    element.appendChild(newLabel);
    element.appendChild(newCount);
    element.appendChild(radioGap);

    return element;
  });
}

async function changeMsgReactions(element, msgid, reactionId) {
  await r.changeMsgReactions(msgid, reactionId).then((x) => {
    if (x) {
      setReactionsForElement(element, msgid);
    }
  });
}

function displayMessages() {
  g_messagePanel.innerHTML = "";
  g.getMessages().forEach((x, i) => {
    g_messagePanel.appendChild(createMessage(x));
  });
}

function e_focusPost() {
  const formPostElement = document.querySelector(".post-input");
  formPostElement.CurrentlyPosting = false;
  formPostElement.addEventListener("focusin", (e) => {
    document.querySelector(".post-buttons").style.display = "flex";
    if (e.target.CurrentlyPosting == false) {
      e.target.textContent = "";
    } else {
      const range = document.createRange();
      range.selectNodeContents(e.target);
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
    }
  });
  formPostElement.addEventListener("keydown", (e) => {
    if (e.target.textContent.length > 100) {
      e.preventDefault();
    }
  });
  formPostElement.addEventListener("input", (e) => {
    formPostElement.CurrentlyPosting = true;
  });
}

function e_cancelPost() {
  document.querySelector(".cancel-post").addEventListener("click", (e) => {
    e.stopPropagation();
    const formPostElement = document.querySelector(".post-input");
    console.log("kkkk");
    formPostElement.textContent = "Post a comment...";
    formPostElement.CurrentlyPosting = false;
    document.querySelector(".post-buttons").style.display = "none";
  });
}

async function e_postComment() {
  document.querySelector(".form-post").addEventListener("submit", async (e) => {
    e.stopPropagation();
    e.preventDefault();
    const formPostElement = document.querySelector(".post-input");
    if (await r.postNewMessage(formPostElement.textContent).then()) {
      formPostElement.textContent = "Post a comment...";
      formPostElement.CurrentlyPosting = false;
      document.querySelector(".post-buttons").style.display = "none";
      getMessages();
    }
  });
}

function setEvents() {
  e_CancelUser();
  e_ChangeUser();
  e_ElementIcons();
  e_RandomName();
  e_BodyClick();
  e_ClearFilter();
  e_focusPost();
  e_cancelPost();
  e_postComment();
  selectCurrentIcon();
  g_NameForm.username.placeholder = g.getSettings().username;
}

export { setEvents, setHeader, getMessages };
