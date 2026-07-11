const badge =
document.getElementById("riskBadge");

if(confidence>=90){

badge.innerHTML="🟢 Low Risk";

badge.classList.add("low");

}

else if(confidence>=75){

badge.innerHTML="🟠 Medium Risk";

badge.classList.add("medium");

}

else{

badge.innerHTML="🔴 High Risk";

badge.classList.add("high");

}

// =====================================
// Risk Color
// =====================================

const risk =
document.getElementById("riskText");

if(risk){

const value =
risk.innerText.toLowerCase();

if(value.includes("low")){

risk.style.color="#22c55e";

}

else if(value.includes("medium")){

risk.style.color="#f59e0b";

}

else if(value.includes("high")){

risk.style.color="#ef4444";

}
}
// ======================================
// AI Confidence Animation
// ======================================

const conf =
parseFloat(confidence);

const circle =
document.getElementById("confidenceProgress");

const bar =
document.getElementById("confidenceBar");

const circumference = 565;

const offset =
circumference -
(conf / 100) * circumference;

circle.style.strokeDashoffset =
offset;

bar.style.width =
conf + "%";

// =====================================
// Care Card Animation
// =====================================

const careCards =
document.querySelectorAll(".care-card");

careCards.forEach((card,index)=>{

card.style.opacity="0";

card.style.transform="translateY(30px)";

setTimeout(()=>{

card.style.transition=".6s";

card.style.opacity="1";

card.style.transform="translateY(0)";

},index*150);

});

// ======================================
// AI Recommendation
// ======================================

const recommendation =
document.getElementById("recommendMessage");

const disease =
document.querySelector(".prediction-card h1")
.innerText
.toLowerCase();

if(disease.includes("healthy")){

recommendation.innerHTML=

"🌿 Great news! The potato leaf appears healthy. Continue regular watering, fertilization, and weekly monitoring to maintain crop health.";

}

else if(disease.includes("early")){

recommendation.innerHTML=

"🟠 Early Blight detected. Remove infected leaves, improve air circulation, and apply the recommended fungicide as soon as possible.";

}

else{

recommendation.innerHTML=

"🔴 Late Blight detected. Immediate treatment is recommended. Isolate affected plants, apply an appropriate fungicide, and inspect nearby plants to prevent further spread.";

}