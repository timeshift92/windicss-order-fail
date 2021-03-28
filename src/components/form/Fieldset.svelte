<flex {...field.options}>
	{#each field.fields as field}
		{#if field instanceof TabField}
			<Tabs {skeleton} {field} />
		{:else if field instanceof FieldSet}
			<svelte:self {field} />
		{:else if !(field instanceof FieldSet) && !(field instanceof TabField)}
			<Field {skeleton} {field} />
		{/if}
	{/each}
</flex>

<script lang="ts">
	import { FieldSet, TabField } from './builder'

	import Field from './Field.svelte'
	import Tabs from './Tabs.svelte'

	export let field: FieldSet, skeleton
</script>

<style>
	flex {
		display: flex;
		gap: 5%;
	}
</style>
