// Selector de idioma: alterna el botón activo al hacer clic
export function initLangSwitch() {
    const buttons = document.querySelectorAll('.lang-switch button');
    if (buttons.length === 0)
        return;
    buttons.forEach((button) => {
        button.addEventListener('click', () => {
            buttons.forEach((b) => b.classList.remove('active'));
            button.classList.add('active');
        });
    });
}
//# sourceMappingURL=langSwitch.js.map