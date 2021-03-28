import { writable } from "svelte/store";

export const token$ = writable('NX6I3XJHQlRYAsG8');
export const locale$ = writable('ru')
export const header$ = writable({
	title: 'Default',
	Header: {
		title: 'Default',
		body: 'Body'
	}
})
