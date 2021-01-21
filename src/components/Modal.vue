<template lang="pug">
.modal.fixed-full
  block main
    .body.absolute-center
  .mask.absolute-full(@click="closeTips")
</template>
<script>
export default {
  methods: {
    closeTips() {
      this.msgShow = false;
      this.msgType = "";
      this.msg = "";
    },
  },
};
</script>
<style lang="scss">
.modal {
  z-index: 1002;
  .body {
    z-index: 1;
  }
  .mask {
    z-index: 0;
    background-color: rgba(0, 0, 0, 0.15);
    &.transparent {
      opacity: 0;
    }
  }
}
</style>