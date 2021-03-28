<div class="sidebar" {...pressed ? { pressed: '' } : {}}>
	<header>
		{#if brand}
			{brand.name}
		{/if}
	</header>
	{#if sidebarMenus}
		{#each sidebarMenus as sidebar}
			<ListComponent sidebar={sidebar.items} groupName={sidebar.name} />
		{/each}
	{/if}
</div>

<script lang="ts">
	import type { SidebarItem } from './models'
	// import { applyEffect } from '../RevealEffect'
	import ListComponent from './List.svelte'
	export let sidebarMenus: Array<SidebarItem>
	export let pressed
	export let brand
</script>

<style lang="css">
	::-webkit-scrollbar {
		display: none;
	}
	header {
		height: 60px;
		padding: 22px;
		color: #fff;
	}
	.sidebar {
		background: var(--sidebar);
		min-height: 100vh;
		width: 260px;
		text-align: left;
		transition: all 400ms;
	}
	:global(.sidebar[pressed]) {
		transition: all 400ms;
		width: 80px;
		text-align: center;
	}
</style>
