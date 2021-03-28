{#if draggable}
  <section on:mousedown={onMouseDown} style="left: {left}px; top: {top}px;" class="draggable">
    <slot />
  </section>
{:else}
  <slot />
{/if}

<svelte:window on:mouseup={onMouseUp} on:mousemove={onMouseMove} />

<script>
  let left = 0
  let top = 0
  export let draggable = false

  let moving = false

  function onMouseDown() {
    moving = true
  }

  function onMouseMove(e) {
    if (moving) {
      left += e.movementX
      top += e.movementY
    }
  }

  function onMouseUp() {
    moving = false
  }

  // 	$: console.log(moving);
</script>

<style>
  .draggable {
    user-select: none;
    cursor: move;
    position: relative;
  }
</style>
