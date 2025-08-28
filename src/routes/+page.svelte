<script>
    import Navbar from "../components/Navbar.svelte";
	import Header from "../components/Header.svelte";
    import Dashboard from "../components/Dashboard.svelte";
    import AboutMe from "../components/About Me.svelte";
    import Skills from "../components/Skills.svelte";
    import Projects from "../components/Projects.svelte";
    import Contact from "../components/Contact.svelte";
    import GetInTouch from "../components/GetInTouch.svelte";
    import Footer from "../components/Footer.svelte";
    import Test from "../components/Test.svelte";
</script>

<body>
<div id="Navbar">
    <Navbar/>
</div>

<div id="Home">
    <Test/>
</div>
<div id="AboutMe">
    <AboutMe/>
</div>
<div id="Skills">
    <Skills/>
</div>
<div id="Project">
    <Projects/>
</div>
<div id="Contact">
     <Contact/>
     <GetInTouch/>
</div>
<div>
    <Footer/>
</div>

</body>
