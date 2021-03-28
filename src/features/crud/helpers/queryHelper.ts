import { hasura } from "@core/svqlConfig";
import type Hasura from "hasura-orm/dist/types/hasura";

import { objectWithoutKey } from './formHelper'
import pluralize from "./pluralizer";

export function columnsAdapter(schema, columns, callback = (field, relation) => relation, _query = null) {
	const query = _query || hasura(schema)
	columns.map((column) => {
		if (column.fields) {
			query.with(column.name, (qry) => {
				return callback
					? callback(column.name, qry.select(column.fields.join(',')))
					: qry.select(column.fields.join(','))
			})
		} else {
			query.select(column.name)
		}
	})
	return query
}

export function mutationFieldsAdapter(query, columns): Hasura {
	columns.map(column => {
		if (['fieldset', 'tabs'].includes(column.type)) {
			if (column.name) {
				query.with(column.name, (qry) => {
					return qry.select(column.fields.flatMap(column => column.name).join(','));
				})
			} else {
				mutationFieldsAdapter(query, column['fields'])
			}
		}
		else if (column.fields) {
			query.with(column.name, (qry) => {
				return qry.select(column.fields.join(','));
			})
		}
		else if (column.type == 'dropdown' && column.data.foreign_key) {
			query.with(column.name, (qry) => {
				return qry.select(column.data.foreign_key);
			})
		}
		else {
			query.select(column.name)
		}
	})

	return query

}


function getConditions(val) {
	let obj = {}

	let index: any = false
	Object.keys(val).map((k) => {
		if (k.indexOf('id') != -1) {
			index = k
		}
	})
	if (index != false) {
		obj[index] = val[index]
	}

	return obj
}

export function updateAdapter(schema, variables, columns, id) {
	delete variables['id']
	const type = 'update'

	let query = hasura(schema)[type]({ id }).where({ id }).select('id')

	mutationFieldsAdapter(query, columns)
	for (const variable in variables) {
		if (Array.isArray(variables[variable]) && variables[variable].length > 0) {
			const deleteDatas = variables[variable].filter(item => item._delete);
			deleteDatas.map(deleteItem => {
				const prefix = getPrefix(columns, variable);
				query.compose(prefix + variable, (deleting => {
					return deleting.delete({ id: deleteItem.id })
				}))
			})
			variables[variable] = variables[variable].filter(item => !item._delete);

			const insertDatas = variables[variable]
			// if (insertDatas.length > 0) {
			const prefix = getPrefix(columns, variable);
			query.compose(prefix + variable, (qr => {
				return qr
					.insert(insertDatas.flatMap(v => ({ ...objectWithoutKey(v, '_create'), [`${removeSchemaPrefix(pluralize.singular(schema))}_id`]: id })))
					.conflicts({
						constraint: variable + '_pkey',
						update_columns: Object.keys(insertDatas[0]),

					})
			}))
			// }
			// else {
			// 	variables[variable].filter((item) => !item._create).map((it, i) => {
			// 		const prefix = getPrefix(columns, variable);
			// 		query.compose(prefix + variable, (qr => {
			// 			let cnd = {};
			// 			const args = columns.filter(t => t.name == variable)[0] ? columns.filter(t => t.name == variable)[0].args : [];
			// 			if (args.length > 0) {
			// 				const cKey = columns.filter(t => t.name == variable)[0].args[0].name
			// 				cnd = {
			// 					[cKey]: it[cKey]
			// 				}
			// 			}
			// 			return qr.alias(`${variable}_${i}`).update(it)
			// 				.where(Object.assign({ [`${removeSchemaPrefix(pluralize.singular(schema))}_id`]: id }, getConditions(it), cnd))
			// 		}))
			// 	})
			// }

			delete variables[variable];

		}
	}
	if (Object.keys(variables).length > 0) {

		query[type](variables);
	}

	return query;
}

function removeSchemaPrefix(schema: string) {
	return schema.split('_')[1]
}

function getPrefix(columns, variable) {
	return columns.filter(t => t.name == variable)[0] ? columns.filter(t => t.name == variable)[0].prefix || '' : ''

}

export function insertAdapter(schema, variables, columns) {
	const type = 'insert'
	let query: any = hasura(schema)
	for (const key in variables) {
		if (Array.isArray(variables[key])) {
			variables[key].flatMap(variable => {
				if (variable._create) {
					delete variable._create
				}
			})

		}
	}
	query = mutationFieldsAdapter(query, columns).select('id')
	if (Object.keys(variables).length > 0) {
		query = query[type](variables);
	}

	return query;
}
