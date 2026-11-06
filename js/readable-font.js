/* Bleak Forest Engine – Easy-read font switch
   Add to the <head> of every page:   <script src="js/readable-font.js"></script>

   Adds a small "Aa" button in the bottom-right corner. Pressing it swaps every font on the
   page (including the blackletter and Sovereign headings) for an easy-to-read font.
   Font sizes, colours and layout are left exactly as the site stylesheet sets them.
   The choice is remembered in the visitor's browser, so it carries across every page. */

(function () {
    'use strict';

    // ---- Settings you can change ----
    // Atkinson Hyperlegible was designed by the Braille Institute for low-vision readers.
    // To use a different font, change both lines (or set FONT_URL to '' for a font already on the device).
    const FONT_URL = 'https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible:ital,wght@0,400;0,700;1,400;1,700&display=swap';
    const FONT_STACK = "'Atkinson Hyperlegible', Verdana, 'Segoe UI', Arial, sans-serif";
    const LABEL_ON = 'Use the original fonts';
    const LABEL_OFF = 'Use an easy-to-read font';
    const STORE_KEY = 'bf-readable-font';
    const CLASS = 'bf-readable';

    const root = document.documentElement;
    const read = () => { try { return localStorage.getItem(STORE_KEY) === 'on'; } catch (e) { return false; } };
    const write = on => { try { localStorage.setItem(STORE_KEY, on ? 'on' : 'off'); } catch (e) { /* storage blocked */ } };

    // Only the font family changes. !important lets it win over the site's heading and body fonts.
    const style = document.createElement('style');
    style.textContent =
        `html.${CLASS}, html.${CLASS} body, html.${CLASS} body *, html.${CLASS} body *::before, html.${CLASS} body *::after {
            font-family: ${FONT_STACK} !important; }
        .bf-font-toggle { position: fixed; right: 16px; bottom: 16px; z-index: 9999;
            width: 48px; height: 48px; border-radius: 50%; border: 2px solid currentColor;
            font: bold 20px/1 Georgia, 'Times New Roman', serif !important; cursor: pointer;
            box-shadow: 0 2px 8px rgba(0,0,0,0.4); padding: 0; }
        .bf-font-toggle:focus-visible { outline: 3px solid currentColor; outline-offset: 3px; }
        html.${CLASS} .bf-font-toggle { font-family: ${FONT_STACK} !important; }
        @media print { .bf-font-toggle { display: none; } }`;
    document.head.appendChild(style);

    let fontLoaded = false;
    function loadFont() {
        if (fontLoaded || !FONT_URL) return;
        fontLoaded = true;
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = FONT_URL;
        document.head.appendChild(link);
    }

    function apply(on) {
        if (on) loadFont();
        root.classList.toggle(CLASS, on);
        const btn = document.querySelector('.bf-font-toggle');
        if (btn) {
            btn.setAttribute('aria-pressed', String(on));
            btn.setAttribute('aria-label', on ? LABEL_ON : LABEL_OFF);
            btn.title = on ? LABEL_ON : LABEL_OFF;
        }
    }

    // Apply straight away (this runs in <head>) so the page never flashes the other font.
    apply(read());

    function addButton() {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'bf-font-toggle';
        btn.textContent = 'Aa';
        // Match the page: use the body's own text and background colours.
        const cs = getComputedStyle(document.body);
        const bg = cs.backgroundColor;
        btn.style.color = cs.color;
        btn.style.background = (bg && bg !== 'transparent' && bg !== 'rgba(0, 0, 0, 0)') ? bg : 'rgba(20, 16, 14, 0.9)';
        btn.addEventListener('click', () => {
            const on = !root.classList.contains(CLASS);
            write(on);
            apply(on);
        });
        document.body.appendChild(btn);
        apply(root.classList.contains(CLASS));
    }
    if (document.body) addButton();
    else document.addEventListener('DOMContentLoaded', addButton);

    // Keep pages in step if the setting is changed in another tab.
    window.addEventListener('storage', e => { if (e.key === STORE_KEY) apply(e.newValue === 'on'); });
})();
