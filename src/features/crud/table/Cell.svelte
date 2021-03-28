{#if col['component']}
	<svelte:component this={col['component']} {row} {...col['props'] ? { ...col['props'](row) } : {}} />
{:else if col['value']}
	{@html col['value'](row)}
{:else}{getValue(col, row)}{/if}

<script lang="ts">
	import Actions from './actions'
	import { getContext } from 'svelte'
	import type { DataTableCell, DataTableRow } from 'carbon-components-svelte/types/DataTable/DataTable'
	let { columns, actions, rows$ } = getContext('CRUD')

	let columnName: string
	let row: DataTableRow
	let col = columns.filter((cl) => cl.name == columnName)[0]

	function getValue(column, item) {
		if (column['fields']) {
			if (Array.isArray(column['fields']) && Array.isArray(item[column['name']])) {
				return item[column['name']].map((c) => c[column['fields'][0]]).join(' ')
			} else {
				return item[column['name']] && item[column['name']][column['fields'][0]]
			}
		} else if (item[column['name']]) {
			return item[column['name']]
		} else {
			return ''
		}
	}

	export { columnName,  row }
</script>
