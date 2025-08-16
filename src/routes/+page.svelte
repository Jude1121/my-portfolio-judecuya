<script>
    import Navbar from "../components/Navbar.svelte";
	import Header from "../components/Header.svelte";
    import Dashboard from "../components/Dashboard.svelte";
    import AboutMe from "../components/About Me.svelte";
    import Skills from "../components/Skills.svelte";
    import Projects from "../components/Projects.svelte";
    import Contact from "../components/Contact.svelte";
    import Comment from "../components/Comment.svelte";
    import Footer from "../components/Footer.svelte";
</script>

<body>
<div id="Navbar">
    <Navbar/>
</div>

<div id="Home">
    <Dashboard/>
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
    <Comment/>
</div>
<div>
    <Footer/>
</div>

</body>
