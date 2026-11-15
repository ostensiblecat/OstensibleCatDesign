/* Bleak Forest Engine – Site Search
   Adds a search box to the top of the sidebar and searches every page linked from the sidebar.

   Install: add this line to the <head> of each page (next to readable-font.js):
       <script src="js/site-search.js" defer></script>

   How it works: the first time someone searches, the script fetches each page listed in the
   sidebar, splits it into sections at every heading, and keeps that index for the browser
   session. Results link straight to the section (page.html#id). No server or service is needed.
   New pages are picked up automatically as soon as they are added to the sidebar.

   Keyboard: press "/" anywhere to jump to the search box; Esc closes the results;
   arrow keys move through the results and Enter opens one. */
(function () {
    'use strict';

    const INDEX_VERSION = 'bf-search-v3';           // change this to force every browser to rebuild its index
    const MAX_RESULTS = 60;
    const SKIP_PAGES = /^(index\.html|.*\.pdf)$/i;   // the main site page and the licence PDF are not rules
    const SKIP_SELECTOR = 'nav, script, style, noscript, .reference-index, .back-to-index, button, select, input, textarea, svg';

    // ---------- styles (kept here so installing needs only the one script line) ----------
    const css = `
    .site-search { margin: 0 0 1.5rem; }
    .site-search label { display: block; font-size: 0.85rem; letter-spacing: 0.1rem; text-transform: uppercase;
        color: var(--accent-color, #8A0A0A); margin-bottom: 0.4rem; }
    .site-search input { width: 100%; padding: 0.45rem 0.6rem; font: inherit; font-size: 0.95rem;
        color: var(--text-color, #E6E6E6); background: rgba(255,255,255,0.05);
        border: 1px solid var(--accent-color, #8A0A0A); border-radius: 4px; }
    .site-search input::placeholder { color: rgba(230,230,230,0.5); }
    .site-search input:focus { outline: 2px solid var(--highlight, #F2E9D8); outline-offset: 1px; }
    .search-panel { position: fixed; inset: 0; z-index: 3000; display: none; background: rgba(0,0,0,0.65); }
    .search-panel.open { display: block; }
    .search-dialog { position: absolute; left: 50%; top: 5vh; transform: translateX(-50%); width: min(820px, 94vw);
        max-height: 88vh; display: flex; flex-direction: column; background: var(--nav-bg, #0A0A0C);
        color: var(--text-color, #E6E6E6); border: 3px double var(--accent-color, #8A0A0A); border-radius: 6px;
        box-shadow: 0 0 24px rgba(138,10,10,0.45); }
    .search-head { display: flex; gap: 0.6rem; align-items: center; padding: 1rem 1.2rem;
        border-bottom: 1px solid rgba(138,10,10,0.5); }
    .search-head input { flex: 1; padding: 0.55rem 0.7rem; font: inherit; font-size: 1.1rem; color: inherit;
        background: rgba(255,255,255,0.05); border: 1px solid var(--accent-color, #8A0A0A); border-radius: 4px; }
    .search-head button { font: inherit; font-size: 1.6rem; line-height: 1; background: none; border: none;
        color: var(--highlight, #F2E9D8); cursor: pointer; padding: 0 0.3rem; }
    .search-status { padding: 0.5rem 1.2rem; font-size: 0.9rem; opacity: 0.8; }
    .search-results { list-style: none; margin: 0; padding: 0 0.6rem 1rem; overflow-y: auto; }
    .search-results li { margin: 0; padding: 0; }
    .search-results li::before { content: none !important; }
    .search-results a { display: block; padding: 0.6rem 0.7rem; border-radius: 4px; color: inherit;
        text-decoration: none; border-left: 3px solid transparent; }
    .search-results a:hover, .search-results a:focus, .search-results a.active {
        background: rgba(138,10,10,0.18); border-left-color: var(--accent-color, #8A0A0A); outline: none; }
    .search-results .r-title { color: var(--accent-color, #8A0A0A); font-size: 1.1rem; filter: brightness(1.35); }
    .search-results .r-page { font-size: 0.8rem; letter-spacing: 0.05rem; text-transform: uppercase; opacity: 0.7; }
    .search-results .r-snip { font-family: var(--font-sans, system-ui, sans-serif); font-size: 0.88rem;
        line-height: 1.45; opacity: 0.9; margin-top: 0.2rem; }
    .search-results mark { background: rgba(138,10,10,0.55); color: var(--highlight, #F2E9D8); padding: 0 0.1em;
        border-radius: 2px; }
    @media (max-width: 600px) { .search-dialog { top: 0; width: 100vw; max-height: 100vh; height: 100vh; border-radius: 0; } }
    `;
    const style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);

    // ---------- helpers ----------
    const esc = s => s.replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
    const norm = s => s.toLowerCase().normalize('NFKD').replace(/[̀-ͯ]/g, '').replace(/[’‘]/g, "'");
    const clean = s => s.replace(/\s+/g, ' ').trim();
    const here = (location.pathname.split('/').pop() || 'index.html');

    // Page names as the sidebar shows them (e.g. "Skills & Focus"), used to label results
    const PAGE_NAMES = {};
    document.querySelectorAll('nav a[href]').forEach(a => {
        const f = decodeURIComponent(a.getAttribute('href') || '');
        if (/\.html$/i.test(f) && !PAGE_NAMES[f]) PAGE_NAMES[f] = clean(a.textContent);
    });

    function pageList() {
        const seen = new Set(), list = [];
        const add = href => {
            if (!href) return;
            const file = decodeURIComponent(href.split('#')[0].split('?')[0]);
            if (!file || /^[a-z]+:/i.test(file) || !/\.html$/i.test(file) || SKIP_PAGES.test(file) || seen.has(file)) return;
            seen.add(file); list.push(file);
        };
        document.querySelectorAll('nav a[href]').forEach(a => add(a.getAttribute('href')));
        add(here);
        return list;
    }

    // Split one page into searchable sections, one per heading
    function indexPage(file, html) {
        const doc = new DOMParser().parseFromString(html, 'text/html');
        const main = doc.querySelector('main') || doc.body;
        const pageTitle = PAGE_NAMES[file] || clean((doc.title || file).replace(/^Bleak Forest( Engine)?\s*[:\-–]?\s*/i, '')) || file;
        main.querySelectorAll(SKIP_SELECTOR).forEach(n => n.remove());
        // The page's title crest is not a section
        const crest = main.querySelector(':scope > .top-title:not(.chapter-title), :scope > section > .top-title:not(.chapter-title)');
        if (crest) crest.remove();

        const sections = [];
        let cur = { file, page: pageTitle, id: '', title: pageTitle, text: '' };
        const push = () => { if (clean(cur.text) || cur.title !== pageTitle) sections.push(cur); };
        const anchorFor = h => {
            if (h.id) return h.id;
            const holder = h.closest('[id]');
            return holder && holder !== main ? holder.id : (cur.id || '');
        };
        const walker = doc.createTreeWalker(main, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT);
        let node;
        while ((node = walker.nextNode())) {
            if (node.nodeType === 1) {
                if (/^H[1-6]$/.test(node.tagName)) {
                    const title = clean(node.textContent);
                    if (!title) continue;
                    push();
                    cur = { file, page: pageTitle, id: anchorFor(node), title, text: '' };
                    // skip the heading's own text nodes
                    let last = node; while (last.lastChild) last = last.lastChild;
                    walker.currentNode = last;
                }
            } else {
                cur.text += ' ' + node.nodeValue;
            }
        }
        push();
        // text nodes are joined with spaces, so tidy the gaps left before punctuation
        const tidy = t => clean(t).replace(/\s+([,.;:!?)\]’])/g, '$1').replace(/([(\[‘])\s+/g, '$1');
        return sections.map(s => { const text = tidy(s.text); return { ...s, text, nt: norm(s.title), nx: norm(text) }; });
    }

    let indexPromise = null;
    function getIndex(onProgress) {
        if (indexPromise) return indexPromise;
        indexPromise = (async () => {
            const pages = pageList();
            const key = INDEX_VERSION + ':' + pages.join('|');
            try {
                const cached = sessionStorage.getItem(key);
                if (cached) return JSON.parse(cached);
            } catch (e) { /* storage unavailable: just rebuild */ }
            let done = 0;
            const parts = await Promise.all(pages.map(async f => {
                try {
                    const r = await fetch(f);
                    const out = r.ok ? indexPage(f, await r.text()) : [];
                    onProgress && onProgress(++done, pages.length);
                    return out;
                } catch (e) { onProgress && onProgress(++done, pages.length); return []; }
            }));
            const index = parts.flat();
            try { sessionStorage.setItem(key, JSON.stringify(index)); } catch (e) { /* too large or blocked */ }
            return index;
        })();
        return indexPromise;
    }

    function search(index, query) {
        const q = norm(clean(query));
        if (q.length < 2) return [];
        const terms = q.split(' ').filter(t => t.length > 1 || /\d/.test(t));
        if (!terms.length) return [];
        const results = [];
        for (const s of index) {
            let score = 0, ok = true;
            for (const t of terms) {
                const inTitle = s.nt.includes(t);
                const count = s.nx.split(t).length - 1;
                if (!inTitle && !count) { ok = false; break; }
                score += (inTitle ? 12 : 0) + Math.min(count, 8);
                if (new RegExp('\\b' + t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\b').test(s.nt)) score += 6;
            }
            if (!ok) continue;
            if (s.nt === q) score += 40;
            else if (s.nt.startsWith(q)) score += 20;
            if (terms.length > 1 && (s.nt + ' ' + s.nx).includes(q)) score += 15;     // whole phrase
            results.push({ s, score });
        }
        return results.sort((a, b) => b.score - a.score).slice(0, MAX_RESULTS).map(r => r.s);
    }

    function snippet(s, query) {
        const terms = norm(clean(query)).split(' ').filter(Boolean);
        const text = s.text, ntext = s.nx;
        let at = -1;
        for (const t of [norm(clean(query)), ...terms]) { at = ntext.indexOf(t); if (at >= 0) break; }
        let start = Math.max(0, at - 70), end = Math.min(text.length, (at < 0 ? 0 : at) + 170);
        let out = (start > 0 ? '…' : '') + text.slice(start, end) + (end < text.length ? '…' : '');
        out = esc(out);
        for (const t of terms.sort((a, b) => b.length - a.length)) {
            if (t.length < 2) continue;
            out = out.replace(new RegExp('(' + t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'gi'), '<mark>$1</mark>');
        }
        return out;
    }

    // ---------- interface ----------
    const nav = document.querySelector('nav');
    if (!nav) return;
    const box = document.createElement('form');
    box.className = 'site-search';
    box.setAttribute('role', 'search');
    box.innerHTML = `<label for="site-search-input">Search the rules</label>
        <input type="search" id="site-search-input" placeholder="e.g. Fireball, Bleeding, Doom save" autocomplete="off">`;
    const logo = nav.querySelector('.sidebar-logo');
    if (logo) logo.after(box); else nav.prepend(box);
    const sideInput = box.querySelector('input');

    const panel = document.createElement('div');
    panel.className = 'search-panel';
    panel.innerHTML = `<div class="search-dialog" role="dialog" aria-modal="true" aria-label="Search the rules">
        <div class="search-head"><input type="search" aria-label="Search the rules" autocomplete="off">
        <button type="button" aria-label="Close search">✕</button></div>
        <div class="search-status" aria-live="polite"></div>
        <ul class="search-results"></ul></div>`;
    document.body.appendChild(panel);
    const input = panel.querySelector('input'), status = panel.querySelector('.search-status'),
          list = panel.querySelector('.search-results'), closeBtn = panel.querySelector('button');

    let active = -1, timer = null, lastFocus = null;
    function open(q) {
        lastFocus = document.activeElement;
        panel.classList.add('open');
        input.value = q || '';
        input.focus();
        run();
    }
    function close() {
        panel.classList.remove('open');
        sideInput.value = '';
        if (lastFocus && lastFocus.focus) lastFocus.focus();
    }
    async function run() {
        const q = input.value;
        if (clean(q).length < 2) { list.innerHTML = ''; status.textContent = 'Type at least two letters.'; return; }
        status.textContent = 'Searching…';
        const index = await getIndex((d, n) => { status.textContent = `Reading the rules… ${d} of ${n} pages`; });
        if (q !== input.value) return;                  // a newer search has started
        const found = search(index, q);
        active = -1;
        if (!found.length) { list.innerHTML = ''; status.textContent = `No matches for “${q}”.`; return; }
        status.textContent = `${found.length}${found.length === MAX_RESULTS ? '+' : ''} match${found.length === 1 ? '' : 'es'}`;
        list.innerHTML = found.map(s => {
            const href = (s.file === here ? '' : s.file) + (s.id ? '#' + s.id : (s.file === here ? '#' : ''));
            const pageLabel = s.title === s.page ? '' : `<div class="r-page">${esc(s.page)}</div>`;
            return `<li><a href="${esc(href || s.file)}">${pageLabel}<div class="r-title">${esc(s.title)}</div>
                <div class="r-snip">${snippet(s, q)}</div></a></li>`;
        }).join('');
    }
    const links = () => [...list.querySelectorAll('a')];
    function move(d) {
        const ls = links(); if (!ls.length) return;
        active = (active + d + ls.length) % ls.length;
        ls.forEach((a, i) => a.classList.toggle('active', i === active));
        ls[active].scrollIntoView({ block: 'nearest' });
    }

    box.addEventListener('submit', e => { e.preventDefault(); open(sideInput.value); });
    sideInput.addEventListener('input', () => { if (clean(sideInput.value).length >= 2) open(sideInput.value); });
    sideInput.addEventListener('focus', () => getIndex());   // start reading pages early
    input.addEventListener('input', () => { clearTimeout(timer); timer = setTimeout(run, 180); });
    input.addEventListener('keydown', e => {
        if (e.key === 'ArrowDown') { e.preventDefault(); move(1); }
        else if (e.key === 'ArrowUp') { e.preventDefault(); move(-1); }
        else if (e.key === 'Enter') { e.preventDefault(); const a = links()[active < 0 ? 0 : active]; if (a) a.click(); }
    });
    closeBtn.addEventListener('click', close);
    panel.addEventListener('click', e => {
        if (e.target === panel) close();
        const a = e.target.closest('.search-results a');
        if (a) {                                         // same-page result: close the panel and jump
            const href = a.getAttribute('href');
            if (href.startsWith('#')) { close(); location.hash = href.slice(1) ? href : ''; e.preventDefault();
                const t = href.slice(1) && document.getElementById(href.slice(1)); if (t) t.scrollIntoView(); }
        }
    });
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && panel.classList.contains('open')) close();
        const typing = /^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement.tagName) || document.activeElement.isContentEditable;
        if (e.key === '/' && !typing && !panel.classList.contains('open')) { e.preventDefault(); open(''); }
    });
})();
