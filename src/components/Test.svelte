<script>
    import myProfilenoBg from '../lib/assets/PORTFOLIO PICTURE.png';
    import myProfile from '../lib/assets/Me.jpg';
    import waveIcon from '../lib/assets/Waving Hand Emoji [Free Download IOS Emojis].png';
    import myResume from '../lib/assets/MY RUSUME - JUDE CUYA.pdf';
    import myProfileWhite from '$lib/assets/My Image White Background.png';
    import pfBgBlack from'$lib/assets/my pic bg black.png';
    import CodeGreen from '../lib/assets/Code Logo Green.png';

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

<div class="bg-neutral-950 text-white lg:flex lg:justify-baseline justify-center lg:items-center">
    <div class="lg:pl-45 lg:pt-15 lg:pb-20 lg:w-7xl pt-10 pr-10 pl-10 intro-animate">
      <div class="orbit-ring">
        <img class="rounded-full w-7xl  shadow-lg" src={myProfile} alt="">
      </div>
    </div>
    <div class=" lg:pl-20 pt-10  p-10 lg:p-0 intro-animate"> 
        <h1 class="animated-gradient bg-gradient-to-r from-green-500 via-lime-300 to-green-700 
           bg-clip-text text-transparent 
            font-extrabold text-5xl"><a href="" class="font-extrabold text-5xl  text-white">Hi, I'm</a>
            Jude Russel Cuya
        </h1>
        <h2 class="lg:pt-5 lg:pr-60 lg:pb-20 pt-5 pb-5 intro-animate ">
            <div class="flex justify-baseline pb-3">
                <img class="w-6" src={waveIcon} alt="">
                <p class="font-bold pl-2 typing-animation">A Front-End Developer</p>
            </div>
             skilled in UI/UX and graphic design, creating responsive, user-friendly, and visually appealing digital experiences.
        </h2>
        <div class=" flex gap-4 text-a items-center intro-animate">
                <!-- Download CV Button -->
                <div class="w-fit bg-green-500 hover:bg-lime-400 text-white rounded-md ">   
                    <a class="font-extrabold text-sm px-4 py-2 flex items-center justify-center gap-2" href={myResume} download="MyResume.pdf">
                        <Download class="w-4 h-4" />
                        DOWNLOAD CV
                    </a>
                </div>
                <!-- Hire Me Button -->
                <div class="w-fit  bg-stone-950 border-2 border-green-500 hover:bg-lime-400 text-white rounded-md"> 
                    <a href="https://www.linkedin.com/in/jude-russel-cuya-3a4233333/" target="_blank" class="font-extrabold text-sm px-4 py-2 flex items-center justify-center">
                        HIRE ME
                    </a>
                </div>
        </div>
    </div>
</div>
