<script>
  import { onMount } from 'svelte';
  import emailjs from '@emailjs/browser';
  import waveIcon from '../lib/assets/Waving Hand Emoji [Free Download IOS Emojis].png';

  const PUBLIC_KEY  = 'RkHEatFx9n_mf4XI_';
  const SERVICE_ID  = 'service_gmail';
  const TEMPLATE_ID = 'template_auto_reply'; // one template: To = {{from_email}}, BCC = your email
  const SITE_KEY    = '6LdW47UrAAAAABkYFVPTfk10flRDntwRssZ8eXhv';

  let from_name = '';
  let from_email = '';
  let subject = '';
  let message = '';
  let loading = false;
  let status = { text: '', type: 'info' };
  let captchaEl;
  let widgetId = null;

  const variants = {
    error: 'border-red-400/30 bg-red-400/10 text-red-300',
    success: 'border-emerald-400/30 bg-emerald-400/10 text-emerald-300',
    info: 'border-white/15 bg-white/5 text-stone-300'
  };
  const field =
    'w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-stone-500 outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/30';
  const setStatus = (text, type = 'info') => (status = { text, type });

  function renderCaptcha() {
    if (widgetId !== null || !captchaEl || !window.grecaptcha?.render) return;
    widgetId = window.grecaptcha.render(captchaEl, { sitekey: SITE_KEY, theme: 'dark' });
  }

  onMount(() => {
    if (window.grecaptcha?.ready) {
      window.grecaptcha.ready(renderCaptcha);
      return;
    }
    window.__onRecaptchaLoad = () => window.grecaptcha.ready(renderCaptcha);
    if (!document.getElementById('recaptcha-script')) {
      const s = document.createElement('script');
      s.id = 'recaptcha-script';
      s.src = 'https://www.google.com/recaptcha/api.js?onload=__onRecaptchaLoad&render=explicit';
      s.async = true;
      s.defer = true;
      document.head.appendChild(s);
    }
  });

  async function handleSubmit() {
    const name = from_name.trim();
    const email = from_email.trim();
    const msg = message.trim();

    if (!name || !email || !msg) return setStatus('Please fill out your name, email, and message.', 'error');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return setStatus('Please enter a valid email address.', 'error');

    const token = widgetId !== null ? window.grecaptcha.getResponse(widgetId) : '';
    if (!token) return setStatus('Please complete the reCAPTCHA.', 'error');

    loading = true;
    setStatus('Sending your message...', 'info');

    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          from_name: name,
          from_email: email,
          reply_to: email,
          subject: subject.trim() || 'New message from your portfolio',
          message: msg,
          'g-recaptcha-response': token // EmailJS verifies this itself
        },
        { publicKey: PUBLIC_KEY }
      );
      setStatus("Message sent. Thank you, I'll get back to you soon.", 'success');
      from_name = from_email = subject = message = '';
    } catch (err) {
      console.error('EmailJS error:', err);
      setStatus('Failed to send: ' + (err?.text || err?.message || 'Unknown error'), 'error');
    } finally {
      loading = false;
      if (widgetId !== null) window.grecaptcha.reset(widgetId); // tokens are single-use
    }
  }
</script>

<svelte:head>
  <link rel="icon" href="data:," />
</svelte:head>

<section id="contact" class="w-full bg-stone-950 px-5 py-12 text-white sm:px-8 sm:py-16 lg:px-20 lg:py-28">
  <div class="mx-auto max-w-3xl rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl shadow-black/40 sm:p-10">
    <header class="text-center">
      <h1 class="flex items-center justify-center gap-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
        Get in touch
        <img class="h-8 w-8 sm:h-10 sm:w-10" src={waveIcon} alt="" />
      </h1>
      <p class="mx-auto mt-3 max-w-xl text-[15px] leading-relaxed text-stone-300 sm:text-base">
        Whether you have a question, want to collaborate, or just want to say hi, feel free to reach out!
      </p>
    </header>

    <form novalidate on:submit|preventDefault={handleSubmit} class="mt-8 space-y-5 sm:mt-10">
      <div class="grid grid-cols-1 gap-5 md:grid-cols-2">
        <div>
          <label for="from_name" class="mb-1.5 block text-sm font-medium text-stone-300">Name</label>
          <input id="from_name" type="text" placeholder="Your name" autocomplete="name" bind:value={from_name} class={field} />
        </div>
        <div>
          <label for="from_email" class="mb-1.5 block text-sm font-medium text-stone-300">Email</label>
          <input id="from_email" type="email" placeholder="your.email@example.com" autocomplete="email" bind:value={from_email} class={field} />
        </div>
      </div>

      <div>
        <label for="subject" class="mb-1.5 block text-sm font-medium text-stone-300">Subject</label>
        <input id="subject" type="text" placeholder="What would you like to discuss?" bind:value={subject} class={field} />
      </div>

      <div>
        <label for="message" class="mb-1.5 block text-sm font-medium text-stone-300">Message</label>
        <textarea id="message" rows="5" placeholder="Tell me about your project or idea..." bind:value={message} class="{field} resize-y"></textarea>
      </div>

      <div class="flex justify-center overflow-x-auto">
        <div bind:this={captchaEl}></div>
      </div>

      <div class="flex justify-center">
        <button
          type="submit"
          disabled={loading}
          class="inline-flex w-full items-center justify-center gap-2 rounded-full bg-emerald-400 px-8 py-3.5 font-semibold text-stone-950 shadow-lg shadow-emerald-500/20 transition duration-200 hover:-translate-y-0.5 hover:bg-emerald-300 hover:shadow-emerald-400/40 active:translate-y-0 active:scale-95 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-300 sm:w-auto sm:py-3"
        >
          <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M22 2L11 13" />
            <path d="M22 2l-7 20-4-9-9-4 20-7z" />
          </svg>
          <span>{loading ? 'Sending...' : 'Send message'}</span>
        </button>
      </div>

      <p class="pt-2 text-center text-xs leading-relaxed text-stone-500 sm:text-sm">
        This site is protected by reCAPTCHA and the Google
        <a class="underline transition-colors duration-300 hover:text-stone-300" target="_blank" rel="noopener noreferrer" href="https://policies.google.com/privacy">Privacy Policy</a>
        and
        <a class="underline transition-colors duration-300 hover:text-stone-300" target="_blank" rel="noopener noreferrer" href="https://policies.google.com/terms">Terms of Service</a>
        apply.
      </p>
    </form>

    {#if status.text}
      <p role="status" aria-live="polite" class="mt-5 rounded-xl border px-4 py-3 text-center text-sm {variants[status.type]}">
        {status.text}
      </p>
    {/if}
  </div>
</section>