// Búsqueda: filtra las tarjetas de anime por título mientras se escribe
export function initAnimeSearch(): void {
  const input = document.querySelector<HTMLInputElement>('.search-bar input');
  const filterBtn = document.querySelector<HTMLButtonElement>('.filter-btn');
  const cards = document.querySelectorAll<HTMLElement>('.anime-card');
  if (!input || cards.length === 0) return;

  const applyFilter = () => {
    const query = input.value.trim().toLowerCase();
    cards.forEach((card) => {
      const title = card.querySelector('p')?.textContent?.toLowerCase() ?? '';
      card.classList.toggle('hidden', query.length > 0 && !title.includes(query));
    });
  };

  input.addEventListener('input', applyFilter);
  filterBtn?.addEventListener('click', applyFilter);
}
