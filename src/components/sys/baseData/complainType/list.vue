<!-- 
此组件初始化时不会自动加载数据，请在mounted中 this.$refs.[].initData()
如果放在dialog里面的吗，请在dialog的open事件中用this.$nextTick进行加载
 -->
<template>
  <div>
    <list
      row-key="id"
      ref="list"
      unit="投诉类型"
      :disabled="disabled"
      :show-query="showQuery"
      :show-checkbox="showCheckbox"
      show-index
      :query-params="queryParams"
      :expand-query="expandQuery"
      :show-summary="showSummary"
      :page="false"
      :get-list-func="api.getComplainTypeList"
      :delete-func="api.deleteComplainTypeById"
    >
      <template slot="toolbar-left">
        <slot name="toolbar-left"></slot>
      </template>
      <div slot="query">
        <el-form-item label="名称">
          <el-input v-model.trim="queryParams.name" clearable></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="queryParams.isDisabled"  clearable>
            <el-option label="启用" :value="false"></el-option>
            <el-option label="禁用" :value="true"></el-option>
          </el-select>
        </el-form-item>
      </div>
      <template slot="table">
        <el-table-column prop="name" label="投诉类型名称" sortable="custom" min-width="150"></el-table-column>
        <el-table-column prop="isDisabled" align="center" sortable="custom"  width="100" label="状态" >
          <template slot-scope="{row}">
            <el-tag v-if="row.isDisabled"  type="danger">禁用</el-tag>
            <el-tag v-else type="success">启用</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="order" width="100" sortable="custom" align="center" label="排序值" />
        <el-table-column prop="createTime" width="130" label="创建时间" sortable="custom">
          <template slot-scope="{ row }">
            <span>{{ row.createTime | toShortDatetimeString }}</span>
          </template>
        </el-table-column>
        <!-- slot[column] -->
        <slot name="table"></slot>
        <!--/ slot[column]-->
      </template>
    </list>
  </div>
</template>
<script>
import listMixin from "@/mixins/list";
import list from "@/components/common/list";
import api from "@/api/sys/baseData";
export default {
  mixins: [listMixin],
  components: {
    list
  },
  props: {
  },
  data() {
    return {
      //查询条件字段
      queryParams: {
        name: "",
        isDisabled: ""
      },
      api
    };
  },
  methods: {}
};
</script>