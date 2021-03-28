<!-- {#if visible_edit_component}
  <GenerateImages {relations} />
{/if} -->
Simple Modal
<Modal iconName="edit">fkdshfkjshd</Modal>
<br>
Swipe
<ModalSwipe iconName="edit">
  Some content
  <ModalSwipe iconName="edit">
    Another modalА
    <ModalSwipe iconName="edit">
      Third modalB
      <ModalSwipe iconName="edit">4 modalB</ModalSwipe>
    </ModalSwipe>
  </ModalSwipe>
</ModalSwipe>
<br>
Grabby
<Grabby iconName="edit">dsfishdfh</Grabby>

<!-- <nu-block size="hero" padding=".5rem 1rem">Table Elements</nu-block>

<nu-table text="center" border fill="diff" radius=".5r" width="100" margin="auto">
  <nu-attrs
    for="cell"
    width="min 7"
    height="4"
    size="l"
    border="1px"
    text="center"
    mark="n ^:hover[y]"
    role="cell"
    nu-cell=""
  />
  <nu-attrs for="columnheader" text="h" />
  <nu-rowgroup role="rowgroup">
    <nu-row theme="tone soft">
      {#each headers as header}
        <nu-columnheader>
          <nu-el text="left">{header}</nu-el>
        </nu-columnheader>
      {/each}
      <nu-columnheader width="200px" role="checkbox" border="1px" text="center" height="4" size="l">
        <nu-flex gap="0.5" content="center">
          <nu-label text="b" nu-id="label" id="label">Action</nu-label>
        </nu-flex>
      </nu-columnheader>
    </nu-row>
  </nu-rowgroup>

  {#each $files$ as file}
    <nu-rowgroup overflow="scroll" height="60vh" scrollbar role="rowgroup">
      <nu-row use-hover="" transform="none" place="center" role="row">
        <nu-cell>{file.fileable_type}</nu-cell>
        <nu-cell>{file.name}</nu-cell>
        <nu-cell>{file.id}</nu-cell>
        <nu-cell>
          <nu-btn use-hotkey="d" role="button" on:click={() => deleteFile(file.id)}>
            <nu-icon name="trash-2" />
          </nu-btn>
          <nu-btn use-hotkey="e" role="button" on:click={() => editFile(file)}>
            <nu-icon name="edit" />
          </nu-btn>
        </nu-cell>
      </nu-row>
    </nu-rowgroup>
  {/each}
</nu-table> -->

<script>
  let headers = ['File Type', 'File Name', 'File Id']
  import { getContext } from 'svelte'
  import Grabby from '../crud/components/GrabbyModal/Grabby.svelte'
  import Modal from '../../features/crud/components/Modal.svelte'
  import ModalSwipe from '../crud/components/ModalSwipe.svelte'

  const { deleteFile, getFiles, fileable_id$, files$ } = getContext('file-upload')

  import GenerateImages from './constructor/GenerateImages.svelte'

  $: if ($fileable_id$) {
    getFiles({ fileable_id: $fileable_id$ })
  }

  let relations = {}

  let visible_edit_component = true

  const editFile = file => {
    visible_edit_component = true
    relations = { ...file, fileable_id: $fileable_id$ }
  }
</script>
