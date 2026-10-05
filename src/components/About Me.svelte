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
</script>

<svelte:window bind:scrollY />

<style>
    .scroll-spin {
        will-change: transform;
    }

    @media (prefers-reduced-motion: reduce) {
        .scroll-spin {
            transform: none !important;
        }
    }
</style>

<section class="relative isolate w-full overflow-hidden bg-gradient-to-b from-stone-950 via-emerald-950 via-70% to-emerald-950 px-5 py-12 text-white sm:px-8 sm:py-16 lg:px-20 lg:py-28">
    <!-- Decorative glow (kept away from top/bottom edges so sections blend cleanly) -->
    <div class="pointer-events-none absolute -left-40 top-1/2 -z-10 h-72 w-72 -translate-y-1/2 rounded-full bg-emerald-400/10 blur-3xl sm:h-96 sm:w-96" aria-hidden="true"></div>

    <div class="mx-auto grid max-w-6xl items-center gap-10 sm:gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">

        <!-- Photo (shown first on mobile and tablet, right side on desktop) -->
        <div class="fadeUp relative mx-auto w-full max-w-xs sm:max-w-md lg:order-2 lg:max-w-none">
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
        <div class="fadeUp min-w-0 text-center sm:text-left lg:order-1">
            <h1 class="text-4xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">About me</h1>
            <div class="mx-auto mt-4 h-1 w-14 rounded-full bg-emerald-400 sm:mx-0" aria-hidden="true"></div>

            <div class="mt-6 space-y-5 text-left text-md leading-relaxed text-white sm:mt-8 sm:text-base lg:text-lg">
                <p>
                    I am Jude Russel Cuya, 22 years old, a fresh graduate of STI College Legazpi with a Bachelor’s degree in Information Technology. I am a Junior Front-End Developer eager to learn, grow, and contribute to your company. I am committed to delivering tasks on time and maintaining a high standard of work. In addition to my development skills, I am also proficient in UI/UX design and graphic design, with experience using tools such as Figma, Adobe Illustrator, and Adobe Photoshop. Moreover, I possess strong communication skills that allow me to effectively collaborate with team members, clearly convey ideas, and engage with clients to ensure project goals are met.
                </p>
                <p class="border-l-2 border-emerald-400/60 pl-4">
                    During my senior year, I focused on enhancing my knowledge in Front-End Development, which played a key role in our Capstone Project. Together with my groupmates, we developed an Online Hotel Reservation System for Villa Salome Resort, located in my hometown - Tiwi, Albay.
                </p>
            </div>

            <!-- Quick facts -->
            <dl class="mt-8 grid gap-3 text-left sm:mt-10 sm:grid-cols-2">
                {#each facts as fact (fact.label)}
                    <div class="min-w-0 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm transition duration-300 hover:border-emerald-400/50">
                        <dt class="text-sm text-white">{fact.label}</dt>
                        <dd class="mt-1 break-words font-semibold text-white">{fact.value}</dd>
                    </div>
                {/each}
            </dl>
        </div>
    </div>
</section>