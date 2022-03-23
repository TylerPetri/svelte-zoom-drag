<script lang="ts">
  import "./models";

  /**
   * Whether we're assigning fixed positioning css to out container
   */
  export let fixedContainer: boolean;

  /**
   * Positioning of both container and image
   */
  export let offsetLeft: number | undefined;
  export let offsetTop: number | undefined;

  /**
   * Image configs
   */
  export let src: string;
  export let alt: string;
  export let height: number | undefined;
  export let width: number | undefined;

  /**
   * Image element
   */
  let fixedContImg: HTMLImageElement;

  /**
   * Used to adjust the image to mouse location on click
   */
  let shiftX: number;
  let shiftY: number;

  /**
   * Used to trigger shitX and shiftY only while dragging the image
   */
  let dragging: boolean = false;

  function mouseStart(event: MouseEvent) {
    dragging = true;
    fixedContImg.style.transition = ""; // TODO request requestAnimationFrame
    if (dragging) {
      shiftX =
        fixedContImg.offsetWidth *
        ((event.pageX - fixedContImg.offsetLeft) / fixedContImg.offsetWidth);
      shiftY =
        fixedContImg.offsetHeight *
        ((event.pageY - fixedContImg.offsetTop) / fixedContImg.offsetHeight);
    }
  }

  function moveAt(pageX: number, pageY: number) {
    fixedContImg.style.left = pageX - shiftX + "px";
    fixedContImg.style.top = pageY - shiftY + "px";
  }

  function mouseMove(event: MouseEvent) {
    if (dragging) moveAt(event.pageX, event.pageY);
  }

  function mouseEnd() {
    dragging = false;
  }

  function onScroll(event: WheelEvent) {
    fixedContImg.style.transition = "all .2s"; // TODO requestAnimationFrame

    let prevHeight: number;
    let prevWidth: number;
    let nextHeight: number;
    let nextWidth: number;

    if (event.deltaY < 0) {
      fixedContImg.height = fixedContImg.offsetHeight * 1.3;
      fixedContImg.width = fixedContImg.offsetWidth * 1.3;

      prevHeight = fixedContImg.height;
      prevWidth = fixedContImg.width;
      nextHeight = fixedContImg.offsetHeight * 1.3;
      nextWidth = fixedContImg.offsetWidth * 1.3;

      fixedContImg.style.left =
        fixedContImg.offsetLeft -
        (nextWidth - prevWidth) *
          ((event.pageX - fixedContImg.offsetLeft) / fixedContImg.offsetWidth) +
        "px";
      fixedContImg.style.top =
        fixedContImg.offsetTop -
        (nextHeight - prevHeight) *
          ((event.pageY - fixedContImg.offsetTop) / fixedContImg.offsetHeight) +
        "px";
    } else {
      fixedContImg.height = fixedContImg.offsetHeight * 0.7;
      fixedContImg.width = fixedContImg.offsetWidth * 0.7;

      prevHeight = fixedContImg.height;
      prevWidth = fixedContImg.width;
      nextHeight = fixedContImg.offsetHeight * 0.7;
      nextWidth = fixedContImg.offsetWidth * 0.7;

      fixedContImg.style.left =
        fixedContImg.offsetLeft +
        -(nextWidth - prevWidth) *
          ((event.pageX - fixedContImg.offsetLeft) / fixedContImg.offsetWidth) +
        "px";
      fixedContImg.style.top =
        fixedContImg.offsetTop +
        -(nextHeight - prevHeight) *
          ((event.pageY - fixedContImg.offsetTop) / fixedContImg.offsetHeight) +
        "px";
    }
  }
</script>

{#if fixedContainer}
  <div
    class="container__fixed"
    on:mousemove={mouseMove}
    on:mouseleave={mouseEnd}
    style={`position: fixed; left: ${offsetLeft}px; top: ${offsetTop}px`}
  >
    <img
      draggable="true"
      bind:this={fixedContImg}
      on:dragstart|preventDefault
      on:mousedown={mouseStart}
      on:mouseup={mouseEnd}
      on:wheel={onScroll}
      {src}
      {alt}
      {height}
      {width}
      style={`left: ${offsetLeft}px; top: ${offsetTop}px`}
    />
  </div>
{/if}

<style>
  .container__fixed {
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    background: rgb(133, 40, 170);
  }

  .container__fixed img {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
  }
</style>
