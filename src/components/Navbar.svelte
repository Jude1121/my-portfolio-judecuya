<script>
  import Logo from '../lib/assets/Jude Russel LOGO white copy.svg';



</script>


<header class="fixed top-0 inset-x-0 z-50 bg-black text-white font-bold">
  <!-- Hidden checkbox controls menu open/close -->
  <input id="nav-toggle" type="checkbox" class="peer sr-only" aria-hidden="true" />

  <div class="max-w-7xl mx-auto px-4">
    <div class="flex items-center justify-between h-16 ">
      <!-- Logo -->
      <a href="#Home" class="flex items-center gap-2">
        <img src={Logo} alt="Logo" class="w-16 select-none pointer-events-none" />
      </a>

      <!-- Desktop menu (≥ lg) -->
      <ul class="hidden lg:flex items-center gap-8">
        <li><a href="#Home" class=" hover:text-green-500">HOME</a></li>
        <li><a href="#AboutMe" class=" hover:text-green-500">ABOUT</a></li>
        <li><a href="#Skills" class=" hover:text-green-500">SKILLS</a></li>
        <li><a href="#Project" class=" hover:text-green-500">PROJECT</a></li>
        <li><a href="#Contact" class=" hover:text-green-500">CONTACT</a></li>
      </ul>

      <!-- Hamburger (phones & iPads) -->
      <label
        for="nav-toggle"
        class="lg:hidden p-2 rounded-xl cursor-pointer focus:outline-none focus:ring-2 focus:ring-green-500"
        aria-controls="mobile-nav"
        aria-label="Toggle menu"
      >
        <!-- Hamburger icon (when closed) -->
        <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 peer-checked:hidden" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </label>
    </div>
  </div>

  <!-- Full-screen Mobile menu -->
  <nav
    id="mobile-nav"
    class="lg:hidden fixed inset-0 bg-black/85 hidden peer-checked:flex flex-col justify-center items-center space-y-6 text-xl"
  >
    <!-- Exit button -->
    <label for="nav-toggle" class="absolute top-5 right-5 cursor-pointer">
      <svg xmlns="http://www.w3.org/2000/svg" class="w-10 h-10 text-white hover:text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M6 18L18 6M6 6l12 12" />
      </svg>
    </label>

    <!-- Menu items -->
    <a class="hover:text-green-500" href="#Home">HOME</a>
    <a class="hover:text-green-500" href="#AboutMe">ABOUT</a>
    <a class="hover:text-green-500" href="#Skills">SKILLS</a>
    <a class="hover:text-green-500" href="#Project">PROJECT</a>
    <a class="hover:text-green-500" href="#Contact">CONTACT</a>
  </nav>
</header>

<!-- Spacer so content isn't hidden under fixed header -->
<div class="h-16"></div>
