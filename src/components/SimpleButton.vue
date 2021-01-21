<template lang="pug">
extends pug/ImageLoader.pug
block image
  svg.absolute-full.btn(v-if="isIconArray", :width="width", :height="height")
    rect(
      v-if="item.area.type === 'rect'",
      v-for="(item, index) in icons",
      :key="index",
      @click.stop="$emit('areaclick', item.img)",
      @mouseover.stop="onMouseEnter(item)",
      @mouseout.stop="onMouseLeave(item)",
      :x="item.area.args[0]",
      :y="item.area.args[1]",
      :width="item.area.args[2]",
      :height="item.area.args[3]",
      fill="#f00",
      fill-opacity="0"
    )
    path(
      v-if="item.area.type === 'sector'",
      v-for="(item, index) in icons",
      :key="index",
      :d="getSectorPath(...item.area.args)",
      fill="#f00",
      fill-opacity="0",
      @click.stop="$emit('areaclick', item.img)",
      @mouseover.stop="onMouseEnter(item)",
      @mouseout.stop="onMouseLeave(item)"
    )
  .absolute-full.btn(
    v-else,
    @mouseover="onMouseEnter",
    @mouseout="onMouseLeave"
  )
  img(:src="iconSrc")
</template>
<script>
import ImageLoader from "@/components/ImageLoader";

export default {
  extends: ImageLoader,
  props: {
    mode: {
      type: String,
      default: "single",
    },
    dis: {
      type: Boolean,
      default: false,
    },
    icon: {
      type: [String, Array],
      default: "",
    },
  },
  data() {
    return {
      icons: [],
      isHoverState: false,
    };
  },
  created() {
    this.icons = this.icon;
  },
  computed: {
    isIconArray() {
      return Array.isArray(this.icon);
    },
    iconSrc() {
      if (this.isIconArray) {
        return require(`@/assets/images/${this.icons
          .map((icon) => {
            return (
              icon.img +
              (icon.dis ? "_dis" : "") +
              (icon.isHoverState ? "_hover" : "")
            );
          })
          .join("&")}@2x.png`);
      } else {
        return require(`@/assets/images/${
          this.icon +
          (this.dis ? "_dis" : "") +
          (this.isHoverState ? "_hover" : "")
        }@2x.png`);
      }
    },
  },
  watch: {
    icon(val) {
      this.icons = val;
    },
  },
  methods: {
    getSectorPath(x, y, outerDiameter, a1, a2) {
      const degtorad = Math.PI / 180;
      const halfOuterDiameter = outerDiameter / 2;
      const cr = halfOuterDiameter - 5;
      const cx1 = Math.cos(degtorad * a2) * cr + x;
      const cy1 = -Math.sin(degtorad * a2) * cr + y;
      const cx2 = Math.cos(degtorad * a1) * cr + x;
      const cy2 = -Math.sin(degtorad * a1) * cr + y;

      return (
        "M" +
        x +
        " " +
        y +
        " " +
        cx1 +
        " " +
        cy1 +
        " A" +
        cr +
        " " +
        cr +
        " 0 0 1 " +
        cx2 +
        " " +
        cy2 +
        "Z"
      );
    },
    onMouseEnter(icon) {
      if (this.isIconArray) {
        icon.isHoverState = true;
        this.icons = [...this.icons];
      } else this.isHoverState = true;
    },
    onMouseLeave(icon) {
      if (this.isIconArray) {
        icon.isHoverState = false;
        this.icons = [...this.icons];
      } else this.isHoverState = false;
    },
  },
};
</script>
