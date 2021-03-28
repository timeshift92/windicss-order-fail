<!-- routify:options bundle=false -->
<nu-root responsive="100rem|90rem|65rem|40rem|30rem" height="min 100vh">
	<nu-theme hue="280" saturation="100" />
	<nu-theme name="secondary" hue="280" mode="swap" saturation="100" />
	<nu-theme name="error" hue="8" saturation="100" />
	<nu-theme name="success" hue="120" saturation="100" />
	<nu-props
		radius=".5x"
		disabled-opacity=".6"
		max-content-width="100rem - (--content-padding * 2)"
		grid-gap="3x"
		transition="0.25s"
		column-width="((--max-content-width - (--grid-gap * 11)) / 12)|((100vw - (--content-padding * 2) - (--grid-gap * 11)) / 12)||((--full-width - (--content-padding * 2) - --grid-gap) / 2)"
		full-width="100vw||||320px"
		content-width="12sp|||2sp"
		dark-01-color="#141446"
		dark-02-color="#43436B"
		dark-03-color="#727290"
		dark-04-color="#A1A1B5"
		dark-05-color="#D5D5E2"
		subtle-color="--secondary-subtle-color"
		shadow-color="--secondary-shadow-color"
		border-color="--secondary-border-color"
		special-shadow-color="--secondary-special-shadow-color"
		page-bg-color="^root #bg :dark[#subtle]"
		second-bg-color="^root #subtle :dark[#bg]"
		diff-color="#second-bg"
		topbar-offset="8.75x|||6.75x"
		sidebar-width="32x||26x"
		content-padding="6x||3x|6x|3x"
		column-number="12||||2"
	/>

	<nu-flex height="100vh" flow="row">
		<nu-attrs for="region" display="grid" flow="row" border fill="bg" padding />
		<nu-block
			id="cover"
			place="fixed cover"
			inset="n :active[n]"
			on:click={(e) => (document.querySelector('#menu-button') ? document
							.querySelector('#menu-button')
							['click']() : '')}
			display="none |none :pressed[block]"
			fill="rgba(1,1,1,0.5)"
			width="||100%"
			height="100%"
			z="front"
		/>
		<Sidebar {sidebarMenus} />

		<nu-main
			overflow="scroll"
			scrollbar
			transition="all"
			display="grid"
			width="100vw"
			id="main"
			outline="n"
			column="span 1 :pressed[span 2]"
			rows="70px 70px 1fr"
			padding="0"
			space="left -65px :pressed[left -300px] | 0"
		>
			<nu-flex
				content="space-between"
				display="flex"
				height="70px"
				gap
				items="center"
				fill
				color
				theme="tone soft dim"
				padding="left 20bw right 20bw"
			>
				<nu-icon
					use-hotkey="m"
					on:tap={(e) => localStorage.setItem('is_open', e.currentTarget.getAttribute('is-pressed') == '' ? 'true' : 'false')}
					space="right 2rem"
					id="menu-button"
					use-action
					outline="none"
					toggle
					trigger
					cursor="pointer"
					name="menu"
					control="  sidebar[is-pressed] sidebar[width=300px|65px] main[is-pressed] cover[is-pressed]|"
				/>
				<nu-el>HEADER</nu-el>
				<nu-icon
					use-action
					outline="none"
					toggle
					on:click={() => {
						if (html.getAttribute('data-nu-scheme-is') == 'dark') {
							html.setAttribute('data-nu-scheme', 'light')
							localStorage.setItem('schema', 'light')
						} else if (html.getAttribute('data-nu-scheme-is') == 'light') {
							html.setAttribute('data-nu-scheme', 'dark')
							localStorage.setItem('schema', 'dark')
						}
					}}
					name="^root :light[sun-outline] :dark[moon-outline]"
				/>
			</nu-flex>
			<nu-flex
				height="60px"
				display="flex"
				theme="soft dim"
				border
				padding="left 20bw right 20bw"
				items="center"
				content="space-between"
			>
				<nu-el>{capitalize($page.title)}</nu-el>
				<nu-block>
					{#each $page.__file.shortPath.split('/').filter((p) => p) as path, index}
						{#if index == 0}
							{#if $page.__file.shortPath.split('/').filter((p) => p).length == 1}
								{path + ' '}
							{:else}
								<nu-link>
									<!-- svelte-ignore a11y-missing-content -->
									<a href={$url(`../${path}`)} />
									{path + ' '}
								</nu-link>
							{/if}
						{:else if index == $page.__file.shortPath.split('/').filter((p) => p).length - 1}
							&nbsp/{' ' + path}
						{:else}
							&nbsp/
							<nu-link>
								<!-- svelte-ignore a11y-missing-content -->
								<a href={$url(`./${path}`)} />
								{' ' + path + ' '}
							</nu-link>
						{/if}
					{/each}
				</nu-block>
			</nu-flex>

			<nu-article gap>
				<SvGraphQl>
					<slot />
				</SvGraphQl>
			</nu-article>
		</nu-main>
	</nu-flex>
</nu-root>

<script lang="ts">
	const html = document.querySelector('html')
	import { page, url } from '@roxi/routify'
	import { capitalize } from '@core/utils'

	import Sidebar from '@co/sidebar/Sidebar.svelte'
	import SvGraphQl from '@co/SvGraphQL.svelte'
	import type { SidebarItem } from 'src/components/sidebar-fl/models'

	if (localStorage.getItem('schema')) {
		html.setAttribute('data-nu-scheme', localStorage.getItem('schema'))
	}

	let sidebarMenus: Array<SidebarItem> = [
		{
			name: 'Начало',
			icon:"",
			url:"",
			items: [
				{
					name: 'Вступление',
					icon:"",
					url:"/docs/begin"
				},
			],
		},
	]
</script>
