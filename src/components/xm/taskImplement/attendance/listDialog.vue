<template>
  <common-dialog @opened="onOpened" ref="dialog" :title="title" width="800px" :in-dialog="inDialog">
    <list ref="list" in-dialog :show-checkbox="multiple">
      <template slot="column">
        <slot name="table" />
        <slot name="column" />
        <el-table-column
          label="操作"
          align="center"
          width="60"
          fixed="right"
          v-if="(select||selectable)&&!multiple"
        >
          <template slot-scope="{row}">
            <el-button @click="onSelect(row)" type="text">选择</el-button>
          </template>
        </el-table-column>
      </template>
    </list>
    <template slot="footer">
      <slot name="footer">
        <el-button type="primary" @click="selectMultiple" v-if="(select||selectable)&&multiple">选择</el-button>
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
      default: "项目员工考勤列表"
    }
  },
  methods:{
    onOpened(data){
      this.$refs.list.getData(data);
    }
  }
};
</script>