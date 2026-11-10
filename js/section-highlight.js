/* Highlights the section reached by an in-page or cross-page fragment link. */
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

        return document.getElementById(id) ||
            document.getElementsByName(id)[0] ||
            null;
    }

    function highlight(hash) {
        const target = getTarget(hash);
        if (!target) return;

        target.classList.remove('section-highlight');
        // Force a reflow so repeated clicks restart the CSS animation.
        void target.offsetWidth;
        target.classList.add('section-highlight');
    }

    // Delegation also covers links inserted dynamically by page scripts.
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

    // Handles links from another page and direct URLs ending in #section.
    if (window.location.hash) {
        requestAnimationFrame(function () {
            highlight(window.location.hash);
        });
    }
})();
