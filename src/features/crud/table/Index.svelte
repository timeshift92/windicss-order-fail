{#if $rows$.length > 0}
	<DataTable on:click:header={clHead} expandable sortable {headers} rows={$rows$}>
		<Toolbar>
			<ToolbarContent>
				<ToolbarSearch />
				<ToolbarMenu>
					<ToolbarMenuItem primaryFocus>Restart all</ToolbarMenuItem>
					<ToolbarMenuItem href="https://cloud.ibm.com/docs/loadbalancer-service">API documentation</ToolbarMenuItem>
					<ToolbarMenuItem danger>Stop all</ToolbarMenuItem>
				</ToolbarMenu>
				<Button
					on:click={(e) => {
						component = Create
						showModal = 1
					}}
				>
					Create
				</Button>
			</ToolbarContent>
		</Toolbar>
		<span slot="cell" let:row let:cell>
			{#if cell.key === 'overflow'}
				<OverflowMenu flipped>
					<OverflowMenuItem
						on:click={(e) => {
							showModal = 1
							component = Update
							row = row
						}}
						text="Restart"
					/>
					<OverflowMenuItem href="https://cloud.ibm.com/docs/loadbalancer-service" text="API documentation" />
					<OverflowMenuItem danger text="Stop" />
				</OverflowMenu>
			{:else}
				<Cell {row} columnName={cell.key} />
			{/if}
		</span>
	</DataTable>
	<Pagination
		on:update={(e) => {
			$offset$ = (e.detail.page - 1) * e.detail.pageSize
			request.upd()
		}}
		bind:pageSize
		totalItems={$total$}
		pageSizes={[10, 15, 20]}
	/>
	{#if component}
		<ModalSwipe withButton={false} topBlock={true} bind:showModal let:handle={handleClose}>
			<svelte:component this={component} {handleClose} {row} />
		</ModalSwipe>
	{/if}
{:else}
	<DataTableSkeleton {headers} rows={10} />
{/if}

<script lang="ts">
	import Create from './actions/Create.svelte'
	let showModal = 0
	import {
		DataTable,
		DataTableSkeleton,
		OverflowMenu,
		OverflowMenuItem,
		Pagination,
		Toolbar,
		ToolbarContent,
		ToolbarSearch,
		ToolbarMenu,
		ToolbarMenuItem,
		Button,
	} from 'carbon-components-svelte'
	import type { DataTableCell, DataTableHeader } from 'carbon-components-svelte/types/DataTable/DataTable'
	import ModalSwipe from '@co/base/ModalSwipe.svelte'
	import { getContext } from 'svelte'
	let component
	let row
	import Cell from './Cell.svelte'
	import Update from './actions/Update.svelte'
	import type HasuraORM from 'hasura-orm'

	function getValue(cell: DataTableCell) {
		if (Array.isArray(cell.value)) return cell
	}
	function clHead(
		e: CustomEvent<{
			header: DataTableHeader
			sortDirection: 'ascending' | 'descending' | 'none'
		}>
	) {
		if (e.detail.sortDirection !== 'none' && e.detail.header['isSortable']) {
			const direction = e.detail.sortDirection == 'ascending' ? 'asc' : 'desc'
			//@ts-ignore
			sortEvent(e.detail.header.sort(direction))
		}
	}

	let {
		columns,
		rows$,
		actions,
		total$,
		offset$,
		request,
		pagination,
		sortEvent,
		filterEvent,
	}: {
		columns: any
		rows$: any
		actions: any
		total$: any
		offset$: any
		request: HasuraORM
		pagination: any
		sortEvent: any
		filterEvent: any
	} = getContext('CRUD')
	const headers: DataTableHeader[] = [...columns].map((it) => {
		return {
			key: it.name,
			...(it.sort ? { sort: it.sort } : { sort: (a, b) => 0 }),
			...(it.sort ? { isSortable: true } : { isSortable: false }),
			value: it.title,
			component: it.component,
		}
	})
	if (actions) {
		headers.push({
			key: 'overflow',
			empty: true,
		})
	}
	let pageSize
	$: if (pageSize && pagination) {
		pagination.limit = pageSize
		request.upd()
	}
</script>

<style>
	:global(.bx--data-table-container > table) {
		/* display: block; */
		overflow: scroll;
	}

	:global(.bx--data-table-container > table) {
		--scrollbar-track: initial;
		--scrollbar-thumb: initial;
		scrollbar-color: var(--scrollbar-thumb) var(--scrollbar-track);
		overflow: overlay;
	}
	:global(.bx--data-table-container > table)::-webkit-scrollbar-track {
		background-color: var(--scrollbar-track);
	}
	:global(.bx--data-table-container > table)::-webkit-scrollbar-thumb {
		background-color: var(--scrollbar-thumb);
	}
	:global(.bx--data-table-container > table) {
		scrollbar-width: auto;
	}
	:global(.bx--data-table-container > table)::-webkit-scrollbar {
		width: 16px;
		height: 16px;
	}
	:global(.bx--data-table-container > table) {
		--scrollbar-track: initial;
		--scrollbar-thumb: initial;
		scrollbar-color: var(--scrollbar-thumb) var(--scrollbar-track);
		overflow: overlay;
	}
	:global(.bx--data-table-container > table)::-webkit-scrollbar-track {
		background-color: var(--scrollbar-track);
	}
	:global(.bx--data-table-container > table)::-webkit-scrollbar-thumb {
		background-color: var(--scrollbar-thumb);
	}
	:global(.bx--data-table-container > table) {
		scrollbar-width: thin;
	}
	:global(.bx--data-table-container > table)::-webkit-scrollbar {
		width: 8px;
		height: 8px;
	}
	:global(.bx--data-table-container > table) {
		--scrollbar-track: #202020;
		--scrollbar-thumb: #6b7280;
	}
	:global(.bx--data-table-container > table)::-webkit-scrollbar-thumb {
		border-radius: 50px;
	}
</style>
