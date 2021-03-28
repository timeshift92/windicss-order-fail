<slot>
	<!-- optional fallback -->
</slot>

<script>
	/** TODO need release */
	import { setContext } from 'svelte'

	export let data

	setContext('CRUD', data)
</script>
