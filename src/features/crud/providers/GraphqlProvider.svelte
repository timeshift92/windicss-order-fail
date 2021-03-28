<slot />

<script lang="ts">
	import { setContext, getContext } from 'svelte'
	import { writable, get, derived } from 'svelte/store'
	import type { Writable } from 'svelte/store'
	const { hasura } = getContext('api')
	import { columnsAdapter, mutationFieldsAdapter, updateAdapter, insertAdapter } from '../helpers/queryHelper'
	import type Hasura from 'hasura-orm/dist/types/hasura'
	export let data: any
	if (data)
		data.getFormFields = async (row: any) => {
			let id = row.id
			const response: any = await mutationFieldsAdapter(hasura(data.queryName), data.formBuilder.fields)
				.where({ id })
				.get(false)

			return response[data.queryName][0]
		}
	data.insertFormData = async (newData: any) => {
		const dataPrefix = 'insert_'
		if (data.formBuilder.prePost) {
			newData = data.formBuilder.prePost(newData)
		}
		const query = insertAdapter(data.queryName, newData, data.columns)
		let res: any = await query.mutate()
		data.queryResult$.add(res[`${dataPrefix}${data.queryName}`].returning[0], data.queryName, dataPrefix)
	}
	data.updateFormData = async (row: any, newData: any) => {
		const dataPrefix = 'update_'
		const key = Object.keys(row)[0]
		if (data.formBuilder.prePost) {
			newData = data.formBuilder.prePost(newData)
		}
		let id = row.id
		const query = updateAdapter(data.queryName, newData, data.formBuilder.fields, id)
		let res: any = await query.where({ id }).mutate()

		data.queryResult$.upd(res[`${dataPrefix}${data.queryName}`].returning[0], data.queryName, key)
	}
	data.deleteFormData = async (id) => {
		hasura(data.queryName)
			.delete({ id })
			.mutate()
			.then((re) => {
				data.queryResult$.del(id, data.queryName)
			})
	}

	function cacheWritable(initial) {
		const { subscribe, set, update } = writable(initial)
		return {
			subscribe,
			add: (data, queryName) =>
				update((cached) => {
					cached[queryName] = [...cached[queryName], data]
					return cached
				}),
			upd: (data, queryName, key) =>
				update((cached) => {
					cached[queryName].flatMap((_data) => {
						if (_data[key] == data[key]) {
							_data = Object.assign(_data, data)
						}
						return _data
					})
					return cached
				}),
			del: (id, queryName) =>
				update((cached) => {
					cached[queryName] = cached[queryName].filter((dt) => dt.id != id)
					return cached
				}),
			set,
		}
	}
	data.queryResult$ = cacheWritable(null)

	if (data.queryName) {
		data.rows$ = derived(data.queryResult$, ($result: Writable<any>) => {
			const _data = $result
			return _data ? _data[data.queryName] : []
		})
		data.total$ = derived(data.queryResult$, ($result: Writable<any>) => {
			const _data = $result
			return _data ? _data[data.queryName + '_aggregate'].aggregate.count : []
		})
		data.offset$ = writable(0)
		data.sortEvent = (column, sort) => {
			request.orderBy(column)
			request['upd']()
		}
		data.filterEvent = (query) => {
			request.where(query)
			request['upd']()
		}

		let request: Hasura = columnsAdapter(data.queryName, data.columns)

		if (data.queryParams) {
			request.where(data.queryParams)
		}

		if (data.pagination) {
			request.paginate(data.pagination.limit, get(data.offset$))
		}

		request['upd'] = async () => {
			if (data.pagination && data.pagination.limit) {
				request.paginate(data.pagination.limit, get(data.offset$))
			}
			const res = await request.get()
			data.queryResult$.set(res)
		}

		request['upd']()
		data.request = request
		setContext('CRUD', data)
	}

	// setContext('CRUD', data)
</script>
