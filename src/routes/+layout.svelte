<script>
	let { children } = $props();
	import favicon from '$lib/assets/favicon.svg';
	import "../app.css";
	import Header from '../components/Header.svelte';
	import Footer from '../components/Footer.svelte';
	import webIcon from '../lib/assets/Jude Russel LOGO white copy.svg'

	
</script>

<svelte:head>
	<link rel="icon" href={webIcon} />
</svelte:head>




{@render children?.()}