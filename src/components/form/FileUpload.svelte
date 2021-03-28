{label}:
<nu-fileinput
	use:setAccept
	id="{path}.{index}.{name}"
	{...options}
	{...objectWithoutKeys($$props, ['options', 'component', 'output'])}
	on:change|preventDefault={(e) => saveFiles(Array.isArray(e.detail) ? e.detail : [e.detail])}
	placeholder={label}
/>

<script>
	function setAccept(node) {
		node.querySelector('input').setAttribute('accept', 'image/x-png,image/gif,image/jpeg')
	}
	// import { storageUrl } from '@core/configs'
	// import { isArray } from 'src/core/utils'
	import { createEventDispatcher } from 'svelte'
	// import { objectWithoutKeys } from '../crud/helpers/formHelper'
	const dispatch = createEventDispatcher()
	export let path, index, name, options, label
	let fileInput

	let files = []

	export let filename = ''

	$: if (files.length > 0) saveFiles(files)

	function saveFiles(_files) {
		const formData = new FormData()
		for (let index = 0; index < _files.length; index++) {
			formData.append('files', _files[index])
		}
		fetch(`${storageUrl}/upload`, {
			method: 'POST',

			body: formData,
		}).then(async (res) => {
			filename = (await res.json())[0]
			dispatch('change', filename)
		})
	}
</script>
