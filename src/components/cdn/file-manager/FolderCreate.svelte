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
	import { fade } from 'svelte/transition'
	export let open

	export let Url: string

	const { insertFolderHandler } = getContext('file-manager')

	let folderName

	function onInput(event) {
		folderName = event
	}

	function onSubmitForm() {
		insertFolderHandler(Url, folderName)
		open = false
	}
	
	const handleClose = () => {
		open = false
	}
</script>
