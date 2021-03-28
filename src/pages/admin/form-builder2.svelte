<svelete:options immutable={true} />
<div style="width:300px; margin-bottom:30px">
	<code lang="json">
		{JSON.stringify($wfb.values)}
	</code>
</div>
<div class="flex items-center content-center w-full h-full gap-5">
	<Form on:submit={handleSubmit} formBuilder={fb.store} />
</div>

<script>
	import Form from '@co/form/Form.svelte'
	import { FormBuilder } from '@co/form/builder'
	import { derived, writable } from 'svelte/store'

	function handleSubmit(e) {
		console.log(e.detail)
	}

	const fb = new FormBuilder({ name: 'uztelecom_section' })
	fb.addRelation({
		name: 'product_locales',
		type: 'tabs',
		fieldValues: [{ arg: 'ru', test: '10/10/20', Name: 'test2', Description: 'описание на китайском' }],
		args: [
			{ name: 'locale', value: 'ru', title: 'Ru' },
			{ name: 'locale', value: 'uz', title: 'Uz' },
			{ name: 'locale', value: 'en', title: 'En' },
		],
	})

		.addField({
			name: 'test',
			type: 'date',
			options: { labelText: 'data', style: 'flex:none' },
		})
		.addField({
			type: 'text',
			name: 'Name',
			labelText: 'Название',
			validations: 'required|email',
		})
		.addField({
			type: 'text',
			name: 'Description',
			labelText: 'Описание',
		})
		// .addField({
		// 	type: 'editor',
		// 	name: 'Description',
		// })
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
			validations: 'confirmed',
		})
		.addField({
			type: 'text',
			name: 'name_confirmation',
			value: 'asdasd',
			labelText: 'Название',
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
