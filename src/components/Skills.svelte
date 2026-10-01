<script>
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
        { name: 'HTML', icon: HTML, rating: 4, experience: '4 years of experience', url: '' },
        { name: 'CSS', icon: CSS, rating: 4, experience: '4 years of experience', url: '' },
        { name: 'JavaScript', icon: javaScript, rating: 3, experience: '3 years of experience', url: '' },
        { name: 'C#', icon: cSharp, rating: 3, experience: '3 years of experience', url: '' },
        { name: 'Java', icon: JAVA, rating: 4, experience: '4 year of experience', url: 'https://www.java.com/en/' },
        { name: 'Python', icon: PYTHON, rating: 1, experience: '1 year of experience', url: 'https://www.python.org/' },
        { name: 'Tailwind CSS', icon: Tailwind, rating: 4, experience: '4 years of experience', url: 'https://tailwindcss.com/' },
        { name: 'Svelte', icon: Svelte, rating: 4, experience: '4 years of experience', url: 'https://svelte.dev/' },
        { name: 'Figma', icon: Figma, rating: 4, experience: '4 years of experience', url: 'https://www.figma.com/' },
        { name: 'Adobe Photoshop', icon: Photoshop, rating: 4, experience: '4 years of experience', url: 'https://www.adobe.com/ph_en/products/photoshop.html' }
    ];
</script>

<style>
</style>

<section class="w-full bg-gradient-to-b from-green-950 to-stone-950 px-5 py-12 text-white sm:px-8 sm:py-16 lg:px-20 lg:py-28">
    <div class="mx-auto max-w-4xl">
        <h1 class="fadeUp text-center text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">Skills</h1>

        <div class="mt-10 grid gap-4 sm:mt-14 sm:grid-cols-2 sm:gap-5 lg:mt-16">
            {#each skills as skill (skill.name)}
                <svelte:element
                    this={skill.url ? 'a' : 'div'}
                    href={skill.url || undefined}
                    target={skill.url ? '_blank' : undefined}
                    rel={skill.url ? 'noopener noreferrer' : undefined}
                    class="fadeUp group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 shadow-lg shadow-black/20 backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:border-emerald-400/60 hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-400 sm:p-5"
                >
                    <!-- Icon tile -->
                    <div class="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-white p-2.5 sm:h-16 sm:w-16">
                        <img src={skill.icon} alt="" class="h-full w-full object-contain" />
                    </div>

                    <!-- Details -->
                    <div class="min-w-0 flex-1">
                        <h2 class="truncate text-lg font-bold">{skill.name}</h2>

                        <div class="mt-1 flex gap-1" role="img" aria-label="{skill.rating} out of 5 stars">
                            {#each Array(5) as _, n (n)}
                                <img src={n < skill.rating ? star : graystar} alt="" class="h-4 w-4" />
                            {/each}
                        </div>

                        <p class="mt-1.5 text-sm text-stone-300">{skill.experience}</p>
                    </div>
                </svelte:element>
            {/each}
        </div>
    </div>
</section>