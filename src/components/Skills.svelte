<script>
    import { onMount } from 'svelte';
    import star from '../lib/assets/star.png';
    import graystar from '../lib/assets/gray star.png';
    import HTML from '../lib/assets/HTML.svg';
    import CSS from '../lib/assets/CSS.svg';
    import cSharp from '../lib/assets/C SHARP.svg';
    import JAVA from '../lib/assets/JAVA.svg';
    import PYTHON from '../lib/assets/python.svg';
    import javaScript from '../lib/assets/javascript.svg';
    import Tailwind from '../lib/assets/tailwind-css.svg';
    import Svelte from '../lib/assets/svelte.svg';
    import Figma from '../lib/assets/FIGMA.svg';
    import Photoshop from '../lib/assets/PHOTOSHOP.svg';

    // rating = number of filled stars (0-5). Leave `url` empty ('') for no link.
    const skills = [
        { name: 'HTML', category: 'Front-end', icon: HTML, rating: 4, experience: '4 years of experience', url: '' },
        { name: 'CSS', category: 'Front-end', icon: CSS, rating: 4, experience: '4 years of experience', url: '' },
        { name: 'JavaScript', category: 'Front-end', icon: javaScript, rating: 3, experience: '3 years of experience', url: '' },
        { name: 'Tailwind CSS', category: 'Front-end', icon: Tailwind, rating: 4, experience: '4 years of experience', url: 'https://tailwindcss.com/' },
        { name: 'Svelte', category: 'Front-end', icon: Svelte, rating: 4, experience: '4 years of experience', url: 'https://svelte.dev/' },
        { name: 'Figma', category: 'Design', icon: Figma, rating: 4, experience: '4 years of experience', url: 'https://www.figma.com/' },
        { name: 'Adobe Photoshop', category: 'Design', icon: Photoshop, rating: 4, experience: '4 years of experience', url: 'https://www.adobe.com/ph_en/products/photoshop.html' },
        { name: 'C#', category: 'Programming', icon: cSharp, rating: 3, experience: '3 years of experience', url: '' },
        { name: 'Java', category: 'Programming', icon: JAVA, rating: 4, experience: '4 years of experience', url: 'https://www.java.com/en/' },
        { name: 'Python', category: 'Programming', icon: PYTHON, rating: 1, experience: '1 year of experience', url: 'https://www.python.org/' }
    ];

    const levels = ['Beginner', 'Basic', 'Intermediate', 'Advanced', 'Expert'];

    let track;
    let progress = 0;
    let paused = false;
    let reduceMotion = false;

    function step() {
        if (!track || !track.children.length) return 0;
        const first = track.children[0];
        const second = track.children[1];
        return second ? second.offsetLeft - first.offsetLeft : first.offsetWidth;
    }

    function updateProgress() {
        if (!track) return;
        progress = Math.min(100, ((track.scrollLeft + track.clientWidth) / track.scrollWidth) * 100);
    }

    function next() {
        if (!track) return;
        const atEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 4;
        track.scrollTo({ left: atEnd ? 0 : track.scrollLeft + step(), behavior: 'smooth' });
    }

    function prev() {
        if (!track) return;
        const atStart = track.scrollLeft <= 4;
        track.scrollTo({ left: atStart ? track.scrollWidth : track.scrollLeft - step(), behavior: 'smooth' });
    }

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

    onMount(() => {
        reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        updateProgress();

        const timer = setInterval(() => {
            if (!paused && !reduceMotion) next();
        }, 4000);

        window.addEventListener('resize', updateProgress);
        return () => {
            clearInterval(timer);
            window.removeEventListener('resize', updateProgress);
        };
    });
</script>

<style>
    .dot-grid {
        background-image: radial-gradient(rgba(255, 255, 255, 0.07) 1px, transparent 1px);
        background-size: 24px 24px;
        -webkit-mask-image: radial-gradient(ellipse at center, black 20%, transparent 70%);
        mask-image: radial-gradient(ellipse at center, black 20%, transparent 70%);
    }

    .no-scrollbar {
        scrollbar-width: none;
    }
    .no-scrollbar::-webkit-scrollbar {
        display: none;
    }

    .progress-fill {
        transition: width 300ms ease;
    }

    /* ---------- Scroll reveal ---------- */
    .reveal {
        opacity: 0;
        transform: translateY(40px);
        transition:
            opacity 700ms ease var(--delay, 0ms),
            transform 700ms cubic-bezier(0.2, 0.7, 0.2, 1) var(--delay, 0ms),
            translate 300ms ease 0ms,
            border-color 300ms ease 0ms,
            background-color 300ms ease 0ms,
            box-shadow 300ms ease 0ms;
    }

    /* Cards sit inside a scrolling track, so they scale in instead of sliding
       (sliding would add scrollable overflow to the track). */
    .reveal-scale {
        transform: scale(0.94);
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
</style>

<section class="relative isolate w-full overflow-hidden bg-gradient-to-b from-emerald-950 to-stone-950 px-5 py-12 text-white sm:px-8 sm:py-16 lg:px-20 lg:py-28">
    <!-- Decorative background -->
    <div class="dot-grid pointer-events-none absolute inset-0 -z-10" aria-hidden="true"></div>
    <div class="pointer-events-none absolute left-1/2 top-28 -z-10 h-56 w-[36rem] -translate-x-1/2 rounded-full bg-emerald-400/10 blur-3xl" aria-hidden="true"></div>

    <div class="mx-auto max-w-6xl">
        <!-- Header -->
        <div class="fadeUp mx-auto max-w-2xl text-center">
            <h1 use:reveal class="reveal text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">Tech Stack</h1>
            <p use:reveal class="reveal mt-4 text-stone-300 sm:text-lg" style="--delay: 120ms">
                The languages and tools I use to design, build, and ship responsive web experiences.
            </p>
        </div>

        <!-- Carousel -->
        <div
            class="fadeUp mt-10 sm:mt-14"
            role="region"
            aria-roledescription="carousel"
            aria-label="Tech stack"
            on:mouseenter={() => (paused = true)}
            on:mouseleave={() => (paused = false)}
            on:focusin={() => (paused = true)}
            on:focusout={() => (paused = false)}
            on:touchstart|passive={() => (paused = true)}
        >
            <div
                bind:this={track}
                on:scroll={updateProgress}
                class="no-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-1 py-4 sm:gap-6"
            >
                {#each skills as skill, i (skill.name)}
                    <svelte:element
                        this={skill.url ? 'a' : 'div'}
                        use:reveal
                        href={skill.url || undefined}
                        target={skill.url ? '_blank' : undefined}
                        rel={skill.url ? 'noopener noreferrer' : undefined}
                        role="group"
                        aria-roledescription="slide"
                        aria-label="{i + 1} of {skills.length}"
                        style="--delay: {Math.min(i, 3) * 120}ms"
                        class="reveal reveal-scale group relative flex w-[78%] shrink-0 snap-start flex-col rounded-3xl border border-white/10 bg-stone-900/60 p-6 shadow-xl shadow-black/30 backdrop-blur-sm transition duration-300 hover:-translate-y-1.5 hover:border-emerald-400/60 hover:bg-stone-900/80 hover:shadow-emerald-500/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-400 sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)]"
                    >
                        <div class="flex items-start justify-between">
                            <div class="flex h-16 w-16 items-center justify-center rounded-2xl bg-white p-3 shadow-md">
                                <img src={skill.icon} alt="" class="h-full w-full object-contain" />
                            </div>
                            <span class="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-300">
                                {skill.category}
                            </span>
                        </div>

                        <h2 class="mt-6 text-xl font-bold">{skill.name}</h2>
                        <p class="mt-1 text-sm text-stone-300">{skill.experience}</p>

                        <!-- Proficiency -->
                        <div class="mt-6">
                            <div class="flex items-center justify-between text-sm">
                                <span class="font-medium text-emerald-300">{levels[skill.rating - 1]}</span>
                                <div class="flex gap-1" role="img" aria-label="{skill.rating} out of 5 stars">
                                    {#each Array(5) as _, n (n)}
                                        <img src={n < skill.rating ? star : graystar} alt="" class="h-4 w-4" />
                                    {/each}
                                </div>
                            </div>
                            <div class="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                                <div
                                    class="h-full rounded-full bg-gradient-to-r from-emerald-400 to-emerald-200"
                                    style="width: {(skill.rating / 5) * 100}%"
                                ></div>
                            </div>
                        </div>
                    </svelte:element>
                {/each}
            </div>

            <!-- Controls -->
            <div use:reveal class="reveal mt-6 flex items-center gap-5 sm:mt-8" style="--delay: 300ms">
                <div class="h-1 flex-1 overflow-hidden rounded-full bg-white/10" aria-hidden="true">
                    <div class="progress-fill h-full rounded-full bg-emerald-400" style="width: {progress}%"></div>
                </div>

                <div class="flex gap-3">
                    <button
                        type="button"
                        on:click={prev}
                        aria-label="Previous skills"
                        class="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition duration-200 hover:border-emerald-400 hover:bg-emerald-400 hover:text-stone-950 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-300 active:scale-95"
                    >
                        <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                            <path d="M15 18l-6-6 6-6" />
                        </svg>
                    </button>
                    <button
                        type="button"
                        on:click={next}
                        aria-label="Next skills"
                        class="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition duration-200 hover:border-emerald-400 hover:bg-emerald-400 hover:text-stone-950 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-300 active:scale-95"
                    >
                        <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                            <path d="M9 6l6 6-6 6" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    </div>
</section>