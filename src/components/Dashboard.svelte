<script>

    import myProfile from '../lib/assets/Me.jpg';
    import waveIcon from '../lib/assets/Waving Hand Emoji [Free Download IOS Emojis].png';
    import myResume from '../lib/assets/JUDE -RESUME OFFICIAL.pdf';


    // download icon
    import { Download } from 'lucide-svelte';
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

@keyframes spin {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}


@keyframes smoothGlow {
  0%, 100% {
    text-shadow: none;
    opacity: 0.7;
  }
  50% {
    text-shadow: 0 0 8px #22c55e,
                 0 0 16px #22c55e,
                 0 0 32px #22c55e,
                 0 0 48px #22c55e;
    opacity: 1;
  }
}

.orbit-ring {
  --orbit-size: 7px; /* distance of orbit from image */
  position: relative;
  display: inline-block;
  border-radius: 50%;
}

.orbit-ring:hover {
  box-shadow: 0 0 30px 8px rgba(11, 165, 50, 0.7), 
              0 0 50px 20px rgba(11, 165, 50, 0.5);
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
  background: linear-gradient(90deg, #22c55e, #bef264, #15803d);
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
</style>

<div class="bg-stone-950 text-white flex flex-col lg:flex-row items-center justify-center gap-0 lg:gap-16 px-0 lg:px-16 pb-10 lg:py-20">

    <!-- Profile (mobile size = original: full width minus 40px each side) -->
    <div class="intro-animate shrink-0 w-full sm:w-auto px-10 pt-10 lg:p-2 flex justify-center">
      <div class="orbit-ring w-full sm:w-auto">
        <img
          class="rounded-full shadow-lg object-cover aspect-square
                 w-full sm:w-80 md:w-96 lg:w-72 xl:w-80 2xl:w-96"
          src={myProfile}
          alt="Jude Russel Cuya"
        >
      </div>
    </div>

    <!-- Text -->
    <div class="intro-animate text-center lg:text-left max-w-xl lg:max-w-2xl px-9 pt-10 lg:p-0">
        <h1 class="animated-gradient bg-gradient-to-r from-green-500 via-lime-300 to-green-700 
           bg-clip-text text-transparent 
            font-extrabold  text-5xl"><a href="" class="font-extraboldtext-5xl text-white">Hi, I'm</a>
            Jude Russel Cuya
        </h1>
        <h2 class="pt-5 pb-5 lg:pb-10 intro-animate text-md sm:text-base">
            <div class="flex justify-center lg:justify-start pb-3">
                <img class="w-6" src={waveIcon} alt="">
                <p class="font-bold pl-2 typing-animation">A Front-End Developer</p>
            </div>
             skilled in UI/UX and graphic design, creating responsive, user-friendly, and visually appealing digital experiences.
        </h2>
        <div class="flex flex-wrap gap-4 items-center justify-center lg:justify-start intro-animate">
                <!-- Download CV Button -->
                <div class="w-fit bg-green-500 hover:bg-lime-400 text-white rounded-md">   
                    <a class="font-extrabold text-sm px-4 py-2 flex items-center justify-center gap-2" href={myResume} download="My Official Resume.pdf">
                        <Download class="w-4 h-4" />
                        DOWNLOAD CV
                    </a>
                </div>
                <!-- Hire Me Button -->
                <div class="w-fit bg-transparent border-2 border-green-500 hover:bg-lime-400 text-white rounded-md"> 
                    <a href="https://www.linkedin.com/in/jude-russel-cuya-3a4233333/" target="_blank" class="font-extrabold text-sm px-4 py-2 flex items-center justify-center">
                        HIRE ME
                    </a>
                </div>
        </div>
    </div>
</div>