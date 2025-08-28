<script>
    import myProfile from '../lib/assets/PORTFOLIO PICTURE.png';
    import waveIcon from '../lib/assets/Waving Hand Emoji [Free Download IOS Emojis].png';
    import myResume from '../lib/assets/MY RUSUME - JUDE CUYA.pdf';

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
    border-right: 3px solid black;
    animation: typing 3s steps(22) forwards, blink 0.6s infinite;
  }

  @keyframes typing {
    from { width: 0; }
    to   { width: 18ch; }
  }

  @keyframes blink {
    60% { border-color: transparent; }
  }
</style>

<div class="lg:flex lg:justify-baseline justify-center lg:items-center intro-animate">
    <div class="lg:pl-40 lg:pt-20 lg:w-7xl">
        <img class="rounded-full lg:rounded-b-none" src={myProfile} alt="">
    </div>
    <div class="lg:pl-25 pt-10 p-14 lg:p-0 ">
        <h1 class="font-extrabold text-5xl transform transition-transform duration-300 hover:scale-110">
            FRONTEND DEVELOPER
        </h1>
        <h2 class="lg:pt-5 lg:pr-60 lg:pb-20 pt-5 pb-5">
            <div class="flex justify-baseline pb-3">
                <img class="w-6" src={waveIcon} alt="">
                <p class="font-bold pl-2 typing-animation">I'm Jude Russel Cuya</p>
            </div>
             a Front-End Developer skilled in UI/UX and graphic design, creating responsive, user-friendly, and visually appealing digital experiences.
        </h2>
        <div class="flex gap-4 text-a items-center">
                <!-- Download CV Button -->
                <div class="w-fit bg-black text-white transform transition-transform duration-300 hover:scale-110 rounded-md">   
                    <a class="font-extrabold text-sm px-4 py-2 flex items-center justify-center gap-2" href={myResume} download="MyResume.pdf">
                        <Download class="w-4 h-4" />
                        DOWNLOAD CV
                    </a>
                </div>
                <!-- Hire Me Button -->
                <div class="w-fit bg-black text-white transform transition-transform duration-300 hover:scale-110 rounded-md"> 
                    <a href="https://www.linkedin.com/in/jude-russel-cuya-3a4233333/" target="_blank" class="font-extrabold text-sm px-4 py-2 flex items-center justify-center">
                        HIRE ME
                    </a>
                </div>
        </div>
    </div>
</div>
