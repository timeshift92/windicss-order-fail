<nu-props
	content-padding="6x||3x"
	max-content-width="100rem - (--content-padding * 2)"
	content-width="12sp|||2sp"
	content="center"
/>
<nu-flex flow="column" width="min-content (100rem - (--content-padding * 2) + (--content-padding * 2))" space="around">
	<nu-flex gap="1x 2x" flow="row wrap" padding="2.5rem 1rem">
		<nu-icon name="image" size="3x" />
		<nu-block size="h2">Construct your Image</nu-block>
	</nu-flex>
	<nu-grid rows="auto auto" gap="4x" flow="row" columns="6fr 4fr" content="center">
		<nu-block>
				{#key img}
					<nu-img src={img} alt={relations.name} />
				{/key}
		</nu-block>
		<nu-theme name="error" hue="1" mod="tint" />
		<nu-attrs for="field" theme=":invalid[error]" />
		<nu-form
			on:input={(e) => {
				SubmitForm(e.detail)
			}}
			control="output[.value]"
			gap="2x"
		>
			<nu-card gap>
				<nu-block size="h2">Resize</nu-block>
				<nu-grid gap content="stretch stretch" rows="auto auto" flow="row" columns="1fr 1fr">
					<nu-field width="--content-width">
						<nu-label>Width</nu-label>
						<nu-numinput id="width" grow="1" placeholder="" />
						<nu-check for="width" assert={checkForNull} />
					</nu-field>
					<nu-field width="--content-width">
						<nu-label>Height</nu-label>
						<nu-numinput id="height" grow="1" placeholder="" />
						<nu-check for="height" assert={checkForNull} />
					</nu-field>
				</nu-grid>
			</nu-card>
			<nu-field>
				<nu-label>Open Graph image</nu-label>
				<nu-switch id="ogChecked" on:input={(event) => onInput(event.detail)} />
			</nu-field>
			{#if ogChecked}
				<nu-card gap transition:slide>
					<nu-block size="h2">Edit</nu-block>
					<nu-field>
						<nu-label>Title</nu-label>
						<nu-input id="title" grow="1" placeholder="" />
						<nu-check for="title" assert="required">Title is required</nu-check>
					</nu-field>
					<nu-field>
						<nu-label>Watermark</nu-label>
						<nu-input id="water_mark" grow="1" placeholder="" />
						<nu-check for="water_mark" assert="required">Watermark is required</nu-check>
					</nu-field>
				</nu-card>
			{/if}
			<nu-btn special action="submit">Generate Image</nu-btn>
		</nu-form>
	</nu-grid>
</nu-flex>

<script>
	export let relations: {
		name: string
		fileable_type: string
		id: string
		fileable_id: string
	}
	import { slide } from 'svelte/transition'

	let imageProps = {
		width: null,
		height: null,
		og: false,
		text: null,
		water_mark: null,
	}

	// let baseUrl = 'http://localhost:5050'
	let baseUrl = 'http://192.168.153.203:5050'
	let ogChecked
	let params: string = ''
	let img 
	 $: if (relations.fileable_type) {
		  img = `${baseUrl}/${relations.fileable_type}/${relations.fileable_id}/${relations.name}${params && '?' + params}`
	} else {
		 img =
			'http://192.168.153.203:5050/numlRulit/fa46da05-97e3-42c6-b2ad-97c214be95d8/8efd15362f5ec397d572079172808a4a.png/'
	}

	const onInput = (event) => {
		ogChecked = event
	}
	const SubmitForm = (e) => {
		params = ''
		imageProps.width = e.width
		imageProps.height = e.height
		imageProps.og = e.ogChecked
		if (e.ogChecked) {
			;(imageProps.text = e.title), (imageProps.water_mark = e.water_mark)
		}

		for (const image_props in imageProps) {
			if (typeof imageProps[image_props] !== 'undefined') {
				params += `${image_props}=${imageProps[image_props]}&&`
			}
		}
		params = params.slice(0, -2)
	}

	const checkForNull = () => {
		return true
	}
</script>
