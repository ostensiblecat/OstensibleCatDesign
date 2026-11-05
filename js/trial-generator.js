/* Bleak Forest Engine – Challenges, Ordeals & Fragments generator
   Needs the markup in trial-generator.html and images/BFSigil-dice.png.

   1. RULES   – the generator tables from Playing the Game › Challenges and Ordeals.
   2. DICE    – fair rolls and dice drawings (same look as the Dice Roller).
   3. GENERATE – building a Challenge, an Ordeal or a lone Fragment.
   4. LEDGER  – tracking kept events: Fragments, Prepared, Omen timing, tasks, Blight.
   5. RENDER  – drawing the cards.
   6. EVENTS  – wiring the buttons. */

(function () {
'use strict';

/* =====================================================================
   1. RULES
   ===================================================================== */

const ATTRS = ['Corpus', 'Anima', 'Spiritus'];
const attrFromD6 = n => (n <= 2 ? 'Corpus' : n <= 4 ? 'Anima' : 'Spiritus');
const TIERS = ['Minor', 'Moderate', 'Major'];
const tierFromD6 = n => (n <= 3 ? 0 : n <= 5 ? 1 : 2);

const CHALLENGE_TIERS = [
    { bam: 'Average (13)',     sister: 'Maiden', gift: 'a Vow or Knot',  fragments: 2 },
    { bam: 'Difficult (16)',   sister: 'Matron', gift: 'a Vow or Scar',  fragments: 3 },
    { bam: 'Challenging (19)', sister: 'Crone',  gift: 'a Scar or Knot', fragments: 4 }
];
const TRIALS = {
    Corpus:   ['Endure a hardship', 'Cross a deadly place', 'Carry a burden to its end', 'Stand against a foe', 'Escape a trap', 'Survive the elements'],
    Anima:    ['See through a deception', 'Find what is hidden', 'Persuade the unwilling', 'Remember what was lost', 'Pass unseen', 'Judge between two wrongs'],
    Spiritus: ['Face the dead', 'Refuse a temptation', 'Speak a forbidden name', 'Walk a dream', 'Bind or release a spirit', 'Give up something of yourself']
};
const SITES = ['A ruin', 'Still or deep water', 'A grave or barrow', 'A hollow tree', 'A crossroads', 'A threshold, such as a door, gate, or hovel'];
const CHALLENGE_REVEALS = ['the trial', 'the site', 'the stakes', 'the past'];

const FRAGMENTS = [
    { type: 'Relic',   desc: 'an object from the site',              by: 'Explore or loot' },
    { type: 'Witness', desc: 'a creature that saw something',        by: 'Encounter or Parley' },
    { type: 'Mark',    desc: 'a sign carved, burned, or left behind', by: 'Explore (Wits, Difficult 16)' },
    { type: 'Rumour',  desc: 'a story from a traveller or wanderer', by: 'Special Event or Parley' },
    { type: 'Vision',  desc: 'a dream during rest',                  by: 'Short or Full Rest' },
    { type: 'Echo',    desc: 'a memory from a past Recursion',       by: 'Echo spend or recalling a death' }
];

const CHALLENGE_OMENS = [
    { text: 'Three figures watch from the treeline',   begins: 'End of this Watch' },
    { text: 'An animal leads you toward the site',     begins: 'When you follow it' },
    { text: 'The Fragment objects grow warm or wet',   begins: 'Next sub-hex entered' },
    { text: 'A sound repeats that only you hear',      begins: 'At dusk' },
    { text: 'The Danger Die shows all the same number', begins: 'Immediately' },
    { text: 'The Sister speaks your missing name',     begins: 'At your next rest' }
];
const CHALLENGE_BLIGHTS = [
    'Gain a Scar tied to the trial',
    'The tested attribute cannot Lock until the next Recursion',
    '+1 Danger die in this hex permanently',
    'A creature from the trial hunts you once per Recursion',
    'Lose one Fragment held for another event',
    'The Sister’s next gift carries a heavier constraint'
];

const ORDEAL_TIERS = [
    { decisive: 'Difficult (16)',   task: 'Average (13)',     tasks: 2 },
    { decisive: 'Challenging (19)', task: 'Difficult (16)',   tasks: 3 },
    { decisive: 'Formidable (22)',  task: 'Challenging (19)', tasks: 4 }
];
const PLACES = ['A hamlet', 'A market town', 'A road or bridge', 'A shrine or monastery', 'A holdfast', 'A stretch of wilds'];
const TROUBLES = ['Sickness spreading', 'Failing food or water', 'A feud tearing it apart', 'A haunting', 'A predator taking people', 'Corruption spreading'];
// The Cause table has five entries; a 6 on the d6 is rolled again.
const CAUSES = ['Human greed or fear', 'A Fae bargain gone sour', 'The restless dead', 'Demonic influence', 'An elemental grievance'];
const TASKS = {
    Corpus:   ['Repair or rebuild', 'Descend somewhere dangerous', 'Hunt or drive off', 'Escort through danger', 'Hold a position', 'Carry supplies through'],
    Anima:    ['Investigate records', 'Negotiate a truce', 'Expose a lie', 'Rally the people', 'Track to a source', 'Uncover a hidden figure'],
    Spiritus: ['Cleanse or ward', 'Bargain with an entity', 'Heal the afflicted', 'Banish or bind', 'Read the omens', 'Undo a working']
};
const ORDEAL_OMENS = ['The first death, in public', 'The last of something runs out', 'A leader falls or flees',
                      'Violence in the street', 'The dead walk at noon', 'The Sisters stand in the square'];
const ORDEAL_BLIGHTS = [  // 1–2, 3–4, 5–6
    'The place is lost and its Danger Die rises by 1',
    'The Cause spreads to an adjacent hex as a new Ordeal one tier higher',
    'The place’s faction becomes Hostile to you'
];

/* =====================================================================
   2. DICE
   ===================================================================== */

function d(sides) {
    const buf = new Uint32Array(1), limit = Math.floor(0x100000000 / sides) * sides;
    do { crypto.getRandomValues(buf); } while (buf[0] >= limit);
    return (buf[0] % sides) + 1;
}

const SIGIL_SRC = 'images/BFSigil-dice.png', SIGIL_MASK_ID = 'tg-sigil-mask';
let sigilOK = false;
const probe = new Image();
probe.onload = () => { sigilOK = true; hydrateDice(document, false); };
probe.src = SIGIL_SRC;
const maskSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
maskSvg.setAttribute('width', '0'); maskSvg.setAttribute('height', '0'); maskSvg.setAttribute('aria-hidden', 'true');
maskSvg.style.position = 'absolute';
maskSvg.innerHTML = `<defs><mask id="${SIGIL_MASK_ID}" maskContentUnits="objectBoundingBox" mask-type="luminance">
    <image href="${SIGIL_SRC}" x="0" y="0" width="1" height="1" preserveAspectRatio="xMidYMid meet"/></mask></defs>`;
document.body.appendChild(maskSvg);

const PIPS = { 1: [[50,50]], 2: [[28,28],[72,72]], 3: [[28,28],[50,50],[72,72]],
               4: [[28,28],[72,28],[28,72],[72,72]], 5: [[28,28],[72,28],[50,50],[28,72],[72,72]],
               6: [[28,26],[72,26],[28,50],[72,50],[28,74],[72,74]] };
const sigil = (x, y, s) => `<rect x="${x}" y="${y}" width="${s}" height="${s}" fill="var(--ink)" mask="url(#${SIGIL_MASK_ID})"/>`;
function d6Svg(v) {
    const inner = (v === 1 && sigilOK) ? sigil(18, 18, 64)
        : PIPS[v].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="${v === 1 ? 11 : 9}" fill="var(--ink)"/>`).join('');
    return `<svg viewBox="0 0 100 100" aria-hidden="true"><rect x="5" y="9" width="90" height="88" rx="16" fill="var(--bone-shade)"/>
        <rect x="5" y="3" width="90" height="88" rx="16" fill="var(--bone)" stroke="var(--edge)" stroke-width="4"/>
        <g transform="translate(0,-3)">${inner}</g></svg>`;
}
const diceHTML = (values, sides = 6) => `<span class="tg-dice">${values.map(v =>
    `<span class="tg-die d${sides}" data-sides="${sides}" data-v="${v}" title="${sides === 6 ? 'd6' : 'd' + sides}: ${v}"></span>`).join('')}</span>`;

// Draw every die inside root; animate = tumble and flicker before settling.
function hydrateDice(root, animate) {
    const dice = Array.from(root.querySelectorAll('.tg-die'));
    const paint = (el, v) => { el.innerHTML = d6Svg(v); };
    if (!animate || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        dice.forEach(el => paint(el, +el.dataset.v)); return;
    }
    dice.forEach(el => el.classList.add('rolling'));
    let ticks = 0;
    const t = setInterval(() => {
        dice.forEach(el => paint(el, d(6)));
        if (++ticks >= 6) {
            clearInterval(t);
            dice.forEach(el => { paint(el, +el.dataset.v); el.classList.remove('rolling'); });
        }
    }, 75);
}

/* =====================================================================
   3. GENERATE
   ===================================================================== */

const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 7);

function rollFragment(reveals) {
    const r = d(6);
    return Object.assign({ roll: r, reveals, found: false }, FRAGMENTS[r - 1]);
}

function generateChallenge(tierChoice, locked) {
    const free = ATTRS.filter(a => !locked.includes(a));
    if (!free.length) return { error: 'All three attributes are Locked, so there is no attribute left for a Challenge to test.' };

    let tier, tierRoll = null, tierHow;
    if (tierChoice === 'roll') { tierRoll = d(6); tier = tierFromD6(tierRoll); tierHow = 'rolled'; }
    else if (tierChoice === 'locked') { tier = Math.min(2, locked.length); tierHow = `${locked.length} Locked + 1`; }
    else { tier = +tierChoice; tierHow = 'chosen'; }

    // Attribute: reroll while it lands on a Locked attribute
    const attrRolls = [];
    let attr;
    do { const r = d(6); attrRolls.push(r); attr = attrFromD6(r); } while (locked.includes(attr));

    const trialRoll = d(6), siteRoll = d(6), omenRoll = d(6);
    const T = CHALLENGE_TIERS[tier];
    const fragments = [];
    for (let i = 0; i < T.fragments; i++) fragments.push(rollFragment(CHALLENGE_REVEALS[i]));
    return {
        id: uid(), kind: 'challenge', tier, tierRoll, tierHow,
        attr, attrRolls,
        trial: { roll: trialRoll, text: TRIALS[attr][trialRoll - 1] },
        site: { roll: siteRoll, text: SITES[siteRoll - 1] },
        fragments,
        omen: Object.assign({ roll: omenRoll }, CHALLENGE_OMENS[omenRoll - 1]),
        status: 'seeking', waited: 0, blight: null, log: []
    };
}

function generateOrdeal(tierChoice, forced) {
    let tier, tierRoll = null, tierHow;
    if (forced && forced.tier !== undefined) { tier = forced.tier; tierHow = forced.how; }
    else if (tierChoice === 'roll') { tierRoll = d(6); tier = tierFromD6(tierRoll); tierHow = 'rolled'; }
    else { tier = +tierChoice; tierHow = 'chosen'; }
    const T = ORDEAL_TIERS[tier];

    const placeRoll = d(6), troubleRoll = d(6);
    let cause;
    if (forced && forced.cause) cause = forced.cause;
    else {
        const causeRolls = [];
        let r;
        do { r = d(6); causeRolls.push(r); } while (r > CAUSES.length);   // reroll results with no entry
        cause = { rolls: causeRolls, text: CAUSES[r - 1] };
    }

    const tasks = [];
    for (let i = 0; i < T.tasks; i++) {
        const ar = [d(6)];
        tasks.push({ attrRolls: ar, attr: attrFromD6(ar[0]), roll: 0, text: '', state: 'open' });
    }
    // At least two attributes: reroll the final task's attribute until another appears
    if (tasks.every(t => t.attr === tasks[0].attr)) {
        const last = tasks[tasks.length - 1];
        let r;
        do { r = d(6); last.attrRolls.push(r); } while (attrFromD6(r) === tasks[0].attr);
        last.attr = attrFromD6(r);
        last.forcedAttr = true;
    }
    tasks.forEach(t => { t.roll = d(6); t.text = TASKS[t.attr][t.roll - 1]; });

    const fragments = tasks.map((t, i) => rollFragment(`Task ${i + 1}`));
    fragments.push(rollFragment('the Cause'));
    const omenRoll = d(6);
    return {
        id: uid(), kind: 'ordeal', tier, tierRoll, tierHow,
        place: { roll: placeRoll, text: PLACES[placeRoll - 1] },
        trouble: { roll: troubleRoll, text: TROUBLES[troubleRoll - 1] },
        cause, tasks, fragments,
        omen: { roll: omenRoll, text: ORDEAL_OMENS[omenRoll - 1] },
        status: 'seeking', waited: 0, blight: null, log: [], spreadFrom: forced ? forced.from : null
    };
}

/* =====================================================================
   4. LEDGER
   ===================================================================== */

const STORE_KEY = 'bf-trial-generator-v1';
let store = { ledger: [], hide: false, locked: [], tab: 'challenge' };
try { const raw = localStorage.getItem(STORE_KEY); if (raw) store = Object.assign(store, JSON.parse(raw)); } catch (e) { /* no storage */ }
const save = () => { try { localStorage.setItem(STORE_KEY, JSON.stringify(store)); } catch (e) { /* no storage */ } };

let preview = null;   // the most recent generated event, not yet kept

const find = id => (preview && preview.id === id ? preview : store.ledger.find(e => e.id === id));
const inLedger = ev => store.ledger.some(e => e.id === ev.id);
const prepared = ev => ev.fragments.every(f => f.found);
const log = (ev, text) => { ev.log.push(text); };

function title(ev) {
    if (ev.kind === 'challenge') return `${TIERS[ev.tier]} ${ev.attr} Challenge`;
    return `${TIERS[ev.tier]} Ordeal: ${ev.place.text}`;
}
// What a solo player may see: Challenge trial/site and Ordeal tasks/Cause are revealed by their Fragments.
function revealed(ev, key) {
    if (!store.hide) return true;
    if (ev.kind === 'challenge') return key === 'trial' ? ev.fragments[0].found : key === 'site' ? !!(ev.fragments[1] && ev.fragments[1].found) : true;
    if (key === 'cause') return ev.fragments[ev.fragments.length - 1].found;
    if (typeof key === 'number') return ev.fragments[key].found;
    return true;
}

function toggleFragment(ev, i, found) {
    ev.fragments[i].found = found;
    log(ev, `${found ? 'Found' : 'Unmarked'} Fragment ${i + 1} (${ev.fragments[i].type}).`);
    if (ev.status === 'seeking' && prepared(ev)) { ev.status = 'prepared'; ev.waited = 0; log(ev, 'All Fragments held: the event is Prepared and waits for its Omen.'); }
    else if (ev.status === 'prepared' && !prepared(ev)) { ev.status = 'seeking'; log(ev, 'No longer Prepared.'); }
}
function omenRoll(ev) {
    const r = d(6), total = r + ev.waited;
    if (total >= 6) {
        ev.status = 'begun';
        log(ev, `End of Watch Omen roll: d6 ${r}${ev.waited ? ` +${ev.waited} waited` : ''} = ${total}. The Omen arrives: ${omenLine(ev)}`);
    } else {
        log(ev, `End of Watch Omen roll: d6 ${r}${ev.waited ? ` +${ev.waited} waited` : ''} = ${total}. No Omen yet.`);
        ev.waited++;
    }
    return r;
}
function omenLine(ev) { return ev.kind === 'challenge' ? `${ev.omen.text} (begins: ${ev.omen.begins.toLowerCase()}).` : `${ev.omen.text}.`; }
function earlyOmen(ev) {
    if (prepared(ev)) { ev.status = 'begun'; log(ev, `An Omen arrives: ${omenLine(ev)}`); return; }
    const next = ev.fragments.find(f => !f.found);
    log(ev, `An Omen came before the event was Prepared. It reveals the next missing Fragment is ${/^[AEIOU]/.test(next.type) ? 'an' : 'a'} ${next.type}: ${next.desc} (gained by ${next.by}).`);
}
function rollBlight(ev) {
    const r = d(6);
    ev.blight = ev.kind === 'challenge'
        ? { roll: r, text: CHALLENGE_BLIGHTS[r - 1] }
        : { roll: r, text: ORDEAL_BLIGHTS[r <= 2 ? 0 : r <= 4 ? 1 : 2], spreads: r === 3 || r === 4 };
    log(ev, `Blight (d6 ${r}): ${ev.blight.text}.`);
}
function finish(ev, outcome) {
    ev.status = outcome;
    if (outcome === 'success') {
        if (ev.kind === 'challenge') {
            const T = CHALLENGE_TIERS[ev.tier];
            log(ev, `Success. ${ev.attr} is Locked; the ${T.sister} offers ${T.gift}.`);
            if (!store.locked.includes(ev.attr)) store.locked.push(ev.attr);
        } else log(ev, 'Success. The Trouble is resolved and the place is changed.');
    } else {
        log(ev, outcome === 'refused' ? 'The Challenge was refused.' : `The ${ev.kind === 'challenge' ? 'Challenge' : 'decisive check'} failed.`);
        rollBlight(ev);
    }
}

/* =====================================================================
   5. RENDER
   ===================================================================== */

const el = id => document.getElementById(id);
const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const STATUS = { seeking: 'Seeking Fragments', prepared: 'Prepared', begun: 'Begun', success: 'Succeeded', failed: 'Failed', refused: 'Refused' };
const hidden = what => `<span class="tg-hidden">Not yet revealed (${what})</span>`;

function step(label, dice, body) {
    return `<li class="tg-step"><div class="tg-step-label">${label}${dice || ''}</div><div>${body}</div></li>`;
}

function cardHTML(ev) {
    const kept = inLedger(ev);
    let h = `<article class="tg-card tg-kind-${ev.kind}" data-id="${ev.id}">
        <div class="tg-card-head"><h3>${esc(title(ev))}</h3>${kept ? `<span class="tg-status ${ev.status}">${STATUS[ev.status]}</span>` : ''}</div>`;
    h += ev.kind === 'challenge' ? challengeBody(ev) : ordealBody(ev);
    h += fragmentsHTML(ev, kept);
    if (kept) h += trackingHTML(ev);
    if (ev.blight) h += `<div class="tg-note bad"><strong>Blight</strong> ${diceHTML([ev.blight.roll])} ${esc(ev.blight.text)}.` +
        (ev.blight.spreads ? `<div class="tg-buttons"><button type="button" data-act="spread">Generate the spreading Ordeal</button></div>` : '') + `</div>`;
    h += `<div class="tg-buttons">` +
        (kept ? '' : `<button type="button" class="tg-primary" data-act="keep">Keep in Ledger</button>`) +
        `<button type="button" data-act="copy">Copy as Text</button>` +
        (kept ? `<button type="button" class="tg-danger" data-act="remove">Remove</button>` : '') +
        `<span class="tg-small tg-muted" data-copied></span></div>`;
    if (kept && ev.log.length) h += `<details class="tg-log"><summary>Event log (${ev.log.length})</summary><ol>${ev.log.map(l => `<li>${esc(l)}</li>`).join('')}</ol></details>`;
    return h + `</article>`;
}

function tierStep(ev) {
    const how = ev.tierRoll ? '' : ` <span class="tg-muted tg-small">(${esc(ev.tierHow)})</span>`;
    return step('Tier', ev.tierRoll ? diceHTML([ev.tierRoll]) : '', `<strong>${TIERS[ev.tier]}</strong>${how}`);
}

function challengeBody(ev) {
    const T = CHALLENGE_TIERS[ev.tier];
    let h = `<p class="tg-summary">Tests <strong>${ev.attr}</strong> against <strong>${T.bam}</strong>. Presented by the ${T.sister}; on success ${ev.attr} Locks and she offers ${T.gift}. Needs <strong>${T.fragments}</strong> Fragments.</p><ul class="tg-steps">`;
    h += tierStep(ev);
    h += step('Attribute', diceHTML(ev.attrRolls), `<strong>${ev.attr}</strong>${ev.attrRolls.length > 1 ? ' <span class="tg-muted tg-small">(rerolled past Locked attributes)</span>' : ''}`);
    h += step('Trial', revealed(ev, 'trial') ? diceHTML([ev.trial.roll]) : '', revealed(ev, 'trial') ? esc(ev.trial.text) : hidden('first Fragment'));
    h += step('Site', revealed(ev, 'site') ? diceHTML([ev.site.roll]) : '', revealed(ev, 'site') ? esc(ev.site.text) : hidden('second Fragment'));
    h += step('Omen', diceHTML([ev.omen.roll]), `${esc(ev.omen.text)}. <span class="tg-muted">Begins: ${esc(ev.omen.begins)}.</span>`);
    return h + `</ul>`;
}

function ordealBody(ev) {
    const T = ORDEAL_TIERS[ev.tier];
    const done = ev.tasks.filter(t => t.state === 'done').length;
    let h = `<p class="tg-summary">${esc(ev.place.text)} suffers <strong>${esc(ev.trouble.text.toLowerCase())}</strong>. Tasks are against <strong>${T.task}</strong>; the decisive check is <strong>${T.decisive}</strong>. Needs <strong>${ev.fragments.length}</strong> Fragments (one per task, plus the Cause).` +
        (ev.spreadFrom ? ` <em>This Ordeal spread from ${esc(ev.spreadFrom)}.</em>` : '') + `</p><ul class="tg-steps">`;
    h += tierStep(ev);
    h += step('Place', diceHTML([ev.place.roll]), esc(ev.place.text));
    h += step('Trouble', diceHTML([ev.trouble.roll]), esc(ev.trouble.text));
    const showCause = revealed(ev, 'cause');
    h += step('Cause', showCause && ev.cause.rolls ? diceHTML(ev.cause.rolls) : '',
        showCause ? esc(ev.cause.text) + (!ev.cause.rolls ? ' <span class="tg-muted tg-small">(carried from the original Ordeal)</span>' : ev.cause.rolls.length > 1 ? ' <span class="tg-muted tg-small">(6 rolled again)</span>' : '') : hidden('final Fragment'));
    h += step('Omen', diceHTML([ev.omen.roll]), `${esc(ev.omen.text)}. <span class="tg-muted">The Trouble breaks into the open.</span>`);
    h += `</ul><h4>Tasks</h4><ol class="tg-tasks">`;
    ev.tasks.forEach((t, i) => {
        const show = revealed(ev, i);
        h += `<li><div class="tg-task-body"><strong>Task ${i + 1}</strong> ` +
            (show ? `${diceHTML(t.attrRolls.concat([t.roll]))} <strong>${t.attr}:</strong> ${esc(t.text)}` +
                    (t.forcedAttr ? ' <span class="tg-muted tg-small">(attribute rerolled so the Ordeal uses at least two)</span>' : '')
                  : hidden(`Fragment ${i + 1}`)) + `</div>`;
        if (inLedger(ev) && ev.status === 'begun') {
            h += `<div class="tg-task-state" role="group" aria-label="Task ${i + 1} result">
                <button type="button" data-act="task" data-i="${i}" data-state="done" aria-pressed="${t.state === 'done'}">Completed</button>
                <button type="button" data-act="task" data-i="${i}" data-state="failed" aria-pressed="${t.state === 'failed'}">Failed</button></div>`;
        } else if (t.state !== 'open') h += `<span class="tg-small">${t.state === 'done' ? 'Completed' : 'Failed'}</span>`;
        h += `</li>`;
    });
    h += `</ol>`;
    if (inLedger(ev) && ev.status === 'begun') {
        const failed = ev.tasks.filter(t => t.state === 'failed').length;
        h += `<p class="tg-small">${done} completed task${done === 1 ? '' : 's'}, each granting Moderate Advantage on the decisive check (apply them under the normal Advantage and Disadvantage rules).` +
             (failed ? ` ${failed} failed task${failed === 1 ? '' : 's'}: ${failed === 1 ? 'its complication remains' : 'their complications remain'} in play.` : '') + `</p>`;
    }
    return h;
}

function fragmentsHTML(ev, kept) {
    let h = `<h4>Fragments</h4><ol class="tg-frags">`;
    ev.fragments.forEach((f, i) => {
        const canTick = kept && (ev.status === 'seeking' || ev.status === 'prepared');
        h += `<li>${kept ? `<input type="checkbox" data-act="frag" data-i="${i}" aria-label="Fragment ${i + 1} found"${f.found ? ' checked' : ''}${canTick ? '' : ' disabled'}>` : ''}
            ${diceHTML([f.roll])}
            <div class="tg-frag-body${f.found ? ' found' : ''}"><strong>${i + 1}. ${f.type}:</strong> ${f.desc}.
            <span class="tg-small">Gained by ${f.by}. Reveals ${f.reveals}.</span></div></li>`;
    });
    return h + `</ol>`;
}

function trackingHTML(ev) {
    let h = '<div class="tg-buttons">';
    if (ev.status === 'seeking') {
        const n = ev.fragments.filter(f => f.found).length;
        h += `<span class="tg-small">${n} of ${ev.fragments.length} Fragments found.</span>
              <button type="button" data-act="early">An Omen occurs</button>`;
    } else if (ev.status === 'prepared') {
        h += `<button type="button" class="tg-primary" data-act="watch">End of Watch: roll for the Omen</button>
              <button type="button" data-act="early">An Omen occurs now</button>
              <span class="tg-small">Roll 1d6 at the end of each Watch; a 6 brings the Omen. +1 per Watch waited (now +${ev.waited}).</span>`;
    } else if (ev.status === 'begun') {
        if (ev.kind === 'challenge') {
            h += `<span class="tg-small">The Challenge has begun: test ${ev.attr} against ${CHALLENGE_TIERS[ev.tier].bam}.</span>
                  <button type="button" data-act="success">Succeeded</button>
                  <button type="button" data-act="failed" class="tg-danger">Failed</button>
                  <button type="button" data-act="refused" class="tg-danger">Refused</button>`;
        } else {
            h += `<span class="tg-small">Decisive check against ${ORDEAL_TIERS[ev.tier].decisive}:</span>
                  <button type="button" data-act="success">Succeeded</button>
                  <button type="button" data-act="failed" class="tg-danger">Failed</button>`;
        }
    }
    h += '</div>';
    const last = ev.log[ev.log.length - 1];
    if (last && ev.status !== 'success' && ev.status !== 'failed' && ev.status !== 'refused') h += `<p class="tg-note">${esc(last)}</p>`;
    if (ev.status === 'success') {
        h += ev.kind === 'challenge'
            ? `<p class="tg-note"><strong>${ev.attr} is Locked.</strong> The ${CHALLENGE_TIERS[ev.tier].sister} offers ${CHALLENGE_TIERS[ev.tier].gift}.</p>`
            : `<p class="tg-note"><strong>The Trouble is resolved.</strong> Change the situation in the world and apply the Ordeal’s rewards and consequences. An Identity Mark may be deepened, reinterpreted or added.</p>`;
    }
    return h;
}

function fragmentCardHTML(f) {
    return `<article class="tg-card"><div class="tg-card-head"><h3>Fragment</h3></div>
        <ul class="tg-steps">${step('Type', diceHTML([f.roll]), `<strong>${f.type}:</strong> ${f.desc}.`)}
        ${step('Gained by', '', esc(f.by))}</ul>
        <p class="tg-small">Record it against one named Challenge or Ordeal. Fragments never transfer between events. If its event is unknown, a successful Lore check identifies it.</p></article>`;
}

function eventText(ev) {
    const L = [title(ev).toUpperCase()];
    if (ev.kind === 'challenge') {
        const T = CHALLENGE_TIERS[ev.tier];
        L.push(`Tests ${ev.attr} vs ${T.bam}. ${T.sister}: ${T.gift}. Fragments needed: ${T.fragments}.`);
        L.push(`Trial: ${revealed(ev, 'trial') ? ev.trial.text : '(not yet revealed)'}`);
        L.push(`Site: ${revealed(ev, 'site') ? ev.site.text : '(not yet revealed)'}`);
        L.push(`Omen: ${ev.omen.text}. Begins: ${ev.omen.begins}.`);
    } else {
        const T = ORDEAL_TIERS[ev.tier];
        L.push(`${ev.place.text}: ${ev.trouble.text}. Task BAM! ${T.task}; decisive BAM! ${T.decisive}. Fragments needed: ${ev.fragments.length}.`);
        L.push(`Cause: ${revealed(ev, 'cause') ? ev.cause.text : '(not yet revealed)'}`);
        ev.tasks.forEach((t, i) => L.push(`Task ${i + 1}: ${revealed(ev, i) ? `${t.attr}: ${t.text}` : '(not yet revealed)'}${t.state !== 'open' ? ` [${t.state === 'done' ? 'completed' : 'failed'}]` : ''}`));
        L.push(`Omen: ${ev.omen.text}.`);
    }
    L.push('Fragments:');
    ev.fragments.forEach((f, i) => L.push(`  ${f.found ? '[x]' : '[ ]'} ${i + 1}. ${f.type}: ${f.desc}. Gained by ${f.by}. Reveals ${f.reveals}.`));
    if (inLedger(ev)) L.push(`Status: ${STATUS[ev.status]}`);
    if (ev.blight) L.push(`Blight: ${ev.blight.text}.`);
    return L.join('\n');
}

function renderPreview(animate) {
    const box = el('tg-result');
    if (!preview) { box.innerHTML = ''; return; }
    box.innerHTML = preview.fragmentOnly ? fragmentCardHTML(preview.fragment) : cardHTML(preview);
    hydrateDice(box, animate);
}
function renderLedger(animateId) {
    const box = el('tg-ledger');
    el('tg-ledger-empty').hidden = store.ledger.length > 0;
    box.innerHTML = store.ledger.map(cardHTML).join('');
    hydrateDice(box, false);
    if (animateId) {
        const card = box.querySelector(`[data-id="${animateId}"] .tg-note.bad`);
        if (card) hydrateDice(card, true);
    }
}
function renderLocks() {
    document.querySelectorAll('[data-locked]').forEach(c => { c.checked = store.locked.includes(c.dataset.locked); });
}
function renderTab() {
    ['challenge', 'ordeal', 'fragment'].forEach(t => {
        el('tab-' + t).setAttribute('aria-selected', String(store.tab === t));
        el('panel-' + t).hidden = store.tab !== t;
    });
}

/* =====================================================================
   6. EVENTS
   ===================================================================== */

el('tg-hide').checked = store.hide;
el('tg-hide').addEventListener('change', e => { store.hide = e.target.checked; save(); renderPreview(); renderLedger(); });

['challenge', 'ordeal', 'fragment'].forEach(t => el('tab-' + t).addEventListener('click', () => { store.tab = t; save(); renderTab(); }));
el('tg-generate').querySelector('.tg-tabs').addEventListener('keydown', e => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    const tabs = ['challenge', 'ordeal', 'fragment'], i = tabs.indexOf(store.tab);
    store.tab = tabs[(i + (e.key === 'ArrowRight' ? 1 : 2)) % 3]; save(); renderTab(); el('tab-' + store.tab).focus();
});

document.querySelectorAll('[data-locked]').forEach(c => c.addEventListener('change', () => {
    store.locked = ATTRS.filter(a => document.querySelector(`[data-locked="${a}"]`).checked); save();
}));

el('tg-gen-challenge').addEventListener('click', () => {
    const ev = generateChallenge(el('tg-c-tier').value, store.locked);
    if (ev.error) { el('tg-result').innerHTML = `<p class="tg-note bad">${ev.error}</p>`; preview = null; return; }
    preview = ev; renderPreview(true);
});
el('tg-gen-ordeal').addEventListener('click', () => {
    preview = generateOrdeal(el('tg-o-tier').value); renderPreview(true);
});
el('tg-gen-fragment').addEventListener('click', () => {
    preview = { id: uid(), fragmentOnly: true, fragment: rollFragment('') }; renderPreview(true);
});

// One handler for every card button (preview and ledger)
document.querySelector('main').addEventListener('click', e => {
    const b = e.target.closest('[data-act]');
    if (!b || b.matches('input')) return;
    const card = b.closest('[data-id]');
    const ev = card && find(card.dataset.id);
    if (!ev) return;
    const act = b.dataset.act;
    let animate = false;
    switch (act) {
        case 'keep':
            store.ledger.unshift(ev); preview = null; log(ev, 'Kept in the Ledger.');
            break;
        case 'remove':
            if (!window.confirm(`Remove “${title(ev)}” from the Ledger?`)) return;
            store.ledger = store.ledger.filter(x => x.id !== ev.id);
            break;
        case 'copy': {
            const text = eventText(ev), note = card.querySelector('[data-copied]');
            const ok = () => { note.textContent = 'Copied.'; setTimeout(() => { note.textContent = ''; }, 2500); };
            if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(text).then(ok, () => fallbackCopy(text, ok, note));
            else fallbackCopy(text, ok, note);
            return;
        }
        case 'early': earlyOmen(ev); break;
        case 'watch': omenRoll(ev); break;
        case 'success': finish(ev, 'success'); renderLocks(); break;
        case 'failed': finish(ev, 'failed'); animate = true; break;
        case 'refused': finish(ev, 'refused'); animate = true; break;
        case 'task': {
            const t = ev.tasks[+b.dataset.i], s = b.dataset.state;
            t.state = t.state === s ? 'open' : s;
            if (t.state !== 'open') log(ev, `Task ${+b.dataset.i + 1} ${t.state === 'done' ? 'completed' : 'failed'}.`);
            break;
        }
        case 'spread': {
            const nt = Math.min(2, ev.tier + 1);
            preview = generateOrdeal(null, { tier: nt, how: ev.tier === 2 ? 'spread; already Major' : 'spread, one tier higher',
                                                   cause: { text: ev.cause.text }, from: ev.place.text.toLowerCase() });
            log(ev, 'The Cause spread to an adjacent hex as a new Ordeal.');
            save(); renderLedger(); renderPreview(true);
            el('tg-result').scrollIntoView({ behavior: 'smooth', block: 'start' });
            return;
        }
    }
    save(); renderPreview(); renderLedger(animate ? ev.id : null);
});
document.querySelector('main').addEventListener('change', e => {
    const c = e.target.closest('input[data-act="frag"]');
    if (!c) return;
    const ev = find(c.closest('[data-id]').dataset.id);
    toggleFragment(ev, +c.dataset.i, c.checked);
    save(); renderLedger();
});
function fallbackCopy(text, ok, note) {
    const ta = document.createElement('textarea');
    ta.value = text; ta.style.position = 'fixed'; ta.style.opacity = '0';
    document.body.appendChild(ta); ta.select();
    try { document.execCommand('copy'); ok(); } catch (e) { note.textContent = 'Copy failed.'; }
    ta.remove();
}

renderTab(); renderLocks(); renderLedger();
})();
