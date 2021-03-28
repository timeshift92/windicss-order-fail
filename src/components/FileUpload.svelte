
<nu-btn
	border="left"
	width="6x"
	padding="1x .5x"
	on:tap={(e) => {
		fileInput.click()
	}}
>
	<nu-icon name="paperclip" label="Circle" />
</nu-btn>

<input hidden bind:this={fileInput} id="input" class="file-upload" size="60" bind:files type="file" />

<script>
	import { storageUrl } from '@core/configs'

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
		})
	}
</script>
