<nu-flex width="100vw" height="100vh" content="center">
	<nu-flow place="center">
		<nu-card
			display="flex"
			responsive="1280px|960px|640px"
			gap="1"
			theme="main"
			border="top 2px solid color(special-bg)"
			width="350px"
			shadow="2x">
			<nu-theme
				from="#A16AE8"
				saturation="auto"
				padding=".5"
				border-radius=".5"
				border-width="1px"
				animation-time="0.08s"
			/>

			<nu-flex gap="2" place="center">
				<nu-heading level="4" fill>Submit phone</nu-heading>
			</nu-flex>
			<nu-flex display="flex" flow="column" gap="2" padding="2 0 0 0" radius="0" border="0 1 1 1">
				<!-- <Form on:submit={verify} {formBuilder} /> -->
			</nu-flex>
		</nu-card>
	</nu-flow>
</nu-flex>

<script lang="ts">
	import type { IForm } from '@co/form/builder/interfaces';


	
	import Form from '@co/form/Form.svelte'
	export let phone
	import { getContext, createEventDispatcher } from 'svelte'
	const dispatch = createEventDispatcher()
	const { mutate, fire } = getContext<Api>('api')

	let formBuilder: IForm = {
		button: {
			position: 'bottom',
			title: 'Отправить',
		},
		fields: [
			{
				type: 'password',
				name: 'token',
				label: 'Код подтверждения',
				validations: ['required'],
			},
			{
				type: 'hidden',
				name: 'phone',
				labelText: 'Номер телефона',
				value: phone,
			},
		],
	}
	function verify(e:CustomEvent) {
		mutate({
			query: `mutation($phone: String!, $token: String!) {
			verify_phone(phone: $phone, token: $token){
				access_token
				refresh_token
				user_id
			}
		}
		`,
			variables: e.detail,
		})
			.then((res) => {
				if (res && res.verify_phone) {
					alert('proverka proshlo uspeshno')
					dispatch('success',res.verify_phone)

				} else {
					alert('chto to poshlo ne tak')
				}
			})
			.catch((errors) => {
				fire('\n', errors[0].message, 'error')
			})
	}
</script>
