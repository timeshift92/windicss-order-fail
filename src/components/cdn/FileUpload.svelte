<nu-card display="flex" width="30vw">
	<nu-form value={formData} type="formdata">
		<nu-btn special on:tap={()=>{fileinput.click();}}>Upload Image</nu-btn>
		<input style="display:none" multiple type="file" on:change={(e)=>onFileSelected(e)} bind:this={fileinput} >
		{#if progressValue}
			<nu-progressbar value={progressValue} />
		{/if}
	</nu-form>
</nu-card>

<script>
	import type HasuraORM from 'hasura-orm'
	import { getContext } from 'svelte'
	const { hasura } = getContext<{ hasura: (_schema: string) => HasuraORM }>('api')

	export function sendFile(files) {
		hasura('files').insert(files).select('id').mutate()
	}

	export let fileable_id = 'fa46da05-97e3-42c6-b2ad-97c214be95d8'
	export let fileable_type = 'numlRulit'
	let formData
	let progressValue

	let data_files = []
	let url_for_file_upload = 'http://192.168.153.203:5050/upload/'
	// let url_for_file_upload = 'http://localhost:5050/upload/'
	let   fileinput;
	
	const onFileSelected =(e)=>{
		let data = new FormData()

		let image = e.target.files;
		for(const prop in image ){
			if(prop !== 'length' && !image[prop].hasOwnProperty('name')){
				console.log(image[prop])
				data.append('files', image[prop])				
			}
		}

		if(!image){
			return
		}
		let request = new XMLHttpRequest()
		request.responseType = 'json'
            
		request.upload.addEventListener('progress', function (e) {
			var loaded = e.loaded
			var total = e.total
			var percent_complete = (loaded / total) * 100
			progressValue = percent_complete
		})
			
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
						fileable_id: fileable_id,
						fileable_type: fileable_type,
					}
					data_files.push(temp_file)
				}

				sendFile(data_files)
				filenames = []
				data_files = []
			} else {
				progressValue = null
			}
		})

		request.open('POST', url_for_file_upload)
		request.send(data)

		request.addEventListener('error', function (e) {
			progressValue = null
		})
	}
</script>