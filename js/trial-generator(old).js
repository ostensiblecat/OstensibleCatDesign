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
const CHALLENGE_TRIAL_DETAILS = {
    Corpus: [
        'The hardship is sharpened by a broken path or an impossible load.',
        'A hostile creature has taken shelter nearby and watches the approach.',
        'The burden is missing a strap, rope, or handle that must be replaced.',
        'A desperate voice calls for aid as the trial begins.',
        'The only way through is a narrow ledge or a collapsing bridge.',
        'The weather worsens with each step, as if the land itself resists.'
    ],
    Anima: [
        'A false sign or old lie is planted deliberately on the route.',
        'Someone is following quietly and is not meant to be seen.',
        'The intended promise is already broken before the negotiation begins.',
        'A memory is mixed with a present danger and cannot be sorted cleanly.',
        'A hidden watcher is using the same route and has set a trap.',
        'The truth is half-sensed, half-remembered, and difficult to trust.'
    ],
    Spiritus: [
        'The dead are restless and the air carries their echo.',
        'An old bargain lingers in the place like a lingering smell.',
        'A forbidden name is scratched into the earth before the test begins.',
        'The dreamland overlaps the waking ground and shifts the stakes.',
        'A spirit waits to be bound, released, or answered.',
        'The trial demands a piece of identity, memory, or vow.'
    ]
};
const SITES = ['A ruin', 'Still or deep water', 'A grave or barrow', 'A hollow tree', 'A crossroads', 'A threshold, such as a door, gate, or hovel'];
const CHALLENGE_SITE_DETAILS = [
    'The stones are carved with old marks that still point toward the same danger.',
    'The surface is unnaturally still and that stillness seems to listen back.',
    'The burial site is disturbed, and a shallow mound hums with a buried memory.',
    'The trunk is split open and something inside is still moving in the dark.',
    'Three paths become visible at once, all arriving at the same choice.',
    'The threshold is cracked open and the edge smells faintly of smoke and rain.'
];
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
const ORDEAL_PLACE_DETAILS = [
    'The place is bounded by a ring of damaged shrines and old warnings.',
    'A market stall still stands in the wrong place, as if the town never settled.',
    'A broken bridge or split road denies the easy route and invites ambush.',
    'Dust and ash cling to the doors as though the whole place was sealed in haste.',
    'The walls are older than the people inside and keep listening at the gates.',
    'Every path in the wilds here seems to circle back toward the same point.'
];
const TROUBLES = ['Sickness spreading', 'Failing food or water', 'A feud tearing it apart', 'A haunting', 'A predator taking people', 'Corruption spreading'];
const ORDEAL_TROUBLE_DETAILS = [
    'The sickness strikes in waves, and the first symptoms appear in the most crowded place.',
    'The people ration water to a narrow, bitter minimum and grow desperate by night.',
    'The feud is old enough to be ritual, with each side accusing the other of treason.',
    'The haunting is selective, favouring one family, one room, or one hour of the day.',
    'The predator leaves a fresh spoor at each boundary and never leaves the same trail twice.',
    'Corruption spreads under the skin and in the soil, leaving scars where it was touched.'
];
// The Cause table has five entries; a 6 on the d6 is rolled again.
const CAUSES = ['Human greed or fear', 'A Fae bargain gone sour', 'The restless dead', 'Demonic influence', 'An elemental grievance'];
const ORDEAL_CAUSE_DETAILS = [
    'The cause hides in a contract, a debt, or a promise broken during a season of hunger.',
    'A bargain was made for protection and now the thing owed has become a burden to everyone.',
    'The dead answer a forgotten burial rite and are compelled to carry out one final command.',
    'A demonic influence has settled in a cellar, shrine, or old well and is feeding on fear.',
    'The land itself remembers a wound and is passing it on through soil, water, and weather.'
];
const TASKS = {
    Corpus:   ['Repair or rebuild', 'Descend somewhere dangerous', 'Hunt or drive off', 'Escort through danger', 'Hold a position', 'Carry supplies through'],
    Anima:    ['Investigate records', 'Negotiate a truce', 'Expose a lie', 'Rally the people', 'Track to a source', 'Uncover a hidden figure'],
    Spiritus: ['Cleanse or ward', 'Bargain with an entity', 'Heal the afflicted', 'Banish or bind', 'Read the omens', 'Undo a working']
};
const TASK_DETAIL_TABLES = {
    Corpus: {
        'Repair or rebuild': [
            'The damaged wall is kept upright by a single stubborn beam.',
            'A roof tile is missing and the rain has already begun to seep in.',
            'A gate is warped from years of pressure and fights the hinges.',
            'The structure has a hidden weakness that can collapse at the wrong touch.',
            'The rebuilt section must be stronger than the original to stop a recurrence.',
            'A fresh coat of ash and mortar marks the place where the old work failed.'
        ],
        'Descend somewhere dangerous': [
            'The stairs end in a cellar full of black water and old bone.',
            'A hidden shaft opens below the floor, narrow and difficult to climb back out of.',
            'A collapsed tunnel blocks the way and makes every step uncertain.',
            'There is a faint, regular sound from below that suggests something alive is waiting.',
            'A trapped larder reveals the past violence of this place in a dozen small details.',
            'The descent is marked with rubbed, half-remembered warnings scratched into the walls.'
        ],
        'Hunt or drive off': [
            'A creature has been feeding on the edges of camp and leaving drag marks behind.',
            'The stalker is clever enough to wait for a second chance rather than rush the attack.',
            'The target has become a danger to the living by moving between homes at night.',
            'A wounded predator has made its den somewhere close enough to be heard.',
            'The pursuit reveals a fresh trail that crosses a river or a ruined wall.',
            'The beast is not the true danger; the thing that led it here is hiding nearby.'
        ],
        'Escort through danger': [
            'The group has to move at a pace set by the slowest, weakest, or most stubborn member.',
            'A straggler keeps falling behind and making the route harder to protect.',
            'One of the escorts is carrying something they should not be trusted with.',
            'The path narrows just as the danger closes in, forcing a hard choice.',
            'The route crosses rough ground where the warning signs are already broken.',
            'The escort must choose between haste and leaving the wounded behind.'
        ],
        'Hold a position': [
            'The defenders are outnumbered and must hold one doorway against a rising tide of pressure.',
            'The position is almost impossible to hold without a second line of support.',
            'The old fortifications are failing and must be patched under fire.',
            'The hold is under watch from a hidden route that the enemy knows better than the defenders.',
            'The defenders are running low on supplies and must use every last scrap.',
            'The position is entirely exposed to weather and attack, with no safe corner to rest.'
        ],
        'Carry supplies through': [
            'The route is littered with damaged wagons and broken gear that slows everyone down.',
            'The pack animals are frightened and uncertain about the conditions ahead.',
            'At least one bundle has been opened or switched before the journey begins.',
            'The supplies are needed elsewhere and time becomes as dangerous as an enemy.',
            'Conditions worsen as the journey goes on, turning the route into a test of stamina.',
            'The carriage route crosses a place where the ground itself makes the burden unbearable.'
        ]
    },
    Anima: {
        'Investigate records': [
            'The books mention a warning that was later crossed out by a frightened hand.',
            'A ledger page is missing and the space around it seems too clean for a natural loss.',
            'The records are written in code, half-lie, or differing versions of the same event.',
            'A witness statement contradicts a signed oath and reveals a hidden motive.',
            'The archive was sealed with a ritual, not a legal order, and the seal still hums.',
            'A page recounts a story that later events prove was almost true.'
        ],
        'Negotiate a truce': [
            'The opposing leader will only stand down if they are shown a visible sign of respect.',
            'One side blames the other for an act they are not yet ready to admit they committed.',
            'The terms are all clear except for one detail that could still spark violence.',
            'Several people in the room are prepared to fight if the meeting fails by even a moment.',
            'The truce depends on a promise made in private, not a public oath.',
            'The negotiation turns on a story one of the parties is no longer willing to let be told.'
        ],
        'Expose a lie': [
            'The false story has already earned a public life and is being repeated by the crowd.',
            'One witness is lying because they believe the lie is kinder than the truth.',
            'The lie is sustained by a document that cannot be easily disproved without embarrassment.',
            'A quiet threat hangs over anyone who names the truth aloud.',
            'The lie is older than the current crisis and tied to an earlier, worse act.',
            'The false story is clearly designed to protect a person or institution from scrutiny.'
        ],
        'Rally the people': [
            'The crowd is frightened, but frightened people are good at turning rumors into a weapon.',
            'The speaker must first convince the doubters before the desperate will listen.',
            'The people are divided between blame, grief, and fear, and each demands a different answer.',
            'A rumor has spread that the danger is already in the crowd itself.',
            'The local leaders are missing, and the people are waiting to see who can stand forward.',
            'The story that will rally them is something they do not yet believe they are allowed to want.'
        ],
        'Track to a source': [
            'The trail circles back to a place that has already been searched once.',
            'The clue is not a sign but a pattern that repeats in a single innocent detail.',
            'Someone intentionally masked the route with false markers and half-buried evidence.',
            'The source is close enough to be heard, but moving toward it would reveal the trail.',
            'The lead crosses a place already disturbed by another investigation.',
            'The route is hidden in plain sight and the people who know it are pretending not to.'
        ],
        'Uncover a hidden figure': [
            'The figure is using a public identity in order to remain hidden from scrutiny.',
            'The hidden person keeps their key evidence in plain sight but under the wrong name.',
            'The role is partly played and partly real, with both levels of disguise getting in the way.',
            'The figure has allies in positions that should not know them at all.',
            'The hidden person is never seen in the same place twice without a plausible reason.',
            'The true identity is tied to an old event the town would rather not remember.'
        ]
    },
    Spiritus: {
        'Cleanse or ward': [
            'The ward must be drawn in a place already touched by violence or grief.',
            'The cleansing is blocked by a single object the people refuse to remove.',
            'A spirit keeps breaking the circle by speaking through the wind or the wall.',
            'The hallowed ground is too thin and the work must be completed in layers.',
            'The ward needs a specific name that has been deliberately forgotten.',
            'The cleansing is being opposed by an old promise that was never properly ended.'
        ],
        'Bargain with an entity': [
            'The entity asks for a memory or vow in exchange for a quiet night.',
            'The bargain is written in a language everyone has already half-forgotten.',
            'The being is not malicious; it is simply following a rule with terrible consequences.',
            'The price is small enough to seem reasonable until the full effect is known.',
            'The bargain must be sealed before the moon or the choir rises fully.',
            'The entity speaks in a tone that suggests it knows the speaker personally.'
        ],
        'Heal the afflicted': [
            'The afflicted are in no condition to be touched, and their pain resists all gentle care.',
            'The illness is tied to a place, object, or rite that must be addressed alongside the patient.',
            'The worst case is not the newest victim but the one the community has already given up on.',
            'The cure will not be accepted unless the people understand what it asks them to lose.',
            'Healing requires a story to be spoken aloud before the treatment can take effect.',
            'The afflicted are carrying a burden that was never meant for a single person to bear.'
        ],
        'Banish or bind': [
            'The spirit has chosen a specific room or object and refuses to leave without a fight.',
            'The binding place must be prepared with care or the spirit will break the circle itself.',
            'The entity is using names to gain leverage and cannot be silenced until the right one is spoken.',
            'The banishment must be done while the world is still and the sound is carefully controlled.',
            'The binding is complicated by a second entity, half-seen and equally determined.',
            'The thing that must be driven off remembers the place better than the living do.'
        ],
        'Read the omens': [
            'The signs are contradictory and each one points toward a different threat.',
            'A single bird, cloud, or echo repeats a pattern the people have been ignoring.',
            'The omen is partly in a dream and partly in waking reality, making trust difficult.',
            'A false omen is being used to direct attention away from the true danger.',
            'The warning is loudest during the still hours, when most people are already asleep.',
            'Every omen points to a decision that must be made before the next dawn.'
        ],
        'Undo a working': [
            'The working is hidden behind a harmless ritual the community repeats without understanding.',
            'The effect was placed in the bones of the place, not in a single vessel or symbol.',
            'The working continues because the one who set it is already gone; the pattern remains.',
            'The charm is made from ordinary things that were never meant to carry power.',
            'Undoing it requires naming the original reason, not merely the result.',
            'The work is tied to a vow and will not fail until the vow is addressed honestly.'
        ]
    }
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

function rollDetail(table) {
    if (!table || !table.length) return null;
    const r = d(6);
    return { roll: r, text: table[r - 1] };
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
        trial: { roll: trialRoll, text: TRIALS[attr][trialRoll - 1], detail: rollDetail(CHALLENGE_TRIAL_DETAILS[attr]) },
        site: { roll: siteRoll, text: SITES[siteRoll - 1], detail: rollDetail(CHALLENGE_SITE_DETAILS) },
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
        cause = { rolls: causeRolls, text: CAUSES[r - 1], detail: rollDetail(ORDEAL_CAUSE_DETAILS) };
    }

    const tasks = [];
    for (let i = 0; i < T.tasks; i++) {
        const ar = [d(6)];
        tasks.push({ attrRolls: ar, attr: attrFromD6(ar[0]), roll: 0, text: '', detail: null, state: 'open' });
    }
    // At least two attributes: reroll the final task's attribute until another appears
    if (tasks.every(t => t.attr === tasks[0].attr)) {
        const last = tasks[tasks.length - 1];
        let r;
        do { r = d(6); last.attrRolls.push(r); } while (attrFromD6(r) === tasks[0].attr);
        last.attr = attrFromD6(r);
        last.forcedAttr = true;
    }
    tasks.forEach(t => {
        t.roll = d(6);
        t.text = TASKS[t.attr][t.roll - 1];
        const details = TASK_DETAIL_TABLES[t.attr] && TASK_DETAIL_TABLES[t.attr][t.text];
        t.detail = details ? rollDetail(details) : null;
    });

    const fragments = tasks.map((t, i) => rollFragment(`Task ${i + 1}`));
    fragments.push(rollFragment('the Cause'));
    const omenRoll = d(6);
    return {
        id: uid(), kind: 'ordeal', tier, tierRoll, tierHow,
        place: { roll: placeRoll, text: PLACES[placeRoll - 1], detail: rollDetail(ORDEAL_PLACE_DETAILS) },
        trouble: { roll: troubleRoll, text: TROUBLES[troubleRoll - 1], detail: rollDetail(ORDEAL_TROUBLE_DETAILS) },
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
    h += step('Trial Detail', ev.trial.detail ? diceHTML([ev.trial.detail.roll]) : '', ev.trial.detail ? esc(ev.trial.detail.text) : '');
    h += step('Site', revealed(ev, 'site') ? diceHTML([ev.site.roll]) : '', revealed(ev, 'site') ? esc(ev.site.text) : hidden('second Fragment'));
    h += step('Site Detail', ev.site.detail ? diceHTML([ev.site.detail.roll]) : '', ev.site.detail ? esc(ev.site.detail.text) : '');
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
    h += step('Place Detail', ev.place.detail ? diceHTML([ev.place.detail.roll]) : '', ev.place.detail ? esc(ev.place.detail.text) : '');
    h += step('Trouble', diceHTML([ev.trouble.roll]), esc(ev.trouble.text));
    h += step('Trouble Detail', ev.trouble.detail ? diceHTML([ev.trouble.detail.roll]) : '', ev.trouble.detail ? esc(ev.trouble.detail.text) : '');
    const showCause = revealed(ev, 'cause');
    h += step('Cause', showCause && ev.cause.rolls ? diceHTML(ev.cause.rolls) : '',
        showCause ? esc(ev.cause.text) + (ev.cause.detail ? ` — ${esc(ev.cause.detail.text)}` : '') + (!ev.cause.rolls ? ' <span class="tg-muted tg-small">(carried from the original Ordeal)</span>' : ev.cause.rolls.length > 1 ? ' <span class="tg-muted tg-small">(6 rolled again)</span>' : '') : hidden('final Fragment'));
    h += step('Omen', diceHTML([ev.omen.roll]), `${esc(ev.omen.text)}. <span class="tg-muted">The Trouble breaks into the open.</span>`);
    h += `</ul><h4>Tasks</h4><ol class="tg-tasks">`;
    ev.tasks.forEach((t, i) => {
        const show = revealed(ev, i);
        h += `<li><div class="tg-task-body"><strong>Task ${i + 1}</strong> ` +
            (show ? `${diceHTML(t.attrRolls.concat([t.roll]))} <strong>${t.attr}:</strong> ${esc(t.text)}` +
                    (t.detail ? ` <span class="tg-small">Detail: ${esc(t.detail.text)}</span>` : '') +
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
        L.push(`Trial Detail: ${ev.trial.detail ? ev.trial.detail.text : '(not yet revealed)'}`);
        L.push(`Site: ${revealed(ev, 'site') ? ev.site.text : '(not yet revealed)'}`);
        L.push(`Site Detail: ${ev.site.detail ? ev.site.detail.text : '(not yet revealed)'}`);
        L.push(`Omen: ${ev.omen.text}. Begins: ${ev.omen.begins}.`);
    } else {
        const T = ORDEAL_TIERS[ev.tier];
        L.push(`${ev.place.text}: ${ev.trouble.text}. Task BAM! ${T.task}; decisive BAM! ${T.decisive}. Fragments needed: ${ev.fragments.length}.`);
        L.push(`Place Detail: ${ev.place.detail ? ev.place.detail.text : '(not yet revealed)'}`);
        L.push(`Trouble Detail: ${ev.trouble.detail ? ev.trouble.detail.text : '(not yet revealed)'}`);
        L.push(`Cause: ${revealed(ev, 'cause') ? ev.cause.text : '(not yet revealed)'}`);
        if (ev.cause.detail) L.push(`Cause Detail: ${ev.cause.detail.text}`);
        ev.tasks.forEach((t, i) => L.push(`Task ${i + 1}: ${revealed(ev, i) ? `${t.attr}: ${t.text}` : '(not yet revealed)'}${t.state !== 'open' ? ` [${t.state === 'done' ? 'completed' : 'failed'}]` : ''}${t.detail ? ` — ${t.detail.text}` : ''}`));
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
