<div class="bx--content">
	<table class="bx--data-table">
		<thead>
			<tr>
				{#each headers as header}
					<th>{header}</th>
				{/each}
			</tr>
		</thead>

		<tbody>
			{#each rows as row, index}
				<slot name="column" column={row} index={index} />
			{:else}
			{/each}
		</tbody>
	</table>
</div>

<script lang="ts">
	let headers: Array<any> = ['Name', 'Type', 'Label', 'Options', 'Is Required', '']
	let rows: Array<any> = []

	export { headers, rows }
</script>
