<Grid class="login__page " style="width:20%; display:grid; align-content: center; height: 100vh;" >
	<Row >
		<Column style="text-align:center; padding-bottom:15px">
			<h2>Uztelegram</h2>
		</Column>
	</Row>
	<Row >
		<Column style="">
			<Form formBuilder={fb.store} on:submit={login} />
			<Button on:click={(e) => changeStep('register')} kind="secondary" style="width:100%">register</Button>
		</Column>
	</Row>
</Grid>

<script type="ts">
	import { createEventDispatcher, getContext } from 'svelte'
	import Form from '@co/form/Form.svelte'
	import { token$, tokenExpire$ } from '@f/auth'
	import { FormBuilder } from '@co/form/builder'
	import { Button, Column, Grid, Row } from 'carbon-components-svelte'

	const { mutate, fire } = getContext<Api>('api')
	const { changeStep } = getContext('auth')
	const dispatch = createEventDispatcher()

	function login(e) {
		mutate({
			query: `mutation($login: String!, $password: String!) {
				signin(login: $login, password: $password) {
					access_token
					expires_at
					user_id
				}
			}
		`,
			variables: { ...e.detail, login: e.detail.login.replace(/[+)(_ -]/g, '') },
		})
			.then((res) => {
				token$.set(res.signin.access_token)
				tokenExpire$.set(res.signin.expires_at)
				dispatch('success')
			})
			.catch((errors) => {
				// fire('auth', errors[0].message, 'error')
				dispatch('error')
			})
	}
	const fb = new FormBuilder({ name: '' })
		.setButton({
			position: 'bottom',
			title: 'Login',
			options: {
				style: 'width:100%; margin-top:15px',
			},
		})
		.addField({
			type: 'mask',
			name: 'login',
			labelText: 'Номер телефона',
			validations: 'phone',
			options: {
				lazy: false,
				mask: '+{998} (00) 000-00-00',
			},
		})
		.addField({
			type: 'password',
			name: 'password',
			labelText: 'Пароль',
			validations: 'required',
		})
</script>

<style>
	:global(.login__page > .bx--row){
		background-color: var(--cds-ui-01);
	}
	:global(.login__page > .bx--row:nth-last-child(1)){
		padding-bottom: 15px;
	}
</style>
