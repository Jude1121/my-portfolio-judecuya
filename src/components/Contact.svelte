<script>
    import { onMount } from 'svelte';
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
    const mapEmbedUrl = 'https://www.google.com/maps?q=Tiwi,+Albay,+Philippines&output=embed';

    // Map preview shown when hovering/focusing the "View on map" button.
    // The iframe only loads the first time it's needed.
    let mapOpen = false;
    let mapLoaded = false;
    function showMap() {
        mapOpen = true;
        mapLoaded = true;
    }
    function hideMap() {
        mapOpen = false;
    }

    const socials = [
        { name: 'Facebook', icon: fb, url: 'https://www.facebook.com/JUDERRRUSSEL11121' },
        { name: 'Instagram', icon: ig, url: 'https://www.instagram.com/jdrsslc_/?next=%2F' },
        { name: 'GitHub', icon: github, url: 'https://github.com/Jude1121' },
        { name: 'LinkedIn', icon: linkedin, url: 'https://www.linkedin.com/in/jude-russel-cuya-3a4233333/' }
    ];

    // Shared styles
    const card = 'rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 to-white/[0.02] p-6 shadow-xl shadow-black/30 sm:p-7';
    const tile = 'flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white p-2.5';
    const primaryBtn = 'inline-flex items-center justify-center gap-2 rounded-full bg-emerald-400 px-5 py-3 text-sm font-semibold text-stone-950 shadow-lg shadow-emerald-500/20 transition duration-200 hover:-translate-y-0.5 hover:bg-emerald-300 active:translate-y-0 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-300';
    const outlineBtn = 'inline-flex items-center justify-center gap-2 rounded-full border border-white/25 px-5 py-3 text-sm font-semibold text-white transition duration-200 hover:-translate-y-0.5 hover:border-emerald-300 hover:bg-white/10 active:translate-y-0 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-300';

    // Scroll reveal: fades and slides an element up the first time it enters the viewport.
    // Usage: use:reveal or use:reveal={delayInMs}
    function reveal(node, delay = 0) {
        const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (reduce || !('IntersectionObserver' in window)) return;

        node.classList.add('reveal');
        node.style.transitionDelay = `${delay}ms`;

        const io = new IntersectionObserver(
            ([entry]) => {
                if (!entry.isIntersecting) return;
                node.classList.add('reveal-in');
                io.disconnect(); // animate once
            },
            { threshold: 0.15 }
        );
        io.observe(node);

        return { destroy: () => io.disconnect() };
    }

    // Fallback for browsers/contexts where navigator.clipboard is unavailable
    // (e.g. the site is opened over http, inside an iframe, or an older browser)
    function fallbackCopy(text) {
        let ta;
        try {
            ta = document.createElement('textarea');
            ta.value = text;
            ta.setAttribute('readonly', '');
            ta.style.position = 'fixed';
            ta.style.top = '0';
            ta.style.left = '-9999px';
            ta.style.opacity = '0';
            document.body.appendChild(ta);
            ta.focus();
            ta.select();
            ta.setSelectionRange(0, text.length);
            return document.execCommand('copy') === true;
        } catch (err) {
            console.error('execCommand copy failed:', err);
            return false;
        } finally {
            if (ta && ta.parentNode) ta.parentNode.removeChild(ta);
        }
    }

    // Returns 'copied' | 'manual' | 'failed'
    async function copyText(text) {
        // 1) Modern clipboard API (HTTPS / localhost only)
        if (navigator.clipboard && window.isSecureContext) {
            try {
                await navigator.clipboard.writeText(text);
                return 'copied';
            } catch (err) {
                console.error('Clipboard API failed, trying fallback:', err);
            }
        }

        // 2) Older method that works on http and in older browsers
        if (fallbackCopy(text)) return 'copied';

        // 3) Last resort: show the text so it can be copied by hand
        try {
            window.prompt('Copy this text (Ctrl+C or Cmd+C), then press Enter:', text);
            return 'manual';
        } catch (err) {
            return 'failed';
        }
    }

    // One click listener for every button with a data-copy attribute.
    // Using event delegation means it works no matter when the buttons render.
    onMount(() => {
        const timers = new WeakMap();

        const handleClick = async (event) => {
            const target = event.target;
            const btn = target && target.closest ? target.closest('[data-copy]') : null;
            if (!btn) return;

            event.preventDefault();

            const label = btn.querySelector('[data-label]');
            const copyIcon = btn.querySelector('[data-icon="copy"]');
            const checkIcon = btn.querySelector('[data-icon="check"]');

            if (label && !btn.dataset.originalLabel) {
                btn.dataset.originalLabel = label.textContent;
            }

            const showState = (text, done) => {
                if (label) label.textContent = text;
                if (copyIcon) copyIcon.classList.toggle('hidden', done);
                if (checkIcon) checkIcon.classList.toggle('hidden', !done);
            };

            let result = 'failed';
            try {
                result = await copyText(btn.dataset.copy || '');
            } catch (err) {
                console.error('Copy error:', err);
            }

            const messages = { copied: 'Copied', manual: 'Copy manually', failed: 'Copy failed' };
            showState(messages[result], result === 'copied');

            clearTimeout(timers.get(btn));
            timers.set(
                btn,
                setTimeout(() => showState(btn.dataset.originalLabel || '', false), 2000)
            );
        };

        document.addEventListener('click', handleClick);
        return () => document.removeEventListener('click', handleClick);
    });
</script>

<section class="w-full bg-stone-950 px-5 py-1 text-white sm:px-8 sm:py-16 lg:px-20 lg:py-5">
    <div class="mx-auto max-w-5xl">
        <div use:reveal class="mx-auto max-w-2xl text-center">
            <h1 class="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">Contact</h1>
            <p class="mt-4 text-[15px] leading-relaxed text-stone-300 sm:text-base">
                Have a project, a question, or an idea? Reach out through any of these and I'll get back to you.
            </p>
        </div>

        <div class="mt-10 grid gap-4 sm:mt-14 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">

            <!-- Email (featured) -->
            <div use:reveal={100} class="{card} flex flex-col justify-between gap-6 !border-emerald-400/30 !from-emerald-400/10 sm:col-span-2 sm:p-8 lg:col-span-2">
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
                    <button type="button" data-copy={emailAddress} class="{outlineBtn} w-full sm:w-auto">
                        <svg data-icon="copy" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                            <rect x="9" y="9" width="11" height="11" rx="2" />
                            <path d="M5 15V6a2 2 0 012-2h9" />
                        </svg>
                        <svg data-icon="check" class="hidden h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                            <path d="M5 13l4 4L19 7" />
                        </svg>
                        <span data-label>Copy email</span>
                    </button>
                </div>
            </div>

            <!-- Phone -->
            <div use:reveal={200} class="{card} flex flex-col justify-between gap-6">
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
                    <button type="button" data-copy={phoneDisplay} class="{outlineBtn} w-full sm:w-auto">
                        <span data-label>Copy number</span>
                    </button>
                </div>
            </div>

            <!-- Address -->
            <div use:reveal={300} class="{card} flex flex-col justify-between gap-6">
                <div class="flex items-center gap-4">
                    <div class={tile}>
                        <img src={address} alt="" class="h-full w-full object-contain" />
                    </div>
                    <div class="min-w-0">
                        <h2 class="text-lg font-bold">Address</h2>
                        <p class="mt-1 text-stone-300">{location}</p>
                    </div>
                </div>
                <div
                    class="relative w-full sm:w-auto"
                    role="presentation"
                    on:mouseenter={showMap}
                    on:mouseleave={hideMap}
                    on:focusin={showMap}
                    on:focusout={hideMap}
                >
                    <a href={mapsUrl} target="_blank" rel="noopener noreferrer" class="{outlineBtn} w-full">View on map</a>

                    <!-- Map preview (hover / focus) -->
                    <div
                        class="pointer-events-none absolute bottom-full left-0 z-20 mb-3 w-72 origin-bottom-left overflow-hidden rounded-2xl border border-white/15 bg-stone-900 shadow-2xl shadow-black/60 transition duration-300 sm:w-80
                            {mapOpen ? 'translate-y-0 scale-100 opacity-100' : 'translate-y-2 scale-95 opacity-0'}"
                        aria-hidden="true"
                    >
                        {#if mapLoaded}
                            <iframe
                                title="Map preview of {location}"
                                src={mapEmbedUrl}
                                class="block h-48 w-full border-0"
                                loading="lazy"
                                referrerpolicy="no-referrer-when-downgrade"
                                tabindex="-1"
                            ></iframe>
                        {/if}
                        <div class="flex items-center gap-2 border-t border-white/10 px-4 py-2.5 text-xs font-medium text-stone-200">
                            <span class="h-2 w-2 rounded-full bg-emerald-400"></span>
                            {location}
                        </div>
                    </div>
                </div>
            </div>

            <!-- Social media -->
            <div use:reveal={100} class="{card} sm:col-span-2 lg:col-span-2">
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

<style>
    :global(.reveal) {
        opacity: 0;
        transform: translateY(32px);
        transition: opacity 0.7s ease-out, transform 0.7s ease-out;
        will-change: opacity, transform;
    }
    :global(.reveal.reveal-in) {
        opacity: 1;
        transform: translateY(0);
    }
</style>