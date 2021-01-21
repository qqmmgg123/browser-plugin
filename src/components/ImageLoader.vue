<template lang="pug">
include pug/ImageLoader.pug
</template>
<script>
export default {
  props: {
    size: {
      type: Number,
      default: 0,
    },
    width: {
      type: Number,
      default: 0,
    },
    height: {
      type: Number,
      default: 0,
    },
    src: {
      type: String,
      default: "",
    },
    fit: {
      type: String,
      default: "contain",
    },
    color: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      displayType: "normal",
    };
  },
  created() {
    if (/%/.test(this.fit)) {
      this.displayType = "background";
    } else {
      this.displayType = "normal";
    }
  },
  watch: {
    fit() {
      if (/%/.test(this.fit)) {
        this.displayType = "background";
      } else {
        this.displayType = "normal";
      }
    },
  },
};
</script>
<style lang="scss">
.image {
  background-position: center;
  background-repeat: no-repeat;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
</style>
