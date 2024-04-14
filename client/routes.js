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

async function getBaseReactions() {
  try {
    const response = await fetch(`${g.db}reactions`);
    if (response.status == 200) {
      const reactions = await response.json();
      const newReactions = new Map(
        reactions.map((x) => [x.reaction_id, x.code])
      );
      g.setBaseReactions(newReactions);
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
        icons.map((x) => [
          x.icon_id,
          { theme: x.theme_id, path: x.path, name: x.name },
        ])
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
    if (response.status == 200) {
      const newName = await response.json();

      g.saveSettings();
      return newName;
    }
  } catch (error) {
    console.log(error);
  }
}

async function getMessages() {
  try {
    const response = await fetch(
      `${g.db}messages/${g.getSettings().user_id}/0/10`
    );
    if (response.status == 200) {
      const messages = await response.json();
      g.setMessages(messages);
    }
  } catch (error) {
    console.log(error);
  }
}

async function getMessagesByUser(user_id) {
  try {
    const response = await fetch(`${g.db}messages/user/${user_id}`);
    if (response.status == 200) {
      const messages = await response.json();
      g.setMessages(messages);
    }
  } catch (error) {
    console.log(error);
  }
}

async function postNewMessage(msg) {
  try {
    const response = await fetch(`${g.db}messages/${g.getSettings().user_id}`, {
      method: "POST",
      body: JSON.stringify({ message: msg }),
      headers: { "Content-Type": "application/json" },
    });
    if (response.status == 200) {
      return true;
    }
  } catch (error) {
    console.log(error);
  }
}

async function delMessage(msgid) {
  try {
    const response = await fetch(`${g.db}messages/${msgid}`, {
      method: "DELETE",
    });
    if (response.status == 200) {
      return true;
    }
  } catch (error) {
    console.log(error);
  }
}

async function getMsgReactions(msgid) {
  try {
    const response = await fetch(`${g.db}reaction/${msgid}`);
    if (response.status == 200) {
      const reactions = await response.json();
      return reactions;
    }
  } catch (error) {
    console.log(error);
  }
}

async function changeMsgReactions(msgid, reactionid) {
  try {
    const response = await fetch(
      `${g.db}reaction/${msgid}/${g.getSettings().user_id}/${reactionid}`,
      { method: "PUT" }
    );
    if (response.status == 200) {
      await response.json().then((reactions) => {
        g.updateReaction(msgid, reactions);
      });

      return true;
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
  getMessages,
  getMessagesByUser,
  postNewMessage,
  delMessage,
  getMsgReactions,
  getBaseReactions,
  changeMsgReactions,
};
