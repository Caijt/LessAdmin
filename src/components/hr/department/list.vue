<!-- 
此组件初始化时不会自动加载数据，请在mounted中 this.$refs.[].initData()
如果放在dialog里面的吗，请在dialog的open事件中用this.$nextTick进行加载
 -->
<template>
  <div>
    <list
      row-key="id"
      ref="list"
      unit="部门"
      :disabled="disabled"
      expand-all-row
      show-index
      :show-query="false"
      :show-checkbox="showCheckbox"
      :query-params="queryParams"
      :expand-query="expandQuery"
      :show-summary="showSummary"
      :page="false"
      :get-data-func="getDataFunc"
      :delete-func="api.deleteById"
    >
      <template slot="toolbar-left">
        <slot name="toolbar-left"></slot>
      </template>
      <div slot="query">
        <el-form-item label="部门名称">
          <el-input v-model.trim="queryParams.name" clearable></el-input>
        </el-form-item>
      </div>
      <template slot="table">
        <el-table-column prop="name" label="部门名称" min-width="150"></el-table-column>
        <el-table-column prop="leaderName" label="领导" align="center" width="100">
          <template slot-scope="{row}">{{row.leaderName||"-"}}</template>
        </el-table-column>
        <el-table-column prop="type" label="类型" align="center" width="100">
          <template slot-scope="{row}">{{row.type==0?"部门":"班组"}}</template>
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
import api from "@/api/hr/department";
export default {
  mixins: [listMixin],
  components: {
    list
  },
  props: {},
  data() {
    return {
      api,
      //查询条件字段
      queryParams: {
        name: ""
      },
      sourceData: null
    };
  },
  methods: {
    getDataFunc(params) {
      return new Promise((resolve, reject) => {
        this.api.getList(params).then(res => {
          this.sourceData = res.data;
          let data = this.$commonJs.toTreeData(res.data);
          resolve({
            data
          });
        });
      });
    }
  }
};
</script>