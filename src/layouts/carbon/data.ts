import type { Brand, SidebarItem } from "@co/sidebar/models"

export let brand: Brand = {
	name: 'TScorp',
	logo: "",
	url: '/',
}
export let sidebar: Array<SidebarItem> = [
	{
		name: 'Main',

		items: [
			{ url: '/admin/index', name: 'Main' },
			{ url: '/admin/form-builder', name: 'Form builder' }
		],
	},
	{
		name: 'Category',

		items: [{ url: '/admin/categories', name: 'Category' }],
	},
	{
		name: 'Admin',
		items: [
			{
				name: 'Modules',
				icon: 'Screen32',
				url: '/admin/modules',
				items: [
					{
						url: '/admin/modules/plugin',
						name: 'Plugin',
					},
					{
						url: '/admin/modules/generator',
						name: 'Generator',
					},
				],
			},
		],
	},

]
