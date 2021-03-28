<nu-columnheader
	padding
	border="1px"
	{...column.sort ? { 'use-hover': 'true', mark: 'hover', cursor: 'pointer' } : {}}
	text="center"
	inset="n :active[y]"
	on:click={ column.sort ? changeState : ''}
	
	
>
	<nu-el text="left">{column.title}</nu-el>
	{#if column.sort}
		<nu-icon
			name={state == states.none ? `^:hover[${state}]` : state}
			rotate={state == states.up ? '0deg' : state == states.down ? '360deg' : '0deg'}
		/>
	{/if}
</nu-columnheader>

<script lang="ts">
	import { getContext } from 'svelte'
	let { sortEvent } = getContext('CRUD')
	let states = { down: 'ArrowUp16', up: 'ArrowDown16', none: 'ArrowsVertical16' }
	let state = states.none
	export let column: any
	const changeState = () => {
		switch (state) {
			case states.down:
				state = states.up
				sortEvent(column.name, 'asc')
				break
			case states.up:
				state = states.none
				sortEvent(column.name, 'none')

				break
			case states.none:
				state = states.down
				sortEvent(column.name, 'desc')

				break
		}
	}
</script>
