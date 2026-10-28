<script>
    import VillaSalome from '../lib/assets/Villa Salome Resort Prototype.png';
    import oMart from '../lib/assets/O -MART - MOBILE UI UX Prototype.png';
    import ATT from '../lib/assets/Albay Travel and Tours - Website.png';
    import PrLexu from '../lib/assets/Lexu.jpg';
    import PrStick from '../lib/assets/Stickman Profile.png';
    import PrDrama from '../lib/assets/Drama Profile.png';
    import PrFoodie from '../lib/assets/Foodie Masters Profile.png'
    import PrYsk from '../lib/assets/You should know profile picture.png';

    // ---------- Tabs ----------
    const tabs = [
        { id: 'web', label: 'Web Dev Projects' },
        { id: 'ai', label: 'AI Projects' }
    ];
    let activeTab = 'web';

    function onTabKeydown(e) {
        const idx = tabs.findIndex((t) => t.id === activeTab);
        if (e.key === 'ArrowRight') activeTab = tabs[(idx + 1) % tabs.length].id;
        else if (e.key === 'ArrowLeft') activeTab = tabs[(idx - 1 + tabs.length) % tabs.length].id;
        else return;
        e.preventDefault();
        document.getElementById(`tab-${activeTab}`)?.focus();
    }

    // ---------- AI sub-tabs (Videos = horizontal, Shorts = vertical) ----------
    const aiTabs = [
        { id: 'videos', label: 'Videos', hint: 'Horizontal' },
        { id: 'shorts', label: 'Shorts', hint: 'Vertical' }
    ];
    let aiTab = 'videos';

    function onAiTabKeydown(e) {
        const idx = aiTabs.findIndex((t) => t.id === aiTab);
        if (e.key === 'ArrowRight') aiTab = aiTabs[(idx + 1) % aiTabs.length].id;
        else if (e.key === 'ArrowLeft') aiTab = aiTabs[(idx - 1 + aiTabs.length) % aiTabs.length].id;
        else return;
        e.preventDefault();
        document.getElementById(`aitab-${aiTab}`)?.focus();
    }

    // ---------- Web Dev Projects ----------
    // Add or edit projects here. Leave `website` empty ('') to hide the "Visit website" button.
    const projects = [
        {
            title: 'Albay Travel and Tours',
            type: ['TailwindCSS', 'Svelte', 'JavaScript / TypeScript', 'Vite', 'HTML5', 'CSS', 'Pexels', 'Git & Github', 'Vercel'],
            image: ATT,
            alt: 'Albay Travel and Tours website prototype',
            figma: 'https://www.figma.com/design/egk8C5Samtl3l4tH1O1BK4/Albay-Travel-and-Tours?node-id=0-1&t=oCQ9QtKITnOFkkAJ-1',
            website: 'https://albay-travel-and-tours.vercel.app/',
            description: [
                'Albay Travel and Tours is your go-to guide for exploring the best of Albay—from the majestic Mayon Volcano to exciting adventures, scenic spots, and rich local cuisine. It provides curated travel ideas, must-visit destinations, and helpful tips to make your trip easy and memorable.',
                "Whether you're looking for thrilling outdoor activities, relaxing nature escapes, or cultural experiences, this platform helps you plan every step of your journey. Discover hidden gems, explore top attractions, and experience the beauty and warmth of Albay in the heart of Bicol."
            ]
        },
        {
            title: 'Villa Salome Hotel and Resort',
            type: 'UI/UX Figma prototype',
            image: VillaSalome,
            alt: 'Villa Salome Resort reservation system prototype',
            figma: 'https://www.figma.com/design/Q9fo4GNksmNTh8xtzMbtNg/Villa-Salome-Proto?t=ouo7oFgdk5tn7xCz-0',
            website: '',
            description: [
                'Our project involves developing a Web-Based Online Reservation Management System for Villa Salome Resort to replace traditional booking methods with a modern, efficient online platform. This system will allow guests to conveniently and accurately reserve activities and accommodations in advance, while ensuring alignment with the resort’s specific requirements. By automating the reservation process, it will reduce the workload of staff and significantly improve the speed and efficiency of managing bookings and related operations.'
            ]
        },
        {
            title: 'O-Mart',
            type: 'Mobile UI/UX prototype',
            image: oMart,
            alt: 'O-Mart mobile shopping app prototype',
            figma: 'https://www.figma.com/design/lDhKlbcb1IvAEJZThzvrF9/O-Mart?node-id=0-1&t=DwAbOm8FD6YCnXUu-1',
            website: '',
            description: [
                'O-Mart is a modern online shopping platform designed to provide users with a seamless and convenient e-commerce experience. The project features a user-friendly interface that includes secure login and authentication, product browsing, cart management, order tracking, and account settings. It also integrates essential functionalities such as ratings and reviews, notifications, and transaction processes like cash-in and checkout.',
                'Built with a focus on usability and efficiency, O-Mart aims to simplify digital shopping while ensuring security, accessibility, and a smooth user journey from product selection to purchase completion.'
            ]
        }
    ];

    // ---------- Content Channels ----------
    // Your 4 social media pages. Edit the placeholders below.
    //   name:     page name shown under the profile picture
    //   platform: small label (YouTube, Facebook, TikTok, Instagram...)
    //   url:      link to the page (opens in a new tab when clicked)
    //   avatar:   profile picture. Import it at the top (like the project images) or use a
    //             link / '/images/channel.png' from static/. Leave '' to show the page's initials.
    //   preview:  (optional) custom embed link shown on hover. Leave '' for the automatic preview:
    //               - Facebook pages  -> Facebook Page plugin (works for public pages)
    //               - YouTube         -> latest uploads, if you fill in `youtubeChannelId` (starts with "UC")
    //               - anything else   -> the site itself, scaled down
    //   Note: TikTok / Instagram / YouTube channel pages refuse to be shown inside other sites,
    //   so for those the hover shows the page name card instead. Add a `preview` embed link
    //   (for example a TikTok or Instagram post embed URL) if you want a live preview there.
    const channels = [
        {
            name: 'TimeStick TV', // TODO
            platform: 'YouTube',
            url: 'https://www.youtube.com/@TimeStickTV', // TODO
            avatar: PrStick, // TODO
            youtubeChannelId: '', // TODO e.g. 'UCxxxxxxxxxxxxxxxxxxxxxx'
            preview: ''
        },
        {
            name: 'You Should Know', // TODO
            platform: 'YouTube',
            url: 'https://www.youtube.com/@YouShouldKnow-o2d', // TODO
            avatar: PrYsk, // TODO
            preview: ''
        },
        {
            name: 'Lexu', // TODO
            platform: 'Youtube',
            url: 'https://www.youtube.com/@lexu9714', // TODO
            avatar: PrLexu, // TODO
            preview: ''
        },
        {
            name: 'Drama TV Series', // TODO
            platform: 'Facebook',
            url: 'https://www.facebook.com/profile.php?id=61594160738340', // TODO
            avatar: PrDrama, // TODO
            preview: ''
        },
         {
            name: 'Foodie Masters', // TODO
            platform: 'Facebook',
            url: 'https://www.facebook.com/profile.php?id=61595323266488', // TODO
            avatar: PrFoodie, // TODO
            preview: ''
        }
    ];

    const initials = (name) =>
        name
            .replace(/^your\s+/i, '')
            .split(/\s+/)
            .filter(Boolean)
            .slice(0, 2)
            .map((w) => w[0].toUpperCase())
            .join('');

    // Works out what to show in the hover preview for each channel.
    //  - 'embed': fills the preview box at its natural size
    //  - 'site':  loads the site at desktop size and scales it down
    //  - 'card':  nothing embeddable, so a name card is shown
    function channelPreview(ch) {
        if (ch.preview) return { kind: 'embed', src: ch.preview };

        if (/(?:facebook\.com|fb\.com)\//.test(ch.url)) {
            return {
                kind: 'embed',
                src: `https://www.facebook.com/plugins/page.php?href=${encodeURIComponent(ch.url)}&tabs=timeline&width=340&height=200&small_header=true&adapt_container_width=true&hide_cover=false&show_facepile=false`
            };
        }

        if (/youtube\.com|youtu\.be/.test(ch.url)) {
            if (ch.youtubeChannelId && ch.youtubeChannelId.startsWith('UC')) {
                return {
                    kind: 'embed',
                    src: `https://www.youtube.com/embed/videoseries?list=UU${ch.youtubeChannelId.slice(2)}`
                };
            }
            return { kind: 'card', src: '' };
        }

        if (/tiktok\.com|instagram\.com/.test(ch.url)) return { kind: 'card', src: '' };

        return { kind: 'site', src: ch.url };
    }

    const channelItems = channels.map((c) => ({ ...c, initials: initials(c.name), previewInfo: channelPreview(c) }));

    // ---------- AI Generator Projects (Video Gallery) ----------
    // Just paste a link into `src` for each video. Supported:
    //   - YouTube:       https://www.youtube.com/watch?v=XXXXXXXXXXX  (or youtu.be / shorts)
    //   - Vimeo:         https://vimeo.com/123456789
    //   - Google Drive:  https://drive.google.com/file/d/FILE_ID/view  (share = "Anyone with the link")
    //   - Facebook:      https://www.facebook.com/reel/123... (video must be set to Public)
    //   - Direct file:   https://your-host.com/video.mp4  (or a local /videos/ai-1.mp4 in static/)
    // `poster` is an optional thumbnail image URL. Leave it '' to use the automatic thumbnail.
    // `date` drives the sorting. Use the format 'Mon D, YYYY' (e.g. 'Oct 20, 2026').
    // Empty `tool` / `duration` / `tags` are simply hidden on the card.
    //
    // `orientation` (optional): 'horizontal' -> "Videos" tab, 'vertical' -> "Shorts" tab.
    //   If you leave it out, it is detected from the link:
    //   YouTube /shorts/ and Facebook /reel/ links = vertical, everything else = horizontal.
    //   Add orientation: 'horizontal' | 'vertical' to override (needed for Vimeo, Drive and direct files that are vertical).
    const videos = [
         {
            title: 'Paano kung bawat minuto ng buhay mo, may katumbas na pera?',
            src: 'https://www.youtube.com/shorts/s006KrWfzho',
            poster: '',
            tool: 'Google Flow', // TODO: add the AI generator you used
            duration: '4:37', // TODO: add the video length, e.g. '1:00'
            date: 'Oct 21, 2026',
            tags: ['Explainer'],
            description: 'What if, story about every minute of your life earns money.'
        },
        {
            title: 'Sino ang totoong nag papatay kay Heneral Luna?',
            src: 'https://www.youtube.com/watch?v=lib5qygFlr8&t=81s',
            poster: '',
            tool: 'Google Flow', // TODO: add the AI generator you used
            duration: '4:37', // TODO: add the video length, e.g. '1:00'
            date: 'Oct 21, 2026',
            tags: ['Explainer'],
            description: 'Storytelling video about who actually kill General Luna. '
        },
        {
            title: 'Bakit Lagi Kang Nauubusan ng Pera Kahit May Sahod Ka?',
            src: 'https://www.youtube.com/watch?v=DxfOtctC4Xw',
            poster: '',
            tool: 'Google Flow', // TODO: add the AI generator you used
            duration: '1:48', // TODO: add the video length, e.g. '1:00'
            date: 'Oct 20, 2026',
            tags: ['Explainer'],
            description: 'An explainer on why your money keeps running out even when you have a regular salary.'
        },
        {
            title: 'Episode 1: Ang Masungit ko na CEO',
            src: 'https://www.facebook.com/reel/1440756321332551/?s=single_unit',
            poster: '',
            tool: 'Google Flow', // AI generator used
            duration: '1:05',
            date: 'Oct 17, 2026',
            tags: ['Text-to-Video', 'Cinematic'],
            description: 'AI Love Story between the secretary in his grumpy CEO.'
        },
        {
            title: 'POV: THE LAST GAME THAT NEVER LAST ',
            src: 'https://www.youtube.com/shorts/ZD-wjTfdJOs',
            poster: '',
            tool: 'Vibes',
            duration: '0:08',
            date: 'Oct 17, 2026',
            tags: ['Animation'],
            description: 'Stickman Demonstration of POV of gamer playing on last of game of the day. '
        },
        {
            title: 'Mala Jollibee Chicken Joy',
            src: 'https://www.facebook.com/reel/1822602715442614/?s=single_unit',
            poster: '',
            tool: 'Qwen',
            duration: '0:30',
            date: 'Oct 17, 2026',
            tags: ['Text-to-Video'],
            description: 'AI Tutorial on making Jollibee-style Chickenjoy'
        },
        {
            title: 'Episode 1: Ang Katulong na tagapagmana',
            src: 'https://www.facebook.com/reel/1094025943415071/?s=single_unit',
            poster: '',
            tool: 'Google Flow',
            duration: '0:54',
            date: 'Oct 16, 2026',
            tags: ['Text-to-Video', 'Cinematic'],
            description: 'AI Drama of Maid who will be left an inheritance.'
        },
        {
            title: 'Graham Balls Tutorial',
            src: 'https://www.facebook.com/reel/4624640127772727',
            poster: '',
            tool: 'Google Flow',
            duration: '0:10',
            date: 'Oct 16, 2026',
            tags: ['Text-to-Video'],
            description: 'AI Tutorial to make a delicious and sweet Graham balls.'
        },
        {
            title: 'Buttered Garlic Shirmp Tutorial',
            src: 'https://www.facebook.com/reel/4575344796053416/?s=single_unit',
            poster: '',
            tool: 'Google Flow',
            duration: '0:10',
            date: 'Oct 16, 2026',
            tags: ['Text-to-Video'],
            description: 'AI Tutorial to make a delicious Buttered Garlic Shrimp'
        }
    ];

    // Detects what kind of link `src` is, so you can just paste a link:
    //  - YouTube / Vimeo / Google Drive / Facebook links -> embedded player
    //  - anything else (direct .mp4/.webm URL, or /videos/x.mp4) -> normal <video>
    function parseVideo(src) {
        const yt = src.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/|live\/)|youtu\.be\/)([\w-]{11})/);
        if (yt) {
            return {
                kind: 'embed',
                embed: `https://www.youtube.com/embed/${yt[1]}?autoplay=1&rel=0`,
                thumb: `https://img.youtube.com/vi/${yt[1]}/hqdefault.jpg`
            };
        }

        const vimeo = src.match(/vimeo\.com\/(?:video\/)?(\d+)/);
        if (vimeo) {
            return {
                kind: 'embed',
                embed: `https://player.vimeo.com/video/${vimeo[1]}?autoplay=1`,
                thumb: ''
            };
        }

        const drive = src.match(/drive\.google\.com\/file\/d\/([\w-]+)/);
        if (drive) {
            return {
                kind: 'embed',
                embed: `https://drive.google.com/file/d/${drive[1]}/preview`,
                thumb: `https://drive.google.com/thumbnail?id=${drive[1]}&sz=w800`
            };
        }

        if (/(?:facebook\.com|fb\.watch)\//.test(src)) {
            return {
                kind: 'embed',
                embed: `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(src)}&show_text=false&autoplay=true`,
                thumb: ''
            };
        }

        return { kind: 'file', embed: '', thumb: '' };
    }

    // Works out whether a video belongs in "Videos" (horizontal) or "Shorts" (vertical).
    // An explicit `orientation` on the video always wins.
    function detectOrientation(v) {
        if (v.orientation === 'vertical' || v.orientation === 'horizontal') return v.orientation;
        if (/youtube\.com\/shorts\//.test(v.src)) return 'vertical';
        if (/facebook\.com\/reel\//.test(v.src)) return 'vertical';
        return 'horizontal';
    }

    // `order` remembers the position in the list above, so ties (same date)
    // keep the order you wrote them in.
    const items = videos.map((v, order) => ({
        ...v,
        order,
        time: Date.parse(v.date) || 0,
        media: parseVideo(v.src),
        orientation: detectOrientation(v)
    }));

    const horizontalCount = items.filter((v) => v.orientation === 'horizontal').length;
    const verticalCount = items.filter((v) => v.orientation === 'vertical').length;
    const counts = { videos: horizontalCount, shorts: verticalCount };

    // ---------- Sorting ----------
    const sortOptions = [
        { id: 'newest', label: 'Newest first' },
        { id: 'oldest', label: 'Oldest first' },
        { id: 'title-asc', label: 'Title (A–Z)' },
        { id: 'title-desc', label: 'Title (Z–A)' },
        { id: 'tool', label: 'AI tool' }
    ];
    let sortBy = 'newest';

    const byTitle = (a, b) =>
        a.title.trim().localeCompare(b.title.trim(), undefined, { sensitivity: 'base', numeric: true });

    function sortItems(list, mode) {
        const arr = [...list];
        switch (mode) {
            case 'oldest':
                return arr.sort((a, b) => a.time - b.time || b.order - a.order);
            case 'title-asc':
                return arr.sort(byTitle);
            case 'title-desc':
                return arr.sort((a, b) => byTitle(b, a));
            case 'tool':
                // Videos with no tool listed go last
                return arr.sort(
                    (a, b) =>
                        (a.tool ? 0 : 1) - (b.tool ? 0 : 1) ||
                        a.tool.localeCompare(b.tool) ||
                        b.time - a.time ||
                        a.order - b.order
                );
            case 'newest':
            default:
                return arr.sort((a, b) => b.time - a.time || a.order - b.order);
        }
    }

    // Filter by the active sub-tab first, then sort.
    $: isShorts = aiTab === 'shorts';
    $: visibleItems = sortItems(
        items.filter((v) => v.orientation === (isShorts ? 'vertical' : 'horizontal')),
        sortBy
    );

    let activeVideo = null; // video currently open in the player modal

    function openVideo(v) {
        activeVideo = v;
    }
    function closeVideo() {
        activeVideo = null;
    }
    function onWindowKeydown(e) {
        if (e.key === 'Escape' && activeVideo) closeVideo();
    }

    // Hover-to-preview on gallery cards (desktop): plays muted, resets on leave.
    function hoverPlay(e) {
        const el = e.currentTarget.querySelector('video');
        el?.play().catch(() => {});
    }
    function hoverStop(e) {
        const el = e.currentTarget.querySelector('video');
        if (el) {
            el.pause();
            el.currentTime = 0.5;
        }
    }

    // ---------- Shared helpers ----------
    // Scroll reveal: adds the "in" class once the element scrolls into view.
    function reveal(node) {
        if (typeof IntersectionObserver === 'undefined') {
            node.classList.add('in');
            return;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    node.classList.add('in');
                    observer.disconnect();
                }
            },
            { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
        );
        observer.observe(node);

        return { destroy: () => observer.disconnect() };
    }

    // Hover preview: shows a live, scaled-down preview above a button (or below a channel profile).
    // The iframe only loads the first time its trigger is hovered/focused.
    let preview = null; // key of the preview currently open, e.g. "0-figma" or "ch-1"
    let loaded = {};

    function showPreview(key) {
        preview = key;
        loaded = { ...loaded, [key]: true };
    }
    function hidePreview() {
        preview = null;
    }

    const figmaEmbed = (url) =>
        `https://www.figma.com/embed?embed_host=share&url=${encodeURIComponent(url)}`;

    // Keeps the channel preview inside the screen: first = left edge, last = right edge, rest = centered.
    function channelAlign(i, total) {
        if (i === 0) return 'left-0';
        if (i === total - 1) return 'right-0';
        return 'left-1/2 -translate-x-1/2';
    }
</script>

<style>
    /* ---------- Scroll reveal ---------- */
    .reveal {
        opacity: 0;
        transform: translateY(40px);
        transition:
            opacity 700ms ease var(--delay, 0ms),
            transform 700ms cubic-bezier(0.2, 0.7, 0.2, 1) var(--delay, 0ms),
            border-color 300ms ease 0ms,
            box-shadow 300ms ease 0ms;
    }

    /* On desktop each project slides in from its own side of the screen */
    @media (min-width: 1024px) {
        .reveal-left {
            transform: translateX(-56px);
        }
        .reveal-right {
            transform: translateX(56px);
        }
    }

    .reveal:global(.in) {
        opacity: 1;
        transform: none;
    }

    @media (prefers-reduced-motion: reduce) {
        .reveal {
            opacity: 1;
            transform: none;
            transition: none;
        }
    }

    /* Tab panel fade-in when switching tabs */
    .panel {
        animation: panel-in 450ms ease both;
    }
    @keyframes panel-in {
        from {
            opacity: 0;
            transform: translateY(12px);
        }
        to {
            opacity: 1;
            transform: none;
        }
    }

    /* Modal pop-in */
    .modal-backdrop {
        animation: fade-in 200ms ease both;
    }
    .modal-card {
        animation: pop-in 250ms cubic-bezier(0.2, 0.7, 0.2, 1) both;
    }
    @keyframes fade-in {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
    @keyframes pop-in {
        from {
            opacity: 0;
            transform: translateY(16px) scale(0.97);
        }
        to {
            opacity: 1;
            transform: none;
        }
    }

    /* Native dropdown arrow replaced with our own */
    .sort-select {
        appearance: none;
        -webkit-appearance: none;
        background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%236ee7b7' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'><path d='M6 9l6 6 6-6'/></svg>");
        background-repeat: no-repeat;
        background-position: right 0.85rem center;
        background-size: 1rem;
    }

    @media (prefers-reduced-motion: reduce) {
        .panel,
        .modal-backdrop,
        .modal-card {
            animation: none;
        }
    }
</style>

<svelte:window on:keydown={onWindowKeydown} />

<section class="w-full bg-stone-950 text-white px-5 py-12 sm:px-8 sm:py-16 lg:px-20 lg:py-28">
    <div class="mx-auto max-w-6xl">
        <h1 use:reveal class="reveal text-center text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">Projects</h1>

        <!-- Tab navigation -->
        <div class="mt-8 flex justify-center sm:mt-10">
            <div
                role="tablist"
                aria-label="Project categories"
                tabindex="-1"
                class="inline-flex w-full max-w-xl gap-1 rounded-full border border-white/10 bg-stone-900 p-1 sm:w-auto"
                on:keydown={onTabKeydown}
            >
                {#each tabs as tab (tab.id)}
                    <button
                        type="button"
                        role="tab"
                        id="tab-{tab.id}"
                        aria-selected={activeTab === tab.id}
                        aria-controls="panel-{tab.id}"
                        tabindex={activeTab === tab.id ? 0 : -1}
                        on:click={() => (activeTab = tab.id)}
                        class="flex-1 rounded-full px-4 py-2.5 text-sm font-semibold transition duration-200 sm:flex-none sm:px-7 sm:text-base focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-300
                            {activeTab === tab.id
                            ? 'bg-emerald-400 text-stone-950 shadow-lg shadow-emerald-500/20'
                            : 'text-stone-300 hover:bg-white/10 hover:text-white'}"
                    >
                        {tab.label}
                    </button>
                {/each}
            </div>
        </div>

        <!-- ================= WEB DEV PROJECTS ================= -->
        {#if activeTab === 'web'}
            <div
                class="panel mt-10 flex flex-col gap-16 sm:mt-14 sm:gap-20 lg:mt-20 lg:gap-32"
                role="tabpanel"
                id="panel-web"
                aria-labelledby="tab-web"
            >
                {#each projects as project, i (project.title)}
                    <article class="grid items-center gap-6 sm:gap-8 lg:grid-cols-2 lg:gap-16">
                        <!-- Image (alternates sides on desktop) -->
                        <a
                            use:reveal
                            href={project.website || project.figma}
                            target="_blank"
                            rel="noopener noreferrer"
                            class="reveal {i % 2 === 0 ? 'reveal-left' : 'reveal-right'} group block overflow-hidden rounded-2xl sm:rounded-3xl border border-white/10 bg-stone-900 shadow-2xl shadow-black/50 transition duration-300 hover:border-emerald-400/60 hover:shadow-emerald-500/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-400 {i % 2 === 1 ? 'lg:order-2' : ''}"
                        >
                            <img
                                class="h-auto w-full max-w-full transition duration-500 group-hover:scale-105"
                                src={project.image}
                                alt={project.alt}
                            />
                        </a>

                        <!-- Text -->
                        <div use:reveal class="reveal {i % 2 === 0 ? 'reveal-right' : 'reveal-left'} min-w-0" style="--delay: 150ms">
                            <h2 class="text-xl font-bold sm:text-2xl lg:text-3xl">{project.title}</h2>
                            <div class="mt-3 flex flex-wrap gap-2">
                                {#each [].concat(project.type) as tech (tech)}
                                    <span class="inline-block rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-sm font-medium text-emerald-300">
                                        {tech}
                                    </span>
                                {/each}
                            </div>

                            <div class="mt-5 space-y-4 text-[15px] leading-relaxed text-stone-300 sm:mt-6 sm:text-base">
                                {#each project.description as paragraph (paragraph)}
                                    <p>{paragraph}</p>
                                {/each}
                            </div>

                            <!-- Buttons -->
                            <div class="mt-7 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:gap-4">
                                <!-- View prototype + hover preview -->
                                <div
                                    class="relative w-full sm:w-auto"
                                    role="presentation"
                                    on:mouseenter={() => showPreview(`${i}-figma`)}
                                    on:mouseleave={hidePreview}
                                    on:focusin={() => showPreview(`${i}-figma`)}
                                    on:focusout={hidePreview}
                                >
                                    <a
                                        href={project.figma}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        class="group relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-emerald-400 px-6 py-3.5 sm:w-auto sm:py-3 font-semibold text-stone-950 shadow-lg shadow-emerald-500/20 transition duration-200 hover:-translate-y-1 hover:scale-105 hover:bg-emerald-300 hover:shadow-xl hover:shadow-emerald-400/50 active:translate-y-0 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-300"
                                    >
                                        <!-- Shine sweep on hover -->
                                        <span class="pointer-events-none absolute inset-y-0 -left-full w-1/2 -skew-x-12 bg-white/50 transition-all duration-700 ease-out group-hover:left-[150%]" aria-hidden="true"></span>

                                        <!-- Prototype icon -->
                                        <svg class="relative h-5 w-5 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                                            <rect x="3" y="3" width="18" height="18" rx="3" />
                                            <path d="M8 16l3-8 3 8M9 13.5h4" />
                                        </svg>
                                        <span class="relative">View prototype</span>
                                    </a>

                                    <!-- Prototype preview (hover / focus) -->
                                    <div
                                        class="pointer-events-none absolute bottom-full left-0 z-20 mb-3 w-80 max-w-[calc(100vw-2.5rem)] origin-bottom-left overflow-hidden rounded-2xl border border-white/15 bg-stone-900 shadow-2xl shadow-black/60 transition duration-300
                                            {preview === `${i}-figma` ? 'translate-y-0 scale-100 opacity-100' : 'translate-y-2 scale-95 opacity-0'}"
                                        aria-hidden="true"
                                    >
                                        <div class="relative h-[200px] w-full overflow-hidden bg-stone-800">
                                            {#if loaded[`${i}-figma`]}
                                                <iframe
                                                    title="Preview of {project.title} prototype"
                                                    src={figmaEmbed(project.figma)}
                                                    class="absolute left-0 top-0 h-[800px] w-[1280px] origin-top-left scale-[0.25] border-0"
                                                    loading="lazy"
                                                    tabindex="-1"
                                                ></iframe>
                                            {/if}
                                        </div>
                                        <div class="flex items-center gap-2 border-t border-white/10 px-4 py-2.5 text-xs font-medium text-stone-200">
                                            <span class="h-2 w-2 rounded-full bg-emerald-400"></span>
                                            {project.title} · Figma prototype
                                        </div>
                                    </div>
                                </div>

                                {#if project.website}
                                    <!-- Visit website + hover preview -->
                                    <div
                                        class="relative w-full sm:w-auto"
                                        role="presentation"
                                        on:mouseenter={() => showPreview(`${i}-site`)}
                                        on:mouseleave={hidePreview}
                                        on:focusin={() => showPreview(`${i}-site`)}
                                        on:focusout={hidePreview}
                                    >
                                        <a
                                            href={project.website}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            class="group relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-full border border-white/25 px-6 py-3.5 sm:w-auto sm:py-3 font-semibold text-white transition duration-200 hover:-translate-y-1 hover:scale-105 hover:border-emerald-300 hover:bg-white/10 hover:text-emerald-200 hover:shadow-lg hover:shadow-emerald-500/20 active:translate-y-0 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-300"
                                        >
                                            <!-- Shine sweep on hover -->
                                            <span class="pointer-events-none absolute inset-y-0 -left-full w-1/2 -skew-x-12 bg-white/15 transition-all duration-700 ease-out group-hover:left-[150%]" aria-hidden="true"></span>

                                            <!-- Globe icon -->
                                            <svg class="relative h-5 w-5 transition-transform duration-700 group-hover:rotate-[360deg]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                                                <circle cx="12" cy="12" r="9" />
                                                <path d="M3 12h18M12 3c3 3.5 3 14.5 0 18M12 3c-3 3.5-3 14.5 0 18" />
                                            </svg>
                                            <span class="relative">Visit website</span>
                                            <!-- External link icon -->
                                            <svg class="relative h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                                                <path d="M7 17L17 7M8 7h9v9" />
                                            </svg>
                                        </a>

                                        <!-- Website preview (hover / focus) -->
                                        <div
                                            class="pointer-events-none absolute bottom-full left-0 z-20 mb-3 w-80 max-w-[calc(100vw-2.5rem)] origin-bottom-left overflow-hidden rounded-2xl border border-white/15 bg-stone-900 shadow-2xl shadow-black/60 transition duration-300
                                                {preview === `${i}-site` ? 'translate-y-0 scale-100 opacity-100' : 'translate-y-2 scale-95 opacity-0'}"
                                            aria-hidden="true"
                                        >
                                            <div class="relative h-[200px] w-full overflow-hidden bg-stone-800">
                                                {#if loaded[`${i}-site`]}
                                                    <iframe
                                                        title="Preview of {project.title} website"
                                                        src={project.website}
                                                        class="absolute left-0 top-0 h-[800px] w-[1280px] origin-top-left scale-[0.25] border-0"
                                                        loading="lazy"
                                                        tabindex="-1"
                                                    ></iframe>
                                                {/if}
                                            </div>
                                            <div class="flex items-center gap-2 border-t border-white/10 px-4 py-2.5 text-xs font-medium text-stone-200">
                                                <span class="h-2 w-2 rounded-full bg-emerald-400"></span>
                                                {project.title} · Live website
                                            </div>
                                        </div>
                                    </div>
                                {/if}
                            </div>
                        </div>
                    </article>
                {/each}
            </div>
        {/if}

        <!-- ================= AI GENERATOR PROJECTS (CHANNELS + VIDEOS + SHORTS) ================= -->
        {#if activeTab === 'ai'}
            <div
                class="panel mt-10 sm:mt-14 lg:mt-20"
                role="tabpanel"
                id="panel-ai"
                aria-labelledby="tab-ai"
            >
                <!-- ===== Content Channels ===== -->
                <div class="text-center">
                    <h2 class="text-2xl font-bold tracking-tight sm:text-3xl">Content Channels</h2>
                    <p class="mx-auto mt-3 max-w-2xl text-[15px] leading-relaxed text-stone-300 sm:text-base">
                        Where my AI videos are published. Hover a profile to peek at the page, or click to open it.
                    </p>
                </div>

                <div class="mt-8 flex flex-wrap items-start justify-center gap-x-6 gap-y-8 sm:mt-10 sm:gap-x-12">
                    {#each channelItems as ch, i (ch.name + i)}
                        <div
                            class="relative w-[40%] sm:w-36"
                            role="presentation"
                            on:mouseenter={() => showPreview(`ch-${i}`)}
                            on:mouseleave={hidePreview}
                            on:focusin={() => showPreview(`ch-${i}`)}
                            on:focusout={hidePreview}
                        >
                            <a
                                use:reveal
                                href={ch.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                style="--delay: {i * 100}ms"
                                class="reveal group flex flex-col items-center text-center focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-300"
                            >
                                <!-- Profile picture -->
                                <span
                                    class="relative flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border-2 border-white/15 bg-stone-900 shadow-xl shadow-black/40 ring-4 ring-transparent transition duration-300 group-hover:-translate-y-1 group-hover:border-emerald-400 group-hover:ring-emerald-400/20 sm:h-28 sm:w-28"
                                >
                                    {#if ch.avatar}
                                        <img
                                            class="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                                            src={ch.avatar}
                                            alt="{ch.name} profile picture"
                                            loading="lazy"
                                        />
                                    {:else}
                                        <span class="flex h-full w-full items-center justify-center bg-gradient-to-br from-emerald-700/60 via-stone-800 to-stone-900 text-2xl font-extrabold text-emerald-200 sm:text-3xl" aria-hidden="true">
                                            {ch.initials}
                                        </span>
                                    {/if}
                                </span>

                                <!-- Page name -->
                                <span class="mt-4 text-sm font-bold leading-snug text-white transition group-hover:text-emerald-300 sm:text-base">{ch.name}</span>
                                <span class="mt-0.5 text-xs text-stone-400">{ch.platform}</span>
                            </a>

                            <!-- Site preview (hover / focus, desktop only) -->
                            <div
                                class="pointer-events-none absolute top-full z-30 mt-3 hidden w-[340px] origin-top overflow-hidden rounded-2xl border border-white/15 bg-stone-900 shadow-2xl shadow-black/60 transition duration-300 sm:block {channelAlign(i, channelItems.length)}
                                    {preview === `ch-${i}` ? 'translate-y-0 scale-100 opacity-100' : '-translate-y-2 scale-95 opacity-0'}"
                                aria-hidden="true"
                            >
                                <div class="relative h-[200px] w-full overflow-hidden bg-stone-800">
                                    {#if ch.previewInfo.kind === 'card'}
                                        <div class="flex h-full w-full flex-col items-center justify-center gap-3 bg-gradient-to-br from-emerald-900/40 via-stone-800 to-stone-900 px-6 text-center">
                                            <span class="flex h-16 w-16 items-center justify-center overflow-hidden rounded-full border border-white/20 bg-stone-900 text-xl font-extrabold text-emerald-200">
                                                {#if ch.avatar}
                                                    <img class="h-full w-full object-cover" src={ch.avatar} alt="" />
                                                {:else}
                                                    {ch.initials}
                                                {/if}
                                            </span>
                                            <span class="text-base font-bold text-white">{ch.name}</span>
                                            <span class="text-xs text-stone-300">{ch.platform} · Click to open the page</span>
                                        </div>
                                    {:else if loaded[`ch-${i}`]}
                                        {#if ch.previewInfo.kind === 'embed'}
                                            <iframe
                                                title="Preview of {ch.name}"
                                                src={ch.previewInfo.src}
                                                class="absolute left-0 top-0 h-full w-full border-0"
                                                loading="lazy"
                                                tabindex="-1"
                                                allow="encrypted-media; picture-in-picture"
                                            ></iframe>
                                        {:else}
                                            <iframe
                                                title="Preview of {ch.name}"
                                                src={ch.previewInfo.src}
                                                class="absolute left-0 top-0 h-[800px] w-[1280px] origin-top-left scale-[0.265] border-0"
                                                loading="lazy"
                                                tabindex="-1"
                                            ></iframe>
                                        {/if}
                                    {/if}
                                </div>
                                <div class="flex items-center gap-2 border-t border-white/10 px-4 py-2.5 text-xs font-medium text-stone-200">
                                    <span class="h-2 w-2 rounded-full bg-emerald-400"></span>
                                    {ch.name} · {ch.platform}
                                </div>
                            </div>
                        </div>
                    {/each}
                </div>

                <!-- ===== Videos made for these channels ===== -->
                <div class="mt-16 border-t border-white/10 pt-12 text-center sm:mt-20 sm:pt-16">
                    <h2 class="text-2xl font-bold tracking-tight sm:text-3xl">My AI Videos</h2>
                    <p class="mx-auto mt-3 max-w-2xl text-[15px] leading-relaxed text-stone-300 sm:text-base">
                        A collection of videos I generated with AI tools. Click a video to watch it and see the details.
                    </p>
                </div>

                <!-- Videos / Shorts sub-tabs -->
                <div class="mt-8 flex justify-center">
                    <div
                        role="tablist"
                        aria-label="AI project formats"
                        tabindex="-1"
                        class="inline-flex w-full max-w-md gap-6 border-b border-white/10 sm:w-auto sm:gap-10"
                        on:keydown={onAiTabKeydown}
                    >
                        {#each aiTabs as t (t.id)}
                            <button
                                type="button"
                                role="tab"
                                id="aitab-{t.id}"
                                aria-selected={aiTab === t.id}
                                aria-controls="aipanel-{t.id}"
                                tabindex={aiTab === t.id ? 0 : -1}
                                on:click={() => (aiTab = t.id)}
                                class="relative flex flex-1 items-center justify-center gap-2 px-2 pb-3 text-sm font-semibold transition duration-200 sm:flex-none sm:px-3 sm:text-base focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-300
                                    {aiTab === t.id ? 'text-emerald-300' : 'text-stone-400 hover:text-white'}"
                            >
                                <!-- Orientation icon: wide rectangle for Videos, tall rectangle for Shorts -->
                                <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                                    {#if t.id === 'videos'}
                                        <rect x="2" y="6" width="20" height="12" rx="2.5" />
                                        <path d="M10 9.5v5l4.5-2.5z" fill="currentColor" stroke="none" />
                                    {:else}
                                        <rect x="6" y="2" width="12" height="20" rx="2.5" />
                                        <path d="M10.5 9v6l4.5-3z" fill="currentColor" stroke="none" />
                                    {/if}
                                </svg>
                                {t.label}
                                <span
                                    class="rounded-full px-2 py-0.5 text-xs font-bold
                                        {aiTab === t.id ? 'bg-emerald-400 text-stone-950' : 'bg-white/10 text-stone-300'}"
                                >
                                    {counts[t.id]}
                                </span>
                                <!-- Active underline -->
                                <span
                                    class="absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-emerald-400 transition-opacity duration-200 {aiTab === t.id ? 'opacity-100' : 'opacity-0'}"
                                    aria-hidden="true"
                                ></span>
                            </button>
                        {/each}
                    </div>
                </div>

                <!-- Sort bar -->
                <div class="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:items-center sm:justify-between">
                    <p class="text-sm text-stone-400" aria-live="polite">
                        {visibleItems.length}
                        {isShorts ? (visibleItems.length === 1 ? 'short' : 'shorts') : visibleItems.length === 1 ? 'video' : 'videos'}
                    </p>

                    <div class="flex items-center gap-3">
                        <label for="video-sort" class="text-sm font-medium text-stone-300">Sort by</label>
                        <select
                            id="video-sort"
                            bind:value={sortBy}
                            class="sort-select w-full cursor-pointer rounded-full border border-white/15 bg-stone-900 py-2.5 pl-4 pr-10 text-sm font-semibold text-white transition duration-200 hover:border-emerald-400/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-300 sm:w-auto"
                        >
                            {#each sortOptions as opt (opt.id)}
                                <option class="bg-stone-900 text-white" value={opt.id}>{opt.label}</option>
                            {/each}
                        </select>
                    </div>
                </div>

                {#key aiTab}
                    <div
                        class="panel mt-6"
                        role="tabpanel"
                        id="aipanel-{aiTab}"
                        aria-labelledby="aitab-{aiTab}"
                    >
                        {#if visibleItems.length === 0}
                            <div class="rounded-2xl border border-dashed border-white/15 bg-stone-900/50 px-6 py-16 text-center text-stone-400">
                                Nothing here yet. {isShorts ? 'Vertical shorts' : 'Horizontal videos'} will show up in this tab.
                            </div>
                        {:else}
                            <div
                                class="grid gap-6 sm:gap-8
                                    {isShorts
                                    ? 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 sm:gap-6'
                                    : 'sm:grid-cols-2 lg:grid-cols-3'}"
                            >
                                {#each visibleItems as video, i (video.title)}
                                    <article
                                        use:reveal
                                        class="reveal group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-stone-900 shadow-xl shadow-black/40 transition duration-300 hover:-translate-y-1 hover:border-emerald-400/60 hover:shadow-emerald-500/10"
                                        style="--delay: {(i % (isShorts ? 4 : 3)) * 100}ms"
                                    >
                                        <!-- Thumbnail / hover preview -->
                                        <button
                                            type="button"
                                            class="relative block w-full overflow-hidden bg-stone-800 text-left focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-emerald-300
                                                {isShorts ? 'aspect-[9/16]' : 'aspect-video'}"
                                            on:click={() => openVideo(video)}
                                            on:mouseenter={hoverPlay}
                                            on:mouseleave={hoverStop}
                                            aria-label="Play {video.title}"
                                        >
                                            {#if video.media.kind === 'file'}
                                                <video
                                                    class="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                                                    src="{video.src}#t=0.5"
                                                    poster={video.poster || undefined}
                                                    preload="metadata"
                                                    muted
                                                    loop
                                                    playsinline
                                                    tabindex="-1"
                                                ></video>
                                            {:else if video.poster || video.media.thumb}
                                                <img
                                                    class="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                                                    src={video.poster || video.media.thumb}
                                                    alt="{video.title} thumbnail"
                                                    loading="lazy"
                                                />
                                            {:else}
                                                <span class="block h-full w-full bg-gradient-to-br from-emerald-900/40 via-stone-800 to-stone-900" aria-hidden="true"></span>
                                            {/if}

                                            <!-- Gradient + play button -->
                                            <span class="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" aria-hidden="true"></span>
                                            <span class="pointer-events-none absolute inset-0 flex items-center justify-center" aria-hidden="true">
                                                <span
                                                    class="flex items-center justify-center rounded-full bg-emerald-400 text-stone-950 shadow-lg shadow-emerald-500/30 transition duration-300 group-hover:scale-110
                                                        {isShorts ? 'h-12 w-12' : 'h-14 w-14'}"
                                                >
                                                    <svg class="ml-0.5 h-6 w-6" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
                                                </span>
                                            </span>

                                            <!-- Duration badge -->
                                            {#if video.duration}
                                                <span class="absolute bottom-3 right-3 rounded-md bg-black/70 px-2 py-0.5 text-xs font-semibold text-white">
                                                    {video.duration}
                                                </span>
                                            {/if}

                                            <!-- Tool badge sits on the thumbnail for shorts (cards are narrow) -->
                                            {#if isShorts && video.tool}
                                                <span class="absolute left-3 top-3 rounded-full border border-emerald-400/30 bg-black/60 px-2.5 py-0.5 text-xs font-semibold text-emerald-300 backdrop-blur-sm">
                                                    {video.tool}
                                                </span>
                                            {/if}
                                        </button>

                                        <!-- Details -->
                                        <div class="flex flex-1 flex-col {isShorts ? 'p-4' : 'p-5'}">
                                            <div class="flex items-start justify-between gap-3">
                                                <h3 class="font-bold leading-snug {isShorts ? 'text-sm sm:text-base' : 'text-lg'}">{video.title}</h3>
                                                {#if !isShorts && video.tool}
                                                    <span class="shrink-0 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2.5 py-0.5 text-xs font-semibold text-emerald-300">
                                                        {video.tool}
                                                    </span>
                                                {/if}
                                            </div>

                                            {#if video.date}
                                                <p class="mt-1 text-xs text-stone-400">{video.date}</p>
                                            {/if}

                                            <p class="mt-3 text-sm leading-relaxed text-stone-300 {isShorts ? 'line-clamp-3' : ''}">{video.description}</p>

                                            {#if video.tags?.length}
                                                <div class="mt-4 flex flex-wrap gap-2">
                                                    {#each video.tags as tag (tag)}
                                                        <span class="rounded-full bg-white/5 px-2.5 py-1 text-xs font-medium text-stone-300">#{tag}</span>
                                                    {/each}
                                                </div>
                                            {/if}

                                            <button
                                                type="button"
                                                class="mt-5 inline-flex items-center gap-2 self-start text-sm font-semibold text-emerald-300 transition hover:text-emerald-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-300"
                                                on:click={() => openVideo(video)}
                                            >
                                                {isShorts ? 'Watch short' : 'Watch video'}
                                                <svg class="h-4 w-4 transition-transform group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                                            </button>
                                        </div>
                                    </article>
                                {/each}
                            </div>
                        {/if}
                    </div>
                {/key}
            </div>
        {/if}
    </div>
</section>

<!-- ================= VIDEO MODAL ================= -->
{#if activeVideo}
    <div
        class="modal-backdrop fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/80 p-4 backdrop-blur-sm sm:p-8"
        role="presentation"
        on:click|self={closeVideo}
    >
        <div
            class="modal-card relative my-auto w-full overflow-hidden rounded-2xl border border-white/10 bg-stone-900 text-white shadow-2xl shadow-black/70
                {activeVideo.orientation === 'vertical' ? 'max-w-sm sm:max-w-md' : 'max-w-4xl'}"
            role="dialog"
            aria-modal="true"
            aria-label={activeVideo.title}
        >
            <button
                type="button"
                class="absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white transition hover:bg-black/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-300"
                on:click={closeVideo}
                aria-label="Close video"
            >
                <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" /></svg>
            </button>

            {#if activeVideo.media.kind === 'embed'}
                <iframe
                    class="w-full border-0 bg-black {activeVideo.orientation === 'vertical' ? 'aspect-[9/16]' : 'aspect-video'}"
                    src={activeVideo.media.embed}
                    title={activeVideo.title}
                    allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                    allowfullscreen
                ></iframe>
            {:else}
                <!-- svelte-ignore a11y-media-has-caption -->
                <video
                    class="w-full bg-black {activeVideo.orientation === 'vertical' ? 'aspect-[9/16] object-contain' : 'aspect-video'}"
                    src={activeVideo.src}
                    poster={activeVideo.poster || undefined}
                    controls
                    autoplay
                    playsinline
                ></video>
            {/if}

            <div class="p-5 sm:p-7">
                <div class="flex flex-wrap items-center gap-3">
                    <h3 class="text-xl font-bold text-white sm:text-2xl">{activeVideo.title}</h3>
                    {#if activeVideo.tool}
                        <span class="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-sm font-semibold text-emerald-300">
                            {activeVideo.tool}
                        </span>
                    {/if}
                </div>

                <p class="mt-1 text-sm text-stone-400">
                    {[activeVideo.date, activeVideo.duration].filter(Boolean).join(' · ')}
                </p>

                <p class="mt-4 text-[15px] leading-relaxed text-stone-300 sm:text-base">{activeVideo.description}</p>

                {#if activeVideo.tags?.length}
                    <div class="mt-5 flex flex-wrap gap-2">
                        {#each activeVideo.tags as tag (tag)}
                            <span class="rounded-full bg-white/5 px-2.5 py-1 text-xs font-medium text-stone-300">#{tag}</span>
                        {/each}
                    </div>
                {/if}
            </div>
        </div>
    </div>
{/if}