<nu-form on:input="{send}">
	<nu-card gap="2">
		<nu-heading level="4">Данные удалятся без возвратно!</nu-heading>
		<nu-pane place="center"  gap="2">
			<nu-btn
				use-hotkey="y"
				use:enter={send}
				action="submit"
			>
				Вы уверены?
			</nu-btn>
			<nu-btn use-hotkey="q" on:tap={() => handleClose(false)}>Нет</nu-btn>
		</nu-pane>
	</nu-card>
</nu-form>

<script lang="ts">
	import { enter } from '@src/core/keydown'

	import { getContext } from 'svelte'
	const { deleteFormData } = getContext('CRUD')

	export let id
	export let cache
	export let handleClose
	async function send(e) {
		e.preventDefault()
		await deleteFormData(id)
		handleClose(false)
	}
</script>
