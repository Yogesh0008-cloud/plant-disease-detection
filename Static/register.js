/*=====================================
PARTICLES BACKGROUND
======================================*/

particlesJS("particles-js",{

particles:{

number:{
value:70
},

color:{
value:"#00ff99"
},

shape:{
type:"circle"
},

opacity:{
value:0.5
},

size:{
value:3
},

line_linked:{

enable:true,

distance:150,

color:"#00ff99",

opacity:0.3,

width:1

},

move:{

enable:true,

speed:2

}

}

});

/*=====================================
SHOW / HIDE PASSWORD
======================================*/

const password =
document.getElementById("password");

const toggle =
document.getElementById("togglePassword");

toggle.addEventListener("click",()=>{

if(password.type==="password"){

password.type="text";

toggle.innerHTML="🙈";

}

else{

password.type="password";

toggle.innerHTML="👁";

}

});

/*=====================================
PASSWORD STRENGTH
======================================*/

const strengthFill =
document.getElementById("strengthFill");

const strengthText =
document.getElementById("strengthText");

password.addEventListener("input",()=>{

const value=password.value;

let strength=0;

if(value.length>=8)
strength++;

if(/[A-Z]/.test(value))
strength++;

if(/[0-9]/.test(value))
strength++;

if(/[^A-Za-z0-9]/.test(value))
strength++;

switch(strength){

case 0:

strengthFill.style.width="0%";

strengthText.innerHTML=
"Password Strength";

break;

case 1:

strengthFill.style.width="25%";

strengthFill.style.background="#ef4444";

strengthText.innerHTML=
"Weak";

break;

case 2:

strengthFill.style.width="50%";

strengthFill.style.background="#f59e0b";

strengthText.innerHTML=
"Medium";

break;

case 3:

strengthFill.style.width="75%";

strengthFill.style.background="#3b82f6";

strengthText.innerHTML=
"Strong";

break;

case 4:

strengthFill.style.width="100%";

strengthFill.style.background="#22c55e";

strengthText.innerHTML=
"Very Strong";

break;

}

});

/*=====================================
PASSWORD MATCH
======================================*/

const confirmPassword =
document.getElementById("confirmPassword");

const matchMessage =
document.getElementById("matchMessage");

confirmPassword.addEventListener("input",()=>{

if(confirmPassword.value===""){

matchMessage.innerHTML="";

matchMessage.className="match-message";

return;

}

if(password.value===confirmPassword.value){

matchMessage.innerHTML=
"✔ Passwords Match";

matchMessage.className=
"match-message match-success";

}

else{

matchMessage.innerHTML=
"✖ Passwords Do Not Match";

matchMessage.className=
"match-message match-error";

}

});

/*=====================================
REGISTER BUTTON
======================================*/

const form =
document.getElementById("registerForm");

const button =
document.getElementById("registerBtn");

form.addEventListener("submit",(e)=>{

if(password.value!==confirmPassword.value){

e.preventDefault();

matchMessage.innerHTML=
"✖ Passwords Do Not Match";

matchMessage.className=
"match-message match-error";

return;

}

button.innerHTML=
"⏳ Creating Account...";

button.disabled=true;

});

/*=====================================
FEATURE CARD ANIMATION
======================================*/

const cards =
document.querySelectorAll(".feature-card");

cards.forEach((card,index)=>{

card.style.opacity="0";

card.style.transform="translateY(40px)";

setTimeout(()=>{

card.style.transition=".6s";

card.style.opacity="1";

card.style.transform="translateY(0)";

},index*180);

});