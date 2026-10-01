<script>
    import links from '../lib/assets/link.png';
    import address from '../lib/assets/Location Logo.png';
    import email from '../lib/assets/email.png';
    import pNumber from '../lib/assets/phone-call.png';
    import fb from '../lib/assets/fb colored.svg';
    import ig from '../lib/assets/ig colored.svg';
    import github from '../lib/assets/github logo.svg';
    import linkedin from '../lib/assets/linked in.svg';

    const emailAddress = 'juderusselcuya0421@gmail.com';
    const phoneDisplay = '+63 946-041-9105';
    const phoneLink = '+639460419105';
    const location = 'Tiwi, Albay - Philippines';
    const mapsUrl = 'https://www.google.com/maps/search/?api=1&query=Tiwi+Albay+Philippines';

    const socials = [
        { name: 'Facebook', icon: fb, url: 'https://www.facebook.com/JUDERRRUSSEL11121' },
        { name: 'Instagram', icon: ig, url: 'https://www.instagram.com/jdrsslc_/?next=%2F' },
        { name: 'GitHub', icon: github, url: 'https://github.com/Jude1121' },
        { name: 'LinkedIn', icon: linkedin, url: 'https://www.linkedin.com/in/jude-russel-cuya-3a4233333/' }
    ];

    // Shared styles
    const card = 'fadeUp rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 to-white/[0.02] p-6 shadow-xl shadow-black/30 sm:p-7';
    const tile = 'flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white p-2.5';
    const primaryBtn = 'inline-flex items-center justify-center gap-2 rounded-full bg-emerald-400 px-5 py-3 text-sm font-semibold text-stone-950 shadow-lg shadow-emerald-500/20 transition duration-200 hover:-translate-y-0.5 hover:bg-emerald-300 active:translate-y-0 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-300';
    const outlineBtn = 'inline-flex items-center justify-center gap-2 rounded-full border border-white/25 px-5 py-3 text-sm font-semibold text-white transition duration-200 hover:-translate-y-0.5 hover:border-emerald-300 hover:bg-white/10 active:translate-y-0 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-300';

    let copied = '';

    async function copy(text, key) {
        try {
            await navigator.clipboard.writeText(text);
            copied = key;
            setTimeout(() => {
                if (copied === key) copied = '';
            }, 2000);
        } catch (err) {
            console.error('Copy failed:', err);
        }
    }
</script>

<section class="w-full bg-stone-950 px-5 py-12 text-white sm:px-8 sm:py-16 lg:px-20 lg:py-28">
    <div class="mx-auto max-w-5xl">
        <div class="mx-auto max-w-2xl text-center">
            <h1 class="fadeUp text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">Contact</h1>
            <p class="fadeUp mt-4 text-[15px] leading-relaxed text-stone-300 sm:text-base">
                Have a project, a question, or an idea? Reach out through any of these and I'll get back to you.
            </p>
        </div>

        <div class="mt-10 grid gap-4 sm:mt-14 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">

            <!-- Email (featured) -->
            <div class="{card} flex flex-col justify-between gap-6 !border-emerald-400/30 !from-emerald-400/10 sm:col-span-2 sm:p-8 lg:col-span-2">
                <div class="flex items-center gap-4">
                    <div class={tile}>
                        <img src={email} alt="" class="h-full w-full object-contain" />
                    </div>
                    <div class="min-w-0">
                        <h2 class="text-lg font-bold">Email</h2>
                        <p class="mt-1 break-all text-base text-stone-200 sm:text-xl">{emailAddress}</p>
                    </div>
                </div>
                <div class="flex flex-col gap-3 sm:flex-row">
                    <a href="mailto:{emailAddress}" class="{primaryBtn} w-full sm:w-auto">
                        <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                            <rect x="3" y="5" width="18" height="14" rx="2" />
                            <path d="M3 7l9 6 9-6" />
                        </svg>
                        Send an email
                    </a>
                    <button type="button" on:click={() => copy(emailAddress, 'email')} class="{outlineBtn} w-full sm:w-auto">
                        <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                            {#if copied === 'email'}
                                <path d="M5 13l4 4L19 7" />
                            {:else}
                                <rect x="9" y="9" width="11" height="11" rx="2" />
                                <path d="M5 15V6a2 2 0 012-2h9" />
                            {/if}
                        </svg>
                        {copied === 'email' ? 'Copied' : 'Copy email'}
                    </button>
                </div>
            </div>

            <!-- Phone -->
            <div class="{card} flex flex-col justify-between gap-6">
                <div class="flex items-center gap-4">
                    <div class={tile}>
                        <img src={pNumber} alt="" class="h-full w-full object-contain" />
                    </div>
                    <div class="min-w-0">
                        <h2 class="text-lg font-bold">Phone number</h2>
                        <p class="mt-1 text-stone-300">{phoneDisplay}</p>
                    </div>
                </div>
                <div class="flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
                    <a href="tel:{phoneLink}" class="{outlineBtn} w-full sm:w-auto">Call</a>
                    <button type="button" on:click={() => copy(phoneDisplay, 'phone')} class="{outlineBtn} w-full sm:w-auto">
                        {copied === 'phone' ? 'Copied' : 'Copy number'}
                    </button>
                </div>
            </div>

            <!-- Address -->
            <div class="{card} flex flex-col justify-between gap-6">
                <div class="flex items-center gap-4">
                    <div class={tile}>
                        <img src={address} alt="" class="h-full w-full object-contain" />
                    </div>
                    <div class="min-w-0">
                        <h2 class="text-lg font-bold">Address</h2>
                        <p class="mt-1 text-stone-300">{location}</p>
                    </div>
                </div>
                <a href={mapsUrl} target="_blank" rel="noopener noreferrer" class="{outlineBtn} w-full sm:w-auto">View on map</a>
            </div>

            <!-- Social media -->
            <div class="{card} sm:col-span-2 lg:col-span-2">
                <div class="flex items-center gap-4">
                    <div class={tile}>
                        <img src={links} alt="" class="h-full w-full object-contain" />
                    </div>
                    <h2 class="text-lg font-bold">Social media</h2>
                </div>
                <div class="mt-6 grid grid-cols-1 gap-3 min-[420px]:grid-cols-2">
                    {#each socials as social (social.name)}
                        <a
                            href={social.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            class="group flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-3 transition duration-200 hover:-translate-y-0.5 hover:border-emerald-400/60 hover:bg-white/10 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-400"
                        >
                            <span class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white p-2">
                                <img src={social.icon} alt="" class="h-full w-full object-contain" />
                            </span>
                            <span class="font-semibold">{social.name}</span>
                        </a>
                    {/each}
                </div>
            </div>

        </div>
    </div>
</section>