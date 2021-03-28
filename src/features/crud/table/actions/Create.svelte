<Form on:submit={send} formBuilder={formBuilder.store} />

<script lang="ts">
	import Form from '@co/form/Form.svelte'

	import { getContext } from 'svelte'
	import type { IForm } from '@co/form/builder/interfaces'
	import type { FormBuilder } from '@co/form/builder'

	/**
	 * @param {IForm} formBuilder - cute
	 */
	const { formBuilder, insertFormData } = getContext<{
		queryName: any
		formBuilder: FormBuilder
		columns: any
		rows$: any
		queryResult$: any
		insertFormData: (newData: any) => Promise<any>
	}>('CRUD')

	export let handleClose

	async function send(e) {
		e.preventDefault()
		await insertFormData(e.detail).then()
		handleClose(false)
	}
</script>
