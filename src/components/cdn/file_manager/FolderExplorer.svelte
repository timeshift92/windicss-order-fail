<breadcrumb transition:scale>
	{$selectSingle.path ? $selectSingle.path : 'Home'}
</breadcrumb>
{#if !expanded}
	<div on:dblclick={dblClickHandler} />
{/if}

{#if $selectedFiles$.length > 0}
	<grid style="grid-template-columns: 5fr 2fr 2fr 1fr">
		<div>Name</div>
		<div>Date Modified</div>
		<div>Type</div>
		<div>Size</div>
	</grid>
	<ul>
		{#each $selectedFiles$ as file}
			<li>
				{#if file.type === 'file'}
					<grid style="grid-template-columns: 5fr 2fr 2fr 1fr">
						<FileExplorer name={file.name} path={file.path} type={file.type} />
						<div>{file.updated_at}</div>
						<div>
							{#if file.type_info}{file.type_info}{:else}{' '}{/if}
						</div>
						<div>{file.size}</div>
					</grid>
				{/if}
			</li>
		{/each}
	</ul>
{/if}

<script>
	import { getContext } from 'svelte'
	import type { Readable, Writable } from 'svelte/store'
	import { scale } from 'svelte/transition'
	import FileExplorer from './FileExplorer.svelte'

	export let expanded = false
	export let name
	export let path
	export let type
	export let type_info
	export let files: any = []

	const { selectedFiles$, selectSingle }: { selectedFiles$: Writable<Array<any>>; selectSingle: any } = getContext(
		'file-manager'
	)

	function dblClickHandler() {
		selectedFiles$.set(files)
	}
	if ((type_info = null)) {
		type_info == ' '
	}
</script>

<style lang="css">
	grid {
		display: grid;
	}
	breadcrumb {
		display: block;
		padding: 0.6rem;
		border-bottom: 1px solid;
		border-top: 1px solid;
	}
	span {
		padding: 0 0 0 1.5em;
		font-weight: bold;
		cursor: pointer;
	}

	ul {
		padding: 0.2em 0 0 0.5em;
		margin: 0 0 0 0.5em;
		list-style: none;
	}

	li {
		padding: 0.2em 0;
	}
</style>
