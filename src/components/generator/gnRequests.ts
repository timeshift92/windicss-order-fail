import { adminPass, graphQuery } from "@src/core/configs"

const url = graphQuery

let scheme = 'public'
export function setScheme(_scheme) {
	scheme = _scheme
}
export function getScheme() {
	return scheme
}
export async function getTables() {
	const response = await fetch(url, {
		method: 'POST',
		body: JSON.stringify({
			type: 'select',
			args: {
				table: {
					name: 'hdb_table',
					schema: 'hdb_catalog',
				},
				columns: ['table_name', { name: 'relationships', columns: ['*'] }],
				where: {
					$or: [
						{
							table_schema: scheme,
						},
					],
				},
				order_by: [
					{
						column: 'table_name',
						type: 'asc',
					},
				],
			},
		}),
		headers: {
			'Content-Type': 'application/json',
			'x-hasura-admin-secret': adminPass,
		},
	})
	return await response.json()
}

export async function getTableColumns(table) {
	const response = await fetch(url, {
		method: 'POST',
		body: JSON.stringify({
			type: 'run_sql',
			args: {
				sql: `select column_name,data_type,is_nullable,column_default from information_schema.columns where table_name = '${table}' and table_schema='${scheme}';`,
			},
		}),
		headers: {
			'Content-Type': 'application/json',
			'x-hasura-admin-secret': adminPass,
		},
	})
	return (await response.json()).result.filter((i) => i[0] != 'column_name')
}


export async function getTableSchemas() {
	const response = await fetch(url, {
		method: "POST",
		body: JSON.stringify({ "type": "bulk", "args": [{ "type": "select", "args": { "table": { "name": "schemata", "schema": "information_schema" }, "columns": ["schema_name"], "order_by": [{ "column": "schema_name", "type": "asc", "nulls": "last" }], "where": { "schema_name": { "$nin": ["information_schema", "pg_catalog", "hdb_catalog", "hdb_views"] } } } }] }),
		headers: {
			'Content-Type': 'application/json',
			'x-hasura-admin-secret': adminPass,
		},
	})
	return (await response.json())[0].map((i) => i['schema_name'])
}
