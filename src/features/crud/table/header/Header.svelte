<nu-row theme="tone soft" fill color shadow>
	{#each columns as col }
		<HeaderItem column={col} />
	{/each}
	{#if actions}
		<nu-columnheader width="200px" role="checkbox" border="1px" text="center">
			<nu-flex gap="0.5" content="center">
				<nu-label text="b">{actions.title}</nu-label>
			</nu-flex>
		</nu-columnheader>
	{/if}
</nu-row>
{#if columns.filter((c) => c.filter)[0]}
	<nu-row>
		<Filter />
	</nu-row>
{/if}

<script lang="ts">
	import { Filter } from '../../components'
	import { getContext } from 'svelte'
	import HeaderItem from './HeaderItem.svelte'

	let { columns, actions } = getContext('CRUD')
</script>
