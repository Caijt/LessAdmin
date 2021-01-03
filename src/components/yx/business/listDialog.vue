<template>
  <common-dialog ref="dialog" :title="title" width="1200px" :in-dialog="inDialog">
    <list
      :is-delete="isDelete"
      ref="list"
      in-dialog
      :show-checkbox="multiple"
      :show-query="showSelect"
    >
      <template slot="column">
        <slot name="table" />
        <slot name="column" />
        <el-table-column
          label="操作"
          align="center"
          width="60"
          fixed="right"
          v-if="select&&!multiple"
        >
          <template slot-scope="{row}">
            <el-button @click="onSelect(row)" type="text">选择</el-button>
          </template>
        </el-table-column>
      </template>
    </list>
    <template slot="footer">
      <slot name="footer">
        <el-button type="primary" @click="selectMultiple" v-if="select&&multiple">选择</el-button>
      </slot>
    </template>
  </common-dialog>
</template>
<script>
import commonDialog from "@/components/common/dialog";
import list from "./list";
import listDialogMixins from "@/mixins/listDialog";
export default {
  components: { commonDialog, list },
  mixins: [listDialogMixins],
  props: {
    title: {
      type: String,
      default: "商机列表"
    },
    isDelete: {
      type: Boolean,
      default: false
    }
  }
};
</script>