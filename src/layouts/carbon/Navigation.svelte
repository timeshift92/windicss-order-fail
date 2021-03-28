<Header
	persistentHamburgerMenu={true}
	bind:isSideNavOpen
	company="TScorp"
	class="header--utilities"
	platformName="Carbon Components Svelte"
	href="/"
>
	<div slot="skip-to-content">
		<SkipToContent />
	</div>

	<SideNav style="background:#242424" bind:isOpen={isSideNavOpen}>
		<SideNavItems>
			<Sidebar bind:isSideNavOpen sidebarMenus={sidebar} {brand} />
		</SideNavItems>
	</SideNav>
	<HeaderUtilities>
		<HeaderGlobalAction aria-label="Notifications" icon={Notification20} />
		<HeaderGlobalAction aria-label="User Avatar" icon={UserAvatar20} />
		<HeaderGlobalAction aria-label="App Switcher" icon={AppSwitcher20} />
	</HeaderUtilities>
</Header>

<script>
	import Sidebar from '@co/sidebar/Sidebar.svelte'
	import {
		SkipToContent,
		Header,
		HeaderUtilities,
		HeaderGlobalAction,
		SideNav,
		SideNavMenu,
		SideNavMenuItem,
		SideNavLink,
		SideNavItems,
	} from 'carbon-components-svelte'
	import { sidebar, brand } from './data'
	import { Notification20, UserAvatar20, AppSwitcher20 } from 'carbon-icons-svelte'
	import { getContext } from 'svelte'
	let isSideNavOpen = false
	const ctx: any = getContext('Theme')
	$: if (ctx) {
		ctx.dark.subscribe((value) => {
			console.log('dark mode?', value)
		})
		ctx.light.subscribe((value) => {
			console.log('light mode?', value)
		})
		ctx.updateVar('--cds-productive-heading-06-font-size', '4rem')
	}
</script>

<style>
	:global(.bx--header__global * svg) {
		display: inline;
		vertical-align: inherit;
	}
</style>
