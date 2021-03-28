<div use:editor id="inlineEdit" />

<input on:change hidden {id} {value} />

<script>
	import { createEventDispatcher, onMount } from 'svelte'
	import Editor from 'cl-editor'

	function editor(node, options = {}) {
		setTimeout(() => {
			const editor = new Editor({
				target: node,
				props: {
					actions: [
						'viewHtml',
						'undo',
						'redo',
						'b',
						'i',
						'u',
						'strike',
						'sup',
						'sub',
						'h1',
						'h2',
						'p',
						'blockquote',
						'ol',
						'ul',
						'hr',
						'left',
						'right',
						'center',
						'justify',
						'a',
						'image',
						'forecolor',
						'backcolor',
						'removeFormat',
						{
							name: 'copy', // required
							icon: '<b>C</b>', // string or html string (ex. <svg>...</svg>)
							title: 'Copy',
							result: () => {
								// copy current selection or whole editor content
								const selection = window.getSelection()
								if (!selection.toString().length) {
									const range = document.createRange()
									range.selectNodeContents(editor.refs.editor)
									selection.removeAllRanges()
									selection.addRange(range)
								}
								editor.exec('copy')
							},
						},
						'h1',
						'h2',
						'p',
					],
					height: '300px',
					html: value,
					// removeFormatTags: ['h1', 'h2', 'blackquote'], // default
				},
			})

			editor.$on('change', (e) => {
				value = editor.getHtml(true)
				dispatch('change', editor.getHtml(true))
			})
		}, 250)
	}

	const dispatch = createEventDispatcher()
	export let id
	export let value
</script>

<style global>
	.cl-content,
	.cl-actionbar {
		background: var(--cds-ui-02) !important;
	}
	.cl-button:hover {
		background-color: var(--cds-inverse-focus-ui) !important;
	}
	.cl-button svg{
		display: initial;
	}
</style>
