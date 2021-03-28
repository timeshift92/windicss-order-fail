export interface Sidebar {
	group: string
	items: Array<SidebarItem> 
}

export interface SidebarItem {
	name: string;
	icon?: string;
	items?: Array<SidebarItem>
	url?: string
}

export interface Brand {
	name: string
	logo: string
	url: string
}
