{#each $rows$ as item}
	<nu-row use-hover transform="none" place="center">
		{#each columns as col}
			<nu-cell border="1px" text="center" mark="n ^:hover[y]">
				{#if col['component']}
					<svelte:component this={col['component']} row={item} {...col['props'] ? { ...col['props'](item) } : {}} />
				{:else if col['value']}
					{@html col['value'](item)}
				{:else}{getValue(col, item)}{/if}
			</nu-cell>
		{/each}
		{#if actions}
			<nu-cell gap="2" border="1px" text="center" mark="n ^:hover[y]">
				<Actions id={item['id']} row={item} />
			</nu-cell>
		{/if}
	</nu-row>
{/each}

<script lang="ts">
	import Actions from './actions'
	import { getContext } from 'svelte'
	let { columns, actions, rows$ } = getContext('CRUD')
	function getValue(column, item) {
		if (column['fields']) {
			if (Array.isArray(column['fields']) && Array.isArray(item[column['name']])) {
				return item[column['name']].map((c) => c[column['fields'][0]]).join(' ')
			} else {
				return item[column['name']][column['fields'][0]]
			}
		} else if (item[column['name']]) {
			return item[column['name']]
		} else {
			return ''
		}
	}
</script>
