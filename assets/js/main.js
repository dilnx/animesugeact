// Punto de entrada: inicializa las animaciones de la interfaz de AnimeSuge
import { initHeaderScroll } from './header.js';
import { initRevealAnimations } from './reveal.js';
import { initBannerEntrance } from './banner.js';
import { initAnimeSearch } from './search.js';
import { initLangSwitch } from './langSwitch.js';
document.addEventListener('DOMContentLoaded', () => {
    initHeaderScroll();
    initRevealAnimations();
    initBannerEntrance();
    initAnimeSearch();
    initLangSwitch();
});
//# sourceMappingURL=main.js.map