<nu-block class:fileSelected>
	<label>
		<nu-icon name={`${ftype}24`} />
		<span>{name}</span>
		<input
			type="checkbox"
			class="checkbox"
			on:change={(e) => {
				handleFileClick(e)
			}}
		/>
	</label>
</nu-block>

<script>
	import { getContext } from 'svelte'
	export let name
	export let path
	export let type

	let fileSelected

	const { selectedFile, selectSingle } = getContext('file-manager')

	$: ftype = name.slice(name.lastIndexOf('.') + 1)

	const handleFileClick = (e) => {
		$selectSingle = {
			name: name,
			path: path,
			type: type,
		}
		fileSelected = !fileSelected
		if (e.target['checked']) {
			$selectedFile = [...$selectedFile, { name, path, type }]
		} else {
			$selectedFile = $selectedFile.filter((file) => file.name != name)
		}
	}
</script>

<style>
	span {
		padding: 0 0 0 1.5em;
		cursor: pointer;
	}
	.fileSelected {
		background-color: rgba(53, 53, 53, 1);
	}
	.checkbox {
		visibility: hidden;
	}
</style>
