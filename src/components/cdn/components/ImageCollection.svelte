<script>
	import { crossfade, scale } from 'svelte/transition'

	const [send, receive] = crossfade({
		duration: 200,
		fallback: scale,
	})

	let selected = null
	let loading = null

	const loadImage = (image) => {
		const timeout = setTimeout(() => (loading = image), 100)
		const img = new Image()
		img.onload = () => {
			selected = image
			clearTimeout(timeout)
			loading = null
		}
		img.src = 'Image src comes here'
	}
</script>

<nu-card>
    
</nu-card>