	<ProviderService {data} let:data>
		<Table>

		</Table>
	</ProviderService>

<script lang="ts">
	import type { Data } from './interfaces'
	import { ProviderService } from './services'

	import Table from './table/Index.svelte'
	import { Create } from './table/actions'
	export let data: Data
</script>
