{#if field.type == 'multiselect'}
	{#if field.queryName && field.isLoading}
		<DropdownSkeleton />
	{:else}
		<MultiSelect
			direction="top"
			{...object_without_properties(field, ['value', 'type', 'data'])}
			on:select={(e) => {
				field.value = e.detail.selectedIds.length > 0 ? e.detail.selectedIds : undefined
			}}
			sortItem={() => {}}
			filterItem={(item, value) => value}
		/>
	{/if}
{:else if field.type == 'select'}
	{#if skeleton || (field.queryName && field.isLoading)}
		<DropdownSkeleton />
	{:else}
		<Select
			bind:selected={field.value}
			{...object_without_properties(field, ['value', 'type', 'data', 'ref', 'selected'])}
		>
			{#if field['items']}
				<SelectItem />
				{#each field['items'] as item}
					<SelectItem value={item['id']}>{item['text']}</SelectItem>
				{/each}
			{/if}
		</Select>
	{/if}
{:else if field.type == 'editor'}
	{#if skeleton}
		<TextAreaSkeleton hideLabel />
	{:else}
		<Editor bind:value={field.value} />
	{/if}
{:else if field.type == 'component'}
	<svelte:component this={$$props.component} bind:value={field.value} {...field} />
{:else if field.type == 'date'}
	{#if skeleton}
		<DatePickerSkeleton range={$$restProps.datePickerType == 'range'} />
	{:else}
		<DatePicker
			style="flex:none"
			class={field.options && field.options.class}
			datePickerType="single"
			dateFormat="d/m/Y"
			bind:value={field.value}
		>
			<DatePickerInput placeholder="dd/mm/yyyy" {...field.options} />
			{#if $$restProps.datePickerType == 'range'}
				<DatePickerInput placeholder="dd/mm/yyyy" {...field.options} />
			{/if}
		</DatePicker>
	{/if}
{:else if field.type == 'file'}
	<FileUploader
		{...object_without_properties(field, ['value', 'type', 'data'])}
		on:change={(e) =>
			field.type == 'file' &&
			field.change(e, (vl, opt) => {
				field.value = vl
				if (opt) Object.assign(field, opt)
			})}
	/>
{:else if field.type == 'mask'}
	<TextInput bind:ref  {...object_without_properties(field, ['value', 'type'])} />
{:else}
	<svelte:component this={getComponent()} bind:value={field.value} {...object_without_properties(field, ['value', 'type', 'fields'])}   class="text-black"/>
{/if}

<script lang="ts">
	import {
		MultiSelect,
		DatePicker,
		DatePickerSkeleton,
		FileUploader,
		PasswordInput,
		TextInput,
		NumberInput,
		TextArea,
		Checkbox,
		RadioButton,
		TextInputSkeleton,
		NumberInputSkeleton,
		TextAreaSkeleton,
		CheckboxSkeleton,
		RadioButtonSkeleton,
		DatePickerInput,
		SelectSkeleton,
		DropdownSkeleton,
		Dropdown,
		Select,
		SelectItem,
	} from 'carbon-components-svelte'
	import { object_without_properties } from 'svelte/internal'
	import type { TField } from './builder/interfaces'
	import Editor from './Editor.svelte'
	import { getContext, onMount } from 'svelte'
	import { imask } from 'svelte-imask'

	const { hasura } = getContext<Api>('api')
	let ref
	let field: TField, skeleton

	onMount(() => {
		if (field.type === 'mask') {
			imask(ref, field.options)
			ref.addEventListener('complete', ({ detail: imask }) => {

				field['value'] = imask.value
				field['unmaskedValue'] = imask.unmaskedValue
			})
		}
	})

	function selectsQuery(field) {
		hasura(field['queryName'])
			.select(field.id !== field.text ? `${field.id} ${field.text}` : field.id)
			.get(false)
			.then((resp) => {
				field.items = resp[field['queryName']].map((it, index) => {
					return {
						id: index,
						text: it[field.text],
					}
				})
				field.isLoading = false
				skeleton = false
			})
			.catch((e) => {
				field.isLoading = false
				skeleton = false
			})
		return ''
	}
	if (['multiselect', 'select'].includes(field.type) && field.fields) {
		selectsQuery(field)
	}

	function getComponent() {
		switch (field.type) {
			case 'text':
			case 'hidden':
				return skeleton ? TextInputSkeleton : TextInput
			case 'password':
				return skeleton ? TextInputSkeleton : PasswordInput
			case 'number':
				return skeleton ? NumberInputSkeleton : NumberInput
			case 'textarea':
				return skeleton ? TextAreaSkeleton : TextArea
			case 'checkbox':
				return skeleton ? CheckboxSkeleton : Checkbox
			case 'radio':
				return skeleton ? RadioButtonSkeleton : RadioButton
			default:
				return skeleton ? TextInputSkeleton : TextInput
		}
	}
	export { field }
</script>
