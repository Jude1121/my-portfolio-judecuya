<!--
  ExperienceCertificates.svelte
  Tabbed Experience + Certificates module — dark / mint-green portfolio style.

  Interactive features:
    • Scroll-reveal animations (staggered fade/slide-in as sections enter the screen)
    • Timeline line that fills with mint-green as you scroll, dots that light up
    • Expandable experience cards (click a card, or "Expand all / Collapse all")
    • Mouse-follow spotlight glow on every card
    • 3D tilt on certificate cards
    • Certificate lightbox with click-to-zoom + pan, arrows and keyboard support

  Usage:
    <script>
      import ExperienceCertificates from "$lib/ExperienceCertificates.svelte";
    </script>
    <ExperienceCertificates />

  Pass your own data through props:
    <ExperienceCertificates {experience} {certificates} />

  Works with Svelte 4 and Svelte 5.
-->
<script>
  import { onMount, tick } from "svelte";
  import JavaCert from "../lib/assets/TESDA JAVA CERTIFICATE.jpg";

  /* ====== DEFAULT CONTENT — replace with your own (or pass as props) ====== */
  export let experience = [
    {
      role: "UI/UX Designer Intern (Remote)",
      company: "Edufied Network / FilPass",
      period: "April 27, 2026 – October 27, 2026",
      points: [
        "Designed and prototyped user interfaces and interactive website experiences using Figma.",
        "Worked on the design and recreation of the FilPass and FPAS websites, ensuring consistency with the established brand identity and design system.",
        "Created interactive prototypes and explored UI enhancements to improve user experience while maintaining a clean, modern, and user-friendly design.",
        "Collaborated with team members and incorporated feedback to refine designs and improve usability.",
        "Used Claude.AI and ChatGPT to help recreate and upgrade the interactivity and modernity of the existing FilPass and FPAS websites.",
        "Applied UI/UX design principles, responsive design concepts, and front-end development knowledge to website design projects."
      ],
      tags: ["UI/UX Design", "Front-end Developer","Web Developer" ,"Vibe-Coding"]
    },
    {
      role: "IT Officer Internship / On-the-job Training",
      company: "Local Government Unit of Tiwi",
      period: "February 2025 – May 2025",
      points: [
        "Managing data of personnel in every Barangay.",
        "Analyzing data of all Barangays in Tiwi."
      ],
      tags: ["Data Management", "Data Analysis"]
    },
    {
      role: "Capstone Project",
      company: "Villa Salome Hotel and Resort Online Reservation",
      period: "June 2024 – December 2024",
      points: [
        "System Analyst",
        "UI/UX Designer",
        "Front-end Developer"
      ],
      tags: ["System Analysis", "UI/UX Design"]
    }
  ];

  /* image: the certificate picture. Leave "" to show a generated placeholder. */
  export let certificates = [
    {
      title: "Certificate of Training – Programming (Java) NC III",
      issuer: "TESDA",
      date: "360 Hours",
      image: JavaCert
    }
  ];

  export let heading = "Experience & ";
  export let headingAccent = "Certificates";
  export let subtitle = "Where I've worked and what I've learned along the way.";
  /* Set true to read/write #exp and #cert in the URL (may conflict with some routers). */
  export let useHash = false;
  /* ======================================================================= */

  const tabs = [
    { id: "exp", label: "Experience" },
    { id: "cert", label: "Certificates" }
  ];

  let active = "exp";
  let tabEls = {};
  let indicator = { width: 0, x: 0 };
  let mounted = false;

  /* ---------- Motion helpers (Svelte actions) ---------- */
  const reducedMotion = () =>
    typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const hasHover = () =>
    typeof window !== "undefined" && window.matchMedia && window.matchMedia("(hover: hover)").matches;

  /* Fade/slide an element in the first time it scrolls into view */
  function reveal(node, opts = {}) {
    node.style.setProperty("--d", (opts.delay ?? 0) + "ms");
    if (reducedMotion() || typeof IntersectionObserver === "undefined") {
      node.classList.add("in");
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          node.classList.add("in");
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    );
    io.observe(node);
    return { destroy: () => io.disconnect() };
  }

  /* Mint glow that follows the mouse inside a card */
  function spotlight(node) {
    function move(e) {
      const r = node.getBoundingClientRect();
      node.style.setProperty("--mx", e.clientX - r.left + "px");
      node.style.setProperty("--my", e.clientY - r.top + "px");
    }
    node.addEventListener("pointermove", move);
    return { destroy: () => node.removeEventListener("pointermove", move) };
  }

  /* Subtle 3D tilt toward the mouse */
  function tilt(node) {
    if (reducedMotion() || !hasHover()) return;
    function move(e) {
      const r = node.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      node.style.setProperty("--ry", px * 9 + "deg");
      node.style.setProperty("--rx", -py * 9 + "deg");
    }
    function leave() {
      node.style.setProperty("--rx", "0deg");
      node.style.setProperty("--ry", "0deg");
    }
    node.addEventListener("pointermove", move);
    node.addEventListener("pointerleave", leave);
    return {
      destroy() {
        node.removeEventListener("pointermove", move);
        node.removeEventListener("pointerleave", leave);
      }
    };
  }

  /* ---------- Experience: expandable cards + scroll-filled timeline ---------- */
  let openJobs = experience.map((_, i) => i === 0);
  $: allOpen = openJobs.length > 0 && openJobs.every(Boolean);

  let timelineEl;
  let tlProgress = 0;
  let ticking = false;

  function updateTimeline() {
    ticking = false;
    if (!timelineEl || active !== "exp") return;
    const r = timelineEl.getBoundingClientRect();
    if (!r.height) return;
    const p = (window.innerHeight * 0.65 - r.top) / r.height;
    tlProgress = Math.min(1, Math.max(0, p));
  }
  function onScroll() {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(updateTimeline);
    }
  }
  function settle() {
    updateTimeline();
    setTimeout(updateTimeline, 450); // after the expand/collapse animation
  }
  function toggleJob(i) {
    openJobs[i] = !openJobs[i];
    settle();
  }
  function toggleAll() {
    const v = !allOpen;
    openJobs = openJobs.map(() => v);
    settle();
  }

  /* ---------- Tabs ---------- */
  function moveIndicator() {
    const el = tabEls[active];
    if (el) indicator = { width: el.offsetWidth, x: el.offsetLeft - 5 };
  }
  async function selectTab(id, focus = false) {
    active = id;
    await tick();
    moveIndicator();
    updateTimeline();
    if (focus) tabEls[id]?.focus();
    if (useHash) {
      try { history.replaceState(history.state, "", "#" + id); } catch (e) {}
    }
  }
  function onTabKey(e, i) {
    let next = null;
    if (e.key === "ArrowRight") next = (i + 1) % tabs.length;
    if (e.key === "ArrowLeft") next = (i - 1 + tabs.length) % tabs.length;
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = tabs.length - 1;
    if (next !== null) {
      e.preventDefault();
      selectTab(tabs[next].id, true);
    }
  }

  onMount(() => {
    if (useHash) {
      const h = location.hash.replace("#", "");
      if (tabs.some((t) => t.id === h)) active = h;
    }
    mounted = true;
    tick().then(() => {
      moveIndicator();
      updateTimeline();
    });
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(moveIndicator);
  });

  /* ---------- Certificate images ---------- */
  const esc = (s) =>
    String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  function placeholder(c) {
    const t = c.title.length > 34 ? c.title.slice(0, 33) + "…" : c.title;
    const svg =
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500">' +
      '<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#0f1a16"/><stop offset="1" stop-color="#0a0a0a"/></linearGradient></defs>' +
      '<rect width="800" height="500" fill="url(#g)"/>' +
      '<rect x="28" y="28" width="744" height="444" rx="18" fill="none" stroke="#2ee6a6" stroke-opacity=".55" stroke-width="2"/>' +
      '<rect x="44" y="44" width="712" height="412" rx="12" fill="none" stroke="#2ee6a6" stroke-opacity=".18" stroke-width="1"/>' +
      '<circle cx="400" cy="150" r="42" fill="none" stroke="#2ee6a6" stroke-width="3"/>' +
      '<path d="M382 186 372 238l28-17 28 17-10-52" fill="none" stroke="#2ee6a6" stroke-width="3" stroke-linejoin="round"/>' +
      '<text x="400" y="300" text-anchor="middle" font-family="Poppins,Arial,sans-serif" font-size="22" fill="#a3aca8" letter-spacing="6">CERTIFICATE</text>' +
      '<text x="400" y="352" text-anchor="middle" font-family="Poppins,Arial,sans-serif" font-size="30" font-weight="700" fill="#f4f6f5">' + esc(t) + "</text>" +
      '<text x="400" y="394" text-anchor="middle" font-family="Poppins,Arial,sans-serif" font-size="20" fill="#2ee6a6">' + esc(c.issuer) + "</text>" +
      "</svg>";
    return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
  }
  const imgSrc = (c) => c.image || placeholder(c);
  function onImgError(e, c) {
    const img = e.currentTarget;
    if (img.dataset.fallback) return;
    img.dataset.fallback = "1";
    img.src = placeholder(c);
  }

  /* ---------- Lightbox (with click-to-zoom + pan) ---------- */
  let open = false;
  let current = 0;
  let lastFocus = null;
  let closeBtn;
  let zoomed = false;
  let zx = 50;
  let zy = 50;

  async function openLightbox(i, e) {
    lastFocus = e?.currentTarget ?? document.activeElement;
    current = i;
    zoomed = false;
    open = true;
    document.body.style.overflow = "hidden";
    await tick();
    closeBtn?.focus();
  }
  function closeLightbox() {
    open = false;
    zoomed = false;
    document.body.style.overflow = "";
    lastFocus?.focus?.();
  }
  function step(d) {
    const n = certificates.length;
    zoomed = false;
    current = (current + d + n) % n;
  }
  function setOrigin(e) {
    const r = e.currentTarget.getBoundingClientRect();
    zx = Math.min(100, Math.max(0, ((e.clientX - r.left) / r.width) * 100));
    zy = Math.min(100, Math.max(0, ((e.clientY - r.top) / r.height) * 100));
  }
  function toggleZoom(e) {
    if (e.detail) setOrigin(e); // mouse click: zoom toward the pointer
    else { zx = 50; zy = 50; } // keyboard: zoom to center
    zoomed = !zoomed;
  }
  function panZoom(e) {
    if (zoomed) setOrigin(e);
  }
  function onWindowKey(e) {
    if (!open) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") step(-1);
    if (e.key === "ArrowRight") step(1);
  }
  function onBackdrop(e) {
    if (e.target === e.currentTarget) closeLightbox();
  }

  $: cert = certificates[current];
</script>

<svelte:head>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
</svelte:head>

<svelte:window on:keydown={onWindowKey} on:resize={() => { moveIndicator(); updateTimeline(); }} on:scroll={onScroll} />

<div class="ec">
  <section id="exp-cert" aria-labelledby="ec-title">
    <header class="ec-head rv" use:reveal>
      <h2 id="ec-title">{heading}<span>{headingAccent}</span></h2>
      <i class="ec-bar" aria-hidden="true"></i>
      <p>{subtitle}</p>
    </header>

    <div class="ec-tabs rv" role="tablist" aria-label="Experience and certificates" use:reveal={{ delay: 120 }}>
      <span class="ec-indicator" aria-hidden="true" class:ready={mounted}
        style="width:{indicator.width}px; transform:translateX({indicator.x}px)"></span>

      {#each tabs as tab, i (tab.id)}
        <button
          class="ec-tab"
          role="tab"
          id="tab-{tab.id}"
          aria-controls="panel-{tab.id}"
          aria-selected={active === tab.id}
          tabindex={active === tab.id ? 0 : -1}
          bind:this={tabEls[tab.id]}
          on:click={() => selectTab(tab.id)}
          on:keydown={(e) => onTabKey(e, i)}
        >
          {#if tab.id === "exp"}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" /><path d="M2 13h20" /></svg>
          {:else}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="9" r="6" /><path d="M8.5 14 7 22l5-3 5 3-1.5-8" /></svg>
          {/if}
          {tab.label}
          <span class="ec-count">{tab.id === "exp" ? experience.length : certificates.length}</span>
        </button>
      {/each}
    </div>

    <!-- Experience -->
    <div class="ec-panel" class:is-active={active === "exp"} role="tabpanel" id="panel-exp" aria-labelledby="tab-exp" tabindex="0" hidden={active !== "exp"}>
      {#if experience.length > 1}
        <div class="ec-toolbar">
          <span class="ec-hint">Click a card to expand or collapse</span>
          <button type="button" class="ec-toggle-all" on:click={toggleAll}>
            {allOpen ? "Collapse all" : "Expand all"}
          </button>
        </div>
      {/if}

      <ol class="ec-timeline" bind:this={timelineEl} style="--p:{tlProgress}">
        {#each experience as job, i (i)}
          <li class="ec-job rv rv-x" class:is-open={openJobs[i]} use:reveal={{ delay: i * 110 }}>
            <article class="ec-card" use:spotlight>
              <div class="ec-row">
                <h3 class="ec-role">
                  <button
                    type="button"
                    class="ec-job-toggle"
                    aria-expanded={openJobs[i]}
                    aria-controls="job-{i}"
                    on:click={() => toggleJob(i)}
                  >
                    <span>{job.role}</span>
                    <svg class="ec-chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6" /></svg>
                  </button>
                </h3>
                <span class="ec-period">{job.period}</span>
              </div>
              <p class="ec-company">{job.company}</p>

              <div class="ec-collapse" class:open={openJobs[i]} id="job-{i}" aria-hidden={!openJobs[i]}>
                <div class="ec-collapse-inner">
                  <ul class="ec-list">
                    {#each job.points as p, j (j)}<li style="--n:{j}">{p}</li>{/each}
                  </ul>
                </div>
              </div>

              <div class="ec-tags">
                {#each job.tags ?? [] as t, k (k)}<span class="ec-tag">{t}</span>{/each}
              </div>
            </article>
          </li>
        {:else}
          <li class="ec-empty">No experience added yet.</li>
        {/each}
      </ol>
    </div>

    <!-- Certificates -->
    <div class="ec-panel" class:is-active={active === "cert"} role="tabpanel" id="panel-cert" aria-labelledby="tab-cert" tabindex="0" hidden={active !== "cert"}>
      <div class="ec-grid">
        {#each certificates as c, i (i)}
          <div class="ec-cert-wrap rv" use:reveal={{ delay: i * 120 }}>
            <button
              type="button"
              class="ec-card ec-cert"
              aria-label="View certificate: {c.title}"
              on:click={(e) => openLightbox(i, e)}
              use:spotlight
              use:tilt
            >
              <div class="ec-thumb">
                <img loading="lazy" src={imgSrc(c)} alt="{c.title} certificate" on:error={(e) => onImgError(e, c)} />
                <span class="ec-view">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z" /><circle cx="12" cy="12" r="3" /></svg>
                  View certificate
                </span>
              </div>
              <div class="ec-cert-body">
                <h3>{c.title}</h3>
                <p class="ec-issuer">{c.issuer}</p>
                <span class="ec-date">{c.date}</span>
              </div>
            </button>
          </div>
        {:else}
          <p class="ec-empty">No certificates added yet.</p>
        {/each}
      </div>
    </div>
  </section>

  <!-- Lightbox -->
  {#if open && cert}
    <!-- svelte-ignore a11y-click-events-have-key-events a11y_click_events_have_key_events -->
    <!-- svelte-ignore a11y-no-noninteractive-element-interactions a11y_no_noninteractive_element_interactions -->
    <div class="ec-lightbox" role="dialog" aria-modal="true" aria-label="Certificate preview" on:click={onBackdrop}>
      <div class="ec-lb-inner">
        <button class="ec-lb-btn ec-lb-close" aria-label="Close preview" bind:this={closeBtn} on:click={closeLightbox}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12" /></svg>
        </button>

        {#if certificates.length > 1}
          <button class="ec-lb-btn ec-lb-prev" aria-label="Previous certificate" on:click={() => step(-1)}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m15 18-6-6 6-6" /></svg>
          </button>
          <button class="ec-lb-btn ec-lb-next" aria-label="Next certificate" on:click={() => step(1)}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m9 18 6-6-6-6" /></svg>
          </button>
        {/if}

        <button
          type="button"
          class="ec-lb-stage"
          class:zoomed
          aria-label={zoomed ? "Zoom out" : "Zoom in"}
          on:click={toggleZoom}
          on:mousemove={panZoom}
        >
          {#key current}
            <img
              class="ec-lb-img"
              src={imgSrc(cert)}
              alt="{cert.title} certificate"
              style="transform-origin: {zx}% {zy}%"
              on:error={(e) => onImgError(e, cert)}
            />
          {/key}
        </button>

        <div class="ec-lb-cap">
          <strong>{cert.title}</strong>
          <span>{cert.issuer} · {cert.date}</span>
          <em class="ec-lb-hint">{zoomed ? "Move your mouse to pan · click to zoom out" : "Click the image to zoom in"}</em>
        </div>
      </div>
    </div>
  {/if}
</div>

<style>
  .ec {
    --ec-bg: #0a0a0a;
    --ec-surface: #101312;
    --ec-surface-2: #151a18;
    --ec-text: #f4f6f5;
    --ec-muted: #a3aca8;
    --ec-border: #1f2724;
    --ec-accent: #2ee6a6;
    --ec-accent-2: #6ff0c4;
    --ec-accent-ink: #04130d;
    --ec-accent-soft: rgba(46, 230, 166, 0.1);
    --ec-accent-line: rgba(46, 230, 166, 0.35);
    --ec-glow: 0 0 22px rgba(46, 230, 166, 0.28);
    --ec-radius: 16px;

    color: var(--ec-text);
    font-family: "Poppins", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
    line-height: 1.6;
  }
  .ec *, .ec *::before, .ec *::after { box-sizing: border-box; }

  #exp-cert { max-width: 1100px; margin: 0 auto; padding: 80px 24px 96px; }

  /* ---------- Scroll reveal ---------- */
  .rv {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.7s ease var(--d, 0ms), transform 0.7s cubic-bezier(0.2, 0.8, 0.2, 1) var(--d, 0ms);
  }
  .rv-x { transform: translate(-26px, 18px); }
  .rv:global(.in) { opacity: 1; transform: none; }

  /* Heading */
  .ec-head h2 { margin: 0; font-size: clamp(2rem, 5vw, 3rem); font-weight: 700; letter-spacing: -0.03em; line-height: 1.1; }
  .ec-head h2 span { color: var(--ec-accent); }
  .ec-bar { display: block; width: 56px; height: 4px; margin: 14px 0 12px; background: var(--ec-accent); border-radius: 4px; transform-origin: left; }
  .ec-head:global(.in) .ec-bar { animation: ecBar 0.8s 0.3s cubic-bezier(0.2, 0.8, 0.2, 1) both; }
  @keyframes ecBar { from { transform: scaleX(0); } to { transform: scaleX(1); } }
  .ec-head p { margin: 0; color: var(--ec-muted); font-size: 0.98rem; }

  /* Tabs */
  .ec-tabs {
    position: relative; display: flex; width: max-content; max-width: 100%;
    margin: 32px 0 34px; padding: 5px; gap: 4px;
    background: var(--ec-surface); border: 1px solid var(--ec-border); border-radius: 999px;
  }
  .ec-tab {
    position: relative; z-index: 1; appearance: none; border: 0; background: transparent; cursor: pointer;
    font: inherit; font-weight: 600; font-size: 0.86rem; letter-spacing: 0.04em; text-transform: uppercase;
    color: var(--ec-text); padding: 11px 24px; border-radius: 999px;
    display: inline-flex; align-items: center; gap: 9px; transition: color 0.25s ease;
  }
  .ec-tab svg { width: 17px; height: 17px; flex: none; }
  .ec-tab:hover { color: var(--ec-accent); }
  .ec-tab[aria-selected="true"] { color: var(--ec-accent-ink); }
  .ec-tab:focus-visible { outline: 2px solid var(--ec-accent); outline-offset: 2px; }
  .ec-count {
    font-size: 0.7rem; font-weight: 700; min-width: 20px; text-align: center;
    padding: 1px 7px; border-radius: 999px; background: var(--ec-accent-soft); color: var(--ec-accent);
  }
  .ec-tab[aria-selected="true"] .ec-count { background: rgba(4, 19, 13, 0.18); color: var(--ec-accent-ink); }
  .ec-indicator {
    position: absolute; z-index: 0; top: 5px; bottom: 5px; left: 5px;
    background: var(--ec-accent); box-shadow: var(--ec-glow); border-radius: 999px;
  }
  .ec-indicator.ready { transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), width 0.3s cubic-bezier(0.4, 0, 0.2, 1); }

  /* Panels */
  .ec-panel { display: none; }
  .ec-panel.is-active { display: block; animation: ecFade 0.35s ease; }
  @keyframes ecFade { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: none; } }

  /* Cards (with mouse-follow spotlight) */
  .ec-card {
    position: relative;
    background: var(--ec-surface); border: 1px solid var(--ec-border); border-radius: var(--ec-radius);
    transition: transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
  }
  .ec-card::before {
    content: ""; position: absolute; inset: 0; border-radius: inherit; pointer-events: none;
    background: radial-gradient(380px circle at var(--mx, 50%) var(--my, 50%), rgba(46, 230, 166, 0.13), transparent 62%);
    opacity: 0; transition: opacity 0.3s ease;
  }
  .ec-card:hover { transform: translateY(-3px); border-color: var(--ec-accent-line); box-shadow: 0 10px 34px rgba(46, 230, 166, 0.08); }
  .ec-card:hover::before { opacity: 1; }

  /* Experience toolbar */
  .ec-toolbar { display: flex; align-items: center; justify-content: space-between; gap: 12px; margin: 0 0 18px 30px; }
  .ec-hint { color: var(--ec-muted); font-size: 0.8rem; }
  .ec-toggle-all {
    appearance: none; cursor: pointer; font: inherit; font-size: 0.78rem; font-weight: 600;
    color: var(--ec-accent); background: var(--ec-accent-soft); border: 1px solid var(--ec-accent-line);
    padding: 6px 14px; border-radius: 999px; transition: background 0.2s ease, color 0.2s ease, transform 0.2s ease;
  }
  .ec-toggle-all:hover { background: var(--ec-accent); color: var(--ec-accent-ink); }
  .ec-toggle-all:active { transform: scale(0.95); }
  .ec-toggle-all:focus-visible { outline: 2px solid var(--ec-accent); outline-offset: 2px; }

  /* Experience timeline (fills as you scroll) */
  .ec-timeline { position: relative; margin: 0; padding: 0 0 0 30px; list-style: none; }
  .ec-timeline::before {
    content: ""; position: absolute; left: 7px; top: 8px; bottom: 8px; width: 2px;
    background: rgba(255, 255, 255, 0.08); border-radius: 2px;
  }
  .ec-timeline::after {
    content: ""; position: absolute; left: 7px; top: 8px; width: 2px;
    height: calc((100% - 16px) * var(--p, 0));
    background: linear-gradient(var(--ec-accent-2), var(--ec-accent));
    box-shadow: 0 0 10px rgba(46, 230, 166, 0.7); border-radius: 2px;
    transition: height 0.15s linear;
  }
  .ec-job { position: relative; margin-bottom: 20px; }
  .ec-job::before {
    content: ""; position: absolute; left: -30px; top: 26px; width: 16px; height: 16px; border-radius: 50%;
    background: var(--ec-bg); border: 3px solid var(--ec-border);
    transition: border-color 0.5s ease 0.3s, box-shadow 0.5s ease 0.3s;
  }
  .ec-job:global(.in)::before { border-color: var(--ec-accent); box-shadow: 0 0 12px rgba(46, 230, 166, 0.45); }
  .ec-job.is-open::after {
    content: ""; position: absolute; left: -30px; top: 26px; width: 16px; height: 16px; border-radius: 50%;
    border: 2px solid var(--ec-accent); pointer-events: none; animation: ecRing 2.2s ease-out infinite;
  }
  @keyframes ecRing { from { transform: scale(1); opacity: 0.7; } to { transform: scale(2.4); opacity: 0; } }

  .ec-job .ec-card { padding: 22px 24px; }
  .ec-row { display: flex; flex-wrap: wrap; justify-content: space-between; gap: 6px 16px; align-items: center; }
  .ec-role { margin: 0; font-size: 1.12rem; font-weight: 600; }
  .ec-job-toggle {
    appearance: none; background: none; border: 0; padding: 0; margin: 0; cursor: pointer;
    font: inherit; color: inherit; text-align: left; display: inline-flex; align-items: center; gap: 10px;
  }
  /* stretch the click area over the whole card */
  .ec-job-toggle::after { content: ""; position: absolute; inset: 0; border-radius: var(--ec-radius); }
  .ec-job-toggle:focus-visible { outline: none; }
  .ec-job-toggle:focus-visible::after { outline: 2px solid var(--ec-accent); outline-offset: 2px; }
  .ec-chev { width: 20px; height: 20px; flex: none; color: var(--ec-accent); transition: transform 0.35s cubic-bezier(0.2, 0.8, 0.2, 1); }
  .ec-job.is-open .ec-chev { transform: rotate(180deg); }
  .ec-period {
    font-size: 0.76rem; font-weight: 600; color: var(--ec-accent); background: var(--ec-accent-soft);
    border: 1px solid var(--ec-accent-line); padding: 4px 12px; border-radius: 999px; white-space: nowrap;
  }
  .ec-company { margin: 4px 0 12px; color: var(--ec-accent-2); font-size: 0.9rem; font-weight: 500; }

  /* Expand / collapse */
  .ec-collapse { display: grid; grid-template-rows: 0fr; transition: grid-template-rows 0.4s cubic-bezier(0.4, 0, 0.2, 1); }
  .ec-collapse.open { grid-template-rows: 1fr; }
  .ec-collapse-inner { overflow: hidden; min-height: 0; }

  .ec-list { margin: 0 0 16px; padding: 0; list-style: none; color: var(--ec-muted); font-size: 0.92rem; }
  .ec-list li {
    position: relative; margin-bottom: 8px; padding-left: 22px;
    opacity: 0; transform: translateX(-10px);
    transition: opacity 0.35s ease, transform 0.35s ease;
  }
  .ec-collapse.open .ec-list li { opacity: 1; transform: none; transition-delay: calc(120ms + var(--n, 0) * 70ms); }
  .ec-list li::before {
    content: ""; position: absolute; left: 3px; top: 0.62em; width: 7px; height: 7px; border-radius: 50%;
    background: var(--ec-accent); box-shadow: 0 0 8px rgba(46, 230, 166, 0.6);
  }

  .ec-tags { display: flex; flex-wrap: wrap; gap: 8px; }
  .ec-tag {
    font-size: 0.76rem; font-weight: 500; padding: 4px 13px; border-radius: 999px;
    color: var(--ec-accent); background: var(--ec-accent-soft); border: 1px solid var(--ec-accent-line);
    transition: transform 0.2s ease, background 0.2s ease, color 0.2s ease;
  }
  .ec-tag:hover { transform: translateY(-2px); background: var(--ec-accent); color: var(--ec-accent-ink); }

  /* Certificates */
  .ec-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(270px, 1fr)); gap: 20px; }
  .ec-cert-wrap { display: flex; }
  .ec-cert {
    flex: 1; padding: 0; overflow: hidden; display: flex; flex-direction: column; text-align: left;
    font: inherit; color: inherit; cursor: pointer; width: 100%;
    transform: perspective(900px) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg));
    transition: transform 0.18s ease-out, border-color 0.25s ease, box-shadow 0.25s ease;
    will-change: transform;
  }
  .ec-cert:hover { transform: perspective(900px) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg)) translateY(-4px); }
  .ec-cert:focus-visible { outline: 2px solid var(--ec-accent); outline-offset: 3px; }
  .ec-thumb { position: relative; aspect-ratio: 16 / 10; overflow: hidden; background: var(--ec-surface-2); }
  .ec-thumb img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform 0.45s ease; }
  .ec-cert:hover .ec-thumb img { transform: scale(1.06); }
  .ec-thumb::after {
    content: ""; position: absolute; inset: 0;
    background: linear-gradient(to top, rgba(10, 10, 10, 0.75), transparent 55%);
    opacity: 0; transition: opacity 0.3s ease;
  }
  .ec-cert:hover .ec-thumb::after, .ec-cert:focus-visible .ec-thumb::after { opacity: 1; }
  .ec-view {
    position: absolute; z-index: 1; left: 50%; top: 50%; transform: translate(-50%, -40%); opacity: 0;
    display: inline-flex; align-items: center; gap: 8px; background: var(--ec-accent); color: var(--ec-accent-ink);
    font-size: 0.8rem; font-weight: 600; padding: 9px 16px; border-radius: 999px; box-shadow: var(--ec-glow); white-space: nowrap;
    transition: opacity 0.3s ease, transform 0.3s ease;
  }
  .ec-view svg { width: 15px; height: 15px; }
  .ec-cert:hover .ec-view, .ec-cert:focus-visible .ec-view { opacity: 1; transform: translate(-50%, -50%); }
  .ec-cert-body { padding: 16px 18px 18px; display: flex; flex-direction: column; gap: 4px; }
  .ec-cert-body h3 { margin: 0; font-size: 1rem; font-weight: 600; line-height: 1.35; }
  .ec-issuer { margin: 0; color: var(--ec-accent-2); font-size: 0.84rem; font-weight: 500; }
  .ec-date { margin-top: 6px; color: var(--ec-muted); font-size: 0.78rem; }
  .ec-empty { text-align: center; color: var(--ec-muted); padding: 30px 0; }

  /* Lightbox */
  .ec-lightbox {
    position: fixed; inset: 0; z-index: 9999; display: flex; align-items: center; justify-content: center;
    padding: 24px; background: rgba(4, 6, 5, 0.88); backdrop-filter: blur(6px); animation: ecFadeBg 0.25s ease;
  }
  @keyframes ecFadeBg { from { opacity: 0; } to { opacity: 1; } }
  .ec-lb-inner {
    position: relative; max-width: min(1000px, 100%); max-height: 100%;
    display: flex; flex-direction: column; align-items: center; gap: 14px;
    animation: ecPop 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
  }
  @keyframes ecPop { from { opacity: 0; transform: scale(0.94); } to { opacity: 1; transform: none; } }
  .ec-lb-stage {
    appearance: none; padding: 0; margin: 0; display: block; line-height: 0; max-width: 100%;
    overflow: hidden; border-radius: 14px; background: var(--ec-surface);
    border: 1px solid var(--ec-accent-line); box-shadow: 0 0 60px rgba(46, 230, 166, 0.15);
    cursor: zoom-in;
  }
  .ec-lb-stage.zoomed { cursor: zoom-out; }
  .ec-lb-stage:focus-visible { outline: 2px solid var(--ec-accent); outline-offset: 3px; }
  .ec-lb-img {
    display: block; max-width: 100%; max-height: calc(100vh - 200px); object-fit: contain;
    transition: transform 0.35s cubic-bezier(0.2, 0.8, 0.2, 1);
  }
  .ec-lb-stage.zoomed .ec-lb-img { transform: scale(2.1); }
  .ec-lb-cap { text-align: center; }
  .ec-lb-cap strong { display: block; font-size: 1.05rem; font-weight: 600; }
  .ec-lb-cap span { color: var(--ec-muted); font-size: 0.86rem; }
  .ec-lb-hint { display: block; margin-top: 4px; font-style: normal; font-size: 0.74rem; color: var(--ec-accent); opacity: 0.85; }
  .ec-lb-btn {
    position: absolute; z-index: 2; appearance: none; cursor: pointer; width: 44px; height: 44px; border-radius: 50%;
    display: grid; place-items: center; background: var(--ec-surface); color: var(--ec-text);
    border: 1px solid var(--ec-accent-line); transition: background 0.2s ease, color 0.2s ease;
  }
  .ec-lb-btn:hover { background: var(--ec-accent); color: var(--ec-accent-ink); }
  .ec-lb-btn:focus-visible { outline: 2px solid var(--ec-accent); outline-offset: 2px; }
  .ec-lb-btn svg { width: 20px; height: 20px; }
  .ec-lb-close { top: -12px; right: -12px; }
  .ec-lb-prev { left: -22px; top: calc(50% - 40px); }
  .ec-lb-next { right: -22px; top: calc(50% - 40px); }

  @media (max-width: 1100px) {
    .ec-lb-prev { left: 8px; }
    .ec-lb-next { right: 8px; }
    .ec-lb-close { top: 8px; right: 8px; }
  }
  @media (max-width: 560px) {
    #exp-cert { padding: 56px 16px 72px; }
    .ec-tab { padding: 10px 16px; font-size: 0.78rem; }
    .ec-job .ec-card { padding: 18px; }
    .ec-toolbar { margin-left: 0; }
    .ec-hint { display: none; }
    .ec-view { opacity: 1; transform: translate(-50%, -50%); }
    .ec-thumb::after { opacity: 1; }
  }
  @media (prefers-reduced-motion: reduce) {
    .ec :global(*), .ec :global(*::before), .ec :global(*::after) { animation: none !important; transition: none !important; }
    .rv { opacity: 1; transform: none; }
  }
</style>