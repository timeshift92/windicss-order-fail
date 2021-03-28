import type { Writable } from 'svelte/types/runtime/store'
import type { FormBuilder } from '../../components/form/builders/form/builder';

export interface FormBuild {
	group?: string,
	fill?: string,
	type: 'fieldset' | 'tabs' | any,
	/** if type fieldset or tabs */
	title?: string,
	name: string,
	flow?: 'column' | 'row',
	/** any numl properties */
	options?: any,
	/** if use type tabs example:  ['ru', 'uz', 'en'] */
	labels?: Array<string>,
	/** example: [{ name: 'locales_id', value: 1 }] */
	args?: Array<any>,
	required?: boolean,
	label?: string,
	placeholder?: string
	data?: {
		/** query function  example: query( ` brands { slug }  ` )  */
		preload: (type) => {},
		/** query name  */
		name: string,
		/** example: 'color_locales.name' */
		fieldName: string,
		foreign_key: string,
	},
	multiple?: boolean,
	/** if is relation column to need declare relation fields */
	fields?: Array<FormBuild>,

}
export interface Data {
	prefix?: string
	queryName: string
	rows$?: Writable<Array<any>>
	total$?: Writable<number>
	offset$?: Writable<number>
	sortEvent?: (column: any, sort: 'asc' | 'none' | 'desc') => {}
	filterEvent?: (query: any) => {}
	queryParams?: any
	pagination?: {
		limit: number
	}
	create?: boolean
	actions?: {
		title?: string
		update?: boolean
		delete?: boolean
		create?: boolean
	}
	formBuilder?: FormBuilder,
	columns: Array<{
		name: string
		title: string
		fields?: any
		component?: Object
		/** example:
			 *  is_desc => ({
				id: is_desc ? 'desc' : 'asc',
			})
			 */
		sort?: Function | any
		/**
		 * example: model => model.id
		 */
		value?: string | Function
		filter?: {
			/**
				 *   value => ({
					product_locales: {
						name: { _ilike: `%${value}%` },
					},
				}),
				 */
			query?: Function
			placeholder?: string
		}
	}>
}
