//@ts-nocheck
import Validator from '@/core/validator/validator';
import en from '@/core/validator/lang/en'
import ru from '@/core/validator/lang/ru'

export function initValidation(locale) {
	const loc = locale
	if (loc == 'en') {
		Validator.setMessages('en', en)
	} else {
		Validator.setMessages('en', ru)
	}
	Validator.registerImplicit(
		'phone',
		function (value, requirement, attribute) {
			if(value && typeof value == 'string'){
				return /\+?998[0-9]{9}$/.test(value.replace(/[+)(_ -]/g, ''))
			}
			return false
		},
		'The :attribute phone number is not in the format +(998)-XX-XXX-XXXX.'
	)
}
