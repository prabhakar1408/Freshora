/* Swiper — used on review.html only (safe if .review-slider missing) */
if (typeof Swiper !== 'undefined' && document.querySelector('.review-slider')) {
  new Swiper('.review-slider', {
    loop: true,
    spaceBetween: 20,
    breakpoints: {
      0: { slidesPerView: 1 },
      768: { slidesPerView: 2 },
      1020: { slidesPerView: 3 },
    },
  });
}
