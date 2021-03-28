<a
	href={item.url}
	class="menu__item"
	{...$isActive(item.url) && item.url ? { selected: true } : {}}
	{...pressed ? { pressed: '' } : {}}
	on:click={handleMenuItemClick}
	{...hasChildren ? { 'has-child': '' } : {}}
	bind:this={menu}
>
	{#if item.icon}
		<span class="menu__item__icon">
			<Icon name={item.icon} />
		</span>
	{:else}
		<div class="menu__item__emptyicon">
			{firstChar(item.name)}
		</div>
	{/if}
	<span class="menu__item__title">
		{item.name}
	</span>
	{#if hasChildren}
		<span class="icons">
			<Icon bind:pressed name="chevron-down|chevron-up" float="right" />
		</span>
	{/if}
</a>

<script lang="ts">
	import { page, isActive } from '@roxi/routify'
	import type { SidebarItem } from './models'
	import Icon from '@base/Icon.svelte'
	import { firstChar } from '@core/utils'
	export let parent
	export let hasChildren
	export let item: SidebarItem
	let menu
	let pressed = undefined

	function handleMenuItemClick() {
		pressed = !pressed
		
	}
	// $afterPageLoad((pg) => {
	// 	if ($page.path.indexOf(parent) != -1 && menu.getAttribute('pressed') == undefined) {
	// 		current = true
	// 		setTimeout(() => {
	// 			menu.click()
	// 		}, 500)
	// 	}
	// 	if ($isActive(item.url)) {
	// 		current = true
	// 	}

	// 	console.log($page.path.indexOf(parent) != -1)
	// })
</script>

<style lang="css">
	::-webkit-scrollbar {
		display: none;
	}

	.menu {
		&__item {
			text-decoration: none;
			color: var(--grey_400);
			display: block;
			padding: 7px 22px;
			font-weight: normal;
			&[selected]{
				background: #0f2e69;
			}
			&:hover {
				background: #0f2e69;
				transition: all 600ms ease-in-out;
				color: #fff;
			}
			&__icon {
				margin-right: 22px;
				vertical-align: middle;
				// float: left;
			}
			&__emptyicon {
				min-width: 46px;
				display: inline-block;
				font-weight: 600;
			}
		}
	}

	:global(.menu__item:not([pressed]) + .menu) {
		visibility: hidden;
		opacity: 0;
		max-height: 0;
		transition: all 0.4s ease-out;
	}
	:global(.menu__item:not(:not([pressed])) + .menu) {
		opacity: 1;
		visibility: visible;
		max-height: 700px;
		transition: all 0.4s ease-in;
	}
	:global(.sidebar[pressed]) {
		.menu {
			&__item {
				&__title {
					display: none;
				}
				&__emptyicon {
					min-width: auto;
				}
				&__icon {
					margin-right: 0px;
				}
				.icons {
					display: none;
				}
			}
		}
	}
	// :global(.sidebar[pressed] .menu__item:not([pressed]) + .menu) {
	// 	opacity: 1;
	// 	max-height: auto;
	// 	height: auto;
	// }

	// :global(.sidebar[pressed] .menu__item:not([pressed])[has-child] ) {
	// 	display: none;
	// }
</style>
