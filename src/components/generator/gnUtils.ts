import pluralize from "@f/crud/helpers/pluralizer";
import { getTableColumns } from "./gnRequests"



function getRelationByColumnName(column, table) {
	return table.relationships.filter(rl => rl.rel_name == column)[0]
		|| table.relationships.filter(tb => getRelName(tb.rel_def.foreign_key_constraint_on) == column)[0]
}

export function hasRelation(column, table) {
	const relation = getRelationByColumnName(column, table)
	if (relation) {
		return true
	}

	return false;
}

export function relationType(column, table) {
	let relation = getRelationByColumnName(column, table)

	if (relation) {
		return relation.rel_type
	}
}

function getRelName(rel_def) {
	if (typeof rel_def == 'object')
		return rel_def.column
	return rel_def
}

export function getRelation(column, table) {
	let relation = getRelationByColumnName(column, table)
	if (relation) {
		return relation.rel_name
	}

}


export async function generateColumnMeta(columns, table) {
	const result = []
	await columns.map(async (column) => {
		console.log(hasRelation(column[0], table), column[0])
		if (!hasRelation(column[0], table)) {
			result[result.length] = {
				name: column[0],
				title: column[0],
				type: column[1],
				required: column[2] == "YES"
			}
		} else {
			let relation_name = getRelation(column[0], table)
			let table_name = pluralize.plural(relation_name)
			const cl = await getTableColumns(table_name)
			result[result.length] = {
				name: column[0] || relation_name,
				title: relation_name,
				type: relationType(column[0], table) + '_relation',
				fields: generateFields(cl),
				required: column[2] == "YES"
			}
		}
	})
	let array_relations = table.relationships.filter((rl) => rl.rel_type == 'array')
	if (array_relations.length > 0) {
		for (let i = 0; i < array_relations.length; i++) {
			const cl = await getTableColumns(array_relations[i].rel_name)
			result[result.length] = {
				name: array_relations[i].rel_name,
				title: array_relations[i].rel_name,
				type: array_relations[i].rel_type + '_relation',
				fields: generateFields(cl),

			}

		}
	}

	const data = {
		queryName: table.table_name,
		columns: result,
	}
	return data
}

function generateFields(fields: Array<any>) {
	return fields.map(column => ({
		name: column[0],
		title: column[0],
		type: column[1],
		required: column[2] == "YES"
	}))
}

export function generateHtml(json, gridview,schemeName, tableName) {
	return `
	<Crud {data}></Crud>
	<script lang="ts">
			import type { TField } from '@co/form/builder/interfaces'
			import {  FormBuilder } from '@co/form/builder'
			import type { FieldSetContructorArgs, TabFieldContructorArgs } from '@co/form/builder'
			import Crud from '@f/crud/Index.svelte'
			const fbJson: Array<TField | FieldSetContructorArgs | TabFieldContructorArgs>  = ${json}
			const data = {
				prefix: '${schemeName == 'public' ? '' : schemeName}',
				queryName: '${schemeName == 'public' ? tableName : `${schemeName}_${tableName}`}' ,
				formBuilder: (new FormBuilder({name:'${schemeName == 'public' ? tableName : `${schemeName}_${tableName}`}'})).parseJson(fbJson),
				create: true,
				actions: {
					title: 'Действия',
					update: true,
					delete: true,
				},
				columns: ${gridview},
				pagination: {
					limit: 10,
				},
			}


	</script>


	`
}



