<div class="bx--row " style="justify-content: space-between; padding: 0 20px 5px 20px;">
	<h3>GridView</h3>
	<Button
		{...result.length > 0 ? {} : { disabled: true }}
		on:click={(e) => {
			showModal = showModal == 0 ? 1 : 0
			handleClick()
		}}
		size="small"
		style="float:right">Просмотр</Button
	>
</div>
<Accordion>
	<AccordionItem title="Таблица" open>
		<Table rows={result}>
			<svelte:fragment slot="column" let:column let:index>
				<tr>
					<td>
						<TextInput value={column.name} disabled />
					</td>
					<td>
						<TextInput value={column.title} />
					</td>
					<td>
						{#if hasRelation(column.name, table) && column.fields && column.fields.length > 0}
							<MultiSelect
								direction="top"
								on:select={(e) => {
									setColumns(column)
								}}
								items={column.fields.flatMap((fl, index) => ({ id: index, text: fl.name }))}
							/>
						{/if}
					</td>
					<td>
						<ComboBox
							direction="top"
							items={Object.keys(Components).flatMap((fl, index) => ({ id: index + '', text: fl }))}
						/>
					</td>
					<td>
						<Icon style="cursor:pointer" name="x" on:click|once={(e) => handleDelete(column)} />
					</td>
				</tr>
			</svelte:fragment>
		</Table>
	</AccordionItem>
</Accordion>
<ModalSwipe withButton={false} bind:showModal>
	<CRUD {data} />
</ModalSwipe>

<script lan="ts">
	import Table from './lib/Table.svelte'
	import CRUD from '@/features/crud/Index.svelte'
	import { getRelation, hasRelation, relationType } from './gnUtils'
	import * as Components from '@co/index'
	import { ComboBox, MultiSelect, TextInput, Button, Accordion, AccordionItem } from 'carbon-components-svelte'
	import Icon from '../base/Icon.svelte'
	import { getContext } from 'svelte'
	import ModalSwipe from '../base/ModalSwipe.svelte'

	const { builder$ } = getContext('generator')
	export let result = []
	export let table
	export let gridview = []
	export let tableName
	export let schemeName
	export let data = undefined
	let showModal = 0
	function setColumns(col) {
		if (!gridview) {
			gridview = []
		}

		gridview.push({
			name: getRelation(col.name, table) || col.name,
			title: col.title,
			fields: col.fields && col.fields.map((_fl) => _fl.name),
		})

		return ''
	}
	function handleDelete(column) {
		result = result.filter((key) => key.name != column.name)
		gridview = []
		data = undefined
	}
	export let execute = false
	$: if (execute) {
		handleClick()
		execute = false
	}
	function handleClick() {
		gridview = []
		result.map((fl) => {
			setColumns(fl)
		})
		generateCrudData()
	}
	function generateCrudData() {
		if (gridview.length > 0)
			data = {
				prefix: schemeName == 'public' ? '' : schemeName,
				queryName: schemeName == 'public' ? tableName : `${schemeName}_${tableName}`,
				formBuilder: $builder$,
				create: true,
				actions: {
					title: 'Действия',
					update: true,
					delete: true,
				},
				columns: gridview,
				pagination: {
					limit: 10,
				},
			}
		return ''
	}
</script>
