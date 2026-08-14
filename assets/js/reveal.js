// Tarjetas y secciones aparecen suavemente al entrar en pantalla
export function initRevealAnimations() {
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
//# sourceMappingURL=reveal.js.map