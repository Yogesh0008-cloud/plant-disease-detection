// ===============================
// Data From Flask
// ===============================

const diseaseCtx =
document.getElementById("diseaseChart");

const accuracyCtx =
document.getElementById("accuracyChart");

const performanceCtx =
document.getElementById("performanceChart");


// ===============================
// Disease Distribution
// ===============================

new Chart(diseaseCtx,{

type:"doughnut",

data:{

labels:[
"Healthy",
"Early Blight",
"Late Blight"
],

datasets:[{

data:[
dashboardData.healthy,
dashboardData.early,
dashboardData.late
],

backgroundColor:[
"#22c55e",
"#f59e0b",
"#ef4444"
],

borderWidth:0

}]

},

options:{

responsive:true,

plugins:{
legend:{
labels:{
color:"white"
}
}

}

}

});


// ===============================
// Accuracy Chart
// ===============================

new Chart(accuracyCtx,{

type:"bar",

data:{

labels:["Model"],

datasets:[{

label:"Accuracy %",

data:[95],

backgroundColor:"#00ff99"

}]

},

options:{

responsive:true,

scales:{

y:{

beginAtZero:true,

max:100,

ticks:{
color:"white"
},

grid:{
color:"#334155"
}

},

x:{

ticks:{
color:"white"
},

grid:{
display:false
}

}

},

plugins:{

legend:{
labels:{
color:"white"
}
}

}

}

});


// ===============================
// Performance
// ===============================

new Chart(performanceCtx,{

type:"line",

data:{

labels:[
"Healthy",
"Early",
"Late"
],

datasets:[{

label:"Predictions",

data:[
dashboardData.healthy,
dashboardData.early,
dashboardData.late
],

borderColor:"#00ff99",

backgroundColor:"rgba(0,255,153,.2)",

fill:true,

tension:.4

}]

},

options:{

responsive:true,

plugins:{

legend:{

labels:{
color:"white"
}

}

},

scales:{

y:{

ticks:{
color:"white"
},

grid:{
color:"#334155"
}

},

x:{

ticks:{
color:"white"
},

grid:{
display:false
}

}

}

}

});

// ===============================
// AI INSIGHTS
// ===============================

const total =
dashboardData.total;

const healthy =
dashboardData.healthy;

const early =
dashboardData.early;

const late =
dashboardData.late;


// Healthy %

const healthyRate =
Math.round((healthy/total)*100);

document.getElementById(
"healthyPercent"
).innerHTML =
healthyRate + "%";


// Most Disease

let disease =
"Healthy";

let highest =
healthy;

if(early>highest){

highest=early;

disease="Early Blight";

}

if(late>highest){

highest=late;

disease="Late Blight";

}

document.getElementById(
"topDisease"
).innerHTML=disease;


// Recommendation

let msg="";

if(disease==="Healthy"){

msg="Most plants are healthy. Continue regular monitoring.";

}

else if(disease==="Early Blight"){

msg="Early Blight cases are increasing. Apply fungicide and inspect crops.";

}

else{

msg="Late Blight is dominant. Immediate treatment is recommended to prevent spread.";

}

document.getElementById(
"recommendation"
).innerHTML=msg;

// ==========================
// Live Clock
// ==========================

function updateClock(){

const now=new Date();

document.getElementById("liveTime").innerHTML=

now.toLocaleString();

}

setInterval(updateClock,1000);

updateClock();


// ==========================
// Progress Bars
// ==========================

const totalPredictions = dashboardData.total || 1;

document.getElementById("healthyBar").style.width =

((dashboardData.healthy / totalPredictions) * 100) + "%";

document.getElementById("earlyBar").style.width =

((dashboardData.early / totalPredictions) * 100) + "%";

document.getElementById("lateBar").style.width =

((dashboardData.late / totalPredictions) * 100) + "%";


// ==========================
// Dark Mode
// ==========================

const toggle=document.getElementById("themeToggle");

toggle.onclick=function(){

document.body.classList.toggle("light-mode");

};
// ==========================
// AI Health Score
// ==========================

const diseased =
dashboardData.early +
dashboardData.late;

const healthScore =
Math.round(
(dashboardData.healthy /
dashboardData.total) * 100
);

document.getElementById(
"healthScore"
).innerHTML =
healthScore + "%";

// ==========================
// Weekly Prediction Chart
// ==========================

const weeklyCtx =
document.getElementById("weeklyChart");

if(weeklyCtx){

new Chart(weeklyCtx,{

type:"line",

data:{

labels:[

"Mon",

"Tue",

"Wed",

"Thu",

"Fri",

"Sat",

"Sun"

],

datasets:[{

label:"Predictions",

data:[

8,

12,

6,

10,

15,

9,

13

],

borderColor:"#00ff99",

backgroundColor:"rgba(0,255,153,.15)",

fill:true,

tension:.4,

pointRadius:5

}]

},

options:{

responsive:true,

plugins:{

legend:{

labels:{

color:"white"

}

}

},

scales:{

x:{

ticks:{

color:"white"

},

grid:{

color:"#334155"

}

},

y:{

beginAtZero:true,

ticks:{

color:"white"

},

grid:{

color:"#334155"

}

}

}

}

});

}

// =====================================
// Plant Health Center
// =====================================

const totalPred = dashboardData.total || 1;

const healthyPercent =
Math.round((dashboardData.healthy / totalPred) * 100);

const earlyPercent =
Math.round((dashboardData.early / totalPred) * 100);

const latePercent =
Math.round((dashboardData.late / totalPred) * 100);

document.getElementById("healthyPercentage").innerHTML =
healthyPercent + "%";

document.getElementById("earlyPercentage").innerHTML =
earlyPercent + "%";

document.getElementById("latePercentage").innerHTML =
latePercent + "%";

document.getElementById("healthyMiniBar").style.width =
healthyPercent + "%";

document.getElementById("earlyMiniBar").style.width =
earlyPercent + "%";

document.getElementById("lateMiniBar").style.width =
latePercent + "%";

let recommendation = "";

if (latePercent >= 40) {

    recommendation =
    "⚠️ Late Blight is high. Inspect infected plants immediately and apply recommended fungicide.";

} else if (earlyPercent >= 30) {

    recommendation =
    "🟠 Early Blight is increasing. Remove affected leaves and monitor crops regularly.";

} else {

    recommendation =
    "✅ Most plants are healthy. Continue routine monitoring and preventive care.";

}

document.getElementById("plantRecommendation").innerHTML =
recommendation;
// ======================================
// Circular Plant Health Gauge
// ======================================

const gaugeCircle =
document.getElementById("gaugeProgress");

const gaugeValue =
document.getElementById("gaugeValue");

const gaugeStatus =
document.getElementById("gaugeStatus");

// We use the same health score calculated earlier.
// If you don't already have it, compute it here:
const score = Math.round(
    (dashboardData.healthy / (dashboardData.total || 1)) * 100
);

const circumference = 565;

const offset =
circumference -
(score / 100) * circumference;

gaugeCircle.style.strokeDashoffset =
offset;

gaugeValue.innerHTML =
score + "%";

if(score >= 90){

    gaugeStatus.innerHTML =
    "Excellent";

}
else if(score >= 75){

    gaugeStatus.innerHTML =
    "Good";

}
else if(score >= 50){

    gaugeStatus.innerHTML =
    "Moderate";

}
else{

    gaugeStatus.innerHTML =
    "Critical";

}

// ======================================
// AI System Information
// ======================================

console.log("Dashboard 3.5 Loaded");

console.log("Model : MobileNetV2");
console.log("Framework : TensorFlow");
console.log("Database : Connected");
console.log("Status : Running");

// =====================================
// Dashboard Loaded
// =====================================

window.addEventListener("load", () => {

    console.log("Dashboard v3.6 Loaded Successfully");

});

// ===============================
// Smooth Scroll Navigation
// ===============================

document.querySelectorAll(".dashboard-menu a").forEach(link=>{

link.addEventListener("click",function(e){

e.preventDefault();

const target=document.querySelector(

this.getAttribute("href")

);

target.scrollIntoView({

behavior:"smooth"

});

});

});