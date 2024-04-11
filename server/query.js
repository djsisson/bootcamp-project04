import * as seed from "./seed.js";
import Database from "better-sqlite3";

const db = new Database("database.db");

function getAllThemes(){
    try {
        const themes = db.prepare("SELECT * FROM themes").all();
        return themes;
    } catch (error) {
        throw error;
    }
}

function getAllIcons(){
    try {
        const icons = db.prepare("SELECT * FROM icons").all();
        return icons;
    } catch (error) {
        throw error;
    }
}

function generateNewUser(){
    try {
        const newUser = seed.newUser();
        return newUser;
    } catch (error) {
        throw error;
    }
}

function getUser(userid){
    try {
        const user = db.prepare("SELECT * FROM users WHERE user_id = (?)").all(userid);
        return user;
    } catch (error) {
        throw error;
    }
}

function deleteUser(userid){
    const user = db.prepare("DELETE FROM users WHERE user_id = (?)")
    try {
        const trans = db.transaction(()=> {
            const test = user.run(userid)
            return test
        }).apply();
        return trans
    } catch (error) {
        throw error;
    }
}

function updateUser(userid){
    const user = db.prepare("UPDATE users SET username = (@username), icon_id = (@iconid) WHERE user_id = (@userid)")
    try {
        const trans = db.transaction(()=> {
            const test = user.run(userid)
            return test
        }).apply();
        return trans;
    } catch (error) {
        throw error;
    }
}

export{getAllThemes,getAllIcons,generateNewUser,getUser, updateUser, deleteUser}