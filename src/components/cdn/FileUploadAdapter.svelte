<FileElementsTable />

<script lang="ts">
	import type HasuraORM from 'hasura-orm'
	import { getContext, setContext } from 'svelte'
	import { writable } from 'svelte/store'
	import FileElementsTable from './FileElementsTable.svelte'
	export let fileable_id;

	$: fileable_id$.set(fileable_id)
	const { query, mutate, hasura, subscription } = getContext<{
		query: ({ query, variables }: { query: string; variables?: Object }) => Promise<any>
		mutate: ({ query, variables }: { query: string; variables?: Object }) => Promise<any>
		subscription: ({ query, variables }: { query: string; variables?: Object }) => any
		hasura: (_schema: string) => HasuraORM
	}>('api')

	function deleteFile(fileable_id) {
		hasura('files')
			.delete({ fileable_id })
			.select('name')
			.mutate()
			.then((response) => {
				files$.update((_files) => _files.filter((file) => file.id != fileable_id))
			})
	}

	function getFiles(fileable_id) {
		hasura('files')
			.where(fileable_id)
			.select('id,name,fileable_type')
			.get()
			.then((data: any) => {
				files$.set(data.files || [])
			})
	}
	let files$ = writable([])
	let fileable_id$ = writable(false)
	setContext('file-upload', {
		deleteFile,
		getFiles,
		fileable_id$,
		files$,
	})
</script>
