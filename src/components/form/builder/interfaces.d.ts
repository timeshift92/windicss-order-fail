import type { DatePickerProps } from "carbon-components-svelte/types/DatePicker/DatePicker"
import type { DatePickerInputProps } from "carbon-components-svelte/types/DatePicker/DatePickerInput"
import type { FileUploaderProps } from "carbon-components-svelte/types/FileUploader/FileUploader"
import type { MultiSelectProps } from "carbon-components-svelte/types/MultiSelect/MultiSelect"
import type { NumberInputProps } from "carbon-components-svelte/types/NumberInput/NumberInput"
import type { SelectProps } from "carbon-components-svelte/types/Select/Select"
import type { TextAreaProps } from "carbon-components-svelte/types/TextArea/TextArea"
import type { PasswordInputProps } from "carbon-components-svelte/types/TextInput/PasswordInput"
import type { TextInputProps } from "carbon-components-svelte/types/TextInput/TextInput"



export type TabArguments = { title: string, name: string, value: string | number, active?: boolean }



interface IBaseField {
	type: 'editor' | 'hidden' | 'mask' | 'checkbox' | 'radio'
	name: string
	labelText?: string,
	value?: any
	fields?: Array<string>
	arg?: any
	invalid?: boolean
	invalidText?: string
	validations?: any
	options?: any
}

interface IMaskField extends IBaseField {
	type: 'mask'
	unmaskedValue?: any
}

interface IDateField extends IBaseField, DatePickerProps, Omit<IBaseField, 'value' | 'type'> {
	type: 'date',
	options?: DatePickerInputProps
}
interface IMultiSelectField extends IBaseField, Exclude<MultiSelectProps, 'name'> {
	type: 'multiselect',

	queryName?: string
	isLoading?: boolean
	id?: any
	text?: string
}
interface ISelectField extends IBaseField, SelectProps {
	type: 'select',
	queryName: string
	isLoading: boolean
	id: any
	text: string
}
interface IFileField extends IBaseField, FileUploaderProps {
	type: 'file',
	change: (e: Event, value) => void
}
interface INumberField extends IBaseField, TextInputProps {
	type: 'number',
}
interface IJsonField extends IBaseField {
	type: "jsonb",

}

interface IField extends IBaseField, TextInputProps {
	type: 'text'
}
interface ITextAreaField extends IBaseField, TextAreaProps {
	type: 'textarea'
}
interface IPasswordField extends IBaseField, PasswordInputProps {
	type: 'password'
}
interface CField extends IBaseField {
	arg: any
	type: 'component'
	name: string
	label: string
	component: any
	value?: any

}
export type TField = IMaskField | IField | IJsonField | CField | IDateField | IFileField | INumberField | IPasswordField | IMultiSelectField | ISelectField | IBaseField | ITextAreaField



interface ValidationObject {
	[key: string]: string
}
interface ValidationFunction {
	assert(value): boolean,
	reason: string
}
type Validation = Array<ValidationObject | ValidationFunction | string>


export interface IForm {
	button?: {
		title?: string,
		position?: 'top' | 'bottom' = 'top'
		options?: any
	}

	prePost?: Function,
	options?: string,
	fields: Array<TField>
}
