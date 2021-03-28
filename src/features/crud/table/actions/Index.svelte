<Modal withCloseIcon={false} toTop={true} options={{ place: 'top center' }} iconName="trash-2" let:handle={handleClose}>
	<Delete {handleClose} {id} />
</Modal>

<Modal iconName="edit" toTop={true} let:handle={handleClose}>
	<Update {handleClose} {row} />
</Modal>

<script lang="ts">
	import Modal from '@/components/base/Modal.svelte'

	import Delete from './Delete.svelte'
	import Update from './Update.svelte'
	export let id
	export let row: any
</script>
