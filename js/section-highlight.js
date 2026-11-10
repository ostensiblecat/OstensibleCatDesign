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

    function linkComponents() {
        const componentsSection = document.getElementById('components');
        if (!componentsSection) return;

        const componentTargets = new Map();
        componentsSection.querySelectorAll('tbody tr').forEach(function (row) {
            const cell = row.cells[1];
            if (!cell) return;

            // Strip the table's usage tags (for example [A][S]) from the component name.
            const name = cell.textContent.replace(/\s*\[[^\]]+\]/g, '').trim();
            if (!name) return;

            const id = 'component-' + slugify(name);
            if (!document.getElementById(id)) row.id = id;
            if (!componentTargets.has(name)) componentTargets.set(name, id);
        });

        // These names are explicitly treated as equivalents in the component notes.
        const aliases = {
            'wine': 'Alcohol (Beer/Wine/Spirits)',
            'iron shavings': 'Iron',
            'iron rod': 'Iron'
        };
        Object.keys(aliases).forEach(function (alias) {
            const target = componentTargets.get(aliases[alias]);
            if (target) componentTargets.set(alias, target);
        });

        const names = Array.from(componentTargets.keys())
            .sort(function (a, b) { return b.length - a.length; });
        if (!names.length) return;

        const escapedNames = names.map(function (name) {
            return name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        });
        const matcher = new RegExp('(^|[^\\w])(' + escapedNames.join('|') + ')(?=$|[^\\w])', 'gi');
        const walker = document.createTreeWalker(document.querySelector('main') || document.body, NodeFilter.SHOW_TEXT);
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
                const componentName = match[2];
                const start = match.index + match[1].length;
                if (start > lastIndex) fragment.appendChild(document.createTextNode(text.slice(lastIndex, start)));

                const link = document.createElement('a');
                link.href = '#' + componentTargets.get(componentName);
                link.textContent = componentName;
                fragment.appendChild(link);
                lastIndex = start + componentName.length;
            }

            if (lastIndex < text.length) fragment.appendChild(document.createTextNode(text.slice(lastIndex)));
            textNode.parentNode.replaceChild(fragment, textNode);
        });
    }

    // Script tags use defer; the document is parsed before this runs.
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
