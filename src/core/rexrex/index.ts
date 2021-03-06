let ALPHA = '[A-z]'
let NOT_ALPHA = '[^A-z]'
let WORD = '\\w'
let NOT_WORD = '\\W'
let NUMBER = '\\d'
let NOT_NUMBER = '\\D'
let WHITE_SPACE = '\\s'
let NOT_WHITE_SPACE = '\\S'
let ANY = '.'
let START = '^'
let END = '$'
let LAZY = '?'
let GROUP = '?:'

let whole = v => `${START}${v}${END}`
let repeat = (v, start, end) => {
	let finish = end === Infinity ? '' : end

	return `${v}${start == null ? '' : `{${start}`}${finish != null ? `,${finish}` : ''}${start == null ? '' : '}'
		}`
}

let numeric = repeat.bind(null, NUMBER)
let alpha = repeat.bind(null, ALPHA)

let and = (...rest) => rest.join('')
let or = (...rest) => rest.join('|')

let wildcard = (v, lazy?) => `${v}*${lazy ? LAZY : ''}`
let extra = (v, lazy?) => `${v}+${lazy ? LAZY : ''}`

let capture = (v, name?) =>
	v && v.length ? `(${typeof name === 'string' ? `?<${name}>` : ''}${v})` : ''

let group = v => (v && v.length ? `(${GROUP}${v})` : '')

//@ts-ignore
let ALL = capture(or(ANY, WHITE_SPACE)) // matches any character or whitespace

let look1 = (posOrNeg, behindOrAhead) => text =>
	`(?${behindOrAhead ? '<' : ''}${posOrNeg ? '=' : '!'}${text})`

let looker = bOa =>
	Object.assign(look1(true, bOa), {
		positive: look1(true, bOa),
		negative: look1(false, bOa)
	})

//@ts-ignore
let regex = (...args) => new RegExp(...args)
const look = {
	ahead: looker(false),
	behind: looker(true)
}
const matchers = {
	ALL,
	ANY,
	LAZY,
	GROUP,
	ALPHA,
	NUMBER,
	WORD,
	WHITE_SPACE,
	START,
	END,
	not: {
		ALPHA: NOT_ALPHA,
		NUMBER: NOT_NUMBER,
		WORD: NOT_WORD,
		WHITE_SPACE: NOT_WHITE_SPACE
	}
}
const flags = {
	GLOBAL: 'g',
	MULTI_LINE: 'm',
	INSENSITIVE: 'i',
	STICKY: 'y',
	UNICODE: 'u'
}
export {
	whole,
	repeat,
	alpha,
	numeric,
	and,
	or,
	wildcard,
	extra,
	capture,
	group,
	look,
	matchers,
	flags,
	regex
}
