<script>
  import { onMount } from 'svelte';
  import Logo from '../lib/assets/jude-logo-white.svg';

  const links = [
    { label: 'HOME', href: '#Home' },
    { label: 'ABOUT', href: '#AboutMe' },
    { label: 'SKILLS', href: '#Skills' },
    { label: 'PROJECT', href: '#Project' },
    { label: 'CONTACT', href: '#Contact' }
  ];

  let open = false;
  let hidden = false; // navbar slides away while scrolling down
  let scrolled = false;
  let progress = 0;
  let active = '#Home';

  // Sliding highlight (desktop)
  let navList;
  let linkEls = [];
  let hovered = null;
  let indicator = { left: 0, width: 0, ready: false };

  $: activeIndex = Math.max(0, links.findIndex((l) => l.href === active));
  $: target = hovered ?? activeIndex;
  $: measure(target, linkEls);

  function measure(index, els) {
    const el = els[index];
    if (!el || !navList) return;
    const a = el.getBoundingClientRect();
    const b = navList.getBoundingClientRect();
    if (!a.width) return; // list is display:none (mobile), skip
    indicator = {
      left: a.left - b.left - navList.clientLeft,
      width: a.width,
      ready: true
    };
  }

  // Lock page scroll while the mobile menu is open
  $: if (typeof document !== 'undefined') {
    document.body.style.overflow = open ? 'hidden' : '';
  }

  let lastY = 0;
  function onScroll() {
    const y = window.scrollY;
    scrolled = y > 10;

    // Always treat HOME as active at the very top
    if (y < 100) active = '#Home';

    const max = document.documentElement.scrollHeight - window.innerHeight;
    progress = max > 0 ? Math.min(y / max, 1) : 0;

    if (!open) {
      if (y > lastY + 6 && y > 140) hidden = true;
      else if (y < lastY - 6 || y < 140) hidden = false;
    }
    lastY = y;
  }

  function onKeydown(e) {
    if (e.key === 'Escape') open = false;
  }

  function closeMenu() {
    open = false;
  }

  onMount(() => {
    onScroll();
    measure(target, linkEls);

    // Re-measure when the list or any link changes size (fonts, layout shifts)
    const ro = new ResizeObserver(() => measure(target, linkEls));
    if (navList) ro.observe(navList);
    linkEls.forEach((el) => el && ro.observe(el));
    document.fonts?.ready.then(() => measure(target, linkEls));

    // Scroll-spy
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) active = `#${entry.target.id}`;
        }
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );
    links.forEach(({ href }) => {
      const el = document.querySelector(href);
      if (el) observer.observe(el);
    });

    return () => {
      observer.disconnect();
      ro.disconnect();
      document.body.style.overflow = '';
    };
  });
</script>

<svelte:window on:scroll={onScroll} on:keydown={onKeydown} on:resize={() => measure(target, linkEls)} />

<header
  class="fixed inset-x-0 top-3 z-50 px-3 text-white transition-transform duration-500 ease-out sm:top-4 sm:px-6
    {hidden && !open ? '-translate-y-[160%]' : 'translate-y-0'}"
>
  <div class="relative mx-auto max-w-5xl">
    <!-- Floating pill -->
    <div
      class="relative flex h-14 items-center justify-between overflow-hidden rounded-full border pl-4 pr-2 backdrop-blur-xl transition-all duration-300 sm:pl-6
        {scrolled
          ? 'border-white/15 bg-black/70 shadow-2xl shadow-black/50'
          : 'border-white/10 bg-black/40 shadow-lg shadow-black/20'}"
    >
      <!-- Logo -->
      <a
        href="#Home"
        on:click={closeMenu}
        class="flex shrink-0 items-center rounded-full focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-300"
      >
        <img
          src={Logo}
          alt="Logo"
          class="w-14 select-none pointer-events-none transition-transform duration-300 hover:scale-110 hover:-rotate-3"
        />
      </a>

      <!-- Desktop links with sliding highlight -->
      <ul
        bind:this={navList}
        class="relative hidden items-center rounded-full bg-white/5 p-1 lg:flex"
        on:mouseleave={() => (hovered = null)}
      >
        <!-- Highlight that follows hover / active section -->
        <span
          class="pointer-events-none absolute inset-y-1 rounded-full bg-emerald-400 shadow-lg shadow-emerald-500/30 transition-[left,width,opacity] duration-300 ease-out
            {indicator.ready ? 'opacity-100' : 'opacity-0'}"
          style="left: {indicator.left}px; width: {indicator.width}px;"
          aria-hidden="true"
        ></span>

        {#each links as link, i (link.href)}
          <li>
            <a
              bind:this={linkEls[i]}
              href={link.href}
              aria-current={active === link.href ? 'page' : undefined}
              on:mouseenter={() => (hovered = i)}
              on:focus={() => (hovered = i)}
              on:blur={() => (hovered = null)}
              class="relative z-10 block rounded-full px-4 py-2 text-sm font-bold tracking-wide transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-300
                {target === i ? 'text-stone-950' : 'text-stone-200'}"
            >
              {link.label}
            </a>
          </li>
        {/each}
      </ul>

      <!-- Right side: CTA (desktop) + hamburger (mobile) -->
      <div class="flex items-center gap-2">
        <a
          href="#GetInTouch"
          class="group hidden items-center gap-2 rounded-full border border-emerald-400/40 px-5 py-2.5 text-sm font-bold text-emerald-300 transition duration-200 hover:bg-emerald-400 hover:text-stone-950 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-300 lg:inline-flex"
        >
          Let's talk
          <svg class="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </a>

        <button
          type="button"
          class="relative flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition duration-200 hover:bg-white/20 active:scale-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-300 lg:hidden"
          aria-controls="mobile-nav"
          aria-expanded={open}
          aria-label={open ? 'Close menu' : 'Open menu'}
          on:click={() => (open = !open)}
        >
          <span class="relative block h-4 w-5">
            <span class="absolute left-0 h-0.5 w-5 rounded-full bg-current transition-all duration-300 {open ? 'top-[7px] rotate-45 bg-emerald-300' : 'top-0'}"></span>
            <span class="absolute left-0 top-[7px] h-0.5 w-5 rounded-full bg-current transition-all duration-300 {open ? 'scale-x-0 opacity-0' : 'opacity-100'}"></span>
            <span class="absolute left-0 h-0.5 w-5 rounded-full bg-current transition-all duration-300 {open ? 'top-[7px] -rotate-45 bg-emerald-300' : 'top-[14px]'}"></span>
          </span>
        </button>
      </div>

      <!-- Scroll progress along the bottom of the pill -->
      <div
        class="absolute bottom-0 left-6 right-6 h-px origin-left bg-gradient-to-r from-emerald-500 via-emerald-300 to-transparent"
        style="transform: scaleX({progress});"
        aria-hidden="true"
      ></div>
    </div>

    <!-- Mobile dropdown card -->
    <nav
      id="mobile-nav"
      aria-hidden={!open}
      class="absolute inset-x-0 top-full mt-3 origin-top rounded-3xl border border-white/10 bg-black/85 p-3 shadow-2xl shadow-black/60 backdrop-blur-xl transition-all duration-300 lg:hidden
        {open ? 'visible translate-y-0 scale-100 opacity-100' : 'invisible -translate-y-3 scale-95 opacity-0'}"
    >
      <ul class="flex flex-col gap-1">
        {#each links as link, i (link.href)}
          <li
            class="transition-all duration-500 {open ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'}"
            style="transition-delay: {open ? 100 + i * 55 : 0}ms;"
          >
            <a
              href={link.href}
              tabindex={open ? 0 : -1}
              on:click={closeMenu}
              aria-current={active === link.href ? 'page' : undefined}
              class="group flex items-center justify-between rounded-2xl px-4 py-3.5 font-bold transition duration-200 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-emerald-300
                {active === link.href
                  ? 'bg-emerald-400 text-stone-950'
                  : 'text-stone-100 hover:bg-white/10'}"
            >
              <span class="flex items-center gap-4">
                <span class="text-xs tabular-nums {active === link.href ? 'text-stone-950/60' : 'text-emerald-300/80'}">0{i + 1}</span>
                <span class="text-lg tracking-wide">{link.label}</span>
              </span>
              <svg class="h-5 w-5 -translate-x-1 opacity-0 transition duration-200 group-hover:translate-x-0 group-hover:opacity-100 {active === link.href ? 'translate-x-0 opacity-100' : ''}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
          </li>
        {/each}
      </ul>

      <a
        href="#GetInTouch"
        tabindex={open ? 0 : -1}
        on:click={closeMenu}
        class="mt-3 flex items-center justify-center gap-2 rounded-2xl border border-emerald-400/40 px-4 py-3.5 font-bold text-emerald-300 transition duration-200 hover:bg-emerald-400 hover:text-stone-950 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-emerald-300"
      >
        Let's talk
      </a>
    </nav>
  </div>
</header>

<!-- Backdrop: tap outside the menu to close -->
{#if open}
  <button
    type="button"
    class="fixed inset-0 z-40 cursor-default bg-black/50 backdrop-blur-sm lg:hidden"
    aria-label="Close menu"
    tabindex="-1"
    on:click={closeMenu}
  ></button>
{/if}

<!-- Spacer so content isn't hidden under the floating header -->
<div class="h-20"></div>

<style>
  :global(html) {
    scroll-behavior: smooth;
    scroll-padding-top: 6rem; /* keeps section headings clear of the floating navbar */
  }

  @media (prefers-reduced-motion: reduce) {
    :global(html) {
      scroll-behavior: auto;
    }
  }
</style>