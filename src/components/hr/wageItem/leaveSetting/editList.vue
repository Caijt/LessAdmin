<template>
  <div>
    <list
      show-checkbox
      show-index
      ref="list"
      local-delete
      :confirm-on-delete="false"
      :page="false"
      :border="false"
      :show-query="false"
    >
      <template slot="toolbar-left">
        <el-button @click="add" type="primary">添加</el-button>
        <el-button @click="deleteBatch">删除</el-button>
      </template>
      <template slot="toolbar-right">
        <span class="c-tips">* 计算公式：基准项目 / 基数 * (计算项目1 * 系数1 + 计算项目2 * 系数2 + ..)</span>
      </template>
      <template slot="column">
        <el-table-column label="请假计算项目" prop="employeeName">
          <template slot-scope="{row}">
            <el-select v-model="row.computeItem">
              <el-option label="事假天数" value="LEAVE_BUSY"></el-option>
              <el-option label="病假天数" value="LEAVE_SICK"></el-option>
              <el-option label="旷工天数" value="ABSENTEEISM"></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column label="系数" align="center" width="120px">
          <template slot-scope="{row}">
            <el-input-number
              v-model="row.coefficient"
              controls-position="right"
              :precision="2"
              style="width:100%"
            ></el-input-number>
          </template>
        </el-table-column>
      </template>
    </list>
  </div>
</template>
<script>
import list from "@/components/common/list";
import listMixins from "@/mixins/list";

export default {
  mixins: [listMixins],
  components: { list },
  props: {
    inDialog: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {};
  },
  methods: {
    add() {
      this.$refs.list.add({
        computeItem: "LEAVE_BUSY",
        coefficient: 0
      });
    }
  }
};
</script>