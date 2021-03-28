<nu-block class:active={fileSelected} on:click={handleFileClick}>
	<!-- <label> -->
	<nu-icon name={`${ftype}24`} />
	<span>{name}</span>
	<!-- <input
			type="radio"
			class="checkbox"
			on:change={(e) => {
				handleFileClick(e)
			}}
		/> -->
	<!-- </label> -->
</nu-block>

<script context="module">
	let deactivateNode
</script>

<script>
	import { getContext } from 'svelte'
	export let name
	export let path
	export let type
	let fileSelected

	const { selectSingle } = getContext('file-manager')

	$: ftype = name.slice(name.lastIndexOf('.') + 1)

	function deactivate() {
		fileSelected = false
	}
	const handleFileClick = (e) => {
		if (deactivateNode) {
			deactivateNode()
		}
		fileSelected = true
		deactivateNode = deactivate
		$selectSingle = {
			name: name,
			path: path,
			type: type,
		}
		if (e.target['checked']) {
		}
	}
	
</script>

<style>
	span {
		padding: 0 0 0 1.5em;
		cursor: pointer;
	}
	.active {
		background-color: rgba(53, 53, 53, 1);
	}
	/* .checkbox {
		visibility: hidden;
	} */
</style>
