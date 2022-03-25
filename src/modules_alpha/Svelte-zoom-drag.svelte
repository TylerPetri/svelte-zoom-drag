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
  let Image: HTMLImageElement;

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
    Image.style.transition = ""; // TODO request requestAnimationFrame
    if (dragging) {
      shiftX =
        Image.offsetWidth *
        ((event.pageX - Image.offsetLeft) / Image.offsetWidth);
      shiftY =
        Image.offsetHeight *
        ((event.pageY - Image.offsetTop) / Image.offsetHeight);
    }
  }

  function moveAt(pageX: number, pageY: number) {
    Image.style.left = pageX - shiftX + "px";
    Image.style.top = pageY - shiftY + "px";
  }

  function mouseMove(event: MouseEvent) {
    if (dragging) moveAt(event.pageX, event.pageY);
  }

  function mouseEnd() {
    dragging = false;
  }

  function onScroll(event: WheelEvent) {
    Image.style.transition = "all .2s"; // TODO requestAnimationFrame

    let prevHeight: number;
    let prevWidth: number;
    let nextHeight: number;
    let nextWidth: number;

    if (event.deltaY < 0) {
      Image.height = Image.offsetHeight * 1.3;
      Image.width = Image.offsetWidth * 1.3;

      prevHeight = Image.height;
      prevWidth = Image.width;
      nextHeight = Image.offsetHeight * 1.3;
      nextWidth = Image.offsetWidth * 1.3;

      Image.style.left =
        Image.offsetLeft -
        (nextWidth - prevWidth) *
          ((event.pageX - Image.offsetLeft) / Image.offsetWidth) +
        "px";
      Image.style.top =
        Image.offsetTop -
        (nextHeight - prevHeight) *
          ((event.pageY - Image.offsetTop) / Image.offsetHeight) +
        "px";
    } else {
      Image.height = Image.offsetHeight * 0.7;
      Image.width = Image.offsetWidth * 0.7;

      prevHeight = Image.height;
      prevWidth = Image.width;
      nextHeight = Image.offsetHeight * 0.7;
      nextWidth = Image.offsetWidth * 0.7;

      Image.style.left =
        Image.offsetLeft +
        -(nextWidth - prevWidth) *
          ((event.pageX - Image.offsetLeft) / Image.offsetWidth) +
        "px";
      Image.style.top =
        Image.offsetTop +
        -(nextHeight - prevHeight) *
          ((event.pageY - Image.offsetTop) / Image.offsetHeight) +
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
      bind:this={Image}
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
