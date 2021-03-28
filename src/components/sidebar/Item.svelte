{#if item.icon}
	<Icon name={item.icon} />
{/if}
{item.name}
{#if item.items}
	<span class="chevron" />
{/if}

<script>
	import Icon from '@base/Icon.svelte'
	import type { SidebarItem } from './models'
	export let item: SidebarItem
	
</script>
