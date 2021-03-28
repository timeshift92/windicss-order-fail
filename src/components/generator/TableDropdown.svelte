<nu-pane>
	<input class="form-input" type="text" bind:value={title} />
	<!-- svelte-ignore a11y-no-onchange -->
	<select
		on:change={async (e) => {
			setScheme(e.target['value'])
			tables = await getTables()
			schemeName = e.target['value']
		}}
	>
		<option value={0}>select</option>
		{#each schemes as scheme}
			<option value={scheme}>{scheme}</option>
		{/each}
	</select>
	<!-- svelte-ignore a11y-no-onchange -->

	<select
		on:change={(e) => {
			handleChange({ detail: JSON.parse(e.target['value']) })
		}}
	>
		<option value={0}>select</option>
		{#each tables as table}
			<option value={JSON.stringify(table)}>{table.table_name}</option>
		{/each}
	</select>
</nu-pane>

<script>
	import { onMount, createEventDispatcher } from 'svelte'
	const dispatch = createEventDispatcher()
	import { getTables, getTableSchemas, setScheme } from './gnRequests'
	let tables = []
	let schemes = []
	export let title
	let selected
	let schemeName

	onMount(async () => {
		tables = await getTables()
		schemes = await getTableSchemas()
	})

	function handleChange({ detail }) {
		selected = detail
		if (!title) title = detail.table_name
		dispatch('tableSelected', { ...selected, schemeName })
	}
</script>
