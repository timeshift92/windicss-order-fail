<Form on:submit={(e) => submit(e)}>
	{#if $formBuilder.button && $formBuilder.button.position == 'top'}
		<Button type="submit" {...$formBuilder.button.options}>
			{#if isLoading}
				<InlineLoading />
			{/if}
			{$formBuilder.button.title || 'SEND'}
		</Button>
	{/if}
	{#each $formBuilder.fields as field}
		{#if field instanceof TabField}
			<Tabs skeleton={$formBuilder.skeleton} {field} />
		{:else if field instanceof FSFIeld}
			<Fieldset skeleton={$formBuilder.skeleton} {field} />
		{:else if !(field instanceof FSFIeld) && !(field instanceof TabField)}
			<Field skeleton={$formBuilder.skeleton} {field} />
		{/if}
	{/each}

	{#if $formBuilder.button && $formBuilder.button.position == 'bottom'}
		<Button type="submit" {...$formBuilder.button.options}>
			{#if isLoading}
				<InlineLoading />
			{/if}
			{$formBuilder.button.title || 'SEND'}
		</Button>
	{/if}
</Form>

<script lang="ts">
	import { Form, Button, InlineLoading } from 'carbon-components-svelte'
	import Field from './Field.svelte'
	import Fieldset from './Fieldset.svelte'
	import Tabs from './Tabs.svelte'
	import { createEventDispatcher, onMount } from 'svelte'
	import { FieldSet as FSFIeld, FormBuilder, TabField } from './builder'
	import type { Readable } from 'svelte/store'

	const dispatch = createEventDispatcher()

	let formBuilder: Readable<FormBuilder>
	let isLoading = false
	function submit(e) {
		isLoading = true

		if ($formBuilder.validate()) {
			dispatch('submit', $formBuilder.values)
		}
		setTimeout(() => {
			isLoading = false
		}, 500)
	}

	export { formBuilder }
</script>
