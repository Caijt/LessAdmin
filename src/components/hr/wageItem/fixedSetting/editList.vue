<template>
  <div>
    <list show-checkbox show-index local-delete :confirm-on-delete="false" ref="list" :page="false" :border="false" :show-query="false">
      <template slot="toolbar-left">
        <el-button @click="add" type="primary">添加</el-button>
        <el-button @click="deleteBatch">删除</el-button>
      </template>
      <template slot="toolbar-right">
        <span class="c-tips">* 可设置某些员工的工资项数值，不设置默认为固定数值</span>
      </template>
      <template slot="column">
        <el-table-column label="员工" prop="employeeName"></el-table-column>
        <el-table-column label="固定数值" align="center" width="120px">
          <template slot-scope="{row}">
            <el-input-number v-model="row.value" controls-position="right" style="width:100%"></el-input-number>
          </template>
        </el-table-column>
      </template>
    </list>
    <employee-dialog
      ref="employeeDialog"
      selectable
      multiple
      :in-dialog="inDialog"
      @select-multiple="onSelect"
    />
  </div>
</template>
<script>
import list from "@/components/common/list";
import listMixins from "@/mixins/list";
import employeeDialog from "@/components/hr/employee/listDialog";

export default {
  mixins: [listMixins],
  components: { list, employeeDialog },
  props: {
    inDialog: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      data: [],
      checkedRows: [],
      loading: false
    };
  },
  methods: {
    add() {
      let notIds = this.$refs.list.data.map(item => item.employeeId);
      this.$refs.employeeDialog.open().then(that => {
        that.getData({ notIds });
      });
    },
    onSelect(rows) {
      this.$refs.list.add(
        rows.map(item => {
          return {
            employeeId: item.id,
            employeeName: item.name,
            value: 0
          };
        })
      );
    }
  }
};
</script>