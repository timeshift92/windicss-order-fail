import { locale$ } from "@src/core/stores"
import { writable, get, derived } from "svelte/store"
import type { IBaseField, IField, TField } from "./interfaces"
import Validator from '@/core/validator/validator';
import type { ButtonProps } from "carbon-components-svelte/types/Button/Button";



export type TabArguments = { title: string, name: string, value: string | number, active?: boolean }
export interface ITabsField {
	type: 'tabs'
	/**
	 * example: {en:1,ru:2}
	 */
	args: Array<TabArguments>
	name?: string
	options?: any
	values?: any,
	prefix?: string
	fields?: Array<TField>,
}

export interface TabFieldContructorArgs {
	type: 'tabs'
	name: string;
	args: Array<TabArguments>
	fieldValues?: Array<{ arg: string, [name: string]: string }>
	fields?: Array<any>
	/**
	 * Система сама добавит
	 */
	parent?: FormBuilder,
	prefix?: string
}

export class FormBuilder {
	constructor({ name }: FormBuilderContructor) {
		this.name = name
	}
	fields: Array<TField | TabField | FieldSet> = []
	name?: string
	parent: FormBuilder
	relationFields: FormBuilder[] = []
	static values2 = writable({})
	skeleton = false
	perPost(data) {
		console.log(data)

	}
	button: { title: string, position?: 'top' | 'bottom', options: ButtonProps } =
		{
			title: 'submit',
			position: 'top',
			options: {}
		}


	setButton({ title, position, options = {} }: { title: string, position?: 'top' | 'bottom', options?: ButtonProps }) {
		this.button = { title, position, options }
		return this
	}

	setValues(val: any) {
		this.fields.flatMap(fl => {
			if (fl instanceof FieldSet || fl instanceof TabField) {
				if (val[fl.name])
					fl.setValues(val[fl.name])

			} else {
				if (val[fl.name]) fl.value = val[fl.name]
			}

		})
	}

	get values() {
		let tmpValues = {};
		this.fields.map((fl) => {
			if ((fl instanceof TabField) || (fl instanceof FieldSet)) {

				if (fl.name) tmpValues[fl.name] = fl.values
				else tmpValues = { ...tmpValues, ...fl.values }

			} else {
				tmpValues[fl.name] = fl.value
			}
		})
		return tmpValues
	}

	addField(field: TField) {
		if (field.type == 'multiselect' && !field.value) {
			// field.value = []
		}
		const fld = this._setValidation(field)
		this.fields = [...this.fields, fld]
		if (fld.validations)
			this.validators[fld.name] = fld.validations


		return this
	}
	addRelation(formField: TabFieldContructorArgs | FieldSetContructorArgs, idx?: number): TabField | FieldSet {
		let relation: TabField | FieldSet;

		formField.parent = this

		if (formField.type == 'tabs') {
			relation = new TabField(formField)
		} else {
			relation = new FieldSet(formField)
		}

		this.fields = [...this.fields, relation]


		return relation
	}
	retParent() {
		return this.parent
	}
	getField(name) {
		return this.fields.filter((fl) => fl.name == name)[0]
	}
	removeField(name) {
		let indx = -1;
		this.fields.flatMap((fl, idx) => {
			if (fl.name == name)
				indx = idx
		})
		if (indx !== -1) {
			delete this.fields[indx]
		}
		return indx
	}

	validators = {}
	validate() {

		this.fields.map(fl => {
			if (fl instanceof FieldSet || fl instanceof TabField) {
				fl.validate()
			} else {
				const validators = new Validator({ ...this.values, [fl.name]: fl.value }, this.validators || {})
				if (validators.fails() && (validators.errors.get(fl.name.replace('_confirmation', '')).length > 0)) {
					fl.invalid = true;
					fl.invalidText = validators.errors.get(fl.name.replace('_confirmation', '')).join(" ")
				} else {
					fl.invalidText = null
					fl.invalid = false;
				}

			}
		})
		const validators = new Validator({ ...this.values }, this.validators)
		return !validators.fails()

	}


	_setValidation(field): TField {
		const stVal = FormBuilder.values2
		const self = this
		let isValidation = false
		let initial = {}
		const chaneVal = (vl, txt) => {
			if (this.parent)
				vl = vl.indexOf('_confirmation') == -1 ? vl + '_confirmation' : vl.replace('_confirmation', '')
			this.parent.fields.flatMap(fl => {
				if (fl instanceof FieldSet) {
					fl.fields.flatMap(_fl => {

						if (_fl.name == vl) {
							if (txt == '' && _fl.invalid) {
								_fl.invalidText = txt
								_fl.invalid = false;
							} else if (!_fl.invalid && txt) {
								_fl.invalid = true;
								_fl.invalidText = txt
							}


						}
						isValidation = true
						return _fl
					})
				}
			})
		}
		return new Proxy(field, {

			set(target: IBaseField, name, value, receiver) {

				const validators = new Validator({ ...self.values, ...name == 'value' ? { [target.name]: value } : {} }, target.validations ? { [target.name]: target.validations } : {})
				if (initial[target.name] && validators.fails() && (validators.errors.get(target.name.replace('_confirmation', '')).length > 0)) {
					if (!isValidation && (target.name.indexOf('_confirmation') !== -1 || validators.input.hasOwnProperty(target.name + '_confirmation'))) {
						chaneVal(target.name, validators.errors.get(target.name.replace('_confirmation', '')).join(" "))
						isValidation = false
					}

					target.invalid = true;
					target.invalidText = validators.errors.get(target.name.replace('_confirmation', '')).join(" ")
				} else if (!validators.fails()) {
					if (!isValidation && (target.name.indexOf('_confirmation') !== -1 || validators.input.hasOwnProperty(target.name + '_confirmation'))) {
						chaneVal(target.name, '')
						isValidation = false
					}
					target.invalid = false;
					target.invalidText = null
				}
				initial[target.name] = true
				setTimeout(() => {
					stVal.set(self.parent ? self.parent.values : self.values)

				}, 15);

				return Reflect.set(target, name, value, receiver);
			}
		});
	}

	store = derived(FormBuilder.values2, ($fb) => {
		return this
	})

	parseJson(fields: Array<TField | TabFieldContructorArgs | FieldSetContructorArgs>) {
		fields.map(fl => {
			if (fl.type == 'tabs') {
				const tb = this.addRelation({
					name: fl.name,
					// @ts-ignore
					args: fl.args,
					type: 'tabs',
					// @ts-ignore
					fieldValues: fl.fieldValues
				})
				fl.fields.map(_fl => {
					tb.addField(_fl)
				})
			} else if (fl.type == 'fieldset') {
				const fs = this.addRelation({
					name: fl.name,
					type: 'fieldset',
				})
				fl.fields.map(_fl => {
					fs.addField(_fl)
				})
			} else {
				// @ts-ignore
				this.addField(fl)
			}
		})

		return this

	}

}
export interface FormBuilderContructor {
	name?: string
}


export class TabField extends FormBuilder {
	type: string = 'tabs'
	name: string
	parent: FormBuilder
	args: Array<TabArguments>
	prefix?: string
	fields: Array<TField>
	fieldValues: Array<{ arg: any, name: string, value: any }> = []
	get values() {
		let tmpValues = []
		this.args.map(arg => {
			const col = { [arg.name]: arg.value }
			this.fields.filter(fl => fl.arg == arg.value).map(fl => {
				if (fl.name !== this.args[0].name)
					col[fl.name] = fl.value
			})
			tmpValues = [
				...tmpValues,
				col
			]
		})
		//@ts-ignore
		return tmpValues
	}
	setValues(val: [{ [name: string]: string }]) {
		val.map(vl => {
			this.fields.flatMap(fl => {
				if (fl.arg == vl[this.args[0].name] && vl[fl.name] && this.args[0].name !== fl.name) {
					fl.value = vl[fl.name]
				}
			})
		})
	}
	constructor({ ...rest }: TabFieldContructorArgs) {
		super({ name: rest.name })
		this.type = 'tabs'

		Object.assign(this, rest);
	}

	addField(field: TField) {
		if (field.type == 'multiselect' && !field.value) {
			field.value = []
		}
		this.args.map(arg => {
			field.arg = arg.value
			const fld = this._setValidation(Object.assign({}, field))
			if (this.values.length > 0) {
				const val = this.fieldValues && this.fieldValues.filter(vl => vl.arg == arg.value)[0]
				if (val) {
					fld.value = val[fld.name]
				}
			}
			this.fields = [...this.fields, fld]
		})
		return this
	}


}
export class FieldSet extends FormBuilder {
	type = 'fieldset';
	name?: string
	parent: FormBuilder
	pk?: any
	prefix?: string
	fields: Array<TField>;
	options?: any

	constructor({ ...rest }: FieldSetContructorArgs) {
		super({ name: rest.name })
		Object.assign(this, rest)
	}
}


export interface FieldSetContructorArgs {
	type: "fieldset"
	name?: string;
	parent?: FormBuilder,
	pk?: any
	prefix?: string,
	fields?: Array<any>
	options?: object
}

