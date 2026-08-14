// Header: sombra al hacer scroll
export function initHeaderScroll(): void {
  const header = document.querySelector<HTMLElement>('header');
  if (!header) return;

  const onScroll = () => {
    header.classList.toggle('scrolled', window.scrollY > 10);
  };

  window.addEventListener('scroll', onScroll);
  onScroll();
}
