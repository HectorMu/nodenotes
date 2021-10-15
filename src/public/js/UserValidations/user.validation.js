import { shortPassword, samePassword } from "./passwordValidations.js";

//Add
const pass = document.getElementById('pass');
const confirm = document.getElementById('confirm');
const msg1 = document.getElementById('res');
const msg2 = document.getElementById('match');
const signup = document.getElementById('signup');

pass.addEventListener('keyup', () => {
    shortPassword(pass, msg1, signup);
    samePassword(pass, confirm, msg1, msg2, signup);
})

confirm.addEventListener('keyup', () => {
    samePassword(pass, confirm, msg1, msg2, signup);
})