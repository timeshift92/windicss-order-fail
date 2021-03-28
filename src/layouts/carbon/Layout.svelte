<Theme theme="g90">
	<Navigation />
	<Content class="scrollbar-c" style="height: 90%;width: 100%; background: 0 0; ">
		<Grid>
			<slot />
		</Grid>
	</Content>
</Theme>

<script>
	import { Content, Grid } from 'carbon-components-svelte'
	import Navigation from './Navigation.svelte'
	import Theme from './Theme.svelte'
</script>
