<template>
  <common-dialog ref="dialog" :title="title" width="450px" :in-dialog="inDialog">
    <tree ref="tree" :show-checkbox="multiple" @node-click="onSelect"></tree>
    <template slot="footer">
      <slot name="footer">
        <el-button type="primary" @click="selectMultiple" v-if="select&&multiple">选择</el-button>
      </slot>
    </template>
  </common-dialog>
</template>
<script>
import commonDialog from "@/components/common/dialog";
import tree from "./tree";
import treeDialogMixins from "@/mixins/treeDialog";
export default {
  components: { commonDialog, tree },
  mixins: [treeDialogMixins],
  props:{
    title:{
      type:String,
      default:"组织机构列表"
    }
  }
};
</script>