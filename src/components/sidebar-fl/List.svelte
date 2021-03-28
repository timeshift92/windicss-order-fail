<div class="menu" bind:this={list} > 
	{#if groupName}
		<menu-title>
			{groupName}
		</menu-title>
	{/if}
	{#each sidebar as item, index}
		<Item parent={item.items ? item.name.toLowerCase() : null} {item} hasChildren={item.items ? true : false} />
		{#if item.items}
			<svelte:self sidebar={item.items} hasChildren={true}  />
		{/if}		
	{/each}
</div>

<script lang="ts">
	import Item from './Item.svelte'
	import type { SidebarItem } from './models'
	export let hasChildren = false
	export let groupName: string = null
	export let sidebar: Array<SidebarItem>
	export let parent = null
	let list

</script>

<style lang="css">
	
	.menu {
		menu-title {
			font-weight: 600;
			display: block;
			padding: 17px 22px;
			text-transform: uppercase;
			font-size: 14px;
			color: var(--grey_500);
		}
	}
	:global(.sidebar[pressed]) {	
		menu-title {
			display: none;
		}
	}
</style>
