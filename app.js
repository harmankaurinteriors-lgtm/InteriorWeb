/* 
 ==========================================================================
  INTERIOR VEYDAA - CORE APPLICATION PLATFORM
  Single-Page Tabbed Navigation, Multi-Room Project Views, Dynamic Projects
  Client Console, AI Style Quiz, Color blend Visualizer, Verification Systems
 ==========================================================================
*/

document.addEventListener('DOMContentLoaded', () => {
    initTabbedNavigation();
    initProjectTransformationSelector();
    initAIStyleQuiz();
    initSpaceVisualizer();
    initInquiryForm();
    initDesignAssistant();
});

/* ==========================================
   1. SINGLE-PAGE TABBED NAVIGATION ENGINE
   ========================================== */
function initTabbedNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    const panels = document.querySelectorAll('.view-panel');
    const actionBtns = document.querySelectorAll('.nav-action');
    const mobileToggle = document.getElementById('mobileMenuToggle');
    const navLinks = document.getElementById('navLinks');

    function closeMobileMenu() {
        if (mobileToggle && navLinks) {
            mobileToggle.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.classList.remove('menu-open');
        }
    }

    function switchView(targetViewId) {
        // Remove active states from all tabs and views
        navItems.forEach(i => {
            if (i.dataset.target === targetViewId) {
                i.classList.add('active');
            } else {
                i.classList.remove('active');
            }
        });

        panels.forEach(p => {
            p.classList.remove('active');
        });

        // Activate matching view panel
        const activePanel = document.getElementById('view-' + targetViewId);
        if (activePanel) {
            activePanel.classList.add('active');
            // Scroll internal panel container to the absolute top
            activePanel.scrollTop = 0;
        }

        // Close mobile drawer menu
        closeMobileMenu();
    }

    function navigateToView(targetViewId) {
        if (!targetViewId) return;

        switchView(targetViewId);

        if (window.innerWidth <= 991) {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    }

    window.navigateInteriorView = navigateToView;

    // Bind desktop/mobile navigation links
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const target = item.dataset.target;
            navigateToView(target);
        });
    });

    // Bind mobile menu toggle icon
    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener('click', () => {
            const isActive = navLinks.classList.contains('active');
            if (isActive) {
                mobileToggle.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.classList.remove('menu-open');
            } else {
                mobileToggle.classList.add('active');
                navLinks.classList.add('active');
                document.body.classList.add('menu-open');
            }
        });
    }

    // Bind inner CTAs (e.g. Find Style, Explore Portfolio)
    actionBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn.dataset.target;
            navigateToView(target);
        });
    });

    function openHashView() {
        const hashTarget = window.location.hash.replace('#', '');
        if (hashTarget) {
            navigateToView(hashTarget);
        }
    }

    window.addEventListener('hashchange', openHashView);
    openHashView();
}

/* ==========================================
   2. DYNAMIC PROJECT VIEW ENGINE
   ========================================== */
const PROJECT_DATABASE = {
    villa: {
        name: "The Travertine Oasis Villa",
        type: "Residential G+2 Villa",
        location: "Delhi NCR / North India",
        scope: "Full Villa Interior + Elevation + Landscape Concept",
        description: "A G+2 villa design showcase curated with organic textures, secure landscaped frontage, and custom travertine surfaces tailored for modern Indian living.",
        rooms: [
            // Ground Floor
            { 
                id: "front_elevation", 
                floor: "ground",
                name: "Front Elevation", 
                before: "assets/before_space.png", 
                after: "assets/villa_front_hero.png", 
                beforeLabel: "Raw Site", 
                afterLabel: "Styled Final",
                details: {
                    before: "Bare concrete column grid, open masonry blocks, and raw boundary pillars under construction.",
                    after: "G+2 Travertine Oasis Villa front elevation concept. Beige travertine cladding, secure compound wall, warm lighting, and a refined Delhi NCR villa frontage.",
                    materials: "Honed beige travertine slabs, ultra-clear structural glass, dark powder-coated steel trims, high-efficiency exterior uplights."
                }
            },
            { 
                id: "elevation", 
                floor: "ground",
                name: "45 Degree Elevation", 
                before: "assets/before_space.png", 
                after: "assets/villa_45_after.png", 
                beforeLabel: "Raw Site", 
                afterLabel: "Styled Final",
                details: {
                    before: "Raw structural G+2 concrete shell with unfinished floor slabs, exposed steel rebars, scaffolding, and AAC block framework at a 45-degree angle.",
                    after: "Angled exterior concept showing the villa massing, right-side driveway, secure compound wall, warm wood soffits, and terrace pergola language.",
                    materials: "Imported travertine stone cladding, thermo-treated ashwood paneling, structural glass, anti-corrosive charcoal steel framing."
                }
            },
            { 
                id: "living", 
                floor: "ground",
                name: "Living Room", 
                before: "assets/living_before.png", 
                after: "assets/living_after.png", 
                beforeLabel: "Raw Site", 
                afterLabel: "Styled Final",
                details: {
                    before: "Raw brick masonry walls, exposed PVC electrical conduits, unfinished concrete screed, and no media wall planning.",
                    after: "Organic Japandi living room featuring a massive TV panel integrated into custom fluted white-oak wall cladding. Oversized floor pot omitted to clear views and enhance circulation.",
                    materials: "White oak panels, ivory travertine stone console, low-slung linen sofa, hand-woven wool rug."
                }
            },
            {
                id: "balcony",
                floor: "first",
                name: "Balcony Sit-Out",
                before: "assets/balcony_before.png",
                after: "assets/villa_balcony_after.png",
                beforeLabel: "Raw Site",
                afterLabel: "Selected View",
                details: {
                    after: "Private first-floor balcony sit-out with warm wood ceiling, glass railing, planters and relaxed evening seating.",
                    materials: "Travertine-toned flooring, teak ceiling, charcoal railing, weather-friendly upholstery."
                }
            },
            { 
                id: "kitchen", 
                floor: "ground",
                name: "Kitchen & Dining Concept", 
                before: "assets/kitchen_before.png", 
                after: "assets/villa_kitchen_dining_after.png", 
                beforeLabel: "Raw Site", 
                afterLabel: "Styled Final",
                details: {
                    before: "Concrete partition shell under development with raw brick openings, exposed plumbing inlets/outlets, and missing high-capacity ventilation outlets.",
                    after: "Warm kitchen-cum-dining direction with an open family gathering zone, integrated task lighting, tall pantry planning, durable work surfaces, and clear service circulation.",
                    materials: "Natural oak cabinetry, warm stone counters, concealed warm LEDs, matte black detailing, easy-clean Indian-site-friendly finishes."
                }
            },
            { 
                id: "master_bedroom", 
                floor: "ground",
                name: "Master Bedroom", 
                before: "assets/bedroom_before.png", 
                after: "assets/bedroom_after.png", 
                beforeLabel: "Raw Site", 
                afterLabel: "Styled Final",
                details: {
                    before: "Raw cement plaster walls, exposed electrical conduits, and AAC block framing lacking partition doors.",
                    after: "Luxurious master suite featuring a low-slung platform bed, beautiful travertine bed-wall headboard cladded with warm oak, and built-in oak wardrobes.",
                    materials: "Honed travertine wall tiles, boucle wool bed upholstery, rift-sawn oak veneers, ambient warm cove lighting."
                }
            },
            {
                id: "guest_bedroom",
                floor: "first",
                name: "Guest Bedroom",
                before: "assets/bedroom_before.png",
                after: "assets/villa_guest_bedroom_after.png",
                beforeLabel: "Raw Site",
                afterLabel: "Selected View",
                details: {
                    after: "Warm guest bedroom direction with calm neutral upholstery, compact wardrobe planning and soft bedside lighting.",
                    materials: "Oak veneer, lime plaster walls, linen upholstery, warm LED coves."
                }
            },
            {
                id: "kids_bedroom",
                floor: "first",
                name: "Kids Bedroom",
                before: "assets/bedroom_before.png",
                after: "assets/villa_kids_bedroom_after.png",
                beforeLabel: "Raw Site",
                afterLabel: "Selected View",
                details: {
                    after: "Kids bedroom direction planned around study storage, durable finishes, soft color accents and safe circulation.",
                    materials: "Light oak, muted sage accents, washable paint, soft performance fabric."
                }
            },
            { 
                id: "bathroom", 
                floor: "ground",
                name: "Master Bathroom", 
                before: "assets/bathroom_before.png", 
                after: "assets/bathroom_after.png", 
                beforeLabel: "Raw Site", 
                afterLabel: "Styled Final",
                details: {
                    before: "Rough pipe channels, unfinished concrete brick floor, missing ventilation, and no partition walls.",
                    after: "Dry/wet segregated master bath layout featuring a floating monolithic travertine vanity, backlit mirror, matted brass fixtures, and seamless full-height travertine slab tiling.",
                    materials: "Seamless honed travertine stone slabs, custom matted brass fixtures, EWC wall-hung WC, clear glass partition."
                }
            },
            {
                id: "guest_bathroom",
                floor: "first",
                name: "Guest Attached Bathroom",
                before: "assets/bathroom_before.png",
                after: "assets/villa_guest_bathroom_after.png",
                beforeLabel: "Raw Site",
                afterLabel: "Selected View",
                details: {
                    after: "Guest bathroom direction with dry-wet separation, floating vanity and warm stone continuity.",
                    materials: "Travertine-look slab tiles, brushed brass fittings, fluted glass partition."
                }
            },
            {
                id: "kids_bathroom",
                floor: "first",
                name: "Kids Attached Bathroom",
                before: "assets/bathroom_before.png",
                after: "assets/villa_kids_bathroom_after.png",
                beforeLabel: "Raw Site",
                afterLabel: "Selected View",
                details: {
                    after: "Durable attached kids bathroom direction with practical storage, non-slip flooring and easy-clean surfaces.",
                    materials: "Large-format porcelain, rounded vanity edges, concealed storage, warm mirror lighting."
                }
            },
            {
                id: "terrace",
                floor: "second",
                name: "Terrace Gazebo",
                before: "assets/balcony_before.png",
                after: "assets/villa_terrace_gazebo_after.png",
                beforeLabel: "Raw Site",
                afterLabel: "Selected View",
                details: {
                    after: "Terrace direction with gazebo, swing seating, planters and evening lighting for private family use.",
                    materials: "Thermo-treated wood, outdoor fabric, warm pendant lights, anti-skid stone flooring."
                }
            }
        ]
    },
    office: {
        name: "Oak Slat Headquarters",
        type: "Commercial Space",
        rooms: [
            { 
                id: "lobby", 
                name: "Office Lobby", 
                before: "assets/before_space.png", 
                after: "assets/portfolio_office.png", 
                beforeLabel: "Raw Site", 
                afterLabel: "Styled Final",
                details: {
                    before: "Stark commercial concrete shell with visible AC metal ducting and raw columns.",
                    after: "Warm corporate reception lobby featuring beautiful acoustic oak-slat wall paneling and diffused linear lighting grids.",
                    materials: "Acoustic oak wood slats, polished concrete floors, custom floating marble reception counter."
                }
            },
            { 
                id: "ceo", 
                name: "CEO Executive Cabin", 
                before: "assets/bedroom_before.png", 
                after: "assets/portfolio_ceo.png", 
                beforeLabel: "Raw Site", 
                afterLabel: "Styled Final",
                details: {
                    before: "Unfinished partition framing, loose power cables, raw AAC brick walls.",
                    after: "Composed executive suite featuring massive walnut wall cladding, modular desk, and tailored client seating area.",
                    materials: "American walnut veneers, charcoal leather upholstery, custom brass divider lines."
                }
            }
        ]
    },
    restaurant: {
        name: "Amber & Clay Culinary",
        type: "Commercial Space",
        rooms: [
            { 
                id: "dining", 
                name: "Main Dining Lounge", 
                before: "assets/before_space.png", 
                after: "assets/portfolio_restaurant.png", 
                beforeLabel: "Raw Site", 
                afterLabel: "Styled Final",
                details: {
                    before: "Stark commercial concrete space, basic utility lines hanging, raw brick partitions.",
                    after: "Amber & Clay fine dining lounge showcasing local terracotta brick arches, warm lighting, and curved booth seating.",
                    materials: "Local baked terracotta bricks, custom curved upholstery, matte black steel rails, ambient lighting."
                }
            }
        ]
    },
    boutique: {
        name: "Travertine Arched Boutique",
        type: "Commercial Space",
        rooms: [
            { 
                id: "showroom", 
                name: "Display Showroom", 
                before: "assets/before_space.png", 
                after: "assets/portfolio_store.png", 
                beforeLabel: "Raw Site", 
                afterLabel: "Styled Final",
                details: {
                    before: "Unfinished plaster openings, raw concrete floor, unaligned structural arches.",
                    after: "Minimalist fashion boutique display featuring clean travertine arches, floating brass rails, and microcement pedestals.",
                    materials: "Travertine cladding, microcement floors, brushed brass display rails, concealed LED spotlights."
                }
            }
        ]
    }
};

function initProjectTransformationSelector() {
    const projectChips = document.querySelectorAll('.project-chip');
    const floorChips = document.querySelectorAll('.floor-chip');
    const floorSelectorContainer = document.getElementById('floorSelectorChips');
    const roomContainer = document.getElementById('roomSelectorChips');
    const container = document.getElementById('beforeAfterSlider');
    const handle = document.getElementById('sliderHandle');
    const afterWrapper = document.getElementById('afterWrapper');
    const beforeImg = document.getElementById('sliderBeforeImg');
    const afterImg = document.getElementById('sliderAfterImg');
    const beforeLabel = document.getElementById('tagBeforeLabel');
    const afterLabel = document.getElementById('tagAfterLabel');
    const loader = document.getElementById('sliderLoaderOverlay');

    if (!roomContainer || !container || !handle || !afterWrapper || !beforeImg || !afterImg) return;

    let isDragging = false;
    let currentFloor = 'ground';
    container.classList.add('single-showcase-mode');

    // Keep this section as a single coordinated project-view showcase.
    function resetSliderCenter() {
        handle.style.left = '100%';
        afterWrapper.style.clipPath = 'polygon(0 0, 100% 0, 100% 100%, 0 100%)';
    }

    // Core movement calculation
    function moveSlider(xPosition) {
        if (container.classList.contains('single-showcase-mode')) return;

        const rect = container.getBoundingClientRect();
        let percentage = ((xPosition - rect.left) / rect.width) * 100;
        
        if (percentage < 0) percentage = 0;
        if (percentage > 100) percentage = 100;

        handle.style.left = `${percentage}%`;
        afterWrapper.style.clipPath = `polygon(0 0, ${percentage}% 0, ${percentage}% 100%, 0 100%)`;
    }

    // Mouse handlers
    container.addEventListener('mousedown', (e) => {
        isDragging = true;
        moveSlider(e.clientX);
    });

    window.addEventListener('mouseup', () => {
        isDragging = false;
    });

    window.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        moveSlider(e.clientX);
    });

    // Touch handlers with e.preventDefault scroll barriers
    container.addEventListener('touchstart', (e) => {
        isDragging = true;
        moveSlider(e.touches[0].clientX);
    }, { passive: true });

    window.addEventListener('touchend', () => {
        isDragging = false;
    });

    window.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        if (e.cancelable) {
            e.preventDefault();
        }
        moveSlider(e.touches[0].clientX);
    }, { passive: false });

    // Dynamic Room Selector Builder
    function renderRoomSelector(projectId, activeFloor = 'ground') {
        roomContainer.innerHTML = '';
        const projectData = PROJECT_DATABASE[projectId] || PROJECT_DATABASE.villa;

        let filteredRooms = projectData.rooms;
        if (projectId === 'villa') {
            const approvedVillaRooms = [
                'front_elevation',
                'elevation',
                'living',
                'kitchen',
                'master_bedroom',
                'bathroom',
                'kids_bedroom',
                'kids_bathroom',
                'guest_bedroom',
                'guest_bathroom',
                'balcony',
                'terrace'
            ];
            filteredRooms = projectData.rooms
                .filter(r => approvedVillaRooms.includes(r.id))
                .sort((a, b) => approvedVillaRooms.indexOf(a.id) - approvedVillaRooms.indexOf(b.id));
        }

        filteredRooms.forEach((room, idx) => {
            const btn = document.createElement('button');
            btn.className = `chip ${idx === 0 ? 'active' : ''}`;
            btn.dataset.room = room.id;
            btn.textContent = room.name;
            
            btn.addEventListener('click', () => {
                if (btn.classList.contains('active')) return;
                
                // Toggle active room chip
                roomContainer.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
                btn.classList.add('active');
                
                loadRoomPair(room);
            });

            roomContainer.appendChild(btn);
        });

        // Trigger loading first room
        if (filteredRooms.length > 0) {
            loadRoomPair(filteredRooms[0]);
        }
    }

    // Aligned asset swapper with scanner spinner
    function loadRoomPair(roomData) {
        if (loader) {
            loader.classList.remove('hidden');
        }
        container.style.opacity = '0.35';

        const displayImage = roomData.after || roomData.before;
        beforeImg.src = displayImage;
        afterImg.src = displayImage;
        beforeLabel.textContent = "Planning";
        afterLabel.textContent = "Selected View";

        const detailBefore = document.getElementById('detailContentBefore');
        const detailAfter = document.getElementById('detailContentAfter');
        const detailMaterials = document.getElementById('detailContentMaterials');
        if (detailBefore) detailBefore.textContent = roomData.details && roomData.details.intent ? roomData.details.intent : "Planning focus: layout, circulation, privacy, lighting and site-specific usability.";
        if (detailAfter) detailAfter.textContent = roomData.details ? roomData.details.after : "Coordinated design direction with balanced massing, lighting and material mood.";
        if (detailMaterials) detailMaterials.textContent = roomData.details ? roomData.details.materials : "Organic materials, natural textures and warm lighting.";

        resetSliderCenter();

        window.setTimeout(() => {
            container.style.opacity = '1';
            if (loader) {
                loader.classList.add('hidden');
            }
        }, 260);
    }

    // Setup Project chip clicks
    projectChips.forEach(chip => {
        chip.addEventListener('click', () => {
            if (chip.classList.contains('active')) return;

            projectChips.forEach(c => c.classList.remove('active'));
            chip.classList.add('active');

            const projectId = chip.dataset.project;
            
            if (projectId === 'villa') {
                if (floorSelectorContainer) {
                    floorSelectorContainer.classList.add('hidden');
                }
                // Reset floor selection to Ground on project switch
                floorChips.forEach(c => c.classList.remove('active'));
                if (floorChips.length > 0) floorChips[0].classList.add('active');
                currentFloor = 'ground';
            } else {
                if (floorSelectorContainer) {
                    floorSelectorContainer.classList.add('hidden');
                }
            }
            
            renderRoomSelector(projectId, currentFloor);
        });
    });

    // Setup Floor chip clicks
    floorChips.forEach(chip => {
        chip.addEventListener('click', () => {
            if (chip.classList.contains('active')) return;

            floorChips.forEach(c => c.classList.remove('active'));
            chip.classList.add('active');

            currentFloor = chip.dataset.floor;
            const activeProject = document.querySelector('.project-chip.active').dataset.project;
            renderRoomSelector(activeProject, currentFloor);
        });
    });

    // Initialize first project rooms on load
    const activeProjectChip = document.querySelector('.project-chip.active');
    if (activeProjectChip) {
        const projectId = activeProjectChip.dataset.project;
        if (floorSelectorContainer) floorSelectorContainer.classList.add('hidden');
        renderRoomSelector(projectId, 'ground');
    }
}

/* ==========================================
   3. DYNAMIC AI STYLE QUIZ ENGINE
   ========================================== */
const QUIZ_QUESTIONS = [
    {
        question: "Select your signature color energy:",
        choices: [
            { title: "Warm Sand & Travertine", subtitle: "Soft cream tones, linen beige, and grounding plaster whites.", scores: { japandi: 2, minimalist: 2 } },
            { title: "Fresh Sage & Forest", subtitle: "Soothing natural greens, moss textures, and calm herbal energy.", scores: { biophilic: 3 } },
            { title: "Cozy Terracotta & Ochre", subtitle: "Warm baked clay, spice highlights, and earthy rustic soil tones.", scores: { earthy: 3 } },
            { title: "High-Contrast Charcoal & Slate", subtitle: "Bold structural darks, cool concrete greys, and clean layout edges.", scores: { modernist: 3 } }
        ]
    },
    {
        question: "Choose your spatial silhouette:",
        choices: [
            { title: "Organic curves & rounded edges", subtitle: "Flowing arches, soft pebble-shaped tables, circular beds.", scores: { japandi: 2, biophilic: 1 } },
            { title: "Structured lines & grid symmetry", subtitle: "Clean floating shelves, precise modular structures.", scores: { minimalist: 3 } },
            { title: "Bold sculptural shapes", subtitle: "Statement accent pieces, asymmetrical angles, dramatic cuts.", scores: { modernist: 3 } },
            { title: "Rustic raw textures & pillars", subtitle: "Heavy hand-carved pillars, uneven wabi-sabi finishes.", scores: { earthy: 2, japandi: 1 } }
        ]
    },
    {
        question: "What lighting mood inspires you?",
        choices: [
            { title: "Sun-drenched natural skylights", subtitle: "Open ceilings, glass domes, active shadows.", scores: { biophilic: 3 } },
            { title: "Ambient cove lights & dimmers", subtitle: "Indirect LED borders, relaxing hidden visual warmth.", scores: { japandi: 3 } },
            { title: "Statement architectural fixtures", subtitle: "Sculptural brass pendants, industrial steel floor lamps.", scores: { modernist: 3 } },
            { title: "Flickering warm fire & candles", subtitle: "Grounding hearth light, soft lanterns, glowing corners.", scores: { earthy: 2, japandi: 1 } }
        ]
    },
    {
        question: "Select your touch textile:",
        choices: [
            { title: "Raw slubby natural linen", subtitle: "Breathable textured fabric with natural rich folds.", scores: { japandi: 3 } },
            { title: "Textured boucle wool", subtitle: "Plush cozy knits, soft clouds, and visual depth.", scores: { minimalist: 2, japandi: 1 } },
            { title: "Luxurious polished marble", subtitle: "Cold massive stone slabs with striking brass veins.", scores: { modernist: 3 } },
            { title: "Cleft travertine & sandstone", subtitle: "Coarse organic matted stone with natural tiny cavities.", scores: { earthy: 3 } }
        ]
    },
    {
        question: "What is your dream spatial view?",
        choices: [
            { title: "Lush biophilic green garden", subtitle: "Rich window foliage, climbing ivy, indoor oxygen.", scores: { biophilic: 3 } },
            { title: "Serene quiet misty coast", subtitle: "Endless soft horizons, quiet sandy stones, grey mist.", scores: { japandi: 3 } },
            { title: "High-floor urban skyline", subtitle: "Reflective dark glass, concrete bridges, glowing street lines.", scores: { modernist: 3 } },
            { title: "Secluded forest wooden cabin", subtitle: "Smoky wood air, pine branches, heavy timber frames.", scores: { earthy: 3 } }
        ]
    }
];

const ARCHETYPES_DATABASE = {
    japandi: {
        name: "Japandi Sanctuary",
        description: "You resonate deeply with quiet luxury, organic silhouettes, and natural wabi-sabi peace. Your space thrives on calm neutral textures, breathable fabrics, and raw travertine stone layered with organic shapes to foster sensory rest.",
        materials: ["White Oak", "Raw Travertine", "Slubby Linen", "Boucle Wool", "Clay Plaster"],
        colors: ["#FAF8F5", "#E6DFD5", "#D8D1C5", "#5E6D5B", "#4A4745"]
    },
    biophilic: {
        name: "Biophilic Haven",
        description: "Your soul seeks active connection to mother nature. Your dream space is a sun-drenched sanctuary loaded with active indoor plants, soft sage plaster walls, raw stone steps, and massive glass portals that blur inside and outside.",
        materials: ["Natural Teak", "Calacatta Marble", "Sage Green Plaster", "Jute Fiber", "Water Reed"],
        colors: ["#F6F8F5", "#5E6D5B", "#6E7E6A", "#D3C2B0", "#2C3527"]
    },
    earthy: {
        name: "Earthy Haven",
        description: "You feel grounded by baked clay, open fire, and ancestral textures. Your signature space features thick plaster arches, terracotta tiles, dark heavy reclaimed timber, sandstones, and glowing candles casting cozy, warm shadows.",
        materials: ["Reclaimed Cedar", "Terracotta Clay", "Rustic Sandstone", "Wrought Iron", "Wool Felt"],
        colors: ["#FAF5F0", "#D28F79", "#B87E67", "#E6D4B9", "#3E2E29"]
    },
    modernist: {
        name: "Sculptural Modernist",
        description: "You love bold architectural statements, dramatic lighting, and museum-grade finishes. Your space is characterized by sharp angles, custom metal elements, black marble with heavy veins, and high-contrast furniture layouts.",
        materials: ["Nero Marquina Marble", "Brushed Brass", "Polished Concrete", "Full-grain Leather", "Walnut"],
        colors: ["#F9F9F9", "#1C1B1A", "#BEA382", "#6C757D", "#111111"]
    },
    minimalist: {
        name: "Organic Minimalist",
        description: "You seek spatial breathing room and clean symmetry. Your design profile focuses on highly functional modular configurations, immaculate hidden storages, soft warm whites, and precise custom millwork with zero clutter.",
        materials: ["Bleached Maple", "Honed Quartzite", "Off-white Boucle", "Matted Aluminum", "Warm Resin"],
        colors: ["#FFFFFF", "#FAF8F5", "#EBE8E3", "#CCCCCC", "#4A4745"]
    }
};

function initAIStyleQuiz() {
    const qModule = document.getElementById('quizStepModule');
    const rModule = document.getElementById('quizResultsModule');
    const qTitle = document.getElementById('quizQuestionTitle');
    const qGrid = document.getElementById('quizChoicesGrid');
    const counterText = document.getElementById('stepCounter');
    const progressFill = document.getElementById('quizProgressFill');
    const btnRetake = document.getElementById('btnRetakeQuiz');
    const btnLink = document.getElementById('btnLinkToForm');
    
    if (!qModule || !rModule || !qGrid) return;

    let currentStep = 0;
    const userScores = {
        japandi: 0,
        biophilic: 0,
        earthy: 0,
        modernist: 0,
        minimalist: 0
    };

    function renderStep() {
        const stepData = QUIZ_QUESTIONS[currentStep];
        const progressPct = ((currentStep) / QUIZ_QUESTIONS.length) * 100;
        progressFill.style.width = `${progressPct}%`;
        counterText.textContent = `Step ${currentStep + 1} of ${QUIZ_QUESTIONS.length}`;
        qTitle.textContent = stepData.question;
        qGrid.innerHTML = '';
        
        stepData.choices.forEach((choice) => {
            const card = document.createElement('div');
            card.className = 'quiz-choice-card';
            card.innerHTML = `
                <div class="choice-bullet-indicator"></div>
                <div class="choice-title">${choice.title}</div>
                <div class="choice-subtitle">${choice.subtitle}</div>
            `;
            
            card.addEventListener('click', () => {
                card.classList.add('selected');
                
                Object.keys(choice.scores).forEach(key => {
                    userScores[key] += choice.scores[key];
                });
                
                setTimeout(() => {
                    currentStep++;
                    if (currentStep < QUIZ_QUESTIONS.length) {
                        renderStep();
                    } else {
                        progressFill.style.width = '100%';
                        renderResults();
                    }
                }, 400);
            });
            
            qGrid.appendChild(card);
        });
    }

    function renderResults() {
        let winner = 'japandi';
        let maxScore = -1;
        
        Object.keys(userScores).forEach(key => {
            if (userScores[key] > maxScore) {
                maxScore = userScores[key];
                winner = key;
            }
        });

        const data = ARCHETYPES_DATABASE[winner] || ARCHETYPES_DATABASE.japandi;
        document.getElementById('resultsArchetype').textContent = data.name;
        document.getElementById('resultsDescription').textContent = data.description;
        
        const totalPoints = Object.values(userScores).reduce((a, b) => a + b, 0) || 1;
        
        const sortedScores = Object.keys(userScores)
            .map(k => ({ key: k, val: userScores[k] }))
            .sort((a, b) => b.val - a.val);
            
        const runner1 = sortedScores[0];
        const runner2 = sortedScores[1] || sortedScores[0];
        const runner3 = sortedScores[2] || sortedScores[0];
        
        const nameMap = {
            japandi: "Organic Japandi",
            biophilic: "Biophilic Greenery",
            earthy: "Earthy Curation",
            modernist: "Sculptural Modern",
            minimalist: "Warm Minimal"
        };
        
        const pct1 = Math.round((runner1.val / totalPoints) * 100);
        const pct2 = Math.round((runner2.val / totalPoints) * 100);
        const pct3 = Math.round((runner3.val / totalPoints) * 100);

        const row1 = document.getElementById('barJapandi').parentElement.parentElement;
        row1.querySelector('.stat-label').textContent = nameMap[runner1.key];
        document.getElementById('barJapandi').style.width = `${pct1}%`;
        document.getElementById('pctJapandi').textContent = `${pct1}%`;
        
        const row2 = document.getElementById('barBiophilic').parentElement.parentElement;
        row2.querySelector('.stat-label').textContent = nameMap[runner2.key];
        document.getElementById('barBiophilic').style.width = `${pct2}%`;
        document.getElementById('pctBiophilic').textContent = `${pct2}%`;
        
        const row3 = document.getElementById('barMinimalist').parentElement.parentElement;
        row3.querySelector('.stat-label').textContent = nameMap[runner3.key];
        document.getElementById('barMinimalist').style.width = `${pct3}%`;
        document.getElementById('pctMinimalist').textContent = `${pct3}%`;

        const materialTags = document.getElementById('materialTags');
        materialTags.innerHTML = '';
        data.materials.forEach(mat => {
            const span = document.createElement('span');
            span.className = 'material-tag';
            span.textContent = mat;
            materialTags.appendChild(span);
        });

        const swatchesRow = document.getElementById('swatchesRow');
        swatchesRow.innerHTML = '';
        data.colors.forEach(col => {
            const swatch = document.createElement('div');
            swatch.className = 'color-swatch-pill';
            swatch.style.backgroundColor = col;
            swatch.title = `Hex: ${col} (Click to copy)`;
            
            // Add checkmark holder
            const tick = document.createElement('span');
            tick.className = 'checkmark-tick';
            tick.innerHTML = '✓';
            swatch.appendChild(tick);
            
            swatch.addEventListener('click', () => {
                // Copy to clipboard
                navigator.clipboard.writeText(col).then(() => {
                    // Visual active tick indicator
                    swatchesRow.querySelectorAll('.color-swatch-pill').forEach(s => s.classList.remove('active'));
                    swatch.classList.add('active');
                    
                    // Breathtaking Luxury Toast Notification
                    showLuxuryToast(`✓ Hex Color ${col} Copied`);
                });
            });
            
            swatchesRow.appendChild(swatch);
        });

        qModule.classList.add('hidden');
        rModule.classList.remove('hidden');

        connectQuizToLeadForm(data.name);
    }

    btnRetake.addEventListener('click', () => {
        currentStep = 0;
        Object.keys(userScores).forEach(k => userScores[k] = 0);
        rModule.classList.add('hidden');
        qModule.classList.remove('hidden');
        renderStep();
    });

    btnLink.addEventListener('click', () => {
        // Switch view to the project inquiry panel directly
        if (typeof window.navigateInteriorView === 'function') {
            window.navigateInteriorView('contact');
        } else {
            const consultTab = document.querySelector('.nav-item[data-target="contact"]');
            if (consultTab) {
                consultTab.click();
            }
        }
    });

    renderStep();
}

// Breathtaking Luxury Toast Notification
function showLuxuryToast(message) {
    let toast = document.getElementById('luxury-toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'luxury-toast';
        toast.className = 'luxury-toast';
        document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add('visible');
    
    setTimeout(() => {
        toast.classList.remove('visible');
    }, 2200);
}

/* ==========================================
   4. AI SPACE COLOR VISUALIZER SYSTEM
   ========================================== */
function initSpaceVisualizer() {
    const baseImg = document.getElementById('visualizerBaseImg');
    const overlay = document.getElementById('visualizerBlendOverlay');
    const roomBtns = document.querySelectorAll('.room-btn');
    const dropzone = document.getElementById('uploadDropzone');
    const fileInput = document.getElementById('fileUploadInput');
    const uploadFeedback = document.getElementById('uploadFeedback');
    const btnResetUpload = document.getElementById('btnResetUpload');
    const loader = document.getElementById('visualizerLoader');
    
    if (!baseImg || !overlay) return;

    // Simulated scan processing with spinner delay
    function triggerVisualizerLoad(actionCallback) {
        if (!loader) {
            actionCallback();
            return;
        }
        loader.classList.remove('hidden');
        setTimeout(() => {
            actionCallback();
            loader.classList.add('hidden');
        }, 800);
    }

    roomBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            if (btn.classList.contains('active')) return;
            
            triggerVisualizerLoad(() => {
                roomBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                baseImg.src = btn.dataset.src;
                
                if (uploadFeedback) {
                    uploadFeedback.classList.add('hidden');
                    dropzone.classList.remove('hidden');
                }
            });
        });
    });

    if (fileInput && dropzone) {
        dropzone.addEventListener('dragover', (e) => {
            e.preventDefault();
            dropzone.style.borderColor = 'var(--accent-sage)';
            dropzone.style.backgroundColor = 'rgba(149, 86, 45, 0.08)';
        });
        
        dropzone.addEventListener('dragleave', () => {
            dropzone.style.borderColor = 'var(--border-color)';
            dropzone.style.backgroundColor = 'rgba(255, 255, 255, 0.5)';
        });
        
        dropzone.addEventListener('drop', (e) => {
            e.preventDefault();
            const file = e.dataTransfer.files[0];
            if (file && file.type.startsWith('image/')) {
                loadCustomImage(file);
            }
        });
        
        fileInput.addEventListener('change', () => {
            const file = fileInput.files[0];
            if (file) {
                loadCustomImage(file);
            }
        });
    }

    function loadCustomImage(file) {
        triggerVisualizerLoad(() => {
            const reader = new FileReader();
            reader.onload = (e) => {
                baseImg.src = e.target.result;
                roomBtns.forEach(b => b.classList.remove('active'));
                dropzone.classList.add('hidden');
                uploadFeedback.classList.remove('hidden');
            };
            reader.readAsDataURL(file);
        });
    }

    if (btnResetUpload) {
        btnResetUpload.addEventListener('click', () => {
            fileInput.value = '';
            uploadFeedback.classList.add('hidden');
            dropzone.classList.remove('hidden');
            
            const activeRoomBtn = document.querySelector('.room-btn[data-room="living"]');
            if (activeRoomBtn) {
                activeRoomBtn.click();
            }
        });
    }
}

/* ==========================================
   5. PORTFOLIO SHOWCASE MASONRY FILTERS
   ========================================== */
const filtersContainer = document.getElementById('portfolioFilters');
if (filtersContainer) {
    const tabs = filtersContainer.querySelectorAll('.filter-tab');
    const items = document.querySelectorAll('.portfolio-item');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            const filterValue = tab.dataset.filter;
            
            items.forEach(item => {
                if (filterValue === 'all' || item.dataset.category === filterValue) {
                    item.classList.remove('hidden');
                    item.style.animation = 'fadeIn 0.6s ease';
                } else {
                    item.classList.add('hidden');
                }
            });
        });
    });
}

/* ==========================================
   6. LEAD CONNECTIVITY SYSTEM
   ========================================== */
function connectQuizToLeadForm(archetypeName) {
    const pill = document.getElementById('aiStatusPill');
    const msg = document.getElementById('aiStatusMsg');
    const hiddenField = document.getElementById('hiddenAestheticProfile');
    const briefArea = document.getElementById('projectBrief');
    
    if (!pill || !msg || !hiddenField) return;

    pill.classList.remove('loading');
    pill.classList.add('connected');
    msg.innerHTML = `✓ Connected Profile: <strong>${archetypeName}</strong>`;
    hiddenField.value = archetypeName;
    msg.innerHTML = `Connected Profile: <strong>${archetypeName}</strong>`;

    const greetingText = `[Style Profile: ${archetypeName}] Hello design team! My style profile scored as a "${archetypeName}". I resonate with warm travertine sand and organic textures. `;
    
    if (briefArea && (briefArea.value.trim() === '' || briefArea.value.includes('Tell us about the site'))) {
        briefArea.value = greetingText;
    }
}

/* ==========================================
   7. INPUT VISUAL VALIDATOR
   ========================================== */
function initInquiryForm() {
    const pill = document.getElementById('aiStatusPill');
    const form = document.getElementById('consultationForm');
    const overlay = document.getElementById('formSuccessOverlay');
    const btnReset = document.getElementById('btnResetForm');
    
    if (pill) {
        pill.addEventListener('click', () => {
            if (pill.classList.contains('loading')) {
                // Switches view to Style Quiz instantly
                if (typeof window.navigateInteriorView === 'function') {
                    window.navigateInteriorView('ai-quiz');
                } else {
                    const styleQuizTab = document.querySelector('.nav-item[data-target="ai-quiz"]');
                    if (styleQuizTab) {
                        styleQuizTab.click();
                    }
                }
            }
        });
    }

    if (!form) return;

    const fields = form.querySelectorAll('input[required], select[required], textarea[required]');
    fields.forEach(field => {
        field.addEventListener('blur', () => validateField(field));
        field.addEventListener('input', () => {
            if (field.classList.contains('user-invalid')) {
                validateField(field);
            }
        });
    });

    function validateField(field) {
        if (field.value.trim() === '') {
            field.classList.remove('user-valid');
            field.classList.add('user-invalid');
        } else if (field.type === 'email' && !validateEmail(field.value)) {
            field.classList.remove('user-valid');
            field.classList.add('user-invalid');
        } else {
            field.classList.remove('user-invalid');
            field.classList.add('user-valid');
        }
    }

    function validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    if (form && overlay) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            let allValid = true;
            fields.forEach(field => {
                validateField(field);
                if (field.classList.contains('user-invalid')) {
                    allValid = false;
                }
            });

            if (!allValid) return;

            const submitBtn = document.getElementById('btnSubmitForm');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = "Connecting to Curation Office...";
            submitBtn.disabled = true;

            setTimeout(() => {
                overlay.classList.remove('hidden');
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 400);
        });
    }

    if (btnReset && overlay && form) {
        btnReset.addEventListener('click', () => {
            form.reset();
            fields.forEach(field => {
                field.classList.remove('user-valid', 'user-invalid');
            });
            overlay.classList.add('hidden');
            
            const pill = document.getElementById('aiStatusPill');
            const msg = document.getElementById('aiStatusMsg');
            if (pill) {
                pill.classList.remove('connected');
                pill.classList.add('loading');
                if (msg) {
                    msg.textContent = "Aesthetic Profile: Pending Discovery Quiz (Click to take)";
                }
                const profileField = document.getElementById('hiddenAestheticProfile');
                if (profileField) {
                    profileField.value = '';
                }
            }
            
            // Return focus to the Full Name field for a fresh submission
            const fullNameInput = document.getElementById('fullName');
            if (fullNameInput) {
                fullNameInput.focus();
            }
        });
    }
}

/* ==========================================
   8. SMART DESIGN ASSISTANT
   ========================================== */
function initDesignAssistant() {
    const widget = document.getElementById('designAssistantWidget');
    const toggle = document.getElementById('assistantToggle');
    const panel = document.getElementById('assistantPanel');
    const closeBtn = document.getElementById('assistantClose');
    const messages = document.getElementById('assistantMessages');
    const input = document.getElementById('assistantInput');
    const sendBtn = document.getElementById('assistantSend');
    const suggestions = document.getElementById('assistantSuggestions');
    const briefBtn = document.getElementById('assistantToBrief');
    const briefArea = document.getElementById('projectBrief');

    if (!widget || !toggle || !panel || !messages || !input || !sendBtn) return;

    const assistantState = {
        step: 'scope',
        profile: {
            scope: '',
            property: '',
            rooms: [],
            budget: '',
            timeline: '',
            style: '',
            notes: []
        },
        summary: ''
    };

    const FLOW = {
        scope: {
            prompt: 'Hi. What kind of work are you planning?',
            key: 'scope',
            next: 'property',
            options: ['Full home interiors', 'Renovation', 'Single room design', 'Commercial space', 'Talk to studio']
        },
        property: {
            prompt: 'Which property type is this?',
            key: 'property',
            next: 'rooms',
            options: ['Villa / independent house', 'Apartment', 'Office', 'Retail / showroom', 'Restaurant / cafe']
        },
        rooms: {
            prompt: 'Which spaces should be included? You can choose more than one, then tap Done.',
            key: 'rooms',
            next: 'budget',
            multi: true,
            options: ['Living room', 'Kitchen & dining', 'Bedrooms', 'Bathrooms', 'Balcony / terrace', 'Facade / entrance', 'Done']
        },
        budget: {
            prompt: 'What budget comfort should we plan around?',
            key: 'budget',
            next: 'timeline',
            options: ['2 - 5 lakhs', '5 - 10 lakhs', '10 - 15 lakhs', '15 lakhs+', 'Not sure yet']
        },
        timeline: {
            prompt: 'When do you want the design or execution to start?',
            key: 'timeline',
            next: 'style',
            options: ['Immediately', '1 - 2 months', '3 - 6 months', 'Flexible']
        },
        style: {
            prompt: 'What feeling should the space have?',
            key: 'style',
            next: 'summary',
            options: ['Warm and calm', 'Modern Indian', 'Minimal luxury', 'Family friendly', 'Work focused']
        }
    };

    function addMessage(role, text) {
        const message = document.createElement('div');
        message.className = `assistant-message ${role}`;
        message.textContent = text;
        messages.appendChild(message);
        messages.scrollTop = messages.scrollHeight;
    }

    function hideOptions() {
        if (!suggestions) return;
        suggestions.classList.add('hidden');
        suggestions.innerHTML = '';
    }

    function showOptions(options, primaryLabel = '') {
        if (!suggestions) return;
        suggestions.innerHTML = '';
        options.forEach(label => {
            const button = document.createElement('button');
            button.type = 'button';
            button.textContent = label;
            if (label === primaryLabel || label === 'Done') {
                button.classList.add('primary-chip');
            }
            button.addEventListener('click', () => handleChoice(label));
            suggestions.appendChild(button);
        });
        suggestions.classList.remove('hidden');
    }

    function openAssistant() {
        panel.classList.remove('hidden');
        input.focus();
    }

    function closeAssistant() {
        panel.classList.add('hidden');
    }

    function refreshSummary() {
        const profile = assistantState.profile;
        const knownRooms = profile.rooms.length ? profile.rooms.join(', ') : 'not selected yet';
        assistantState.summary = [
            `Scope: ${profile.scope || 'not selected yet'}`,
            `Property type: ${profile.property || 'not selected yet'}`,
            `Rooms/spaces: ${knownRooms}`,
            `Budget: ${profile.budget || 'not selected yet'}`,
            `Timeline: ${profile.timeline || 'not selected yet'}`,
            `Preferred feeling: ${profile.style || 'not selected yet'}`,
            `Notes: ${profile.notes.length ? profile.notes.join(' | ') : 'none yet'}`,
            `Next step: share site photos, a floor plan or rough dimensions, current condition photos and any references on WhatsApp. Interior Veydaa can then prepare a room-wise design direction.`
        ].join('\n');

        return assistantState.summary;
    }

    function getShortDirection() {
        const profile = assistantState.profile;
        const rooms = profile.rooms.length ? profile.rooms.join(', ') : 'the selected spaces';
        const materialMood = profile.style || 'warm and calm';
        return [
            `Direction: ${profile.property || 'Property'} with ${profile.scope || 'interior design'} scope.`,
            `Plan focus: ${rooms}.`,
            `First moves: circulation, storage, lighting, wet/dry zones, TV/media wall where needed, and durable finishes suited to Indian site use.`,
            `Mood: ${materialMood}, with warm wood, stone textures, concealed lighting and practical maintenance.`
        ].join('\n');
    }

    function askCurrentStep() {
        const step = FLOW[assistantState.step];
        if (!step) return;
        addMessage('bot', step.prompt);
        showOptions(step.options, step.options[0]);
    }

    function finishChat() {
        assistantState.step = 'summary';
        refreshSummary();
        addMessage('bot', `${getShortDirection()}\n\nTo make this actionable, send photos or a floor plan. I can add this summary to the project brief now.`);
        showOptions(['Add to project brief', 'Chat on WhatsApp', 'Start over'], 'Add to project brief');
    }

    function setSelectValue(selectId, visibleText) {
        const select = document.getElementById(selectId);
        if (!select) return;
        const lower = visibleText.toLowerCase();
        Array.from(select.options).forEach(option => {
            if (option.textContent.toLowerCase().includes(lower.split(' ')[0])) {
                select.value = option.value;
            }
        });
    }

    function handleSend(textValue) {
        const text = textValue.trim();
        if (!text) return;

        hideOptions();
        assistantState.profile.notes.push(text);
        addMessage('user', text);
        input.value = '';

        window.setTimeout(() => {
            const step = FLOW[assistantState.step];
            if (!step) {
                finishChat();
                return;
            }

            addMessage('bot', 'Got it. I have added that as a note.');
            assistantState.step = step.next;
            if (assistantState.step === 'summary') {
                finishChat();
            } else {
                askCurrentStep();
            }
        }, 250);
    }

    function handleChoice(label) {
        hideOptions();
        addMessage('user', label);

        if (assistantState.step === 'summary') {
            if (label === 'Add to project brief' && briefBtn) {
                briefBtn.click();
                addMessage('bot', 'Added. You can edit the brief before sending it.');
                showOptions(['Chat on WhatsApp', 'Start over']);
                return;
            }
            if (label === 'Chat on WhatsApp') {
                window.open('https://wa.me/917302215791', '_blank');
                addMessage('bot', 'Opening WhatsApp so the studio can continue with you directly.');
                showOptions(['Start over']);
                return;
            }
            if (label === 'Start over') {
                assistantState.step = 'scope';
                assistantState.profile = { scope: '', property: '', rooms: [], budget: '', timeline: '', style: '', notes: [] };
                assistantState.summary = '';
                askCurrentStep();
                return;
            }
        }

        const step = FLOW[assistantState.step];
        if (!step) return;

        if (step.multi) {
            if (label === 'Done') {
                if (!assistantState.profile.rooms.length) {
                    addMessage('bot', 'Select at least one space, or type the rooms you want planned.');
                    showOptions(step.options, 'Done');
                    return;
                }
                assistantState.step = step.next;
                askCurrentStep();
                return;
            }
            if (!assistantState.profile.rooms.includes(label)) {
                assistantState.profile.rooms.push(label);
            }
            addMessage('bot', `${label} added. Add more spaces or tap Done.`);
            showOptions(step.options, 'Done');
            return;
        }

        assistantState.profile[step.key] = label;
        if (step.key === 'scope') setSelectValue('projectType', label);
        if (step.key === 'budget') setSelectValue('estimatedBudget', label);

        assistantState.step = step.next;
        window.setTimeout(() => {
            if (assistantState.step === 'summary') {
                finishChat();
            } else {
                askCurrentStep();
            }
        }, 180);
    }

    toggle.addEventListener('click', () => {
        if (panel.classList.contains('hidden')) {
            openAssistant();
        } else {
            closeAssistant();
        }
    });

    if (closeBtn) closeBtn.addEventListener('click', closeAssistant);

    sendBtn.addEventListener('click', () => handleSend(input.value));

    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSend(input.value);
        }
    });

    if (briefBtn && briefArea) {
        briefBtn.addEventListener('click', () => {
            const summary = refreshSummary() || 'Please share room list, floor plan, budget range and timeline for a first design direction.';
            const prefix = briefArea.value.trim() ? `${briefArea.value.trim()}\n\n` : '';
            briefArea.value = `${prefix}[Interior Veydaa Chat Summary]\n${summary}`;
            showLuxuryToast('Chat summary added to project brief');
            if (typeof window.navigateInteriorView === 'function') {
                window.navigateInteriorView('contact');
            }
        });
    }

    hideOptions();
    askCurrentStep();
}
