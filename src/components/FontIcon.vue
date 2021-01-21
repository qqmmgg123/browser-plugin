<template>
  <i
    :class="`iconfont ${'icon-' + name} block flex justify-content-center`"
    :style="{
      width: size + 'px',
      height: size + 'px',
    }"
  ></i>
</template>
<script>
export default {
  props: {
    size: {
      type: Number,
      default: 0,
    },
    name: {
      type: String,
      default: "",
    },
  },
};
</script>