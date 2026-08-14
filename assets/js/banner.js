// El banner aparece con un ligero zoom al cargar la página
export function initBannerEntrance() {
    const banner = document.querySelector('.banner');
    if (!banner)
        return;
    requestAnimationFrame(() => {
        banner.classList.add('banner-loaded');
    });
}
//# sourceMappingURL=banner.js.map