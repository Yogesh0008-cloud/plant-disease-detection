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
value:.5
},

size:{
value:3
},

line_linked:{

enable:true,

distance:150,

color:"#00ff99",

opacity:.3,

width:1

},

move:{

enable:true,

speed:2

}

}

});

// ==========================
// Show / Hide Password
// ==========================

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

// ===============================
// Login Loading Animation
// ===============================

const loginForm =
document.querySelector("form");

const loginButton =
document.getElementById("loginBtn");

loginForm.addEventListener("submit",function(){

loginButton.classList.add("loading");

loginButton.innerHTML=`
⏳ Signing In...
`;

});
// ===============================
// Hero Animation
// ===============================

const features =
document.querySelectorAll(".feature-card");

features.forEach((card,index)=>{

card.style.opacity="0";

card.style.transform="translateY(40px)";

setTimeout(()=>{

card.style.transition=".6s";

card.style.opacity="1";

card.style.transform="translateY(0)";

},index*180);

});
/*=====================================
FORGOT PASSWORD
======================================*/

const forgot =
document.getElementById("forgotPassword");

const modal =
document.getElementById("forgotModal");

const close =
document.getElementById("closeModal");

if(forgot){

forgot.onclick=function(e){

e.preventDefault();

modal.style.display="flex";

};

}

if(close){

close.onclick=function(){

modal.style.display="none";

};

}

window.onclick=function(e){

if(e.target===modal){

modal.style.display="none";

}

};

/*=====================================
MOUSE GLOW
======================================*/

document.addEventListener("mousemove",(e)=>{

document.body.style.background=

`radial-gradient(
250px at ${e.clientX}px ${e.clientY}px,
rgba(0,255,153,0.06),
transparent 70%
),
#0f172a`;

});