<!-- 
此组件初始化时不会自动加载数据，请在mounted中 this.$refs.[].initData()
如果放在dialog里面的吗，请在dialog的open事件中用this.$nextTick进行加载
 -->
<template>
  <div>
    <list
      row-key="id"
      ref="list"
      unit="工资项目"
      :disabled="disabled"
      :show-query="showQuery"
      :show-checkbox="showCheckbox"
      show-index
      :query-params="queryParams"
      :expand-query="expandQuery"
      :show-summary="showSummary"
      :page="page"
      :get-page-list-func="api.getPageList"
      :delete-func="api.deleteById"
    >
      <template slot="toolbar-left">
        <slot name="toolbar-left"></slot>
      </template>
      <template slot="query">
        <el-form-item label="名称">
          <el-input v-model.trim="queryParams.name" clearable></el-input>
        </el-form-item>
        <el-form-item label="数据来源">
          <el-select v-model="queryParams.dataSource" clearable>
            <el-option :label="item" :value="index" v-for="(item,index) in api.wageItemDataSources"  :key="index"></el-option>
          </el-select>
        </el-form-item>       
      </template>
      <template slot="column">
        <el-table-column prop="name" label="工资项目" sortable="custom" min-width="100"></el-table-column>
        <el-table-column prop="wageTypeName" label="工资类型" sortable="custom" width="150"></el-table-column>
        <el-table-column prop="dataSource" width="100" label="数据来源" align="center" >
          <template slot-scope="{row}">
            {{api.wageItemDataSources[row.dataSource]}}
          </template>
        </el-table-column>
        <el-table-column prop="order" width="100" label="排序值" align="center" />
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
import api from "@/api/hr/wageItem";

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
        name:"",
        dataSource:""
      },
      api
    };
  },
  methods: {
    
  }
};
</script>