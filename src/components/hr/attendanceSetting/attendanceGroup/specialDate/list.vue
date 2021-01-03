<!-- 
此组件初始化时不会自动加载数据，请在mounted中 this.$refs.[].initData()
如果放在dialog里面的吗，请在dialog的open事件中用this.$nextTick进行加载
 -->
<template>
  <div>
    <list
      row-key="id"
      ref="list"
      unit="绩效考核项目"
      :show-query="showQuery"
      :show-checkbox="showCheckbox"
      show-index
      :query-params="queryParams"
      :expand-query="expandQuery"
      :show-summary="showSummary"
      :page="false"
      :get-data-func="api.getNodeList"
    >
      <template slot="toolbar-left">
        <slot name="toolbar-left"></slot>
      </template>
      <template slot="query">
        <el-form-item label="节点类型">
          <el-input v-model.trim="queryParams.type" clearable></el-input>
        </el-form-item>
      </template>
      <template slot="column">
        <el-table-column label="节点类型" width="200" prop="isFixedType">
          <template slot-scope="{row}">
            <span v-if="row.isFixedType">指定领导</span>
            <span v-else>被考核人领导</span>
          </template>
        </el-table-column>
        <el-table-column label="领导级别 / 领导名字">
          <template slot-scope="{row}">
            <span v-if="row.isFixedType">{{row.employeeName}}</span>
            <span v-else>第 {{row.leaderLevel}} 级</span>
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
import api from "@/api/hr/kpiSetting";
export default {
  mixins: [listMixin],
  components: {
    list
  },
  props: {},
  data() {
    return {
      //查询条件字段
      queryParams: {
        type: "",
        description: ""
      },
      api
    };
  },
  methods: {}
};
</script>