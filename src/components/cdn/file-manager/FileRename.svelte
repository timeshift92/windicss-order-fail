{#if open}
	<nu-card
		display="flex"
		width="30vw"
		border="none"
		transition:fade={{ duration: 120 }}
		scrollbar
		place="absolute bottom=0 left=0"
		gap="2"
		overflow="hidden"
		z="front"
	>
		<nu-form type="formdata">
			<nu-inputgroup border height="4x" fill="input">
				<nu-input border="0" padding="0x 0x 0x 2x" placeholder="" on:input={(event) => onInput(event.detail)} />
				<nu-btn action="submit" border="left" padding="1x .5x" on:tap={onSubmitForm}>
					<nu-icon name="check" />
				</nu-btn>
				<nu-btn action="submit" border="left" padding="1x .5x" on:tap={handleClose}>
					<nu-icon name="x" />
				</nu-btn>
			</nu-inputgroup>
		</nu-form>
	</nu-card>
{/if}

<script>
	import { getContext } from 'svelte'
	export let Url: string
	export let open
	import { fade } from 'svelte/transition'

	const { renameHandler, selectSingle } = getContext('file-manager')

	let newName

	function onInput(event) {
		newName = event
	}

	function onSubmitForm() {
		const newData = [
			{
				old: {
					path: $selectSingle.path,
					name: $selectSingle.name,
					type: $selectSingle.type,
				},
				new: {
					name: newName,
				},
			},
		]
		renameHandler(Url, newData)
		open = false
	}
	const handleClose = () => {
		open = false
	}
</script>
