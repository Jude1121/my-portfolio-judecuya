<script>

    import myProfile from '../lib/assets/Me.jpg';
    import waveIcon from '../lib/assets/Waving Hand Emoji [Free Download IOS Emojis].png';
    import myResume from '../lib/assets/JUDE -RESUME OFFICIAL.pdf';


    // download icon
    import { Download, ArrowUpRight } from 'lucide-svelte';

    const skills = ['UI/UX design', 'Graphic design', 'Responsive web'];
</script>

<style>
  /* Smooth fade-in + slight slide-up */
  @keyframes introFadeUp {
    from { opacity: 0; transform: translateY(60px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .intro-animate {
    opacity: 0;
    animation: introFadeUp 1000ms ease-out forwards;
    will-change: transform, opacity;
  }

  @media (prefers-reduced-motion: reduce) {
    .intro-animate {
      animation: none;
      opacity: 1;
      transform: none;
    }
  }

  .typing-animation {
    width: 0;
    white-space: nowrap;
    overflow: hidden;
    border-right: 3px solid white;
    animation: typing 3s steps(22) forwards, blink 0.6s infinite;
  }

  @keyframes typing {
    from { width: 0; }
    to   { width: 19ch; }
  }
  @keyframes blink {
    60% { border-color: transparent; }
  }

@keyframes smoothGlow {
  0%, 100% {
    text-shadow: none;
    opacity: 0.7;
  }
  50% {
    text-shadow: 0 0 8px #34d399,
                 0 0 16px #34d399,
                 0 0 32px #34d399,
                 0 0 48px #34d399;
    opacity: 1;
  }
}

.orbit-ring {
  --orbit-size: 7px; /* distance of orbit from image */
  position: relative;
  display: inline-block;
  border-radius: 50%;
  transition: box-shadow 400ms ease;
}

.orbit-ring:hover {
  box-shadow: 0 0 30px 8px rgba(52, 211, 153, 0.7), 
              0 0 50px 20px rgba(52, 211, 153, 0.5);
}

/* Keep image still */
.orbit-ring img {
  display: block;
  border-radius: 50%;
  position: relative;
  z-index: 2;
}

/* Orbit line (top arc) */
.orbit-ring::before,
.orbit-ring::after {
  content: "";
  position: absolute;
  inset: calc(var(--orbit-size) * -1);
  border-radius: 46%;
  background: linear-gradient(90deg, #34d399, #a7f3d0, #059669);
  background-size: 200% 200%;
  animation: gradient-move 5s ease infinite, spin 7s linear infinite;
  z-index: 1;
}

/* Offset the second arc so they overlap nicely */
.orbit-ring::after {
  animation: gradient-move 5s ease infinite, spin 8s linear infinite reverse;
}

/* Animations */
@keyframes gradient-move {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
.animated-gradient {
  background-size: 300% auto; /* larger for smoother flow */
  animation: gradientFlow 8s ease-in-out infinite;
}

@keyframes gradientFlow {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

/* ---------- New: background texture ---------- */
.dot-grid {
  background-image: radial-gradient(rgba(255, 255, 255, 0.08) 1px, transparent 1px);
  background-size: 24px 24px;
  -webkit-mask-image: radial-gradient(ellipse at center, black 25%, transparent 75%);
  mask-image: radial-gradient(ellipse at center, black 25%, transparent 75%);
}

/* ---------- New: slow floating glow ---------- */
@keyframes drift {
  0%, 100% { transform: translate(0, 0); }
  50%      { transform: translate(30px, -20px); }
}
.glow-drift { animation: drift 14s ease-in-out infinite; }
.glow-drift-alt { animation: drift 18s ease-in-out infinite reverse; }

@media (prefers-reduced-motion: reduce) {
  .glow-drift, .glow-drift-alt { animation: none; }
}

/* ---------- New: button polish ---------- */
.btn-primary {
  transition: transform 200ms ease, box-shadow 200ms ease, background-color 200ms ease;
}
.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 30px -8px rgba(52, 211, 153, 0.7);
}
.btn-secondary {
  transition: transform 200ms ease, background-color 200ms ease, color 200ms ease;
}
.btn-secondary:hover {
  transform: translateY(-2px);
  color: #0c0a09;
}
.btn-secondary :global(svg) {
  transition: transform 200ms ease;
}
.btn-secondary:hover :global(svg) {
  transform: translate(2px, -2px);
}
.btn-primary:focus-visible,
.btn-secondary:focus-visible {
  outline: 2px solid #a7f3d0;
  outline-offset: 3px;
}
</style>

<div class="relative isolate overflow-hidden bg-stone-950 text-white flex flex-col lg:flex-row items-center justify-center gap-0 lg:gap-16 px-0 lg:px-16 pb-0 lg:py-20">

    <!-- Background layers (decorative, don't affect layout) -->
    <div class="dot-grid pointer-events-none absolute inset-0 -z-10" aria-hidden="true"></div>
    <div class="glow-drift pointer-events-none absolute -left-24 top-1/3 -z-10 h-80 w-80 rounded-full bg-emerald-400/20 blur-3xl" aria-hidden="true"></div>
    <div class="glow-drift-alt pointer-events-none absolute -right-20 bottom-0 -z-10 h-72 w-72 rounded-full bg-emerald-300/10 blur-3xl" aria-hidden="true"></div>
    <div class="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-px bg-gradient-to-r from-transparent via-emerald-400/60 to-transparent" aria-hidden="true"></div>

    <!-- Profile (mobile size = original: full width minus 40px each side) -->
    <div class="intro-animate shrink-0 w-full sm:w-auto px-10 pt-10 lg:p-2 flex justify-center">
      <div class="orbit-ring w-full sm:w-auto">
        <img
          class="rounded-full shadow-2xl shadow-emerald-900/40 object-cover aspect-square
                 w-full sm:w-80 md:w-96 lg:w-72 xl:w-80 2xl:w-96"
          src={myProfile}
          alt="Jude Russel Cuya"
        >

        <!-- Availability badge -->
        <div class="absolute bottom-3 left-1/2 z-10 -translate-x-1/2 flex items-center gap-2 whitespace-nowrap rounded-full border border-white/10 bg-stone-900/70 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-md">
          <span class="relative flex h-2 w-2">
            <span class="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping motion-reduce:animate-none"></span>
            <span class="relative inline-flex h-2 w-2 rounded-full bg-emerald-400"></span>
          </span>
          Open to work
        </div>
      </div>
    </div>

    <!-- Text (mobile/tablet = original layout) -->
    <div class="intro-animate w-full lg:w-auto  text-center lg:text-start  lg:max-w-2xl pt-10 p-9 lg:p-0">
        <h1 class="animated-gradient bg-gradient-to-r from-emerald-400 via-emerald-200 to-emerald-600 
           bg-clip-text text-transparent 
            font-extrabold text-5xl lg:text-6xl lg:leading-tight tracking-tight"><a href="" class="font-extrabold text-5xl lg:text-6xl text-white">Hi, I'm</a>
            Jude Russel Cuya
        </h1>
        <h2 class="lg:pt-5 lg:pb-6 pt-5 pb-5 intro-animate text-stone-200 lg:text-lg">
            <div class="flex justify-center lg:justify-start  pb-3">
                <img class="w-6" src={waveIcon} alt="">
                <p class="font-bold pl-2 typing-animation text-white">A Front-End Developer</p>
            </div>
             skilled in UI/UX and graphic design, creating responsive, user-friendly, and visually appealing digital experiences.
        </h2>

        <!-- Skill chips (desktop only, so mobile layout stays as original) -->
        <ul class="hidden lg:flex flex-wrap gap-2 pb-8 intro-animate">
          {#each skills as skill (skill)}
            <li class="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-300">
              {skill}
            </li>
          {/each}
        </ul>

        <div class="flex gap-4 text-a items-center justify-center lg:justify-start intro-animate">
                <!-- Download CV Button -->
                <div class="btn-primary w-fit bg-emerald-400 hover:bg-emerald-300 text-stone-950 rounded-md">   
                    <a class="font-extrabold text-sm px-4 py-2 flex items-center justify-center gap-2 rounded-md focus-visible:outline-none" href={myResume} download="My Official Resume.pdf">
                        <Download class="w-4 h-4" />
                        DOWNLOAD CV
                    </a>
                </div>
                <!-- Hire Me Button -->
                <div class="btn-secondary w-fit bg-transparent border-2 border-emerald-400 hover:bg-emerald-300 hover:border-emerald-300 text-white rounded-md"> 
                    <a href="https://www.linkedin.com/in/jude-russel-cuya-3a4233333/" target="_blank" rel="noopener noreferrer" class="font-extrabold text-sm px-4 py-2 flex items-center justify-center gap-1 rounded-md focus-visible:outline-none">
                        HIRE ME
                        <ArrowUpRight class="w-4 h-4" />
                    </a>
                </div>
        </div>
    </div>
</div>