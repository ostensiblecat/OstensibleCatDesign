/* Highlights fragment targets and links named ingredients to the Components table. */
(function () {
    'use strict';

    const style = document.createElement('style');
    style.textContent = `
        .section-highlight {
            animation: section-target-highlight 2.2s ease-out;
            border-radius: 0.2rem;
        }

        @keyframes section-target-highlight {
            0% {
                background-color: rgba(138, 10, 10, 0.35);
                box-shadow: 0 0 0 3px rgba(138, 10, 10, 0.65);
            }
            100% {
                background-color: transparent;
                box-shadow: 0 0 0 3px transparent;
            }
        }

        @media (prefers-reduced-motion: reduce) {
            .section-highlight {
                animation: none;
                background-color: rgba(138, 10, 10, 0.25);
                box-shadow: 0 0 0 3px rgba(138, 10, 10, 0.5);
            }
        }
    `;
    document.head.appendChild(style);

    function getTarget(hash) {
        if (!hash || hash === '#') return null;

        let id;
        try {
            id = decodeURIComponent(hash.slice(1));
        } catch (error) {
            id = hash.slice(1);
        }

        return document.getElementById(id) || document.getElementsByName(id)[0] || null;
    }

    function highlight(hash) {
        const target = getTarget(hash);
        if (!target) return;

        target.classList.remove('section-highlight');
        void target.offsetWidth;
        target.classList.add('section-highlight');
    }

    function slugify(value) {
        return value.toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-|-$/g, '');
    }

    function normalize(value) {
        return value.toLowerCase().replace(/\s+/g, ' ').trim();
    }

    function linkComponents() {
        const componentsSection = document.getElementById('components');
        if (!componentsSection) return;

        const componentTargets = new Map();
        componentsSection.querySelectorAll('tbody tr').forEach(function (row) {
            const cell = row.cells[1];
            if (!cell) return;

            // Remove usage tags such as [A][S] so links use the component's name only.
            const name = cell.textContent.replace(/\s*\[[^\]]+\]/g, '').trim();
            if (!name) return;

            const id = 'component-' + slugify(name);
            row.id = id;
            componentTargets.set(normalize(name), { name: name, id: id });
        });

        // Names explicitly identified as equivalent in the component notes.
        const aliases = {
            'wine': 'Alcohol (Beer/Wine/Spirits)',
            'iron shavings': 'Iron',
            'iron rod': 'Iron',
            'elemental salts (air, earth, fire, or water)': 'Water Salts'
        };
        Object.keys(aliases).forEach(function (alias) {
            const target = componentTargets.get(normalize(aliases[alias]));
            if (target) componentTargets.set(normalize(alias), target);
        });

        const entries = Array.from(componentTargets.entries())
            .sort(function (a, b) { return b[0].length - a[0].length; });
        if (!entries.length) return;

        const escapedNames = entries.map(function (entry) {
            return entry[1].name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        });
        // Match case-insensitively; normalize the captured name before looking it up.
        const matcher = new RegExp('(^|[^\\w])(' + escapedNames.join('|') + ')(?=$|[^\\w])', 'gi');
        const walker = document.createTreeWalker(
            document.querySelector('main') || document.body,
            NodeFilter.SHOW_TEXT
        );
        const textNodes = [];
        let node;

        while ((node = walker.nextNode())) {
            const parent = node.parentElement;
            if (!parent || !node.nodeValue.trim() ||
                parent.closest('a, table, script, style, textarea, select, button, .reference-index')) continue;
            textNodes.push(node);
        }

        textNodes.forEach(function (textNode) {
            const text = textNode.nodeValue;
            matcher.lastIndex = 0;
            if (!matcher.test(text)) return;
            matcher.lastIndex = 0;

            const fragment = document.createDocumentFragment();
            let lastIndex = 0;
            let match;

            while ((match = matcher.exec(text))) {
                const component = componentTargets.get(normalize(match[2]));
                if (!component) continue;

                const start = match.index + match[1].length;
                if (start > lastIndex) {
                    fragment.appendChild(document.createTextNode(text.slice(lastIndex, start)));
                }

                const link = document.createElement('a');
                link.href = '#' + component.id;
                link.textContent = match[2];
                fragment.appendChild(link);
                lastIndex = start + match[2].length;
            }

            if (lastIndex < text.length) {
                fragment.appendChild(document.createTextNode(text.slice(lastIndex)));
            }
            if (fragment.childNodes.length) textNode.parentNode.replaceChild(fragment, textNode);
        });
    }

    // This file is loaded with defer, so the component table is available here.
    linkComponents();

    document.addEventListener('click', function (event) {
        const link = event.target.closest('a[href]');
        if (!link) return;

        const destination = new URL(link.href, window.location.href);
        if (destination.origin === window.location.origin &&
            destination.pathname === window.location.pathname &&
            destination.search === window.location.search &&
            destination.hash) {
            highlight(destination.hash);
        }
    });

    window.addEventListener('hashchange', function () {
        highlight(window.location.hash);
    });

    if (window.location.hash) {
        requestAnimationFrame(function () {
            highlight(window.location.hash);
        });
    }
})();
