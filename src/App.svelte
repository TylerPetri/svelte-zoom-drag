<script lang="ts">
  let fixedContImg,
    shiftX,
    shiftY,
    dragging = false;

  function touchStart(event) {
    dragging = true;
    fixedContImg.style.transition = "";
    if (dragging) {
      shiftX =
        fixedContImg.offsetWidth *
        ((event.pageX - fixedContImg.offsetLeft) / fixedContImg.offsetWidth);
      shiftY =
        fixedContImg.offsetHeight *
        ((event.pageY - fixedContImg.offsetTop) / fixedContImg.offsetHeight);
    }
  }

  function moveAt(pageX, pageY) {
    fixedContImg.style.left = pageX - shiftX + "px";
    fixedContImg.style.top = pageY - shiftY + "px";
  }

  function touchMove(event) {
    if (dragging) moveAt(event.pageX, event.pageY);
  }

  function touchEnd() {
    dragging = false;
  }

  function onScroll(event) {
    fixedContImg.style.transition = "all .2s";

    let prevHeight;
    let prevWidth;
    let nextHeight;
    let nextWidth;

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

<div class="container__fixed" on:mousemove={touchMove}>
  <img
    draggable="true"
    bind:this={fixedContImg}
    on:dragstart|preventDefault
    on:mousedown={touchStart}
    on:mouseup={touchEnd}
    on:mousewheel={onScroll}
    src="https://i.pinimg.com/originals/0a/b8/f7/0ab8f7c2ac635a9eb84ff2c934f23bbe.jpg"
    width="200"
    height="200"
    alt="epic anime"
  />
</div>

<style>
  /* when fixed container */
  :root {
    /* percentage supported */
    --top-offset: 80px;
    --left-offset: 450px;
  }

  .container__fixed {
    height: 200px;
    width: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    position: fixed;
    top: var(--top-offset);
    left: var(--left-offset);
    background: rgb(133, 40, 170);
  }

  .container__fixed img {
    position: fixed;
    top: var(--top-offset);
    left: var(--left-offset);
    z-index: 1000;
  }
</style>
