<div on:click={toggle} class:folderSelected on:dblclick={handleFolderClick}>
	<Icon name="{expanded ? 'FolderOff32' : 'FolderAdd32'} " />
	<span>{name}</span>
</div>
{#if expanded}
	<ul>
		{#each files as file}
			<li>
				{#if file.type === 'restricted'}
					<span />
				{:else if file.type === 'folder'}
					<svelte:self {...file} />
				{:else}
					<File name={file.name} path={file.path} type={file.type} />
				{/if}
			</li>
		{/each}
	</ul>
{/if}

<script>
	import File from './File.svelte'
	import { getContext } from 'svelte'
	import Icon from '@base/Icon.svelte'

	export let expanded = false
	export let name
	export let path
	export let type
	export let updated_at

	const { selectedFiles$, selectedFile, selectSingle } = getContext('file-manager')

	export let files = []
	let folderSelected = false
	function toggle() {
		expanded = !expanded
		$selectSingle.path = path
		$selectedFiles$ = files
	}
	const handleFolderClick = (e) => {
		$selectSingle = {
			name: name,
			path: path,
			type: type,
		}
		folderSelected = !folderSelected
		if (folderSelected) {
			$selectedFile = [...$selectedFile, { name, path, type }]
		} else {
			$selectedFile = $selectedFile.filter((file) => file.name != name)
		}
	}
</script>

<style>
	span {
		padding: 0 0 0 1.5em;
		font-weight: bold;
		cursor: pointer;
	}

	ul {
		padding: 0.2em 0 0 0.5em;
		margin: 0 0 0 0.5em;
		list-style: none;
		border-left: 1px solid #eee;
	}

	li {
		padding: 0.2em 0;
	}
	.folderSelected {
		background-color: rgba(53, 53, 53, 1);
	}
	label {
		display: inline;
		font-size: 18px;
	}
	label input {
		visibility: hidden;
	}
</style>
