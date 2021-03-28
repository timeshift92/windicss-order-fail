{#if type == 'dropdown'}
  <MultiSelect
    {...options}
    bind:value
    on:select={(e) => handleChange({ detaiil: e.detail.selectedIds })}
    id={setId()}
    {...object_without_properties($$props, ['options', 'component', 'output'])}
  />
{:else if type == 'component'}
  <svelte:component
    this={$$props.component}
    bind:value
    {...options}
    id={setId()}
    {...object_without_properties($$props, ['options', 'component', 'output'])}
    on:change={handleChange}
  />
{:else if type == 'date'}
  <DatePicker
    required
    datePickerType="single"
    dateFormat="d/m/Y"
    style="margin-bottom:1rem"
    locale="ru"
    {...$$restProps}
  >
    <DatePickerInput
      labelText="Date de naissance"
      placeholder="dd/mm/yyyy"
    />
    {#if $$restProps.datePickerType == 'range'}
      <DatePickerInput
        labelText="Date de naissance"
        placeholder="dd/mm/yyyy"
      />
    {/if}
  </DatePicker>
{:else if type == 'file'}
  <FileUploader
    id={setId()}
    on:change={handleChange}
    {...options}
    {...object_without_properties($$props, ['options', 'component', 'output'])}
    placeholder=""
  />
{:else}
  {#if type == 'text'}
    <TextInput
      bind:value
      id={setId()}
      on:change={handleChange}
      {...options}
      {...$$restProps}
      {...object_without_properties($$props, [
        'options',
        'component',
        'output',
      ])}
    />
  {:else if type == 'password'}
    <PasswordInput
      autocomplete="new-password"
      id={setId()}
      on:change={handleChange}
      {...options}
      {...object_without_properties($$props, [
        'options',
        'component',
        'output',
      ])}
    />
  {:else if type == 'mask'}
    <input
      type="text"
      use:mask
      use:imask={options}
      id={setId()}
      on:change={handleChange}
      {...object_without_properties($$props, [
        'options',
        'component',
        'output',
      ])}
      placeholder=""
      on:accept={handleChange}
      on:complete={handleChange}
    />
  {:else if type == 'hidden'}
    <TextInput
      bind:value
      id={setId()}
      on:change={handleChange}
      {...options}
      {...object_without_properties($$props, [
        'options',
        'component',
        'output',
      ])}
      type="hidden"
    />
  {:else if type == 'number'}
    <NumberInput
      bind:value
      id={setId()}
      on:change={handleChange}
      {...options}
      {...object_without_properties($$props, [
        'options',
        'component',
        'output',
      ])}
    />
  {:else if type == 'textarea'}
    <TextArea
      id={setId()}
      on:change={handleChange}
      {...options}
      {...object_without_properties($$props, [
        'options',
        'component',
        'output',
      ])}
    />
  {:else if type == 'checkbox'}
    <Checkbox
      id={setId()}
      on:change={handleChange}
      {...options}
      {...object_without_properties($$props, [
        'options',
        'component',
        'output',
      ])}
    />
  {:else if type == 'radio'}
    <RadioButton
      id={setId()}
      on:change={handleChange}
      {...options}
      {...object_without_properties($$props, [
        'options',
        'component',
        'output',
      ])}
    />
  {/if}
  {#each validations as validation}
    <nu-check
      for={setId()}
      assert={getValidationAssert(validation)}
      color="hue(1)"
    >
      {getValidationReason(validation)}
    </nu-check>
  {/each}
{/if}

<script lang="ts">
  object_without_properties
  //   import { object_without_properties } from '../crud/helpers/formHelper'
  import { imask } from 'svelte-imask'
  //   import Dropdown from './Dropdown.svelte'
  //   import Editor from './Editor.svelte'
  //   import FileUpload from './FileUpload.svelte'
  import {
    MultiSelect,
    DatePicker,
    DatePickerInput,
    FileUploader,
    PasswordInput,
    TextInput,
    NumberInput,
    TextArea,
    Checkbox,
    RadioButton,
  } from 'carbon-components-svelte'
  import { object_without_properties } from 'svelte/internal'

  function setId() {
    if (path) {
      return `${path}.${index}.${name}`
    } else {
      return name
    }
  }

  export let type,
    output,
    validations = [],
    path = null,
    name,
    value = null,
    component = null,
    label = '',
    index = 0,
    options = {}
  function getValidationAssert(validation) {
    if (validation.assert) {
      return validation.assert
    }
    if (typeof validation == 'object') {
      return Object.keys(validation)[0]
    }
    return validation
  }
  function getValidationReason(validation) {
    if (validation.assert) {
      return validation.reason
    } else if (typeof validation == 'object') {
      return validation
    }
    return validation
  }

  $: if (type == 'hidden' && output && Object.keys(output).length > 0) {
    if (path) {
      if (Array.isArray(output[path]) && output[path][index]) {
        output[path][index][name] = value
      }
      // else{
      // 	output[path] = []
      // 	output[path][index] = {}
      // 	output[path][index][name] = value
      // 	delete output[name]
      // }
    } else output[name] = value
  }

  let creatable = true
  if (value) {
    creatable = false
  }

  const handleChange = (e) => {
    const vl = e.target ? e.target.value : e.detail
    if (path) {
      if (index != undefined) {
        if (!output[path]) {
          output[path] = []
        }
        if (!output[path][index]) {
          output[path][index] = creatable ? { _create: true } : {}
        }
        output[path][index][name] = type === 'number' ? parseFloat(vl) : vl
      } else {
        output[path] = [{ [name]: value }]
      }
    } else output[name] = type === 'number' ? parseFloat(vl) : vl
  }
</script>
