/* Bleak Forest Engine – Easy-read font switch
   Add to the <head> of every page:   <script src="js/readable-font.js"></script>

   Adds an "Easy-read font" button to the sidebar menu, just under the logo (or a round "Aa" button
   in the bottom-right corner if a page has no sidebar). Pressing it swaps every font on the
   page for an easy-to-read font, except the "Bleak Forest" title at the top (see KEEP_ORIGINAL).
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
    const PLACEMENT = 'sidebar';           // 'sidebar' or 'corner'
    const SIDEBAR_TEXT = 'Easy-read font';  // the button's visible text in the sidebar
    // Elements that always keep their original font. Default: the "Bleak Forest" title at the top of
    // each page (but not the chapter titles further down, which use .chapter-title).
    // Add more with commas, e.g. '.top-title:not(.chapter-title) .crest h1, .sidebar-copyright'
    const KEEP_ORIGINAL = '.top-title:not(.chapter-title) .crest h1';
    const STORE_KEY = 'bf-readable-font';
    const CLASS = 'bf-readable';

    const root = document.documentElement;
    const read = () => { try { return localStorage.getItem(STORE_KEY) === 'on'; } catch (e) { return false; } };
    const write = on => { try { localStorage.setItem(STORE_KEY, on ? 'on' : 'off'); } catch (e) { /* storage blocked */ } };

    // Only the font family changes. !important lets it win over the site's heading and body fonts.
    const style = document.createElement('style');
    style.textContent =
        `html.${CLASS}, html.${CLASS} body,
        html.${CLASS} body *:not(${KEEP_ORIGINAL}),
        html.${CLASS} body *:not(${KEEP_ORIGINAL})::before,
        html.${CLASS} body *:not(${KEEP_ORIGINAL})::after {
            font-family: ${FONT_STACK} !important; }
        .bf-font-toggle { position: fixed; right: 16px; bottom: 16px; z-index: 9999;
            width: 48px; height: 48px; border-radius: 50%; border: 2px solid currentColor;
            font: bold 20px/1 Georgia, 'Times New Roman', serif !important; cursor: pointer;
            box-shadow: 0 2px 8px rgba(0,0,0,0.4); padding: 0; }
        .bf-font-toggle:focus-visible, .bf-font-side:focus-visible { outline: 3px solid currentColor; outline-offset: 3px; }
        html.${CLASS} .bf-font-toggle { font-family: ${FONT_STACK} !important; }
        .bf-font-side { display: flex; align-items: center; justify-content: space-between; gap: 0.6em;
            width: 100%; box-sizing: border-box; margin: 0.8em 0; padding: 0.45em 0.8em; cursor: pointer;
            font: inherit; font-size: 1em; color: inherit; background: transparent;
            border: 1px solid currentColor; border-radius: 6px; text-align: left; }
        .bf-font-side:hover { background: rgba(127,127,127,0.15); }
        .bf-font-side .bf-font-state { font-size: 0.85em; font-weight: bold; text-transform: uppercase;
            letter-spacing: 0.06em; opacity: 0.85; }
        @media print { .bf-font-toggle, .bf-font-side { display: none; } }`;
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
        const btn = document.querySelector('.bf-font-toggle, .bf-font-side');
        if (btn) {
            btn.setAttribute('aria-pressed', String(on));
            btn.title = on ? LABEL_ON : LABEL_OFF;
            const state = btn.querySelector('.bf-font-state');
            if (state) state.textContent = on ? 'On' : 'Off';          // sidebar button: visible text + On/Off
            else btn.setAttribute('aria-label', on ? LABEL_ON : LABEL_OFF);   // corner button: "Aa" only
        }
    }

    // Apply straight away (this runs in <head>) so the page never flashes the other font.
    apply(read());

    function toggle() {
        const on = !root.classList.contains(CLASS);
        write(on);
        apply(on);
    }

    function addButton() {
        const nav = document.querySelector('nav');
        if (PLACEMENT === 'sidebar' && nav) {
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 'bf-font-side';
            btn.innerHTML = `<span>${SIDEBAR_TEXT}</span><span class="bf-font-state">Off</span>`;
            btn.addEventListener('click', toggle);
            // Just under the logo; otherwise at the top of the menu, after the close button
            const logo = nav.querySelector('.sidebar-logo');
            const close = nav.querySelector('.close-sidebar');
            if (logo) logo.insertAdjacentElement('afterend', btn);
            else if (close) close.insertAdjacentElement('afterend', btn);
            else nav.prepend(btn);
            apply(root.classList.contains(CLASS));
            return;
        }
        addCornerButton();
    }

    function addCornerButton() {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'bf-font-toggle';
        btn.textContent = 'Aa';
        // Match the page: use the body's own text and background colours.
        const cs = getComputedStyle(document.body);
        const bg = cs.backgroundColor;
        btn.style.color = cs.color;
        btn.style.background = (bg && bg !== 'transparent' && bg !== 'rgba(0, 0, 0, 0)') ? bg : 'rgba(20, 16, 14, 0.9)';
        btn.addEventListener('click', toggle);
        document.body.appendChild(btn);
        apply(root.classList.contains(CLASS));
    }
    if (document.body) addButton();
    else document.addEventListener('DOMContentLoaded', addButton);

    // Keep pages in step if the setting is changed in another tab.
    window.addEventListener('storage', e => { if (e.key === STORE_KEY) apply(e.newValue === 'on'); });
})();
