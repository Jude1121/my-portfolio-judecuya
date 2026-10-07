<script lang="ts">
  import { onMount } from 'svelte';
  import { Tween } from 'svelte/motion';
  import { cubicOut } from 'svelte/easing';
  import { fly } from 'svelte/transition';

  type Spark = {
    id: number;
    x: number;
    y: number;
    rot: number;
    size: number;
    delay: number;
    color: string;
    kind: 'heart' | 'star';
  };
  type Ripple = { id: number; x: number; y: number };

  const FLAG_KEY = 'was-here';
  const NUMBER_KEY = 'was-here-number';
  const POLL_MS = 60_000; // how often to refresh the live count
  const COLORS = ['#ec4899', '#f43f5e', '#d946ef', '#f59e0b', '#fb7185'];
  const HEART =
    'M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z';
  const STAR = 'M12 2l2.4 7.6L22 12l-7.6 2.4L12 22l-2.4-7.6L2 12l7.6-2.4z';
  const compact = new Intl.NumberFormat('en', { notation: 'compact' });

  const count = new Tween(0, { duration: 800, easing: cubicOut });

  let btn: HTMLButtonElement;
  let loaded = $state(false);
  let clicked = $state(false);
  let myNumber = $state<number | null>(null);
  let popping = $state(false);
  let bumped = $state(false);
  let toast = $state('');
  let sparks = $state<Spark[]>([]);
  let ripples = $state<Ripple[]>([]);

  let uid = 0;
  let busy = false;
  let toastTimer: ReturnType<typeof setTimeout>;

  async function fetchCount(): Promise<number> {
    const res = await fetch('/api/here', { cache: 'no-store' });
    if (!res.ok) throw new Error('Request failed');
    return (await res.json()).count;
  }

  async function sync(first = false) {
    if (busy) return;
    try {
      const next = await fetchCount();
      if (!first && next > count.target) flash(); // someone else just said hi
      count.set(next);
    } catch {
      /* keep the last known count */
    } finally {
      loaded = true;
    }
  }

  onMount(() => {
    clicked = localStorage.getItem(FLAG_KEY) === '1';
    const saved = Number(localStorage.getItem(NUMBER_KEY));
    myNumber = saved > 0 ? saved : null;

    sync(true);
    const timer = setInterval(() => {
      if (!document.hidden) sync();
    }, POLL_MS);
    const onVisible = () => {
      if (!document.hidden) sync();
    };
    document.addEventListener('visibilitychange', onVisible);

    return () => {
      clearInterval(timer);
      clearTimeout(toastTimer);
      document.removeEventListener('visibilitychange', onVisible);
    };
  });

  function flash() {
    bumped = true;
    setTimeout(() => (bumped = false), 700);
  }

  function showToast(message: string, ms = 3200) {
    toast = message;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => (toast = ''), ms);
  }

  // Cursor-following spotlight
  function track(e: PointerEvent) {
    const r = btn.getBoundingClientRect();
    btn.style.setProperty('--mx', `${e.clientX - r.left}px`);
    btn.style.setProperty('--my', `${e.clientY - r.top}px`);
  }

  function addRipple(e: MouseEvent) {
    const r = btn.getBoundingClientRect();
    const fromKeyboard = e.detail === 0;
    const id = uid++;
    ripples = [
      ...ripples,
      {
        id,
        x: fromKeyboard ? r.width / 2 : e.clientX - r.left,
        y: fromKeyboard ? r.height / 2 : e.clientY - r.top
      }
    ];
    setTimeout(() => (ripples = ripples.filter((x) => x.id !== id)), 800);
  }

  function burst() {
    const total = 14;
    const batch: Spark[] = Array.from({ length: total }, (_, i) => {
      const angle = (Math.PI * 2 * i) / total + Math.random() * 0.5;
      const dist = 42 + Math.random() * 48;
      return {
        id: uid++,
        x: Math.round(Math.cos(angle) * dist),
        y: Math.round(Math.sin(angle) * dist),
        rot: Math.round((Math.random() - 0.5) * 120),
        size: 8 + Math.round(Math.random() * 10),
        delay: Math.round(Math.random() * 120),
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        kind: i % 3 === 0 ? 'star' : 'heart'
      };
    });
    sparks = [...sparks, ...batch];
    const ids = new Set(batch.map((s) => s.id));
    setTimeout(() => (sparks = sparks.filter((s) => !ids.has(s.id))), 1700);
  }

  function pop() {
    popping = true;
    setTimeout(() => (popping = false), 600);
  }

  async function markHere(e: MouseEvent) {
    addRipple(e);
    navigator.vibrate?.(18); // small haptic tap on supported phones

    // Already marked: playful feedback instead of a dead button
    if (clicked) {
      burst();
      pop();
      showToast(myNumber ? `You were #${myNumber.toLocaleString()} to say hi 💖` : 'Glad you came back 💖');
      return;
    }

    clicked = true;
    busy = true;
    localStorage.setItem(FLAG_KEY, '1');
    burst();
    pop();
    showToast('Thanks for stopping by! ✨');

    const previous = count.target;
    count.set(previous + 1); // optimistic update

    try {
      const res = await fetch('/api/here', { method: 'POST' });
      if (!res.ok) throw new Error('Request failed');
      const next: number = (await res.json()).count;
      count.set(next);
      myNumber = next;
      localStorage.setItem(NUMBER_KEY, String(next));
      showToast(`You're #${next.toLocaleString()} to say hi 🎉`, 4200);
    } catch {
      clicked = false;
      myNumber = null;
      localStorage.removeItem(FLAG_KEY);
      count.set(previous);
      showToast("Couldn't save that. Try again?");
    } finally {
      busy = false;
    }
  }
</script>

<div
  class="pointer-events-none fixed bottom-[max(1rem,env(safe-area-inset-bottom))] left-[max(1rem,env(safe-area-inset-left))] z-50 flex flex-col items-start gap-3"
>
  {#if toast}
    <div
      aria-hidden="true"
      transition:fly={{ y: 10, duration: 250 }}
      class="max-w-[min(20rem,calc(100vw-2rem))] rounded-2xl border border-pink-400/30 bg-white/85 px-3.5 py-2 text-xs font-medium text-neutral-800 shadow-xl shadow-pink-500/10 backdrop-blur-xl sm:text-sm dark:bg-neutral-900/85 dark:text-neutral-100"
    >
      {toast}
    </div>
  {/if}
  <span class="sr-only" role="status">{toast}</span>

  <button
    bind:this={btn}
    onclick={markHere}
    onpointermove={track}
    aria-pressed={clicked}
    aria-label={clicked ? 'You were here' : 'Mark that you were here'}
    class:done={clicked}
    class="hb group pointer-events-auto relative inline-flex h-12 w-12 select-none items-center justify-center gap-2.5 rounded-full bg-white/70 text-sm font-medium text-neutral-700 shadow-lg shadow-black/5 backdrop-blur-xl transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-500 active:scale-95 motion-safe:hover:-translate-y-0.5 sm:w-auto sm:px-5 dark:bg-neutral-900/70 dark:text-neutral-100"
  >
    <!-- Spotlight + ripples (clipped to the pill) -->
    <span class="fx" aria-hidden="true">
      <span class="spot"></span>
      {#each ripples as r (r.id)}
        <span class="ripple" style="left:{r.x}px; top:{r.y}px"></span>
      {/each}
    </span>

    <!-- Heart + particle burst -->
    <span class="relative grid h-6 w-6 place-items-center">
      {#if !clicked}
        <span class="invite" aria-hidden="true"></span>
      {/if}

      <svg
        viewBox="0 0 24 24"
        class="heart relative h-6 w-6"
        class:on={clicked}
        class:pop={popping}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="here-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#f472b6" />
            <stop offset="100%" stop-color="#e11d48" />
          </linearGradient>
        </defs>
        <path d={HEART} />
      </svg>

      {#each sparks as s (s.id)}
        <svg
          viewBox="0 0 24 24"
          class="spark"
          aria-hidden="true"
          style="--x:{s.x}px; --y:{s.y}px; --r:{s.rot}deg; width:{s.size}px; height:{s.size}px; margin:-{s.size /
            2}px 0 0 -{s.size / 2}px; animation-delay:{s.delay}ms; fill:{s.color}"
        >
          <path d={s.kind === 'heart' ? HEART : STAR} />
        </svg>
      {/each}
    </span>

    <!-- Label (hidden on small screens) -->
    <span class="relative hidden whitespace-nowrap sm:inline">
      {clicked ? 'You were here' : 'I was here'}
    </span>

    <!-- Count: pill on desktop, badge on mobile -->
    {#if loaded}
      <span
        class="count relative hidden items-center gap-1.5 rounded-full bg-pink-500/15 px-2.5 py-1 text-xs font-semibold tabular-nums text-pink-700 sm:inline-flex dark:text-pink-200"
        class:bump={bumped}
      >
        <span class="live" title="Updates live"></span>
        {Math.round(count.current).toLocaleString()}
      </span>
      <span
        class="count absolute -right-1 -top-1 min-w-5 rounded-full bg-pink-500 px-1.5 text-center text-[10px] leading-5 font-bold text-white ring-2 ring-white sm:hidden dark:ring-neutral-900"
        class:bump={bumped}
      >
        {compact.format(Math.round(count.current))}
      </span>
    {:else}
      <span
        class="hidden h-6 w-14 rounded-full bg-neutral-300/60 sm:block motion-safe:animate-pulse dark:bg-neutral-700/60"
      ></span>
    {/if}

    <!-- Tooltip (desktop only, before the first click) -->
    {#if !clicked}
      <span
        class="pointer-events-none absolute bottom-full left-0 mb-2 hidden whitespace-nowrap rounded-lg bg-neutral-900 px-2.5 py-1 text-xs text-white opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100 sm:block dark:bg-white dark:text-neutral-900"
      >
        Leave your mark ♥
      </span>
    {/if}
  </button>
</div>

<style>
  .hb {
    --mx: 50%;
    --my: 50%;
  }

  /* Animated gradient border (static once clicked) */
  .hb::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    padding: 1.5px;
    pointer-events: none;
    background: linear-gradient(
      110deg,
      rgb(236 72 153 / 0.15) 0%,
      #ec4899 35%,
      #f59e0b 50%,
      #ec4899 65%,
      rgb(236 72 153 / 0.15) 100%
    );
    background-size: 250% 100%;
    -webkit-mask:
      linear-gradient(#000 0 0) content-box,
      linear-gradient(#000 0 0);
    -webkit-mask-composite: xor;
    mask:
      linear-gradient(#000 0 0) content-box,
      linear-gradient(#000 0 0);
    mask-composite: exclude;
    animation: sweep 3.2s linear infinite;
  }
  .hb.done::before {
    animation: none;
    background: linear-gradient(135deg, #f472b6, #e11d48);
    opacity: 0.7;
  }

  .fx {
    position: absolute;
    inset: 0;
    overflow: hidden;
    border-radius: inherit;
    pointer-events: none;
  }
  .spot {
    position: absolute;
    inset: 0;
    opacity: 0;
    transition: opacity 0.3s;
    background: radial-gradient(110px circle at var(--mx) var(--my), rgb(244 114 182 / 0.35), transparent 70%);
  }
  .hb:hover .spot {
    opacity: 1;
  }

  .ripple {
    position: absolute;
    width: 12px;
    height: 12px;
    margin: -6px 0 0 -6px;
    border-radius: 9999px;
    background: rgb(244 63 94 / 0.35);
    animation: ripple 0.7s ease-out forwards;
  }

  .invite {
    position: absolute;
    inset: 0;
    border-radius: 9999px;
    background: rgb(244 114 182 / 0.45);
    animation: invite-ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;
  }

  .heart {
    fill: transparent;
    stroke: currentColor;
    transition:
      transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1),
      stroke 0.3s,
      fill 0.3s;
  }
  .hb:hover .heart:not(.on) {
    stroke: #ec4899;
    transform: scale(1.2) rotate(-8deg);
  }
  .heart.on {
    fill: url(#here-grad);
    stroke: #f43f5e;
    filter: drop-shadow(0 0 6px rgb(244 63 94 / 0.55));
    animation: heartbeat 2.6s ease-in-out 1s infinite;
  }
  .heart.pop {
    animation: pop 0.55s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  .spark {
    position: absolute;
    left: 50%;
    top: 50%;
    opacity: 0;
    pointer-events: none;
    animation: burst 1.2s cubic-bezier(0.2, 0.8, 0.3, 1) forwards;
  }

  .live {
    width: 6px;
    height: 6px;
    border-radius: 9999px;
    background: #10b981;
    animation: live 2s infinite;
  }

  .bump {
    animation: bump 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  @keyframes sweep {
    from { background-position: 100% 0; }
    to { background-position: -150% 0; }
  }
  @keyframes ripple {
    from { transform: scale(0); opacity: 1; }
    to { transform: scale(18); opacity: 0; }
  }
  @keyframes invite-ping {
    75%, 100% { transform: scale(2.1); opacity: 0; }
  }
  @keyframes pop {
    0% { transform: scale(1); }
    40% { transform: scale(1.6); }
    100% { transform: scale(1); }
  }
  @keyframes heartbeat {
    0%, 40%, 100% { transform: scale(1); }
    10% { transform: scale(1.15); }
    20% { transform: scale(1); }
    30% { transform: scale(1.1); }
  }
  @keyframes burst {
    0% { opacity: 0; transform: translate(0, 0) scale(0.3) rotate(0deg); }
    15% { opacity: 1; }
    100% { opacity: 0; transform: translate(var(--x), calc(var(--y) - 24px)) scale(1) rotate(var(--r)); }
  }
  @keyframes live {
    0% { box-shadow: 0 0 0 0 rgb(16 185 129 / 0.6); }
    70%, 100% { box-shadow: 0 0 0 6px rgb(16 185 129 / 0); }
  }
  @keyframes bump {
    0% { transform: scale(1); }
    40% { transform: scale(1.25); }
    100% { transform: scale(1); }
  }

  @media (prefers-reduced-motion: reduce) {
    .spark,
    .ripple,
    .invite {
      display: none;
    }
    .hb::before,
    .heart.on,
    .heart.pop,
    .bump,
    .live {
      animation: none;
    }
  }
</style>