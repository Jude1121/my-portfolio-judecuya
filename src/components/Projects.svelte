<script>
    import VillaSalome from '../lib/assets/Villa Salome Resort Prototype.png';
    import oMart from '../lib/assets/O -MART - MOBILE UI UX Prototype.png';
    import ATT from '../lib/assets/Albay Travel and Tours - Website.png';

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

    // ---------- AI Generator Projects (Video Gallery) ----------
    // Just paste a link into `src` for each video. Supported:
    //   - YouTube:       https://www.youtube.com/watch?v=XXXXXXXXXXX  (or youtu.be / shorts)
    //   - Vimeo:         https://vimeo.com/123456789
    //   - Google Drive:  https://drive.google.com/file/d/FILE_ID/view  (share = "Anyone with the link")
    //   - Facebook:      https://www.facebook.com/reel/123... (video must be set to Public)
    //   - Direct file:   https://your-host.com/video.mp4  (or a local /videos/ai-1.mp4 in static/)
    // `poster` is an optional thumbnail image URL. Leave it '' to use the automatic thumbnail.
    const videos = [
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

    const items = videos.map((v) => ({ ...v, media: parseVideo(v.src) }));

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

    // Hover preview: shows a live, scaled-down preview above a button.
    // The iframe only loads the first time its button is hovered/focused.
    let preview = null; // key of the preview currently open, e.g. "0-figma"
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

        <!-- ================= AI GENERATOR PROJECTS (VIDEO GALLERY) ================= -->
        {#if activeTab === 'ai'}
            <div
                class="panel mt-10 sm:mt-14 lg:mt-20"
                role="tabpanel"
                id="panel-ai"
                aria-labelledby="tab-ai"
            >
                <p class="mx-auto max-w-2xl text-center text-[15px] leading-relaxed text-stone-300 sm:text-base">
                    A collection of videos I generated with AI tools. Click a video to watch it and see the details.
                </p>

                <div class="mt-10 grid gap-6 sm:mt-12 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3">
                    {#each items as video, i (video.title)}
                        <article
                            use:reveal
                            class="reveal group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-stone-900 shadow-xl shadow-black/40 transition duration-300 hover:-translate-y-1 hover:border-emerald-400/60 hover:shadow-emerald-500/10"
                            style="--delay: {(i % 3) * 100}ms"
                        >
                            <!-- Thumbnail / hover preview -->
                            <button
                                type="button"
                                class="relative block aspect-video w-full overflow-hidden bg-stone-800 text-left focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-emerald-300"
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
                                <span class="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" aria-hidden="true"></span>
                                <span class="pointer-events-none absolute inset-0 flex items-center justify-center" aria-hidden="true">
                                    <span class="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-400 text-stone-950 shadow-lg shadow-emerald-500/30 transition duration-300 group-hover:scale-110">
                                        <svg class="ml-0.5 h-6 w-6" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
                                    </span>
                                </span>

                                <!-- Duration badge -->
                                {#if video.duration}
                                    <span class="absolute bottom-3 right-3 rounded-md bg-black/70 px-2 py-0.5 text-xs font-semibold text-white">
                                        {video.duration}
                                    </span>
                                {/if}
                            </button>

                            <!-- Details -->
                            <div class="flex flex-1 flex-col p-5">
                                <div class="flex items-start justify-between gap-3">
                                    <h2 class="text-lg font-bold leading-snug">{video.title}</h2>
                                    {#if video.tool}
                                        <span class="shrink-0 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2.5 py-0.5 text-xs font-semibold text-emerald-300">
                                            {video.tool}
                                        </span>
                                    {/if}
                                </div>

                                {#if video.date}
                                    <p class="mt-1 text-xs text-stone-400">{video.date}</p>
                                {/if}

                                <p class="mt-3 text-sm leading-relaxed text-stone-300">{video.description}</p>

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
                                    Watch video
                                    <svg class="h-4 w-4 transition-transform group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                                </button>
                            </div>
                        </article>
                    {/each}
                </div>
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
            class="modal-card relative my-auto w-full max-w-4xl overflow-hidden rounded-2xl border border-white/10 bg-stone-900 text-white shadow-2xl shadow-black/70"
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
                    class="aspect-video w-full border-0 bg-black"
                    src={activeVideo.media.embed}
                    title={activeVideo.title}
                    allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                    allowfullscreen
                ></iframe>
            {:else}
                <!-- svelte-ignore a11y-media-has-caption -->
                <video
                    class="aspect-video w-full bg-black"
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