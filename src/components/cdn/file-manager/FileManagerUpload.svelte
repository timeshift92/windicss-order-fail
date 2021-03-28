<div>
	<button
		on:click={() => {
			fileinput.click()
		}}
	>
		<Icon name="file-plus" size="2.4x" />
	</button>
	<input style="display:none" multiple type="file" on:change={(e) => onFileSelected(e)} bind:this={fileinput} />
	{#if progressValue}
		{progressValue}
	{/if}
</div>

<script>
	import { getContext } from 'svelte'
	import Icon from '@base/Icon.svelte'
	export let Url: string

	const { insertFileHandler } = getContext('file-manager')
	let fileinput

	let formData
	let progressValue

	let data_files = []

	const onFileSelected = (e) => {
		let data = new FormData()

		let image = e.target.files
		if (!image) {
			return
		}
		for (const prop in image) {
			if (prop !== 'length' && !image[prop].hasOwnProperty('name')) {
				console.log(image[prop])
				data.append('files', image[prop])
			}
		}

		let request = new XMLHttpRequest()
		request.responseType = 'json'
		request.addEventListener('load', function (e) {
			let filenames = []
			let temp_file
			if (request.status == 200) {
				formData = new FormData()
				progressValue = null
				filenames = request.response

				for (let file_id in filenames) {
					temp_file = {
						name: filenames[file_id],
					}
					data_files.push(temp_file)
				}
				insertFileHandler(Url, filenames)

				filenames = []
				data_files = []
			} else {
				progressValue = null
			}
		})

		request.open('POST', `${Url}upload/`)
		request.send(data)

		request.addEventListener('error', function (e) {
			console.log('err')
			progressValue = null
		})
	}
</script>
