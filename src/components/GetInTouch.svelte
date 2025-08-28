<script>
  import waveIcon from '../lib/assets/Waving Hand Emoji [Free Download IOS Emojis].png';
</script>
<body class="min-h-screen bg-slate-100 antialiased">
  <!-- Main Wrapper -->
  <main class="max-w-4xl mx-auto p-6 space-y-20">
    
    <section id="contact">
      <div class="bg-white rounded-2xl shadow-lg p-6">
        <header class="text-center mb-5">
          <h1 class="text-2xl font-semibold tracking-tight text-slate-800">Get in Touch</h1>
          <div class="flex justify-center pt-2">
              <p class="mt-2 text-slate-500 text-sm">
                Say Hello! 
              </p>
              <img class="w-8 p-2" src="{waveIcon}" alt="">
          </div>
          <p class="mt-2 text-slate-500 text-sm">
            Whether you have a question, want to collaborate, or just want to say hi, feel free to reach out!
          </p>
        </header>

        <!-- Contact Form -->
        <form id="contactForm" method="POST" action="javascript:void(0)" class="space-y-4">
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
    <input type="text" name="from_name" placeholder="Your name" required
      class="w-full rounded-xl border border-slate-200 bg-white text-slate-800 p-3 focus:ring-2 focus:ring-slate-900/10 placeholder-slate-400">

    <input type="email" name="from_email" placeholder="your.email@example.com" required
      class="w-full rounded-xl border border-slate-200 bg-white text-slate-800 p-3 focus:ring-2 focus:ring-slate-900/10 placeholder-slate-400">
  </div>

  <input type="text" name="subject" placeholder="What would you like to discuss?"
    class="w-full rounded-xl border border-slate-200 bg-white text-slate-800 p-3 focus:ring-2 focus:ring-slate-900/10 placeholder-slate-400">

  <textarea name="message" rows="4" placeholder="Tell me about your project or idea..." required
    class="w-full rounded-xl border border-slate-200 bg-white text-slate-800 p-3 focus:ring-2 focus:ring-slate-900/10 placeholder-slate-400"></textarea>


  <!-- Google reCAPTCHA widget -->

  <div class="text-right">
    <button id="sendBtn" type="submit"
      class=" px-6 py-2 rounded-xl bg-slate-900 text-white hover:bg-slate-500 shadow transform transition-transform duration-300 hover:scale-103">
      Send Message
    </button>
  </div>

  <div class="flex justify-center pt-10 text-sm text-slate-400">
    <p>This site is protected by reCAPTCHA and the Google
      <a class="text-slate-400 hover:text-slate-700 underline transition-colors duration-300 "  href="https://policies.google.com/privacy">Privacy Policy</a>
      and
      <a class="text-slate-400 hover:text-slate-700 underline transition-colors duration-300 "  href="https://policies.google.com/terms">Terms of Service</a>
      apply.
    </p>
  </div>
</form>

<p id="statusMessage" class="text-center text-sm mt-4"></p>

<!-- OPTIONAL: silence favicon 404 -->
<link rel="icon" href="data:,">
      </div>
    </section>

  </main>

  <!-- Load EmailJS SDK -->
  <!-- EmailJS SDK (new) -->
<script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>
<script>
  // Init EmailJS
  
   (function() {
    emailjs.init("RkHEatFx9n_mf4XI_"); // <-- your public key
    //  // ✅ v3 correct syntax
  })();
    

  document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contactForm");
    const btn  = document.getElementById("sendBtn");
    const status = document.getElementById("statusMessage");

    // Belt & suspenders: block native navigation even if JS attaches late
    form.setAttribute("novalidate", "true");

    form.addEventListener("submit", async (e) => {
      e.preventDefault(); // stop page refresh/navigation

      // Guard: basic client validation
      const from_name  = form.from_name?.value?.trim() || "";
      const from_email = form.from_email?.value?.trim() || "";
      const subject    = form.subject?.value?.trim() || "";
      const message    = form.message?.value?.trim() || "";

      if (!from_name || !from_email || !message) {
        status.textContent = "Please fill out name, email, and message.";
        status.className = "text-center text-red-600 text-sm mt-4";
        return;
      }

      // UI: loading state
      btn.disabled = true;
      btn.classList.add("opacity-60", "cursor-not-allowed");
      status.textContent = "Sending...";
      status.className = "text-center text-blue-500 text-sm mt-4";

      // EXPLICIT PARAMS (avoids many 400 errors vs sendForm)
      const params = {
        from_name,
        from_email,
        reply_to: from_email,   // some templates expect reply_to
        subject,
        message,
      };

      try {
        await emailjs.send(
          "service_gmail",         // <-- your service ID
          "template_auto_reply",   // <-- your template ID (must look like template_xxxxxx)
          params                   // <-- explicit variables
        );

        await emailjs.send("service_gmail", "template_notify_me", params);

        status.textContent = "✅ Message sent successfully!";
        status.className = "text-center text-green-600 text-sm mt-4";
        form.reset();
      } catch (err) {
        // Show the REAL error from EmailJS
        const msg = (err && (err.text || err.message || JSON.stringify(err))) || "Unknown error";
        console.error("EmailJS Error:", err);
        status.textContent = "❌ Failed to send: " + msg;
        status.className = "text-center text-red-600 text-sm mt-4";
      } finally {
        btn.disabled = false;
        btn.classList.remove("opacity-60", "cursor-not-allowed");
      }
    });
  });
</script>

</body>
<div class="pb-20">

</div>