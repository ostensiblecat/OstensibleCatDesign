/* Bleak Forest Engine – Character Generator
   Needs the markup in character-generator.html and images/BFSigil-dice.png.

   How it is organised:
     1. RULES      – every table from the Character Rules. Edit here when the rules change.
     2. DICE       – fair rolls and the dice drawings (same look as the Dice Roller).
     3. STATE      – the character, saved in this browser (localStorage).
     4. STEPS      – rolling attributes, skills, gear, traits.
     5. ETBF       – Escape the Bleak Forest: Locks, Echoes, Death & Recursion.
     6. RENDER     – drawing each section and the character sheet.
     7. EVENTS     – wiring the buttons. */

(function () {
'use strict';

/* =====================================================================
   1. RULES
   ===================================================================== */

const ATTRS = ['Corpus', 'Anima', 'Spiritus'];

// Attribute modifiers, 3d6 range (Character Rules › Attributes)
const ATTR_TABLE = [
    [3, 4, -3, 'Terrible'], [5, 6, -2, 'Poor'], [7, 8, -1, 'Mediocre'], [9, 11, 0, 'Average'],
    [12, 13, 1, 'Good'], [14, 15, 2, 'Great'], [16, 17, 3, 'Excellent'], [18, 18, 4, 'Outstanding']
];

// Skills and their Focus areas. Each d6 table reads 1–2 → first, 3–4 → second, 5–6 → third.
const SKILLS = {
    Corpus: [
        { name: 'Athleticism', focus: ['Chain Reaction', 'Defensive Manoeuvres', 'Iron Will'] },
        { name: 'Combat',      focus: ['Martial Arts', 'Multiple Attacks', 'Quick Shot'] },
        { name: 'Endurance',   focus: ['Hardened', 'Recovery', 'Resilience'] }
    ],
    Anima: [
        { name: 'Guile', focus: ['Devoted Follower', 'Influence', 'Soul Bound'] },
        { name: 'Wiles', focus: ['Ambush', 'Evasion', 'Skulduggery'] },
        { name: 'Wits',  focus: ['Repair', 'Survival', 'Lore'] }
    ],
    Spiritus: [
        { name: 'Conjuration', focus: ['Binding', 'Exorcism', 'Summoning'] },
        { name: 'Mysticism',   focus: ['Mystic Channel', 'Healing', 'Psionics'] },
        { name: 'Occultism',   focus: ['Alchemy', 'Arcana', 'Sigilcraft'] }
    ]
};
const SKILL_RANKS = ['—', 'Apprentice (+1)', 'Skilled (+2)', 'Expert (+3)'];
const FOCUS_RANKS = ['—', 'Competent', 'Accomplished', 'Adept'];
const MAX_START_RANK = 3;          // no skill above Expert at creation
const OPTION1_FREE_POINTS = 3;     // after the rolled skills and Focus
const OPTION2_POINTS = 9;

// Starting kit: takes no backpack slots
const KIT = ['Simple clothing (worn)', 'Backpack', 'Provisions pouch (three days’ rations and water)',
             'Three torches (in provisions pouch)', 'Components pouch'];

// Weapon and armour stats (Character Rules › Weapons / Armour). Size: S small, R regular, B bulky.
const ITEMS = {
    'Club':              { kind: 'weapon', size: 'R', dmg: '1d6−1', thr: 'T2', dur: 2 },
    'Dart':              { kind: 'weapon', size: 'S', dmg: '1d3',   thr: 'T0', dur: 1 },
    'Knife':             { kind: 'weapon', size: 'S', dmg: '1d3',   thr: '—',  dur: 2 },
    'Sling':             { kind: 'weapon', size: 'S', dmg: '1d3',   thr: '—',  dur: 2 },
    'Staff':             { kind: 'weapon', size: 'B', dmg: '1d6−1', thr: '—',  dur: 2 },
    'Flail':             { kind: 'weapon', size: 'R', dmg: '1d3+2', thr: '—',  dur: 4 },
    'Battle Axe':        { kind: 'weapon', size: 'B', dmg: '1d6+2', thr: 'T2', dur: 4 },
    'Axe':               { kind: 'weapon', size: 'R', dmg: '1d6+1', thr: 'T0', dur: 3 },
    'Mace':              { kind: 'weapon', size: 'R', dmg: '1d6+1', thr: 'T1', dur: 4 },
    'Hammer':            { kind: 'weapon', size: 'R', dmg: '1d6',   thr: 'T1', dur: 3 },
    'Dagger':            { kind: 'weapon', size: 'S', dmg: '1d3+1', thr: 'T0', dur: 3 },
    'Spear':             { kind: 'weapon', size: 'B', dmg: '1d6+1', thr: 'T0', dur: 3 },
    'Sword, Short':      { kind: 'weapon', size: 'R', dmg: '1d6',   thr: 'T2', dur: 3 },
    'Sword, Long':       { kind: 'weapon', size: 'R', dmg: '1d6+1', thr: '—',  dur: 4 },
    'Sword, Two-handed': { kind: 'weapon', size: 'B', dmg: '1d6+2', thr: '—',  dur: 4 },
    'Bow, Long':         { kind: 'weapon', size: 'B', dmg: '1d6+1', thr: '—',  dur: 2 },
    'Crossbow, Hand':    { kind: 'weapon', size: 'R', dmg: '1d6',   thr: '—',  dur: 2 },
    'Javelin':           { kind: 'weapon', size: 'R', dmg: '1d6',   thr: 'T0', dur: 3 },
    'Crossbow, Heavy':   { kind: 'weapon', size: 'B', dmg: '1d6+1', thr: '—',  dur: 3 },
    'Arming Doublet':    { kind: 'armour', size: 'R', ar: 1, dur: 2 },
    'Leather':           { kind: 'armour', size: 'R', ar: 1, dur: 2 },
    'Studded Leather':   { kind: 'armour', size: 'R', ar: 2, dur: 3 },
    'Lamellar':          { kind: 'armour', size: 'R', ar: 2, dur: 3 },
    'Chainmail':         { kind: 'armour', size: 'R', ar: 2, dur: 3 }
};
const SIZE_SLOTS = { S: 1, R: 1, B: 2 };   // a lone small item still needs a slot of its own

// Starting tables: [low, high, result]
const SIMPLE_WEAPONS = { die: '1d20', rows: [[1, 4, 'Club'], [5, 8, 'Dart'], [9, 12, 'Knife'], [13, 16, 'Sling'], [17, 20, 'Staff']] };
const MARTIAL_WEAPONS = { die: '2d6', rows: [[2, 2, 'Flail'], [3, 3, 'Battle Axe'], [4, 4, 'Axe'], [5, 5, 'Mace'], [6, 6, 'Hammer'],
    [7, 8, 'Dagger'], [9, 9, 'Spear'], [10, 10, 'Sword, Short'], [11, 11, 'Sword, Long'], [12, 12, 'Sword, Two-handed']] };
const RANGED_WEAPONS = { die: '1d6', rows: [[1, 1, 'Bow, Long'], [2, 3, 'Crossbow, Hand'], [4, 5, 'Javelin'], [6, 6, 'Crossbow, Heavy']] };
const STARTING_ARMOUR = { die: '2d6', rows: [[2, 7, null], [8, 8, 'Arming Doublet'], [9, 9, 'Leather'], [10, 10, 'Studded Leather'],
    [11, 11, 'Lamellar'], [12, 12, 'Chainmail']] };

// Gear that comes with a skill or Focus (1 slot each)
const SKILL_GEAR = [
    { needs: 'Conjuration', item: 'Codex', note: 'True Names for Conjuration' },
    { needs: 'Occultism',   item: 'Grimoire', note: 'base sigils, cantrips and formulae' },
    { needs: 'Alchemy',     item: 'Alchemist’s kit', note: 'for crafting alchemical items' },
    { needs: 'Repair',      item: 'Armourer’s tools', note: 'for repair and maintenance' }
];
const TRUE_NAMES = ['Brownie', 'Fairy', 'Goblin', 'Imp', 'Skeleton', 'Zombie'];   // d6, Codex starting Nominal True Name

const COMPLICATIONS = [
    { name: 'Apathy',    quote: 'Why does this matter?', trigger: 'Abandon a task mid-execution. For 1 Watch, take no proactive actions.', resisted: 'Minor Advantage on your next Spiritus save.' },
    { name: 'Grief',     quote: 'This loss is not survivable.', trigger: 'Spend 1 Watch immobile with grief. You cannot rest during it.', resisted: 'Minor Advantage on your next Anima save.' },
    { name: 'Distrust',  quote: 'They will only let me down.', trigger: 'Refuse help, gear or healing offered by an ally this Watch.', resisted: 'Minor Advantage on your next check made alongside an ally.' },
    { name: 'Arrogance', quote: 'They wouldn’t understand.', trigger: 'Dismiss the need of one NPC or group. They become Wary toward you.', resisted: 'Moderate Advantage on your next check to restore a creature’s disposition.' },
    { name: 'Wrath',     quote: 'There was no other way.', trigger: 'Start or escalate violence where a peaceful resolution was available.', resisted: 'Minor Advantage on your next Guile check.' },
    { name: 'Greed',     quote: 'No one will miss it.', trigger: 'Take something you should leave. Someone notices, and their disposition drops one step.', resisted: 'Minor Advantage on your next save against temptation or a bribe.' }
];
const COMPLICATION_RULE = 'When activated, make a Spiritus save vs. Difficult (16) or act on the trigger before the Watch ends.';
const DRIVES = [
    { name: 'Vengeance',  text: 'Someone wronged you, and they will answer for it.' },
    { name: 'Redemption', text: 'You did something unforgivable and mean to earn forgiveness anyway.' },
    { name: 'Protection', text: 'Someone depends on you surviving.' },
    { name: 'Knowledge',  text: 'There is a truth you must uncover, whatever it costs.' },
    { name: 'Freedom',    text: 'You will not be bound by debt, oath or chain again.' },
    { name: 'Homecoming', text: 'Somewhere, someone is waiting for you to return.' }
];
const DRIVE_RULE = 'Once per Watch, when you act directly in pursuit of it, gain Minor Advantage on that check.';

// Escape the Bleak Forest
const ECHO_MAX = 3;
const ECHO_LIFETIME = 2;   // an Echo that survives two Recursions unspent is lost

/* =====================================================================
   2. DICE
   ===================================================================== */

const SIGIL_SRC = 'images/BFSigil-dice.png';
const SIGIL_MASK_ID = 'cg-sigil-mask';

function d(sides) {
    const buf = new Uint32Array(1), limit = Math.floor(0x100000000 / sides) * sides;
    do { crypto.getRandomValues(buf); } while (buf[0] >= limit);
    return (buf[0] % sides) + 1;
}
const pick = (table, n) => table.rows.find(r => n >= r[0] && n <= r[1])[2];
const third = n => (n <= 2 ? 0 : n <= 4 ? 1 : 2);       // d6 → table row 0/1/2

let sigilOK = false;
const probe = new Image();
probe.onload = () => { sigilOK = true; };
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
        : PIPS[v].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="${v === 1 ? 10 : 8}" fill="var(--ink)"/>`).join('');
    return `<svg viewBox="0 0 100 100" aria-hidden="true">
        <rect x="5" y="9" width="90" height="88" rx="16" fill="var(--bone-shade)"/>
        <rect x="5" y="3" width="90" height="88" rx="16" fill="var(--bone)" stroke="var(--edge)" stroke-width="3"/>
        <g transform="translate(0,-3)">${inner}</g></svg>`;
}
function d20Svg(v) {
    const facets = [['50,2 93,26 50,22', .10], ['50,2 7,26 50,22', .04], ['93,26 81,72 50,22', .16], ['7,26 19,72 50,22', .12],
        ['93,26 93,74 81,72', .24], ['7,26 7,74 19,72', .20], ['93,74 50,98 81,72', .30], ['7,74 50,98 19,72', .27], ['19,72 81,72 50,98', .22]]
        .map(([p, a]) => `<polygon points="${p}" fill="#000" fill-opacity="${a}"/>`).join('');
    const inner = (v === 1 && sigilOK) ? sigil(27, 25, 46)
        : `<text x="50" y="62" text-anchor="middle" font-size="${v > 9 ? 22 : 25}" font-weight="bold" font-family="Georgia, serif" fill="var(--ink)">${v}</text>`;
    return `<svg viewBox="0 0 100 100" aria-hidden="true">
        <polygon points="50,2 93,26 93,74 50,98 7,74 7,26" fill="var(--bone)"/>${facets}
        <polygon points="50,22 81,72 19,72" fill="var(--bone)" stroke="var(--edge)" stroke-width="1.5"/>
        <polygon points="50,2 93,26 93,74 50,98 7,74 7,26" fill="none" stroke="var(--edge)" stroke-width="3" stroke-linejoin="round"/>
        ${inner}</svg>`;
}

const reduceMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* Show dice tumbling in `container`, then settle on the final values.
   groups: [{ label, sides, values: [..] }]. Calls done() when finished. */
function showDice(container, groups, done) {
    container.innerHTML = '';
    const dice = [];
    groups.forEach(g => {
        if (g.label) {
            const l = document.createElement('span');
            l.className = 'cg-dice-label'; l.textContent = g.label;
            container.appendChild(l);
        }
        g.values.forEach(v => {
            const el = document.createElement('div');
            el.className = `cg-die d${g.sides} rolling`;
            container.appendChild(el);
            dice.push({ el, sides: g.sides, v });
        });
    });
    const paint = (x, v) => { x.el.innerHTML = x.sides === 20 ? d20Svg(v) : d6Svg(v); };
    const settle = () => {
        dice.forEach(x => {
            paint(x, x.v);
            x.el.classList.remove('rolling');
            if (x.v === 1) x.el.classList.add('nat-one');
            if (x.v === x.sides) x.el.classList.add('nat-max');
        });
        if (done) done();
    };
    if (reduceMotion()) { settle(); return; }
    let ticks = 0;
    const t = setInterval(() => {
        dice.forEach(x => paint(x, d(x.sides)));
        if (++ticks >= 7) { clearInterval(t); settle(); }
    }, 75);
}

/* =====================================================================
   3. STATE
   ===================================================================== */

const STORE_KEY = 'bf-character-generator-v1';

function blankRanks() {
    const r = { skill: {}, focus: {} };
    ATTRS.forEach(a => SKILLS[a].forEach(s => { r.skill[s.name] = 0; s.focus.forEach(f => { r.focus[f] = 0; }); }));
    return r;
}
function newState() {
    return {
        mode: 'general', name: '',
        attrs: null,                                       // { Corpus: { dice:[..], score }, ... }
        locked: { Corpus: false, Anima: false, Spiritus: false },
        method: '1',
        rolled: null,                                      // Option 1: { Corpus: { sd, skill, fd, focus, kept }, ... }
        ranks: blankRanks(),
        gear: null,                                        // see rollGear()
        complication: null, drive: null,
        etbf: { life: 1, echoes: [], marks: '', log: [], keptItem: null }
    };
}
let S = load() || newState();

function load() {
    try {
        const raw = localStorage.getItem(STORE_KEY);
        if (!raw) return null;
        const s = JSON.parse(raw);
        const base = newState();
        return Object.assign(base, s, { ranks: Object.assign(blankRanks(), s.ranks || {}), etbf: Object.assign(base.etbf, s.etbf || {}) });
    } catch (e) { return null; }
}
function save() { try { localStorage.setItem(STORE_KEY, JSON.stringify(S)); } catch (e) { /* storage unavailable: keep working */ } }

/* =====================================================================
   4. STEPS
   ===================================================================== */

const modOf = score => { const r = ATTR_TABLE.find(t => score >= t[0] && score <= t[1]); return r ? r[2] : 0; };
const descOf = score => { const r = ATTR_TABLE.find(t => score >= t[0] && score <= t[1]); return r ? r[3] : ''; };
const signed = n => (n >= 0 ? '+' : '−') + Math.abs(n);
const mod = a => (S.attrs && S.attrs[a] ? modOf(S.attrs[a].score) : 0);
const modTotal = () => ATTRS.reduce((t, a) => t + mod(a), 0);

// ---- Attributes ----
// Rolls every attribute that isn't Locked. Returns the names that were rolled (for the dice animation).
function rollAttributes() {
    const prev = S.attrs || {};
    const next = {}, groups = [];
    ATTRS.forEach(a => {
        if (S.mode === 'etbf' && S.locked[a] && prev[a]) { next[a] = prev[a]; return; }   // Locked attributes never change
        const dice = [d(6), d(6), d(6)];
        next[a] = { dice, score: dice[0] + dice[1] + dice[2] };
        groups.push(a);
    });
    S.attrs = next;
    save();
    return groups;
}

// ---- Skills ----
function skillOf(focusName) {
    for (const a of ATTRS) for (const s of SKILLS[a]) if (s.focus.includes(focusName)) return s.name;
    return null;
}
function rollSkills(keep) {
    // Option 1: one skill and one Focus per attribute, both at their first rank.
    S.rolled = {};
    ATTRS.forEach(a => {
        if (keep && keep.attr === a) { S.rolled[a] = Object.assign({}, keep.result, { kept: true }); return; }
        const sd = d(6), s = SKILLS[a][third(sd)];
        const fd = d(6), f = s.focus[third(fd)];
        S.rolled[a] = { sd, skill: s.name, fd, focus: f };
    });
    resetRanksToFloors();
    save();
}
function floors() {
    const f = blankRanks();
    if (S.method === '1' && S.rolled) ATTRS.forEach(a => {
        const r = S.rolled[a]; if (!r) return;
        f.skill[r.skill] = 1; f.focus[r.focus] = 1;
    });
    return f;
}
function resetRanksToFloors() { S.ranks = floors(); }
function budget() { return S.method === '1' ? OPTION1_FREE_POINTS : OPTION2_POINTS; }
function spent() {
    const f = floors();
    let n = 0;
    Object.keys(S.ranks.skill).forEach(k => { n += S.ranks.skill[k] - f.skill[k]; });
    Object.keys(S.ranks.focus).forEach(k => { n += S.ranks.focus[k] - f.focus[k]; });
    return n;
}
function canChange(kind, name, delta) {
    const f = floors(), r = S.ranks;
    if (S.method === '1' && !S.rolled) return false;           // roll first
    if (delta > 0) {
        if (spent() >= budget()) return false;
        if (kind === 'skill') return r.skill[name] < MAX_START_RANK;
        return r.focus[name] < r.skill[skillOf(name)];          // Focus can't pass its skill
    }
    if (kind === 'skill') {
        if (r.skill[name] <= f.skill[name]) return false;
        const sk = ATTRS.flatMap(a => SKILLS[a]).find(s => s.name === name);
        return sk.focus.every(fc => r.focus[fc] <= r.skill[name] - 1);   // would strand a Focus
    }
    return r.focus[name] > f.focus[name];
}
function changeRank(kind, name, delta) {
    if (!canChange(kind, name, delta)) return;
    S.ranks[kind][name] += delta;
    save(); renderSkills(); renderGear(); renderSheet();
}
const hasSkill = n => (S.ranks.skill[n] || 0) > 0 || (S.ranks.focus[n] || 0) > 0;

// ---- Gear ----
function rollGear() {
    const g = { simple: null, armour: null, type: null, martial: null, ranged: null, trueName: null, combat: hasSkill('Combat') };
    const groups = [];
    const sw = d(20); g.simple = { roll: sw, item: pick(SIMPLE_WEAPONS, sw) };
    groups.push({ label: 'Simple', sides: 20, values: [sw] });
    if (g.combat) {
        const a = [d(6), d(6)]; g.armour = { dice: a, item: pick(STARTING_ARMOUR, a[0] + a[1]) };
        groups.push({ label: 'Armour', sides: 6, values: a });
        const t = d(6); g.type = t;
        groups.push({ label: 'Martial / Ranged', sides: 6, values: [t] });
        if (t <= 3 || t === 6) {
            const m = [d(6), d(6)]; g.martial = { dice: m, item: pick(MARTIAL_WEAPONS, m[0] + m[1]) };
            groups.push({ label: 'Martial', sides: 6, values: m });
        }
        if (t >= 4) {
            const r = d(6); g.ranged = { roll: r, item: pick(RANGED_WEAPONS, r) };
            groups.push({ label: 'Ranged', sides: 6, values: [r] });
        }
    }
    const tn = d(6); g.trueName = { roll: tn, name: TRUE_NAMES[tn - 1] };
    S.gear = g;
    save();
    return groups;
}
function gearItems() {
    // Everything that uses backpack slots: [{ name, detail, slots, source }]
    const out = [];
    const add = (name, source) => {
        const it = ITEMS[name];
        const detail = it.kind === 'weapon'
            ? `${it.dmg} damage · size ${it.size} · throw ${it.thr} · durability ${it.dur}`
            : `Armour ${signed(it.ar)} · size ${it.size} · durability ${it.dur}`;
        out.push({ name, detail, slots: SIZE_SLOTS[it.size], source });
    };
    if (S.gear) {
        add(S.gear.simple.item, 'Simple weapon');
        if (S.gear.martial) add(S.gear.martial.item, 'Martial weapon');
        if (S.gear.ranged) add(S.gear.ranged.item, 'Ranged weapon');
        if (S.gear.armour && S.gear.armour.item) add(S.gear.armour.item, 'Armour');
    }
    SKILL_GEAR.forEach(sg => {
        if (!hasSkill(sg.needs)) return;
        let detail = sg.note;
        if (sg.item === 'Codex' && S.gear && S.gear.trueName) detail += `; holds the Nominal True Name of: ${S.gear.trueName.name}`;
        out.push({ name: sg.item, detail, slots: 1, source: sg.needs });
    });
    if (S.mode === 'etbf' && S.etbf.keptItem) {
        const k = S.etbf.keptItem;
        out.push({ name: k.name, detail: (k.detail ? k.detail + ' · ' : '') + 'kept through Recursion with an Echo', slots: k.slots || 1, source: 'Echo' });
    }
    return out;
}
const slotsTotal = () => 10 + mod('Corpus');

// ---- Traits ----
function rollComplication() { S.complication = d(6) - 1; save(); }
function rollDrive() { S.drive = d(6) - 1; save(); }

/* =====================================================================
   5. ESCAPE THE BLEAK FOREST
   ===================================================================== */

// Echoes are stored as the life number in which each was gained; age = current life − that number.
const echoCount = () => S.etbf.echoes.length;
function spendEchoes(n, reason) {
    if (echoCount() < n) return false;
    S.etbf.echoes.sort((a, b) => a - b).splice(0, n);    // spend the oldest first
    S.etbf.log.push(`Life ${S.etbf.life}: spent ${n} Echo${n > 1 ? 'es' : ''}: ${reason}.`);
    save();
    return true;
}
function echoesAfterDeath() {
    // What the Echo bank will hold at the start of the next life.
    const next = S.etbf.life + 1;
    const kept = S.etbf.echoes.filter(born => next - born < ECHO_LIFETIME);
    const lost = S.etbf.echoes.length - kept.length;
    const gained = kept.length < ECHO_MAX ? 1 : 0;
    if (gained) kept.push(next);
    return { next, echoes: kept, lost, gained };
}

function openRecursion() {
    const box = el('cg-recursion');
    const preview = echoesAfterDeath();
    const items = gearItems();
    const canKeepSkill = S.method === '1' && S.rolled;
    let html = `<p><strong>The Nameless dies.</strong> Life ${S.etbf.life} ends.</p>
        <p>You gain ${preview.gained ? '1 Echo' : 'no Echo (you already hold 3)'}${preview.lost ? `, and ${preview.lost} unspent Echo${preview.lost > 1 ? 'es fade' : ' fades'}` : ''}.
        You will begin life ${preview.next} with <strong>${preview.echoes.length}</strong> Echo${preview.echoes.length === 1 ? '' : 'es'}.</p>
        <p>Spend Echoes now (first Watch of the new life):</p>`;
    if (canKeepSkill) {
        html += `<label><input type="checkbox" id="cg-r-skill"> Spend 1 Echo: keep one rolled starting skill result</label>
            <select id="cg-r-skill-pick">${ATTRS.map(a => `<option value="${a}">${a}: ${S.rolled[a].skill} / ${S.rolled[a].focus}</option>`).join('')}</select>`;
    } else {
        html += `<p class="cg-muted cg-small">Keeping a rolled skill result needs Option 1 skills.</p>`;
    }
    if (items.length) {
        html += `<label><input type="checkbox" id="cg-r-item"> Spend 1 Echo: retain one item from starting gear or loot</label>
            <select id="cg-r-item-pick">${items.map((it, i) => `<option value="${i}">${esc(it.name)}</option>`).join('')}</select>`;
    }
    html += `<p class="cg-small cg-muted">Unlocked attributes are rolled again. Locked attributes, Identity Marks, Complication and Drive carry over.</p>
        <div class="cg-buttons"><button type="button" id="cg-r-go" class="cg-primary">Begin Life ${preview.next}</button>
        <button type="button" id="cg-r-cancel">Cancel</button></div>`;
    box.innerHTML = html;
    box.hidden = false;
    const updateLimits = () => {
        const n = preview.echoes.length;
        const sk = el('cg-r-skill'), it = el('cg-r-item');
        const used = (sk && sk.checked ? 1 : 0) + (it && it.checked ? 1 : 0);
        if (sk) sk.disabled = !sk.checked && used >= n;
        if (it) it.disabled = !it.checked && used >= n;
    };
    box.querySelectorAll('input[type=checkbox]').forEach(c => c.addEventListener('change', updateLimits));
    updateLimits();
    el('cg-r-cancel').onclick = () => { box.hidden = true; };
    el('cg-r-go').onclick = () => {
        const keepSkill = el('cg-r-skill') && el('cg-r-skill').checked ? el('cg-r-skill-pick').value : null;
        const keepItemIdx = el('cg-r-item') && el('cg-r-item').checked ? +el('cg-r-item-pick').value : null;
        const keptItem = keepItemIdx !== null ? items[keepItemIdx] : null;
        box.hidden = true;
        recurse(preview, keepSkill, keptItem);
    };
}

function recurse(preview, keepSkillAttr, keptItem) {
    const E = S.etbf, oldLife = E.life;
    E.log.push(`Life ${oldLife} ended.` + (preview.lost ? ` ${preview.lost} unspent Echo${preview.lost > 1 ? 'es' : ''} faded.` : '') +
               (preview.gained ? ' Gained 1 Echo.' : ''));
    E.life = preview.next;
    E.echoes = preview.echoes;
    const keep = keepSkillAttr ? { attr: keepSkillAttr, result: S.rolled[keepSkillAttr] } : null;
    if (keep) spendEchoes(1, `kept ${keep.result.skill} / ${keep.result.focus}`);
    E.keptItem = null;
    if (keptItem) { spendEchoes(1, `retained ${keptItem.name}`); E.keptItem = { name: keptItem.name, detail: keptItem.detail, slots: keptItem.slots }; }

    // New life: attributes (locked stay), skills, gear
    const fresh = rollAttributes();
    if (S.method === '1') rollSkills(keep); else S.ranks = blankRanks();
    const gearGroups = rollGear();
    E.log.push(`Life ${E.life} began: ` + ATTRS.map(a => `${a} ${S.attrs[a].score}${S.locked[a] ? ' (locked)' : ''}`).join(', ') + '.');
    save();
    renderAll();
    renderAttributes(fresh);
    if (S.method === '1') renderSkills(true);
    showDice(el('cg-gear-dice'), gearGroups);
    el('cg-step-attributes').scrollIntoView({ behavior: reduceMotion() ? 'auto' : 'smooth' });
}

/* =====================================================================
   6. RENDER
   ===================================================================== */

const el = id => document.getElementById(id);
const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

function renderMode() {
    document.querySelectorAll('input[name=mode]').forEach(r => { r.checked = r.value === S.mode; });
    document.querySelectorAll('input[name=method]').forEach(r => { r.checked = r.value === S.method; });
    const etbf = S.mode === 'etbf';
    el('cg-etbf').hidden = !etbf;
    el('cg-name-label').textContent = etbf ? 'True name (leave blank while Nameless)' : 'Name';
    el('cg-name').placeholder = etbf ? 'The Nameless' : 'Your character’s name';
    el('cg-name').value = S.name;
    if (etbf) {
        el('cg-life').textContent = S.etbf.life;
        el('cg-echo-count').textContent = echoCount();
        const ages = S.etbf.echoes.map(b => S.etbf.life - b);
        el('cg-echo-detail').textContent = ages.some(a => a >= ECHO_LIFETIME - 1) ? '(one fades if unspent at the next Recursion)' : '';
        el('cg-lock-count').textContent = ATTRS.filter(a => S.locked[a]).length;
        el('cg-marks').value = S.etbf.marks;
        el('cg-spend-learned').disabled = echoCount() < 2;
        el('cg-spend-vow').disabled = echoCount() < 3;
        el('cg-death').disabled = !S.attrs;
        el('cg-log').innerHTML = S.etbf.log.map(l => `<li>${esc(l)}</li>`).join('') || '<li class="cg-muted">No deaths yet.</li>';
    }
}

function renderAttributes(animate) {
    const box = el('cg-attrs');
    if (!S.attrs) { box.innerHTML = ''; el('cg-attr-note').innerHTML = ''; return; }
    box.innerHTML = ATTRS.map(a => {
        const at = S.attrs[a], m = modOf(at.score), locked = S.mode === 'etbf' && S.locked[a];
        return `<div class="cg-attr-card${locked ? ' locked' : ''}">
            <h3>${a}</h3>
            <div class="cg-dice-row" id="cg-attr-dice-${a}"></div>
            <div class="cg-attr-score">${at.score}</div>
            <div class="cg-attr-mod">Modifier ${signed(m)} · ${descOf(at.score)}</div>
            ${S.mode === 'etbf' ? `<label class="cg-lock"><input type="checkbox" data-lock="${a}"${S.locked[a] ? ' checked' : ''}> Locked by a Challenge</label>` : ''}
        </div>`;
    }).join('');
    ATTRS.forEach(a => {
        const row = el('cg-attr-dice-' + a);
        const groups = [{ sides: 6, values: S.attrs[a].dice }];
        if (animate && animate.includes(a)) showDice(row, groups);
        else { showDiceStatic(row, groups); }
    });
    const total = modTotal();
    el('cg-attr-note').innerHTML = total <= 0
        ? `<div class="callout">Your modifiers total ${signed(total)}. The rules let you roll again when they total zero or lower.
           <div class="cg-buttons"><button type="button" id="cg-reroll-attrs" class="cg-primary">Roll Again</button></div></div>`
        : `<p class="cg-muted">Modifiers total ${signed(total)}.</p>`;
    const rr = el('cg-reroll-attrs');
    if (rr) rr.onclick = () => { const fresh = rollAttributes(); renderAttributes(fresh); afterAttributes(); };
}
function showDiceStatic(container, groups) {
    container.innerHTML = '';
    groups.forEach(g => g.values.forEach(v => {
        const x = document.createElement('div');
        x.className = `cg-die d${g.sides}` + (v === 1 ? ' nat-one' : v === g.sides ? ' nat-max' : '');
        x.innerHTML = g.sides === 20 ? d20Svg(v) : d6Svg(v);
        container.appendChild(x);
    }));
}

function renderDerived() {
    const box = el('cg-derived');
    if (!S.attrs) { box.innerHTML = '<p class="cg-muted">Roll attributes first.</p>'; return; }
    const base = 12, mods = ATTRS.map(a => mod(a)), raw = base + mods.reduce((t, m) => t + m, 0);
    const vit = Math.max(1, Math.min(24, raw));
    const cm = mod('Corpus');
    box.innerHTML = `<div class="cg-derived-grid">
        <div class="cg-stat"><span class="cg-label">Vitality</span><strong>${vit}</strong>
            <span class="cg-small">12 ${ATTRS.map((a, i) => `${signed(mods[i])} ${a}`).join(' ')}${raw !== vit ? ` (kept within 1–24)` : ''}</span></div>
        <div class="cg-stat"><span class="cg-label">Inventory slots</span><strong>${slotsTotal()}</strong>
            <span class="cg-small">10 ${signed(cm)} Corpus</span></div>
        <div class="cg-stat"><span class="cg-label">Fatigue Ceiling</span><strong>${Math.max(2, 2 * cm)}</strong>
            <span class="cg-small">twice Corpus modifier, minimum 2</span></div>
    </div>`;
}
const vitality = () => Math.max(1, Math.min(24, 12 + modTotal()));

function renderSkills(animateRolls) {
    const opt1 = S.method === '1';
    el('cg-skill-roll-wrap').hidden = !opt1;
    const rolls = el('cg-skill-rolls');
    if (opt1 && S.rolled) {
        rolls.innerHTML = ATTRS.map(a => {
            const r = S.rolled[a];
            return `<div class="cg-skill-roll"><strong>${a}</strong>${r.kept ? ' <span class="cg-granted">(kept with an Echo)</span>' : ''}
                <div class="cg-dice-row" id="cg-skill-dice-${a}"></div>
                ${r.skill} at Apprentice · ${r.focus} at Competent</div>`;
        }).join('');
        ATTRS.forEach(a => {
            const r = S.rolled[a], row = el('cg-skill-dice-' + a), groups = [{ sides: 6, values: [r.sd, r.fd] }];
            if (animateRolls && !r.kept) showDice(row, groups); else showDiceStatic(row, groups);
        });
    } else rolls.innerHTML = '';

    const left = budget() - spent();
    const p = el('cg-points');
    if (opt1 && !S.rolled) { p.textContent = 'Roll skills to begin.'; p.className = 'cg-points'; }
    else {
        p.textContent = `${left} of ${budget()} ${opt1 ? 'extra ' : ''}point${budget() === 1 ? '' : 's'} left to spend`;
        p.className = 'cg-points' + (left === 0 ? ' done' : '');
    }
    const f = floors();
    el('cg-skill-grid').innerHTML = ATTRS.map(a => `<div class="cg-skill-group"><h3>${a}</h3>` +
        SKILLS[a].map(s => {
            const sr = S.ranks.skill[s.name];
            return `<div class="cg-skill">` + rankRow('skill', s.name, sr, SKILL_RANKS[sr], f.skill[s.name]) +
                s.focus.map(fc => rankRow('focus', fc, S.ranks.focus[fc], FOCUS_RANKS[S.ranks.focus[fc]], f.focus[fc])).join('') + `</div>`;
        }).join('') + `</div>`).join('');
}
function rankRow(kind, name, rank, label, floor) {
    return `<div class="cg-rank-row ${kind}${rank ? ' has-rank' : ''}">
        <span class="cg-rank-name">${kind === 'focus' ? 'Focus: ' : ''}${name}${floor ? '<span class="cg-granted">rolled</span>' : ''}</span>
        <button type="button" data-rank="${kind}" data-name="${name}" data-delta="-1" aria-label="Lower ${name}"${canChange(kind, name, -1) ? '' : ' disabled'}>−</button>
        <span class="cg-rank-value">${label}</span>
        <button type="button" data-rank="${kind}" data-name="${name}" data-delta="1" aria-label="Raise ${name}"${canChange(kind, name, 1) ? '' : ' disabled'}>+</button>
    </div>`;
}

function renderGear() {
    const box = el('cg-gear');
    const items = gearItems();
    const used = items.reduce((t, i) => t + i.slots, 0);
    let html = `<h3>Kit</h3><ul class="cg-gear-list">${KIT.map(k => `<li>${k}</li>`).join('')}</ul>`;
    if (S.gear) {
        const g = S.gear;
        const rolls = [`Simple weapon (d20 ${g.simple.roll}): <strong>${g.simple.item}</strong>`];
        if (g.combat) {
            rolls.push(`Armour (2d6 ${g.armour.dice[0] + g.armour.dice[1]}): <strong>${g.armour.item || 'None'}</strong>`);
            rolls.push(`Martial or ranged (d6 ${g.type}): ${g.type <= 3 ? 'Martial' : g.type <= 5 ? 'Ranged' : 'both'}`);
            if (g.martial) rolls.push(`Martial weapon (2d6 ${g.martial.dice[0] + g.martial.dice[1]}): <strong>${g.martial.item}</strong>`);
            if (g.ranged) rolls.push(`Ranged weapon (d6 ${g.ranged.roll}): <strong>${g.ranged.item}</strong>`);
        } else rolls.push('<span class="cg-muted">No Combat skill when rolled, so no armour or martial/ranged roll.</span>');
        if (g.combat !== hasSkill('Combat')) rolls.push('<em>Your Combat skill has changed since you rolled. Roll gear again to match.</em>');
        html += `<h3>Rolls</h3><ul class="cg-gear-list">${rolls.map(r => `<li>${r}</li>`).join('')}</ul>`;
    } else html += `<p class="cg-muted">Roll gear to add weapons${hasSkill('Combat') ? ' and armour' : ''}.</p>`;
    if (items.length) {
        html += `<h3>In your backpack</h3><ul class="cg-gear-list">${items.map(i =>
            `<li><strong>${esc(i.name)}</strong> <span class="cg-small">(${esc(i.detail)}; ${i.slots} slot${i.slots > 1 ? 's' : ''})</span></li>`).join('')}</ul>`;
    }
    html += S.attrs ? `<p>Slots used: <strong>${used}</strong> of ${slotsTotal()}</p>` : '';
    box.innerHTML = html;
}

function renderTraits() {
    const cSel = el('cg-complication'), dSel = el('cg-drive');
    if (!cSel.options.length) {
        cSel.innerHTML = '<option value="">Choose…</option>' + COMPLICATIONS.map((c, i) => `<option value="${i}">${i + 1}. ${c.name}</option>`).join('');
        dSel.innerHTML = '<option value="">Choose…</option>' + DRIVES.map((c, i) => `<option value="${i}">${i + 1}. ${c.name}</option>`).join('');
    }
    cSel.value = S.complication === null ? '' : S.complication;
    dSel.value = S.drive === null ? '' : S.drive;
    const c = S.complication === null ? null : COMPLICATIONS[S.complication];
    el('cg-complication-text').innerHTML = c ? `<em>“${c.quote}”</em><br><strong>Triggered:</strong> ${c.trigger}<br><strong>Resisted:</strong> ${c.resisted}<br><span class="cg-muted">${COMPLICATION_RULE}</span>` : '';
    const dr = S.drive === null ? null : DRIVES[S.drive];
    el('cg-drive-text').innerHTML = dr ? `${dr.text}<br><span class="cg-muted">${DRIVE_RULE}</span>` : '';
}

function skillLines() {
    const lines = [];
    ATTRS.forEach(a => SKILLS[a].forEach(s => {
        const r = S.ranks.skill[s.name];
        if (!r) return;
        const fs = s.focus.filter(f => S.ranks.focus[f]).map(f => `${f} (${FOCUS_RANKS[S.ranks.focus[f]]})`);
        lines.push({ attr: a, text: `${s.name}: ${SKILL_RANKS[r]}`, focus: fs });
    }));
    return lines;
}

function renderSheet() {
    const etbf = S.mode === 'etbf';
    const name = S.name.trim() || (etbf ? 'The Nameless' : 'Unnamed Wanderer');
    const sub = etbf ? `Escape the Bleak Forest · Life ${S.etbf.life} · Echoes ${echoCount()}/3` : 'Bleak Forest Engine character';
    let html = `<h2 class="cg-sheet-title">${esc(name)}</h2><p class="cg-sheet-sub">${sub}</p>`;

    html += `<div class="cg-sheet-cols"><div><h3>Attributes</h3>`;
    html += S.attrs ? `<table><tr><th>Attribute</th><th>Score</th><th>Mod</th></tr>${ATTRS.map(a =>
        `<tr><td>${a}${etbf && S.locked[a] ? ' 🔒' : ''}</td><td>${S.attrs[a].score}</td><td>${signed(mod(a))}</td></tr>`).join('')}</table>` : '<p>—</p>';
    html += `</div><div><h3>Vital Statistics</h3>`;
    html += S.attrs ? `<table><tr><td>Vitality</td><td><strong>${vitality()}</strong></td></tr>
        <tr><td>Inventory slots</td><td>${slotsTotal()}</td></tr>
        <tr><td>Fatigue Ceiling</td><td>${Math.max(2, 2 * mod('Corpus'))}</td></tr>
        <tr><td>Armour Rating</td><td>${armourRating()}</td></tr></table>` : '<p>—</p>';
    html += `</div></div>`;

    const sl = skillLines();
    html += `<h3>Skills and Focus</h3>` + (sl.length ? `<ul>${sl.map(l => `<li><strong>${l.text}</strong>${l.focus.length ? ' · ' + l.focus.join(', ') : ''} <span class="cg-muted">(${l.attr})</span></li>`).join('')}</ul>` : '<p>—</p>');

    const items = gearItems();
    html += `<h3>Equipment</h3><ul>${KIT.map(k => `<li>${k}</li>`).join('')}${items.map(i => `<li><strong>${esc(i.name)}</strong>: ${esc(i.detail)}</li>`).join('')}</ul>`;

    const c = S.complication === null ? null : COMPLICATIONS[S.complication];
    const dr = S.drive === null ? null : DRIVES[S.drive];
    html += `<div class="cg-sheet-cols"><div><h3>Complication</h3>${c ? `<p><strong>${c.name}</strong>: <em>“${c.quote}”</em><br>Triggered: ${c.trigger}<br>Resisted: ${c.resisted}</p>` : '<p>—</p>'}</div>
        <div><h3>Drive</h3>${dr ? `<p><strong>${dr.name}</strong>: ${dr.text}<br>${DRIVE_RULE}</p>` : '<p>—</p>'}</div></div>`;

    if (etbf) {
        html += `<h3>Identity Marks</h3><p>${S.etbf.marks.trim() ? esc(S.etbf.marks).replace(/\n/g, '<br>') : '—'}</p>`;
    }
    el('cg-sheet').innerHTML = html;
}
function armourRating() {
    const a = S.gear && S.gear.armour && S.gear.armour.item ? ITEMS[S.gear.armour.item].ar : 0;
    const k = S.mode === 'etbf' && S.etbf.keptItem && ITEMS[S.etbf.keptItem.name] && ITEMS[S.etbf.keptItem.name].kind === 'armour'
        ? ITEMS[S.etbf.keptItem.name].ar : 0;
    return Math.max(a, k);
}

function sheetText() {
    const etbf = S.mode === 'etbf';
    const L = [];
    L.push((S.name.trim() || (etbf ? 'The Nameless' : 'Unnamed Wanderer')).toUpperCase());
    L.push(etbf ? `Escape the Bleak Forest · Life ${S.etbf.life} · Echoes ${echoCount()}/3` : 'Bleak Forest Engine character');
    L.push('');
    if (S.attrs) {
        L.push('ATTRIBUTES');
        ATTRS.forEach(a => L.push(`  ${a}: ${S.attrs[a].score} (${signed(mod(a))})${etbf && S.locked[a] ? ' [Locked]' : ''}`));
        L.push(`  Vitality ${vitality()} · Inventory slots ${slotsTotal()} · Fatigue Ceiling ${Math.max(2, 2 * mod('Corpus'))} · Armour ${armourRating()}`);
        L.push('');
    }
    const sl = skillLines();
    if (sl.length) { L.push('SKILLS AND FOCUS'); sl.forEach(l => L.push(`  ${l.text}${l.focus.length ? ' · ' + l.focus.join(', ') : ''}`)); L.push(''); }
    L.push('EQUIPMENT'); KIT.forEach(k => L.push('  ' + k)); gearItems().forEach(i => L.push(`  ${i.name}: ${i.detail}`)); L.push('');
    if (S.complication !== null) { const c = COMPLICATIONS[S.complication]; L.push(`COMPLICATION: ${c.name}. Triggered: ${c.trigger} Resisted: ${c.resisted}`); }
    if (S.drive !== null) { const dr = DRIVES[S.drive]; L.push(`DRIVE: ${dr.name}. ${dr.text}`); }
    if (etbf && S.etbf.marks.trim()) { L.push(''); L.push('IDENTITY MARKS'); L.push(S.etbf.marks.trim()); }
    return L.join('\n');
}

function renderAll() {
    renderMode(); renderAttributes(); renderDerived(); renderSkills(); renderGear(); renderTraits(); renderSheet();
}
function afterAttributes() { renderMode(); renderDerived(); renderGear(); renderSheet(); }

/* =====================================================================
   7. EVENTS
   ===================================================================== */

document.querySelectorAll('input[name=mode]').forEach(r => r.addEventListener('change', () => {
    S.mode = r.value; save(); renderAll();
}));
el('cg-name').addEventListener('input', e => { S.name = e.target.value; save(); renderSheet(); });

el('cg-roll-attrs').addEventListener('click', () => {
    const fresh = rollAttributes();
    renderAttributes(fresh);
    afterAttributes();
});
el('cg-attrs').addEventListener('change', e => {
    const a = e.target.dataset && e.target.dataset.lock;
    if (!a) return;
    if (e.target.checked && ATTRS.filter(x => S.locked[x]).length >= 3) { e.target.checked = false; return; }
    S.locked[a] = e.target.checked;
    if (S.locked[a]) S.etbf.log.push(`Life ${S.etbf.life}: ${a} Locked at ${S.attrs[a].score}.`);
    save(); renderAttributes(); renderMode(); renderSheet();
});

document.querySelectorAll('input[name=method]').forEach(r => r.addEventListener('change', () => {
    S.method = r.value;
    if (S.method === '2') S.ranks = blankRanks(); else resetRanksToFloors();
    save(); renderSkills(); renderGear(); renderSheet();
}));
el('cg-roll-skills').addEventListener('click', () => { rollSkills(); renderSkills(true); renderGear(); renderSheet(); });
el('cg-skill-grid').addEventListener('click', e => {
    const b = e.target.closest('button[data-rank]');
    if (b) changeRank(b.dataset.rank, b.dataset.name, +b.dataset.delta);
});

el('cg-roll-gear').addEventListener('click', () => {
    const groups = rollGear();
    showDice(el('cg-gear-dice'), groups, () => { renderGear(); renderSheet(); });
    renderGear(); renderSheet();
});

el('cg-complication').addEventListener('change', e => { S.complication = e.target.value === '' ? null : +e.target.value; save(); renderTraits(); renderSheet(); });
el('cg-drive').addEventListener('change', e => { S.drive = e.target.value === '' ? null : +e.target.value; save(); renderTraits(); renderSheet(); });
el('cg-roll-complication').addEventListener('click', () => { rollComplication(); renderTraits(); renderSheet(); });
el('cg-roll-drive').addEventListener('click', () => { rollDrive(); renderTraits(); renderSheet(); });

el('cg-roll-all').addEventListener('click', () => {
    const fresh = rollAttributes();
    if (S.method === '1') rollSkills();
    else autoSpendOption2();
    const gearGroups = rollGear();
    rollComplication(); rollDrive();
    renderAll();
    renderAttributes(fresh);
    if (S.method === '1') renderSkills(true);
    showDice(el('cg-gear-dice'), gearGroups);
});
// "Roll Everything" with Option 2 spends the 9 points at random, within the rules.
function autoSpendOption2() {
    S.ranks = blankRanks();
    let guard = 0;
    while (spent() < budget() && guard++ < 500) {
        const a = ATTRS[d(3) - 1], s = SKILLS[a][d(3) - 1];
        const raiseFocus = S.ranks.skill[s.name] > 0 && d(2) === 1;
        if (raiseFocus) { const f = s.focus[d(3) - 1]; if (canChange('focus', f, 1)) S.ranks.focus[f]++; }
        else if (canChange('skill', s.name, 1)) S.ranks.skill[s.name]++;
    }
    save();
}

el('cg-reset').addEventListener('click', () => {
    if (!window.confirm('Start over? This clears the current character' + (S.mode === 'etbf' ? ' and its Recursion history' : '') + '.')) return;
    const mode = S.mode, method = S.method;
    S = newState(); S.mode = mode; S.method = method;
    save();
    el('cg-gear-dice').innerHTML = '';
    renderAll();
});

// Escape the Bleak Forest
el('cg-marks').addEventListener('input', e => { S.etbf.marks = e.target.value; save(); renderSheet(); });
el('cg-spend-learned').addEventListener('click', () => {
    if (spendEchoes(2, 'marked a future Challenge attempt as Learned (ignore Mishap dice for it)')) {
        S.etbf.marks = (S.etbf.marks.trim() ? S.etbf.marks.trim() + '\n' : '') + 'Learned: next Challenge attempt ignores Mishap dice.';
        save(); renderMode(); renderSheet();
    }
});
el('cg-spend-vow').addEventListener('click', () => {
    if (spendEchoes(3, 'transformed one Scar into a Vow')) {
        S.etbf.marks = (S.etbf.marks.trim() ? S.etbf.marks.trim() + '\n' : '') + 'A Scar was transformed into a Vow (rewrite it above).';
        save(); renderMode(); renderSheet();
    }
});
el('cg-death').addEventListener('click', openRecursion);

// Sheet
el('cg-print').addEventListener('click', () => window.print());
el('cg-copy').addEventListener('click', () => {
    const text = sheetText(), status = el('cg-copy-status');
    const ok = () => { status.textContent = 'Copied.'; setTimeout(() => { status.textContent = ''; }, 2500); };
    if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(text).then(ok, fallback);
    else fallback();
    function fallback() {
        const ta = document.createElement('textarea');
        ta.value = text; ta.style.position = 'fixed'; ta.style.opacity = '0';
        document.body.appendChild(ta); ta.select();
        try { document.execCommand('copy'); ok(); } catch (e) { status.textContent = 'Copy failed. Select the sheet and copy it instead.'; }
        ta.remove();
    }
});

// The sigil image loads after the first draw; redraw dice once it is ready.
probe.addEventListener('load', () => { renderAttributes(); renderSkills(); });

renderAll();
})();
