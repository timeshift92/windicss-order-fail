<svelete:options immutable={true} />
<div style="width:300px; margin-bottom:30px" >
	<code lang="json">
		{JSON.stringify($wfb.values)}
	</code>
</div>
<div class="flex items-center content-center w-full h-full gap-5 dark">
	<Form on:submit={handleSubmit} formBuilder={fb.store} />
</div>

<script>
	import Form from '@co/form/Form.svelte'
	import { FormBuilder } from '@co/form/builder'

	function handleSubmit(e) {
		console.log(e.detail)
	}

	const fb = new FormBuilder({ name: 'uztelecom_section' })
	fb.addRelation({
		type: 'fieldset',
		options: {
			style: 'gap:1%;',
		},
	})
		.addField({
			multiple: true,
			name: 'file',
			type: 'file',
			labelTitle: 'Upload files',
			buttonLabel: 'Add files',
			labelDescription: 'Only JPEG files are accepted.',

			change: (e, vlFn) => {
				const fd = new FormData()
				const _files = e.target['files']
				for (let index = 0; index < _files.length; index++) {
					fd.append('files', _files[index])
				}

				fetch('http://dc.uzcloud.uz:5050/upload/', {
					method: 'POST',
					redirect: 'follow',
					body: fd,
				})
					.then((r) => r.json())
					.then((resp) => {
						vlFn(
							Object.keys(resp).map((k) => resp[k]),
							{ status: 'complete' }
						)
					})
			},
		})
		.addField({
			name: 'test',
			type: 'date',
			options: { labelText: 'data' },
		})
		.addField({
			type: 'text',
			name: 'Name22',
			labelText: 'Название',
			validations: 'required|email',
		})
		.addField({
			type: 'text',
			name: 'Description2',
			labelText: 'Описание',
		})
		.addField({
			type: 'text',
			labelText: 'Описание2',
			name: 'Description',
		})
		.retParent()
		.addRelation({
			type: 'fieldset',
			name: '',
		})
		.addField({
			type: 'text',
			name: 'name',
			value: 'asdasd',
			labelText: 'Название',
		})
		.addField({
			type: 'text',
			name: 'name2',
			value: 'asdasd',
			labelText: 'Название2',
		})
		.retParent()
		.addField({
			type: 'multiselect',
			name: 'username',
			titleText: 'Имя пользователя',
			items: [
				{ id: '0', text: 'Slack' },
				{ id: '1', text: 'Email' },
				{ id: '2', text: 'Fax' },
			],
		})

	const wfb = fb.store
</script>
