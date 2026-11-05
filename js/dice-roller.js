/* Bleak Forest Engine – Dice Roller
   Needs the markup in dice-roller.html (ids: tray, results, history, wyrd, modifier, bam, roll,
   d20-count, d6-count, and the data-step / data-preset buttons) and images/BFSigil-dice.png.

   The sigil image is white on a transparent background. It is used as an SVG mask, so the
   sigil is drawn in whatever colour the die's ink is (dark on bone dice, cream on the Wyrd die).
   To change its colour, change --ink / --wyrd-ink in CSS/dice-roller.css. */

// ----- Dice Roller -----
(function () {
    const SIGIL_SRC = 'images/BFSigil-dice.png';
    const SIGIL_MASK_ID = 'bf-sigil-mask';
    const LIMITS = { d20: [0, 3], d6: [0, 6] };
    const state = { d20: 1, d6: 0 };
    const BAM_NAMES = { 10: 'Easy', 13: 'Average', 16: 'Difficult', 19: 'Challenging', 22: 'Formidable', 25: 'Inconceivable' };

    const el = id => document.getElementById(id);
    const tray = el('tray'), results = el('results'), history = el('history');
    const wyrdBox = el('wyrd'), modInput = el('modifier'), bamSelect = el('bam'), rollBtn = el('roll');

    // If the sigil image can't load, the 1 face falls back to a numeral / single pip.
    let sigilOK = false;
    const probe = new Image();
    probe.onload = () => { sigilOK = true; };
    probe.src = SIGIL_SRC;

    // One shared mask holding the sigil; each die face fills a box through it with its ink colour.
    // maskContentUnits="objectBoundingBox" stretches the image over whatever box uses the mask.
    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    defs.setAttribute('width', '0'); defs.setAttribute('height', '0');
    defs.setAttribute('aria-hidden', 'true');
    defs.style.position = 'absolute';
    defs.innerHTML = `<defs><mask id="${SIGIL_MASK_ID}" maskContentUnits="objectBoundingBox" mask-type="luminance">
        <image href="${SIGIL_SRC}" x="0" y="0" width="1" height="1" preserveAspectRatio="xMidYMid meet"/></mask></defs>`;
    document.body.appendChild(defs);

    // Fair rolls from the browser's cryptographic random source
    function roll(sides) {
        const buf = new Uint32Array(1), limit = Math.floor(0x100000000 / sides) * sides;
        do { crypto.getRandomValues(buf); } while (buf[0] >= limit);
        return (buf[0] % sides) + 1;
    }

    // ---- SVG faces ----
    const PIPS = { 1: [[50,50]], 2: [[28,28],[72,72]], 3: [[28,28],[50,50],[72,72]],
                   4: [[28,28],[72,28],[28,72],[72,72]], 5: [[28,28],[72,28],[50,50],[28,72],[72,72]],
                   6: [[28,26],[72,26],[28,50],[72,50],[28,74],[72,74]] };

    // The Bleak Forest sigil in a size×size box at (x, y), painted in the given colour
    function sigil(x, y, size, colour) {
        return `<rect x="${x}" y="${y}" width="${size}" height="${size}" fill="${colour}" mask="url(#${SIGIL_MASK_ID})"/>`;
    }

    function d6Svg(v, wyrd) {
        const face = wyrd ? 'var(--wyrd)' : 'var(--bone)', shade = wyrd ? 'var(--wyrd-shade)' : 'var(--bone-shade)';
        const ink = wyrd ? 'var(--wyrd-ink)' : 'var(--ink)', edge = wyrd ? '#2a0808' : 'var(--edge)';
        let inner;
        if (v === 1 && sigilOK) inner = sigil(18, 18, 64, ink);
        else inner = PIPS[v].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="${v === 1 ? 10 : 8}" fill="${ink}"/>`).join('');
        return `<svg viewBox="0 0 100 100" role="img" aria-label="d6 showing ${v}">
            <rect x="5" y="9" width="90" height="88" rx="16" fill="${shade}"/>
            <rect x="5" y="3" width="90" height="88" rx="16" fill="${face}" stroke="${edge}" stroke-width="2.5"/>
            <g transform="translate(0,-3)">${inner}</g></svg>`;
    }

    function d20Svg(v) {
        const hex = '50,2 93,26 93,74 50,98 7,74 7,26';
        const tri = '50,22 81,72 19,72';
        const facets = [
            ['50,2 93,26 50,22', 0.10], ['50,2 7,26 50,22', 0.04], ['93,26 81,72 50,22', 0.16],
            ['7,26 19,72 50,22', 0.12], ['93,26 93,74 81,72', 0.24], ['7,26 7,74 19,72', 0.20],
            ['93,74 50,98 81,72', 0.30], ['7,74 50,98 19,72', 0.27], ['19,72 81,72 50,98', 0.22]
        ].map(([pts, a]) => `<polygon points="${pts}" fill="#000" fill-opacity="${a}"/>`).join('');
        let inner;
        if (v === 1 && sigilOK) inner = sigil(27, 25, 46, 'var(--ink)');  // sits inside the d20's front triangle
        else inner = `<text x="50" y="62" text-anchor="middle" font-size="${v > 9 ? 21 : 24}" font-weight="bold"
                        font-family="Georgia, 'Times New Roman', serif" fill="var(--ink)">${v}</text>`;
        return `<svg viewBox="0 0 100 100" role="img" aria-label="d20 showing ${v}">
            <polygon points="${hex}" fill="var(--bone)"/>${facets}
            <polygon points="${tri}" fill="var(--bone)" stroke="var(--edge)" stroke-width="1.5" stroke-linejoin="round"/>
            <polygon points="${hex}" fill="none" stroke="var(--edge)" stroke-width="2.5" stroke-linejoin="round"/>
            <g stroke="var(--edge)" stroke-width="1.2" stroke-opacity="0.7">
                <line x1="50" y1="22" x2="50" y2="2"/><line x1="50" y1="22" x2="93" y2="26"/><line x1="50" y1="22" x2="7" y2="26"/>
                <line x1="81" y1="72" x2="93" y2="26"/><line x1="81" y1="72" x2="93" y2="74"/><line x1="81" y1="72" x2="50" y2="98"/>
                <line x1="19" y1="72" x2="7" y2="26"/><line x1="19" y1="72" x2="7" y2="74"/><line x1="19" y1="72" x2="50" y2="98"/>
            </g>${inner}</svg>`;
    }

    // ---- Controls ----
    function render() {
        el('d20-count').textContent = state.d20;
        el('d6-count').textContent = state.d6;
        document.querySelectorAll('[data-step]').forEach(b => {
            const [min, max] = LIMITS[b.dataset.step], n = state[b.dataset.step], d = +b.dataset.delta;
            b.disabled = (d < 0 && n <= min) || (d > 0 && n >= max);
        });
        wyrdBox.disabled = state.d6 === 0;
        if (state.d6 === 0) wyrdBox.checked = false;
        rollBtn.disabled = state.d20 + state.d6 === 0;
    }
    document.querySelectorAll('[data-step]').forEach(b => b.addEventListener('click', () => {
        const k = b.dataset.step, [min, max] = LIMITS[k];
        state[k] = Math.min(max, Math.max(min, state[k] + (+b.dataset.delta)));
        render();
    }));

    const PRESETS = {
        check:       { d20: 1, d6: 0, wyrd: false },
        danger:      { d20: 0, d6: 2, wyrd: true,  mod: 0 },
        initiative:  { d20: 0, d6: 1, wyrd: false },
        disposition: { d20: 0, d6: 2, wyrd: false, mod: 0 }
    };
    let activePreset = null;
    document.querySelectorAll('[data-preset]').forEach(b => b.addEventListener('click', () => {
        const p = PRESETS[b.dataset.preset];
        state.d20 = p.d20; state.d6 = p.d6;
        render();
        wyrdBox.checked = p.wyrd;
        if ('mod' in p) modInput.value = p.mod;
        activePreset = b.dataset.preset;
        doRoll();
    }));
    // Any manual change ends the preset's special reading (e.g. disposition)
    [wyrdBox, modInput, bamSelect].forEach(c => c.addEventListener('change', () => { activePreset = null; }));
    document.querySelectorAll('[data-step]').forEach(b => b.addEventListener('click', () => { activePreset = null; }));

    // ---- Reading the dice ----
    function d20Verdict(nat, total, bam) {
        if (nat === 1) return { text: 'Fumble. A natural 1 always fails.', cls: 'fumble' };
        if (nat === 20) return { text: 'Critical Success. A natural 20 always succeeds (unless Might applies).', cls: 'crit' };
        if (bam === null) return null;
        if (total >= bam + 6) return { text: `Succeed with Style (${total} vs ${bam})`, cls: 'crit' };
        if (total >= bam) return { text: `Success (${total} vs ${bam})`, cls: '' };
        return { text: `Failure (${total} vs ${bam})`, cls: 'fumble' };
    }
    function dangerReading(values, sum) {
        const n = values.length;
        if (values[0] === 1) {
            const tier = n === 1 ? 'Minor' : n === 2 ? 'Moderate' : 'Major';
            return `The Wyrd die shows 1: ${tier} Special Event.`;
        }
        if (sum <= 5) return 'No encounter. Roll on the Still Watch table.';
        if (sum <= 9) return 'Common Encounter.';
        if (sum <= 12) return 'Uncommon Encounter.';
        return 'Rare Encounter.';
    }
    function dispositionReading(sum) {
        return sum <= 3 ? 'Hostile' : sum <= 6 ? 'Wary' : sum <= 9 ? 'Curious' : sum <= 11 ? 'Friendly' : 'Helpful';
    }
    const signed = n => (n >= 0 ? '+' : '−') + Math.abs(n);

    // ---- Rolling ----
    let busy = false;
    function doRoll() {
        if (busy || state.d20 + state.d6 === 0) return;
        busy = true; rollBtn.disabled = true;
        const mod = parseInt(modInput.value, 10) || 0;
        const bam = bamSelect.value === '' ? null : +bamSelect.value;
        const wyrd = wyrdBox.checked && state.d6 > 0;
        const d20s = Array.from({ length: state.d20 }, () => roll(20));
        const d6s = Array.from({ length: state.d6 }, () => roll(6));

        // Build the tray
        tray.innerHTML = '';
        const nodes = [];
        d20s.forEach(() => { const d = document.createElement('div'); d.className = 'die d20 rolling'; tray.appendChild(d); nodes.push({ d, sides: 20 }); });
        d6s.forEach((_, i) => { const d = document.createElement('div'); d.className = 'die d6 rolling'; tray.appendChild(d); nodes.push({ d, sides: 6, wyrd: wyrd && i === 0 }); });
        const finals = [...d20s, ...d6s];
        const paint = (n, v) => { n.d.innerHTML = n.sides === 20 ? d20Svg(v) : d6Svg(v, n.wyrd); };

        const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const settle = () => {
            nodes.forEach((n, i) => {
                paint(n, finals[i]);
                n.d.classList.remove('rolling');
                if (finals[i] === 1) n.d.classList.add('nat-one');
                if (finals[i] === n.sides) n.d.classList.add('nat-max');
            });
            showResults(d20s, d6s, mod, bam, wyrd);
            busy = false; render();
        };
        if (reduce) { settle(); return; }
        let ticks = 0;
        const timer = setInterval(() => {
            nodes.forEach(n => paint(n, roll(n.sides)));
            if (++ticks >= 8) { clearInterval(timer); settle(); }
        }, 75);
    }

    function showResults(d20s, d6s, mod, bam, wyrd) {
        const out = [], log = [];
        d20s.forEach((nat, i) => {
            const total = nat + mod, v = d20Verdict(nat, total, bam);
            const label = d20s.length > 1 ? `d20 #${i + 1}` : 'd20';
            out.push(`<p class="result-line"><strong>${label}:</strong> rolled ${nat}${mod ? ` ${signed(mod)} = <strong>${total}</strong>` : ''}` +
                     (bam !== null ? ` against ${BAM_NAMES[bam]} (${bam})` : '') + '</p>');
            if (v) out.push(`<p class="verdict ${v.cls}">${v.text}</p>`);
            log.push(`d20: ${nat}${mod ? ` ${signed(mod)} = ${total}` : ''}${v ? ' (' + v.text.split('.')[0].replace(/ \(.*/, '') + ')' : ''}`);
        });
        if (d6s.length) {
            const sum = d6s.reduce((a, b) => a + b, 0), high = Math.max(...d6s);
            const shownSum = d20s.length ? sum : sum + mod;
            const dice = d6s.map((v, i) => (wyrd && i === 0 ? `<strong title="Wyrd die">${v}ᵂ</strong>` : v)).join(', ');
            out.push(`<p class="result-line"><strong>${d6s.length}d6:</strong> ${dice} · Total <strong>${shownSum}</strong>` +
                     (!d20s.length && mod ? ` (${sum} ${signed(mod)})` : '') +
                     (d6s.length > 1 ? ` · Highest <strong>${high}</strong>` : '') + '</p>');
            let note = '';
            if (wyrd) note = dangerReading(d6s, sum);
            else if (activePreset === 'disposition' && d6s.length === 2 && !d20s.length) note = `Disposition: ${dispositionReading(sum)}.`;
            if (note) out.push(`<p class="verdict${wyrd && d6s[0] === 1 ? ' crit' : ''}">${note}</p>`);
            log.push(`${d6s.length}d6: ${d6s.join(', ')} = ${shownSum}${note ? ' (' + note.replace(/\.$/, '') + ')' : ''}`);
        }
        results.innerHTML = out.join('');

        const li = document.createElement('li');
        li.textContent = log.join(' · ');
        history.prepend(li);
        while (history.children.length > 10) history.lastElementChild.remove();
    }

    rollBtn.addEventListener('click', () => { doRoll(); });
    render();
})();
