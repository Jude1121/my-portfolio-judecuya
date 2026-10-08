<script>
    import { onMount } from 'svelte';
    import fb from '../lib/assets/facebook-circled.svg';
    import ig from '../lib/assets/instagram-circle.svg';
    import github from '../lib/assets/github white.svg';
    import linkedin from '../lib/assets/linkedin-circled.svg';

    const socials = [
        { name: 'Facebook', href: 'https://www.facebook.com/JUDERRRUSSEL11121', icon: fb },
        { name: 'Instagram', href: 'https://www.instagram.com/jdrsslc_/?next=%2F', icon: ig },
        { name: 'GitHub', href: 'https://github.com/Jude1121', icon: github },
        { name: 'LinkedIn', href: 'https://www.linkedin.com/in/jude-russel-cuya-3a4233333/', icon: linkedin }
    ];

    let footerEl;
    let visible = false;
    let showTop = false;
    let hovering = false;

    // mouse spotlight state
    let targetX = 0, targetY = 0;
    let currentX = 0, currentY = 0;
    let rafId;

    function handlePointerMove(e) {
        const rect = footerEl.getBoundingClientRect();
        targetX = e.clientX - rect.left;
        targetY = e.clientY - rect.top;
        if (!hovering) {
            // jump to the cursor on first entry so the light doesn't swoop in from the corner
            currentX = targetX;
            currentY = targetY;
            hovering = true;
        }
    }

    function handlePointerLeave() {
        hovering = false;
    }

    function animate() {
        // ease toward the cursor for a smooth trailing effect
        currentX += (targetX - currentX) * 0.12;
        currentY += (targetY - currentY) * 0.12;
        if (footerEl) {
            footerEl.style.setProperty('--mx', `${currentX}px`);
            footerEl.style.setProperty('--my', `${currentY}px`);
        }
        rafId = requestAnimationFrame(animate);
    }

    onMount(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) visible = true;
            },
            { threshold: 0.2 }
        );
        observer.observe(footerEl);

        const onScroll = () => (showTop = window.scrollY > 400);
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();

        rafId = requestAnimationFrame(animate);

        return () => {
            observer.disconnect();
            window.removeEventListener('scroll', onScroll);
            cancelAnimationFrame(rafId);
        };
    });

    function scrollToTop() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
</script>

<footer
    bind:this={footerEl}
    on:pointermove={handlePointerMove}
    on:pointerleave={handlePointerLeave}
    class="relative w-full overflow-hidden border-t border-white/10 bg-black text-white"
>
    <!-- softer emerald background glows -->
    <div class="pointer-events-none absolute -top-24 left-1/2 h-48 w-[40rem] -translate-x-1/2 rounded-full bg-emerald-500/8 blur-3xl"></div>
    <div class="pointer-events-none absolute -bottom-32 -right-20 h-64 w-64 rounded-full bg-teal-400/5 blur-3xl"></div>

    <!-- mouse spotlight -->
    <div class="spotlight pointer-events-none absolute inset-0 transition-opacity duration-500" class:active={hovering}></div>

    <!-- dot grid revealed under the light -->
    <div class="grid-reveal pointer-events-none absolute inset-0 transition-opacity duration-500" class:active={hovering}></div>

    <!-- name watermark revealed under the light -->
    <div
        class="name-reveal pointer-events-none absolute inset-0 flex select-none items-center justify-center transition-opacity duration-500"
        class:active={hovering}
        aria-hidden="true"
    >
        <span class="name-reveal-text">Jude Russel Cuya</span>
    </div>

    <div
        class="relative mx-auto flex max-w-7xl flex-col items-center gap-8 px-6 py-16 transition-all duration-700 ease-out lg:flex-row lg:justify-between lg:px-12 lg:py-20
        {visible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}"
    >
        <!-- left: copyright -->
        <p class="text-center text-sm font-semibold tracking-wide text-emerald-100/70 lg:text-left">
            © 2026 Copyright. All Rights Reserved.
        </p>

        <!-- right: name + socials -->
        <div class="flex flex-col items-center gap-4 lg:items-end">
            <p class="name text-lg font-bold">Jude Russel Barrion Cuya</p>

            <div class="flex items-center gap-4">
                {#each socials as s (s.name)}
                    <a
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={s.name}
                        class="social group relative flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 backdrop-blur transition-all duration-300 hover:-translate-y-1.5 hover:border-white/40"
                    >
                        <img
                            src={s.icon}
                            alt=""
                            class="w-6 transition-transform duration-300 group-hover:scale-125 group-hover:rotate-6"
                        />

                        <!-- tooltip: solid white -->
                        <span
                            class="pointer-events-none absolute -top-9 whitespace-nowrap rounded-md border border-white bg-white px-2.5 py-1 text-xs font-semibold text-black opacity-0 shadow-lg shadow-emerald-500/20 transition-all duration-200 group-hover:-top-10 group-hover:opacity-100"
                        >
                            {s.name}
                            <!-- little arrow -->
                            <span class="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 border-b border-r border-white bg-white"></span>
                        </span>
                    </a>
                {/each}
            </div>
        </div>
    </div>
</footer>

<!-- back to top -->
<button
    on:click={scrollToTop}
    aria-label="Back to top"
    class="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500 text-emerald-950 shadow-xl shadow-emerald-500/40 transition-all duration-300 hover:-translate-y-1 hover:scale-110 hover:bg-emerald-400
    {showTop ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'}"
>
    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
        <path stroke-linecap="round" stroke-linejoin="round" d="M5 15l7-7 7 7" />
    </svg>
</button>

<style>
    footer {
        --mx: 50%;
        --my: 50%;
    }

    /* the light that follows the cursor */
    .spotlight {
        opacity: 0;
        background: radial-gradient(
            420px circle at var(--mx) var(--my),
            rgba(16, 185, 129, 0.28),
            rgba(16, 185, 129, 0.1) 40%,
            transparent 70%
        );
    }

    /* dots only visible inside the light radius */
    .grid-reveal {
        opacity: 0;
        background-image: radial-gradient(rgba(110, 231, 183, 0.6) 1px, transparent 1px);
        background-size: 22px 22px;
        -webkit-mask-image: radial-gradient(260px circle at var(--mx) var(--my), black, transparent 100%);
        mask-image: radial-gradient(260px circle at var(--mx) var(--my), black, transparent 100%);
    }

    /* big name watermark, only visible inside the light radius */
    .name-reveal {
        opacity: 0;
        -webkit-mask-image: radial-gradient(320px circle at var(--mx) var(--my), black 20%, transparent 100%);
        mask-image: radial-gradient(320px circle at var(--mx) var(--my), black 20%, transparent 100%);
    }

    .name-reveal-text {
        font-size: clamp(2rem, 8.5vw, 9rem);
        font-weight: 900;
        letter-spacing: -0.03em;
        line-height: 1;
        white-space: nowrap;
        color: rgba(52, 211, 153, 0.18);
        -webkit-text-stroke: 1px rgba(110, 231, 183, 0.55);
        text-shadow: 0 0 40px rgba(16, 185, 129, 0.35);
    }

    .spotlight.active,
    .grid-reveal.active,
    .name-reveal.active {
        opacity: 1;
    }

    .social:hover {
        box-shadow: 0 0 20px 3px rgba(255, 255, 255, 0.15);
        background: rgba(255, 255, 255, 0.1);
    }

    .name {
        background: linear-gradient(90deg, #ecfdf5, #6ee7b7, #ecfdf5);
        background-size: 200% 100%;
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
        transition: background-position 0.6s ease;
    }

    .name:hover {
        background-position: 100% 0;
    }
</style>