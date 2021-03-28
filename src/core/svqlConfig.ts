//@ts-nocheck
import { svqlConfig } from 'graphql-svelte'
import Hasura from 'hasura-orm';
import { token$ } from '@src/features/auth';
import { graphUrl } from "./configs";
import { hasuraAdminPass } from '../../.env';

svqlConfig.setHeaders({
	'x-hasura-admin-secret': hasuraAdminPass
})

export let _client = svqlConfig.getClient({

	url: graphUrl, wsUrl: graphUrl.replace('http', 'ws')
})
export let client = () => _client

export function changeClient(_cl) {
	_client = _cl
}



export function hasura(_schema) {
	Hasura['provider'] = client()
	const orm = new Hasura({ _schema })
	orm['provider'] = client()
	return orm
}
export const setHeaders = svqlConfig.setHeaders
export const headers = svqlConfig.headers



