// Búsqueda: filtra las tarjetas de anime por título mientras se escribe
export function initAnimeSearch() {
    const input = document.querySelector('.search-bar input');
    const filterBtn = document.querySelector('.filter-btn');
    const cards = document.querySelectorAll('.anime-card');
    if (!input || cards.length === 0)
        return;
    const applyFilter = () => {
        const query = input.value.trim().toLowerCase();
        cards.forEach((card) => {
            var _a, _b, _c;
            const title = (_c = (_b = (_a = card.querySelector('p')) === null || _a === void 0 ? void 0 : _a.textContent) === null || _b === void 0 ? void 0 : _b.toLowerCase()) !== null && _c !== void 0 ? _c : '';
            card.classList.toggle('hidden', query.length > 0 && !title.includes(query));
        });
    };
    input.addEventListener('input', applyFilter);
    filterBtn === null || filterBtn === void 0 ? void 0 : filterBtn.addEventListener('click', applyFilter);
}
//# sourceMappingURL=search.js.map