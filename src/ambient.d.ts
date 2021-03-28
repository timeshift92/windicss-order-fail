import type HasuraORM from "hasura-orm";
import type { Writable } from "svelte/store";
import type { SweetAlertIcon } from "sweetalert2";

/**
 * These declarations tell TypeScript that we allow import of images, e.g.
 * ```
		<script lang='ts'>
			import successkid from 'images/successkid.jpg';
		</script>

		<img src="{successkid}">
	 ```
 */
declare module "*.gif" {
	const value: string;
	export = value;
}

declare module "*.jpg" {
	const value: string;
	export = value;
}

declare module "*.jpeg" {
	const value: string;
	export = value;
}

declare module "*.png" {
	const value: string;
	export = value;
}

declare module "*.svg" {
	const value: string;
	export = value;
}

declare module "*.webp" {
	const value: string;
	export = value;
}

declare module "*.json" {
	const value: any;
	export default value;
}

declare global {
	interface Api {
		query: ({ query, variables }: { query: string; variables?: Object }) => Promise<any>
		mutate: ({ query, variables }: { query: string; variables?: Object }) => Promise<any>
		subscription: ({ query, variables }: { query: string; variables?: Object }) => Writable<any>
		hasura: (_schema: string) => HasuraORM
		fire: (title, message, type: SweetAlertIcon = 'success') => void
	}

}

