// El banner aparece con un ligero zoom al cargar la página
export function initBannerEntrance(): void {
  const banner = document.querySelector<HTMLElement>('.banner');
  if (!banner) return;

  requestAnimationFrame(() => {
    banner.classList.add('banner-loaded');
  });
}
