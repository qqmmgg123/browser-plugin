<template>
  <div
    class="triangle-down"
    :style="{
      borderRight: `${size}px solid transparent`,
      borderLeft: `${size}px solid transparent`,
      borderTop: `${size}px solid ${color}`,
    }"
  ></div>
</template>
<script>
export default {
  props: {
    size: {
      type: Number,
      default: 8,
    },
    color: {
      type: String,
      default: "black",
    },
  },
};
</script>
<style lang="scss">
.triangle-down {
  width: 0;
  height: 0;
  position: relative;
}
</style>