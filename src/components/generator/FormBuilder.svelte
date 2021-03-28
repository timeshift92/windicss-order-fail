<div class="bx--row " style="justify-content: space-between; padding: 0 20px 5px 20px;">
	<h3>FormBuilder</h3>
	<Button
		{...result.length > 0 ? {} : { disabled: true }}
		on:click={(e) => {
			showForm()
			setTimeout(() => {
				showModal = 1
			}, 150)
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
						<Select
							selected={getType(column.type)}
							on:change={(e) => {
								column.type = e.detail
								// setField(column, e.detail)
							}}
						>
							{#each getTypes(column) as item}
								<SelectItem value={item}>{item}</SelectItem>
							{/each}
						</Select>
					</td>
					<td>
						<TextInput value={column.title} />
					</td>

					<td style="width:300px">
						{#if getType(column.type).indexOf('select') != -1}
							id: <Dropdown
								on:select={(e) => {
									column.key = e.detail.selectedItem.text
								}}
								selectedIndex={0}
								items={column.fields.map((c, index) => ({ id: index, text: c.name }))}
							/>
							text: <Dropdown
								on:select={(e) => {
									column.key = e.detail.selectedItem.text
								}}
								selectedIndex={0}
								items={column.fields.map((c, index) => ({ id: index, text: c.name }))}
							/>
						{:else if ['tabs', 'fieldset'].includes(getType(column.type))}
							<MultiSelect
								direction="top"
								on:select={(e) => {
									column.current_fields = e.detail.selected.map((sl) => sl['name'])
								}}
								selectedIds={column.fields.map((f, i) => i)}
								items={column.fields.map((c, index) => ({ id: index, text: c.name }))}
							/>
						{:else}
							<nu-input />
						{/if}
					</td>
					<td>
						{column.required}
						<TextInput hidden disabled value={column.required ? 'required' : ''} />
					</td>
					<td>
						<Icon use-action inset="n :hover[y]" cursor="pointer" name="x" on:click={(e) => handleDelete(column)} />
					</td>
				</tr>
				{#if result.length - 1 == index}
					{showForm()}
				{/if}
			</svelte:fragment>
		</Table>
	</AccordionItem>
</Accordion>
<ModalSwipe withButton={false} bind:showModal>
	{#if fb}
		<Form bind:formBuilder={fb.store} />
	{/if}
</ModalSwipe>

<script>
	import {
		MultiSelect,
		TextInput,
		SelectItem,
		Dropdown,
		Button,
		Accordion,
		AccordionItem,
	} from 'carbon-components-svelte'
	import Select from 'carbon-components-svelte/src/Select/Select.svelte'
	import { getContext } from 'svelte'
	import Icon from '../base/Icon.svelte'
	import pluralize from '../../features/crud/helpers/pluralizer'
	import type { FieldSetContructorArgs, TabFieldContructorArgs } from '../form/builder'
	import { FormBuilder, TabField } from '../form/builder'
	import Form from '../form/Form.svelte'
	import { getRelation } from './gnUtils'
	import Table from './lib/Table.svelte'
	import ModalSwipe from '../base/ModalSwipe.svelte'

	function getTypes(column) {
		const types = ['text', 'textarea', 'number', 'checkbox', 'radio', 'date', 'select', 'multiselect', 'editor']
		if (column.fields) {
			types.push('tabs', 'fieldset')
		}
		return types
	}

	function getType(type) {
		if (
			['smallint', 'integer', 'bigint', 'decimal', 'numeric', 'real', 'double', 'serial', 'bigserial'].includes(type)
		) {
			return 'number'
		} else if (['object_relation'].includes(type)) {
			return 'select'
		} else if (['array_relation'].includes(type)) {
			return 'multiselect'
		} else if (
			[
				'timestamp with time zone',
				'timestamp without time zone',
				'date',
				'time with time zone',
				'time without time zone',
				'interval',
			].includes(type)
		) {
			return 'date'
		} else if (type == 'boolean') return 'checkbox'
		else if (['character varying', 'varchar', 'character', 'char'].includes(type)) {
			return 'text'
		} else if (type == 'textarea') {
			return 'textarea'
		}else{
			return 'text'
		}
		return type
	}
	export let result = []
	export let table
	export let tableName
	export let schemeName

	const { builder$, formObject$ } = getContext('generator')
	function handleDelete(column) {
		result = result.filter((key) => key.name != column.name)
	}

	let fb
	// = new FormBuilder({ name: table && table.table_name })
	function setField(fl, type?) {
		const fln = Object.assign({}, fl)
		fln.labelText = fl.title
		fln.name = getRelation(fln.name, table) || fln.name
		fln.type = type || getType(fl.type)
		if (fln.required) {
			fln.validations = 'required'
		}
		if (['select', 'multiselect'].includes(fln.type)) {
			if (!fln.id) {
				fln.id = fln.fields[0].name
			}
			if (!fln.text) {
				fln.text = fln.fields[0].name
			}
			fln.fields = fln.fields.map((f) => f.name)
			fln.queryName = pluralize.plural(getRelation(fln.name, table) || fln.name)
			fln.isLoading = true
		}

		if (fln.type == 'tabs') {
			setTabField(fln)
		} else if (fln.type == 'fieldset') {
			setFieldSet(fln)
		} else {
			$formObject$ = [
				...$formObject$,
				{
					name: fln.name,
					labelText: fln.labelText,

					...(fln.fields ? { fields: fln.fields } : {}),
					type: fln.type,
					...(fln.id ? { id: fln.id } : {}),
					...(fln.text ? { text: fln.text } : {}),
					...(fln.queryName ? { queryName: schemeName + '_' + fln.queryName } : {}),
					...(fln.isLoading ? { isLoading: fln.isLoading } : {}),
				},
			]
		}

		return ''
	}

	function setTabField(fln) {
		const tabField: TabFieldContructorArgs = {
			name: getRelation(fln.name, table) || fln.name,
			type: 'tabs',
			args: [{ name: fln.fields[0].name, title: getRelation(fln.name, table) || fln.name, value: fln.fields[0].name }],
		}

		tabField.fields = []

		fln.fields.map((_fl: any) => {
			const flTmp: any = {
				name: _fl.name,
				labelText: _fl.title,
				type: getType(_fl.type),
				...(fln.required ? { validations: 'required' } : {}),
			}
			tabField.fields.push(flTmp)
			// fr.addField(flTmp)
		})
		$formObject$ = [...$formObject$, tabField]
	}
	function setFieldSet(fln) {
		const tabField: FieldSetContructorArgs = {
			name: getRelation(fln.name, table) || fln.name,
			type: 'fieldset',
		}
		const idx = fb.removeField(fln.name)

		const fr = fb.addRelation({ ...tabField }, idx)
		tabField.fields = []

		fln.fields.map((_fl: any) => {
			const flTmp: any = {
				name: _fl.name,
				labelText: _fl.title,
				type: getType(_fl.type),
				...(fln.required ? { validations: 'required' } : {}),
			}
			tabField.fields.push(flTmp)
			fr.addField(flTmp)
		})
		$formObject$ = [...$formObject$, tabField]
	}

	let showModal = 0
	function showForm() {
		fb = null
		formObject$.set([])
		result.map((fld) => {
			setField(fld)
		})
		setTimeout(() => {
			fb = new FormBuilder({ name: table && table.name })
			fb.parseJson($formObject$)
			builder$.set(fb)
		}, 150)
		return ''
	}
</script>
