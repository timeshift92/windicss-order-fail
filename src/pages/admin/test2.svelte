
	<Crud {data}></Crud>
	<script lang="ts">
			import type { TField } from '@co/form/builder/interfaces'
			import {  FormBuilder } from '@co/form/builder'
			import type { FieldSetContructorArgs, TabFieldContructorArgs } from '@co/form/builder'
			import Crud from '@f/crud/Index.svelte'
			const fbJson: Array<TField | FieldSetContructorArgs | TabFieldContructorArgs>  = [{"name":"id","labelText":"id","type":"text"},{"name":"username","labelText":"username","type":"text"},{"name":"email","labelText":"email","type":"text"},{"name":"phone","labelText":"phone","type":"text"},{"name":"password","labelText":"password","type":"text"},{"name":"role","labelText":"role","type":"text"},{"name":"status","labelText":"status","type":"number"},{"name":"secret_token","labelText":"secret_token","type":"text"},{"name":"created_at","labelText":"created_at","type":"date"},{"name":"updated_at","labelText":"updated_at","type":"date"},{"name":"last_seen_at","labelText":"last_seen_at","type":"date"},{"name":"user_networks","labelText":"user_networks","fields":["user_id","network","identity"],"type":"multiselect","id":"user_id","text":"user_id","queryName":"auth_user_networks","isLoading":true},{"name":"user_sessions","labelText":"user_sessions","fields":["id","user_agent","ip_address","user_id","refresh_token","expires_at","created_at","updated_at"],"type":"multiselect","id":"id","text":"id","queryName":"auth_user_sessions","isLoading":true},{"name":"user_verifications","labelText":"user_verifications","fields":["user_id","email_verify_token","email_verified","phone_verify_token","phone_verify_token_expire","phone_verified"],"type":"multiselect","id":"user_id","text":"user_id","queryName":"auth_user_verifications","isLoading":true}]
			const data = {
				prefix: 'auth',
				queryName: 'auth_users' ,
				formBuilder: (new FormBuilder({name:'auth_users'})).parseJson(fbJson),
				create: true,
				actions: {
					title: 'Действия',
					update: true,
					delete: true,
				},
				columns: [{"name":"id","title":"id"},{"name":"username","title":"username"},{"name":"email","title":"email"},{"name":"phone","title":"phone"},{"name":"password","title":"password"},{"name":"role","title":"role"},{"name":"status","title":"status"},{"name":"secret_token","title":"secret_token"},{"name":"created_at","title":"created_at"},{"name":"updated_at","title":"updated_at"},{"name":"last_seen_at","title":"last_seen_at"},{"name":"user_networks","title":"user_networks","fields":["user_id","network","identity"]},{"name":"user_sessions","title":"user_sessions","fields":["id","user_agent","ip_address","user_id","refresh_token","expires_at","created_at","updated_at"]},{"name":"user_verifications","title":"user_verifications","fields":["user_id","email_verify_token","email_verified","phone_verify_token","phone_verify_token_expire","phone_verified"]}],
				pagination: {
					limit: 10,
				},
			}


	</script>


	