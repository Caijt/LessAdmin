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
      :get-data-func="api.getItemList"
    >
      <template slot="toolbar-left">
        <slot name="toolbar-left"></slot>
      </template>
      <template slot="query">
        <el-form-item label="考核类型">
          <el-input v-model.trim="queryParams.type" clearable></el-input>
        </el-form-item>
        <el-form-item label="考核描述">
          <el-input v-model.trim="queryParams.description" clearable></el-input>
        </el-form-item>        
      </template>
      <template slot="column">
        <el-table-column label="考核类型" width="100" prop="type"></el-table-column>
        <el-table-column label="考核描述" min-width="200" prop="description"></el-table-column>
        <el-table-column label="考核分数" width="100" prop="score"></el-table-column>
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
        description:""
      },
      api
    };
  },
  methods: {}
};
</script>