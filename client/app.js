import * as r from "./routes.js"
import * as g from "./globals.js"
import * as ev from "./eventhandlers.js"

async function startApp(){
  const x = JSON.parse(localStorage.getItem("GuestBookUser"))  || g.getSettings()
  if (x.user_id == 0 || await r.getCurrentUser(x.user_id).then() == false) {
    await r.getNewUser().then()
  } 
  const loadingPromise = await Promise.all([r.getThemes(), r.getIcons(), r.getBaseReactions()])
  ev.setEvents()
  ev.setHeader()
  ev.getMessages()
}


startApp()




