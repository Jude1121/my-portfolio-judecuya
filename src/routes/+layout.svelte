<script>
	let { children } = $props();
	import favicon from '$lib/assets/favicon.svg';
	import "../app.css";

	import Footer from '../components/Footer.svelte';
	import webIcon from '$lib/assets/jude-logo-white.svg';


</script>


<svelte:head>
	<link rel="icon" href={webIcon} />

</svelte:head>




{@render children?.()}