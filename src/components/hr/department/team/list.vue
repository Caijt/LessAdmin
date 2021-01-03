<!-- 
此组件初始化时不会自动加载数据，请在mounted中 this.$refs.[].initData()
如果放在dialog里面的吗，请在dialog的open事件中用this.$nextTick进行加载
 -->
<template>
  <div>
    <list
      row-key="id"
      ref="list"
      unit="班组"
      :show-query="showQuery"
      :show-checkbox="showCheckbox"
      show-index
      :query-params="queryParams"
      :expand-query="expandQuery"
      :show-summary="showSummary"
      :page="false"
      :get-data-func="api.getList"
    >
      <template slot="toolbar-left">
        <slot name="toolbar-left"></slot>
      </template>
      <template slot="toolbar-right">
        <slot name="toolbar-right"></slot>
      </template>
      <template slot="query">
        <el-form-item label="班组名称">
          <el-input v-model.trim="queryParams.name" clearable></el-input>
        </el-form-item>
      </template>
      <template slot="table">
        <el-table-column prop="name" label="班组名称" sortable="custom" min-width="100"></el-table-column>
        <el-table-column prop="name" label="班组人员" sortable="custom" width="100" align="center">
          <template slot-scope="{row}">
            <span class="c-link" @click="openEmployeeDialog(row.id)">查看</span>
          </template>
        </el-table-column>
        <!-- slot[column] -->
        <slot name="column"></slot>
        <slot name="table"></slot>
        <!--/ slot[column]-->
      </template>
    </list>
    <employee-dialog ref="employeeDialog" :in-dialog="inDialog" />
  </div>
</template>
<script>
import listMixin from "@/mixins/list";
import list from "@/components/common/list";
import api from "@/api/hr/department";
import employeeDialog from "@/components/hr/employee/listDialog";
export default {
  mixins: [listMixin],
  components: {
    list,
    employeeDialog
  },
  data() {
    return {
      //查询条件字段
      queryParams: {
        name: "",
        type: 1
      },
      api
    };
  },
  methods: {
    openEmployeeDialog(depId) {
      this.$refs.employeeDialog.open().then(that => {
        that.getData({ depId });
      });
    }
  }
};
</script>