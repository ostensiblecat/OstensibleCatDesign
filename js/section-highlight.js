/* Highlights fragment targets and links listed ingredients to the Components table. */
(function () {
    'use strict';

    const style = document.createElement('style');
    style.textContent = `
        .section-highlight {
            animation: section-target-highlight 2.2s ease-out;
            border-radius: 0.2rem;
        }
        @keyframes section-target-highlight {
            0% { background-color: rgba(138, 10, 10, 0.35); box-shadow: 0 0 0 3px rgba(138, 10, 10, 0.65); }
            100% { background-color: transparent; box-shadow: 0 0 0 3px transparent; }
        }
        @media (prefers-reduced-motion: reduce) {
            .section-highlight { animation: none; background-color: rgba(138, 10, 10, 0.25); box-shadow: 0 0 0 3px rgba(138, 10, 10, 0.5); }
        }
    `;
    document.head.appendChild(style);

    function getTarget(hash) {
        if (!hash || hash === '#') return null;
        let id;
        try { id = decodeURIComponent(hash.slice(1)); }
        catch (error) { id = hash.slice(1); }
        return document.getElementById(id) || document.getElementsByName(id)[0] || null;
    }

    function highlight(hash) {
        const target = getTarget(hash);
        if (!target) return;
        target.classList.remove('section-highlight');
        void target.offsetWidth;
        target.classList.add('section-highlight');
    }

    function normalize(value) {
        return value.toLowerCase().replace(/\s+/g, ' ').trim();
    }

    function slugify(value) {
        return value.toLowerCase().normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-|-$/g, '');
    }

    function linkListedComponents() {
        const section = document.getElementById('components');
        if (!section) return;

        const targets = new Map();
        section.querySelectorAll('tbody tr').forEach(function (row) {
            const nameCell = row.cells[1];
            if (!nameCell) return;
            const name = nameCell.textContent.replace(/\s*\[[^\]]+\]/g, '').trim();
            if (!name) return;

            const id = 'component-' + slugify(name);
            row.id = id;
            targets.set(normalize(name), { name: name, id: id });
        });

        // The item listings use these shorthand/variant names for table entries.
        const aliases = {
            'wine': 'Alcohol (Beer/Wine/Spirits)',
            'iron shavings': 'Iron',
            'iron rod': 'Iron',
            'magic feather': 'Magic Feather (harpy, griffin, etc.)',
            'life\'s blood': 'Life’s Blood',
            'life’s blood': 'Life’s Blood',
            'lamp oil': 'Lamp oil'
        };
        Object.keys(aliases).forEach(function (alias) {
            const target = targets.get(normalize(aliases[alias]));
            if (target) targets.set(normalize(alias), target);
        });

        const names = Array.from(targets.keys()).sort(function (a, b) { return b.length - a.length; });
        if (!names.length) return;
        const escaped = names.map(function (name) { return name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); });
        const matcher = new RegExp('(^|[^A-Za-z0-9])(' + escaped.join('|') + ')(?=$|[^A-Za-z0-9])', 'gi');

        // Only link names in component/ingredient lines, not matching words in ordinary prose.
        const ingredientLines = Array.from(document.querySelectorAll('main li')).filter(function (item) {
            return /\b(?:alchemical|spell|healing)?\s*components?\s*:/i.test(item.textContent) ||
                /\bhealing\s+herb\s*:/i.test(item.textContent);
        });

        ingredientLines.forEach(function (item) {
            const walker = document.createTreeWalker(item, NodeFilter.SHOW_TEXT);
            const textNodes = [];
            let node;
            while ((node = walker.nextNode())) {
                if (node.parentElement && !node.parentElement.closest('a')) textNodes.push(node);
            }

            textNodes.forEach(function (textNode) {
                const text = textNode.nodeValue;
                matcher.lastIndex = 0;
                const matches = Array.from(text.matchAll(matcher));
                if (!matches.length) return;

                const fragment = document.createDocumentFragment();
                let cursor = 0;
                matches.forEach(function (match) {
                    const component = targets.get(normalize(match[2]));
                    if (!component) return;
                    const start = match.index + match[1].length;
                    if (start < cursor) return;
                    fragment.appendChild(document.createTextNode(text.slice(cursor, start)));
                    const link = document.createElement('a');
                    link.href = '#' + component.id;
                    link.textContent = match[2];
                    link.setAttribute('aria-label', 'Find ' + component.name + ' in the Components table');
                    fragment.appendChild(link);
                    cursor = start + match[2].length;
                });
                if (cursor === 0) return;
                fragment.appendChild(document.createTextNode(text.slice(cursor)));
                textNode.parentNode.replaceChild(fragment, textNode);
            });
        });
    }

    // The existing deferred script tag runs after the page markup is parsed.
    linkListedComponents();

    document.addEventListener('click', function (event) {
        const link = event.target.closest('a[href]');
        if (!link) return;
        const destination = new URL(link.href, window.location.href);
        if (destination.origin === window.location.origin &&
            destination.pathname === window.location.pathname &&
            destination.search === window.location.search && destination.hash) {
            highlight(destination.hash);
        }
    });

    window.addEventListener('hashchange', function () { highlight(window.location.hash); });
    if (window.location.hash) requestAnimationFrame(function () { highlight(window.location.hash); });
})();
