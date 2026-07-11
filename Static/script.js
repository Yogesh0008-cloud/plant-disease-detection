// Particles

particlesJS("particles-js", {
  particles: {
    number: {
      value: 80
    },
    color: {
      value: "#00ff99"
    },
    shape: {
      type: "circle"
    },
    opacity: {
      value: 0.5
    },
    size: {
      value: 3
    },
    line_linked: {
      enable: true,
      distance: 150,
      color: "#00ff99",
      opacity: 0.4,
      width: 1
    },
    move: {
      enable: true,
      speed: 3
    }
  }
});


// Drag & Drop

const dropZone = document.getElementById("dropZone");
const input = document.getElementById("leafInput");
const preview = document.getElementById("previewImage");
const text = document.getElementById("dropText");

if (dropZone) {

    dropZone.onclick = () => input.click();

    input.onchange = () => {
        showPreview(input.files[0]);
    };

    dropZone.addEventListener("dragover", e => {
        e.preventDefault();
        dropZone.classList.add("active");
    });

    dropZone.addEventListener("dragleave", () => {
        dropZone.classList.remove("active");
    });

    dropZone.addEventListener("drop", e => {

        e.preventDefault();

        dropZone.classList.remove("active");

        const file = e.dataTransfer.files[0];

        input.files = e.dataTransfer.files;

        showPreview(file);

    });

}

function showPreview(file){

    if(!file) return;

    const reader = new FileReader();

    reader.onload = function(e){

        preview.src = e.target.result;

        preview.style.display = "block";

        text.style.display = "none";

    }

    reader.readAsDataURL(file);

}



// Scroll Animation

const cards = document.querySelectorAll(".feature-card,.step-card");

const observer = new IntersectionObserver(entries=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            entry.target.style.opacity="1";

            entry.target.style.transform="translateY(0px)";

        }

    });

});

cards.forEach(card=>{

    card.style.opacity="0";

    card.style.transform="translateY(40px)";

    card.style.transition=".7s";

    observer.observe(card);

});