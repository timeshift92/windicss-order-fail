{#if fmAppearance.showFm}
	<nu-props
		content-padding="6x||3x"
		max-content-width="100rem - (--content-padding * 2)"
		content-width="12sp|||2sp"
		content="center"
	/>
	<Draggable draggable={fmAppearance.size}>
		<file-manager transition:scale width={fmAppearance.width}>
			<file-manager-card>
				<file-manager-card borderBottom>
					<file-manager-command gap content="flex-end">
						<Icon name="Subtract24|RowExpand24" color="red"  on:click={foldFmHandler} />
						<Icon name="Scale24|Minimize24" color="red" on:click={changeSizeHandler} />
						<Icon name="Close24" color="red" on:click={closeFm} />
					</file-manager-command>
				</file-manager-card>
				{#if fmAppearance.unfoldFm}
					<file-manager-body gap transition:slide>
						<file-manager-body-sidebar>
							<Folder name="Home" files={$files$} expanded />
						</file-manager-body-sidebar>
						<file-manager-body-content>
							<FileMagerUpload {Url} />
							<button on:click={handleClickFolderCreate}>
								<nu-icon size="2.4x" name="folder-plus" />
							</button>
							<button on:click={deleteFileHandler(Url, $selectedFile)}>
								<nu-icon size="2.4x" name="trash" />
							</button>
							<button on:click={handleClickRename}>
								<nu-icon size="2.4x" name="edit-2" />
							</button>
							<FolderExplorer files={$files$} />
							<FolderCreate {Url} open={showFolderCreate} />
							<FileRename {Url} open={showRename} />
						</file-manager-body-content>
					</file-manager-body>
				{/if}
			</file-manager-card>
		</file-manager>
	</Draggable>
{:else}
	<button on:click={(e) => openFm(e)}>Open File Manager</button>
{/if}

<script>
	import { onMount, getContext } from 'svelte'
	import Folder from './Folder.svelte'
	import FileMagerUpload from './FileManagerUpload.svelte'
	import FolderExplorer from './FolderExplorer.svelte'
	import FolderCreate from './FolderCreate.svelte'
	import FileRename from './FileRename.svelte'
	import { scale, slide } from 'svelte/transition'
	import Draggable from '../components/Draggable.svelte'
	import Icon from '@base/Icon.svelte'

	let Url: string = 'http://dc.uzcloud.uz:5050/file_manager/'
	let showFolderCreate = false
	let showRename = false
	let fmAppearance = {
		showFm: false,
		unfoldFm: true,
		size: false,
		width: '100%',
	}

	const { loadFiles, deleteFileHandler, files$, selectedFile } = getContext('file-manager')

	onMount(async () => {
		loadFiles(Url)
	})

	const handleClickFolderCreate = () => {
		showFolderCreate = !showFolderCreate
	}
	const handleClickRename = () => {
		showRename = !showRename
	}
	const openFm = (e) => {
		fmAppearance.showFm = !fmAppearance.showFm
	}
	const closeFm = () => {
		fmAppearance.showFm = false
	}
	const foldFmHandler = () => {
		fmAppearance.unfoldFm = !fmAppearance.unfoldFm
	}
	const changeSizeHandler = () => {
		fmAppearance.size = !fmAppearance.size
		if (fmAppearance.size) {
			fmAppearance.width = 'min-content (100rem - (--content-padding * 2) + (--content-padding * 2))'
		} else {
			fmAppearance.width = '100%'
		}
	}
</script>

<style lang="css">
	file-manager-body-sidebar {
		border-right: 1px solid;
		min-height: 600px;
		padding-right: 1rem;
	}
	file-manager-body-content {
		min-height: 600px;
		padding: 1rem;
	}
	file-manager-body {
		display: grid;
		grid-template-columns: 3fr 8fr;
	}
	file-manager-command {
		padding: 1rem 0 0 0;

		display: block;
		align-self: flex-end;
		gap: 1rem;
	}
	file-manager {
		display: flex;
		flex-flow: column;
		position: absolute;
		z-index: 10;
	}
	file-manager-card[borderBottom] {
		border-bottom: 1px solid;
	}
	file-manager-card {
		display: flex;
		flex-direction: column;
		padding: 0;
		background-color: #202020;
	}
</style>
