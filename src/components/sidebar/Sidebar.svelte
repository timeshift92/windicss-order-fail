<div class="sidebar scrollbar-c">
	<brand class=""> {brand.name} </brand>
	<nav class="not-navigate">
		<ul class="sidebar-menu " role="navigation">
			{#each sidebarMenus as menu}
				<li class="nav-section-title">{menu.name}</li>
				{#if menu.items}
					{#each menu.items as item, index}
						<List bind:isSideNavOpen {item} {index} currentPath={$page.path.toString()} />
					{/each}
				{/if}
			{/each}
		</ul>
	</nav>
</div>

<script>
	import { page } from '@roxi/routify'
	import List from './List.svelte'
	import { sidebar } from './data'
	import type { Brand, SidebarItem } from './models'
	export let sidebarMenus: Array<SidebarItem>
	export let isSideNavOpen
	export let brand: Brand
</script>

<style g lang="postcss">
	.sidebar * :global(a) {
		color: var(--cds-text-01);
	}
	brand {
		-ms-grid-row-align: center;
		align-self: center;
		padding: 1rem;
	}
	.sidebar * :global(ol, ul) {
		list-style: none;
	}
	.sidebar {
		background-attachment: scroll;
		--tw-bg-opacity: 1;
		background-color: rgba(32, 32, 32, var(--tw-bg-opacity));
		display: flex;
		flex-direction: column;
		overflow-y: auto;
		--tw-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
		box-shadow: 0 0 rgba(0, 0, 0, 0), 0 0 rgba(0, 0, 0, 0), var(--tw-shadow);
		box-shadow: 0 0 rgba(0, 0, 0, 0), 0 0 rgba(0, 0, 0, 0), var(--tw-shadow);
		box-shadow: var(--tw-ring-offset-shadow, 0 0 rgba(0, 0, 0, 0)), var(--tw-ring-shadow, 0 0 rgba(0, 0, 0, 0)),
			var(--tw-shadow);
		--tw-text-opacity: 1;
		color: rgba(255, 255, 255, var(--tw-text-opacity));
		width: 16rem;
	}

	.sidebar-menu :global(li .item:hover),
	.sidebar-menu :global(li > ul > li:hover) {
		--tw-bg-opacity: 1;
		background-color: rgba(139, 92, 246, var(--tw-bg-opacity));
		--tw-bg-opacity: 0.2;
	}
	.sidebar-menu :global(li .item),
	.sidebar-menu :global(li > ul > li > a) {
		text-decoration: none;

		display: block;
		cursor: pointer;
		padding-top: 1rem;
		padding-right: 1rem;
		padding-bottom: 1rem;
		padding-left: 1rem;
	}
	.nav-section-title {
		font-size: 0.75rem;
		line-height: 1rem;
		--tw-text-opacity: 1;
		color: var(--cds-ui-04);
		--tw-text-opacity: 0.7;
		font-style: italic;
	}
	.sidebar[pressed] {
		transition: all 400ms;
		width: 80px;
		text-align: center;
	}
</style>
