<script>
	let { children } = $props();
	
	import "../app.css";
	import HereCounter from '../components/HereCounter.svelte';

	import webIcon from '$lib/assets/jude-logo-white.svg';


</script>


<svelte:head>
	<link rel="icon" href={webIcon} />

</svelte:head>




{@render children?.()}
<HereCounter />