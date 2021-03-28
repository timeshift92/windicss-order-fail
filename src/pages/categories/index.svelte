<nu-grid rows="repeat(auto-fill, minmax(50px, 1fr))" columns="repeat(auto-fill, minmax(250px, 1fr))" gap="2">
	{#each categories as category}
		<nu-card padding="10px" gap="1">
			<nu-heading text="center" level="4">{category.category_locales[0].name}</nu-heading>
			<nu-line gap="2" />
			{#if category.addins && category.addins.content}
				<nu-block style="word-break: break-word; ">
					{@html category.addins.content}
				</nu-block>
			{/if}
		</nu-card>
	{/each}
</nu-grid>

<script>
	import { getContext } from 'svelte'
	const { hasura } = getContext<Api>('api')
	import { ready } from '@roxi/routify'
	let categories = []
	hasura('categories')
		.select('id category_locales { name } category { category_locales {name} }')
		.select('addins')
		.get()
		.then((ct: any) => {
			categories = ct.categories
			$ready()
		})
</script>
