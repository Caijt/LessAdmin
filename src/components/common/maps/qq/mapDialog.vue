<template>
  <common-dialog ref="dialog" :title="title" width="1000px" :in-dialog="inDialog">
    <qq-map ref="map" :selectable="selectable" />
    <template slot="footer">
      <slot name="footer" v-if="selectable">
        <el-button type="primary" @click="onSelect">选择</el-button>
      </slot>
    </template>
  </common-dialog>
</template>
<script>
import commonDialog from "@/components/common/dialog";
import qqMap from "./map";
import dialogMixins from "@/mixins/dialog";
export default {
  components: { commonDialog, qqMap },
  mixins: [dialogMixins],
  props: {
    title: {
      type: String,
      default: "地图",
    },
    selectable: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    onSelect() {
      let position = {
        address: this.$refs.map.getAddress(),
        location: this.$refs.map.getLocation(),
      };
      this.$emit("selected", position);
      this.close();
    },
    goLocalCity() {
      console.log(this.$refs.map);
      this.$refs.map.goLocalCity();
    },
    setLocation(location) {
      this.$refs.map.setLocation(location);
    },
    search(keyword = null) {
      this.$refs.map.search(keyword);
    },
  },
};
</script>