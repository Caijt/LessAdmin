<!-- 
此组件初始化时不会自动加载数据，请在mounted中 this.$refs.[].initData()
如果放在dialog里面的吗，请在dialog的open事件中用this.$nextTick进行加载
 -->
<template>
  <div>
    <list
      row-key="id"
      ref="list"
      unit="流程"
      :disabled="disabled"
      :show-query="showQuery"
      :show-checkbox="showCheckbox"
      show-index
      :query-params="queryParams"
      :expand-query="expandQuery"
      :show-summary="showSummary"
      :page="false"
      :get-data-func="api.getList"
      :delete-func="api.deleteById"
    >
      <template slot="toolbar-left">
        <slot name="toolbar-left"></slot>
      </template>
      <div slot="query">
        <el-form-item label="流程名称">
          <el-input v-model.trim="queryParams.name" clearable></el-input>
        </el-form-item>
        <el-form-item label="条件类型">
          <el-select v-model="queryParams.conditionType">
            <el-option label="无条件" :value="0"></el-option>
            <el-option label="匹配发起人职务" :value="1"></el-option>
            <el-option label="匹配发起人部门" :value="2"></el-option>
            <el-option label="匹配发起人" :value="3"></el-option>
          </el-select>
        </el-form-item>
      </div>
      <template slot="column">
        <el-table-column prop="name" label="流程名称" sortable="custom" min-width="100"></el-table-column>
        <el-table-column prop="isDisabled" label="状态" sortable="custom" width="100" align="center">
          <template slot-scope="{row}">
            <el-tag type="danger" v-if="row.isDisabled">禁用</el-tag>
            <el-tag type="success" v-else>启用</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="conditionType" label="匹配条件类型" sortable="custom" width="150">
          <template slot-scope="{row}">
            <span v-if="row.conditionType==0">无条件</span>
            <span v-else-if="row.conditionType==1">匹配发起人职务</span>
            <span v-else-if="row.conditionType==2">匹配发起人部门</span>
            <span v-else-if="row.conditionType==3">匹配发起人</span>
          </template>
        </el-table-column>
        <el-table-column label="流程条件" sortable="custom" width="200">
          <template slot-scope="{row}">
            <span v-if="row.conditionType==0">无</span>
            <span v-else-if="row.conditionType==1">发起人职务 = {{row.postName}}</span>
            <span v-else-if="row.conditionType==2">发起人部门 = {{row.depName}}</span>
            <span v-else-if="row.conditionType==3">发起人 = {{row.employeeName}}</span>
          </template>
        </el-table-column>
        <el-table-column label="优先级" prop="priority" sortable="custom" width="100"></el-table-column>
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
import api from "@/api/xz/workflowSetting";

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
        name: "",
        conditionType:""
      },
      api
    };
  },
  methods: {}
};
</script>