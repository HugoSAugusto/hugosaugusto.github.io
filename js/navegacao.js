const carouselLanding = document.getElementById("carousel-landing");
const nextLanding = document.getElementById("next-landing");
const prevLanding = document.getElementById("prev-landing");

const cardWidth = carouselLanding.querySelector("#box").offsetWidth + 20;

// Botões
nextLanding.addEventListener("click", () => {
  carouselLanding.scrollBy({ left: cardWidth, behavior: "smooth" });
});

prevLanding.addEventListener("click", () => {
  carouselLanding.scrollBy({ left: -cardWidth, behavior: "smooth" });
});

// Rolagem automática a cada 6s
setInterval(() => {
  carouselLanding.scrollBy({ left: cardWidth, behavior: "smooth" });
}, 6000);
