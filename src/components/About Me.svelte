<script>
    import logo from '$lib/assets/jude-logo-white.svg';
    import myimage2 from  '$lib/assets/ABOUT ME IMAGE.jpg';

    // Page scroll position (px). The logo rotates as you scroll.
    let scrollY = $state(0);
    const spinSpeed = 0.4; // degrees per px scrolled. Raise for faster spin.

    // Quick facts shown under the intro. Edit or add items here.
    const facts = [
        { label: 'Role', value: 'Front-End Developer | UI/UX Designer' },
        { label: 'Education', value: 'BS Information Technology - STI College Legazpi' },
        { label: 'Design tools', value: 'Figma, Adobe Illustrator, Adobe Photoshop' },
        { label: 'Hometown', value: 'Tiwi, Albay - Philippines' }
    ];

    // Scroll reveal: adds the "in" class once the element enters the viewport.
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
</script>

<svelte:window bind:scrollY />

<style>
    .scroll-spin {
        will-change: transform;
    }

    /* ---------- Scroll reveal ---------- */
    .reveal {
        opacity: 0;
        transform: translateY(40px);
        transition:
            opacity 700ms ease var(--delay, 0ms),
            transform 700ms cubic-bezier(0.2, 0.7, 0.2, 1) var(--delay, 0ms),
            border-color 300ms ease 0ms;
    }

    /* On desktop the text slides in from the left and the photo from the right */
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
        .scroll-spin {
            transform: none !important;
        }

        .reveal {
            opacity: 1;
            transform: none;
            transition: none;
        }
    }
</style>

<section class="relative isolate w-full overflow-hidden bg-gradient-to-b from-stone-950 via-emerald-950 via-70% to-emerald-950 px-5 py-12 text-white sm:px-8 sm:py-16 lg:px-20 lg:py-28">
    <!-- Decorative glow (kept away from top/bottom edges so sections blend cleanly) -->
    <div class="pointer-events-none absolute -left-40 top-1/2 -z-10 h-72 w-72 -translate-y-1/2 rounded-full bg-emerald-400/10 blur-3xl sm:h-96 sm:w-96" aria-hidden="true"></div>

    <div class="mx-auto grid max-w-6xl items-center gap-10 sm:gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">

        <!-- Photo (shown first on mobile and tablet, right side on desktop) -->
        <div use:reveal class="reveal reveal-right relative mx-auto w-full max-w-xs sm:max-w-md lg:order-2 lg:max-w-none">
            <!-- Offset outline frame -->
            <div class="absolute inset-0 translate-x-2 translate-y-2 rounded-2xl border-2 border-emerald-400/40 sm:translate-x-4 sm:translate-y-4 sm:rounded-3xl" aria-hidden="true"></div>

            <img
                class="relative z-10 h-auto w-full rounded-2xl border border-white/10 object-cover shadow-2xl shadow-black/50 sm:rounded-3xl"
                src={myimage2}
                alt="Jude Russel Cuya"
            />

            <!-- Floating circular logo badge -->
            <div class="absolute -top-4 -right-3 z-20 sm:-top-5 sm:-right-4 lg:-top-6 lg:-right-6">
                <div class="flex h-20 w-20 items-center justify-center rounded-full border-4 border-emerald-400 bg-stone-950 shadow-lg shadow-emerald-500/30 sm:h-24 sm:w-24 lg:h-30 lg:w-30">
                    <img
                        src={logo}
                        alt="my logo"
                        class="scroll-spin h-16 w-16 lg:h-25 lg:w-25"
                        style="transform: rotate({scrollY * spinSpeed}deg)"
                    >
                </div>
            </div>
        </div>

        <!-- Text -->
        <div class="min-w-0 text-center sm:text-left lg:order-1">
            <div use:reveal class="reveal reveal-left">
                <h1 class="text-4xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">About me</h1>
                <div class="mx-auto mt-4 h-1 w-14 rounded-full bg-emerald-400 sm:mx-0" aria-hidden="true"></div>
            </div>

            <div use:reveal class="reveal reveal-left mt-6 space-y-5 text-left text-md leading-relaxed text-white sm:mt-8 sm:text-base lg:text-lg" style="--delay: 120ms">
                <p>
                    I am Jude Russel Cuya, 23 years old, a fresh graduate of STI College Legazpi with a Bachelor’s degree in Information Technology. I am a Junior Front-End Developer eager to learn, grow, and contribute to your company. I am committed to delivering tasks on time and maintaining a high standard of work. In addition to my development skills, I am also proficient in UI/UX design and graphic design, with experience using tools such as Figma, Adobe Illustrator, and Adobe Photoshop. Moreover, I possess strong communication skills that allow me to effectively collaborate with team members, clearly convey ideas, and engage with clients to ensure project goals are met.
                </p>
                <p class="border-l-2 border-emerald-400/60 pl-4">
                    During my senior year, I focused on enhancing my knowledge in Front-End Development, which played a key role in our Capstone Project. Together with my groupmates, we developed an Online Hotel Reservation System for Villa Salome Resort, located in my hometown - Tiwi, Albay.
                </p>
            </div>

            <!-- Quick facts (each card rises in one after the other) -->
            <dl class="mt-8 grid gap-3 text-left sm:mt-10 sm:grid-cols-2">
                {#each facts as fact, i (fact.label)}
                    <div
                        use:reveal
                        class="reveal min-w-0 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm hover:border-emerald-400/50"
                        style="--delay: {i * 100}ms"
                    >
                        <dt class="text-sm text-white">{fact.label}</dt>
                        <dd class="mt-1 break-words font-semibold text-white">{fact.value}</dd>
                    </div>
                {/each}
            </dl>
        </div>
    </div>
</section>