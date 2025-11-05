document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".carousel-wrapper").forEach(wrapper => {
    const carousel = wrapper.querySelector(".carousel-3d");
    const cards = Array.from(carousel.querySelectorAll(".card3d, .card3"));
    const total = cards.length;
    const radius = 400;
    const step = 360 / total;
    let angle = 0;

    // Posiciona os cards
    cards.forEach((card, i) => {
      const theta = step * i;
      card.style.position = "absolute";
      card.style.top = "50%";
      card.style.left = "50%";
      card.style.transformOrigin = "center center";
      card.style.transformStyle = "preserve-3d";
      card.style.transition = "transform 1s ease, opacity 0.6s ease, filter 0.6s ease";
      card.style.transform = `translate(-50%, -50%) rotateY(${theta}deg) translateZ(${radius}px)`;
      card.style.paddingBottom = "2%";
    });

    //Card em foco
    function frontIndexFromAngle(a) {
      const normalized = ((-a % 360) + 360) % 360;
      return Math.round(normalized / step) % total;
    }

    //Foco e Opacidade
    function applyFocus() {
      const front = frontIndexFromAngle(angle);

      cards.forEach((card, i) => {
        let d = Math.abs(i - front);
        d = Math.min(d, total - d);

        let opacity, blur;
        if (d === 0) {
          opacity = 1;
          blur = 0;
          card.style.zIndex = 30;
        } else if (d === 1) {
          opacity = 0.55;
          blur = 1;
          card.style.zIndex = 15;
        } else {
          opacity = 0.15;
          blur = 2;
          card.style.zIndex = 5;
        }

        card.style.opacity = opacity.toString();
        card.style.filter = blur ? `blur(${blur}px)` : "none";
      });
    }

    // Gira o carrossel
    function rotateCarousel(direction = 1) {
      angle += step * direction;
      carousel.style.transform = `translateZ(-${radius}px) rotateY(${angle}deg)`;
      applyFocus();
    }

    // Botões
    const prev = wrapper.querySelector(".button-left");
    const next = wrapper.querySelector(".button-right");
    prev?.addEventListener("click", () => rotateCarousel(-1));
    next?.addEventListener("click", () => rotateCarousel(1));

    // Inicia
    carousel.style.transformStyle = "preserve-3d";
    carousel.style.transform = `translateZ(-${radius}px) rotateY(${angle}deg)`;
    applyFocus();

    // Auto-rotação
    const timer = setInterval(() => rotateCarousel(1), 4000);
    wrapper.addEventListener("mouseenter", () => clearInterval(timer), { once: true });

    // Touch
    let startX = 0;
    let isDragging = false;

    function onDragStart(e) {
      isDragging = true;
      startX = e.touches ? e.touches[0].clientX : e.clientX;
    }

    function onDragMove(e) {
      if (!isDragging) return;
      const x = e.touches ? e.touches[0].clientX : e.clientX;
      const diff = x - startX;

      if (Math.abs(diff) < 50) {
        if (diff < 0) rotateCarousel(-1);
        else rotateCarousel(1);
        isDragging = false;
      }
    }

    function onDragEnd() {
      isDragging = false;
    }

    // Eventos de mouse e toque
    wrapper.addEventListener("mousedown", onDragStart);
    wrapper.addEventListener("mousemove", onDragMove);
    wrapper.addEventListener("mouseup", onDragEnd);
    wrapper.addEventListener("mouseleave", onDragEnd);

    wrapper.addEventListener("touchstart", onDragStart);
    wrapper.addEventListener("touchmove", onDragMove);
    wrapper.addEventListener("touchend", onDragEnd);
  });
});
