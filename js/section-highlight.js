/* Highlights fragment targets and links exact alchemy ingredients to the Components table. */
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

    function escapeRegExp(value) {
        return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    function linkAlchemyIngredients() {
        const componentsSection = document.getElementById('components');
        if (!componentsSection) return;

        // Create targets from actual component-table rows only.
        const targets = new Map();
        componentsSection.querySelectorAll('tbody tr').forEach(function (row) {
            const nameCell = row.cells[1];
            if (!nameCell) return;
            const name = nameCell.textContent.replace(/\s*\[[^\]]+\]/g, '').trim();
            if (!name) return;

            const id = 'component-' + slugify(name);
            row.id = id;
            targets.set(normalize(name), { name: name, id: id });
        });

        // Only aliases explicitly used in the alchemy ingredient lists.
        const aliases = {
            'wine': 'Alcohol (Beer/Wine/Spirits)',
            'iron shavings': 'Iron',
            'iron rod': 'Iron',
            'magic feather': 'Magic Feather (harpy, griffin, etc.)',
            "life's blood": 'Life’s Blood',
            'air': 'Air Salts',
            'earth': 'Earth Salts',
            'fire': 'Fire Salts'
        };
        Object.keys(aliases).forEach(function (alias) {
            const target = targets.get(normalize(aliases[alias]));
            if (target) targets.set(normalize(alias), target);
        });

        const names = Array.from(targets.keys()).sort(function (a, b) { return b.length - a.length; });
        const matcher = new RegExp(
            '(^|[^A-Za-z0-9])(' + names.map(escapeRegExp).join('|') + ')(?=$|[^A-Za-z0-9])',
            'gi'
        );

        // Restrict linking to each alchemy item’s Alchemical Components line.
        document.querySelectorAll('h3[id^="alchemy-"]').forEach(function (heading) {
            let element = heading.nextElementSibling;
            while (element && element.tagName !== 'H3') {
                if (element.tagName === 'UL') {
                    element.querySelectorAll('li').forEach(function (item) {
                        if (!/^\s*Alchemical Components\s*:/i.test(item.textContent)) return;

                        const walker = document.createTreeWalker(item, NodeFilter.SHOW_TEXT);
                        const nodes = [];
                        let textNode;
                        while ((textNode = walker.nextNode())) {
                            if (!textNode.parentElement.closest('a')) nodes.push(textNode);
                        }

                        // Do not process the label; only component text after its colon.
                        let componentTextStarted = false;
                        nodes.forEach(function (node) {
                            let text = node.nodeValue;
                            if (!componentTextStarted) {
                                const colon = text.indexOf(':');
                                if (colon < 0) return;
                                text = text.slice(colon + 1);
                                componentTextStarted = true;
                                if (!text) return;
                            }

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
                            node.parentNode.replaceChild(fragment, node);
                        });
                    });
                }
                element = element.nextElementSibling;
            }
        });
    }

    // Loaded with defer, after the page markup has been parsed.
    linkAlchemyIngredients();

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
