<nu-card>
	<nu-block>
		Server Status:
		<nu-badge fill="{serverStatus ? "#success" : "#danger"}">{serverStatus ?  'online' : 'offline'}</nu-badge>
	</nu-block>
</nu-card>
<nu-form bind:this={form}>
	<nu-fileinput id="file" value="Upload plugin">Upload file</nu-fileinput>

	<nu-btn on:tap={sendFile} action="submit">Send</nu-btn>
</nu-form>

{#if responseMessages.length > 0}
	<nu-card inset overflow="scroll" height="50vh">
		<nu-attrs
			for="icon"
			padding
			radius="2x"
			clear
			use-offset
			transition="move :offset[no]"
			move="(--offset-x * 1x) (--offset-y * 1x)"
		/>
		{#if isEnd}
			<nu-icon
				place="end"
				name="x-circle"
				use-action
				on:tap={() => {
					responseMessages = []
				}}
			/>
		{/if}
		{#each responseMessages as file}
			{#if ['OK', 'END'].includes(file.status)}
				<nu-block color="special" fill theme="success swap">{file.message}</nu-block>
			{:else}
				<nu-block color="special" fill theme="error swap">
					{typeof file.message == 'object' ? JSON.stringify(file.message) : file.message}
				</nu-block>
			{/if}
		{/each}
	</nu-card>
{/if}

{#each Object.keys(plugins) as plugin}
	<nu-card width="350px">
		<nu-grid columns="1fr 1fr">
			<nu-el>{plugin}</nu-el>

			<nu-btn on:tap={() => handleDelete(plugin)}>
				<nu-icon name="x-circle" />
			</nu-btn>
		</nu-grid>

		<nu-img src={plugins[plugin].image} />
	</nu-card>
{/each}

<script lang="ts">
	let serverStatus = false
	const serverUrl = 'http://localhost:3001/plugins'
	let plugins = []
	let form
	let isEnd = false
	import { onMount } from 'svelte'
	function getPlugins() {
		fetch(serverUrl)
			.then((res) => res.json())
			.then((data) => {
				plugins = data
				serverStatus = true
			})
			.catch((e) => {
				serverStatus = false
			})
	}
	getPlugins()

	let responseMessages = []

	const handleDelete = (plugin) => {
		fetch(serverUrl, {
			method: 'DELETE',
			body: new URLSearchParams({ plugin }),
		}).then(async (res) => {
			plugins = await res.json()
		})
	}

	const sendFile = (e) => {
		e.preventDefault()
		responseMessages = []
		isEnd = false
		const data = new FormData()
		Object.keys(form.nuGetValue()).map((field) => {
			data.append(field, form.nuGetValue()[field])
		})
		fetch(serverUrl, {
			method: 'POST',

			body: data,
		})
	}

	onMount(() => {
		const ws = new WebSocket('ws://localhost:3001/')
		ws.onopen = (e) => {
			ws.onmessage = (msg) => {
				let data = JSON.parse(msg.data)
				if (data.status == 'END') {
					isEnd = true
					fetch(serverUrl)
						.then((res) => res.json())
						.then((data) => {
							plugins = data
						})
				}
				responseMessages = [...responseMessages, data]
			}
		}
	})
</script>
