<SvGraphQl>
	{#if  $token$}
		<slot />
	{:else if isLoading}
		<Preloader />
	{:else}
		<AuthAdapter on:success={success} />
	{/if}
</SvGraphQl>

<script>
	import Preloader from './../components/Preloader.svelte'
	import SvGraphQl from '@co/SvGraphQL.svelte'
	import { user$, authorize, token$, AuthAdapter } from '@f/auth/index'
	import { onMount } from 'svelte'
	let isLoading = true
	onMount(() => {
		authorize()
			.then(() => {
				success()
			})
			.catch((res) => {
				isLoading = false
			})
	})
	async function success() {
		$user$.then((c) => {

			setTimeout(() => {
				isLoading = false
			}, 50)
		}).catch(e => {
			debugger
		})
	}
</script>

