<!-- content here -->
{console.log(value)}
<Editor
	id="content"
	value={value ? value.content : ''}
	{...objectWithoutKeys($$props, ['value', 'id'])}
	on:change={(e) => handleChange(e, 'content')}
/>
<nu-input id="type" on:change={(e) => handleChange(e, 'type')} value={value ? value.type : ''} />

<script>
	export let value = { content: '', type: '' },
		path,
		index,
		name
	if (!value) {
		value = { content: '', type: '' }
	}
	console.log(value)
	let addins = value || {}
	const dispatch = createEventDispatcher()
	function handleChange(e, field) {
		addins = Object.assign(addins, { [field]: e.detail })
		dispatch('change', addins)
	}

	import Editor from '@co/form/Editor.svelte'
	import { objectWithoutKeys } from '@/features/crud/helpers/formHelper'
	import { createEventDispatcher } from 'svelte'
</script>
