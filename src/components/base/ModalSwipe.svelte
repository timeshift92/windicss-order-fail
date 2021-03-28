{#if withButton}
	<slot name="button">
		<Button on:click={(e) => handleClick(index)}>
			{#if iconName}
				<Icon name={iconName} />
			{:else}{buttonName}{/if}
		</Button>
	</slot>
{/if}
{#if showModal}
	<grid use:top style="--animationTime: {animationTime}; ">
		<modal-swipe-card
			on:clickout={handleClose}
			use:clickout
			class="
		{showModal == 1 ? 'slideInRight' : showModal == 2 ? 'slideOutRight' : 'hide'}"
		>
			<stiker style="--top:{calculated * 30}px;transition: all var(--animationTime); ease 0s;">
				<Icon
					bind:name={stikerIcon}
					on:mouseover={(e) => (stikerIcon = 'x-circle')}
					on:mouseleave={(e) => {
						stikerIcon = 'x'
					}}
					stroke="var(--cds-text-04)"
					size="1"
					on:click={handleClose}
				/>
			</stiker>
			<div class=" scrollbar-c" style="height:100vh; width:90vw; padding:1rem 0rem 0rem 0rem; ">
				<slot handle={handleClose} />
			</div>

		</modal-swipe-card>
	</grid>
{/if}

<script context="module" lang="ts">
	import { writable } from 'svelte/store'

	function modalCounter() {
		const { subscribe, set } = writable(0)
		let count = 0
		return {
			subscribe,
			init: () => {
				set(count)
				return count++
			},
			recalculate: (val) => {
				set(val)
				return val
			},
			reset: (cntr) => {
				count = cntr--
				set(count - 1)
			},
		}
	}

	const counter$ = modalCounter()
</script>

<script lang="ts">
	import { Button } from 'carbon-components-svelte'
	import { clickout } from '../../core/actions'
	import Icon from '@base/Icon.svelte'

	let index = 0
	let stikerIcon = 'x'
	// @ts-ignore
	$: calculated = $counter$ - index > 0 ? $counter$ - index : 0
	export let showModal = 0
	export let buttonName = 'Добавить'
	export let iconName = ''
	export let animationTime = '600ms'
	export let topBlock = false
	export let withButton = true

	function top(node) {
		if (topBlock) {
			document.getElementById('modal__service').appendChild(node)
		}
	}
	const handleClick = (e) => {
		index = counter$.init()
		showModal = 1
		counter$.recalculate(index)
	}
	const handleClose = (_showModal) => {
		counter$.recalculate(index - 1)
		counter$.reset(index)

		showModal = 2
		setTimeout(() => {
			showModal = 0
		}, parseInt(animationTime))
	}
</script>

<style lang="css">
	grid {
		background-color: var(--cds-overlay-01);
		display: grid;
		position: fixed;
		top: 0px;
		left: 0px;
		width: 100vw;
		height: 100vh;
		z-index: 10000;
	}
	modal-swipe-card {
		margin-left: 10rem;
		background-color: var(--cds-ui-background,#fff);
		box-shadow: var(--shadow);
		display: flex;
		align-items: center;
		flex-direction: column;
	}
	modal-swipe-card stiker {
		background-color: var(--cds-interactive-04);
		border-radius: 50px 0 0 50px;
		position: absolute;
		left: -3.1rem;
		top: var(--top, 10px);
		width: 50px;
		height: 40px;
		transition: all var(--animationTime);
		display: flex;
		align-items: center;
		justify-content: center;
	}

	@keyframes slideInRight {
		from {
			transform: translate3d(100%, 0, 0);
			visibility: visible;
		}

		to {
			transform: translate3d(0, 0, 0);
		}
	}

	.slideInRight {
		animation-duration: var(--animationTime);
		transition-duration: var(--animationTime);
		animation-iteration-count: 1;
		animation-fill-mode: both;
		transition: all;
		animation-name: slideInRight;
	}
	@keyframes slideOutRight {
		from {
			transform: translate3d(0, 0, 0);
		}

		to {
			visibility: hidden;
			transform: translate3d(100%, 0, 0);
		}
	}

	.slideOutRight {
		animation-duration: var(--animationTime);
		transition-duration: var(--animationTime);
		animation-iteration-count: 1;
		animation-fill-mode: both;
		transition: all;
		animation-name: slideOutRight;
	}
	.hide {
		visibility: hidden;
	}
</style>
