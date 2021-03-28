{#if step == 'login'}
	<Login on:error on:success />
{:else if step == 'register'}
	<Register on:error on:success />
{/if}

<script>
	import { setContext } from 'svelte'

	let step = 'login'
	import Login from './Login.svelte'
	import Register from './Register.svelte'

	setContext('auth', { changeStep: (_step) => (step = _step || 'login') })
</script>
