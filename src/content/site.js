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
        directionsCta: 'Get directions',
        directionsWaypoint: 'Find the turnoff',
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
        { label: 'Hosts', href: '#hosts' },
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
        { label: 'The hosts', href: '#hosts' },
        { label: 'Rooms', href: '#rooms' },
        { label: 'The table', href: '#breakfast' },
        { label: 'Trails', href: '#trails' },
        { label: 'Guests', href: '#guests' },
        { label: 'Visit', href: '#contact' },
    ],

    // ── Hero ──────────────────────────────────────────────────────────────
    hero: {
        eyebrow: 'Discover Juniper Trails Bed & Breakfast · Williams Lake, BC',
        heading: 'A rest stop for all adventurers.',
        body:
            'A three-room bed & breakfast on twenty-seven acres of Cariboo stillness - friendly animals, and thoughtful, welcoming hospitality.',
        ctaPrimary: { label: 'Plan your stay', href: '#contact' },
        ctaSecondary: { label: 'See the rooms', href: '#rooms' },
        // Full-bleed slideshow. Lead with the land, then the adventure, then home.
        slides: [
            { src: '/images/M1-HouseView.JPG', alt: 'The Juniper Trails house and grounds on a clear Cariboo morning' },
            { src: '/images/P1-Parlour-ViewOfProperty.jpg', alt: 'Looking over the Juniper Trails grounds from the parlor on a beautiful morning' },
            { src: '/images/M2A-Molly-BalsamRoots.jpg', alt: 'A mountain biker riding below Farwell Canyon under a big prairie sky' },
            { src: '/images/A2-Sugar-Horse.jpg', alt: 'A kind horse in a green field looking up' },
        ],
    },

    // ── Meet the hosts ────────────────────────────────────────────────────
    //  Steve & Emily as people — the "hosts are the product" thesis stated
    //  plainly, up high, before the rooms. The rest of the page (the table,
    //  the easel, the trails) is the evidence; this is the introduction, so it
    //  brings Emily forward as an equal partner where the later Steve-craft
    //  beats can't. NB: `site.hosts` is the short "Steve & Emily" label used in
    //  nav/footer copy — this `hosts` block is the section content. Different
    //  things; both intentionally named for what they are.
    hosts: {
        eyebrow: 'Your hosts',
        heading: "Steve & Emily",
        lead:
            "27 stunning acres, friendly animals, and thoughtful, welcoming hospitality... And with so many things to see and do, make sure to stay awhile!",
        body: [
            "",
        ],
        signature: 'Steve & Emily',
        signatureNote: 'and the dogs',
        image: {
            src: '/images/H1-SteveEmily-Trail.jpg',
            alt:
                'Steve and Emily on a mountain trail, packs on and caps low, ' +
                'smiling into the camera with autumn evergreen slopes behind them',
        },
    },

    // ── Rooms ─────────────────────────────────────────────────────────────
    //  Copy follows Steve's brief (B&B copy.md). The room names are real, but
    //  the brief gives no per-room descriptions or the "named for a dog" story
    //  — those await Steve (see `namesakes` and the empty `items[].desc`).
    rooms: {
        eyebrow: 'Three rooms',
        heading: 'Built with your comfort in mind',
        intro:
            'Relax and enjoy the peaceful atmosphere and amenities found in our ' +
            'three well finished guest rooms, each with their own spacious ensuite ' +
            'bathroom.',
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
                desc: '', // awaiting Steve's copy — not in the brief
                meta: 'Standard queen · Ensuite',
                price: '$199',
                image: { src: '/images/M2-MollysRest-GuestRoom.jpg', alt: "Molly's Rest — guest room with a bed beside a bright window onto the grounds" },
            },
            {
                id: 'chases-place',
                name: "Chase's Place",
                desc: '', // awaiting Steve's copy — not in the brief
                meta: 'Standard double · Ensuite',
                price: '$189',
                image: { src: '/images/B2-ChasesPlace-GuestRoom.jpg', alt: "Chase's Place — guest room with a double bed" },
            },
            {
                id: 'the-dukes',
                name: 'The Dukes',
                desc: '', // awaiting Steve's copy — not in the brief
                meta: 'Deluxe queen · Ensuite',
                price: '$209',
                image: { src: '/images/B3-TheDukes-GuestRoom.jpg', alt: 'The Dukes — deluxe guest room with a view across the grounds' },
            },
        ],
        // One bath photo for the section — each room has its own, but a single
        // detail shot keeps the grid from repeating the same beat three times.
        bath: {
            eyebrow: 'The baths',
            heading: 'Each room, its own',
            body:
                'Every room has its own spacious, private ensuite — no sharing down ' +
                'the hall, ever. They are kept spotless, stocked with fresh towels, ' +
                'and finished with the same care as the rest of the house.',
            image: {
                src: '/images/Bathroom.jpg',
                alt:
                    'One of the private guest ensuites — dark vanity, white sink, ' +
                    'fresh towels, and bear art on the wall',
            },
        },
        // Shared common ground — the intro promises kitchen, living room, and
        // fire; this is the visual payoff after the three private rooms.
        shared: {
            eyebrow: 'The parlour',
            heading: 'Enjoy the atmosphere of the Parlour',
            body:
                'With ample breakfast facilities, a well equipped kitchenette, comfy ' +
                'lounge seating, massive stone fireplace and amazing views over the ' +
                'property.',
            amenities: ['Kitchenette', 'Stone fireplace', 'Lounge & valley views'],
            image: {
                src: '/images/P3-Parlour-ViewOfParlour.jpg',
                alt:
                    'The parlour — lounge seating and a stone fireplace by tall ' +
                    'windows, with views over the property',
            },
        },
        // ── Rates strip ───────────────────────────────────────────────────
        //  Per-room prices live on the room cards (items[].price). This is the
        //  slim closing strip: the shared conditions, the reserve CTA, and the
        //  link to the cancellation policy lightbox (policy.js).
        rates: {
            note: 'Per night · double occupancy · CAD',
            fineprint: [
                'Checkout is 10 a.m. Government rates available, and we are glad to talk through longer stays.',
                'Rates are subject to change without notice.',
            ],
            cta: { label: 'Call, text, or email to reserve', href: '#contact' },
            policyLink: 'Booking & cancellation policy',
        },
        // ── Booking & cancellation policy ──────────────────────────────────
        //  Shown in a lightbox opened from the rates panel (policy.js). Steve's
        //  run-on paragraph, broken into plain groups so guests can scan it.
        policy: {
            eyebrow: 'Before you book',
            title: 'Booking & cancellation',
            intro:
                'Reserving is a quick call, text, or email — here is how deposits ' +
                'and changes work once your dates are set.',
            groups: [
                {
                    heading: 'Deposits',
                    items: [
                        'Stays of 1–2 nights: full payment for the stay is due at the time of booking.',
                        'Stays of 3 nights or more: a 50% deposit is due at the time of booking.',
                    ],
                },
                {
                    heading: 'Cancellations',
                    items: [
                        '14 or more days before arrival: a $50 cancellation fee applies.',
                        'Within 14 days of arrival: the full reserved stay is charged.',
                    ],
                },
                {
                    heading: 'Good to know',
                    items: [
                        'Checkout is 10 a.m.',
                        'Rates are based on double occupancy, in Canadian dollars.',
                        'Government rates available; ask us about longer stays.',
                    ],
                },
            ],
            contactNote:
                'Questions about any of this? Call, text, or email — we are glad to help.',
        },
    },

    // ── Breakfast ─────────────────────────────────────────────────────────
    breakfast: {
        eyebrow: 'The table',
        heading: 'A healthy breakfast',
        body: [
            'Get a great start to your day with homemade muffins and scones, tasty ' +
            'egg dishes, fresh fruit, yogurt, breads... and of course, lots of coffee.',
        ],
        // Lead photo carries the place: coffee, fresh muffins, and the hills beyond.
        image: { src: '/images/BR1-MuffinsOnTable.jpg', alt: 'A pot of coffee and a plate of fresh muffins on the table, the Cariboo hills through the window behind' },
        // Supporting morning shots.
        gallery: [
            { src: '/images/BR2-Breakfast-Scones.jpg', alt: 'A warm berry scone, just out of the oven' },
            { src: '/images/BR3-Breakfast-Omelet.jpg', alt: "One of Steve's omelettes, plated with fresh strawberries" },
            { src: '/images/Food-4.jpg', alt: 'Fresh-baked muffins with a dish of homemade jam' },
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

    // ── Guests / reviews ────────────────────────────────────────────────
    //  No on-site quotes — we point straight at the real listings instead, so
    //  every word is the guests' own and nothing needs permission-clearing.
    //  Key stays `testimonials` (the #guests section); the partial renders
    //  `platforms`, not `items`.
    //
    //  Links are stripped to essentials: tracking params removed. The Google
    //  URL keeps its `!1b1` flag so it opens on the reviews view.
    testimonials: {
        eyebrow: 'Guests',
        heading: "Don't take our word for it",
        intro:
            'Years of guests have written up their stays — read them where they ' +
            'left them, then come back and add your own.',
        platforms: [
            {
                name: 'Google',
                blurb: 'Guest reviews on our Google Maps listing.',
                cta: 'Read on Google',
                href:
                    'https://www.google.com/maps/place/Juniper+Trails+Bed+and+Breakfast/' +
                    '@52.0668526,-122.0883664,659m/data=!3m1!1e3!4m11!3m10' +
                    '!1s0x5380989e1cb1ee13:0x13ea726f84457aa8!5m2!4m1!1i2!8m2' +
                    '!3d52.0668526!4d-122.0883664!9m1!1b1!16s%2Fg%2F1tdr2_4h',
            },
            {
                name: 'Tripadvisor',
                blurb: 'Traveller reviews and ratings on Tripadvisor.',
                cta: 'Read on Tripadvisor',
                href:
                    'https://www.tripadvisor.ca/Hotel_Review-g154925-d2520972-Reviews-Juniper_Trails_Bed_and_Breakfast-Williams_Lake_Cariboo_British_Columbia.html',
            },
        ],
    },

    // ── Contact ───────────────────────────────────────────────────────────
    contact: {
        eyebrow: 'Visit',
        heading: 'Come stay a while',
        body:
            'Call, text, or email to reserve. Steve and Emily will sort out dates, ' +
            'questions, and anything else with you directly.',
    },
};