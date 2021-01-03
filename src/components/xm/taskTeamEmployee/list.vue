<template>
  <div>
    <list
      row-key="id"
      ref="list"
      :disabled="disabled"
      :show-toolbar="showToolbar"
      :show-query="showQuery"
      :show-checkbox="showCheckbox"
      show-index
      :query-params="queryParams"
      :expand-query="expandQuery"
      :show-summary="showSummary"
      :page="false"
      :get-data-func="api.getTeamEmployeeList"
    >
      <template slot="toolbar-left">
        <slot name="toolbar-left"></slot>
      </template>
      <template slot="query">
        <el-form-item label="人员姓名">
          <el-input v-model.trim="queryParams.employeeName" clearable></el-input>
        </el-form-item>
      </template>
      <template slot="table">
        <el-table-column prop="employeeName" label="人员" sortable="custom" min-width="150"></el-table-column>
        <el-table-column prop="isLead" label="是否负责" sortable="custom" align="center" width="120">
          <template slot-scope="{row}">
            <el-icon v-if="row.isLead" class="el-icon-check"></el-icon>
            <span v-else>-</span>
          </template>
        </el-table-column>
        <!-- slot[column] -->
        <slot name="column"></slot>
        <!--/ slot[column]-->
      </template>
    </list>
  </div>
</template>
<script>
import listMixin from "@/mixins/list";
import list from "@/components/common/list";
import api from "@/api/xm/taskTeam";

export default {
  mixins: [listMixin],
  components: {
    list
  },
  props: {
    showToolbar: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      //查询条件字段
      queryParams: {
        employeeName: ""
      },
      api
    };
  },
  methods: {}
};
</script>