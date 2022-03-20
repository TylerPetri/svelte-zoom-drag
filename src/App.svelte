<script lang="ts">
  import ZoomAndDrag from "./modules_alpha/Svelte-zoom-drag.svelte";

  const fixedConfigs = {
    offsetLeft: 200,
    offsetTop: 200,
  };

  const imageConfigs = {
    src: "https://i.pinimg.com/originals/0a/b8/f7/0ab8f7c2ac635a9eb84ff2c934f23bbe.jpg",
    width: 200,
    height: 200,
    alt: "epic anime",
  };
</script>

<ZoomAndDrag fixedContainer {...fixedConfigs} {...imageConfigs} />
