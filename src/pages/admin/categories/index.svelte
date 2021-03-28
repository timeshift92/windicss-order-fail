<div style="width: fit-content;;">
	<Crud {data} />
</div>

<script lang="ts">
	import { Row } from 'carbon-components-svelte'
	import { FormBuilder } from '@co/form/builder'
	import Crud from '@/features/crud/Index.svelte'
	import type { Data } from '@/features/crud/interfaces'

	import MyComponent from './_MyComponent.svelte'
	const fb = new FormBuilder({ name: 'uztelecom_sections' })
	const data: Data = {
		queryName: 'uztelecom_sections',
		create: true,
		actions: {
			title: 'Действия',
			update: true,
			delete: true,
		},
		pagination: {
			limit: 10,
		},
		columns: [
			{
				name: 'section_locales',
				fields: ['title'],
				sort: (direction) => {
					return `{section_locales_aggregate: {min: {title:${direction} }}}`
				},
				value: (row) => {
					if (row.section_locales[0]) return row.section_locales[0].title
				},
				title: 'Название',
			},
			{
				name: 'id',
				title: 'Родитель',
			},
			{
				name: 'parent_id',
				title: 'ТТ',

				// component: MyComponent,
			},
		],
		formBuilder: fb
			.setButton({ title: 'Отправить', position: 'top' })
			.addRelation({
				name: 'section_locales',
				type: 'tabs',
				prefix: 'uztelecom_',
				args: [
					{ name: 'locale', value: 'ru', title: 'Ru' },
					{ name: 'locale', value: 'en', title: 'En' },
					{ name: 'locale', value: 'uz', title: 'Uz' },
				],

				fieldValues: [
					{ arg: 'ru', title: 'титул', content: 'контент' },
					{ arg: 'en', title: 'title', content: 'content' },
				],
			})
			.addField({
				type: 'text',
				name: 'title',
				label: 'Описание',
			})
			.addField({
				type: 'editor',
				name: 'content',
			})
			.addField({
				type: 'hidden',
				name: 'locale',
			})
			.retParent()
			.addField({
				type: 'text',
				name: 'id',
			}),
	}
</script>
