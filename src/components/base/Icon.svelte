{#if icon}
	{#if spin !== false}
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			{style}
			use:events
			{...attrs}
			{...$$restProps}
			on:click={handleClick}
		>
			<g class:spinCW class:spinCCW style={aniStyle}>
				{@html icon}
			</g>
		</svg>
	{:else}
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			{style}
			use:events
			{...attrs}
			{...$$restProps}
			on:click={handleClick}
		>
			{@html icon}
		</svg>
	{/if}
{/if}

<script context="module">
	const icons = {}
</script>

<script>
	import { createEventDispatcher } from 'svelte'
	import { append, attribute_to_object, element } from 'svelte/internal'

	import { getAttributes, getEventsAction, toString } from '@core/utils'
	const dispatch = createEventDispatcher()
	const events = getEventsAction()
	export let size: any = 1
	export let color = null
	export let flipH = null
	export let flipV = null
	export let rotate = 0
	export let spin: any = false
	export let name

	let index = 0
	let iconName
	let icon
	let attrs = {}

	$: if (name) {
		name = name.indexOf('|') != -1 ? name.split('|') : name
		iconName = Array.isArray(name) ? name[index] : name
		iconLoader()
	}

	// SPIN properties
	$: inverse = typeof spin !== 'boolean' && spin < 0 ? true : false
	$: spintime = Math.abs(spin === true ? 2 : spin)
	$: spinCW = !!spin && !inverse
	$: spinCCW = !!spin && inverse

	// size
	if (Number(size)) size = Number(size)

	function handleClick() {
		if (Array.isArray(name)) {
			index = Math.abs(index - 1)
			iconName = name[index]
			iconLoader()
		}
		dispatch('click')
	}

	async function iconLoader() {
		if (icons[iconName]) {
			icon = icons[iconName].icon
			attrs = icons[iconName].attrs
			return
		}
		let splitPkg = iconName
			.replace(/([a-z0-9])([A-Z0-9])/g, '$1 $2')

			.split(' ')
		let pkg = `https://cdn.uztelecom.uz/carbon/es/${splitPkg[0].toLowerCase()}`
		if (splitPkg.length > 2) {
			pkg += `--${splitPkg[1].toLowerCase()}/${splitPkg[2].toLowerCase()}.js`
		} else if (splitPkg.length == 1) {
			return fetch(`https://cdn.uztelecom.uz/feather/${iconName}.svg`)
				.then((response) => (response.ok ? response.text() : ''))
				.then((svg) => {
					if (svg) icon = svg.replace(svg.substr(svg.indexOf('<svg '), svg.indexOf('>') + 1), '').replace('</svg>', '')

					const div = element('div')
					div.innerHTML = svg
					const ssvg = div.querySelector('svg')
					attrs = attribute_to_object(ssvg.attributes)
					div.remove()
					icons[iconName] = { icon, attrs }
				})
		} else {
			pkg += `/${splitPkg[1].toLowerCase()}.js`
		}
		
		return import(/* @vite-ignore */ pkg.toLowerCase()).then((_icon) => {
			_icon = _icon.default
			attrs = _icon.attrs
			const svg = toString({
				..._icon,
				attrs: getAttributes(_icon.attrs),
			})
			icon = svg.replace(svg.substr(svg.indexOf('<svg '), svg.indexOf('>') + 1), '').replace('</svg>', '')
			icons[iconName] = { icon, attrs }
		})
	}

	// styles
	const getStyles = (size, color, flipH, flipV, rotate) => {
		const transform = []
		const styles = []
		if (size !== null) {
			const width = typeof size === 'string' ? size : `${size * 1.5}rem`
			styles.push(['width', width])
			styles.push(['height', width])
		}
		// styles.push(['fill', color !== null ? color : 'currentColor'])
		// styles.push(['stroke', color !== null ? color : 'currentColor'])
		if (flipH) {
			transform.push('scaleX(-1)')
		}
		if (flipV) {
			transform.push('scaleY(-1)')
		}
		if (rotate != 0) {
			transform.push(`rotate(${rotate}deg)`)
		}
		if (transform.length > 0) {
			styles.push(['transform', transform.join(' ')])
			styles.push(['transform-origin', 'center'])
		}
		return styles.reduce((cur, item) => {
			return `${cur} ${item[0]}:${item[1]};`
		}, '')
	}
	$: style = getStyles(size, color, flipH, flipV, rotate)
	$: aniStyle = !!spin ? `animation-duration: ${spintime}s` : undefined
</script>

<style>
	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}
	@keyframes spin-inverse {
		to {
			transform: rotate(-360deg);
		}
	}

	svg {
		vertical-align: middle;
	}


	:global(g.spinCW) {
		animation: spin linear 2s infinite;
		transform-origin: center;
	}

</style>
