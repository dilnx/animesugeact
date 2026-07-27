// Animaciones de la interfaz de AnimeSuge

document.addEventListener('DOMContentLoaded', () => {
  initHeaderScroll();
  initRevealAnimations();
  initBannerEntrance();
});

// Header: sombra al hacer scroll
function initHeaderScroll() {
  const header = document.querySelector('header');
  if (!header) return;

  const onScroll = () => {
    header.classList.toggle('scrolled', window.scrollY > 10);
  };

  window.addEventListener('scroll', onScroll);
  onScroll();
}

// Tarjetas y secciones aparecen suavemente al entrar en pantalla
function initRevealAnimations() {
  const selectors = ['.anime-card', '.anime-filter-bar', '.section'];
  const elements = document.querySelectorAll(selectors.join(','));

  elements.forEach((el, i) => {
    el.classList.add('reveal');
    el.style.transitionDelay = `${Math.min(i % 12, 12) * 40}ms`;
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  elements.forEach((el) => observer.observe(el));
}

// El banner aparece con un ligero zoom al cargar la página
function initBannerEntrance() {
  const banner = document.querySelector('.banner');
  if (!banner) return;

  requestAnimationFrame(() => {
    banner.classList.add('banner-loaded');
  });
}
