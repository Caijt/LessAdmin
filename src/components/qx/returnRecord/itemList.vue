<!-- 
此组件初始化时不会自动加载数据，请在mounted中 this.$refs.[].initData()
如果放在dialog里面的吗，请在dialog的open事件中用this.$nextTick进行加载
 -->
<template>
  <list
    row-key="id"
    ref="list"
    unit="归还明细记录"
    :show-query="showQuery"
    :show-checkbox="showCheckbox"
    show-index
    :query-params="queryParams"
    :expand-query="expandQuery"
    :show-summary="showSummary"
    :page="false"
    :get-list-func="api.getItemList"
  >
    <template slot="toolbar-left">
      <slot name="toolbar-left"></slot>
    </template>
    <div slot="query">
      <el-form-item label="器械类型">
        <el-input v-model.trim="queryParams.apparatusType" clearable></el-input>
      </el-form-item>
      <el-form-item label="器械名称">
        <el-input v-model.trim="queryParams.apparatusName" clearable></el-input>
      </el-form-item>
      <el-form-item label="器械编号">
        <el-input v-model.trim="queryParams.apparatusNo" clearable></el-input>
      </el-form-item>
    </div>
    <template slot="table">
      <el-table-column prop="apparatusNo" label="器械编号" width="180" show-overflow-tooltip />
      <el-table-column prop="apparatusType" label="器械类型" width="180" show-overflow-tooltip />
      <el-table-column prop="apparatusName" label="器械名称" min-width="180" show-overflow-tooltip />      
      <!-- slot[column] -->
      <slot name="table"></slot>
      <!--/ slot[column]-->
    </template>
  </list>
</template>
<script>
import listMixin from "@/mixins/list";
import list from "@/components/common/list";
import api from "@/api/qx/returnRecord";
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
        apparatusType: "",
        apparatusName: "",
        apparatusNo:""
      },
      api
    };
  },
  methods: {}
};
</script>