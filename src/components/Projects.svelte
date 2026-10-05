<script>
    import VillaSalome from '../lib/assets/Villa Salome Resort Prototype.png';
    import oMart from '../lib/assets/O -MART - MOBILE UI UX Prototype.png';
    import ATT from '../lib/assets/Albay Travel and Tours - Website.png';

    // Add or edit projects here. Leave `website` empty ('') to hide the "Visit website" button.
    const projects = [
        {
            title: 'Albay Travel and Tours',
            type: 'UI/UX Figma prototype', 
            image: ATT,
            alt: 'Albay Travel and Tours website prototype',
            figma: 'https://www.figma.com/design/egk8C5Samtl3l4tH1O1BK4/Albay-Travel-and-Tours?node-id=0-1&t=oCQ9QtKITnOFkkAJ-1',
            website: 'https://albay-travel-and-tours.vercel.app/', // <- replace with your real URL
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
</style>

<section class="w-full bg-stone-950 text-white px-5 py-12 sm:px-8 sm:py-16 lg:px-20 lg:py-28">
    <div class="mx-auto max-w-6xl">
        <h1 use:reveal class="reveal text-center text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">Projects</h1>

        <div class="mt-10 flex flex-col gap-16 sm:mt-14 sm:gap-20 lg:mt-24 lg:gap-32">
            {#each projects as project, i (project.title)}
                <article class="grid items-center gap-6 sm:gap-8 lg:grid-cols-2 lg:gap-16">
                    <!-- Image (alternates sides on desktop) -->
                    <a
                        use:reveal
                        href={project.figma}
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
                        <p class="mt-3 inline-block rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-sm font-medium text-emerald-300">
                            {project.type}
                        </p>

                        <div class="mt-5 space-y-4 text-[15px] leading-relaxed text-stone-300 sm:mt-6 sm:text-base">
                            {#each project.description as paragraph (paragraph)}
                                <p>{paragraph}</p>
                            {/each}
                        </div>

                        <!-- Buttons -->
                        <div class="mt-7 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:gap-4">
                            <a
                                href={project.figma}
                                target="_blank"
                                rel="noopener noreferrer"
                                class="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-emerald-400 px-6 py-3.5 sm:w-auto sm:py-3 font-semibold text-stone-950 shadow-lg shadow-emerald-500/20 transition duration-200 hover:-translate-y-0.5 hover:bg-emerald-300 hover:shadow-emerald-400/40 active:translate-y-0 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-300"
                            >
                                <!-- Prototype icon -->
                                <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                                    <rect x="3" y="3" width="18" height="18" rx="3" />
                                    <path d="M8 16l3-8 3 8M9 13.5h4" />
                                </svg>
                                View prototype
                            </a>

                            {#if project.website}
                                <a
                                    href={project.website}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    class="group inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/25 px-6 py-3.5 sm:w-auto sm:py-3 font-semibold text-white transition duration-200 hover:-translate-y-0.5 hover:border-emerald-300 hover:bg-white/10 active:translate-y-0 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-300"
                                >
                                    <!-- Globe icon -->
                                    <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                                        <circle cx="12" cy="12" r="9" />
                                        <path d="M3 12h18M12 3c3 3.5 3 14.5 0 18M12 3c-3 3.5-3 14.5 0 18" />
                                    </svg>
                                    Visit website
                                    <!-- External link icon -->
                                    <svg class="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                                        <path d="M7 17L17 7M8 7h9v9" />
                                    </svg>
                                </a>
                            {/if}
                        </div>
                    </div>
                </article>
            {/each}
        </div>
    </div>
</section>