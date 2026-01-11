let activeCarousel = null;

document.querySelectorAll(".carousel").forEach(carousel => {
  const images = carousel.dataset.images.split(",");
  let index = 0;

  const img = carousel.querySelector(".carousel-image");
  const next = carousel.querySelector(".next");
  const prev = carousel.querySelector(".prev");

  img.src = images[index];

  const goNext = () => {
    index = (index + 1) % images.length;
    img.src = images[index];
  };

  const goPrev = () => {
    index = (index - 1 + images.length) % images.length;
    img.src = images[index];
  };

  // botones
  next.addEventListener("click", goNext);
  prev.addEventListener("click", goPrev);

  // activar carrusel
  carousel.addEventListener("click", () => {
    activeCarousel = { goNext, goPrev };
  });

  /* =====================
     SWIPE (TOUCH)
  ===================== */
  let startX = 0;
  let endX = 0;

  carousel.addEventListener("touchstart", e => {
    startX = e.touches[0].clientX;
  }, { passive: true });

  carousel.addEventListener("touchend", e => {
    endX = e.changedTouches[0].clientX;
    handleSwipe();
  });

  function handleSwipe() {
    const diff = startX - endX;

    // sensibilidad mínima
    if (Math.abs(diff) < 50) return;

    if (diff > 0) {
      goNext();   // swipe izquierda
    } else {
      goPrev();   // swipe derecha
    }
  }
});

/* =====================
   TECLADO
===================== */
document.addEventListener("keydown", e => {
  if (!activeCarousel) return;

  if (e.key === "ArrowRight") activeCarousel.goNext();
  if (e.key === "ArrowLeft") activeCarousel.goPrev();
});
