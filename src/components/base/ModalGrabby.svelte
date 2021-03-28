<svelte:window bind:innerWidth={vw} bind:innerHeight={vh} on:keydown={onKeydown} />
<slot name="button">
	<button on:click|stopPropagation={() => (open = !open)}>
		{#if iconName}
			<nu-icon name={iconName} />
		{:else}{buttonName}{/if}
	</button>
</slot>
{#if open}
	<section
		bind:this={panel}
		in:fly={{ y: 600, duration: 500, opacity: 1 }}
		out:fly={{ y: 600, duration: 500, opacity: 1 }}
		on:introend={() => (panelin = true)}
		use:clickout={panel}
		on:clickout={() => (open = false)}
		use:pannable
		on:panstart={dragStart}
		on:panmove={dragSlide}
		on:panend={dragStop}
		style=" --panelwidth: {panel && panelsize.width}px; --panelheight: {panel &&
			panelsize.height}px; --windowwidth: {vw}px;
    --windowheight: {vh}px; transform: translateY({translate}px); transition: transform {transition}ms; "
	>
		<button on:click={() => (open = false)} on:touchstart={() => (open = false)} place="right top 9px ">
			<Icon use-hotkey="q" size="1.5" scale=":hover[1.25]" use-hover name="x" />
		</button>

		<article>
			<slot />
		</article>
	</section>
{/if}

<script lang="ts">
	// @ts-nocheck
	import { clickout, pannable } from '@src/core/actions'

	import { tick } from 'svelte'
	import { fly } from 'svelte/transition'
	import { Icon } from '@base/index'
	export let iconName: string = ''
	export let buttonName = 'Добавить'

	export let open = false

	let vw, vh, panel, panelsize
	$: if (panel) {
		panelsize = {
			width: panel.offsetWidth,
			height: panel.offsetHeight,
		}
		open ? (active = true) : (active = false)
	}

	let translate = 0,
		transition = 500,
		isdrag = false,
		panelin = false,
		tracker = null,
		htx = 0,
		speed = 0,
		active = false

	function dragStart(e: any): void {
		isdrag = true
		transition = speed = 0
		tracker = setInterval(() => (htx = translate), 60)
		panel.style.cursor = 'grabbing'
		active = false
	}
	function dragSlide(e) {
		translate += e.detail.dy
		translate <= 0 ? (translate = 0) : null
		speed = (htx - translate) / 60
		translate !== 0 && (document.body.style.overflowY = 'hidden')
	}
	function dragStop(e) {
		isdrag = false
		transition = 500
		clearInterval(tracker)
		translate >= panelsize.height / 3 && speed <= -0.15
			? ((open = false), tick().then(() => (translate = 0)))
			: (translate = 0)
		speed = 0
		panel.style.cursor = 'inherit'
		active = true
	}

	function onKeydown(e) {
		if (e.keyCode === 27) {
			open = false
		}
	}
</script>

<style lang="css">
	#images {
		width: 100%;
		height: 250px;
		display: flex;
		justify-content: space-between;
		overflow-x: scroll;
		scroll-behavior: auto;
		scroll-padding: 0 0px;
		scroll-snap-type: x mandatory;
		overscroll-behavior: auto;
	}
	#images > * + * {
		margin: 0 0 0 10px;
	}
	#images > img {
		flex: 0 0 150px;
		width: 250px;
		border-radius: 0;
/* 		scroll-snap-align: start; */
	}
	h1 {
		text-align: center;
	}
	section {
		position: fixed;
		bottom: 0;
		left: 2.5vw;
		min-width: 250px;
		max-width: 700px;
		width: 95vw;
		max-height: 600px;
		height: calc(var(--windowheight) - 150px);
		background: white;
		color: black;
		border-radius: 25px 25px 0 0;
		box-sizing: border-box;
		overflow-y: scroll;
		box-shadow: 0 -1px 10px -5px black;
		will-change: transform;
	}
	@media screen and (min-width: 700px) {
		section {
			left: calc(50vw - 350px);
		}
	}
	section:hover { cursor: grab}
	section button {
		position: absolute;
		z-index: 10;
		right: 9px;
		top: 9px;
		width: 36px;
		height: 36px;
		background: none;
		border-radius: 50%;
		box-sizing: border-box;
		padding: 0;
		margin: 0;
		border: 0;
	}
	section article {
		padding: 25px 25px 50px;
	}
	section img {
		user-select: none;
		max-width: 100%;
    height: auto;
    object-fit: cover;
    border-radius: var(--radius);
    padding: 0;
    margin: 0;
	}
</style>
