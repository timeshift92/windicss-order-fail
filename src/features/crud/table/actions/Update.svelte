<Form {formData} on:submit={send} formBuilder={formBuilder.store} />

<script lang="ts">
	import type { FormBuilder } from '@co/form/builder'

	import Form from '@co/form/Form.svelte'

	import { getContext } from 'svelte'

	const {
		formBuilder,
		getFormFields,
		updateFormData,
	}: { formBuilder: FormBuilder; getFormFields: any; updateFormData: any } = getContext('CRUD')

	export let row


	formBuilder.skeleton = true

	getFormFields(row).then((resp) => {
		formData = resp
		 formBuilder.setValues(resp)
		setTimeout(() => {
			formBuilder.skeleton = false
		}, 500);

	})

	let formData = {}

	export let handleClose

	async function send(e) {
		e.preventDefault()
		updateFormData(row, formBuilder.values)

		handleClose(false)
	}
</script>
