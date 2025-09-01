<script>
    import myProfilenoBg from '../lib/assets/PORTFOLIO PICTURE.png';
    import myProfile from '../lib/assets/Me.jpg';
    import waveIcon from '../lib/assets/Waving Hand Emoji [Free Download IOS Emojis].png';
    import myResume from '../lib/assets/MY RUSUME - JUDE CUYA.pdf';
    import myProfileWhite from '$lib/assets/My Image White Background.png';
    import pfBgBlack from'$lib/assets/my pic bg black.png';

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

.orbit-ring {
  --orbit-size: 8px; /* distance of orbit from image */
  position: relative;
  display: inline-block;
  border-radius: 50%;
}
.orbit-ring:hover {
  box-shadow: 0 0 25px 8px rgba(11, 165, 50, 0.7), 
              0 0 45px 15px rgba(11, 165, 50, 0.5);
}

/* Keep image still */
.orbit-ring img {
  display: block;
  border-radius: 50%;
  position: relative;
  z-index: 2;
}

/* Orbit line with fade (top arc) */
.orbit-ring::before {
  content: "";
  position: absolute;
  inset: calc(var(--orbit-size) * -1);
  border-radius: 50%;
  background: conic-gradient(
    from 0deg,
    rgb(11, 165, 50) 0deg,   /* green full */
    rgba(253, 176, 32, 0) 150deg,   /* fade */
    transparent 360deg
  );
  animation: spin 7s linear infinite; /* clockwise */
  z-index: 1;
}

/* Second orbit line (bottom arc, opposite offset) */
.orbit-ring::after {
  content: "";
  position: absolute;
  inset: calc(var(--orbit-size) * -1);
  border-radius: 50%;
  background: conic-gradient(
    from 180deg,
    rgb(11, 165, 50) 0deg,
    rgba(34,197,94,0) 150deg,
    transparent 360deg
  );
  animation: spin 7s linear infinite; /* clockwise */
  z-index: 1;
}
</style>

<div class="bg-neutral-950 text-white lg:flex lg:justify-baseline justify-center lg:items-center intro-animate">
    <div class="lg:pl-45 lg:pt-20 lg:pb-20 lg:w-7xl pt-10 pr-10 pl-10">
      <div class="orbit-ring">
        <img class="rounded-full lg:w-xl shadow-lg" src={myProfile} alt="">
      </div>
    </div>
    <div class=" lg:pl-20 pt-10 p-14 lg:p-0 "> 
        <h1 class="text-green-500 font-extrabold text-5xl transform transition-transform duration-300 hover:scale-110">
            FRONTEND DEVELOPER
        </h1>
        <h2 class="lg:pt-5 lg:pr-60 lg:pb-20 pt-5 pb-5">
            <div class="flex justify-baseline pb-3">
                <img class="w-6" src={waveIcon} alt="">
                <p class="font-bold pl-2 typing-animation ">I'm Jude Russel Cuya</p>
            </div>
             a Front-End Developer skilled in UI/UX and graphic design, creating responsive, user-friendly, and visually appealing digital experiences.
        </h2>
        <div class=" flex gap-4 text-a items-center">
                <!-- Download CV Button -->
                <div class="w-fit bg-white hover:bg-green-500 hover:text-white text-black rounded-md ">   
                    <a class="font-extrabold text-sm px-4 py-2 flex items-center justify-center gap-2" href={myResume} download="MyResume.pdf">
                        <Download class="w-4 h-4" />
                        DOWNLOAD CV
                    </a>
                </div>
                <!-- Hire Me Button -->
                <div class="w-fit bg-white text-black  hover:bg-green-500 hover:text-white  rounded-md"> 
                    <a href="https://www.linkedin.com/in/jude-russel-cuya-3a4233333/" target="_blank" class="font-extrabold text-sm px-4 py-2 flex items-center justify-center">
                        HIRE ME
                    </a>
                </div>
        </div>
    </div>
</div>
