// ─────────────────────────────────────────────────────────────────────────
//  Juniper Trails B&B — content source of truth
//
//  Every string the visitor reads lives here, not in the markup. The HTML
//  partials render from this object at build time (see vite.config.js).
//
//  V2 / Decap CMS note: this is the seam. When the CMS lands, the editable
//  fields below get populated from Decap's YAML/markdown instead of being
//  hand-edited here — the partials that consume this shape won't change.
//  Keep the shape stable; add fields rather than renaming them.
// ─────────────────────────────────────────────────────────────────────────

export default {
    // ── Identity & contact ────────────────────────────────────────────────
    site: {
        name: 'Juniper Trails',
        nameLead: 'Juniper',     // two-tone wordmark: lead + accent
        nameAccent: 'Trails',
        kind: 'Bed & Breakfast',
        region: 'Cariboo, British Columbia',
        locationShort: 'Williams Lake, BC',
        phone: '250-398-8296',
        phoneHref: 'tel:2503988296',
        email: 'info@junipertrails.ca',
        emailHref: 'mailto:info@junipertrails.ca',
        hosts: 'Steve & Emily',
        directionsLabel: 'Dog Creek Road · 15 minutes from downtown Williams Lake',
        // On Dog Creek Road, between Williams Lake and Springhouse.
        directionsUrl:
            'https://www.google.com/maps/search/?api=1&query=Juniper+Trails+Bed+and+Breakfast+Williams+Lake+BC',
        year: '2026',
        designCredit: {
            prefix: 'Web design by',
            name: 'Black Stallion Studios',
            href: 'https://blackstallionstudios.ca',
        },
    },

    // ── Primary navigation ────────────────────────────────────────────────
    nav: [
        { label: 'Rooms', href: '#rooms' },
        { label: 'Breakfast', href: '#breakfast' },
        { label: 'Trails', href: '#trails' },
        { label: 'Guests', href: '#guests' },
        { label: 'Contact', href: '#contact' },
    ],

    // ── Trail spine (signature wayfinding) ────────────────────────────────
    //  Short trail-marker labels for the meandering spine down the left
    //  margin. Order matches the page; hrefs match the section ids.
    spine: [
        { label: 'Arrive', href: '#top' },
        { label: 'Rooms', href: '#rooms' },
        { label: 'The table', href: '#breakfast' },
        { label: 'Trails', href: '#trails' },
        { label: 'Guests', href: '#guests' },
        { label: 'Visit', href: '#contact' },
    ],

    // ── Hero ──────────────────────────────────────────────────────────────
    hero: {
        eyebrow: 'A rest stop for adventurers · Williams Lake, BC',
        heading: 'Stay where the trails begin.',
        body:
            'A three-room bed & breakfast on twenty-seven acres of Cariboo stillness - friendly animals, and thoughtful, welcoming hospitality.',
        ctaPrimary: { label: 'Plan your stay', href: '#contact' },
        ctaSecondary: { label: 'See the rooms', href: '#rooms' },
        // Full-bleed slideshow. Lead with the land, then the adventure, then home.
        slides: [
            { src: '/images/M1-HouseView.JPG', alt: 'The Juniper Trails house and grounds on a clear Cariboo morning' },
            { src: '/images/P1-Parlour-ViewOfProperty.jpg', alt: 'Looking over the Juniper Trails grounds from the parlor on a beautiful morning' },
            { src: '/images/T1-ToDo-SteveAtFarwell-Bike.jpg', alt: 'A mountain biker riding below Farwell Canyon under a big prairie sky' },
            { src: '/images/A2-Sugar-Horse.jpg', alt: 'A kind horse in a green field looking up' },
        ],
    },

    // ── Rooms ─────────────────────────────────────────────────────────────
    //  Each room is named for a family dog — Molly, Chase, and Duke. It's a
    //  small thing guests notice, and it's the truest line about who runs this
    //  place.
    rooms: {
        eyebrow: 'Three rooms',
        heading: 'Three rooms, each named for a dog',
        intro:
            'No two are alike, and every one of them is named for a dog the family ' +
            'has loved. Each opens onto the property; all of them share the kitchen, ' +
            'the living room, and the fire outside.',
        // The three dogs the rooms honour — shown before the grid so the
        // naming story lands before guests read Molly, Chase, and Duke.
        namesakes: {
            eyebrow: 'The namesakes',
            heading: 'Molly, Chase, and Duke',
            body:
                'Three dogs the family has loved for years — and the reason each room ' +
                'has a name. Caught here on the trail at Desous, not far from home.',
            image: {
                src: '/images/A1-3DogsAtDesous.jpg',
                alt:
                    'Molly, Chase, and Duke — three dogs on a snowy trail at Desous, ' +
                    'evergreens and valley behind',
            },
        },
        items: [
            {
                id: 'mollys-rest',
                name: "Molly's Rest",
                desc:
                    'A warm, simple room with an ensuite to match — the one guests tend ' +
                    'to ask for by name when they come back.',
                meta: 'Sleeps 2 · Ensuite',
                image: { src: '/images/M2-MollysRest-GuestRoom.jpg', alt: "Molly's Rest — bed dressed in florals beside a bright window onto the grounds" },
            },
            {
                id: 'chases-place',
                name: "Chase's Place",
                desc:
                    'The suite. The largest of the three, with a bathroom guests keep ' +
                    'singling out in their reviews and room to spread out and stay a while.',
                meta: 'Sleeps 2 · The suite · Luxe bath',
                image: { src: '/images/B2-ChasesPlace-GuestRoom.jpg', alt: "Chase's Place — a generous bed with a glass of wine set out on the side table" },
            },
            {
                id: 'the-dukes',
                name: 'The Dukes',
                desc:
                    'A full bedroom and full bath with a clear view across the grounds — ' +
                    'clean lines, plenty of room, the country right outside the window.',
                meta: 'Sleeps 2 · Full bath · Grounds view',
                image: { src: '/images/B3-TheDukes-GuestRoom.jpg', alt: 'The Dukes — a calm, warm-toned room with a writing desk and grounds view' },
            },
        ],
        // Shared common ground — the intro promises kitchen, living room, and
        // fire; this is the visual payoff after the three private rooms.
        shared: {
            eyebrow: 'Beyond the bedroom',
            heading: 'The parlour, and the rest',
            body:
                'The bedrooms are yours alone. The kitchen, this room, and the fire ' +
                'outside belong to everyone — where breakfast lingers, books get left ' +
                'open, and the valley stays in view all day.',
            amenities: ['Kitchen', 'The parlour', 'Fire outside'],
            image: {
                src: '/images/P3-Parlour-ViewOfParlour.jpg',
                alt:
                    'The parlour — leather sofas and sunflowers by tall windows, ' +
                    'green fields and evergreens beyond',
            },
        },
    },

    // ── Breakfast ─────────────────────────────────────────────────────────
    breakfast: {
        eyebrow: 'The table',
        heading: 'Breakfast is the whole point, mostly',
        body: [
            'Steve cooks. It is homemade, it changes with whatever is good that week, ' +
            'and the muffins and scones come out of the oven the same morning you eat them — ' +
            'often with raspberries from his own garden.',
            'There is good coffee on, a spread of fruit and eggs, and a view of the ' +
            'valley out the window. You take it unhurried, usually with a dog nearby ' +
            'hoping you drop something.',
        ],
        // Lead photo carries the place: coffee, fresh muffins, and the hills beyond.
        image: { src: '/images/BR1-MuffinsOnTable.jpg', alt: 'A pot of coffee and a plate of fresh muffins on the table, the Cariboo hills through the window behind' },
        // Supporting morning shots.
        gallery: [
            { src: '/images/BR2-Breakfast-Scones.jpg', alt: 'A warm berry scone, just out of the oven' },
            { src: '/images/BR3-Breakfast-Omelet.jpg', alt: "One of Steve's omelettes, plated with fresh strawberries" },
        ],
    },

    // ── Steve's artwork ───────────────────────────────────────────────────
    //  The "hosts are the product" beat, in a second medium. Steve paints —
    //  bold acrylic landscapes of the Rockies, a couple of charcoal drawings
    //  (Sarge the pig; the geese), still lifes, a cafe in Paris. Presented as a
    //  horizontal "gallery wall" you walk past; gallery.js draws the trail-
    //  progress line as you scroll it, echoing the spine. No nav/spine entry by
    //  design — it's a scroll-discovered grace note, not a destination.
    //
    //  Each piece carries its real pixel dimensions (w/h) so the rail reserves
    //  the exact frame and never crops a painting. Titles/notes/alt are editor
    //  copy — Steve should confirm subjects; medium/year can be added in V2
    //  without touching the partial (add fields, don't rename).
    artwork: {
        eyebrow: 'Off the easel',
        heading: "When the kitchen's quiet, Steve paints",
        intro:
            'Rocky Mountain lakes, a couple of animals, a still life, a cafe in ' +
            'Paris — bold, unhurried, and all his own. A few of them are here.',
        hint: 'Drag to wander · Click a painting to see it larger',
        pieces: [
            {
                src: '/images/art-shadow-lake.jpg', title: 'Shadow Lake', note: '', w: 1600, h: 782,
                alt: "Steve's painting of Shadow Lake — a still alpine lake below snow-streaked peaks, in bold outline and saturated colour",
            },
            {
                src: '/images/art-maggie.jpg', title: 'Maggie', note: 'Border collie', w: 1182, h: 1600,
                alt: "Steve's portrait of Maggie, a bright-eyed border collie, against a warm ground",
            },
            {
                src: '/images/art-valley-of-the-ten-peaks.jpg', title: 'Valley of the Ten Peaks', note: '', w: 1600, h: 1279,
                alt: "Steve's painting of the Valley of the Ten Peaks — jagged purple summits rising over evergreens",
            },
            {
                src: '/images/art-sarge.jpg', title: 'Sarge', note: 'Charcoal', w: 1260, h: 837,
                alt: "Steve's charcoal drawing of Sarge the pig, in profile",
            },
            {
                src: '/images/art-still-life-watermelon.jpg', title: 'Still Life with Watermelon', note: '', w: 1600, h: 1006,
                alt: "Steve's still life — irises, a cut watermelon and bread on a sunlit table",
            },
            {
                src: '/images/art-brazeau-valley.jpg', title: 'Brazeau Valley', note: '', w: 1600, h: 772,
                alt: "Steve's painting of the Brazeau Valley — a trail winding toward a far peak above a quiet lake",
            },
            {
                src: '/images/art-le-consulat.jpg', title: 'Le Consulat', note: 'Montmartre, Paris', w: 1287, h: 1600,
                alt: "Steve's painting of Le Consulat cafe in Montmartre, Paris — a figure at a table beneath red awnings",
            },
            {
                src: '/images/art-mount-temple.jpg', title: 'Mount Temple', note: '', w: 1600, h: 1286,
                alt: "Steve's painting of Mount Temple — a craggy summit above evergreens, a boardwalk in the foreground",
            },
            {
                src: '/images/art-burstall-pass.jpg', title: 'Burstall Pass', note: '', w: 1198, h: 1600,
                alt: "Steve's painting of Burstall Pass in autumn — golden larches below snow-dusted peaks",
            },
            {
                src: '/images/art-canada-geese.jpg', title: 'Canada Geese', note: 'Charcoal', w: 1170, h: 568,
                alt: "Steve's charcoal drawing of two Canada geese resting in tall grass",
            },
            {
                src: '/images/art-still-life.jpg', title: 'Still Life', note: '', w: 1287, h: 1600,
                alt: "Steve's still life — calla lilies, a sunflower and fruit in warm light",
            },
        ],
    },

    // ── Trails & activities ───────────────────────────────────────────────
    trails: {
        eyebrow: 'Outside the door',
        heading: 'Trails, lakes, and a lot of sky',
        intro:
            'While you stay, follow the legendary Gold Rush Trail to Wells and Barkerville. Explore Farwell Canyon and the memorable Williams Lake Stampede.',
        activitiesBlurb:
            'Step out the door onto a walking trail that loops the property — twenty-seven acres are yours to wander. A mountain biking trailhead sits just two kilometres up the road, and from there the trail-laced hillsides around Williams Lake open up for riding, hiking and trail running. The abundant lakes, rivers and mountains of the Cariboo Chilcotin naturally attract outdoor enthusiasts.',
        activities: [
            { name: 'Mountain biking', note: 'Trails lace the hills' },
            { name: 'Hiking & running', note: 'A trail loops the property' },
            { name: 'Camping', note: 'By a lake or near a mountain, it\'s all up to you' },
            { name: 'Paddle & fish', note: 'Lakes and rivers minutes away' },
        ],
        nearby: {
            label: 'Well worth the drive',
            places: [
                'Farwell Canyon',
                'Gold Rush Trail',
                'Barkerville and Wells',
                'Williams Lake Stampede',
            ],
        },
        image: { src: '/images/T1-ToDo-SteveAtFarwell-Bike.jpg', alt: 'Riding the rim trail above Farwell Canyon, sandstone hoodoos below and big sky above' },

        // ── Seasonal note — "real people live here." ──────────────────────
        //  One honest line per season, shown by season.js based on the
        //  visitor's own clock. Any line left empty ('') simply stays hidden,
        //  so Steve & Emily can run three seasons and leave one blank if they
        //  like. Keep each to a single short sentence — it's a whisper, not a
        //  banner. CMS-editable in V2; the partial renders all four statically.
        seasons: {
            spring: 'Right now the hills are greening up and the creeks are loud with melt — good light, soft ground, hardly anyone out yet.',
            summer: "Right now the raspberries are coming on in Steve's garden and the trails are dry and fast — long evenings, warm lakes.",
            fall: 'Right now the aspens are turning gold across the valley and the mornings come in crisp — the best riding of the year, most say.',
            winter: 'Right now the trails are snowed in and quiet, the fire is on, and breakfast runs a little longer than it should.',
        },
    },

    // ── Testimonials ──────────────────────────────────────────────────────
    //  ⚠ PLACEHOLDER COPY — paraphrased, not lifted. Replace with real,
    //  permission-cleared guest quotes before launch. Do NOT paste verbatim
    //  text from TripAdvisor/Google without permission.
    testimonials: {
        eyebrow: 'Guests',
        heading: 'What people say after',
        items: [
            {
                quote:
                    'The kind of quiet you forget exists until you have it again. We came ' +
                    'for one night and stayed three.',
                author: 'Guest',
                source: 'Placeholder — replace before launch',
            },
            {
                quote:
                    'Steve and Emily make you feel like family by the second morning, and ' +
                    'the breakfast alone is worth the drive.',
                author: 'Guest',
                source: 'Placeholder — replace before launch',
            },
            {
                quote:
                    'Clean, spacious, a real view, and a dog to greet you. Exactly the ' +
                    'break from the highway we needed.',
                author: 'Guest',
                source: 'Placeholder — replace before launch',
            },
        ],
    },

    // ── Contact ───────────────────────────────────────────────────────────
    contact: {
        eyebrow: 'Visit',
        heading: 'Come stay a while',
        body:
            'There is no booking form here, on purpose. Call or email Steve and Emily ' +
            'and they will sort out dates, questions, and anything else with you directly.',
    },
};