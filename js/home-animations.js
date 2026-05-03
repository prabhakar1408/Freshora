(function () {
  const slides = document.querySelectorAll('.hero-slide');
  const prefersReduced =
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (slides.length > 1 && !prefersReduced) {
    let idx = 0;
    window.setInterval(() => {
      slides[idx].classList.remove('is-active');
      idx = (idx + 1) % slides.length;
      slides[idx].classList.add('is-active');
    }, 20000);
  }

  const cards = document.querySelectorAll('.stat-card');
  if (!cards.length || prefersReduced) {
    cards.forEach((c) => c.classList.add('is-visible'));
    return;
  }

  const io = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -30px 0px' }
  );
  cards.forEach((card) => io.observe(card));
})();
