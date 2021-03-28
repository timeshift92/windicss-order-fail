<FileManager />

<script>
	import { setContext } from 'svelte'
	import { writable } from 'svelte/store'
	import FileManager from './FileManager.svelte'

	function loadFiles(Url) {
		var oReq = new XMLHttpRequest()
		oReq.addEventListener('load', reqListener)
		oReq.open('GET', Url)
		oReq.send()

		function reqListener() {
			files$.set(JSON.parse(this.response).files || [])
			if ($selectedFiles$[0]) {
				const selectedPath = $selectedFiles$[0].path
				selectedFiles$.set(JSON.parse(this.response).files.filter((file) => file.path == selectedPath)[0].files)
			}
		}
	}

	const deleteFileHandler = (Url, files) => {
		const data = files.map((file) => {
			return {
				old: file,
				new: null,
			}
		})
		var xmlhttp = new XMLHttpRequest() // new HttpRequest instance
		xmlhttp.open('POST', Url)
		xmlhttp.setRequestHeader('Content-Type', 'application/json; charset=UTF-8')
		xmlhttp.onload = function () {
			if (xmlhttp.status == 200) {
				loadFiles(Url)
				selectedFile.set([])
			}
		}
		xmlhttp.send(JSON.stringify({ op: 'DELETE', data }))
	}
	const insertFileHandler = (Url, fileNames) => {
		let data = []

		for (const [key, value] of Object.entries(fileNames)) {
			data.push({
				old: null,
				new: {
					path: $selectSingle.path,
					name: value,
					type: 'file',
				},
			})
		}
		var xmlhttp = new XMLHttpRequest() // new HttpRequest instance
		xmlhttp.open('POST', Url)
		xmlhttp.setRequestHeader('Content-Type', 'application/json; charset=UTF-8')
		xmlhttp.onload = function () {
			if (xmlhttp.status == 200) {
				loadFiles(Url)
				selectedFile.set([])
			}
		}
		xmlhttp.send(JSON.stringify({ op: 'INSERT', data }))
	}

	const insertFolderHandler = (url, foldername) => {
		const data = [
			{
				new: {
					name: foldername,
					path: $selectSingle.path,
					type: 'folder',
				},
				old: null,
			},
		]
		var xmlhttp = new XMLHttpRequest() // new HttpRequest instance
		xmlhttp.open('POST', url)
		xmlhttp.setRequestHeader('Content-Type', 'application/json; charset=UTF-8')
		xmlhttp.onload = function () {
			if (xmlhttp.status == 200) {
				loadFiles(url)
				selectedFile.set([])
			}
		}
		xmlhttp.send(JSON.stringify({ op: 'INSERT', data }))
	}

	const renameHandler = (Url, data) => {
		var xmlhttp = new XMLHttpRequest() // new HttpRequest instance
		xmlhttp.open('POST', Url)
		xmlhttp.setRequestHeader('Content-Type', 'application/json; charset=UTF-8')
		xmlhttp.onload = function () {
			if (xmlhttp.status == 200) {
				loadFiles(Url)
				selectedFile.set([])
			}
		}
		xmlhttp.send(JSON.stringify({ op: 'RENAME', data }))
	}

	let files$ = writable([])
	let selectedFiles$ = writable([])
	let selectedFile = writable([])
	let selectSingle = writable({
		name: '',
		path: '',
		type: '',
	})

	setContext('file-manager', {
		loadFiles,
		deleteFileHandler,
		insertFileHandler,
		insertFolderHandler,
		renameHandler,
		files$,
		selectedFiles$,
		selectedFile,
		selectSingle,
	})
</script>
