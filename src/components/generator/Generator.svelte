{#if serverStatus !== null}
	<Tag style="float:right" type={serverStatus ? 'green' : 'red'}>
		Server is {serverStatus ? 'online' : 'offline'}
	</Tag>
{/if}

<div>
	<TableDropdown bind:title on:tableSelected={handleChange} />
	<button on:click={execute}>Выполнить</button>
	{#if fileExists}
		<InlineNotification
			hideCloseButton
			kind="warning"
			title="File Exists:"
			subtitle="the file will be overwritten if you click execute"
		/>
	{/if}
</div>

{#if is_complete}<a href={title}>{title}</a>{/if}

<Grid>
	<Row>
		<Column>
			<Tabs>
				<Tab label="Grid" />
				<Tab label="Form" />
				<div slot="content">
					<TabContent>
						<div class="">
							<GridView bind:execute={exc} {schemeName} {tableName} {result} {table} bind:gridview />
						</div>
					</TabContent>
					<TabContent>
						<div id="FormBuilder">
							<FormBuilder {schemeName} {tableName} {result} {table} />
						</div>
					</TabContent>
				</div>
			</Tabs>
		</Column>
	</Row>
	<Row style="justify-content: center; gap: 1rem">
		<CodeSnippet type="multi" bind:code on:click={() => copy(code)} />
		<Button {...serverStatus && code && gridview.length > 0 ? {} : { disabled: true }} on:click={sendServer}
			>Создать файл</Button
		>
	</Row>
</Grid>

<script lang="ts">
	import { generateColumnMeta, generateHtml } from './gnUtils'
	import { getTableColumns } from './gnRequests'
	import { serverUrl } from '@src/core/configs'
	import GridView from './GridView.svelte'
	import FormBuilder from './FormBuilder.svelte'
	import TableDropdown from './TableDropdown.svelte'
	import {
		Grid,
		Row,
		Column,
		Tabs,
		Tab,
		TabContent,
		CodeSnippet,
		Tag,
		InlineNotification,
		Button,
	} from 'carbon-components-svelte'
	import { setContext } from 'svelte'
	import { writable } from 'svelte/store'
	import copy from 'clipboard-copy'

	const builder$ = writable({})
	const formObject$ = writable([])

	setContext('generator', { builder$, formObject$ })
	fetch(`${serverUrl}/generator`)
		.then((r) => {
			serverStatus = true
		})
		.catch((e) => {
			serverStatus = false
		})

	let gridview = []
	let table
	let tableName
	let schemeName
	let title: string = ''
	let result = []
	let columns = []
	let data
	let is_complete = false
	let withFormBuilder = false
	let serverStatus = null
	let fileExists = false
	let exc = false

	async function handleChange({ detail }) {
		result = []
		is_complete = false
		columns = await getTableColumns(detail.table_name)
		tableName = detail.table_name
		schemeName = detail.schemeName
		table = detail
		if (!title) title = table.table_name
		data = await generateColumnMeta(columns, table)
		result = data.columns
	}

	async function execute(e) {
		exc = true
		setTimeout(() => {
			data['columns'] = columns

			if (withFormBuilder) {
				data['formBuilder'] = $builder$
				data = {
					...data,
					create: true,
					actions: {
						title: 'Действия',
						update: true,
						delete: true,
					},
				}
			}
			const json = JSON.stringify($formObject$)
			code = generateHtml(json, JSON.stringify(gridview), schemeName, tableName)
		}, 250)
	}

	function sendServer() {
		fetch(`${serverUrl}/generator`, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ data: code, filename: title }),
		})
		is_complete = true
	}

	$: if (title.length > 3) {
		fetch(`${serverUrl}/generator/exists?filename=${title}`)
			.then((rs) => rs.json())
			.then((resp) => {
				fileExists = resp.fileExists
			})
	}
	let code = ''
</script>
