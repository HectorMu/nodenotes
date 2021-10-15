import { shortPassword, samePassword } from "./passwordValidations.js";

//Add
const newpass = document.getElementById('newpass');
const confirm = document.getElementById('confirm');
const msg1 = document.getElementById('res');
const msg2 = document.getElementById('match');
const savepass = document.getElementById('savepass');

newpass.addEventListener('keyup', () => {
    shortPassword(newpass, msg1, savepass);
    samePassword(newpass, confirm, msg1, msg2, savepass);
})
confirm.addEventListener('keyup', () => {
    samePassword(newpass, confirm, msg1, msg2, savepass);
})