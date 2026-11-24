/* Bleak Forest Engine – Challenges, Ordeals & the Fated Road generator
   Needs the markup in trial-generator.html, js/fated-road-data.js (loaded first)
   and images/BFSigil-dice.png. Rules: The Fated Road (fated-road.html).

   1. RULES    – tables from The Fated Road and Playing the Game.
   2. DICE     – fair rolls and dice drawings (same look as the Dice Roller).
   3. GENERATE – Challenges, Ordeals (from a Goal, general, or the Reckoning), Fragments.
   4. ROAD     – the campaign: party, Degrees, Doom, Holds, Threads.
   5. LEDGER   – tracking kept events: Fragments, red herrings, Omen, Ruin die, tasks.
   6. RENDER   – drawing the cards and the road.
   7. EVENTS   – wiring the buttons. */

(function () {
'use strict';

const GOALS = window.FATED_GOALS || [];
window.TG_VERSION = '2026-11-25a';
// Show any script error on the page, so a broken button never fails silently
window.addEventListener('error', e => {
    const box = document.getElementById('tg-intro');
    if (box) box.insertAdjacentHTML('beforeend', `<p class="tg-note bad">Generator error: ${String(e.message).replace(/</g, '&lt;')} (${String(e.filename || '').split('/').pop()}:${e.lineno || '?'})</p>`);
});

/* =====================================================================
   1. RULES
   ===================================================================== */

const ATTRS = ['Corpus', 'Anima', 'Spiritus'];
const attrFromD6 = n => (n <= 2 ? 'Corpus' : n <= 4 ? 'Anima' : 'Spiritus');
const TIERS = ['Minor', 'Moderate', 'Major', 'Reckoning'];
const tierFromD6 = n => (n <= 3 ? 0 : n <= 5 ? 1 : 2);
const BAMS = [['Easy', 10], ['Average', 13], ['Difficult', 16], ['Challenging', 19], ['Formidable', 22], ['Inconceivable', 25]];
const bam = i => { const b = BAMS[Math.max(0, Math.min(5, i))]; return `${b[0]} (${b[1]})`; };

/* --- The Fated Road: Ordeal structure (party of 3–4) --- */
const ORDEAL_TIERS = [
    { tasks: 2, task: 1, decisive: 2, frags: 3, falses: 1, scale: 'A village, hamlet, holdfast, shrine or crossing',
      footprint: 'One Exploration hex (500 m) and the Operational hex (2 km) around it', sites: '1 site', length: '1 to 3 days',
      creatures: 'Common table, Might 0', ruinEvery: 'each day', omenWhere: 'The Omen happens in the place.' },
    { tasks: 3, task: 2, decisive: 3, frags: 4, falses: 2, scale: 'A town or city, or a district of several sites',
      footprint: 'One Overland hex (8 km), or 2 to 4 joined Operational hexes', sites: '2 to 3 sites, each its own sub-hex', length: '3 to 7 days',
      creatures: 'Uncommon table, up to Tier I', ruinEvery: 'every 2 days', omenWhere: 'The Omen is seen in any settlement in its Overland hex.' },
    { tasks: 4, task: 3, decisive: 4, frags: 5, falses: 3, scale: 'A region: a valley, a march, a river’s length, a forest',
      footprint: '3 to 5 joined Overland hexes (24 to 40 km across)', sites: '4 sites, each in its own Overland hex', length: '1 to 3 weeks',
      creatures: 'Rare table, up to Tier II', ruinEvery: 'every 4 days', omenWhere: 'The Omen is felt across the whole region. Everyone in the footprint makes a Doom save.' },
    { tasks: 5, task: 4, decisive: 5, frags: 6, falses: 0, scale: 'The heart of the Goal, and every place it touches',
      footprint: 'The Adversary’s seat, plus every site of the Goal’s Major Ordeals', sites: '5 or more sites', length: 'As long as it takes',
      creatures: 'The Adversary, Tier III', ruinEvery: 'every 4 days', omenWhere: 'Everyone who first faces the Adversary makes a Doom save.' }
];
// Encounters per task: [party band][tier]; bands 1, 2, 3–4, 5–6
const ENC_BY_PARTY = [[1, 1, 2, 2], [1, 2, 2, 3], [1, 2, 3, 3], [2, 3, 4, 4]];
const partyBand = n => (n <= 1 ? 0 : n === 2 ? 1 : n <= 4 ? 2 : 3);
const ENEMIES = [
    { number: 'Half the listed Number, rounded up', cause: 'The Cause alone, without its guards' },
    { number: 'Half the listed Number, rounded up', cause: 'The Cause and one guard' },
    { number: 'As listed in the Creature Compendium', cause: 'As written' },
    { number: 'Half again the listed Number, rounded up', cause: 'As written, plus one more creature of the Ordeal’s tier' }
];
const ENCOUNTERS = [ // 1–2, 3, 4, 5, 6
    { kind: 'Adversary', text: 'A creature or band of the Ordeal’s tier stands in the way. Fight, parley, hide, flee or trick it.' },
    { kind: 'Adversary', text: 'A creature or band of the Ordeal’s tier stands in the way. Fight, parley, hide, flee or trick it.' },
    { kind: 'Hazard', text: 'The site itself is dangerous: a collapse, a flood, a fire, a fall. One check at the task’s BAM!; on a failure, take the harm it threatens.' },
    { kind: 'Witness', text: 'Someone knows something. Parley at the task’s BAM!; on a success they give a Fragment for another event or tell you the Cause’s weakness.' },
    { kind: 'Temptation', text: 'An easier way, at a price: Corruption, a broken Vow, a life traded. Accepting it resolves the encounter, costs a Doom save, and earns 1 Boon Point.' },
    { kind: 'Signature', text: '' }
];
const ORDEAL_BLIGHTS = [  // 1–2, 3–4, 5–6
    'The place is lost. Its Danger Die rises by 1 for good',
    'The Cause spreads to a neighbouring place as a new Ordeal one tier higher',
    'The place’s people, or its faction, become Hostile to you'
];
const SETBACKS = [
    { name: 'Delay', text: 'Lose 1 Watch: the road floods, the witness hides, the door is barred.' },
    { name: 'Losses', text: 'Lose 1d3 uses of food, water or torches, or 1 Durability from one item.' },
    { name: 'Hunted', text: 'The Adversary knows you are here. Add one Adversary encounter to your next task.' },
    { name: 'Turned', text: 'The place’s people turn Wary. Anima tasks are at Minor Disadvantage until a task succeeds.' },
    { name: 'Wounded', text: 'The character with the lowest Vitality takes a Minor Condition of the Narrator’s choice.' },
    { name: 'The Adversary’s gaze', text: 'Every character in the footprint makes a Doom save.' }
];
const WEATHER = [ // by 2d6 total
    [2, 2, 'Downpour', 'Corpus and sight-based tasks at Moderate Disadvantage. No task that needs fire.'],
    [3, 4, 'Fog', 'Sight-based and tracking tasks at Moderate Disadvantage. Stealth tasks at Moderate Advantage.'],
    [5, 8, 'Clear', 'No effect on tasks.'],
    [9, 9, 'Snow', 'Tracking tasks at Major Advantage. Corpus tasks at Minor Disadvantage.'],
    [10, 11, 'Rain', 'Ranged and fire-based tasks at Minor Disadvantage.'],
    [12, 12, 'High Winds', 'Climbing tasks at Moderate Disadvantage; ranged tasks beyond Near at Major Disadvantage. No task that needs fire.']
];
const TERRAIN = [
    ['Speed ×1 (road, grassland, light forest)', 'None.'],
    ['Speed ×¾ (rolling hills, scrub, coast, desert, forest)', 'Corpus tasks at Minor Disadvantage.'],
    ['Speed ×½ (steep hills, tundra, swamp, ruins, dense forest)', 'Corpus tasks at Moderate Disadvantage. Hazard encounters deal 1 more harm. Stealth tasks at Minor Advantage.'],
    ['Speed ×¼ (mountains)', 'Corpus tasks at Major Disadvantage. Hazard encounters deal 1d3 more harm.'],
    ['Dead forest', 'Spiritus tasks at Minor Disadvantage. Nothing can be foraged for the task.'],
    ['Cursed or blighted forest', 'Spiritus tasks at Moderate Disadvantage, and Doom saves there are one step harder.']
];
const WYRD = ['A Setback strikes', 'A Setback strikes', 'You meet a Witness, or find a Fragment for another event',
              'You meet a Witness, or find a Fragment for another event', 'The Trouble flares: roll for the Omen now (if Prepared)',
              'The Trouble flares: roll for the Omen now (if Prepared)'];

const FRAGMENTS = [
    { type: 'Relic',   desc: 'an object from the site',               by: 'Explore or loot' },
    { type: 'Witness', desc: 'a creature that saw something',         by: 'an encounter or Parley' },
    { type: 'Mark',    desc: 'a sign carved, burned or left behind',  by: 'Explore (Wits, Difficult 16)' },
    { type: 'Rumour',  desc: 'a story from a traveller or wanderer',  by: 'a Special Event or Parley' },
    { type: 'Vision',  desc: 'a dream during rest',                   by: 'a Short or Full Rest inside the footprint' },
    { type: 'Echo',    desc: 'a memory from a past Recursion',        by: 'an Echo spend, or recalling a death' }
];
const FRAG_BY = Object.fromEntries(FRAGMENTS.map(f => [f.type, f]));
const HERRINGS = [
    { name: 'Scapegoat', text: 'an innocent person or family is framed for the Trouble', exposed: 'Anima: their story holds up, and someone wanted them blamed' },
    { name: 'Lesser monster', text: 'a real beast is blamed for the Adversary’s work. Killing it changes nothing', exposed: 'Wits: its tracks, its kills or its hunting grounds do not match' },
    { name: 'Planted relic', text: 'an object left by the Adversary’s servants', exposed: 'Lore: it is too new, too clean, or from the wrong place' },
    { name: 'Lying witness', text: 'paid, frightened or under a charm', exposed: 'Anima: they contradict themselves, or someone else saw them paid' },
    { name: 'False vision', text: 'a dream the Adversary sends', exposed: 'Spiritus: it is too clear, and it asks something of you' },
    { name: 'Old sin', text: 'a real crime in the place’s past, unrelated to this Trouble, that the place wants buried', exposed: 'Lore or Anima: it happened, but long before the Trouble began' }
];
// The form a red herring most naturally takes, to disguise it among the true Fragments
const HERRING_FORM = { 'Scapegoat': 'Rumour', 'Lesser monster': 'Mark', 'Planted relic': 'Relic', 'Lying witness': 'Witness', 'False vision': 'Vision', 'Old sin': 'Rumour' };

/* --- Degrees of the Road --- */
// For each Degree, the tier its Ordeals must be, and how many are needed to reach it
// Cumulative Ordeals needed to stand at each Degree [Minor, Moderate, Major] – Advancement › The Nine Degrees.
// Requirements stack: each Degree needs everything below it. The gate Degrees (4th, 6th) need one Ordeal of the new tier.
const CUM_NEED = { 1: [0, 0, 0], 2: [2, 0, 0], 3: [5, 0, 0], 4: [5, 1, 0], 5: [5, 6, 0], 6: [5, 6, 1], 7: [5, 6, 4], 8: [5, 6, 7], 9: [5, 6, 10] };
const BAND_TIER = { 2: 0, 3: 0, 4: 1, 5: 1, 6: 2, 7: 2, 8: 2, 9: 2 };
// [tier, Ordeals of that tier still needed after reaching the Degree below]
const DEGREE_NEED = {};
for (let n = 2; n <= 9; n++) { const t = BAND_TIER[n]; DEGREE_NEED[n] = [t, CUM_NEED[n][t] - CUM_NEED[n - 1][t]]; }
const ROAD_TOTAL = CUM_NEED[9];   // a full Fated Road: 5 Minor, 6 Moderate, 10 Major
const DEGREE_SP = { 2: 4, 3: 4, 4: 5, 5: 5, 6: 6, 7: 6, 8: 7, 9: 7 };
const GATES = [4, 6];   // the first Degree of the Moderate and Major bands
const ordinal = n => n + (n === 1 ? 'st' : n === 2 ? 'nd' : n === 3 ? 'rd' : 'th');
const doomMax = degree => Math.min(12, 5 + degree);
const DOOM_STATES = [
    [10, 12, 'Intact', 'None.'],
    [7, 9, 'Tested', 'One Doom save at the end of each session.'],
    [4, 6, 'Pressed', 'Triggering your Complication also costs 1 Boon Point, unless you accept it (then you gain 1).'],
    [1, 3, 'Failing', 'Doom saves at Minor Disadvantage. At Risk for the Danger Die. Inside an active Ordeal’s footprint, a Doom save at the end of every Watch.'],
    [0, 0, 'Consumed', 'You pass out of play as the Adversary’s instrument, and the Adversary gains a Hold.']
];
const doomState = v => DOOM_STATES.find(s => v >= s[0] && v <= s[1]);

/* --- Challenges (Playing the Game, unchanged) --- */
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

/* --- General Ordeal Generator (Playing the Game) --- */
const PLACES = ['A hamlet', 'A market town', 'A road or bridge', 'A shrine or monastery', 'A holdfast', 'A stretch of wilds'];
const TROUBLES = ['Sickness spreading', 'Failing food or water', 'A feud tearing it apart', 'A haunting', 'A predator taking people', 'Corruption spreading'];
const CAUSES = ['Human greed or fear', 'A Fae bargain gone sour', 'The restless dead', 'Demonic influence', 'An elemental grievance'];  // a 6 is rerolled
/* --- Taint (Challenges and Ordeals › Taint): each Taint fits three Causes, so it narrows the Cause without naming it --- */
// Cause index: 0 greed or fear, 1 Fae, 2 restless dead, 3 Demonic, 4 elemental, 5 an Abrikoth's hand (HTWYS only)
const CAUSE_SHORT = ['Greed or fear', 'Fae bargain', 'Restless dead', 'Demonic', 'Elemental', 'Abrikoth'];
// d66 Taint table: the first d6 picks the row, the second the Taint; every row holds exactly three Taints for each Cause
const TAINT_ROWS = [
    { row: "Smell and taste", taints: [
        { name: "Rot-sweet", text: "a smell of rotting fruit and honey", causes: [1, 3, 5] },
        { name: "Grave soil", text: "the smell of wet earth and grave soil indoors", causes: [0, 2, 4] },
        { name: "Burning, no fire", text: "a smell of burnt hair or sulphur with nothing alight", causes: [0, 3, 4] },
        { name: "Iron in the mouth", text: "food and drink that taste of blood or old coin", causes: [0, 2, 3] },
        { name: "Salt and brine", text: "the smell of the sea, far from any shore", causes: [1, 4, 5] },
        { name: "Cellar damp", text: "the smell of wet stone and old cellars in sunlit rooms", causes: [1, 2, 5] } ] },
    { row: "Sound", taints: [
        { name: "Barking dogs", text: "dogs that will not stop barking after dark", causes: [0, 2, 3] },
        { name: "Bells unrung", text: "bells that ring on their own, at no hour", causes: [1, 2, 5] },
        { name: "Music, no musician", text: "a pipe or a song from somewhere no one is", causes: [1, 3, 5] },
        { name: "Knocking", text: "knocking in the walls and under the floors", causes: [0, 2, 4] },
        { name: "Dusk silence", text: "birds and insects falling still at dusk", causes: [3, 4, 5] },
        { name: "Banging doors", text: "doors that bang in still air, and locks heard turning at night", causes: [0, 1, 4] } ] },
    { row: "Beasts and growing things", taints: [
        { name: "Crows", text: "crows gathering while the songbirds fall silent", causes: [2, 3, 5] },
        { name: "Rings", text: "rings of mushrooms or stones", causes: [1, 2, 4] },
        { name: "Turned beasts", text: "livestock sickening, or turning on their keepers", causes: [0, 3, 5] },
        { name: "Out of season", text: "flowers in frost, and crops ripening overnight", causes: [1, 4, 5] },
        { name: "Vermin", text: "rats fleeing the place, or swarming its grain stores", causes: [0, 2, 4] },
        { name: "Doorstep gifts", text: "posies, dead birds or small bones left on doorsteps", causes: [0, 1, 3] } ] },
    { row: "Water, weather and light", taints: [
        { name: "Water gone wrong", text: "brackish wells and streams running red", causes: [0, 3, 4] },
        { name: "Cold spots", text: "cold spots, and breath fogging indoors", causes: [2, 4, 5] },
        { name: "The hour mist", text: "a mist that rises at the same hour every day", causes: [1, 2, 5] },
        { name: "Ash on the sills", text: "soot and fine ash settling, though no chimney smokes", causes: [0, 3, 4] },
        { name: "Field lights", text: "lights moving in the fields or the marsh at night", causes: [0, 1, 2] },
        { name: "Wrong reflections", text: "still water and mirrors that show another sky", causes: [1, 3, 5] } ] },
    { row: "Hearth and household", taints: [
        { name: "Soured milk", text: "milk soured and bread mouldered overnight", causes: [1, 3, 5] },
        { name: "Rust", text: "nails, hinges and blades rusting overnight", causes: [1, 4, 5] },
        { name: "Misplaced coin", text: "coin where it should not be: in wells, on graves, in cradles", causes: [0, 2, 5] },
        { name: "Charms and salt", text: "charms nailed over doors, and salt on every threshold", causes: [0, 1, 3] },
        { name: "Spoilt flame", text: "candles burning blue, and fires that will not catch", causes: [2, 3, 4] },
        { name: "Things moved", text: "chairs turned to the wall, crockery cracked, doors found open in the morning", causes: [0, 2, 4] } ] },
    { row: "People", taints: [
        { name: "Lost time", text: "hours no one remembers, candles burnt too far, meals gone cold", causes: [1, 2, 5] },
        { name: "Shared dreams", text: "the whole village dreaming one dream, and sleepwalkers by night", causes: [1, 3, 5] },
        { name: "Turned earth", text: "fresh-dug earth where no one admits to digging", causes: [0, 2, 4] },
        { name: "The long way round", text: "a place everyone walks around, and no one will say why", causes: [0, 3, 4] },
        { name: "Untaught rhymes", text: "children singing a rhyme no one taught them", causes: [1, 2, 3] },
        { name: "Grey sickness", text: "grey skin and aching joints with no fever, worst near one place", causes: [0, 4, 5] } ] }
];
// Roll a d66; if the Taint cannot mean the Cause, reroll the second die until it can (Building Challenges and Ordeals, step 4b)
function rollTaint(ci, exceptRow) {
    let row; const rolls = [];
    do { row = d(6); } while (row === exceptRow);
    const list = TAINT_ROWS[row - 1].taints;
    rolls.push(row);
    let k;
    do { k = d(6) - 1; rolls.push(k + 1); } while (!list[k].causes.includes(ci));
    const t = list[k];
    return { rolls, row, n: `${row}${k + 1}`, name: t.name, text: t.text, could: t.causes.map(c => CAUSE_SHORT[c]), sense: TAINT_ROWS[row - 1].row };
}
const TASKS = {
    Corpus:   ['Repair or rebuild', 'Descend somewhere dangerous', 'Hunt or drive off', 'Escort through danger', 'Hold a position', 'Carry supplies through'],
    Anima:    ['Investigate records', 'Negotiate a truce', 'Expose a lie', 'Rally the people', 'Track to a source', 'Uncover a hidden figure'],
    Spiritus: ['Cleanse or ward', 'Bargain with an entity', 'Heal the afflicted', 'Banish or bind', 'Read the omens', 'Undo a working']
};
const GENERAL_OMENS = ['The first death, in public', 'The last of something runs out', 'A leader falls or flees',
                       'Violence in the street', 'The dead walk at noon', 'The Sisters stand in the square'];

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
    let inner;
    if (v <= 0) inner = `<text x="50" y="66" text-anchor="middle" font-size="46" font-weight="bold" fill="var(--blood)">0</text>`;
    else if (v === 1 && sigilOK) inner = sigil(18, 18, 64);
    else inner = PIPS[v].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="${v === 1 ? 11 : 9}" fill="var(--ink)"/>`).join('');
    return `<svg viewBox="0 0 100 100" aria-hidden="true"><rect x="5" y="9" width="90" height="88" rx="16" fill="var(--bone-shade)"/>
        <rect x="5" y="3" width="90" height="88" rx="16" fill="var(--bone)" stroke="var(--edge)" stroke-width="4"/>
        <g transform="translate(0,-3)">${inner}</g></svg>`;
}
const diceHTML = (values, cls = '') => `<span class="tg-dice">${values.map(v =>
    `<span class="tg-die ${cls}" data-v="${v}" title="d6: ${v}"></span>`).join('')}</span>`;

// Draw every die inside root; animate = tumble and flicker before settling.
function hydrateDice(root, animate) {
    const dice = Array.from(root.querySelectorAll('.tg-die'));
    const paint = (el, v) => { el.innerHTML = d6Svg(v); };
    if (!animate || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        dice.forEach(el => paint(el, +el.dataset.v)); return;
    }
    const moving = dice.filter(el => !el.classList.contains('tg-static'));
    dice.filter(el => el.classList.contains('tg-static')).forEach(el => paint(el, +el.dataset.v));
    moving.forEach(el => el.classList.add('rolling'));
    let ticks = 0;
    const t = setInterval(() => {
        moving.forEach(el => paint(el, d(6)));
        if (++ticks >= 6) {
            clearInterval(t);
            moving.forEach(el => { paint(el, +el.dataset.v); el.classList.remove('rolling'); });
        }
    }, 75);
}

/* =====================================================================
   3. GENERATE
   ===================================================================== */

const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
const cap = s => s ? s.charAt(0).toUpperCase() + s.slice(1) : s;
const goalOf = n => GOALS.find(g => g.n === n);

function rollFragment(reveals) {
    const r = d(6);
    return Object.assign({ roll: r, reveals, found: false }, FRAGMENTS[r - 1]);
}
function rollHerring(goal, useLie) {
    if (useLie && goal) {
        return { lie: true, name: 'The Adversary’s favourite lie', text: goal.lie.replace(/\.$/, ''), exposed: 'Lore, Wits or Anima: the Goal’s own lie never holds up under testing',
                 form: 'Rumour', points: 'Cause', found: false, state: 'unknown' };
    }
    const r = d(6), h = HERRINGS[r - 1];
    return { roll: r, name: h.name, text: h.text, exposed: h.exposed, form: HERRING_FORM[h.name], points: d(2) === 1 ? 'task' : 'Cause', found: false, state: 'unknown' };
}
function rollEncounter(goal) {
    const r = d(6), e = ENCOUNTERS[r - 1];
    if (e.kind !== 'Signature') return { roll: r, kind: e.kind, text: e.text, added: true };
    if (goal) { const s = d(6); return { roll: r, roll2: s, kind: 'Signature', text: goal.signature[s - 1], added: true }; }
    return { roll: r, kind: 'Signature', text: 'An encounter tied to the Cause itself: its servants, its victims, or the wrongness of the place.', added: true };
}
// Scale a task's encounters to the party: trim the listed ones or add rolled ones
function scaleEncounters(listed, tier, party, goal) {
    const want = ENC_BY_PARTY[partyBand(party)][tier];
    const out = listed.slice(0, want).map(t => ({ kind: 'Listed', text: t }));
    while (out.length < want) out.push(rollEncounter(goal));
    return out;
}
function seedFalse(ev, goal, tier, isGoal) {
    const n = ORDEAL_TIERS[Math.min(tier, 2)].falses;
    ev.falses = [];
    for (let i = 0; i < n; i++) ev.falses.push(rollHerring(goal, isGoal && tier >= 1 && i === 0));
    // Order the clue list: true task Fragments with False ones mixed in; the Cause Fragment always last
    const order = ev.fragments.slice(0, -1).map((f, i) => 't' + i);
    ev.falses.forEach((f, i) => order.splice(d(order.length + 1) - 1, 0, 'f' + i));
    order.push('t' + (ev.fragments.length - 1));
    ev.order = order;
}
function newEvent(base) {
    return Object.assign({ id: uid(), status: 'seeking', waited: 0, ruin: null, ruinZero: false, insight: false,
                           blight: null, weather: null, setbacks: [], log: [], participants: null }, base);
}
function tierChoice(choice, needed) {
    if (choice === 'roll') { const r = d(6); return { tier: tierFromD6(r), tierRoll: r, tierHow: 'rolled' }; }
    if (choice === 'auto') return { tier: needed, tierRoll: null, tierHow: 'the tier the party needs next' };
    return { tier: +choice, tierRoll: null, tierHow: 'chosen' };
}

// An Ordeal from the Goal's table: roll 1d6, rerolling Ordeals already used
function generateGoalOrdeal(goal, tier, used, party) {
    const T = TIERS[tier], free = [1, 2, 3, 4, 5, 6].filter(n => !used.includes(n));
    if (!free.length) return { error: `All six ${T} Ordeals of ${goal.name} have been used. Use the general generator, or remove one from the Ledger.` };
    const rolls = []; let r;
    do { r = d(6); rolls.push(r); } while (used.includes(r));
    const o = goal.tiers[T][r - 1];
    const tasks = o.tasks.map(t => ({ attr: t.attr, site: t.site, text: t.text,
        encounters: scaleEncounters(t.encounters, tier, party, goal), state: 'open', style: false }));
    const fragments = o.tasks.map((t, i) => ({ form: t.fragForm, text: t.frag, reveals: `Task ${i + 1}`, found: false }));
    fragments.push({ form: o.causeFragForm, text: o.causeFrag, reveals: tier === 2 ? 'the Cause, and a Thread' : 'the Cause', found: false, cause: true });
    const ev = newEvent({ kind: 'ordeal', source: 'goal', goalN: goal.n, ordealN: r, rolls, tier, party,
        name: o.name, where: o.where, trouble: o.trouble, cause: { text: o.cause },
        causeEncounter: o.causeEncounter || null, tasks, fragments,
        omen: { text: o.omen }, success: o.success, thread: !!o.thread, reckoningTask: o.reckoningTask || null,
        sigTaint: goal.taint || null });
    seedFalse(ev, goal, tier, true);
    return ev;
}

// The general Ordeal Generator from Playing the Game (no Thread, no Hold)
// shape: the tier whose structure (tasks, encounters, Fragments) is used; defaults to the Ordeal's own tier.
// General Major Ordeals on a Fated Road run at the Moderate structure but still count, and are judged, as Major.
function generateGeneralOrdeal(tier, party, goal, forced, shape) {
    const ext = forced && forced.extraTask ? 1 : 0;
    if (shape === undefined) shape = tier;
    const T = ORDEAL_TIERS[shape];
    const placeRoll = d(6), troubleRoll = d(6);
    let cause;
    if (forced && forced.cause) cause = { text: forced.cause, ci: CAUSES.indexOf(forced.cause) };
    else { const rolls = []; let r; do { r = d(6); rolls.push(r); } while (r === 6); cause = { rolls, text: CAUSES[r - 1], ci: r - 1 }; }
    // Taint from the Cause; a Major Ordeal also gets the optional Deepening Taint, which arrives with its Omen
    // a Cause that spreads (Blight 3–4) keeps the Taint it already had
    const taint = forced && forced.taint ? forced.taint : cause.ci >= 0 ? rollTaint(cause.ci) : null;
    const taint2 = taint && cause.ci >= 0 && tier >= 2 ? rollTaint(cause.ci, taint.row) : null;
    const tasks = [];
    for (let i = 0; i < T.tasks + ext; i++) { const ar = [d(6)]; tasks.push({ attrRolls: ar, attr: attrFromD6(ar[0]), state: 'open', style: false }); }
    if (tasks.every(t => t.attr === tasks[0].attr)) {   // at least two attributes
        const last = tasks[tasks.length - 1]; let r;
        do { r = d(6); last.attrRolls.push(r); } while (attrFromD6(r) === tasks[0].attr);
        last.attr = attrFromD6(r); last.forcedAttr = true;
    }
    tasks.forEach(t => { t.roll = d(6); t.text = TASKS[t.attr][t.roll - 1]; t.encounters = scaleEncounters([], shape, party, null); });
    const fragments = tasks.map((t, i) => { const f = rollFragment(`Task ${i + 1}`); return { form: f.type, roll: f.roll, text: '', reveals: f.reveals, found: false }; });
    const cf = rollFragment('the Cause');
    fragments.push({ form: cf.type, roll: cf.roll, text: '', reveals: 'the Cause', found: false, cause: true });
    const omenRoll = d(6);
    const ev = newEvent({ kind: 'ordeal', source: 'general', tier, party, extraTask: !!ext,
        place: { roll: placeRoll, text: PLACES[placeRoll - 1] }, trouble: TROUBLES[troubleRoll - 1], troubleRoll,
        name: `${PLACES[placeRoll - 1]}: ${TROUBLES[troubleRoll - 1].toLowerCase()}`, cause,
        causeEncounter: tier >= 1 ? 'The Cause itself, with its guards' : null, tasks, fragments, taint, taint2,
        omen: { roll: omenRoll, text: GENERAL_OMENS[omenRoll - 1] }, success: 'The Trouble is resolved and the place changes for good.',
        spreadFrom: forced ? forced.from : null, holdBreaker: false, shape, sigTaint: forced && forced.sigTaint ? forced.sigTaint : null });
    seedFalse(ev, goal, shape, false);
    return ev;
}

// The Reckoning: one task per Thread held, plus one per Hold
function generateReckoning(road) {
    const goal = goalOf(road.goalN), R = goal.reckoning, party = road.chars.length;
    const tasks = road.threads.slice(0, 5).map(n => {
        const t = R.tasks.find(x => x.from === n) || R.tasks[n - 1];
        return { attr: t.attr, site: '', text: t.text, from: n, encounters: scaleEncounters([], 3, party, goal), state: 'open', style: false };
    });
    for (let i = 0; i < road.holds; i++) {
        const ar = d(6), attr = attrFromD6(ar);
        tasks.push({ attr, site: '', text: `break the Adversary’s Hold ${i + 1}: a fortress rebuilt, a servant raised, a chain mended`, hold: true,
                     encounters: scaleEncounters([], 3, party, goal), state: 'open', style: false });
    }
    const fragments = road.threads.slice(0, 5).map((n, i) => ({ form: 'Thread', text: `the Thread of Major Ordeal ${n}`, reveals: `Task ${i + 1}`, found: true }));
    fragments.push({ form: 'Vision', text: cap(R.heart), reveals: 'the Heart: where the Adversary can be faced', found: !!road.heart, cause: true });
    const ev = newEvent({ kind: 'ordeal', source: 'reckoning', goalN: goal.n, tier: 3, party,
        name: R.name, where: 'The Adversary’s seat, and every site of the Goal’s Major Ordeals.', trouble: goal.heldBy.toLowerCase(),
        cause: { text: goal.adversaryName }, causeEncounter: R.adversary, tasks, fragments, falses: [], order: [],
        omen: { text: 'the Heart opens, and the Adversary turns its whole face towards you' }, success: R.success });
    ev.order = fragments.map((f, i) => 't' + i);
    ev.status = road.heart ? 'prepared' : 'seeking';
    return ev;
}

function generateChallenge(choice, locked, road) {
    const free = ATTRS.filter(a => !locked.includes(a));
    if (!free.length) return { error: 'All three attributes are Locked, so there is no attribute left for a Challenge to test.' };
    let tier, tierRoll = null, tierHow;
    if (choice === 'roll') { tierRoll = d(6); tier = tierFromD6(tierRoll); tierHow = 'rolled'; }
    else if (choice === 'locked') { tier = Math.min(2, locked.length); tierHow = `${locked.length} Locked + 1`; }
    else if (choice === 'band') {
        if (!road) return { error: 'Begin a Fated Road first, or choose a tier.' };
        tier = bandOf(Math.min(...road.chars.map(c => c.degree))); tierHow = 'the party’s band';
    }
    else { tier = +choice; tierHow = 'chosen'; }
    const attrRolls = []; let attr;
    do { const r = d(6); attrRolls.push(r); attr = attrFromD6(r); } while (locked.includes(attr));
    const trialRoll = d(6), siteRoll = d(6), omenRoll = d(6), T = CHALLENGE_TIERS[tier];
    const fragments = [];
    for (let i = 0; i < T.fragments; i++) fragments.push(rollFragment(CHALLENGE_REVEALS[i]));
    return newEvent({ kind: 'challenge', tier, tierRoll, tierHow, attr, attrRolls,
        trial: { roll: trialRoll, text: TRIALS[attr][trialRoll - 1] }, site: { roll: siteRoll, text: SITES[siteRoll - 1] },
        fragments, omen: Object.assign({ roll: omenRoll }, CHALLENGE_OMENS[omenRoll - 1]) });
}

/* =====================================================================
   4. ROAD
   ===================================================================== */

const STORE_KEY = 'bf-trial-generator-v2';
let store = { road: null, ledger: [], hide: false, locked: [], tab: 'road' };
try { const raw = localStorage.getItem(STORE_KEY); if (raw) store = Object.assign(store, JSON.parse(raw)); } catch (e) { /* no storage */ }
const save = () => { try { localStorage.setItem(STORE_KEY, JSON.stringify(store)); } catch (e) { /* no storage */ } };

const bandOf = degree => (degree <= 3 ? 0 : degree <= 5 ? 1 : 2);   // Minor 1st–3rd, Moderate 4th–5th, Major 6th–9th
const nextTier = degree => (degree >= 9 ? 3 : DEGREE_NEED[degree + 1][0]);
const partyNeeds = road => Math.min(2, Math.min(...road.chars.filter(c => !c.consumed).map(c => nextTier(c.degree)).concat([2])));

function newRoad(goalN, goalRoll, party) {
    const chars = [];
    for (let i = 0; i < party; i++) chars.push({ name: `Character ${i + 1}`, degree: 1, progress: 0, doom: 6, consumed: false });
    return { goalN, goalRoll, chars, used: { Minor: [], Moderate: [], Major: [] }, done: { Minor: 0, Moderate: 0, Major: 0 },
             failed: 0, holds: 0, threads: [], heart: false, lastTier: -1, ended: null, log: [] };
}
const roadLog = text => { if (store.road) store.road.log.unshift(text); };

function doomBAM(road) {
    const active = store.ledger.find(e => e.kind === 'ordeal' && e.status === 'begun' && e.source !== 'general');
    let t = active ? active.tier : road.lastTier;
    let i = t <= 0 ? 1 : t + 1;   // Minor/none 13, Moderate 16, Major 19, Reckoning 22
    if (road.holds >= 3) i++;
    return { text: bam(i), harder: road.holds >= 3 };
}
function setDoom(c, v) {
    c.doom = Math.max(0, Math.min(doomMax(c.degree), v));
    if (c.doom === 0 && !c.consumed) {
        c.consumed = true; store.road.holds++;
        roadLog(`${c.name} is Consumed: they pass out of play as the Adversary’s instrument, and the Adversary gains a Hold.`);
    }
}

// Count a completed Ordeal for one character, by the rules in Advancement
function countOrdeal(c, tier, isGoal) {
    if (c.consumed || c.degree >= 9 || tier > 2) return null;
    const nd = c.degree + 1, [needTier, needN] = DEGREE_NEED[nd];
    let add = 0;
    if (tier === needTier) add = 1;
    else if (tier > needTier && !GATES.includes(nd)) add = 2;
    if (!add) return `${c.name}: a ${TIERS[tier]} Ordeal does not count towards ${ordinal(nd)} Degree${GATES.includes(nd) ? ` (only a ${TIERS[needTier]} Ordeal opens the gate)` : ''}.`;
    c.progress += add;
    c.progress = Math.min(c.progress, needN);   // no single Ordeal raises a character more than one Degree
    if (c.progress >= needN) {
        c.degree = nd; c.progress = 0; c.doom = doomMax(c.degree);
        return `${c.name} reaches ${ordinal(nd)} Degree at the end of the session: +${DEGREE_SP[nd]} skill points, and Doom is fully restored (max ${doomMax(nd)}).`;
    }
    return `${c.name}: ${CUM_NEED[c.degree][needTier] + c.progress} of ${CUM_NEED[nd][needTier]} ${TIERS[needTier]} Ordeals towards ${ordinal(nd)} Degree.`;
}

/* =====================================================================
   5. LEDGER
   ===================================================================== */

let preview = null;   // the most recent generated item, not yet kept
const find = id => (preview && preview.id === id ? preview : store.ledger.find(e => e.id === id));
const inLedger = ev => store.ledger.some(e => e.id === ev.id);
const log = (ev, text) => { ev.log.push(text); };
const isTrulyPrepared = ev => ev.fragments.every(f => f.found);
const foundCount = ev => ev.fragments.filter(f => f.found).length + (ev.falses || []).filter(f => f.found && f.state !== 'exposed').length;
const needed = ev => ev.fragments.length;
const goalEvent = ev => ev.source === 'goal' || ev.source === 'reckoning';

function title(ev) {
    if (ev.kind === 'challenge') return `${TIERS[ev.tier]} ${ev.attr} Challenge`;
    if (ev.kind === 'training') return `${TIERS[ev.tier]} Training: ${ev.skill} (${ev.traineeName})`;
    if (ev.source === 'reckoning') return `The Reckoning: ${ev.name}`;
    if (ev.source === 'goal') return `${TIERS[ev.tier]} Ordeal ${ev.ordealN}: ${ev.name}`;
    return `${TIERS[ev.tier]} Ordeal: ${ev.name}`;
}
// What a solo player may see. Task i shows when its Fragment is found; the Cause when the last Fragment is.
function revealed(ev, key) {
    if (!store.hide) return true;
    if (ev.kind === 'challenge') return key === 'trial' ? ev.fragments[0].found : key === 'site' ? !!(ev.fragments[1] && ev.fragments[1].found) : true;
    if (key === 'cause') return ev.fragments[ev.fragments.length - 1].found;
    if (typeof key === 'number') return ev.fragments[key].found;
    return true;
}

function updatePrepared(ev) {
    const n = foundCount(ev);
    if (ev.status === 'seeking' && n >= needed(ev)) { ev.status = 'prepared'; ev.waited = 0; log(ev, `${n} Fragments held: the party believes the event is Prepared. Roll for its Omen at the end of each Watch in the footprint.`); }
    else if (ev.status === 'prepared' && n < needed(ev) && ev.source !== 'reckoning') { ev.status = 'seeking'; log(ev, 'No longer Prepared.'); }
}
function toggleClue(ev, ref, found) {
    const isF = ref[0] === 'f', i = +ref.slice(1), c = isF ? ev.falses[i] : ev.fragments[i];
    c.found = found;
    const label = ev.kind === 'challenge' ? `Fragment ${i + 1} (${c.type})` : `a ${c.form} Fragment`;
    log(ev, `${found ? 'Found' : 'Unmarked'} ${label}.`);
    updatePrepared(ev);
}
function omenLine(ev) {
    if (ev.kind === 'challenge') return `${ev.omen.text} (begins: ${ev.omen.begins.toLowerCase()}).`;
    return `${cap(ev.omen.text)}.`;
}
function beginOrdeal(ev) {
    ev.status = 'begun';
    if (ev.kind !== 'ordeal') return;
    ev.ruin = 6;
    const T = ORDEAL_TIERS[ev.tier];
    log(ev, `The Omen arrives: ${omenLine(ev)} The Ruin die is set to 6. ${T.omenWhere}`);
    if (store.road && goalEvent(ev)) store.road.lastTier = ev.tier;
}
function missingTell(ev) {
    const next = ev.fragments.find(f => !f.found);
    const F = FRAG_BY[next.form];
    return `The next missing true Fragment is a ${next.form}${F ? `: ${F.desc}, gained by ${F.by}` : ''}.`;
}
function omenRoll(ev) {
    const r = d(6), total = r + ev.waited;
    const sum = `d6 ${r}${ev.waited ? ` +${ev.waited} waited` : ''} = ${total}`;
    if (total < 6) { log(ev, `End of Watch Omen roll: ${sum}. No Omen yet.`); ev.waited++; return; }
    if (isTrulyPrepared(ev)) { log(ev, `End of Watch Omen roll: ${sum}.`); beginOrdeal(ev); return; }
    ev.waited = 0;
    log(ev, `End of Watch Omen roll: ${sum}. An Omen comes, but the event does not begin: a Fragment you hold is false. ${missingTell(ev)}`);
}
function earlyOmen(ev) {
    if (isTrulyPrepared(ev)) { if (ev.kind === 'challenge') { ev.status = 'begun'; log(ev, `An Omen arrives: ${omenLine(ev)}`); } else beginOrdeal(ev); return; }
    log(ev, ev.status === 'prepared'
        ? `An Omen comes, but the event does not begin: a Fragment you hold is false. ${missingTell(ev)}`
        : `An Omen came before the event was Prepared. ${missingTell(ev)}`);
}
function lowerRuin(ev, why) {
    if (ev.ruin === null || ev.ruin <= 0) return '';
    ev.ruin--;
    let t = ` The Ruin die drops to ${ev.ruin}.`;
    if (ev.ruin === 0) {
        ev.ruinZero = true; rollBlight(ev, true);
        t += ` The Trouble peaks: Blight (d6 ${ev.blight.roll}): ${ev.blight.text}. The decisive check can still be made, at Moderate Disadvantage, and success restores no Doom.`;
    }
    return t;
}
function setback(ev, why) {
    const r = d(6), S = SETBACKS[r - 1];
    const rec = { roll: r, name: S.name, why };
    ev.setbacks.push(rec);
    let t = `Setback (${why}; d6 ${r}): ${S.name}. ${S.text}`;
    t += lowerRuin(ev);
    t += ' A character may spend 1 Boon Point to cancel it; the Ruin die still drops.';
    log(ev, t);
    return rec;
}
// Companions as Seconds (Fated Road › Party Size): a Companion Supports at the task's BAM!,
// +2 / +4 / +6 by the Focus that granted it; success gives Minor Advantage only.
const COMP_BONUS = [[2, 'Competent'], [4, 'Accomplished'], [6, 'Adept']];
function companionSupport(ev, i, bonus, failing) {
    const t = ev.tasks[i], target = BAMS[ORDEAL_TIERS[ev.tier].task][1];
    const r = d(20), total = r + bonus - (failing ? 1 : 0);
    const mishap = r === 1, ok = !mishap && (r === 20 || total >= target);
    (t.comp = t.comp || []).push({ r, bonus, failing: !!failing, total, ok, mishap });
    t.compBonus = bonus; t.compFailing = !!failing;   // remember the picker for the next roll
    let m = `Task ${i + 1}: Companion Support (+${bonus}${failing ? ', Minor Disadvantage: Doom Failing' : ''}): d20 ${r}, total ${total} against ${target}. `;
    m += mishap ? 'Natural 1: a Skill Mishap for the Companion, and no Support.' : ok ? 'Success: Minor Advantage for the Lead (a Companion never gives more than Minor).' : 'Failed: no Support.';
    log(ev, m);
}
function compSummary(t) {
    if (!t.comp || !t.comp.length) return '';
    const okN = t.comp.filter(c => c.ok).length;
    return `<ul class="tg-comp-results">` + t.comp.map(c => `<li><span class="tg-d20">d20 ${c.r}</span> <span>+${c.bonus}${c.failing ? ' −1' : ''} = ${c.total}: ${c.mishap ? '<strong>Skill Mishap</strong>' : c.ok ? '<strong>Supports</strong>' : 'fails'}</span></li>`).join('') +
        `</ul>` + (okN ? `<span class="tg-small">Companion Support gives <strong>Minor Advantage</strong>. Moderate needs two successful Supports from characters.</span>` : '');
}
function rollBlight(ev, ruinPeak) {
    const r = d(6);
    ev.blight = ev.kind === 'challenge'
        ? { roll: r, text: CHALLENGE_BLIGHTS[r - 1] }
        : { roll: r, text: ORDEAL_BLIGHTS[r <= 2 ? 0 : r <= 4 ? 1 : 2] + (ev.tier >= 2 && (r === 3 || r === 4) ? ' (a Major Ordeal spreads as a Major Ordeal with one more task)' : ''),
            spreads: (r === 3 || r === 4) && ev.source !== 'reckoning', peak: !!ruinPeak };
    if (!ruinPeak) log(ev, `Blight (d6 ${r}): ${ev.blight.text}.`);
}
function rollWeather(ev) {
    const a = d(6), b = d(6), t = a + b, w = WEATHER.find(x => t >= x[0] && t <= x[1]);
    ev.weather = { rolls: [a, b], name: w[2], text: w[3] };
    log(ev, `Weather this Watch (2d6 ${t}): ${w[2]}. ${w[3]}`);
}
function rollDanger(ev) {
    const r = d(6);
    if (r <= 3) { log(ev, `Danger Die encounter (d6 ${r}): use the region’s normal table of that rarity.`); return; }
    const e = rollEncounter(ev.goalN ? goalOf(ev.goalN) : null);
    log(ev, `Danger Die encounter (d6 ${r}): it belongs to the Ordeal. ${e.kind} (d6 ${e.roll}${e.roll2 ? `, ${e.roll2}` : ''}): ${e.text} Creatures: ${ORDEAL_TIERS[ev.tier].creatures}.`);
}
function rollWyrd(ev) {
    const r = d(6);
    let t = `Wyrd die shows 1 (d6 ${r}): ${WYRD[r - 1]}.`;
    log(ev, t);
    if (r <= 2) setback(ev, 'the Wyrd die');
    else if (r >= 5 && ev.status === 'prepared') omenRoll(ev);
}
function testClue(ev, i) {
    const f = ev.falses[i];
    f.state = 'exposed';
    const had = ev.insight; ev.insight = true;
    log(ev, `A Fragment is tested and found false: ${f.name}, ${f.text}. ${had ? 'Insight already held; it does not add up.' : 'Insight: Minor Advantage on the decisive check.'}`);
    updatePrepared(ev);
}
function testTrue(ev, i) { ev.fragments[i].tested = true; log(ev, `A ${ev.fragments[i].form} Fragment is tested and found true.`); }
function actOnFalse(ev, i) {
    const f = ev.falses[i];
    f.state = 'acted';
    log(ev, `The party acts on a False Fragment (${f.name}). The false task gives no Advantage, and the deception comes out.`);
    setback(ev, 'acting on a False Fragment');
    updatePrepared(ev);
}
function decisiveInfo(ev) {
    const T = ORDEAL_TIERS[ev.tier];
    const done = ev.tasks.filter(t => t.state === 'done').length, failed = ev.tasks.filter(t => t.state === 'failed').length;
    const steps = Math.min(3, done);   // Moderate Advantage per completed task, to a maximum of Extreme (3 steps)
    const bits = [];
    if (steps) bits.push(`${steps === 1 ? 'Moderate Advantage' : steps === 2 ? 'Moderate Advantage twice' : 'Extreme Advantage (the maximum)'} from ${plural(done, 'completed task')}: ${bam(T.decisive)} falls to ${bam(T.decisive - steps)}`);
    if (ev.insight) bits.push('Minor Advantage from Insight (a False Fragment exposed)');
    if (ev.ruinZero) bits.push('Moderate Disadvantage: the Ruin die reached 0');
    if (failed) bits.push(`${plural(failed, 'failed task')} leave${failed === 1 ? 's its complication' : ' their complications'} in play; the Narrator may apply Minor Disadvantage for each`);
    return { bam: bam(T.decisive), bits, done, steps };
}

// near: the decisive check failed by 1 or 2 (not a natural 1). The Ordeal succeeds at a cost:
// the Adversary gains a Hold (off the road, the place's Danger Die rises by 1 for good) and no Doom is restored.
function finishOrdeal(ev, ok, near) {
    ev.status = ok ? 'success' : 'failed';
    if (near) ev.nearMiss = true;
    const road = store.road, lines = [];
    const parts = road && ev.participants ? road.chars.filter((c, i) => ev.participants.includes(i)) : [];
    if (ok) {
        log(ev, near ? `Near miss: the Ordeal succeeds at a cost. ${cap(ev.success)}` : `Success. ${cap(ev.success)}`);
        if (near && !(road && (ev.source === 'goal' || ev.onRoad))) lines.push('The cost: the place’s Danger Die rises by 1 for good.');
        if (road) {
            if (ev.source === 'reckoning') {
                road.ended = 'won'; parts.forEach(c => { c.doom = doomMax(c.degree); });
                roadLog(`The Reckoning succeeds: ${ev.success}`);
            } else {
                const restore = near || ev.ruinZero || !(goalEvent(ev) || ev.onRoad) ? 0 : ev.tier + 1;
                if (ev.source === 'goal' || ev.onRoad) road.done[TIERS[ev.tier]]++;
                parts.forEach(c => {
                    const before = c.degree;
                    const m = countOrdeal(c, ev.tier, ev.source === 'goal');
                    if (c.degree === before && restore) setDoom(c, c.doom + restore);
                    if (m) lines.push(m);
                });
                if (restore) lines.push(`Doom +${restore} for each participant (never above their maximum).`);
                else if (near && (goalEvent(ev) || ev.onRoad)) lines.push('No Doom restored: a near miss.');
                else if (goalEvent(ev) && ev.ruinZero) lines.push('No Doom restored: the Ruin die reached 0.');
                if (ev.thread) { road.threads.push(ev.ordealN); lines.push(`Thread ${road.threads.length} of 5 gained: it reveals the Reckoning task “${ev.reckoningTask}”.`); }
                if (ev.holdBreaker && road.holds > 0) { road.holds--; lines.push('A Hold is broken.'); }
                if (near && (ev.source === 'goal' || ev.onRoad)) { road.holds++; lines.push(`The cost: the Adversary gains a Hold (${road.holds} now).`); }
                roadLog(`${title(ev)} ${near ? 'succeeded at a cost (near miss)' : 'succeeded'}. ${lines.join(' ')}`);
            }
        }
    } else {
        log(ev, 'The decisive check failed.');
        if (!ev.blight || !ev.ruinZero) rollBlight(ev, false);
        if (road) {
            road.failed++;
            if (ev.source === 'reckoning') {
                road.ended = 'lost';
                lines.push('The Adversary’s grip closes. The road begins again from the Major band, with a new Adversary rising from the old one’s ashes; every Hold remains.');
            } else if (ev.source === 'goal' || ev.onRoad) { road.holds++; lines.push(`The Adversary gains a Hold (${road.holds} now).`); }
            parts.forEach(c => setDoom(c, c.doom - 1));
            if (parts.length) lines.push('Every participant loses 1 Doom, with no save.');
            roadLog(`${title(ev)} failed. Blight: ${ev.blight.text}. ${lines.join(' ')}`);
        }
    }
    if (lines.length) log(ev, lines.join(' '));
}
function finishChallenge(ev, outcome) {
    ev.status = outcome;
    if (outcome === 'success') {
        const T = CHALLENGE_TIERS[ev.tier];
        log(ev, `Success. ${ev.attr} is Locked; the ${T.sister} offers ${T.gift}.`);
        if (!store.locked.includes(ev.attr)) store.locked.push(ev.attr);
    } else {
        log(ev, outcome === 'refused' ? 'The Challenge was refused.' : 'The Challenge failed.');
        rollBlight(ev, false);
    }
}

/* =====================================================================
   6. RENDER
   ===================================================================== */

/* ---------------------------------------------------------------------
   Training Ordeals (Advancement › Training Ordeals)
   A personal Ordeal that can replace one Ordeal per band for the trainee.
   --------------------------------------------------------------------- */
const SKILL_ATTR = {
    Athleticism: 'Corpus', Combat: 'Corpus', Endurance: 'Corpus', Guile: 'Anima', Wiles: 'Anima', Wits: 'Anima',
    Conjuration: 'Spiritus', Mysticism: 'Spiritus', Occultism: 'Spiritus'
};
const FOCUS_SKILL = {
    'Chain Reaction': 'Athleticism', 'Defensive Manoeuvres': 'Athleticism', 'Iron Will': 'Athleticism',
    'Martial Arts': 'Combat', 'Multiple Attacks': 'Combat', 'Area / Quick Shot': 'Combat',
    Hardened: 'Endurance', Recovery: 'Endurance', Resilience: 'Endurance',
    Influence: 'Guile', 'Devoted Follower': 'Guile', 'Soul Bound': 'Guile',
    Ambush: 'Wiles', Evasion: 'Wiles', Skulduggery: 'Wiles',
    Repair: 'Wits', Survival: 'Wits', Lore: 'Wits',
    Binding: 'Conjuration', Exorcism: 'Conjuration', Summoning: 'Conjuration',
    'Mystic Channel': 'Mysticism', Healing: 'Mysticism', Psionics: 'Mysticism',
    Alchemy: 'Occultism', Arcana: 'Occultism', Sigilcraft: 'Occultism'
};
const skillAttr = s => SKILL_ATTR[s] || SKILL_ATTR[FOCUS_SKILL[s]] || null;
// What is being trained towards sets the tier
const TRAIN_TARGETS = [['Skilled', 0], ['Expert', 0], ['Competent Focus', 0], ['Master', 1], ['Accomplished Focus', 1], ['Grand Master', 2], ['Adept Focus', 2]];
const TRAINERS = [
    { where: 'a market town or holdfast', who: ['A retired soldier who keeps a tavern', 'A guild journeyman between contracts', 'A hedge-witch at the forest’s edge', 'A temple warden', 'A caravan master', 'An old poacher who knows the woods'] },
    { where: 'a city, monastery or hermitage', who: ['A guild master', 'A monastery’s eldest', 'A disgraced court champion', 'A hermit sage', 'A famous duellist', 'The keeper of a forbidden library'] },
    { where: 'the edge of the map, often inside an Ordeal’s footprint', who: ['A legend thought dead', 'The last of a lost order', 'A Fae-touched master who bargains in years', 'A ghost who taught in life', 'An exiled grand master', 'A master who unknowingly serves the Adversary'] }
];
const PRICES = [
    'Coin: as much as the trainer thinks the trainee can bear',
    'Coin: as much as the trainer thinks the trainee can bear',
    'A service: an extra Proving task done for the trainer',
    'An item of value',
    'A Vow: a promise the trainee must keep',
    'A secret, or a Fragment the trainee holds'
];
const TRAIN_TASKS = {
    Drill: ['Repeat the form until it is flawless', 'Practise under a handicap: blindfolded, weighted or one-handed', 'Copy the trainer’s work exactly, again and again',
            'Work through the night without rest', 'Learn the theory: recite, map or diagram it', 'Teach it back to the trainer'],
    Test: ['Beat the trainer in an opposed check', 'Best the trainer’s finest student', 'Answer the trainer’s three questions',
           'Endure the trainer’s trial of pain or fear', 'Outwit a trap the trainer has set', 'Succeed where the trainer once failed'],
    Proving: ['Use the skill to save a life', 'Use it against a real enemy', 'Use it to win coin or favour in a dangerous place',
              'Fetch something only the skill can reach', 'Use it before a hostile crowd or court', 'Finish a task the trainer left undone']
};
const TRAIN_SHAPE = [['Drill', 'Proving'], ['Drill', 'Test', 'Proving'], ['Drill', 'Test', 'Proving', 'Proving']];
const LEADS = [2, 3, 4];

function trainTask(type, tier, party) {
    const r = d(6), T = ORDEAL_TIERS[tier];
    const t = { type, roll: r, text: TRAIN_TASKS[type][r - 1], state: 'open', encounters: [] };
    if (type === 'Drill') { t.bam = T.task; t.note = 'No encounters, but each attempt takes a full day.'; }
    if (type === 'Test') { t.bam = T.task + 1; t.note = 'One step harder than the task BAM!: the trainer’s own standard.'; t.encounters = [{ kind: 'Sparring', text: 'a bout with the trainer or a student: damage to Vitality only, no Critical Damage' }]; }
    if (type === 'Proving') { t.bam = T.task; t.note = 'Real encounters, at the usual number for the tier.'; t.encounters = scaleEncounters([], tier, party, null).map(e => e.kind === 'Signature'
        ? Object.assign({}, e, { kind: 'Rival', text: 'a rival who wants the same teaching, or the very danger the trainer chose this Proving for' })
        : e.kind === 'Witness' ? Object.assign({}, e, { text: 'Someone who knows the skill’s secrets. Parley at the task’s BAM!; on a success they give the trainee Minor Advantage on the Mastery check, or a Fragment for another event.' }) : e); }
    return t;
}
function generateTraining(o) {
    const tier = TRAIN_TARGETS.find(x => x[0] === o.target)[1];
    const trainerRoll = d(6), priceRoll = d(6);
    const tasks = TRAIN_SHAPE[tier].map(type => trainTask(type, tier, o.party));
    if (priceRoll === 3) { const s = trainTask('Proving', tier, o.party); s.service = true; tasks.push(s); }
    const leads = [];
    for (let i = 0; i < LEADS[tier]; i++) {
        const f = rollFragment(i === LEADS[tier] - 1 ? 'where the trainer is' : 'the way to the trainer');
        leads.push({ form: f.type, roll: f.roll, reveals: f.reveals, found: false });
    }
    return newEvent({ kind: 'training', source: 'training', tier, party: o.party, skill: o.skill, target: o.target, trainee: o.trainee,
        traineeName: o.traineeName, attr: skillAttr(o.skill),
        trainer: { roll: trainerRoll, who: TRAINERS[tier].who[trainerRoll - 1], where: TRAINERS[tier].where },
        price: { roll: priceRoll, text: PRICES[priceRoll - 1] }, prices: [], leads, tasks, patience: null });
}
// Can this training replace one of the trainee's Ordeals?
function trainingEligibility(ev) {
    const road = store.road;
    if (!road || ev.trainee == null || !road.chars[ev.trainee]) return { ok: false, why: 'Not on a Fated Road: it counts for nothing towards Degrees, but the training still succeeds or fails.' };
    const c = road.chars[ev.trainee];
    if (c.consumed) return { ok: false, why: `${c.name} is Consumed.` };
    if (c.degree >= 9) return { ok: false, why: `${c.name} already stands at 9th Degree.` };
    const nd = c.degree + 1, needT = DEGREE_NEED[nd][0], band = bandOf(c.degree);
    if (GATES.includes(nd)) return { ok: false, why: `${c.name}’s next Degree, ${ordinal(nd)}, is a gate: only a real ${TIERS[needT]} Ordeal opens it.` };
    if ((c.trained || []).includes(band)) return { ok: false, why: `${c.name} has already replaced an Ordeal with training in this band.` };
    if (ev.tier !== needT) return { ok: false, why: `${c.name} needs ${TIERS[needT]} Ordeals; this is ${TIERS[ev.tier]} training.` };
    return { ok: true, why: `It can replace one ${TIERS[needT]} Ordeal for ${c.name} (one per band).` };
}
function adversaryFeelsTraining(ev) {
    const prepared = store.ledger.filter(e => e.kind === 'ordeal' && (e.source === 'goal' || e.onRoad) && e.status === 'prepared');
    const active = store.ledger.filter(e => e.kind === 'ordeal' && (e.source === 'goal' || e.onRoad) && e.status === 'begun');
    const lines = [];
    prepared.forEach(e => { omenRoll(e); lines.push(`${title(e)}: ${e.log[e.log.length - 1]}`); log(e, `The Adversary felt the time spent training (${title(ev)}).`); });
    if (!prepared.length) lines.push('No Goal Ordeal is Prepared, so no Omen rolls.');
    active.forEach(e => lines.push(`${title(e)} is active: make sure its Ruin die fell by its usual schedule while you trained (Ruin ${e.ruin}).`));
    log(ev, `The Adversary feels the training time. ${lines.join(' ')}`);
}
function finishTraining(ev, outcome) {
    const lines = [];
    ev.status = outcome === 'failed' ? 'failed' : 'success';
    if (outcome === 'near') ev.nearMiss = true;
    if (outcome === 'failed') {
        lines.push(`Failed. The price (${ev.price.text.split(':')[0].toLowerCase()}) is lost, and this trainer will not teach ${ev.traineeName} again in this band.`);
        if (ev.tier >= 1) lines.push('A Minor Scar remains: humiliation or injury.');
    } else {
        if (outcome === 'near') { const r = d(6); ev.prices.push({ roll: r, text: PRICES[r - 1] }); lines.push(`Near miss: the trainer demands more. Second price (d6 ${r}): ${PRICES[r - 1]}. Pay both.`); }
        else lines.push('Mastery shown.');
        lines.push(`${ev.traineeName} is Trained in ${ev.skill}: at the next Degree, the next rank in it costs no skill points, and it may be taken beyond the usual one-rank-per-Degree limit.`);
        if (ev.tier === 2) lines.push('The trainer also teaches a signature technique: a Knot.');
        const E = trainingEligibility(ev);
        if (E.ok) {
            const c = store.road.chars[ev.trainee];
            (c.trained = c.trained || []).push(bandOf(c.degree));
            const m = countOrdeal(c, ev.tier, false); ev.counted = true;
            if (m) lines.push(m);
            roadLog(`${title(ev)} ${outcome === 'near' ? 'succeeded at a cost' : 'succeeded'}: it replaces one ${TIERS[ev.tier]} Ordeal for ${c.name}.`);
        } else lines.push(`It does not count towards Degrees: ${E.why}`);
        lines.push('No Doom is restored and no Thread is gained: training is not the road.');
    }
    log(ev, lines.join(' '));
    adversaryFeelsTraining(ev);
}
function lowerPatience(ev, why) {
    if (ev.patience === null || ev.patience <= 0) return;
    ev.patience--;
    log(ev, `${cap(why)}: the Patience die drops to ${ev.patience}.${ev.patience === 0 ? ' The trainer’s patience is gone: the trainee is dismissed.' : ''}`);
    if (ev.patience === 0) finishTraining(ev, 'failed');
}

const el = id => document.getElementById(id);
const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const STATUS = { seeking: 'Seeking Fragments', prepared: 'Prepared', begun: 'Begun', success: 'Succeeded', failed: 'Failed', refused: 'Refused' };
const hidden = what => `<span class="tg-hidden">Not yet revealed (${what})</span>`;
const step = (label, dice, body) => `<li class="tg-step"><div class="tg-step-label">${label}${dice || ''}</div><div>${body}</div></li>`;
const plural = (n, w) => `${n} ${w}${n === 1 ? '' : 's'}`;

function cardHTML(ev) {
    const kept = inLedger(ev);
    let h = `<article class="tg-card tg-kind-${ev.kind}${ev.source === 'reckoning' ? ' tg-kind-reckoning' : ''}" data-id="${ev.id}">
        <div class="tg-card-head"><h3>${esc(title(ev))}</h3>${kept ? `<span class="tg-status ${ev.status}">${(ev.kind === 'training' ? TRAIN_STATUS : STATUS)[ev.status]}${ev.nearMiss ? ' (near miss)' : ''}</span>` : ''}</div>`;
    if (kept) h += stageBanner(ev);
    h += ev.kind === 'training' ? trainingBody(ev, kept) : ev.kind === 'challenge' ? challengeBody(ev) + challengeFrags(ev, kept) : ordealBody(ev, kept);
    if (kept && ev.kind !== 'training') h += ev.kind === 'challenge' ? challengeTracking(ev) : ordealTracking(ev);
    if (ev.blight) h += `<div class="tg-note bad"><strong>Blight</strong> ${diceHTML([ev.blight.roll])} ${esc(ev.blight.text)}.${ev.blight.peak ? ' <span class="tg-small">(the Ruin die reached 0)</span>' : ''}` +
        (ev.blight.spreads ? `<div class="tg-buttons"><button type="button" data-act="spread">Generate the spreading Ordeal</button></div>` : '') + `</div>`;
    h += `<div class="tg-buttons">` +
        (kept ? '' : `<button type="button" class="tg-primary" data-act="keep">Keep in Ledger</button>`) +
        (!kept && ev.kind === 'ordeal' && ev.source !== 'reckoning' ? `<button type="button" data-act="reroll">Roll Again</button>` : '') +
        `<button type="button" data-act="copy">Copy as Text</button>` +
        (kept ? `<button type="button" class="tg-danger" data-act="remove">Remove</button>` : '') +
        `<span class="tg-small tg-muted" data-copied></span></div>`;
    if (kept && ev.log.length) h += `<details class="tg-log"><summary>Event log (${ev.log.length})</summary><ol>${ev.log.map(l => `<li>${esc(l)}</li>`).join('')}</ol></details>`;
    return h + `</article>`;
}

const TRAIN_STATUS = { seeking: 'Seeking the trainer', prepared: 'Trainer found', begun: 'In training', success: 'Trained', failed: 'Failed' };
function trainingBody(ev, kept) {
    const T = ORDEAL_TIERS[ev.tier], E = trainingEligibility(ev);
    const done = ev.tasks.filter(t => t.state === 'done').length, steps = Math.min(3, done);
    let h = `<p class="tg-summary"><em>Training Ordeal.</em> ${esc(ev.traineeName)} trains <strong>${esc(ev.skill)}</strong> towards <strong>${esc(ev.target)}</strong>. ` +
        `${plural(ev.tasks.length, 'task')}; the Mastery check is <strong>${bam(T.decisive)}</strong>. Needs <strong>${ev.leads.length}</strong> leads to find the trainer.</p>`;
    h += `<p class="tg-note${E.ok ? '' : ' bad'}">${esc(E.why)}</p><ul class="tg-steps">`;
    h += step('Tier', '', `<strong>${TIERS[ev.tier]}</strong> <span class="tg-muted tg-small">(set by training towards ${esc(ev.target)})</span>`);
    h += step('Trainer', diceHTML([ev.trainer.roll]), `${esc(ev.trainer.who)}, found in ${esc(ev.trainer.where)}. The trainer must hold a higher rank than ${esc(ev.target)}.`);
    h += step('Price', diceHTML([ev.price.roll]), esc(ev.price.text) + (ev.prices.length ? `. <strong>Also:</strong> ${ev.prices.map(p => esc(p.text)).join('; ')}` : ''));
    h += step('The Adversary', '', 'The road does not wait. When the training ends, every Prepared Goal Ordeal makes its Omen roll at once, and an active Ordeal’s Ruin die keeps falling while you train.');
    h += `</ul>`;

    // Leads
    h += `<h4>Leads to the trainer</h4><ol class="tg-frags">`;
    ev.leads.forEach((l, i) => {
        const F = FRAG_BY[l.form];
        h += `<li class="tg-frag">${diceHTML([l.roll])}<div><strong>${esc(l.form)}</strong>${F ? `: ${esc(F.desc)}` : ''}. <span class="tg-muted">Reveals ${esc(l.reveals)}.</span>` +
            (kept && ev.status === 'seeking' ? ` <button type="button" data-act="t-lead" data-i="${i}" aria-pressed="${l.found}">${l.found ? 'Found' : 'Mark found'}</button>` : l.found ? ' <span class="tg-small">Found</span>' : '') + `</div></li>`;
    });
    h += `</ol>`;
    if (kept && ev.status === 'prepared') h += `<div class="tg-buttons"><button type="button" class="tg-primary" data-act="t-begin">Pay the price and begin training</button></div>`;

    // Tasks
    h += `<h4>Lessons</h4><ol class="tg-tasks">`;
    const begun = kept && ev.status === 'begun';
    ev.tasks.forEach((t, i) => {
        h += `<li class="tg-task"><div class="tg-task-body"><strong>${t.service ? 'Service (Proving)' : t.type}</strong> ${diceHTML([t.roll])} ` +
            `<strong>${esc(ev.skill)}${ev.attr ? ` (${ev.attr})` : ''}:</strong> ${esc(t.text)} at <strong>${bam(t.bam)}</strong>. <span class="tg-muted tg-small">${esc(t.note)}</span>` +
            (t.encounters.length ? `<ul class="tg-encs">` + t.encounters.map(e => `<li>${e.roll ? diceHTML(e.roll2 ? [e.roll, e.roll2] : [e.roll]) : ''}<span><strong>${e.kind === 'Listed' ? 'Encounter' : e.kind}:</strong> ${esc(cap(e.text))}</span></li>`).join('') + `</ul>` : '') + `</div>`;
        if (begun) h += `<div class="tg-task-state" role="group" aria-label="${t.type} result">
                <button type="button" data-act="t-task" data-i="${i}" data-state="done" aria-pressed="${t.state === 'done'}">Completed</button>
                <button type="button" data-act="t-task" data-i="${i}" data-state="failed" aria-pressed="${t.state === 'failed'}">Failed</button></div>`;
        else if (t.state !== 'open') h += `<span class="tg-small">${t.state === 'done' ? 'Completed' : 'Failed'}</span>`;
        h += `</li>`;
    });
    h += `</ol><p class="tg-small tg-muted">The trainee Leads every lesson. Others may act as Seconds and Support, but only the trainee counts the training.</p>`;

    if (begun) {
        h += `<div class="tg-ruin"><span class="tg-ruin-die">${diceHTML([Math.max(ev.patience, 1)], 'big')}</span><div><strong>Patience die: ${ev.patience}</strong><br>
            <span class="tg-small">Drops by 1 for each failed lesson, each natural 1 and each day lost to other business. At 0 the trainer dismisses the trainee.</span>
            <div class="tg-buttons"><button type="button" data-act="t-day">A day lost to other business</button><button type="button" data-act="t-nat1">A natural 1</button></div></div></div>`;
        h += `<div class="tg-decisive"><h4>The Mastery check: ${bam(T.decisive)}</h4>
            <p>${steps ? `${steps === 3 ? 'Extreme Advantage (the maximum)' : steps === 2 ? 'Moderate Advantage twice' : 'Moderate Advantage'} from ${plural(done, 'completed lesson')}: ${bam(T.decisive)} falls to ${bam(T.decisive - steps)}.` : 'No Advantage from lessons yet.'}</p>
            <div class="tg-buttons"><button type="button" class="tg-primary" data-act="t-finish" data-out="success">Succeeded</button><button type="button" data-act="t-finish" data-out="near" title="Failed by 1 or 2, and not a natural 1">Near miss (failed by 1–2)</button><button type="button" class="tg-danger" data-act="t-finish" data-out="failed">Failed</button></div>
            <p class="tg-small tg-muted">Near miss: it succeeds, but the trainer demands a second price.</p></div>`;
    }
    if (ev.status === 'success' || ev.status === 'failed') h += `<p class="tg-note${ev.status === 'failed' ? ' bad' : ''}">${esc(ev.log.slice(-2).join(' '))}</p>`;
    return h;
}
function trainingText(ev) {
    const T = ORDEAL_TIERS[ev.tier], L = [];
    L.push(`${ev.traineeName} trains ${ev.skill} towards ${ev.target}. Mastery check ${bam(T.decisive)}.`);
    L.push(`Trainer: ${ev.trainer.who}, in ${ev.trainer.where}.`);
    L.push(`Price: ${ev.price.text}${ev.prices.length ? `; also ${ev.prices.map(p => p.text).join('; ')}` : ''}.`);
    L.push('Leads:'); ev.leads.forEach(l => L.push(`  ${l.found ? '[x]' : '[ ]'} ${l.form} (reveals ${l.reveals})`));
    ev.tasks.forEach(t => { L.push(`${t.service ? 'Service (Proving)' : t.type}: ${t.text} at ${bam(t.bam)}${t.state !== 'open' ? ` [${t.state === 'done' ? 'completed' : 'failed'}]` : ''}`); t.encounters.forEach(e => L.push(`    - ${e.kind === 'Listed' ? 'Encounter' : e.kind}: ${cap(e.text)}`)); });
    if (ev.patience !== null) L.push(`Patience die: ${ev.patience}`);
    return L.join('\n');
}

function challengeBody(ev) {
    const T = CHALLENGE_TIERS[ev.tier];
    let h = `<p class="tg-summary">Tests <strong>${ev.attr}</strong> against <strong>${T.bam}</strong>. Presented by the ${T.sister}; on success ${ev.attr} Locks and she offers ${T.gift}. Needs <strong>${T.fragments}</strong> Fragments. On the Fated Road, one Challenge per band; it can be woven into an Ordeal of the same tier.</p><ul class="tg-steps">`;
    h += step('Tier', ev.tierRoll ? diceHTML([ev.tierRoll]) : '', `<strong>${TIERS[ev.tier]}</strong>${ev.tierRoll ? '' : ` <span class="tg-muted tg-small">(${esc(ev.tierHow)})</span>`}`);
    h += step('Attribute', diceHTML(ev.attrRolls), `<strong>${ev.attr}</strong>${ev.attrRolls.length > 1 ? ' <span class="tg-muted tg-small">(rerolled past Locked attributes)</span>' : ''}`);
    h += step('Trial', revealed(ev, 'trial') ? diceHTML([ev.trial.roll]) : '', revealed(ev, 'trial') ? esc(ev.trial.text) : hidden('first Fragment'));
    h += step('Site', revealed(ev, 'site') ? diceHTML([ev.site.roll]) : '', revealed(ev, 'site') ? esc(ev.site.text) : hidden('second Fragment'));
    h += step('Omen', diceHTML([ev.omen.roll]), `${esc(ev.omen.text)}. <span class="tg-muted">Begins: ${esc(ev.omen.begins)}.</span>`);
    return h + `</ul>`;
}
function challengeFrags(ev, kept) {
    let h = `<h4>Fragments</h4><ol class="tg-frags">`;
    ev.fragments.forEach((f, i) => {
        const canTick = kept && (ev.status === 'seeking' || ev.status === 'prepared');
        h += `<li>${kept ? `<input type="checkbox" data-act="frag" data-ref="t${i}" aria-label="Fragment ${i + 1} found"${f.found ? ' checked' : ''}${canTick ? '' : ' disabled'}>` : ''}
            ${diceHTML([f.roll])}<div class="tg-frag-body${f.found ? ' found' : ''}"><strong>${i + 1}. ${f.type}:</strong> ${f.desc}.
            <span class="tg-small">Gained by ${f.by}. Reveals ${f.reveals}.</span></div></li>`;
    });
    return h + `</ol>`;
}
function challengeTracking(ev) {
    let h = '<div class="tg-buttons">';
    if (ev.status === 'seeking') h += `<span class="tg-small">${foundCount(ev)} of ${needed(ev)} Fragments found.</span><button type="button" data-act="early">An Omen occurs</button>`;
    else if (ev.status === 'prepared') h += `<button type="button" class="tg-primary" data-act="watch">End of Watch: roll for the Omen</button>
        <button type="button" data-act="early">An Omen occurs now</button><span class="tg-small">1d6 at the end of each Watch, +1 per Watch waited (now +${ev.waited}); 6 or more brings the Omen.</span>`;
    else if (ev.status === 'begun') h += `<span class="tg-small">Test ${ev.attr} against ${CHALLENGE_TIERS[ev.tier].bam}.</span>
        <button type="button" data-act="c-success">Succeeded</button><button type="button" data-act="c-failed" class="tg-danger">Failed</button><button type="button" data-act="c-refused" class="tg-danger">Refused</button>`;
    h += '</div>';
    const last = ev.log[ev.log.length - 1];
    if (last && ['seeking', 'prepared', 'begun'].includes(ev.status)) h += `<p class="tg-note">${esc(last)}</p>`;
    if (ev.status === 'success') h += `<p class="tg-note"><strong>${ev.attr} is Locked.</strong> The ${CHALLENGE_TIERS[ev.tier].sister} offers ${CHALLENGE_TIERS[ev.tier].gift}.</p>`;
    return h;
}

// Taint lines for an Ordeal card: always visible, since the players see the Taint from the first scene
function taintText(t) {
    return `<strong>${esc(t.n ? t.n + ' ' : '')}${esc(t.name)}:</strong> ${esc(t.text)}. <span class="tg-muted tg-small">Could mean: ${esc(t.could.join(', '))}.</span>`;
}
function taintSteps(ev) {
    let h = '';
    if (ev.sigTaint) h += step('Signature Taint', '', `${esc(cap(ev.sigTaint))}. <span class="tg-muted tg-small">Marks the Adversary’s hand on every Fragment, true or false. Add a Taint from the table that fits the Cause if you wish.</span>`);
    if (ev.taint) h += step('Taint', diceHTML(ev.taint.rolls), taintText(ev.taint) + ` <span class="tg-muted tg-small">On every Fragment, true or false.</span>`);
    if (ev.taint2) h += step('Deepening', diceHTML(ev.taint2.rolls), taintText(ev.taint2) + ` <span class="tg-muted tg-small">Optional: this second Taint arrives with the Omen.</span>`);
    return h;
}
function taintPlain(ev) {
    const L = [];
    if (ev.sigTaint) L.push(`Signature Taint: ${cap(ev.sigTaint)}.`);
    if (ev.taint) L.push(`Taint: ${ev.taint.name}: ${ev.taint.text} (could mean: ${ev.taint.could.join(', ')}).`);
    if (ev.taint2) L.push(`Deepening Taint (optional, with the Omen): ${ev.taint2.name}: ${ev.taint2.text} (could mean: ${ev.taint2.could.join(', ')}).`);
    return L;
}
function ordealBody(ev, kept) {
    const T = ORDEAL_TIERS[ev.tier], goal = ev.goalN ? goalOf(ev.goalN) : null, P = ENEMIES[partyBand(ev.party)];
    const encN = ENC_BY_PARTY[partyBand(ev.party)][ev.shape === undefined ? ev.tier : ev.shape];
    const total = ev.tasks.reduce((s, t) => s + t.encounters.length, 0) + (ev.causeEncounter ? 1 : 0);
    let h = `<p class="tg-summary">`;
    if (ev.source === 'goal') h += `<em>${esc(goal.name)}</em>. `;
    if (ev.source === 'general' && ev.onRoad) h += `<em>${esc(ev.roadNote)}</em> `;
    else if (ev.source === 'general') h += `<em>General Ordeal: counts towards Degrees, but gives no Thread and no Hold.</em> `;
    if (ev.spreadFrom) h += `<em>Spread from ${esc(ev.spreadFrom)}.</em> `;
    h += `${plural(ev.tasks.length, 'task')} at <strong>${bam(T.task)}</strong>; the decisive check is <strong>${bam(T.decisive)}</strong>. Needs <strong>${ev.fragments.length}</strong> true Fragments${ev.falses.length ? `, with ${plural(ev.falses.length, 'False Fragment')} hidden among them` : ''}. ` +
         `For ${plural(ev.party, 'character')}: ${encN} encounter${encN === 1 ? '' : 's'} per task, ${total} in all.</p><ul class="tg-steps">`;
    if (ev.source !== 'reckoning') h += step('Tier', ev.tierRoll ? diceHTML([ev.tierRoll]) : '', `<strong>${TIERS[ev.tier]}</strong>${ev.tierHow ? ` <span class="tg-muted tg-small">(${esc(ev.tierHow)})</span>` : ''}`);
    if (ev.source === 'goal') h += step('Ordeal', diceHTML(ev.rolls), `<strong>${esc(ev.name)}</strong>${ev.rolls.length > 1 ? ' <span class="tg-muted tg-small">(rerolled past Ordeals already used)</span>' : ''}`);
    if (ev.source === 'general') {
        h += step('Place', diceHTML([ev.place.roll]), esc(ev.place.text));
        h += step('Trouble', diceHTML([ev.troubleRoll]), esc(ev.trouble));
    }
    h += step('Scale', '', `<strong>${esc(T.scale)}.</strong> ${esc(T.footprint)}; ${esc(T.sites)}. Typically ${esc(T.length.toLowerCase())}.`);
    if (ev.where) h += step('Where', '', esc(ev.where.replace(/^./, c => c.toUpperCase())));
    if (ev.source !== 'general') h += step('Trouble', '', esc(cap(ev.trouble)));
    h += taintSteps(ev);
    const showCause = revealed(ev, 'cause');
    h += step(ev.source === 'reckoning' ? 'Adversary' : 'Cause', showCause && ev.cause.rolls ? diceHTML(ev.cause.rolls) : '',
        showCause ? esc(cap(ev.cause.text)) : hidden('the final Fragment'));
    h += step('Omen', ev.omen.roll ? diceHTML([ev.omen.roll]) : '', `${esc(cap(ev.omen.text))}. <span class="tg-muted">${esc(T.omenWhere)}</span>`);
    h += step('Enemies', '', `${P.number}. Creatures: ${esc(T.creatures)}. Never scale a single named creature; scale those around it.`);
    h += `</ul>`;

    // Fragments and red herrings
    h += `<h4 id="frags-${ev.id}"><span class="tg-stepno">Step 3</span> Fragments</h4><ol class="tg-frags">`;
    const canTick = kept && (ev.status === 'seeking' || ev.status === 'prepared') && ev.source !== 'reckoning';
    ev.order.forEach(ref => {
        const isF = ref[0] === 'f', i = +ref.slice(1), c = isF ? ev.falses[i] : ev.fragments[i];
        const F = FRAG_BY[c.form];
        const showText = !store.hide || c.found;
        const tag = isF && (!store.hide || c.state !== 'unknown') ? `<span class="tg-tag bad">${c.state === 'exposed' ? 'Exposed' : c.state === 'acted' ? 'Acted on' : 'False'}</span> ` : '';
        h += `<li>${kept ? `<input type="checkbox" data-act="frag" data-ref="${ref}" aria-label="${c.form} Fragment found"${c.found ? ' checked' : ''}${canTick && c.state !== 'exposed' && c.state !== 'acted' ? '' : ' disabled'}>` : ''}
            <div class="tg-frag-body${c.found ? ' found' : ''}">${tag}<strong>${esc(c.form)}:</strong> `;
        if (isF) {
            h += showText ? `${esc(cap(c.text))}.` : hidden('find it');
            if (!store.hide || c.state !== 'unknown') h += ` <span class="tg-small">${esc(c.name)}${c.roll ? ` (d6 ${c.roll})` : ''}. Points to a false ${c.points || 'task'}. Exposed by ${esc(c.exposed)}.</span>`;
        } else {
            h += showText ? (c.text ? `${esc(cap(c.text))}.` : `${F ? esc(F.desc) : ''}.`) : hidden('find it');
            h += ` <span class="tg-small">${F ? `Gained by ${esc(F.by)}. ` : ''}Reveals ${esc(c.reveals)}.${c.tested ? ' Tested: true.' : ''}</span>`;
        }
        h += `</div>`;
        if (kept && c.found && ev.source !== 'reckoning' && ['seeking', 'prepared', 'begun'].includes(ev.status) && !c.tested && c.state !== 'exposed' && c.state !== 'acted') {
            h += `<div class="tg-task-state"><button type="button" data-act="test" data-ref="${ref}" title="Lore or Wits at ${bam(T.task)}, or spend 1 Boon Point">Test it</button>` +
                 (isF || store.hide ? `<button type="button" data-act="act" data-ref="${ref}" title="Attempt the task this Fragment points to">Act on it</button>` : '') + `</div>`;
        }
        h += `</li>`;
    });
    h += `</ol>`;
    if (ev.falses.length) h += `<p class="tg-small tg-muted">False Fragments carry the Taint like true ones; their tell is a Taint too neat, or in the wrong place. False Fragments never count towards Prepared. Test one with Lore or Wits at ${bam(T.task)}, or 1 Boon Point: exposing it grants Insight (Minor Advantage on the decisive check, not cumulative). Acting on one gives no Advantage, then a Setback strikes.</p>`;
    if (ev.source === 'goal' || ev.source === 'reckoning') h += `<p class="tg-small"><strong>On success:</strong> ${esc(cap(ev.success))}.${ev.thread ? ` <strong>Thread:</strong> reveals the Reckoning task “${esc(ev.reckoningTask)}”.` : ''}</p>`;
    // Tasks
    h += `<h4><span class="tg-stepno">Step 5</span> Tasks</h4><ol class="tg-tasks">`;
    const begun = kept && ev.status === 'begun';
    ev.tasks.forEach((t, i) => {
        const show = ev.source === 'reckoning' || revealed(ev, i);
        h += `<li class="tg-task"><div class="tg-task-body"><strong>Task ${i + 1}</strong> `;
        if (show) {
            h += (t.attrRolls ? diceHTML(t.attrRolls.concat([t.roll])) + ' ' : '') + `<strong>${t.attr}:</strong> ${esc(cap(t.text))}` +
                (t.site ? ` <span class="tg-muted">(at the ${esc(t.site)})</span>` : '') +
                (t.forcedAttr ? ' <span class="tg-muted tg-small">(attribute rerolled so the Ordeal uses at least two)</span>' : '') +
                (t.from ? ` <span class="tg-muted tg-small">(Thread of Major Ordeal ${t.from})</span>` : '') +
                `<ul class="tg-encs">` + t.encounters.map(e => `<li>${e.roll ? diceHTML(e.roll2 ? [e.roll, e.roll2] : [e.roll]) : ''}<span><strong>${e.kind === 'Listed' ? 'Encounter' : e.kind}:</strong> ${esc(cap(e.text))}</span></li>`).join('') + `</ul>`;
        } else h += hidden(`its Fragment`);
        h += `</div>`;
        if (begun) {
            h += `<div class="tg-task-state" role="group" aria-label="Task ${i + 1} result">
                <button type="button" data-act="task" data-i="${i}" data-state="done" aria-pressed="${t.state === 'done' && !t.style}">Completed</button>
                <button type="button" data-act="task" data-i="${i}" data-state="style" aria-pressed="${t.style}" title="Beat the task BAM! by 6 or more: the Ruin die rises by 1">With style</button>
                <button type="button" data-act="task" data-i="${i}" data-state="failed" aria-pressed="${t.state === 'failed'}">Failed</button></div>`;
            if (t.state === 'open') h += `<div class="tg-comp" role="group" aria-label="Task ${i + 1} Companion Support">
                <span class="tg-small"><strong>Companion Support</strong> at ${bam(ORDEAL_TIERS[ev.tier].task)}</span>
                <select data-comp-bonus aria-label="Companion bonus">${COMP_BONUS.map(([v, n]) => `<option value="${v}"${t.compBonus === v ? ' selected' : ''}>+${v} (${n})</option>`).join('')}</select>
                <label class="tg-small"><input type="checkbox" data-comp-failing${t.compFailing ? ' checked' : ''}> Doom Failing</label>
                <button type="button" data-act="comp" data-i="${i}">Roll</button>
                ${t.comp && t.comp.length ? `<button type="button" data-act="comp-clear" data-i="${i}">Clear</button>` : ''}</div>`;
            h += compSummary(t);
        } else {
            if (t.state !== 'open') h += `<span class="tg-small">${t.state === 'done' ? (t.style ? 'Completed with style' : 'Completed') : 'Failed'}</span>`;
            h += compSummary(t);
        }
        h += `</li>`;
    });
    h += `</ol>`;
    if (ev.causeEncounter) h += `<p class="tg-small"><strong>Cause encounter</strong> (before the decisive check): ${esc(cap(ev.causeEncounter))}. <span class="tg-muted">For ${plural(ev.party, 'character')}: ${esc(P.cause.toLowerCase())}.</span></p>`;
    h += `<p class="tg-small tg-muted">Each task has one Lead and any number of Seconds. One successful Support gives Minor Advantage, two or more Moderate. A Companion may Support (+2/+4/+6 by its Focus) but only ever adds Minor Advantage; one Companion per player in each task. All encounters won: Moderate Advantage on the task. All lost or fled: Moderate Disadvantage, and a Setback.</p>`;

    return h;
}

function ordealTracking(ev) {
    const T = ORDEAL_TIERS[ev.tier], road = store.road;
    let h = '';
    // Participants
    if (road && ['seeking', 'prepared', 'begun'].includes(ev.status)) {
        if (!ev.participants) ev.participants = road.chars.map((c, i) => i).filter(i => !road.chars[i].consumed);
        h += `<fieldset class="tg-roles"><legend>Took a role (Lead or Second in at least one task)</legend>` +
            road.chars.map((c, i) => c.consumed ? '' : `<label><input type="checkbox" data-act="role" data-i="${i}"${ev.participants.includes(i) ? ' checked' : ''}> ${esc(c.name)}</label>`).join('') + `</fieldset>`;
    }
    h += '<div class="tg-buttons">';
    if (ev.status === 'seeking') {
        h += `<span class="tg-small"><span class="tg-stepno">Step 3</span> ${foundCount(ev)} of ${needed(ev)} Fragments held.</span><button type="button" data-act="early">An Omen occurs</button>`;
    } else if (ev.status === 'prepared') {
        h += `<span class="tg-stepno">Step 4</span><button type="button" class="tg-primary" data-act="watch">End of Watch: roll for the Omen</button><button type="button" data-act="early">An Omen occurs now</button>
              <span class="tg-small">1d6, +1 per Watch waited (now +${ev.waited}); 6 or more brings the Omen.</span>`;
    }
    if (['seeking', 'prepared', 'begun'].includes(ev.status)) {
        h += `<button type="button" data-act="weather">Roll weather (2d6)</button><button type="button" data-act="danger">Danger Die encounter</button><button type="button" data-act="wyrd">Wyrd die shows 1</button>`;
    }
    h += '</div>';
    if (ev.weather && ['seeking', 'prepared', 'begun'].includes(ev.status)) h += `<p class="tg-note">${diceHTML(ev.weather.rolls)} <strong>${ev.weather.name}.</strong> ${esc(ev.weather.text)} <span class="tg-small tg-muted">Applies to tasks done outdoors this Watch.</span></p>`;

    if (ev.status === 'begun') {
        h += `<div class="tg-ruin"><div class="tg-ruin-die">${diceHTML([ev.ruin], 'tg-static big')}<span>Ruin die</span></div><div>
            <p class="tg-small">Drops by 1 ${T.ruinEvery} and with each Setback. A task succeeded with style raises it by 1, to 6. At 0 the Trouble peaks.</p>
            <div class="tg-buttons"><button type="button" data-act="time">Time passes (${T.ruinEvery.replace('each ', '1 ').replace('every ', '')})</button>
            <button type="button" data-act="setback">A Setback strikes</button></div>
            <p class="tg-small tg-muted">A Setback strikes when a task check fails, any task, Support or decisive check rolls a natural 1, the party loses or flees an encounter, or the Wyrd die calls for one.</p></div></div>`;
        const D = decisiveInfo(ev);
        h += `<div class="tg-decisive"><h4><span class="tg-stepno">Step 6</span> Face the Cause: the decisive check, ${D.bam}</h4>
            ${ev.causeEncounter ? `<p class="tg-small">Play the Cause encounter first.${ev.tier === 2 || ev.source === 'reckoning' ? ' Everyone who first faces the Cause makes a Doom save.' : ''}</p>` : ''}
            <p>${D.bits.length ? D.bits.map(esc).join('. ') + '.' : 'No Advantage from tasks yet.'}</p>
            <p class="tg-small tg-muted">Each completed task grants Moderate Advantage, stacking to a maximum of Extreme. Apply the steps under the normal Advantage and Disadvantage rules.</p>
            <div class="tg-buttons"><button type="button" class="tg-primary" data-act="success">Succeeded</button>${ev.source === 'reckoning' ? '' : '<button type="button" data-act="near" title="Failed by 1 or 2, and not a natural 1">Near miss (failed by 1–2)</button>'}<button type="button" data-act="failed" class="tg-danger">Failed</button></div>
            ${ev.source === 'reckoning' ? '<p class="tg-small tg-muted">The Reckoning has no near miss: the age turns, or it does not.</p>' : '<p class="tg-small tg-muted">Near miss: the check failed by 1 or 2 and the die was not a natural 1. The Ordeal succeeds, but the Adversary gains a Hold (off the road, the place’s Danger Die rises by 1 for good) and no Doom is restored.</p>'}</div>`;
    }
    const last = ev.log[ev.log.length - 1];
    if (last && ['seeking', 'prepared', 'begun'].includes(ev.status)) h += `<p class="tg-note">${esc(last)}</p>`;
    if (ev.status === 'success' || ev.status === 'failed') {
        const msg = ev.log.slice(-2).join(' ');
        h += `<p class="tg-note${ev.status === 'failed' ? ' bad' : ''}">${esc(msg)}</p>`;
    }
    return h;
}

function fragmentCardHTML(f) {
    return `<article class="tg-card"><div class="tg-card-head"><h3>Fragment</h3></div>
        <ul class="tg-steps">${step('Form', diceHTML([f.roll]), `<strong>${f.type}:</strong> ${f.desc}.`)}${step('Gained by', '', esc(cap(f.by)))}</ul>
        <p class="tg-small">Record it against one named Challenge or Ordeal. Fragments never transfer between events. A Fragment found before its event is known can be named with a Lore check (Difficult 16).</p></article>`;
}
function herringCardHTML(hr) {
    return `<article class="tg-card"><div class="tg-card-head"><h3>Red Herring</h3></div>
        <ul class="tg-steps">${step('Kind', diceHTML([hr.roll]), `<strong>${hr.name}:</strong> ${esc(hr.text)}.`)}
        ${step('Looks like', '', `A ${hr.form} Fragment`)}${step('Exposed by', '', esc(hr.exposed))}</ul>
        <p class="tg-small">Seed it like a true Fragment: it points to a false task or a false Cause. It never counts towards Prepared. Exposing it grants Insight; acting on it brings a Setback.</p></article>`;
}

function roadHTML() {
    const road = store.road, goal = goalOf(road.goalN);
    const D = doomBAM(road), needT = partyNeeds(road);
    const tiersDone = `${road.done.Minor} Minor, ${road.done.Moderate} Moderate, ${road.done.Major} Major`;
    let h = `<article class="tg-card tg-kind-road"><div class="tg-card-head"><h3>Goal ${goal.n}: ${esc(goal.name)}</h3>` +
        (road.ended ? `<span class="tg-status ${road.ended === 'won' ? 'success' : 'failed'}">${road.ended === 'won' ? 'A new age' : 'The age goes on dying'}</span>` : '') + `</div>
        <ul class="tg-steps">
        ${step('Goal', road.goalRoll ? diceHTML([road.goalRoll]) : '', `<strong>The world is held by</strong> ${esc(goal.heldBy.toLowerCase())}. <strong>You must</strong> ${esc(goal.must.charAt(0).toLowerCase() + goal.must.slice(1))}.`)}
        ${step('Adversary', '', `<strong>${esc(goal.adversaryName)}.</strong> <span class="tg-small">${esc(goal.adversary)}</span>`)}
        ${step('Favourite lie', '', esc(goal.lie))}
        ${goal.taint ? step('Signature Taint', '', esc(cap(goal.taint)) + '.') : ''}
        ${step('Doom', '', `Doom BAM! now <strong>${D.text}</strong>${D.harder ? ' (one step harder: 3 or more Holds)' : ''}. On a failed save, also: ${esc(goal.doomEffect)}`)}
        </ul>
        <details class="tg-more"><summary>Premise and signature encounters</summary><p>${esc(goal.premise)}</p>
        <ol class="tg-sig">${goal.signature.map((s, i) => `<li>${diceHTML([i + 1], 'tg-static')}<span>${esc(s)}</span></li>`).join('')}</ol></details>`;

    // Progress
    h += `<h4>The road</h4><div class="tg-road-stats">
        <div><span class="tg-label">Ordeals completed</span><strong>${tiersDone}</strong><span class="tg-small tg-muted">of ${ROAD_TOTAL.join(', ').replace(/, (\d+)$/, ' and $1')}. ${road.failed ? plural(road.failed, 'failed') : ''}</span></div>
        <div><span class="tg-label">Holds</span><strong>${road.holds}</strong><span class="tg-buttons tight"><button type="button" data-road="hold-" aria-label="Remove a Hold" title="A Hold is broken">−</button><button type="button" data-road="hold+" aria-label="Add a Hold">+</button></span></div>
        <div><span class="tg-label">Threads</span><strong>${Math.min(5, road.threads.length)} / 5</strong><span class="tg-small tg-muted">${road.threads.length ? 'From Major Ordeals ' + road.threads.join(', ') : 'Each Major Ordeal’s Cause Fragment'}</span></div>
        <div><span class="tg-label">The Heart</span><strong>${road.heart ? 'Found' : 'Not yet'}</strong>${!road.heart ? `<span class="tg-small tg-muted">A Vision at the first Full Rest at 9th Degree.</span>` : ''}</div>
        </div>`;

    // Party
    h += `<h4>The party</h4><div class="table-scroll"><table class="tg-party"><thead><tr><th>Character</th><th>Degree</th><th>Towards the next</th><th>Doom</th><th>State</th></tr></thead><tbody>`;
    road.chars.forEach((c, i) => {
        const st = doomState(c.doom);
        let next;
        if (c.consumed) next = '—';
        else if (c.degree >= 9) next = 'The Reckoning';
        else { const nd = c.degree + 1, [t, n] = DEGREE_NEED[nd]; next = `${CUM_NEED[c.degree][t] + c.progress} of ${CUM_NEED[nd][t]} ${TIERS[t]} → ${ordinal(nd)}${GATES.includes(nd) ? ' <span class="tg-small">(gate)</span>' : ''}`; }
        h += `<tr${c.consumed ? ' class="tg-consumed"' : ''}><td><input type="text" class="tg-name" data-char="${i}" value="${esc(c.name)}" maxlength="40" aria-label="Name of character ${i + 1}"></td>
            <td>${ordinal(c.degree)}</td><td>${next}</td>
            <td class="tg-doom"><button type="button" data-road="doom-" data-i="${i}" aria-label="Lose 1 Doom"${c.consumed ? ' disabled' : ''}>−</button>
                <strong>${c.doom}</strong><span class="tg-muted tg-small">/${doomMax(c.degree)}</span>
                <button type="button" data-road="doom+" data-i="${i}" aria-label="Gain 1 Doom"${c.consumed ? ' disabled' : ''}>+</button>
                <button type="button" data-road="save" data-i="${i}" title="Roll d20 + Spiritus against the Doom BAM!; on a failure press this"${c.consumed ? ' disabled' : ''}>Failed save</button></td>
            <td><strong>${st[2]}</strong> <span class="tg-small">${esc(st[3])}</span></td></tr>`;
    });
    h += `</tbody></table></div>
        <p class="tg-small tg-muted">Boon Points equal current Doom at the start of each session. Spend 1 to reroll a d20, invoke your Drive, pass a Critical Damage check, cancel a Setback, or test a Fragment. Restore +1 Doom for a safe Full Rest outside any footprint.</p>
        <div class="tg-buttons"><button type="button" data-road="rest">Safe Full Rest (+1 Doom each)</button><button type="button" data-road="add">Add a character</button></div>`;

    // Next
    h += `<h4>What comes next</h4><div class="tg-buttons">`;
    if (road.ended) h += `<span>${road.ended === 'won' ? 'The age ends and the new one begins. Each character may retire as a legend of the turning, or walk on into the new age with a new Identity Mark.' : 'Every Hold remains. Begin again from the Major band, or start a new road.'}</span>`;
    else {
        const ninth = road.chars.some(c => c.degree >= 9 && !c.consumed), threads = road.threads.length >= 5;
        if (road.heart) h += `<button type="button" class="tg-primary" data-road="reckoning">Generate the Reckoning</button><span class="tg-small">${plural(5 + road.holds, 'task')} at Formidable (22), decisive Inconceivable (25).</span>`;
        else if (ninth && threads) h += `<button type="button" class="tg-primary" data-road="heart">The Heart is revealed</button><span class="tg-small">At the first Full Rest after a character reaches 9th Degree.</span>`;
        else {
            const used = road.used[TIERS[needT]].concat(store.ledger.filter(e => e.source === 'goal' && e.tier === needT).map(e => e.ordealN));
            const unused = [1, 2, 3, 4, 5, 6].filter(n => !used.includes(n));
            h += `<button type="button" class="tg-primary" data-road="next">Roll the next ${TIERS[needT]} Ordeal</button><span class="tg-small">${unused.length ? `Unused Goal Ordeals: ${unused.join(', ')}` : `The Goal’s six ${TIERS[needT]} Ordeals are spent: the next is a general Ordeal in the Goal’s world.`}${ninth && !threads ? ' The Heart needs five Threads first.' : ''}</span>`;
        }
    }
    h += `<button type="button" class="tg-danger" data-road="end">Abandon this road</button></div>`;
    if (road.log.length) h += `<details class="tg-log"><summary>Road log (${road.log.length})</summary><ol>${road.log.map(l => `<li>${esc(l)}</li>`).join('')}</ol></details>`;
    return h + `</article>`;
}

function eventText(ev) {
    const L = [title(ev).toUpperCase()];
    if (ev.kind === 'training') L.push(trainingText(ev));
    else if (ev.kind === 'challenge') {
        const T = CHALLENGE_TIERS[ev.tier];
        L.push(`Tests ${ev.attr} vs ${T.bam}. ${T.sister}: ${T.gift}. Fragments needed: ${T.fragments}.`);
        L.push(`Trial: ${revealed(ev, 'trial') ? ev.trial.text : '(not yet revealed)'}`);
        L.push(`Site: ${revealed(ev, 'site') ? ev.site.text : '(not yet revealed)'}`);
        L.push(`Omen: ${ev.omen.text}. Begins: ${ev.omen.begins}.`);
        L.push('Fragments:');
        ev.fragments.forEach((f, i) => L.push(`  ${f.found ? '[x]' : '[ ]'} ${i + 1}. ${f.type}: ${f.desc}. Gained by ${f.by}. Reveals ${f.reveals}.`));
    } else {
        const T = ORDEAL_TIERS[ev.tier];
        L.push(`${T.scale}. ${T.footprint}; ${T.sites}. Task BAM! ${bam(T.task)}; decisive BAM! ${bam(T.decisive)}. Party: ${ev.party}.`);
        if (ev.where) L.push(`Where: ${ev.where}`);
        L.push(`Trouble: ${cap(ev.trouble)}`);
        L.push(...taintPlain(ev));
        L.push(`Cause: ${revealed(ev, 'cause') ? cap(ev.cause.text) : '(not yet revealed)'}`);
        L.push(`Omen: ${cap(ev.omen.text)}.`);
        ev.tasks.forEach((t, i) => {
            if (!(ev.source === 'reckoning' || revealed(ev, i))) { L.push(`Task ${i + 1}: (not yet revealed)`); return; }
            L.push(`Task ${i + 1}: ${t.attr}: ${cap(t.text)}${t.site ? ` (at the ${t.site})` : ''}${t.state !== 'open' ? ` [${t.state === 'done' ? 'completed' : 'failed'}]` : ''}${t.comp && t.comp.length ? ` (Companion Support: ${t.comp.map(c => c.mishap ? 'Skill Mishap' : c.ok ? 'success' : 'failed').join(', ')})` : ''}`);
            t.encounters.forEach(e => L.push(`    - ${e.kind === 'Listed' ? 'Encounter' : e.kind}: ${cap(e.text)}`));
        });
        if (ev.causeEncounter) L.push(`Cause encounter: ${cap(ev.causeEncounter)} (${ENEMIES[partyBand(ev.party)].cause})`);
        L.push(`Enemies: ${ENEMIES[partyBand(ev.party)].number}.`);
        L.push('Fragments:');
        ev.order.forEach(ref => {
            const isF = ref[0] === 'f', c = isF ? ev.falses[+ref.slice(1)] : ev.fragments[+ref.slice(1)];
            const txt = !store.hide || c.found ? cap(c.text || (FRAG_BY[c.form] || {}).desc || '') : '(not yet found)';
            L.push(`  ${c.found ? '[x]' : '[ ]'} ${c.form}: ${txt}${isF && !store.hide ? ` [FALSE: ${c.name}]` : isF ? '' : ` (reveals ${c.reveals})`}`);
        });
        if (ev.success) L.push(`On success: ${cap(ev.success)}.`);
        if (ev.ruin !== null) L.push(`Ruin die: ${ev.ruin}`);
    }
    if (inLedger(ev)) L.push(`Status: ${(ev.kind === 'training' ? TRAIN_STATUS : STATUS)[ev.status]}${ev.nearMiss ? ' (near miss)' : ''}`);
    if (ev.blight) L.push(`Blight: ${ev.blight.text}.`);
    return L.join('\n');
}

function renderPreview(animate) {
    const box = el('tg-result');
    if (!preview) { box.innerHTML = ''; return; }
    box.innerHTML = preview.fragmentOnly ? fragmentCardHTML(preview.fragment) : preview.herringOnly ? herringCardHTML(preview.herring) : cardHTML(preview);
    hydrateDice(box, animate);
    renderGuide();
}
function renderLedger(animateId) {
    const box = el('tg-ledger');
    el('tg-ledger-empty').hidden = store.ledger.length > 0;
    box.innerHTML = store.ledger.map(cardHTML).join('');
    hydrateDice(box, false);
    if (animateId) { const n = box.querySelector(`[data-id="${animateId}"] .tg-note.bad`); if (n) hydrateDice(n, true); }
    renderGuide();
}
/* ---------------------------------------------------------------------
   The Fated Road, step by step: a numbered guide and a banner on each card
   --------------------------------------------------------------------- */
const ROAD_STEPS = [
    ['Begin the road', 'Roll the Goal and name the party.'],
    ['Roll the next Ordeal', 'The tier the party needs next. Keep it in the Ledger.'],
    ['Find the Fragments', 'Tick each Fragment as it is found. Test any you suspect: some are false.'],
    ['Wait for the Omen', 'Once Prepared, roll at the end of each Watch spent in the footprint.'],
    ['Run the tasks', 'The Omen sets the Ruin die to 6. Each task: its encounters, then its check. Time and Setbacks lower the Ruin die.'],
    ['Face the Cause', 'The Cause encounter, then the decisive check: success, near miss or failure.'],
    ['Take stock', 'Degrees, Doom, Threads and Holds update on the road card. Rest if you can, then return to step 2.'],
    ['The Heart', 'With a character at 9th Degree and five Threads, the Heart is revealed at the first Full Rest.'],
    ['The Reckoning', 'Five Threads and the Heart lead to the Adversary. Run it like an Ordeal, with no near miss.']
];
const isRoadOrdeal = e => e && e.kind === 'ordeal' && (e.source === 'goal' || e.onRoad || e.source === 'reckoning');
const isActive = e => ['seeking', 'prepared', 'begun'].includes(e.status);
const allAttempted = ev => ev.tasks.every(t => t.state !== 'open');
function stageOf(ev) {   // the step an Ordeal's card is at
    if (ev.status === 'seeking') return 3;
    if (ev.status === 'prepared') return 4;
    if (ev.status === 'begun') return allAttempted(ev) ? 6 : 5;
    return 7;
}
function roadStep() {
    const road = store.road;
    if (!road) return { n: 1 };
    if (road.ended) return { n: 9, done: true };
    const active = store.ledger.find(e => isRoadOrdeal(e) && isActive(e));
    if (active) return { n: active.source === 'reckoning' ? 9 : stageOf(active), ev: active };
    if (preview && isRoadOrdeal(preview)) return { n: preview.source === 'reckoning' ? 9 : 2, pending: true };
    if (road.heart) return { n: 9 };
    if (road.threads.length >= 5 && road.chars.some(c => c.degree >= 9 && !c.consumed)) return { n: 8 };
    return { n: 2 };
}
function guideHTML() {
    const S = roadStep();
    let action = '';
    if (S.n === 1) action = 'Choose the Goal and party below, then press “Begin the Fated Road”.';
    else if (S.pending) action = `<button type="button" class="tg-primary" data-guide="result">Go to the new ${S.n === 9 ? 'Reckoning' : 'Ordeal'} and keep it</button>`;
    else if (S.ev) action = `<button type="button" class="tg-primary" data-guide="card" data-id="${S.ev.id}">Go to ${esc(title(S.ev))}</button>`;
    else if (S.n === 2) action = `<button type="button" class="tg-primary" data-guide="next">Roll the next Ordeal</button>`;
    else if (S.n === 8) action = `<button type="button" class="tg-primary" data-guide="heart">The Heart is revealed</button>`;
    else if (S.n === 9 && !S.done) action = `<button type="button" class="tg-primary" data-guide="reckoning">Generate the Reckoning</button>`;
    let h = `<details class="tg-guide" open><summary>How the Fated Road runs <span class="tg-small tg-muted">(you are at step ${S.n}${S.done ? ': the road has ended' : ''})</span></summary><ol>`;
    ROAD_STEPS.forEach(([name, text], i) => {
        const n = i + 1, cls = n === S.n && !S.done ? 'current' : (n < S.n && !(n === 7 && S.n <= 2) ? 'done' : '');
        h += `<li class="${cls}"><strong>${name}.</strong> <span class="tg-small">${text}</span>${cls === 'current' && action ? `<div class="tg-guide-act">${action}</div>` : ''}</li>`;
    });
    h += `</ol><p class="tg-small tg-muted">Steps 2 to 7 repeat for every Ordeal. At any time a character may also face a <strong>Challenge</strong> (one per band) or a <strong>Training Ordeal</strong> (once per band, never a gate) from their own tabs.</p></details>`;
    return h;
}
function renderGuide() {
    let box = el('tg-guide');
    if (!box) { box = document.createElement('div'); box.id = 'tg-guide'; const tabs = document.querySelector('.tg-tabs'); tabs.parentNode.insertBefore(box, tabs); }
    box.innerHTML = guideHTML();
}
function stageBanner(ev) {
    if (ev.kind === 'training') {
        const n = ev.status === 'seeking' ? 1 : ev.status === 'prepared' ? 2 : ev.status === 'begun' ? (ev.tasks.every(t => t.state !== 'open') ? 4 : 3) : 5;
        const T = [['Follow the leads', `${ev.leads.filter(l => l.found).length} of ${ev.leads.length} found. Mark each lead as you follow it.`],
                   ['Pay the price', 'The trainer is found. Agree the price below to begin.'],
                   ['The lessons', `${ev.tasks.filter(t => t.state !== 'open').length} of ${ev.tasks.length} attempted. Watch the Patience die.`],
                   ['The Mastery check', 'Every lesson attempted: make the Mastery check below.'],
                   ['Done', 'The Adversary felt the time: check the Goal Ordeals in the Ledger.']][n - 1];
        return `<div class="tg-stage"><span class="tg-stepno">Training ${Math.min(n, 4)} of 4</span> <strong>${T[0]}.</strong> ${T[1]}</div>`;
    }
    if (ev.kind !== 'ordeal') return '';
    const n = ev.source === 'reckoning' && isActive(ev) ? null : stageOf(ev);
    const road = store.road && isRoadOrdeal(ev);
    let txt;
    if (ev.source === 'reckoning') txt = isActive(ev) ? `<span class="tg-stepno">Step 9</span> <strong>The Reckoning.</strong> ${ev.status === 'begun' ? (allAttempted(ev) ? 'Face the Adversary: make the decisive check below.' : 'Run the tasks below; the Ruin die is running.') : 'Its Omen is rolled like any other Ordeal’s.'}` : '<span class="tg-stepno">Done</span> The Reckoning is over.';
    else if (n === 3) txt = `<span class="tg-stepno">Step 3</span> <strong>Find the Fragments:</strong> ${foundCount(ev)} of ${needed(ev)} held. <a href="#frags-${ev.id}">Tick them below</a> as they are found.`;
    else if (n === 4) txt = `<span class="tg-stepno">Step 4</span> <strong>Wait for the Omen.</strong> At the end of each Watch in the footprint: <button type="button" class="tg-primary" data-act="watch">Roll for the Omen</button>`;
    else if (n === 5) txt = `<span class="tg-stepno">Step 5</span> <strong>Run the tasks:</strong> ${ev.tasks.filter(t => t.state !== 'open').length} of ${ev.tasks.length} attempted. Ruin die <strong>${ev.ruin}</strong>.`;
    else if (n === 6) txt = `<span class="tg-stepno">Step 6</span> <strong>Face the Cause.</strong> Every task is attempted: ${ev.causeEncounter ? 'play the Cause encounter, then ' : ''}make the decisive check below.`;
    else txt = `<span class="tg-stepno">Step 7</span> <strong>Take stock.</strong> ${ev.status === 'failed' ? 'The Ordeal failed.' : ev.nearMiss ? 'Succeeded at a cost.' : 'Succeeded.'} ${road ? 'Check the party on the Fated Road card, then return to step 2.' : ''}`;
    return `<div class="tg-stage">${txt}</div>`;
}

function renderRoad(animate) {
    el('tg-road-new').hidden = !!store.road;
    el('tg-road').innerHTML = store.road ? roadHTML() : '';
    hydrateDice(el('tg-road'), animate);
    renderTrainees();
    renderGuide();
}
function renderLocks() { document.querySelectorAll('[data-locked]').forEach(c => { c.checked = store.locked.includes(c.dataset.locked); }); }
const TABS = ['road', 'ordeal', 'challenge', 'training', 'fragment'];
function renderTab() {
    TABS.forEach(t => { el('tab-' + t).setAttribute('aria-selected', String(store.tab === t)); el('panel-' + t).hidden = store.tab !== t; });
}
function renderAll() { renderRoad(); renderTrainees(); renderPreview(); renderLedger(); }

/* =====================================================================
   7. EVENTS
   ===================================================================== */

el('tg-hide').checked = store.hide;
el('tg-hide').addEventListener('change', e => { store.hide = e.target.checked; save(); renderPreview(); renderLedger(); });

TABS.forEach(t => el('tab-' + t).addEventListener('click', () => { store.tab = t; save(); renderTab(); }));
el('tg-generate').querySelector('.tg-tabs').addEventListener('keydown', e => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    const i = TABS.indexOf(store.tab);
    store.tab = TABS[(i + (e.key === 'ArrowRight' ? 1 : TABS.length - 1)) % TABS.length]; save(); renderTab(); el('tab-' + store.tab).focus();
});
document.querySelectorAll('[data-locked]').forEach(c => c.addEventListener('change', () => {
    store.locked = ATTRS.filter(a => document.querySelector(`[data-locked="${a}"]`).checked); save();
}));
const showError = msg => { preview = null; el('tg-result').innerHTML = `<p class="tg-note bad">${esc(msg)}</p>`; };

el('tg-gen-road').addEventListener('click', () => {
    if (!GOALS.length) { el('tg-road').innerHTML = '<p class="tg-note bad">The Fated Road cannot begin: <strong>js/fated-road-data.js</strong> did not load. Check that the file is in the site’s js folder with exactly that name.</p>'; return; }
    const v = el('tg-r-goal').value, roll = v === 'roll' ? d(6) : null;
    store.road = newRoad(roll || +v, roll, +el('tg-r-party').value);
    roadLog(`The Fated Road begins: ${goalOf(store.road.goalN).name}${roll ? ` (rolled ${roll})` : ''}, for ${plural(store.road.chars.length, 'character')} at 1st Degree, Doom 6.`);
    save(); renderRoad(true);
});

let lastOrdealArgs = null;
function makeOrdeal() {
    const road = store.road, src = el('tg-o-source').value, pv = el('tg-o-party').value;
    const party = pv === 'road' ? (road ? road.chars.filter(c => !c.consumed).length || 1 : 3) : +pv;
    const tc = tierChoice(el('tg-o-tier').value, road ? partyNeeds(road) : 0);
    let ev;
    if (src === 'road') {
        if (!road) return showError('Begin a Fated Road first (on the Fated Road tab), or choose the general generator.');
        const goal = goalOf(road.goalN);
        const used = road.used[TIERS[tc.tier]].concat(store.ledger.filter(e => e.source === 'goal' && e.tier === tc.tier).map(e => e.ordealN));
        if ([1, 2, 3, 4, 5, 6].every(n => used.includes(n))) {
            const short = tc.tier === 2;   // general Major Ordeals on the road run at the Moderate structure
            ev = generateGeneralOrdeal(tc.tier, party, goal, null, short ? 1 : tc.tier);
            ev.onRoad = true;
            ev.roadNote = `All six ${TIERS[tc.tier]} Ordeals of ${goal.name} are spent, so this is a general Ordeal set in the Goal’s world.` +
                (short ? ' It runs at the Moderate structure (3 tasks, Moderate encounters and Fragments) but keeps Major BAM!s, creatures and scale, and counts as Major.' : '') +
                ' It counts towards Degrees and the road, and its failure gives the Adversary a Hold, but it yields no Thread.';
        } else ev = generateGoalOrdeal(goal, tc.tier, used, party);
    } else ev = generateGeneralOrdeal(tc.tier, party, road ? goalOf(road.goalN) : null);
    if (ev.error) return showError(ev.error);
    Object.assign(ev, { tierRoll: tc.tierRoll, tierHow: tc.tierHow });
    preview = ev; renderPreview(true);
}
el('tg-gen-ordeal').addEventListener('click', makeOrdeal);
el('tg-gen-challenge').addEventListener('click', () => {
    const ev = generateChallenge(el('tg-c-tier').value, store.locked, store.road);
    if (ev.error) return showError(ev.error);
    preview = ev; renderPreview(true);
});
function renderTrainees() {
    const sel = el('tg-t-who'); if (!sel) return;
    const cur = sel.value, road = store.road;
    sel.innerHTML = (road ? road.chars.map((c, i) => `<option value="${i}">${esc(c.name)} (${ordinal(c.degree)} Degree)</option>`).join('') : '') + '<option value="none">Not on a Fated Road</option>';
    if ([...sel.options].some(o => o.value === cur)) sel.value = cur;
}
el('tg-gen-training').addEventListener('click', () => {
    const who = el('tg-t-who').value, road = store.road;
    const onRoad = road && who !== 'none';
    const skill = el('tg-t-skill').value.trim() || 'Combat';
    const pv = el('tg-t-party').value;
    const party = pv === 'road' ? (road ? road.chars.length : 1) : +pv;
    preview = generateTraining({ target: el('tg-t-target').value, skill, party,
        trainee: onRoad ? +who : null, traineeName: onRoad ? road.chars[+who].name : 'The trainee' });
    renderPreview(true);
    el('tg-result').scrollIntoView({ behavior: 'smooth', block: 'start' });
});
el('tg-gen-fragment').addEventListener('click', () => { preview = { id: uid(), fragmentOnly: true, fragment: rollFragment('') }; renderPreview(true); });
el('tg-gen-herring').addEventListener('click', () => { preview = { id: uid(), herringOnly: true, herring: rollHerring(null, false) }; renderPreview(true); });

// The Fated Road panel
document.querySelector('main').addEventListener('click', e => {
    const g = e.target.closest('[data-guide]'); if (!g) return;
    const go = node => { if (node) { node.scrollIntoView({ behavior: 'smooth', block: 'start' }); node.classList.add('tg-flash'); setTimeout(() => node.classList.remove('tg-flash'), 1600); } };
    const click = sel => { const b = el('tg-road').querySelector(sel); if (b) b.click(); };
    if (g.dataset.guide === 'card') go(document.querySelector(`#tg-ledger [data-id="${g.dataset.id}"]`));
    else if (g.dataset.guide === 'result') go(el('tg-result'));
    else if (g.dataset.guide === 'next') { click('[data-road="next"]'); go(el('tg-result')); }
    else if (g.dataset.guide === 'heart') click('[data-road="heart"]');
    else if (g.dataset.guide === 'reckoning') click('[data-road="reckoning"]');
});
el('tg-road').addEventListener('click', e => {
    const b = e.target.closest('[data-road]'); if (!b) return;
    const road = store.road, act = b.dataset.road, c = road.chars[+b.dataset.i];
    switch (act) {
        case 'doom-': setDoom(c, c.doom - 1); break;
        case 'doom+': setDoom(c, c.doom + 1); break;
        case 'save': {
            setDoom(c, c.doom - 1);
            roadLog(`${c.name} fails a Doom save: Doom ${c.doom}. ${goalOf(road.goalN).doomEffect}`);
            break;
        }
        case 'rest': road.chars.forEach(x => { if (!x.consumed) setDoom(x, x.doom + 1); }); roadLog('A safe Full Rest: +1 Doom each.'); break;
        case 'add':
            if (road.chars.length >= 6) return;
            road.chars.push({ name: `Character ${road.chars.length + 1}`, degree: 1, progress: 0, doom: 6, consumed: false }); break;
        case 'hold-': road.holds = Math.max(0, road.holds - 1); roadLog('A Hold is broken.'); break;
        case 'hold+': road.holds++; roadLog(`The Adversary gains a Hold (${road.holds}).`); break;
        case 'heart': road.heart = true; roadLog(`The Heart is revealed: ${goalOf(road.goalN).reckoning.heart}`); break;
        case 'next':
            el('tg-o-source').value = 'road'; el('tg-o-tier').value = 'auto'; el('tg-o-party').value = 'road';
            store.tab = 'ordeal'; renderTab(); makeOrdeal(); save();
            el('tg-result').scrollIntoView({ behavior: 'smooth', block: 'start' });
            return;
        case 'reckoning':
            preview = generateReckoning(road); save(); renderPreview(true);
            el('tg-result').scrollIntoView({ behavior: 'smooth', block: 'start' });
            return;
        case 'end':
            if (!window.confirm('Abandon this Fated Road? The party, Holds and Threads are cleared. Ledger events stay.')) return;
            store.road = null; break;
    }
    save(); renderRoad();
});
el('tg-road').addEventListener('change', e => {
    const n = e.target.closest('.tg-name'); if (!n) return;
    store.road.chars[+n.dataset.char].name = n.value.trim() || `Character ${+n.dataset.char + 1}`; save(); renderLedger();
});

// One handler for every card button (preview and ledger)
document.querySelector('main').addEventListener('click', e => {
    const b = e.target.closest('[data-act]');
    if (!b || b.matches('input')) return;
    const card = b.closest('[data-id]'), ev = card && find(card.dataset.id);
    if (!ev) return;
    const act = b.dataset.act;
    let animate = false;
    switch (act) {
        case 'keep':
            store.ledger.unshift(ev); preview = null; log(ev, 'Kept in the Ledger.');
            if (ev.source === 'goal' && store.road && !store.road.used[TIERS[ev.tier]].includes(ev.ordealN)) store.road.used[TIERS[ev.tier]].push(ev.ordealN);
            break;
        case 'reroll': makeOrdeal(); return;
        case 'remove':
            if (!window.confirm(`Remove “${title(ev)}” from the Ledger?`)) return;
            store.ledger = store.ledger.filter(x => x.id !== ev.id);
            if (ev.source === 'goal' && store.road && ev.status !== 'success' && ev.status !== 'failed') {
                store.road.used[TIERS[ev.tier]] = store.road.used[TIERS[ev.tier]].filter(n => n !== ev.ordealN);
            }
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
        case 'weather': rollWeather(ev); break;
        case 'danger': rollDanger(ev); break;
        case 'wyrd': rollWyrd(ev); break;
        case 'time': {
            const t = lowerRuin(ev);
            log(ev, `Time passes.${t || ' The Ruin die is already at 0.'}`);
            animate = ev.ruinZero;
            break;
        }
        case 'setback': setback(ev, 'struck in play'); animate = ev.ruinZero; break;
        case 'test': {
            const ref = b.dataset.ref, i = +ref.slice(1);
            if (ref[0] === 'f') testClue(ev, i); else testTrue(ev, i);
            break;
        }
        case 'act': {
            const ref = b.dataset.ref, i = +ref.slice(1);
            if (ref[0] === 'f') actOnFalse(ev, i);
            else { ev.fragments[i].tested = true; log(ev, `The party acts on a true ${ev.fragments[i].form} Fragment: it reveals ${ev.fragments[i].reveals}.`); }
            break;
        }
        case 'task': {
            const i = +b.dataset.i, t = ev.tasks[i], s = b.dataset.state;
            if (s === 'style') {
                const was = t.style; t.style = !was; t.state = t.style ? 'done' : 'open';
                if (t.style && ev.ruin < 6) { ev.ruin++; log(ev, `Task ${i + 1} completed with style. The Ruin die rises to ${ev.ruin}.`); }
                else if (t.style) log(ev, `Task ${i + 1} completed with style (the Ruin die is already at 6).`);
                break;
            }
            if (t.state === s && !t.style) { t.state = 'open'; break; }
            t.state = s; t.style = false;
            if (s === 'done') log(ev, `Task ${i + 1} completed: Moderate Advantage on the decisive check.`);
            else {
                log(ev, `Task ${i + 1} failed: its complication remains in play.`); setback(ev, `task ${i + 1} failed`); animate = ev.ruinZero;
                if (t.comp && t.comp.length) log(ev, `Narrator option: a Companion Supported this task, so the Setback may fall on the Companion instead (wounded, captured, lost or scattered). The Ruin die still drops.`);
            }
            break;
        }
        case 'comp': {
            const box = b.closest('.tg-comp');
            companionSupport(ev, +b.dataset.i, +box.querySelector('[data-comp-bonus]').value, box.querySelector('[data-comp-failing]').checked);
            break;
        }
        case 'comp-clear': ev.tasks[+b.dataset.i].comp = []; log(ev, `Task ${+b.dataset.i + 1}: Companion Supports cleared.`); break;
        case 'success': finishOrdeal(ev, true); break;
        case 'near': finishOrdeal(ev, true, true); break;
        case 't-lead': {
            const l = ev.leads[+b.dataset.i]; l.found = !l.found;
            log(ev, `${l.found ? 'Found' : 'Unmarked'} a ${l.form} lead.`);
            if (ev.leads.every(x => x.found)) { ev.status = 'prepared'; log(ev, `Every lead followed: ${ev.trainer.who} is found, in ${ev.trainer.where}. Their price: ${ev.price.text}.`); }
            break;
        }
        case 't-begin': ev.status = 'begun'; ev.patience = 6; log(ev, 'The price is agreed and training begins. The Patience die is set to 6.'); break;
        case 't-task': {
            const i = +b.dataset.i, t = ev.tasks[i], st = b.dataset.state;
            if (t.state === st) { t.state = 'open'; log(ev, `${t.type} reset to open.`); break; }
            t.state = st;
            log(ev, `${t.service ? 'Service' : t.type} ${st === 'done' ? 'completed' : 'failed'}.`);
            if (st === 'failed') lowerPatience(ev, `a failed ${t.type}`);
            break;
        }
        case 't-day': lowerPatience(ev, 'a day lost to other business'); break;
        case 't-nat1': lowerPatience(ev, 'a natural 1'); break;
        case 't-finish': finishTraining(ev, b.dataset.out); break;
        case 'failed': finishOrdeal(ev, false); animate = true; break;
        case 'c-success': finishChallenge(ev, 'success'); renderLocks(); break;
        case 'c-failed': finishChallenge(ev, 'failed'); animate = true; break;
        case 'c-refused': finishChallenge(ev, 'refused'); animate = true; break;
        case 'spread': {
            const nt = Math.min(2, ev.tier + 1), road = store.road;
            const party = road ? road.chars.filter(c => !c.consumed).length || 1 : ev.party;
            preview = generateGeneralOrdeal(nt, party, road ? goalOf(road.goalN) : null,
                { cause: ev.cause.text, from: ev.name.toLowerCase(), extraTask: ev.tier >= 2, taint: ev.taint || null, sigTaint: ev.sigTaint || null });
            preview.tierHow = ev.tier >= 2 ? 'spread; a Major Ordeal with one more task' : 'spread, one tier higher';
            log(ev, 'The Cause spread to a neighbouring place as a new Ordeal.');
            save(); renderLedger(); renderPreview(true);
            el('tg-result').scrollIntoView({ behavior: 'smooth', block: 'start' });
            return;
        }
    }
    save(); renderRoad(); renderPreview(); renderLedger(animate ? ev.id : null);
});
document.querySelector('main').addEventListener('change', e => {
    const c = e.target.closest('input[data-act]');
    if (!c || !c.closest('[data-id]')) return;
    const ev = find(c.closest('[data-id]').dataset.id);
    if (!ev) return;
    if (c.dataset.act === 'frag') toggleClue(ev, c.dataset.ref, c.checked);
    if (c.dataset.act === 'role') {
        const i = +c.dataset.i;
        ev.participants = c.checked ? Array.from(new Set(ev.participants.concat([i]))) : ev.participants.filter(x => x !== i);
    }
    save(); renderLedger();
});
function fallbackCopy(text, ok, note) {
    const ta = document.createElement('textarea');
    ta.value = text; ta.style.position = 'fixed'; ta.style.opacity = '0';
    document.body.appendChild(ta); ta.select();
    try { document.execCommand('copy'); ok(); } catch (e) { note.textContent = 'Copy failed.'; }
    ta.remove();
}

if (!GOALS.length) el('tg-intro').insertAdjacentHTML('beforeend', '<p class="tg-note bad">js/fated-road-data.js did not load, so the Fated Road and Goal Ordeals are unavailable.</p>');
renderTab(); renderLocks(); renderAll();
})();
