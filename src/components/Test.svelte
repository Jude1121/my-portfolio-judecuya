<body class="min-h-screen bg-slate-100 antialiased">
  <!-- Main Wrapper -->
  <main class="max-w-4xl mx-auto p-6 space-y-20">
    
    <section id="contact">
      <div class="bg-white rounded-2xl shadow-lg p-6">
        <header class="text-center mb-5">
          <h1 class="text-2xl font-semibold tracking-tight text-slate-800">Get in Touch</h1>
          <p class="mt-2 text-slate-500 text-sm">
            Whether you have a question, want to collaborate, or just want to say hi, feel free to reach out!
          </p>
        </header>

        <!-- Contact Form -->
        <form id="contactForm" class="space-y-4">
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

          <div class="text-right">
            <button type="submit"
              class="px-6 py-2 rounded-xl bg-slate-900 text-white hover:bg-slate-800 shadow">
              Send Message
            </button>
          </div>
        </form>

        <!-- Status Message -->
        <p id="statusMessage" class="text-center text-sm mt-4"></p>
      </div>
    </section>

  </main>

  <!-- Load EmailJS SDK -->
  <script src="https://cdn.jsdelivr.net/npm/emailjs-com@3/dist/email.min.js"></script>
  <script>
    // ✅ Initialize EmailJS with your Public Key
    (function() {
      emailjs.init("2qiEfN4qJq7oGTW5z");
    })();

    document.getElementById('contactForm').addEventListener('submit', function(e) {
      e.preventDefault();

      const statusMessage = document.getElementById("statusMessage");
      statusMessage.textContent = "Sending...";
      statusMessage.className = "text-center text-blue-500 text-sm mt-4";

      // ✅ Correct sendForm usage
      emailjs.sendForm(
        "service_service_gmail",   // <-- Your Service ID
        "template_auto_reply",     // <-- Your Template ID
        this,                      // <-- Pass the form element directly
        "2qiEfN4qJq7oGTW5z"        // <-- Your Public Key
      ).then(() => {
          statusMessage.textContent = "✅ Message sent successfully!";
          statusMessage.className = "text-center text-green-600 text-sm mt-4";
          document.getElementById('contactForm').reset();
        }, (error) => {
          statusMessage.textContent = "❌ Failed to send message. Please try again.";
          statusMessage.className = "text-center text-red-600 text-sm mt-4";
          console.error("EmailJS Error:", error);
        });
    });
  </script>
</body>
