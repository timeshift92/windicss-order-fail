<nu-flex width="100vw" height="100vh" content="center">
	<nu-flow place="center">
		<nu-card display="flex" responsive="1280px|960px|640px" gap="1" theme="main" border="top 2px solid color(special-bg)" width="350px" shadow="2x">
			<nu-flex gap="2" place="center">
				<nu-heading level="4" fill>Register</nu-heading>
			</nu-flex>
			<nu-flex display="flex" flow="column" gap="2" padding="2 0 0 0" radius="0" border="0 1 1 1">
				<!-- <Form {formBuilder} on:submit={register} /> -->
				<nu-link on:tap={() => changeStep('login')} color="main" opacity="0.7" shadow="0" text="no-decoration center" t="Login" />
			</nu-flex>
		</nu-card>
	</nu-flow>
</nu-flex>

<script lang="ts">
	import { createEventDispatcher, getContext } from 'svelte'
	import Form from '@co/form/Form.svelte'
import type { IForm } from '@/components/form/builder/interfaces';

	const { mutate, fire } = getContext<Api>('api')
	const { changeStep } = getContext('auth')
	const dispatch = createEventDispatcher()

	let formBuilder: IForm = {
		button: {
			position: 'bottom',
			title: 'Отправить',
		},
		fields: [
			{
				type: 'text',
				name: 'username',
				label: 'Представьтесь',
				validations: ['required'],
			},
			{
				type: 'mask',
				name: 'email_or_phone',
				label: 'Номер телефона',
				validations: [
					{
						assert: (val: string) => {
							if (val) {
								return /\+?998[0-9]{9}$/.test(val.replace(/[+)(_ -]/g, ''))
							}
							return false
						},
						reason: 'required',
					},
				],
				options: {
					lazy: false,
					mask: '+{998} (00) 000-00-00',
				},
			},
			{
				type: 'password',
				name: 'password',
				label: 'Пароль',
				validations: ['required'],
			},
		],
	}
	function register(e:CustomEvent) {
		const phoneNumber = e.detail.email_or_phone.replace(/[)(_ -]/g, '')
		mutate({
			query: `mutation($password: String!, $email_or_phone: String!, $username: String!) {
				register(password: $password, email_or_phone: $email_or_phone, username: $username)
			}`,
			variables: {
				password: e.detail.password,
				email_or_phone: phoneNumber,
				username: e.detail.username,
			},
		})
			.then((res) => {
				const { data } = res
				dispatch('success', { ...e.detail, email_or_phone: phoneNumber })
			})
			.catch((errors) => {
				fire('register', errors[0].message, 'error')
				dispatch('error', errors)
			})
	}
</script>
