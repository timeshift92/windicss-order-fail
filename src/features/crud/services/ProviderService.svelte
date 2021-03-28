<svelte:component this={component} {data}>
	<slot {data} />
</svelte:component>

<script lang="ts">
	import { DataProvider, GraphqlProvider } from '../providers'
	export let data: any = {}
	let component = DataProvider
	if (data.queryName) {
		component = GraphqlProvider
	}
	$: console.log(data)
</script>
