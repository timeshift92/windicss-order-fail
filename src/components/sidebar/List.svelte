<li class="menu-list">
	<input
		type="checkbox"
		{...isActive(item.url) ? { checked: true } : { checked: false }}
		id="{item.name}-{index}"
		class="hidden-input"
	/>
	{#if item.items}
		<label
			class="item"
			for="{item.name}-{index}"

		>
			<Item {item} />
		</label>
	{:else}
		<a
			href={item.url}
			class="item"
			{...isActive(item.url) ? { current: '' } : {}}
			on:click={(e) => {
				isSideNavOpen = !isSideNavOpen
			}}
		>
			<Item {item} />
		</a>
	{/if}
	{#if item.items}
		<ul>
			{#each item.items as subItem, ind}
				<svelte:self bind:isSideNavOpen item={subItem} index={ind} {currentPath} />
			{/each}
		</ul>
	{/if}
</li>

<script>
	import type { SidebarItem } from './models'
	import Item from './Item.svelte'

	let item: SidebarItem
	let index = 0
	let currentPath: string = ''
	let isSideNavOpen

	$: isActive = (url: string = '') => {
		const path = url.split('/').pop() || ''
		if (path && currentPath) return currentPath.indexOf(path) !== -1
		return false
	}

	export { item, index, isSideNavOpen, currentPath }
</script>

<style>
	.menu-list {
		overflow: hidden;
	}
	.menu-list > a {
		text-decoration: none;
		text-color: white;
	}

	.menu-list > ul {
		transition-property: all;
		transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
		transition-duration: 150ms;
	}
	.menu-list > input {
		display: none;
	}
	.menu-list > input:checked ~ ul {
		max-height: 24rem;
		transition-timing-function: cubic-bezier(0.4, 0, 1, 1);
	}
	.menu-list > input:not(:checked) ~ ul {
		max-height: 0px;
		transition-timing-function: cubic-bezier(0, 0, 0.2, 1);
	}
	.menu-list > .item {
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 100%;
		text-align: center;
		width: 100%;
	}
	.menu-list > input:checked ~ .item,
	.menu-list > .item[current] {
		--tw-border-opacity: 1;
		border-color: rgba(139, 92, 246, var(--tw-border-opacity));
		border-left-width: 2px;
		--tw-text-opacity: 1;
		color: rgba(139, 92, 246, var(--tw-text-opacity));
	}
	.menu-list :global(> input:checked ~ .item > span) {
		--tw-border-opacity: 1;
		border-color: rgba(139, 92, 246, var(--tw-border-opacity));
		top: 0;
		transform: rotate(135deg);
	}
</style>
