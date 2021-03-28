{#if skeleton}
	<TabsSkeleton count={field.args.length} />
{:else}
	<Tabs>
		{#each field.args as arg}
			<Tab label={arg.title} />
		{/each}

		<div slot="content">
			{#each field.args as arg}
				<TabContent>
					{#each field.fields.filter((fl) => fl.arg == arg.value) as ar}
						{#if ar && ar.type}
							<Field {skeleton} field={ar} />
						{/if}
					{/each}
				</TabContent>
			{/each}
		</div>
	</Tabs>
{/if}

<script lang="ts">
	import { Tab, TabContent, Tabs, TabsSkeleton } from 'carbon-components-svelte'
	import type { TabField } from './builder'
	import Field from './Field.svelte'
	export let field: TabField, skeleton
	let t = {}
</script>
