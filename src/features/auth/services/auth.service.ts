
import { writable, derived, get } from "svelte/store";
import type { Readable } from "svelte/store";
import { client, setHeaders, hasura } from '@core/svqlConfig'

export const token$ = writable(null);
export const tokenExpire$ = writable(null);
export const authorized$ = writable(false)

let resolve,reject
export const user$: Readable<Promise<IUser>> = derived(token$, async ($token$) => {
	const prom = new Promise<IUser>((res,rej) => {resolve = res; reject = rej}   )
	if (!$token$) return prom
	setHeaders({
		Authorization: `Bearer ${$token$}`
	})



	client().query({ query: `{ auth_me { role id } } ` }).then(r =>{
		resolve(r.auth_me)
	})
	.catch(e =>{
		resolve('')

	})


	return prom
})

let interval

export function authorize() {
	return new Promise(async (resolve, reject) => {

		try {
			const { errors, refresh_token } = await client().mutate({ query: `mutation { refresh_token { access_token } }` })
			if (refresh_token) {
				token$.set(refresh_token.access_token)

			}
			resolve('');

			if (interval) {
				clearInterval(interval);
			}
			interval = setInterval(() => {
				authorize()
			}, 15 * 60 * 1000)
		} catch (errors) {
			reject(JSON.stringify(errors || 'ошибка'))
		}


	})
}




