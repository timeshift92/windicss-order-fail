<svelte:head>
		<!-- <link rel="stylesheet" href={'/carbon.css'} /> -->
</svelte:head>
<Router {routes} />

<script lang="ts">
	import 'carbon-components-svelte/css/all.css'
	import { Router, goto } from '@roxi/routify'
	import { routes } from '../.routify/routes'
	import { onMount } from 'svelte'
	import { locale$ } from './core/stores'
	import { initValidation } from '@co/form/builder/initValidation'
	import { toast } from './core/toast'

	initValidation($locale$)
	onMount(() => {
		window.onerror = (e) => {
			const newLocal = document.getElementById('notify') || document.body
			toast(newLocal, {
				title: 'Error',
				subtitle: JSON.stringify(e),
				caption: new Date().toLocaleString(),
			})
		}
	})
</script>
