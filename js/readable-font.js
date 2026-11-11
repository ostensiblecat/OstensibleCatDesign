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
        .arcane-nav-row { display: flex; align-items: center; gap: 0.35rem; }
        nav .arcane-nav-row > a { flex: 1; min-width: 0; }
        .arcane-nav-toggle { flex: 0 0 2rem; min-height: 2rem; color: inherit; background: transparent;
            border: 1px solid currentColor; border-radius: 4px; cursor: pointer; font: inherit; line-height: 1; }
        .arcane-nav-toggle:hover, .arcane-nav-toggle:focus-visible { color: var(--highlight, #F2E9D8); }
        nav ul.arcane-nav-submenu { margin: 0.25rem 0 0.75rem 0.9rem; padding-left: 0.6rem;
            border-left: 1px solid var(--border-color, #333); }
        nav ul.arcane-nav-submenu[hidden] { display: none; }
        nav ul.arcane-nav-submenu li { margin-bottom: 0.35rem; }
        nav ul.arcane-nav-submenu a { font-size: 0.9em; }
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

    function toggle() {
        const on = !root.classList.contains(CLASS);
        write(on);
        apply(on);
    }

    // The Arcane page has long reference lists. Keep each parent link usable and
    // provide a separate, keyboard-accessible button for opening its sublist.
    function addArcaneSidebarGroups() {
        if (!/paths-arcane\.html$/i.test(window.location.pathname)) return;
        const nav = document.querySelector('nav');
        const main = document.querySelector('main');
        const list = nav && nav.querySelector('h3 + ul');
        if (!list || !main || list.dataset.arcaneGroupsReady) return;
        list.dataset.arcaneGroupsReady = 'true';

        const findLink = href => Array.from(list.querySelectorAll(':scope > li > a')).find(a => a.getAttribute('href') === href);
        const findOrAddAnchor = (scope, pattern, fallback, id) => {
            if (!scope) return fallback;
            const candidates = Array.from(scope.querySelectorAll('h2, h3, h4, h5, h6, li'));
            const target = candidates.find(node => pattern.test(node.textContent.trim().replace(/\s+/g, ' ')));
            if (!target) return fallback;
            if (!target.id) target.id = id;
            return `#${target.id}`;
        };
        const makeGroup = (href, label, items, id) => {
            const link = findLink(href);
            if (!link) return;
            const item = link.closest('li');
            const row = document.createElement('div');
            row.className = 'arcane-nav-row';
            link.textContent = label;
            row.appendChild(link);

            const submenu = document.createElement('ul');
            submenu.className = 'arcane-nav-submenu';
            submenu.id = id;
            submenu.hidden = true;
            items.forEach(({ text, href: childHref }) => {
                const child = document.createElement('li');
                const childLink = document.createElement('a');
                childLink.href = childHref;
                childLink.textContent = text;
                child.appendChild(childLink);
                submenu.appendChild(child);
            });

            const button = document.createElement('button');
            button.type = 'button';
            button.className = 'arcane-nav-toggle';
            button.textContent = '+';
            button.setAttribute('aria-label', `Expand ${label}`);
            button.setAttribute('aria-expanded', 'false');
            button.setAttribute('aria-controls', id);
            button.addEventListener('click', () => {
                const open = button.getAttribute('aria-expanded') !== 'true';
                button.setAttribute('aria-expanded', String(open));
                button.setAttribute('aria-label', `${open ? 'Collapse' : 'Expand'} ${label}`);
                button.textContent = open ? '−' : '+';
                submenu.hidden = !open;
            });
            row.appendChild(button);
            item.replaceChildren(row, submenu);
        };

        const spellSection = main.querySelector('#spell-list') || main.querySelector('#standard-spells');
        const spellFallback = spellSection ? `#${spellSection.id}` : '#standard-spells';
        const spellItems = [
            ['Cantrips', /^(?:Cantrips?)(?:\b|\s*[:(])/i, 'arcane-spell-cantrips'],
            ['1st Order', /^(?:1st Order)(?:\b|\s*spell)/i, 'arcane-spell-order-1'],
            ['2nd Order', /^(?:2nd Order)(?:\b|\s*spell)/i, 'arcane-spell-order-2'],
            ['3rd Order', /^(?:3rd Order)(?:\b|\s*spell)/i, 'arcane-spell-order-3']
        ].map(([text, pattern, id]) => ({ text, href: findOrAddAnchor(spellSection || main, pattern, spellFallback, id) }));
        makeGroup('#spell-list', 'Spell List', spellItems, 'arcane-spell-sublist');

        const alchemyHeading = main.querySelector('#alchemy');
        const alchemyScope = alchemyHeading && alchemyHeading.parentElement;
        const orderLink = order => ({
            text: `${order} Order`,
            href: findOrAddAnchor(alchemyScope || main, new RegExp(`^${order} Order$`, 'i'), '#alchemy', `arcane-alchemy-order-${order}`)
        });
        makeGroup('#alchemy', 'Alchemical Items', [orderLink('1st'), orderLink('2nd'), orderLink('3rd')], 'arcane-alchemy-sublist');
        makeGroup('#healing-arts', 'Healing Arts', [
            { text: 'Herb Compendium', href: '#herb-compendium' }
        ], 'arcane-healing-sublist');
        makeGroup('#psionics', 'Psionics', [
            { text: 'Psionic Powers', href: '#psionic-powers' }
        ], 'arcane-psionics-sublist');

        // The existing herb and power links now live in their respective groups.
        ['#herb-compendium', '#psionic-powers'].forEach(href => {
            const oldLink = findLink(href);
            if (oldLink) oldLink.closest('li').remove();
        });
    }

    // Apply straight away (this runs in <head>) so the page never flashes the other font.
    apply(read());

    // Wait until the sidebar markup is parsed before inserting controls.
    if (document.body) {
        addButton();
        addArcaneSidebarGroups();
    } else {
        document.addEventListener('DOMContentLoaded', () => {
            addButton();
            addArcaneSidebarGroups();
        });
    }

    // Keep pages in step if the setting is changed in another tab.
    window.addEventListener('storage', e => { if (e.key === STORE_KEY) apply(e.newValue === 'on'); });
})();
