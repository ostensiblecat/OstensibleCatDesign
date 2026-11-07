/* Bleak Forest Engine – Back to top button
   Add to any page, just before </body>:   <script src="js/back-to-top.js"></script>
   (or in the <head> with defer:           <script src="js/back-to-top.js" defer></script>)

   Uses the #back-to-top button if the page already has one; otherwise it adds the button itself,
   so the script tag is all a page needs. Styling comes from the #back-to-top rules in CSS/styles.css. */

(function () {
    'use strict';

    const SHOW_AFTER = 400;          // pixels scrolled before the button appears
    const LABEL = 'Back to top';     // read by screen readers and shown as a tooltip
    const ARROW = '↑';

    function init() {
        let backToTop = document.getElementById('back-to-top');
        if (!backToTop) {
            backToTop = document.createElement('button');
            backToTop.type = 'button';
            backToTop.id = 'back-to-top';
            backToTop.textContent = ARROW;
            document.body.appendChild(backToTop);
        }
        if (!backToTop.hasAttribute('aria-label')) backToTop.setAttribute('aria-label', LABEL);
        if (!backToTop.title) backToTop.title = LABEL;

        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

        function update() {
            backToTop.classList.toggle('visible', window.scrollY > SHOW_AFTER);
        }

        window.addEventListener('scroll', update, { passive: true });
        update();   // also check on load, e.g. when a link opens the page partway down

        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: reduceMotion.matches ? 'auto' : 'smooth' });

            // Move keyboard focus to the top as well, so Tab carries on from there
            const target = document.querySelector('main') || document.body;
            if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
            target.focus({ preventScroll: true });
        });
    }

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
    else init();
})();
