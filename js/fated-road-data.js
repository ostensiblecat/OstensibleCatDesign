/* Bleak Forest Engine – The Fated Road: the six Fated Goals.
    (6 Ordeals per tier; 2, 3 or 4 tasks; 6 Reckoning tasks). */
window.FATED_GOALS = [
 {
  "n": 1,
  "name": "The Unending Autumn",
  "premise": "The year has stopped at its rotting end. Fields stay wet and warm, grain moulders in the barns, and the damp-lung spreads, because winter never comes to freeze the rot away. The Ember Court keeps it back: hearth-keepers who bless fires with stolen warmth, feeding it all to the Hearth-Mother, a fire older than the age. The characters must let the Great Winter fall, so the old year can die and the thaw can bring a new one.",
  "adversary": "Hearth-wardens and fooled villagers (Might 0). Lieutenants: ember priests, salamanders and bound fire elementals (up to Tier I). Champions: Ember Knights, Flame demons and a fire wyrm (up to Tier II). The Hearth-Mother herself (Tier III).",
  "signature": [
   "A hearth-warden collecting the warmth-tithe, a brazier on a pole.",
   "A field of rotting grain, thick with blight-flies (Corpus save or Sickened).",
   "A salamander nesting in a chimney.",
   "Villagers who beg you not to let the cold come.",
   "A starving frost-spirit, small as a child, asking for shelter from the fires.",
   "An Ember Knight's patrol, with its banner of a burning crown."
  ],
  "doomEffect": "Gain 1 Fatigue. Until your next Full Rest, you cannot rest without a fire burning.",
  "lie": "The frost-spirits are the curse: “the cold will kill us all”. The very allies you need are blamed.",
  "heldBy": "A rotting autumn that will not give way to winter",
  "must": "Bring the Great Winter, so the rot freezes clean and the thaw can come",
  "adversaryName": "The Ember Court and the Hearth-Mother",
  "tiers": {
   "Minor": [
    {
     "n": 1,
     "name": "The Blessed Hearth of Hob's Ford",
     "where": "A hill hamlet.",
     "trouble": "the grain rots in the barns and the children cough with damp-lung.",
     "cause": "the headman took a blessed hearthstone from a hearth-warden; it keeps every house warm and rots everything in it.",
     "tasks": [
      {
       "attr": "Anima",
       "site": "",
       "text": "expose the headman's bargain to the hamlet",
       "encounters": [
        "the headman's sons, who will not have their father shamed"
       ],
       "fragForm": "Witness",
       "frag": "a sick child saw the warden carry in \"the warm stone\" under a wet cloth"
      },
      {
       "attr": "Corpus",
       "site": "",
       "text": "dig out the hearthstone and carry it, burning, to the river",
       "encounters": [
        "Hazard: it sears through gloves (1d3 each round held)"
       ],
       "fragForm": "Mark",
       "frag": "every door bears a scorched handprint at shoulder height"
      }
     ],
     "causeFragForm": "Relic",
     "causeFrag": "a letter sealed with cinders: \"No winter shall touch the house that keeps this fire.\"",
     "omen": "the last sack of seed-grain splits in the square, crawling with maggots",
     "success": "the first frost in a generation whitens the fields of Hob's Ford"
    },
    {
     "n": 2,
     "name": "The Chimney of Grenholt",
     "where": "A holdfast.",
     "trouble": "the hall fires will not go out, the walls weep black mould, and the household sleeps in the cold yard.",
     "cause": "a hearth-warden seeded a salamander nest in the great chimney.",
     "tasks": [
      {
       "attr": "Corpus",
       "site": "",
       "text": "climb the great flue and drive out the salamanders",
       "encounters": [
        "1d3 salamanders"
       ],
       "fragForm": "Mark",
       "frag": "small clawed tracks in the soot, all leading up"
      },
      {
       "attr": "Spiritus",
       "site": "",
       "text": "ward the hearth with salt and cold iron so no fire can be fed from outside",
       "encounters": [
        "Temptation: the warden offers a purse of silver to leave the hearth alone"
       ],
       "fragForm": "Witness",
       "frag": "the chimney boy, burned, who saw red eyes in the dark"
      }
     ],
     "causeFragForm": "Vision",
     "causeFrag": "a woman of embers smiles out of the hearth and says, \"Keep me fed.\"",
     "omen": "the lord's hounds burst into flame where they lie by the fire",
     "success": "the hall goes cold, and its people sleep inside for the first time in a month"
    },
    {
     "n": 3,
     "name": "Saint Odo's Lamp",
     "where": "A roadside shrine.",
     "trouble": "pilgrims leave with fevers that never break, and the shrine's lamp has not dimmed in forty years.",
     "cause": "the lamp burns oil rendered from the shrine's own dead, tended by a hearth-warden dressed as a monk.",
     "tasks": [
      {
       "attr": "Anima",
       "site": "",
       "text": "unmask the false brother",
       "encounters": [
        "Witness: the old sexton, who will talk only if he is promised burial"
       ],
       "fragForm": "Rumour",
       "frag": "pilgrims say the lamp smells of tallow and singed hair"
      },
      {
       "attr": "Spiritus",
       "site": "",
       "text": "snuff the undying lamp and lay the dead to rest",
       "encounters": [
        "Hazard: the flame flares when touched (1d6 fire, Corpus save for half)"
       ],
       "fragForm": "Relic",
       "frag": "a vial of the lamp oil, with a single human tooth at the bottom"
      }
     ],
     "causeFragForm": "Witness",
     "causeFrag": "the sexton names the ossuary where the bodies go",
     "omen": "a pilgrim bursts into flame at the altar rail",
     "success": "the lamp goes dark, the fevers break, and the shrine's dead lie quiet"
    },
    {
     "n": 4,
     "name": "The Warm Well of Two Fords",
     "where": "A crossing hamlet.",
     "trouble": "the well runs warm and sour, the fish in the ford float belly-up, and the travellers who drink sicken.",
     "cause": "a Lesser Flame demon, sent by the Court, sits at the bottom of the well.",
     "tasks": [
      {
       "attr": "Corpus",
       "site": "",
       "text": "descend the well",
       "encounters": [
        "Hazard: scalding steam on the way down (Corpus save, Average 13, or 1d3)"
       ],
       "fragForm": "Mark",
       "frag": "steam rises from the well like ghosts at every dawn"
      },
      {
       "attr": "Spiritus",
       "site": "",
       "text": "banish or bind the ember-demon",
       "encounters": [
        "the Lesser Flame demon itself"
       ],
       "fragForm": "Witness",
       "frag": "the well-wife, who heard something laughing below"
      }
     ],
     "causeFragForm": "Relic",
     "causeFrag": "a bronze coal-scuttle stamped with a burning crown, wedged in the well's side",
     "omen": "the well boils over and scalds the ford-keeper's child",
     "success": "the water runs cold and clear; ice forms at its edge that night"
    },
    {
     "n": 5,
     "name": "The Harvest That Will Not End",
     "where": "A farming hamlet.",
     "trouble": "the harvest feast has lasted a month; the people dance and drink until they drop, and some have died.",
     "cause": "hearth-wardens spiked the feast with ember-mead to keep the hamlet celebrating the autumn for ever.",
     "tasks": [
      {
       "attr": "Anima",
       "site": "",
       "text": "break the revel and bring the people to their senses",
       "encounters": [
        "Temptation: a cup is pressed into your hand (Anima save, Average 13, or join the dance for 1d6 hours)"
       ],
       "fragForm": "Rumour",
       "frag": "a pedlar says nobody in that hamlet has slept since the reaping"
      },
      {
       "attr": "Corpus",
       "site": "",
       "text": "smash the mead casks in the tithe barn",
       "encounters": [
        "two revel-masters with cudgels"
       ],
       "fragForm": "Witness",
       "frag": "a girl too young to drink, who saw strangers bring the casks"
      }
     ],
     "causeFragForm": "Echo",
     "causeFrag": "you remember a past life, drinking that same golden mead in another dying autumn",
     "omen": "the fiddler plays until his fingers bleed, and does not stop",
     "success": "the hamlet sleeps for two days, and wakes to snow"
    },
    {
     "n": 6,
     "name": "The Lantern Children",
     "where": "A woodland hamlet.",
     "trouble": "children walk into the woods at night carrying lanterns, and come back burned, or not at all.",
     "cause": "ember-wights lure them to a pool in the woods to pay the Court a tithe of warmth.",
     "tasks": [
      {
       "attr": "Corpus",
       "site": "",
       "text": "follow the lights and bring the children home",
       "encounters": [
        "1d3 ember-wights (use Will-o'-the-wisp)"
       ],
       "fragForm": "Witness",
       "frag": "a returned girl with burned palms who says the lights sang to her"
      },
      {
       "attr": "Spiritus",
       "site": "",
       "text": "snuff the wisp-lights at the black pool",
       "encounters": [
        "Hazard: the bog around the pool (Corpus save, Average 13, or Restrained in the mud)"
       ],
       "fragForm": "Mark",
       "frag": "a ring of burned grass around the pool, shaped like a crown"
      }
     ],
     "causeFragForm": "Vision",
     "causeFrag": "a child's voice in your dream counts the children taken, and then counts you",
     "omen": "a lantern is found burning on every doorstep at dawn",
     "success": "the children stay home, and the pool freezes over"
    }
   ],
   "Moderate": [
    {
     "n": 1,
     "name": "The Furnace Guild of Ashby",
     "where": "A market town; sites: the guildhall, the furnace yard, the charcoal camps.",
     "trouble": "the forges burn day and night, ash falls like snow, and lungs blacken.",
     "cause": "the guildmaster has bound a fire elemental in the great furnace for the Ember Court.",
     "tasks": [
      {
       "attr": "Anima",
       "site": "guildhall",
       "text": "expose the guild's pact in its ledgers",
       "encounters": [
        "guild bravos",
        "a clerk who will trade the ledger for safe passage out of town"
       ],
       "fragForm": "Rumour",
       "frag": "smiths say the great furnace has not been lit by hand in a year"
      },
      {
       "attr": "Corpus",
       "site": "charcoal camps",
       "text": "scatter the charcoal stores that feed the forges",
       "encounters": [
        "the colliers, who will lose their living",
        "a charcoal pit collapsing under you"
       ],
       "fragForm": "Mark",
       "frag": "the guild's seal burned into every sack: a hammer inside a burning crown"
      },
      {
       "attr": "Spiritus",
       "site": "furnace yard",
       "text": "unbind the elemental from the great furnace",
       "encounters": [
        "molten slag pouring from the furnace mouth",
        "a hearth-warden standing guard"
       ],
       "fragForm": "Witness",
       "frag": "a journeyman who heard the furnace speak"
      }
     ],
     "causeEncounter": "the bound fire elemental, freed and furious",
     "causeFragForm": "Relic",
     "causeFrag": "a binding chain of red-hot iron, cold to the guildmaster's touch alone",
     "omen": "the great furnace bursts, and molten iron runs down the market street",
     "success": "the forges go cold, the ash stops falling, and Ashby has its first white winter in years"
    },
    {
     "n": 2,
     "name": "The Candle-Fair of Wellsmouth",
     "where": "A city; sites: Chandlers' Row, the paupers' pit, the Chapel of the Flame.",
     "trouble": "the chandlers sell everlasting candles; houses that burn them are never cold, and never stop rotting.",
     "cause": "an ember priest blesses candles made from the tallow of the city's poor dead.",
     "tasks": [
      {
       "attr": "Anima",
       "site": "Chandlers' Row",
       "text": "trace the candles back to their maker",
       "encounters": [
        "a chandler's watchmen",
        "a rival chandler who wants his competitor ruined"
       ],
       "fragForm": "Relic",
       "frag": "an everlasting candle, warm to the touch, with a fingernail in the wax"
      },
      {
       "attr": "Corpus",
       "site": "paupers' pit",
       "text": "recover the stolen dead",
       "encounters": [
        "tallow-renderers at work",
        "the pit's walls giving way"
       ],
       "fragForm": "Mark",
       "frag": "fresh cart tracks into the pit every night, and none out"
      },
      {
       "attr": "Spiritus",
       "site": "Chapel of the Flame",
       "text": "break the priest's blessing on the candles",
       "encounters": [
        "the faithful, who love their warm houses",
        "a salamander in the altar fire"
       ],
       "fragForm": "Witness",
       "frag": "a novice who cannot sleep for the smell"
      }
     ],
     "causeEncounter": "the ember priest (Tier I)",
     "causeFragForm": "Vision",
     "causeFrag": "every candle in the city flickers at once, and you see the Hearth-Mother breathing in",
     "omen": "a whole street of houses goes up in a single night",
     "success": "the candles gutter out, the city shivers, and the damp-lung recedes"
    },
    {
     "n": 3,
     "name": "The Bonfire Road",
     "where": "A high road across one Overland hex; sites: three beacon hills.",
     "trouble": "a chain of bonfires keeps the frost off the road for 8 km, and travellers go missing between them.",
     "cause": "Ember Court outposts on the beacons, guarded by a fire-drake.",
     "tasks": [
      {
       "attr": "Corpus",
       "site": "the first beacon",
       "text": "put out the fire and hold the hill",
       "encounters": [
        "hearth-wardens",
        "a rockslide of burning logs"
       ],
       "fragForm": "Witness",
       "frag": "a carter who saw riders carry prisoners to the second hill"
      },
      {
       "attr": "Anima",
       "site": "the second beacon",
       "text": "free the prisoners without raising the alarm",
       "encounters": [
        "sentries",
        "a prisoner who would rather stay warm"
       ],
       "fragForm": "Mark",
       "frag": "a trail of charred bootprints between the beacons"
      },
      {
       "attr": "Spiritus",
       "site": "the third beacon",
       "text": "read the beacon fire to learn where it sends its warmth",
       "encounters": [
        "a heat-haze that shows false paths",
        "an ember-wight"
       ],
       "fragForm": "Rumour",
       "frag": "a shepherd swears the fires burn hottest when the wind blows north"
      }
     ],
     "causeEncounter": "the fire-drake that guards the road",
     "causeFragForm": "Relic",
     "causeFrag": "a drake-scale brand marked with the Court's crown",
     "omen": "the beacons blaze up at once, and the snow on the hills melts in an hour",
     "success": "the beacons go dark, frost closes the road, and the missing are found"
    },
    {
     "n": 4,
     "name": "The Hot Springs of Saint Ura",
     "where": "A spa town; sites: the bathhouse, the cistern beneath, the abbess's house.",
     "trouble": "the springs grow hotter every week; the sick who bathe come out cured, then burn with fever for ever and spread it.",
     "cause": "a Flame Fiend in the cistern, bargained in by the abbess.",
     "tasks": [
      {
       "attr": "Anima",
       "site": "the abbess's house",
       "text": "get the abbess to confess",
       "encounters": [
        "her lay sisters",
        "a fevered pilgrim who thinks she is a saint"
       ],
       "fragForm": "Witness",
       "frag": "a bath-girl whose hands are scalded to the wrist"
      },
      {
       "attr": "Corpus",
       "site": "the bathhouse",
       "text": "carry the fevered out of the springs and keep them out",
       "encounters": [
        "the fevered themselves",
        "the floor cracking over the boiling water"
       ],
       "fragForm": "Mark",
       "frag": "the bath tiles show a burning crown under the steam"
      },
      {
       "attr": "Spiritus",
       "site": "the cistern",
       "text": "drive the Fiend out of the water",
       "encounters": [
        "scalding steam",
        "the Fiend's mud-born servants"
       ],
       "fragForm": "Rumour",
       "frag": "a monk says the abbess was dying last spring, and now never sleeps"
      }
     ],
     "causeEncounter": "the Flame Fiend",
     "causeFragForm": "Relic",
     "causeFrag": "the abbess's contract, signed in ash",
     "omen": "the springs geyser through the bathhouse roof",
     "success": "the springs cool to lukewarm, the fevers end, and the abbess dies at peace"
    },
    {
     "n": 5,
     "name": "The Smouldering Peat",
     "where": "A fen district of three hamlets.",
     "trouble": "the peat bogs burn underground, the ground collapses into smoking pits, and no frost will settle.",
     "cause": "hearth-wardens keep the peat burning to warm the fen, tended by a salamander queen.",
     "tasks": [
      {
       "attr": "Corpus",
       "site": "the north bog",
       "text": "cut a firebreak and flood it",
       "encounters": [
        "a smoke-pit giving way",
        "peat-cutters paid by the wardens"
       ],
       "fragForm": "Mark",
       "frag": "the burning runs in straight lines, as if dug"
      },
      {
       "attr": "Anima",
       "site": "the hamlets",
       "text": "rally the three hamlets to dig together",
       "encounters": [
        "a feud over the fen's boundaries",
        "a warden spreading fear of the cold"
       ],
       "fragForm": "Rumour",
       "frag": "the eel-catchers say the fen has not frozen since the strangers came"
      },
      {
       "attr": "Spiritus",
       "site": "the south bog",
       "text": "find the salamander queen's lair by its heat",
       "encounters": [
        "salamanders",
        "a will-o'-the-wisp leading you astray"
       ],
       "fragForm": "Vision",
       "frag": "you dream of a nest of coals under the water, breathing"
      }
     ],
     "causeEncounter": "the salamander queen (Tier I)",
     "causeFragForm": "Witness",
     "causeFrag": "a warden who tried to leave the Court, burned and hiding",
     "omen": "the main causeway falls into a burning pit, with a cart on it",
     "success": "the fires drown, and the fen freezes from edge to edge"
    },
    {
     "n": 6,
     "name": "The Kiln-Reeve's Decree",
     "where": "A valley district; sites: the reeve's hall, the kilns, the wood-lot.",
     "trouble": "by the reeve's decree, every house must keep its fire burning all year; those who let it die are put to work in the wood-lot.",
     "cause": "the reeve is a cambion of the Ember Court.",
     "tasks": [
      {
       "attr": "Anima",
       "site": "the reeve's hall",
       "text": "turn the valley's elders against the decree",
       "encounters": [
        "the reeve's men",
        "an elder who profits from the wood-lot"
       ],
       "fragForm": "Witness",
       "frag": "a widow who let her fire die and lost her sons to the wood-lot"
      },
      {
       "attr": "Corpus",
       "site": "the wood-lot",
       "text": "free the workers",
       "encounters": [
        "overseers",
        "a falling tree"
       ],
       "fragForm": "Mark",
       "frag": "every felled stump is burned with the reeve's sign"
      },
      {
       "attr": "Spiritus",
       "site": "the kilns",
       "text": "learn what the kilns are firing",
       "encounters": [
        "kiln-heat (Corpus save, Difficult 16, or 1 Fatigue)",
        "a Lesser Flame demon in the largest kiln"
       ],
       "fragForm": "Relic",
       "frag": "a clay hearthstone, fresh from the kiln, warm for ever"
      }
     ],
     "causeEncounter": "the cambion reeve (Tier I)",
     "causeFragForm": "Echo",
     "causeFrag": "a past life remembers the reeve's face, unchanged, a hundred years ago",
     "omen": "a family that let its fire die is marched through the village in chains",
     "success": "the decree is broken, the kilns cool, and the valley lets its fires die"
    }
   ],
   "Major": [
    {
     "n": 1,
     "name": "The Burning Vale",
     "where": "A valley region; sites: the orchards, the dam, the Ember Knights' citadel, the Weeping Tower.",
     "trouble": "the whole vale bakes in a late-summer haze in what should be midwinter; fruit rots on the bough and the river runs low.",
     "cause": "the Ember Knights hold the Winter's Daughter, a frost spirit, chained in fire in the Weeping Tower.",
     "tasks": [
      {
       "attr": "Corpus",
       "site": "the orchards",
       "text": "break the knights' foraging parties starving the vale",
       "encounters": [
        "Ember Knight outriders",
        "a burning orchard",
        "refugees who need escort"
       ],
       "fragForm": "Witness",
       "frag": "a refugee who saw a white girl carried past in chains of fire"
      },
      {
       "attr": "Anima",
       "site": "the dam",
       "text": "win the river-folk to open the dam and flood the knights' road",
       "encounters": [
        "a river-lord who wants payment",
        "the knights' engineers",
        "the dam itself straining"
       ],
       "fragForm": "Rumour",
       "frag": "bargemen say the tower weeps meltwater every night"
      },
      {
       "attr": "Spiritus",
       "site": "the citadel",
       "text": "unravel the wards on the citadel gate",
       "encounters": [
        "an ember priest",
        "a ward that burns the unworthy",
        "a Flame Fiend"
       ],
       "fragForm": "Mark",
       "frag": "frost patterns on the citadel stones that melt as you watch"
      },
      {
       "attr": "Corpus",
       "site": "the Weeping Tower",
       "text": "climb the tower and strike the chains",
       "encounters": [
        "the tower stair aflame",
        "Ember Knights",
        "the chains themselves (each blow, Corpus save, Challenging 19, or 1d6 fire)"
       ],
       "fragForm": "Vision",
       "frag": "the Winter's Daughter, calling for her sisters"
      }
     ],
     "causeEncounter": "the Knight-Commander of the vale (Tier II)",
     "causeFragForm": "Witness",
     "causeFrag": "the Winter's Daughter tells you the First Hearth burns on stolen winters",
     "thread": true,
     "reckoningTask": 1,
     "omen": "the river runs dry in a single afternoon",
     "success": "the Winter's Daughter flies north, and snow falls across the vale"
    },
    {
     "n": 2,
     "name": "The River of Embers",
     "where": "A river region from its source to the sea; sites: the fishing towns, the ferry, the gorge, the source.",
     "trouble": "the river steams; fish boil in the shallows and the river towns choke in fog.",
     "cause": "a young fire dragon sleeps at the river's source, fed hearthstones by the Court.",
     "tasks": [
      {
       "attr": "Anima",
       "site": "the fishing towns",
       "text": "keep the towns from riot as the fish die",
       "encounters": [
        "a mob at the granary",
        "a priest preaching that the fire is a blessing",
        "a smuggler selling clean water"
       ],
       "fragForm": "Rumour",
       "frag": "fishermen say the steam smells of a dragon's breath"
      },
      {
       "attr": "Corpus",
       "site": "the ferry",
       "text": "take the ferry upriver through boiling rapids",
       "encounters": [
        "the rapids",
        "river-raiders",
        "a scalding fog"
       ],
       "fragForm": "Mark",
       "frag": "dragon claws scored into the gorge walls"
      },
      {
       "attr": "Spiritus",
       "site": "the gorge",
       "text": "learn the dragon's name from the river's oldest spirit",
       "encounters": [
        "the river spirit, weak and bargaining",
        "an ember-wight swarm",
        "the gorge's falling scree"
       ],
       "fragForm": "Witness",
       "frag": "the river spirit, who knows what the dragon hoards"
      },
      {
       "attr": "Corpus",
       "site": "the source",
       "text": "steal the hearthstones from the hoard without waking the dragon",
       "encounters": [
        "the dragon's servants",
        "the heat of the lair (Corpus save, Challenging 19, or 1 Fatigue)",
        "a hoard trap"
       ],
       "fragForm": "Relic",
       "frag": "one hearthstone, carved with the Hearth-Mother's face"
      }
     ],
     "causeEncounter": "the fire dragon, woken or bargained with (Tier II)",
     "causeFragForm": "Relic",
     "causeFrag": "the hoard's oldest hearthstone was cut from the First Hearth itself",
     "thread": true,
     "reckoningTask": 2,
     "omen": "the river boils at noon and a fishing town is lost in the steam",
     "success": "the river runs cold, and ice rides it down to the sea"
    },
    {
     "n": 3,
     "name": "The Thousand Hearths of Coldmarch",
     "where": "A march region of many villages; sites: four village clusters.",
     "trouble": "every hearth in the march holds a Court hearthstone; the march is warm, wet and dying.",
     "cause": "the Hearth-Mother's Voice, a Greater Flame demon, hands out the stones as gifts.",
     "tasks": [
      {
       "attr": "Anima",
       "site": "the western villages",
       "text": "convince the villagers to give up their stones",
       "encounters": [
        "a village elder who remembers the hungry winters",
        "a hearth-warden",
        "a mother whose child would freeze"
       ],
       "fragForm": "Witness",
       "frag": "an old woman who refused her stone and is shunned for it"
      },
      {
       "attr": "Corpus",
       "site": "the high villages",
       "text": "gather the stones and carry them to the cold lake",
       "encounters": [
        "thieves who want the stones",
        "the weight of the stones (1 Fatigue per task)",
        "a winter storm that will not quite come"
       ],
       "fragForm": "Mark",
       "frag": "every stone bears the same burning crown"
      },
      {
       "attr": "Spiritus",
       "site": "the lake villages",
       "text": "sink the stones and quench them",
       "encounters": [
        "the lake boiling at the first stone",
        "a salamander swarm",
        "a Temptation offering one stone back for warmth"
       ],
       "fragForm": "Vision",
       "frag": "the Voice, laughing in every hearth at once"
      },
      {
       "attr": "Anima",
       "site": "the market town",
       "text": "turn the march against the Voice",
       "encounters": [
        "the Voice's servants",
        "a market riot",
        "a Witness who knows where the Voice sleeps"
       ],
       "fragForm": "Rumour",
       "frag": "the Voice is only ever seen on feast days"
      }
     ],
     "causeEncounter": "the Hearth-Mother's Voice (Tier II)",
     "causeFragForm": "Relic",
     "causeFrag": "the Voice's tongue, a coal that speaks the Hearth-Mother's words",
     "thread": true,
     "reckoningTask": 3,
     "omen": "every hearth in the march flares at once, and a hundred roofs catch fire",
     "success": "the march goes dark and cold, and in the spring it plants again"
    },
    {
     "n": 4,
     "name": "The Sunless Forge",
     "where": "A mountain region; sites: the mining town, the high pass, the giant's road, the forge.",
     "trouble": "the mountain snows melt in midwinter and the passes flood.",
     "cause": "a fire giant smith forges the Hearth-Mother's crown in the heart of the mountain.",
     "tasks": [
      {
       "attr": "Anima",
       "site": "the mining town",
       "text": "learn why the miners went into the mountain and never came out",
       "encounters": [
        "the mine-owners",
        "a miner's widow",
        "a clerk with a map"
       ],
       "fragForm": "Witness",
       "frag": "a miner who escaped, his hands burned black"
      },
      {
       "attr": "Corpus",
       "site": "the high pass",
       "text": "cross the flooding pass",
       "encounters": [
        "meltwater floods",
        "an avalanche of slush",
        "giant-kin scouts"
       ],
       "fragForm": "Mark",
       "frag": "giant footprints melted into the rock"
      },
      {
       "attr": "Corpus",
       "site": "the giant's road",
       "text": "free the captive miners at the slag heaps",
       "encounters": [
        "the giant's overseers",
        "burning slag",
        "miners too broken to run"
       ],
       "fragForm": "Rumour",
       "frag": "the miners say the giant sings of a crown"
      },
      {
       "attr": "Spiritus",
       "site": "the forge",
       "text": "unmake the half-forged crown",
       "encounters": [
        "the forge's heat",
        "a bound fire elemental",
        "the crown's own will"
       ],
       "fragForm": "Relic",
       "frag": "a shard of the crown, still glowing"
      }
     ],
     "causeEncounter": "the fire giant smith (Tier II)",
     "causeFragForm": "Relic",
     "causeFrag": "the crown is meant to let the Hearth-Mother walk out of her fire",
     "thread": true,
     "reckoningTask": 4,
     "omen": "the mountain's peak goes bare of snow overnight",
     "success": "the forge goes cold and the mountain takes back its snow"
    },
    {
     "n": 5,
     "name": "The Pilgrim Fires",
     "where": "A pilgrimage route across a region; sites: four shrines.",
     "trouble": "a crowd of pilgrims carries Court fire from shrine to shrine, and every place they pass stays warm and rots.",
     "cause": "the Cinder Abbess, an Ember Court champion who leads the pilgrimage.",
     "tasks": [
      {
       "attr": "Anima",
       "site": "the first shrine",
       "text": "turn the pilgrims back",
       "encounters": [
        "zealots",
        "a sick pilgrim begging for the fire's warmth",
        "the abbess's preachers"
       ],
       "fragForm": "Rumour",
       "frag": "the pilgrims have walked for a year and none has died"
      },
      {
       "attr": "Spiritus",
       "site": "the second shrine",
       "text": "put out the fire they carry",
       "encounters": [
        "the fire's guardians",
        "the fire itself, which will not die",
        "a Temptation to carry it yourself"
       ],
       "fragForm": "Mark",
       "frag": "the road behind the pilgrims is warm under the snow"
      },
      {
       "attr": "Corpus",
       "site": "the third shrine",
       "text": "hold the bridge so the pilgrims cannot pass",
       "encounters": [
        "Ember Knights",
        "the bridge burning",
        "the crowd pressing"
       ],
       "fragForm": "Witness",
       "frag": "a deserter from the pilgrimage"
      },
      {
       "attr": "Spiritus",
       "site": "the fourth shrine",
       "text": "consecrate the last shrine to winter",
       "encounters": [
        "the shrine's warden",
        "a winter spirit too weak to answer",
        "the abbess's shadow"
       ],
       "fragForm": "Vision",
       "frag": "you see where the road ends: a hall of fire inside a mountain"
      }
     ],
     "causeEncounter": "the Cinder Abbess (Tier II)",
     "causeFragForm": "Witness",
     "causeFrag": "the abbess's last confession: the road leads to the First Hearth",
     "thread": true,
     "reckoningTask": 5,
     "omen": "the pilgrims arrive at a town and the snow melts in the street",
     "success": "the pilgrimage ends, and the road freezes behind you"
    },
    {
     "n": 6,
     "name": "The Last Frost-Wardens",
     "where": "A northern region; sites: three burned shrines and the last one standing.",
     "trouble": "the old priesthood of winter has been murdered shrine by shrine; only one warden is left.",
     "cause": "Ember Knights led by the Ashen Hound, a Flame Fiend in the shape of a great dog.",
     "tasks": [
      {
       "attr": "Spiritus",
       "site": "the first burned shrine",
       "text": "speak with the murdered wardens",
       "encounters": [
        "their restless dead",
        "scavengers",
        "the hound's scent-trail"
       ],
       "fragForm": "Echo",
       "frag": "you remember being a frost-warden once"
      },
      {
       "attr": "Corpus",
       "site": "the second shrine",
       "text": "recover the wardens' relic",
       "encounters": [
        "knights guarding the ruin",
        "the ruin collapsing",
        "a pack of hellhounds"
       ],
       "fragForm": "Relic",
       "frag": "an ice-crystal reliquary, cracked but cold"
      },
      {
       "attr": "Anima",
       "site": "the third shrine",
       "text": "find the last warden's hiding place",
       "encounters": [
        "a traitor among the villagers",
        "a false trail",
        "a Witness who will only speak in the cold"
       ],
       "fragForm": "Witness",
       "frag": "a child who carries the warden's food"
      },
      {
       "attr": "Corpus",
       "site": "the last shrine",
       "text": "defend the last warden through the night",
       "encounters": [
        "Ember Knights in waves",
        "the shrine set alight",
        "the Ashen Hound's first assault"
       ],
       "fragForm": "Mark",
       "frag": "the hound's burning tracks around the shrine"
      }
     ],
     "causeEncounter": "the Ashen Hound (Tier II)",
     "causeFragForm": "Witness",
     "causeFrag": "the last warden teaches you the rite that calls winter down",
     "thread": true,
     "reckoningTask": 6,
     "omen": "the last shrine's bell rings by itself at midnight",
     "success": "the last frost-warden lives, and the old rites return to the north"
    }
   ]
  },
  "reckoning": {
   "name": "The First Hearth",
   "heart": "a Vision of a hall of living fire under the world's coldest mountain, where the Hearth-Mother sits on a throne of stolen winters. The Thread from each Major Ordeal you completed reveals its matching task.",
   "tasks": [
    {
     "from": 1,
     "attr": "Spiritus",
     "text": "call the Winter's Daughter and her sisters to blow through the hall"
    },
    {
     "from": 2,
     "attr": "Corpus",
     "text": "carry the First Hearthstone out of the hall and drop it in the frozen lake"
    },
    {
     "from": 3,
     "attr": "Anima",
     "text": "speak the Hearth-Mother's own words back to her servants and turn them"
    },
    {
     "from": 4,
     "attr": "Corpus",
     "text": "shatter the finished crown before she can wear it"
    },
    {
     "from": 5,
     "attr": "Anima",
     "text": "lead the last pilgrims out of the hall alive"
    },
    {
     "from": 6,
     "attr": "Spiritus",
     "text": "perform the frost-wardens' rite at the hall's heart"
    }
   ],
   "adversary": "the Hearth-Mother (Tier III)",
   "success": "the First Hearth goes out. Winter falls across the whole world for a year and a day, and then the thaw comes"
  }
 },
 {
  "n": 2,
  "name": "The Chained Gate",
  "premise": "No one has truly died in a generation. The dead linger in their houses and churchyards, and because no soul passes on, none returns: cradles stay empty and the living grow thin under the weight of their ghosts. The Ossuary Lords have chained the Gate of Ending, hoarding the dead because every soul they hold buys them another year. The characters must free the dead and open the Gate, so the wheel can turn again.",
  "adversary": "Bone-merchants, crooked sextons and the restless dead (Might 0). Lieutenants: necromancers, wights, ghoul brokers and revenant priests (up to Tier I). Champions: barrow-kings, death knights and the Lady of Bones (up to Tier II). The Lych of the Gate (Tier III).",
  "signature": [
   "A funeral that cannot end: the corpse sits up and asks to go home.",
   "A bone-tithe collector with an iron cart.",
   "A ghost that has forgotten its own name.",
   "A mother of a stillborn child, begging you to find its soul.",
   "Ravens that follow you and will not settle.",
   "A grave-knight in black iron, riding for the Ossuary Lords."
  ],
  "doomEffect": "Your own dead walk beside you: Moderate Disadvantage on Spiritus checks for the rest of the session.",
  "lie": "A lone necromancer is blamed for the restless dead, though she is the one trying to lay them.",
  "heldBy": "The dead, who cannot pass on",
  "must": "Free the dead and open the Gate of Ending",
  "adversaryName": "The Ossuary Lords and the Lych of the Gate",
  "tiers": {
   "Minor": [
    {
     "n": 1,
     "name": "The Unquiet Lychgate",
     "where": "A hamlet churchyard.",
     "trouble": "every night the buried dead climb out and walk home.",
     "cause": "the sexton sold the dead's names to a bone-merchant, who nailed them to their coffins on iron tags.",
     "tasks": [
      {
       "attr": "Spiritus",
       "site": "",
       "text": "lay the walking dead back in their graves",
       "encounters": [
        "1d6 restless dead (use Skeleton)"
       ],
       "fragForm": "Witness",
       "frag": "a widow whose husband comes to the door each night and knocks"
      },
      {
       "attr": "Anima",
       "site": "",
       "text": "find who bought the names, from the sexton's books",
       "encounters": [
        "the sexton, who will lie until shown a tag"
       ],
       "fragForm": "Mark",
       "frag": "an iron tag nailed to each coffin lid, stamped with a name and a price"
      }
     ],
     "causeFragForm": "Relic",
     "causeFrag": "the bone-merchant's receipt, signed with an Ossuary seal of a skull in a keyhole",
     "omen": "the oldest grave in the churchyard opens at noon",
     "success": "the tags are pulled, the dead lie still, and the first passing-bell in years is rung"
    },
    {
     "n": 2,
     "name": "The Empty Cradles",
     "where": "A farming hamlet.",
     "trouble": "no child has been born alive here in a year.",
     "cause": "the Ossuary Lords chained the ghost of the old midwife in the birthing house; she turns the new souls away.",
     "tasks": [
      {
       "attr": "Anima",
       "site": "",
       "text": "learn the midwife's story from the hamlet's women",
       "encounters": [
        "Witness: a grandmother who blames herself"
       ],
       "fragForm": "Rumour",
       "frag": "the hamlet's last midwife died the night the strangers came"
      },
      {
       "attr": "Spiritus",
       "site": "",
       "text": "free the midwife's ghost from her chain",
       "encounters": [
        "the ghost herself, mad with grief"
       ],
       "fragForm": "Vision",
       "frag": "a woman in a bloodied apron rocks an empty cradle, chained at the ankle"
      }
     ],
     "causeFragForm": "Echo",
     "causeFrag": "you remember being born in that house, in another life",
     "omen": "a cradle in every house rocks by itself at midnight",
     "success": "within the month, a child is born crying"
    },
    {
     "n": 3,
     "name": "The Ferryman's Refusal",
     "where": "A river crossing.",
     "trouble": "the ferryman will not carry coffins to the burial isle, and the dead pile up on the bank.",
     "cause": "the isle's crypt is sealed by an Ossuary sigil, and what crosses never rests.",
     "tasks": [
      {
       "attr": "Corpus",
       "site": "",
       "text": "row the coffins across through the river mist",
       "encounters": [
        "Hazard: the mist hides rocks and hands (Corpus save, Average 13, or overboard)"
       ],
       "fragForm": "Witness",
       "frag": "the ferryman, who saw his own father climb out of the crypt"
      },
      {
       "attr": "Spiritus",
       "site": "",
       "text": "break the sigil on the crypt door",
       "encounters": [
        "the crypt's restless dead"
       ],
       "fragForm": "Mark",
       "frag": "a skull in a keyhole, burned into the crypt door"
      }
     ],
     "causeFragForm": "Relic",
     "causeFrag": "a lord's signet ring left in the crypt, as a sign of ownership",
     "omen": "the river runs grey with ash, and the coffins on the bank open",
     "success": "the dead are buried on the isle and stay there"
    },
    {
     "n": 4,
     "name": "The Bone Mill of Harrick",
     "where": "A holdfast.",
     "trouble": "the holdfast's bread makes those who eat it stop dreaming, then stop caring.",
     "cause": "the lord grinds the dead's bones into his flour for the Ossuary Lords, so their souls cannot pass.",
     "tasks": [
      {
       "attr": "Anima",
       "site": "",
       "text": "turn the millers against the lord",
       "encounters": [
        "the miller's foreman, who is paid in silver"
       ],
       "fragForm": "Rumour",
       "frag": "carters say the holdfast buys bodies from three counties"
      },
      {
       "attr": "Corpus",
       "site": "",
       "text": "break the great millstone",
       "encounters": [
        "the lord's men-at-arms"
       ],
       "fragForm": "Relic",
       "frag": "a loaf of the bread, with a fleck of white in the crust"
      }
     ],
     "causeFragForm": "Witness",
     "causeFrag": "the lord's steward, who brings the carts at night",
     "omen": "the whole holdfast sleeps through a day, and a child does not wake",
     "success": "the mill is broken, the bones are buried, and the holdfast dreams again"
    },
    {
     "n": 5,
     "name": "The Ghost Fair of Pellow",
     "where": "A market village.",
     "trouble": "every night the village's dead hold a market, and the living who trade with them grow pale and weak.",
     "cause": "a ghoul broker sells the dead false passage and takes the living's warmth in payment.",
     "tasks": [
      {
       "attr": "Anima",
       "site": "",
       "text": "expose the broker's swindle to the dead",
       "encounters": [
        "Temptation: the broker offers you a dead loved one's voice"
       ],
       "fragForm": "Witness",
       "frag": "a ghost who paid three times and never left"
      },
      {
       "attr": "Corpus",
       "site": "",
       "text": "drive the ghouls out of the market",
       "encounters": [
        "1d3 ghouls"
       ],
       "fragForm": "Mark",
       "frag": "ghoul claw-marks on the market cross"
      }
     ],
     "causeFragForm": "Relic",
     "causeFrag": "a purse of grave-coin stamped with the Ossuary seal",
     "omen": "a living child is sold at the ghost fair",
     "success": "the fair ends, and the dead walk out of Pellow together at dawn"
    },
    {
     "n": 6,
     "name": "The Silent Bell",
     "where": "A hilltop shrine.",
     "trouble": "the passing-bell has been stolen, and without its toll the dead do not know they are dead.",
     "cause": "an Ossuary agent paid barrow-robbers to take it to a wight's barrow.",
     "tasks": [
      {
       "attr": "Anima",
       "site": "",
       "text": "track the bell thieves",
       "encounters": [
        "the thieves' fence, who wants a cut"
       ],
       "fragForm": "Rumour",
       "frag": "a pedlar heard bells ringing under a hill"
      },
      {
       "attr": "Corpus",
       "site": "",
       "text": "take the bell back from the barrow",
       "encounters": [
        "a wight and its dead"
       ],
       "fragForm": "Mark",
       "frag": "bell-rope fibres snagged on the barrow's stones"
      }
     ],
     "causeFragForm": "Witness",
     "causeFrag": "a thief who confesses who paid him",
     "omen": "the shrine's priest dies and walks back up the hill to ring a bell that is not there",
     "success": "the bell tolls, and every ghost on the hill lies down"
    }
   ],
   "Moderate": [
    {
     "n": 1,
     "name": "The Ossuary of Saint Mael",
     "where": "A cathedral city; sites: the cathedral, the catacombs, the bishop's palace.",
     "trouble": "the city's dead are no longer buried but stacked in the catacombs, and the city is haunted street by street.",
     "cause": "the bishop serves an Ossuary Lord, and a revenant priest keeps the catacombs.",
     "tasks": [
      {
       "attr": "Anima",
       "site": "the bishop's palace",
       "text": "prove the bishop's betrayal to the chapter",
       "encounters": [
        "the bishop's guard",
        "a canon who wants the bishop's seat"
       ],
       "fragForm": "Witness",
       "frag": "a deacon who counted the dead in and never saw them out"
      },
      {
       "attr": "Corpus",
       "site": "the catacombs",
       "text": "carry the stacked dead to holy ground",
       "encounters": [
        "the stacks collapsing",
        "the restless dead"
       ],
       "fragForm": "Mark",
       "frag": "every skull in the catacombs is chalked with a tally"
      },
      {
       "attr": "Spiritus",
       "site": "the cathedral",
       "text": "reconsecrate the high altar",
       "encounters": [
        "a wight in the choir",
        "a Temptation to keep one soul for yourself"
       ],
       "fragForm": "Rumour",
       "frag": "the city's ghosts all walk towards the cathedral at night"
      }
     ],
     "causeEncounter": "the revenant priest (Tier I)",
     "causeFragForm": "Relic",
     "causeFrag": "the tally-book of souls, with the Ossuary seal on every page",
     "omen": "the cathedral bells ring a funeral peal for the whole city",
     "success": "the dead are buried and the ghosts fade, street by street"
    },
    {
     "n": 2,
     "name": "The Plague Pits of Harrowgate",
     "where": "A town; sites: the pits, the lazar house, the tower.",
     "trouble": "the plague dead rise from the pits each night.",
     "cause": "a necromancer collects them for the Ossuary Lords.",
     "tasks": [
      {
       "attr": "Corpus",
       "site": "the pits",
       "text": "burn the pits clean",
       "encounters": [
        "the risen dead",
        "a fire that spreads"
       ],
       "fragForm": "Mark",
       "frag": "tracks from the pits lead towards the tower"
      },
      {
       "attr": "Anima",
       "site": "the lazar house",
       "text": "keep the sick from fleeing and spreading the plague",
       "encounters": [
        "a panic",
        "a physician selling false cures"
       ],
       "fragForm": "Witness",
       "frag": "a nun who saw cloaked men take bodies"
      },
      {
       "attr": "Spiritus",
       "site": "the tower",
       "text": "break the necromancer's wards",
       "encounters": [
        "bound ghosts",
        "a ward of bone"
       ],
       "fragForm": "Vision",
       "frag": "a tower full of empty eyes, all watching you"
      }
     ],
     "causeEncounter": "the necromancer (Tier I)",
     "causeFragForm": "Relic",
     "causeFrag": "a letter of commission from the Lady of Bones",
     "omen": "a whole street of the plague dead walks into the market square",
     "success": "the pits burn clean, and the plague breaks within a week"
    },
    {
     "n": 3,
     "name": "The Charnel Road",
     "where": "A road between two towns; sites: the gibbets, the assize town, the judge's manor.",
     "trouble": "the hanged men on the gibbets cannot die; they twist and beg for weeks.",
     "cause": "a hanging-judge in the Ossuary Lords' pay, with a death knight as his executioner.",
     "tasks": [
      {
       "attr": "Corpus",
       "site": "the gibbets",
       "text": "cut down the hanged",
       "encounters": [
        "the judge's bailiffs",
        "the hanged themselves, in their agony"
       ],
       "fragForm": "Witness",
       "frag": "a hanged man who can still talk"
      },
      {
       "attr": "Anima",
       "site": "the assize town",
       "text": "overturn the judge's sentences",
       "encounters": [
        "the court",
        "a juror who has been paid"
       ],
       "fragForm": "Rumour",
       "frag": "the judge has hanged three hundred and acquitted none"
      },
      {
       "attr": "Spiritus",
       "site": "the judge's manor",
       "text": "find what the judge does with the souls",
       "encounters": [
        "the manor's wards",
        "a ghost in the cellar"
       ],
       "fragForm": "Mark",
       "frag": "soul-jars in the cellar, each labelled with a sentence"
      }
     ],
     "causeEncounter": "the death knight executioner (Tier I)",
     "causeFragForm": "Relic",
     "causeFrag": "the judge's black cap, sewn with a skull in a keyhole",
     "omen": "a hanged man walks into the assize court during a trial",
     "success": "the hanged are freed to die, and the road is clear"
    },
    {
     "n": 4,
     "name": "The Drowned Village",
     "where": "A lake district; sites: the drowned village, the lord's dam, the lakeshore hamlets.",
     "trouble": "the dead of a drowned village pull swimmers and fishermen under.",
     "cause": "a lord's dam drowned the village, and a bound undine keeps their bodies from the sea.",
     "tasks": [
      {
       "attr": "Corpus",
       "site": "the drowned village",
       "text": "dive to the village and bring up its church bell",
       "encounters": [
        "the drowned dead",
        "the cold (Corpus save, Difficult 16, or 1 Fatigue)"
       ],
       "fragForm": "Relic",
       "frag": "a drowned church bell, still ringing underwater"
      },
      {
       "attr": "Anima",
       "site": "the lakeshore hamlets",
       "text": "learn the drowned names from the living",
       "encounters": [
        "hamlets that blame each other",
        "a survivor who has never spoken of it"
       ],
       "fragForm": "Witness",
       "frag": "a man who escaped the flood as a boy"
      },
      {
       "attr": "Spiritus",
       "site": "the lord's dam",
       "text": "free the undine",
       "encounters": [
        "the lord's men",
        "the undine itself, bound and bitter"
       ],
       "fragForm": "Mark",
       "frag": "Ossuary sigils carved into the dam's stones below the waterline"
      }
     ],
     "causeEncounter": "the undine, freed or fought (Tier I)",
     "causeFragForm": "Vision",
     "causeFrag": "the drowned walk out to sea along the lakebed",
     "omen": "the lake rises overnight and drowns a second hamlet's fields",
     "success": "the dam is opened, the drowned go down the river to the sea, and the lake is safe"
    },
    {
     "n": 5,
     "name": "The Battlefield of Grey Meadow",
     "where": "A district battlefield; sites: the meadow, the camp of the dead, the mound.",
     "trouble": "an old battle is fought again every night by its dead, and the living who wander in are pressed into the ranks.",
     "cause": "an Ossuary banner staked in the burial mound, held by a wight captain.",
     "tasks": [
      {
       "attr": "Corpus",
       "site": "the meadow",
       "text": "survive a night in the battle and find the banner",
       "encounters": [
        "the dead ranks",
        "a cavalry charge of the dead"
       ],
       "fragForm": "Mark",
       "frag": "the banner's black field and keyhole skull, seen at the height of the fighting"
      },
      {
       "attr": "Anima",
       "site": "the camp of the dead",
       "text": "parley with the dead captains and make a truce",
       "encounters": [
        "a proud dead lord",
        "a traitor who betrayed them"
       ],
       "fragForm": "Witness",
       "frag": "a dead drummer boy who knows why they fight"
      },
      {
       "attr": "Spiritus",
       "site": "the mound",
       "text": "pull the banner from the mound",
       "encounters": [
        "the mound's wards",
        "the dead rising to defend it"
       ],
       "fragForm": "Rumour",
       "frag": "shepherds say the battle grew larger when the strangers came"
      }
     ],
     "causeEncounter": "the wight captain (Tier I)",
     "causeFragForm": "Relic",
     "causeFrag": "the banner itself, its pole of human bone",
     "omen": "the dead march out of the meadow at dusk towards the nearest town",
     "success": "the battle ends, and the dead lay down their arms"
    },
    {
     "n": 6,
     "name": "The Embalmers of Saltmarsh",
     "where": "A district of embalming houses; sites: the salt pans, the embalmers' hall, the patrons' houses.",
     "trouble": "the rich are embalmed alive and go on talking and ruling as speaking corpses.",
     "cause": "an embalmers' guild under a lych's apprentice.",
     "tasks": [
      {
       "attr": "Corpus",
       "site": "the salt pans",
       "text": "wreck the salt works that supply the embalmers",
       "encounters": [
        "guild guards",
        "a salt-pan collapse"
       ],
       "fragForm": "Relic",
       "frag": "a jar of embalming salt that whispers"
      },
      {
       "attr": "Anima",
       "site": "the patrons' houses",
       "text": "convince the families to let their corpses go",
       "encounters": [
        "heirs who profit",
        "a corpse that pleads to stay"
       ],
       "fragForm": "Witness",
       "frag": "a servant who washes the corpses"
      },
      {
       "attr": "Spiritus",
       "site": "the embalmers' hall",
       "text": "break the binding rites",
       "encounters": [
        "embalmed guards",
        "a Temptation of a long life embalmed"
       ],
       "fragForm": "Mark",
       "frag": "the guild's sign, a skull in a keyhole in a salt crust"
      }
     ],
     "causeEncounter": "the lych's apprentice (Tier I)",
     "causeFragForm": "Echo",
     "causeFrag": "a past life remembers being embalmed, and the voice that did it",
     "omen": "a dead councillor casts the deciding vote in the town council",
     "success": "the corpses fall silent and are buried, and the living rule Saltmarsh again"
    }
   ],
   "Major": [
    {
     "n": 1,
     "name": "The Hollow Kingdom",
     "where": "A region of old royal barrows; sites: the barrow fields, the capital, the royal chapel, the king's mound.",
     "trouble": "the old kings ride out of their barrows and claim the land.",
     "cause": "the Ossuary Lords woke the Barrow-King to guard the first chain of the Gate.",
     "tasks": [
      {
       "attr": "Corpus",
       "site": "the barrow fields",
       "text": "hold the villages against the barrow riders",
       "encounters": [
        "barrow riders",
        "a burning village",
        "refugees"
       ],
       "fragForm": "Witness",
       "frag": "a rider who still remembers his name"
      },
      {
       "attr": "Anima",
       "site": "the capital",
       "text": "unite the living lords against the dead",
       "encounters": [
        "a lord who would bargain with the dead",
        "a royal pretender",
        "an assassin"
       ],
       "fragForm": "Rumour",
       "frag": "the Barrow-King swore to rule until the Gate opens"
      },
      {
       "attr": "Spiritus",
       "site": "the royal chapel",
       "text": "restore the burial rites of the old kings",
       "encounters": [
        "the chapel's ghosts",
        "a Temptation of a crown",
        "a wight guard"
       ],
       "fragForm": "Relic",
       "frag": "the old kings' funeral rites, on a lead scroll"
      },
      {
       "attr": "Corpus",
       "site": "the king's mound",
       "text": "break into the Barrow-King's mound",
       "encounters": [
        "traps",
        "the mound's dead",
        "the cold of the grave"
       ],
       "fragForm": "Mark",
       "frag": "a chain-link carved over the mound's door"
      }
     ],
     "causeEncounter": "the Barrow-King (Tier II)",
     "causeFragForm": "Relic",
     "causeFrag": "the first chain of the Gate, forged from the Barrow-King's crown",
     "thread": true,
     "reckoningTask": 1,
     "omen": "every barrow in the region opens on the same night",
     "success": "the old kings return to their mounds and sleep"
    },
    {
     "n": 2,
     "name": "The Ossuary Lords' March",
     "where": "A region of four ossuary manors.",
     "trouble": "the march's dead are bought, stored and counted in four great ossuaries.",
     "cause": "the Lady of Bones, the Lords' chief collector.",
     "tasks": [
      {
       "attr": "Anima",
       "site": "the first manor",
       "text": "bring the Lords' tenants into open revolt",
       "encounters": [
        "bailiffs",
        "a tenant who informs",
        "a Temptation of land"
       ],
       "fragForm": "Witness",
       "frag": "a tenant who sold his own father's bones"
      },
      {
       "attr": "Corpus",
       "site": "the second manor",
       "text": "empty its ossuary",
       "encounters": [
        "bone-guardians",
        "collapsing stacks",
        "the dead"
       ],
       "fragForm": "Mark",
       "frag": "the ossuary's count, chalked on the walls in thousands"
      },
      {
       "attr": "Spiritus",
       "site": "the third manor",
       "text": "read where the souls are sent",
       "encounters": [
        "ghostly clerks",
        "wards",
        "a necromancer"
       ],
       "fragForm": "Relic",
       "frag": "a soul-ledger listing the Gate as the destination"
      },
      {
       "attr": "Corpus",
       "site": "the fourth manor",
       "text": "storm the Lady's own manor",
       "encounters": [
        "her guard",
        "her ghouls",
        "the manor's traps"
       ],
       "fragForm": "Rumour",
       "frag": "the Lady has not left her manor in a hundred years"
      }
     ],
     "causeEncounter": "the Lady of Bones (Tier II)",
     "causeFragForm": "Relic",
     "causeFrag": "the Lady's key, which unlocks one lock on the Gate",
     "thread": true,
     "reckoningTask": 2,
     "omen": "every ossuary in the march opens and the bones walk out",
     "success": "the march's dead are buried, and the tenants own their land"
    },
    {
     "n": 3,
     "name": "The Grey Pilgrimage",
     "where": "A region crossed by a road of ghosts; sites: the ghost road, the bridge, the wall, the gatehouse.",
     "trouble": "thousands of ghosts walk the road towards the Gate and pile up at a wall, crushing the living in their path.",
     "cause": "the Warden of the Wall, a death knight, holds the road shut.",
     "tasks": [
      {
       "attr": "Anima",
       "site": "the ghost road",
       "text": "guide the ghosts away from the villages",
       "encounters": [
        "angry ghosts",
        "a ghost who is your own past life",
        "frightened villagers"
       ],
       "fragForm": "Echo",
       "frag": "you remember walking this road"
      },
      {
       "attr": "Corpus",
       "site": "the bridge",
       "text": "hold the bridge against the Warden's patrols",
       "encounters": [
        "grave-knights",
        "a river of the dead",
        "a collapse"
       ],
       "fragForm": "Witness",
       "frag": "a ghost who reached the wall and was turned back"
      },
      {
       "attr": "Spiritus",
       "site": "the wall",
       "text": "breach the wall's wards",
       "encounters": [
        "the ward",
        "bone golems",
        "a Temptation to enter the wall's crypt"
       ],
       "fragForm": "Mark",
       "frag": "the wall's stones are gravestones, set on end"
      },
      {
       "attr": "Corpus",
       "site": "the gatehouse",
       "text": "take the gatehouse",
       "encounters": [
        "the Warden's guard",
        "the gatehouse's traps",
        "the crushing press of ghosts"
       ],
       "fragForm": "Vision",
       "frag": "the Gate beyond the wall, chained shut"
      }
     ],
     "causeEncounter": "the Warden of the Wall (Tier II)",
     "causeFragForm": "Witness",
     "causeFrag": "the Warden, dying, names the road's end",
     "thread": true,
     "reckoningTask": 3,
     "omen": "the ghosts break through a village and take its people with them",
     "success": "the wall falls, and the ghosts walk on in peace"
    },
    {
     "n": 4,
     "name": "The Sunken Necropolis",
     "where": "A fen region over a drowned city of the dead; sites: the fen villages, the causeway, the necropolis, the abbey.",
     "trouble": "the fen's dead walk up out of the water.",
     "cause": "the Drowned Abbot, a vampire, rules the necropolis and feeds on its souls.",
     "tasks": [
      {
       "attr": "Anima",
       "site": "the fen villages",
       "text": "win the fen-folk's trust and guides",
       "encounters": [
        "superstitious villagers",
        "a guide who is the Abbot's spy",
        "a fen ghost"
       ],
       "fragForm": "Rumour",
       "frag": "the Abbot's bells ring under the water"
      },
      {
       "attr": "Corpus",
       "site": "the causeway",
       "text": "cross the drowned causeway",
       "encounters": [
        "the drowned",
        "the rising tide",
        "fen beasts"
       ],
       "fragForm": "Mark",
       "frag": "the causeway stones bear grave-markers"
      },
      {
       "attr": "Spiritus",
       "site": "the necropolis",
       "text": "free the bound dead of the necropolis",
       "encounters": [
        "the necropolis's wights",
        "a ward",
        "the Abbot's servants"
       ],
       "fragForm": "Witness",
       "frag": "a ghost-monk who betrayed the Abbot"
      },
      {
       "attr": "Corpus",
       "site": "the abbey",
       "text": "break into the Abbot's crypt by day",
       "encounters": [
        "the crypt's traps",
        "his thralls",
        "the water rising"
       ],
       "fragForm": "Relic",
       "frag": "the Abbot's ring"
      }
     ],
     "causeEncounter": "the Drowned Abbot (Tier II)",
     "causeFragForm": "Relic",
     "causeFrag": "the Abbot's psalter, which holds the Gate's litany",
     "thread": true,
     "reckoningTask": 4,
     "omen": "the drowned dead walk into the fen villages at noon",
     "success": "the necropolis sinks for good, and its dead go free"
    },
    {
     "n": 5,
     "name": "The Soul-Mint",
     "where": "A region with a mint town at its heart; sites: the mint town, the silver mines, the counting house, the mint.",
     "trouble": "the region trades in grave-coin minted from souls; whoever holds the coins owns the dead.",
     "cause": "the Mintmaster, a Greater demon in the Lords' service.",
     "tasks": [
      {
       "attr": "Anima",
       "site": "the mint town",
       "text": "crash the market in grave-coin",
       "encounters": [
        "merchants",
        "a coin-cutter",
        "the Mintmaster's agents"
       ],
       "fragForm": "Relic",
       "frag": "a grave-coin that weeps when held"
      },
      {
       "attr": "Corpus",
       "site": "the silver mines",
       "text": "free the miners digging the soul-silver",
       "encounters": [
        "overseers",
        "a collapse",
        "the dead miners"
       ],
       "fragForm": "Witness",
       "frag": "a miner who heard voices in the silver"
      },
      {
       "attr": "Anima",
       "site": "the counting house",
       "text": "steal the ledger of souls",
       "encounters": [
        "guards",
        "clerks",
        "a lock"
       ],
       "fragForm": "Mark",
       "frag": "every ledger page is sealed with a skull in a keyhole"
      },
      {
       "attr": "Spiritus",
       "site": "the mint",
       "text": "melt the soul-silver and free the souls",
       "encounters": [
        "the furnace",
        "bound souls",
        "demons"
       ],
       "fragForm": "Vision",
       "frag": "a mountain of coins, every one a face"
      }
     ],
     "causeEncounter": "the Mintmaster (Tier II)",
     "causeFragForm": "Relic",
     "causeFrag": "the mint's master die, which stamps the Gate's lock",
     "thread": true,
     "reckoningTask": 5,
     "omen": "a city buys an army of the dead with grave-coin",
     "success": "the coins melt, the souls go free, and the dead are no one's property"
    },
    {
     "n": 6,
     "name": "The Rookery of the Psychopomps",
     "where": "A region of high crags; sites: the crags, the hunters' camp, the rookery, the eyrie.",
     "trouble": "the death-birds that guide souls to the Gate are hunted, and souls wander lost.",
     "cause": "the Huntsman, an Ossuary champion who collects their feathers.",
     "tasks": [
      {
       "attr": "Corpus",
       "site": "the crags",
       "text": "climb to the rookery",
       "encounters": [
        "the crags",
        "the Huntsman's traps",
        "storms"
       ],
       "fragForm": "Mark",
       "frag": "ravens nailed to the crags"
      },
      {
       "attr": "Anima",
       "site": "the hunters' camp",
       "text": "turn the hunters",
       "encounters": [
        "hunters",
        "a hunter's family",
        "a Temptation of feathers"
       ],
       "fragForm": "Witness",
       "frag": "a hunter who saw a raven speak"
      },
      {
       "attr": "Spiritus",
       "site": "the rookery",
       "text": "speak with the last of the psychopomps",
       "encounters": [
        "frightened birds",
        "lost souls",
        "the Huntsman's hounds"
       ],
       "fragForm": "Vision",
       "frag": "a raven shows you the road to the Gate"
      },
      {
       "attr": "Corpus",
       "site": "the eyrie",
       "text": "defend the last nest",
       "encounters": [
        "the Huntsman's men",
        "the Huntsman's hounds",
        "the storm"
       ],
       "fragForm": "Relic",
       "frag": "a black feather that points to the Gate"
      }
     ],
     "causeEncounter": "the Huntsman (Tier II)",
     "causeFragForm": "Witness",
     "causeFrag": "the last raven agrees to guide the dead through",
     "thread": true,
     "reckoningTask": 6,
     "omen": "the sky over the region is empty of birds for a day",
     "success": "the ravens fly again, and lost souls find their way"
    }
   ]
  },
  "reckoning": {
   "name": "The Gate of Ending",
   "heart": "a Vision of a vast iron gate in a valley of bones, chained shut with six chains, and the Lych of the Gate on its throne before it.",
   "tasks": [
    {
     "from": 1,
     "attr": "Corpus",
     "text": "break the first chain, forged from the Barrow-King's crown"
    },
    {
     "from": 2,
     "attr": "Anima",
     "text": "turn the Lady's key in its lock without the Lych hearing"
    },
    {
     "from": 3,
     "attr": "Spiritus",
     "text": "lead the grey pilgrims through the valley of bones"
    },
    {
     "from": 4,
     "attr": "Spiritus",
     "text": "sing the Gate's litany backwards to loosen its hinges"
    },
    {
     "from": 5,
     "attr": "Anima",
     "text": "break the lock stamped by the master die"
    },
    {
     "from": 6,
     "attr": "Corpus",
     "text": "hold the ground while the ravens carry the dead through"
    }
   ],
   "adversary": "the Lych of the Gate (Tier III)",
   "success": "the Gate swings open. Every lingering soul passes through at once, the world falls quiet for a day, and then the first cries of new children are heard everywhere"
  }
 },
 {
  "n": 3,
  "name": "The Grafted Tree",
  "premise": "The Crown-Tree's roots run under every forest in the world, and its heart rotted long ago. It should have fallen and dropped its seed. Instead the Evergreen Court keeps it standing, grafting it with stolen life: the years of children, the warmth of lovers, the green of stolen springs. Its black sap seeps up through the roots, and the forest sickens with it. The characters must fell the Crown-Tree and plant its seed.",
  "adversary": "Fae tithe-takers, changelings and the folk who made bargains (Might 0). Lieutenants: fae lords, dryads, Sidhe knights and graft-weavers (up to Tier I). Champions: the Thorn Prince, the Gardener, the Broker of Years (up to Tier II). The Graft-Queen (Tier III).",
  "signature": [
   "A fae tithe-taker who asks politely for one year of your life.",
   "A tree with a human face in its bark, still breathing.",
   "Black sap welling out of the ground.",
   "A changeling child who laughs at funerals.",
   "A woodcutter forbidden to cut, his axe rusted to its peg.",
   "An Evergreen knight on a white stag."
  ],
  "doomEffect": "A year of your life is grafted away; your skin roughens to bark. Minor Disadvantage on Corpus checks for the rest of the session.",
  "lie": "A herb-woman is named a witch, and the woodcutters are blamed for angering the forest.",
  "heldBy": "A Crown-Tree rotten at the heart, kept alive with stolen life",
  "must": "Fell the Crown-Tree and plant its seed",
  "adversaryName": "The Evergreen Court and the Graft-Queen",
  "tiers": {
   "Minor": [
    {
     "n": 1,
     "name": "The Woodcutters of Ashgrove",
     "where": "A forest hamlet.",
     "trouble": "no tree may be cut, so roofs rot, fires starve, and the hamlet is cold and damp.",
     "cause": "the hamlet's founder bargained with a fae warden: shelter from the forest, if no tree is ever felled.",
     "tasks": [
      {
       "attr": "Anima",
       "site": "",
       "text": "persuade the woodcutters to break the bargain",
       "encounters": [
        "the eldest, who remembers what happened the last time"
       ],
       "fragForm": "Rumour",
       "frag": "a pedlar says Ashgrove burns its own furniture"
      },
      {
       "attr": "Corpus",
       "site": "",
       "text": "fell the warden's oak",
       "encounters": [
        "the warden, a dryad, in wrath"
       ],
       "fragForm": "Mark",
       "frag": "every axe in the hamlet is bound in green thread"
      }
     ],
     "causeFragForm": "Relic",
     "causeFrag": "the founder's contract, written on birch bark in green ink",
     "omen": "a man who cut a sapling is found grown into a tree by morning",
     "success": "the oak falls, the hamlet builds and burns, and the warden's green thread rots away"
    },
    {
     "n": 2,
     "name": "The Ageless Children",
     "where": "A farming hamlet.",
     "trouble": "the children have stopped growing; some have been seven for five years.",
     "cause": "graft-takers draw the children's years down into the Crown-Tree's roots.",
     "tasks": [
      {
       "attr": "Spiritus",
       "site": "",
       "text": "find the root-thread tied to each child",
       "encounters": [
        "Hazard: the roots grip whoever touches them (Corpus save, Average 13, or Restrained)"
       ],
       "fragForm": "Vision",
       "frag": "a dream of children asleep in a hollow root"
      },
      {
       "attr": "Anima",
       "site": "",
       "text": "find the parent who made the bargain",
       "encounters": [
        "Witness: a mother who traded her son's years for a good harvest"
       ],
       "fragForm": "Witness",
       "frag": "a child who remembers being twelve"
      }
     ],
     "causeFragForm": "Mark",
     "causeFrag": "a ring of toadstools around the hamlet, black at the centre",
     "omen": "a child ages a lifetime in one night",
     "success": "the threads are cut, and the children grow, a little too fast, and then normally"
    },
    {
     "n": 3,
     "name": "The Black Spring",
     "where": "A shrine at a spring.",
     "trouble": "the holy spring runs black and those who drink sicken.",
     "cause": "a root of the Crown-Tree has broken through into the spring.",
     "tasks": [
      {
       "attr": "Corpus",
       "site": "",
       "text": "dig out the root",
       "encounters": [
        "the black sap, which burns (1d3 per round of contact)"
       ],
       "fragForm": "Relic",
       "frag": "a flask of black sap that moves when no one is looking"
      },
      {
       "attr": "Spiritus",
       "site": "",
       "text": "seal the spring against the roots",
       "encounters": [
        "a graft-taker come to stop you"
       ],
       "fragForm": "Witness",
       "frag": "the shrine-keeper, who saw the root move"
      }
     ],
     "causeFragForm": "Mark",
     "causeFrag": "the root is carved with the Evergreen Court's sign: a crown of leaves around a sealed eye",
     "omen": "the spring runs black at noon and the shrine-keeper drinks it",
     "success": "the spring runs clear and cold"
    },
    {
     "n": 4,
     "name": "The Changeling Mill",
     "where": "A riverside mill.",
     "trouble": "the miller's son has turned spiteful and strange; the mill grinds only husks.",
     "cause": "the boy is a changeling, and his true self is held under the roots.",
     "tasks": [
      {
       "attr": "Anima",
       "site": "",
       "text": "reveal the changeling",
       "encounters": [
        "the changeling, who turns the village against you"
       ],
       "fragForm": "Witness",
       "frag": "the miller's wife, who knows her son is gone"
      },
      {
       "attr": "Spiritus",
       "site": "",
       "text": "bargain for the true son",
       "encounters": [
        "Temptation: the fae ask for something else of yours"
       ],
       "fragForm": "Rumour",
       "frag": "the river-folk say the mill was blessed by a green lady"
      }
     ],
     "causeFragForm": "Relic",
     "causeFrag": "an acorn carved like a child's face",
     "omen": "the mill-wheel turns backwards all night",
     "success": "the true son comes home thin and pale, and the mill grinds grain"
    },
    {
     "n": 5,
     "name": "The Winter Orchard",
     "where": "A manor village.",
     "trouble": "the lord's orchard blooms in midwinter and his daughter will marry a fae prince at the full moon.",
     "cause": "the lord sold her to the Evergreen Court for an orchard that never dies.",
     "tasks": [
      {
       "attr": "Anima",
       "site": "",
       "text": "stop the wedding",
       "encounters": [
        "the lord's guards"
       ],
       "fragForm": "Witness",
       "frag": "the daughter, who does not want to go"
      },
      {
       "attr": "Corpus",
       "site": "",
       "text": "cut down the blooming tree at the orchard's heart",
       "encounters": [
        "the fae prince's honour guard"
       ],
       "fragForm": "Mark",
       "frag": "every blossom has a sealed eye at its centre"
      }
     ],
     "causeFragForm": "Relic",
     "causeFrag": "a betrothal ring of green wood",
     "omen": "the orchard drops all its blossoms in one breath, and the daughter vanishes",
     "success": "the orchard dies in the snow, and the daughter comes home"
    },
    {
     "n": 6,
     "name": "The Hollow Elm",
     "where": "A crossroads hamlet.",
     "trouble": "the great elm at the crossroads takes travellers into its trunk.",
     "cause": "a dryad grafted into the elm against her will, starving.",
     "tasks": [
      {
       "attr": "Corpus",
       "site": "",
       "text": "cut the taken free from the trunk",
       "encounters": [
        "the elm's branches (as a Constrict)"
       ],
       "fragForm": "Mark",
       "frag": "footprints that lead into the elm"
      },
      {
       "attr": "Spiritus",
       "site": "",
       "text": "free the dryad from her graft",
       "encounters": [
        "the dryad, half mad"
       ],
       "fragForm": "Vision",
       "frag": "a woman of wood, weeping sap"
      }
     ],
     "causeFragForm": "Witness",
     "causeFrag": "the dryad, freed, who names the graft-weaver who did it",
     "omen": "the elm takes a whole wagon in one night",
     "success": "the elm falls, and a dryad walks away into the forest"
    }
   ],
   "Moderate": [
    {
     "n": 1,
     "name": "Greenhaven",
     "where": "A town; sites: the council hall, the town gardens, the shrine of the Green Lady.",
     "trouble": "the town is in flower all year, and its council will not let anyone leave.",
     "cause": "a fae lord sits on the council in a mortal's skin.",
     "tasks": [
      {
       "attr": "Anima",
       "site": "the council hall",
       "text": "expose the fae lord",
       "encounters": [
        "the council's guards",
        "a councillor who knows the truth"
       ],
       "fragForm": "Witness",
       "frag": "a guard who saw the councillor's shadow wrong"
      },
      {
       "attr": "Corpus",
       "site": "the town gardens",
       "text": "tear out the garden at the town's heart",
       "encounters": [
        "the gardeners",
        "thorns that grip"
       ],
       "fragForm": "Relic",
       "frag": "a rose that bleeds"
      },
      {
       "attr": "Spiritus",
       "site": "the shrine",
       "text": "break the shrine's blessing",
       "encounters": [
        "a dryad guard",
        "a Temptation of an endless spring"
       ],
       "fragForm": "Mark",
       "frag": "the Court's sign under the altar"
      }
     ],
     "causeEncounter": "the fae lord (Tier I)",
     "causeFragForm": "Vision",
     "causeFrag": "the town as it really is: overgrown ruins full of sleepers",
     "omen": "a family trying to leave is found grown into the town gate",
     "success": "Greenhaven's flowers die, its people wake, and they leave if they want to"
    },
    {
     "n": 2,
     "name": "The Tithe Fair",
     "where": "A city; sites: the fairground, the merchants' quarter, the old forest gate.",
     "trouble": "at the yearly fair, fae buy years of life from the poor; this year they are buying children.",
     "cause": "a fae broker with the city's guilds in his pocket.",
     "tasks": [
      {
       "attr": "Anima",
       "site": "the fairground",
       "text": "warn the poor",
       "encounters": [
        "the fair's bullies",
        "a father about to sell"
       ],
       "fragForm": "Rumour",
       "frag": "the fair has come every autumn for a hundred years"
      },
      {
       "attr": "Corpus",
       "site": "the merchants' quarter",
       "text": "steal the guild contracts",
       "encounters": [
        "the guards",
        "a merchant's dog"
       ],
       "fragForm": "Relic",
       "frag": "a contract signed in sap"
      },
      {
       "attr": "Spiritus",
       "site": "the forest gate",
       "text": "close the fae road",
       "encounters": [
        "fae guards",
        "the gate's ward"
       ],
       "fragForm": "Mark",
       "frag": "green handprints on the gate"
      }
     ],
     "causeEncounter": "the fae broker (Tier I)",
     "causeFragForm": "Witness",
     "causeFrag": "a girl who was bought last year and escaped",
     "omen": "a whole street of children vanishes in the night",
     "success": "the fair ends, the contracts burn, and the children come home"
    },
    {
     "n": 3,
     "name": "The Root Mines",
     "where": "A mining district; sites: the mine town, the deep galleries, the alchemist's hall.",
     "trouble": "the miners dig not ore but root-gold: hardened sap from the Crown-Tree's roots, which drives men mad with greed.",
     "cause": "a fae alchemist.",
     "tasks": [
      {
       "attr": "Corpus",
       "site": "the deep galleries",
       "text": "collapse the main gallery",
       "encounters": [
        "miners",
        "a cave-in"
       ],
       "fragForm": "Mark",
       "frag": "roots in the gallery walls, bleeding gold"
      },
      {
       "attr": "Anima",
       "site": "the mine town",
       "text": "end the gold fever",
       "encounters": [
        "a riot",
        "a gold-mad foreman"
       ],
       "fragForm": "Relic",
       "frag": "a lump of root-gold that whispers prices"
      },
      {
       "attr": "Spiritus",
       "site": "the alchemist's hall",
       "text": "learn what the gold is for",
       "encounters": [
        "the alchemist's guards",
        "a bound elemental"
       ],
       "fragForm": "Witness",
       "frag": "an apprentice who ran away"
      }
     ],
     "causeEncounter": "the fae alchemist (Tier I)",
     "causeFragForm": "Vision",
     "causeFrag": "the Crown-Tree's roots, wounded and bleeding gold",
     "omen": "a miner kills his brother for a nugget",
     "success": "the mine is sealed, and the gold fever passes"
    },
    {
     "n": 4,
     "name": "The Briar Wall",
     "where": "A district swallowed by thorns; sites: the briar's edge, a trapped village, a sleeping keep.",
     "trouble": "a wall of thorns has grown over a valley in a month, and the people inside cannot get out.",
     "cause": "a Sidhe knight who wants the keep's lady.",
     "tasks": [
      {
       "attr": "Corpus",
       "site": "the briar's edge",
       "text": "cut a way through",
       "encounters": [
        "the thorns (1d3 per round)",
        "thorn-beasts"
       ],
       "fragForm": "Mark",
       "frag": "the briars bear the Court's sign in their knots"
      },
      {
       "attr": "Anima",
       "site": "the trapped village",
       "text": "lead the villagers out",
       "encounters": [
        "villagers too frightened to move",
        "a looter"
       ],
       "fragForm": "Witness",
       "frag": "a villager who saw the knight ride in"
      },
      {
       "attr": "Spiritus",
       "site": "the sleeping keep",
       "text": "wake the lady",
       "encounters": [
        "enchanted guards",
        "a Temptation of sleep"
       ],
       "fragForm": "Vision",
       "frag": "the lady, dreaming of the knight"
      }
     ],
     "causeEncounter": "the Sidhe knight (Tier I)",
     "causeFragForm": "Relic",
     "causeFrag": "the knight's token, a green glove",
     "omen": "the briar wall grows over the road out, and a cart is lost in it",
     "success": "the briars wither, and the valley is free"
    },
    {
     "n": 5,
     "name": "The Sleeping Abbey",
     "where": "An abbey and its lands; sites: the abbey, the village, the dream-garden.",
     "trouble": "the monks have slept for three years, and now the villagers are falling asleep.",
     "cause": "a fae sleep-weaver feeds their dreams to the Crown-Tree.",
     "tasks": [
      {
       "attr": "Anima",
       "site": "the village",
       "text": "keep the villagers awake and calm",
       "encounters": [
        "a panic",
        "a woman who wants to sleep"
       ],
       "fragForm": "Rumour",
       "frag": "travellers say the abbey bells have not rung in three years"
      },
      {
       "attr": "Spiritus",
       "site": "the abbey",
       "text": "enter the monks' dream and free them",
       "encounters": [
        "dream-beasts",
        "a Temptation to stay"
       ],
       "fragForm": "Vision",
       "frag": "the monks, wandering in a garden of roots"
      },
      {
       "attr": "Corpus",
       "site": "the dream-garden",
       "text": "dig up the garden's heart-root",
       "encounters": [
        "thorn-guards",
        "the sleep that creeps (Anima save, Difficult 16, or sleep)"
       ],
       "fragForm": "Relic",
       "frag": "a poppy of black glass"
      }
     ],
     "causeEncounter": "the sleep-weaver (Tier I)",
     "causeFragForm": "Witness",
     "causeFrag": "the abbot, wakened, who remembers the weaver's bargain",
     "omen": "the village's watchmen fall asleep at their posts, and wolves come in",
     "success": "the monks wake, the bells ring, and the village sleeps normally"
    },
    {
     "n": 6,
     "name": "The White Stag Hunt",
     "where": "A forest district; sites: the hunting lodge, the stag's trail, the hollow hill.",
     "trouble": "a white stag is seen every night, and those who hunt it never come back.",
     "cause": "the Wild Hunt's huntsman, who takes the hunters as hounds.",
     "tasks": [
      {
       "attr": "Corpus",
       "site": "the stag's trail",
       "text": "track the stag without being taken",
       "encounters": [
        "the Hunt's hounds",
        "a ravine"
       ],
       "fragForm": "Mark",
       "frag": "the stag's prints shine in the dark"
      },
      {
       "attr": "Anima",
       "site": "the hunting lodge",
       "text": "stop the lord's men from hunting",
       "encounters": [
        "the lord",
        "a hunter who must prove himself"
       ],
       "fragForm": "Witness",
       "frag": "a hunter who came back as a dog, and changed again"
      },
      {
       "attr": "Spiritus",
       "site": "the hollow hill",
       "text": "free the hunters taken as hounds",
       "encounters": [
        "the hill's wards",
        "the hounds"
       ],
       "fragForm": "Relic",
       "frag": "a hunting horn of green bone"
      }
     ],
     "causeEncounter": "the huntsman (Tier I)",
     "causeFragForm": "Vision",
     "causeFrag": "the stag is the huntsman's lure, and the huntsman serves the Graft-Queen",
     "omen": "the lord's son rides out after the stag at dusk",
     "success": "the Hunt rides away, and the hounds become men again"
    }
   ],
   "Major": [
    {
     "n": 1,
     "name": "The Rootlands",
     "where": "A region where the great roots break the surface; sites: the root villages, the root-bridge, the root-cave, the heart-root.",
     "trouble": "the Crown-Tree's roots surface across the region, cracking towns apart and bleeding black sap.",
     "cause": "the Root-Warden, an elder tree-spirit grafted to guard the roots.",
     "tasks": [
      {
       "attr": "Corpus",
       "site": "the root villages",
       "text": "evacuate the villages before the roots tear them down",
       "encounters": [
        "roots bursting through houses",
        "black sap",
        "villagers who will not leave"
       ],
       "fragForm": "Witness",
       "frag": "a villager who saw the roots move towards people"
      },
      {
       "attr": "Anima",
       "site": "the root-bridge",
       "text": "cross the root-bridge guarded by its keepers",
       "encounters": [
        "the keepers",
        "a bargain",
        "the bridge itself shifting"
       ],
       "fragForm": "Rumour",
       "frag": "the roots grow towards one place"
      },
      {
       "attr": "Spiritus",
       "site": "the root-cave",
       "text": "read the roots and find their source",
       "encounters": [
        "the cave's spirits",
        "a graft-weaver",
        "the sap"
       ],
       "fragForm": "Vision",
       "frag": "the roots lead to a single great tree"
      },
      {
       "attr": "Corpus",
       "site": "the heart-root",
       "text": "cut the heart-root",
       "encounters": [
        "the Root-Warden's servants",
        "the root writhing",
        "the sap flood"
       ],
       "fragForm": "Mark",
       "frag": "the heart-root bears the Graft-Queen's sign"
      }
     ],
     "causeEncounter": "the Root-Warden (Tier II)",
     "causeFragForm": "Relic",
     "causeFrag": "a cutting of the heart-root, which shows where the Crown-Tree stands",
     "thread": true,
     "reckoningTask": 1,
     "omen": "a town's church falls into a rent full of roots",
     "success": "the roots withdraw, and the black sap dries"
    },
    {
     "n": 2,
     "name": "The Court of Thorns",
     "where": "A fae march; sites: the border fort, the thorn road, the hall of thorns, the throne.",
     "trouble": "the fae court has spread into mortal lands, and its thorns take a village a week.",
     "cause": "the Thorn Prince, the Graft-Queen's heir.",
     "tasks": [
      {
       "attr": "Corpus",
       "site": "the border fort",
       "text": "hold the fort against the thorn knights",
       "encounters": [
        "thorn knights",
        "a siege",
        "a traitor"
       ],
       "fragForm": "Witness",
       "frag": "a captured knight who hates the prince"
      },
      {
       "attr": "Anima",
       "site": "the thorn road",
       "text": "win passage from the fae lords along the road",
       "encounters": [
        "three fae lords, each with a price",
        "a Temptation",
        "a duel of words"
       ],
       "fragForm": "Rumour",
       "frag": "the prince covets his mother's throne"
      },
      {
       "attr": "Spiritus",
       "site": "the hall of thorns",
       "text": "see through the hall's glamour",
       "encounters": [
        "glamours",
        "a fae trickster",
        "the hall's thorns"
       ],
       "fragForm": "Mark",
       "frag": "the hall's true walls are made of grafted people"
      },
      {
       "attr": "Anima",
       "site": "the throne",
       "text": "turn the prince's court against him",
       "encounters": [
        "courtiers",
        "the prince's champion",
        "a bargain"
       ],
       "fragForm": "Relic",
       "frag": "the prince's crown of thorns"
      }
     ],
     "causeEncounter": "the Thorn Prince (Tier II)",
     "causeFragForm": "Relic",
     "causeFrag": "the prince's crown, cut from the Crown-Tree's living wood",
     "thread": true,
     "reckoningTask": 2,
     "omen": "the thorns swallow a mortal castle overnight",
     "success": "the court withdraws, and the thorns wither"
    },
    {
     "n": 3,
     "name": "The Grafted Forest",
     "where": "A forest region; sites: the forest's edge, the woodcutters' village, the grafting grounds, the Gardener's house.",
     "trouble": "the forest is full of trees grafted from people, and more are taken every week.",
     "cause": "the Gardener, a fae who prunes and grafts mortals.",
     "tasks": [
      {
       "attr": "Spiritus",
       "site": "the forest's edge",
       "text": "wake the grafted and learn who they were",
       "encounters": [
        "grafted trees",
        "a sap-beast",
        "a whispering grove"
       ],
       "fragForm": "Vision",
       "frag": "the grafted, remembering their names"
      },
      {
       "attr": "Anima",
       "site": "the woodcutters' village",
       "text": "get the woodcutters to cut the grafted free",
       "encounters": [
        "superstitious woodcutters",
        "a family who wants their son back",
        "the Gardener's spy"
       ],
       "fragForm": "Witness",
       "frag": "a woodcutter whose wife was grafted"
      },
      {
       "attr": "Corpus",
       "site": "the grafting grounds",
       "text": "stop the next grafting",
       "encounters": [
        "the Gardener's servants",
        "the grafting tools",
        "the victims"
       ],
       "fragForm": "Mark",
       "frag": "pruning cuts on the victims, healed with sap"
      },
      {
       "attr": "Corpus",
       "site": "the Gardener's house",
       "text": "break into the Gardener's house",
       "encounters": [
        "thorn-guards",
        "the house's traps",
        "the grafted servants"
       ],
       "fragForm": "Relic",
       "frag": "the Gardener's knife"
      }
     ],
     "causeEncounter": "the Gardener (Tier II)",
     "causeFragForm": "Relic",
     "causeFrag": "the Gardener's knife, the only blade that can cut a graft from the Crown-Tree",
     "thread": true,
     "reckoningTask": 3,
     "omen": "a whole village is found grafted in a single grove",
     "success": "the grafted are cut free, and some live"
    },
    {
     "n": 4,
     "name": "The Broker of Years",
     "where": "A region of market towns; sites: four towns on a trade road.",
     "trouble": "across the region, people sell years of their lives for coin, and age overnight.",
     "cause": "the Broker of Years, who sells those years to the Graft-Queen.",
     "tasks": [
      {
       "attr": "Anima",
       "site": "the first town",
       "text": "find out who is buying",
       "encounters": [
        "sellers",
        "brokers",
        "a Witness"
       ],
       "fragForm": "Witness",
       "frag": "a girl of sixteen who looks sixty"
      },
      {
       "attr": "Corpus",
       "site": "the second town",
       "text": "break up the Broker's agents",
       "encounters": [
        "agents",
        "guards",
        "a street fight"
       ],
       "fragForm": "Mark",
       "frag": "the Broker's sign of an hourglass of leaves"
      },
      {
       "attr": "Anima",
       "site": "the third town",
       "text": "steal the Broker's ledger",
       "encounters": [
        "a lock",
        "a guard",
        "a Temptation of years"
       ],
       "fragForm": "Relic",
       "frag": "the ledger of years"
      },
      {
       "attr": "Spiritus",
       "site": "the fourth town",
       "text": "return the stolen years",
       "encounters": [
        "the ward on the years",
        "the Broker's guards",
        "the years themselves, hungry to go home"
       ],
       "fragForm": "Vision",
       "frag": "the years flowing into the Crown-Tree's sap"
      }
     ],
     "causeEncounter": "the Broker of Years (Tier II)",
     "causeFragForm": "Relic",
     "causeFrag": "the Broker's hourglass, which holds the Graft-Queen's own stolen years",
     "thread": true,
     "reckoningTask": 4,
     "omen": "a town's children age a decade in a night",
     "success": "the years go home, and the region's people are young again, or at least their own age"
    },
    {
     "n": 5,
     "name": "The Stolen Spring",
     "where": "A region where spring has not come in years; sites: the frozen farms, the Spring-Shrine, the thief's road, the thief's hall.",
     "trouble": "winter has ended but spring never came; the fields lie bare and mud.",
     "cause": "the Spring-Thief, a fae who stole the region's spring for the Crown-Tree.",
     "tasks": [
      {
       "attr": "Corpus",
       "site": "the frozen farms",
       "text": "keep the farms alive until spring returns",
       "encounters": [
        "hunger",
        "wolves",
        "a desperate raid"
       ],
       "fragForm": "Rumour",
       "frag": "spring was seen leaving in a cart"
      },
      {
       "attr": "Spiritus",
       "site": "the Spring-Shrine",
       "text": "wake the spring's priestess",
       "encounters": [
        "the shrine's wards",
        "the priestess's dreams",
        "a fae guard"
       ],
       "fragForm": "Vision",
       "frag": "spring, chained in a fae hall"
      },
      {
       "attr": "Anima",
       "site": "the thief's road",
       "text": "follow the thief's road through the fae lands",
       "encounters": [
        "fae toll-keepers",
        "a bargain",
        "a glamour"
       ],
       "fragForm": "Witness",
       "frag": "a toll-keeper who let the thief pass"
      },
      {
       "attr": "Corpus",
       "site": "the thief's hall",
       "text": "free the spring",
       "encounters": [
        "the hall's guards",
        "the hall's traps",
        "the spring itself, wild"
       ],
       "fragForm": "Mark",
       "frag": "the spring's chains bear the Court's sign"
      }
     ],
     "causeEncounter": "the Spring-Thief (Tier II)",
     "causeFragForm": "Witness",
     "causeFrag": "spring itself, freed, which knows where the Crown-Tree's seed must fall",
     "thread": true,
     "reckoningTask": 5,
     "omen": "the last of the seed corn rots in the stores",
     "success": "spring comes in a single day, and the fields turn green"
    },
    {
     "n": 6,
     "name": "The Seed-Keepers",
     "where": "A highland region; sites: the druids' villages, the stone circle, the seed-vault, the grove.",
     "trouble": "the old druids who guard the place where the seed must fall have turned to the Court.",
     "cause": "the Arch-Druid, grafted and turned.",
     "tasks": [
      {
       "attr": "Anima",
       "site": "the druids' villages",
       "text": "win the young druids back",
       "encounters": [
        "elders",
        "the turned",
        "a Temptation of power"
       ],
       "fragForm": "Witness",
       "frag": "a young druid who still remembers the old rites"
      },
      {
       "attr": "Spiritus",
       "site": "the stone circle",
       "text": "restore the circle",
       "encounters": [
        "the circle's wards",
        "fae trespassers",
        "the turned druids"
       ],
       "fragForm": "Mark",
       "frag": "the stones bear the Court's sign, cut over older marks"
      },
      {
       "attr": "Corpus",
       "site": "the seed-vault",
       "text": "reach the vault where the seed's place is recorded",
       "encounters": [
        "traps",
        "guardians",
        "a collapse"
       ],
       "fragForm": "Relic",
       "frag": "a stone map of the seed's resting place"
      },
      {
       "attr": "Spiritus",
       "site": "the grove",
       "text": "break the Arch-Druid's graft",
       "encounters": [
        "the grove",
        "the Arch-Druid's beasts",
        "the graft"
       ],
       "fragForm": "Vision",
       "frag": "the Arch-Druid, before"
      }
     ],
     "causeEncounter": "the Arch-Druid (Tier II)",
     "causeFragForm": "Witness",
     "causeFrag": "the Arch-Druid, freed, teaches you how to plant the seed",
     "thread": true,
     "reckoningTask": 6,
     "omen": "the stone circle falls in a single night",
     "success": "the druids return to the old ways, and the seed's resting place is ready"
    }
   ]
  },
  "reckoning": {
   "name": "The Crown-Tree",
   "heart": "a Vision of a tree as tall as a mountain, its trunk a hollow throne, its bark a wall of grafted faces, with the Graft-Queen at its heart.",
   "tasks": [
    {
     "from": 1,
     "attr": "Corpus",
     "text": "cut through the heart-root while the tree fights back"
    },
    {
     "from": 2,
     "attr": "Anima",
     "text": "turn the Thorn Prince's court against the queen at the tree's foot"
    },
    {
     "from": 3,
     "attr": "Spiritus",
     "text": "cut the grafts free with the Gardener's knife"
    },
    {
     "from": 4,
     "attr": "Spiritus",
     "text": "break the Broker's hourglass and return the queen's stolen years"
    },
    {
     "from": 5,
     "attr": "Corpus",
     "text": "carry the falling seed to the place spring showed you"
    },
    {
     "from": 6,
     "attr": "Spiritus",
     "text": "plant the seed with the druids' rite"
    }
   ],
   "adversary": "the Graft-Queen (Tier III)",
   "success": "the Crown-Tree falls, and every forest in the world shakes. The black sap dries, and from the seed the first green shoot of a new forest rises"
  }
 },
 {
  "n": 4,
  "name": "The Held Tide",
  "premise": "The lowlands drown slowly in still water. Behind a thousand dykes the marshes stagnate, the fever rises off them every summer, and the land rots in its own wet. The Black Tide that should scour it clean and lay down new earth is held back by the Dykemasters, who have bound the god of the sea beneath their greatest dam and sell its stillness. The characters must break the dams and let the flood come, and see the lowland people safe to high ground before it does.",
  "adversary": "Dyke-wardens, toll-reeves and the folk who live off the water-tax (Might 0). Lieutenants: Dykemaster magistrates, bound water elementals, sea hags and drowned soldiers (up to Tier I). Champions: the Dyke-Marshal, a bound lindwyrm and the Salt-Witch (up to Tier II). The Chained God (Tier III).",
  "signature": [
   "A dyke-warden collecting the water-tax with a hooked pole.",
   "A fevered family on a raft, adrift.",
   "A sluice-gate groaning under the weight of the water behind it.",
   "A mudborn emissary, eel-faced, who speaks for the drowned.",
   "A child who says the sea is singing to her.",
   "A Dykemaster's knight in a green-black surcoat of locks and chains."
  ],
  "doomEffect": "The stillness gets into your lungs: you are Sickened for 1 Watch.",
  "lie": "Breaking a dam is murder: “the flood is the enemy”, and the sea itself is blamed for the fever.",
  "heldBy": "Stagnant marsh behind the dams that hold back the cleansing flood",
  "must": "Break the dams and let the Black Tide scour the land",
  "adversaryName": "The Dykemasters and the Chained God beneath",
  "tiers": {
   "Minor": [
    {
     "n": 1,
     "name": "The Weir at Fennick",
     "where": "A mill hamlet.",
     "trouble": "the mill-pond has turned green and still, and the marsh-fever has taken a third of the hamlet.",
     "cause": "a Dykemaster agent paid the miller to raise the weir and hold the stream.",
     "tasks": [
      {
       "attr": "Anima",
       "site": "",
       "text": "turn the miller against his paymaster",
       "encounters": [
        "the agent's hired men"
       ],
       "fragForm": "Witness",
       "frag": "the miller's wife, who counts the silver"
      },
      {
       "attr": "Corpus",
       "site": "",
       "text": "break the weir",
       "encounters": [
        "Hazard: the water bursting through (Corpus save, Average 13, or swept away 1d6 × 3 m)"
       ],
       "fragForm": "Mark",
       "frag": "new stones in the weir, stamped with a lock and chain"
      }
     ],
     "causeFragForm": "Relic",
     "causeFrag": "a Dykemaster's water-licence, sealed in green wax",
     "omen": "the fever takes the hamlet's priest",
     "success": "the stream runs again and the fever burns out by autumn"
    },
    {
     "n": 2,
     "name": "The Leech-Doctor of Muddle",
     "where": "A fen hamlet.",
     "trouble": "a travelling leech-doctor cures the fever, but his patients fall sick again within a month.",
     "cause": "he is a Dykemaster agent whose leeches carry the fever from house to house.",
     "tasks": [
      {
       "attr": "Anima",
       "site": "",
       "text": "expose the leech-doctor",
       "encounters": [
        "villagers who love him"
       ],
       "fragForm": "Rumour",
       "frag": "the doctor came the week the fever did"
      },
      {
       "attr": "Spiritus",
       "site": "",
       "text": "heal the afflicted and break the fever",
       "encounters": [
        "Hazard: the fever itself (Corpus save, Average 13, or Sickened)"
       ],
       "fragForm": "Relic",
       "frag": "a jar of leeches that swim in circles"
      }
     ],
     "causeFragForm": "Witness",
     "causeFrag": "the doctor's apprentice, who knows where the leeches come from",
     "omen": "a child dies under the leeches",
     "success": "the fever ends and the doctor is driven out"
    },
    {
     "n": 3,
     "name": "The Eel-Weir Toll",
     "where": "A river crossing.",
     "trouble": "eel weirs choke the stream, and the crossing floods into stinking pools.",
     "cause": "the toll-lord built them to raise the dyke-tax.",
     "tasks": [
      {
       "attr": "Corpus",
       "site": "",
       "text": "cut the weirs",
       "encounters": [
        "the toll-lord's bailiffs"
       ],
       "fragForm": "Mark",
       "frag": "every weir is tagged with a toll-seal"
      },
      {
       "attr": "Anima",
       "site": "",
       "text": "negotiate with the eel-catchers who live off the weirs",
       "encounters": [
        "Witness: the eel-catchers' matriarch"
       ],
       "fragForm": "Witness",
       "frag": "an eel-catcher who wants them gone"
      }
     ],
     "causeFragForm": "Relic",
     "causeFrag": "the toll-lord's ledger, with a column paid to the Dykemasters",
     "omen": "the crossing floods and a family's cart is lost",
     "success": "the weirs come down, the crossing drains, and the eel-catchers find new work"
    },
    {
     "n": 4,
     "name": "The Marsh-Light Shrine",
     "where": "A fen shrine.",
     "trouble": "marsh-lights burn over the shrine and travellers vanish following them.",
     "cause": "the shrine's saint is pinned under a dyke-stone, and her bones rot in still water.",
     "tasks": [
      {
       "attr": "Spiritus",
       "site": "",
       "text": "follow the lights to the saint's grave",
       "encounters": [
        "1d3 will-o'-the-wisps"
       ],
       "fragForm": "Vision",
       "frag": "a drowned woman asks to be carried to the sea"
      },
      {
       "attr": "Corpus",
       "site": "",
       "text": "lift the dyke-stone and carry her bones to running water",
       "encounters": [
        "Hazard: the bog"
       ],
       "fragForm": "Mark",
       "frag": "the dyke-stone bears the lock-and-chain seal"
      }
     ],
     "causeFragForm": "Witness",
     "causeFrag": "the shrine-keeper, who saw the stone laid",
     "omen": "a whole pilgrim party vanishes into the marsh-lights",
     "success": "the lights go out, and the saint's bones go to the sea"
    },
    {
     "n": 5,
     "name": "The Still Children",
     "where": "A fen village.",
     "trouble": "children wander to the still pools at dusk and are found drowned.",
     "cause": "a nixie bound in the pools by a Dykemaster charm.",
     "tasks": [
      {
       "attr": "Corpus",
       "site": "",
       "text": "pull the next child from the pool",
       "encounters": [
        "the nixie's grip (Corpus check, Average 13, opposed)"
       ],
       "fragForm": "Witness",
       "frag": "a child who was pulled out and remembers singing"
      },
      {
       "attr": "Spiritus",
       "site": "",
       "text": "free the nixie from its charm",
       "encounters": [
        "the nixie herself"
       ],
       "fragForm": "Mark",
       "frag": "an iron charm sunk in the pool"
      }
     ],
     "causeFragForm": "Relic",
     "causeFrag": "the charm, stamped with a lock and chain",
     "omen": "three children walk into the pools on the same evening",
     "success": "the nixie swims away down the river, and the pools are only pools"
    },
    {
     "n": 6,
     "name": "The Salt Fields of Holm",
     "where": "A coastal holdfast.",
     "trouble": "the holdfast's fields are turning to salt.",
     "cause": "the sea-sluice is locked, trapping seawater behind the dyke.",
     "tasks": [
      {
       "attr": "Anima",
       "site": "",
       "text": "convince the lord to open the sluice",
       "encounters": [
        "the lord's Dykemaster adviser"
       ],
       "fragForm": "Rumour",
       "frag": "the fishermen say the sea-sluice has been locked for a year"
      },
      {
       "attr": "Corpus",
       "site": "",
       "text": "open the rusted sluice",
       "encounters": [
        "Hazard: the sluice (Corpus check, Average 13, or 1d3 crushing)"
       ],
       "fragForm": "Mark",
       "frag": "a new lock on the sluice wheel"
      }
     ],
     "causeFragForm": "Relic",
     "causeFrag": "the sluice key, kept by the adviser",
     "omen": "the last of the holdfast's wells turns to brine",
     "success": "the sea runs out, the rain washes the fields, and the next year's barley grows"
    }
   ],
   "Moderate": [
    {
     "n": 1,
     "name": "Dammeren",
     "where": "A polder town below the sea; sites: the town hall, the sea-dyke, the pumphouse.",
     "trouble": "the town floods a little more each year, and the magistrate taxes its people for dykes that are never built.",
     "cause": "a Dykemaster magistrate with a water elemental bound in the pumphouse.",
     "tasks": [
      {
       "attr": "Anima",
       "site": "the town hall",
       "text": "expose the magistrate's taxes",
       "encounters": [
        "the magistrate's clerks",
        "a burgher who profits"
       ],
       "fragForm": "Witness",
       "frag": "a clerk who keeps two sets of books"
      },
      {
       "attr": "Corpus",
       "site": "the sea-dyke",
       "text": "shore up the dyke so the town can be evacuated",
       "encounters": [
        "a breach",
        "the tide"
       ],
       "fragForm": "Mark",
       "frag": "the dyke has been cut on purpose"
      },
      {
       "attr": "Spiritus",
       "site": "the pumphouse",
       "text": "free the elemental",
       "encounters": [
        "the magistrate's guards",
        "the elemental's rage"
       ],
       "fragForm": "Rumour",
       "frag": "the pumps work without stoking"
      }
     ],
     "causeEncounter": "the bound water elemental (Tier I)",
     "causeFragForm": "Relic",
     "causeFrag": "the magistrate's commission, signed by the Dyke-Marshal",
     "omen": "the sea comes over the dyke at the spring tide",
     "success": "Dammeren moves to higher ground, and the polder goes back to the sea"
    },
    {
     "n": 2,
     "name": "Grachtholm",
     "where": "A canal city; sites: the lock-keepers' guild, the canal quarter, the great lock.",
     "trouble": "the canals no longer flow, and a stagnant plague spreads through the city.",
     "cause": "the lock guild, led by a drowned wight.",
     "tasks": [
      {
       "attr": "Anima",
       "site": "the guild",
       "text": "find who controls the locks",
       "encounters": [
        "guild enforcers",
        "a guildmaster willing to talk"
       ],
       "fragForm": "Witness",
       "frag": "a lock-keeper who saw the master drown"
      },
      {
       "attr": "Spiritus",
       "site": "the canal quarter",
       "text": "treat the plague",
       "encounters": [
        "the plague",
        "a mob"
       ],
       "fragForm": "Rumour",
       "frag": "the plague began when the locks closed"
      },
      {
       "attr": "Corpus",
       "site": "the great lock",
       "text": "open the great lock",
       "encounters": [
        "the guild's drowned",
        "the lock's machinery"
       ],
       "fragForm": "Mark",
       "frag": "the lock-chains are new and stamped"
      }
     ],
     "causeEncounter": "the drowned wight guildmaster (Tier I)",
     "causeFragForm": "Relic",
     "causeFrag": "the guild charter, signed by the Dykemasters",
     "omen": "a whole canal quarter falls sick in a night",
     "success": "the canals flow, and the plague recedes"
    },
    {
     "n": 3,
     "name": "The Reclaimed Marsh",
     "where": "A drained district; sites: the labour camps, the drainage cuts, the reeve's house.",
     "trouble": "the marsh is being drained by forced labour, and the drained land sinks and rots.",
     "cause": "a Dykemaster engineer with a bound earth elemental.",
     "tasks": [
      {
       "attr": "Corpus",
       "site": "the labour camps",
       "text": "free the labourers",
       "encounters": [
        "overseers",
        "dogs"
       ],
       "fragForm": "Witness",
       "frag": "a labourer who has seen the engineer's beast"
      },
      {
       "attr": "Anima",
       "site": "the drainage cuts",
       "text": "turn the guards",
       "encounters": [
        "guards",
        "a Temptation of a bribe"
       ],
       "fragForm": "Mark",
       "frag": "the cuts are dug to drain into the river, not the sea"
      },
      {
       "attr": "Spiritus",
       "site": "the reeve's house",
       "text": "free the earth elemental",
       "encounters": [
        "the engineer's wards",
        "the elemental"
       ],
       "fragForm": "Relic",
       "frag": "the binding stone"
      }
     ],
     "causeEncounter": "the Dykemaster engineer (Tier I)",
     "causeFragForm": "Vision",
     "causeFrag": "the drained land, rotting, and a dam beyond it",
     "omen": "a camp collapses into a sinkhole",
     "success": "the labourers go free and the marsh floods back"
    },
    {
     "n": 4,
     "name": "The Fever Coast",
     "where": "A coastal district behind a sea-wall; sites: the fishing villages, the sea-wall, the hag's cove.",
     "trouble": "fever rises every summer behind the sea-wall, worse every year.",
     "cause": "a sea hag who struck a bargain with the Dykemasters to keep the sea out.",
     "tasks": [
      {
       "attr": "Anima",
       "site": "the fishing villages",
       "text": "learn the hag's bargain",
       "encounters": [
        "suspicious fisherfolk",
        "a widow"
       ],
       "fragForm": "Rumour",
       "frag": "the fishermen say the sea-wall was built in a single night"
      },
      {
       "attr": "Corpus",
       "site": "the sea-wall",
       "text": "breach the wall",
       "encounters": [
        "Dykemaster guards",
        "the wall's wards"
       ],
       "fragForm": "Mark",
       "frag": "the wall's stones are slick with sea-weed though they never touch the sea"
      },
      {
       "attr": "Spiritus",
       "site": "the hag's cove",
       "text": "break the hag's bargain",
       "encounters": [
        "her drowned servants",
        "a Temptation"
       ],
       "fragForm": "Witness",
       "frag": "a fisherman she has taken"
      }
     ],
     "causeEncounter": "the sea hag (Tier I)",
     "causeFragForm": "Relic",
     "causeFrag": "the bargain, written on a fish skin",
     "omen": "the fever takes a whole village",
     "success": "the sea comes back in, and the fever ends"
    },
    {
     "n": 5,
     "name": "The River-Gate",
     "where": "A fortified river gate and its towns; sites: the upstream town, the gate fortress, the downstream town.",
     "trouble": "the gate holds the river back, flooding the upstream town and starving the downstream one.",
     "cause": "the gate-captain with drowned soldiers in his pay.",
     "tasks": [
      {
       "attr": "Corpus",
       "site": "the upstream town",
       "text": "save the townsfolk from the flood",
       "encounters": [
        "the rising river",
        "a collapsing house"
       ],
       "fragForm": "Witness",
       "frag": "a survivor who saw the gate close"
      },
      {
       "attr": "Anima",
       "site": "the downstream town",
       "text": "rally the town to march on the gate",
       "encounters": [
        "frightened townsfolk",
        "a Dykemaster spy"
       ],
       "fragForm": "Rumour",
       "frag": "the gate-captain's soldiers do not eat"
      },
      {
       "attr": "Spiritus",
       "site": "the gate fortress",
       "text": "break the drowned soldiers' binding",
       "encounters": [
        "the drowned",
        "the fortress wards"
       ],
       "fragForm": "Mark",
       "frag": "the soldiers' armour bears the lock-and-chain"
      }
     ],
     "causeEncounter": "the gate-captain (Tier I)",
     "causeFragForm": "Relic",
     "causeFrag": "the captain's orders, from the Dyke-Marshal",
     "omen": "the upstream town's church goes under",
     "success": "the gate opens, and the river finds its old course"
    },
    {
     "n": 6,
     "name": "The Peat-Cutters' Revolt",
     "where": "A peat-fen district; sites: the cutters' camps, the overseer's house, the dam.",
     "trouble": "the peat-cutters are forced to dig the peat that seals the Dykemasters' dams.",
     "cause": "an overseer-witch who binds their will.",
     "tasks": [
      {
       "attr": "Anima",
       "site": "the cutters' camps",
       "text": "break the witch's hold on the cutters",
       "encounters": [
        "the cutters, enchanted",
        "a cutter's child"
       ],
       "fragForm": "Witness",
       "frag": "a cutter who broke free"
      },
      {
       "attr": "Corpus",
       "site": "the dam",
       "text": "tear out the peat seal",
       "encounters": [
        "guards",
        "the dam's weight"
       ],
       "fragForm": "Mark",
       "frag": "peat bricks stamped with the lock and chain"
      },
      {
       "attr": "Spiritus",
       "site": "the overseer's house",
       "text": "unbind the cutters",
       "encounters": [
        "the witch's wards",
        "her familiar"
       ],
       "fragForm": "Relic",
       "frag": "a doll made of peat, one for every cutter"
      }
     ],
     "causeEncounter": "the overseer-witch (Tier I)",
     "causeFragForm": "Vision",
     "causeFrag": "a dam of peat, a thousand feet high",
     "omen": "a cutter drowns in the peat and no one stops digging",
     "success": "the cutters go free, and the dam leaks"
    }
   ],
   "Major": [
    {
     "n": 1,
     "name": "The Great Dyke",
     "where": "A region along the great sea dyke; sites: the dyke towns, the sluices, the barracks, the marshal's tower.",
     "trouble": "the great dyke holds back a sea higher than the land, and the land behind it is a fever-marsh.",
     "cause": "the Dyke-Marshal, who commands the Dykemasters' army.",
     "tasks": [
      {
       "attr": "Anima",
       "site": "the dyke towns",
       "text": "prepare the towns to evacuate",
       "encounters": [
        "towns that will not leave",
        "a Dykemaster spy",
        "a riot"
       ],
       "fragForm": "Witness",
       "frag": "a dyke-warden who wants out"
      },
      {
       "attr": "Corpus",
       "site": "the sluices",
       "text": "seize the sluices",
       "encounters": [
        "sluice guards",
        "the sluices' machinery",
        "a flood"
       ],
       "fragForm": "Mark",
       "frag": "every sluice is chained"
      },
      {
       "attr": "Corpus",
       "site": "the barracks",
       "text": "break the marshal's army",
       "encounters": [
        "Dykemaster knights",
        "drowned soldiers",
        "a siege"
       ],
       "fragForm": "Rumour",
       "frag": "the marshal has not slept in years"
      },
      {
       "attr": "Spiritus",
       "site": "the marshal's tower",
       "text": "break the tower's wards",
       "encounters": [
        "wards",
        "bound elementals",
        "a Temptation"
       ],
       "fragForm": "Relic",
       "frag": "the marshal's key"
      }
     ],
     "causeEncounter": "the Dyke-Marshal (Tier II)",
     "causeFragForm": "Relic",
     "causeFrag": "the marshal's key, which opens the Last Sluice",
     "thread": true,
     "reckoningTask": 1,
     "omen": "the sea comes over the great dyke for a single tide",
     "success": "the lowlands are evacuated, and the sea comes in"
    },
    {
     "n": 2,
     "name": "The Drowned Archive",
     "where": "A region of flooded libraries; sites: the scholars' town, the flooded halls, the stacks, the vault.",
     "trouble": "the knowledge of the old world drowns, and the scholars who seek it go mad.",
     "cause": "the Archivist, a lych who keeps the Chained God's charter.",
     "tasks": [
      {
       "attr": "Anima",
       "site": "the scholars' town",
       "text": "find a scholar who knows the archive",
       "encounters": [
        "mad scholars",
        "a rival",
        "a Temptation of knowledge"
       ],
       "fragForm": "Witness",
       "frag": "a scholar who escaped the archive"
      },
      {
       "attr": "Corpus",
       "site": "the flooded halls",
       "text": "swim the halls",
       "encounters": [
        "the drowned",
        "the cold",
        "collapsing shelves"
       ],
       "fragForm": "Mark",
       "frag": "the Dykemasters' seal on the archive doors"
      },
      {
       "attr": "Spiritus",
       "site": "the stacks",
       "text": "read the drowned books",
       "encounters": [
        "the books' guardians",
        "a ward",
        "madness (Spiritus save, Challenging 19, or Confused)"
       ],
       "fragForm": "Vision",
       "frag": "the god, chained"
      },
      {
       "attr": "Corpus",
       "site": "the vault",
       "text": "break into the vault",
       "encounters": [
        "traps",
        "the Archivist's servants",
        "the vault's door"
       ],
       "fragForm": "Relic",
       "frag": "the charter"
      }
     ],
     "causeEncounter": "the Archivist (Tier II)",
     "causeFragForm": "Relic",
     "causeFrag": "the charter that binds the Chained God",
     "thread": true,
     "reckoningTask": 2,
     "omen": "the scholars' town floods",
     "success": "the charter is yours, and the archive's knowledge is free"
    },
    {
     "n": 3,
     "name": "The Lake of Stillness",
     "where": "A great lake and its shores; sites: the lake towns, the islands, the lake's mouth, the lindwyrm's lair.",
     "trouble": "the lake does not flow, and its towns rot in still water.",
     "cause": "a lindwyrm bound across the lake's mouth.",
     "tasks": [
      {
       "attr": "Anima",
       "site": "the lake towns",
       "text": "win the towns' boats",
       "encounters": [
        "lake-lords",
        "a Dykemaster agent",
        "a Witness"
       ],
       "fragForm": "Rumour",
       "frag": "the lake has not moved since the wyrm came"
      },
      {
       "attr": "Corpus",
       "site": "the islands",
       "text": "reach the island shrine",
       "encounters": [
        "the lake's beasts",
        "a storm",
        "the still water"
       ],
       "fragForm": "Mark",
       "frag": "the wyrm's coils have worn the islands smooth"
      },
      {
       "attr": "Spiritus",
       "site": "the lake's mouth",
       "text": "break the binding on the wyrm",
       "encounters": [
        "the binding's guardians",
        "the wyrm's fury",
        "the water"
       ],
       "fragForm": "Witness",
       "frag": "the wyrm, bound and angry"
      },
      {
       "attr": "Corpus",
       "site": "the lair",
       "text": "drive the wyrm out",
       "encounters": [
        "the wyrm",
        "its hoard",
        "the lair"
       ],
       "fragForm": "Relic",
       "frag": "the wyrm's chain"
      }
     ],
     "causeEncounter": "the lindwyrm (Tier II)",
     "causeFragForm": "Witness",
     "causeFrag": "the wyrm, freed, which tells you where the god is chained",
     "thread": true,
     "reckoningTask": 3,
     "omen": "the lake rises over the lake towns",
     "success": "the lake flows, and the towns breathe"
    },
    {
     "n": 4,
     "name": "The Pump-Engines",
     "where": "A region of great pumping engines; sites: the engine towns, the coal pits, the engine-halls, the master engine.",
     "trouble": "great engines pump the lowlands dry, and their smoke chokes the region.",
     "cause": "the Engine-Master, an earth elemental bound to drive the engines.",
     "tasks": [
      {
       "attr": "Anima",
       "site": "the engine towns",
       "text": "turn the engine-workers",
       "encounters": [
        "foremen",
        "a strike",
        "a Dykemaster agent"
       ],
       "fragForm": "Witness",
       "frag": "an engine-worker who has heard the master speak"
      },
      {
       "attr": "Corpus",
       "site": "the coal pits",
       "text": "stop the coal",
       "encounters": [
        "the pits",
        "the miners",
        "a collapse"
       ],
       "fragForm": "Mark",
       "frag": "the coal is stamped with the lock and chain"
      },
      {
       "attr": "Spiritus",
       "site": "the engine-halls",
       "text": "break the engines' bindings",
       "encounters": [
        "the engines",
        "their wards",
        "the steam"
       ],
       "fragForm": "Relic",
       "frag": "an engine's binding plate"
      },
      {
       "attr": "Corpus",
       "site": "the master engine",
       "text": "wreck the master engine",
       "encounters": [
        "guards",
        "the engine's fury",
        "the steam"
       ],
       "fragForm": "Vision",
       "frag": "the engines pumping the sea into the god's prison"
      }
     ],
     "causeEncounter": "the Engine-Master (Tier II)",
     "causeFragForm": "Vision",
     "causeFrag": "the engines feed the god's prison with stillness",
     "thread": true,
     "reckoningTask": 4,
     "omen": "an engine bursts and a town is scalded",
     "success": "the engines stop, and the lowlands begin to flood"
    },
    {
     "n": 5,
     "name": "The Saltworks",
     "where": "A salt-marsh region; sites: the salt pans, the salt towns, the witch's road, the salt-witch's hall.",
     "trouble": "the salt-marsh spreads inland, killing farms.",
     "cause": "the Salt-Witch, who salts the land so the sea can never reclaim it.",
     "tasks": [
      {
       "attr": "Corpus",
       "site": "the salt pans",
       "text": "wreck the salt pans",
       "encounters": [
        "salt-workers",
        "the pans' guards",
        "the brine"
       ],
       "fragForm": "Mark",
       "frag": "the salt is stamped with a lock and chain"
      },
      {
       "attr": "Anima",
       "site": "the salt towns",
       "text": "free the salt towns from the witch",
       "encounters": [
        "her spies",
        "the towns' fear",
        "a Temptation"
       ],
       "fragForm": "Witness",
       "frag": "a salt-worker who saw the witch's face"
      },
      {
       "attr": "Spiritus",
       "site": "the witch's road",
       "text": "follow her road through the salt",
       "encounters": [
        "salt-wights",
        "mirages",
        "the salt itself"
       ],
       "fragForm": "Relic",
       "frag": "a pillar of salt that was a man"
      },
      {
       "attr": "Spiritus",
       "site": "the hall",
       "text": "break the witch's spell",
       "encounters": [
        "her servants",
        "her wards",
        "the witch's glamour"
       ],
       "fragForm": "Vision",
       "frag": "the witch salting the god's prison"
      }
     ],
     "causeEncounter": "the Salt-Witch (Tier II)",
     "causeFragForm": "Relic",
     "causeFrag": "the witch's salt, which seals the god's prison",
     "thread": true,
     "reckoningTask": 5,
     "omen": "a whole town turns to salt",
     "success": "the salt washes away, and the sea comes back"
    },
    {
     "n": 6,
     "name": "The Drowned Temples",
     "where": "A region of sunken temples; sites: the tide-villages, the temple causeway, the drowned temple, the priestess's tower.",
     "trouble": "the old tide-priests are gone, and the tides have stopped.",
     "cause": "the Last Tide-Priestess, turned by the Dykemasters to keep the god asleep.",
     "tasks": [
      {
       "attr": "Anima",
       "site": "the tide-villages",
       "text": "find the last believers",
       "encounters": [
        "the believers",
        "a Dykemaster agent",
        "a Witness"
       ],
       "fragForm": "Witness",
       "frag": "an old woman who still prays to the sea"
      },
      {
       "attr": "Corpus",
       "site": "the temple causeway",
       "text": "cross the causeway at low tide",
       "encounters": [
        "the tide",
        "the drowned",
        "the causeway's traps"
       ],
       "fragForm": "Mark",
       "frag": "the temple's doors are chained"
      },
      {
       "attr": "Spiritus",
       "site": "the drowned temple",
       "text": "wake the temple",
       "encounters": [
        "its guardians",
        "its wards",
        "the god's dreams"
       ],
       "fragForm": "Vision",
       "frag": "the god, chained, dreaming"
      },
      {
       "attr": "Anima",
       "site": "the tower",
       "text": "turn the priestess back",
       "encounters": [
        "her servants",
        "her doubts",
        "a Temptation"
       ],
       "fragForm": "Echo",
       "frag": "you remember being a tide-priest"
      }
     ],
     "causeEncounter": "the Last Tide-Priestess (Tier II)",
     "causeFragForm": "Witness",
     "causeFrag": "the priestess, turned back, teaches you the rite that wakes the god",
     "thread": true,
     "reckoningTask": 6,
     "omen": "the tide does not come in for three days",
     "success": "the tides return, and the temples rise from the water"
    }
   ]
  },
  "reckoning": {
   "name": "The Last Sluice",
   "heart": "a Vision of a dam as tall as a mountain, across the mouth of the world's last river, with a god chained in the dark water behind it.",
   "tasks": [
    {
     "from": 1,
     "attr": "Anima",
     "text": "lead the last of the lowland people to the hills before the dam breaks"
    },
    {
     "from": 2,
     "attr": "Spiritus",
     "text": "unwrite the charter that binds the god"
    },
    {
     "from": 3,
     "attr": "Corpus",
     "text": "ride the freed lindwyrm to the god's chains"
    },
    {
     "from": 4,
     "attr": "Corpus",
     "text": "break the engines that feed the prison its stillness"
    },
    {
     "from": 5,
     "attr": "Spiritus",
     "text": "wash the witch's salt from the prison's seals"
    },
    {
     "from": 6,
     "attr": "Spiritus",
     "text": "wake the god with the tide-priests' rite"
    }
   ],
   "adversary": "the Chained God, wakened and furious, and whatever Dykemaster still holds its chain (Tier III)",
   "success": "the Last Sluice breaks. The Black Tide sweeps the lowlands clean, and when it falls back, it leaves new earth, black and rich, for the people on the hills to come down to"
  }
 },
 {
  "n": 5,
  "name": "The Unfallen King",
  "premise": "The old king should have died a hundred years ago. Instead he hid his death outside his body, the needle in the egg in the duck in the hare in the chest under the oak on the island, and he rules on. The land withers with him: fields fail, wells sour, and his court drinks the life of the realm to stay young beside him. The characters must find the king's death, piece by piece, and deliver it to him, so the land can heal and a new reign begin.",
  "adversary": "Tax-gatherers, heralds and the king's loyal subjects (Might 0). Lieutenants: Undying knights, court physicians and royal judges who share the king's long life (up to Tier I). Champions: the King's Hound, the Lake-Witch, the Queen of the Court and the Seneschal (up to Tier II). The Unfallen King (Tier III).",
  "signature": [
   "A royal tax-gatherer with a cart of life-tithe reliquaries.",
   "A field where nothing has grown for twenty years.",
   "A statue of the king that turns its head to watch you.",
   "A family hiding their firstborn from the king's men.",
   "A beggar who swears he was the king's own son, a century ago.",
   "An Undying knight on a horse that does not breathe."
  ],
  "doomEffect": "You kneel: lose 1 Boon Point, and give up one possession of value as tribute.",
  "lie": "The king is dying of poison, and his heir or a pretender is the poisoner.",
  "heldBy": "A king who has hidden his death, and a land that withers under him",
  "must": "Find the king's death and deliver it to him",
  "adversaryName": "The Undying Court and the Unfallen King",
  "tiers": {
   "Minor": [
    {
     "n": 1,
     "name": "The Life-Tithe of Wick",
     "where": "A farming hamlet.",
     "trouble": "the fields of Wick yield nothing, though the king's tithe is paid each spring.",
     "cause": "the tithe is not grain but life, sealed in a reliquary the tax-gatherer carries to court.",
     "tasks": [
      {
       "attr": "Anima",
       "site": "",
       "text": "persuade the hamlet to refuse the tithe",
       "encounters": [
        "the tax-gatherer and his guards"
       ],
       "fragForm": "Rumour",
       "frag": "a pedlar says every hamlet that pays the tithe grows old early"
      },
      {
       "attr": "Spiritus",
       "site": "",
       "text": "break the reliquary and return its life to the land",
       "encounters": [
        "Hazard: the reliquary's ward (Spiritus save, Average 13, or age 1d6 years)"
       ],
       "fragForm": "Relic",
       "frag": "a silver reliquary, warm and beating"
      }
     ],
     "causeFragForm": "Mark",
     "causeFrag": "the king's seal on the reliquary: a crown over a closed coffin",
     "omen": "the oldest woman in Wick dies on tithe day, and the tax-gatherer smiles",
     "success": "the reliquary breaks, and the fields of Wick green over within a week"
    },
    {
     "n": 2,
     "name": "The Herald's Feast",
     "where": "A hamlet on the king's road.",
     "trouble": "a royal herald demands a feast for the king's honour, and eats and drinks the hamlet bare.",
     "cause": "the herald is an Undying courtier, feeding the court through his belly.",
     "tasks": [
      {
       "attr": "Anima",
       "site": "",
       "text": "shame the herald before the hamlet",
       "encounters": [
        "Witness: the reeve, who is terrified of offending the king"
       ],
       "fragForm": "Witness",
       "frag": "the cook, who has seen the herald eat a whole ox"
      },
      {
       "attr": "Corpus",
       "site": "",
       "text": "drive the herald and his men out",
       "encounters": [
        "the herald's escort"
       ],
       "fragForm": "Mark",
       "frag": "the herald's plates are scraped to the metal"
      }
     ],
     "causeFragForm": "Vision",
     "causeFrag": "the herald's belly is a door, and behind it the king sits feasting",
     "omen": "the hamlet's last cow is slaughtered for the herald's table",
     "success": "the herald flees, and the hamlet keeps its winter stores"
    },
    {
     "n": 3,
     "name": "The King's Image",
     "where": "A village green.",
     "trouble": "the villagers kneel daily before a statue of the king and come away weaker.",
     "cause": "the statue drinks their life for the court.",
     "tasks": [
      {
       "attr": "Anima",
       "site": "",
       "text": "convince the villagers to stop kneeling",
       "encounters": [
        "the village priest, a loyal subject"
       ],
       "fragForm": "Witness",
       "frag": "a child who will not kneel and is the only healthy one in the village"
      },
      {
       "attr": "Corpus",
       "site": "",
       "text": "topple the statue",
       "encounters": [
        "Hazard: the statue fights back (falling stone, 1d6)"
       ],
       "fragForm": "Mark",
       "frag": "the statue's knees are worn by the villagers' kisses"
      }
     ],
     "causeFragForm": "Relic",
     "causeFrag": "a heart of red glass inside the statue",
     "omen": "three villagers die kneeling on the same morning",
     "success": "the statue falls, and the village grows strong again"
    },
    {
     "n": 4,
     "name": "The Firstborn",
     "where": "A hill hamlet.",
     "trouble": "the king's men take every firstborn child for the king's service, and none come back.",
     "cause": "the court physician uses their youth to keep the king young.",
     "tasks": [
      {
       "attr": "Anima",
       "site": "",
       "text": "hide the next firstborn from the king's men",
       "encounters": [
        "the king's men, searching"
       ],
       "fragForm": "Witness",
       "frag": "a mother who has lost two children"
      },
      {
       "attr": "Corpus",
       "site": "",
       "text": "ambush the king's men and free the taken children",
       "encounters": [
        "the king's men in force"
       ],
       "fragForm": "Mark",
       "frag": "a child's bootprint beside the cart tracks"
      }
     ],
     "causeFragForm": "Relic",
     "causeFrag": "the physician's order, signed with the crown over the coffin",
     "omen": "a mother is beaten in the square for hiding her son",
     "success": "the children come home, and the king's men stop coming"
    },
    {
     "n": 5,
     "name": "The Hermit's Riddle",
     "where": "A hermitage in the hills.",
     "trouble": "the king's hounds are hunting a hermit, and every village that shelters him burns.",
     "cause": "the hermit knows the riddle of where the king hid his death.",
     "tasks": [
      {
       "attr": "Corpus",
       "site": "",
       "text": "protect the hermit from the hounds",
       "encounters": [
        "1d3 of the King's hounds (use Hellhound at Might 0)"
       ],
       "fragForm": "Mark",
       "frag": "hound tracks that burn the grass"
      },
      {
       "attr": "Anima",
       "site": "",
       "text": "earn the hermit's trust",
       "encounters": [
        "Witness: the hermit, who tests you with a riddle"
       ],
       "fragForm": "Witness",
       "frag": "a shepherd who fed the hermit"
      }
     ],
     "causeFragForm": "Vision",
     "causeFrag": "the riddle, spoken in your sleep: an oak on an island, and something inside something",
     "omen": "a village burns in the night",
     "success": "the hermit lives, and he tells you the first line of the king's death"
    },
    {
     "n": 6,
     "name": "The Old Soldier",
     "where": "A roadside inn.",
     "trouble": "an old deserter drinks at the inn, and the king's knights are coming for him.",
     "cause": "he saw the king die on a battlefield a hundred years ago, and rise again.",
     "tasks": [
      {
       "attr": "Anima",
       "site": "",
       "text": "get the old soldier's story",
       "encounters": [
        "the innkeeper, who wants the reward"
       ],
       "fragForm": "Rumour",
       "frag": "the inn's drinkers say the old man is a hundred and twenty"
      },
      {
       "attr": "Corpus",
       "site": "",
       "text": "defend the inn against the knights",
       "encounters": [
        "an Undying knight and his squires"
       ],
       "fragForm": "Mark",
       "frag": "the soldier's scar, in the shape of a crown"
      }
     ],
     "causeFragForm": "Witness",
     "causeFrag": "the soldier tells you where the king rose: under an oak",
     "omen": "the knights' horns sound at the edge of the wood",
     "success": "the soldier lives, and dies peacefully a week later, having told what he knows"
    }
   ],
   "Moderate": [
    {
     "n": 1,
     "name": "The Royal Progress",
     "where": "A market town; sites: the town gate, the market square, the lodging house.",
     "trouble": "the king's progress is coming, and every town it passes is drained of life.",
     "cause": "the progress carries an Undying knight who feeds on the crowd.",
     "tasks": [
      {
       "attr": "Anima",
       "site": "the town gate",
       "text": "delay the progress at the gate",
       "encounters": [
        "the progress's heralds",
        "the town's mayor, eager to please"
       ],
       "fragForm": "Witness",
       "frag": "a survivor of the last town the progress passed"
      },
      {
       "attr": "Corpus",
       "site": "the market square",
       "text": "break up the crowd before the knight feeds",
       "encounters": [
        "the crowd",
        "the knight's squires"
       ],
       "fragForm": "Mark",
       "frag": "the crowd's shadows stretch towards the knight"
      },
      {
       "attr": "Spiritus",
       "site": "the lodging house",
       "text": "break the knight's bond to the king",
       "encounters": [
        "the knight's wards",
        "his servants"
       ],
       "fragForm": "Relic",
       "frag": "the knight's token, a ring with the crown over the coffin"
      }
     ],
     "causeEncounter": "the Undying knight (Tier I)",
     "causeFragForm": "Vision",
     "causeFrag": "the knight is one of a hundred, all bound to the king",
     "omen": "the progress's banners appear on the hill above the town",
     "success": "the progress turns back, and the town lives"
    },
    {
     "n": 2,
     "name": "The Tournament of Ashes",
     "where": "A city; sites: the lists, the champions' tents, the royal box.",
     "trouble": "the king's tournament draws the bravest of the realm, and the winners are never seen again.",
     "cause": "the tournament's master feeds the champions to the king.",
     "tasks": [
      {
       "attr": "Corpus",
       "site": "the lists",
       "text": "win your way to the final",
       "encounters": [
        "other champions",
        "a rigged joust"
       ],
       "fragForm": "Rumour",
       "frag": "last year's winner was seen at court, aged sixty"
      },
      {
       "attr": "Anima",
       "site": "the champions' tents",
       "text": "warn the other champions",
       "encounters": [
        "the master's spies",
        "a proud champion"
       ],
       "fragForm": "Witness",
       "frag": "a squire whose knight won last year"
      },
      {
       "attr": "Spiritus",
       "site": "the royal box",
       "text": "break the box's binding",
       "encounters": [
        "the master's guards",
        "the box's ward"
       ],
       "fragForm": "Mark",
       "frag": "the royal box's throne is set over a well of ashes"
      }
     ],
     "causeEncounter": "the tournament master (Tier I)",
     "causeFragForm": "Relic",
     "causeFrag": "the tournament's prize, a cup that drinks life",
     "omen": "the final is announced for dawn",
     "success": "the tournament ends, and the champions go home"
    },
    {
     "n": 3,
     "name": "The Court of Petitions",
     "where": "A city; sites: the courthouse, the petitioners' quarter, the judge's chambers.",
     "trouble": "those who petition the king's court come away years older.",
     "cause": "an Undying judge who takes a year from every petition.",
     "tasks": [
      {
       "attr": "Anima",
       "site": "the petitioners' quarter",
       "text": "warn the petitioners",
       "encounters": [
        "lawyers",
        "a desperate petitioner"
       ],
       "fragForm": "Witness",
       "frag": "a girl who aged ten years in a morning"
      },
      {
       "attr": "Corpus",
       "site": "the courthouse",
       "text": "disrupt the court",
       "encounters": [
        "bailiffs",
        "a riot"
       ],
       "fragForm": "Mark",
       "frag": "the courtroom's floor is worn into a channel"
      },
      {
       "attr": "Spiritus",
       "site": "the judge's chambers",
       "text": "find the judge's stolen years",
       "encounters": [
        "the chambers' wards",
        "the judge's clerk"
       ],
       "fragForm": "Relic",
       "frag": "a jar of years"
      }
     ],
     "causeEncounter": "the Undying judge (Tier I)",
     "causeFragForm": "Witness",
     "causeFrag": "the judge's clerk, who knows the judge was appointed a century ago",
     "omen": "an old man dies in the dock",
     "success": "the court closes, and the years return"
    },
    {
     "n": 4,
     "name": "The Leper Town",
     "where": "A walled town of the sick; sites: the lazar house, the town walls, the physician's house.",
     "trouble": "the sick of the realm are sent here, and none recover.",
     "cause": "the king's physician drains them to keep the king alive.",
     "tasks": [
      {
       "attr": "Spiritus",
       "site": "the lazar house",
       "text": "heal the sick",
       "encounters": [
        "the sickness",
        "the despair"
       ],
       "fragForm": "Witness",
       "frag": "a nun who has seen the physician's carts"
      },
      {
       "attr": "Corpus",
       "site": "the walls",
       "text": "break the town's walls so the sick can leave",
       "encounters": [
        "guards",
        "the walls"
       ],
       "fragForm": "Mark",
       "frag": "the walls are built to keep the sick in, not the world out"
      },
      {
       "attr": "Anima",
       "site": "the physician's house",
       "text": "expose the physician",
       "encounters": [
        "his servants",
        "his patients"
       ],
       "fragForm": "Relic",
       "frag": "the physician's case of vials"
      }
     ],
     "causeEncounter": "the physician (Tier I)",
     "causeFragForm": "Vision",
     "causeFrag": "the physician at the king's bedside, pouring the vials into him",
     "omen": "the physician's carts arrive for the sick",
     "success": "the sick go free, and some recover"
    },
    {
     "n": 5,
     "name": "The Granary of the Crown",
     "where": "A farming district; sites: the royal granary, the villages, the steward's manor.",
     "trouble": "the villages starve while the royal granary overflows.",
     "cause": "the royal steward hoards the grain to feed the king's court.",
     "tasks": [
      {
       "attr": "Corpus",
       "site": "the granary",
       "text": "break into the granary",
       "encounters": [
        "guards",
        "the granary's locks"
       ],
       "fragForm": "Mark",
       "frag": "the granary is full of rotting grain"
      },
      {
       "attr": "Anima",
       "site": "the villages",
       "text": "distribute the grain fairly",
       "encounters": [
        "hungry mobs",
        "a hoarding merchant"
       ],
       "fragForm": "Witness",
       "frag": "a villager who worked at the granary"
      },
      {
       "attr": "Spiritus",
       "site": "the steward's manor",
       "text": "break the steward's bond to the king",
       "encounters": [
        "the steward's wards",
        "his servants"
       ],
       "fragForm": "Relic",
       "frag": "the steward's key to the court"
      }
     ],
     "causeEncounter": "the steward (Tier I)",
     "causeFragForm": "Rumour",
     "causeFrag": "the steward has served three kings, and they are all the same king",
     "omen": "a village starves to death in a single winter week",
     "success": "the grain is shared, and the villages survive"
    },
    {
     "n": 6,
     "name": "The Mourning Bells",
     "where": "A town; sites: the bell tower, the graveyard, the knight's hall.",
     "trouble": "mourning is forbidden by royal decree, and the dead are buried in silence.",
     "cause": "an Undying knight enforcing the decree, because grief weakens the king.",
     "tasks": [
      {
       "attr": "Anima",
       "site": "the town",
       "text": "convince the townsfolk to mourn openly",
       "encounters": [
        "the knight's spies",
        "the town's fear"
       ],
       "fragForm": "Witness",
       "frag": "a widow who was whipped for weeping"
      },
      {
       "attr": "Corpus",
       "site": "the bell tower",
       "text": "ring the mourning bells",
       "encounters": [
        "guards",
        "the tower's climb"
       ],
       "fragForm": "Mark",
       "frag": "the bells' ropes have been cut"
      },
      {
       "attr": "Spiritus",
       "site": "the graveyard",
       "text": "lay the unmourned dead",
       "encounters": [
        "the restless dead",
        "the knight's ward"
       ],
       "fragForm": "Vision",
       "frag": "the dead, waiting for their mourning"
      }
     ],
     "causeEncounter": "the Undying knight (Tier I)",
     "causeFragForm": "Relic",
     "causeFrag": "the decree, signed by the king himself",
     "omen": "a child is buried in silence",
     "success": "the bells ring, the town mourns, and the king feels it"
    }
   ],
   "Major": [
    {
     "n": 1,
     "name": "The Isle of the Oak",
     "where": "A lake region; sites: the lake towns, the ferry, the island, the oak.",
     "trouble": "the lake towns are ruled by a giant who guards the island.",
     "cause": "the Oak's Guardian, a giant bound by the king.",
     "tasks": [
      {
       "attr": "Anima",
       "site": "the lake towns",
       "text": "find a guide to the island",
       "encounters": [
        "the giant's spies",
        "a frightened ferryman",
        "a Witness"
       ],
       "fragForm": "Rumour",
       "frag": "the island is never visited"
      },
      {
       "attr": "Corpus",
       "site": "the ferry",
       "text": "cross the lake",
       "encounters": [
        "storms",
        "lake beasts",
        "the giant's boats"
       ],
       "fragForm": "Mark",
       "frag": "the island's shore is littered with bones"
      },
      {
       "attr": "Spiritus",
       "site": "the island",
       "text": "break the island's ward",
       "encounters": [
        "wards",
        "the island's spirits",
        "a Temptation"
       ],
       "fragForm": "Vision",
       "frag": "the oak, and something buried beneath it"
      },
      {
       "attr": "Corpus",
       "site": "the oak",
       "text": "dig beneath the oak",
       "encounters": [
        "the oak's roots",
        "the giant's hounds",
        "the oak itself"
       ],
       "fragForm": "Relic",
       "frag": "the chest's key"
      }
     ],
     "causeEncounter": "the Oak's Guardian (Tier II)",
     "causeFragForm": "Relic",
     "causeFrag": "the oak's root, which holds the shape of the king's death",
     "thread": true,
     "reckoningTask": 1,
     "omen": "the lake freezes in midsummer",
     "success": "the giant falls, and the lake towns are free"
    },
    {
     "n": 2,
     "name": "The Iron Chest",
     "where": "A mountain region; sites: the mining towns, the deep road, the vault, the chest.",
     "trouble": "the mountain's mines have been seized by the king's men, who dig for something.",
     "cause": "the Chest's Warden, a Greater demon bound by the king.",
     "tasks": [
      {
       "attr": "Anima",
       "site": "the mining towns",
       "text": "win the miners' help",
       "encounters": [
        "the king's men",
        "miners who will not talk",
        "a Witness"
       ],
       "fragForm": "Witness",
       "frag": "a miner who saw the chest"
      },
      {
       "attr": "Corpus",
       "site": "the deep road",
       "text": "travel the deep road",
       "encounters": [
        "collapses",
        "deep beasts",
        "the king's men"
       ],
       "fragForm": "Mark",
       "frag": "the chest's chains run through the rock"
      },
      {
       "attr": "Spiritus",
       "site": "the vault",
       "text": "break the vault's wards",
       "encounters": [
        "wards",
        "the demon's servants",
        "a Temptation"
       ],
       "fragForm": "Vision",
       "frag": "the chest, and the hare within it"
      },
      {
       "attr": "Corpus",
       "site": "the chest",
       "text": "open the chest",
       "encounters": [
        "the chest's traps",
        "the demon's fury",
        "the chest's chains"
       ],
       "fragForm": "Relic",
       "frag": "a lock of the chest"
      }
     ],
     "causeEncounter": "the Chest's Warden (Tier II)",
     "causeFragForm": "Relic",
     "causeFrag": "the iron chest itself, cold as death",
     "thread": true,
     "reckoningTask": 2,
     "omen": "the mountain shakes, and a mining town falls",
     "success": "the mines are free, and the chest is open"
    },
    {
     "n": 3,
     "name": "The Hare of the Long Fields",
     "where": "A plains region; sites: the farmsteads, the hunting grounds, the warren, the hare's hill.",
     "trouble": "the King's Hound hunts the plains, and the farmers flee.",
     "cause": "the King's Hound, guarding the hare.",
     "tasks": [
      {
       "attr": "Anima",
       "site": "the farmsteads",
       "text": "shelter the farmers",
       "encounters": [
        "the hound's pack",
        "frightened farmers",
        "a traitor"
       ],
       "fragForm": "Witness",
       "frag": "a farmer who saw a hare outrun the hound"
      },
      {
       "attr": "Corpus",
       "site": "the hunting grounds",
       "text": "survive the hound's hunt",
       "encounters": [
        "the pack",
        "the plains",
        "the hound's scent"
       ],
       "fragForm": "Mark",
       "frag": "the hare's tracks, which glow"
      },
      {
       "attr": "Spiritus",
       "site": "the warren",
       "text": "find the hare's warren",
       "encounters": [
        "the warren's spirits",
        "a ward",
        "the hare's tricks"
       ],
       "fragForm": "Vision",
       "frag": "the hare, with a duck in its belly"
      },
      {
       "attr": "Corpus",
       "site": "the hare's hill",
       "text": "catch the hare",
       "encounters": [
        "the hare's speed",
        "the hound",
        "the hill"
       ],
       "fragForm": "Relic",
       "frag": "the hare's foot"
      }
     ],
     "causeEncounter": "the King's Hound (Tier II)",
     "causeFragForm": "Relic",
     "causeFrag": "the hare, caught and still",
     "thread": true,
     "reckoningTask": 3,
     "omen": "the hound's howl is heard in every farmstead",
     "success": "the hound falls, and the plains are safe"
    },
    {
     "n": 4,
     "name": "The Duck of the Black Lake",
     "where": "A fen region; sites: the fen villages, the reed maze, the lake, the witch's hut.",
     "trouble": "the fen's waters are black, and its people are cursed.",
     "cause": "the Lake-Witch, the king's ally, guarding the duck.",
     "tasks": [
      {
       "attr": "Anima",
       "site": "the fen villages",
       "text": "lift the curse from the villages",
       "encounters": [
        "the cursed",
        "the witch's spies",
        "a Witness"
       ],
       "fragForm": "Witness",
       "frag": "a villager who saw a duck fly from the hare"
      },
      {
       "attr": "Corpus",
       "site": "the reed maze",
       "text": "navigate the maze",
       "encounters": [
        "the maze",
        "the fen's beasts",
        "the witch's traps"
       ],
       "fragForm": "Mark",
       "frag": "the duck's feathers in the reeds"
      },
      {
       "attr": "Spiritus",
       "site": "the lake",
       "text": "break the lake's curse",
       "encounters": [
        "the curse",
        "the drowned",
        "the witch's ward"
       ],
       "fragForm": "Vision",
       "frag": "the duck, with an egg inside it"
      },
      {
       "attr": "Corpus",
       "site": "the witch's hut",
       "text": "steal the duck",
       "encounters": [
        "the witch's servants",
        "her traps",
        "the duck's flight"
       ],
       "fragForm": "Relic",
       "frag": "the duck's feather"
      }
     ],
     "causeEncounter": "the Lake-Witch (Tier II)",
     "causeFragForm": "Relic",
     "causeFrag": "the duck, caught and still",
     "thread": true,
     "reckoningTask": 4,
     "omen": "the lake turns black overnight",
     "success": "the curse lifts, and the lake clears"
    },
    {
     "n": 5,
     "name": "The Egg in the Rookery",
     "where": "A crag region; sites: the crag villages, the cliffs, the rookery, the Queen's tower.",
     "trouble": "the Queen of the Court feeds on the crag villages.",
     "cause": "the Queen, a vampire, guarding the egg.",
     "tasks": [
      {
       "attr": "Anima",
       "site": "the crag villages",
       "text": "protect the villages from the Queen",
       "encounters": [
        "the Queen's thralls",
        "the villagers' fear",
        "a Witness"
       ],
       "fragForm": "Witness",
       "frag": "a thrall who escaped"
      },
      {
       "attr": "Corpus",
       "site": "the cliffs",
       "text": "climb the cliffs",
       "encounters": [
        "the cliffs",
        "the rooks",
        "the Queen's guards"
       ],
       "fragForm": "Mark",
       "frag": "the rookery's nests are made of bones"
      },
      {
       "attr": "Spiritus",
       "site": "the rookery",
       "text": "break the rookery's ward",
       "encounters": [
        "the ward",
        "the rooks",
        "a Temptation"
       ],
       "fragForm": "Vision",
       "frag": "the egg, with a needle inside it"
      },
      {
       "attr": "Corpus",
       "site": "the Queen's tower",
       "text": "take the egg from the Queen's tower",
       "encounters": [
        "her servants",
        "her traps",
        "the Queen's hunger"
       ],
       "fragForm": "Relic",
       "frag": "an eggshell"
      }
     ],
     "causeEncounter": "the Queen of the Court (Tier II)",
     "causeFragForm": "Relic",
     "causeFrag": "the egg, whole and cold",
     "thread": true,
     "reckoningTask": 5,
     "omen": "the rooks blacken the sky",
     "success": "the Queen falls, and the villages are free"
    },
    {
     "n": 6,
     "name": "The Needle at the Palace",
     "where": "The capital region; sites: the city, the palace gate, the throne room, the treasury.",
     "trouble": "the capital is a city of the half-dead, ruled by the Seneschal in the king's name.",
     "cause": "the Seneschal, who guards the needle.",
     "tasks": [
      {
       "attr": "Anima",
       "site": "the city",
       "text": "raise the city against the Seneschal",
       "encounters": [
        "his spies",
        "the half-dead",
        "a Temptation"
       ],
       "fragForm": "Witness",
       "frag": "a courtier who wants to die"
      },
      {
       "attr": "Corpus",
       "site": "the palace gate",
       "text": "break into the palace",
       "encounters": [
        "the guards",
        "the gate",
        "the palace's traps"
       ],
       "fragForm": "Mark",
       "frag": "the palace's floors are worn by a century of the same footsteps"
      },
      {
       "attr": "Spiritus",
       "site": "the throne room",
       "text": "break the throne room's ward",
       "encounters": [
        "the ward",
        "the court",
        "the king's shadow"
       ],
       "fragForm": "Vision",
       "frag": "the needle, and the king's death on its point"
      },
      {
       "attr": "Corpus",
       "site": "the treasury",
       "text": "steal the needle",
       "encounters": [
        "the treasury's guards",
        "its traps",
        "the Seneschal"
       ],
       "fragForm": "Relic",
       "frag": "the needle's case"
      }
     ],
     "causeEncounter": "the Seneschal (Tier II)",
     "causeFragForm": "Relic",
     "causeFrag": "the needle, the king's death itself",
     "thread": true,
     "reckoningTask": 6,
     "omen": "the city's bells ring for a coronation that never comes",
     "success": "the Seneschal falls, and the city wakes"
    }
   ]
  },
  "reckoning": {
   "name": "The King's Death",
   "heart": "a Vision of the king's hall, its throne room heaped with a century of tribute, the king on his throne, young and beautiful and rotting underneath.",
   "tasks": [
    {
     "from": 1,
     "attr": "Spiritus",
     "text": "speak the shape of the king's death, from the oak's root, aloud in his hall"
    },
    {
     "from": 2,
     "attr": "Corpus",
     "text": "carry the iron chest through the king's guard"
    },
    {
     "from": 3,
     "attr": "Corpus",
     "text": "loose the hare in the hall, where the king's hounds will chase it"
    },
    {
     "from": 4,
     "attr": "Anima",
     "text": "hold the court back while the duck is opened"
    },
    {
     "from": 5,
     "attr": "Spiritus",
     "text": "break the egg without breaking the needle"
    },
    {
     "from": 6,
     "attr": "Corpus",
     "text": "drive the needle into the king's heart"
    }
   ],
   "adversary": "the Unfallen King (Tier III)",
   "success": "the king dies, a hundred years late. His court crumbles to dust around him, and the land breathes. The first rain in years falls on the fields"
  }
 },
 {
  "n": 6,
  "name": "The Sleeping Devourer",
  "premise": "At the end of every age, the Devourer wakes, eats what is old and spent, and the world is remade from what it leaves. This age has run past its end because the Devourer is being sung to sleep. The Lullaby Choir sings it a lullaby without end, in a thousand chapels and on a thousand hills, and the world hangs in a long, grey twilight where nothing finishes and nothing begins. The characters must unsing the lullaby, verse by verse, and wake the Devourer.",
  "adversary": "Choristers, cantors and the people soothed by the song (Might 0). Lieutenants: choirmasters, sylph singers and the drakes they keep asleep (up to Tier I). Champions: the Organist, the Bell-Wyrm, the Silent Abbess and the Precentor (up to Tier II). The Cantor, who first sang the lullaby (Tier III).",
  "signature": [
   "A chorister humming at a crossroads, and everyone who passes yawns.",
   "A whole hamlet asleep in mid-step.",
   "A tremor in the earth as the Devourer turns over in its sleep.",
   "A dragonkin pilgrim who wants the Devourer woken and will help, for a price.",
   "A lullaby that sticks in your head (Anima save, Average 13, or Distracted for 1 Watch).",
   "A Choir knight with a sword like a tuning fork, which hums when drawn."
  ],
  "doomEffect": "The lullaby takes you: you are Exhausted until your next Full Rest.",
  "lie": "The tremors are attacks: the Devourer is the monster, and it must be slain, not woken.",
  "heldBy": "The Devourer that must eat the old age, sung asleep",
  "must": "Unsing the lullaby and wake the Devourer",
  "adversaryName": "The Lullaby Choir and the Cantor",
  "tiers": {
   "Minor": [
    {
     "n": 1,
     "name": "The Lullaby of Dunmere",
     "where": "A lake hamlet.",
     "trouble": "the whole hamlet sleeps from dusk to noon and grows thinner every day.",
     "cause": "a chorister sings to them every night from the reeds.",
     "tasks": [
      {
       "attr": "Anima",
       "site": "",
       "text": "wake the hamlet's headwoman and make her listen",
       "encounters": [
        "Hazard: the song itself (Anima save, Average 13, or fall asleep)"
       ],
       "fragForm": "Witness",
       "frag": "the one child who cannot hear, and stays awake"
      },
      {
       "attr": "Corpus",
       "site": "",
       "text": "catch the singer in the reeds",
       "encounters": [
        "the chorister and her two guards"
       ],
       "fragForm": "Mark",
       "frag": "footprints in the reed bed, always in the same place"
      }
     ],
     "causeFragForm": "Relic",
     "causeFrag": "a hymnal of lullabies with the Choir's mark: an open mouth inside a closed eye",
     "omen": "a fisherman falls asleep in his boat and drowns",
     "success": "the singing stops, and the hamlet wakes hungry and alive"
    },
    {
     "n": 2,
     "name": "The Stopped Clock of Thane",
     "where": "A market village.",
     "trouble": "since the village clock stopped, the days have stretched; a day lasts two, and the harvest never comes in.",
     "cause": "the Choir hung a tuning stone in the clock tower to slow the hours.",
     "tasks": [
      {
       "attr": "Corpus",
       "site": "",
       "text": "climb the tower and cut down the tuning stone",
       "encounters": [
        "Hazard: the tower stairs are rotten (Corpus save, Average 13, or fall 1d6)"
       ],
       "fragForm": "Mark",
       "frag": "the clock's hands are bound with silver wire"
      },
      {
       "attr": "Anima",
       "site": "",
       "text": "find who let the Choir into the tower",
       "encounters": [
        "the clock-keeper, ashamed"
       ],
       "fragForm": "Witness",
       "frag": "a child who saw singers on the tower"
      }
     ],
     "causeFragForm": "Relic",
     "causeFrag": "the tuning stone, humming one long note",
     "omen": "the sun stands still at noon for an hour",
     "success": "the clock strikes, and the days run at their proper length"
    },
    {
     "n": 3,
     "name": "The Drake's Egg",
     "where": "A hill hamlet.",
     "trouble": "a drake's egg found in a hill cave has drawn the Choir, who want it kept sleeping; their singing sends the hamlet's cattle to sleep where they stand.",
     "cause": "the egg is a child of the Devourer's line.",
     "tasks": [
      {
       "attr": "Corpus",
       "site": "",
       "text": "protect the egg from the choristers",
       "encounters": [
        "choristers with cudgels"
       ],
       "fragForm": "Witness",
       "frag": "the shepherd who found the egg"
      },
      {
       "attr": "Spiritus",
       "site": "",
       "text": "wake the egg so it hatches",
       "encounters": [
        "Temptation: the choristers offer a fortune for it"
       ],
       "fragForm": "Vision",
       "frag": "a dragon dreams in the egg, and it dreams of its mother's hunger"
      }
     ],
     "causeFragForm": "Mark",
     "causeFrag": "the Choir's open-mouth sign painted at the cave mouth",
     "omen": "the egg cracks, but nothing comes out",
     "success": "the drake hatches and flies away; the cattle wake"
    },
    {
     "n": 4,
     "name": "The Silent Mill",
     "where": "A mill hamlet.",
     "trouble": "the mill makes no sound, and neither does anyone in the hamlet; they have lost their voices.",
     "cause": "a hush-charm hung by the Choir to stop any song but theirs.",
     "tasks": [
      {
       "attr": "Anima",
       "site": "",
       "text": "make the hamlet understand what has happened without words",
       "encounters": [
        "Witness: the miller, who writes"
       ],
       "fragForm": "Relic",
       "frag": "a slate covered in the miller's frantic writing"
      },
      {
       "attr": "Spiritus",
       "site": "",
       "text": "break the hush-charm",
       "encounters": [
        "the charm's guardian, a lesser sylph"
       ],
       "fragForm": "Mark",
       "frag": "a silver bell with no clapper, hung over the millrace"
      }
     ],
     "causeFragForm": "Witness",
     "causeFrag": "a pedlar who sold the Choir the bell",
     "omen": "a child falls in the millrace, and no one can call for help",
     "success": "the hamlet shouts and sings, and the mill clatters again"
    },
    {
     "n": 5,
     "name": "The Sleeping Pilgrims",
     "where": "A shrine.",
     "trouble": "pilgrims who pray at the shrine fall asleep and do not wake.",
     "cause": "the shrine's incense comes from the Choir.",
     "tasks": [
      {
       "attr": "Spiritus",
       "site": "",
       "text": "wake the sleeping pilgrims",
       "encounters": [
        "the pilgrims' dreams, which do not want to let go"
       ],
       "fragForm": "Vision",
       "frag": "the pilgrims dream of a giant asleep under the world"
      },
      {
       "attr": "Anima",
       "site": "",
       "text": "find who sells the incense",
       "encounters": [
        "the shrine-keeper, who profits"
       ],
       "fragForm": "Relic",
       "frag": "a block of the incense, sweet and grey"
      }
     ],
     "causeFragForm": "Rumour",
     "causeFrag": "an incense-trader says the Choir pays in gold for every shrine it supplies",
     "omen": "a pilgrim dies in her sleep, smiling",
     "success": "the pilgrims wake, and the shrine burns clean incense"
    },
    {
     "n": 6,
     "name": "The Shepherd's Song",
     "where": "A highland steading.",
     "trouble": "the flocks sleep in the fields, and the wolves take them.",
     "cause": "a sylph bound by the Choir sings across the hills.",
     "tasks": [
      {
       "attr": "Corpus",
       "site": "",
       "text": "drive off the wolves",
       "encounters": [
        "a wolf pack"
       ],
       "fragForm": "Mark",
       "frag": "sleeping sheep in a perfect circle around a stone"
      },
      {
       "attr": "Spiritus",
       "site": "",
       "text": "free the sylph",
       "encounters": [
        "the sylph herself"
       ],
       "fragForm": "Witness",
       "frag": "the shepherd's son, who has heard her weeping"
      }
     ],
     "causeFragForm": "Relic",
     "causeFrag": "the sylph's binding, a silver tuning fork",
     "omen": "the shepherd himself falls asleep on the hill",
     "success": "the sylph flies free, and the flocks wake"
    }
   ],
   "Moderate": [
    {
     "n": 1,
     "name": "The Cathedral Choir of Cantwell",
     "where": "A cathedral city; sites: the cathedral, the song school, the choirmaster's house.",
     "trouble": "the cathedral's choir sings day and night, and the city grows grey, slow and listless.",
     "cause": "the choirmaster leads a cell of the Lullaby Choir.",
     "tasks": [
      {
       "attr": "Anima",
       "site": "the song school",
       "text": "turn the choirboys",
       "encounters": [
        "the school's masters",
        "a boy who loves the song"
       ],
       "fragForm": "Witness",
       "frag": "a choirboy who ran away"
      },
      {
       "attr": "Corpus",
       "site": "the cathedral",
       "text": "stop the singing",
       "encounters": [
        "the choir's guards",
        "the cathedral's crowds"
       ],
       "fragForm": "Mark",
       "frag": "the choir stalls are worn smooth by a century of singing"
      },
      {
       "attr": "Spiritus",
       "site": "the choirmaster's house",
       "text": "break the song's hold on the city",
       "encounters": [
        "the house's wards",
        "a Temptation of rest"
       ],
       "fragForm": "Relic",
       "frag": "the choirmaster's score"
      }
     ],
     "causeEncounter": "the choirmaster (Tier I)",
     "causeFragForm": "Vision",
     "causeFrag": "the song, spreading from the cathedral like a grey mist",
     "omen": "the city's market falls asleep at noon",
     "success": "the song stops, and Cantwell wakes"
    },
    {
     "n": 2,
     "name": "The Bards' Guild of Lyre",
     "where": "A town; sites: the guildhall, the taverns, the guildmaster's house.",
     "trouble": "the town's songs dull the mind, and its people stop working.",
     "cause": "the guildmaster teaches the Choir's songs.",
     "tasks": [
      {
       "attr": "Anima",
       "site": "the taverns",
       "text": "teach the town a song of your own",
       "encounters": [
        "guild bards",
        "a rival"
       ],
       "fragForm": "Rumour",
       "frag": "a bard says the guild's songs all have the same tune underneath"
      },
      {
       "attr": "Corpus",
       "site": "the guildhall",
       "text": "steal the guild's songbooks",
       "encounters": [
        "the guild's guards",
        "the guildhall's locks"
       ],
       "fragForm": "Relic",
       "frag": "a songbook with the Choir's mark"
      },
      {
       "attr": "Spiritus",
       "site": "the guildmaster's house",
       "text": "break the guildmaster's binding",
       "encounters": [
        "his wards",
        "his sylph"
       ],
       "fragForm": "Witness",
       "frag": "his apprentice"
      }
     ],
     "causeEncounter": "the guildmaster (Tier I)",
     "causeFragForm": "Vision",
     "causeFrag": "the guildmaster, singing to something under the town",
     "omen": "the town's mill stops because the miller would rather listen",
     "success": "the town sings its own songs, and works again"
    },
    {
     "n": 3,
     "name": "The Sleeping Drakes of Cinder Hill",
     "where": "A hill district; sites: the drake caves, the hill villages, the keeper's tower.",
     "trouble": "the district's drakes are sung asleep, and the hills are overrun by the beasts they once hunted.",
     "cause": "a drake-keeper who serves the Choir.",
     "tasks": [
      {
       "attr": "Corpus",
       "site": "the hill villages",
       "text": "defend the villages from the beasts",
       "encounters": [
        "wolves",
        "giant boars"
       ],
       "fragForm": "Witness",
       "frag": "a villager who remembers the drakes"
      },
      {
       "attr": "Spiritus",
       "site": "the drake caves",
       "text": "wake the drakes",
       "encounters": [
        "the drakes, groggy and dangerous",
        "the song"
       ],
       "fragForm": "Vision",
       "frag": "the drakes dream of their mother"
      },
      {
       "attr": "Anima",
       "site": "the keeper's tower",
       "text": "turn the keeper",
       "encounters": [
        "the keeper's guards",
        "a Temptation"
       ],
       "fragForm": "Mark",
       "frag": "the keeper's tower bears the Choir's mark"
      }
     ],
     "causeEncounter": "the drake-keeper (Tier I)",
     "causeFragForm": "Relic",
     "causeFrag": "the keeper's flute",
     "omen": "a village is overrun",
     "success": "the drakes wake, and the hills are theirs again"
    },
    {
     "n": 4,
     "name": "The Hushed Valley",
     "where": "A valley district; sites: the valley towns, the waterfall, the sylph lord's hall.",
     "trouble": "no sound carries in the valley; people cannot hear warnings, and accidents are many.",
     "cause": "a sylph lord who serves the Choir.",
     "tasks": [
      {
       "attr": "Anima",
       "site": "the valley towns",
       "text": "organise the towns in silence",
       "encounters": [
        "confusion",
        "panic"
       ],
       "fragForm": "Witness",
       "frag": "a deaf woman who has always lived this way and can teach others"
      },
      {
       "attr": "Corpus",
       "site": "the waterfall",
       "text": "reach the waterfall, which should roar",
       "encounters": [
        "the valley's dangers",
        "the falls"
       ],
       "fragForm": "Mark",
       "frag": "the waterfall's stones bear the Choir's mark"
      },
      {
       "attr": "Spiritus",
       "site": "the sylph lord's hall",
       "text": "break the sylph lord's hush",
       "encounters": [
        "his servants",
        "his wards"
       ],
       "fragForm": "Relic",
       "frag": "a jar of trapped sound"
      }
     ],
     "causeEncounter": "the sylph lord (Tier I)",
     "causeFragForm": "Vision",
     "causeFrag": "the sylph lord, singing to the Devourer",
     "omen": "an avalanche falls in silence",
     "success": "the valley roars with sound again"
    },
    {
     "n": 5,
     "name": "The Lullaby Fair",
     "where": "A city; sites: the fair, the artificers' quarter, the workshop.",
     "trouble": "music boxes sold at the fair send households to sleep.",
     "cause": "an artificer who makes them for the Choir.",
     "tasks": [
      {
       "attr": "Anima",
       "site": "the fair",
       "text": "warn the buyers",
       "encounters": [
        "the sellers",
        "an eager buyer"
       ],
       "fragForm": "Relic",
       "frag": "a music box that plays the lullaby"
      },
      {
       "attr": "Corpus",
       "site": "the artificers' quarter",
       "text": "break up the trade",
       "encounters": [
        "the artificer's guards",
        "a workshop fire"
       ],
       "fragForm": "Mark",
       "frag": "the boxes are stamped with the Choir's mark"
      },
      {
       "attr": "Spiritus",
       "site": "the workshop",
       "text": "break the boxes' enchantment",
       "encounters": [
        "the workshop's wards",
        "clockwork guards"
       ],
       "fragForm": "Witness",
       "frag": "an apprentice who knows the secret"
      }
     ],
     "causeEncounter": "the artificer (Tier I)",
     "causeFragForm": "Vision",
     "causeFrag": "the boxes, singing to the Devourer",
     "omen": "a whole street sleeps through a fire",
     "success": "the boxes are broken, and the city wakes"
    },
    {
     "n": 6,
     "name": "The Monastery of Silence",
     "where": "A monastery and its lands; sites: the monastery, the cloister, the abbot's cell.",
     "trouble": "the monks have taken a vow of silence, and so must the valley around them; anyone who speaks is punished.",
     "cause": "an abbot who serves the Choir.",
     "tasks": [
      {
       "attr": "Anima",
       "site": "the valley",
       "text": "encourage the valley to speak",
       "encounters": [
        "the monks' enforcers",
        "the valley's fear"
       ],
       "fragForm": "Witness",
       "frag": "a woman who spoke and was punished"
      },
      {
       "attr": "Corpus",
       "site": "the cloister",
       "text": "break the cloister's silence",
       "encounters": [
        "the monks",
        "the cloister's guards"
       ],
       "fragForm": "Mark",
       "frag": "the cloister walls bear the Choir's mark"
      },
      {
       "attr": "Spiritus",
       "site": "the abbot's cell",
       "text": "break the abbot's vow",
       "encounters": [
        "his wards",
        "his doubts"
       ],
       "fragForm": "Relic",
       "frag": "the abbot's rosary of silver bells with no clappers"
      }
     ],
     "causeEncounter": "the abbot (Tier I)",
     "causeFragForm": "Vision",
     "causeFrag": "the abbot, singing alone at night",
     "omen": "a monk is punished for laughing",
     "success": "the monks speak, and the valley sings"
    }
   ],
   "Major": [
    {
     "n": 1,
     "name": "The Singing Mountains",
     "where": "A mountain region; sites: the mountain villages, the pass, the organ pipes, the organ loft.",
     "trouble": "the mountains sing day and night, and the villages are lost in sleep.",
     "cause": "the Organist, who plays the mountains like a great organ.",
     "tasks": [
      {
       "attr": "Anima",
       "site": "the mountain villages",
       "text": "wake the villages",
       "encounters": [
        "the song",
        "the sleepers",
        "the Organist's spies"
       ],
       "fragForm": "Witness",
       "frag": "a villager who woke"
      },
      {
       "attr": "Corpus",
       "site": "the pass",
       "text": "cross the singing pass",
       "encounters": [
        "the song",
        "avalanches",
        "the Organist's guards"
       ],
       "fragForm": "Mark",
       "frag": "the mountains are pierced by great pipes"
      },
      {
       "attr": "Spiritus",
       "site": "the organ pipes",
       "text": "silence the pipes",
       "encounters": [
        "the pipes' wards",
        "the pipes' song",
        "bound sylphs"
       ],
       "fragForm": "Vision",
       "frag": "the Organist playing"
      },
      {
       "attr": "Corpus",
       "site": "the organ loft",
       "text": "reach the organ loft",
       "encounters": [
        "traps",
        "the Organist's servants",
        "the song's power"
       ],
       "fragForm": "Relic",
       "frag": "the organ's stop"
      }
     ],
     "causeEncounter": "the Organist (Tier II)",
     "causeFragForm": "Relic",
     "causeFrag": "the first verse, written on the organ's score",
     "thread": true,
     "reckoningTask": 1,
     "omen": "the mountains sing so loud the villages sleep for a week",
     "success": "the mountains fall silent, and the villages wake"
    },
    {
     "n": 2,
     "name": "The Bell-Wyrm",
     "where": "A highland region; sites: the steadings, the bell road, the bell-tower ruins, the wyrm's lair.",
     "trouble": "a young dragon steals every bell in the region and rings them to hold the Devourer's dreams.",
     "cause": "the Bell-Wyrm, enchanted by the Choir.",
     "tasks": [
      {
       "attr": "Anima",
       "site": "the steadings",
       "text": "find out where the bells have gone",
       "encounters": [
        "the steadings' fear",
        "a thief",
        "a Witness"
       ],
       "fragForm": "Rumour",
       "frag": "the bells ring at night under the hills"
      },
      {
       "attr": "Corpus",
       "site": "the bell road",
       "text": "follow the road of stolen bells",
       "encounters": [
        "the wyrm's servants",
        "the road's dangers",
        "a Temptation"
       ],
       "fragForm": "Mark",
       "frag": "bell-rope fibres along the road"
      },
      {
       "attr": "Spiritus",
       "site": "the bell-tower ruins",
       "text": "break the Choir's enchantment on the bells",
       "encounters": [
        "the ruins' wards",
        "the bells' song",
        "choristers"
       ],
       "fragForm": "Vision",
       "frag": "the wyrm, sleeping in its own song"
      },
      {
       "attr": "Corpus",
       "site": "the lair",
       "text": "wake the wyrm",
       "encounters": [
        "the wyrm's hoard",
        "its servants",
        "the wyrm itself"
       ],
       "fragForm": "Relic",
       "frag": "a bell from the hoard"
      }
     ],
     "causeEncounter": "the Bell-Wyrm (Tier II)",
     "causeFragForm": "Relic",
     "causeFrag": "the second verse, cast into the wyrm's greatest bell",
     "thread": true,
     "reckoningTask": 2,
     "omen": "every bell in the region rings at once",
     "success": "the wyrm wakes, the bells go home, and the region rings with its own bells"
    },
    {
     "n": 3,
     "name": "The Silent Abbey",
     "where": "A region of abbeys; sites: the abbey towns, the pilgrim road, the abbey, the abbess's tower.",
     "trouble": "the abbeys keep the region in silence, and its people forget how to speak.",
     "cause": "the Silent Abbess, who has not spoken in a century.",
     "tasks": [
      {
       "attr": "Anima",
       "site": "the abbey towns",
       "text": "teach the towns to speak again",
       "encounters": [
        "the abbess's nuns",
        "the towns' fear",
        "a Witness"
       ],
       "fragForm": "Witness",
       "frag": "a nun who speaks"
      },
      {
       "attr": "Corpus",
       "site": "the pilgrim road",
       "text": "walk the pilgrim road",
       "encounters": [
        "pilgrims",
        "guards",
        "the road's dangers"
       ],
       "fragForm": "Mark",
       "frag": "the road is lined with silent statues"
      },
      {
       "attr": "Spiritus",
       "site": "the abbey",
       "text": "break the abbey's silence",
       "encounters": [
        "the abbey's wards",
        "its nuns",
        "the silence itself"
       ],
       "fragForm": "Vision",
       "frag": "the abbess, singing in silence"
      },
      {
       "attr": "Anima",
       "site": "the tower",
       "text": "make the abbess speak",
       "encounters": [
        "her servants",
        "her will",
        "a Temptation"
       ],
       "fragForm": "Relic",
       "frag": "the abbess's veil"
      }
     ],
     "causeEncounter": "the Silent Abbess (Tier II)",
     "causeFragForm": "Witness",
     "causeFrag": "the abbess speaks the third verse aloud",
     "thread": true,
     "reckoningTask": 3,
     "omen": "a whole town falls silent",
     "success": "the abbess speaks, and the region finds its voice"
    },
    {
     "n": 4,
     "name": "The Choir's Seminary",
     "where": "A college region; sites: the college towns, the library, the practice halls, the Precentor's chapel.",
     "trouble": "the Choir trains its singers here, and sends them out across the world.",
     "cause": "the Precentor, who trains the Choir.",
     "tasks": [
      {
       "attr": "Anima",
       "site": "the college towns",
       "text": "turn the students",
       "encounters": [
        "the masters",
        "the students",
        "a Witness"
       ],
       "fragForm": "Witness",
       "frag": "a student who doubts"
      },
      {
       "attr": "Corpus",
       "site": "the library",
       "text": "steal the Choir's songbooks",
       "encounters": [
        "the librarians",
        "the library's traps",
        "guards"
       ],
       "fragForm": "Relic",
       "frag": "the Choir's songbook"
      },
      {
       "attr": "Spiritus",
       "site": "the practice halls",
       "text": "break the practice halls' enchantment",
       "encounters": [
        "the halls' wards",
        "the singers",
        "the song"
       ],
       "fragForm": "Mark",
       "frag": "the halls bear the Choir's mark"
      },
      {
       "attr": "Anima",
       "site": "the Precentor's chapel",
       "text": "turn the Precentor",
       "encounters": [
        "his guards",
        "his will",
        "a Temptation"
       ],
       "fragForm": "Vision",
       "frag": "the Precentor, teaching the Cantor's song"
      }
     ],
     "causeEncounter": "the Precentor (Tier II)",
     "causeFragForm": "Relic",
     "causeFrag": "the fourth verse, from the Precentor's teaching book",
     "thread": true,
     "reckoningTask": 4,
     "omen": "a thousand singers leave the seminary at once",
     "success": "the seminary closes, and the Choir loses its new voices"
    },
    {
     "n": 5,
     "name": "The Wyrm's Spine",
     "where": "A ridge region along the Devourer's back; sites: the ridge villages, the spine road, the vertebrae, the Spine-Warden's keep.",
     "trouble": "the ridges shake as the Devourer stirs, and the Choir's wardens sing it back down.",
     "cause": "the Spine-Warden, who holds the ridge.",
     "tasks": [
      {
       "attr": "Anima",
       "site": "the ridge villages",
       "text": "convince the villages that the waking is necessary",
       "encounters": [
        "the villages' fear",
        "the warden's spies",
        "a Witness"
       ],
       "fragForm": "Witness",
       "frag": "a villager who has seen the Devourer's eye"
      },
      {
       "attr": "Corpus",
       "site": "the spine road",
       "text": "travel the spine road",
       "encounters": [
        "earthquakes",
        "the warden's guards",
        "the road's dangers"
       ],
       "fragForm": "Mark",
       "frag": "the ridge is made of bone"
      },
      {
       "attr": "Spiritus",
       "site": "the vertebrae",
       "text": "speak to the Devourer in its dreams",
       "encounters": [
        "the dreams",
        "the song",
        "the Devourer's hunger"
       ],
       "fragForm": "Vision",
       "frag": "the Devourer, dreaming of waking"
      },
      {
       "attr": "Corpus",
       "site": "the keep",
       "text": "take the keep",
       "encounters": [
        "the keep's guards",
        "its traps",
        "the warden"
       ],
       "fragForm": "Relic",
       "frag": "the warden's horn"
      }
     ],
     "causeEncounter": "the Spine-Warden (Tier II)",
     "causeFragForm": "Relic",
     "causeFrag": "the fifth verse, carved into the Devourer's bone",
     "thread": true,
     "reckoningTask": 5,
     "omen": "the ridge splits open",
     "success": "the warden falls, and the Devourer stirs"
    },
    {
     "n": 6,
     "name": "The Dreaming Coast",
     "where": "A coastal region; sites: the coastal towns, the sea caves, the siren rocks, the drowned temple.",
     "trouble": "the Devourer's dreams wash up on the coast as mists that drive people mad.",
     "cause": "the Dream-Siren, who sings the dreams back down.",
     "tasks": [
      {
       "attr": "Anima",
       "site": "the coastal towns",
       "text": "calm the dreamers",
       "encounters": [
        "the dreamers",
        "the mists",
        "the siren's spies"
       ],
       "fragForm": "Witness",
       "frag": "a dreamer who understood the dream"
      },
      {
       "attr": "Corpus",
       "site": "the sea caves",
       "text": "explore the caves",
       "encounters": [
        "the caves",
        "the tides",
        "the siren's servants"
       ],
       "fragForm": "Mark",
       "frag": "the caves are carved with the lullaby"
      },
      {
       "attr": "Spiritus",
       "site": "the siren rocks",
       "text": "resist the siren's song",
       "encounters": [
        "the song",
        "the rocks",
        "the drowned"
       ],
       "fragForm": "Vision",
       "frag": "the siren, singing the Devourer's dreams"
      },
      {
       "attr": "Corpus",
       "site": "the drowned temple",
       "text": "reach the temple",
       "encounters": [
        "the temple's guards",
        "its traps",
        "the siren"
       ],
       "fragForm": "Relic",
       "frag": "the siren's shell"
      }
     ],
     "causeEncounter": "the Dream-Siren (Tier II)",
     "causeFragForm": "Witness",
     "causeFrag": "the siren sings the sixth verse before she dies",
     "thread": true,
     "reckoningTask": 6,
     "omen": "the mists roll inland and a town goes mad",
     "success": "the mists clear, and the coast is quiet"
    }
   ]
  },
  "reckoning": {
   "name": "The Waking",
   "heart": "a Vision of a cathedral built over the Devourer's head, where the Cantor sings the lullaby's first and last verse, as he has for a thousand years.",
   "tasks": [
    {
     "from": 1,
     "attr": "Spiritus",
     "text": "unsing the first verse on the cathedral organ"
    },
    {
     "from": 2,
     "attr": "Corpus",
     "text": "ring the Bell-Wyrm's greatest bell to wake the Devourer"
    },
    {
     "from": 3,
     "attr": "Anima",
     "text": "speak the third verse backwards in the cathedral's silence"
    },
    {
     "from": 4,
     "attr": "Anima",
     "text": "turn the Cantor's own choir against him"
    },
    {
     "from": 5,
     "attr": "Corpus",
     "text": "climb the Devourer's spine to its eye"
    },
    {
     "from": 6,
     "attr": "Spiritus",
     "text": "sing the Devourer's dreams back to it, so it remembers its hunger"
    }
   ],
   "adversary": "the Cantor (Tier III)",
   "success": "the lullaby ends. The Devourer wakes and eats the old age, and the world is remade from what it leaves. Where the characters stand, the new world begins"
  }
 }
];
