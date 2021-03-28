<nu-grid rows="auto auto" flow="row" columns="auto auto" gap>
	<nu-card gap>
		<nu-theme name="error" hue="1" mod="tint" />
		<nu-attrs for="field" theme=":invalid[error]" />
		<nu-form
			on:input={(e) => {
				SubmitForm(e.detail.product_name, e)
			}}
			control="output[.value]"
			gap="2x"
		>
			<nu-field>
				<nu-label>Product Name</nu-label>
				<nu-input id="product_name" grow="1" placeholder="" />
			</nu-field>
			<nu-btn special action="submit">Create</nu-btn>
		</nu-form>
	</nu-card>
	<nu-card gap>
		<nu-form
			on:input={(e) => {
				console.log(e.detail)
				SubmitProductId(e.detail)
			}}
		>
			<nu-btn width="10" columns="1fr auto">
				<nu-value list />
				<nu-dropdownicon />
				<nu-popuplistbox id="prod_id">
					{#each products as product}
						<nu-option value={product.id}>{product.name}</nu-option>
					{/each}
				</nu-popuplistbox>
			</nu-btn>
			<nu-btn special action="submit">Btn</nu-btn>
		</nu-form>
	</nu-card>
</nu-grid>

<script>
	import { getContext, createEventDispatcher } from 'svelte'
	import type HasuraORM from 'hasura-orm'
	const dispatch = createEventDispatcher()
	const { hasura } = getContext<{ hasura: (_schema: string) => HasuraORM }>('api')

	export function createProduct(name) {
		hasura('products').insert({ name }).mutate()
	}
	let products = []
	export function getProductList() {
		hasura('products')
			.select('id,name')
			.get()
			.then((data: any) => {
				products = data.products
			})
	}

	getProductList()

	const SubmitForm = (product_name, e) => {  
		createProduct(  product_name )
		e.preventDefault()
	}

	const SubmitProductId = (e) => {
		dispatch('productSelected', {
			id: e.prod_id,
			table_name: 'products',
		})
	}
</script>
