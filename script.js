const slider = document.querySelector(".slider");
const slides = document.querySelectorAll(".slide");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");
const fullscreenContainer = document.getElementById("fullscreenContainer");
const fullscreenImage = document.getElementById("fullscreenImage");
const closeFullscreenBtn = document.getElementById("closeFullscreen");
const fullscreenBtns = document.querySelectorAll(".fullscreen-btn");
const modeToggle = document.getElementById("modeToggle");
const musicToggle = document.getElementById("musicToggle");
const backgroundMusic = document.getElementById("backgroundMusic");
let index = 1;
const totalSlides = slides.length;
const transitionTime = 500;

// Mueve el carrusel a la imagen indicada por el indice.
function moveSlide(newIndex) {
    slider.style.transition = "transform 0.5s ease-in-out";
    slider.style.transform = `translateX(-${newIndex * 100}%)`;
    index = newIndex;

    setTimeout(() => {
        if (index === 0) { 
            slider.style.transition = "none";
            index = totalSlides - 2;
            slider.style.transform = `translateX(-${index * 100}%)`;
        } 
        else if (index === totalSlides - 1) { 
            slider.style.transition = "none";
            index = 1;
            slider.style.transform = `translateX(-${index * 100}%)`;
        }
    }, transitionTime);
}
// Avanza automaticamente el carrusel a la siguiente imagen.
function autoSlide() {
    moveSlide(index + 1);
}

let interval = setInterval(autoSlide, 3000);

prevBtn.addEventListener("click", () => {
    moveSlide(index - 1);
    resetInterval();
});

nextBtn.addEventListener("click", () => {
    moveSlide(index + 1);
    resetInterval();
});

function resetInterval() {
    clearInterval(interval);
    interval = setInterval(autoSlide, 3000);
}

slider.style.transform = `translateX(-${index * 100}%)`;

fullscreenBtns.forEach((btn, i) => {
    btn.addEventListener("click", () => {
        fullscreenImage.src = slides[i].querySelector("img").src;
        fullscreenContainer.classList.add("active");
    });
});

closeFullscreenBtn.addEventListener("click", () => {
    fullscreenContainer.classList.remove("active");
});

// Cambiar entre el modo oscuro y claro
modeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    const isDarkMode = document.body.classList.contains("dark-mode");
    modeToggle.textContent = isDarkMode ? "☀️" : "🌙"; // Cambia el ícono
});



// Reproducir música al cargar la página
window.onload = () => {
    backgroundMusic.play();  
};

// Configuración de Spotify
window.onSpotifyIframeApiReady = (IFrameAPI) => {
    const element = document.getElementById('spotifyPlayer');
    const options = {
        uri: 'spotify:artist:1McMsnEElThX1knmY4oliG',
        width: '300',
        height: '380',
        view: 'list',
        theme: 'dark'
    };
    const player = new IFrameAPI.Player(element, options);
    player.connect();
};
