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

  next.addEventListener("click", goNext);
  prev.addEventListener("click", goPrev);

  // 👉 activar carrusel al hacer click o touch
  carousel.addEventListener("click", () => {
    activeCarousel = { goNext, goPrev };
  });
});

// 🎹 TECLADO
document.addEventListener("keydown", (e) => {
  if (!activeCarousel) return;

  if (e.key === "ArrowRight") {
    activeCarousel.goNext();
  }

  if (e.key === "ArrowLeft") {
    activeCarousel.goPrev();
  }
});
