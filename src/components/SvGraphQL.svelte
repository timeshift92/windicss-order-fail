<slot>
	<!-- asd -->
</slot>

<script lang="ts">
	import { _client, hasura, changeClient } from '@core/svqlConfig'
	import { setContext } from 'svelte'
	import { toast } from '@/core/toast'

	const newLocal = document.getElementById('notify') || document.body
	_client.graphql.on('cache', ({ cacheKey, cacheValue: { fetchError, httpError, parseError, graphQLErrors } }) => {
		if (fetchError || httpError || parseError || graphQLErrors) {
			toast(newLocal, {
				title: 'Error',
				subtitle: fetchError || httpError || parseError || graphQLErrors.map((r) => r.message).join(' '),
				caption: new Date().toLocaleString(),
			})
		}
	})
	_client.sub.onError((error: Object) => {
		toast(newLocal, {
			title: 'Error',
			subtitle: JSON.stringify(error),
			caption: new Date().toLocaleString(),
		})
	})
	const oldQuery = _client.query
	const oldMutate = _client.mutate
	const newClient = Object.assign({}, _client)
	newClient.query = async ({
		query,
		variables,
		cache = true,
	}: {
		query: string
		variables?: Object
		cache: boolean
	}) => {
		const { graphqlErrors, data } = await oldQuery({
			query,
			variables,
			cache,
		})
		return new Promise((resolve, reject) => {
			if (data) {
				return resolve(data)
			} else {
				return reject(graphqlErrors)
			}
		})
	}
	newClient.mutate = async ({ query, variables }: { query: string; variables?: Object }) => {
		const { graphQLErrors, errors, data } = await oldMutate({
			query: query,
			variables: variables,
		})
		return new Promise((resolve, reject) => {
			if (errors || graphQLErrors) {
				return reject(graphQLErrors || errors)
			} else {
				return resolve(data)
			}
		})
	}

	changeClient(newClient)
	setContext('api', {
		...newClient,
		fire: (
			title: string,
			message: string,
			type: 'error' | 'info' | 'info-square' | 'success' | 'warning' | 'warning-alt' = 'success'
		) => {
			toast(newLocal, {
				title: 'Error',
				kind: type,
				subtitle: JSON.stringify(message),
				caption: new Date().toLocaleString(),
			})
		},
		hasura,
	})
</script>
