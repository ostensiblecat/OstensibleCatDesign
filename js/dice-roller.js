/* Bleak Forest Engine – Dice Roller
   Needs the markup in dice-roller.html (ids: tray, results, history, wyrd, modifier, bam, roll,
   d20-count, d6-count, and the data-step / data-preset buttons) and images/BFSigil-dice.png.

   The sigil image is white on a transparent background. It is used as an SVG mask, so the
   sigil is drawn in whatever colour the die's ink is (dark on bone dice, cream on the Wyrd die).
   To change its colour, change --ink / --wyrd-ink in CSS/dice-roller.css.

   Danger Die rolls (any roll with the Wyrd die ticked) are read in full: Special Events, the
   Still Watch table and the encounter tables are rolled automatically, and every result links
   back to its rule on the site. Encounters with creatures also roll Disposition (2d6) and
   Behaviour (d20), as in Actions, Encounters & Mishaps. Mindless creatures (the Mindless trait in
   the Creature Compendium) keep the disposition they roll: Guile cannot affect them.
   "Inside an Ordeal's footprint" applies the Fated Road changes to the Danger Die, and the Omen,
   Setback and Doom save buttons follow the Order of Play. The tables below copy the site's text;
   if you change a table on the site, change it here too. */

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

    // ======================================================================
    // ---- Rules data (copied from the site; keep in step with it) ----
    // ======================================================================
    const DD = 'Danger-dice-and-encounter-tables.html';
    const AE = 'action&amp;encounters.html';
    const CC = 'creature-compendium.html';
    const FL = 'forage-loot-tables.html';
    const CORE = 'Bleak-Forest-Core.html';
    const link = (href, text) => `<a href="${href}">${text}</a>`;

    // Creature name -> Creature Compendium anchor. Most follow the compendium's slug pattern;
    // the exceptions are listed here.
    const CREATURE_IDS = {
        'Boggart': 'fae-boggart', 'Bleak hound': 'bleak-hound', 'Hag Coven (Three)': 'hag',
        'Elemental (Elder)': 'elementals', 'The Wild Hunt': 'wild-hunt-rider', 'Wild Hunt': 'wild-hunt-rider',
        'Forest Giant': 'giant-forest'
    };
    const slug = s => s.toLowerCase().replace(/[’']/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    const creatureHref = name => `${CC}#${CREATURE_IDS[name] || slug(name)}`;

    const COMMON_I = ['Animal, Small (Cat)', 'Animal, Small (Fox)', 'Animal, Small (Owl)', 'Animal, Small (Raven)',
        'Animal, Small (Serpent)', 'Animal, Small (Toad)', 'Animal, Medium (Boar)', 'Animal, Medium (Large Bat)',
        'Animal, Medium (Large Cat)', 'Animal, Medium (Large Centipede)', 'Animal, Medium (Giant Rat)',
        'Animal, Medium (Giant Spider)', 'Animal, Medium (Wolf)', 'Animal, Large (Black Bear)', 'Animal, Large (Brown Bear)',
        'Animal, Large (Insect Swarm)', 'Animal, Large (Giant Frog)', 'Animal, Large (Giant Snake)',
        'Animal, Huge (Giant Beetle)', 'Demon (Imp)'];
    const COMMON_II = ['Fae (Brownie)', 'Fae (Changeling)', 'Fae (Dwarf)', 'Fae (Elf)', 'Fae (Fairy)', 'Fae (Goblin)',
        'Harpy', 'Lambent Moth', 'Wildings', 'Apparition', 'Draugr', 'Ghoul', 'Skeleton', 'Zombie', 'Boggart', 'Ratling',
        'Berserker', 'Carrion Crowe', 'Dark Walker', 'Fungal Folk'];
    const UNCOMMON = ['Animal, Large (Dire Wolf)', 'Animal, Large (Giant Boar)', 'Animal, Large (Sabretooth Cat)',
        'Animal, Huge (Cave Bear)', 'Demon (Cambion)', 'Demon (Hellhound)', 'Elemental (Gnome)', 'Elemental (Salamander)',
        'Elemental (Sylph)', 'Elemental (Undine)', 'Fae (Barghest)', 'Fae (Sidhe Cat)', 'Abomination Ape', 'Bleak hound',
        'Hag', 'Moth Folk', 'Troll', 'Warg', 'Shade', 'Wight'];

    // Rare encounters: [from, to, name, compendium?, note, optional sub-roll]
    const RARE = [
        [1, 1, 'Dragon (Young)', true, 'Quest: It has collected something from a dead traveller — a letter, a name, a sealed vial. It does not understand what it has. If you can prove it has value, it will trade. Make it earn you passage; the alternative is straightforward and one-sided.'],
        [2, 2, 'Demon (Greater)', true, 'Challenge: It is not hunting you — but it has noticed you. It will make one offer. The offer sounds reasonable. Refusing costs something. Accepting costs more. There is no option to simply walk away once it has spoken.'],
        [3, 3, 'Lych', true, `Lore: Occupied with a ritual you can attempt to decipher (Wits check ${link(CORE + '#bam-challenging', 'Challenging 19')} or Occultism Difficult 16). Interrupting means immediate destruction. Success reveals something significant — a True Name, a sealed location, a forgotten history. It will not notice you if you do not disturb the circle.`],
        [4, 4, 'Hag Coven (Three)', true, 'Quest: They have a task only the living can complete. They will offer one genuine, unambiguous favour in return. The task will involve a place you should not go, a person you should not disturb, or a thing you should not touch. The favour is real. They do not cheat — but they do interpret narrowly.'],
        [5, 5, 'Elemental (Elder)', true, 'Challenge: The elder elemental has a grievance. Something was taken from it or violated its domain. It does not speak in words. A Wits check (Challenging 19) or Occultism check (Difficult 16) to understand what it wants. Resolve the grievance to pass safely. Ignore it and the terrain itself becomes hostile for 1d3 watches.'],
        [6, 7, 'The Wild Hunt', true, `Challenge: Roll 1d6. 1–4: The Hunt passes — quarry is elsewhere, you may observe. 5–6: The quarry is near you and the Hunt will reach it in 1d3 rounds. You may assist (binding you to the Hunt’s debt), impede (making you the new quarry), or flee (see ${link('Pursuit-and-Evade.html', 'Pursuit and Evasion')}).`,
            () => { const r = roll(6); if (r <= 4) return `1d6 = ${r}: the Hunt passes. The quarry is elsewhere; you may observe.`;
                    const n = roll(3); return `1d6 = ${r}: the quarry is near you. The Hunt reaches it in <strong>${n}</strong> round${n > 1 ? 's' : ''} (1d3). Assist, impede, or flee.`; }],
        [8, 9, 'Fae Lord (Sidhe Noble)', true, 'Quest: The Fae Lord has noticed you and will not be unnoticed in return. It demands a service, a wager, or a secret — your choice. It will accept terms if they are sufficiently interesting. Breaking your word invokes a permanent consequence of the Lord’s choosing. Dealing fairly earns a specific, binding favour.'],
        [10, 10, 'Bleak Leviathan', false, 'Lore: Too vast to fight. It passes through the hex like weather. In its wake, something has changed — a path is open that was not, or closed that was. Something is left behind. A Wits check (Average 13) to find it before the Forest reclaims it.'],
        [11, 12, 'Revenant (Named Dead)', true, 'Quest: Roll 1d6. 1–3: It is hunting you — for something you did or someone you are. 4–6: Someone from your past. Either way, it will tell you why if you ask before it moves. The information may change whether you run or stand. It remembers everything.',
            () => { const r = roll(6); return r <= 3 ? `1d6 = ${r}: it is hunting you, for something you did or someone you are.` : `1d6 = ${r}: it is someone from your past.`; }],
        [13, 14, 'Wyvern', true, `Challenge: Territorial but not mindless. A Wits or Guile check (Difficult 16) to redirect its attention before it commits. Success: it marks this hex as claimed and leaves — this location is safe from Wyverns once. Fail: it attacks from altitude with ${link(CORE + '#advantage-and-disadvantage', 'Moderate Advantage')} on its first strike.`],
        [15, 16, 'Forest Giant', true, 'Quest/Lore: It has something — a body it found, a carved object, a trapped creature it does not know what to do with. It will trade for food or something impressive. It will answer one direct question about the terrain it patrols if given tribute (at least 1sp in food or valuables). It does not lie. It is not subtle.'],
        [17, 18, 'Draconic Worm', true, `Challenge: Subterranean tremors precede it (Wits check Average 13 to detect). On success, choose: flee (see ${link('Pursuit-and-Evade.html', 'Pursuit and Evasion')}); lure it away from the path (Survival Difficult 16, costs 1 watch); or collapse its tunnel (1 Uncommon component + Wits Difficult 16 — seals the path behind you permanently).`],
        [19, 19, 'Wyrd Sister (Wandering)', false, 'Lore/Challenge: She carries a thread. It connects to something in your past that you have not thought about in a long time. She will not speak first. If you speak to her, she answers one question with absolute truth — then asks one in return. Your answer becomes part of the pattern. She will not tell you what it means.'],
        [20, 20, 'The Forest Itself', false, 'Challenge: The Forest exercises its will. Trees shift, paths close, the hex reshapes over 1d3 watches. Survival check (Difficult 16) per watch to hold orientation. Three failures: displaced to a random adjacent hex. Success: find a landmark not on any map — something the Forest wants you to see.',
            () => { const n = roll(3); return `The hex reshapes over <strong>${n}</strong> watch${n > 1 ? 'es' : ''} (1d3). Make a Survival check (Difficult 16) each watch.`; }]
    ];

    // Special Events by tier: [event, description, optional sub-roll returning {html, encounter?}]
    const lootRoll = (parts) => () => ({ html: parts.map(([dice, table, id]) => {
        const n = dice ? roll(dice) : 1;
        return `Roll <strong>${n}</strong> time${n > 1 ? 's' : ''}${dice ? ` (1d${dice})` : ''} on ${link(`${FL}#${id}`, table)}`;
    }).join('; ') + '.' });
    const savesRoll = tier => () => { const r = roll(6);
        return { html: `1d6 = ${r}: all saves are at <strong>${tier} ${r <= 3 ? 'Advantage' : 'Disadvantage'}</strong> for the next hour (see ${link(CORE + '#advantage-and-disadvantage', 'Advantage and Disadvantage')}).` }; };
    const alchemistOr = (alch, other, otherHref) => () => { const r = roll(6);
        if (r <= 3) return { html: `1d6 = ${r}: ${link(DD + '#Alchemist', alch)}. Roll disposition as normal, but treat Hostile as Wary: the Alchemist avoids fights and leaves rather than attacks.`, encounter: { name: alch, alchemist: true } };
        return { html: `1d6 = ${r}: ${otherHref ? link(otherHref, other) : other}.`, encounter: { name: other } }; };
    const OMEN = 'If any Challenge or Ordeal is Prepared, it begins (timing per its Omen). Otherwise, reveal the type of its next missing Fragment.';
    const omenLinks = ` See ${link('challenges&amp;ordeals.html#fragments-preparation-and-omens', 'Fragments, Preparation, and Omens')}.`;
    const SPECIAL = {
        Minor: [
            ['Wanderer (Smith/Trader)', 'Up to Common Items.', () => ({ html: `A trader on the road. Stock is limited to Common items (see ${link('Equipment.html', 'Equipment')}).`, encounter: { name: 'Wanderer (Smith/Trader)' } })],
            ['Magic Spring', 'All saves are at Moderate (roll d6) Advantage (1-3) disadvantage (4-6) for the next hour.', savesRoll('Moderate')],
            ['Loot Cache 1', 'Roll 1d3 times on the Loot I table.', lootRoll([[3, 'Loot I', 'loot-i']])],
            ['Alchemist/Bandits', 'Roll 1d6: 1–3: Wandering Alchemist; 4–6: Bandits.', alchemistOr('Wandering Alchemist', 'Bandits')],
            ['Glimpse', 'See into the next Sub Hex.'],
            ['Sisters’ Omen', OMEN + omenLinks]
        ],
        Moderate: [
            ['Wanderer (Smith/Trader)', 'Up to Uncommon Items.', () => ({ html: `A trader on the road. Stock goes up to Uncommon items (see ${link('Equipment.html', 'Equipment')}).`, encounter: { name: 'Wanderer (Smith/Trader)' } })],
            ['Magic Fountain', 'All saves are at Major (roll d6) Advantage (1-3) disadvantage (4-6) for the next hour. This hex remains on the map during a recursion.', savesRoll('Major')],
            ['Loot Cache 2', 'Roll 1d3 on Loot I and 1d2 on Loot II tables.', lootRoll([[3, 'Loot I', 'loot-i'], [2, 'Loot II', 'loot-ii']])],
            ['Alchemist/Brigands', 'Roll 1d6: 1–3: Wandering Alchemist; 4–6: Brigands.', alchemistOr('Wandering Alchemist', 'Brigands')],
            ['Oracle', 'See into the surrounding 6 hexes.'],
            ['Sisters’ Omen (Strong)', OMEN + omenLinks]
        ],
        Major: [
            ['Wanderer (Smith/Trader)', 'Up to rare items.', () => ({ html: `A trader on the road. Stock goes up to Rare items (see ${link('Equipment.html', 'Equipment')}).`, encounter: { name: 'Wanderer (Smith/Trader)' } })],
            ['Obelisk', 'All saves are at Extreme (roll d6) Advantage (1-3) disadvantage (4-6) for the next hour. This hex and surrounding six hexes remain on the map during a recursion.', savesRoll('Extreme')],
            ['Loot Cache 3', 'Roll 1d3 on Loot I, 1d2 on Loot II, and once on Loot III tables.', lootRoll([[3, 'Loot I', 'loot-i'], [2, 'Loot II', 'loot-ii'], [0, 'Loot III', 'loot-iii']])],
            ['Alchemist/Wild Hunt', 'Roll 1d6: 1–3: Master Alchemist; 4–6: Wild Hunt.', alchemistOr('Master Alchemist', 'Wild Hunt', creatureHref('Wild Hunt'))],
            ['Portal', 'You can traverse the portal to any hex that is revealed.'],
            ['Sisters’ Warning', OMEN + omenLinks]
        ]
    };

    // Still Watch (d6 + consecutive count); index 0 = result 1, index 7 = 8+
    const STILL = [
        ['True quiet', 'Nothing stirs. Your next Recovery or rest in this sub-hex restores 1 extra Vitality.'],
        ['Old passage', `Tracks, a cold firepit or a dropped tool. Gain ${link(CORE + '#advantage-and-disadvantage', 'Moderate Advantage')} on your next Explore or tracking check in this sub-hex.`],
        ['Shifting sky', `The weather turns early. Reroll weather now (see ${link('Terrain.html#Weather', 'Weather')}); the result lasts for the rest of this Watch and the next.`],
        ['Distant sound', 'Bells, voices or something large moving away. Note it; nothing comes of it yet.'],
        ['Watched', 'You feel eyes on you, but find nothing. Your next Danger Die roll adds 1 die.'],
        ['Sign of the pattern', 'A shape in the bark, a thread caught on a thorn. If any Challenge or Ordeal is not yet Prepared, learn the type of its next missing Fragment.'],
        ['Too still', 'Birds fall silent and the wind drops. Your next Danger Die roll adds 1 die, and a result of 6–9 is treated as Uncommon.'],
        ['The silence breaks', 'Something has been waiting. Roll on the Uncommon Encounter table; it has surprise unless you win an opposed Anima check. Reset the count.']
    ];

    // Creatures with the Mindless trait in the Creature Compendium. Guile cannot affect them, so their
    // disposition cannot be changed by Parley, a Ruse or an approach.
    const MINDLESS = new Set(['Animal, Large (Insect Swarm)', 'Animal, Medium (Large Centipede)', 'Animal, Huge (Giant Beetle)',
        'Fungal Folk', 'Skeleton', 'Zombie']);
    const MINDLESS_NOTE = `Mindless: its disposition cannot be changed. Guile cannot affect it, so Parley, a Ruse and the approaches have no effect (${link(CC + '#common-traits', 'Common Traits')}).`;

    // The Fated Road: inside an Ordeal's footprint
    const FR = 'fated-road.html';
    const ORDEAL_ENCOUNTERS = [   // 1d6: 1–2, 3, 4, 5, 6
        ['Adversary', 'A creature or band of the Ordeal’s tier stands in the way. Fight, parley, hide, flee or trick it.'],
        ['Hazard', 'The site itself is dangerous: a collapse, a flood, a fire, a fall. One check at the task’s BAM!; on a failure, take the harm the hazard threatens.'],
        ['Witness', 'Someone knows something. Parley at the task’s BAM!; on a success they give a Fragment for another event or tell you the Cause’s weakness.'],
        ['Temptation', `An easier way, at a price: Corruption, a broken Vow, a life traded. Accepting it counts the encounter as resolved, and calls for a ${link('doom-and-boon.html#doom-save', 'Doom save')}.`],
        ['Signature', 'An encounter from the Goal’s own signature table.']
    ];
    const ordealEncounterRow = r => ORDEAL_ENCOUNTERS[r <= 2 ? 0 : r - 2];
    const SETBACKS = [
        ['Delay', 'Lose 1 Watch: the road floods, the witness hides, the door is barred.'],
        ['Losses', 'Lose 1d3 uses of food, water or torches, or 1 Durability from one item.'],
        ['Hunted', 'The Adversary knows you are here. Add one Adversary encounter to your next task.'],
        ['Turned', 'The place’s people turn Wary. Anima tasks are at Minor Disadvantage until a task succeeds.'],
        ['Wounded', 'The character with the lowest Vitality takes a Minor Condition of the Narrator’s choice.'],
        ['The Adversary’s gaze', `Every character in the footprint makes a ${link('doom-and-boon.html#doom-save', 'Doom save')}.`]
    ];
    function setbackHtml() {
        const r = roll(6), [name, text] = SETBACKS[r - 1];
        let extra = '';
        if (r === 2) { const n = roll(3); extra = ` (1d3 = ${n})`; }
        return { name, html: `<p class="sub-roll">Setback d6 = ${r}: <strong>${name}.</strong> ${text}${extra} Lower the Ruin die by 1. A character may spend 1 ${link('doom-and-boon.html#boon-points', 'Boon Point')} to cancel the Setback as it is rolled; the Ruin die still drops (${link(FR + '#setbacks-and-the-ruin-die', 'Setbacks')}).</p>` };
    }

    // Disposition and behaviour (Actions, Encounters, & Mishaps)
    const DEMEANOURS = ['Hostile', 'Wary', 'Curious', 'Friendly', 'Helpful'];
    const dispositionReading = sum => sum <= 3 ? 'Hostile' : sum <= 6 ? 'Wary' : sum <= 9 ? 'Curious' : sum <= 11 ? 'Friendly' : 'Helpful';
    const DEMEANOUR_TEXT = {
        Hostile: 'Hostile creatures will attack if they pass a Morale save, or try to hinder the players if they fail.',
        Wary: 'Wary creatures will deceive or hinder you if they pass a Morale check, or avoid you if they fail.',
        Curious: 'Curious creatures will be Wary or Friendly depending on your approach to them. Choose your approach:',
        Friendly: 'Friendly creatures are kindly disposed and will help if it costs them little: sharing information, answering questions and giving directions. They won’t endanger themselves for you.',
        Helpful: 'Helpful creatures give whatever aid they can, even at some cost to themselves. If suitably enticed, there is a 1 in 6 chance they will travel with you.'
    };
    const BEHAVIOUR = {
        Hostile: ['Attacks immediately', 'Threatens, demands tribute', 'Attempts to ambush', 'Issues ultimatum, gives you one chance to flee', 'Intimidates, then attacks if resisted', 'Calls for reinforcements or sets a trap', 'Tries to capture or restrain you', 'Uses a special ability or environmental hazard', 'Taunts or insults you', 'Attempts to destroy your equipment or supplies'],
        Wary: ['Keeps distance, observes', 'Issues a warning', 'Demands you state your purpose', 'Offers a trade, but is suspicious', 'Attempts to mislead or send you away', 'Retreats if approached, but may return', 'Sets up a defensive position', 'Tests you with a minor challenge or riddle', 'Watches silently, waiting for you to act', 'Sends a messenger or animal to spy on you'],
        Curious: ['Approaches cautiously', 'Asks questions', 'Offers minor trade or information', 'Follows you at a distance', 'Tests your intentions with a harmless trick', 'Invites you to share a meal or story', 'Mimics your actions or speech', 'Offers to exchange stories or secrets', 'Examines your belongings with fascination', 'Asks to join you for a short time'],
        Friendly: ['Greets warmly', 'Offers aid or supplies', 'Shares useful information', 'Invites you to join them', 'Asks for your help with a small task', 'Offers to travel together for a Watch', 'Sings, tells a joke, or entertains', 'Shares a rumour or warning about the area', 'Offers to introduce you to an ally', 'Gives you a token of friendship'],
        Helpful: ['Heals or protects you', 'Gives a rare item or secret', 'Warns of nearby danger', 'Offers to guide you', 'Shares a rumour or prophecy', 'Asks nothing in return, simply helps', 'Offers to teach you a skill or lore', 'Intervenes on your behalf in a future encounter', 'Offers sanctuary or a safe place to rest', 'Sacrifices something valuable for your benefit']
    };
    // Encounter actions and when each is available
    const ACTIONS = [
        ['Combat', `${AE}#combat`, () => true],
        ['Parley', `${AE}#parley`, d => d !== 'Hostile'],
        ['Hide', `${AE}#hide`, () => true, 'requires cover'],
        ['Flee', 'Pursuit-and-Evade.html', () => true],
        ['Ruse', `${AE}#ruse`, d => d !== 'Hostile'],
        ['Submit', `${AE}#encounter-actions`, () => true]
    ];

    // ---- Session state for the Danger Die ----
    const watch = { stillCount: 0, extraDie: false, tooStill: false };

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
        disposition: { d20: 0, d6: 2, wyrd: false, mod: 0 },
        omen:        { d20: 0, d6: 1, wyrd: false },          // Modifier box = Watches already waited
        setback:     { d20: 0, d6: 1, wyrd: false, mod: 0 },
        doom:        { d20: 1, d6: 0, wyrd: false }           // Modifier box = Spiritus modifier
    };
    // Order of Play rolls, added beside the page's own quick-roll buttons
    (function addOrderOfPlayPresets() {
        const box = document.querySelector('.presets');
        if (!box) return;
        [['omen', 'Omen Roll (1d6 + Watches waited)'], ['setback', 'Setback (1d6)'], ['doom', 'Doom Save (d20 + Spiritus)']].forEach(([k, label]) => {
            if (box.querySelector(`[data-preset="${k}"]`)) return;
            const b = document.createElement('button'); b.type = 'button'; b.dataset.preset = k; b.textContent = label; box.appendChild(b);
        });
    })();
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
    const signed = n => (n >= 0 ? '+' : '−') + Math.abs(n);

    // ---- Disposition and behaviour ----
    let blockSeq = 0;
    // Rolls 2d6 disposition (unless one is given) and a d20 behaviour, as HTML.
    function dispositionBlock(opts = {}) {
        const id = 'disp-' + (++blockSeq);
        let dice = null, demeanour = opts.demeanour, how = opts.how || '';
        if (!demeanour) {
            dice = [roll(6), roll(6)];
            demeanour = dispositionReading(dice[0] + dice[1]);
            how = `Disposition 2d6: ${dice[0]} + ${dice[1]} = ${dice[0] + dice[1]}`;
        }
        let shown = demeanour, alchemistNote = '';
        if (opts.alchemist && demeanour === 'Hostile') { shown = 'Wary'; alchemistNote = ' The Alchemist treats Hostile as Wary.'; }
        return { id, demeanour: shown, html: `<div class="disposition-block" id="${id}" data-alchemist="${opts.alchemist ? 1 : ''}" data-mindless="${opts.mindless ? 1 : ''}">${demeanourHtml(shown, how, alchemistNote, undefined, opts.mindless)}</div>` };
    }
    function demeanourHtml(d, how, extra = '', b = roll(20), mindless = false) {
        const act = BEHAVIOUR[d][Math.ceil(b / 2) - 1];
        let html = `<p class="roll-tag">${how}${extra}</p>
            <p>Disposition: <span class="demeanour ${d.toLowerCase()}">${d}</span> (${link(AE + '#parley', 'Parley')})</p>
            <p>${mindless && d === 'Curious' ? 'Curious: it will investigate you, but your approach cannot change how it acts.' : DEMEANOUR_TEXT[d]}</p>`;
        if (mindless) html += `<p class="pending-note">${MINDLESS_NOTE}</p>`;
        if (d === 'Curious' && !mindless) {
            html += `<div class="card-buttons">
                <button type="button" data-approach="friendly">Friendly approach (Guile check)</button>
                <button type="button" data-approach="neutral">Neutral approach</button>
                <button type="button" data-approach="aggressive">Aggressive approach</button></div>
                <p class="roll-tag">The Friendly approach rolls d20 + the Modifier box above: put your Anima modifier + Guile rank there first.</p>`;
        }
        html += `<p>Behaviour d20 = ${b}: <strong>${act}</strong> (${link(AE + '#encounter-behaviour-table-by-demeanour-d20', 'Encounter Behaviour Table')})</p>`;
        if (d === 'Helpful' && !mindless) { const j = roll(6); html += `<p class="roll-tag">Travel with you, if suitably enticed: 1d6 = ${j}, ${j === 1 ? 'yes, it will join you.' : 'no.'}</p>`; }
        const allowed = (name, ok) => ok(d) && !(mindless && (name === 'Parley' || name === 'Ruse'));
        html += `<ul class="action-list">${ACTIONS.map(([name, href, ok, note]) =>
            `<li class="${allowed(name, ok) ? '' : 'unavailable'}">${link(href, name)}${note && allowed(name, ok) ? ` <small>(${note})</small>` : ''}</li>`).join('')}</ul>`;
        return html;
    }
    // Curious: resolve an approach
    results.addEventListener('click', e => {
        const btn = e.target.closest('button');
        if (!btn) return;
        if (btn.dataset.approach) {
            const block = btn.closest('.disposition-block');
            let d, how;
            if (btn.dataset.approach === 'friendly') {
                const mod = parseInt(modInput.value, 10) || 0, nat = roll(20), total = nat + mod;
                if (total >= 13) { const r = roll(6); d = r <= 4 ? 'Friendly' : 'Helpful';
                    how = `Friendly approach: Guile ${nat} ${signed(mod)} = ${total} vs Average (13), success; 1d6 = ${r}`; }
                else { d = 'Wary'; how = `Friendly approach: Guile ${nat} ${signed(mod)} = ${total} vs Average (13), failure`; }
            } else if (btn.dataset.approach === 'neutral') {
                const r = roll(6); d = r <= 3 ? 'Wary' : 'Friendly'; how = `Neutral approach: 1d6 = ${r}`;
            } else {
                const r = roll(6); d = r <= 4 ? 'Wary' : 'Hostile'; how = `Aggressive approach: 1d6 = ${r}`;
            }
            let extra = '';
            if (block.dataset.alchemist && d === 'Hostile') { d = 'Wary'; extra = ' The Alchemist treats Hostile as Wary.'; }
            block.innerHTML = demeanourHtml(d, how, extra);
            addHistory(`Approach: ${d}`);
        } else if (btn.dataset.action === 'disposition') {
            const card = btn.closest('.event-card');
            const blk = dispositionBlock({ alchemist: !!btn.dataset.alchemist });
            btn.remove();
            card.insertAdjacentHTML('beforeend', blk.html);
            addHistory(`Disposition: ${blk.demeanour}`);
        } else if (btn.dataset.action === 'reset-still') {
            watch.stillCount = 0; btn.closest('p').textContent = 'Still Watch count reset to 0.';
        }
    });

    // An encounter card for a creature, with surprise and disposition
    function encounterCard(title, titleHref, tag, note, opts = {}) {
        const disp = dispositionBlock({ alchemist: opts.alchemist, mindless: opts.mindless || MINDLESS.has(title) });
        const surprise = opts.surprise ||
            `Check for surprise: an opposed Anima check (${link(AE + '#surprise', 'Surprise')}); then ${link(AE + '#initiative', 'Initiative')} if order matters (1d6 + Anima modifier).`;
        return { demeanour: disp.demeanour, html: `<div class="event-card">
            <h4>${titleHref ? link(titleHref, title) : title}</h4>
            <p class="roll-tag">${tag}</p>${note ? `<p>${note}</p>` : ''}
            <p>${surprise}</p>${disp.html}
            <p class="source">${opts.source ? opts.source + ' · ' : ''}Procedure: ${link(AE + '#encounter-procedure-reference', 'Encounter Procedure Reference')}</p></div>` };
    }

    // Reads a Danger Die roll in full. Returns { html, verdict, log, cls }.
    function readDanger(values, sum, addedNote) {
        const n = values.length, out = [];
        const tierOf = n === 1 ? 'Minor' : n === 2 ? 'Moderate' : 'Major';
        if (addedNote) out.push(`<p class="pending-note">${addedNote}</p>`);
        const tooStill = watch.tooStill; watch.tooStill = false;

        const inFootprint = footprintBox && footprintBox.checked;
        // Wyrd die 1 inside an Ordeal's footprint: the Fated Road table replaces the Special Event
        if (values[0] === 1 && inFootprint) {
            watch.stillCount = 0;
            const r = roll(6);
            let title, body, log;
            if (r <= 2) { const sb = setbackHtml(); title = `Setback: ${sb.name}`; body = sb.html; log = `Footprint Wyrd 1: Setback (${sb.name})`; }
            else if (r <= 4) { title = 'A Witness, or a Fragment'; body = `<p>You meet a Witness, or find a Fragment for another event (${link(FR + '#fragments-omens-and-threads', 'Fragments, Omens and Threads')}).</p>`; log = 'Footprint Wyrd 1: Witness or Fragment'; }
            else { title = 'The Trouble flares'; body = `<p>If the Ordeal is Prepared, roll for its Omen now: use the <strong>Omen Roll</strong> button above with the Watches waited in the Modifier box (${link('challenges&amp;ordeals.html#fragments-preparation-and-omens', 'Omen Timing')}).</p>`; log = 'Footprint Wyrd 1: the Trouble flares'; }
            out.push(`<div class="event-card special"><h4>${title}</h4>
                <p class="roll-tag">Wyrd die 1 inside an Ordeal’s footprint, d6 = ${r}</p>${body}
                <p class="source">Source: ${link(FR + '#travel-terrain-and-the-danger-die', 'The Danger Die inside the footprint')}</p></div>`);
            return { html: out.join(''), verdict: 'The Wyrd die shows 1 inside the footprint.', cls: 'crit', log };
        }

        // Special Event
        if (values[0] === 1) {
            watch.stillCount = 0;
            const r = roll(6), [name, desc, sub] = SPECIAL[tierOf][r - 1];
            let body = `<p>${desc}</p>`, log = `${tierOf} Special Event: ${name}`;
            if (sub) {
                const s = sub();
                body += `<p class="sub-roll">${s.html}</p>`;
                if (s.encounter) {
                    body += `<div class="card-buttons"><button type="button" data-action="disposition"${s.encounter.alchemist ? ' data-alchemist="1"' : ''}>Roll disposition and behaviour</button></div>`;
                    log += ` (${s.encounter.name})`;
                }
            }
            out.push(`<div class="event-card special"><h4>${name}</h4>
                <p class="roll-tag">${tierOf} Special Event, d6 = ${r}</p>${body}
                <p class="source">Source: ${link(DD + '#Special-Events', 'Special Events')} · ${link(DD + '#Danger-Die', 'The Wyrd die')}</p></div>`);
            return { html: out.join(''), verdict: `The Wyrd die shows 1: ${tierOf} Special Event.`, cls: 'crit', log };
        }

        // Still Watch
        if (sum <= 5) {
            const r = roll(6), count = watch.stillCount, total = r + count, row = STILL[Math.min(total, 8) - 1];
            const tag = `Still Watch, d6 = ${r}${count ? ` + ${count} (consecutive Still Watches) = ${total}` : ''}`;
            let log = `Still Watch: ${row[0]}`;
            if (total >= 8) {
                watch.stillCount = 0;
                const d = roll(20), name = UNCOMMON[d - 1];
                const card = encounterCard(name, creatureHref(name), `${tag} → Uncommon Encounter, d20 = ${d}`,
                    `<strong>The silence breaks.</strong> ${row[1]}`,
                    { surprise: `It has surprise unless you win an opposed Anima check (${link(AE + '#surprise', 'Surprise')}).`,
                      source: `Source: ${link(DD + '#Special-Events', 'Still Watch table')} · ${link(DD + '#encounter-tables', 'Encounter Tables')}` });
                out.push(card.html);
                return { html: out.join(''), verdict: 'No encounter… until the silence breaks.', cls: 'fumble', log: `Still Watch 8+: ${name} (${card.demeanour})` };
            }
            watch.stillCount++;
            if (total === 5) watch.extraDie = true;
            if (total === 7) { watch.extraDie = true; watch.tooStill = true; }
            out.push(`<div class="event-card quiet"><h4>${row[0]}</h4><p class="roll-tag">${tag}</p><p>${row[1]}</p>
                <p class="roll-tag">Consecutive Still Watches: ${watch.stillCount}. <button type="button" data-action="reset-still">Reset count</button></p>
                ${watch.extraDie ? '<p class="pending-note">Your next Danger Die roll will add 1 die automatically.</p>' : ''}
                <p class="source">Source: ${link(DD + '#Special-Events', 'Still Watch table')}</p></div>`);
            return { html: out.join(''), verdict: 'No encounter. Roll on the Still Watch table.', cls: '', log };
        }

        // Encounters
        watch.stillCount = 0;
        const rarity = sum >= 13 ? 'Rare' : (sum >= 10 || tooStill) ? 'Uncommon' : 'Common';
        if (inFootprint) {
            const f = roll(6);
            if (f >= 4) {
                const r = roll(6), [kind, text] = ordealEncounterRow(r);
                let html = `<div class="event-card"><h4>Ordeal Encounter: ${kind}</h4>
                    <p class="roll-tag">${rarity} result inside the footprint; d6 = ${f}, so it belongs to the Ordeal. Ordeal encounter d6 = ${r}</p><p>${text}</p>`;
                if (kind === 'Adversary' || kind === 'Witness') {
                    const disp = dispositionBlock({});
                    html += `<p>Check for surprise: an opposed Anima check (${link(AE + '#surprise', 'Surprise')}).</p>${disp.html}`;
                }
                html += `<p class="source">Source: ${link(FR + '#ordeal-structure', 'Ordeal Structure')} · ${link(FR + '#travel-terrain-and-the-danger-die', 'The Danger Die inside the footprint')}</p></div>`;
                out.push(html);
                return { html: out.join(''), verdict: `${rarity} Encounter: the Ordeal’s own.`, cls: kind === 'Adversary' ? 'fumble' : '', log: `Ordeal encounter: ${kind}` };
            }
            out.push(`<p class="pending-note">Inside the footprint, d6 = ${f}: the region’s normal ${rarity} table is used.</p>`);
        }
        if (sum >= 13) {
            const d = roll(20), [, , name, inBook, note, sub] = RARE.find(([a, b]) => d >= a && d <= b);
            const href = inBook ? creatureHref(name) : DD + '#rare-encounter-table';
            out.push(`<div class="event-card"><h4>${link(href, name)}</h4>
                <p class="roll-tag">Rare Encounter, d20 = ${d}</p><p>${note}</p>
                ${sub ? `<p class="sub-roll">${sub()}</p>` : ''}
                <p>Rare encounters are events, not simply fights; approaching with steel drawn is almost always the wrong choice.</p>
                <div class="card-buttons"><button type="button" data-action="disposition">Roll disposition and behaviour</button></div>
                <p class="source">Source: ${link(DD + '#rare-encounter-table', 'Rare Encounters')}${inBook ? ` · ${link(href, 'Creature Compendium')}` : ''}</p></div>`);
            return { html: out.join(''), verdict: 'Rare Encounter.', cls: 'fumble', log: `Rare: ${name}` };
        }
        let column, label, d6col = null;
        if (sum >= 10 || tooStill) {
            column = UNCOMMON; label = tooStill && sum <= 9 ? 'Uncommon Encounter (Too still: 6–9 counts as Uncommon)' : 'Uncommon Encounter';
        } else {
            d6col = roll(6); column = d6col <= 3 ? COMMON_I : COMMON_II;
            label = `Common Encounter ${d6col <= 3 ? 'I' : 'II'} (column d6 = ${d6col})`;
        }
        const d = roll(20), name = column[d - 1];
        const card = encounterCard(name, creatureHref(name), `${label}, d20 = ${d}`, '',
            { source: `Source: ${link(DD + '#encounter-tables', 'Encounter Tables')}` });
        out.push(card.html);
        const kind = column === UNCOMMON ? 'Uncommon' : 'Common';
        return { html: out.join(''), verdict: `${kind} Encounter.`, cls: '', log: `${kind}: ${name} (${card.demeanour})` };
    }

    // ---- Rolling ----
    let busy = false;
    function doRoll() {
        if (busy || state.d20 + state.d6 === 0) return;
        busy = true; rollBtn.disabled = true;
        const mod = parseInt(modInput.value, 10) || 0;
        const bam = bamSelect.value === '' ? null : +bamSelect.value;
        const wyrd = wyrdBox.checked && state.d6 > 0;
        // "Watched" / "Too still": the next Danger Die roll adds 1 die (the pool never exceeds 4d6)
        let addedNote = '';
        if (wyrd && watch.extraDie) {
            watch.extraDie = false;
            if (state.d6 < 4) { state.d6++; addedNote = `+1 die from the last Still Watch: rolling ${state.d6}d6.`; }
            else addedNote = 'The last Still Watch added 1 die, but the pool is already at its 4d6 maximum.';
        }
        // Inside an Ordeal's footprint: +1 die for the Trouble, +1 more at a Major Ordeal's Cause (pool max 4d6)
        let pool = state.d6;
        if (wyrd && footprintBox && footprintBox.checked) {
            const want = 1 + (causeBox && causeBox.checked ? 1 : 0), added = Math.max(0, Math.min(4, pool + want) - pool);
            pool += added;
            addedNote += (addedNote ? ' ' : '') + (added ? `+${added} die for the Ordeal’s Trouble: rolling ${pool}d6.` : 'The Trouble adds a die, but the pool is already at its 4d6 maximum.');
        }
        const d20s = Array.from({ length: state.d20 }, () => roll(20));
        const d6s = Array.from({ length: pool }, () => roll(6));

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
            showResults(d20s, d6s, mod, bam, wyrd, addedNote);
            busy = false; render();
        };
        if (reduce) { settle(); return; }
        let ticks = 0;
        const timer = setInterval(() => {
            nodes.forEach(n => paint(n, roll(n.sides)));
            if (++ticks >= 8) { clearInterval(timer); settle(); }
        }, 75);
    }

    function addHistory(text) {
        const li = document.createElement('li');
        li.textContent = text;
        history.prepend(li);
        while (history.children.length > 10) history.lastElementChild.remove();
    }

    function showResults(d20s, d6s, mod, bam, wyrd, addedNote) {
        const out = [], log = [];
        d20s.forEach((nat, i) => {
            const total = nat + mod, v = d20Verdict(nat, total, bam);
            const label = d20s.length > 1 ? `d20 #${i + 1}` : 'd20';
            out.push(`<p class="result-line"><strong>${label}:</strong> rolled ${nat}${mod ? ` ${signed(mod)} = <strong>${total}</strong>` : ''}` +
                     (bam !== null ? ` against ${BAM_NAMES[bam]} (${bam})` : '') + '</p>');
            if (v) out.push(`<p class="verdict ${v.cls}">${v.text}</p>`);
            log.push(`d20: ${nat}${mod ? ` ${signed(mod)} = ${total}` : ''}${v ? ' (' + v.text.split('.')[0].replace(/ \(.*/, '') + ')' : ''}`);
        });
        let card = '';
        if (activePreset === 'doom' && d20s.length === 1 && !d6s.length) {
            const nat = d20s[0], total = nat + mod, failed = nat === 1 || (bam !== null && nat !== 20 && total < bam);
            card = `<div class="event-card${failed ? '' : ' quiet'}"><h4>Doom Save${bam !== null ? ` against ${BAM_NAMES[bam]} (${bam})` : ''}</h4>
                <p>${failed ? 'On a failure, lose 1 Doom and suffer the Goal’s extra effect.' : bam === null ? 'Choose the Doom BAM! above: Average (13) between Ordeals or in a Minor one, Difficult (16) in a Moderate, Challenging (19) in a Major, Formidable (22) at the Reckoning.' : 'Your Doom holds.'}
                A Failing character (Doom 1–3) rolls at Minor Disadvantage: lower the Modifier by 1.</p>
                <p class="source">Source: ${link('doom-and-boon.html#doom-save', 'The Doom save')} · ${link('doom-and-boon.html#doom-bam', 'The Doom BAM!')} · ${link('doom-and-boon.html#doom-goal-effects', 'Extra effects by Goal')}</p></div>`;
        }
        if (d6s.length) {
            const sum = d6s.reduce((a, b) => a + b, 0), high = Math.max(...d6s);
            const shownSum = d20s.length ? sum : sum + mod;
            const dice = d6s.map((v, i) => (wyrd && i === 0 ? `<strong title="Wyrd die">${v}ᵂ</strong>` : v)).join(', ');
            out.push(`<p class="result-line"><strong>${d6s.length}d6:</strong> ${dice} · Total <strong>${shownSum}</strong>` +
                     (!d20s.length && mod ? ` (${sum} ${signed(mod)})` : '') +
                     (d6s.length > 1 ? ` · Highest <strong>${high}</strong>` : '') + '</p>');
            let note = '', cls = '', extraLog = '';
            if (wyrd) {
                const r = readDanger(d6s, sum, addedNote);
                note = r.verdict; cls = r.cls; card = r.html; extraLog = r.log;
            } else if (activePreset === 'omen' && d6s.length === 1 && !d20s.length) {
                const total = sum + mod, arrives = total >= 6;
                note = arrives ? 'The Omen arrives.' : 'No Omen yet.'; cls = arrives ? 'crit' : '';
                card = `<div class="event-card${arrives ? ' special' : ' quiet'}"><h4>${arrives ? 'The Omen arrives' : 'No Omen yet'}</h4>
                    <p class="roll-tag">Omen roll: d6 ${sum}${mod ? ` + ${mod} Watches waited` : ''} = ${total}</p>
                    <p>${arrives ? `The Prepared event begins. For an Ordeal, set its Ruin die to 6; when a Major Ordeal’s Omen arrives, every character in the footprint makes a ${link('doom-and-boon.html#doom-save', 'Doom save')}.`
                        : 'Add 1 to the Modifier box for the next End of Watch roll. An Ordeal’s Omen is rolled only for Watches spent inside its footprint.'}</p>
                    <p class="source">Source: ${link('challenges&amp;ordeals.html#fragments-preparation-and-omens', 'Omen Timing')} · ${link('order-of-play.html#end-of-watch-checklist', 'End of Watch Checklist')}</p></div>`;
            } else if (activePreset === 'setback' && d6s.length === 1 && !d20s.length) {
                const [name, text] = SETBACKS[d6s[0] - 1];
                note = `Setback: ${name}.`; cls = 'fumble';
                let extra = ''; if (d6s[0] === 2) { const n = roll(3); extra = ` (1d3 = ${n})`; }
                card = `<div class="event-card"><h4>Setback: ${name}</h4><p>${text}${extra}</p>
                    <p>Lower the Ruin die by 1. A character may spend 1 ${link('doom-and-boon.html#boon-points', 'Boon Point')} to cancel the Setback; the Ruin die still drops.</p>
                    <p class="source">Source: ${link(FR + '#setbacks-and-the-ruin-die', 'Setbacks and the Ruin Die')}</p></div>`;
            } else if (activePreset === 'disposition' && d6s.length === 2 && !d20s.length) {
                const d = dispositionReading(sum);
                note = `Disposition: ${d}.`; extraLog = '';
                const blk = dispositionBlock({ demeanour: d, how: `Disposition 2d6: ${d6s[0]} + ${d6s[1]} = ${sum}`, mindless: mindlessBox && mindlessBox.checked });
                card = `<div class="event-card"><h4>Disposition: ${d}</h4>${blk.html}
                    <p class="source">Source: ${link(AE + '#parley', 'Parley')} · ${link(AE + '#encounter-behaviour-table-by-demeanour-d20', 'Encounter Behaviour Table by Demeanour')}</p></div>`;
            }
            if (note) out.push(`<p class="verdict${cls ? ' ' + cls : ''}">${note}</p>`);
            log.push(`${d6s.length}d6: ${d6s.join(', ')} = ${shownSum}${note ? ' (' + note.replace(/\.$/, '') + ')' : ''}${extraLog ? ' · ' + extraLog : ''}`);
        }
        results.innerHTML = out.join('') + card;
        addHistory(log.join(' · '));
    }

    // ---- Known disposition: pick one, then roll its behaviour (d20) ----
    // The picker is added here so dice-roller.html needs no change.
    const picker = document.createElement('div');
    picker.className = 'behaviour-picker';
    picker.innerHTML = `<label for="demeanour">Known disposition</label>
        <select id="demeanour">${DEMEANOURS.map(d => `<option value="${d}">${d}</option>`).join('')}</select>
        <button type="button" id="roll-behaviour">Roll Behaviour (d20)</button>
        <label class="check-row"><input type="checkbox" id="mindless"> Mindless creature (disposition cannot change)</label>`;
    const presetsEl = document.querySelector('.presets');
    if (presetsEl) presetsEl.after(picker); else rollBtn.before(picker);
    const demeanourSelect = el('demeanour'), behaviourBtn = el('roll-behaviour'), mindlessBox = el('mindless');

    // Inside an Ordeal's footprint (the Fated Road): added under the Wyrd die option
    const fp = document.createElement('div');
    fp.className = 'footprint-options';
    fp.innerHTML = `<label class="check-row"><input type="checkbox" id="footprint"> Inside an Ordeal’s footprint</label>
        <label class="check-row"><input type="checkbox" id="cause-hex" disabled> At a Major Ordeal’s Cause</label>`;
    const wyrdRow = wyrdBox.closest('.check-row') || wyrdBox.parentElement;
    wyrdRow.after(fp);
    const footprintBox = el('footprint'), causeBox = el('cause-hex');
    footprintBox.addEventListener('change', () => { causeBox.disabled = !footprintBox.checked; if (!footprintBox.checked) causeBox.checked = false; });

    behaviourBtn.addEventListener('click', () => {
        if (busy) return;
        busy = true; behaviourBtn.disabled = true; rollBtn.disabled = true;
        const d = demeanourSelect.value, b = roll(20);
        tray.innerHTML = '';
        const die = document.createElement('div');
        die.className = 'die d20 rolling';
        tray.appendChild(die);
        const finish = () => {
            die.innerHTML = d20Svg(b);
            die.classList.remove('rolling');
            if (b === 1) die.classList.add('nat-one');
            if (b === 20) die.classList.add('nat-max');
            const id = 'disp-' + (++blockSeq);
            results.innerHTML = `<p class="verdict">${d}: ${BEHAVIOUR[d][Math.ceil(b / 2) - 1]}.</p>
                <div class="event-card"><h4>Behaviour: ${d}</h4>
                <div class="disposition-block" id="${id}" data-alchemist="" data-mindless="${mindlessBox.checked ? 1 : ''}">${demeanourHtml(d, `Chosen disposition: ${d}`, '', b, mindlessBox.checked)}</div>
                <p class="source">Source: ${link(AE + '#encounter-behaviour-table-by-demeanour-d20', 'Encounter Behaviour Table by Demeanour')} · ${link(AE + '#parley', 'Parley')}</p></div>`;
            addHistory(`Behaviour (${d}) d20: ${b} (${BEHAVIOUR[d][Math.ceil(b / 2) - 1]})`);
            busy = false; behaviourBtn.disabled = false; render();
        };
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { finish(); return; }
        let ticks = 0;
        const timer = setInterval(() => {
            die.innerHTML = d20Svg(roll(20));
            if (++ticks >= 8) { clearInterval(timer); finish(); }
        }, 75);
    });

    rollBtn.addEventListener('click', () => { doRoll(); });
    render();
})();
