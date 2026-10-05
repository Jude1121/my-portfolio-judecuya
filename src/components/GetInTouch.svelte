<script>
  import { onMount } from 'svelte';
  import waveIcon from '../lib/assets/Waving Hand Emoji [Free Download IOS Emojis].png';

  // ---------- "I was here" heart counter ----------
  // Replace YOUR-PROJECT with your Firebase Realtime Database name.
  const COUNTER_URL = 'https://YOUR-PROJECT-default-rtdb.firebaseio.com/visitors/count.json';

  let count = null;        // null = still loading
  let clicks = 0;          // clicks by this visitor (drives the heart animation)
  let counterError = '';

  async function loadCount() {
    try {
      const res = await fetch(COUNTER_URL);
      if (!res.ok) throw new Error();
      count = (await res.json()) ?? 0;
      counterError = '';
    } catch {
      counterError = "Couldn't load the counter.";
    }
  }

  async function iWasHere() {
    if (count === null) return;

    // Update instantly so the heart feels responsive
    count += 1;
    clicks += 1;
    counterError = '';

    try {
      // Atomic server-side +1, so simultaneous clicks from different people never overwrite each other
      const res = await fetch(COUNTER_URL, {
        method: 'PUT',
        body: JSON.stringify({ '.sv': { increment: 1 } })
      });
      if (!res.ok) throw new Error();
    } catch {
      count -= 1; // roll back the optimistic update
      counterError = 'Something went wrong. Please try again.';
    }
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

  // Loads an external script once and resolves when it is usable
  const loadScript = (src, isReady) =>
    new Promise((resolve, reject) => {
      if (isReady()) return resolve();
      let tag = document.querySelector(`script[src="${src}"]`);
      if (!tag) {
        tag = document.createElement("script");
        tag.src = src;
        tag.async = true;
        document.head.appendChild(tag);
      }
      tag.addEventListener("load", () => resolve());
      tag.addEventListener("error", () => reject(new Error("Failed to load " + src)));
    });

  onMount(() => {
    loadCount();

    const form   = document.getElementById("contactForm");
    const btn    = document.getElementById("sendBtn");
    const label  = document.getElementById("sendLabel");
    const status = document.getElementById("statusMessage");

    form.setAttribute("novalidate", "true");

    let widgetId = null;

    // Status message styles
    const base = "mt-5 rounded-xl border px-4 py-3 text-center text-sm";
    const variants = {
      error:   "border-red-400/30 bg-red-400/10 text-red-300",
      success: "border-emerald-400/30 bg-emerald-400/10 text-emerald-300",
      info:    "border-white/15 bg-white/5 text-stone-300"
    };
    const setStatus = (text, type) => {
      status.textContent = text;
      status.className = `${base} ${variants[type]}`;
    };

    const setLoading = (loading) => {
      btn.disabled = loading;
      label.textContent = loading ? "Sending..." : "Send message";
    };

    // Load EmailJS + reCAPTCHA, then set both up
    const init = async () => {
      try {
        await Promise.all([
          loadScript("https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js", () => !!window.emailjs),
          loadScript("https://www.google.com/recaptcha/api.js?render=explicit", () => !!window.grecaptcha?.ready)
        ]);

        window.emailjs.init("RkHEatFx9n_mf4XI_"); // <-- your EmailJS public key

        window.grecaptcha.ready(() => {
          const box = form.querySelector(".g-recaptcha");
          if (box && widgetId === null && box.childElementCount === 0) {
            widgetId = window.grecaptcha.render(box, {
              sitekey: box.dataset.sitekey,
              theme: "dark"
            });
          }
        });
      } catch (err) {
        console.error(err);
        setStatus("Could not load the form scripts. Disable your ad blocker and reload the page.", "error");
      }
    };
    init();

    const handleSubmit = async (e) => {
      e.preventDefault();

      // Basic client validation
      const from_name  = form.from_name?.value?.trim() || "";
      const from_email = form.from_email?.value?.trim() || "";
      const subject    = form.subject?.value?.trim() || "";
      const message    = form.message?.value?.trim() || "";

      if (!from_name || !from_email || !message) {
        setStatus("Please fill out your name, email, and message.", "error");
        return;
      }

      if (!window.emailjs || widgetId === null) {
        setStatus("The form is still loading. Please wait a moment and try again.", "error");
        return;
      }

      // Check reCAPTCHA
      const recaptchaResponse = window.grecaptcha.getResponse(widgetId);
      if (!recaptchaResponse) {
        setStatus("Please complete the reCAPTCHA.", "error");
        return;
      }

      setLoading(true);
      setStatus("Sending your message...", "info");

      try {
        const params = {
          from_name,
          from_email,
          reply_to: from_email,
          subject: subject || "New message from your portfolio",
          message,
          "g-recaptcha-response": recaptchaResponse
        };

        // 1) Notification to you (this is the one that must succeed)
        await window.emailjs.send("service_gmail", "template_notify_me", params);

        // 2) Auto-reply to the sender (best effort)
        try {
          await window.emailjs.send("service_gmail", "template_auto_reply", params);
        } catch (replyErr) {
          console.warn("Auto-reply failed:", replyErr);
        }

        setStatus("Message sent successfully. Thank you, I'll get back to you soon.", "success");
        form.reset();
      } catch (err) {
        const msg = (err && (err.text || err.message || JSON.stringify(err))) || "Unknown error";
        console.error("EmailJS Error:", err);
        setStatus("Failed to send: " + msg, "error");
      } finally {
        setLoading(false);
        if (widgetId !== null) window.grecaptcha.reset(widgetId); // tokens are single-use
      }
    };

    form.addEventListener("submit", handleSubmit);

    return () => {
      form.removeEventListener("submit", handleSubmit);
    };
  });
</script>

<svelte:head>
  <!-- Silence favicon 404 -->
  <link rel="icon" href="data:," />
</svelte:head>

<style>
  /* ---------- Scroll reveal ---------- */
  .reveal {
    opacity: 0;
    transform: translateY(32px);
    transition:
      opacity 700ms ease var(--delay, 0ms),
      transform 700ms cubic-bezier(0.2, 0.7, 0.2, 1) var(--delay, 0ms);
  }

  /* The card itself only fades; the content inside rises in one piece at a time */
  .reveal-fade {
    transform: none;
  }

  .reveal:global(.in) {
    opacity: 1;
    transform: none;
  }

  /* ---------- Heart button ---------- */
  .heart-beat {
    animation: heart-beat 450ms cubic-bezier(0.2, 0.7, 0.2, 1);
  }

  @keyframes heart-beat {
    0%   { transform: scale(1); }
    35%  { transform: scale(1.35); }
    100% { transform: scale(1); }
  }

  .count-pop {
    animation: count-pop 350ms cubic-bezier(0.2, 0.7, 0.2, 1);
  }

  @keyframes count-pop {
    0%   { transform: translateY(0); }
    40%  { transform: translateY(-4px); }
    100% { transform: translateY(0); }
  }

  @media (prefers-reduced-motion: reduce) {
    .reveal {
      opacity: 1;
      transform: none;
      transition: none;
    }
    .heart-beat,
    .count-pop {
      animation: none;
    }
  }
</style>

<section id="contact" class="w-full bg-stone-950 px-5 py-12 text-white sm:px-8 sm:py-16 lg:px-20 lg:py-28">
  <div use:reveal class="reveal reveal-fade mx-auto max-w-3xl rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl shadow-black/40 sm:p-10">

    <header use:reveal class="reveal text-center" style="--delay: 150ms">
      <h1 class="flex items-center justify-center gap-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
        Get in touch
        <img class="h-8 w-8 sm:h-10 sm:w-10" src={waveIcon} alt="" />
      </h1>
      <p class="mx-auto mt-3 max-w-xl text-[15px] leading-relaxed text-stone-300 sm:text-base">
        Whether you have a question, want to collaborate, or just want to say hi, feel free to reach out!
      </p>
    </header>

    <!-- Contact form -->
    <form id="contactForm" method="POST" action="javascript:void(0)" class="mt-8 space-y-5 sm:mt-10">
      <div use:reveal class="reveal grid grid-cols-1 gap-5 md:grid-cols-2" style="--delay: 250ms">
        <div>
          <label for="from_name" class="mb-1.5 block text-sm font-medium text-stone-300">Name</label>
          <input
            id="from_name" type="text" name="from_name" placeholder="Your name" required autocomplete="name"
            class="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-stone-500 outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/30"
          />
        </div>
        <div>
          <label for="from_email" class="mb-1.5 block text-sm font-medium text-stone-300">Email</label>
          <input
            id="from_email" type="email" name="from_email" placeholder="your.email@example.com" required autocomplete="email"
            class="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-stone-500 outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/30"
          />
        </div>
      </div>

      <div use:reveal class="reveal" style="--delay: 330ms">
        <label for="subject" class="mb-1.5 block text-sm font-medium text-stone-300">Subject</label>
        <input
          id="subject" type="text" name="subject" placeholder="What would you like to discuss?"
          class="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-stone-500 outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/30"
        />
      </div>

      <div use:reveal class="reveal" style="--delay: 410ms">
        <label for="message" class="mb-1.5 block text-sm font-medium text-stone-300">Message</label>
        <textarea
          id="message" name="message" rows="5" placeholder="Tell me about your project or idea..." required
          class="w-full resize-y rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-stone-500 outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/30"
        ></textarea>
      </div>

      <!-- Google reCAPTCHA widget -->
      <div use:reveal class="reveal flex justify-center overflow-x-auto" style="--delay: 490ms">
        <div class="g-recaptcha" data-theme="dark" data-sitekey="6LcfmdktAAAAAMK7NPAIN37jyih_TlhCpGhfOeVJ"></div>
      </div>

      <div use:reveal class="reveal flex justify-center" style="--delay: 570ms">
        <button
          id="sendBtn" type="submit"
          class="inline-flex w-full items-center justify-center gap-2 rounded-full bg-emerald-400 px-8 py-3.5 font-semibold text-stone-950 shadow-lg shadow-emerald-500/20 transition duration-200 hover:-translate-y-0.5 hover:bg-emerald-300 hover:shadow-emerald-400/40 active:translate-y-0 active:scale-95 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-300 sm:w-auto sm:py-3"
        >
          <!-- Send icon -->
          <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M22 2L11 13" />
            <path d="M22 2l-7 20-4-9-9-4 20-7z" />
          </svg>
          <span id="sendLabel">Send message</span>
        </button>
      </div>

      <p use:reveal class="reveal pt-2 text-center text-xs leading-relaxed text-stone-500 sm:text-sm" style="--delay: 640ms">
        This site is protected by reCAPTCHA and the Google
        <a class="underline transition-colors duration-300 hover:text-stone-300" target="_blank" rel="noopener noreferrer" href="https://policies.google.com/privacy">Privacy Policy</a>
        and
        <a class="underline transition-colors duration-300 hover:text-stone-300" target="_blank" rel="noopener noreferrer" href="https://policies.google.com/terms">Terms of Service</a>
        apply.
      </p>
    </form>

    <p id="statusMessage" role="status" aria-live="polite" class="hidden"></p>

    <!-- I was here: heart button -->
    <div use:reveal class="reveal mt-10 border-t border-white/10 pt-8 text-center" style="--delay: 150ms">
      <button
        type="button"
        on:click={iWasHere}
        disabled={count === null}
        aria-label="I was here. Add a heart to the counter"
        class="group inline-flex items-center gap-3 rounded-full border border-rose-400/40 bg-rose-400/10 px-6 py-3 font-semibold text-rose-300 transition duration-200 hover:-translate-y-0.5 hover:bg-rose-400/20 active:scale-95 disabled:cursor-wait disabled:opacity-60 disabled:hover:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-rose-300"
      >
        {#key clicks}
          <svg
            class="h-6 w-6 {clicks > 0 ? 'heart-beat' : ''}"
            viewBox="0 0 24 24"
            fill={clicks > 0 ? 'currentColor' : 'none'}
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        {/key}
        <span>I was here</span>
        <span class="rounded-full bg-rose-400/20 px-3 py-0.5 text-sm tabular-nums text-rose-200">
          {#key count}
            <span class="inline-block {clicks > 0 ? 'count-pop' : ''}">
              {count === null ? '…' : count.toLocaleString()}
            </span>
          {/key}
        </span>
      </button>

      <p class="mt-4 text-sm text-stone-400" aria-live="polite">
        {#if counterError}
          <span class="text-red-300">{counterError}</span>
        {:else if clicks > 0}
          Thanks for stopping by!
        {:else}
          Tap the heart to let me know you were here.
        {/if}
      </p>
    </div>
  </div>
</section>